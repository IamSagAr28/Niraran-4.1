// src/contexts/CartContext.tsx
// Global cart state management using React Context

import React, { createContext, useContext, ReactNode } from 'react';
import { useShopifyCart } from '../hooks/useShopifyCart';
import type { ShopifyCart } from '../shopify/types';

interface CartContextType {
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

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartState = useShopifyCart();

  // Debug log to ensure provider is rendering and value is present
  // console.log('CartProvider rendering, value:', cartState);

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    console.warn('useCart must be used within CartProvider. Using fallback context.');
    return {
      cart: null,
      loading: false,
      error: null,
      addItem: async () => console.warn('addItem called without provider'),
      updateQuantity: async () => console.warn('updateQuantity called without provider'),
      removeItem: async () => console.warn('removeItem called without provider'),
      checkout: () => console.warn('checkout called without provider'),
      itemCount: 0,
      subtotal: '0'
    };
  }
  return context;
};

export default CartContext;
