// src/components/shopify/ProductGrid.tsx
// Display products in a responsive grid with advanced filtering and sorting

import React, { useMemo, useState } from 'react';
import type { ShopifyProduct } from '../../shopify/types';
import { ProductCard } from './ProductCard';
import {
  filterProductsByTag,
  sortProducts,
  searchProductsLocal,
} from '../../hooks/useShopifyProducts';
import { ChevronDown, X } from 'lucide-react';
import './ProductGrid.css';

interface ProductGridProps {
  products: ShopifyProduct[];
  onAddToCart?: (variantId: string) => void;
  onViewDetails?: (handle: string) => void;
  isLoading?: boolean;
  showFilters?: boolean;
  showSearch?: boolean;
  initialCategory?: string | null;
}

type SortOption = 'featured' | 'best-selling' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'newest' | 'oldest';

interface FilterState {
  tags: string[];
  priceRange: [number, number];
  availability: 'all' | 'in-stock' | 'sold-out';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  isLoading = false,
  showFilters = true,
  showSearch = true,
  initialCategory = null,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    tags: initialCategory ? [initialCategory] : [],
    priceRange: [0, 10000],
    availability: 'all',
  });
  const [expandedFilters, setExpandedFilters] = useState<{
    [key: string]: boolean;
  }>({
    category: true,
    price: true,
    availability: true,
  });

  // Extract unique tags/categories
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((p) => {
      if (p.productType) categories.add(p.productType);
      p.tags.forEach((tag) => categories.add(tag));
    });
    return Array.from(categories).sort();
  }, [products]);

  // Calculate price range
  const priceRange = useMemo(() => {
    let min = Infinity,
      max = 0;
    products.forEach((p) => {
      const minPrice = parseFloat(p.priceRange.minVariantPrice.amount);
      const maxPrice = parseFloat(p.priceRange.maxVariantPrice.amount);
      if (minPrice < min) min = minPrice;
      if (maxPrice > max) max = maxPrice;
    });
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = searchProductsLocal(result, searchQuery);
    }

    // Category filter
    if (filters.tags.length > 0) {
      result = result.filter((product) =>
        filters.tags.some((filterTag) => {
          const matchTag = product.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase());
          const matchType = product.productType && product.productType.toLowerCase() === filterTag.toLowerCase();
          return matchTag || matchType;
        })
      );
    }

    // Price filter
    result = result.filter((product) => {
      const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
      return (
        minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
      );
    });

    // Availability filter
    if (filters.availability === 'in-stock') {
      result = result.filter((product) =>
        product.variants.edges.some((e) => e.node.availableForSale)
      );
    } else if (filters.availability === 'sold-out') {
      result = result.filter(
        (product) =>
          !product.variants.edges.some((e) => e.node.availableForSale)
      );
    }

    // Sorting
    result = sortProducts(result, sortBy as any);

    return result;
  }, [products, searchQuery, filters, sortBy]);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(category)
        ? prev.tags.filter((t) => t !== category)
        : [...prev.tags, category],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      tags: [],
      priceRange: [priceRange.min, priceRange.max],
      availability: 'all',
    });
  };

  const activeFilterCount = filters.tags.length + (filters.availability !== 'all' ? 1 : 0);

  return (
    <div className="product-grid-wrapper">
      {/* Search Bar */}
      {showSearch && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      )}

      <div className="products-section">
        {/* Sidebar Filter */}
        {showFilters && (
          <>
            {/* Mobile Filter Button */}
            <button
              className="mobile-filter-button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              🔽 Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Filter Sidebar */}
            <aside
              className={`filter-sidebar ${mobileFilterOpen ? 'open' : ''}`}
            >
              <div className="filter-sidebar-header">
                <h2>Filters</h2>
                <button
                  className="close-filter-btn"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="filters-content">
                {/* Category Filter */}
                <div className="filter-section">
                  <button
                    className="filter-title"
                    onClick={() => toggleFilter('category')}
                  >
                    <span>Product Type</span>
                    <ChevronDown
                      size={18}
                      className={`chevron ${expandedFilters.category ? 'open' : ''}`}
                    />
                  </button>
                  {expandedFilters.category && (
                    <div className="filter-options">
                      {availableCategories.map((category) => (
                        <label key={category} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={filters.tags.includes(category)}
                            onChange={() => toggleCategory(category)}
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="filter-section">
                  <button
                    className="filter-title"
                    onClick={() => toggleFilter('price')}
                  >
                    <span>Price Range</span>
                    <ChevronDown
                      size={18}
                      className={`chevron ${expandedFilters.price ? 'open' : ''}`}
                    />
                  </button>
                  {expandedFilters.price && (
                    <div className="filter-options price-range">
                      <div className="price-inputs">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                parseFloat(e.target.value) || 0,
                                prev.priceRange[1],
                              ],
                            }))
                          }
                          className="price-input"
                        />
                        <span className="price-separator">—</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                prev.priceRange[0],
                                parseFloat(e.target.value) || 10000,
                              ],
                            }))
                          }
                          className="price-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Availability Filter */}
                <div className="filter-section">
                  <button
                    className="filter-title"
                    onClick={() => toggleFilter('availability')}
                  >
                    <span>Availability</span>
                    <ChevronDown
                      size={18}
                      className={`chevron ${expandedFilters.availability ? 'open' : ''}`}
                    />
                  </button>
                  {expandedFilters.availability && (
                    <div className="filter-options">
                      <label className="filter-radio">
                        <input
                          type="radio"
                          name="availability"
                          value="all"
                          checked={filters.availability === 'all'}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              availability: e.target.value as any,
                            }))
                          }
                        />
                        <span>All Products</span>
                      </label>
                      <label className="filter-radio">
                        <input
                          type="radio"
                          name="availability"
                          value="in-stock"
                          checked={filters.availability === 'in-stock'}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              availability: e.target.value as any,
                            }))
                          }
                        />
                        <span>In Stock</span>
                      </label>
                      <label className="filter-radio">
                        <input
                          type="radio"
                          name="availability"
                          value="sold-out"
                          checked={filters.availability === 'sold-out'}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              availability: e.target.value as any,
                            }))
                          }
                        />
                        <span>Sold Out</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="filter-actions">
                <button
                  className="btn-apply-filters"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters
                </button>
                <button
                  className="btn-clear-filters"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <div className="products-main">
          {/* Sort Control */}
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="title-asc">Alphabetically, A-Z</option>
              <option value="title-desc">Alphabetically, Z-A</option>
              <option value="price-asc">Price, Low to High</option>
              <option value="price-desc">Price, High to Low</option>
              <option value="newest">Date, New to Old</option>
              <option value="oldest">Date, Old to New</option>
            </select>
          </div>

          {/* Product Count */}
          <div className="product-count">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found. Try adjusting your filters or search.</p>
              <button
                className="btn-clear-filters"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
