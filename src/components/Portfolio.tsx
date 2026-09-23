import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/content';
import { OptimizedImage } from './common/OptimizedImage';
import { Globe, Building, ShoppingBag, Utensils, Smartphone, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface PortfolioProps {
  onRequestPrivateMeeting: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onRequestPrivateMeeting }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'software'>('all');

  const getIndustryIcon = (industry: string) => {
    if (industry.includes('Retail') || industry.includes('Supermarket')) {
      return <ShoppingBag className="w-4 h-4 text-red-600" />;
    }
    if (industry.includes('Estate') || industry.includes('Trading') || industry.includes('Corporate')) {
      return <Building className="w-4 h-4 text-blue-600" />;
    }
    if (industry.includes('Restaurant') || industry.includes('Dining')) {
      return <Utensils className="w-4 h-4 text-amber-600" />;
    }
    if (industry.includes('Mobile') || industry.includes('Electronics')) {
      return <Smartphone className="w-4 h-4 text-emerald-600" />;
    }
    return <Globe className="w-4 h-4 text-red-600" />;
  };

  const allItems = [
    ...PORTFOLIO_DATA.websiteClients,
    ...PORTFOLIO_DATA.softwareClients,
  ];

  const displayedItems = activeFilter === 'all'
    ? allItems
    : allItems.filter((item) => item.type === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Globe className="w-3.5 h-3.5 text-red-600" />
            20+ Years International Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Valuable Client Deployments
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {PORTFOLIO_DATA.intro}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Case Studies ({allItems.length})
            </button>
            <button
              onClick={() => setActiveFilter('website')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'website'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Websites & Portals ({PORTFOLIO_DATA.websiteClients.length})
            </button>
            <button
              onClick={() => setActiveFilter('software')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'software'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Software & POS ERPs ({PORTFOLIO_DATA.softwareClients.length})
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Architecture Preview in WebP */}
                {item.imageUrl && (
                  <OptimizedImage
                    src={item.imageUrl}
                    webpSrc={item.imageWebp}
                    alt={item.imageAlt || item.title}
                    aspectRatio="aspect-[16/10]"
                    badge={item.type === 'website' ? 'Web Solution' : 'POS / Software'}
                    badgeColor={item.type === 'website' ? 'blue' : 'emerald'}
                  />
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {getIndustryIcon(item.industry)}
                      <span>{item.industry}</span>
                    </span>
                    <span className="text-[11px] font-bold text-red-600">
                      Dubai & UAE Proven
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Deliverables / Scope tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status pill & Dubai highlight */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    Production Verified
                  </span>
                  <span className="text-slate-500 text-[11px] font-medium">
                    {item.dubaiHighlight.slice(0, 32)}...
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NDA & Confidentiality Note */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Enterprise Client Privacy & NDA Compliance
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Certain UAE and Pakistani enterprise software architectures, databases, and proprietary POS codes are protected under strict Non-Disclosure Agreements (NDAs). Live demonstrations can be scheduled privately.
          </p>
          <button
            onClick={onRequestPrivateMeeting}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Request Private Demonstration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
