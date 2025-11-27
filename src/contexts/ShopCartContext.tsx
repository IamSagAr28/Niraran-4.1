import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '../data/products';

interface ShopCartContextType {
  cart: (Product & {qty:number})[];
  setCart: React.Dispatch<React.SetStateAction<(Product & {qty:number})[]>>;
  addToCart: (product: Product) => void;
}

const ShopCartContext = createContext<ShopCartContextType | undefined>(undefined);

export const ShopCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<(Product & {qty:number})[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i);
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  return (
    <ShopCartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </ShopCartContext.Provider>
  );
};

export const useShopCart = (): ShopCartContextType => {
  const context = useContext(ShopCartContext);
  if (!context) {
    throw new Error('useShopCart must be used within ShopCartProvider');
  }
  return context;
};
