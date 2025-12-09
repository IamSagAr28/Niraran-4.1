import { useState, useEffect } from "react";
import { useRouter } from "../utils/Router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const slides = [
    {
      image: "/images/hero/hero1.jpg",
      tag: "Sustainable Living Made Beautiful",
      title: "Transforming Waste into",
      highlight: "Wonderful Products",
      description: "Discover our collection of handcrafted, eco-friendly products made from upcycled materials.",
      primaryCTA: "Shop Now",
      secondaryCTA: "Learn More"
    },
    {
      image: "/images/hero/hero2.jpg",
      tag: "Handcrafted Excellence",
      title: "Every Product Tells",
      highlight: "A Story",
      description: "Supporting local artisans while promoting environmental consciousness.",
      primaryCTA: "Explore Collection",
      secondaryCTA: "Our Story"
    },
    {
      image: "/images/hero/hero3.jpg",
      tag: "Join the Movement",
      title: "Building a",
      highlight: "Circular Economy",
      description: "Each purchase contributes to a sustainable future and empowers local communities.",
      primaryCTA: "Get Started",
      secondaryCTA: "Join Workshop"
    },
    {
      image: "/images/hero/hero4.jpg",
      tag: "New Arrivals",
      title: "Freshly Crafted",
      highlight: "Just For You",
      description: "Check out the latest additions to our sustainable collection.",
      primaryCTA: "Shop New",
      secondaryCTA: "See What's New"
    },
    {
      image: "/images/hero/hero5.jpg",
      tag: "Gifts That Give Back",
      title: "Meaningful Presents",
      highlight: "For Every Occasion",
      description: "Find the perfect eco-friendly gift that makes a difference.",
      primaryCTA: "Browse Gifts",
      secondaryCTA: "Gifting Guide"
    },
    {
      image: "/images/hero/hero6.jpg",
      tag: "Our Commitment",
      title: "Sustainability in",
      highlight: "Every Stitch",
      description: "Learn about our process and our dedication to a greener planet.",
      primaryCTA: "Our Process",
      secondaryCTA: "Learn More"
    }
  ];

  const handleImageError = (index: number) => {
    console.error(`Failed to load image: ${slides[index].image}`);
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  // Debug: Log image paths on mount
  useEffect(() => {
    console.log('Hero slides loaded:', slides.map(s => s.image));
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Router navigation helper
  const { navigateTo, currentPath } = useRouter();

  const navigateToSection = (sectionId: string) => {
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
  };

  const handlePrimaryCTA = (slideIndex: number) => {
    const title = slides[slideIndex]?.primaryCTA?.toLowerCase() || '';
    if (title.includes('shop') || title.includes('explore') || title.includes('get started')) {
      navigateTo('/products');
      return;
    }
    // Default fallback
    navigateTo('/products');
  };

  const handleSecondaryCTA = (slideIndex: number) => {
    const cta = slides[slideIndex]?.secondaryCTA?.toLowerCase() || '';
    if (cta.includes('learn') || cta.includes('mission') || cta.includes('about')) {
      navigateToSection('about');
      return;
    }
    if (cta.includes('our story') || cta.includes('our-story')) {
      navigateToSection('our-story');
      return;
    }
    if (cta.includes('join workshop') || cta.includes('workshop')) {
      navigateToSection('workshops');
      return;
    }
    // Default fallback
    navigateTo('/');
  };

  return (
    <section className="relative bg-gradient-to-br from-[#dad7cd] to-white overflow-hidden">
      {/* Full Width Image Background */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={`${slide.image}?t=${new Date().getTime()}`}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={() => {
                console.error(`Image failed to load: ${slide.image}`);
                handleImageError(index);
              }}
            />
          </div>
        ))}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#344e41]/80 to-[#3a5a40]/80"></div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              {/* Text Content - Animated */}
              <div className="space-y-6 z-10">
                <div 
                  key={`tag-${currentSlide}`}
                  className="inline-block px-4 py-2 bg-[#a3b18a] text-[#344e41] rounded-full animate-fade-in"
                >
                  <span className="text-sm">{slides[currentSlide].tag}</span>
                </div>
                <h1 
                  key={`title-${currentSlide}`}
                  className="text-5xl leading-tight text-white animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  {slides[currentSlide].title}{" "}
                  <span className="text-[#a3b18a]">{slides[currentSlide].highlight}</span>
                </h1>
                <p 
                  key={`desc-${currentSlide}`}
                  className="text-lg text-[#dad7cd] animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  {slides[currentSlide].description}
                </p>
                <div 
                  key={`cta-${currentSlide}`}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <button
                    onClick={() => handlePrimaryCTA(currentSlide)}
                    className="px-8 py-3 bg-[#588157] text-white hover:bg-[#a3b18a] hover:text-[#344e41] rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    aria-label={slides[currentSlide].primaryCTA}
                  >
                    {slides[currentSlide].primaryCTA}
                  </button>
                  <button
                    onClick={() => handleSecondaryCTA(currentSlide)}
                    className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#3a5a40] rounded-lg transition-all duration-300"
                    aria-label={slides[currentSlide].secondaryCTA}
                  >
                    {slides[currentSlide].secondaryCTA}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#3a5a40]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#3a5a40]" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-3 bg-[#a3b18a]'
                  : 'w-3 h-3 bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
