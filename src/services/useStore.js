import { useState, useEffect } from 'react';
import { StoreService } from './store';

export function useGamsHemStore() {
  const [categories, setCategories] = useState(StoreService.getCategories());
  const [products, setProducts] = useState(StoreService.getProducts());
  const [appointments, setAppointments] = useState(StoreService.getAppointments());
  const [testimonials, setTestimonials] = useState(StoreService.getTestimonials());
  const [settings, setSettings] = useState(StoreService.getSettings());
  const [currentUser, setCurrentUser] = useState(StoreService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(StoreService.isAuthenticated());

  const refreshAll = () => {
    setCategories(StoreService.getCategories());
    setProducts(StoreService.getProducts());
    setAppointments(StoreService.getAppointments());
    setTestimonials(StoreService.getTestimonials());
    setSettings(StoreService.getSettings());
    setCurrentUser(StoreService.getCurrentUser());
    setIsAuthenticated(StoreService.isAuthenticated());
  };

  useEffect(() => {
    const handleStoreUpdate = () => {
      refreshAll();
    };

    const handleAuthUpdate = () => {
      setCurrentUser(StoreService.getCurrentUser());
      setIsAuthenticated(StoreService.isAuthenticated());
    };

    window.addEventListener('gamshem:store-update', handleStoreUpdate);
    window.addEventListener('gamshem:auth-update', handleAuthUpdate);
    window.addEventListener('storage', handleStoreUpdate);

    return () => {
      window.removeEventListener('gamshem:store-update', handleStoreUpdate);
      window.removeEventListener('gamshem:auth-update', handleAuthUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, []);

  return {
    categories,
    products,
    appointments,
    testimonials,
    settings,
    currentUser,
    isAuthenticated,
    refreshAll,
    store: StoreService
  };
}
