import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { useRouter } from "../utils/Router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useShopifyProducts } from "../hooks/useShopifyProducts";
import { getOptimizedImageUrl } from "../shopify/client";
import { UserAvatar } from "./UserAvatar";

export function Header({ showCategories = false }: { showCategories?: boolean }) {
  const { navigateTo, currentPath } = useRouter();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading } = useShopifyProducts();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const categoryMap = new Map();
      products.forEach((product: any) => {
        // Use productType if available, otherwise fallback to first tag, or 'Other'
        const type = product.productType || (product.tags && product.tags.length > 0 ? product.tags[0] : 'Other');

        if (type && !categoryMap.has(type)) {
          categoryMap.set(type, {
            name: type,
            image: product.images.edges[0]?.node.url || ''
          });
        }
      });

      let categoriesArray = Array.from(categoryMap.values());

      // If we have fewer than 8 categories, fill with individual products
      if (categoriesArray.length < 8) {
        const existingNames = new Set(categoriesArray.map(c => c.name));
        const additionalProducts = products
          .filter((p: any) => !existingNames.has(p.title))
          .slice(0, 8 - categoriesArray.length)
          .map((product: any) => ({
            name: product.title,
            image: product.images.edges[0]?.node.url || ''
          }));
        categoriesArray = [...categoriesArray, ...additionalProducts];
      }

      setCategories(categoriesArray);
    }
  }, [products]);

  const handleNav = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-[#a3b18a]/30 sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <div className="bg-[#3a5a40] text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span>🌱 Transforming Waste into Beautiful Products | Free Shipping on Orders Above ₹999</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleNav('our-story')} className="hover:text-[#a3b18a] transition-colors">Join Our Mission</button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#a3b18a] transition-colors">Contact Us</button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('/')}>
            <img
              src="/images/logo.png"
              alt="Nivaran Logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                // Fallback to original design if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="w-10 h-10 bg-[#3a5a40] rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-lg">♻️</span>
                    </div>
                    <div>
                      <h1 class="text-2xl font-bold text-[#3a5a40]">Nivaran</h1>
                      <p class="text-xs text-[#588157] -mt-1">Upcyclers</p>
                    </div>
                  `;
                }
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-[#3a5a40]">Nivaran</h1>
              <p className="text-xs text-[#588157] -mt-1">Upcyclers</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-8">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
              className="text-[#344e41] hover:text-[#588157] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/products"
              onClick={(e) => { e.preventDefault(); navigateTo('/products'); }}
              className="text-[#344e41] hover:text-[#588157] transition-colors font-medium"
            >
              Shop
            </a>
            <a href="#about" onClick={() => handleNav('about')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">About Us</a>
            <a href="#our-story" onClick={() => handleNav('our-story')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Our Story</a>
            <a href="#workshops" onClick={() => handleNav('workshops')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Workshops</a>
            <a href="#contact" onClick={() => handleNav('contact')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Contact</a>
          </nav>
          {/* Action Icons */}
          <div className="flex gap-4 items-center">
            <button className="text-[#344e41] hover:text-[#588157] transition-colors" onClick={() => navigateTo('/products')} title="Search Products">
              <Search className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => navigateTo('/dashboard')}
                className="focus:outline-none hover:opacity-80 transition-opacity"
                title="Dashboard"
              >
                <UserAvatar
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  size="sm"
                  className="rounded-full"
                />
              </button>
            ) : (
              <a
                href="/login"
                onClick={(e) => { e.preventDefault(); navigateTo('/login'); }}
                className="text-[#344e41] hover:text-[#588157] transition-colors"
              >
                <User className="w-5 h-5" />
              </a>
            )}
            <a
              href="/cart"
              onClick={(e) => { e.preventDefault(); navigateTo('/cart'); }}
              className="text-[#344e41] hover:text-[#588157] transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#588157] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </a>
            <button
              className="md:hidden text-[#344e41] hover:text-[#588157] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#a3b18a]/30 py-4">
            <nav className="flex flex-col gap-4 px-4">
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('/'); }}
                className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('/products'); }}
                className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Shop
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('/cart'); }}
                className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Cart
              </button>
              <button onClick={() => handleNav('about')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">About Us</button>
              <button onClick={() => handleNav('our-story')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">Our Story</button>
              <button onClick={() => handleNav('workshops')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">Workshops</button>
              <button onClick={() => handleNav('contact')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">Contact</button>
            </nav>
          </div>
        )}
      </div>

      {/* Category Icons Strip */}
      {showCategories && (
        <div className="border-t border-[#e5e7eb] bg-[#f9f9f7]">
          <div className="mx-auto px-4 py-6" style={{ maxWidth: '1200px' }}>
            <div
              className="category-strip"
              style={{
                display: 'grid',
                gridTemplateColumns: loading || categories.length === 0 ? 'repeat(8, 1fr)' : `repeat(${Math.min(categories.length, 8)}, 1fr)`,
                gap: '1.5rem',
                alignItems: 'start',
                justifyItems: 'center',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .category-strip::-webkit-scrollbar {
                  display: none;
                }
                
                @media (max-width: 899px) {
                  .category-strip {
                    grid-template-columns: repeat(auto-fit, minmax(80px, 80px)) !important;
                    justify-content: start !important;
                  }
                }
                
                @media (min-width: 900px) {
                  .category-strip {
                    overflow-x: visible !important;
                  }
                }
              `}</style>
              {loading ? (
                Array(8).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      navigateTo(`/products?category=${encodeURIComponent(category.name)}`);
                    }}
                    className="flex flex-col items-center gap-3 min-w-[80px] md:min-w-[96px] flex-shrink-0 text-[#344e41] hover:text-[#588157] transition-all group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md border border-gray-100">
                      <img
                        src={getOptimizedImageUrl(category.image, 400, 400)}
                        alt={category.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-10 h-10 bg-[#588157] group-hover:bg-[#3a5a40] rounded transition-colors"></div>';
                          }
                        }}
                      />
                    </div>
                    <span className="text-xs md:text-sm text-[#374151] font-medium text-center tracking-wide group-hover:text-[#3a5a40] whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">{category.name}</span>
                  </button>
                ))
              ) : (
                <div className="w-full text-center text-gray-500 py-4">No categories found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
