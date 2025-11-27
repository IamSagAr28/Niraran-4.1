import { useState, useEffect } from "react";
import { useRouter } from '../utils/Router';
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1588766381125-c29bced9d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cGN5Y2xlZCUyMGNyYWZ0cyUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MzAzMTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Sustainable Living Made Beautiful",
      title: "Transforming Waste into",
      highlight: "Wonderful Products",
      description: "Discover our collection of handcrafted, eco-friendly products made from upcycled materials.",
      primaryCTA: "Shop Now",
      secondaryCTA: "Learn More"
    },
    {
      image: "https://images.unsplash.com/photo-1681418660057-3210f48689d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjMwMzE4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Handcrafted Excellence",
      title: "Every Product Tells",
      highlight: "A Story",
      description: "Supporting local artisans while promoting environmental consciousness.",
      primaryCTA: "Explore Collection",
      secondaryCTA: "Our Story"
    },
    {
      image: "https://images.unsplash.com/photo-1686946112728-5c4ad72aad55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHByb2R1Y3RzJTIwZmxhdCUyMGxheXxlbnwxfHx8fDE3NjMwMzE4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Join the Movement",
      title: "Building a",
      highlight: "Circular Economy",
      description: "Each purchase contributes to a sustainable future and empowers local communities.",
      primaryCTA: "Get Started",
      secondaryCTA: "Join Workshop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
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
    navigateTo('/');
  };

  return (
    <section className="relative bg-gradient-to-br from-[#dad7cd] to-white overflow-hidden">
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
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-[#344e41]/80 to-[#3a5a40]/80"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
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
                  <button onClick={() => handlePrimaryCTA(currentSlide)} className="px-8 py-3 bg-[#588157] text-white hover:bg-[#a3b18a] hover:text-[#344e41] rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    {slides[currentSlide].primaryCTA}
                  </button>
                  <button onClick={() => handleSecondaryCTA(currentSlide)} className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#3a5a40] rounded-lg transition-all duration-300">
                    {slides[currentSlide].secondaryCTA}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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