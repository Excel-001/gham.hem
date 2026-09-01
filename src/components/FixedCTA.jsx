import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors } from 'lucide-react';

export default function FixedCTA({ onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appears after 1.5x viewport height scroll
      const threshold = window.innerHeight * 1.5;
      if (window.scrollY > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
        >
          <button
            onClick={onClick}
            className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-6 py-4 flex items-center gap-3 transition-all duration-300 cursor-pointer rounded-[2px] border border-[#C8B8A6] shadow-2xl hover:shadow-[0_10px_30px_rgba(106,28,36,0.5)]"
          >
            <Scissors className="w-4 h-4 text-[#C8B8A6]" />
            <span>Book Private Fitting</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

