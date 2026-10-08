import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Search,
  Activity,
  ArrowRight,
  Info,
  Maximize2,
  RefreshCw,
  Sliders,
  Flame,
  Radio,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface DiagnosticPreset {
  id: string;
  name: string;
  category: 'laptop' | 'macbook' | 'desktop' | 'pos-printer';
  symptom: string;
  affectedRail: string;
  expectedOhms: string;
  measuredOhms: string;
  failedComponent: string;
  schematicRef: string;
  rootCause: string;
  recommendedFix: string;
  probabilityScore: number;
  estTurnaround: string;
  estCostPkr: string;
}

const DIAGNOSTIC_PRESETS: DiagnosticPreset[] = [
  {
    id: 'skt-pwr-short',
    name: '19V DC-IN Main Rail Short to Ground (Dead Laptop)',
    category: 'laptop',
    symptom: 'Charger LED blinks or shuts off immediately upon plugging in. Laptop is completely cold & unresponsive.',
    affectedRail: '+19V_VIN (B+ System Rail)',
    expectedOhms: '> 100 kΩ (High Impedance)',
    measuredOhms: '0.8 Ω (Direct Short Circuit)',
    failedComponent: 'High-Side N-Channel Input MOSFET (PQ301) / Ceramic Filter Cap (PC312)',
    schematicRef: 'PU301 / PQ301 / PQ302 Charging Circuit',
    rootCause: 'Electrical transient surge from industrial generator transfer switch on Daska/Paris Road blew the 0805 high-voltage capacitor.',
    recommendedFix: 'Micro-soldering replacement of shorted ceramic capacitor and PQ301 dual N-Channel MOSFET using Quick 861DW hot air station.',
    probabilityScore: 98,
    estTurnaround: '2 - 3 Hours',
    estCostPkr: 'PKR 3,500 - 5,500',
  },
  {
    id: 'skt-me-region',
    name: 'Intel 30-Minute Automatic Shutdown (ME Region Bug)',
    category: 'laptop',
    symptom: 'Laptop turns on normally and boots Windows, but fan runs at 100% and system abruptly shuts off at exactly 30:00 minutes.',
    affectedRail: '+3.3V_SPI (BIOS ROM VCC)',
    expectedOhms: 'Normal Logic High (3.3V)',
    measuredOhms: '3.3V (Voltages Normal, Data Corrupt)',
    failedComponent: 'Intel Management Engine (CSME) Firmware in Winbond 16MB SPI EEPROM',
    schematicRef: 'U2801 (W25Q128FV) SPI Bus',
    rootCause: 'Corrupted Intel ME firmware region caused by incomplete Windows 11 BIOS update during sudden factory load shedding.',
    recommendedFix: 'Direct desoldering of SOIC-8 BIOS flash, clean injection of Intel ME Repository using RT809F EEPROM programmer, and resoldering.',
    probabilityScore: 99,
    estTurnaround: 'Same-Day (2 Hours)',
    estCostPkr: 'PKR 2,500 - 4,000',
  },
  {
    id: 'skt-3v5v-standby',
    name: '+3.3V / +5V Standby Always Rail Collapse',
    category: 'laptop',
    symptom: 'No charging light, power button has no effect, 19V is reaching motherboard but 3.3V power switch pin measures 0V.',
    affectedRail: '+3.3VALW / +5VALW Standby Buck',
    expectedOhms: '+3.3V: > 10 kΩ | +5V: > 20 kΩ',
    measuredOhms: '+3.3VALW: 1.4 Ω (Short to Ground)',
    failedComponent: 'Embedded Controller (ITE IT8586E / ENE KB9022) or TPS51285 Standby PWM IC',
    schematicRef: 'PU401 (TPS51285B) Dual Step-Down',
    rootCause: 'Low-impedance breakdown inside the I/O Super I/O chip caused by static ESD discharge from dirty USB port.',
    recommendedFix: 'Replacement of programmable EC SIO controller (IT8586) and flashing internal 128KB ROM via Vertyanov JTAG programmer.',
    probabilityScore: 94,
    estTurnaround: '24 Hours',
    estCostPkr: 'PKR 4,500 - 7,000',
  },
  {
    id: 'skt-backlight-fuse',
    name: 'No Display Backlight (Faint Logo Visible Under Torch)',
    category: 'laptop',
    symptom: 'Laptop boots with audio chimes and external HDMI display works, but laptop screen remains totally dark with faint icons.',
    affectedRail: '+EDP_BKLT_VCC (19V Backlight Rail)',
    expectedOhms: '19.5V DC on Pin 1-3 of EDP Cable',
    measuredOhms: '0.0V (Blown Fuse F1)',
    failedComponent: 'Surface Mount Fast-Blow Fuse (F1 / 3A 32V) on LCD Connector',
    schematicRef: 'JEDP1 Display Header',
    rootCause: 'Screen cable plugged or unplugged while laptop battery was still connected, shorting the 19V backlight rail to data lines.',
    recommendedFix: 'Micro-soldering replacement of 0603 SMD fuse F1 and verification of backlight enable signal (BKLT_EN = 3.3V).',
    probabilityScore: 97,
    estTurnaround: '1 - 2 Hours',
    estCostPkr: 'PKR 2,500 - 3,500',
  },
  {
    id: 'skt-thermal-fuser',
    name: 'Thermal POS Printer Cutter Jam & Motor Under-Voltage',
    category: 'pos-printer',
    symptom: '80mm receipt printer red ERROR LED flashes rapidly, auto-cutter jams halfway through receipt, faint barcode print.',
    affectedRail: '+24V_PRN (Main Motor & Thermal Head Supply)',
    expectedOhms: '24.0V DC Stable Under Load',
    measuredOhms: '16.8V DC (Collapsed under thermal pulse)',
    failedComponent: 'Primary Electrolytic Filtering Capacitors (1000uF 35V) in Internal SMPS',
    schematicRef: 'PSU Secondary Buck & Driver Stepper IC',
    rootCause: 'Long continuous retail billing hours in high ambient summer temperatures dried out electrolytic capacitor electrolyte.',
    recommendedFix: 'Recapping SMPS secondary rail with 105°C low-ESR Japanese Nichicon capacitors and ultrasonic cleaner head flush.',
    probabilityScore: 96,
    estTurnaround: 'Same-Day (2 Hours)',
    estCostPkr: 'PKR 2,000 - 3,500',
  },
];

