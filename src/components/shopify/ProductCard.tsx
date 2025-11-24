// src/components/shopify/ProductCard.tsx
// Reusable component for displaying a product in grid/list

import React from 'react';
import type { ShopifyProduct } from '../../shopify/types';
import { formatPrice, getOptimizedImageUrl } from '../../shopify/client';
import './ProductCard.css';

interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart?: (variantId: string) => void;
  onViewDetails?: (handle: string) => void;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  isLoading = false,
}) => {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const hasVariants = product.variants.edges.length > 1;
  const isOnSale =
    firstVariant?.compareAtPrice &&
    parseFloat(firstVariant.compareAtPrice.amount) >
      parseFloat(firstVariant.price.amount);

  const handleAddToCart = () => {
    if (firstVariant && onAddToCart) {
      onAddToCart(firstVariant.id);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.handle);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        {firstImage && (
          <img
            src={getOptimizedImageUrl(firstImage.url, 400, 400)}
            alt={firstImage.altText || product.title}
            className="product-image"
            loading="lazy"
          />
        )}
        {isOnSale && <span className="sale-badge">Sale</span>}
        {!firstVariant?.availableForSale && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
      </div>

      <div className="product-card-content">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-price">
          {minPrice === maxPrice ? (
            <span className="price">{formatPrice(minPrice)}</span>
          ) : (
            <span className="price-range">
              {formatPrice(minPrice)} — {formatPrice(maxPrice)}
            </span>
          )}
          {isOnSale && firstVariant?.compareAtPrice && (
            <span className="compare-price">
              {formatPrice(firstVariant.compareAtPrice.amount)}
            </span>
          )}
        </div>

        {hasVariants && (
          <div className="variant-count">
            {product.variants.edges.length} options
          </div>
        )}

        <p className="product-vendor">{product.vendor}</p>

        <div className="product-card-actions">
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleViewDetails}
            disabled={isLoading}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
