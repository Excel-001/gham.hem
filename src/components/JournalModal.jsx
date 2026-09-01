import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/testimonials';
import OrnamentalDivider from './OrnamentalDivider';

export default function JournalModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-[10px]"
        />

        {/* Modal Content Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-4xl border border-[#C8B8A6] shadow-2xl z-10 overflow-hidden my-auto rounded-[2px] p-6 md:p-10 max-h-[88vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#6A1C24] flex items-center gap-1.5 bg-[#FAFAFA] px-3.5 py-2 border border-[#C8B8A6] cursor-pointer rounded-[1px] z-20 transition-colors"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>

          <div className="text-center max-w-xl mx-auto mb-12">
            <OrnamentalDivider label="Atelier Journal" className="max-w-xs mx-auto mb-4" />
            <h2 className="font-cormorant text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-tight">
              Sartorial Chronicles
            </h2>
            <p className="font-cormorant italic text-lg text-[#5C5650] mt-2">
              Dispatches on fabric lineage, structural anatomy, and the renaissance of bespoke menswear.
            </p>
          </div>

          <div className="space-y-12">
            {JOURNAL_ARTICLES.map((article) => (
              <div key={article.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#C8B8A6]/60 pb-10 last:border-b-0">
                <div className="md:col-span-5 aspect-[4/3] overflow-hidden border border-[#C8B8A6] rounded-[1px] bg-[#E5DDD5]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover saturate-[0.9] hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#8C847C] font-sans">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span className="uppercase tracking-widest font-semibold text-[#6A1C24]">{article.author}</span>
                  </div>
                  <h3 className="font-cormorant text-2xl md:text-3xl font-light text-[#1A1A1A]">
                    {article.title}
                  </h3>
                  <p className="font-cormorant italic text-base text-[#3E1418]">
                    "{article.subtitle}"
                  </p>
                  <p className="text-xs md:text-sm text-[#5C5650] leading-relaxed font-sans">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

