# Nivaran Auth Server Setup

This server handles Google OAuth2 authentication and synchronizes users with Shopify Customers via the Admin API.

## 1. Environment Variables

Create a `.env` file in the `server/` directory with the following keys:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SESSION_KEY=your_super_secret_random_string_at_least_32_chars

# Google OAuth Credentials
# Create these at https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Shopify Admin API
# Create a Custom App in Shopify Admin > Settings > Apps and sales channels > Develop apps
# Scopes required: write_customers, read_customers
SHOPIFY_STORE=nivaranupcyclers.myshopify.com
SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 2. Installation & Run

```bash
cd server
npm install
npm run dev
```

## 3. Google Cloud Console Setup

1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project.
3.  Navigate to **APIs & Services > Credentials**.
4.  Click **Create Credentials > OAuth client ID**.
5.  Application type: **Web application**.
6.  **Authorized JavaScript origins**: `http://localhost:3000` (and your production domain).
7.  **Authorized redirect URIs**: `http://localhost:3000/auth/google/callback` (and your production callback).

## 4. Shopify Admin Setup

1.  Go to your Shopify Admin.
2.  **Settings > Apps and sales channels > Develop apps**.
3.  **Create an app** (e.g., "Nivaran Auth").
4.  **Configuration > Admin API integration**.
5.  Select scopes: `read_customers`, `write_customers`.
6.  **Install app** and copy the `Admin API access token` (starts with `shpat_`).

## 5. Frontend Integration

The frontend is already configured to use this server.
- **Login Button**: Redirects to `http://localhost:3000/auth/google`.
- **Session Check**: Fetches `http://localhost:3000/api/me`.

## 6. Deployment (Heroku/Render/Vercel)

1.  **Environment Variables**: Set all the variables from `.env` in your hosting provider's dashboard.
2.  **HTTPS**: Ensure `CLIENT_URL` and `GOOGLE_REDIRECT_URI` use `https://` in production.
3.  **SameSite Cookies**: In production (`NODE_ENV=production`), the cookie is set to `Secure` and `SameSite=None` to allow cross-site cookies if your frontend and backend are on different domains (e.g., Vercel vs Render).

## 7. Testing

**Curl Test (Health Check):**
```bash
curl http://localhost:3000/
```

**Browser Test:**
1.  Start server: `npm run dev` (port 3000).
2.  Start client: `npm run dev` (port 5173).
3.  Click "Continue with Google" on the login page.
4.  You should be redirected to Google, then back to the app.
5.  Check the server console for "✅ Found existing Shopify customer" or "✨ Creating new Shopify customer".
