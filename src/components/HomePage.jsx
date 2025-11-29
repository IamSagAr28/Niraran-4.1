import React from 'react';
import { Header } from './Header.tsx';
import { HeroSlideshow } from "./HeroSlideshow.jsx";
import { FeatureIcons } from "./FeatureIcons";
import { CategoryShowcase } from "./CategoryShowcase";
import { InfoBlocks } from "./InfoBlocks";
import { WorkshopSection } from "./WorkshopSection.tsx";
import { MembershipPlans } from "./MembershipPlans";
import { SplitContentSection } from "./SplitContentSection";
import { FeaturedBanner } from "./FeaturedBanner";
import { Testimonials } from "./Testimonials";
import { CTABanner } from "./CTABanner";
import { Footer } from "./Footer";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/Router';

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { navigateTo } = useRouter();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for all users - authenticated users can still access it
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <Header showCategories={true} />

      {/* Hero Slideshow */}
      <section id="hero">
        <HeroSlideshow />
      </section>

      {/* Feature Icons */}
      <FeatureIcons />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Info Blocks */}
      <section id="about">
        <InfoBlocks />
      </section>

      {/* Workshop Section */}
      <section id="workshops">
        <WorkshopSection />
      </section>

      {/* Membership Plans */}
      <MembershipPlans />

      {/* Split Content Section */}
      <SplitContentSection />

      {/* Featured Banner */}
      <FeaturedBanner />

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* CTA Banner */}
      <CTABanner />

      {/* Footer */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;