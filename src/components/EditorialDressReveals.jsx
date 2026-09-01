import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Eye, Sparkles } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/gowns';

export default function EditorialDressReveals({ onBookGown, onViewGownDetails }) {
  return (
    <section id="collection" className="relative">
      {FEATURED_PRODUCTS.map((suit, index) => {
        const isEven = index % 2 === 1;
        const isCream = index % 2 === 0;

        return (
          <div
            key={suit.id}
            className={`min-h-screen relative flex items-center py-20 md:py-28 px-6 md:px-16 overflow-hidden ${
              isCream ? 'bg-white' : 'bg-[#FAFAFA]'
            }`}
          >
            {/* Radial Gradient Wash Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{ background: suit.bgWash }}
            />

            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column with Smooth Motion Parallax Reveal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-[#C8B8A6]/80 shadow-2xl group bg-[#EDEDED]"
                  >
                    <img
                      src={suit.image}
                      alt={suit.name}
                      loading="lazy"
                      className="w-full h-full object-cover saturate-[0.88] group-hover:saturate-105 group-hover:scale-106 transition-all duration-700 ease-out"
                    />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 left-4 bg-[#1A1A1A]/85 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-[#F4EFEA] border border-[#C8B8A6]/40">
                      {suit.category_name}
                    </div>

                    {/* Floating Quality Badge */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-[#6A1C24] border border-[#C8B8A6] shadow-sm hidden sm:flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Archival Cut</span>
                    </motion.div>

                    {/* Ghost Number in Bottom Corner */}
                    <div
                      className={`absolute bottom-4 ${
                        isEven ? 'left-6' : 'right-6'
                      } pointer-events-none select-none`}
                    >
                      <span className="font-cormorant text-8xl md:text-9xl text-[#C8B8A6] opacity-30 font-light leading-none">
                        {suit.number}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'
                  }`}
                >
                  {/* Small Ornamental Counter */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-[#6A1C24]" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#6A1C24] font-sans">
                      Atelier Highlight {suit.number} of 3
                    </span>
                  </div>

                  {/* Suit Name */}
                  <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-2 leading-tight">
                    {suit.name}
                  </h2>

                  {/* Silhouette */}
                  <span className="text-xs uppercase tracking-widest font-medium text-[#8C847C] font-sans block mb-6">
                    {suit.silhouette}
                  </span>

                  {/* Hairline Divider */}
                  <div className="w-full h-px bg-[#C8B8A6]/60 mb-6" />

                  {/* Italic Editorial Description */}
                  <p className="font-cormorant italic text-xl md:text-2xl text-[#3E1418] leading-relaxed mb-6">
                    "{suit.description}"
                  </p>

                  {/* Key Details pill list */}
                  <div className="flex flex-wrap gap-2 mb-8 text-xs text-[#5C5650] font-sans">
                    <span className="bg-white border border-[#C8B8A6] px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium shadow-xs">
                      Cloth: {suit.fabric}
                    </span>
                    <span className="bg-white border border-[#C8B8A6] px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium shadow-xs">
                      Lapel: {suit.lapel_style}
                    </span>
                  </div>

                  {/* Two Action Buttons */}
                  <div className="flex flex-wrap items-center gap-5">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onBookGown(suit.name)}
                      className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest px-8 py-4 font-semibold transition-colors duration-300 cursor-pointer rounded-[2px] shadow-md hover:shadow-lg flex items-center gap-2 border border-[#C8B8A6]/40"
                    >
                      <Scissors className="w-4 h-4 text-[#C8B8A6]" />
                      <span>Book to Tailor This Style →</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 3 }}
                      onClick={() => onViewGownDetails(suit)}
                      className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] border-b-2 border-[#6A1C24] pb-1 hover:text-[#6A1C24] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Sartorial Details</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
