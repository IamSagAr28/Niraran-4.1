# Complete Deployment Guide - Nivaran 4.1

## Step 1: Prepare Local Repository

### 1.1 Initialize Git (if not already done)
```bash
cd c:\Users\sagar\OneDrive\Desktop\newN\nivaran3.1
git init
```

### 1.2 Add Remote Repository
```bash
git remote add origin https://github.com/IamSagAr28/Niraran-4.1.git
```

### 1.3 Create .gitignore
Create a `.gitignore` file in the root directory with:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Database
*.db
*.sqlite
*.sqlite3

# Misc
.cache/
.temp/
```

### 1.4 Commit All Changes
```bash
git add .
git commit -m "feat: complete Nivaran 4.1 with all UI improvements and features"
```

### 1.5 Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Environment Variables

### 2.1 Create `.env` file in root directory
```env
# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Server Configuration
PORT=5000
NODE_ENV=production

# Session Secret
SESSION_SECRET=your_super_secret_session_key_change_this

# Database (if using external DB)
# DATABASE_URL=your_database_url

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 2.2 Create `.env.example` (for documentation)
```env
# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=

# Google OAuth
VITE_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Server Configuration
PORT=5000
NODE_ENV=production

# Session Secret
SESSION_SECRET=

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## Step 3: Update Configuration Files

### 3.1 Update `package.json` (root)
Add deployment scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "cd server && npm start",
    "server:dev": "cd server && npm run dev",
    "start:all": "concurrently \"npm run dev\" \"npm run server:dev\"",
    "deploy": "npm run build && npm run server"
  }
}
```

### 3.2 Update `server/package.json`
Ensure these scripts exist:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Step 4: Database Setup

### 4.1 Current Setup (SQLite)
The app uses SQLite with `better-sqlite3`. Database file: `server/database.db`

**For deployment, you have two options:**

#### Option A: Keep SQLite (Simple)
- Database file will be created automatically
- Good for small to medium traffic
- File: `server/database.db`

#### Option B: Migrate to PostgreSQL (Recommended for production)
1. Install PostgreSQL adapter:
```bash
cd server
npm install pg
```

2. Update database connection in `server/db.js`
3. Set `DATABASE_URL` in `.env`

---

## Step 5: Google OAuth Setup

### 5.1 Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5000`
   - `https://your-production-domain.com` (add when deployed)
7. Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `https://your-production-domain.com/api/auth/google/callback`

### 5.2 Copy Credentials
- Copy **Client ID** → Add to `.env` as `VITE_GOOGLE_CLIENT_ID`
- Copy **Client Secret** → Add to `.env` as `GOOGLE_CLIENT_SECRET`

---

## Step 6: Shopify Configuration

### 6.1 Get Shopify Credentials
1. Go to Shopify Admin: `your-store.myshopify.com/admin`
2. Apps → Develop apps → Create app
3. Configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collections`
4. Install app
5. Copy **Storefront Access Token**

### 6.2 Update .env
```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

---

## Step 7: Deployment Options

### Option A: Deploy to Vercel (Frontend) + Render (Backend)

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SHOPIFY_STORE_DOMAIN": "@shopify-domain",
    "VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN": "@shopify-token",
    "VITE_GOOGLE_CLIENT_ID": "@google-client-id"
  }
}
```

#### Backend (Render)
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Root directory: `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables in Render dashboard

---

### Option B: Deploy to Railway (Full Stack)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**Railway Configuration:**
- Add all environment variables
- Set root directory for backend
- Configure build commands

---

### Option C: Deploy to Heroku (Full Stack)

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create nivaran-app

# Add buildpacks
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main

# Set environment variables
heroku config:set VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
heroku config:set VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
heroku config:set VITE_GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set SESSION_SECRET=your_session_secret
```

---

## Step 8: Post-Deployment Checklist

### 8.1 Test All Features
- [ ] Homepage loads correctly
- [ ] Products display from Shopify
- [ ] Category filtering works
- [ ] Search functionality
- [ ] Cart operations (add, remove, update)
- [ ] User registration
- [ ] Email/password login
- [ ] Google OAuth login
- [ ] Dashboard access
- [ ] Profile updates
- [ ] Logout functionality
- [ ] Workshops section displays
- [ ] Footer links work
- [ ] Mobile responsive

### 8.2 Update Google OAuth
- Add production domain to authorized origins
- Add production callback URL

### 8.3 Update CORS
In `server/server.js`, update CORS origin:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-domain.com'],
  credentials: true
}));
```

### 8.4 Security Checklist
- [ ] Strong SESSION_SECRET set
- [ ] HTTPS enabled in production
- [ ] Environment variables secured
- [ ] Database backed up
- [ ] Rate limiting configured
- [ ] Input validation in place

---

## Step 9: Quick Deploy Commands

### For Local Testing
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
npm install
npm run dev
```

### For Production Build
```bash
# Build frontend
npm run build

# Test production build
npm run preview

# Start backend
cd server
npm start
```

---

## Step 10: Troubleshooting

### Common Issues

**1. Google OAuth not working**
- Check redirect URIs match exactly
- Verify client ID and secret
- Check CORS settings

**2. Shopify products not loading**
- Verify Storefront Access Token
- Check store domain format
- Ensure API scopes are correct

**3. Database errors**
- Check file permissions for SQLite
- Verify DATABASE_URL for PostgreSQL
- Run migrations if needed

**4. Session issues**
- Verify SESSION_SECRET is set
- Check cookie settings
- Ensure CORS credentials: true

---

## Environment Variables Summary

**Required for deployment:**
```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxx
VITE_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
SESSION_SECRET=random_secure_string_min_32_chars
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

---

## Quick Start Commands

```bash
# 1. Clone/Navigate to project
cd c:\Users\sagar\OneDrive\Desktop\newN\nivaran3.1

# 2. Install dependencies
npm install
cd server && npm install && cd ..

# 3. Set up environment variables
# Create .env file with all required variables

# 4. Initialize git and push
git init
git add .
git commit -m "Initial commit - Nivaran 4.1"
git remote add origin https://github.com/IamSagAr28/Niraran-4.1.git
git branch -M main
git push -u origin main

# 5. Deploy (choose one platform)
# Vercel: vercel
# Railway: railway up
# Heroku: git push heroku main
```

---

## Support & Documentation

- **Shopify Docs:** https://shopify.dev/docs/api/storefront
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app

---

**Status:** Ready for deployment! 🚀
