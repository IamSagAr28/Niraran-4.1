import React from 'react';
import { Phone, Mail, Award, Lightbulb, Heart, ArrowRight, GraduationCap, Building2, Users } from 'lucide-react';

export const WorkshopSection = () => {
  const highlights = [
    {
      title: "Hands-on Learning",
      description: "Engaging, practical sessions where you learn by doing. Transform waste into beautiful art.",
      icon: Lightbulb,
      color: "#F8D548" // Primary Yellow
    },
    {
      title: "Expert Guidance",
      description: "Learn from skilled artisans who are masters of upcycling. Get personalized tips.",
      icon: Award,
      color: "#DBB520" // Gold Yellow
    },
    {
      title: "Creative & Sustainable",
      description: "Focus on creativity, sustainability, and waste reduction. Make a positive impact.",
      icon: Heart,
      color: "#F8D548" // Primary Yellow
    }
  ];

  const pricingAudiences = [
    { name: 'Schools & Educational Institutions', icon: GraduationCap },
    { name: 'Colleges & Universities', icon: GraduationCap },
    { name: 'Residential Societies', icon: Users },
    { name: 'Corporate Groups', icon: Building2 }
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        .float-animation-delay-1 {
          animation: float 4.2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .float-animation-delay-2 {
          animation: float 4.4s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
      <section 
        id="workshops" 
        className="py-24 bg-gradient-to-b from-[#FFFEF5] via-[#FFFBF0] to-[#FFF6D1]/40 relative overflow-hidden float-animation"
        style={{
          backgroundImage: "url('/images/workshops/workbg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEF5]/90 via-[#FFFBF0]/85 to-[#FFF6D1]/80" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F8D548]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#DBB520]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-[#F8D548]/10 rounded-full mb-8 border border-[#F8D548]/20 shadow-sm">
            <span className="text-[#DBB520] font-bold text-sm uppercase tracking-widest letter-spacing-wide">Learn With Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#2A2A2A] tracking-tight leading-tight relative inline-block">
            Workshops & Training
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-[#F8D548] via-[#DBB520] to-[#F8D548] rounded-full mt-4"></span>
          </h2>
          <p className="text-lg md:text-xl text-[#2A2A2A]/75 leading-relaxed font-normal tracking-wide" style={{ lineHeight: '1.75' }}>
            Join our expert-led sessions to master the art of upcycling.
            Perfect for schools, corporates, and creative individuals.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 md:p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-[#2A2A2A]/5 hover:-translate-y-2 hover:border-[#F8D548]/30 flex flex-col items-center text-center h-full relative overflow-hidden ${index === 0 ? 'float-animation-delay-1' : index === 1 ? 'float-animation-delay-2' : 'float-animation'}`}
              >
                {/* Gradient top border on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F8D548] via-[#DBB520] to-[#F8D548] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with gradient and animation */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFF6D1] via-[#F8D548]/20 to-[#FFF6D1] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#F8D548]/10 group-hover:shadow-xl group-hover:shadow-[#F8D548]/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F8D548]/20 to-[#DBB520]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent 
                      className="w-10 h-10 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-500" 
                      strokeWidth={2.5}
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(219, 181, 32, 0.4))'
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#2A2A2A] mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                  {highlight.title}
                </h3>

                <p className="text-[#2A2A2A]/70 leading-relaxed text-base" style={{ lineHeight: '1.7' }}>
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact & Info Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#2A2A2A]/10 overflow-hidden backdrop-blur-sm" style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(248, 213, 72, 0.05)' }}>
          <div className="grid lg:grid-cols-2">

            {/* Left Column: Get in Touch */}
            <div className="p-10 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#2A2A2A]/10 bg-gradient-to-br from-white to-[#FFFEF5]">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3.5 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-xl shadow-md">
                  <Phone className="w-7 h-7 text-[#DBB520]" strokeWidth={2} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] tracking-tight relative">
                  Get in Touch
                  <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] rounded-full"></span>
                </h3>
              </div>

              <p className="text-[#2A2A2A]/75 mb-12 text-lg leading-relaxed font-normal" style={{ lineHeight: '1.75' }}>
                We conduct engaging Fabric Upcycling Workshops in schools, colleges, and residential societies.
                Reach out to customize a session for your group.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+919129455565"
                  className="flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r from-[#FFF6D1]/40 to-[#FFF6D1]/20 border border-[#F8D548]/30 hover:border-[#F8D548] hover:from-[#FFF6D1] hover:to-[#F8D548]/20 transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#F8D548]/20">
                    <Phone className="w-6 h-6 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-300" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#DBB520] font-bold uppercase tracking-wider mb-1.5">Call Us</p>
                    <p className="text-[#2A2A2A] font-semibold text-lg">+91 9129-45-55-65</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DBB520]/50 group-hover:text-[#DBB520] group-hover:translate-x-1 transition-all duration-300" />
                </a>

                <a
                  href="mailto:info@nivaranupcyclers.in"
                  className="flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r from-[#FFF6D1]/40 to-[#FFF6D1]/20 border border-[#F8D548]/30 hover:border-[#F8D548] hover:from-[#FFF6D1] hover:to-[#F8D548]/20 transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#F8D548]/20">
                    <Mail className="w-6 h-6 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-300" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#DBB520] font-bold uppercase tracking-wider mb-1.5">Email Us</p>
                    <p className="text-[#2A2A2A] font-semibold text-lg">info@nivaranupcyclers.in</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DBB520]/50 group-hover:text-[#DBB520] group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Right Column: Pricing & Plans */}
            <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-br from-[#FFF6D1]/20 via-[#FFF6D1]/10 to-white border-l-0 lg:border-l border-[#2A2A2A]/10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3.5 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-xl shadow-md">
                  <Award className="w-7 h-7 text-[#DBB520]" strokeWidth={2} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] tracking-tight relative">
                  Pricing & Plans
                  <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] rounded-full"></span>
                </h3>
              </div>

              <p className="text-[#2A2A2A]/75 mb-10 text-lg leading-relaxed font-normal" style={{ lineHeight: '1.75' }}>
                Nominal fees based on batch size and location. We offer customized pricing packages for:
              </p>

              <ul className="space-y-4 mb-12">
                {pricingAudiences.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <li 
                      key={idx} 
                      className="flex items-center gap-4 text-[#2A2A2A] font-medium text-base group/item hover:translate-x-1 transition-transform duration-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-lg flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 border border-[#F8D548]/20">
                        <IconComponent className="w-5 h-5 text-[#DBB520]" strokeWidth={2} />
                      </div>
                      <span className="flex-1" style={{ letterSpacing: '-0.01em' }}>{item.name}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+919129455565"
                  className="group/btn flex-1 inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#F8D548] via-[#F8D548] to-[#DBB520] text-[#2A2A2A] rounded-xl font-bold text-lg hover:from-[#DBB520] hover:via-[#F8D548] hover:to-[#F8D548] transition-all duration-500 shadow-lg shadow-[#F8D548]/30 hover:shadow-2xl hover:shadow-[#F8D548]/40 hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Workshop
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
