import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

export function FeatureIcons() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹999 across India"
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "100% handcrafted with premium materials"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "7-day hassle-free return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer service team"
    }
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#FAF7F2', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <style>{`
        .feature-item-group {
          transition: all 0.25s ease;
        }
        .feature-item-group:hover {
          transform: translateY(-4px);
        }
        .feature-item-group:hover .feature-icon {
          transform: scale(1.07);
        }
        .feature-item-group:hover .feature-icon-accent {
          color: #3D7F4E;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-2 feature-item-group">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <feature.icon className="w-9 h-9 text-[#555] feature-icon" strokeWidth={1.5} />
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-full feature-icon-accent" 
                  style={{ 
                    border: '2px solid #D4A017', 
                    opacity: 0.2,
                    transition: 'color 0.25s ease'
                  }}
                />
              </div>
              <h3 className="font-semibold text-base" style={{ color: '#222', fontSize: '1.05rem' }}>{feature.title}</h3>
              <p className="text-sm" style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.4 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
