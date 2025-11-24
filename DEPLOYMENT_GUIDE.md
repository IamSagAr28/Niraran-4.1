# 🌐 DEPLOYMENT GUIDE - VERCEL & NETLIFY

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- ✅ **Environment variables are set locally:**
  ```
  VITE_SHOPIFY_STORE_URL=your-store.myshopify.com
  VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxx
  VITE_SHOPIFY_API_VERSION=2024-01
  ```

- ✅ **Build succeeds locally:**
  ```bash
  npm run build
  ```

- ✅ **All tests pass:**
  - Products load correctly
  - Cart functions work
  - Checkout redirects to Shopify

- ✅ **No API keys exposed in code**
  - All sensitive data uses environment variables
  - Only Storefront tokens used (never Admin API keys)

- ✅ **Git repository is up to date:**
  ```bash
  git status
  git add .
  git commit -m "Deploy Shopify integration"
  git push origin master
  ```

---

## VERCEL DEPLOYMENT (Recommended)

### Step 1: Create Vercel Account

1. Go to https://vercel.com/
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (or your Git provider)
4. Authorize Vercel
5. Create a new account/team

### Step 2: Import Your Project

**Option A: Via Git (Recommended)**

1. Push your code to GitHub (if not already done)
2. In Vercel dashboard, click **"New Project"**
3. Select **"Import Git Repository"**
4. Search for your repository
5. Click **"Import"**

**Option B: Via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure Environment Variables

1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Click **"Add"** for each variable:

   **Variable 1:**
   - Name: `VITE_SHOPIFY_STORE_URL`
   - Value: `your-store.myshopify.com`
   - Environments: ✅ Production, Preview, Development

   **Variable 2:**
   - Name: `VITE_SHOPIFY_STOREFRONT_TOKEN`
   - Value: `shpat_xxxxxxxxxxxxxxxxxxxx`
   - Environments: ✅ Production, Preview, Development

   **Variable 3:**
   - Name: `VITE_SHOPIFY_API_VERSION`
   - Value: `2024-01`
   - Environments: ✅ Production, Preview, Development

3. Click **"Save"**

### Step 4: Configure Build Settings

1. Go to **Settings → Build & Development Settings**
2. Verify build command: `npm run build`
3. Verify output directory: `dist`
4. Install command should be: `npm install`
5. Framework: Auto-detect (should be Vite)

### Step 5: Deploy

**Manual Deployment:**

```bash
# Push to main branch to trigger auto-deploy
git push origin master
```

**Or redeploy from dashboard:**

1. Click **"Deployments"** tab
2. Find your deployment
3. Click **"Redeploy"** button

### Step 6: Get Your URL

Your project will be deployed at:
```
https://your-project-name.vercel.app
```

---

## NETLIFY DEPLOYMENT

### Step 1: Create Netlify Account

1. Go to https://netlify.app/
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"**
4. Authorize Netlify
5. Create account

### Step 2: Deploy Your Site

**Option A: Via Git (Recommended)**

1. In Netlify, click **"New site from Git"**
2. Click **"GitHub"**
3. Search and select your repository
4. Click **"Deploy site"**

**Option B: Via CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Step 3: Configure Environment Variables

1. Go to **Site settings → Build & deploy → Environment**
2. Click **"Edit variables"**
3. Add your variables:

   ```
   VITE_SHOPIFY_STORE_URL=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
   VITE_SHOPIFY_API_VERSION=2024-01
   ```

4. Click **"Save"**

### Step 4: Configure Build Settings

1. Go to **Site settings → Build & deploy → Continuous deployment**
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy on push: ✅ Enabled

### Step 5: Test Deployment

1. Netlify automatically deploys when you push to your main branch
2. Check **"Deploys"** tab to see deployment status
3. Once complete, your site is live at:
   ```
   https://your-site-name.netlify.app
   ```

---

## CUSTOM DOMAIN SETUP

### Vercel Custom Domain

1. In Vercel dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `www.nivaranupcyclers.com`
4. Choose connection method:

   **Option A: Update DNS Records (Recommended)**
   - Add CNAME record to your domain provider:
     - Name: `www`
     - Value: `cname.vercel-dns.com`
   - Add A records for root domain:
     - `76.76.19.0`
     - `76.76.19.1`

   **Option B: Change Name Servers**
   - Use Vercel name servers in your domain provider

5. Verify domain in Vercel dashboard

### Netlify Custom Domain

1. In Netlify, go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `www.nivaranupcyclers.com`
4. Choose connection:

   **Option A: Add DNS Records**
   - Go to your domain provider
   - Add CNAME record:
     - Name: `www`
     - Value: `your-netlify-url.netlify.app`

   **Option B: Change Name Servers**
   - Update name servers to Netlify's name servers

5. Verify in Netlify dashboard

### SSL Certificate (Automatic)

Both Vercel and Netlify automatically provide FREE SSL certificates via Let's Encrypt. Your site will be `https://` automatically.

---

## POST-DEPLOYMENT VERIFICATION

### Test 1: Site Loads

```bash
# Check site is accessible
curl https://your-site.vercel.app
```

### Test 2: Shopify Integration Works

1. Visit your deployed site
2. Navigate to `/products`
3. **Should see:**
   - ✅ Products loading
   - ✅ Images displaying
   - ✅ Prices showing correctly

### Test 3: Cart Functionality

1. Add a product to cart
2. Navigate to `/cart`
3. **Should see:**
   - ✅ Cart items displayed
   - ✅ Quantity controls work
   - ✅ Total calculated correctly

