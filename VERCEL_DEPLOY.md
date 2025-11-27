# Vercel Deployment Guide

Your project is now configured to deploy both the React frontend and the Express backend (as Serverless Functions) on Vercel.

## 1. Push Changes to GitHub

First, commit and push the changes I just made to your repository:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin master
```

## 2. Import Project in Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your repository: `Nivaran-2-`.
4.  Vercel will detect Vite. The default build settings are correct (`npm run build`, `build` folder).

## 3. Configure Environment Variables

**Before clicking Deploy**, you must add the following Environment Variables in the Vercel Project Settings.

| Variable Name | Value Description |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `SESSION_KEY` | Your random session key (same as local or new) |
| `SHOPIFY_STORE` | `nivaranupcyclers.myshopify.com` |
| `SHOPIFY_ADMIN_TOKEN` | Your `shpat_...` token |
| `SHOPIFY_WEBHOOK_SECRET` | Your Webhook Signing Secret |
| `GOOGLE_CLIENT_ID` | Your Google Client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret |
| `GOOGLE_REDIRECT_URI` | `https://<YOUR-VERCEL-DOMAIN>/auth/google/callback` |
| `CLIENT_URL` | `https://<YOUR-VERCEL-DOMAIN>` |
| `DATABASE_URL` | **REQUIRED**: Connection string for your PostgreSQL database (e.g., from Vercel Postgres, Neon, or Supabase) |

**Important:** You won't know your exact Vercel domain (e.g., `nivaran-2.vercel.app`) until after the first deployment starts.
1.  Enter placeholder values for `GOOGLE_REDIRECT_URI` and `CLIENT_URL` initially (or guess `https://nivaran-2.vercel.app`).
2.  Deploy.
3.  Once you have the domain, go to **Settings > Environment Variables**, update them, and **Redeploy**.

## ⚠️ Database Setup (PostgreSQL)

This project is configured to use **PostgreSQL** in production (Vercel) and **SQLite** locally.

1.  **Create a Database**: In your Vercel dashboard, go to the **Storage** tab and create a **Vercel Postgres** database.
2.  **Connect**: Click "Connect Project" to link it to your deployment. This will automatically set the `POSTGRES_URL` (or `DATABASE_URL`) environment variable.
3.  **Verify**: The application will automatically detect `DATABASE_URL` and create the necessary tables (`users`, `subscriptions`, etc.) on the first run.

## 4. Update Google Cloud Console

1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Navigate to **APIs & Services > Credentials**.
3.  Edit your OAuth 2.0 Client.
4.  Add your Vercel domain to **Authorized JavaScript origins**:
    *   `https://nivaran-2.vercel.app` (replace with your actual domain)
5.  Add the callback URL to **Authorized redirect URIs**:
    *   `https://nivaran-2.vercel.app/auth/google/callback`

## 5. Verify Deployment

1.  Open your Vercel URL.
2.  Go to the Login page.
3.  Click "Continue with Google".
4.  It should redirect to Google, then back to your Vercel app, and log you in.
