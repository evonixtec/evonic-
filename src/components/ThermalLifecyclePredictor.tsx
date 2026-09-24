import React, { useState } from 'react';
import {
  Thermometer,
  Zap,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Battery,
  Fan
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface LaptopProfile {
  id: string;
  category: string;
  name: string;
  baseTdp: number;
  stockPeakTemp: number;
  degradedTemp: number;
  evonixRepasteTemp: number;
  stockCinebench: number;
  throttledCinebench: number;
  restoredCinebench: number;
}

const LAPTOP_PROFILES: LaptopProfile[] = [
  {
    id: 'dell-xps',
    category: 'Ultrabook & CAD Workstation',
    name: 'Dell XPS 15 / Precision 5570 (Intel Core i7/i9)',
    baseTdp: 45,
    stockPeakTemp: 78,
    degradedTemp: 98,
    evonixRepasteTemp: 68,
    stockCinebench: 13800,
    throttledCinebench: 9600,
    restoredCinebench: 14200
  },
  {
    id: 'lenovo-legion',
    category: 'High-End Gaming & 3D Render',
    name: 'Lenovo Legion 5 / 7 Pro (AMD Ryzen 7 / RTX 4070)',
    baseTdp: 80,
    stockPeakTemp: 82,
    degradedTemp: 101,
    evonixRepasteTemp: 71,
    stockCinebench: 16500,
    throttledCinebench: 11800,
    restoredCinebench: 17100
  },
  {
    id: 'hp-elitebook',
    category: 'Corporate & Factory Office',
    name: 'HP EliteBook 840 G8 / G9 (Core i5 / i7)',
    baseTdp: 28,
    stockPeakTemp: 72,
    degradedTemp: 93,
    evonixRepasteTemp: 62,
    stockCinebench: 6800,
    throttledCinebench: 4700,
    restoredCinebench: 7100
  },
  {
    id: 'macbook-pro',
    category: 'Apple Silicon Studio',
    name: 'Apple MacBook Pro 14/16 (M1 / M2 / M3 Pro)',
    baseTdp: 35,
    stockPeakTemp: 70,
    degradedTemp: 94,
    evonixRepasteTemp: 63,
    stockCinebench: 12200,
    throttledCinebench: 9800,
    restoredCinebench: 12400
  }
];

interface ThermalLifecyclePredictorProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const ThermalLifecyclePredictor: React.FC<ThermalLifecyclePredictorProps> = ({ onOpenQuote }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('dell-xps');
  const [usageMonths, setUsageMonths] = useState<number>(18); // 1 to 48 months
  const [dustEnvironment, setDustEnvironment] = useState<'low' | 'medium' | 'high'>('high'); // Sialkot industrial setting defaults to medium/high

  const currentProfile = LAPTOP_PROFILES.find((p) => p.id === selectedProfileId) || LAPTOP_PROFILES[0];

  // Dynamic scientific estimation calculations
  const dustFactor = dustEnvironment === 'high' ? 1.5 : dustEnvironment === 'medium' ? 1.2 : 1.0;
  const degradationPct = Math.min(Math.round(((usageMonths / 24) * 28 * dustFactor)), 38);
  const currentTemp = Math.min(Math.round(currentProfile.stockPeakTemp + (degradationPct * 0.72)), 102);
  const perfLossPct = Math.min(Math.round(degradationPct * 0.95), 35);
  const batteryHealthImpact = Math.min(Math.round((usageMonths / 12) * 11 * (currentTemp > 85 ? 1.4 : 1.0)), 42);

  const isCriticalThrottle = currentTemp >= 90;

  return (
    <section id="thermal-lifecycle-predictor" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-800">
            <Thermometer className="w-3.5 h-3.5 text-orange-400" />
            <span>Evonix Thermal Engineering Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            CPU/GPU Thermal Throttling & Paste Degradation Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Factory thermal paste turns into dry cement within 12 to 18 months, especially in industrial environments. Calculate how much rendering speed and battery life your laptop has lost, and see the verified Arctic MX-6 recovery numbers.
          </p>
        </div>

        {/* Profile Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {LAPTOP_PROFILES.map((prof) => {
            const isSelected = prof.id === selectedProfileId;
            return (
              <button
                key={prof.id}
                onClick={() => setSelectedProfileId(prof.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg scale-[1.02]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80 mb-1">
                  {prof.category}
                </div>
                <div className="text-xs font-bold line-clamp-1">
                  {prof.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Controls & Live Scientific Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          {/* Left Column: Sliders and Inputs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-2">
                <span>Usage Time Since Purchase / Last Service:</span>
                <span className="font-mono text-red-400 text-sm">{usageMonths} Months</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                value={usageMonths}
                onChange={(e) => setUsageMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Brand New (1 Month)</span>
                <span>1 Year</span>
                <span>2 Years</span>
                <span>4 Years Heavy Duty</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-200 mb-2">
                Working Atmosphere / Environment:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDustEnvironment('low')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    dustEnvironment === 'low'
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Air Conditioned
                </button>
                <button
                  type="button"
                  onClick={() => setDustEnvironment('medium')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    dustEnvironment === 'medium'
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Normal Office
                </button>
                <button
                  type="button"
                  onClick={() => setDustEnvironment('high')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    dustEnvironment === 'high'
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Industrial / Factory
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {dustEnvironment === 'high'
                  ? 'Sialkot Daska Road & Small Industrial Estate factories have higher airborne particles that clog fin stacks faster.'
                  : 'Indoor dust fibers still degrade thermal conductivity over 12 months.'}
              </p>
            </div>

            {/* Diagnostic Alert Box */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isCriticalThrottle
                ? 'bg-red-950/40 border-red-800 text-red-200'
                : 'bg-amber-950/40 border-amber-800 text-amber-200'
            }`}>
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-red-500" />
                <span>Thermal Verdict: {isCriticalThrottle ? 'CRITICAL THERMAL THROTTLING' : 'MODERATE THERMAL EFFICIENCY LOSS'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Your CPU clocks are down-throttling by approximately <strong className="text-red-400">{perfLossPct}%</strong> under load. The fans run at 100% acoustic RPM trying to push heat through baked thermal paste.
              </p>
            </div>
          </div>

          {/* Right Column: Comparison Gauges & Solution Card */}
          <div className="lg:col-span-6 space-y-5">
            {/* Live Bench Comparison Card */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Estimated Thermal Metrics</span>
                <span className="text-[10px] font-mono text-emerald-400">Scientific Model</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Current Peak Temp:</span>
                  <span className={`font-mono text-2xl font-black ${currentTemp >= 90 ? 'text-red-500' : 'text-amber-400'}`}>
                    {currentTemp}°C
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Under Blender/CAD load</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wide block">After Evonix Overhaul:</span>
                  <span className="font-mono text-2xl font-black text-emerald-300">
                    {currentProfile.evonixRepasteTemp}°C
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Drop of ~{currentTemp - currentProfile.evonixRepasteTemp}°C</span>
                </div>
              </div>

              {/* Performance Recovery Bar */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Processing Speed Retained:</span>
                  <span className="font-mono font-bold text-amber-400">{100 - perfLossPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${100 - perfLossPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Overhaul Guarantee & Book Button */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Evonix Pure Cold Bench Package (PKR 2,500)</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>High-viscosity Arctic MX-6 German compound application</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Heatsink copper cold-plate mirror polish and ultrasonic fin decontamination</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VRM thermal pad replacement with Japanese Fujipoly pads</span>
                </li>
              </ul>

              <button
                onClick={() => onOpenQuote?.(`Thermal Paste Overhaul: ${currentProfile.name}`)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>Book Thermal Overhaul & Silence Laptop Fans</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
