import React from 'react';
import {
  Code2,
  Factory,
  Globe,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  Cpu,
  Scissors,
  Trophy,
  Shield
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
  const scrollToIndustrialSection = () => {
    const el = document.getElementById('sialkot-industrial-solutions');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      onNavigatePage('sialkot-export-erp');
    }
  };

  return (
    <section className="py-16 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Dedicated Client Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1E1E] tracking-tight">
            Select Your Strategic Technology Path
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-[1.55]">
            We provide specialized engineering solutions separated by operational domain. Choose between our international corporate software practice and our dedicated Sialkot manufacturing export hub.
          </p>
        </div>

        {/* 2 Dedicated Distinct Pathways (Nested Radius: Outer 36px, Inner 16px, Padding 24px) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pathway 1: International Enterprise Software & AI Architecture */}
          <div className="rounded-[36px] border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-red-300 transition-all text-left">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between text-left">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-black uppercase tracking-wider border border-red-200">
                  Global &amp; UAE Enterprises
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-red-600" />
                  Dubai Standard
                </span>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-3.5 rounded-2xl bg-red-600 text-white flex-shrink-0 shadow-md">
                  <Code2 className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
                    Enterprise Software &amp; AI Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-[1.55]">
                    For multinational firms, SaaS providers, and corporate directors requiring sub-second database transactions, multi-tenant cloud platforms, and private autonomous AI agents.
                  </p>
                </div>
              </div>

              {/* Architectural Capabilities */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Core Architecture Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Next.js &amp; React Web Engines</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Private LLM Agent Pipelines</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Multi-Branch Cloud POS &amp; ERP</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Sub-Second Latency SLAs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Single Primary Red Button + Secondary Specs Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenQuote('Enterprise Software Architecture Consultation')}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigatePage('services')}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>View B2B Services</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: Sialkot Industrial Manufacturing & Export ERP Hub */}
          <div className="rounded-[36px] border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-slate-400 transition-all text-left">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between text-left">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black uppercase tracking-wider border border-slate-300">
                  Sialkot Industrial Zone
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Factory className="w-3.5 h-3.5 text-slate-700" />
                  SIE 1 &amp; 2, Daska Road, Sambrial
                </span>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex-shrink-0 shadow-md">
                  <Factory className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
                    Sialkot Industrial Export ERP
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-[1.55]">
                    For factory owners in Surgical Instruments, Sports Goods, and Leather Apparel requiring raw material batch tracking, worker piece-rate payroll, and WeBOC customs packing lists.
                  </p>
                </div>
              </div>

              {/* Industry Pillars */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Sialkot Manufacturing Verticals
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <Scissors className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>Surgical: FDA &amp; CE Batch Logs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <Trophy className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Sports: Ball Pressure &amp; Stitchers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <Shield className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Leather: Tannery Drum Yields</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 text-left">
                    <Database className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Offline LAN Server (Zero Internet Drops)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Single Primary Red Button + Secondary ERP Page Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={scrollToIndustrialSection}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Industrial ERP Section</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigatePage('sialkot-export-erp')}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>Full Industry Dossier</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
