import React, { useState } from 'react';
import { Check } from 'lucide-react';
import gamLogo from '../assets/gam.jpg';

export default function Footer({ onOpenJournal, settings = {} }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  // Dynamic social links according to settings
  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      url: settings.instagramUrl || 'https://www.instagram.com/gams.hem/',
      enabled: settings.instagramEnabled !== false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: settings.whatsappUrl || 'https://wa.me/2349044810703',
      enabled: settings.whatsappEnabled !== false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      url: settings.xUrl || 'https://x.com/gamshem',
      enabled: settings.xEnabled !== false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      url: settings.tiktokUrl || 'https://tiktok.com/@gamshem',
      enabled: settings.tiktokEnabled !== false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.05.86.15V9.41a6.33 6.33 0 0 0-6.33 6.33 6.34 6.34 0 0 0 10.82 4.48 6.27 6.27 0 0 0 1.99-4.55V8.81a8.28 8.28 0 0 0 4.77 1.5V6.85a4.86 4.86 0 0 1-2-.16z"/>
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: settings.linkedinUrl || 'https://linkedin.com/company/gamshem',
      enabled: settings.linkedinEnabled === true,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ].filter(s => s.enabled);

  return (
    <footer className="bg-[#1A1A1A] text-[#E5DDD5] border-t border-[#C8B8A6]/40 pt-16 pb-12 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#C8B8A6]/30">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[2px] overflow-hidden border border-[#C8B8A6]/40 shadow-sm bg-[#4D1016]">
                <img
                  src={gamLogo}
                  alt="Gams Hem Bespoke Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#F4EFEA]">
                GAMS HEM
              </span>
            </div>

            <p className="font-cormorant italic text-base text-[#C8B8A6] leading-relaxed max-w-sm">
              "Premier bespoke tailoring atelier specializing in handcrafted suits, black tie tuxedos, and sartorial native attire."
            </p>

            <div className="text-xs text-[#8C847C] space-y-1 pt-2">
              <p><strong className="text-[#E5DDD5]">Atelier:</strong> {settings.atelierAddress || "14 Victoria Island Boulevard, Lagos · Mayfair, London"}</p>
              <p><strong className="text-[#E5DDD5]">Hours:</strong> {settings.atelierHours || "Tue – Sat: 10:00 AM – 7:00 PM (By Private Appointment)"}</p>
              <p><strong className="text-[#E5DDD5]">Concierge:</strong> {settings.atelierPhone || "+234 (0) 803 000 GAMS"}</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4EFEA] font-sans">
              Atelier Archive
            </h4>
            <ul className="space-y-2 text-xs text-[#C8B8A6]">
              <li><a href="#products" className="hover:text-[#F4EFEA] transition-colors">Products & Suits</a></li>
              <li><a href="#collection" className="hover:text-[#F4EFEA] transition-colors">Editorial Collection</a></li>
              <li><a href="#atelier" className="hover:text-[#F4EFEA] transition-colors">Sartorial Anatomy</a></li>
              <li><a href="#process" className="hover:text-[#F4EFEA] transition-colors">Bespoke Process</a></li>
            </ul>
          </div>

          {/* Bespoke Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4EFEA] font-sans">
              Bespoke Salons
            </h4>
            <ul className="space-y-2 text-xs text-[#C8B8A6]">
              <li><a href="#appointments" className="hover:text-[#F4EFEA] transition-colors">Private Fitting Booking</a></li>
              <li><a href="#remarks" className="hover:text-[#F4EFEA] transition-colors">Customer Remarks</a></li>
              <li><button onClick={onOpenJournal} className="hover:text-[#F4EFEA] transition-colors cursor-pointer text-left">Atelier Journal</button></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F4EFEA] font-sans">
              VIP Sartorial Dispatch
            </h4>
            <p className="text-xs text-[#8C847C]">
              Receive private invitations to new seasonal mill cloth drops from Loro Piana, Scabal, and Dormeuil.
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#111111] border border-[#C8B8A6]/40 px-3.5 py-2.5 text-xs text-[#F4EFEA] focus:outline-none focus:border-[#6A1C24] flex-1 rounded-[1px] placeholder-[#8C847C]"
                />
                <button
                  type="submit"
                  className="bg-[#6A1C24] hover:bg-[#8B2631] text-[#F4EFEA] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-[1px] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#6A1C24]/20 border border-[#6A1C24] text-xs text-[#E5DDD5] flex items-center gap-2 rounded-[1px]">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>You are on the private Gams Hem guest list.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Strip: Social Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8C847C]">
          {/* Dynamic Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="w-8 h-8 rounded-full border border-[#C8B8A6]/30 flex items-center justify-center text-[#C8B8A6] hover:text-[#F4EFEA] hover:border-[#6A1C24] hover:bg-[#6A1C24]/30 transition-all"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} Gams Hem Bespoke Atelier. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-[#F4EFEA] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#F4EFEA] transition-colors">Bespoke Terms & Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

