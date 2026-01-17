import React from 'react';
import { useStore } from '../services/store';
import { TEXTS } from '../constants';
import { ChevronRight, ChevronLeft, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { lang } = useStore();
  const t = (key: string) => TEXTS[key][lang];
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
            alt="Factory"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-start w-full">
          <div className={`max-w-3xl ${isRTL ? 'mr-0' : 'ml-0'}`}>
            <div className="inline-block px-4 py-1 bg-brand-primary/10 border border-brand-primary/30 rounded-full text-brand-primary mb-6 backdrop-blur-sm">
              <span className="text-sm font-semibold tracking-wide">EST. 2012</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {t('welcome')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-light">
              {t('heroSub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link 
                to="/products"
                className="px-8 py-4 bg-brand-primary hover:bg-amber-400 text-brand-dark font-bold rounded-lg transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group"
              >
                {t('products')}
                <Arrow size={20} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* History & Vision */}
      <div className="py-20 bg-brand-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-12">
              <div className="bg-brand-dark/50 p-8 rounded-2xl border border-gray-800 hover:border-brand-primary/30 transition duration-300">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="text-blue-500" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{t('historyTitle')}</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t('historyText')}
                </p>
              </div>

              <div className="bg-brand-dark/50 p-8 rounded-2xl border border-gray-800 hover:border-brand-primary/30 transition duration-300">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Cpu className="text-brand-primary" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{t('visionTitle')}</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t('visionText')}
                </p>
              </div>
            </div>

            {/* Visual/Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                alt="CNC Technology" 
                className="relative rounded-xl shadow-2xl border border-gray-700 grayscale hover:grayscale-0 transition duration-700"
              />
              <div className="absolute -bottom-6 -right-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <Zap className="text-yellow-400" size={32} />
                  <div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-gray-400">Precision Rate</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};