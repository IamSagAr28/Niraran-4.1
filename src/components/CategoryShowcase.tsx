import { useEffect, useState } from 'react';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { getOptimizedImageUrl } from '../shopify/client';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from '../utils/Router';

export function CategoryShowcase() {
  const { products } = useShopifyProducts();
  const { navigateTo } = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Group products by type and get first product from each type
      const categoryMap = new Map();
      
      products.forEach((product: any) => {
        const type = product.productType || 'Other';
        if (!categoryMap.has(type)) {
          categoryMap.set(type, product);
        }
      });

      // Convert to array - show up to 4 categories, or if not enough types, show first 4 products
      let categoriesArray = Array.from(categoryMap.values()).map((product: any) => ({
        name: product.productType || product.title,
        image: product.images.edges[0]?.node.url || '',
        handle: product.handle
      }));

      // If we have less than 4 categories, add individual products as categories
      if (categoriesArray.length < 4) {
        const additionalProducts = products
          .filter((p: any) => !categoriesArray.some(c => c.handle === p.handle))
          .slice(0, 4 - categoriesArray.length)
          .map((product: any) => ({
            name: product.title,
            image: product.images.edges[0]?.node.url || '',
            handle: product.handle
          }));
        categoriesArray = [...categoriesArray, ...additionalProducts];
      } else {
        categoriesArray = categoriesArray.slice(0, 4);
      }

      setCategories(categoriesArray);
    }
  }, [products]);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-[#344e41]">Shop by Category</h2>
          <p className="text-[#3a5a40]">Explore our diverse range of eco-friendly products</p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.handle} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#dad7cd]/30 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={getOptimizedImageUrl(category.image, 400, 500)}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg mb-2 text-[#344e41]">{category.name}</h3>
                  <button 
                    onClick={() => navigateTo('/products')}
                    className="mt-2 px-6 py-2 bg-[#588157] text-white text-sm hover:bg-[#3a5a40] rounded-lg transition-colors"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8 text-[#3a5a40]">
              Loading categories...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
