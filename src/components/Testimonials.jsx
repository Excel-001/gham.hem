import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import { Star, MessageSquarePlus, X, Check } from 'lucide-react';
import { StoreService } from '../services/store';

export default function Testimonials({ testimonials = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [form, setForm] = useState({
    client_name: '',
    event_type: 'Groom · Destination Wedding',
    suit_worn: '',
    quote: '',
    rating: 5
  });

  // Filter only active testimonials
  const activeTestimonials = testimonials.filter(t => t.is_active !== false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.client_name || !form.quote) return;

    StoreService.addTestimonial({
      name: form.client_name,
      client_name: form.client_name,
      event_type: form.event_type,
      suit_worn: form.suit_worn || "Gams Hem Bespoke Suit",
      quote: form.quote,
      rating: Number(form.rating) || 5,
      is_active: true
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setModalOpen(false);
      setForm({ client_name: '', event_type: 'Groom · Destination Wedding', suit_worn: '', quote: '', rating: 5 });
    }, 2000);
  };

  return (
    <section id="remarks" className="py-24 md:py-32 px-6 md:px-12 bg-[#FAFAFA] border-t border-[#C8B8A6]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <OrnamentalDivider label="Customer Remarks" className="max-w-xs mx-auto mb-6" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight">
            The Moments <span className="italic text-[#6A1C24]">They Remember Most</span>
          </h2>
          <p className="font-cormorant italic text-xl text-[#5C5650] mt-3">
            Remarks from gentlemen who command respect on international stages, galas, and life milestones.
          </p>

          <div className="mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#6A1C24] border border-[#6A1C24]/50 px-4 py-2 hover:bg-[#6A1C24] hover:text-[#F4EFEA] transition-all cursor-pointer rounded-[2px]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Sartorial Remark</span>
            </button>
          </div>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#C8B8A6]/70 p-7 flex flex-col justify-between relative rounded-[2px] shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Large Quote Mark */}
                <span className="font-cormorant text-5xl text-[#C8B8A6] font-serif leading-none block -mb-3 select-none">
                  “
                </span>

                {/* Italic Quote Text */}
                <p className="font-cormorant italic text-base md:text-lg text-[#1A1A1A] leading-relaxed mb-6 relative z-10">
                  {item.quote}
                </p>
              </div>

              <div>
                {/* Hairline Divider */}
                <div className="w-full h-px bg-[#C8B8A6]/50 mb-5" />

                {/* Author Row */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                    alt={item.name || item.client_name}
                    className="w-11 h-11 rounded-full object-cover border border-[#C8B8A6] saturate-[0.9]"
                  />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#1A1A1A]">
                      {item.name || item.client_name}
                    </h4>
                    <p className="text-[10px] text-[#6A1C24] font-semibold font-sans">
                      {item.event_type || item.dateLocation}
                    </p>
                    <p className="font-cormorant italic text-xs text-[#8C847C] mt-0.5 line-clamp-1">
                      {item.suit_worn || item.gown}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Below Cards: Centered Atelier Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto p-8 border border-[#C8B8A6] bg-[#FAF7F4] shadow-sm rounded-[2px]"
        >
          <p className="font-cormorant italic text-xl md:text-2xl text-[#1A1A1A] leading-snug">
            "Gams Hem operates on a strict appointment-only schedule. We receive eight gentlemen per week to dedicate our undivided master tailoring focus to each silhouette."
          </p>
        </motion.div>
      </div>

      {/* Leave Remark Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/75 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 max-w-lg w-full rounded-[2px] shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>

              {!reviewSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
                      Client Feedback
                    </span>
                    <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
                      Share Your Sartorial Experience
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Your Name & Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Adebayo Adeleke"
                      value={form.client_name}
                      onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Event Occasion / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Groom · Destination Wedding in Lake Como"
                      value={form.event_type}
                      onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Suit Worn
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Obsidian Grand Peak Tuxedo"
                      value={form.suit_worn}
                      onChange={(e) => setForm({ ...form, suit_worn: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Your Remark *
                    </label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Describe the fit, craftsmanship, and how the garment felt..."
                      value={form.quote}
                      onChange={(e) => setForm({ ...form, quote: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest py-3 font-semibold rounded-[2px] transition-colors"
                  >
                    Submit Remark to Atelier →
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#6A1C24]/10 text-[#6A1C24] flex items-center justify-center mx-auto mb-4 border border-[#6A1C24]/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-2">
                    Remark Recorded
                  </h4>
                  <p className="text-xs text-[#5C5650]">
                    Thank you for sharing your experience. Your remark is now part of our sartorial archive.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

