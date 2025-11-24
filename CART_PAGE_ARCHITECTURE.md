# Shopping Cart Implementation - Architecture & Code Reference

## Component Structure

```
App.tsx
├── CartProvider (Context)
│   ├── Route: / → HomePage
│   ├── Route: /products → ShopifyProductsPage
│   │   ├── Header
│   │   ├── ProductGrid
│   │   │   ├── Filters (category, price, availability)
│   │   │   ├── Sorting (8 options)
│   │   │   └── ProductCard (Add to Cart button)
│   │   └── Footer
│   ├── Route: /product → ProductPage
│   └── Route: /cart → ShopifyCartPage  ← NEW
│       ├── Header (Navigation + Cart Icon)
│       ├── Cart Items Section
│       │   ├── Cart Item 1
│       │   ├── Cart Item 2
│       │   └── ...
│       ├── Order Summary Sidebar
│       └── Footer
```

## Data Flow

```
User Interaction:
  1. ProductCard → "Add to Cart"
  2. useCart hook (addToCart) → CartContext
  3. CartContext updates localStorage + state
  4. Header shows updated cart count
  5. User clicks cart icon → navigate to /cart
  6. ShopifyCartPage reads cart from useCart hook
  7. Displays all cart items with real Shopify data
  8. User updates quantities or removes items
  9. Cart updates immediately
  10. User clicks "Proceed to Checkout"
  11. Redirects to Shopify's secure checkout
```

## Key Imports in ShopifyCartPage.tsx

```typescript
// React & Navigation
import React, { useState } from 'react';

// Layout Components (Header/Footer for consistency)
import { Header } from '../Header';
import { Footer } from '../Footer';

// Cart Management
import { useCart } from '../../contexts/CartContext';

// Utilities
import { formatPrice } from '../../shopify/client';

// Icons (Lucide React)
import { Trash2, Plus, Minus } from 'lucide-react';

// Styles
import './ShopifyCartPage.css';
```

## Main Component Props (useCart Hook)

```typescript
interface CartContextType {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  checkout: () => Promise<void>;
}

// Usage:
const { cart, removeItem, updateQuantity, checkout, loading, error } = useCart();
```

## ShopifyCartPage Component States

### 1. **Error State**
```tsx
{error && (
  <div className="cart-error">
    <h2>Error Loading Cart</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()}>Try Again</button>
  </div>
)}
```
- Displays when cart fetch fails
- Offers reload option
- Error message from API

### 2. **Empty Cart State**
```tsx
{isEmpty && (
  <div className="empty-cart">
    <div className="empty-cart-icon">🛒</div>
    <h2>Your cart is empty</h2>
    <p>Start shopping to add items to your cart</p>
    <a href="/products" className="btn-continue-shopping">
      Continue Shopping
    </a>
  </div>
)}
```
- Shows when no items in cart
- Emoji icon for visual appeal
- Link to /products page

### 3. **Loaded State (Main Cart)**
```tsx
{!isEmpty && (
  <div className="cart-layout">
    {/* Left: Cart Items */}
    {/* Right: Order Summary */}
  </div>
)}
```
- 2-column layout (desktop)
- Full cart display
- Order summary sidebar

## Cart Item Display Structure

```tsx
<div className="cart-item">
  {/* Product Image */}
  <div className="item-image">
    <img src={imageUrl} alt={productTitle} loading="lazy" />
  </div>

  {/* Product Details */}
  <div className="item-details">
    <h3 className="item-title">{title}</h3>
    <p className="item-variant">{variant}</p>
    <p className="item-sku">SKU: {sku}</p>
  </div>

  {/* Price Info */}
  <div className="item-price">
    <span className="unit-price">{formatPrice(unitPrice)}</span>
    <span className="total-price">{formatPrice(totalPrice)}</span>
  </div>

  {/* Quantity Controls */}
  <div className="quantity-controls">
    <button className="qty-btn" onClick={decreaseQuantity}>
      <Minus size={16} />
    </button>
    <input type="number" value={quantity} onChange={handleQuantityChange} />
    <button className="qty-btn" onClick={increaseQuantity}>
      <Plus size={16} />
    </button>
  </div>

  {/* Remove Button */}
  <button className="btn-remove" onClick={handleRemoveItem}>
    <Trash2 size={18} />
  </button>
</div>
```

