import React from 'react';
import { motion } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import { Ruler, Palette, Sparkles, Shirt } from 'lucide-react';

export default function BespokeProcess({ onBookClick }) {
  const steps = [
    {
      num: "01",
      title: "Anatomy & 40-Point Protocol",
      subtitle: "The Foundation of Form",
      description: "Your master styling consultant analyzes posture, shoulder slope, stance, and neck curvature while logging 40+ precise body dimensions.",
      icon: Ruler,
      duration: "45 Minutes"
    },
    {
      num: "02",
      title: "Cloth & Mill Curation",
      subtitle: "Tactile Distinction",
      description: "Select from over 2,000 archival cloths from world-renowned mills including Loro Piana, Scabal, Dormeuil, and Holland & Sherry.",
      icon: Palette,
      duration: "Over 2,000 Swatches"
    },
    {
      num: "03",
      title: "The Baste Fitting",
      subtitle: "Intermediate Canvas Trial",
      description: "Your suit is hand-basted with white temporary thread without linings or lapel facings to sculpt millimeter tolerances directly on your physique.",
      icon: Shirt,
      duration: "2-3 Weeks After Order"
    },
    {
      num: "04",
      title: "Final Delivery & Immortality",
      subtitle: "Sartorial Completion",
      description: "Final surgeon cuffs cut, buttonholes hand-rolled, and garment pressed with heavy steam. Packaged in a bespoke cedarwood garment trunk.",
      icon: Sparkles,
      duration: "Guaranteed Lifetime Fit"
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-12 bg-[#FAFAFA] border-t border-[#C8B8A6]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <OrnamentalDivider label="The Bespoke Journey" className="max-w-xs mx-auto mb-6" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Four Steps to <span className="italic text-[#6A1C24]">Perfection</span>
          </h2>
          <p className="font-cormorant italic text-xl text-[#5C5650]">
            From initial sketch to your private dressing room, experience true bespoke craftsmanship.
          </p>
        </motion.div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#C8B8A6]/70 p-8 rounded-[2px] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-cormorant text-4xl font-light text-[#6A1C24] group-hover:scale-110 transition-transform duration-300 inline-block">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-[1px] bg-[#6A1C24]/10 text-[#6A1C24] flex items-center justify-center border border-[#6A1C24]/20 group-hover:bg-[#6A1C24] group-hover:text-[#F4EFEA] transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-[#8C847C] font-semibold block mb-1 font-sans">
                    {step.subtitle}
                  </span>

                  <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#5C5650] leading-relaxed font-sans mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8B8A6]/40 flex items-center justify-between text-[11px] text-[#6A1C24] font-semibold uppercase tracking-wider font-sans">
                  <span>Timeline</span>
                  <span>{step.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1A1A1A] text-[#F4EFEA] p-8 md:p-12 rounded-[2px] border border-[#C8B8A6]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-cormorant text-2xl md:text-3xl font-light tracking-tight">
              Begin Your Bespoke Commission Today
            </h3>
            <p className="text-xs md:text-sm text-[#C8B8A6] font-sans">
              Appointments strictly limited to eight gentlemen each week to ensure total privacy and dedicated tailoring.
            </p>
          </div>

          <button
            onClick={onBookClick}
            className="bg-[#6A1C24] hover:bg-[#8B2631] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-8 py-4 transition-all duration-300 cursor-pointer rounded-[2px] shadow-lg whitespace-nowrap border border-[#C8B8A6]/40"
          >
            Reserve Your Fitting Slot →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
