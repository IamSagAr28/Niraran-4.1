import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "../utils/Router";
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export function Footer() {
  const { navigateTo } = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e?: any) => {
    e?.preventDefault?.();
    if (!newsletterEmail) {
      alert('Please enter your email');
      return;
    }
    // Placeholder - connect to an email service like Mailchimp in production
    alert(`Thanks! Subscribed ${newsletterEmail} (placeholder)`);
    setNewsletterEmail('');
  };
  return (
    <footer className="bg-[#2A2A2A] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Left Section - Footer Information */}
          <div className="flex-1 pr-0 lg:pr-8 lg:max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Footer Column 1 - Logo & Description */}
              <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="Nivaran Logo"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <h3 className="text-2xl font-bold text-[#F8D548]">Nivaran Upcyclers</h3>
                </div>
                <p className="text-[#FFF6D1]">
                  A social impact startup working in pooja waste disposal management and production of upcycled handicrafts. Revolutionizing traditional practices into opportunities for positive environmental impact.
                </p>
                <div className="flex gap-3 pt-4">
                  <a
                    href="https://facebook.com/nivaranupcyclers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#DBB520] hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/nivaranupcyclers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#DBB520] hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#F56040] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/nivaranupcycler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#DBB520] hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:info@nivaranupcyclers.in"
                    className="w-10 h-10 bg-[#DBB520] hover:bg-[#D44638] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Email us"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Footer Column 2 - Shop */}
              <div className="space-y-4">
                <h4 className="text-[#F8D548] font-bold mb-4">Shop</h4>
                <div className="space-y-3">
                  <button onClick={() => navigateTo('/products')} className="block text-[#FFF6D1] hover:text-white transition-colors">All Products</button>
                  <button onClick={() => navigateTo(`/products?category=${encodeURIComponent('Wall Hangings')}`)} className="block text-[#FFF6D1] hover:text-white transition-colors">Wall Hangings</button>
                  <button onClick={() => navigateTo(`/products?category=${encodeURIComponent('Clutches & Pouches')}`)} className="block text-[#FFF6D1] hover:text-white transition-colors">Clutches & Pouches</button>
                  <button onClick={() => navigateTo(`/products?category=${encodeURIComponent('Home Textiles')}`)} className="block text-[#FFF6D1] hover:text-white transition-colors">Home Textiles</button>
                  <button onClick={() => navigateTo(`/products?category=${encodeURIComponent('Festival Items')}`)} className="block text-[#FFF6D1] hover:text-white transition-colors">Festival Items</button>
                </div>
              </div>

              {/* Footer Column 3 - About */}
              <div className="space-y-4">
                <h4 className="text-[#F8D548] font-bold mb-4">About</h4>
                <div className="space-y-3">
                  <button onClick={() => scrollToSection('about')} className="block text-[#FFF6D1] hover:text-white transition-colors">Our Story</button>
                  <button onClick={() => scrollToSection('about')} className="block text-[#FFF6D1] hover:text-white transition-colors">Mission</button>
                  <button onClick={() => scrollToSection('about')} className="block text-[#FFF6D1] hover:text-white transition-colors">Workshops</button>
                  <button onClick={() => scrollToSection('about')} className="block text-[#FFF6D1] hover:text-white transition-colors">Sustainability</button>
                  <button onClick={() => scrollToSection('about')} className="block text-[#FFF6D1] hover:text-white transition-colors">Blog</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information and Map Row - 50/50 Split */}
        <div className="mt-8 pt-8 border-t border-[#DBB520]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Information - Left Half (50%) */}
            <div className="w-full md:w-1/2">
              <h4 className="text-[#F8D548] font-bold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <a href="mailto:info@nivaranupcyclers.in" className="flex items-center gap-2 text-[#FFF6D1] hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  info@nivaranupcyclers.in
                </a>
                <a href="tel:+919129455565" className="flex items-center gap-2 text-[#FFF6D1] hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 9129455565
                </a>
                <div className="flex items-start gap-2 text-[#FFF6D1]">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Kanpur, India</span>
                </div>
              </div>
            </div>

            {/* Google Map - Right Half (50%) */}
            <div className="w-full md:w-1/2">
              <h4 className="text-[#F8D548] font-bold mb-4">Visit Our Location</h4>
              <div
                className="w-64 h-64 bg-[#DBB520] rounded-lg overflow-hidden cursor-pointer relative group shadow-lg"
                onClick={() => {
                  window.open('https://www.google.com/maps?q=117/Q/39+Radha+Krishna+Housing+Society,+Sharda+Nagar,+Kanpur+208025', '_blank', 'noopener,noreferrer');
                }}
              >
                {/* Interactive Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                             transition-all duration-300 z-10 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                               bg-white bg-opacity-90 rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-[#2A2A2A] font-semibold text-sm flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Click to open in Google Maps
                    </span>
                  </div>
                </div>

                {/* Embedded Google Map */}
                <iframe
                  src="https://maps.google.com/maps?width=320&height=192&hl=en&q=Kanpur,%20Uttar%20Pradesh,%20India&ie=UTF8&t=&z=12&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nivaran Upcyclers Location Map"
                ></iframe>

                {/* Custom Location Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             pointer-events-none z-20">
                  <div className="animate-bounce">
                    <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg 
                                 flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Description */}
              <p className="text-[#FFF6D1] text-sm mt-3">
                Click on the map to get directions to our headquarters in Kanpur
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-[#DBB520]">
          <div className="max-w-2xl">
            <h4 className="text-[#F8D548] font-bold text-2xl mb-3">Join the Sustainable Revolution</h4>
            <p className="text-[#FFF6D1] text-base mb-6">
              Subscribe to our newsletter and get <span className="text-[#F8D548] font-semibold">10% off your first purchase</span>. Stay updated with new collections, workshops, and sustainability tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-5 py-3 bg-[#1A1A1A] border-2 border-[#F8D548] rounded-lg focus:outline-none focus:border-[#FFF6D1] text-white placeholder:text-[#FFF6D1]/50 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#F8D548] hover:bg-[#DBB520] rounded-lg transition-all text-[#2A2A2A] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#DBB520]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#FFF6D1]">
            <p>© 2025 Nivaran Upcyclers. All rights reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => navigateTo('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => navigateTo('/terms')} className="hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => navigateTo('/shipping')} className="hover:text-white transition-colors">Shipping Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