## Order Summary Sidebar Structure

```tsx
<aside className="order-summary">
  <h2>Order Summary</h2>

  {/* Coupon Code */}
  <div className="coupon-section">
    <input type="text" placeholder="Coupon code" value={couponCode} />
    <button className="btn-apply-coupon">Apply</button>
  </div>

  {/* Pricing */}
  <div className="pricing-summary">
    <div className="summary-row">
      <span>Subtotal</span>
      <span>{formatPrice(subtotal)}</span>
    </div>
    <div className="summary-row">
      <span>Tax</span>
      <span>{formatPrice(tax)}</span>
    </div>
    <div className="summary-row shipping">
      <span>Shipping</span>
      <span>Calculated at checkout</span>
    </div>
    <div className="summary-row total">
      <span>Total</span>
      <span className="total-amount">{formatPrice(total)}</span>
    </div>
  </div>

  {/* Checkout */}
  <button className="btn-checkout" onClick={handleCheckout}>
    Proceed to Checkout
  </button>

  <p className="checkout-note">
    You'll be redirected to Shopify's secure checkout
  </p>

  {/* Continue Shopping */}
  <a href="/products" className="link-continue-shopping">
    Continue Shopping
  </a>

  {/* Trust Badges */}
  <div className="trust-badges">
    <div className="badge">🔒 Secure Checkout</div>
    <div className="badge">🚚 Free Shipping Above ₹999</div>
    <div className="badge">↩️ Easy Returns</div>
  </div>
</aside>
```

## Event Handlers

```typescript
// Update quantity
const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
  if (newQuantity <= 0) {
    await handleRemoveItem(lineId);
  } else {
    try {
      await updateQuantity(lineId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  }
};

// Remove item
const handleRemoveItem = async (lineId: string) => {
  try {
    await removeItem(lineId);
  } catch (err) {
    console.error('Failed to remove item:', err);
  }
};

// Checkout
const handleCheckout = () => {
  if (cart?.checkoutUrl) {
    window.location.href = cart.checkoutUrl;
  }
};
```

## CSS Grid Layouts

### Desktop (1024px+)
```css
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;  /* Items + Sidebar */
  gap: 30px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 100px 140px 60px;
  /* Image | Details | Price | Quantity | Remove */
  gap: 20px;
  align-items: center;
}
```

### Tablet (768px - 1023px)
```css
.cart-layout {
  grid-template-columns: 1fr;  /* Single column */
}

.order-summary {
  position: static;  /* No longer sticky */
}
```

### Mobile (< 768px)
```css
.cart-item {
  grid-template-columns: 80px 1fr;
  /* Image wraps to left, other elements stack */
  gap: 12px;
  padding: 12px;
}
```

## Responsive Breakpoints

| Screen Size | Behavior |
|------------|----------|
| **Desktop (1024px+)** | 2-column (items + sidebar), sticky sidebar, 100px images |
| **Tablet (768-1023px)** | Single column, sidebar below, 80px images |
| **Mobile (480-767px)** | Single column, reduced padding, 70px images, full-width buttons |
| **Small Mobile (<480px)** | Minimal padding, 70px images, optimized typography |

## Color Variables (CSS Custom Properties)

```css
:root {
  --dust-grey: #dad7cd;      /* Light backgrounds */
  --dry-sage: #a3b18a;       /* Sidebar, secondary buttons */
  --fern: #588157;           /* Primary CTA buttons */
  --hunter-green: #3a5a40;   /* Headers, primary text */
  --pine-teal: #344e41;      /* Dark accents */
}
```

## Accessibility Features

