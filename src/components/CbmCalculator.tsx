import React, { useState } from 'react';
import { Boxes, Box, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CbmCalculator() {
  const [lengthCm, setLengthCm] = useState(60);
  const [widthCm, setWidthCm] = useState(40);
  const [heightCm, setHeightCm] = useState(35);
  const [cartons, setCartons] = useState(150);
  const [grossWeightPerCarton, setGrossWeightPerCarton] = useState(18.5);

  const cbmPerCarton = (lengthCm * widthCm * heightCm) / 1000000;
  const totalCbm = cbmPerCarton * cartons;
  const totalWeight = grossWeightPerCarton * cartons;
  const volumetricAirWeight5000 = ((lengthCm * widthCm * heightCm) / 5000) * cartons;
  const volumetricAirWeight6000 = ((lengthCm * widthCm * heightCm) / 6000) * cartons;

  const container20ftCbm = 33;
  const container40ftHqCbm = 76;
  const fill20ft = (totalCbm / container20ftCbm) * 100;
  const fill40hq = (totalCbm / container40ftHqCbm) * 100;

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 uppercase tracking-wider">
              B2B Industrial Cargo &amp; Logistics
            </span>
            <span className="text-xs text-slate-500 font-mono">Air &amp; Sea Metric</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">B2B Industrial CBM &amp; Freight Engine</h1>
          <p className="text-xs sm:text-sm text-slate-600">Compute Cubic Meters (CBM), air courier volumetric weights, and 20ft / 40ft High Cube container stuffing capacity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b pb-2">Master Carton Dimensions</h2>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><label className="text-slate-600 font-semibold">Length (cm)</label><input type="number" aria-label="Length in centimeters" value={lengthCm} onChange={(e) => setLengthCm(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 border rounded font-mono" /></div>
              <div><label className="text-slate-600 font-semibold">Width (cm)</label><input type="number" aria-label="Width in centimeters" value={widthCm} onChange={(e) => setWidthCm(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 border rounded font-mono" /></div>
              <div><label className="text-slate-600 font-semibold">Height (cm)</label><input type="number" aria-label="Height in centimeters" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 border rounded font-mono" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><label className="text-slate-600 font-semibold">Carton Count</label><input type="number" aria-label="Carton count" value={cartons} onChange={(e) => setCartons(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 border rounded font-mono" /></div>
              <div><label className="text-slate-600 font-semibold">Gross Wt / Carton (kg)</label><input type="number" aria-label="Gross weight per carton in kilograms" value={grossWeightPerCarton} onChange={(e) => setGrossWeightPerCarton(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 border rounded font-mono" /></div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
            <span className="text-xs text-slate-400 font-bold block pb-2 border-b border-slate-800">Freight Summary</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span>Total Volume (CBM):</span><span className="font-mono text-cyan-400 font-bold text-base">{totalCbm.toFixed(3)} m³</span></div>
              <div className="flex justify-between"><span>Total Gross Weight:</span><span className="font-mono">{totalWeight.toFixed(1)} kg</span></div>
              <div className="flex justify-between"><span>Air Volumetric (1:5000 Express):</span><span className="font-mono text-amber-400 font-bold">{volumetricAirWeight5000.toFixed(1)} kg</span></div>
              <div className="flex justify-between"><span>Air Cargo (1:6000 Standard):</span><span className="font-mono text-slate-300">{volumetricAirWeight6000.toFixed(1)} kg</span></div>
              <div className="pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[11px] mb-1"><span>20ft Container Fill ({fill20ft.toFixed(1)}%):</span><span>{totalCbm.toFixed(1)} / 33 CBM</span></div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full" style={{ width: `${Math.min(fill20ft, 100)}%` }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
