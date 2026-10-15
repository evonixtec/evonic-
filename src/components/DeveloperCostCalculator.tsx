import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, Users, ShieldCheck } from 'lucide-react';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export interface DeveloperCostCalculatorProps {
  onOpenQuote?: (serviceType?: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const DeveloperCostCalculator: React.FC<DeveloperCostCalculatorProps> = ({ onOpenQuote }) => {
  const [engineersCount, setEngineersCount] = useState(3);
  const [seniority, setSeniority] = useState<'mid' | 'senior' | 'lead'>('senior');
  const [targetMarket, setTargetMarket] = useState<'USA' | 'UK' | 'UAE'>('USA');

  // Exact formulas preserved
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

  const [hasCalculated, setHasCalculated] = useState(true);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  return (
    <div className="py-8 min-h-screen apple-tool-layout text-[#1d1d1f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Apple Clean Header */}
        <div className="apple-glass-box p-6 sm:p-7">
          <div className="flex items-center gap-2">
            <span className="apple-badge">
              Workforce Budgeting Engine
            </span>
            <span className="text-xs text-[#86868b] font-mono">USA / UK / UAE vs Dedicated Sialkot Engineers</span>
          </div>
          <h1 className="apple-tool-title mt-2">Dedicated Developer Cost Calculator</h1>
          <p className="apple-tool-subtitle">Benchmark in-house tech hiring burdens against dedicated offshore engineering squads in Sialkot.</p>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs Card */}
          <div className="apple-glass-box p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#1d1d1f] border-b border-black/[0.06] pb-2">Staffing Parameters</h2>
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="text-[#86868b] font-medium block mb-1">Benchmark Market</label>
                <select 
                  aria-label="Benchmark Market" 
                  value={targetMarket} 
                  onChange={(e) => setTargetMarket(e.target.value as any)} 
                  className="apple-input w-full font-semibold"
                >
                  <option value="USA">United States (USD $)</option>
                  <option value="UK">United Kingdom (GBP £ equiv in USD)</option>
                  <option value="UAE">United Arab Emirates / Dubai (USD)</option>
                </select>
              </div>
              <div>
                <label className="text-[#86868b] font-medium block mb-1">Developer Seniority Level</label>
                <select 
                  aria-label="Developer Seniority Level" 
                  value={seniority} 
                  onChange={(e) => setSeniority(e.target.value as any)} 
                  className="apple-input w-full font-semibold"
                >
                  <option value="mid">Mid-Level Engineer (3-5 Yrs)</option>
                  <option value="senior">Senior Full-Stack Engineer (6-9 Yrs)</option>
                  <option value="lead">Tech Lead / Architect (10+ Yrs)</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[#86868b] font-medium">Engineers Team Size:</label>
                  <span className="font-mono font-semibold text-[#0071e3] text-xs">{engineersCount} Engineers</span>
                </div>
                <input 
                  aria-label="Engineers Team Size" 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={engineersCount} 
                  onChange={(e) => setEngineersCount(Number(e.target.value))} 
                  className="w-full accent-[#0071e3] cursor-pointer" 
                />
              </div>
            </div>

            {/* Apple Blue Calculate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCalculate}
                className="apple-calculate-btn"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Capital Savings</span>
              </button>
            </div>
          </div>

          {/* Liquid Glass Results Panel */}
          <div className="apple-result-box p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs text-[#86868b] font-semibold block pb-2 border-b border-black/[0.06]">Annual Budget Comparison</span>
              
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">{targetMarket} In-House Payroll:</span>
                  <span className="apple-metric-val">${totalInHouse.toLocaleString()}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">evonix Dedicated Offshore:</span>
                  <span className="font-mono text-[#0071e3] font-bold text-sm">${totalEvonix.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-black/[0.06] flex justify-between items-center text-sm font-semibold">
                  <span className="text-[#1d1d1f]">Annual Capital Saved:</span>
                  <span className="font-mono text-[#0071e3] font-bold text-lg">${netSavings.toLocaleString()} ({savingsPercent}%)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/70 rounded-xl text-[11px] text-[#86868b] border border-black/[0.04] space-y-1">
              <span className="text-[#0071e3] font-semibold block">Zero Recruitment Overhead:</span>
              <p>Includes hardware workstation, high-speed fiber internet, continuous power backup, and full IP NDA protection.</p>
            </div>
          </div>
        </div>

        {/* Semantically Optimized Technical Article & High-Resolution Tool Preview */}
        <ToolArticleGuideSection toolId="developer-cost-calculator" onOpenQuote={onOpenQuote} />
      </div>
    </div>
  );
};
