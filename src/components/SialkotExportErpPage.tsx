import React, { useState } from 'react';
import {
  Factory,
  Scissors,
  Layers,
  FileCheck,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowRight,
  Database,
  Globe,
  Clock,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NavPageId } from './Navbar';
import { SialkotIndustrialSolutions } from './SialkotIndustrialSolutions';

interface SialkotExportErpPageProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (serviceType?: string) => void;
}

export const SialkotExportErpPage: React.FC<SialkotExportErpPageProps> = ({
  onNavigatePage,
  onOpenQuote
}) => {
  const [activeTab, setActiveTab] = useState<'surgical' | 'leather' | 'sports' | 'customs'>('surgical');

  const handleBookDemo = (vertical: string) => {
    onOpenQuote(`Sialkot Export ERP Demo - ${vertical}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <Factory className="w-3.5 h-3.5 text-[#C81E1E]" />
              <span>Built For Sialkot Exporters</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">Updated for 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Sialkot Export ERP & WeBOC Cloud Billing Suite
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Manage your entire factory on one screen. Track raw material, master labor job-cards, buyer packing lists, and export invoices.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleBookDemo('General Export Suite')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Live Factory Demo</span>
            </button>
            <a
              href="#erp-modules"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all flex items-center gap-2"
            >
              <Factory className="w-4 h-4 text-cyan-400" />
              <span>View ERP Modules</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="erp-modules" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Industry Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('surgical')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'surgical'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Surgical & Dental Instruments
          </button>
          <button
            onClick={() => setActiveTab('leather')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'leather'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Leather Garments & Goods
          </button>
          <button
            onClick={() => setActiveTab('sports')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'sports'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Sportswear & Martial Arts
          </button>
          <button
            onClick={() => setActiveTab('customs')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'customs'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            WeBOC Customs & Cargo
          </button>
        </div>

        {/* Tab Detail Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {activeTab === 'surgical' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Surgical & Dental Instruments ERP</h2>
                  <p className="text-slate-500 text-xs">For Daska Road, Small Industrial Estate, and Hunterpura units</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">What It Solves:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Tracks raw AISI 410, 420, and 316L steel billets through forging and milling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Passes FDA 21 CFR and EU MDR batch audits with instant paperless logs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Assigns daily piece-rate job cards to master grinders and electro-polishers.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800">Key Features:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>• Direct laser-marking serial number generator.</li>
                    <li>• Auto-checks ultrasonic passivate heat logs.</li>
                    <li>• Auto-creates single-click buyer packing lists in USD and EUR.</li>
                  </ul>
                  <button
                    onClick={() => handleBookDemo('Surgical Instruments ERP')}
                    className="w-full mt-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Request Surgical Demo
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leather' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Leather Garments & Goods ERP</h2>
                  <p className="text-slate-500 text-xs">For Leather Industrial Zone, Roras Road, and Defence Road units</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">What It Solves:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Tracks leather hide grade yield (sq. ft) and wastage per jacket cutting pattern.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Controls zipper, lining, thread, and snap-button inventory balances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Calculates exact sewing stitcher wages per completed carton.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800">Key Features:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>• Real-time hide yardage calculation.</li>
                    <li>• Carton barcode labeling for European buyers.</li>
                    <li>• Instant container packing breakdown with weight & CBM.</li>
                  </ul>
                  <button
                    onClick={() => handleBookDemo('Leather Garments ERP')}
                    className="w-full mt-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Request Leather Demo
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sports' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Sportswear & Martial Arts ERP</h2>
                  <p className="text-slate-500 text-xs">For Sublimation printing, Football & Boxing glove factories</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">What It Solves:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Stops fabric mix-ups across GSM weights, colors, and sublimation roll batches.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Tracks screen printing, heat transfer, and embroidery passes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Manages private label OEM orders with brand size charts.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800">Key Features:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>• Roll-to-roll fabric consumption reports.</li>
                    <li>• Size breakdown matrices (XS to 4XL).</li>
                    <li>• Direct shipment carton label print.</li>
                  </ul>
                  <button
                    onClick={() => handleBookDemo('Sportswear ERP')}
                    className="w-full mt-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Request Sportswear Demo
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customs' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">WeBOC Customs & Cargo Billing</h2>
                  <p className="text-slate-500 text-xs">For Sambrial Dry Port and SIAL Airport clearing agents</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">What It Solves:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Generates WeBOC Goods Declaration (GD) values with exact HS codes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Calculates Air Freight vs Sea Freight container charges in real time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prints dual-currency invoices (USD, EUR, GBP, PKR) for foreign buyers.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800">Key Features:</h3>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>• Auto-checks State Bank E-Form numbers.</li>
                    <li>• Airway Bill (AWB) and Bill of Lading (BL) generators.</li>
                    <li>• Works 100% offline during local internet outages.</li>
                  </ul>
                  <button
                    onClick={() => handleBookDemo('WeBOC Customs Suite')}
                    className="w-full mt-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Request Customs Suite Demo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Industrial Solutions Breakdown Component */}
        <SialkotIndustrialSolutions onOpenQuote={onOpenQuote} />

        {/* Option A Semantic On-Page SEO Architecture & 2026/2027 Compliance Guide */}
        <section className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#E5E7EB]">
            <div>
              <p className="text-xs font-semibold text-[#C81E1E]">
                Updated for 2026/2027 · Export Compliance &amp; Production Guide
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Built for Sialkot surgical, leather, and sportswear plants dispatching via Sambrial Dry Port and SIAL Airport.
              </p>
            </div>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              WeBOC · FBR Digital · DLTL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2.5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                Export documentation and commercial invoice software Sialkot
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generate dual-currency USD, EUR, and GBP commercial invoices, itemized master carton packing lists, Certificate of Origin drafts, and WeBOC Goods Declaration manifests from one verified factory order ledger.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2.5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                Sportswear &amp; surgical manufacturing production tracking ERP Pakistan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Track raw steel billets, sublimation fabric rolls, hide yields, piece-rate artisan contractor job cards, and FDA/CE laser-marked lot traceability across forging, stitching, and QC stations with local LAN failover.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2.5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                FBR digital invoicing and export rebate management system
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Maintain compliant FBR digital invoicing audit trails alongside automated State Bank Form-E reconciliation, duty drawback calculations, and DLTL export rebate documentation for finance teams.
              </p>
            </div>
          </div>

          {/* Sialkot Export ERP 2026/2027 FAQ Section */}
          <div className="pt-6 border-t border-[#E5E7EB] space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Frequently Asked Questions · Sialkot Export ERP (2026/2027)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: 'Does your export documentation and commercial invoice software support Sialkot buyers in Europe and the US?',
                  a: 'Yes. Commercial invoices and packing lists export cleanly in USD, EUR, GBP, and AED with HS codes, carton CBM weights, and buyer SKU references mapped to WeBOC customs filings.',
                },
                {
                  q: 'How does sportswear & surgical manufacturing production tracking ERP handle power or internet outages?',
                  a: 'Our ERP runs offline-first on a local factory LAN SSD node so forging, stitching, and dispatch terminals keep printing barcodes without interruption, syncing to cloud backups once connectivity returns.',
                },
                {
                  q: 'Is FBR digital invoicing and export rebate tracking included for 2026/2027 audits?',
                  a: 'Yes. Every domestic and export dispatch records tax statuses, Form-E references, and supporting shipping bills to simplify FBR digital invoicing and export rebate filings.',
                },
                {
                  q: 'Can piece-rate contractor and master artisan wages be tracked inside the factory ERP?',
                  a: 'Yes. Job cards issue barcode batch tickets per department—grinding, polishing, cutting, or stitching—calculating exact weekly piece-rate contractor payouts with zero manual ledger errors.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1.5"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Contact Banner Rule 4 */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Got a question? Call us. We reply in 2 hours.</h2>
          <p className="text-slate-300 text-sm">
            We provide on-site installation and free staff training across Sialkot.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>{COMPANY_INFO.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <span>Visit Contact Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
