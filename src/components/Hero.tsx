import React, { useState } from 'react';
import { NavPageId, SectionId } from '../types';
import { ArrowRight, Search, Check, Server, Calculator } from 'lucide-react';

interface HeroProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (section: NavPageId | SectionId) => void;
  onOpenSearch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onNavigate,
  onOpenSearch,
}) => {
  const [previewMode, setPreviewMode] = useState<'erp' | 'calc'>('erp');
  const [erpVertical, setErpVertical] = useState<'surgical' | 'sports' | 'leather'>('surgical');
  const [salePrice, setSalePrice] = useState<number>(48);
  const [itemCost, setItemCost] = useState<number>(14);

  const erpData = {
    surgical: {
      code: 'SIE-LOT-420-91',
      title: 'Surgical & Dental Batch Ledger',
      facility: 'Daska Road · Small Industrial Estate',
      rows: [
        { label: 'Steel Grade Spec', val: 'AISI 420 · HRC 52' },
        { label: 'Polishing Job Cards', val: '1,240 pcs synced' },
        { label: 'Compliance File', val: 'CE / FDA 21 CFR Ready' },
        { label: 'LAN Sync Mode', val: 'Local SSD · 4 ms' },
      ],
    },
    sports: {
      code: 'SMB-EXP-2026-18',
      title: 'Sports Goods & Container Dispatch',
      facility: 'Sambrial Dry Port · Ugoki Road',
      rows: [
        { label: 'PU Cut-Piece Yield', val: '94.2% Net Efficiency' },
        { label: '72h Pressure Test', val: '0.85 bar Passed' },
        { label: 'Master Carton Load', val: '40ft HC · 100% Fill' },
        { label: 'WeBOC Customs', val: 'Packing List Ready' },
      ],
    },
    leather: {
      code: 'KSH-TAN-308-04',
      title: 'Leather Yield & Apparel Suite',
      facility: 'Tannery Zone · Kashmir Road',
      rows: [
        { label: 'Hide Surface Yield', val: '88.6 sq ft Avg' },
        { label: 'CE Armor Spec', val: 'Triple-Stitch Verified' },
        { label: 'DLTL Export Rebate', val: 'Auto-Computed' },
        { label: 'LAN Sync Mode', val: 'Local SSD · Encrypted' },
      ],
    },
  }[erpVertical];

  const marketplaceFee = +(salePrice * 0.065 + 0.30 + salePrice * 0.03).toFixed(2);
  const netProfit = +(salePrice - itemCost - marketplaceFee).toFixed(2);
  const marginPct = salePrice > 0 ? +((netProfit / salePrice) * 100).toFixed(1) : 0;

  const metrics = [
    {
      value: '20+ Years',
      label: 'UAE & International Engineering',
      note: 'Founded on Dubai corporate standards since 2004',
    },
    {
      value: '500+',
      label: 'Production Deployments',
      note: 'Custom web platforms, POS & manufacturing ERPs',
    },
    {
      value: '99.9% SLA',
      label: 'Uptime Guarantee',
      note: 'Monitored cloud infrastructure & local LAN failover',
    },
    {
      value: '< 2 Hours',
      label: 'Direct Architect Response',
      note: 'Senior engineering desk in Kotli Behram, Sialkot',
    },
  ];

  return (
    <section
      id="home"
      className="relative bg-white pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#E5E7EB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-[#C81E1E] font-semibold">Dubai Engineering Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Sialkot Operations</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2004</span>
            </div>

            <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-semibold tracking-[-0.03em] text-slate-900 leading-[1.08] max-w-2xl">
              Enterprise software, POS systems, and industrial ERP built to{' '}
              <span className="text-[#C81E1E]">last.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-[1.6] font-normal">
              We apply twenty years of UAE software architecture to custom web platforms, retail POS systems, and Sialkot export ERPs with written 99.9% uptime SLAs.
            </p>

            {/* Primary CTA & Clean Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenQuote('Enterprise Software Architecture Consultation')}
                className="px-5 py-3 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="px-5 py-3 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-900 font-semibold text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap"
              >
                View Client Work
              </button>

              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="px-3.5 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-[#FAFAF9] text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  aria-label="Search services, tools, and case studies"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Search</span>
                </button>
              )}
            </div>

            {/* Quiet Unboxed Commitments */}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C81E1E]" />
                <span>100% Source Code Ownership</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C81E1E]" />
                <span>Fixed Milestone Pricing</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C81E1E]" />
                <span>Offline-First Factory &amp; POS Sync</span>
              </span>
            </div>
          </div>

          {/* Right Column: Crisp Interactive Sialkot Export ERP & Live Calculator UI Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] p-5 sm:p-6 flex flex-col justify-between">
              {/* Top Workspace Bar */}
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('erp')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        previewMode === 'erp'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Server className="w-3.5 h-3.5" />
                      <span>Export ERP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('calc')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        previewMode === 'calc'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Fee Engine</span>
                    </button>
                  </div>

                  <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                    {previewMode === 'erp' ? erpData.code : 'LIVE MARGIN'}
                  </span>
                </div>

                {previewMode === 'erp' ? (
                  <div className="pt-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          {erpData.title}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {erpData.facility}
                        </p>
                      </div>
                    </div>

                    {/* Vertical Switcher */}
                    <div className="flex items-center gap-1.5">
                      {(['surgical', 'sports', 'leather'] as const).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setErpVertical(key)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
                            erpVertical === key
                              ? 'bg-[#C81E1E] text-white'
                              : 'bg-white text-slate-600 border border-[#E5E7EB] hover:text-slate-900'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>

                    {/* Structured Tabular Inspection Grid */}
                    <div className="bg-white rounded-lg border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
                      {erpData.rows.map((row) => (
                        <div
                          key={row.label}
                          className="px-3.5 py-2.5 flex items-center justify-between text-xs gap-3"
                        >
                          <span className="text-slate-500">{row.label}</span>
                          <span className="font-mono font-medium text-slate-900 tabular-nums text-right">
                            {row.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pt-5 space-y-4">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Marketplace Profit &amp; Fee Preview
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Adjust unit price and landed cost to estimate margin
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block bg-white rounded-lg border border-[#E5E7EB] p-3">
                        <span className="text-[11px] text-slate-500 block">Sale Price ($)</span>
                        <input
                          type="number"
                          min={1}
                          value={salePrice}
                          onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
                          className="mt-1 w-full font-mono text-sm font-semibold text-slate-900 tabular-nums focus:outline-none"
                        />
                      </label>
                      <label className="block bg-white rounded-lg border border-[#E5E7EB] p-3">
                        <span className="text-[11px] text-slate-500 block">Product Cost ($)</span>
                        <input
                          type="number"
                          min={0}
                          value={itemCost}
                          onChange={(e) => setItemCost(Math.max(0, Number(e.target.value)))}
                          className="mt-1 w-full font-mono text-sm font-semibold text-slate-900 tabular-nums focus:outline-none"
                        />
                      </label>
                    </div>

                    <div className="bg-white rounded-lg border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
                      <div className="px-3.5 py-2.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Est. Platform &amp; Payment Fees</span>
                        <span className="font-mono font-medium text-slate-900 tabular-nums">
                          ${marketplaceFee.toFixed(2)}
                        </span>
                      </div>
                      <div className="px-3.5 py-2.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Estimated Net Profit</span>
                        <span className={`font-mono font-semibold tabular-nums ${netProfit >= 0 ? 'text-slate-900' : 'text-[#C81E1E]'}`}>
                          ${netProfit.toFixed(2)}
                        </span>
                      </div>
                      <div className="px-3.5 py-2.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Net Profit Margin</span>
                        <span className="font-mono font-semibold text-[#C81E1E] tabular-nums">
                          {marginPct}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Card Footer Link */}
              <div className="pt-4 mt-5 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <a
                  href={previewMode === 'erp' ? '/sialkot-export-erp' : '/tools/etsy-fee-calculator'}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(previewMode === 'erp' ? 'sialkot-export-erp' : 'etsy-fee-calculator');
                  }}
                  className="font-semibold text-[#C81E1E] hover:text-[#A6171E] inline-flex items-center gap-1"
                >
                  <span>{previewMode === 'erp' ? 'Open Sialkot Export ERP' : 'Open Full Calculators'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                  {previewMode === 'erp' ? 'Offline-First SQL' : '26 Free Tools'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip */}
        <div className="mt-14 pt-8 border-t border-[#E5E7EB] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1 text-left">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800">
                {metric.label}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {metric.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
