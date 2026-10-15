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
    id: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    category: 'Logistics & Export',
    badge: 'IATA & Maritime Standard',
    description: 'Calculate Cubic Meters (CBM), air courier volumetric weights (1:5000 / 1:6000), and 20ft / 40ft HQ container stuffing capacity.',
    metric: 'Air / Sea Multi-Carton Solver',
    icon: <Boxes className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    category: 'E-Commerce & Ads',
    badge: 'Pakistani & Global Courier',
    description: 'Model real-world Cash-on-Delivery (COD) cash flows, simulate RTO return freight losses, and solve target breakeven ROAS.',
    metric: 'Breakeven ROAS Matrix',
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'ebay-fee-calculator',
    name: 'eBay Fee & Profit Builder (Pro Suite)',
    category: 'Marketplace Trade',
    badge: 'Multi-Country Tariffs',
    description: 'Determine exact Final Value Fees (FVF), promoted listings, and currency conversion margins across US, UK, DE, and Pakistan.',
    metric: '10-Country Rolling Forex',
    icon: <Calculator className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'invoice',
    name: 'Global Micro-Invoice Generator',
    category: 'Business & Finance',
    badge: 'Zero Database Storage',
    description: 'Generate multi-currency electronic commercial and tax invoices with instant Code128 barcodes and crisp A4 PDF print export.',
    metric: '100+ Countries Tax Engine',
    icon: <FileText className="w-5 h-5 text-[#0071e3]" />,
  },
  {
    id: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    category: 'Workforce Planning',
    badge: 'Capital Savings Solver',
    description: 'Benchmark international software hiring costs. Compare USA/UK/Dubai engineer salaries against dedicated offshore squads in Sialkot.',
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
];

export const HomeToolsGrid: React.FC<HomeToolsGridProps> = ({
  onLaunchTool,
  onNavigateToToolsHub,
}) => {
  return (
    <section id="home-tools-grid" className="py-16 md:py-24 apple-tool-layout text-[#1d1d1f] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Apple-Style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="apple-badge flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apple Liquid Glass Suite • Online Web Utilities</span>
              </span>
            </div>
            
            <h2 className="apple-tool-title text-3xl sm:text-4xl lg:text-5xl">
              Enterprise Web Tools &amp; Calculators
            </h2>

            <p className="apple-tool-subtitle text-sm sm:text-base leading-relaxed">
              Engineered with our approved Apple-style liquid glass design system. Completely client-side, zero server latency, and built to empower exporters, e-commerce stores, and technical teams.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToToolsHub}
            className="apple-calculate-btn w-auto py-3 px-6 text-sm flex items-center gap-2 shrink-0 shadow-md"
          >
            <span>Explore All 12+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Tool Apple Liquid Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="apple-glass-box p-6 flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-3.5">
                {/* Header row with Icon and Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[#1d1d1f] border border-black/[0.06]">
                    {tool.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#0071e3] font-semibold block mt-0.5">
                    {tool.badge}
                  </span>
                </div>

                <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              {/* Bottom Launch Button */}
              <div className="pt-3 border-t border-black/[0.06] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#86868b]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero Data Harvest</span>
                  </span>
                  <span className="font-mono text-[#1d1d1f] font-medium">
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
        <div className="apple-result-box p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center shrink-0 text-[#0071e3]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1d1d1f]">
                Sub-Second In-Browser Execution
              </h4>
              <p className="text-xs text-[#86868b] mt-0.5">
                All algorithms run entirely client-side. No API wait times, no data leakage, and 100% privacy protected.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToToolsHub}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>View Full Tools Catalog</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#86868b]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeToolsGrid;
