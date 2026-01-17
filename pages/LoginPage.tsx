import React, { useState } from 'react';
import { useStore } from '../services/store';
import { TEXTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertTriangle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, lang } = useStore();
  const t = (key: string) => TEXTS[key][lang];
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-stone p-8 rounded-2xl shadow-2xl border border-gray-800">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-brand-primary" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">{t('login')}</h2>
          <p className="text-gray-500 text-sm mt-2">{t('welcome')}</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-500 rtl:right-3 rtl:left-auto" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={`w-full bg-brand-dark border border-gray-700 text-white rounded-lg py-3 px-10 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition ${lang === 'ar' ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                placeholder="admin@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500 rtl:right-3 rtl:left-auto" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`w-full bg-brand-dark border border-gray-700 text-white rounded-lg py-3 px-10 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition ${lang === 'ar' ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-amber-400 text-brand-dark font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin inline-block"></span>
            ) : t('login')}
          </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
                Secure ERP System v1.0.0
            </p>
        </div>
      </div>
    </div>
  );
};