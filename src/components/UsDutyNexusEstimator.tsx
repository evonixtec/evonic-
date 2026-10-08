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
  Info
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

  const category = HTS_CATEGORIES[selectedHtsIndex];
  const isSection321Eligible = consignmentValueUsd <= 800; // Section 321 threshold is $800
  const dutiableAmount = isSection321Eligible ? 0 : consignmentValueUsd;
  const calculatedDuty = (dutiableAmount * category.standardDutyPercent) / 100;
  const totalLandedCost = consignmentValueUsd + freightCostUsd + calculatedDuty;

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                North America &amp; US CBP Trade Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">19 U.S.C. § 1321 (Section 321)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              US Customs Duty &amp; Section 321 De Minimis Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Calculate US Customs tariffs, verify duty-free clearance under the $800 Section 321 rule, and estimate landed costs for US corporate buyers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Consignment &amp; Commodity Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Category &amp; US HTS Tariff Code
                </label>
                <select
                  aria-label="HTS Tariff Classification Category"
                  value={selectedHtsIndex}
                  onChange={(e) => setSelectedHtsIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                >
                  {HTS_CATEGORIES.map((cat, idx) => (
                    <option key={cat.code} value={idx}>
                      {cat.name} ({cat.code}) - {cat.standardDutyPercent}% Duty
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {category.description}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Declared Commercial Invoice Value (FOB / USD)
                </label>
                <input
                  type="number"
                  aria-label="Declared Commercial Invoice Value in USD"
                  value={consignmentValueUsd}
                  onChange={(e) => setConsignmentValueUsd(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold"
                  min="0"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Threshold: Packages &le; $800 clear completely duty-free under Section 321.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Air / Ocean Freight Charges (USD)
                </label>
                <input
                  type="number"
                  aria-label="Air or Ocean Freight Charges in USD"
                  value={freightCostUsd}
                  onChange={(e) => setFreightCostUsd(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination US State
                </label>
                <input
                  type="text"
                  aria-label="Destination US State"
                  value={usState}
                  onChange={(e) => setUsState(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                />
              </div>
            </div>

            {/* Section 321 Rule Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isSection321Eligible
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              {isSection321Eligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <strong>{isSection321Eligible ? 'Section 321 Qualified: $0.00 US Duty Payable' : 'Standard Commercial Formal Entry Required'}</strong>
                <p className="mt-0.5">
                  {isSection321Eligible
                    ? `Consignment value ($${consignmentValueUsd}) is under the $800 daily per-consignee threshold. Clears US Customs duty-free with expedited courier clearance.`
                    : `Consignment value ($${consignmentValueUsd}) exceeds $800. Regular CBP tariff rate of ${category.standardDutyPercent}% applies at entry.`}
                </p>
              </div>
            </div>
          </div>

          {/* Landed Cost Breakdown */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">US Landed Assessment</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">HTS {category.code}</span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Product FOB Value:</span>
                  <span className="font-mono font-bold">${consignmentValueUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>International Freight:</span>
                  <span className="font-mono font-bold">${freightCostUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>US Customs Duty:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {isSection321Eligible ? '$0.00 (Exempt)' : `$${calculatedDuty.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Landed Cost:</span>
                  <span className="font-mono text-lg text-emerald-400">${totalLandedCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="text-emerald-400 font-bold block">US Buyer Advantage:</span>
                <p>
                  Surgical instruments exported from Sialkot enjoy 0.0% general duty into the US under HTS 9018, making evonix an exceptionally cost-effective manufacturing partner.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Landed Cost Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
