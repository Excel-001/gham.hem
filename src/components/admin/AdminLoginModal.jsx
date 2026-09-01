import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, X, Sparkles, Key } from 'lucide-react';
import { StoreService } from '../../services/store';
import gamLogo from '../../assets/gam.jpg';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin@gamshem.com');
  const [password, setPassword] = useState('GamsHem@Bespoke2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = StoreService.login(email, password);
      setLoading(false);
      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.error);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@gamshem.com');
    setPassword('GamsHem@Bespoke2026!');
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/85 backdrop-blur-[10px]"
        />

        {/* Login Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#FAF7F4] border border-[#C8B8A6] p-8 md:p-10 max-w-md w-full rounded-[2px] shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8C847C] hover:text-[#1A1A1A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-[2px] overflow-hidden border border-[#C8B8A6]/60 shadow-md mx-auto mb-3 bg-[#4D1016]">
              <img
                src={gamLogo}
                alt="Gams Hem Bespoke Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#6A1C24] font-semibold block mb-1 font-sans">
              Restricted Atelier Portal
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-[#1A1A1A] tracking-wider">
              GAMS HEM CMS
            </h3>
            <p className="text-xs text-[#5C5650] font-sans mt-1">
              Authenticate with Master Sartorial credentials to manage products, fittings, categories, and site settings.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-[#6A1C24]/10 border border-[#6A1C24]/40 text-xs text-[#6A1C24] font-semibold rounded-[1px] mb-4 font-sans text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1.5 font-sans">
                Master Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@gamshem.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-[#F4EFEA] border border-[#C8B8A6] focus:border-[#6A1C24] text-xs font-sans text-[#1A1A1A] rounded-[1px] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8C847C] font-semibold mb-1.5 font-sans">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F4EFEA] border border-[#C8B8A6] focus:border-[#6A1C24] text-xs font-sans text-[#1A1A1A] rounded-[1px] focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C847C] hover:text-[#1A1A1A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A1C24] hover:bg-[#4D1016] text-[#F4EFEA] text-xs uppercase tracking-widest py-3.5 font-bold transition-all duration-300 cursor-pointer rounded-[1px] shadow-md flex items-center justify-center gap-2 border border-[#C8B8A6]/40 disabled:opacity-50 mt-2"
            >
              <Key className="w-4 h-4 text-[#C8B8A6]" />
              <span>{loading ? 'Verifying Credentials...' : 'Authenticate & Enter Dashboard →'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials shortcut */}
          <div className="mt-6 pt-4 border-t border-[#C8B8A6]/50 text-center">
            <button
              onClick={handleFillDemo}
              className="text-[11px] uppercase tracking-wider text-[#6A1C24] hover:underline font-semibold font-sans inline-flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Master Demo Credentials</span>
            </button>
            <p className="text-[10px] text-[#8C847C] font-mono mt-1">
              admin@gamshem.com / GamsHem@Bespoke2026!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
