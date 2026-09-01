import React, { useState } from 'react';
import { LayoutDashboard, Tag, Scissors, Calendar, MessageSquare, Settings, LogOut, ExternalLink } from 'lucide-react';
import OverviewTab from './OverviewTab';
import CategoriesTab from './CategoriesTab';
import ProductsTab from './ProductsTab';
import AppointmentsTab from './AppointmentsTab';
import TestimonialsTab from './TestimonialsTab';
import SettingsTab from './SettingsTab';
import gamLogo from '../../assets/gam.jpg';

export default function AdminDashboard({
  currentUser,
  categories = [],
  products = [],
  appointments = [],
  testimonials = [],
  settings = {},
  onClose,
  onLogout,
  onRefresh
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const pendingCount = appointments.filter(a => a.status === 'PENDING').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: Tag, count: categories.length },
    { id: 'products', label: 'Product Catalog', icon: Scissors, count: products.length },
    { id: 'appointments', label: 'Appointments', icon: Calendar, count: pendingCount, badge: pendingCount > 0 },
    { id: 'remarks', label: 'Customer Remarks', icon: MessageSquare, count: testimonials.length },
    { id: 'settings', label: 'Socials & Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#ECE5DD] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1A1A] text-[#E5DDD5] flex flex-col justify-between shrink-0 border-r border-[#C8B8A6]/40">
        <div>
          {/* Logo / Monogram */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] overflow-hidden border border-[#C8B8A6]/40 shadow-sm bg-[#4D1016]">
                <img
                  src={gamLogo}
                  alt="Gams Hem Bespoke Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-cinzel text-sm font-bold tracking-[0.18em] text-[#F4EFEA] block">
                  GAMS HEM
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#C8B8A6] font-sans font-medium -mt-1 block">
                  Atelier CMS v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[1px] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6A1C24] text-[#F4EFEA] shadow-md border-l-3 border-[#C8B8A6]'
                      : 'text-[#C8B8A6] hover:text-[#F4EFEA] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#C8B8A6]" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.2 bg-[#8B2631] text-[#F4EFEA] text-[9px] rounded-full font-mono font-bold animate-pulse">
                      {item.count}
                    </span>
                  ) : item.count !== undefined ? (
                    <span className="text-[10px] text-[#8C847C] font-mono">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions Bottom */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#111111]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border border-[#C8B8A6]"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-[#F4EFEA] block truncate">
                {currentUser?.name || "Master Tailor"}
              </span>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block font-mono">
                {currentUser?.role || "SUPER_ADMIN"}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10 text-xs">
            <button
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-[#C8B8A6] hover:text-[#F4EFEA] py-2 px-3 rounded-[1px] flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Showroom</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-[#6A1C24]/30 hover:bg-[#6A1C24] text-[#F4EFEA] p-2 rounded-[1px] transition-colors cursor-pointer"
              title="Sign Out of CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#F4EFEA]">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#FAF7F4] border-b border-[#C8B8A6]/60 px-6 md:px-8 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#8C847C] font-semibold">
              Atelier Management ·
            </span>
            <span className="text-xs uppercase tracking-widest text-[#6A1C24] font-bold">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="bg-transparent hover:bg-[#6A1C24]/10 text-[#6A1C24] border border-[#6A1C24]/40 text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-[1px] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Showroom</span>
            </button>
          </div>
        </header>

        {/* Tab Body with Smooth Scrolling */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              categories={categories}
              products={products}
              appointments={appointments}
              testimonials={testimonials}
              setActiveTab={setActiveTab}
              onOpenProductModal={() => setActiveTab('products')}
              onOpenCategoryModal={() => setActiveTab('categories')}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              products={products}
              onRefresh={onRefresh}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              onRefresh={onRefresh}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsTab
              appointments={appointments}
              onRefresh={onRefresh}
            />
          )}

          {activeTab === 'remarks' && (
            <TestimonialsTab
              testimonials={testimonials}
              onRefresh={onRefresh}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onRefresh={onRefresh}
            />
          )}
        </div>
      </main>
    </div>
  );
}
