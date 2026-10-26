import React from 'react';
import {
  Boxes,
  SlidersHorizontal,
  Calculator,
  FileText,
  Search,
  Globe,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  Wrench
} from 'lucide-react';
import { NavPageId } from '../../types';

interface HomeToolsGridProps {
  onLaunchTool: (toolId: NavPageId) => void;
  onNavigateToToolsHub: () => void;
}

interface CoreToolPreview {
  id: NavPageId;
  name: string;
  category: string;
  badge: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
}

const FEATURED_TOOLS: CoreToolPreview[] = [
  {
    id: 'trend-intelligence-suite',
    name: 'Trend Intelligence Suite (V15 Pro)',
    category: 'Market Intelligence',
    badge: '5-Platform Edge Failover',
    description: 'Analyze real-time keyword trends across Google, Bing, eBay, YouTube, and Amazon with bulk file processing and CSV export.',
    metric: 'V15 Multi-Platform Engine',
    icon: <Sparkles className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'ebay-fee-calculator',
    name: 'eBay Fee & Profit Builder (Pro Suite)',
    category: 'Marketplace Trade',
    badge: 'Multi-Country Tariffs',
    description: 'Calculate Final Value Fees, promoted ads, and currency conversion margins across US, UK, Germany, and Pakistan.',
    metric: '10-Country Rolling Forex',
    icon: <Calculator className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'tiktok-shop-fee-calculator',
    name: 'TikTok Shop Fee Calculator',
    category: 'E-Commerce & Ads',
    badge: 'TikTok Seller Matrix',
    description: 'Calculate TikTok Shop platform commission, creator affiliate margins, and net seller payout in real time.',
    metric: '5% to 8% Fee Solver',
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'amazon-fba-calculator',
    name: 'Amazon FBA Fee & Profit Calculator',
    category: 'E-Commerce & Export',
    badge: 'FBA & FBM Matrix',
    description: 'Calculate Amazon referral fees, pick and pack fulfillment costs, and monthly inventory storage charges.',
    metric: '2026 FBA Fee Engine',
    icon: <Calculator className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'shopify-fee-calculator',
    name: 'Shopify Fee & Transaction Calculator',
    category: 'E-Commerce & Ads',
    badge: 'Plan Tier Solver',
    description: 'Compare Basic, Shopify, and Advanced plan fees. Check third-party payment gateway charges with ease.',
    metric: 'Plan Savings Matrix',
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'stripe-fee-calculator',
    name: 'Stripe Payment Processing Calculator',
    category: 'Business & Finance',
    badge: 'Dual Forward / Reverse',
    description: 'Find domestic and international Stripe credit card charges. Calculate the exact charge needed for your target net payout.',
    metric: '2.9% + $0.30 Engine',
    icon: <Calculator className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'temu-seller-calculator',
    name: 'Temu Seller Fee & Margin Calculator',
    category: 'E-Commerce & Export',
    badge: 'Semi & Full Managed',
    description: 'Calculate Temu commissions, warehouse intake fees, shipping expenses, and net profit margins per order.',
    metric: 'Temu Net Yield Solver',
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    category: 'E-Commerce & Ads',
    badge: 'Pakistani & Global Courier',
    description: 'Model real-world Cash-on-Delivery cash flows, simulate return freight losses, and solve target breakeven ROAS.',
    metric: 'Breakeven ROAS Matrix',
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    category: 'Logistics & Export',
    badge: 'IATA & Maritime Standard',
    description: 'Calculate Cubic Meters, air courier volumetric weights, and 20ft / 40ft HQ container stuffing capacity.',
    metric: 'Air / Sea Multi-Carton Solver',
    icon: <Boxes className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'sialkot-export-erp',
    name: 'Sialkot Export ERP & Production Tracker',
    category: 'Industrial Software',
    badge: 'WeBOC & ISO Standard',
    description: 'Track factory export consignments, leather and sports goods batches, and automated commercial invoices.',
    metric: 'Customs & Batch Ready',
    icon: <Boxes className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'invoice',
    name: 'Free Global Micro-Invoice Generator',
    category: 'Business & Finance',
    badge: 'No Signup · 150+ Currencies',
    description: 'Create invoice in browser, data never leaves your device. Multi-currency invoice generator for freelance billing and small business invoicing with instant A4 PDF.',
    metric: 'Instant PDF · No Signup',
    icon: <FileText className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    category: 'Workforce Planning',
    badge: 'Capital Savings Solver',
    description: 'Compare USA, UK, and Dubai software engineering salaries against dedicated offshore squads in Sialkot.',
    metric: 'Annual Savings Calculator',
    icon: <Calculator className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'ai-visibility-checker',
    name: 'Website E-E-A-T & AI Visibility Checker',
    category: 'Growth & SEO',
    badge: 'GEO Readiness Auditor',
    description: 'Audit your domain for Google AI Overviews, ChatGPT Search, Claude, and Perplexity with zero external tracking.',
    metric: 'Live Algorithmic GEO Score',
    icon: <Search className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'installation-guide',
    name: 'Desktop Hardware Key & Setup Guide',
    category: 'Offline Tools',
    badge: '100% Free Access',
    description: 'Step by step installation manual for our offline desktop tools with zero fees under our launch offer.',
    metric: '100% Free Launch Offer',
    icon: <Wrench className="w-5 h-5 text-[#0071e3]" />,
  },
];

