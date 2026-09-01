import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import gamLogo from '../assets/gam.jpg';

export default function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products', targetId: 'products' },
    { name: 'Collection', href: '#collection', targetId: 'collection' },
    { name: 'Bespoke Process', href: '#process', targetId: 'process' },
  ];

  const handleNavClick = (link, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (link.action) {
      link.action();
      return;
    }

    const targetId = link.targetId || (link.href && link.href.startsWith('#') ? link.href.substring(1) : null);
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -70; // Header offset
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/98 backdrop-blur-[20px] border-b border-[#C8B8A6]/40 py-3.5 shadow-sm'
            : 'bg-gradient-to-b from-[#1A1A1A]/60 via-[#1A1A1A]/20 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Header */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            {/* Gams Hem Brand Logo */}
            <div className="w-10 h-10 rounded-[2px] overflow-hidden border border-[#C8B8A6]/60 shadow-md group-hover:border-[#6A1C24] transition-all bg-[#4D1016]">
              <img
                src={gamLogo}
                alt="Gams Hem Bespoke Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className={`font-cinzel text-lg md:text-xl font-bold tracking-[0.2em] transition-colors ${
                scrolled || mobileMenuOpen ? 'text-[#1A1A1A]' : 'text-white drop-shadow-sm'
              }`}>
                GAMS HEM
              </span>
              <span className={`text-[9px] uppercase tracking-[0.3em] font-sans font-medium -mt-1 transition-colors ${
                scrolled || mobileMenuOpen ? 'text-[#6A1C24]' : 'text-[#E5DDD5]'
              }`}>
                Bespoke Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Products, Collection, Bespoke Process) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href || '#'}
                onClick={(e) => handleNavClick(link, e)}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors relative group py-1 cursor-pointer ${
                  scrolled 
                    ? 'text-[#5C5650] hover:text-[#6A1C24]' 
                    : 'text-[#F4EFEA]/90 hover:text-white drop-shadow-sm'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#6A1C24] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onBookClick}
              className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-all duration-300 cursor-pointer rounded-[2px] shadow-md hover:shadow-lg flex items-center gap-2 border border-[#C8B8A6]/30 hover:border-[#C8B8A6]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8B8A6]" />
              <span>Book Private Fitting</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-[2px] cursor-pointer transition-colors focus:outline-none ${
                scrolled || mobileMenuOpen ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Animated Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/98 backdrop-blur-xl border-b border-[#C8B8A6] px-6 py-8 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(e) => handleNavClick(link, e)}
                    className="w-full text-left text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#6A1C24] transition-colors py-2 flex items-center justify-between border-b border-[#EDEDED] cursor-pointer select-none"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#C8B8A6]" />
                  </button>
                ))}
                
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onBookClick) onBookClick();
                    }}
                    className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest py-4 font-bold transition-all cursor-pointer rounded-[2px] shadow-lg flex items-center justify-center gap-2 border border-[#C8B8A6]/40"
                  >
                    <Sparkles className="w-4 h-4 text-[#C8B8A6]" />
                    <span>Book Private Fitting</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-[#1A1A1A]/40 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
