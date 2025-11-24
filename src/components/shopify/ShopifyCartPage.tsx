// src/components/shopify/ShopifyCartPage.tsx
// Complete shopping cart page with checkout integration

import React, { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from '../../utils/Router';
import { formatPrice } from '../../shopify/client';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import './ShopifyCartPage.css';

export const ShopifyCartPage: React.FC = () => {
  const { cart, removeItem, updateQuantity, checkout, loading, error } = useCart();
  const { navigateTo } = useRouter();
  const [couponCode, setCouponCode] = useState('');

  if (error) {
    return (
      <>
        <Header showCategories={true} />
        <div className="cart-error">
          <h2>Error Loading Cart</h2>
          <p>{error.message}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </>
    );
  }

  const isEmpty = !cart || !cart.lines || cart.lines.length === 0;
  const subtotal = cart?.cost?.subtotalAmount?.amount || '0';
  const total = cart?.cost?.totalAmount?.amount || '0';
  const tax = cart?.cost?.totalTaxAmount?.amount || '0';

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

  const handleRemoveItem = async (lineId: string) => {
    try {
      await removeItem(lineId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <>
      <Header showCategories={true} />
      <div className="cart-page">
        <div className="cart-container">
          {isEmpty ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start shopping to add items to your cart</p>
              <a href="/products" className="btn-continue-shopping">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <button
                    onClick={() => navigateTo('/products')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#588157',
                      color: 'white',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3a5a40')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#588157')}
                  >
                    <ArrowLeft size={18} />
                    Back to Products
                  </button>
                </div>
                <h1>Shopping Cart</h1>
                <div className="items-count">
                  {cart.lines.length} item{cart.lines.length !== 1 ? 's' : ''} in cart
                </div>

                <div className="cart-items">
                  {cart.lines.map((line: any) => (
                    <div key={line.id} className="cart-item">
                      {/* Item Image */}
                      <div className="item-image">
                        {line.merchandise?.product?.images?.edges?.[0]?.node?.url && (
                          <img
                            key={`${line.id}-${line.quantity}`}
                            src={line.merchandise.product.images.edges[0].node.url}
                            alt={line.merchandise.product.title}
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="item-details">
                        <h3 className="item-title">
                          {line.merchandise?.product?.title}
                        </h3>
                        {line.merchandise?.title && (
                          <p className="item-variant">{line.merchandise.title}</p>
                        )}
                        <p className="item-sku">
                          SKU: {line.merchandise?.sku || 'N/A'}
                        </p>
                      </div>

                      {/* Item Price */}
                      <div className="item-price">
                        <span className="unit-price">
                          {formatPrice(line.merchandise?.price?.amount)}
                        </span>
                        <span className="total-price">
                          {formatPrice(line.cost?.totalAmount?.amount)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleUpdateQuantity(line.id, line.quantity - 1)
                          }
                          disabled={loading}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={line.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(line.id, parseInt(e.target.value) || 1)
                          }
                          className="qty-input"
                          min="1"
                        />
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleUpdateQuantity(line.id, line.quantity + 1)
                          }
                          disabled={loading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(line.id)}
                        disabled={loading}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <aside className="order-summary">
                <h2>Order Summary</h2>

                {/* Coupon Code */}
                <div className="coupon-section">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button className="btn-apply-coupon" disabled={!couponCode}>
                    Apply
                  </button>
                </div>

                {/* Pricing Summary */}
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

                {/* Checkout Button */}
                <button
                  className="btn-checkout"
                  onClick={handleCheckout}
                  disabled={loading || isEmpty}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
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
                  <div className="badge">
                    <span>🔒</span> Secure Checkout
                  </div>
                  <div className="badge">
                    <span>🚚</span> Free Shipping Above ₹999
                  </div>
                  <div className="badge">
                    <span>↩️</span> Easy Returns
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopifyCartPage;
