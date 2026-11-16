import React from 'react';
import { ArrowRight, Home, Search } from 'lucide-react';
import { NavPageId } from '../types';

interface NotFoundPageProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (service?: string) => void;
  onOpenSearch?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigatePage,
  onOpenQuote,
  onOpenSearch,
}) => {
  const quickLinks: { label: string; href: string; page: NavPageId; subTarget?: string; note: string }[] = [
    {
      label: 'Software Services',
      href: '/services',
      page: 'services',
      note: 'Custom web systems and business software',
    },
    {
      label: 'POS Software Pricing',
      href: '/services/software-pos',
      page: 'services',
      subTarget: 'software-pos',
      note: '100% offline Windows & LAN retail POS',
    },
    {
      label: 'Sialkot Export ERP',
      href: '/sialkot-export-erp',
      page: 'sialkot-export-erp',
      note: 'Factory job cards, packing lists, WeBOC',
    },
    {
      label: 'Free Business Tools',
      href: '/tools',
      page: 'tools',
      note: '24 invoice, margin, CBM & VAT calculators',
    },
    {
      label: 'Retail & Tech Guides',
      href: '/guides',
      page: 'guides',
      note: 'Practical setup manuals and field articles',
    },
    {
      label: 'Contact Engineering Desk',
      href: '/contact',
      page: 'contact',
      note: 'Got a question? Call us. We reply in 2 hours.',
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 space-y-6">
          <p className="font-mono text-xs font-semibold text-[#C81E1E] tracking-wide">
            HTTP 404 · Page Not Found
          </p>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight max-w-2xl"
            style={{ textWrap: 'balance' }}
          >
            This page is not here anymore.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            The link may be typed wrong or the page has moved. Use the buttons below to go back home or open our main pages.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('home');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </a>

            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-[#E5E7EB] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-600" />
                <span>Search Site</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenQuote('General Inquiry')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              <span>Request Free Quote</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage(item.page, item.subTarget);
              }}
              className="group p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-slate-300 transition-colors flex flex-col justify-between gap-3"
            >
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-slate-900 group-hover:text-[#C81E1E] transition-colors flex items-center justify-between gap-2">
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C81E1E] shrink-0 transition-colors" />
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">{item.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
