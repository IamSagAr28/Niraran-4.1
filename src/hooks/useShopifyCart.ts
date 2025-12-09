// src/hooks/useShopifyCart.ts
// Custom hook for managing Shopify cart state and operations

import { useState, useCallback, useEffect } from 'react';
import type { ShopifyCart, ShopifyVariant } from '../shopify/types';
import {
  createCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  fetchCart,
} from '../shopify/client';
import { safeLocalStorage } from '../utils/storage';

const CART_ID_KEY = 'shopify_cart_id';

interface UseShopifyCartState {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
  itemCount: number;
  subtotal: string;
}

export function useShopifyCart(): UseShopifyCartState {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize or recover cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setLoading(true);
        const savedCartId = safeLocalStorage.getItem(CART_ID_KEY);

        let cartData: ShopifyCart | null = null;

        if (savedCartId) {
          // Try to recover existing cart
          cartData = await fetchCart(savedCartId);
        }

        if (!cartData) {
          // Create new cart if none exists or recovery failed
          cartData = await createCart();
          safeLocalStorage.setItem(CART_ID_KEY, cartData.id);
        }

        setCart(cartData);
      } catch (err) {
        console.error('Failed to initialize cart:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize cart'));
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cart) {
        throw new Error('Cart not initialized');
      }

      try {
        setError(null);
        const updatedCart = await addToCart(cart.id, [
          { variantId, quantity },
        ]);
        setCart(updatedCart);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to add item to cart');
        setError(error);
        throw error;
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) {
        throw new Error('Cart not initialized');
      }

      try {
        setError(null);

        if (quantity <= 0) {
          // If quantity is 0 or negative, remove the item
          const updatedCart = await removeFromCart(cart.id, [lineId]);
          setCart(updatedCart);
        } else {
          const updatedCart = await updateCartLines(cart.id, [
            { id: lineId, quantity },
          ]);
          setCart(updatedCart);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update cart');
        setError(error);
        throw error;
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) {
        throw new Error('Cart not initialized');
      }

      try {
        setError(null);
        const updatedCart = await removeFromCart(cart.id, [lineId]);
        setCart(updatedCart);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to remove item');
        setError(error);
        throw error;
      }
    },
    [cart]
  );

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart]);

  const itemCount = cart && cart.lines && Array.isArray(cart.lines)
    ? cart.lines.reduce((sum: number, line: any) => sum + (line.quantity || 0), 0)
    : 0;

  const subtotal = cart?.cost?.subtotalAmount?.amount || '0';

  return {
    cart,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    checkout,
    itemCount,
    subtotal,
  };
}

/**
 * Calculate savings from compare-at prices
 */
export function calculateSavings(variant: ShopifyVariant): {
  amount: string;
  percentage: number;
} | null {
  if (!variant.compareAtPrice) {
    return null;
  }

  const comparePrice = parseFloat(variant.compareAtPrice.amount);
  const currentPrice = parseFloat(variant.price.amount);

  if (comparePrice <= currentPrice) {
    return null;
  }

  const savings = comparePrice - currentPrice;
  const percentage = Math.round((savings / comparePrice) * 100);

  return {
    amount: savings.toFixed(2),
    percentage,
  };
}
