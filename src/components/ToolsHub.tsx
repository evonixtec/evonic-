import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Sparkles,
  FileText,
  Barcode,
  Boxes,
  SlidersHorizontal,
  Calculator,
  Search,
  Clock,
  Printer,
  Wifi,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Globe,
  ExternalLink,
  Layers,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { NavPageId } from './Navbar';

export interface WebToolDefinition {
  id: string;
  navTarget: NavPageId | string;
  name: string;
  urduName?: string;
  shortName: string;
  category: 'business-export' | 'ecommerce-growth' | 'diagnostics-lab';
  categoryLabel: string;
  description: string;
  highlights: string[];
  techSpec: string;
  icon: React.ReactNode;
  accentColor: string;
  isPopular?: boolean;
}

export const TOOLS_COLLECTION: WebToolDefinition[] = [
  {
    id: 'invoice',
    navTarget: 'invoice',
    name: 'Global Micro-Invoice Generator',
    urduName: 'آن لائن انوائس جنریٹر',
    shortName: 'Invoice Maker',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Generate multi-currency electronic commercial and tax invoices with automatic Code128 barcodes, GST/VAT calculations for 100+ countries, and crisp A4 PDF export.',
    highlights: [
      '100+ countries tax engine with custom currency symbols',
      'Instant Code128 thermal barcode generator',
      'A4 formatted PDF export with zero server data storage',
      'Persistent local memory keeps your draft safe across reloads',
    ],
    techSpec: 'Zero-Database · ISO 9001 Schema · Client-Side A4 Print Engine',
    icon: <FileText className="w-6 h-6 text-emerald-600" />,
    accentColor: 'border-emerald-200 hover:border-emerald-400 group-hover:bg-emerald-50/50',
    isPopular: true,
  },
  {
    id: 'export-barcode-studio',
    navTarget: 'export-barcode-studio',
    name: 'Export Barcode Label Studio',
    urduName: 'ایکسپورٹ بارکوڈ لیبل اسٹوڈیو',
    shortName: 'Barcode Studio',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Compliant thermal shipping carton label maker for surgical instruments, sportswear, and leather exports. Supports GS1-128, Code 128, and outer shipping carton standards.',
    highlights: [
      'Pre-configured templates for surgical & sports export cartons',
      'Standard 4" × 6" (100mm × 150mm) thermal label layouts',
      'Compliant barcode check digit validation',
      'Instant direct printing to Zebra, TSC, and Xprinter thermal printers',
    ],
    techSpec: 'GS1-128 & Code 128 · 203/300 DPI Vector SVG · 4×6 Direct Thermal',
    icon: <Barcode className="w-6 h-6 text-red-600" />,
    accentColor: 'border-red-200 hover:border-red-400 group-hover:bg-red-50/50',
    isPopular: true,
  },
  {
    id: 'cbm-calculator',
    navTarget: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    urduName: 'کارگو سی بی ایم کیلکولیٹر',
    shortName: 'CBM Cargo Engine',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Precision Cubic Meters (CBM) cargo space allocator and volumetric shipping weight engine. Evaluates 20ft, 40ft, and 40ft High Cube container packing limits.',
    highlights: [
      'Single & multi-carton volumetric dimension analysis',
      'Air courier (DHL/FedEx / 5000) vs Air cargo (/ 6000) divisor logic',
      'Visual container packing utilization percentage bars',
      'Copyable logistics consignment summary for freight forwarders',
    ],
    techSpec: 'Cubic Meters (m³) · Air & Sea Metric · Standard Container Limit Engine',
    icon: <Boxes className="w-6 h-6 text-cyan-600" />,
    accentColor: 'border-cyan-200 hover:border-cyan-400 group-hover:bg-cyan-50/50',
    isPopular: true,
  },
  {
    id: 'ecommerce-calculator',
    navTarget: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    urduName: 'ای کامرس مارجن اور سی او ڈی کیلکولیٹر',
    shortName: 'E-Com Margin Calc',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce & Ads',
    description: 'Model real-world Pakistani e-commerce profitability by simulating courier Cash-on-Delivery (COD) fees, return-to-origin (RTO) loss rates, and ad spend ROAS margins.',
    highlights: [
      'Pre-configured courier tariffs (TCS, Leopards, Trax, PostEx, CallCourier)',
      'Detailed breakdown of dead freight & packing damage losses on returns',
      'Breakeven ROAS and target customer acquisition cost (CAC) output',
      'Printable profit & loss spreadsheet ledger',
    ],
    techSpec: 'Multi-Courier Tariff Engine · COD Fee Matrix · ROAS Breakeven Solver',
    icon: <SlidersHorizontal className="w-6 h-6 text-amber-600" />,
    accentColor: 'border-amber-200 hover:border-amber-400 group-hover:bg-amber-50/50',
    isPopular: true,
  },
  {
    id: 'developer-cost-calculator',
    navTarget: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    urduName: 'ڈویلپر کاسٹ کیلکولیٹر',
    shortName: 'Developer Rates',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Benchmark international software development hiring expenses. Compare USA/UK/Dubai in-house engineer salaries against dedicated offshore teams in Sialkot.',
    highlights: [
      'Junior, mid-level, and senior software engineering hourly tiers',
      'Calculates net annual capital savings with full budget breakdown',
      'Customizable team headcounts from 1 to 20+ dedicated engineers',
      'AEO Answer Engine formatted comparison for corporate CTOs',
    ],
    techSpec: 'Global Rate Comparison · 160h/Month Standard · Capital Savings Analysis',
    icon: <Calculator className="w-6 h-6 text-blue-600" />,
    accentColor: 'border-blue-200 hover:border-blue-400 group-hover:bg-blue-50/50',
  },
  {
    id: 'ai-visibility-checker',
    navTarget: 'ai-visibility-checker',
    name: 'AI Visibility & GEO Readiness Auditor',
    urduName: 'اے آئی سرچ وزیبلٹی چیکر',
    shortName: 'AI Visibility Audit',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce & Ads',
    description: 'Client-side auditing workbench to evaluate how easily AI search engines (Google AI Overviews, ChatGPT Search, Claude, and Perplexity) can parse your business schema.',
    highlights: [
      'Evaluates JSON-LD schema depth, author authority, and factual clarity',
      'Provides practical Generative Engine Optimization (GEO) recommendations',
      'Checks local physical address entity markers and trust indicators',
      'Instant checklist score with exportable audit summary',
    ],
    techSpec: 'GEO Readiness Score · Entity Graph Analyzer · Zero External Tracking',
    icon: <Search className="w-6 h-6 text-purple-600" />,
    accentColor: 'border-purple-200 hover:border-purple-400 group-hover:bg-purple-50/50',
  },
  {
    id: 'live-repair-tracker',
    navTarget: 'live-repair-tracker',
    name: 'Live RMA Bench Repair Tracker',
    urduName: 'لائیو ریپئر ٹریکر',
    shortName: 'Live RMA Tracker',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Real-time diagnostic bench ticket lookup. Review live hardware inspection stages, standby current measurements, component replacements, and 90-day warranty certificates.',
    highlights: [
      'Track by Sialkot RMA Ticket Number or contact phone',
      'Inspect technician bench notes with micro-soldering thermal logs',
      'Verify replaced original power ICs and Mosfets',
      'Download formal bench repair service completion voucher',
    ],
    techSpec: 'RMA Tracking Engine · Micro-Soldering Log · Warranty Verification',
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
    accentColor: 'border-emerald-200 hover:border-emerald-400 group-hover:bg-emerald-50/50',
  },
  {
    id: 'printer-diagnostics',
    navTarget: 'printer-diagnostics',
    name: 'Thermal Receipt Printer Diagnostic Engine',
    urduName: 'تھرمل پرنٹر ڈائیگنوسٹک انجن',
    shortName: 'Printer Diagnostics',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Interactive step-by-step troubleshooter for 80mm ESC/POS thermal receipt printers, USB/LAN connectivity dropouts, cutter lockups, and blurry barcode prints.',
    highlights: [
      'Interactive symptom-based diagnostic decision tree',
      'ESC/POS hex command verification and baud rate matching',
      'Cutter mechanism unjamming and thermal printhead cleaning guides',
      'Driver conflict resolution for Windows 10/11 POS systems',
    ],
    techSpec: 'ESC/POS Protocol · Baud 9600/115200 · 80mm/58mm Hardware Matrix',
    icon: <Printer className="w-6 h-6 text-orange-600" />,
    accentColor: 'border-orange-200 hover:border-orange-400 group-hover:bg-orange-50/50',
  },
  {
    id: 'factory-network-tester',
    navTarget: 'factory-network-tester',
    name: 'Factory ERP & Customs Latency Benchmark',
    urduName: 'فیکٹری نیٹ ورک بینچ مارک',
    shortName: 'Network Latency Test',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Live premise latency benchmark for Sialkot export manufacturing factories. Measures ping jitter, SQL database sync responsiveness, and WeBOC customs gateway ping stability.',
    highlights: [
      'Tests latency bottlenecks between factory floor and central cloud',
      'Simulates dual-WAN failover switchover response times',
      'WeBOC customs portal response time simulator',
      'Packet jitter diagnosis for industrial IP CCTV cameras',
    ],
    techSpec: 'Client-Side Ping Engine · Millisecond Precision · WAN Jitter Analysis',
    icon: <Wifi className="w-6 h-6 text-teal-600" />,
    accentColor: 'border-teal-200 hover:border-teal-400 group-hover:bg-teal-50/50',
  },
];

