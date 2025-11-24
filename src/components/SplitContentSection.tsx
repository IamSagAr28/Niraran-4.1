import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SplitContentSection() {
  return (
    <section id="our-story" className="py-16 bg-[#dad7cd]/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
            {/* REPLACE WITH YOUR MISSION IMAGE */}
            {/* Example: import missionImage from "figma:asset/YOUR_IMAGE_HASH.png"; */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1610177498701-4f00c0bd1694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBjcmFmdHN8ZW58MXx8fHwxNzYzMDMxMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Our mission"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <h2 className="text-4xl text-[#344e41]">Our Mission: Creating a Sustainable Future</h2>
            <p className="text-lg text-[#3a5a40]">
              At Nivaran Upcyclers, we believe in the power of transformation. We take discarded materials and breathe new life into them, creating beautiful, functional products that tell a story.
            </p>
            <p className="text-[#3a5a40]">
              Founded with a vision to reduce waste and promote sustainable living, we work closely with local artisans to craft unique pieces that not only look good but also do good for our planet.
            </p>
            <p className="text-[#3a5a40]">
              Every purchase you make supports local communities, reduces environmental impact, and contributes to a circular economy.
            </p>
            <div className="pt-4 flex gap-4">
              <button className="px-8 py-3 bg-[#588157] text-white hover:bg-[#3a5a40] rounded-lg transition-colors">
                About Us
              </button>
              <button className="px-8 py-3 border-2 border-[#588157] text-[#588157] hover:bg-[#a3b18a]/20 rounded-lg transition-colors">
                Our Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
