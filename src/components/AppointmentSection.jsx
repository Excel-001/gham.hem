import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Wine, MapPin, Sparkles, Scissors } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppConcierge';
import OrnamentalDivider from './OrnamentalDivider';
import { StoreService } from '../services/store';

export default function AppointmentSection({ selectedGownName, onResetGown }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    preferredTime: '11:00 AM',
    service_type: 'Bespoke Suit Consultation',
    gownPreference: '',
    notes: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedGownName) {
      setFormData((prev) => ({ ...prev, gownPreference: selectedGownName }));
    }
  }, [selectedGownName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;
    
    setLoading(true);
    setTimeout(() => {
      const newBooking = StoreService.bookAppointment(formData);
      setSubmittedBooking(newBooking);
      setLoading(false);
    }, 400);
  };

  const serviceOptions = [
    "Bespoke Suit Consultation",
    "Wedding Party / Groom Fitting",
    "Black Tie Tuxedo Measurement",
    "Native & African Bespoke Attire",
    "Double-Breasted Flannel Commission",
    "VIP Wardrobe Curation & Styling",
    "Master Alterations & Adjustments"
  ];

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "1:30 PM",
    "3:30 PM",
    "5:00 PM",
    "6:30 PM"
  ];

  const detailsList = [
    { label: "Fitting Duration", value: "90 Minutes", icon: Clock },
    { label: "Anatomy Analysis", value: "40+ Data Points", icon: Scissors },
    { label: "Atelier Hospitality", value: "Single Malt & Espresso", icon: Wine },
    { label: "Locations", value: "Victoria Island & Mayfair", icon: MapPin },
  ];

  return (
    <section id="appointments" className="relative py-24 md:py-32 px-6 md:px-12 bg-white overflow-hidden border-t border-[#C8B8A6]/60">
      {/* Decorative Radial Burgundy Glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#6A1C24]/05 blur-3xl pointer-events-none"
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(106, 28, 36, 0.15) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <OrnamentalDivider label="Private Sartorial Salons" className="max-w-xs mx-auto mb-6" />
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Book Your <span className="italic text-[#6A1C24]">Private Fitting</span>
          </h2>
          <p className="font-cormorant italic text-xl text-[#5C5650]">
            Experience one-on-one styling and 40-point precision anatomy measurement in our private atelier.
          </p>
        </motion.div>

        {/* Booking Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#C8B8A6] p-8 md:p-12 shadow-2xl rounded-[2px] max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!submittedBooking ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {selectedGownName && (
                  <div className="bg-[#F5EAEB] border border-[#6A1C24]/30 p-4 flex items-center justify-between text-xs text-[#1A1A1A] rounded-[1px]">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#6A1C24]" />
                      <span>Garment Focus: <strong className="font-cormorant text-base font-normal text-[#6A1C24]">{selectedGownName}</strong></span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, gownPreference: '' }));
                        if (onResetGown) onResetGown();
                      }}
                      className="text-[#8C847C] hover:text-[#6A1C24] underline cursor-pointer text-[11px] uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* 2-Column Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Lord Adebayo Adeleke"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans placeholder-[#B5A99A]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="adebayo@adeleke.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans placeholder-[#B5A99A]"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+234 803 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans placeholder-[#B5A99A]"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Service Commission *
                    </label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#FAF7F4] text-[#1A1A1A]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#FAF7F4] text-[#1A1A1A]">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-2 font-sans">
                    Custom Notes, Occasion or Fabric Desires
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Share any event dates (e.g. Wedding, Gala), fabric preferences (Loro Piana, Velvet), or style inspirations..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8B8A6] focus:border-[#6A1C24] py-2 text-sm text-[#1A1A1A] focus:outline-none transition-colors font-sans placeholder-[#B5A99A] resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest py-4 font-semibold transition-all duration-300 cursor-pointer rounded-[2px] shadow-lg flex items-center justify-center gap-2 border border-[#C8B8A6]/40 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-[#C8B8A6]" />
                    <span>{loading ? "Logging Bespoke Request..." : "Request Private Fitting →"}</span>
                  </button>
                  <p className="text-center text-[11px] text-[#8C847C] font-sans mt-3">
                    Concierge response within 12 hours. No upfront payment required for initial consultation.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-10 text-center"
              >
                <div className="w-16 h-16 bg-[#6A1C24]/10 text-[#6A1C24] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#6A1C24]/30 shadow-sm">
                  <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
                </div>

                <div className="inline-block px-3 py-1 bg-[#6A1C24] text-[#F4EFEA] text-[10px] uppercase tracking-widest font-mono font-bold mb-3 rounded-[1px]">
                  Ref: {submittedBooking.id}
                </div>

                <h3 className="font-cormorant italic text-3xl md:text-4xl text-[#1A1A1A] mb-3">
                  "We have reserved your fitting window."
                </h3>

                <p className="font-cormorant text-lg text-[#5C5650] max-w-md mx-auto mb-6">
                  Thank you, <strong className="font-medium text-[#1A1A1A]">{submittedBooking.client_name}</strong>. Your private consultation request has been entered into the Gams Hem atelier ledger.
                </p>

                <div className="bg-[#F5EAEB] p-5 text-xs text-[#5C5650] max-w-md mx-auto mb-6 border border-[#C8B8A6] rounded-[2px] text-left space-y-1 font-sans">
                  <p className="font-bold uppercase tracking-wider text-[#6A1C24] mb-2 border-b border-[#C8B8A6]/60 pb-1">
                    Booking Summary
                  </p>
                  <p><strong className="text-[#1A1A1A]">Service:</strong> {submittedBooking.service_type}</p>
                  <p><strong className="text-[#1A1A1A]">Date & Time:</strong> {submittedBooking.preferred_date} at {submittedBooking.preferred_time}</p>
                  <p><strong className="text-[#1A1A1A]">Contact:</strong> {submittedBooking.email} · {submittedBooking.phone}</p>
                  {submittedBooking.gown_preference && (
                    <p><strong className="text-[#1A1A1A]">Style Preference:</strong> {submittedBooking.gown_preference}</p>
                  )}
                  <p className="text-[10px] text-[#8C847C] pt-2 italic">
                    Status: <span className="text-[#6A1C24] font-semibold uppercase">Pending Concierge Confirmation</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/2349044810703?text=Hello%20Gams%20Hem%2C%20I%20just%20booked%20appointment%20${submittedBooking.id}%20under%20the%20name%20${encodeURIComponent(submittedBooking.client_name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest px-5 py-3 rounded-[2px] font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat on WhatsApp Concierge</span>
                  </a>

                  <button
                    onClick={() => setSubmittedBooking(null)}
                    className="text-xs uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#6A1C24] hover:border-[#6A1C24] cursor-pointer transition-colors"
                  >
                    Submit Another Commission
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Details Strip (4 columns) */}
        <div className="mt-16 border-t border-b border-[#C8B8A6] py-8 bg-[#FAFAFA]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {detailsList.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="px-2 border-r last:border-r-0 border-[#C8B8A6]/60 flex flex-col items-center">
                  <Icon className="w-4 h-4 text-[#6A1C24] mb-1.5" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-[#8C847C] block mb-1 font-sans">
                    {item.label}
                  </span>
                  <span className="font-cormorant italic text-lg md:text-xl text-[#1A1A1A]">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