interface ToolsHubProps {
  onLaunchTool: (target: NavPageId | string) => void;
  onNavigateHome: () => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onLaunchTool, onNavigateHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business-export' | 'ecommerce-growth' | 'diagnostics-lab'>('all');

  const filteredTools = useMemo(() => {
    return TOOLS_COLLECTION.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        (tool.urduName && tool.urduName.includes(q)) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q) ||
        tool.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 sm:py-14 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ========================================================
            1. HERO & WORKSPACE HEADER
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <button
              onClick={onNavigateHome}
              className="hover:text-red-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-800">Online Web Tools Portfolio</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">9 Live Tools</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Online Web Tools &amp; Engineering Calculators
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A comprehensive suite of zero-database business calculators, export shipping barcode generators, freight CBM engines, and hardware diagnostic bench utilities built by <strong>evonix</strong>. Every tool runs 100% locally inside your browser with complete privacy and zero data tracking.
          </p>

          {/* Quick Engine Trust Guarantee */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side Engine</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-blue-700 font-medium">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Zero Database Retention</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Instant Local Processing</span>
            </span>
          </div>
        </div>

        {/* ========================================================
            2. SEARCH & INTERACTIVE CATEGORY FILTER BAR
           ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. invoice, barcode, CBM, COD, latency)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Buttons (Functional Buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Tools ({TOOLS_COLLECTION.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('business-export')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'business-export'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Business &amp; Export (4)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('ecommerce-growth')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'ecommerce-growth'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                E-Commerce &amp; Growth (2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('diagnostics-lab')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'diagnostics-lab'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Hardware Diagnostics (3)
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. INTERACTIVE TOOLS GRID
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group overflow-hidden ${tool.accentColor}`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header: Icon, Category & Launch Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    {tool.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {tool.categoryLabel}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono flex items-center justify-end gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready</span>
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {tool.name}
                  </h2>
                  {tool.urduName && (
                    <span className="text-xs text-slate-400 block mt-0.5 font-medium">
                      {tool.urduName}
                    </span>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {tool.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {tool.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[170px]" title={tool.techSpec}>
                  {tool.techSpec}
                </span>

                <button
                  type="button"
                  onClick={() => onLaunchTool(tool.navTarget)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-2xs group-hover:shadow-xs cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching tools found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find a tool matching &ldquo;{searchQuery}&rdquo;. Try another keyword like invoice, barcode, CBM, or developer.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================
            4. TRUST & ARCHITECTURAL PRIVACY ASSURANCE
           ======================================================== */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              Architectural Standard
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why Every evonix Tool Is 100% Client-Side
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Most online invoice, barcode, and freight calculators silently upload your confidential pricing, client names, and shipping manifests to remote databases. At <strong>evonix</strong>, we engineer all business utilities to run entirely within your local web browser sandbox using modern WebAssembly, Canvas, and LocalStorage APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block">Total Data Privacy</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your packing lists, invoice line items, and profit margins never touch our servers or any third-party analytics.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-xs font-bold text-blue-400 block">Zero Latency Computation</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every calculation updates on-the-fly as you type. Zero spinners, zero loading bars, zero server timeouts.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 block">Load-Shedding Resilient</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cached via Service Workers in our Progressive Web App (PWA). Continue calculating even when factory internet drops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
