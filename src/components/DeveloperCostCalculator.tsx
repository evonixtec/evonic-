import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, Users, ShieldCheck } from 'lucide-react';

export interface DeveloperCostCalculatorProps {
  onOpenQuote?: (serviceType?: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const DeveloperCostCalculator: React.FC<DeveloperCostCalculatorProps> = () => {
  const [engineersCount, setEngineersCount] = useState(3);
  const [seniority, setSeniority] = useState<'mid' | 'senior' | 'lead'>('senior');
  const [targetMarket, setTargetMarket] = useState<'USA' | 'UK' | 'UAE'>('USA');

  const marketSalaries: Record<string, { mid: number; senior: number; lead: number }> = {
    USA: { mid: 110000, senior: 145000, lead: 175000 },
    UK: { mid: 65000, senior: 88000, lead: 110000 },
    UAE: { mid: 60000, senior: 80000, lead: 105000 },
  };

  const evonixRetainers = {
    mid: 22000,
    senior: 28800,
    lead: 36000,
  };

  const inHousePerEngineer = marketSalaries[targetMarket][seniority];
  const evonixPerEngineer = evonixRetainers[seniority];
  const totalInHouse = inHousePerEngineer * engineersCount;
  const totalEvonix = evonixPerEngineer * engineersCount;
  const netSavings = totalInHouse - totalEvonix;
  const savingsPercent = ((netSavings / totalInHouse) * 100).toFixed(0);

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
              Workforce Budgeting Engine
            </span>
            <span className="text-xs text-slate-500 font-mono">USA / UK / UAE vs Dedicated Sialkot Engineers</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Dedicated Developer Cost Calculator</h1>
          <p className="text-xs sm:text-sm text-slate-600">Benchmark in-house tech hiring burdens against dedicated offshore engineering squads in Sialkot.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b pb-2">Staffing Parameters</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Benchmark Market</label>
                <select aria-label="Benchmark Market" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-bold">
                  <option value="USA">United States (USD $)</option>
                  <option value="UK">United Kingdom (GBP £ equiv in USD)</option>
                  <option value="UAE">United Arab Emirates / Dubai (USD)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Developer Seniority Level</label>
                <select aria-label="Developer Seniority Level" value={seniority} onChange={(e) => setSeniority(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-bold">
                  <option value="mid">Mid-Level Engineer (3-5 Yrs)</option>
                  <option value="senior">Senior Full-Stack Engineer (6-9 Yrs)</option>
                  <option value="lead">Tech Lead / Architect (10+ Yrs)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Engineers Team Size: {engineersCount}</label>
                <input aria-label="Engineers Team Size" type="range" min="1" max="15" value={engineersCount} onChange={(e) => setEngineersCount(Number(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
            <span className="text-xs text-slate-400 font-bold block pb-2 border-b border-slate-800">Annual Budget Comparison</span>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span>{targetMarket} In-House Payroll:</span><span className="font-mono text-slate-300 font-bold">${totalInHouse.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>evonix Dedicated Offshore:</span><span className="font-mono text-emerald-400 font-bold">${totalEvonix.toLocaleString()}</span></div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-bold">
                <span>Annual Capital Saved:</span>
                <span className="font-mono text-emerald-400">${netSavings.toLocaleString()} ({savingsPercent}%)</span>
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-slate-300 space-y-1">
              <span className="text-emerald-400 font-bold block">Zero Recruitment Overhead:</span>
              <p>Includes hardware workstation, high-speed fiber internet, continuous power backup, and full IP NDA protection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
