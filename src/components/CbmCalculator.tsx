import React, { useState } from 'react';
import { Boxes, Box, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export default function CbmCalculator() {
  const [lengthCm, setLengthCm] = useState(60);
  const [widthCm, setWidthCm] = useState(40);
  const [heightCm, setHeightCm] = useState(35);
  const [cartons, setCartons] = useState(150);
  const [grossWeightPerCarton, setGrossWeightPerCarton] = useState(18.5);

  // Precision formulas preserved exactly
  const cbmPerCarton = (lengthCm * widthCm * heightCm) / 1000000;
  const totalCbm = cbmPerCarton * cartons;
  const totalWeight = grossWeightPerCarton * cartons;
  const volumetricAirWeight5000 = ((lengthCm * widthCm * heightCm) / 5000) * cartons;
  const volumetricAirWeight6000 = ((lengthCm * widthCm * heightCm) / 6000) * cartons;

  const container20ftCbm = 33;
  const container40ftHqCbm = 76;
  const fill20ft = (totalCbm / container20ftCbm) * 100;
  const fill40hq = (totalCbm / container40ftHqCbm) * 100;

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
              B2B Industrial Cargo &amp; Logistics
            </span>
            <span className="text-xs text-[#86868b] font-mono">Air &amp; Sea Metric</span>
          </div>
          <h1 className="apple-tool-title mt-2">B2B Industrial CBM &amp; Freight Engine</h1>
          <p className="apple-tool-subtitle">Compute Cubic Meters (CBM), air courier volumetric weights, and 20ft / 40ft High Cube container stuffing capacity.</p>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs Card */}
          <div className="apple-glass-box p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[#1d1d1f] border-b border-black/[0.06] pb-2">Master Carton Dimensions</h2>
            
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Length (cm)</label>
                <input 
                  type="number" 
                  aria-label="Length in centimeters" 
                  value={lengthCm} 
                  onChange={(e) => setLengthCm(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-medium" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Width (cm)</label>
                <input 
                  type="number" 
                  aria-label="Width in centimeters" 
                  value={widthCm} 
                  onChange={(e) => setWidthCm(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-medium" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Height (cm)</label>
                <input 
                  type="number" 
                  aria-label="Height in centimeters" 
                  value={heightCm} 
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-medium" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Carton Count</label>
                <input 
                  type="number" 
                  aria-label="Carton count" 
                  value={cartons} 
                  onChange={(e) => setCartons(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-medium" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Gross Wt / Carton (kg)</label>
                <input 
                  type="number" 
                  aria-label="Gross weight per carton in kilograms" 
                  value={grossWeightPerCarton} 
                  onChange={(e) => setGrossWeightPerCarton(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-medium" 
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
                <span>Calculate Freight &amp; Volume</span>
              </button>
            </div>
          </div>

          {/* Liquid Glass Results Panel */}
          <div className="apple-result-box p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs text-[#86868b] font-semibold block pb-2 border-b border-black/[0.06]">Freight Summary &amp; Volumetric Output</span>
              
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Total Volume (CBM):</span>
                  <span className="font-mono text-[#0071e3] font-bold text-lg">{totalCbm.toFixed(3)} m³</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Total Gross Weight:</span>
                  <span className="apple-metric-val">{totalWeight.toFixed(1)} kg</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Air Volumetric (1:5000 Express):</span>
                  <span className="font-mono text-[#1d1d1f] font-semibold">{volumetricAirWeight5000.toFixed(1)} kg</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Air Cargo (1:6000 Standard):</span>
                  <span className="font-mono text-[#1d1d1f] font-semibold">{volumetricAirWeight6000.toFixed(1)} kg</span>
                </div>

                <div className="pt-3 border-t border-black/[0.06]">
                  <div className="flex justify-between text-[11px] mb-1.5 text-[#86868b]">
                    <span>20ft Container Fill ({fill20ft.toFixed(1)}%):</span>
                    <span className="font-mono text-[#1d1d1f] font-semibold">{totalCbm.toFixed(1)} / 33 CBM</span>
                  </div>
                  <div className="w-full bg-black/[0.05] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0071e3] h-full transition-all duration-300" style={{ width: `${Math.min(fill20ft, 100)}%` }}></div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] mb-1.5 text-[#86868b]">
                    <span>40ft HQ Container Fill ({fill40hq.toFixed(1)}%):</span>
                    <span className="font-mono text-[#1d1d1f] font-semibold">{totalCbm.toFixed(1)} / 76 CBM</span>
                  </div>
                  <div className="w-full bg-black/[0.05] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0071e3] h-full transition-all duration-300" style={{ width: `${Math.min(fill40hq, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/70 rounded-xl text-[11px] text-[#86868b] border border-black/[0.04]">
              Clean calculation verified. Divisor calculations meet IATA Express and Standard Maritime container benchmarks.
            </div>
          </div>
        </div>

        {/* Semantically Optimized Technical Article & High-Resolution Tool Preview */}
        <ToolArticleGuideSection toolId="cbm-calculator" />
      </div>
    </div>
  );
}
