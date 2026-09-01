import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Scissors, MessageSquare, AlertCircle, Plus, ArrowUpRight, Download } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function OverviewTab({
  categories = [],
  products = [],
  appointments = [],
  testimonials = [],
  setActiveTab,
  onOpenProductModal,
  onOpenCategoryModal
}) {
  // Statistics calculations
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'PENDING').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'CONFIRMED').length;
  const completedAppointments = appointments.filter(a => a.status === 'COMPLETED').length;
  const activeProducts = products.length;
  const activeCategories = categories.filter(c => c.is_active !== false).length;
  const activeRemarks = testimonials.filter(t => t.is_active !== false).length;

  const kpis = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      subtitle: `${pendingAppointments} pending review`,
      icon: Calendar,
      color: "bg-[#6A1C24] text-[#F4EFEA]"
    },
    {
      title: "Pending Requests",
      value: pendingAppointments,
      subtitle: "Awaiting concierge confirmation",
      icon: AlertCircle,
      color: "bg-[#8B2631] text-[#F4EFEA]"
    },
    {
      title: "Active Products",
      value: activeProducts,
      subtitle: `Across ${activeCategories} categories`,
      icon: Scissors,
      color: "bg-[#1A1A1A] text-[#F4EFEA]"
    },
    {
      title: "Client Remarks",
      value: activeRemarks,
      subtitle: "Published testimonials",
      icon: MessageSquare,
      color: "bg-[#5C5650] text-[#F4EFEA]"
    }
  ];

  const recentAppointments = appointments.slice(0, 5);

  const handleQuickStatusChange = (id, newStatus) => {
    StoreService.updateAppointmentStatus(id, newStatus);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            Executive Overview
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Atelier Command Center
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Real-time monitoring of bespoke fitting requests, product catalog, categories, and client remarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenProductModal()}
            className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Garment</span>
          </button>

          <button
            onClick={() => onOpenCategoryModal()}
            className="bg-transparent hover:bg-[#6A1C24]/10 text-[#6A1C24] border border-[#6A1C24]/50 text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>New Category</span>
          </button>

          <button
            onClick={() => StoreService.exportDatabaseJSON()}
            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            title="Download full database JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-[#C8B8A6]" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-[#8C847C] font-semibold">
                  {kpi.title}
                </span>
                <div className={`w-9 h-9 rounded-[1px] ${kpi.color} flex items-center justify-center shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-cormorant text-4xl font-light text-[#1A1A1A]">
                  {kpi.value}
                </span>
                <p className="text-[11px] text-[#5C5650] mt-1 font-sans">
                  {kpi.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Appointment Pipeline & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointment Requests */}
        <div className="lg:col-span-8 bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#C8B8A6]/50">
            <div>
              <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
                Recent Fitting Commissions
              </h3>
              <p className="text-xs text-[#8C847C]">
                Latest client appointment requests logged from the public booking form.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs uppercase tracking-widest font-semibold text-[#6A1C24] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({appointments.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="text-xs text-[#8C847C] py-8 text-center">No appointment requests found.</p>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#6A1C24] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#1A1A1A] text-[#F4EFEA] px-2 py-0.5 rounded-[1px] font-bold">
                        {app.id}
                      </span>
                      <strong className="text-sm font-semibold text-[#1A1A1A]">
                        {app.client_name}
                      </strong>
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                        app.status === 'PENDING' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        app.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        app.status === 'COMPLETED' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-red-100 text-red-900 border border-red-300'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5650]">
                      {app.service_type} · <strong className="text-[#1A1A1A]">{app.preferred_date}</strong> at {app.preferred_time}
                    </p>
                    {app.gown_preference && (
                      <p className="text-[11px] text-[#6A1C24] font-medium">
                        Focus: {app.gown_preference}
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {app.status === 'PENDING' && (
                      <button
                        onClick={() => handleQuickStatusChange(app.id, 'CONFIRMED')}
                        className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-[1px] transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {app.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleQuickStatusChange(app.id, 'COMPLETED')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-[1px] transition-colors cursor-pointer"
                      >
                        Mark Completed
                      </button>
                    )}
                    {app.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleQuickStatusChange(app.id, 'CANCELLED')}
                        className="text-[#8C847C] hover:text-red-700 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Distribution & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Fitting Pipeline Status Card */}
          <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm">
            <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-4 pb-2 border-b border-[#C8B8A6]/50">
              Fitting Pipeline Status
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#8C847C]">Pending Concierge Review</span>
                  <span className="text-amber-800 font-bold">{pendingAppointments}</span>
                </div>
                <div className="w-full bg-[#E5DDD5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full transition-all duration-500"
                    style={{ width: `${totalAppointments ? (pendingAppointments / totalAppointments) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#8C847C]">Confirmed & Scheduled</span>
                  <span className="text-emerald-800 font-bold">{confirmedAppointments}</span>
                </div>
                <div className="w-full bg-[#E5DDD5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${totalAppointments ? (confirmedAppointments / totalAppointments) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#8C847C]">Garments Completed</span>
                  <span className="text-blue-800 font-bold">{completedAppointments}</span>
                </div>
                <div className="w-full bg-[#E5DDD5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{ width: `${totalAppointments ? (completedAppointments / totalAppointments) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C8B8A6]/50 text-xs text-[#5C5650]">
              <p>Weekly fitting quota: <strong className="text-[#1A1A1A]">8 Gentlemen max</strong></p>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="bg-[#1A1A1A] text-[#F4EFEA] p-6 rounded-[2px] border border-[#C8B8A6]/40 shadow-sm space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C8B8A6]">
              Quick Management
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTab('products')}
                className="bg-[#FAF7F4]/10 hover:bg-[#FAF7F4]/20 p-3 text-left rounded-[1px] border border-white/10 transition-colors cursor-pointer"
              >
                <span className="font-semibold block text-[#F4EFEA]">Catalog</span>
                <span className="text-[10px] text-[#C8B8A6]">Manage Suits</span>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className="bg-[#FAF7F4]/10 hover:bg-[#FAF7F4]/20 p-3 text-left rounded-[1px] border border-white/10 transition-colors cursor-pointer"
              >
                <span className="font-semibold block text-[#F4EFEA]">Categories</span>
                <span className="text-[10px] text-[#C8B8A6]">Edit Taxonomy</span>
              </button>
              <button
                onClick={() => setActiveTab('remarks')}
                className="bg-[#FAF7F4]/10 hover:bg-[#FAF7F4]/20 p-3 text-left rounded-[1px] border border-white/10 transition-colors cursor-pointer"
              >
                <span className="font-semibold block text-[#F4EFEA]">Reviews</span>
                <span className="text-[10px] text-[#C8B8A6]">Moderate Remarks</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="bg-[#FAF7F4]/10 hover:bg-[#FAF7F4]/20 p-3 text-left rounded-[1px] border border-white/10 transition-colors cursor-pointer"
              >
                <span className="font-semibold block text-[#F4EFEA]">Settings</span>
                <span className="text-[10px] text-[#C8B8A6]">Socials & Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
