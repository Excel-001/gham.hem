import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { StoreService } from '../../services/store';

export default function ProductsTab({ products = [], categories = [], onRefresh, initialModalOpen = false }) {
  const [modalOpen, setModalOpen] = useState(initialModalOpen);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [form, setForm] = useState({
    name: '',
    category_id: 'cat-tuxedos',
    silhouette: 'Sculpted British Athletic Cut · Full Floating Canvas',
    fabric: 'Super 150s Pure Wool',
    lapel_style: 'Silk Satin Peak Lapel',
    price_type: 'consultation',
    price_amount: '$2,200',
    description: '',
    story: '',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
    detailsGrid: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=600&q=80'
    ],
    is_featured: false
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    const defaultCat = categories.find(c => c.slug !== 'all') || categories[0];
    setForm({
      name: '',
      category_id: defaultCat ? defaultCat.id : 'cat-tuxedos',
      silhouette: 'Sculpted British Athletic Cut · Full Floating Canvas',
      fabric: 'Super 150s Merino Wool',
      lapel_style: 'Silk Satin Peak Lapel',
      price_type: 'consultation',
      price_amount: '$2,200',
      description: '',
      story: '',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      detailsGrid: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=600&q=80'
      ],
      is_featured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setForm({
      name: prod.name || prod.title || '',
      category_id: prod.category_id || 'cat-tuxedos',
      silhouette: prod.silhouette || '',
      fabric: prod.fabric || prod.fabric_details || '',
      lapel_style: prod.lapel_style || '',
      price_type: prod.price_type || 'consultation',
      price_amount: prod.price_amount || '',
      description: prod.description || '',
      story: prod.story || '',
      image: prod.image || '',
      detailsGrid: prod.detailsGrid || [],
      is_featured: !!prod.is_featured
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const selectedCategory = categories.find(c => c.id === form.category_id);
    const categoryName = selectedCategory ? selectedCategory.name : 'Bespoke Menswear';

    const productPayload = {
      name: form.name,
      title: form.name,
      category_id: form.category_id,
      category_name: categoryName,
      category: categoryName,
      silhouette: form.silhouette,
      fabric: form.fabric,
      fabric_details: form.fabric,
      lapel_style: form.lapel_style,
      price_type: form.price_type,
      price_amount: form.price_amount,
      description: form.description,
      story: form.story || form.description,
      image: form.image,
      detailsGrid: form.detailsGrid,
      is_featured: form.is_featured,
      bgWash: "radial-gradient(circle at 20% 50%, rgba(106, 28, 36, 0.25) 0%, rgba(244, 239, 234, 0) 70%)"
    };

    if (editingProduct) {
      StoreService.updateProduct(editingProduct.id, productPayload);
    } else {
      StoreService.addProduct(productPayload);
    }

    setModalOpen(false);
    if (onRefresh) onRefresh();
  };

  const handleDelete = (id) => {
    StoreService.deleteProduct(id);
    setDeleteConfirmId(null);
    if (onRefresh) onRefresh();
  };

  const handleToggleFeatured = (prod) => {
    StoreService.updateProduct(prod.id, { is_featured: !prod.is_featured });
    if (onRefresh) onRefresh();
  };

  // Filter products by search and category
  const filteredProducts = products.filter(p => {
    const matchesCategory = filterCategory === 'all' || p.category_id === filterCategory || p.category === filterCategory;
    const matchesSearch = !searchQuery.trim() ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F4] p-6 rounded-[2px] border border-[#C8B8A6]/70 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
            Archive & Showroom
          </span>
          <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
            Product Catalog Manager
          </h2>
          <p className="text-xs text-[#5C5650] mt-1">
            Create, edit, feature, and archive bespoke menswear suits, tuxedos, and native attire.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-[1px] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bespoke Garment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF7F4] p-4 rounded-[2px] border border-[#C8B8A6]/70 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, cloth..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4EFEA] border border-[#C8B8A6] text-xs text-[#1A1A1A] rounded-[1px] focus:outline-none focus:border-[#6A1C24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-[#8C847C] font-semibold whitespace-nowrap">Filter Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#F4EFEA] border border-[#C8B8A6] py-2 px-3 text-xs text-[#1A1A1A] rounded-[1px] focus:outline-none focus:border-[#6A1C24] cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.filter(c => c.slug !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid / Table */}
      <div className="bg-[#FAF7F4] border border-[#C8B8A6]/70 rounded-[2px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4EFEA] border-b border-[#C8B8A6]/60 text-[10px] uppercase tracking-widest text-[#8C847C] font-semibold font-sans">
              <tr>
                <th className="py-3.5 px-4">Garment</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Cloth & Lapel</th>
                <th className="py-3.5 px-4">Price Setting</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8B8A6]/40">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F5EAEB]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name || prod.title}
                        className="w-12 h-14 object-cover border border-[#C8B8A6] rounded-[1px] shrink-0"
                      />
                      <div>
                        <h4 className="font-cormorant text-lg font-bold text-[#1A1A1A] leading-snug">
                          {prod.name || prod.title}
                        </h4>
                        <p className="text-[10px] text-[#8C847C] font-sans line-clamp-1">
                          {prod.silhouette}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#6A1C24]">
                    {prod.category_name || prod.category || "Atelier Suiting"}
                  </td>
                  <td className="py-3.5 px-4 text-[#5C5650]">
                    <p className="font-medium text-[#1A1A1A]">{prod.fabric || prod.fabric_details}</p>
                    <p className="text-[10px] text-[#8C847C]">{prod.lapel_style || "Classic Peak Lapel"}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#1A1A1A]">
                    {prod.price_amount || "Consultation"}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(prod)}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[1px] border cursor-pointer ${
                        prod.is_featured
                          ? 'bg-[#6A1C24] text-[#F4EFEA] border-[#6A1C24]'
                          : 'bg-stone-100 text-[#8C847C] border-[#C8B8A6]/60'
                      }`}
                    >
                      {prod.is_featured ? '★ Editorial' : 'Standard'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 text-[#5C5650] hover:text-[#6A1C24] hover:bg-[#6A1C24]/10 rounded-[1px] transition-colors cursor-pointer"
                        title="Edit Garment"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {deleteConfirmId === prod.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="px-2 py-1 bg-red-700 text-white text-[10px] uppercase font-bold rounded-[1px]"
                          >
                            Delete
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
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 text-[#8C847C] hover:text-red-700 hover:bg-red-50 rounded-[1px] transition-colors cursor-pointer"
                          title="Delete Garment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
              className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 max-w-2xl w-full rounded-[2px] shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block">
                  Garment Specification Form
                </span>
                <h3 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
                  {editingProduct ? 'Edit Bespoke Garment' : 'Add New Bespoke Garment'}
                </h3>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Garment Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Obsidian Grand Peak Tuxedo"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Category Assignment *
                    </label>
                    <select
                      value={form.category_id}
                      onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24] cursor-pointer"
                    >
                      {categories.filter(c => c.slug !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Lapel Style */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Lapel Cut & Style
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Architectural Silk Satin Peak Lapel"
                      value={form.lapel_style}
                      onChange={(e) => setForm({ ...form, lapel_style: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  {/* Fabric Composition */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Cloth & Mill Details
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Super 160s Vitale Barberis Canonico Wool"
                      value={form.fabric}
                      onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  {/* Silhouette */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Silhouette
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sculpted British Athletic Cut · Full Floating Canvas"
                      value={form.silhouette}
                      onChange={(e) => setForm({ ...form, silhouette: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  {/* Price Amount */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      Price / Consultation Fee
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $2,450 or Bespoke Quote"
                      value={form.price_amount}
                      onChange={(e) => setForm({ ...form, price_amount: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>

                  {/* Main Image URL */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                      High-Resolution Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24]"
                    />
                  </div>
                </div>

                {/* Editorial Description */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                    Editorial Description *
                  </label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Short evocative summary of the cut, lapel, and styling..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24] resize-none"
                  />
                </div>

                {/* Story / Craft Details */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1 font-sans">
                    Craftsmanship Story
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Deep details regarding canvas construction, cloth origin, or occasion inspiration..."
                    value={form.story}
                    onChange={(e) => setForm({ ...form, story: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#C8B8A6] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6A1C24] resize-none"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      className="w-4 h-4 accent-[#6A1C24]"
                    />
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      Feature in Marquee Editorial Section (Homepage Highlight)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-[#C8B8A6]/60">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 bg-transparent border border-[#C8B8A6] text-xs uppercase tracking-wider font-semibold text-[#5C5650] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-md"
                  >
                    {editingProduct ? 'Update Garment' : 'Save to Archive'}
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
