import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import { Search, Eye } from 'lucide-react';

export default function MasonryGallery({ onSelectGown, products = [], categories = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active categories from store
  const activeCategories = categories.filter(c => c.is_active !== false);

  // Filter products based on active tab and search query
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      activeFilter === 'all' ||
      item.category_id === activeFilter ||
      item.category === activeFilter ||
      item.category_name?.toLowerCase().includes(activeFilter.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabric?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lapel_style?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-[#C8B8A6]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <OrnamentalDivider label="Atelier Archive" className="max-w-xs mx-auto mb-6" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-4">
            The Bespoke <span className="italic text-[#6A1C24]">Collection</span>
          </h2>
          <p className="font-cormorant italic text-xl text-[#5C5650] max-w-2xl mx-auto">
            From Black Tie galas to traditional royalty, explore our curated archive of handcrafted menswear.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="w-4 h-4 text-[#8C847C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by suit name, fabric (e.g. Loro Piana, Velvet)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-14 py-3 bg-[#FAFAFA] border border-[#C8B8A6] focus:border-[#6A1C24] text-xs font-sans text-[#1A1A1A] rounded-[2px] focus:outline-none transition-colors shadow-xs placeholder-[#8C847C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans uppercase tracking-wider text-[#8C847C] hover:text-[#1A1A1A] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Fully Responsive Silhouette Filter Tabs with Smooth Framer Motion layoutId */}
          <div className="relative mt-6 max-w-5xl mx-auto">
            {/* Scrollable Container with Mobile Affordance */}
            <div className="overflow-x-auto no-scrollbar scroll-smooth flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 md:gap-3 py-2 px-1">
              {activeCategories.map((cat) => {
                const isSelected = activeFilter === cat.slug || (cat.slug === 'all' && activeFilter === 'all') || activeFilter === cat.id;
                const count = cat.slug === 'all' 
                  ? products.length 
                  : products.filter(p => p.category_id === cat.id || p.category === cat.name || p.category_name === cat.name).length;

                return (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => setActiveFilter(cat.slug || cat.id)}
                    className={`relative whitespace-nowrap shrink-0 inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-widest px-4 py-2.5 transition-colors duration-300 cursor-pointer rounded-[2px] font-sans select-none border ${
                      isSelected
                        ? 'text-[#F4EFEA] border-[#6A1C24]'
                        : 'bg-[#FAFAFA] text-[#5C5650] hover:text-[#1A1A1A] hover:border-[#6A1C24] hover:bg-white border-[#C8B8A6]/70'
                    }`}
                  >
                    {/* Smooth sliding active indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#6A1C24] rounded-[2px] shadow-md z-0"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}

                    <span className="relative z-10 whitespace-nowrap font-medium">{cat.name}</span>
                    <span className={`relative z-10 inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded-full text-[10px] font-mono leading-none transition-colors duration-300 ${
                      isSelected ? 'bg-white/25 text-white font-bold' : 'bg-[#E5DDD5] text-[#5C5650]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16 bg-[#FAFAFA] border border-[#C8B8A6]/60 rounded-[2px] max-w-lg mx-auto p-8"
          >
            <p className="font-cormorant italic text-2xl text-[#5C5650] mb-3">
              "No garments found matching your filter."
            </p>
            <p className="text-xs text-[#8C847C] font-sans mb-6">
              Try adjusting your search query or select another category tab.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest px-6 py-3 font-semibold rounded-[2px] transition-colors cursor-pointer"
            >
              View All Collections
            </button>
          </motion.div>
        )}

        {/* Masonry CSS Columns Layout with Framer Motion AnimatePresence */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((suit, idx) => (
              <motion.div
                key={suit.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.45, 
                  delay: Math.min(idx * 0.04, 0.2), 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                onClick={() => onSelectGown(suit)}
                className="break-inside-avoid relative overflow-hidden rounded-[2px] border border-[#C8B8A6]/80 group cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="relative overflow-hidden bg-[#EDEDED]">
                  <img
                    src={suit.image}
                    alt={suit.name || suit.title}
                    loading="lazy"
                    className="w-full h-auto object-cover saturate-[0.88] group-hover:saturate-105 group-hover:scale-106 transition-all duration-700 ease-out"
                  />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold text-[#F4EFEA] border border-[#C8B8A6]/40">
                    {suit.category_name || suit.category || "Bespoke Menswear"}
                  </div>

                  {/* Dark Burgundy Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#6A1C24]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C8B8A6] block mb-1 font-sans">
                      {suit.lapel_style || "Hand-Tailored"}
                    </span>
                    <h3 className="font-cormorant text-2xl md:text-3xl font-light text-[#F4EFEA] tracking-tight mb-1">
                      {suit.name || suit.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest font-medium text-[#E5DDD5]/90 font-sans mb-3 line-clamp-1">
                      {suit.silhouette}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#C8B8A6] border-b border-[#C8B8A6] pb-0.5 w-max">
                      <Eye className="w-3 h-3" />
                      <span>Examine Garment Details →</span>
                    </span>
                  </div>
                </div>

                {/* Card Bottom Permanent Summary */}
                <div className="p-5 bg-white flex items-center justify-between border-t border-[#C8B8A6]/50">
                  <div>
                    <h4 className="font-cormorant text-2xl text-[#1A1A1A] font-light leading-tight">
                      {suit.name || suit.title}
                    </h4>
                    <p className="text-[11px] uppercase tracking-widest text-[#8C847C] font-sans mt-0.5 line-clamp-1">
                      {suit.fabric || suit.fabric_details || suit.silhouette}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-[1px] bg-[#6A1C24]/10 text-[#6A1C24] flex items-center justify-center group-hover:bg-[#6A1C24] group-hover:text-[#F4EFEA] transition-colors shrink-0 ml-3">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

