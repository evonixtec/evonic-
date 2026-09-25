import React, { useState } from 'react';
import {
  Flame,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Sliders,
  ShieldCheck,
  Wrench,
  Sparkles,
  Info,
  Phone,
  Thermometer,
  Layers
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface CircuitComponent {
  id: string;
  name: string;
  designator: string;
  rail: string;
  opticalDescription: string;
  normalTemp: number; // in °C
  faultTemp: number; // in °C
  currentDraw: string; // e.g. "3.85 Amperes @ 1.2V injection"
  status: 'Critical Short Circuit' | 'Normal' | 'Warm Operating' | 'Standby';
  posX: number; // percentage 0-100
  posY: number; // percentage 0-100
  size: number; // size in px
  diagnosticInsight: string;
  repairMethod: string;
}

const MOTHERBOARD_COMPONENTS: CircuitComponent[] = [
  {
    id: 'comp-mlcc-short',
    name: '19V DC-IN Filtering Ceramic Capacitor (MLCC 0805)',
    designator: 'PC205',
    rail: '+19V_VIN / DC-IN Primary Rail',
    opticalDescription: 'Tiny 0805 surface-mount brown ceramic capacitor right beside the first power MOSFET.',
    normalTemp: 26.2,
    faultTemp: 88.6,
    currentDraw: '3.82 A @ 1.2V DC Bench Injection',
    status: 'Critical Short Circuit',
    posX: 38,
    posY: 42,
    size: 28,
    diagnosticInsight:
      'Internal dielectric layer cracked due to a sudden power generator surge in Sialkot, creating a dead 0.2 Ohm short to ground. Entire laptop is dead with zero power lights.',
    repairMethod:
      'Pinpointed in seconds via FLIR thermal camera. Safely desoldered using micro-soldering tweezers and replaced with OEM Murata 10uF 25V capacitor.'
  },
  {
    id: 'comp-charge-ic',
    name: 'SMBus Battery Charging Controller IC',
    designator: 'PU301 (ISL88739)',
    rail: '+3V_CHG / ACOK / DC-IN Gate Control',
    opticalDescription: '32-pin QFN square micro-controller IC controlling USB-C PD and battery switching.',
    normalTemp: 34.5,
    faultTemp: 41.2,
    currentDraw: '0.04 A (Normal Standby)',
    status: 'Normal',
    posX: 62,
    posY: 32,
    size: 34,
    diagnosticInsight:
      'Receiving steady 19V on VDD pin, correctly generating 3.3V ACOK high logic signal to the Embedded Controller.',
    repairMethod: 'Component healthy. No soldering required.'
  },
  {
    id: 'comp-vcore-mosfet',
    name: 'CPU VCORE High-Side DrMOS Switching Stage',
    designator: 'PQ801 (FDMF3035)',
    rail: '+VCC_CORE (0.85V - 1.15V)',
    opticalDescription: 'Power stage MOSFET pack supplying high current to Intel/AMD CPU processor cores.',
    normalTemp: 38.0,
    faultTemp: 64.8,
    currentDraw: '1.20 A (Switching Rail)',
    status: 'Warm Operating',
    posX: 25,
    posY: 68,
    size: 32,
    diagnosticInsight:
      'Phase 1 driver operating within thermal parameters under simulated bench test.',
    repairMethod: 'Monitored with thermal probe. Thermal pad refreshed with Arctic-grade 12.8 W/mK silicone pad.'
  },
  {
    id: 'comp-standby-regulator',
    name: '3.3V / 5V Dual Synchronous Step-Down Buck Converter',
    designator: 'PU501 (TPS51125)',
    rail: '+3.3V_ALW / +5V_ALW Standby Rails',
    opticalDescription: 'PWM controller that powers the laptop power button, BIOS chip, and keyboard controller in standby.',
    normalTemp: 31.0,
    faultTemp: 33.2,
    currentDraw: '0.02 A (Quiescent Current)',
    status: 'Standby',
    posX: 74,
    posY: 65,
    size: 30,
    diagnosticInsight:
      'Both 3.3V and 5V LDO linear regulators producing crisp, ripple-free voltages on our digital oscilloscope.',
    repairMethod: 'Component fully verified healthy.'
  }
];

export const ThermalHotspotInspector: React.FC = () => {
  const [viewMode, setViewMode] = useState<'thermal' | 'optical'>('thermal');
  const [activeComponent, setActiveComponent] = useState<CircuitComponent>(MOTHERBOARD_COMPONENTS[0]);
  const [injectionVolts, setInjectionVolts] = useState<number>(1.2);

  return (
    <section id="thermal-inspector" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-4 tracking-wide uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Advanced Micro-Electronics Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            FLIR Infrared Thermal Hotspot Short-Circuit Inspector
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Unskilled repair shops randomly blast motherboards with destructive heat guns, causing permanent multi-layer PCB warping.
            At Evonix Sialkot, we locate dead short circuits safely using <strong>regulated low-voltage injection & high-resolution infrared thermal imaging</strong>.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Non-destructive diagnosis on our workshop bench is 100% FREE!</span>
          </div>
        </div>

        {/* View Mode Toggle & Bench Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Camera Mode:</span>
            <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('thermal')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-r from-purple-600 via-red-600 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>FLIR Ironbow Thermal</span>
              </button>
              <button
                onClick={() => setViewMode('optical')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'optical'
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Optical True-Color PCB</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300">
              Bench DC Injection:{' '}
              <strong className="text-amber-400 font-mono">{injectionVolts.toFixed(1)}V DC</strong>
            </span>
            <input
              type="range"
              min="0.8"
              max="1.8"
              step="0.1"
              value={injectionVolts}
              onChange={(e) => setInjectionVolts(parseFloat(e.target.value))}
              className="w-28 accent-red-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Interactive Motherboard Thermal Canvas & Diagnostic Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Motherboard Interactive Board (SVG / Canvas Simulation) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 relative shadow-2xl overflow-hidden">
            {/* Camera Viewport Frame */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 select-none bg-slate-950">
              {/* Motherboard Graphic Background */}
              <div
                className={`w-full h-full transition-all duration-500 relative ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950'
                    : 'bg-[#0e2a1b]'
                }`}
              >
                {/* Circuit Grid Lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Simulated PCB Copper Traces & BGA Chips */}
                <div className="absolute top-[20%] left-[15%] w-[45%] h-[50%] border-2 border-dashed border-slate-600/40 rounded-xl" />
                <div className="absolute top-[25%] left-[20%] w-[35%] h-[40%] bg-slate-800/60 rounded-lg flex items-center justify-center border border-slate-600/30">
                  <span className="text-[10px] font-mono text-slate-500 tracking-widest">
                    PCH / CPU SOC
                  </span>
                </div>

                {/* Thermal Heat Signature Bloom for shorted capacitor */}
                {viewMode === 'thermal' && (
                  <div
                    className="absolute rounded-full pointer-events-none animate-pulse"
                    style={{
                      left: '38%',
                      top: '42%',
                      width: '130px',
                      height: '130px',
                      transform: 'translate(-50%, -50%)',
                      background:
                        'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,220,50,0.95) 20%, rgba(255,60,0,0.8) 45%, rgba(180,0,120,0.5) 70%, transparent 100%)',
                      filter: 'blur(10px)'
                    }}
                  />
                )}

                {/* Interactive Clickable Component Pins on Board */}
                {MOTHERBOARD_COMPONENTS.map((comp) => {
                  const isSelected = activeComponent.id === comp.id;
                  const isShort = comp.status === 'Critical Short Circuit';

                  return (
                    <button
                      key={comp.id}
                      onClick={() => setActiveComponent(comp)}
                      style={{
                        left: `${comp.posX}%`,
                        top: `${comp.posY}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute z-20 transition-all group cursor-pointer focus:outline-none ${
                        isSelected ? 'scale-125 ring-4 ring-white/80' : 'hover:scale-110'
                      }`}
                      title={`${comp.designator}: ${comp.name}`}
                    >
                      <div
                        className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold shadow-lg flex items-center gap-1 border ${
                          isShort
                            ? 'bg-red-600 text-white border-white animate-bounce'
                            : isSelected
                            ? 'bg-amber-500 text-black border-white'
                            : 'bg-slate-800/90 text-slate-200 border-slate-600'
                        }`}
                      >
                        <span>{comp.designator}</span>
                        <span className="text-[9px] opacity-80">
                          {viewMode === 'thermal' ? `${comp.faultTemp}°C` : 'Probe'}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Reticle / Crosshair Cursor Overlay */}
                <div
                  className="absolute pointer-events-none transition-all duration-300 z-10"
                  style={{
                    left: `${activeComponent.posX}%`,
                    top: `${activeComponent.posY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-16 h-16 border border-white/60 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                </div>

                {/* FLIR Thermal Temperature Scale Sidebar */}
                {viewMode === 'thermal' && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/20 text-[10px] font-mono flex flex-col items-center gap-1 z-20">
                    <span className="text-white font-bold">89°C MAX</span>
                    <div className="w-3 h-28 rounded-full bg-gradient-to-b from-white via-yellow-400 via-red-600 via-purple-700 to-indigo-950 border border-white/40" />
                    <span className="text-slate-400">22°C AMB</span>
                  </div>
                )}

                {/* HUD Overlay Stats */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-mono text-slate-200 z-20">
                  <span>Target: </span>
                  <strong className="text-amber-400">{activeComponent.designator}</strong>
                  <span className="mx-1.5 text-slate-500">|</span>
                  <span>Temp: </span>
                  <strong
                    className={
                      activeComponent.faultTemp > 70
                        ? 'text-red-400 font-bold'
                        : 'text-emerald-400 font-bold'
                    }
                  >
                    {activeComponent.faultTemp}°C
                  </strong>
                </div>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Click any component tag on the motherboard to inspect circuit thermals.</span>
              </span>
              <span className="font-mono text-slate-500 text-[11px]">FLIR Thermal Resolution: 320x240</span>
            </div>
          </div>

          {/* Right: Component Diagnostic Report Card */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">
                    Circuit Identifier: {activeComponent.designator}
                  </span>
                  <h3 className="text-lg font-bold text-white">{activeComponent.name}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap ${
                    activeComponent.status === 'Critical Short Circuit'
                      ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                      : 'bg-slate-800 text-emerald-400 border border-slate-700'
                  }`}
                >
                  {activeComponent.status}
                </span>
              </div>

              {/* Thermal & Electrical Readings */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Thermometer className="w-3 h-3 text-red-400" />
                    <span>Peak Thermal Heat</span>
                  </span>
                  <span className="text-xl font-black text-red-400 font-mono">
                    {activeComponent.faultTemp}°C
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    (Normal: {activeComponent.normalTemp}°C)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Current Draw</span>
                  </span>
                  <span className="text-xs font-bold text-amber-300 font-mono block leading-snug">
                    {activeComponent.currentDraw}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Bench Power Supply</span>
                </div>
              </div>

              {/* Technical Insights */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Power Rail Specification
                  </span>
                  <p className="text-slate-200 font-mono text-xs">{activeComponent.rail}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Sialkot Engineering Diagnosis
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {activeComponent.diagnosticInsight}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Safe Bench Micro-Soldering Fix
                  </span>
                  <p className="text-emerald-200 text-xs leading-relaxed">
                    {activeComponent.repairMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left text-[11px] text-slate-400">
                Bench Diagnosis:{' '}
                <strong className="text-emerald-400">100% Free • No Fix No Fee</strong>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Evonix Lab, I saw your Thermal Hotspot Inspector for component ${activeComponent.designator} (${activeComponent.name}). My laptop is completely dead and I want to bring it for free bench diagnostic.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Book Free Bench Thermal Check</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
