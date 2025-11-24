import { useState } from "react";
import { Search, ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { useRouter } from "../utils/Router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export function Header({ showCategories = false }: { showCategories?: boolean }) {
  const { navigateTo, currentPath } = useRouter();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <a href="#" className="hover:text-[#a3b18a] transition-colors">Track Order</a>
            <a href="#" className="hover:text-[#a3b18a] transition-colors">Join Our Mission</a>
            <a href="#" className="hover:text-[#a3b18a] transition-colors">Contact Us</a>
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
            <button onClick={() => handleNav('about')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">About Us</button>
            <button onClick={() => handleNav('our-story')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Our Story</button>
            <button onClick={() => handleNav('about')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Workshops</button>
            <button onClick={() => handleNav('contact')} className="text-[#344e41] hover:text-[#588157] transition-colors font-medium">Contact</button>
          </nav>

          {/* Action Icons */}
          <div className="flex gap-4 items-center">
            <button className="text-[#344e41] hover:text-[#588157] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#344e41] hidden md:block">
                  Hi, {user?.firstName || 'User'}
                </span>
                <button 
                  onClick={logout}
                  className="text-[#344e41] hover:text-[#588157] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
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
              <button onClick={() => handleNav('about')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">Workshops</button>
              <button onClick={() => handleNav('contact')} className="text-left text-[#344e41] hover:text-[#588157] transition-colors font-medium py-2">Contact</button>
            </nav>
          </div>
        )}
      </div>

      {/* Category Icons Strip */}
      {showCategories && (
        <div className="border-t border-[#e5e7eb] bg-[#f9f9f7]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center items-start gap-4 md:gap-12 overflow-x-auto pb-2 w-full scrollbar-hide">
              {[
                {
                  name: "Wall Hangings",
                  image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Clutches & Pouches",
                  image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Home Textiles",
                  image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "File Covers",
                  image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Festival Items",
                  image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Diya Decorations",
                  image: "https://images.unsplash.com/photo-1602826416379-4443633a40b0?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Bangle Boxes",
                  image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Bottle Covers",
                  image: "https://images.unsplash.com/photo-1602143407151-01114192003f?w=400&h=400&fit=crop&crop=center"
                }
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleNav('products')}
                  className="flex flex-col items-center gap-3 min-w-[80px] text-[#344e41] hover:text-[#588157] transition-all group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md border border-gray-100">
                    <img 
                      src={category.image} 
                      alt={category.name}
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
                  <span className="text-xs md:text-sm text-[#374151] font-medium text-center tracking-wide group-hover:text-[#3a5a40] whitespace-nowrap">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
