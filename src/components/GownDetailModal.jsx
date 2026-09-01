import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scissors, Check, Play, Film } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppConcierge';

export default function GownDetailModal({ gown, onClose, onBookGown }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    if (!gown) return;
    setSelectedImage(gown.image);
    setIsVideoMode(false);

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gown, onClose]);

  if (!gown) return null;

  const currentMainImage = selectedImage || gown.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-[10px]"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-[960px] border border-[#C8B8A6] shadow-2xl z-10 overflow-hidden my-auto rounded-[2px]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#6A1C24] flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-2 border border-[#C8B8A6] cursor-pointer rounded-[1px] transition-colors"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
            {/* Left Column - Main Image / Video & Thumbnails */}
            <div className="md:col-span-6 relative bg-[#E5DDD5] min-h-[380px] md:min-h-full flex flex-col justify-between p-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1px] border border-[#C8B8A6]/70 shadow-md bg-black">
                {isVideoMode && gown.video ? (
                  <video
                    src={gown.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentMainImage}
                    alt={gown.name || gown.title}
                    className="w-full h-full object-cover saturate-[0.9]"
                  />
                )}

                {/* Silhouette Tag */}
                <div className="absolute bottom-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-[#F4EFEA] border border-[#C8B8A6]/40">
                  {gown.silhouette}
                </div>

                {/* Video Play Button Overlay if video available */}
                {gown.video && !isVideoMode && (
                  <button
                    onClick={() => setIsVideoMode(true)}
                    className="absolute top-3 left-3 bg-[#6A1C24]/90 hover:bg-[#6A1C24] text-[#F4EFEA] px-3 py-1.5 rounded-[1px] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Play Video Reel</span>
                  </button>
                )}
              </div>

              {/* Thumbnails Gallery & Video Switcher */}
              <div className="grid grid-cols-5 gap-2 mt-3">
                {gown.video && (
                  <div
                    onClick={() => setIsVideoMode(true)}
                    className={`aspect-square overflow-hidden border cursor-pointer flex flex-col items-center justify-center bg-[#1A1A1A] text-[#F4EFEA] ${
                      isVideoMode ? 'border-[#6A1C24] ring-2 ring-[#6A1C24]/30' : 'border-[#C8B8A6]/60'
                    }`}
                    title="Watch Suit in Motion"
                  >
                    <Film className="w-4 h-4 text-[#D4AF37] mb-0.5" />
                    <span className="text-[8px] uppercase tracking-wider font-semibold">Reel</span>
                  </div>
                )}
                
                <div
                  onClick={() => {
                    setIsVideoMode(false);
                    setSelectedImage(gown.image);
                  }}
                  className={`aspect-square overflow-hidden border cursor-pointer ${
                    !isVideoMode && currentMainImage === gown.image ? 'border-[#6A1C24] ring-2 ring-[#6A1C24]/30' : 'border-[#C8B8A6]/60'
                  }`}
                >
                  <img src={gown.image} alt="main" className="w-full h-full object-cover" />
                </div>

                {gown.detailsGrid && gown.detailsGrid.slice(0, gown.video ? 3 : 4).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIsVideoMode(false);
                      setSelectedImage(img);
                    }}
                    className={`aspect-square overflow-hidden border cursor-pointer ${
                      !isVideoMode && currentMainImage === img ? 'border-[#6A1C24] ring-2 ring-[#6A1C24]/30' : 'border-[#C8B8A6]/60'
                    }`}
                  >
                    <img src={img} alt={`detail ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Sartorial Details Content */}
            <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Designer Label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#6A1C24]" />
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#6A1C24] font-sans">
                    {gown.category_name || gown.category || "Gams Hem Bespoke Collection"}
                  </span>
                </div>

                {/* Suit Name */}
                <h3 className="font-cormorant text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-2">
                  {gown.name || gown.title}
                </h3>

                {/* Silhouette Subtitle */}
                <p className="text-xs uppercase tracking-widest font-medium text-[#8C847C] font-sans mb-4">
                  {gown.silhouette}
                </p>

                {/* Hairline Divider */}
                <div className="w-full h-px bg-[#C8B8A6]/70 my-4" />

                {/* Fabric & Detail Row */}
                <div className="space-y-2.5 mb-6 text-xs text-[#5C5650] font-sans">
                  <p className="flex items-start gap-2">
                    <strong className="font-semibold text-[#1A1A1A] uppercase tracking-wider min-w-[90px]">Cloth & Mill:</strong>
                    <span>{gown.fabric || gown.fabric_details || "Super 150s Pure Wool"}</span>
                  </p>
                  {gown.lapel_style && (
                    <p className="flex items-start gap-2">
                      <strong className="font-semibold text-[#1A1A1A] uppercase tracking-wider min-w-[90px]">Lapel Cut:</strong>
                      <span>{gown.lapel_style}</span>
                    </p>
                  )}
                  <p className="flex items-start gap-2">
                    <strong className="font-semibold text-[#1A1A1A] uppercase tracking-wider min-w-[90px]">Construction:</strong>
                    <span>Full Floating Horsehair Canvas · Milanese Buttonhole</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <strong className="font-semibold text-[#1A1A1A] uppercase tracking-wider min-w-[90px]">Price:</strong>
                    <span className="text-[#6A1C24] font-semibold">{gown.price_amount || "Price upon consultation"}</span>
                  </p>
                </div>

                {/* Italic Story Quote */}
                <div className="bg-[#FAF7F4] border-l-2 border-[#6A1C24] p-4 mb-6 rounded-r-[1px] shadow-xs">
                  <p className="font-cormorant italic text-base text-[#3E1418] leading-relaxed">
                    "{gown.story || gown.description}"
                  </p>
                </div>

                {/* Close-up craftsmanship badges */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-[11px] font-sans text-[#5C5650]">
                  <div className="bg-[#FAF7F4] p-2.5 border border-[#C8B8A6]/60 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6A1C24] shrink-0" />
                    <span>Working Surgeon's Cuffs</span>
                  </div>
                  <div className="bg-[#FAF7F4] p-2.5 border border-[#C8B8A6]/60 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6A1C24] shrink-0" />
                    <span>Bemberg Cupro Silk Lining</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookGown(gown.name || gown.title);
                  }}
                  className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest py-3.5 font-semibold transition-all duration-300 cursor-pointer rounded-[2px] shadow-lg flex items-center justify-center gap-2 border border-[#C8B8A6]/40"
                >
                  <Scissors className="w-4 h-4 text-[#C8B8A6]" />
                  <span>Book Private Fitting for this Piece →</span>
                </button>

                <a
                  href={`https://wa.me/2349044810703?text=${encodeURIComponent(`Hello Gams Hem, I am interested in inquiring about ${gown.name || gown.title} (${gown.category_name || gown.category || "Bespoke Suit"}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-[#FAF7F4] text-[#1A1A1A] text-xs uppercase tracking-widest py-3 font-semibold transition-all duration-300 cursor-pointer rounded-[2px] border border-[#C8B8A6] flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Quick Inquire</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