interface AiHardwareDiagnosticBoardProps {
  onOpenIntakePass: (faultTitle?: string) => void;
  onOpenQuote: (servicePrefill?: string) => void;
}

export const AiHardwareDiagnosticBoard: React.FC<AiHardwareDiagnosticBoardProps> = ({
  onOpenIntakePass,
  onOpenQuote,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DIAGNOSTIC_PRESETS[0].id);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'visualizer' | 'schematic' | 'bench-log'>('visualizer');

  const activePreset = DIAGNOSTIC_PRESETS.find((p) => p.id === selectedPresetId) || DIAGNOSTIC_PRESETS[0];

  const filteredPresets = DIAGNOSTIC_PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.symptom.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.affectedRail.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section id="ai-diagnostic-board" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-xs font-bold text-red-400">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>evonix AI Hardware Diagnostics & PCB Multimeter Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Component-Level Motherboard Fault Copilot
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Diagnose laptop, server, and POS hardware faults with precision. Inspect power rails, expected multimeter resistance values, and failed SMD components before opening your device.
          </p>
        </div>

        {/* Interactive Board Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Preset Symptom Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  <span>Verified Failure Profiles</span>
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  {DIAGNOSTIC_PRESETS.length} Profiles
                </span>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  aria-label="Search symptom or power rail"
                  placeholder="Search symptom, rail (+19V, +3.3V)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Preset List */}
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {filteredPresets.map((preset) => {
                  const isSelected = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-600/15 border-red-500/80 text-white shadow-md ring-1 ring-red-500'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono font-bold text-cyan-400">{preset.affectedRail}</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 uppercase">
                          {preset.category}
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-white line-clamp-1">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                        {preset.symptom}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: AI Circuit & Multimeter Diagnostic Bench (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              {/* Header with Probability & Turnaround */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                      Diagnostic Profile
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Schematic Node: {activePreset.schematicRef}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activePreset.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Lab Repairability</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {activePreset.probabilityScore}%
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Bench Time</span>
                    <span className="text-sm font-bold text-cyan-300">
                      {activePreset.estTurnaround}
                    </span>
                  </div>
                </div>
              </div>

              {/* Multimeter Probing Station (Visual Card) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-amber-400" />
                    <span>Fluke 87V Digital Multimeter Live Test Point</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Mode: Diode & Resistance (Ω)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Expected Reading */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                      Factory Healthy Reading:
                    </span>
                    <div className="text-lg sm:text-xl font-mono font-black text-emerald-300">
                      {activePreset.expectedOhms}
                    </div>
                    <p className="text-[11px] text-slate-400">Normal working motherboard impedance</p>
                  </div>

                  {/* Measured Reading */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-red-500/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider">
                      Damaged Board Reading:
                    </span>
                    <div className="text-lg sm:text-xl font-mono font-black text-red-400">
                      {activePreset.measuredOhms}
                    </div>
                    <p className="text-[11px] text-slate-400">Indicates electrical breakdown on rail</p>
                  </div>
                </div>
              </div>

              {/* Diagnostic AI Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-red-400 uppercase text-[10px] tracking-wider block">
                    Defective Component Identified:
                  </span>
                  <div className="text-sm font-extrabold text-white">
                    {activePreset.failedComponent}
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-800">
                    <strong>Root Cause:</strong> {activePreset.rootCause}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                    Engineering Lab Procedure:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {activePreset.recommendedFix}
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Est. Repair Cost:</span>
                    <span className="font-bold text-white">{activePreset.estCostPkr}</span>
                  </div>
                </div>
              </div>

              {/* Direct Action Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Free Initial Bench Inspection at Paris Road Lab</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenIntakePass(activePreset.name)}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Generate Free Bench Pass for this Fault</span>
                  </button>

                  <button
                    onClick={() => onOpenQuote(`Chip-Level Repair: ${activePreset.name}`)}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Inquire On WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
