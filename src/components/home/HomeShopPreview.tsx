import React from 'react';
import { SHOP_PRODUCTS } from '../../data/content';
import { OptimizedImage } from '../common/OptimizedImage';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface HomeShopPreviewProps {
  onNavigateToShop: () => void;
  onInquireProduct: (productName: string) => void;
}

export const HomeShopPreview: React.FC<HomeShopPreviewProps> = ({
  onNavigateToShop,
  onInquireProduct,
}) => {
  // Show 3 featured products
  const featured = SHOP_PRODUCTS.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
              <span>Verified Hardware &amp; POS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight text-left">
              Commercial Hardware &amp; POS Terminals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
              Tested, enterprise-grade touch terminals, thermal receipt printers, barcode scanners, and imported business laptops with localized Sialkot replacement warranties.
            </p>
          </div>

          <button
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer group flex-shrink-0"
          >
            <span>Browse Full Equipment Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-50 rounded-[24px] border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-red-300 transition-all group text-left"
            >
              <div>
                <div className="relative h-44 w-full bg-white overflow-hidden border-b border-slate-200 rounded-t-[24px]">
                  <OptimizedImage
                    src={prod.imageUrl || ''}
                    webpSrc={prod.imageWebp}
                    alt={prod.imageAlt || prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 text-[10px] font-bold text-[#1E1E1E] border border-slate-200">
                    {prod.category}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-red-600 text-[10px] font-bold text-white shadow-xs">
                    {prod.condition}
                  </div>
                </div>

                <div className="p-6 space-y-2 text-left">
                  <h3 className="text-base font-bold text-[#1E1E1E] group-hover:text-red-600 transition-colors text-left">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-[1.55] text-left">
                    {prod.description}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-slate-500 text-left">
                    Warranty: <span className="text-emerald-700">{prod.warranty}</span>
                  </div>
                </div>
              </div>

              {/* B2B Profile: No retail price on profile display */}
              <div className="p-6 pt-0 border-t border-slate-200 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Corporate Profile</span>
                  <span className="text-xs font-extrabold text-[#1E1E1E]">Quote on Request</span>
                </div>
                {/* Single Primary Red Button Rule */}
                <button
                  onClick={() => onInquireProduct(prod.name)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/25 transition-all cursor-pointer"
                >
                  Inquire B2B Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeShopPreview;
