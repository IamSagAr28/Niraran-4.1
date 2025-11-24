# 🚀 SHOPIFY INTEGRATION - STEP-BY-STEP SETUP GUIDE

## Phase 1: Environment Setup (5 minutes)

### Step 1.1: Create Shopify Storefront Access Token

**In your Shopify Admin:**

1. Go to: **Settings → Apps and integrations → Develop apps**
2. Click **"Create an app"**
3. Enter name: `Nivaran Frontend`
4. Click **"Create app"**
5. Go to **"Configuration"** tab
6. Click **"Configuration"** again (left sidebar)
7. Under **Admin API access scopes**, enable:
   - ✅ `read_products`
   - ✅ `read_collections`
   - ✅ `read_product_listings`

8. Click **"Save"**
9. Go to **"API credentials"** tab
10. Scroll to **"Storefront API"**
11. Click **"Create storefront access token"**
12. **Copy and save this token** (you'll need it next)

### Step 1.2: Get Your Store URL

- Your store URL format: `your-store.myshopify.com`
- Found in Shopify Admin under **Settings → General**

### Step 1.3: Create Environment Variables

**Create file:** `.env.local` in your project root

```env
# Shopify Storefront API Configuration
VITE_SHOPIFY_STORE_URL=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
VITE_SHOPIFY_API_VERSION=2024-01
```

⚠️ **Replace with YOUR actual values!**

### Step 1.4: Install Dependencies

```bash
cd c:\Users\sagar\OneDrive\Desktop\newN\nivaran3.1
npm install graphql-request
```

---

## Phase 2: Code Integration (10 minutes)

### Step 2.1: Update App.tsx to Use Cart Provider

**File:** `src/App.tsx`

```tsx
import React from 'react';
import { Router, Route } from './utils/Router.jsx';
import HomePage from './components/HomePage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './contexts/CartContext';
import { initCacheCleanup } from './shopify/cache';

// Initialize cache cleanup on app startup
initCacheCleanup();

export default function App() {
  return (
    <CartProvider>
      <Router fallback={<NotFoundPage />}>
        <Route path="/" component={HomePage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/cart" component={CartPage} />
      </Router>
    </CartProvider>
  );
}
```

### Step 2.2: Create Products Route

**File:** `src/components/ShopifyProductsPage.tsx` (new file)

Copy from the `ShopifyProductsPage.tsx` provided above.

### Step 2.3: Create Cart Route

**File:** `src/components/ShopifyCartPage.tsx` (new file)

Copy from the `ShopifyCartPage.tsx` provided above.

### Step 2.4: Add Routes to Router

Update your `Router.jsx` or routing logic to include:

```jsx
<Route path="/products" component={ShopifyProductsPage} />
<Route path="/cart" component={ShopifyCartPage} />
```

---

## Phase 3: Testing (5 minutes)

### Test 1: Verify Connection

1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. You should see: `✅ Shopify connected to: [Your Store Name]`

If not, check:
- ✅ Environment variables are set
- ✅ Token is valid
- ✅ Store URL is correct

### Test 2: Load Products

1. Navigate to `/products` page
2. Should see loading state then products
3. Check Network tab → Should see GraphQL queries

### Test 3: Add to Cart

1. Click "Add to Cart" on a product
2. Item count badge should increase
3. Navigate to `/cart`
4. Should see your items in cart

### Test 4: Update Shopify & Verify Sync

1. **In Shopify Admin:**
   - Add a new product
   - Edit existing product price
   - Or create a collection

2. **On your frontend:**
   - Clear localStorage (F12 → Application → Clear Storage)
   - Refresh page
   - New data should appear automatically within 60 seconds

### Test 5: Checkout

1. Click "Proceed to Checkout"
2. Should redirect to Shopify checkout
3. Complete a test order (use test payment info)

---

## Phase 4: Customization & Integration

### Update Cart Display in Header

**Add to your Header component:**

```tsx
import { useCart } from '../contexts/CartContext';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header>
      {/* ... other header content ... */}
      <a href="/cart" className="cart-link">
        🛒 Cart {itemCount > 0 && <span className="badge">{itemCount}</span>}
      </a>
    </header>
  );
}
```

### Add Product Search Page

Use the `searchProducts()` function:

```tsx
import { searchProducts } from '../shopify/client';

async function handleSearch(query: string) {
  const results = await searchProducts(query);
  setSearchResults(results);
}
```

### Customize Product Grid

**Props available:**

```tsx
<ProductGrid
  products={products}
  onAddToCart={(variantId) => {}}
  onViewDetails={(handle) => {}}
  isLoading={false}
  showFilters={true}      // Toggle tag filters
  showSearch={true}       // Toggle search bar
/>
```

### Implement Product Detail Page

Create `src/components/ShopifyProductDetailPage.tsx`:

```tsx
import { useShopifyProductDetail } from '../hooks/useShopifyProducts';
import ProductDetails from '../components/shopify/ProductDetails';
import { useCart } from '../contexts/CartContext';

export function ProductDetailPage({ handle }: { handle: string }) {
  const { product, loading } = useShopifyProductDetail(handle);
  const { addItem } = useCart();

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ProductDetails
      product={product}
      onAddToCart={async (variantId, quantity) => {
        await addItem(variantId, quantity);
        // Show success toast
      }}
    />
  );
}
```

---

## Phase 5: Optimization & Caching

### Cache Strategy (Already Implemented)

- **Products:** Cached for 60 seconds
- **Collections:** Cached for 10 minutes
- **Shop Info:** Cached for 1 hour
- **Cart:** Never cached (always fresh)
- **Search:** Never cached (real-time)

### Manual Cache Control

```tsx
import { clearAllCache, invalidateCache } from '../shopify/cache';

// Clear all Shopify cache
clearAllCache();

// Invalidate specific cache
invalidateCache('GetProducts', { first: 50 });
```

### Monitor Cache

```tsx
import { getCacheStats } from '../shopify/cache';

const stats = getCacheStats();
console.log('Cache stats:', stats);
// { memoryCacheSize: 3, storageCacheSize: 5, storageKeys: [...] }
```

---

## Phase 6: Production Deployment

### Build Project

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**In Vercel Dashboard:**

1. Go to **Settings → Environment Variables**
2. Add your Shopify variables:
   - `VITE_SHOPIFY_STORE_URL`
   - `VITE_SHOPIFY_STOREFRONT_TOKEN`
   - `VITE_SHOPIFY_API_VERSION`

3. Redeploy

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**In Netlify Dashboard:**

1. Go to **Site settings → Build & deploy → Environment**
2. Add your Shopify variables
3. Trigger redeploy

---

## Phase 7: Client Handover

### What Your Client Needs to Know

✅ **They manage products in Shopify Admin:**
- Add products
- Update prices
- Manage inventory
- Upload images
- Create collections

✅ **Website updates automatically:**
- No code changes needed
- Updates visible within 60 seconds
- Images optimized automatically

✅ **For support:**
- Show them Shopify Admin location
- Explain collections/tags for filtering
- Provide your contact for technical issues

### Client Checklist

- ✅ Can log into Shopify Admin
- ✅ Can add/edit/delete products
- ✅ Products appear on website within 60 seconds
- ✅ Cart checkout works
- ✅ Can access support contact

---

## Phase 8: Maintenance

### Quarterly Tasks

- [ ] Check token is still valid
- [ ] Review cache hit rates
- [ ] Test with new product types
- [ ] Monitor API response times

### Annual Tasks

- [ ] Update Shopify API version (if new version released)
- [ ] Review and optimize GraphQL queries
- [ ] Update dependencies
- [ ] Renew token if needed

### Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Products not loading | Check network tab, verify token |
| Images broken | Check image URLs in Shopify, use imageOptimization utils |
| Cart not syncing | Ensure VITE_SHOPIFY variables are set, restart dev server |
| Checkout fails | Verify cart ID saved in localStorage |
| Search not working | Check if search query is valid, use searchProducts() |

---

## Code Reference

### Import Statements

```tsx
// API Client
import { fetchProducts, createCart, addToCart } from '../shopify/client';

// Hooks
import { useShopifyProducts, useShopifyProductDetail } from '../hooks/useShopifyProducts';
import { useShopifyCart } from '../hooks/useShopifyCart';

// Components
import ProductCard from '../components/shopify/ProductCard';
import ProductGrid from '../components/shopify/ProductGrid';
import ProductDetails from '../components/shopify/ProductDetails';
import CartSummary from '../components/shopify/CartSummary';

// Context
import { CartProvider, useCart } from '../contexts/CartContext';

// Utilities
import { optimizeShopifyImage, formatPrice } from '../shopify/client';
import { clearAllCache, invalidateCache } from '../shopify/cache';
```

### Common API Calls

```tsx
// Get all products
const products = await fetchProducts(100);

// Get single product
const product = await fetchProductByHandle('my-product-slug');

// Get collections
const collections = await fetchCollections();

// Create cart
const cart = await createCart();

// Add to cart
const updatedCart = await addToCart(cartId, [{ variantId, quantity: 1 }]);

// Search
const results = await searchProducts('eco-friendly');
```

---

## File Structure

```
src/
├── shopify/
│   ├── client.ts           ← Main API client
│   ├── queries.ts          ← GraphQL queries
│   ├── types.ts            ← TypeScript types
│   └── cache.ts            ← Caching logic
├── hooks/
│   ├── useShopifyProducts.ts
│   └── useShopifyCart.ts
├── contexts/
│   └── CartContext.tsx     ← Global cart state
├── components/shopify/
│   ├── ProductCard.tsx     ← Single product card
│   ├── ProductGrid.tsx     ← Product grid with filters
│   ├── ProductDetails.tsx  ← Product detail page
│   ├── CartSummary.tsx     ← Cart display
│   ├── ShopifyProductsPage.tsx
│   └── ShopifyCartPage.tsx
├── utils/
│   └── imageOptimization.ts
└── App.tsx                 ← Wrap with CartProvider
```

---

## Summary

✅ **What you've built:**
- Real-time product sync from Shopify
- Shopping cart with persistence
- Secure checkout redirect
- Automatic image optimization
- Smart caching system
- Zero-maintenance for your client

✅ **Next steps:**
1. Generate Shopify token
2. Create `.env.local` file
3. Run `npm install graphql-request`
4. Update `App.tsx`
5. Test all functionality
6. Deploy to Vercel/Netlify
7. Handover to client

---

**Questions?** Check SHOPIFY_INTEGRATION_GUIDE.md for detailed information.

**Last Updated:** November 2024  
**Version:** 1.0
