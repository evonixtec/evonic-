import React from 'react';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';
import { DynamicBreadcrumb, BreadcrumbSegment } from './DynamicBreadcrumb';

interface PageHeaderBannerProps {
  title: string;
  subtitle: string;
  badgeText: string;
  breadcrumbCurrent: string;
  onNavigateHome: () => void;
  onOpenQuote?: () => void;
  ctaText?: string;
  segments?: BreadcrumbSegment[];
  transparentBg?: boolean;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  title,
  subtitle,
  badgeText,
  breadcrumbCurrent,
  onNavigateHome,
  onOpenQuote,
  ctaText = 'Get Free Quote',
  segments,
  transparentBg = false,
}) => {
  return (
    <div
      className={`pt-24 pb-12 sm:pt-28 sm:pb-16 border-b transition-colors ${
        transparentBg
          ? 'bg-transparent border-white/10 text-white'
          : 'bg-gradient-to-b from-slate-100 via-slate-50 to-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Breadcrumb with Schema.org & responsive styling */}
        <div className="mb-4">
          <DynamicBreadcrumb
            currentTitle={breadcrumbCurrent}
            segments={segments}
            onNavigatePage={() => onNavigateHome()}
            variant={transparentBg ? 'dark' : 'light'}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs ${
                transparentBg
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${transparentBg ? 'text-red-400' : 'text-red-600'}`} />
              <span>{badgeText}</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                transparentBg ? 'text-white drop-shadow-sm' : 'text-slate-900'
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                transparentBg ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {subtitle}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                  transparentBg
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-xs hover:shadow-md'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{ctaText}</span>
              </button>
            )}

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Hello evonix, I am inquiring about ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-colors flex items-center gap-1.5 backdrop-blur-xs ${
                transparentBg
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${transparentBg ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
