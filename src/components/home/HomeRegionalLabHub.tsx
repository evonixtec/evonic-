import React from 'react';
import {
  Wrench,
  Cpu,
  Laptop,
  Printer,
  ShieldCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { NavPageId } from '../../types';
import { getStoreDomainUrl } from '../../lib/domainUtils';

interface HomeRegionalLabHubProps {
  onNavigatePage: (page: NavPageId) => void;
  onOpenQuote: (service?: string) => void;
}

export const HomeRegionalLabHub: React.FC<HomeRegionalLabHubProps> = ({
  onNavigatePage,
  onOpenQuote,
}) => {
  return (
    <section className="py-16 bg-[#F8F9FA] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-red-600" />
              <span>Regional Hardware Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1E1E] tracking-tight">
              Sialkot Regional Diagnostic Lab &amp; IT Support
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-[1.55]">
              For local businesses and industrial factory facilities requiring physical hardware diagnostics, thermal printer setup, or on-site IT technicians across Sialkot.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigatePage('doorstep-support')}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Doorstep IT Support Page</span>
            </button>
            <a
              href={getStoreDomainUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>store.evonixtec.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* 3 Dedicated Regional Cards (Nested Radius: Outer 32px, Inner 16px, Padding 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: On-Site IT Engineer Dispatch */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all text-left">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black text-[#1E1E1E]">
                  Factory Floor On-Site Dispatch
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-[1.55]">
                  Rapid dispatch of certified network and hardware engineers to industrial zones across Sialkot (Daska Road, Sambrial, SIE 1 &amp; 2).
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>LAN Cabling &amp; Switch Maintenance</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Label &amp; Barcode Scanner Setup</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigatePage('doorstep-support')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request On-Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Component-Level Diagnostic Lab */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all text-left">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black text-[#1E1E1E]">
                  Micro-Soldering &amp; Motherboard Lab
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-[1.55]">
                  Equipped with stereo microscopes, FLIR thermal imaging, and oscilloscopes for chip-level repair of laptops and industrial controllers.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>90-Day Written Service Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>No Diagnosis Fee If Unrepairable</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                onClick={() => onOpenQuote('Hardware & Laptop Diagnostic Inspection')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book Lab Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: store.evonixtec.com Hardware Store */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all text-left">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Printer className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black text-[#1E1E1E]">
                  Certified Hardware &amp; POS Terminals
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-[1.55]">
                  Direct hardware sales have been separated to store.evonixtec.com: imported corporate laptops, thermal receipt printers, and barcode scanners.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Same-Day Sialkot Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Prices in Pakistani Rupees (PKR)</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <a
                href={getStoreDomainUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse store.evonixtec.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
