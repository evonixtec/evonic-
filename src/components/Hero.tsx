import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Bot, Globe, Wrench } from 'lucide-react';
import { NavPageId } from '../types';
import { COMPANY_INFO } from '../data/content';

interface HeroProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigatePage }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Diagnostic Lab &amp; Office: Kolti Behram, Sialkot, Pakistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Precision IT Consultancy &amp; Industrial Hardware Engineering
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Backed by 20+ years of Dubai international expertise, <strong>evonix technologies</strong> delivers enterprise software engineering, chip-level motherboard micro-soldering, POS retail systems, and an open portfolio of zero-database export workstations for UK, US, European, and global exporters.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigatePage('tools')}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Online Web Tools Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigatePage('services')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Explore Services
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              {COMPANY_INFO.stats.map((s, idx) => (
                <div key={idx}>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{s.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Flagship Cross-Border Suites
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100% Client-Side</span>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => onNavigatePage('invoice')}
                className="p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 cursor-pointer transition-colors group flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors">
                    Global Micro-Invoice Generator
                  </h3>
                  <p className="text-[10.5px] text-slate-400">Multi-currency A4 PDF + Code128 barcodes</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                onClick={() => onNavigatePage('uk-eu-vat-calculator')}
                className="p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 cursor-pointer transition-colors group flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors">
                    UK &amp; EU VAT Reverse Charge Engine
                  </h3>
                  <p className="text-[10.5px] text-slate-400">HMRC s.55A &amp; Article 196 reverse charge clauses</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                onClick={() => onNavigatePage('us-duty-nexus-estimator')}
                className="p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 cursor-pointer transition-colors group flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors">
                    US Duty &amp; Section 321 Calculator
                  </h3>
                  <p className="text-[10.5px] text-slate-400">$800 duty-free clearance for US buyers</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                onClick={() => onNavigatePage('developer-cost-calculator')}
                className="p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 cursor-pointer transition-colors group flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors">
                    Dedicated Developer Cost Calculator
                  </h3>
                  <p className="text-[10.5px] text-slate-400">Save up to 72% with Sialkot dedicated squads</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigatePage('tools')}
                className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
              >
                View all 12 tools in web portfolio &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
