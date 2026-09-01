import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, X } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function TestimonialsTab({ testimonials = [], onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    event_type: 'Groom · Destination Wedding',
    suit_worn: '',
    quote: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    is_active: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: '',
      event_type: 'Groom · Destination Wedding',
      suit_worn: '',
      quote: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      is_active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || item.client_name || '',
      event_type: item.event_type || item.dateLocation || '',
      suit_worn: item.suit_worn || item.gown || '',
      quote: item.quote || '',
      rating: item.rating || 5,
      avatar: item.avatar || '',
      is_active: item.is_active !== false
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;

    const payload = {
      name: form.name,
      client_name: form.name,
      event_type: form.event_type,
      suit_worn: form.suit_worn,
      quote: form.quote,
      rating: Number(form.rating) || 5,
      avatar: form.avatar,
      is_active: form.is_active
    };

    if (editingItem) {
      StoreService.updateTestimonial(editingItem.id, payload);
    } else {
      StoreService.addTestimonial(payload);
    }

    setModalOpen(false);
    if (onRefresh) onRefresh();
  };

  const handleDelete = (id) => {
    StoreService.deleteTestimonial(id);
    setDeleteConfirmId(null);
    if (onRefresh) onRefresh();
  };

  const handleToggleActive = (item) => {
    StoreService.updateTestimonial(item.id, { is_active: !item.is_active });
    if (onRefresh) onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            Client Remarks & Press
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Customer Remarks Manager
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Review, edit, publish, or feature client remarks from grooms, honorees, and gentlemen.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAF7F4] border border-[#C8B8A6]/70 p-6 rounded-[2px] shadow-sm flex flex-col justify-between hover:border-[#6A1C24] transition-colors relative"
          >
            <div>
              {/* Top row: rating + status toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <button
                  onClick={() => handleToggleActive(item)}
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[1px] border cursor-pointer ${
                    item.is_active !== false
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                >
                  {item.is_active !== false ? 'Published' : 'Hidden'}
                </button>
              </div>

              {/* Quote */}
              <p className="font-cormorant italic text-base text-[#1A1A1A] leading-relaxed mb-6">
                "{item.quote}"
              </p>
            </div>

            <div>
              <div className="w-full h-px bg-[#C8B8A6]/40 mb-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                    alt={item.name || item.client_name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C8B8A6]"
                  />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#1A1A1A]">
                      {item.name || item.client_name}
                    </h4>
                    <p className="text-[10px] text-[#6A1C24] font-semibold">
                      {item.event_type || item.dateLocation}
                    </p>
                    <p className="text-[10px] text-[#8C847C] line-clamp-1">
                      {item.suit_worn || item.gown}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-[#5C5650] hover:text-[#6A1C24] cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-0.5 bg-red-700 text-white text-[10px] uppercase font-bold rounded-[1px]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-1.5 py-0.5 bg-stone-300 text-stone-800 text-[10px]"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 text-[#8C847C] hover:text-red-700 cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Testimonial Modal */}
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
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 max-w-md w-full rounded-[2px] shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-4">
                {editingItem ? 'Edit Customer Remark' : 'Add New Customer Remark'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Client Full Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Adebayo Adeleke"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Event Occasion / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Groom · Lake Como Villa Balbianello Wedding"
                    value={form.event_type}
                    onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Suit Worn / Commissioned
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
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Avatar Photo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.avatar}
                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1">
                    Quote / Review *
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe their experience..."
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24] resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 accent-[#6A1C24]"
                    />
                    <span className="text-xs font-semibold text-[#1A1A1A]">Publish on Live Website</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-[#C8B8A6] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#6A1C24] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold"
                  >
                    Save Review
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
