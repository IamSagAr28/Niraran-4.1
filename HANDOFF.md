# Developer Handoff Document

## Architecture Overview
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Database**: SQLite (Local file `server/database.sqlite`)
- **Auth**: Hybrid (Local Email/Pass + Google OAuth)
- **E-commerce**: Shopify (Headless-ish)
  - Products & Checkout managed by Shopify.
  - Customers synced between Shopify and Local DB.
  - Subscriptions managed via Shopify Apps & Webhooks.

## Key Workflows

### 1. Signup / Login
- **User Signs Up**:
  1. Frontend sends `POST /auth/signup`.
  2. Backend creates Shopify Customer via Admin API.
  3. Backend hashes password and saves User + Shopify ID to SQLite.
- **User Logs In**:
  1. Frontend sends `POST /auth/login`.
  2. Backend verifies hash.
  3. Session cookie established.

### 2. Membership Sync
- **Purchase**: User buys subscription on Shopify.
- **Webhook**: Shopify sends `subscription_contracts/create`.
- **Sync**: Backend receives webhook -> Updates `subscriptions` table in SQLite.
- **Access**: Middleware `requireMembership` checks SQLite status.

## Database Schema
- **users**: `id`, `email`, `password_hash`, `shopify_customer_id`, `google_id`
- **subscriptions**: `id`, `user_id`, `status`, `current_period_end`, `provider_subscription_id`
- **webhook_events**: `id`, `topic` (for idempotency)

## Webhooks (Endpoints)
| Topic | Endpoint | Action |
|-------|----------|--------|
| `customers/create` | `/api/webhooks/customers/create` | Syncs Customer ID |
| `subscription_contracts/create` | `/api/webhooks/subscription_contracts/create` | Activates Membership |
| `subscription_contracts/update` | `/api/webhooks/subscription_contracts/update` | Updates Status (Cancel/Renew) |

## Deployment
1. **Database**: Ensure `server/database.sqlite` is persistent (use a volume if Dockerizing).
2. **Environment**: Set all variables in `.env`.
3. **Webhooks**: Register the endpoints in Shopify Admin -> Notifications -> Webhooks.
   - URL: `https://your-domain.com/api/webhooks/...`

## How to Fix Issues
- **Missing Webhooks**: Check `webhook_events` table to see if they arrived. Check Shopify Admin for delivery failures.
- **Auth Failures**: Check `users` table for `shopify_customer_id` mismatch.
