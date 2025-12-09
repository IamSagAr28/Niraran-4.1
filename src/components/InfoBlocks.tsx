import { Recycle, Heart, Users, Award } from "lucide-react";

export function InfoBlocks() {
  return (
    <section className="py-12 bg-[#dad7cd]/30">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Block 1 */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-lg h-full">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-[#3a5a40]" />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-[#344e41]">Pooja Waste Upcycling</h3>
              <p className="text-[#3a5a40] text-sm leading-relaxed">
                We specialize in upcycling pooja waste, repurposing discarded religious materials into high-quality, eco-friendly products including natural dyes, organic fertilizers, and artisanal crafts.
              </p>
            </div>
          </div>

          {/* Info Block 2 */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-lg h-full">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#3a5a40]" />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-[#344e41]">Cultural Preservation</h3>
              <p className="text-[#3a5a40] text-sm leading-relaxed">
                Transforming traditional practices into opportunities for positive social and environmental impact. We collaborate with temples, religious organizations, and local communities for culturally sensitive solutions.
              </p>
            </div>
          </div>

          {/* Info Block 3 */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-lg h-full">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#3a5a40]" />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-[#344e41]">Community Empowerment</h3>
              <p className="text-[#3a5a40] text-sm leading-relaxed">
                We work with local communities, providing fair employment and skill development opportunities. Together, we're building a sustainable future through collaborative engagement.
              </p>
            </div>
          </div>

          {/* Info Block 4 */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-lg h-full">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#a3b18a]/40 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-[#3a5a40]" />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-[#344e41]">Circular Economy</h3>
              <p className="text-[#3a5a40] text-sm leading-relaxed">
                Creating a circular economy where waste is reimagined as a valuable resource. Our research-based approach ensures effective and culturally sensitive upcycling techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
