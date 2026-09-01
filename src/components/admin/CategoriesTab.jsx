import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Tag } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function CategoriesTab({ categories = [], products = [], onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    order: 1,
    is_active: true
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      slug: '',
      order: categories.length + 1,
      is_active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      order: cat.order || 1,
      is_active: cat.is_active !== false
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingCategory) {
      StoreService.updateCategory(editingCategory.id, {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        order: Number(form.order) || 1,
        is_active: form.is_active
      });
    } else {
      StoreService.addCategory({
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        order: Number(form.order) || categories.length + 1,
        is_active: form.is_active
      });
    }

    setModalOpen(false);
    if (onRefresh) onRefresh();
  };

  const handleDelete = (id) => {
    StoreService.deleteCategory(id);
    setDeleteConfirmId(null);
    if (onRefresh) onRefresh();
  };

  const handleToggleActive = (cat) => {
    StoreService.updateCategory(cat.id, { is_active: !cat.is_active });
    if (onRefresh) onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            Taxonomy & Filters
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Category Management
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Define collection filters displayed on the client-facing showroom archive.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 rounded-[2px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4EFEA] border-b border-[#C8B8A6]/60 text-[10px] uppercase tracking-widest text-[#8C847C] font-semibold font-sans">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug Identifier</th>
                <th className="py-3.5 px-4">Garments Count</th>
                <th className="py-3.5 px-4">Active Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8B8A6]/40">
              {categories.map((cat, idx) => {
                const productCount = cat.slug === 'all' 
                  ? products.length 
                  : products.filter(p => p.category_id === cat.id || p.category === cat.name || p.category_name === cat.name).length;

                return (
                  <tr key={cat.id || idx} className="hover:bg-[#F5EAEB]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6A1C24]">
                      {cat.order !== undefined ? cat.order : idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#1A1A1A] flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#6A1C24]" />
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#5C5650]">
                      {cat.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 bg-[#E5DDD5] text-[#1A1A1A] rounded-full font-mono font-medium">
                        {productCount} items
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(cat)}
                        disabled={cat.slug === 'all'}
                        className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-[1px] border cursor-pointer transition-colors ${
                          cat.is_active !== false
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-700 border-stone-300 hover:bg-stone-300'
                        } ${cat.slug === 'all' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        {cat.is_active !== false ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {cat.slug !== 'all' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            className="p-1.5 text-[#5C5650] hover:text-[#6A1C24] hover:bg-[#6A1C24]/10 rounded-[1px] transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          {deleteConfirmId === cat.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(cat.id)}
                                className="px-2 py-1 bg-red-700 text-white text-[10px] uppercase font-bold rounded-[1px]"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 bg-stone-300 text-stone-800 text-[10px] rounded-[1px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(cat.id)}
                              className="p-1.5 text-[#8C847C] hover:text-red-700 hover:bg-red-50 rounded-[1px] transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#8C847C] italic">Permanent System Tab</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
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

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
                  Category Form
                </span>
                <h3 className="font-cormorant text-2xl font-light text-[#1A1A1A]">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Velvet & Evening Jackets"
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm({
                        ...form,
                        name,
                        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      });
                    }}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                    URL Slug Identifier
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. velvet-evening"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#6A1C24]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                      <input
                        type="checkbox"
                        checked={form.is_active}
                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                        className="w-4 h-4 accent-[#6A1C24]"
                      />
                      <span className="text-xs font-semibold text-[#1A1A1A]">Show on Website</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 bg-transparent border border-[#C8B8A6] text-xs uppercase tracking-wider font-semibold text-[#5C5650] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-md"
                  >
                    {editingCategory ? 'Update Category' : 'Save Category'}
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
