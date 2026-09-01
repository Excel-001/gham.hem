import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroPhotoWall from './components/HeroPhotoWall';
import EditorialDressReveals from './components/EditorialDressReveals';
import AtelierAnatomy from './components/AtelierAnatomy';
import BespokeProcess from './components/BespokeProcess';
import MasonryGallery from './components/MasonryGallery';
import GownDetailModal from './components/GownDetailModal';
import Testimonials from './components/Testimonials';
import AppointmentSection from './components/AppointmentSection';
import JournalModal from './components/JournalModal';
import Footer from './components/Footer';
import WhatsAppConcierge from './components/WhatsAppConcierge';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { useGamsHemStore } from './services/useStore';

export default function App() {
  const {
    categories,
    products,
    appointments,
    testimonials,
    settings,
    currentUser,
    isAuthenticated,
    refreshAll,
    store
  } = useGamsHemStore();

  const [selectedGownForModal, setSelectedGownForModal] = useState(null);
  const [gownForAppointment, setGownForAppointment] = useState('');
  const [journalOpen, setJournalOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Check URL hash or hotkey for direct admin routing (e.g. #admin or /admin)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || pathname === '/admin') {
        if (isAuthenticated) {
          setAdminDashboardOpen(true);
        } else {
          setAdminLoginOpen(true);
        }
      }
    };

    const handleKeyDown = (e) => {
      // Secret Admin Hotkey: Ctrl+Shift+A or Alt+A
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        if (isAuthenticated) {
          setAdminDashboardOpen(prev => !prev);
        } else {
          setAdminLoginOpen(true);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthenticated]);

  const scrollToAppointments = () => {
    const el = document.getElementById('appointments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookGown = (gownName) => {
    setGownForAppointment(gownName);
    scrollToAppointments();
  };

  const handleViewDetails = (gown) => {
    setSelectedGownForModal(gown);
  };

  const handleLoginSuccess = () => {
    setAdminLoginOpen(false);
    setAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    store.logout();
    setAdminDashboardOpen(false);
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#6A1C24] selection:text-[#F4EFEA]">
      {/* Fixed Sticky Header */}
      <Header
        onBookClick={scrollToAppointments}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Editorial Hero with Double Interactive Brand Carousel */}
        <HeroPhotoWall
          onExploreClick={scrollToProducts}
          onBookClick={scrollToAppointments}
        />

        {/* Section 2: The Curated Showcase & Atelier Archive (Dynamic Categories & Search) */}
        <MasonryGallery
          products={products}
          categories={categories}
          onSelectGown={handleViewDetails}
        />

        {/* Section 3: Editorial Marquee Suit Reveals (Obsidian, Savile, Imperial Agbada) */}
        <EditorialDressReveals
          onBookGown={handleBookGown}
          onViewGownDetails={handleViewDetails}
        />

        {/* Section 4: The Anatomy of Sartorial Excellence (Interactive Full Canvas Explorer) */}
        <AtelierAnatomy />

        {/* Section 5: The 4-Stage Bespoke Journey */}
        <BespokeProcess onBookClick={scrollToAppointments} />

        {/* Section 6: Customer Remarks & Testimonials (Real Grooms & Gentlemen) */}
        <Testimonials testimonials={testimonials} />

        {/* Section 7: Private Fitting & Appointment Booking System */}
        <AppointmentSection
          selectedGownName={gownForAppointment}
          onResetGown={() => setGownForAppointment('')}
        />
      </main>

      {/* Section 8: Footer with Dynamic Social Media Integration */}
      <Footer
        settings={settings}
        onOpenJournal={() => setJournalOpen(true)}
      />

      {/* Floating Interactive WhatsApp Concierge Widget (Bottom-Right) */}
      <WhatsAppConcierge settings={settings} />

      {/* Product Detail Full-Screen Overlay Modal */}
      <GownDetailModal
        gown={selectedGownForModal}
        onClose={() => setSelectedGownForModal(null)}
        onBookGown={handleBookGown}
      />

      {/* Atelier Journal Modal */}
      <JournalModal
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
      />

      {/* Secure Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full-Screen Protected Admin CMS Dashboard */}
      {adminDashboardOpen && isAuthenticated && (
        <AdminDashboard
          currentUser={currentUser}
          categories={categories}
          products={products}
          appointments={appointments}
          testimonials={testimonials}
          settings={settings}
          onClose={() => {
            setAdminDashboardOpen(false);
            if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
              window.location.hash = '';
            }
          }}
          onLogout={handleLogout}
          onRefresh={refreshAll}
        />
      )}
    </div>
  );
}

