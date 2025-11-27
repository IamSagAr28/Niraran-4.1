// src/components/shopify/ShopifyProductsPage.tsx
// Full products page with grid, filtering, and cart integration

import React, { useState } from 'react';
import { useShopifyProducts } from '../../hooks/useShopifyProducts';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from '../../utils/Router';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ProductGrid } from './ProductGrid';
import { ArrowLeft } from 'lucide-react';
import './ShopifyProductsPage.css';

export const ShopifyProductsPage: React.FC = () => {
  const { products, loading: productsLoading, error: productsError } =
    useShopifyProducts();
  const { addItem, itemCount } = useCart();
  const { navigateTo } = useRouter();
  const [addingVariantId, setAddingVariantId] = useState<string | null>(null);
  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setInitialCategory(decodeURIComponent(category));
    }
  }, []);

  const handleAddToCart = async (variantId: string) => {
    try {
      setAddingVariantId(variantId);
      await addItem(variantId, 1);
      // Show success toast/notification here
      console.log('✅ Added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Show error notification here
    } finally {
      setAddingVariantId(null);
    }
  };

  const handleViewDetails = (handle: string) => {
    setSelectedHandle(handle);
    // Navigate to product details page
    window.location.href = `/product?handle=${handle}`;
  };

  if (productsError) {
    return (
      <div className="error-state">
        <h2>Failed to load products</h2>
        <p>{productsError.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <Header showCategories={true} />
      <div className="shopify-products-page">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <button
              onClick={() => navigateTo('/')}
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
              Back to Home
            </button>
          </div>
          <h1>Our Products</h1>
          <p>Discover our sustainable product collection</p>
          {itemCount > 0 && (
            <div className="cart-indicator">
              <span className="cart-count">{itemCount}</span>
              <span>items in cart</span>
            </div>
          )}
        </div>

        {productsLoading ? (
          <div className="loading-state">
            <div className="skeleton-grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
            isLoading={addingVariantId !== null}
            showFilters={true}
            showSearch={true}
            initialCategory={initialCategory}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShopifyProductsPage;
