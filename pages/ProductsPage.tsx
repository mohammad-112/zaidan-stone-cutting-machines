import React from 'react';
import { useStore } from '../services/store';
import { TEXTS, PRODUCTS } from '../constants';
import { Settings, Zap, Maximize } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { lang } = useStore();
  const t = (key: string) => TEXTS[key][lang];

  return (
    <div className="py-16 bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('products')}</h1>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => (
            <div key={product.id} className="bg-brand-stone rounded-xl overflow-hidden border border-gray-800 hover:border-brand-primary/50 transition duration-300 group flex flex-col">
              {/* Image */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={lang === 'ar' ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3">
                  {lang === 'ar' ? product.nameAr : product.nameEn}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
                </p>

                {/* Specs */}
                <div className="space-y-3 bg-brand-dark/50 p-4 rounded-lg border border-gray-800/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Zap size={14} /> {t('power')}
                    </span>
                    <span className="text-brand-primary font-mono">{product.power}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Settings size={14} /> {t('weight')}
                    </span>
                    <span className="text-brand-primary font-mono">{product.weight}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Maximize size={14} /> {t('area')}
                    </span>
                    <span className="text-brand-primary font-mono">{product.workingArea}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};