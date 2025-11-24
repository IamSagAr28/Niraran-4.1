import React from 'react';
import { Header } from './Header.tsx';
import { HeroSlideshow } from "./HeroSlideshow.jsx";
import { FeatureIcons } from "./FeatureIcons";
import { CategoryShowcase } from "./CategoryShowcase";
import { InfoBlocks } from "./InfoBlocks";
import { MembershipPlans } from "./MembershipPlans";
import { SplitContentSection } from "./SplitContentSection";
import { FeaturedBanner } from "./FeaturedBanner";
import { Testimonials } from "./Testimonials";
import { CTABanner } from "./CTABanner";
import { Footer } from "./Footer";

const HomePage = () => {
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