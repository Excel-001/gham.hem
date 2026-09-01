import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function AtelierAnatomy() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "canvas",
      title: "Full Floating Horsehair Canvas",
      subtitle: "The Living Skeleton of Bespoke Suiting",
      description: "Unlike fused mass-market suits that are glued together, Gams Hem uses a natural horsehair and wool canvas hand-stitched between the shell and the lining. Over time, your body heat molds this floating canvas to your personal physique, creating an unrivaled drape and permanent structural memory.",
      tag: "Structural Integrity",
      stat: "100% Floating Canvas",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "milanese",
      title: "Hand-Sewn Milanese Buttonhole",
      subtitle: "The Signature Hallmark of the Master Tailor",
      description: "A single raised lapel buttonhole takes our master artisan over two hours of uninterrupted precision. Using thick gimp wire wrapped in glistening silk cordonnet thread, it creates a sculptural ridge that holds a floral boutonnière with regal pride.",
      tag: "2 Hours Handwork",
      stat: "Pure Silk Cordonnet",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "surgeon",
      title: "Surgeon's Cuffs (Working Buttonholes)",
      subtitle: "Functional Distinction Dating Back to 19th Century London",
      description: "Every Gams Hem jacket features four functioning sleeve buttonholes, cut by hand after the final baste fitting. Fastened with genuine water-buffalo horn or Australian mother-of-pearl buttons sewn on a shank with cross-stitch anchoring.",
      tag: "Functional Art",
      stat: "Genuine Horn Buttons",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "lining",
      title: "Pure Bemberg Cupro Silk Lining",
      subtitle: "Thermoregulating Luxury Next to Your Skin",
      description: "Imported from prestigious Japanese mills, our cupro linings are anti-static, breathable, and smoother than raw silk. Available in custom jacquards, rich Burgundy, or personalized monogrammed weaves that glide effortlessly over shirts.",
      tag: "Climate Comfort",
      stat: "Breathable & Anti-Static",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80"
    }
  ];

  return (
    <section id="atelier" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-[#C8B8A6]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <OrnamentalDivider label="The Atelier Craft" className="max-w-xs mx-auto mb-6" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-4">
            The Anatomy of <span className="italic text-[#6A1C24]">Sartorial Excellence</span>
          </h2>
          <p className="font-cormorant italic text-xl text-[#5C5650]">
            Every stitch, fold, and internal canvas represents an unyielding devotion to classic tailoring.
          </p>
        </motion.div>

        {/* Interactive Feature Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {features.map((feat, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`text-left p-6 transition-all duration-300 rounded-[2px] border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'text-[#F4EFEA] border-[#6A1C24] shadow-xl'
                      : 'bg-[#FAFAFA] text-[#1A1A1A] border-[#C8B8A6]/60 hover:border-[#6A1C24] hover:bg-white'
                  }`}
                >
                  {/* Sliding Active Tab Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeAnatomyTab"
                      className="absolute inset-0 bg-[#6A1C24] z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase tracking-widest font-semibold font-sans px-2.5 py-0.5 rounded-[1px] ${
                      isActive ? 'bg-[#F4EFEA]/20 text-[#E5DDD5]' : 'bg-[#6A1C24]/10 text-[#6A1C24]'
                    }`}>
                      0{idx + 1} · {feat.tag}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-[#C8B8A6] translate-x-1' : 'text-[#8C847C]'
                    }`} />
                  </div>

                  <h3 className="relative z-10 font-cormorant text-2xl font-light tracking-tight mb-1">
                    {feat.title}
                  </h3>
                  
                  <p className={`relative z-10 text-xs font-sans line-clamp-1 ${
                    isActive ? 'text-[#E5DDD5]' : 'text-[#8C847C]'
                  }`}>
                    {feat.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Showcase Panel */}
          <div className="lg:col-span-7 bg-white border border-[#C8B8A6] p-8 md:p-12 rounded-[2px] shadow-lg flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-[#C8B8A6]/60 relative shadow-inner">
                  <img
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover saturate-[0.9] hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 right-3 bg-[#1A1A1A]/85 backdrop-blur-xs px-3 py-1 text-xs font-sans text-[#F4EFEA] border border-[#C8B8A6]/40">
                    {features[activeFeature].stat}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#6A1C24] font-semibold block mb-1">
                    {features[activeFeature].subtitle}
                  </span>
                  <h4 className="font-cormorant text-3xl md:text-4xl text-[#1A1A1A] font-light mb-4">
                    {features[activeFeature].title}
                  </h4>
                  <p className="text-sm md:text-base text-[#5C5650] leading-relaxed font-sans">
                    {features[activeFeature].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-[#C8B8A6]/60 flex items-center justify-between text-xs text-[#8C847C] font-sans">
              <span className="flex items-center gap-2 text-[#6A1C24] font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#6A1C24]" />
                Standard on all Gams Hem Bespoke Commissions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
