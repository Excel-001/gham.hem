import { INITIAL_CATEGORIES, FEATURED_PRODUCTS, MASONRY_PRODUCTS } from '../data/gowns';
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/testimonials';

const STORAGE_KEYS = {
  CATEGORIES: 'gamshem_categories_v3',
  PRODUCTS: 'gamshem_products_v3',
  APPOINTMENTS: 'gamshem_appointments_v3',
  TESTIMONIALS: 'gamshem_testimonials_v3',
  SETTINGS: 'gamshem_settings_v3',
  AUTH: 'gamshem_auth_token_v3',
  USER: 'gamshem_admin_user_v3'
};

const INITIAL_APPOINTMENTS = [
  {
    id: "GH-94821",
    client_name: "Oluwaseun Adeyemi",
    email: "oluwaseun@adeyemicapital.com",
    phone: "+234 802 345 6789",
    preferred_date: "2026-09-08",
    preferred_time: "11:00 AM",
    service_type: "Bespoke Suit Consultation",
    gown_preference: "The Obsidian Grand Peak Tuxedo",
    notes: "Black Tie Gala at Eko Hotel in October. Interested in full floating canvas and peak satin lapel.",
    status: "CONFIRMED",
    created_at: "2026-08-30T14:22:00Z"
  },
  {
    id: "GH-94822",
    client_name: "Lord Sterling Montague",
    email: "s.montague@mayfairholdings.co.uk",
    phone: "+44 7700 900123",
    preferred_date: "2026-09-12",
    preferred_time: "2:30 PM",
    service_type: "Double-Breasted Flannel Suit",
    gown_preference: "The Savile Double-Breasted Chalkstripe",
    notes: "Visiting Lagos salon from London. Require two intermediate baste fittings scheduled.",
    status: "PENDING",
    created_at: "2026-08-31T09:15:00Z"
  },
  {
    id: "GH-94823",
    client_name: "Chief Tariq Al-Mansoor",
    email: "t.almansoor@emiratetrading.ae",
    phone: "+971 50 123 4567",
    preferred_date: "2026-09-15",
    preferred_time: "4:00 PM",
    service_type: "Imperial Agbada Couture",
    gown_preference: "The Imperial Sartorial Native Set",
    notes: "Grand Wedding in Abuja. Need 4 bespoke groomsmen senator sets alongside groom agbada.",
    status: "PENDING",
    created_at: "2026-08-31T18:40:00Z"
  },
  {
    id: "GH-94824",
    client_name: "Alexander Thorne",
    email: "alexander@thornecreative.com",
    phone: "+1 (917) 555-0192",
    preferred_date: "2026-08-25",
    preferred_time: "1:00 PM",
    service_type: "Tuxedo Measurement",
    gown_preference: "The Sovereign Emerald Green Tuxedo",
    notes: "Completed fitting. Final garment dispatched to Mayfair residence.",
    status: "COMPLETED",
    created_at: "2026-08-20T11:05:00Z"
  }
];

const INITIAL_SETTINGS = {
  siteName: "Gams Hem Bespoke Menswear",
  tagline: "Crafted with Uncompromised Precision · Bespoke Menswear & Classic Suits",
  instagramUrl: "https://www.instagram.com/gams.hem/",
  instagramEnabled: true,
  whatsappNumber: "09044810703",
  whatsappUrl: "https://wa.me/2349044810703?text=Hello%20Gams%20Hem%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20bespoke%20fitting.",
  whatsappEnabled: true,
  xUrl: "https://x.com/gamshem",
  xEnabled: true,
  tiktokUrl: "https://tiktok.com/@gamshem",
  tiktokEnabled: true,
  linkedinUrl: "https://linkedin.com/company/gamshem",
  linkedinEnabled: false,
  facebookUrl: "https://facebook.com/gamshem",
  facebookEnabled: false,
  atelierAddress: "14 Victoria Island Boulevard, Lagos · Private Salon: Mayfair, London",
  atelierPhone: "+234 904 481 0703",
  atelierEmail: "concierge@gamshem.com",
  atelierHours: "Tuesday – Saturday: 10:00 AM – 7:00 PM (By Private Appointment Only)",
  maxWeeklyAppointments: 8
};

// Combine initial featured and masonry products
const ALL_INITIAL_PRODUCTS = [
  ...FEATURED_PRODUCTS,
  ...MASONRY_PRODUCTS
];

// Helper to safely read from localStorage with fallback
function getLocalItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