### Test 4: Checkout

1. Click "Proceed to Checkout"
2. **Should redirect to Shopify checkout**

### Test 5: Real-Time Updates

1. Add a product in Shopify Admin
2. Clear browser cache
3. Refresh your website
4. **New product should appear within 60 seconds**

### Check Performance

**Vercel Analytics:**
- Go to **Analytics** tab
- Monitor Core Web Vitals
- Check response times

**Netlify Analytics:**
- Go to **Analytics** tab
- Monitor bandwidth usage
- Check deployment logs

---

## TROUBLESHOOTING

### Issue: "Environment Variables Not Found"

**Solution:**
1. Verify variables are added to deployment platform
2. Restart/redeploy:
   - **Vercel:** Push code change or click "Redeploy"
   - **Netlify:** Click "Trigger deploy"
3. Check values exactly match `.env.local`
4. Ensure all 3 variables are set (not just some)

### Issue: "404 on Products Page"

**Solution:**
1. Check routes are configured in your Router
2. Verify `ShopifyProductsPage.tsx` is imported
3. Restart dev server locally, rebuild and redeploy

### Issue: "Products Not Loading (White Page)"

**Solution:**
1. Open DevTools Console (F12)
2. Check for errors:
   - CORS error? Check token is valid
   - API error? Check store URL is correct
   - Token error? Regenerate in Shopify Admin
3. Check Network tab → GraphQL requests
4. Verify environment variables are set on platform

### Issue: "Cart Data Lost on Refresh"

**Solution:**
1. Check localStorage is working:
   - Open DevTools → Application → LocalStorage
   - Should see `shopify_cart_id` entry
2. Verify cart ID is being saved
3. Check useShopifyCart hook is initialized

### Issue: "Images Not Loading"

**Solution:**
1. Check image URLs from Shopify API
2. Verify Shopify image permissions
3. Check CORS headers (Shopify handles this automatically)
4. Try with different image format:
   ```tsx
   getOptimizedImageUrl(url, 300, 300)
   ```

### Issue: "Slow Performance"

**Solution:**
1. Check cache is working:
   ```js
   // In console
   getCacheStats()
   ```
2. Monitor Network tab for large responses
3. Check if images are optimized (should be < 100KB)
4. Verify GraphQL queries are efficient
5. Check Core Web Vitals in platform analytics

### Issue: "Checkout Redirect Fails"

**Solution:**
1. Verify Shopify checkout URL is correct
2. Check cart is created successfully
3. Verify cart ID is saved
4. Try manual checkout URL format:
   ```
   https://your-store.myshopify.com/cart/{checkout-token}
   ```

---

## Monitoring & Maintenance

### Set Up Alerts (Vercel)

1. Go to **Settings → Monitoring**
2. Enable:
   - ✅ Failed builds
   - ✅ Performance issues
   - ✅ Error logs

### Set Up Alerts (Netlify)

1. Go to **Site settings → Notifications**
2. Add notification for:
   - ✅ Deploy failed
   - ✅ Deploy succeeded

### Monthly Maintenance

- [ ] Check deployment logs for errors
- [ ] Monitor analytics for performance
- [ ] Verify Shopify token is still valid
- [ ] Test product updates from Shopify
- [ ] Review cache effectiveness

### Quarterly Updates

- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Test with new Shopify product types
- [ ] Review and optimize GraphQL queries

---

## Deployment Comparison

| Feature | Vercel | Netlify |
|---------|--------|---------|
| **Price** | Free | Free |
| **Performance** | Excellent | Excellent |
| **Edge Functions** | ✅ Yes | Limited |
| **Build Speed** | Fast | Fast |
| **Analytics** | ✅ Built-in | ✅ Built-in |
| **Custom Domain** | ✅ Easy | ✅ Easy |
| **Git Integration** | ✅ GitHub/GitLab/Bitbucket | ✅ GitHub/GitLab/Bitbucket |
| **Environment Vars** | ✅ Easy | ✅ Easy |
| **Redirects/Rewrites** | ✅ Yes | ✅ Yes |
| **Cost (Scale)** | Pay as you go | Pay as you go |

**Recommendation:** Vercel is slightly better for React/Vite projects, but both are excellent choices.

---

## Rollback Deployment

### Vercel Rollback

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **"Redeploy"** button
4. Site reverts to that version

### Netlify Rollback

1. Go to **Deploys** tab
2. Find previous working deployment
3. Click **"Publish deploy"**
4. Site reverts to that version

---

## URL Structure Reference

**Vercel:**
```
Production: https://your-project.vercel.app
Custom: https://www.yourdomain.com
Preview: https://pr-123.your-project.vercel.app
```

**Netlify:**
```
Production: https://your-site-name.netlify.app
Custom: https://www.yourdomain.com
Preview: https://pr-123.your-site-name.netlify.app
```

---

## Summary

✅ **To deploy your Shopify integration:**

1. Prepare: `npm run build` (test locally)
2. Push code to GitHub
3. Create account on Vercel or Netlify
4. Import your Git repository
5. Add environment variables
6. Deploy automatically
7. Get your live URL
8. Test all functionality
9. Set up custom domain (optional)
10. Monitor performance

**Time to deploy:** ~10 minutes  
**Cost:** Free (or pay-as-you-grow)  
**Downtime:** None (CI/CD automated)

---

**Need help?** Check the troubleshooting section above or contact support.

**Last Updated:** November 2024  
**Version:** 1.0
