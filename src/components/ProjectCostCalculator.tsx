import React, { useState } from 'react';
import {
  Calculator,
  Globe,
  Monitor,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Clock,
  DollarSign,
  Award,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Layers,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface BusinessSector {
  id: string;
  name: string;
  commonNeed: string;
}

const SECTORS: BusinessSector[] = [
  { id: 'surgical', name: 'Surgical & Dental Instruments Exporter', commonNeed: 'CE/FDA compliant catalog, batch tracking, RFQ quoting' },
  { id: 'leather', name: 'Leather Garments & Motorbike Apparel', commonNeed: '3D suit configurator, wholesale tiered pricing, multi-language' },
  { id: 'sports', name: 'Sports Goods & Martial Arts Wear', commonNeed: 'Teamwear roster builder, vector proof approvals, Stripe payments' },
  { id: 'retail', name: 'Retail Apparel, Shoes & Superstore', commonNeed: 'Fast touch POS, 80mm thermal receipts, offline billing sync' },
  { id: 'corporate', name: 'Corporate & Services Consultancy', commonNeed: 'Executive portfolio, client consultation portal, CRM leads' },
];

interface ProjectTier {
  id: string;
  title: string;
  basePkr: number;
  baseAed: number;
  days: string;
  description: string;
  idealFor: string;
  includedModules: string[];
}

const TIERS: ProjectTier[] = [
  {
    id: 'export-catalog',
    title: 'Professional B2B Export Website',
    basePkr: 75000,
    baseAed: 1000,
    days: '7 - 10 Days',
    description: 'High-speed Next.js static catalog designed specifically for European & US buyers with RFQ cart and WhatsApp quoting.',
    idealFor: 'Export manufacturers in Daska Road and Rangpura looking for direct foreign buyer inquiries.',
    includedModules: [
      'Next.js 14 Sub-Second Page Speed',
      'Interactive Product Catalog with RFQ Cart',
      'WhatsApp & Email Instant Quote Alerts',
      'Advanced Sialkot & Global Technical SEO',
      'Mobile-First Responsive Layout',
      '1 Year High-Speed NVMe Cloud Hosting Included',
    ],
  },
  {
    id: 'retail-pos',
    title: 'Offline-First Retail POS Billing System',
    basePkr: 65000,
    baseAed: 850,
    days: '5 - 7 Days',
    description: 'Zero-latency touch billing system with 80mm thermal receipt printing, barcode scanning, and multi-counter cloud sync.',
    idealFor: 'Garment shops, bakeries, supermarkets, and hardware stores across Sialkot bazars.',
    includedModules: [
      'Zero-Latency Offline SQLite Billing Engine',
      '80mm / 58mm Thermal Printer Auto-Cut Drivers',
      '2D Handheld Barcode Scanner Integration',
      'Multi-Counter Cloud Inventory Sync',
      'Profit & Loss Financial Reports',
      'Daily WhatsApp Sales Summary to Owner',
    ],
  },
  {
    id: 'ecommerce-global',
    title: 'Global E-Commerce Store with Multi-Currency',
    basePkr: 120000,
    baseAed: 1600,
    days: '12 - 16 Days',
    description: 'Complete online store with international credit card processing, DHL/FedEx shipping rates, and automated invoices.',
    idealFor: 'Brands selling direct-to-consumer in the UK, USA, UAE, and domestic Pakistani markets.',
    includedModules: [
      'Stripe, Payoneer & Local Bank Gateway Setup',
      'Multi-Currency Auto-Currency Converter (USD, EUR, AED, PKR)',
      'Automated PDF Commercial Invoice & Packing Slips',
      'Real-Time DHL / TCS Shipping Rate Calculator',
      'Customer Wholesale Portal with Tiered Discounts',
      'Automated Inventory Low-Stock Warnings',
    ],
  },
  {
    id: 'factory-erp',
    title: 'Custom Industrial ERP & Production Tracking',
    basePkr: 195000,
    baseAed: 2600,
    days: '20 - 30 Days',
    description: 'Tailored manufacturing software tracking raw steel/leather weight, subcontractor gatepasses, worker pieces, and QA clearance.',
    idealFor: 'Mid-to-large export factories on Daska Road, Small Industrial Estate, and Ugoki.',
    includedModules: [
      'Raw Material Heat & Batch Lot QR Code Tracking',
      'Outsourced Subcontractor Gatepass Weight Audit',
      'Worker Piece-Rate Payroll Automation',
      'CE / ISO Audit Compliance Technical Logs',
      'Multi-Warehouse Inventory Management',
      'Owner Executive Mobile KPI App',
    ],
  },
  {
    id: 'dedicated-developer',
    title: 'Dedicated Remote Software Engineer (Staff Augmentation)',
    basePkr: 110000,
    baseAed: 1450,
    days: 'Starts in 48h',
    description: 'Hire pre-vetted full-time senior/mid software engineers in Sialkot at $15 - $22/hr vs $80/hr in USA. Save over 72% annually with NDA and full IP ownership.',
    idealFor: 'Tech startups, software houses, and overseas businesses in USA, UK, UAE looking for dedicated engineers.',
    includedModules: [
      'Senior / Mid React, Node, Python, Mobile Engineers',
      '$15 - $22/hr vs $80/hr USA Standard (72% Savings)',
      'Strict NDA & 100% Client Code Ownership',
      'Daily Standups, Slack & Time-Zone Aligned',
      'Dual-Monitor Workstation & 100% Power Backup',
      'Includes Free Replacement & Zero Recruiter Fees',
    ],
  },
];

type DevTier = 'junior' | 'mid' | 'senior';

interface ProjectCostCalculatorProps {
  onOpenQuote?: (projectDetails?: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const ProjectCostCalculator: React.FC<ProjectCostCalculatorProps> = ({
  onOpenQuote,
  onNavigatePage,
}) => {
  // Mode: Fixed-scope Web/POS projects OR Dedicated Developer Cost Calculator
  const [activeTab, setActiveTab] = useState<'projects' | 'developers'>('projects');

  // 1. Projects State
  const [selectedSectorId, setSelectedSectorId] = useState<string>(SECTORS[0].id);
  const [selectedTierId, setSelectedTierId] = useState<string>(TIERS[0].id);
  const [addMultilingual, setAddMultilingual] = useState<boolean>(false);
  const [addConfigurator, setAddConfigurator] = useState<boolean>(false);

  // 2. Developer Cost Calculator State
  const [devTier, setDevTier] = useState<DevTier>('senior');
  const [devTeamSize, setDevTeamSize] = useState<number>(1);
  const [devMonths, setDevMonths] = useState<number>(12);
  const [devTechStack, setDevTechStack] = useState<string>('Full-Stack (React & Node.js)');
  const [devOnshoreRate, setDevOnshoreRate] = useState<number>(80); // USA/UK $80/hr
  const [devOffshoreRate, setDevOffshoreRate] = useState<number>(22); // evonix $22/hr

  const handleDevTierChange = (tier: DevTier) => {
    setDevTier(tier);
    if (tier === 'junior') {
      setDevOnshoreRate(50);
      setDevOffshoreRate(15);
    } else if (tier === 'mid') {
      setDevOnshoreRate(65);
      setDevOffshoreRate(18);
    } else {
      setDevOnshoreRate(80);
      setDevOffshoreRate(22);
    }
  };

  // Compute Developer Cost Metrics
  const devHoursPerMonth = 160;
  const safeDevTeam = Math.max(1, devTeamSize || 1);
  const safeDevMonths = Math.max(1, devMonths || 1);
  const devTotalHours = safeDevTeam * devHoursPerMonth * safeDevMonths;
  const devOnshoreTotal = devTotalHours * (devOnshoreRate || 0);
  const devOffshoreTotal = devTotalHours * (devOffshoreRate || 0);
  const devNetSavings = devOnshoreTotal - devOffshoreTotal;
  const devSavingsPercentage = devOnshoreTotal > 0 ? (devNetSavings / devOnshoreTotal) * 100 : 0;
  const devNetSavingsPkr = devNetSavings * 278; // Approx PKR conversion

  // Projects calculations
  const currentSector = SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[0];
  const currentTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[0];

  let totalPkr = currentTier.basePkr;
  let totalAed = currentTier.baseAed;

  if (addMultilingual) {
    totalPkr += 25000;
    totalAed += 350;
  }
  if (addConfigurator) {
    totalPkr += 45000;
    totalAed += 600;
  }

  const handleRequestProjectQuote = () => {
    if (onOpenQuote) {
      onOpenQuote(
        `Project Quote: ${currentTier.title} for ${currentSector.name}. Estimated: Rs. ${totalPkr.toLocaleString()} (${totalAed} AED).`
      );
    }
  };

  const handleRequestDevQuote = () => {
    const quoteString = `Dedicated Developer Quote: ${devTeamSize}x ${devTier.toUpperCase()} (${devTechStack}) for ${devMonths} Months. Rate: $${devOffshoreRate}/hr vs USA $${devOnshoreRate}/hr. Net Savings: $${devNetSavings.toLocaleString()} (~${devSavingsPercentage.toFixed(0)}%).`;
    if (onOpenQuote) {
      onOpenQuote(quoteString);
    } else {
      window.location.href = `/contact?service=${encodeURIComponent(quoteString)}`;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello EVONIX, I used your project calculator. Sector: ${currentSector.name}. Package: ${currentTier.title}. Add-ons: ${
      addMultilingual ? 'Multilingual (DE/FR), ' : ''
    }${addConfigurator ? '3D Configurator' : 'Standard'}. Estimated: Rs. ${totalPkr.toLocaleString()} (approx. ${totalAed} AED). Please send formal proposal.`
  );

  return (
    <section id="project-calculator" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-red-600" />
            <span>Instant Scope & Quotation Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Web, Software & Developer Cost Quotation Estimator
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Calculate instant estimated investment, timelines, and deliverables. Compare turnkey web & POS software projects, or calculate your exact savings hiring dedicated remote developers vs USA rates.
          </p>

          {/* DUAL CALCULATOR TABS */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-red-600" />
              <span>Web, POS & ERP Packages</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('developers')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>Dedicated Developer Cost Calculator</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'developers' ? 'bg-blue-700 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Save 72%
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: WEB, POS & INDUSTRIAL SOFTWARE QUOTATIONS
           ======================================================== */}
        {activeTab === 'projects' && (
          <div>
            {/* Quick Banner Linking to Developer Calculator */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Looking to hire dedicated full-time remote developers instead of fixed-scope?
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Senior full-stack engineers in Sialkot at $22/hr vs $80/hr USA. Save $110,000+ per year.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('developers')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <span>Switch to Developer Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Scope & Feature Selectors */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Industry Selection */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step 1: Select Your Business Sector in Sialkot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SECTORS.map((sec) => {
                      const isSelected = selectedSectorId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setSelectedSectorId(sec.id)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-xs font-bold block">{sec.name}</span>
                          <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                            {sec.commonNeed}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Project Architecture / Package */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step 2: Choose Project Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TIERS.map((tier) => {
                      const isSelected = selectedTierId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => {
                            setSelectedTierId(tier.id);
                            if (tier.id === 'dedicated-developer') {
                              setActiveTab('developers');
                            }
                          }}
                          className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'}`}>
                                {tier.days}
                              </span>
                              {tier.id === 'dedicated-developer' && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                  Save 72%
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold mt-1.5 line-clamp-1">{tier.title}</h4>
                            <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {tier.description}
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-current/15 flex items-baseline justify-between text-xs">
                            <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>Starting from</span>
                            <span className={`font-black ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                              Rs. {tier.basePkr.toLocaleString()}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Optional Enterprise Add-ons */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step 3: Optional High-Value Modules
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={addMultilingual}
                          onChange={(e) => setAddMultilingual(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            European Multilingual Subpath Architecture (German & French)
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            Target OEM buyers in Frankfurt, Munich, and Lyon with hreflang SEO tags.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-red-600 whitespace-nowrap pl-2">
                        +Rs. 25,000
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={addConfigurator}
                          onChange={(e) => setAddConfigurator(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Interactive 3D Product Customizer (WebGL / Three.js)
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            Allow foreign buyers to customize uniforms, gloves, or instruments in real-time.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-red-600 whitespace-nowrap pl-2">
                        +Rs. 45,000
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Quotation Summary Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                  {/* Card Header */}
                  <div className="space-y-1 pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      Official Estimation Summary
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                      {currentTier.title}
                    </h3>
                    <span className="text-xs text-slate-500 block font-medium">
                      Configured for {currentSector.name}
                    </span>
                  </div>

                  {/* Price Display */}
                  <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-600 font-semibold">Total Investment (PKR):</span>
                      <span className="text-2xl sm:text-3xl font-black text-red-700">
                        Rs. {totalPkr.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-xs text-slate-600 pt-1.5 border-t border-red-200/60">
                      <span>Dubai / UAE Equivalent:</span>
                      <span className="font-bold text-emerald-700">~{totalAed} AED</span>
                    </div>
                  </div>

                  {/* Delivery & Architecture Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Timeline</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{currentTier.days}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Standard</span>
                      <span className="font-bold text-slate-900 block mt-0.5">Dubai Enterprise</span>
                    </div>
                  </div>

                  {/* Included Modules Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Included Features & Modules:
                    </span>
                    <div className="space-y-2">
                      {currentTier.includedModules.map((mod, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{mod}</span>
                        </div>
                      ))}
                      {addMultilingual && (
                        <div className="flex items-start gap-2.5 text-xs text-amber-800 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Multilingual (DE/FR/ES) with hreflang tags</span>
                        </div>
                      )}
                      {addConfigurator && (
                        <div className="flex items-start gap-2.5 text-xs text-amber-800 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Interactive 3D WebGL Uniform / Product Configurator</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={handleRequestProjectQuote}
                      className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Lock In Estimate & Request Proposal</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Instant WhatsApp Discussion With Senior Engineer</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    No hidden setup fees. Estimates include 1-year warranty and code deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: INTEGRATED DEDICATED DEVELOPER COST CALCULATOR
           ======================================================== */}
        {activeTab === 'developers' && (
          <div className="space-y-8">
            {/* Quick Answer Banner */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-emerald-50 border border-blue-200 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-extrabold text-blue-900 block text-sm sm:text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  Instant Benchmark: $22/hr Sialkot vs $80/hr USA Standard
                </span>
                <p className="text-slate-600 text-xs">
                  For <strong>{devTeamSize} {devTier.toUpperCase()} Developer</strong> over <strong>{devMonths} Months</strong> ({devTotalHours.toLocaleString()} billable hours):
                  You invest <strong>${devOffshoreTotal.toLocaleString()}</strong> vs <strong>${devOnshoreTotal.toLocaleString()}</strong> in the USA.
                  You retain <strong className="text-emerald-700">${devNetSavings.toLocaleString()} (~Rs. {Math.round(devNetSavingsPkr).toLocaleString()})</strong> at <strong>{devSavingsPercentage.toFixed(0)}% net savings</strong>.
                </p>
              </div>

              {onNavigatePage && (
                <button
                  type="button"
                  onClick={() => onNavigatePage('developer-cost-calculator')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Open Full Dedicated Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: CONTROLS (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Resource Configuration</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Live Client-Side
                  </span>
                </div>

                {/* Tier Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Engineering Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['junior', 'mid', 'senior'] as DevTier[]).map((tier) => {
                      const isSelected = devTier === tier;
                      const label = tier === 'junior' ? 'Junior' : tier === 'mid' ? 'Mid-Level' : 'Senior';
                      const rate = tier === 'junior' ? '$15/hr' : tier === 'mid' ? '$18/hr' : '$22/hr';
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => handleDevTierChange(tier)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-xs font-bold block">{label}</span>
                          <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                            {rate}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Headcount & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Headcount
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={devTeamSize}
                      onChange={(e) => setDevTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Engineers</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Duration
                    </label>
                    <select
                      value={devMonths}
                      onChange={(e) => setDevMonths(parseInt(e.target.value))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value={1}>1 Month (Trial)</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months (1 Year)</option>
                      <option value={24}>24 Months</option>
                    </select>
                    <span className="text-[10px] text-slate-400 mt-1 block">160 hrs / month</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Primary Tech Stack
                  </label>
                  <select
                    value={devTechStack}
                    onChange={(e) => setDevTechStack(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Full-Stack (React & Node.js)">Full-Stack (React, TypeScript & Node.js)</option>
                    <option value="Next.js & Frontend Architecture">Next.js, Tailwind CSS & Frontend Web</option>
                    <option value="Python & AI Solutions">Python, FastAPI & AI / LLM Integrations</option>
                    <option value="Mobile App (React Native / Flutter)">Mobile App (React Native / Flutter)</option>
                    <option value="PHP / Laravel & E-Commerce">PHP / Laravel & Enterprise E-Commerce</option>
                    <option value="DevOps & Cloud Infrastructure">DevOps, AWS, Docker & Cloud Architecture</option>
                  </select>
                </div>

                {/* Editable Rates Benchmark */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Benchmark Rates ($/hr)</span>
                    <span className="text-[10px] text-slate-400">Custom Editable</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-red-600 block">USA / UK In-House</span>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-slate-400 mr-1">$</span>
                        <input
                          type="number"
                          value={devOnshoreRate}
                          onChange={(e) => setDevOnshoreRate(Math.max(1, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white px-1.5 py-0.5 rounded border border-slate-300 text-xs font-bold text-slate-900"
                        />
                        <span className="text-[10px] text-slate-400 ml-1">/hr</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-emerald-600 block">evonix Global</span>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-slate-400 mr-1">$</span>
                        <input
                          type="number"
                          value={devOffshoreRate}
                          onChange={(e) => setDevOffshoreRate(Math.max(1, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white px-1.5 py-0.5 rounded border border-slate-300 text-xs font-bold text-slate-900"
                        />
                        <span className="text-[10px] text-slate-400 ml-1">/hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: LIVE ESTIMATE REPORT (7 Cols) */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                        Live Quotation & Efficiency Report
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {devTeamSize} {devTier.toUpperCase()} Engineer • {devMonths} Months
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {devTechStack} • {devTotalHours.toLocaleString()} Total Billable Hours
                      </p>
                    </div>

                    <div className="text-left sm:text-right bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl self-start sm:self-auto">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Net Savings
                      </span>
                      <span className="text-2xl font-black text-emerald-600">
                        {devSavingsPercentage.toFixed(0)}% Off
                      </span>
                    </div>
                  </div>

                  {/* Comparison Side-by-Side Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100">
                      <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                        USA / UK In-House Outlay
                      </span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        ${devOnshoreTotal.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        At ${devOnshoreRate}/hr standard salary & overhead
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                        evonix Global Delivery
                      </span>
                      <div className="text-2xl font-black text-emerald-900 mt-1">
                        ${devOffshoreTotal.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-emerald-600 block mt-0.5">
                        At ${devOffshoreRate}/hr all-inclusive managed rate
                      </span>
                    </div>
                  </div>

                  {/* Net Retained Capital Ribbon */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-md">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">
                        Your Retained Capital (Total Project Savings)
                      </span>
                      <span className="text-2xl sm:text-3xl font-black">
                        ${devNetSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-100 block">PKR Equivalent</span>
                      <span className="text-sm sm:text-base font-extrabold text-white">
                        ~Rs. {Math.round(devNetSavingsPkr).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Direct daily Slack & video standups</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Strict NDA and 100% IP code ownership</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Zero recruiter fees & no long lock-in</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Dual-monitor setup & 100% backup power</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleRequestDevQuote}
                    className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Get Vetted Developer CVs in 24-48 Hours</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                        `Hello EVONIX, I used your Developer Cost Calculator: ${devTeamSize}x ${devTier.toUpperCase()} (${devTechStack}) for ${devMonths} months. Hourly: $${devOffshoreRate}/hr. Net Savings: $${devNetSavings.toLocaleString()}. Please share available developer profiles.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Senior Tech Lead</span>
                    </a>

                    {onNavigatePage && (
                      <button
                        type="button"
                        onClick={() => onNavigatePage('developer-cost-calculator')}
                        className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        <span>Dedicated Page</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCostCalculator;
