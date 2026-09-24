import React, { useState } from 'react';
import { Calculator, Globe, Monitor, ShoppingBag, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Sparkles, Building2 } from 'lucide-react';
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
];

interface ProjectCostCalculatorProps {
  onOpenQuote?: (projectDetails?: string) => void;
}

export const ProjectCostCalculator: React.FC<ProjectCostCalculatorProps> = ({ onOpenQuote }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(SECTORS[0].id);
  const [selectedTierId, setSelectedTierId] = useState<string>(TIERS[0].id);
  const [addMultilingual, setAddMultilingual] = useState<boolean>(false);
  const [addConfigurator, setAddConfigurator] = useState<boolean>(false);

  const currentSector = SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[0];
  const currentTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[0];

  // Calculate dynamic totals
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

  const handleRequestQuote = () => {
    if (onOpenQuote) {
      onOpenQuote(
        `Project Quote: ${currentTier.title} for ${currentSector.name}. Estimated: Rs. ${totalPkr.toLocaleString()} (${totalAed} AED).`
      );
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-red-600" />
            <span>Instant Scope & Quotation Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Web Development & POS Software Cost Estimator
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Calculate estimated development investment, delivery timeline, and included corporate features tailored to your Sialkot manufacturing or retail business requirements.
          </p>
        </div>

        {/* Calculator Body */}
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
                      onClick={() => setSelectedTierId(tier.id)}
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
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
              {/* Card Header */}
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Official Estimation Summary
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {currentTier.title}
                </h3>
                <span className="text-xs text-slate-400 block font-medium">
                  Configured for {currentSector.name}
                </span>
              </div>

              {/* Price Display */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Total Investment (PKR):</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    Rs. {totalPkr.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-slate-400 pt-1 border-t border-white/10">
                  <span>Dubai / UAE Equivalent:</span>
                  <span className="font-bold text-emerald-400">~{totalAed} AED</span>
                </div>
              </div>

              {/* Delivery & Architecture Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Timeline</span>
                  <span className="font-bold text-white block mt-0.5">{currentTier.days}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Standard</span>
                  <span className="font-bold text-white block mt-0.5">Dubai Enterprise</span>
                </div>
              </div>

              {/* Included Modules Checklist */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Included Features & Modules:
                </span>
                <div className="space-y-2">
                  {currentTier.includedModules.map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                  {addMultilingual && (
                    <div className="flex items-start gap-2.5 text-xs text-amber-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Multilingual (DE/FR/ES) with hreflang tags</span>
                    </div>
                  )}
                  {addConfigurator && (
                    <div className="flex items-start gap-2.5 text-xs text-amber-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Interactive 3D WebGL Uniform / Product Configurator</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Booking Actions */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleRequestQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Formal Scope & Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Estimated Scope</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