export const HomeToolsGrid: React.FC<HomeToolsGridProps> = ({
  onLaunchTool,
  onNavigateToToolsHub,
}) => {
  return (
    <section id="home-tools-grid" className="py-16 md:py-24 apple-tool-layout text-[#1d1d1f] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Dedicated Subdomain Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>tools.evonixtec.com • Free Standalone Portal</span>
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight text-left">
              Free E-Commerce &amp; Export Calculators
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
              We host our 20+ free business calculators on a dedicated workstation hub. Free for online sellers, freelancers, and exporters. No sign-up required.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToToolsHub}
            className="w-auto py-3 px-6 text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 shrink-0 shadow-md cursor-pointer transition-all"
          >
            <span>Open All 20+ Free Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Tool Apple Liquid Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="apple-glass-box p-6 rounded-[28px] flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-all group text-left"
            >
              <div className="space-y-3.5 text-left">
                {/* Header row with Icon and Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[#1E1E1E] border border-black/[0.06]">
                    {tool.category}
                  </span>
                </div>

                <div className="text-left">
                  <h3 className="text-base font-bold text-[#1E1E1E] tracking-tight group-hover:text-[#0071e3] transition-colors text-left">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#0071e3] font-semibold block mt-0.5 text-left">
                    {tool.badge}
                  </span>
                </div>

                <p className="text-xs text-[#52525B] leading-[1.55] line-clamp-3 text-left">
                  {tool.description}
                </p>
              </div>

              {/* Bottom Launch Button: Single Primary Action */}
              <div className="pt-3 border-t border-black/[0.06] space-y-2.5 text-left">
                <div className="flex items-center justify-between text-[11px] text-[#52525B]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero Data Harvest</span>
                  </span>
                  <span className="font-mono text-[#1E1E1E] font-medium">
                    {tool.metric}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onLaunchTool(tool.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs shadow-blue-500/20 active:scale-[0.99]"
                >
                  <span>Launch Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Guarantee Strip */}
        <div className="apple-result-box p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center shrink-0 text-[#0071e3]">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-[#1E1E1E] text-left">
                Sub-Second In-Browser Execution
              </h4>
              <p className="text-xs text-[#52525B] mt-0.5 leading-[1.55] text-left">
                All algorithms run entirely client-side. No API wait times, no data leakage, and 100% privacy protected.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToToolsHub}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1E1E1E] font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>View Full Tools Catalog</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#52525B]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeToolsGrid;
