// src/components/shopify/CartSummary.tsx
// Display cart items and checkout

import React from 'react';
import type { ShopifyCart } from '../../shopify/types';
import { formatPrice, getOptimizedImageUrl } from '../../shopify/client';
import './CartSummary.css';

interface CartSummaryProps {
  cart: ShopifyCart | null;
  onRemoveItem?: (lineId: string) => Promise<void>;
  onUpdateQuantity?: (lineId: string, quantity: number) => Promise<void>;
  onCheckout?: () => void;
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isLoading = false,
}) => {
  const itemCount = cart
    ? cart.lines.reduce((sum: number, line: any) => sum + line.quantity, 0)
    : 0;

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-state">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="item-count">{itemCount} items</span>
      </div>

      <div className="cart-items">
        {cart.lines.map((line: any) => {
          const product = line.merchandise.product;
          const image = product.images.edges[0]?.node;
          const total = parseFloat(line.cost.totalAmount.amount);

          return (
            <div key={line.id} className="cart-item">
              {image && (
                <div className="cart-item-image">
                  <img
                    src={getOptimizedImageUrl(image.url, 100, 100)}
                    alt={image.altText || product.title}
                  />
                </div>
              )}

              <div className="cart-item-details">
                <h3>{product.title}</h3>
                <p className="variant-info">{line.merchandise.title}</p>
                <p className="price">
                  {formatPrice(line.merchandise.price.amount)} each
                </p>
              </div>

              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    onUpdateQuantity && onUpdateQuantity(line.id, line.quantity - 1)
                  }
                  disabled={isLoading || line.quantity <= 1}
                  className="qty-btn"
                >
                  −
                </button>
                <span>{line.quantity}</span>
                <button
                  onClick={() =>
                    onUpdateQuantity && onUpdateQuantity(line.id, line.quantity + 1)
                  }
                  disabled={isLoading}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <p className="total-amount">{formatPrice(total.toString())}</p>
              </div>

              <button
                onClick={() => onRemoveItem && onRemoveItem(line.id)}
                disabled={isLoading}
                className="remove-btn"
                title="Remove from cart"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>{formatPrice(cart.cost.subtotalAmount.amount)}</span>
        </div>
        <div className="total-row">
          <span>Tax</span>
          <span>{formatPrice(cart.cost.totalTaxAmount.amount)}</span>
        </div>
        <div className="total-row total">
          <span>Total</span>
          <span>{formatPrice(cart.cost.totalAmount.amount)}</span>
        </div>
      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={!cart || cart.lines.length === 0 || isLoading}
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </button>

      <p className="checkout-note">
        You'll be redirected to Shopify's secure checkout
      </p>
    </div>
  );
};

export default CartSummary;
