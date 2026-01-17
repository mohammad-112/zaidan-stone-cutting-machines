import React, { useState } from 'react';
import { useStore } from '../services/store';
import { TEXTS } from '../constants';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Home, Box } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, toggleLang, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isRTL = lang === 'ar';
  const t = (key: string) => TEXTS[key][lang];

  const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={() => setIsMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-brand-primary text-brand-dark font-bold' 
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className={`min-h-screen bg-brand-dark flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
               <div className="w-10 h-10 bg-brand-primary rounded flex items-center justify-center font-bold text-brand-dark text-xl">
                 Z
               </div>
               <div className="hidden md:block">
                 <h1 className="text-white font-bold text-lg leading-tight">Zaidan</h1>
                 <p className="text-brand-primary text-xs uppercase tracking-wider">Stone Machines</p>
               </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-300 hover:text-white font-medium transition">{t('home')}</Link>
              <Link to="/products" className="text-gray-300 hover:text-white font-medium transition">{t('products')}</Link>
              {user && (
                <Link to="/admin" className="text-brand-primary hover:text-amber-400 font-medium transition flex items-center gap-1">
                  <LayoutDashboard size={18} />
                  {t('admin')}
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition text-sm font-medium"
              >
                <Globe size={16} />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {user ? (
                <button 
                  onClick={logout}
                  className="hidden md:flex items-center gap-2 text-red-400 hover:text-red-300 transition"
                  title={t('logout')}
                >
                  <LogOut size={20} />
                </button>
              ) : (
                <Link to="/login" className="hidden md:block text-gray-400 hover:text-white transition">
                  <User size={20} />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur pt-24 px-6 space-y-4">
          <NavLink to="/" icon={Home} label={t('home')} />
          <NavLink to="/products" icon={Box} label={t('products')} />
          {user ? (
             <>
               <NavLink to="/admin" icon={LayoutDashboard} label={t('admin')} />
               <button 
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition"
               >
                 <LogOut size={20} />
                 <span>{t('logout')}</span>
               </button>
             </>
          ) : (
            <NavLink to="/login" icon={User} label={t('login')} />
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-stone border-t border-gray-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 mb-2">{t('footer')}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
             <span>support@zaidan-machines.com</span>
             <span>|</span>
             <span>+962 79 000 0000</span>
          </div>
        </div>
      </footer>
    </div>
  );
};