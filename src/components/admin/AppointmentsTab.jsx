import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Mail, MessageSquare, Download, Plus, X, Trash2, Edit } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function AppointmentsTab({ appointments = [], onRefresh }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('11:00 AM');

  // Manual booking form state
  const [manualForm, setManualForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    preferredTime: '11:00 AM',
    service_type: 'Bespoke Suit Consultation',
    gownPreference: '',
    notes: ''
  });

  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesSearch =
      !searchQuery.trim() ||
      app.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    StoreService.updateAppointmentStatus(id, newStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
    }
    if (onRefresh) onRefresh();
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to permanently delete appointment ${id}?`)) {
      StoreService.deleteAppointment(id);
      setSelectedAppointment(null);
      if (onRefresh) onRefresh();
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAppointment || !rescheduleDate) return;

    const updated = StoreService.getAppointments().map(app => {
      if (app.id === selectedAppointment.id) {
        return {
          ...app,
          preferred_date: rescheduleDate,
          preferred_time: rescheduleTime,
          status: 'CONFIRMED',
          rescheduled_at: new Date().toISOString()
        };
      }
      return app;
    });

    StoreService.saveAppointments(updated);
    setSelectedAppointment(prev => ({
      ...prev,
      preferred_date: rescheduleDate,
      preferred_time: rescheduleTime,
      status: 'CONFIRMED'
    }));
    setRescheduleModalOpen(false);
    if (onRefresh) onRefresh();
  };

  const handleManualBookingSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.email) return;

    StoreService.bookAppointment(manualForm);
    setManualModalOpen(false);
    setManualForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      preferredTime: '11:00 AM',
      service_type: 'Bespoke Suit Consultation',
      gownPreference: '',
      notes: ''
    });
    if (onRefresh) onRefresh();
  };

  const exportCSV = () => {
    const headers = ["Booking ID", "Client Name", "Email", "Phone", "Date", "Time", "Service", "Style Preference", "Status", "Notes"];
    const rows = filteredAppointments.map(a => [
      a.id,
      `"${a.client_name}"`,
      a.email,
      `"${a.phone || ''}"`,
      a.preferred_date,
      a.preferred_time,
      `"${a.service_type}"`,
      `"${a.gown_preference || ''}"`,
      a.status,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gams-hem-appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statuses = [
    { id: 'ALL', label: 'All Bookings', count: appointments.length },
    { id: 'PENDING', label: 'Pending', count: appointments.filter(a => a.status === 'PENDING').length },
    { id: 'CONFIRMED', label: 'Confirmed', count: appointments.filter(a => a.status === 'CONFIRMED').length },
    { id: 'COMPLETED', label: 'Completed', count: appointments.filter(a => a.status === 'COMPLETED').length },
    { id: 'CANCELLED', label: 'Cancelled', count: appointments.filter(a => a.status === 'CANCELLED').length },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            Salons & Measurements
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Appointment Manager
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Manage private fitting bookings, confirm consultation windows, reschedule, and export records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setManualModalOpen(true)}
            className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Manual Walk-in Booking</span>
          </button>

          <button
            onClick={exportCSV}
            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-[#C8B8A6]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF7F4] p-4 rounded-[2px] border border-[#C8B8A6]/70 shadow-xs">
        {/* Status Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-[1px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === st.id
                  ? 'bg-[#6A1C24] text-[#F4EFEA] shadow-xs'
                  : 'bg-[#F4EFEA] text-[#5C5650] hover:text-[#1A1A1A] border border-[#C8B8A6]/60'
              }`}
            >
              <span>{st.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                filterStatus === st.id ? 'bg-[#F4EFEA]/20 text-white' : 'bg-[#E5DDD5] text-[#1A1A1A]'
              }`}>
                {st.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, ID, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F4EFEA] border border-[#C8B8A6] text-xs text-[#1A1A1A] rounded-[1px] focus:outline-none focus:border-[#6A1C24]"
          />
        </div>
      </div>

      {/* Appointments List Table */}
      <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 rounded-[2px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4EFEA] border-b border-[#C8B8A6]/60 text-[10px] uppercase tracking-widest text-[#8C847C] font-semibold font-sans">
              <tr>
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Gentleman</th>
                <th className="py-3.5 px-4">Commission Service</th>
                <th className="py-3.5 px-4">Scheduled Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8B8A6]/40">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-[#8C847C]">
                    No appointments match your active filter.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F5EAEB]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6A1C24]">
                      {app.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="font-semibold text-[#1A1A1A] block">{app.client_name}</strong>
                      <span className="text-[11px] text-[#8C847C] font-sans">{app.email} · {app.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5C5650]">
                      <p className="font-medium text-[#1A1A1A]">{app.service_type}</p>
                      {app.gown_preference && (
                        <p className="text-[10px] text-[#6A1C24] font-medium">Focus: {app.gown_preference}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#1A1A1A]">{app.preferred_date}</p>
                      <p className="text-[10px] text-[#8C847C]">{app.preferred_time}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[1px] font-semibold border ${
                        app.status === 'PENDING' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                        app.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                        app.status === 'COMPLETED' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                        'bg-red-100 text-red-900 border-red-300'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedAppointment(app)}
                          className="px-2.5 py-1 bg-[#6A1C24]/10 hover:bg-[#6A1C24] text-[#6A1C24] hover:text-[#F4EFEA] rounded-[1px] text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Details & Actions Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="fixed inset-0 bg-[#1A1A1A]/75 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 max-w-xl w-full rounded-[2px] shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedAppointment(null)}
                className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C8B8A6]/60">
                <div>
                  <span className="font-mono text-xs bg-[#1A1A1A] text-[#F4EFEA] px-2.5 py-0.5 rounded-[1px] font-bold">
                    Ref: {selectedAppointment.id}
                  </span>
                  <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A] mt-1">
                    {selectedAppointment.client_name}
                  </h3>
                </div>

                <span className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-[1px] font-bold border ${
                  selectedAppointment.status === 'PENDING' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  selectedAppointment.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                  selectedAppointment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                  'bg-red-100 text-red-900 border-red-300'
                }`}>
                  {selectedAppointment.status}
                </span>
              </div>

              {/* Information Grid */}
              <div className="space-y-3 text-xs text-[#5C5650] mb-6">
                <div className="p-3 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] space-y-1.5">
                  <p><strong className="text-[#1A1A1A]">Service Commission:</strong> {selectedAppointment.service_type}</p>
                  <p><strong className="text-[#1A1A1A]">Scheduled Fitting:</strong> {selectedAppointment.preferred_date} at {selectedAppointment.preferred_time}</p>
                  <p><strong className="text-[#1A1A1A]">Client Email:</strong> {selectedAppointment.email}</p>
                  <p><strong className="text-[#1A1A1A]">Client Phone:</strong> {selectedAppointment.phone || 'Not provided'}</p>
                  {selectedAppointment.gown_preference && (
                    <p><strong className="text-[#1A1A1A]">Style Preference:</strong> <span className="text-[#6A1C24] font-semibold">{selectedAppointment.gown_preference}</span></p>
                  )}
                </div>

                {selectedAppointment.notes && (
                  <div className="p-3 bg-[#FAF7F4] border border-[#C8B8A6]/60 rounded-[1px]">
                    <strong className="text-[#1A1A1A] block mb-1">Custom Notes / Inquiries:</strong>
                    <p className="italic text-[#5C5650] font-cormorant text-sm">"{selectedAppointment.notes}"</p>
                  </div>
                )}
              </div>

              {/* Direct Concierge Contact Shortcuts */}
              <div className="flex flex-wrap items-center gap-2 mb-6 pt-2">
                {selectedAppointment.phone && (
                  <a
                    href={`https://wa.me/${selectedAppointment.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedAppointment.client_name)}%2C%20this%20is%20the%20Gams%20Hem%20Atelier%20Concierge%20regarding%20your%20fitting%20request%20(${selectedAppointment.id}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-2 rounded-[1px] text-[11px] font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedAppointment.email}?subject=Gams%20Hem%20Bespoke%20Fitting%20Confirmation%20(${selectedAppointment.id})`}
                  className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F4EFEA] px-3 py-2 rounded-[1px] text-[11px] font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C8B8A6]" />
                  <span>Email Client</span>
                </a>
              </div>

              {/* Status Update Actions */}
              <div className="border-t border-[#C8B8A6]/60 pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.id, 'CONFIRMED')}
                    className="px-3 py-1.5 bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-[11px] font-semibold rounded-[1px] cursor-pointer"
                  >
                    Confirm Booking
                  </button>

                  <button
                    onClick={() => {
                      setRescheduleDate(selectedAppointment.preferred_date);
                      setRescheduleTime(selectedAppointment.preferred_time);
                      setRescheduleModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-transparent border border-[#6A1C24] text-[#6A1C24] hover:bg-[#6A1C24]/10 text-[11px] font-semibold rounded-[1px] cursor-pointer flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Reschedule</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedAppointment.id, 'COMPLETED')}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold rounded-[1px] cursor-pointer"
                  >
                    Mark Completed
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.id, 'CANCELLED')}
                    className="text-stone-600 hover:text-red-700 text-xs font-semibold underline cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(selectedAppointment.id)}
                    className="text-red-700 hover:text-red-900 p-1 cursor-pointer"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {rescheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRescheduleModalOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-6 max-w-sm w-full rounded-[2px] shadow-2xl z-10"
            >
              <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-4">
                Reschedule Fitting Window
              </h3>
              <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    New Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    New Time Slot *
                  </label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleModalOpen(false)}
                    className="px-3 py-1.5 border border-[#C8B8A6] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#6A1C24] text-[#F4EFEA] text-xs font-semibold"
                  >
                    Save & Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Booking Modal */}
      <AnimatePresence>
        {manualModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManualModalOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 max-w-lg w-full rounded-[2px] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setManualModalOpen(false)}
                className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cormorant text-3xl font-light text-[#1A1A1A] mb-1">
                Log Walk-in / VIP Fitting
              </h3>
              <p className="text-xs text-[#5C5650] mb-6">Record phone inquiries, VIP referrals, or direct salon walk-ins.</p>

              <form onSubmit={handleManualBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Williams"
                      value={manualForm.name}
                      onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="williams@estate.com"
                      value={manualForm.email}
                      onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 809 000 0000"
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Service Commission
                    </label>
                    <select
                      value={manualForm.service_type}
                      onChange={(e) => setManualForm({ ...manualForm, service_type: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    >
                      <option value="Bespoke Suit Consultation">Bespoke Suit Consultation</option>
                      <option value="Wedding Party / Groom Fitting">Wedding Party / Groom Fitting</option>
                      <option value="Black Tie Tuxedo Measurement">Black Tie Tuxedo Measurement</option>
                      <option value="Native & African Bespoke Attire">Native & African Bespoke Attire</option>
                      <option value="VIP Wardrobe Curation">VIP Wardrobe Curation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Fitting Date
                    </label>
                    <input
                      type="date"
                      value={manualForm.date}
                      onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                      Time Slot
                    </label>
                    <select
                      value={manualForm.preferredTime}
                      onChange={(e) => setManualForm({ ...manualForm, preferredTime: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A]"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="3:30 PM">3:30 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Notes / Garment Focus
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Specific requests, fabric desires..."
                    value={manualForm.notes}
                    onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2 text-xs text-[#1A1A1A] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setManualModalOpen(false)}
                    className="px-4 py-2 border border-[#C8B8A6] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#6A1C24] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold"
                  >
                    Save Appointment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
