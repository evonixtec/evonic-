import React from 'react';
import { PORTFOLIO_DATA } from '../../data/content';
import { PortfolioCategory } from '../../types';
import { OptimizedImage } from '../common/OptimizedImage';
import { ArrowRight, Briefcase } from 'lucide-react';

interface HomePortfolioPreviewProps {
  onNavigateToPortfolio: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const HomePortfolioPreview: React.FC<HomePortfolioPreviewProps> = ({
  onNavigateToPortfolio,
  onOpenQuote,
}) => {
  // Combine top website and software clients
  const previewProjects: PortfolioCategory[] = [
    ...PORTFOLIO_DATA.websiteClients.slice(0, 2),
    ...PORTFOLIO_DATA.softwareClients.slice(0, 1),
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-red-600" />
              Proven Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Client Deployments (Dubai & UAE)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore enterprise web platforms and mission-critical ERP solutions engineered for leading commercial brands in Dubai and now Sialkot.
            </p>
          </div>

          <button
            onClick={onNavigateToPortfolio}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-red-600 font-bold text-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex-shrink-0"
          >
            <span>View Full Portfolio & Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-red-300 transition-all group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <OptimizedImage
                    src={item.imageUrl || ''}
                    webpSrc={item.imageWebp}
                    alt={item.imageAlt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white border border-slate-700">
                    {item.industry}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                    {item.categoryName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <button
                  onClick={() => onOpenQuote(`Case Study Inquiry: ${item.title}`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Request Similar Project
                </button>
                <button
                  onClick={onNavigateToPortfolio}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
