import React, { useState, useEffect, useMemo } from 'react';
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
  Zap,
  Globe,
  ExternalLink,
  Smartphone,
  Bot,
  Cloud,
  Flame,
  Plus
} from 'lucide-react';
import { NavPageId } from '../types';
import { ToolAiCloudIntegrationModal } from './common/ToolAiCloudIntegrationModal';
import {
  getAllToolUsage,
  getToolUsageCount,
  incrementToolUsage,
  isToolMostPopular
} from '../lib/toolUsageTracker';

export interface WebToolDefinition {
  id: string;
  navTarget: NavPageId | string;
  name: string;
  urduName?: string;
  shortName: string;
  category: 'business-export' | 'ecommerce-growth' | 'diagnostics-lab' | 'international-compliance';
  categoryLabel: string;
  regionFocus?: 'UK/EU' | 'USA' | 'Global';
  description: string;
  highlights: string[];
  techSpec: string;
  icon: React.ReactNode;
  accentColor: string;
  isPopular?: boolean;
  isMobileCore?: boolean;
  mobileCoreOrder?: number;
}

export const TOOLS_COLLECTION: WebToolDefinition[] = [
  // 1. GLOBAL MICRO-INVOICE GENERATOR (Core Mobile Tool #1)
  {
    id: 'invoice',
    navTarget: 'invoice',
    name: 'Global Micro-Invoice Generator',
    urduName: 'آن لائن انوائس جنریٹر (موبائل کور #1)',
    shortName: 'Invoice Maker',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    regionFocus: 'Global',
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
    isMobileCore: true,
    mobileCoreOrder: 1,
  },

  // 2. E-COMMERCE MARGIN & COD SIMULATOR (Core Mobile Tool #2)
  {
    id: 'ecommerce-calculator',
    navTarget: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    urduName: 'ای کامرس مارجن اور سی او ڈی کیلکولیٹر (موبائل کور #2)',
    shortName: 'E-Com Margin Calc',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce & Ads',
    regionFocus: 'Global',
    description: 'Model real-world Pakistani and international e-commerce profitability by simulating courier Cash-on-Delivery (COD) fees, return-to-origin (RTO) loss rates, and ad spend ROAS margins.',
    highlights: [
      'Pre-configured courier tariffs (TCS, Leopards, Trax, PostEx, CallCourier)',
      'Detailed breakdown of dead freight & packing damage losses on returns',
      'Breakeven ROAS and target customer acquisition cost (CAC) output',
      'Printable profit & loss spreadsheet ledger',
    ],
    techSpec: 'Multi-Courier Tariff Engine · COD Fee Matrix · ROAS Breakeven Solver',
    icon: <SlidersHorizontal className="w-6 h-6 text-amber-600" />,
    accentColor: 'border-amber-200 hover:border-amber-400 group-hover:bg-amber-50/50',
    isMobileCore: true,
    mobileCoreOrder: 2,
  },

  // 3. B2B INDUSTRIAL CBM & FREIGHT ENGINE (Core Mobile Tool #3)
  {
    id: 'cbm-calculator',
    navTarget: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    urduName: 'کارگو سی بی ایم کیلکولیٹر (موبائل کور #3)',
    shortName: 'CBM Cargo Engine',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    regionFocus: 'Global',
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
    isMobileCore: true,
    mobileCoreOrder: 3,
  },

  // 4. DEDICATED DEVELOPER COST CALCULATOR (Core Mobile Tool #4)
  {
    id: 'developer-cost-calculator',
    navTarget: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    urduName: 'ڈویلپر کاسٹ کیلکولیٹر (موبائل کور #4)',
    shortName: 'Developer Rates',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    regionFocus: 'USA',
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
    isMobileCore: true,
    mobileCoreOrder: 4,
  },

  // 5. AI VISIBILITY & E-E-A-T CHECKER (Core Mobile Tool #5)
  {
    id: 'ai-visibility-checker',
    navTarget: 'ai-visibility-checker',
    name: 'AI Visibility & GEO Readiness Auditor',
    urduName: 'اے آئی سرچ وزیبلٹی چیکر (موبائل کور #5)',
    shortName: 'AI Visibility Audit',
    category: 'ecommerce-growth',
    categoryLabel: 'Growth & SEO',
    regionFocus: 'Global',
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
    isMobileCore: true,
    mobileCoreOrder: 5,
  },

  // 6. SPECIAL UK & EUROPE TOOL
  {
    id: 'uk-eu-vat-calculator',
    navTarget: 'uk-eu-vat-calculator',
    name: 'UK & EU VAT Reverse Charge & VAT MOSS Engine',
    urduName: 'یو کے و یورپین VAT ریورس چارج انجن',
    shortName: 'UK & EU VAT Engine',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe Compliance',
    regionFocus: 'UK/EU',
    description: 'Automate HMRC Section 55A and European Union Directive 2006/112/EC 0% reverse charge VAT exemptions, with VIES number formatting and statutory invoice declarations.',
    highlights: [
      'HMRC UK VAT Act 1994 statutory reverse charge declarations',
      'EU Article 196 reverse charge B2B compliance clauses for Germany, France, Italy',
      'Automatic 0% export VAT calculation with zero withholding tax',
      'Printable tax audit justification certificate',
    ],
    techSpec: 'HMRC & VIES Standard · Directive 2006/112/EC · Statutory Clause Generator',
    icon: <Globe className="w-6 h-6 text-emerald-600" />,
    accentColor: 'border-emerald-300 hover:border-emerald-500 group-hover:bg-emerald-50/50',
  },

  // 7. SPECIAL AMERICA (USA) TOOL
  {
    id: 'us-duty-nexus-estimator',
    navTarget: 'us-duty-nexus-estimator',
    name: 'US Customs Tariff (HTS) & Section 321 De Minimis Calculator',
    urduName: 'امریکی کسٹمز ڈیوٹی و سیکشن 321 چھوٹ کیلکولیٹر',
    shortName: 'US Duty & Nexus Calc',
    category: 'international-compliance',
    categoryLabel: 'North America Trade',
    regionFocus: 'USA',
    description: 'Calculate US Harmonized Tariff Schedule (HTS) customs duties, verify the $800 duty-free Section 321 entry eligibility, and estimate total landed costs for American buyers.',
    highlights: [
      '19 U.S.C. § 1321 ($800 per day) duty-free de minimis validator',
      'HTS code lookup for surgical instruments (0.0% duty) & sports equipment',
      'Calculates landed costs including international freight and port fees',
      'US corporate procurement quotation generator',
    ],
    techSpec: 'US CBP Section 321 · HTSUS Chapter 90 & 95 · Landed Cost Solver',
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    accentColor: 'border-blue-300 hover:border-blue-500 group-hover:bg-blue-50/50',
  },

  // 8. SPECIAL UK & EUROPE TOOL
  {
    id: 'ce-ukca-compliance-generator',
    navTarget: 'ce-ukca-compliance-generator',
    name: 'UKCA & CE Declaration of Conformity (DoC) Generator',
    urduName: 'سی ای مارک اور یو کے سی اے ڈیکلریشن جنریٹر',
    shortName: 'CE & UKCA Generator',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe Compliance',
    regionFocus: 'UK/EU',
    description: 'Generate audited technical Declaration of Conformity documents for CE Marking (EU MDR 2017/745 Class I, RoHS, EMC) and UKCA compliance demanded by British and European tenders.',
    highlights: [
      'ISO 13485:2016 and EN ISO 14971 harmonized standard templates',
      'Official dual UKCA & CE mark compliance declaration text',
      'Batch, lot, and technical file traceability certificates',
      'Printable ready-to-sign manufacturer executive certificate',
    ],
    techSpec: 'EU MDR 2017/745 · UK MDR 2002 · ISO 17050-1 Document Structure',
    icon: <Globe className="w-6 h-6 text-purple-600" />,
    accentColor: 'border-purple-300 hover:border-purple-500 group-hover:bg-purple-50/50',
  },

  // 9. EXPORT BARCODE LABEL STUDIO
  {
    id: 'export-barcode-studio',
    navTarget: 'export-barcode-studio',
    name: 'Export Barcode Label Studio',
    urduName: 'ایکسپورٹ بارکوڈ لیبل اسٹوڈیو',
    shortName: 'Barcode Studio',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    regionFocus: 'Global',
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
  },

  // 10. LIVE RMA BENCH REPAIR TRACKER
  {
    id: 'live-repair-tracker',
    navTarget: 'live-repair-tracker',
    name: 'Live RMA Bench Repair Tracker',
    urduName: 'لائیو ریپئر ٹریکر',
    shortName: 'Live RMA Tracker',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    regionFocus: 'Global',
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

  // 11. PRINTER DIAGNOSTICS
  {
    id: 'printer-diagnostics',
    navTarget: 'printer-diagnostics',
    name: 'Thermal Receipt Printer Diagnostic Engine',
    urduName: 'تھرمل پرنٹر ڈائیگنوسٹک انجن',
    shortName: 'Printer Diagnostics',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    regionFocus: 'Global',
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

  // 12. FACTORY NETWORK TESTER
  {
    id: 'factory-network-tester',
    navTarget: 'factory-network-tester',
    name: 'Factory ERP & Customs Latency Benchmark',
    urduName: 'فیکٹری نیٹ ورک بینچ مارک',
    shortName: 'Network Latency Test',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    regionFocus: 'Global',
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
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'popular' | 'mobile-core-5' | 'uk-eu' | 'usa' | 'business-export' | 'diagnostics-lab'
  >('all');
  const [activeModalToolId, setActiveModalToolId] = useState<string | null>(null);
  const [usageMap, setUsageMap] = useState<Record<string, number>>({});

  // Load and listen to localStorage usage counts
  useEffect(() => {
    setUsageMap(getAllToolUsage());

    const handleUpdate = () => {
      setUsageMap(getAllToolUsage());
    };

    window.addEventListener('evonix_tool_usage_updated', handleUpdate);
    return () => window.removeEventListener('evonix_tool_usage_updated', handleUpdate);
  }, []);

  const handleLaunchWithTrack = (target: NavPageId | string, toolId: string) => {
    incrementToolUsage(toolId);
    setUsageMap(getAllToolUsage());
    onLaunchTool(target);
  };

  const handleSimulateUse = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    incrementToolUsage(toolId);
    setUsageMap(getAllToolUsage());
  };

  const filteredTools = useMemo(() => {
    return TOOLS_COLLECTION.filter((tool) => {
      const toolUsage = usageMap[tool.id] || 0;
      let matchesCategory = true;

      if (selectedCategory === 'popular') {
        matchesCategory = toolUsage > 5;
      } else if (selectedCategory === 'mobile-core-5') {
        matchesCategory = !!tool.isMobileCore;
      } else if (selectedCategory === 'uk-eu') {
        matchesCategory = tool.regionFocus === 'UK/EU';
      } else if (selectedCategory === 'usa') {
        matchesCategory = tool.regionFocus === 'USA';
      } else if (selectedCategory === 'business-export') {
        matchesCategory = tool.category === 'business-export' || tool.category === 'international-compliance';
      } else if (selectedCategory === 'diagnostics-lab') {
        matchesCategory = tool.category === 'diagnostics-lab';
      }

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
  }, [searchQuery, selectedCategory, usageMap]);

  return (
    <>
      <div className="w-full bg-slate-50 min-h-screen py-8 sm:py-14 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 1. Header */}
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
              <span className="text-emerald-700 font-medium">12 Workstations</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 via-amber-100 to-emerald-100 border border-slate-200 text-xs font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>UK, US, Europe &amp; Global Trade Engines</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Online Web Tools &amp; International Trade Workstations
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Zero-database business utilities, export shipping barcode engines, freight CBM calculators, and UK/US/EU trade compliance tools built by <strong>evonix</strong> in Kolti Behram, Sialkot. Every tool runs 100% locally in your browser with automatic local usage tracking and one-click ChatGPT &amp; Cloud integration.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Engine</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Live localStorage Usage Tracking</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-purple-700 font-medium">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>OpenAPI &amp; Gemini Declarations</span>
              </span>
            </div>
          </div>

          {/* 2. Interactive Filter Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. VAT, Section 321, invoice, CBM)..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Tools ({TOOLS_COLLECTION.length})
                </button>

                {/* MOST POPULAR FILTER (Used > 5 times) */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('popular')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedCategory === 'popular'
                      ? 'bg-amber-600 text-white shadow-xs font-extrabold ring-1 ring-amber-400'
                      : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>🔥 Most Popular (&gt;5 uses)</span>
                </button>

                {/* THE 5 CORE MOBILE TOOLS */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('mobile-core-5')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === 'mobile-core-5'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>📱 Mobile Core 5</span>
                </button>

                {/* UK & EU TOOLS */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('uk-eu')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedCategory === 'uk-eu'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>🇬🇧 / 🇪🇺 UK &amp; Europe</span>
                </button>

                {/* USA TOOLS */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('usa')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedCategory === 'usa'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>🇺🇸 America (USA)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategory('business-export')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'business-export'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Export &amp; B2B
                </button>
              </div>
            </div>
          </div>

          {/* 3. Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const count = usageMap[tool.id] || 0;
              const isPopular = count > 5;

              return (
                <div
                  key={tool.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group overflow-hidden ${tool.accentColor}`}
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                        {tool.icon}
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-1 flex-wrap">
                          {/* DYNAMIC MOST POPULAR BADGE */}
                          {isPopular && (
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-xs animate-pulse">
                              <Flame className="w-3 h-3 fill-white" />
                              <span>Most Popular</span>
                            </span>
                          )}

                          {tool.isMobileCore && (
                            <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Mobile #{tool.mobileCoreOrder}
                            </span>
                          )}

                          {tool.regionFocus && (
                            <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {tool.regionFocus}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-[10px] text-slate-500 font-mono">
                            Used {count} times
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleSimulateUse(e, tool.id)}
                            title="Log usage (+1)"
                            className="p-0.5 rounded bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h2>
                      {tool.urduName && (
                        <span className="text-xs text-slate-500 block mt-0.5 font-medium">
                          {tool.urduName}
                        </span>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {tool.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Capabilities &amp; Standard
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

                  {/* Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalToolId(tool.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      title="Open ChatGPT & Cloud settings"
                    >
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                      <span>AI / Cloud</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaunchWithTrack(tool.navTarget, tool.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-2xs group-hover:shadow-xs cursor-pointer ml-auto"
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy & Standard Assurance */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              Global Compliance Standard · Kolti Behram, Sialkot, Pakistan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Built for UK, US, European, and Global Cross-Border Enterprises
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
              From HMRC 0% VAT Reverse Charge and US Section 321 de minimis tariff calculations to UKCA / CE Declarations of Conformity and zero-database commercial invoices, every tool runs completely offline on your device with localStorage telemetry that never leaks commercial secrets.
            </p>
          </div>
        </div>
      </div>

      {activeModalToolId && (
        <ToolAiCloudIntegrationModal
          toolId={activeModalToolId}
          isOpen={!!activeModalToolId}
          onClose={() => setActiveModalToolId(null)}
        />
      )}
    </>
  );
};
