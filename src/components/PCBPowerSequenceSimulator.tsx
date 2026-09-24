import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Info,
  Phone,
  Flame,
  ArrowRight,
  Wrench
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface PowerRailStep {
  id: string;
  stepNumber: number;
  railName: string;
  nominalVoltage: string;
  typicalResistance: string;
  keyComponents: string;
  state: 'standby' | 'trigger' | 'vcore' | 'boot';
  healthyCondition: string;
  commonFailureReason: string;
  microSolderingFix: string;
}

const POWER_RAILS: PowerRailStep[] = [
  {
    id: 'dc-in',
    stepNumber: 1,
    railName: 'DC-IN Primary Power Rail',
    nominalVoltage: '19.5V / 20V (USB-C PD)',
    typicalResistance: '> 400 kΩ (High resistance to Ground)',
    keyComponents: 'Input fuse, PQ201 first N-Channel MOSFET, PQ202 reverse-polarity MOSFET, Current Sense Resistor (PR201)',
    state: 'standby',
    healthyCondition: 'Clean 19.5V passes through both input MOSFETs without dropping voltage. Gate voltage sits at ~25V via charging IC charge-pump.',
    commonFailureReason: 'Factory power generator voltage surge or faulty aftermarket charger punctures PQ201 MOSFET dielectric, causing dead short to ground (0.2 Ω).',
    microSolderingFix: 'Replace punctured high-side Vishay/AON MOSFET with OEM silicon. Clean charred copper PCB layers under 40x stereo microscope.'
  },
  {
    id: 'standby-alw',
    stepNumber: 2,
    railName: 'Always-On Standby Rail (+3.3VALW & +5VALW)',
    nominalVoltage: '+3.3V & +5.0V Constant',
    typicalResistance: '3.3V Rail > 15 kΩ | 5V Rail > 30 kΩ',
    keyComponents: 'Dual-phase PWM Buck Regulator (e.g. Richtek RT8205 / TPS51125), High & Low side MOSFET pairs, Solid inductors (L1 & L2)',
    state: 'standby',
    healthyCondition: 'Both 3.3V and 5V coils output stable ripple-free voltage even before pressing the laptop power button.',
    commonFailureReason: 'Ceramic bypass MLCC capacitor cracks from thermal stress, dragging the 3.3V rail to 0V. Power management IC heats up to 85°C.',
    microSolderingFix: 'Inject 1.5V @ 2A with DC lab power supply to thermal camera spot the shorted ceramic capacitor. Replace with 10µF 25V X7R ceramic.'
  },
  {
    id: 'ec-kbc',
    stepNumber: 3,
    railName: 'EC / SIO Controller & 32.768 kHz RTC Clock',
    nominalVoltage: '+3.3V VCC to EC Chip',
    typicalResistance: '> 8 kΩ on EC VCC Pin',
    keyComponents: 'Super I/O Controller (IT8586E / MEC1416 / KB9022), 32.768 kHz Crystal Oscillator, RTC CR2032 Circuit',
    state: 'trigger',
    healthyCondition: 'EC chip powers up, reads internal firmware or SPI Flash, and detects power button press (drops ON/OFF# pin from 3.3V to 0V momentarily).',
    commonFailureReason: 'Corrupted EC embedded firmware or liquid ingress around keyboard connector shorting the 32.768 kHz clock trace.',
    microSolderingFix: 'Reprogram EC chip via dedicated ITE/ENE programmer or replace oxidized 0201 pull-up resistor near RTC battery.'
  },
  {
    id: 'suspend-sleep',
    stepNumber: 4,
    railName: 'Secondary Sleep Rails (S5 ➔ S3 ➔ S0 Transition)',
    nominalVoltage: '+1.2V / +1.1V (DRAM) & +1.05V (PCH)',
    typicalResistance: 'DDR4 > 250 Ω | DDR5 > 120 Ω | PCH > 35 Ω',
    keyComponents: 'PCH Southbridge chip, RAM VDD controller (RT8207), SLP_S3# and SLP_S4# control logic',
    state: 'trigger',
    healthyCondition: 'EC signals PCH via PM_SLP_S3#; memory PWM fires and activates RAM VDD voltage for high-speed cache.',
    commonFailureReason: 'Defective RAM MOSFET or fried PCH silicon resulting from lightning storm on Ethernet port.',
    microSolderingFix: 'Desolder shorted RAM power IC. Verify PCH standby resistance before applying bench power.'
  },
  {
    id: 'vcore-gpu',
    stepNumber: 5,
    railName: 'CPU Core & iGPU Multiphasic VRM (VCore)',
    nominalVoltage: '0.75V - 1.25V Dynamic (VID Controlled)',
    typicalResistance: '1.2 Ω - 4.5 Ω (Naturally low CPU silicon resistance)',
    keyComponents: 'Multiphase buck controller (ISL95855 / NCP81205), DrMOS integrated power stages, Tantalum POSCAP capacitors',
    state: 'vcore',
    healthyCondition: 'CPU receives core voltage, CPU VID protocol communicates via SVID clock/data lines to dynamically ramp clock speeds.',
    commonFailureReason: 'High-side DrMOS driver chip breakdown shorts 19.5V main rail directly into sensitive 1V CPU core, destroying processor.',
    microSolderingFix: 'Thermal camera diagnosis to verify if CPU internal silicon survived. Replace burnt DrMOS stage and test ripple with oscilloscope.'
  },
  {
    id: 'plt-rst',
    stepNumber: 6,
    railName: 'Platform Reset (PLT_RST#) & BIOS Readout',
    nominalVoltage: '+3.3V High Active',
    typicalResistance: '> 10 kΩ to Ground',
    keyComponents: 'SPI Flash BIOS ROM (W25Q128 / GD25B127), CPU Platform Reset line, eDP display LVDS cable transceiver',
    state: 'boot',
    healthyCondition: 'PLT_RST# de-asserts to 3.3V high. CPU reads BIOS POST initialization code; display backlight enables and image appears.',
    commonFailureReason: 'Corrupted Intel ME (Management Engine) firmware causing 30-second delay or no display; broken eDP cable grounding.',
    microSolderingFix: 'Clean Intel ME region in BIOS binary with hex editor and re-flash 8-pin SOIC chip using high-speed SPI programmer.'
  }
];

interface PCBPowerSequenceSimulatorProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const PCBPowerSequenceSimulator: React.FC<PCBPowerSequenceSimulatorProps> = ({ onOpenQuote }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [simulatedShortRail, setSimulatedShortRail] = useState<string | null>(null);

  const currentRail = POWER_RAILS[activeStepIndex];

  const handleSimulateShort = (railId: string) => {
    setSimulatedShortRail(railId);
  };

  const handleClearShort = () => {
    setSimulatedShortRail(null);
  };

  return (
    <section id="pcb-power-simulator" className="py-16 sm:py-20 bg-slate-950 text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-800">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Evonix Micro-Electronics Bench Interactive Spec</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Motherboard Power Sequence & Rail Diagnostics
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            When a laptop or MacBook is completely dead, power does not simply vanish. It halts at one of six sequential voltage rails. Explore how our Sialkot bench engineers trace and repair faults with multimeters, thermal cameras, and oscilloscopes.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {POWER_RAILS.map((rail, idx) => {
            const isSelected = idx === activeStepIndex;
            const hasShort = simulatedShortRail === rail.id;

            return (
              <button
                key={rail.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  hasShort
                    ? 'bg-red-950/90 text-red-200 border-red-600 ring-2 ring-red-500'
                    : isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 font-bold">
                    0{rail.stepNumber}
                  </span>
                  {hasShort ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  ) : (
                    <span className="text-[9px] font-mono text-emerald-400">
                      {rail.nominalVoltage.split(' ')[0]}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold line-clamp-1">
                  {rail.railName.split(' ')[0]} {rail.railName.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Rail Technical Inspection Card */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Top Rail Header */}
          <div className="p-6 sm:p-8 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <span>STAGE 0{currentRail.stepNumber} OF 06</span>
                <span>•</span>
                <span className="text-slate-400 font-bold">{currentRail.state.toUpperCase()} PHASE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentRail.railName}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block text-[10px]">Nominal Voltage:</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{currentRail.nominalVoltage}</span>
              </div>

              <div className="bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block text-[10px]">Normal Ground Resistance:</span>
                <span className="font-mono font-bold text-emerald-300 text-sm">{currentRail.typicalResistance}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Healthy Condition & Circuit Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Normal Operating Parameters & Circuit Signals</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {currentRail.healthyCondition}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-red-400" />
                  <span>Integrated Micro-Components on This Rail</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800 font-mono">
                  {currentRail.keyComponents}
                </p>
              </div>

              {/* Common Failure & Micro-Soldering Solution */}
              <div className="bg-red-950/30 border border-red-900/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Common Real-World Sialkot Failure Mode</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentRail.commonFailureReason}
                </p>

                <div className="pt-2 border-t border-red-900/40 text-xs text-emerald-300 flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Evonix Bench Repair Method:</strong>
                    <span>{currentRail.microSolderingFix}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Fault Simulator & Action */}
            <div className="lg:col-span-5 space-y-6">
              {/* Simulator Card */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Live Bench Short-Circuit Simulator
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    FLIR Heatmap Engine
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Click below to simulate what happens if a voltage surge or liquid droplet shorts this rail. Watch how our multimeter & thermal cameras react:
                </p>

                {simulatedShortRail === currentRail.id ? (
                  <div className="p-4 rounded-xl bg-red-950/80 border border-red-600 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-red-300 font-bold">
                      <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                      <span>SHORT DETECTED: Rail Ground Resistance = 0.2 Ω</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Laboratory DC Power Supply clamped at 1.8V / 3.2A. FLIR thermal imager shows hot-spot at 92.4°C on high-side capacitor.
                    </p>
                    <button
                      onClick={handleClearShort}
                      className="mt-2 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Fault & Restore Rail</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSimulateShort(currentRail.id)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Simulate Voltage Surge / Dielectric Breakdown</span>
                  </button>
                )}

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Multimeter Diode Drop:</span>
                    <span className="text-emerald-400 font-bold">{simulatedShortRail === currentRail.id ? '0.001V (DEAD SHORT)' : '0.485V (HEALTHY)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thermal Signature:</span>
                    <span className="text-amber-400 font-bold">{simulatedShortRail === currentRail.id ? '92.4°C (OVERHEATING)' : '28.1°C (AMBIENT)'}</span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-200">
                  Dead Motherboard in Sialkot?
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Do not let unauthorized shops fry your CPU with improper heat guns. Bring it to our clean micro-electronics bench for a 100% free diagnosis.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => onOpenQuote?.(`Motherboard Rail Diagnostics: ${currentRail.railName}`)}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Book Free Bench Diagnosis</span>
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
