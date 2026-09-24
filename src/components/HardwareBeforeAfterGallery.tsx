import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Maximize2,
  Phone
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface ComparisonCase {
  id: string;
  title: string;
  category: string;
  deviceModel: string;
  turnaroundTime: string;
  diagnosticCost: string;
  repairWarranty: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDetails: string;
  afterDetails: string;
  beforeBg: string;
  afterBg: string;
  technicianNote: string;
  leadTechnician: string;
}

const COMPARISON_CASES: ComparisonCase[] = [
  {
    id: 'case-mosfet',
    title: 'Short Circuit on 19.5V Main Rail (Blown High-Side MOSFET)',
    category: 'Motherboard Micro-Soldering',
    deviceModel: 'Dell Precision 7550 Workstation',
    turnaroundTime: '4 Hours',
    diagnosticCost: 'Free at Workshop',
    repairWarranty: '90-Day Written Warranty',
    beforeLabel: 'Burned Silicon & Charred PCB',
    afterLabel: 'OEM Vishay MOSFET & Restored Power',
    beforeDetails: 'High-side N-Channel MOSFET suffered catastrophic dielectric breakdown due to industrial voltage surge in factory. Zero power, dead short to ground (0.2 Ohms on multimeter).',
    afterDetails: 'Damaged chip desoldered at 380°C. PCB copper layer cleaned with non-conductive solvent. Genuine Vishay SiR166DP installed and tested under full GPU rendering load.',
    beforeBg: 'from-amber-950/70 via-stone-900 to-black',
    afterBg: 'from-emerald-950/70 via-slate-900 to-black',
    technicianNote: 'Power rail returned to normal 19.5V with zero parasitic current draw. Both 3.3V and 5V standby rails firing up cleanly.',
    leadTechnician: 'Engr. Hamza Tariq (Chief Hardware Specialist)'
  },
  {
    id: 'case-corrosion',
    title: 'Green Tea Liquid Spill & Corroded Trace Decays',
    category: 'Logic Board Ultrasonic De-Oxidation',
    deviceModel: 'Apple MacBook Air 13 M2 (A2681)',
    turnaroundTime: '6 Hours',
    diagnosticCost: 'Free at Workshop',
    repairWarranty: '90-Day Written Warranty',
    beforeLabel: 'Severe Copper Trace Oxidation',
    afterLabel: 'Ultrasonic Cleaned & Micro-Jumpered',
    beforeDetails: 'Sticky residue caused galvanic corrosion on PP3V3_S2 power rail. Broken copper traces under the backlight driver IC caused complete screen blackout.',
    afterDetails: 'Motherboard bathed in deionized ultrasonic solution for 15 minutes. Two broken PCB traces reconnected using 0.02mm insulated copper jumper wire and UV curable solder mask.',
    beforeBg: 'from-emerald-950/70 via-zinc-900 to-black',
    afterBg: 'from-blue-950/70 via-slate-900 to-black',
    technicianNote: 'Display backlight circuit fully operational. All internal voltage rails verified with high-precision oscilloscope.',
    leadTechnician: 'Bilal Ashraf (Senior PCB & Logic Board Engineer)'
  },
  {
    id: 'case-hinge',
    title: 'Shattered Display Hinge & Broken Brass Standoffs',
    category: 'Mechanical Chassis Reconstruction',
    deviceModel: 'HP Pavilion 15-EG Series',
    turnaroundTime: '3 Hours',
    diagnosticCost: 'Free at Workshop',
    repairWarranty: '6-Month Mechanical Warranty',
    beforeLabel: 'Cracked Palmrest & Torn Hinge Brass',
    afterLabel: 'Industrial Epoxy Weld & Calibrated Torque',
    beforeDetails: 'Over-tightened factory hinges ripped brass screw inserts directly out of the plastic palmrest chassis. Opening lid threatened to crack the fragile IPS display panel.',
    afterDetails: 'Hinge friction nuts loosened by 0.5 turns to reduce structural stress. Threaded brass standoffs anchored using industrial steel-reinforced structural bonding epoxy.',
    beforeBg: 'from-red-950/70 via-neutral-900 to-black',
    afterBg: 'from-teal-950/70 via-slate-900 to-black',
    technicianNote: 'Lid opens smoothly with one hand. Structural bond is stronger than original factory plastic housing.',
    leadTechnician: 'Sufyan Butt (Chassis Restoration Specialist)'
  },
  {
    id: 'case-thermal',
    title: 'Severe 98°C Thermal Throttling & Baked Factory Paste',
    category: 'Thermal Overhaul & Heatsink Lapping',
    deviceModel: 'Lenovo Legion 5 Pro Core i7 / RTX 3070',
    turnaroundTime: '90 Minutes',
    diagnosticCost: 'Free at Workshop',
    repairWarranty: 'Thermal Performance Guarantee',
    beforeLabel: 'Baked Dry Cement Paste & Clogged Fins',
    afterLabel: 'Mirror Lapped Copper & Arctic MX-6',
    beforeDetails: 'Factory thermal paste had turned to chalk after two years of continuous AutoCAD and gaming. Radiator cooling exhaust vents 85% blocked with lint and dust fibers.',
    afterDetails: 'Exhaust fins decontaminated with pressurized dry air. Copper cold-plate mirror lapped with 2000-grit compound. High-viscosity Arctic MX-6 applied with thermal pad renewal on VRM MOSFETs.',
    beforeBg: 'from-orange-950/70 via-stone-900 to-black',
    afterBg: 'from-cyan-950/70 via-slate-900 to-black',
    technicianNote: 'Full CPU and GPU stress temperatures dropped from 98°C throttle down to a stable 64°C. Acoustic fan noise reduced by 40%.',
    leadTechnician: 'Engr. Hamza Tariq (Chief Hardware Specialist)'
  }
];

interface HardwareBeforeAfterGalleryProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const HardwareBeforeAfterGallery: React.FC<HardwareBeforeAfterGalleryProps> = ({ onOpenQuote }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-mosfet');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const activeCase = COMPARISON_CASES.find((c) => c.id === selectedCaseId) || COMPARISON_CASES[0];

  return (
    <section id="hardware-repair-gallery" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-800">
            <Cpu className="w-3.5 h-3.5" />
            <span>Evonix Micro-Electronics Clean Bench</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Before & After: Real Component-Level Repairs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We do not just replace entire boards at exorbitant costs. Our bench engineers in Sialkot fix blown silicon chips, liquid corrosion, and snapped chassis joints under high-power stereo microscopes.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {COMPARISON_CASES.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCaseId(item.id);
                  setSliderPos(50);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg scale-[1.02]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80 mb-1">
                  {item.category}
                </div>
                <div className="text-xs font-bold line-clamp-1">
                  {item.deviceModel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Top Info Banner */}
          <div className="p-6 sm:p-8 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                <span>{activeCase.category}</span>
                <span>•</span>
                <span className="text-slate-400">{activeCase.deviceModel}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {activeCase.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Turnaround: <strong className="text-slate-200">{activeCase.turnaroundTime}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeCase.repairWarranty}</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Split View */}
          <div className="relative select-none overflow-hidden h-72 sm:h-96 bg-slate-900">
            {/* Before Side (Left) */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${activeCase.beforeBg} p-8 flex flex-col justify-between`}
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800/80 inline-block">
                  BEFORE: {activeCase.beforeLabel}
                </span>
                <h4 className="mt-4 text-lg sm:text-xl font-bold text-red-200 max-w-md">
                  Failure & Damage Condition
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  {activeCase.beforeDetails}
                </p>
              </div>

              <div className="text-[11px] font-mono text-red-400 bg-red-950/50 p-2.5 rounded-xl border border-red-900/60 max-w-xs">
                Multimeter / Visual: Damaged state logged on intake
              </div>
            </div>

            {/* After Side (Right) */}
            <div
              className={`absolute inset-0 bg-gradient-to-bl ${activeCase.afterBg} p-8 flex flex-col justify-between text-right`}
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 inline-block">
                  AFTER: {activeCase.afterLabel}
                </span>
                <h4 className="mt-4 text-lg sm:text-xl font-bold text-emerald-200 max-w-md">
                  Restored & Bench Tested
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  {activeCase.afterDetails}
                </p>
              </div>

              <div className="self-end text-[11px] font-mono text-emerald-400 bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-900/60 max-w-xs">
                QC Passed: 100% load test verified
              </div>
            </div>

            {/* Vertical Divider Line with Grab Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl z-20 flex items-center justify-center -ml-0.5"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center font-bold text-xs ring-4 ring-black/40">
                ↔
              </div>
            </div>

            {/* Hidden Input Slider to control position smoothly */}
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Drag to compare before and after repair"
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          {/* Slider Instruction & Fast Toggles */}
          <div className="px-6 py-3 bg-slate-900/80 border-t border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>Drag slider left or right to inspect repair comparison</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSliderPos(15)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer font-medium"
              >
                Show 100% After
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer font-medium"
              >
                Split 50/50
              </button>
              <button
                onClick={() => setSliderPos(85)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer font-medium"
              >
                Show 100% Before
              </button>
            </div>
          </div>

          {/* Bench Engineer Note & Action Call */}
          <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wide">
                Bench Engineer Verdict:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                "{activeCase.technicianNote}"
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                Signed by: <strong className="text-slate-300">{activeCase.leadTechnician}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onOpenQuote?.(`Hardware Repair: ${activeCase.title}`)}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Book Diagnostic For This Issue</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Assalam-o-Alaikum Engr. Hamza, my laptop has a similar issue: ${activeCase.title}. Can you inspect it at your Sialkot lab?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Lab</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
