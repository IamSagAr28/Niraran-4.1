// src/components/shopify/ProductDetails.tsx
// Detailed product page with variant selection and add to cart

import React, { useState, useMemo } from 'react';
import type { ShopifyProduct, ShopifyVariant } from '../../shopify/types';
import { formatPrice, getOptimizedImageUrl } from '../../shopify/client';
import { calculateSavings } from '../../hooks/useShopifyCart';
import './ProductDetails.css';

interface ProductDetailsProps {
  product: ShopifyProduct;
  onAddToCart?: (variantId: string, quantity: number) => Promise<void>;
  isLoading?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  isLoading = false,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(
    product.variants.edges[0]?.node || null
  );
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const savings = useMemo(
    () => (selectedVariant ? calculateSavings(selectedVariant) : null),
    [selectedVariant]
  );

  const availableVariants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[mainImageIndex];

  // Group variants by their first option for variant selection
  const variantOptions = useMemo(() => {
    const optionMap = new Map<string, ShopifyVariant[]>();

    availableVariants.forEach((variant) => {
      if (variant.selectedOptions.length > 0) {
        const firstOption = `${variant.selectedOptions[0].name}:${variant.selectedOptions[0].value}`;
        if (!optionMap.has(firstOption)) {
          optionMap.set(firstOption, []);
        }
        optionMap.get(firstOption)?.push(variant);
      }
    });

    return optionMap;
  }, [availableVariants]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !onAddToCart) return;

    try {
      setCartLoading(true);
      await onAddToCart(selectedVariant.id, quantity);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, selectedVariant?.quantityAvailable || 1));
    setQuantity(newQuantity);
  };

  return (
    <div className="product-details">
      {/* Image Gallery */}
      <div className="product-images">
        <div className="main-image-container">
          {mainImage && (
            <img
              src={getOptimizedImageUrl(mainImage.url, 600, 600)}
              alt={mainImage.altText || product.title}
              className="main-image"
            />
          )}
          {!selectedVariant?.availableForSale && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="image-thumbnails">
            {images.map((img, index) => (
              <button
                key={img.id}
                className={`thumbnail ${index === mainImageIndex ? 'active' : ''}`}
                onClick={() => setMainImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={getOptimizedImageUrl(img.url, 100, 100)}
                  alt={img.altText || `Product view ${index + 1}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-header">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-vendor">{product.vendor}</p>
        </div>

        {/* Pricing */}
        <div className="pricing-section">
          {selectedVariant && (
            <>
              <div className="price-display">
                <span className="current-price">
                  {formatPrice(selectedVariant.price.amount)}
                </span>
                {selectedVariant.compareAtPrice && (
                  <span className="compare-price">
                    {formatPrice(selectedVariant.compareAtPrice.amount)}
                  </span>
                )}
              </div>
              {savings && (
                <div className="savings-badge">
                  Save {savings.percentage}% ({formatPrice(savings.amount)})
                </div>
              )}
            </>
          )}
        </div>

        {/* Availability */}
        <div className="availability">
          {selectedVariant?.availableForSale ? (
            <span className="in-stock">✓ In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
          {selectedVariant && (
            <span className="quantity-available">
              ({selectedVariant.quantityAvailable} available)
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        )}

        {/* Variants */}
        {variantOptions.size > 0 && (
          <div className="variants-section">
            <h3>Options</h3>
            {Array.from(variantOptions.entries()).map(([optionName, variants]) => (
              <div key={optionName} className="variant-group">
                <label>{optionName.split(':')[0]}</label>
                <div className="variant-buttons">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`variant-button ${
                        selectedVariant?.id === variant.id ? 'selected' : ''
                      } ${!variant.availableForSale ? 'unavailable' : ''}`}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.availableForSale}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quantity & Add to Cart */}
        <div className="purchase-section">
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || cartLoading}
                className="qty-btn"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={selectedVariant?.quantityAvailable || 1}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="qty-input"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (selectedVariant?.quantityAvailable || 1) || cartLoading}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || cartLoading}
          >
            {cartLoading ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        </div>

        {/* Meta Info */}
        <div className="product-meta">
          {product.tags.length > 0 && (
            <div className="tags">
              <strong>Tags:</strong> {product.tags.join(', ')}
            </div>
          )}
          {selectedVariant?.sku && (
            <div className="sku">
              <strong>SKU:</strong> {selectedVariant.sku}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
