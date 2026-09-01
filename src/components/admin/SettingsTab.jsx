import React, { useState } from 'react';
import { Save, Check, RotateCcw, Download, Shield, Share2, MapPin } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function SettingsTab({ settings = {}, onRefresh }) {
  const [form, setForm] = useState({
    siteName: settings.siteName || 'Gams Hem Bespoke Menswear',
    tagline: settings.tagline || 'Crafted with Uncompromised Precision · Bespoke Menswear & Classic Suits',
    instagramUrl: settings.instagramUrl || 'https://www.instagram.com/gams.hem/',
    instagramEnabled: settings.instagramEnabled !== false,
    whatsappNumber: settings.whatsappNumber || '+2348030004267',
    whatsappUrl: settings.whatsappUrl || 'https://wa.me/2348030004267',
    whatsappEnabled: settings.whatsappEnabled !== false,
    xUrl: settings.xUrl || 'https://x.com/gamshem',
    xEnabled: settings.xEnabled !== false,
    tiktokUrl: settings.tiktokUrl || 'https://tiktok.com/@gamshem',
    tiktokEnabled: settings.tiktokEnabled !== false,
    linkedinUrl: settings.linkedinUrl || 'https://linkedin.com/company/gamshem',
    linkedinEnabled: settings.linkedinEnabled === true,
    facebookUrl: settings.facebookUrl || 'https://facebook.com/gamshem',
    facebookEnabled: settings.facebookEnabled === true,
    atelierAddress: settings.atelierAddress || '14 Victoria Island Boulevard, Lagos · Mayfair, London',
    atelierPhone: settings.atelierPhone || '+234 (0) 803 000 GAMS',
    atelierEmail: settings.atelierEmail || 'concierge@gamshem.com',
    atelierHours: settings.atelierHours || 'Tuesday – Saturday: 10:00 AM – 7:00 PM (By Private Appointment)',
    maxWeeklyAppointments: settings.maxWeeklyAppointments || 8
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    StoreService.saveSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    if (onRefresh) onRefresh();
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data back to factory defaults? This will erase custom additions and reload default luxury bespoke products.")) {
      StoreService.resetToFactoryDefaults();
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            System Configuration
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Social Media & Atelier Settings
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Configure dynamic social links in the footer, brand details, salon hours, and backups.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Settings Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-[1px] flex items-center gap-2 font-semibold">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>All settings and dynamic social links updated successfully across the application.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Dynamic Social Media Channels */}
        <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-[#C8B8A6]/50 pb-3">
            <Share2 className="w-4 h-4 text-[#6A1C24]" />
            <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
              Dynamic Social Media Integration
            </h3>
          </div>
          <p className="text-xs text-[#5C5650]">
            Toggle any platform on/off and provide the exact URL. Enabled links will appear dynamically in the site header and footer.
          </p>

          <div className="space-y-4">
            {/* Instagram */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="instagramToggle"
                  checked={form.instagramEnabled}
                  onChange={(e) => handleChange('instagramEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="instagramToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  Instagram
                </label>
              </div>
              <input
                type="url"
                disabled={!form.instagramEnabled}
                value={form.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://www.instagram.com/gams.hem/"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>

            {/* WhatsApp */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="whatsappToggle"
                  checked={form.whatsappEnabled}
                  onChange={(e) => handleChange('whatsappEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="whatsappToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  WhatsApp Concierge
                </label>
              </div>
              <input
                type="url"
                disabled={!form.whatsappEnabled}
                value={form.whatsappUrl}
                onChange={(e) => handleChange('whatsappUrl', e.target.value)}
                placeholder="https://wa.me/2348030004267"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>

            {/* X / Twitter */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="xToggle"
                  checked={form.xEnabled}
                  onChange={(e) => handleChange('xEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="xToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  X (Twitter)
                </label>
              </div>
              <input
                type="url"
                disabled={!form.xEnabled}
                value={form.xUrl}
                onChange={(e) => handleChange('xUrl', e.target.value)}
                placeholder="https://x.com/gamshem"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>

            {/* TikTok */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="tiktokToggle"
                  checked={form.tiktokEnabled}
                  onChange={(e) => handleChange('tiktokEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="tiktokToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  TikTok
                </label>
              </div>
              <input
                type="url"
                disabled={!form.tiktokEnabled}
                value={form.tiktokUrl}
                onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                placeholder="https://tiktok.com/@gamshem"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>

            {/* LinkedIn */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="linkedinToggle"
                  checked={form.linkedinEnabled}
                  onChange={(e) => handleChange('linkedinEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="linkedinToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  LinkedIn
                </label>
              </div>
              <input
                type="url"
                disabled={!form.linkedinEnabled}
                value={form.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/company/gamshem"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>

            {/* Facebook */}
            <div className="p-3.5 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="facebookToggle"
                  checked={form.facebookEnabled}
                  onChange={(e) => handleChange('facebookEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#6A1C24] cursor-pointer"
                />
                <label htmlFor="facebookToggle" className="text-xs font-bold text-[#1A1A1A] cursor-pointer min-w-[120px]">
                  Facebook
                </label>
              </div>
              <input
                type="url"
                disabled={!form.facebookEnabled}
                value={form.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/gamshem"
                className="flex-1 bg-white border border-[#C8B8A6] px-3 py-1.5 text-xs text-[#1A1A1A] rounded-[1px] disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Atelier Contact & Salon Details */}
        <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-[#C8B8A6]/50 pb-3">
            <MapPin className="w-4 h-4 text-[#6A1C24]" />
            <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
              Atelier Location & Opening Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                Atelier Physical Addresses
              </label>
              <input
                type="text"
                value={form.atelierAddress}
                onChange={(e) => handleChange('atelierAddress', e.target.value)}
                className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                Operating Schedule
              </label>
              <input
                type="text"
                value={form.atelierHours}
                onChange={(e) => handleChange('atelierHours', e.target.value)}
                className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                Concierge Contact Phone
              </label>
              <input
                type="text"
                value={form.atelierPhone}
                onChange={(e) => handleChange('atelierPhone', e.target.value)}
                className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                Concierge Email
              </label>
              <input
                type="email"
                value={form.atelierEmail}
                onChange={(e) => handleChange('atelierEmail', e.target.value)}
                className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
              />
            </div>
          </div>
        </div>

        {/* Database & Backup Operations */}
        <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#C8B8A6]/50 pb-3">
            <Shield className="w-4 h-4 text-[#6A1C24]" />
            <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
              Database Operations & Backups
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A]">Export Full JSON Ledger</h4>
              <p className="text-[11px] text-[#5C5650]">Download all products, appointments, and reviews for offline records.</p>
            </div>
            <button
              type="button"
              onClick={() => StoreService.exportDatabaseJSON()}
              className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F4EFEA] text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-[1px] flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#C8B8A6]" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#C8B8A6]/40">
            <div>
              <h4 className="text-xs font-bold text-red-900">Reset Factory Defaults</h4>
              <p className="text-[11px] text-[#8C847C]">Re-seed initial bespoke products, categories, and reviews.</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-800 hover:bg-red-900 text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-[1px] flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
