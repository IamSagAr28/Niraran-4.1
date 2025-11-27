import React from 'react';
import { Phone, Mail, Users, Award, Sparkles, Check, ArrowRight } from 'lucide-react';

export const WorkshopSection = () => {
  const highlights = [
    {
      title: "Hands-on Learning",
      description: "Engaging, practical sessions where you learn by doing.",
      icon: Award
    },
    {
      title: "Expert Guidance",
      description: "Learn from our skilled artisans who are masters of upcycling.",
      icon: Users
    },
    {
      title: "Creative & Sustainable",
      description: "Focus on creativity, sustainability, and waste reduction.",
      icon: Sparkles
    }
  ];

  return (
    <section id="workshops" className="py-16 bg-[#dad7cd]/30">
      <div className="container mx-auto px-4">
        {/* Section Header - Centered */}
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-[#344e41]">Workshops & Training</h2>
          <p className="text-[#3a5a40]">Contact Us for Fabric Upcycling Workshops</p>
        </div>

        {/* Main Grid Layout - Standard Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <div className="flex-shrink-0 mb-4">
                  <div className="w-16 h-16 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[#3a5a40]" />
                  </div>
                </div>
                <h3 className="text-xl text-[#344e41] mb-3">
                  {highlight.title}
                </h3>
                <p className="text-[#3a5a40] leading-relaxed flex-grow">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Section - Full Width Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info - Left */}
            <div>
              <h3 className="text-xl text-[#344e41] mb-4">
                Get in Touch
              </h3>
              <p className="text-[#3a5a40] mb-6 leading-relaxed">
                We conduct engaging Fabric Upcycling Workshops in schools, colleges, and residential societies.
              </p>
              <div className="space-y-4">
                <a 
                  href="tel:+919129455565"
                  className="flex gap-4 items-center hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#3a5a40]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#3a5a40] font-medium">+91 9129-45-55-65</p>
                  </div>
                </a>

                <a 
                  href="mailto:info@nivaranupcyclers.in"
                  className="flex gap-4 items-center hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3a5a40]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#3a5a40] font-medium">info@nivaranupcyclers.in</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Charges Info - Middle */}
            <div>
              <h4 className="text-xl text-[#344e41] mb-4">Charges</h4>
              <p className="text-[#3a5a40] leading-relaxed mb-4">
                Nominal fees based on batch size and location. Customized pricing for:
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-[#3a5a40] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#588157] rounded-full"></span>
                  <span>Schools & Educational Institutions</span>
                </li>
                <li className="text-sm text-[#3a5a40] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#588157] rounded-full"></span>
                  <span>Colleges & Universities</span>
                </li>
                <li className="text-sm text-[#3a5a40] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#588157] rounded-full"></span>
                  <span>Residential Societies</span>
                </li>
                <li className="text-sm text-[#3a5a40] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#588157] rounded-full"></span>
                  <span>Corporate Groups</span>
                </li>
              </ul>
            </div>

            {/* CTA - Right */}
            <div className="flex flex-col justify-center">
              <div className="bg-[#dad7cd]/20 p-6 rounded-lg text-center">
                <h4 className="text-lg text-[#344e41] mb-2 font-medium">Ready to Learn?</h4>
                <p className="text-sm text-[#3a5a40] mb-6">
                  Join the movement towards a greener future with Nivaran Upcyclers!
                </p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+919129455565" className="px-6 py-2 bg-[#588157] text-white text-sm hover:bg-[#3a5a40] rounded-lg transition-colors font-medium">
                    Book a Workshop
                  </a>
                  <a href="mailto:info@nivaranupcyclers.in" className="px-6 py-2 border border-[#588157] text-[#588157] text-sm hover:bg-[#588157] hover:text-white rounded-lg transition-colors font-medium">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
