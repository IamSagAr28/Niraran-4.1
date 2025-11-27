import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedBanner() {
  return (
    <section className="bg-[#dad7cd]/30 py-12">
      <div className="container mx-auto px-4">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#e6ecd9]">
          {/* REPLACE WITH YOUR WORKSHOP IMAGE */}
          {/* Example: import workshopImage from "figma:asset/YOUR_IMAGE_HASH.png"; */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500472141701-084e6fa44840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzMDMxMjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Artisan workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#344e41]/80 to-[#3a5a40]/80 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-xl text-white px-4">
              <h2 className="text-4xl md:text-5xl font-bold">Join Our Upcycling Workshops</h2>
              <p className="text-lg md:text-xl">Learn the art of transforming waste into beautiful products</p>
              <button className="mt-6 px-8 py-3 bg-white/95 text-[#3a5a40] hover:bg-white rounded-lg transition-colors shadow-sm">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
