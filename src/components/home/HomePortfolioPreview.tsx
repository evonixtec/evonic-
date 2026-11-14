import React from 'react';
import { PORTFOLIO_DATA } from '../../data/content';
import { PortfolioCategory } from '../../types';
import { OptimizedImage } from '../common/OptimizedImage';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';

interface HomePortfolioPreviewProps {
  onNavigateToPortfolio: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const HomePortfolioPreview: React.FC<HomePortfolioPreviewProps> = ({
  onNavigateToPortfolio,
  onOpenQuote,
}) => {
  const previewProjects: PortfolioCategory[] = [
    ...PORTFOLIO_DATA.websiteClients.slice(0, 2),
    ...PORTFOLIO_DATA.softwareClients.slice(0, 1),
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FAFAF9] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2.5 max-w-2xl text-left">
            <p className="text-xs font-semibold text-[#C81E1E]">
              03 · Client Deployments &amp; Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Proven work in Dubai and Sialkot
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Representative enterprise web portals, export ERPs, and retail POS systems deployed for commercial teams.
            </p>
          </div>

          <button
            onClick={onNavigateToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-900 font-semibold text-sm border border-[#E5E7EB] transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {previewProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors group text-left"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-[#E5E7EB]">
                  <OptimizedImage
                    src={item.imageUrl || ''}
                    webpSrc={item.imageWebp}
                    alt={item.imageAlt || item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#C81E1E]">{item.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.industry}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#C81E1E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-[#E5E7EB] flex items-center justify-between">
                <button
                  onClick={() => onOpenQuote(`Case Study Inquiry: ${item.title}`)}
                  className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] cursor-pointer"
                >
                  Request Similar Scope
                </button>
                <button
                  onClick={onNavigateToPortfolio}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Adjacent Client Verification Strip */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#C81E1E] text-[#C81E1E]" />
                ))}
              </div>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">4.9 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C81E1E]" />
                <span>Verified Sialkot &amp; UAE Deployments</span>
              </span>
            </div>
            <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed">
              “Before evonix built our local ERP, tracing micro-forged surgical batches for German buyers took hours. Every lot now carries a laser-mapped barcode and export audits finish in 35 minutes.”
            </blockquote>
            <p className="text-xs text-slate-500">
              Chaudhry Nadeem Akhtar · Managing Partner, Al-Madina Precision Surgical (Daska Road, Sialkot)
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <button
              onClick={() => onOpenQuote('Confidential Architecture Walkthrough')}
              className="px-4 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Consultation
            </button>
            <button
              onClick={onNavigateToPortfolio}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-800 font-semibold text-xs sm:text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap"
            >
              All Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePortfolioPreview;
