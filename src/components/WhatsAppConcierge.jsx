import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.783-1.674-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.635-.93-2.239-.245-.588-.494-.508-.678-.517-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.079 2.909 1.23 3.109.15.201 2.124 3.244 5.147 4.549.719.311 1.281.497 1.719.636.723.23 1.381.198 1.901.12.58-.088 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.351zM12.042 21.75c-1.764 0-3.491-.475-5.008-1.373l-.359-.213-3.725.977.994-3.63-.233-.371A9.74 9.74 0 0 1 2.25 12c0-5.398 4.39-9.792 9.792-9.792 2.615 0 5.074 1.018 6.924 2.868a9.74 9.74 0 0 1 2.868 6.924c0 5.398-4.39 9.75-9.792 9.75zm7.616-17.366A11.02 11.02 0 0 0 12.042.75C5.834.75.75 5.834.75 12.042c0 1.98.517 3.916 1.503 5.626L.75 23.25l5.748-1.508a11.23 11.23 0 0 0 5.544 1.458h.005c6.208 0 11.292-5.084 11.292-11.292 0-3.018-1.176-5.856-3.31-7.992z"/>
    </svg>
  );
}

function normalizeWhatsAppNumber(phone) {
  if (!phone) return "2349044810703";
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  } else if (!cleaned.startsWith('234') && cleaned.length === 10) {
    cleaned = '234' + cleaned;
  }
  return cleaned;
}

export default function WhatsAppConcierge({ settings = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  const isEnabled = settings.whatsappEnabled !== false;
  const rawNumber = settings.whatsappNumber || "09044810703";
  const normalizedNumber = normalizeWhatsAppNumber(rawNumber);

  // Show a gentle greeting prompt after 4 seconds to welcome the visitor
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isEnabled) return null;

  const quickPrompts = [
    {
      label: "Bespoke Suit Consultation",
      message: "Hello Gams Hem, I would like to inquire about commissioning a bespoke suit."
    },
    {
      label: "Wedding & Groomsmen Fitting",
      message: "Hello Gams Hem, I would like to inquire about wedding and groomsmen ceremonial attire."
    },
    {
      label: "Native & Agbada Couture",
      message: "Hello Gams Hem, I would like to inquire about bespoke native attire and agbada commissions."
    },
    {
      label: "Fabric Swatches & Mill Archives",
      message: "Hello Gams Hem, I would like to inquire about your available cloth collections (Loro Piana, Scabal, Dormeuil)."
    }
  ];

  const handleStartChat = (customText) => {
    const textParam = encodeURIComponent(customText || "Hello Gams Hem, I would like to inquire about your bespoke tailoring services.");
    const baseUrl = `https://wa.me/${normalizedNumber}?text=${textParam}`;
    window.open(baseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 font-sans">
      {/* Interactive Concierge Quick Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 mb-2 w-[310px] sm:w-[360px] bg-white border border-[#C8B8A6] rounded-[2px] shadow-2xl overflow-hidden z-50 text-[#1A1A1A] origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#6A1C24] text-[#F4EFEA] p-4 flex items-center justify-between border-b border-[#C8B8A6]/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#6A1C24]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold tracking-widest text-[#F4EFEA]">
                    GAMS HEM CONCIERGE
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#C8B8A6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Master Tailor Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[#C8B8A6] hover:text-[#F4EFEA] p-1 cursor-pointer transition-colors"
                title="Close chat card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-[#FAFAFA] space-y-3 max-h-[360px] overflow-y-auto">
              {/* Atelier Greeting Message */}
              <div className="bg-white p-3.5 rounded-[2px] border border-[#C8B8A6]/50 shadow-xs">
                <p className="font-cormorant italic text-base text-[#1A1A1A] leading-relaxed mb-1">
                  "Welcome to Gams Hem. How may our bespoke atelier assist you today?"
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#8C847C] font-sans">
                  <Clock className="w-3 h-3 text-[#6A1C24]" />
                  <span>Typically replies in under 15 mins</span>
                </div>
              </div>

              {/* Quick Inquiry Options */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C847C] font-semibold block mb-2 font-sans">
                  Instant Inquiry Prompts
                </span>
                <div className="space-y-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStartChat(prompt.message)}
                      className="w-full text-left text-xs bg-white hover:bg-[#6A1C24] text-[#1A1A1A] hover:text-[#F4EFEA] p-2.5 rounded-[2px] border border-[#C8B8A6]/60 hover:border-[#6A1C24] transition-all duration-200 cursor-pointer flex items-center justify-between group shadow-xs"
                    >
                      <span className="font-medium truncate pr-2">{prompt.label}</span>
                      <Send className="w-3 h-3 text-[#6A1C24] group-hover:text-[#F4EFEA] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Button Footer */}
            <div className="p-3 bg-white border-t border-[#C8B8A6]/40 flex items-center gap-2">
              <button
                onClick={() => handleStartChat()}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-[2px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Open WhatsApp Direct Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with Tooltip on the Left */}
      <div className="relative flex items-center justify-end gap-3">
        {/* Soft Notification Prompt to the left of the button */}
        <AnimatePresence>
          {!isOpen && hasPrompted && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#1A1A1A] px-3.5 py-2 rounded-full border border-[#C8B8A6] shadow-lg cursor-pointer hover:border-[#6A1C24] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-sans font-medium text-[#1A1A1A]">
                Quick Contact Concierge
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPrompted(false);
                }}
                className="text-[#8C847C] hover:text-[#1A1A1A] ml-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Official WhatsApp Floating Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] cursor-pointer transition-all border-2 border-white relative z-50 group"
          aria-label="Contact Gams Hem Bespoke Concierge via WhatsApp"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <WhatsAppIcon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
