import React, { useState } from 'react';
import {
  Factory,
  Scissors,
  Trophy,
  Shield,
  FileCheck,
  BarChart3,
  Layers,
  Server,
  Cpu,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  DollarSign
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface IndustrialVertical {
  id: string;
  name: string;
  sialkotHub: string;
  icon: React.ElementType;
  badgeColor: string;
  tagline: string;
  coreProblemsSolved: string[];
  keyModules: {
    title: string;
    description: string;
  }[];
  exportFeatures: string[];
  offlineResilience: string;
  typicalDeployment: string;
  verifiedClientQuote: {
    client: string;
    company: string;
    quote: string;
  };
}

const VERTICALS: IndustrialVertical[] = [
  {
    id: 'surgical',
    name: 'Surgical & Dental Instruments ERP',
    sialkotHub: 'Daska Road, Small Industrial Estate (SIE 1 & 2), Hunterpura',
    icon: Scissors,
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    tagline: 'End-to-End Traceability from Forging and Heat Treatment to Ultrasonic Cleaning and Laser Etching',
    coreProblemsSolved: [
      'Eliminates lost raw stainless steel billets (AISI 410, 420, 316L) during milling and forging passes.',
      'Enforces strict FDA 21 CFR Part 11 and EU MDR (Medical Device Regulation) batch tracking.',
      'Tracks grinding, filing, satin finishing, and electro-polishing labor job-cards per master craftsman.',
      'Prevents dispatch mix-ups with automated laser-marking serial generation.'
    ],
    keyModules: [
      {
        title: 'Steel Grade & Metallurgical Batch Control',
        description: 'Record mill test certificates, chemical composition, hardness (HRC), and furnace heat treatment batches.'
      },
      {
        title: 'Piece-Rate Job Card & Wage Automation',
        description: 'Barcoded worker routing cards track exactly how many scissor pairs or forceps were polished per technician.'
      },
      {
        title: 'CE & ISO 13485 Compliance Dossier Generator',
        description: 'One-click generation of technical inspection files, passivation test certificates, and biocompatibility records.'
      },
      {
        title: 'Export Packing List & Commercial Invoice',
        description: 'Automated HS code mapping, gross/net weight calculation, and multi-currency billing in EUR, USD, and GBP.'
      }
    ],
    exportFeatures: [
      'Automatic Box and Master Carton CBM calculations for DHL, FedEx, and air cargo shipments',
      'Direct integration with high-speed Datamax and Zebra barcode/2D DataMatrix label printers',
      'Customs clearing documentation aligned with Sialkot Dry Port Trust procedures'
    ],
    offlineResilience: 'Dual-tier architecture: Local LAN database server in factory keeps floor scanning running even during broadband internet drops or UPS power cutover.',
    typicalDeployment: '2 to 3 weeks including factory floor staff training and barcode printer setup.',
    verifiedClientQuote: {
      client: 'Chaudhry Nadeem Akhtar (Managing Partner)',
      company: 'Al-Madina Precision Surgical, Daska Road Sialkot',
      quote: 'Before Evonix built our local ERP, we had major issues tracing micro-forged batches for our German dental buyers. Now, every single needle holder has a laser-mapped barcode and our export audit took just 35 minutes.'
    }
  },
  {
    id: 'sports',
    name: 'Sports Goods & FIFA Ball Export Suite',
    sialkotHub: 'Sambrial Dry Port Zone, Ugoki Road, Shahabpura Industrial Belt',
    icon: Trophy,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    tagline: 'Thermo-Bonded & Hand-Stitched Ball Assembly, Bladder Pressure Logs, and Export Logistics',
    coreProblemsSolved: [
      'Tracks PU and synthetic microfiber cut-piece yield to minimize expensive scrap wastage.',
      'Logs 72-hour air retention and spherical circumference test results per production batch.',
      'Monitors decentralized home-stitcher centers across Sambrial and Pasrur villages with SMS job dispatch.',
      'Streamlines container consolidation for European and American brand licensing orders.'
    ],
    keyModules: [
      {
        title: 'Synthetic Material & Yield Calculation',
        description: 'Calculates exact square meter consumption for 32-panel, 24-panel, and seamless thermo-bonded designs.'
      },
      {
        title: 'Bladder Pressure & Rebound Test Registry',
        description: 'Integrates digital pressure gauge logs to guarantee zero valve leakage before container sealing.'
      },
      {
        title: 'Decentralized Stitching Center Manager',
        description: 'Tracks bundle issue and return from sub-contracted stitcher centers with automated wage deductions.'
      },
      {
        title: 'Container Stuffing & Loading Sheet',
        description: 'Visual 20ft and 40ft High Cube container stuffing optimizer preventing over-weight fines at Karachi port.'
      }
    ],
    exportFeatures: [
      'Customs Certificate of Origin (Form A) automated generation for Sialkot Chamber of Commerce',
      'Master Carton barcode serialization for direct Amazon FBA and Walmart distribution centers',
      'Exchange rate hedging calculator for AED, USD, and EUR contracts'
    ],
    offlineResilience: 'Local edge caching ensures warehouse hand-scanners continue logging loaded pallets without pausing.',
    typicalDeployment: '3 to 4 weeks with container yard and stitching station hardware integration.',
    verifiedClientQuote: {
      client: 'Mian Tariq Mehmood (Production Director)',
      company: 'Apex Sports Manufacturing, Ugoki Industrial Area Sialkot',
      quote: 'We ship over 45,000 thermo-bonded match soccer balls monthly to the UAE and UK. Evonix gave us an inventory system that reduced cut-piece leather wastage by 14% in the very first quarter.'
    }
  },
  {
    id: 'leather',
    name: 'Leather Garments & Tannery Batch System',
    sialkotHub: 'Kashmir Road, Paris Road, Sialkot Tannery Zone',
    icon: Shield,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    tagline: 'Raw Hide Drum Processing, Pattern Nesting, and Motorbike Leather Apparel Management',
    coreProblemsSolved: [
      'Tracks raw cow, sheep, and goat hide grading from salting to chrome and vegetable tanning drums.',
      'Calculates accurate chemical recipe costs (chromium salts, fat-liquor, dyes) per drum run.',
      'Manages complex size grading and CE-certified armor pocket specifications for CE EN 17092 motorcycle suits.',
      'Controls high-cost YKK brass zippers, Kevlar thread, and CE Level 2 protectors inventory.'
    ],
    keyModules: [
      {
        title: 'Tannery Drum Chemical Formulation',
        description: 'Precise dosing control for drumming stages ensuring identical color dye lots across 500 leather hides.'
      },
      {
        title: 'CAD Pattern Cutting & Skin Yield',
        description: 'Monitors manual and CNC cutting table skin utilization to maximize premium grade hide surface area.'
      },
      {
        title: 'Motorbike Protective Suit Compliance',
        description: 'Ensures triple-safety stitching logs and CE certification badges are mapped to client export manifests.'
      },
      {
        title: 'Multi-Warehouse Tannery & Workshop Sync',
        description: 'Real-time synchronization between the Tannery Zone wet-blue drums and the Kashmir Road stitching factory.'
      }
    ],
    exportFeatures: [
      'REACH and Leather Working Group (LWG) environmental certification audit logs',
      'Automated export rebate (DLTL) calculation forms ready for State Bank of Pakistan filing',
      'Multi-currency proforma invoices with pre-calculated shipping volume'
    ],
    offlineResilience: 'Operates seamlessly on local high-reliability SSD mini-servers with nightly offsite encrypted cloud backup.',
    typicalDeployment: '3 weeks with tannery floor scale calibration and barcode terminal setup.',
    verifiedClientQuote: {
      client: 'Haji Asif Raza (CEO)',
      company: 'Raza Leathercraft & Biker Apparel, Kashmir Road Sialkot',
      quote: 'Managing chemical drum mixtures and grading raw hide lots used to take hours of manual ledger work. Evonix built an automated recipe and cutting yield system that paid for itself within two months.'
    }
  }
];

interface SialkotIndustrialSolutionsProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const SialkotIndustrialSolutions: React.FC<SialkotIndustrialSolutionsProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('surgical');

  const currentVertical = VERTICALS.find((v) => v.id === activeTab) || VERTICALS[0];
  const IconComponent = currentVertical.icon;

  return (
    <section id="sialkot-industrial-solutions" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <Factory className="w-3.5 h-3.5 text-red-600" />
            <span>Sialkot Export Manufacturing Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored ERP & Industrial Software for Sialkot Exporters
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Standard foreign ERPs do not understand Sialkot piece-rate labor, Daska Road forging tolerances, Sambrial ball pressure logs, or Chamber of Commerce export manifests. We build fast, offline-first systems specifically engineered for our hometown industry.
          </p>
        </div>

        {/* Industry Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {VERTICALS.map((vertical) => {
            const VIcon = vertical.icon;
            const isSelected = vertical.id === activeTab;
            return (
              <button
                key={vertical.id}
                onClick={() => setActiveTab(vertical.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <VIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-red-600'}`} />
                <span>{vertical.name.split(' ')[0]} {vertical.name.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Card */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          {/* Top Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentVertical.badgeColor}`}>
                  {currentVertical.name}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentVertical.sialkotHub}</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentVertical.tagline}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onOpenQuote?.(`Sialkot Industrial ERP: ${currentVertical.name}`)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Custom Factory Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Assalam-o-Alaikum EVONIX, I want to discuss ERP software for my ${currentVertical.name} in Sialkot.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Senior Engineer</span>
              </a>
            </div>
          </div>

          {/* Core Modules Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentVertical.keyModules.map((mod, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {mod.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sialkot Factory Floor Pain Points Solved */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Critical Sialkot Manufacturing Challenges Eliminated</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              {currentVertical.coreProblemsSolved.map((prob, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span>{prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Verified Client Review */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tech Specs */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Local Sialkot Architecture & Hardware
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  100% Offline Capable
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Factory Internet Drops?</span>
                  <p className="text-slate-200 text-xs mt-0.5">{currentVertical.offlineResilience}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Deployment & Go-Live Window:</span>
                  <p className="text-slate-200 text-xs mt-0.5">{currentVertical.typicalDeployment}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Export & Customs Integrations:</span>
                  <ul className="mt-1 space-y-1 text-slate-300">
                    {currentVertical.exportFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Human Client Review */}
            <div className="lg:col-span-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Verified Sialkot Industrial Deployment
                  </span>
                  <div className="flex text-amber-500 text-xs">★★★★★ 5.0</div>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  "{currentVertical.verifiedClientQuote.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {currentVertical.verifiedClientQuote.client}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {currentVertical.verifiedClientQuote.company}
                  </div>
                </div>
                <div className="text-[10px] font-mono font-bold bg-white text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
                  Verified Local Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
