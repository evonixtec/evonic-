import React from 'react';
import {
  Wrench,
  Code2,
  ExternalLink,
  Laptop,
  Monitor,
  Printer,
  ShieldCheck,
  Clock,
  ArrowRight,
  Factory,
  Globe,
  Database,
  Calculator,
  MapPin,
  Sparkles
} from 'lucide-react';
import { NavPageId } from '../../types';

interface HomeJourneyGatewayProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (service?: string) => void;
}

export const HomeJourneyGateway: React.FC<HomeJourneyGatewayProps> = ({
  onNavigatePage,
  onOpenQuote,
}) => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Select Your Business Need</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Two Clear Services. Zero Confusion.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Choose what fits your urgent requirement today. We keep local hardware repairs and corporate software separate.
          </p>
        </div>

        {/* 2 Main Funnels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Funnel 1: Local Hardware & POS Setup (Primary Cash Flow) */}
          <div className="relative rounded-3xl border-2 border-red-200 bg-gradient-to-b from-red-50/50 via-white to-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-red-400 transition-all group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider">
                  Primary Local Service
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  Sialkot & Punjab
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-red-600 text-white flex-shrink-0 shadow-md">
                  <Wrench className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    Hardware, Laptop & POS Repair
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Chip-level motherboard repair, thermal printers, barcode scanners, and fast on-site IT dispatch.
                  </p>
                </div>
              </div>

              {/* Service Quick Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>90-Day Repair Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Clock className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>60-Min On-Site Dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Laptop className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>No Fix, No Diagnostic Fee</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Printer className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Thermal & Laser Printer Bench</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigatePage('doorstep-support')}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book On-Site IT Engineer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigatePage('shop')}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Monitor className="w-4 h-4 text-slate-600" />
                <span>POS & Hardware Store</span>
              </button>
            </div>
          </div>

          {/* Funnel 2: Software, Web & Export Factory ERP (Secondary Professional Tier) */}
          <div className="relative rounded-3xl border-2 border-blue-200 bg-gradient-to-b from-blue-50/50 via-white to-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-400 transition-all group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider">
                  Corporate Tier
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Factory className="w-3.5 h-3.5 text-blue-600" />
                  Sialkot Exporters & Global
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-600 text-white flex-shrink-0 shadow-md">
                  <Code2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    Custom Software & Export ERP
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    B2B web applications, WeBOC packing lists, offline factory sync, and tailored business software.
                  </p>
                </div>
              </div>

              {/* Service Quick Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Factory className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Surgical & Leather Job Cards</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Modern Web & Next.js Systems</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Database className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Offline LAN Sync Without Cloud</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-slate-700 flex-shrink-0" />
                  <span>Dubai 20-Year Quality Standard</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigatePage('sialkot-export-erp')}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Sialkot Export ERP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigatePage('services')}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-slate-600" />
                <span>Web Services</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Free Tools Subdomain Banner (Segregates calculators from core agency branding) */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Dedicated Portal
                </span>
                <span className="text-xs font-mono text-slate-400">tools.evonixtec.com</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                Looking for Free Online Calculators?
              </h4>
              <p className="text-xs text-slate-300">
                20+ free e-commerce, Amazon FBA, eBay, and export billing tools. Completely free to use.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigatePage('tools')}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Open Tools Workstation</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
