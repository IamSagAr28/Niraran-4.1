# 🛍️ Shopify Storefront API Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Token Generation](#token-generation)
5. [Implementation Details](#implementation-details)
6. [Folder Structure](#folder-structure)
7. [Testing Guide](#testing-guide)
8. [Maintenance & Handover](#maintenance--handover)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This integration connects your **React + TypeScript + Vite** frontend to **Shopify Storefront API** for zero-maintenance product management. When your client updates products in Shopify, changes are reflected instantly on your frontend without code changes.

### Key Features
✅ **Real-time Product Sync** - No manual updates needed  
✅ **Headless Commerce** - Independent frontend and backend  
✅ **Automatic Caching** - 60-second cache for performance  
✅ **Image Optimization** - Automatic Shopify image resizing  
✅ **Variant Handling** - Full support for product variants  
✅ **Cart Management** - Persistent cart system  
✅ **Checkout Redirect** - Direct to Shopify checkout  
✅ **SEO-Friendly** - Dynamic meta tags  
✅ **Mobile Optimized** - Responsive design  
✅ **Zero Admin API Exposure** - Only Storefront tokens used  

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Frontend (React)                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            React Components                          │   │
│  │ ┌─────────────────────────────────────────────────┐ │   │
│  │ │ ProductGrid │ ProductCard │ ProductDetails │    │ │   │
│  │ │ VariantSelector │ CartButton │ CheckoutFlow │  │ │   │
│  │ └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      Shopify API Client Layer                        │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ shopifyClient.ts (GraphQL Queries)              │ │   │
│  │  │ - fetchProducts()                               │ │   │
│  │  │ - fetchProductDetails()                         │ │   │
│  │  │ - fetchCollections()                            │ │   │
│  │  │ - createCart()                                  │ │   │
│  │  │ - updateCart()                                  │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      Caching Layer (LocalStorage + Memory)           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SHOPIFY STOREFRONT API (GraphQL)                            │
│                                                               │
│  Endpoint: https://YOUR_STORE.myshopify.com/api/2024-01    │
│  Authentication: Storefront Access Token                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup Instructions

### Step 1: Create a Shopify Store (if not already done)
1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Create a development store or use existing store
3. Note down your store domain (e.g., `mystore.myshopify.com`)

### Step 2: Generate Storefront Access Token

#### In Shopify Admin Dashboard:

1. **Log in** to your Shopify Admin
2. Navigate to: **Settings → Apps and integrations → Develop apps**
3. Click **"Create an app"**
4. Enter app name: `"Nivaran Frontend"`
5. Click **"Create app"**
6. Go to **Configuration** tab
7. Under **Admin API access scopes**, enable:
   - `read_products`
   - `read_collections`
   - `read_product_listings`
   - `read_shop`
   - `read_customer_addresses` (if implementing customer accounts)

8. Click **"Save"**
9. Go to the **API Credentials** tab
10. Scroll down to **Storefront API access tokens**
11. Click **"Create storefront access token"**
12. Copy the generated token (you'll need it shortly)
13. Copy your store URL: `mystore.myshopify.com`

### Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Shopify Storefront API
VITE_SHOPIFY_STORE_URL=mystore.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
VITE_SHOPIFY_API_VERSION=2024-01
```

**Important:** 
- ✅ Only use **Storefront** tokens in the frontend
- ❌ NEVER expose Admin API keys
- `VITE_` prefix allows Vite to expose these to the client safely (they're already public on the frontend)

### Step 4: Install Dependencies

```bash
npm install graphql-request
npm install --save-dev @types/node
```

### Step 5: Verify Token Permissions

Token needs these scopes:
- `read_products` - Fetch product catalog
- `read_collections` - Fetch product collections
- `read_product_listings` - List products
- `read_shop` - Get shop info (name, currency)

---

## Token Generation - Detailed Instructions

### Why Storefront Tokens?
- ✅ Safe to use in frontend code (client-side)
- ✅ Limited to customer-facing operations (products, carts, checkout)
- ✅ Cannot modify store settings or access sensitive data
- ❌ Admin API tokens would expose dangerous operations

### GraphQL Query to Test Token

```graphql
query {
  shop {
    name
    description
    primaryDomain {
      url
    }
  }
}
```

If this returns successfully, your token is valid.

---

## Implementation Details

### Folder Structure After Setup

```
src/
├── shopify/
│   ├── client.ts              # Main Shopify API client
│   ├── queries.ts             # GraphQL queries
│   ├── types.ts               # TypeScript interfaces
│   └── cache.ts               # Caching utilities
├── components/
│   ├── shopify/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── VariantSelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   └── CartSummary.tsx
│   ├── ProductPage.tsx        # Updated with Shopify data
│   └── CartPage.tsx           # Updated with Shopify cart
├── hooks/
│   ├── useShopifyProducts.ts
│   ├── useShopifyCart.ts
│   └── useProductDetails.ts
├── contexts/
│   └── CartContext.tsx        # Global cart state
├── styles/
│   └── shopify.css            # Shopify-specific styles
└── utils/
    └── imageOptimization.ts   # Shopify image URL handling
```

### Data Flow

1. **Page Load** → Check cache
2. **Cache Miss** → Call Shopify API
3. **Fetch Success** → Cache + Update UI
4. **User Action** (add to cart) → Update local cart + sync to Shopify
5. **Checkout** → Redirect to Shopify checkout with cart token

### API Response Caching Strategy

```
Cache Duration: 60 seconds
Storage: localStorage + memory
Invalidation: On user action, manual refresh, or timeout

Product data: Cached aggressively (users rarely refresh product list)
Cart data: Not cached (always fresh)
Collections: Cached per session
Product details: Cached per product ID
```

---

## Testing Guide

### 1. **Test Token Connection**
```bash
# In browser console:
# If setup correctly, this should return your shop name
```

### 2. **Test Product Fetching**
- Check DevTools Network tab
- Verify API response contains products
- Check cache in localStorage

### 3. **Test Variant Selection**
- Click different product variants
- Verify price and availability updates

### 4. **Test Cart Operations**
- Add products to cart
- Verify cart count updates
- Check localStorage for cart persistence

### 5. **Test Checkout**
- Click "Checkout"
- Should redirect to Shopify checkout
- Verify cart items appear in Shopify

### 6. **Test Real Updates (in Shopify Admin)**
- Add a new product in Shopify
- Update product price
- Delete a product
- Clear frontend cache (localStorage)
- Refresh page
- Verify changes appear

---

## Maintenance & Handover

### For Your Client (Shopify Admin)

**They Only Need to:**
1. Update products in Shopify Admin
2. No need to update website code
3. Products appear automatically within 60 seconds

**Client Checklist:**
- ✅ Can add products in Shopify? → Go to Products → Add Product
- ✅ Can edit prices? → Click product → Edit price
- ✅ Can add variants? → Product → Variants → Add variant
- ✅ Can upload images? → Product → Add images
- ✅ Can delete products? → Product menu → Delete
- ✅ Products visible on website within 60 seconds? → Yes, automatic

### For You (Maintenance)

**Monitor:**
1. API token expiration (annual renewal in Shopify admin)
2. Cache effectiveness (check performance metrics)
3. Shopify API version updates (check quarterly)
4. Error logs for failed API calls

**Quarterly Checks:**
- Verify token is still valid
- Check Shopify API changelog for breaking changes
- Test with new product types (if client adds them)

**Annual Tasks:**
- Update API version if Shopify releases new version
- Review and optimize GraphQL queries
- Update React/TypeScript dependencies

---

## Troubleshooting

### Issue: "Token not found" Error
**Solution:** 
- Check `.env.local` file exists
- Verify `VITE_SHOPIFY_STOREFRONT_TOKEN` is set
- Check you're using Storefront token, not Admin token
- Restart dev server after changing `.env.local`

### Issue: Products Not Loading
**Solution:**
1. Open DevTools → Network tab
2. Check GraphQL request response
3. If 401 error: Token is invalid/expired
4. If 400 error: Check query syntax
5. If timeout: Network issue or API is slow

### Issue: Cart Not Persisting
**Solution:**
- Check localStorage is not full
- Check CartContext is properly provided
- Verify checkoutUrl is being saved

### Issue: Images Not Loading
**Solution:**
- Shopify images require `?` for query params
- Use imageOptimization utility (provided)
- Check image URL format in response

---

## Security Checklist

✅ Using only Storefront API tokens  
✅ No Admin API keys in frontend  
✅ Tokens not hardcoded (using env vars)  
✅ No sensitive customer data stored  
✅ CORS handled by Shopify (transparent to you)  
✅ Cart tokens generated per session  
✅ Checkout handled by Shopify (PCI compliant)  

---

## Support & Escalation

- **API Issues**: Check [Shopify API Docs](https://shopify.dev/api/storefront)
- **Token Issues**: Regenerate in Shopify Admin
- **Performance**: Check cache settings in `cache.ts`
- **Deployment**: See Netlify/Vercel section

---

## Cost Implications

✅ **Storefront API**: FREE  
✅ **Your Frontend Hosting**: Your cost (Netlify/Vercel free tier available)  
✅ **Shopify Plan**: Your existing plan  
❌ **No additional Shopify charges**

---

## Next Steps

1. ✅ Generate Storefront token (follow Step 2 above)
2. ✅ Create `.env.local` with token
3. ✅ Follow code implementation sections below
4. ✅ Run `npm install` for new dependencies
5. ✅ Start dev server: `npm run dev`
6. ✅ Test with a product in Shopify
7. ✅ Deploy to Netlify/Vercel

---

**Last Updated:** November 2024  
**Version:** 1.0  
**API Version:** 2024-01
