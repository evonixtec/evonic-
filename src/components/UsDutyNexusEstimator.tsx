import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  FileText,
  DollarSign,
  TrendingDown,
  Info,
  Calculator
} from 'lucide-react';

interface HtsCategory {
  name: string;
  code: string;
  standardDutyPercent: number;
  description: string;
}

const HTS_CATEGORIES: HtsCategory[] = [
  {
    name: 'Surgical & Medical Instruments',
    code: '9018.90.00',
    standardDutyPercent: 0.0,
    description: 'Stainless steel scalpels, forceps, bone drills, retractors (Duty-Free under US Trade Act).',
  },
  {
    name: 'Sports Goods (Leather & Synthetic)',
    code: '9506.62.40',
    standardDutyPercent: 4.8,
    description: 'Inflatable footballs, match balls, soccer equipment, protective shin guards.',
  },
  {
    name: 'Motorbike & Work Leather Gloves',
    code: '4203.29.15',
    standardDutyPercent: 4.9,
    description: 'Full-grain cowhide protective riding gear, industrial safety gauntlets.',
  },
  {
    name: 'Cotton & Tech Sportswear Apparel',
    code: '6109.10.00',
    standardDutyPercent: 16.5,
    description: 'Polyester sublimation jerseys, training hoodies, tracksuits.',
  },
  {
    name: 'Custom Software & IT Engineering Deliverables',
    code: '9903.00.00',
    standardDutyPercent: 0.0,
    description: 'Digital electronic deliverables, software source code, cloud hosting (Zero US customs tariff).',
  },
];

export const UsDutyNexusEstimator: React.FC = () => {
  const [consignmentValueUsd, setConsignmentValueUsd] = useState<number>(780);
  const [selectedHtsIndex, setSelectedHtsIndex] = useState<number>(0);
  const [freightCostUsd, setFreightCostUsd] = useState<number>(120);
  const [usState, setUsState] = useState<string>('California (CA)');

  // Exact formulas preserved
  const category = HTS_CATEGORIES[selectedHtsIndex];
  const isSection321Eligible = consignmentValueUsd <= 800; // Section 321 threshold is $800
  const dutiableAmount = isSection321Eligible ? 0 : consignmentValueUsd;
  const calculatedDuty = (dutiableAmount * category.standardDutyPercent) / 100;
  const totalLandedCost = consignmentValueUsd + freightCostUsd + calculatedDuty;

  const [hasCalculated, setHasCalculated] = useState(true);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  return (
    <div className="py-8 min-h-screen apple-tool-layout text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Apple Clean Header Banner */}
        <div className="apple-glass-box p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="apple-badge">
                North America &amp; US CBP Trade Engine
              </span>
              <span className="text-xs text-[#86868b] font-mono">19 U.S.C. &sect; 1321 (Section 321)</span>
            </div>
            <h1 className="apple-tool-title mt-2">
              US Customs Duty &amp; Section 321 De Minimis Calculator
            </h1>
            <p className="apple-tool-subtitle">
              Calculate US Customs tariffs, verify duty-free clearance under the $800 Section 321 rule, and estimate landed costs for US corporate buyers.
            </p>
          </div>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 apple-glass-box p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[#1d1d1f] pb-2 border-b border-black/[0.06]">
              Consignment &amp; Commodity Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Product Category &amp; US HTS Tariff Code
                </label>
                <select
                  aria-label="HTS Tariff Classification Category"
                  value={selectedHtsIndex}
                  onChange={(e) => setSelectedHtsIndex(Number(e.target.value))}
                  className="apple-input w-full font-medium"
                >
                  {HTS_CATEGORIES.map((cat, idx) => (
                    <option key={cat.code} value={idx}>
                      {cat.name} ({cat.code}) - {cat.standardDutyPercent}% Duty
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#86868b] mt-1 block">
                  {category.description}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Declared Commercial Invoice Value (FOB / USD)
                </label>
                <input
                  type="number"
                  aria-label="Declared Commercial Invoice Value in USD"
                  value={consignmentValueUsd}
                  onChange={(e) => setConsignmentValueUsd(Number(e.target.value) || 0)}
                  className="apple-input w-full font-mono font-semibold"
                  min="0"
                />
                <span className="text-[11px] text-[#86868b] mt-1 block">
                  Threshold: Packages &le; $800 clear completely duty-free under Section 321.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Air / Ocean Freight Charges (USD)
                </label>
                <input
                  type="number"
                  aria-label="Air or Ocean Freight Charges in USD"
                  value={freightCostUsd}
                  onChange={(e) => setFreightCostUsd(Number(e.target.value) || 0)}
                  className="apple-input w-full font-mono font-semibold"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Destination US State
                </label>
                <input
                  type="text"
                  aria-label="Destination US State"
                  value={usState}
                  onChange={(e) => setUsState(e.target.value)}
                  className="apple-input w-full font-medium"
                />
              </div>
            </div>

            {/* Apple Blue Calculate Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCalculate}
                className="apple-calculate-btn"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Landed Cost &amp; Tariff</span>
              </button>
            </div>

            {/* Section 321 Rule Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
              isSection321Eligible
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/60 border-amber-200 text-amber-900'
            }`}>
              {isSection321Eligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <strong className="font-semibold">{isSection321Eligible ? 'Section 321 Qualified: $0.00 US Duty Payable' : 'Standard Commercial Formal Entry Required'}</strong>
                <p className="mt-0.5 text-[#86868b]">
                  {isSection321Eligible
                    ? `Consignment value ($${consignmentValueUsd}) is under the $800 daily per-consignee threshold. Clears US Customs duty-free with expedited courier clearance.`
                    : `Consignment value ($${consignmentValueUsd}) exceeds $800. Regular CBP tariff rate of ${category.standardDutyPercent}% applies at entry.`}
                </p>
              </div>
            </div>
          </div>

          {/* Liquid Glass Landed Cost Breakdown */}
          <div className="apple-result-box p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <span className="text-xs font-semibold text-[#86868b]">US Landed Assessment</span>
                <span className="text-xs font-mono text-[#0071e3] font-semibold">HTS {category.code}</span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Product FOB Value:</span>
                  <span className="apple-metric-val">${consignmentValueUsd.toLocaleString()}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">International Freight:</span>
                  <span className="apple-metric-val">${freightCostUsd.toLocaleString()}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">US Customs Duty:</span>
                  <span className="font-mono font-semibold text-[#0071e3]">
                    {isSection321Eligible ? '$0.00 (Exempt)' : `$${calculatedDuty.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-black/[0.06] flex justify-between items-center text-sm font-semibold">
                  <span className="text-[#1d1d1f]">Total Landed Cost:</span>
                  <span className="font-mono text-[#0071e3] font-bold text-lg">${totalLandedCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-white/70 border border-black/[0.04] text-[11px] text-[#86868b] space-y-1">
                <span className="text-[#0071e3] font-semibold block">US Buyer Advantage:</span>
                <p>
                  Surgical instruments exported from Sialkot enjoy 0.0% general duty into the US under HTS 9018, making evonix an exceptionally cost-effective manufacturing partner.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Print Landed Cost Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
