import React from 'react';
import {
  Code2,
  Factory,
  Check,
  ArrowRight,
  Scissors,
  Trophy,
  Shield,
  Database,
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
    <section className="py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12 space-y-2.5">
          <p className="text-xs font-semibold text-[#C81E1E]">
            01 · Practice Areas
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Two specialized engineering divisions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Work with our corporate software architecture team or deploy an offline-first ERP built specifically for Sialkot manufacturing plants.
          </p>
        </div>

        {/* 2 Architectural Pathways */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pathway 1: International Enterprise Software & AI Architecture */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-[#C81E1E]">Global &amp; UAE Enterprises</span>
                <span>Dubai Engineering Standards</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#C81E1E] text-white flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    Enterprise Software &amp; AI Systems
                  </h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Custom web platforms, multi-branch cloud POS systems, and private workflow automation for corporate directors and B2B exporters.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-[#E5E7EB]">
                <div className="text-xs font-semibold text-slate-500">
                  Core Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C81E1E] flex-shrink-0" />
                    <span>Next.js &amp; React Web Platforms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C81E1E] flex-shrink-0" />
                    <span>Private LLM &amp; Data Pipelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C81E1E] flex-shrink-0" />
                    <span>Multi-Branch Cloud POS &amp; ERP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C81E1E] flex-shrink-0" />
                    <span>99.9% Written Uptime SLAs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenQuote('Enterprise Software Architecture Consultation')}
                className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigatePage('services')}
                className="w-full sm:w-auto py-3 px-5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-800 font-semibold text-xs sm:text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>View B2B Services</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: Sialkot Industrial Manufacturing & Export ERP Hub */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Sialkot Industrial Belt</span>
                <span>SIE 1 &amp; 2 · Daska Road · Sambrial</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    Sialkot Industrial Export ERP
                  </h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Floor-level batch traceability, piece-rate worker payroll, and WeBOC customs packing lists for surgical, sports, and leather exporters.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-[#E5E7EB]">
                <div className="text-xs font-semibold text-slate-500">
                  Manufacturing Verticals
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#C81E1E] flex-shrink-0" />
                    <span>Surgical: FDA &amp; CE Batch Logs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <span>Sports: Ball Pressure &amp; Stitchers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <span>Leather: Tannery Drum Yields</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <span>Offline LAN Server Resilience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigatePage('sialkot-export-erp')}
                className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Open Export ERP Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenQuote('Sialkot Industrial Export ERP Demo')}
                className="w-full sm:w-auto py-3 px-5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-800 font-semibold text-xs sm:text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Factory Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
