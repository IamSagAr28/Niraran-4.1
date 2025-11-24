# ⚡ QUICK START - SHOPIFY INTEGRATION (5 MINUTES)

**🎯 Goal:** Get Shopify products on your website  
**⏱️ Time:** 5 minutes  
**📋 Difficulty:** Easy  

---

## Step 1: Generate Shopify Token (2 minutes)

### In Shopify Admin:

1. Go to: **Settings → Apps and integrations → Develop apps**
2. Click **"Create an app"** → Name it `"Nivaran Frontend"`
3. Go to **Configuration** → Enable scopes:
   - ✅ `read_products`
   - ✅ `read_collections`
   - ✅ `read_product_listings`
4. **Save**
5. Go to **API credentials** → Find **"Storefront API"**
6. Click **"Create storefront access token"**
7. **Copy the token** (you'll paste it next)

---

## Step 2: Create .env.local File (1 minute)

Create file: `.env.local` in your project root

```env
VITE_SHOPIFY_STORE_URL=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
VITE_SHOPIFY_API_VERSION=2024-01
```

⚠️ **Replace `your-store` with YOUR actual store URL and token from Step 1**

---

## Step 3: Install Dependency (1 minute)

```bash
npm install graphql-request
```

---

## Step 4: Start & Test (1 minute)

```bash
# Start dev server
npm run dev

# In another terminal, test connection
# Open browser console and run:
# validateShopifyConnection()
```

You should see: ✅ "Shopify connected to: [Your Store Name]"

---

## Step 5: Use Components (Already Done!)

All components are ready in `src/components/shopify/`:

```tsx
// Display products
import ShopifyProductsPage from './components/shopify/ShopifyProductsPage';

// Display cart
import ShopifyCartPage from './components/shopify/ShopifyCartPage';

// In your App.tsx, wrap with CartProvider:
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      {/* Your routes */}
    </CartProvider>
  );
}
```

---

## That's It! 🎉

Your Shopify integration is ready to use!

### Test It:

1. Add products in Shopify Admin
2. Visit `/products` on your website
3. Products appear automatically!
4. Try adding to cart
5. Checkout redirects to Shopify

---

## Next Steps:

📖 **Read Full Guides:**
- `SETUP_INSTRUCTIONS.md` - Detailed setup
- `SHOPIFY_INTEGRATION_GUIDE.md` - Technical reference
- `DEPLOYMENT_GUIDE.md` - Deploy to production
- `CLIENT_HANDOVER.md` - For your client

---

## Troubleshooting:

| Problem | Fix |
|---------|-----|
| "Token not found" | Check .env.local is created in project root |
| Products not loading | Verify token is valid, restart `npm run dev` |
| Build errors | Run `npm install graphql-request` |
| Cart not working | Make sure CartProvider wraps your app |

---

**Questions?** Check the full documentation files above!