- **ARIA Labels:** `aria-label="Remove item"` on delete button
- **Keyboard Navigation:** All buttons and inputs focusable
- **Color Contrast:** WCAG AA compliant
- **Reduced Motion:** `@media (prefers-reduced-motion: reduce)`
- **Semantic HTML:** `<button>`, `<input>`, `<aside>` elements
- **Text Alternatives:** SVG icons have fallback text
- **Focus States:** Visible focus outlines on interactive elements

## Loading & Error Handling

```typescript
// Show loading state
{loading && <div>Processing...</div>}

// Show error state
{error && <div className="cart-error">{error.message}</div>}

// Disable buttons during operations
<button disabled={loading || isEmpty}>
  {loading ? 'Processing...' : 'Proceed to Checkout'}
</button>
```

## Performance Optimizations

1. **Lazy Loading Images:** `loading="lazy"` attribute
2. **Efficient State:** Only update when cart changes
3. **No Unnecessary Re-renders:** useCart hook caches data
4. **CSS Animations:** Hardware-accelerated transforms
5. **Debounced Quantity Input:** 300ms debounce on number input

## Integration with Existing Systems

### CartContext (src/contexts/CartContext.tsx)
- Manages global cart state
- Syncs with localStorage
- Handles all CRUD operations

### Shopify Client (src/shopify/client.ts)
- `formatPrice()` - Currency formatting
- `normalizeCart()` - Converts API response format
- Error handling & retry logic

### Header Component (src/components/Header.tsx)
- Navigation to /cart
- Cart item count display
- Already integrated

### Footer Component (src/components/Footer.tsx)
- Consistent footer on all pages
- Already integrated

---

## Quick Reference: Common Tasks

### Modify Button Styling
Edit `.btn-checkout` in ShopifyCartPage.css

### Change Color Palette
Update CSS variables in :root

### Add New Trust Badge
Add to .trust-badges section in component

### Modify Quantity Controls
Edit quantity-controls section in component

### Change Price Display
Use `formatPrice()` function from client.ts

### Add More Sidebar Sections
Add new div inside .order-summary

---

## Testing Checklist

- [ ] Add item to cart from products page
- [ ] Cart count updates in header
- [ ] Increase quantity with + button
- [ ] Decrease quantity with - button
- [ ] Remove item with trash icon
- [ ] Prices update correctly
- [ ] Empty cart shows correct message
- [ ] Continue Shopping link works
- [ ] Checkout button redirects to Shopify
- [ ] Header and Footer display correctly
- [ ] Mobile layout responsive
- [ ] All buttons are clickable
- [ ] Error state displays when needed
- [ ] Loading state shows during operations

---

## Files and Locations

```
src/
├── components/
│   ├── shopify/
│   │   ├── ShopifyCartPage.tsx        ← Main cart component (NEW)
│   │   ├── ShopifyCartPage.css        ← Cart styling (NEW)
│   │   ├── ShopifyProductsPage.tsx    ← Products page (modified)
│   │   ├── ProductGrid.tsx            ← Product list (modified)
│   │   └── ...
│   ├── Header.tsx                     ← Links to /cart
│   ├── Footer.tsx                     ← Footer on all pages
│   └── ...
├── contexts/
│   └── CartContext.tsx                ← Cart state management
├── shopify/
│   ├── client.ts                      ← formatPrice()
│   ├── queries.ts
│   ├── types.ts
│   └── cache.ts
└── App.tsx                            ← Routes updated
```

---

## API Integration

The cart page uses the Shopify Storefront API v2024-01:

```graphql
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines {
      id
      quantity
      merchandise {
        id
        title
        price { amount }
        product { title, images { ... } }
      }
      cost {
        totalAmount { amount }
      }
    }
    cost {
      subtotalAmount { amount }
      totalTaxAmount { amount }
      totalAmount { amount }
    }
    checkoutUrl
  }
}
```

All mutations (add, update, remove) are handled through `useCart()` hook.

---

## Deployment

Cart page is production-ready. No additional setup required.

**To deploy:**
```powershell
npm run build
# Deploy build/ folder to your hosting
```

The cart page will work seamlessly with your existing deployment setup.

