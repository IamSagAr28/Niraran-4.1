import React from 'react';
import { Router, Route } from './utils/Router.jsx';
import HomePage from './components/HomePage.jsx';
import Dashboard from './components/DashboardV2';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProductPage from './components/ProductPage';
import ShopifyProductsPage from './components/shopify/ShopifyProductsPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ShippingPage from './components/ShippingPage';
import TrackOrderPage from './components/TrackOrderPage';
import { ShopifyCartPage } from './components/shopify/ShopifyCartPage';
import ShopifyLoginPage from './components/shopify/ShopifyLoginPage';
import ShopPage from './components/shop/ShopPage';
import ShopCartPage from './components/shop/ShopCartPage';
import MembershipPage from './components/MembershipPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShopCartProvider } from './contexts/ShopCartContext';

// Check for required environment variables
const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <ShopCartProvider>
          <Router fallback={<NotFoundPage />}>
            <Route path="/" component={HomePage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/products" component={ShopifyProductsPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/cart" component={ShopifyCartPage} />
            <Route path="/login" component={ShopifyLoginPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/shop-cart" component={ShopCartPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/track-order" component={TrackOrderPage} />
            <Route path="/membership" component={MembershipPage} />
          </Router>
        </ShopCartProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