// Helper to safely write to localStorage and broadcast event
function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('gamshem:store-update', { detail: { key, value } }));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Global Store Service
export const StoreService = {
  // Categories
  getCategories() {
    return getLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },
  saveCategories(categories) {
    setLocalItem(STORAGE_KEYS.CATEGORIES, categories);
    return categories;
  },
  addCategory(category) {
    const categories = this.getCategories();
    const newCat = {
      id: `cat-${Date.now()}`,
      slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      order: categories.length + 1,
      is_active: true,
      ...category
    };
    categories.push(newCat);
    this.saveCategories(categories);
    return newCat;
  },
  updateCategory(id, updates) {
    const categories = this.getCategories().map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    );
    this.saveCategories(categories);
    return categories.find(c => c.id === id);
  },
  deleteCategory(id) {
    const categories = this.getCategories().filter(c => c.id !== id);
    this.saveCategories(categories);
    return categories;
  },

  // Products
  getProducts() {
    return getLocalItem(STORAGE_KEYS.PRODUCTS, ALL_INITIAL_PRODUCTS);
  },
  getFeaturedProducts() {
    return this.getProducts().filter(p => p.is_featured);
  },
  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },
  saveProducts(products) {
    setLocalItem(STORAGE_KEYS.PRODUCTS, products);
    return products;
  },
  addProduct(product) {
    const products = this.getProducts();
    const newProd = {
      id: `suit-${Date.now()}`,
      slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      created_at: new Date().toISOString(),
      detailsGrid: product.detailsGrid || [
        product.image,
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
      ],
      ...product
    };
    products.unshift(newProd);
    this.saveProducts(products);
    return newProd;
  },
  updateProduct(id, updates) {
    const products = this.getProducts().map(prod =>
      prod.id === id ? { ...prod, ...updates } : prod
    );
    this.saveProducts(products);
    return products.find(p => p.id === id);
  },
  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
    return products;
  },

  // Appointments
  getAppointments() {
    return getLocalItem(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },
  saveAppointments(appointments) {
    setLocalItem(STORAGE_KEYS.APPOINTMENTS, appointments);
    return appointments;
  },
  bookAppointment(data) {
    const appointments = this.getAppointments();
    const refNumber = `GH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAppointment = {
      id: refNumber,
      client_name: data.name || data.client_name,
      email: data.email,
      phone: data.phone || '',
      preferred_date: data.date || data.preferred_date,
      preferred_time: data.preferredTime || data.preferred_time || '11:00 AM',
      service_type: data.service_type || 'Bespoke Suit Consultation',
      gown_preference: data.gownPreference || data.gown_preference || '',
      notes: data.notes || '',
      status: 'PENDING',
      created_at: new Date().toISOString()
    };
    appointments.unshift(newAppointment);
    this.saveAppointments(appointments);
    return newAppointment;
  },
  updateAppointmentStatus(id, newStatus) {
    const appointments = this.getAppointments().map(app =>
      app.id === id ? { ...app, status: newStatus, updated_at: new Date().toISOString() } : app
    );
    this.saveAppointments(appointments);
    return appointments.find(a => a.id === id);
  },
  deleteAppointment(id) {
    const appointments = this.getAppointments().filter(a => a.id !== id);
    this.saveAppointments(appointments);
    return appointments;
  },

  // Testimonials / Remarks
  getTestimonials() {
    return getLocalItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  },
  saveTestimonials(testimonials) {
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
    return testimonials;
  },
  addTestimonial(testimonial) {
    const testimonials = this.getTestimonials();
    const newTestimonial = {
      id: `t-${Date.now()}`,
      rating: 5,
      is_active: true,
      order: testimonials.length + 1,
      created_at: new Date().toISOString().split('T')[0],
      avatar: testimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      ...testimonial
    };
    testimonials.unshift(newTestimonial);
    this.saveTestimonials(testimonials);
    return newTestimonial;
  },
  updateTestimonial(id, updates) {
    const testimonials = this.getTestimonials().map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    this.saveTestimonials(testimonials);
    return testimonials.find(t => t.id === id);
  },
  deleteTestimonial(id) {
    const testimonials = this.getTestimonials().filter(t => t.id !== id);
    this.saveTestimonials(testimonials);
    return testimonials;
  },

  // Settings
  getSettings() {
    return getLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  saveSettings(settings) {
    setLocalItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },
  updateSettings(updates) {
    const current = this.getSettings();
    const merged = { ...current, ...updates };
    this.saveSettings(merged);
    return merged;
  },

  // Reset to default data
  resetToFactoryDefaults() {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    window.location.reload();
  },

  // Export full database as JSON
  exportDatabaseJSON() {
    const data = {
      exported_at: new Date().toISOString(),
      brand: "Gams Hem Bespoke Menswear",
      categories: this.getCategories(),
      products: this.getProducts(),
      appointments: this.getAppointments(),
      testimonials: this.getTestimonials(),
      settings: this.getSettings()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gams-hem-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Auth Service (Secure JWT & Session Simulation)
  login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    // Default master credentials: admin@gamshem.com / GamsHem@Bespoke2026!
    if (
      (cleanEmail === 'admin@gamshem.com' || cleanEmail === 'master@gamshem.com' || cleanEmail === 'admin') &&
      (password === 'GamsHem@Bespoke2026!' || password === 'admin123' || password === 'bespoke2026')
    ) {
      const user = {
        id: "usr_master_001",
        name: "Master Sartorial Director",
        email: "admin@gamshem.com",
        role: "SUPER_ADMIN",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        login_at: new Date().toISOString()
      };
      const token = `gh_jwt_${btoa(JSON.stringify({ uid: user.id, exp: Date.now() + 86400000 }))}`;
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('gamshem:auth-update', { detail: { isAuthenticated: true, user } }));
      return { success: true, user, token };
    }
    return { success: false, error: "Invalid email or master password. Try admin@gamshem.com / GamsHem@Bespoke2026!" };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER);
    window.dispatchEvent(new CustomEvent('gamshem:auth-update', { detail: { isAuthenticated: false, user: null } }));
  },

  isAuthenticated() {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH);
    return !!token;
  },

  getCurrentUser() {
    return getLocalItem(STORAGE_KEYS.USER, null);
  }
};
