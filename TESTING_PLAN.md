# Nivaran System Testing Plan

This plan verifies the integration between the local React frontend, Node.js backend, SQLite database, and Shopify.

## Prerequisites
1. Ensure `server/.env` is configured.
2. Run `npm install` in `server/`.
3. Start the server: `cd server && npm start`.
4. Start the frontend: `npm run dev`.
5. Use **Shopify CLI** to forward webhooks locally: `shopify webhook trigger`.

---

## 1. Authentication & User Storage

### Test Case 1.1: New User Signup
- **Action**: Go to `/signup` (or use Postman `POST /auth/signup`).
- **Payload**: `{ "email": "test@example.com", "password": "password123", "firstName": "Test", "lastName": "User" }`
- **Expected Result**:
  - Response 201 Created.
  - User exists in local SQLite `users` table.
  - User exists in Shopify Customers list (check Shopify Admin).
  - `shopify_customer_id` is saved in local DB.

### Test Case 1.2: Login
- **Action**: Go to `/login` (or `POST /auth/login`).
- **Payload**: `{ "email": "test@example.com", "password": "password123" }`
- **Expected Result**:
  - Response 200 OK.
  - Session cookie is set.
  - `GET /api/me` returns user data.

### Test Case 1.3: Google OAuth
- **Action**: Click "Login with Google".
- **Expected Result**:
  - Redirects to Google.
  - Redirects back to `/auth/google/callback`.
  - User created in local DB (if new).
  - User created in Shopify (if new).
  - Logged in successfully.

---

## 2. Membership & Subscriptions

### Test Case 2.1: Subscription Created Webhook
- **Action**: Simulate webhook using Postman or Shopify CLI.
- **Endpoint**: `POST http://localhost:3000/api/webhooks/subscription_contracts/create`
- **Headers**: 
  - `X-Shopify-Topic`: `subscription_contracts/create`
  - `X-Shopify-Hmac-Sha256`: [Valid Signature] (or disable verification in dev)
  - `X-Shopify-Shop-Domain`: `your-store.myshopify.com`
- **Payload**:
  ```json
  {
    "id": "sub_12345",
    "customer_id": 123456789,
    "status": "active",
    "next_billing_date": "2025-01-01"
  }
  ```
- **Expected Result**:
  - Row added to `subscriptions` table in SQLite.
  - Status is `active`.

### Test Case 2.2: Member-Only Access
- **Action**: Try to access a protected route (e.g., `/premium-content`).
- **Expected Result**:
  - If subscription is active: Access granted.
  - If no subscription: Redirect to `/membership`.

### Test Case 2.3: Cancellation
- **Action**: Send `subscription_contracts/update` webhook with `status: "cancelled"`.
- **Expected Result**:
  - DB updates status to `cancelled`.
  - User loses access to member pages.

---

## 3. Admin Panel

### Test Case 3.1: View Users
- **Action**: `GET /api/admin/users`
- **Expected Result**: JSON list of users with their subscription status.

### Test Case 3.2: Force Cancel
- **Action**: `POST /api/admin/cancel-subscription` with `{ "userId": 1 }`.
- **Expected Result**: Subscription status becomes `cancelled` in DB.

---

## 4. Shopify Integration

### Test Case 4.1: Order Sync
- **Action**: Create an order in Shopify.
- **Expected Result**: Webhook `orders/paid` is received and logged.

---

## Troubleshooting
- **Webhook Signature Fail**: Ensure `SHOPIFY_WEBHOOK_SECRET` matches the app settings.
- **Database Locked**: Ensure no other process is holding `database.sqlite`.
