import React from 'react';
import { Phone, Mail, Users, Award, Sparkles, Check, ArrowRight, Lightbulb, Target, Heart } from 'lucide-react';

export const WorkshopSection = () => {
  const highlights = [
    {
      title: "Hands-on Learning",
      description: "Engaging, practical sessions where you learn by doing. Transform waste into beautiful art.",
      icon: Lightbulb,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Expert Guidance",
      description: "Learn from skilled artisans who are masters of upcycling. Get personalized tips.",
      icon: Award,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Creative & Sustainable",
      description: "Focus on creativity, sustainability, and waste reduction. Make a positive impact.",
      icon: Heart,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="workshops" className="py-16 bg-gradient-to-br from-[#f8f9fa] via-white to-[#f1f3f4]">
      <div className="mx-auto px-4" style={{ maxWidth: '1200px', padding: '24px 16px' }}>
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-[#588157]/10 rounded-full mb-3">
            <span className="text-[#588157] font-semibold text-sm uppercase tracking-wider">Learn With Us</span>
          </div>
          <h2 className="text-3xl font-bold text-[#344e41] mb-3" style={{ fontSize: '26px' }}>
            Workshops & Training
          </h2>
          <p className="text-base text-[#3a5a40] max-w-2xl mx-auto" style={{ fontSize: '16px' }}>
            Contact us for engaging Fabric Upcycling Workshops
          </p>
        </div>

        {/* Feature Cards - Equal Height */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full"
                style={{ borderRadius: '8px', padding: '24px' }}
              >
                <div className="flex flex-col items-center text-center flex-1">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                    style={{ borderRadius: '8px' }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#344e41] mb-3" style={{ fontSize: '18px' }}>
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-[#3a5a40] leading-relaxed" style={{ fontSize: '14px', maxWidth: '280px' }}>
                    {highlight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact & Info Section - Compact */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100" style={{ borderRadius: '8px', padding: '32px 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Get in Touch */}
            <div>
              <h3 className="text-lg font-bold text-[#344e41] mb-3 flex items-center gap-2" style={{ fontSize: '18px' }}>
                <Phone className="w-5 h-5 text-[#588157]" />
                Get in Touch
              </h3>
              <p className="text-sm text-[#3a5a40] leading-relaxed mb-4" style={{ fontSize: '14px' }}>
                We conduct engaging Fabric Upcycling Workshops in schools, colleges, and residential societies.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+919129455565"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#588157]/10 to-transparent rounded-lg hover:from-[#588157]/20 transition-all"
                  style={{ borderRadius: '8px' }}
                >
                  <div className="w-10 h-10 bg-[#588157] rounded-lg flex items-center justify-center shadow-sm" style={{ borderRadius: '8px' }}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#3a5a40] font-medium uppercase tracking-wide">Call Us</p>
                    <p className="text-sm text-[#344e41] font-semibold">+91 9129-45-55-65</p>
                  </div>
                </a>

                <a
                  href="mailto:info@nivaranupcyclers.in"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#588157]/10 to-transparent rounded-lg hover:from-[#588157]/20 transition-all"
                  style={{ borderRadius: '8px' }}
                >
                  <div className="w-10 h-10 bg-[#588157] rounded-lg flex items-center justify-center shadow-sm" style={{ borderRadius: '8px' }}>
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#3a5a40] font-medium uppercase tracking-wide">Email Us</p>
                    <p className="text-sm text-[#344e41] font-semibold">info@nivaranupcyclers.in</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Charges */}
            <div>
              <h4 className="text-lg font-bold text-[#344e41] mb-3 flex items-center gap-2" style={{ fontSize: '18px' }}>
                <Target className="w-5 h-5 text-[#588157]" />
                Charges
              </h4>
              <p className="text-sm text-[#3a5a40] leading-relaxed mb-4" style={{ fontSize: '14px' }}>
                Nominal fees based on batch size and location. Customized pricing for:
              </p>
              <ul className="space-y-2">
                {[
                  'Schools & Educational Institutions',
                  'Colleges & Universities',
                  'Residential Societies',
                  'Corporate Groups'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#3a5a40] p-2 rounded-lg hover:bg-[#588157]/5 transition-colors" style={{ fontSize: '14px' }}>
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#588157] to-[#3a5a40] rounded-full"></div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons - Centered, Fixed Width */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+919129455565"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#588157] text-white rounded-lg hover:bg-[#3a5a40] transition-all font-semibold shadow-md hover:shadow-lg"
              style={{ borderRadius: '8px', width: '100%', maxWidth: '280px' }}
            >
              <Phone className="w-4 h-4" />
              Book a Workshop
            </a>
            <a
              href="mailto:info@nivaranupcyclers.in"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#588157] text-[#588157] rounded-lg hover:bg-[#588157] hover:text-white transition-all font-semibold"
              style={{ borderRadius: '8px', width: '100%', maxWidth: '280px' }}
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
