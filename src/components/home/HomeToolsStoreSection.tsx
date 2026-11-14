import React from 'react';
import { ArrowRight, Calculator, Server } from 'lucide-react';
import { NavPageId } from '../../types';
import { getStoreDomainUrl } from '../../lib/domainUtils';

interface HomeToolsStoreSectionProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
}

const CORE_CALCULATOR_LINKS: {
  label: string;
  href: string;
  pageId: NavPageId;
  category: string;
}[] = [
  {
    label: 'Etsy Fee & Profit Calculator',
    href: '/tools/etsy-fee-calculator',
    pageId: 'etsy-fee-calculator',
    category: 'Marketplace',
  },
  {
    label: 'TikTok Shop Fee Calculator',
    href: '/tools/tiktok-shop-fee-calculator',
    pageId: 'tiktok-shop-fee-calculator',
    category: 'Marketplace',
  },
  {
    label: 'eBay Fee & Profit Builder',
    href: '/tools/ebay-fee-calculator',
    pageId: 'ebay-fee-calculator',
    category: 'Marketplace',
  },
  {
    label: 'Amazon FBA Calculator',
    href: '/tools/amazon-fba-calculator',
    pageId: 'amazon-fba-calculator',
    category: 'Fulfillment',
  },
  {
    label: 'Amazon FBM Calculator',
    href: '/tools/amazon-fbm-calculator',
    pageId: 'amazon-fbm-calculator',
    category: 'Fulfillment',
  },
  {
    label: 'Shopify Fee Calculator',
    href: '/tools/shopify-fee-calculator',
    pageId: 'shopify-fee-calculator',
    category: 'Storefront',
  },
  {
    label: 'Stripe Payout Calculator',
    href: '/tools/stripe-fee-calculator',
    pageId: 'stripe-fee-calculator',
    category: 'Payments',
  },
  {
    label: 'Temu Seller Margin Tool',
    href: '/tools/temu-seller-calculator',
    pageId: 'temu-seller-calculator',
    category: 'Marketplace',
  },
  {
    label: 'Export CBM & Container Engine',
    href: '/tools/export-cbm-calculator',
    pageId: 'cbm-calculator',
    category: 'Freight',
  },
  {
    label: 'Global Invoice Generator',
    href: '/tools/invoice-generator',
    pageId: 'invoice',
    category: 'Billing',
  },
  {
    label: 'Export Barcode Label Studio',
    href: '/tools/export-barcode-studio',
    pageId: 'export-barcode-studio',
    category: 'Factory',
  },
  {
    label: 'AI Trip Planner Engine',
    href: '/tools/ai-trip-planner',
    pageId: 'ai-trip-planner',
    category: 'Utility',
  },
];

const HARDWARE_AND_ERP_LINKS: {
  label: string;
  detail: string;
  href: string;
  pageId?: NavPageId;
  external?: boolean;
}[] = [
  {
    label: 'Touchscreen POS Billing Units & Hardware',
    detail: 'store.evonixtec.com · Warranty & Same-Day Sialkot Dispatch',
    href: getStoreDomainUrl(),
    external: true,
  },
  {
    label: 'Sialkot POS & Thermal Printer Depot',
    detail: '/locations/sialkot/pos-hardware · Local Lab Testing',
    href: '/locations/sialkot/pos-hardware',
    pageId: 'sialkot-pos-hardware',
  },
  {
    label: 'Sialkot Export Manufacturing ERP Suite',
    detail: '/sialkot-export-erp · Surgical, Sports & Leather Workflows',
    href: '/sialkot-export-erp',
    pageId: 'sialkot-export-erp',
  },
  {
    label: '45-Min Doorstep IT & Printer Dispatch',
    detail: 'store.evonixtec.com/services/doorstep-support · On-Site Engineers',
    href: getStoreDomainUrl('/services/doorstep-support'),
    external: true,
  },
];

export const HomeToolsStoreSection: React.FC<HomeToolsStoreSectionProps> = ({
  onNavigatePage,
}) => {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-semibold text-[#C81E1E]">
              04 · Tools &amp; Commercial Hardware
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Free seller calculators and tested POS hardware
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Direct access to our browser-based e-commerce fee calculators on tools.evonixtec.com and commercial POS terminals on store.evonixtec.com.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="/tools"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('tools');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-sm transition-colors whitespace-nowrap"
            >
              <span>All 26 Free Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={getStoreDomainUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-900 font-semibold text-sm border border-[#E5E7EB] transition-colors whitespace-nowrap"
            >
              <span>Open Hardware Store</span>
            </a>
          </div>
        </div>

        {/* Two Clean Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Direct SEO Internal Calculator Links */}
          <div className="lg:col-span-7 rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C81E1E] text-white flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Workstation Calculators &amp; Utilities
                    </h3>
                    <p className="text-xs text-slate-500">
                      tools.evonixtec.com · No signup required
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-600 tabular-nums">
                  26 Tools
                </span>
              </div>

              {/* Clean Bordered Index Grid of Direct Internal Calculator Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5">
                {CORE_CALCULATOR_LINKS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigatePage(tool.pageId);
                    }}
                    className="group bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors"
                  >
                    <span className="text-xs font-medium text-slate-800 group-hover:text-[#C81E1E] transition-colors truncate">
                      {tool.label}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 flex-shrink-0">
                      {tool.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href="/tools"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('tools');
                }}
                className="font-semibold text-[#C81E1E] hover:text-[#A6171E] inline-flex items-center gap-1"
              >
                <span>Open Full Tools Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-500">
                100% browser-executed · Privacy-first calculations
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Store Subdomain & Export ERP Direct Paths */}
          <div className="lg:col-span-5 rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      POS Hardware &amp; ERP Systems
                    </h3>
                    <p className="text-xs text-slate-500">
                      store.evonixtec.com · Sialkot Dispatch
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-600 tabular-nums">
                  SLA 99.9%
                </span>
              </div>

              <div className="space-y-2.5 pt-5">
                {HARDWARE_AND_ERP_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={
                      item.pageId
                        ? (e) => {
                            e.preventDefault();
                            onNavigatePage(item.pageId!);
                          }
                        : undefined
                    }
                    className="group block bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-lg px-4 py-3 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#C81E1E] transition-colors">
                        {item.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C81E1E] flex-shrink-0 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-mono truncate">
                      {item.detail}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={getStoreDomainUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#C81E1E] hover:text-[#A6171E] inline-flex items-center gap-1"
              >
                <span>Visit store.evonixtec.com</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-500">
                Warranty backed · Kotli Behram Lab
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeToolsStoreSection;
