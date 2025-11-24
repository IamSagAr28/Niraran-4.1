import React from 'react';
import { Router, Route } from './utils/Router.jsx';
import HomePage from './components/HomePage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProductPage from './components/ProductPage';
import ShopifyProductsPage from './components/shopify/ShopifyProductsPage';
import { ShopifyCartPage } from './components/shopify/ShopifyCartPage';
import ShopifyLoginPage from './components/shopify/ShopifyLoginPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router fallback={<NotFoundPage />}>
          <Route path="/" component={HomePage} />
          <Route path="/products" component={ShopifyProductsPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/cart" component={ShopifyCartPage} />
          <Route path="/login" component={ShopifyLoginPage} />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
