import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, Variants } from "framer-motion";
import { Check, Package, X, MapPin, User, Phone, Mail, MapPinned, Navigation, Building2 } from "lucide-react";

export function MembershipPlans() {
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    pincode: ''
  });

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleChoosePlan = (plan: any) => {
    setSelectedPlan(plan);
    setSelectedState('');
    setCurrentStep(1);
    setIsSideSheetOpen(true);
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
  };

  const handleNext = () => {
    if (selectedState) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { selectedPlan, selectedState, formData });
    // You can add API call here
    alert('Registration submitted successfully!');
    setIsSideSheetOpen(false);
    // Reset form
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      address: '',
      landmark: '',
      city: '',
      pincode: ''
    });
  };

  const getSelectedPrice = () => {
    if (!selectedPlan || !selectedState) return '';
    const region = selectedPlan.regions.find((r: any) => r.name === selectedState);
    return region ? region.price : '';
  };
  const plans = [
    {
      title: "Single Pickup Plan",
      regions: [
        { name: "U.P & Delhi NCR", price: "₹1,500" },
        { name: "Other States of India", price: "₹2,000" }
      ],
      features: [
        "One carton for storing used pooja materials at home shall be sent to you",
        "Weight of packed carton which you can give us should be upto 6kg",
        "Validity: 3 months",
        "You can even custom your gift box and select products worth Rs.600 from our catalogue"
      ],
      popular: false
    },
    {
      title: "Double Pickup Plan",
      regions: [
        { name: "U.P & Delhi NCR", price: "₹2,100" },
        { name: "Other States of India", price: "₹2,500" }
      ],
      features: [
        "Everything same as Single Pickup Plan",
        "Two cartons for storing used pooja materials at home shall be sent to you",
        "Weight of packed carton which you can give us should be upto 6kg",
        "Validity: 6 months"
      ],
      popular: true
    },
    {
      title: "Four Pickup Plan",
      regions: [
        { name: "U.P & Delhi NCR", price: "₹3,500" },
        { name: "Other States of India", price: "₹4,000" }
      ],
      features: [
        "Everything same as Single Pickup Plan",
        "Four cartons for storing used pooja materials",
        "Weight of packed carton which you can give us should be upto 6kg",
        "Validity: 12 months",
        "Priority pickup scheduling"
      ],
      popular: false
    }
  ];

  const cardVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index === 0 ? -50 : index === 2 ? 50 : 0,
      y: index === 1 ? 50 : 0,
      scale: 0.95,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F7F4ED' }}>
      {/* Background Gradient Blobs */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-shape-1"
        style={{
          background: 'linear-gradient(135deg, #4A3F35 0%, #F3D55B 100%)',
          opacity: 0.07,
        }}
        animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-shape-2"
        style={{
          background: 'linear-gradient(135deg, #F3D55B 0%, #4A3F35 100%)',
          opacity: 0.07,
        }}
        animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      />

      <style>{`
        @keyframes float-idle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-1px) translateX(1px);
          }
          50% {
            transform: translateY(-2px) translateX(0px);
          }
          75% {
            transform: translateY(-1px) translateX(-1px);
          }
        }

        .membership-card {
          animation: float-idle 6s ease-in-out infinite;
        }

        .membership-card:hover {
          animation-play-state: paused;
          transform: translateY(-5px);
        }
        
        .header-accent {
            width: 64px;
            height: 2px;
            background: linear-gradient(90deg, #4A3F35, #F3D55B, #4A3F35);
            margin: 0 auto 1.5rem;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={inView ? { width: "64px", opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="header-accent"
            />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#F3D55B', color: '#4A3F35' }}>
                <span className="text-sm font-medium">Join Our Mission</span>
            </div>
            <h2 className="text-4xl mb-4 font-bold" style={{ color: '#4A3F35' }}>
                Annual Membership Plans - Pan India
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#333333' }}>
                Adopt our Membership plans, so that we can keep doing this work and establish a Circular Economy. 
                Let's STOP the disrespect of POOJA NIRMALYA and see the Magic of Upcycling.
            </p>
            <p className="text-sm mt-4 italic" style={{ color: '#4A3F35' }}>
                Just give us a call whenever your carton is full & we'll schedule a pickup within a year
            </p>
          </motion.div>
        </div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="membership-card relative rounded-[20px] shadow-lg overflow-hidden flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                border: plan.popular ? '4px solid #4A3F35' : '2px solid transparent',
                transition: 'box-shadow 0.3s ease-out, transform 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08), 0 0 30px rgba(243, 213, 91, 0.3), 0 0 50px rgba(74, 63, 53, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-[20px] z-10" style={{ backgroundColor: '#F3D55B', color: '#4A3F35' }}>
                  <span className="text-sm font-semibold">Most Popular</span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow">
                {/* Plan Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#F3D55B' }}>
                  <Package className="w-8 h-8" style={{ color: '#4A3F35' }} />
                </div>

                {/* Plan Title */}
                <h3 className="text-2xl mb-6 font-bold" style={{ color: '#4A3F35' }}>
                  {plan.title}
                </h3>

                {/* Pricing for Both Regions */}
                <div className="mb-6 space-y-3">
                  {plan.regions.map((region, idx) => (
                    <div 
                      key={idx}
                      className="rounded-lg p-4"
                      style={{ backgroundColor: '#C9C5BD' }}
                    >
                      <p className="text-sm mb-1 font-medium" style={{ color: '#333333' }}>{region.name}</p>
                      <p className="text-3xl font-bold" style={{ color: '#4A3F35' }}>{region.price}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F3D55B' }}>
                        <Check className="w-3 h-3" style={{ color: '#4A3F35' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#333333' }}>{feature}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button - All cards have the same button */}
                <button 
                  onClick={() => handleChoosePlan(plan)}
                  className="w-full py-3 rounded-[10px] font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg mt-auto"
                  style={{
                    backgroundColor: '#F3D55B',
                    color: '#4A3F35',
                    boxShadow: '0 2px 8px rgba(74, 63, 53, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E6C84A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3D55B';
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-block rounded-[20px] shadow-lg p-8 max-w-2xl" style={{ backgroundColor: '#FFFFFF' }}>
            <h4 className="text-xl mb-4 font-bold" style={{ color: '#4A3F35' }}>
              Nivaran is committed to promote Sustainability
            </h4>
            <p className="mb-4" style={{ color: '#333333' }}>
              We encourage women from less privileged background to acquire new skills and giving them opportunity to earn by this.
            </p>
            <p className="text-sm" style={{ color: '#4A3F35' }}>
              Need help choosing? Contact us for personalized assistance
            </p>
            <button 
              className="mt-6 px-8 py-3 rounded-[10px] transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: '#F3D55B',
                color: '#4A3F35',
                boxShadow: '0 2px 8px rgba(74, 63, 53, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E6C84A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3D55B';
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Side Sheet - Rendered via Portal */}
      {isSideSheetOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            style={{ zIndex: 9998 }}
            onClick={() => setIsSideSheetOpen(false)}
          />
          
          {/* Side Sheet Panel */}
          <div 
            className="fixed top-0 left-0 h-full w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden flex flex-col translate-x-0"
            style={{ 
              backgroundColor: '#FFFFFF',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F3D55B' }}>
                  <Package className="w-5 h-5" style={{ color: '#4A3F35' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#4A3F35' }}>
                  {currentStep === 1 ? 'Select Region' : 'Registration'}
                </h3>
              </div>
              <button
                onClick={() => setIsSideSheetOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" style={{ color: '#4A3F35' }} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Plan Summary - Always visible at top */}
              {selectedPlan && (
                <div className="p-6 border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#F7F4ED' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📦</span>
                    <h4 className="text-lg font-bold" style={{ color: '#4A3F35' }}>
                      {selectedPlan.title}
                    </h4>
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#333333' }}>
                    {selectedPlan.features[0]}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: '#4A3F35' }}>Price:</span>
                    <span className="text-xl font-bold" style={{ color: '#4A3F35' }}>
                      {selectedState ? getSelectedPrice() : 'Select region to see price'}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 1: State Selection */}
              {currentStep === 1 && (
                <div className="p-6 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5" style={{ color: '#4A3F35' }} />
                    <h4 className="text-lg font-semibold" style={{ color: '#4A3F35' }}>
                      Which region do you belong to?
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {selectedPlan?.regions.map((region: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleStateSelect(region.name)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedState === region.name
                            ? 'border-[#4A3F35] shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          backgroundColor: selectedState === region.name ? '#F7F4ED' : '#FFFFFF',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedState === region.name ? 'border-[#4A3F35]' : 'border-gray-300'
                            }`}>
                              {selectedState === region.name && (
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4A3F35' }} />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold" style={{ color: '#4A3F35' }}>
                                {region.name}
                              </p>
                              <p className="text-sm" style={{ color: '#666666' }}>
                                {region.price}
                              </p>
                            </div>
                          </div>
                          <Navigation className="w-5 h-5" style={{ color: selectedState === region.name ? '#4A3F35' : '#999999' }} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!selectedState}
                    className={`w-full mt-6 py-3 rounded-[10px] font-semibold transition-all duration-300 ${
                      selectedState
                        ? 'hover:scale-[1.02] shadow-md hover:shadow-lg'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{
                      backgroundColor: selectedState ? '#F3D55B' : '#E5E5E5',
                      color: selectedState ? '#4A3F35' : '#999999',
                      boxShadow: selectedState ? '0 2px 8px rgba(74, 63, 53, 0.15)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedState) {
                        e.currentTarget.style.backgroundColor = '#E6C84A';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedState) {
                        e.currentTarget.style.backgroundColor = '#F3D55B';
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 2: Registration Form */}
              {currentStep === 2 && (
                <div className="p-6 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5" style={{ color: '#4A3F35' }} />
                    <h4 className="text-lg font-semibold" style={{ color: '#4A3F35' }}>
                      Enter Your Details
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                        style={{ borderColor: '#E5E5E5' }}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                        <Phone className="w-4 h-4 inline mr-2" />
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                        style={{ borderColor: '#E5E5E5' }}
                        placeholder="Enter your mobile number"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                        style={{ borderColor: '#E5E5E5' }}
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                        <MapPinned className="w-4 h-4 inline mr-2" />
                        Address *
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors resize-none"
                        style={{ borderColor: '#E5E5E5', minHeight: '80px' }}
                        placeholder="Enter your complete address"
                      />
                    </div>

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                          <Navigation className="w-4 h-4 inline mr-2" />
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.landmark}
                          onChange={(e) => handleInputChange('landmark', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                          style={{ borderColor: '#E5E5E5' }}
                          placeholder="Landmark"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                          <Building2 className="w-4 h-4 inline mr-2" />
                          City (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                          style={{ borderColor: '#E5E5E5' }}
                          placeholder="City"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Pincode (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                        style={{ borderColor: '#E5E5E5' }}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 rounded-[10px] font-semibold transition-all duration-300 border-2"
                      style={{
                        borderColor: '#4A3F35',
                        color: '#4A3F35',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F7F4ED';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3 rounded-[10px] font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                      style={{
                        backgroundColor: '#F3D55B',
                        color: '#4A3F35',
                        boxShadow: '0 2px 8px rgba(74, 63, 53, 0.15)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E6C84A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#F3D55B';
                      }}
                    >
                      Confirm & Proceed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}