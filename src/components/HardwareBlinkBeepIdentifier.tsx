import React, { useState } from 'react';
import {
  AlertTriangle,
  Volume2,
  VolumeX,
  CheckCircle2,
  Wrench,
  Cpu,
  Info,
  ChevronRight,
  ShieldCheck,
  Search,
  Sparkles,
  Play,
  Square,
  HelpCircle,
  Phone
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface DiagnosticCode {
  id: string;
  brand: 'Dell' | 'HP' | 'Lenovo' | 'Apple' | 'Asus';
  indicatorType: 'LED Blink' | 'Beep Sequence' | 'Power Light Pattern';
  patternDisplay: string;
  amberCount?: number;
  whiteCount?: number;
  beepPattern?: number[]; // durations in ms: [beep, pause, beep, pause...]
  faultName: string;
  rootCause: string;
  benchSolution: string;
  severity: 'Critical (Dead)' | 'High (No Display)' | 'Medium (Degraded)';
  typicalBenchTime: string;
}

const DIAGNOSTIC_CODES: DiagnosticCode[] = [
  // DELL CODES (Amber + White blinks)
  {
    id: 'dell-2-1',
    brand: 'Dell',
    indicatorType: 'LED Blink',
    patternDisplay: '2 Amber, 1 White Blinks',
    amberCount: 2,
    whiteCount: 1,
    beepPattern: [200, 150, 200, 600, 300, 1000],
    faultName: 'CPU / VCORE Power Rail Failure',
    rootCause: 'Short circuit on VCC_CORE power rail or defective DrMOS / buck controller IC (e.g. ISL95855).',
    benchSolution: 'Micro-soldering replacement of shorted low-side MOSFET and VCORE filtering MLCC capacitor on our diagnostic bench.',
    severity: 'Critical (Dead)',
    typicalBenchTime: 'Same-day (3-4 hours)'
  },
  {
    id: 'dell-2-3',
    brand: 'Dell',
    indicatorType: 'LED Blink',
    patternDisplay: '2 Amber, 3 White Blinks',
    amberCount: 2,
    whiteCount: 3,
    beepPattern: [200, 150, 200, 600, 300, 150, 300, 150, 300, 1000],
    faultName: 'System Memory (RAM / SPD) Error',
    rootCause: 'Memory module communication failure, oxidized SO-DIMM gold pins, or defective 1.2V DDR4 / 1.1V DDR5 buck regulator.',
    benchSolution: 'Ultrasonic pin deoxidation, oscilloscope clock check on SMBUS lines, or replacement of DDR power IC.',
    severity: 'High (No Display)',
    typicalBenchTime: '1-2 hours'
  },
  {
    id: 'dell-2-7',
    brand: 'Dell',
    indicatorType: 'LED Blink',
    patternDisplay: '2 Amber, 7 White Blinks',
    amberCount: 2,
    whiteCount: 7,
    beepPattern: [200, 150, 200, 600, 300, 150, 300, 150, 300, 150, 300, 150, 300, 150, 300, 150, 300, 1000],
    faultName: 'LCD Display / eDP Cable Fault',
    rootCause: 'Display panel power rail (3.3V LCD_VDD or 19V backlight LED+) open circuit, or damaged hinge eDP ribbon cable.',
    benchSolution: 'Thermal camera inspection of display connector fuse (F1) and micro-wire bridging of damaged LVDS/eDP trace.',
    severity: 'High (No Display)',
    typicalBenchTime: '2-3 hours'
  },
  {
    id: 'dell-3-5',
    brand: 'Dell',
    indicatorType: 'LED Blink',
    patternDisplay: '3 Amber, 5 White Blinks',
    amberCount: 3,
    whiteCount: 5,
    beepPattern: [200, 150, 200, 150, 200, 600, 300, 150, 300, 150, 300, 150, 300, 150, 300, 1000],
    faultName: 'Power Rail Sequencing Failure (EC Handshake)',
    rootCause: 'Embedded Controller (ITE/ENE Super I/O) unable to verify ALL_SYS_PWRGD or secondary rail power good signals.',
    benchSolution: 'Reprogramming clean EC firmware via SVOD4 programmer or micro-soldering replacement of defective SIO chip.',
    severity: 'Critical (Dead)',
    typicalBenchTime: 'Same-day'
  },

  // HP CODES (Caps Lock blinks)
  {
    id: 'hp-3-2',
    brand: 'HP',
    indicatorType: 'LED Blink',
    patternDisplay: '3 Slow Blinks, 2 Fast Blinks (Caps Lock)',
    beepPattern: [500, 250, 500, 250, 500, 600, 150, 100, 150, 1000],
    faultName: 'System Board Memory Subsystem Failure',
    rootCause: 'RAM power distribution failure (VDDQ 1.2V / VPP 2.5V rail absent) or CPU integrated memory controller shorted.',
    benchSolution: 'Voltage injection testing on RAM power inductors and micro-soldering replacement of PWM step-down converter.',
    severity: 'High (No Display)',
    typicalBenchTime: '2-4 hours'
  },
  {
    id: 'hp-5-3',
    brand: 'HP',
    indicatorType: 'LED Blink',
    patternDisplay: '5 Slow Blinks, 3 Fast Blinks (Caps Lock)',
    beepPattern: [500, 200, 500, 200, 500, 200, 500, 200, 500, 600, 150, 100, 150, 100, 150, 1000],
    faultName: 'Corrupted Main BIOS / SPI Flash Chip',
    rootCause: 'SPI Flash ROM data sector corrupted following Windows update or power outage during write cycle.',
    benchSolution: 'Chip-off programming on dedicated hardware programmer, flashing official HP clean ME region BIOS binary.',
    severity: 'High (No Display)',
    typicalBenchTime: '1-2 hours'
  },
  {
    id: 'hp-3-4',
    brand: 'HP',
    indicatorType: 'LED Blink',
    patternDisplay: '3 Slow Blinks, 4 Fast Blinks (Caps Lock)',
    beepPattern: [500, 200, 500, 200, 500, 600, 150, 100, 150, 100, 150, 100, 150, 1000],
    faultName: 'Power Configuration / USB-C PD Controller Failure',
    rootCause: 'CC line short-circuit on Type-C charging port or burnt Cypress/Realtek Power Delivery controller chip.',
    benchSolution: 'Replacement of damaged USB-C receptacle and hot-air reflow of new OEM USB-PD negotiation IC.',
    severity: 'Critical (Dead)',
    typicalBenchTime: '3-4 hours'
  },

  // LENOVO THINKPAD CODES (Beeps & Blink Melody)
  {
    id: 'lenovo-3-3-1',
    brand: 'Lenovo',
    indicatorType: 'Beep Sequence',
    patternDisplay: '3 Short, 3 Short, 1 Short Beeps',
    beepPattern: [150, 100, 150, 100, 150, 400, 150, 100, 150, 100, 150, 400, 300, 1000],
    faultName: 'Memory Initialization Error / SPD Bus Lockup',
    rootCause: 'Soldered on-board LPDDR4x/LPDDR5 memory chip defective or cracked BGA solder balls under CPU.',
    benchSolution: 'Motherboard BGA rework station reflow or disabling soldered RAM channel via circuit strap modification.',
    severity: 'High (No Display)',
    typicalBenchTime: 'Same-day'
  },
  {
    id: 'lenovo-5-beeps',
    brand: 'Lenovo',
    indicatorType: 'Beep Sequence',
    patternDisplay: '5 Short Beeps (Pause) 5 Short Beeps',
    beepPattern: [150, 80, 150, 80, 150, 80, 150, 80, 150, 600, 150, 80, 150, 80, 150, 80, 150, 80, 150, 1000],
    faultName: 'Security Chip (TPM) / Motherboard System Board Failure',
    rootCause: 'Discrete TPM IC or PCH (Platform Controller Hub) power rail open-circuit or lightning voltage spike.',
    benchSolution: 'Bench voltage rail trace mapping with digital multimeter and micro-jumper wire reconstruction.',
    severity: 'Critical (Dead)',
    typicalBenchTime: '4-6 hours'
  },

  // APPLE MACBOOK CODES (MagSafe LED & T2/M-series SOS)
  {
    id: 'apple-loop',
    brand: 'Apple',
    indicatorType: 'Power Light Pattern',
    patternDisplay: 'MagSafe Orange Flashing / 5V 0.02A Loop (USB-C Amp Meter)',
    beepPattern: [300, 200, 300, 200, 300, 800],
    faultName: 'PPBUS_G3H Short Circuit or CD3215/CD3217 USB-PD Lock',
    rootCause: 'Shorted ceramic capacitor on PPBUS_G3H (12.6V/13V main rail) or damaged USB-C Type-C controller IC.',
    benchSolution: 'Low-voltage thermal camera injection, locating shorted 0402 capacitor, and CD3215 chip replacement.',
    severity: 'Critical (Dead)',
    typicalBenchTime: 'Same-day'
  }
];

export const HardwareBlinkBeepIdentifier: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<'All' | 'Dell' | 'HP' | 'Lenovo' | 'Apple'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCode, setActiveCode] = useState<DiagnosticCode>(DIAGNOSTIC_CODES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play synthesized hardware beep using Web Audio API
  const playSynthesizedBeep = (pattern?: number[]) => {
    if (!pattern || isPlayingAudio) return;

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setIsPlayingAudio(true);

      let currentTime = audioCtx.currentTime + 0.05;

      for (let i = 0; i < pattern.length; i += 2) {
        const beepDuration = pattern[i] / 1000;
        const pauseDuration = (pattern[i + 1] || 200) / 1000;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square'; // Classic motherboard PC speaker timbre
        osc.frequency.setValueAtTime(880, currentTime); // 880 Hz standard BIOS tone

        gain.gain.setValueAtTime(0.2, currentTime);
        gain.gain.setValueAtTime(0.2, currentTime + beepDuration - 0.02);
        gain.gain.linearRampToValueAtTime(0.001, currentTime + beepDuration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + beepDuration);

        currentTime += beepDuration + pauseDuration;
      }

      const totalDuration = (currentTime - audioCtx.currentTime) * 1000;
      setTimeout(() => {
        setIsPlayingAudio(false);
        try {
          audioCtx.close();
        } catch {
          // ignore
        }
      }, totalDuration + 200);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const filteredCodes = DIAGNOSTIC_CODES.filter((item) => {
    const matchBrand = selectedBrand === 'All' || item.brand === selectedBrand;
    const matchSearch =
      item.patternDisplay.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.faultName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rootCause.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <section id="blink-beep-identifier" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background circuit ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold mb-4 tracking-wide uppercase">
            <Wrench className="w-3.5 h-3.5 text-red-400" />
            <span>Hardware Lab Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Laptop BIOS Blink & Beep Code Decoder
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Is your laptop screen black with flashing power lights or beeping sounds? Select your laptop brand
            and light pattern below to pinpoint the exact motherboard power rail or chip failure immediately.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Diagnostic on our Sialkot workshop bench is 100% FREE!</span>
          </div>
        </div>

        {/* Brand Selector & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {(['All', 'Dell', 'HP', 'Lenovo', 'Apple'] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedBrand === brand
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {brand === 'All' ? 'All Brands' : brand}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code e.g. 2 Amber, Caps Lock..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {/* Two-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Code Selector List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredCodes.map((code) => {
              const isSelected = activeCode.id === code.id;
              return (
                <div
                  key={code.id}
                  onClick={() => setActiveCode(code)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-slate-800 border-red-500 shadow-lg shadow-red-950/40 ring-1 ring-red-500/50'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-700 text-red-300">
                      {code.brand}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        code.severity.includes('Critical')
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {code.severity}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{code.patternDisplay}</h4>
                  <p className="text-xs text-slate-300 line-clamp-1">{code.faultName}</p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-red-400" />
                      <span>{code.typicalBenchTime}</span>
                    </span>
                    <span className="text-red-400 font-medium flex items-center gap-0.5">
                      <span>View Bench Fix</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredCodes.length === 0 && (
              <div className="p-8 text-center bg-slate-800/40 rounded-2xl border border-slate-700 text-slate-400 text-xs">
                No matching blink code found. You can ask our duty engineer directly in live chat!
              </div>
            )}
          </div>

          {/* Right Column: Detailed Diagnostic & Audio Verification Card */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div>
              {/* Top Banner with Brand & Interactive Sound Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-extrabold uppercase">
                      {activeCode.brand} Official Hardware Guide
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Code #{activeCode.id}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{activeCode.patternDisplay}</h3>
                </div>

                {activeCode.beepPattern && (
                  <button
                    onClick={() => playSynthesizedBeep(activeCode.beepPattern)}
                    disabled={isPlayingAudio}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                      isPlayingAudio
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Playing Beep Audio...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Simulate Beep Audio</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Visual Blink Indicator Representation */}
              {activeCode.amberCount !== undefined && activeCode.whiteCount !== undefined && (
                <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1">
                      Visual Diagnostic Blink Sequence:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-amber-400">
                        {activeCode.amberCount}x Amber Blinks
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: activeCode.amberCount }).map((_, i) => (
                          <span
                            key={`amber-${i}`}
                            className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-pulse"
                          />
                        ))}
                      </div>
                      <span className="text-slate-500 font-bold mx-1">+</span>
                      <span className="text-xs font-bold text-slate-100">
                        {activeCode.whiteCount}x White Blinks
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: activeCode.whiteCount }).map((_, i) => (
                          <span
                            key={`white-${i}`}
                            className="w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-white/50 animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                    Cycles continuously after 3s pause
                  </span>
                </div>
              )}

              {/* Diagnostic Breakdown Points */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Identified Hardware Failure</span>
                  </div>
                  <p className="text-slate-100 font-semibold text-sm leading-snug">{activeCode.faultName}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Motherboard Root Cause</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{activeCode.rootCause}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Evonix Bench Repair Procedure</span>
                  </div>
                  <p className="text-emerald-200 leading-relaxed">{activeCode.benchSolution}</p>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-8 pt-5 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs text-slate-300">
                  Bench Diagnosis:{' '}
                  <span className="font-bold text-emerald-400">100% Free with 90-Day Written Warranty</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Lab Locations: Paris Road & Daska Road, Sialkot
                </div>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Evonix Lab, my ${activeCode.brand} laptop shows blink code: ${activeCode.patternDisplay} (${activeCode.faultName}). I would like to bring it for free bench diagnostic.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Book Free Bench Diagnostic</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
