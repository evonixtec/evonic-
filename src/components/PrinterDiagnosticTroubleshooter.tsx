import React, { useState } from 'react';
import {
  Printer,
  Wrench,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Ruler,
  FileText,
  RefreshCw,
  Search,
  Phone,
  Flame,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface DefectMeasurement {
  distanceMm: number;
  tolerance: number;
  component: string;
  laserJetModel: string;
  cause: string;
  visualDefect: string;
  solution: string;
  severity: 'low' | 'medium' | 'high';
}

const ROLLER_DEFECTS: DefectMeasurement[] = [
  {
    distanceMm: 75.3,
    tolerance: 3,
    component: 'OPC Drum (Photoreceptor)',
    laserJetModel: 'HP 05A, 26A, 85A, 12A / Canon 303, 728',
    cause: 'Staple scratch, paper clip gouge, or electrical breakdown on organic photo layer.',
    visualDefect: 'Sharp black pinhole dot or thin vertical black line repeating every 75mm down the page.',
    solution: 'Replace OPC Drum cylinder or full toner cartridge. Polish wiper blade.',
    severity: 'medium',
  },
  {
    distanceMm: 37.7,
    tolerance: 2.5,
    component: 'PCR (Primary Charge Roller)',
    laserJetModel: 'HP LaserJet P2035, P2055, M402, M404, Pro 400',
    cause: 'Conductive toner dust accumulation or conductive rubber pitting on charge roller.',
    visualDefect: 'Ghosting of previous text or faint horizontal gray band repeating every 38mm.',
    solution: 'Clean PCR with 99% isopropyl alcohol or replace the rubber PCR roller.',
    severity: 'low',
  },
  {
    distanceMm: 56.5,
    tolerance: 3,
    component: 'Magnetic Developer Sleeve (Mag Roller)',
    laserJetModel: 'HP LaserJet M402, M404, P2035, P1102 / Canon 2900',
    cause: 'Developer blade wear or foreign particle score mark on aluminum magnetic sleeve.',
    visualDefect: 'Light horizontal void, uneven toner density, or white gap every 56-57mm.',
    solution: 'Replace doctor blade and clean or swap the magnetic developer roller.',
    severity: 'medium',
  },
  {
    distanceMm: 78.5,
    tolerance: 4,
    component: 'Fuser Film Sleeve / Upper Ceramic Heating Assembly',
    laserJetModel: 'HP LaserJet Pro M402, M404, P2055, Enterprise M605',
    cause: 'Teflon coating peeling, dried high-temp fuser grease, or staple tear on metal/polyimide film.',
    visualDefect: 'Smudged, easily wipeable unfused toner, wrinkled paper crease, or black melted smear every 78-80mm.',
    solution: 'Replace Teflon Fuser Sleeve, apply OEM high-temp silicone grease (G-300 / Molykote), and inspect ceramic heater element.',
    severity: 'high',
  },
  {
    distanceMm: 31.4,
    tolerance: 2,
    component: 'Transfer Roller (Chassis Base)',
    laserJetModel: 'Universal HP / Canon Desktop Laser Printers',
    cause: 'Toner contamination on bottom sponge transfer roller or high-voltage bias fault.',
    visualDefect: 'Back of page dirty with faint repetitive toner prints every 31mm.',
    solution: 'Blow compressed dry air over transfer roller sponge; inspect spring ground contacts.',
    severity: 'low',
  },
];

interface ThermalFault {
  id: string;
  title: string;
  symptoms: string;
  rootCause: string;
  steps: string[];
  partsNeeded: string;
}

const THERMAL_FAULTS: ThermalFault[] = [
  {
    id: 'faint-print',
    title: 'Thermal Receipt Printing Blank or Very Faint',
    symptoms: 'Paper feeds normally but text is completely invisible, patchy, or unreadable.',
    rootCause: '1. Paper roll loaded upside down (thermal side facing back). 2. Dirty thermal line head. 3. Power adapter degraded (delivering 12V instead of 24V DC 2.5A).',
    steps: [
      'Perform scratch test: Scratch paper with fingernail. If black line appears, paper is thermal; ensure that coated side faces the thermal print head.',
      'Power off printer, open lid, and gently clean the ceramic thermal line element with an alcohol swab.',
      'Check 24V power adapter output with digital multimeter under load; low voltage prevents heating element activation.',
    ],
    partsNeeded: 'Genuine 24V 2.5A Power Adapter or Replacement 80mm Printhead',
  },
  {
    id: 'cutter-jam',
    title: 'Auto-Cutter Jammed / Lid Stuck Closed',
    symptoms: 'Printer makes buzzing grinding noise; lid will not open; red ERROR light solid.',
    rootCause: 'Guillotine cutter blade is jammed in extended position due to sticky label adhesive or motor gear bind.',
    steps: [
      'Turn OFF printer immediately to prevent burning cutter motor.',
      'Look for the manual gear dial behind the small front slot or under the plastic cutter cover.',
      'Rotate the plastic manual gear knob with a flat screwdriver until the cutter blade fully retracts into home position.',
      'Open lid, remove jammed paper pieces, clean blade with isopropyl alcohol.',
    ],
    partsNeeded: 'Cutter Gear Assembly or Integrated Auto-Cutter Unit',
  },
  {
    id: 'flashing-red',
    title: 'Red ERROR / PAPER LED Constantly Blinking',
    symptoms: 'Printer beeps intermittently and refuses to accept print jobs from POS software.',
    rootCause: 'Optical paper-end reflection sensor blocked with paper dust, or gap sensor calibration lost.',
    steps: [
      'Ensure 80mm / 58mm thermal paper roll is seated flat and turns freely.',
      'Clean the black optical paper sensor inside the paper well with dry compressed air.',
      'Hold the FEED button while turning ON the power switch to run a hardware self-test diagnostic slip.',
    ],
    partsNeeded: 'Paper Well Reflection Sensor or Motherboard Firmware Reset',
  },
];

interface LaserJetCode {
  code: string;
  meaning: string;
  printer: string;
  sialkotFix: string;
}

const LASER_CODES: LaserJetCode[] = [
  {
    code: '50.1 / 50.4 Fuser Error',
    meaning: 'Low Fuser Temperature or Mains Power Surge',
    printer: 'HP LaserJet P2035, P2055, M402, M404',
    sialkotFix: 'Caused by factory generator voltage drop or burnt ceramic heating element. Disconnect from UPS, check 220V wall socket, or replace ceramic heating rod in our Sialkot lab.',
  },
  {
    code: '59.F0 Motor Error',
    meaning: 'Transfer Alienation / Main Drive Cam Failure',
    printer: 'HP Color LaserJet Pro M477, M452, M254',
    sialkotFix: 'Sticky solenoid sponge damper holds alienation gear. We strip and replace the rubber solenoid buffer with teflon tape in our Paris Road workshop.',
  },
  {
    code: '13.00.00 Paper Jam',
    meaning: 'Pickup Roller Slip or Sensor Flag Stuck',
    printer: 'HP LaserJet Enterprise / Pro Series',
    sialkotFix: 'Smooth, glazed D-roller rubber unable to grip paper. Clean with rubber rejuvenator or install new OEM pickup roller & separation pad.',
  },
  {
    code: '10.1000 Supply Memory',
    meaning: 'Toner Cartridge Chip Communication Error',
    printer: 'HP LaserJet Pro M404, M428 / Canon LBP',
    sialkotFix: 'Dirty contact pins in cartridge cavity or blocked chip firmware. Clean brass spring contacts; replace cartridge smart chip.',
  },
];

interface PrinterDiagnosticTroubleshooterProps {
  onOpenQuote?: (service: string) => void;
}

export const PrinterDiagnosticTroubleshooter: React.FC<PrinterDiagnosticTroubleshooterProps> = ({
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'ruler' | 'thermal' | 'laser-codes'>('ruler');
  const [inputDistance, setInputDistance] = useState<number>(75);
  const [selectedThermal, setSelectedThermal] = useState<ThermalFault>(THERMAL_FAULTS[0]);
  const [searchCode, setSearchCode] = useState<string>('');

  // Find matching defect from input distance
  const matchedDefect = ROLLER_DEFECTS.find(
    (d) => Math.abs(d.distanceMm - inputDistance) <= d.tolerance
  );

  const filteredCodes = LASER_CODES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchCode.toLowerCase()) ||
      c.meaning.toLowerCase().includes(searchCode.toLowerCase()) ||
      c.printer.toLowerCase().includes(searchCode.toLowerCase())
  );

  return (
    <section
      id="printer-diagnostics"
      className="py-16 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Printer className="w-4 h-4 text-red-400" />
            <span>Hardware Bench Diagnostic Tool</span>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.2 rounded-full font-black">
              EVONIX Lab
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LaserJet & Thermal Printer Diagnostic Troubleshooter
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Diagnose repetitive print defects, HP LaserJet error codes, and retail thermal POS receipt printer malfunctions with millimeter precision.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTab('ruler')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'ruler'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Roller Defect Ruler</span>
            </button>

            <button
              onClick={() => setActiveTab('thermal')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'thermal'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Thermal Receipt Faults</span>
            </button>

            <button
              onClick={() => setActiveTab('laser-codes')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'laser-codes'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>LaserJet Error Codes</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ROLLER DEFECT RULER CALCULATOR */}
        {activeTab === 'ruler' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-red-500" />
                    <span>Repeating Defect Distance Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Measure the exact distance between two identical repeating black spots or marks down the printed page with a physical ruler.
                  </p>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Measured Distance (Millimeters)
                  </span>
                  <span className="text-xl font-extrabold text-red-400 font-mono">
                    {inputDistance} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="95"
                  step="1"
                  value={inputDistance}
                  onChange={(e) => setInputDistance(Number(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>25mm</span>
                  <span>37.7mm (PCR)</span>
                  <span>56.5mm (Mag)</span>
                  <span>75.3mm (Drum)</span>
                  <span>78.5mm (Fuser)</span>
                  <span>95mm</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Common Distance Benchmarks:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ROLLER_DEFECTS.map((defect) => (
                    <button
                      key={defect.component}
                      onClick={() => setInputDistance(Math.round(defect.distanceMm))}
                      className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                        Math.abs(defect.distanceMm - inputDistance) <= defect.tolerance
                          ? 'bg-red-600/20 border-red-500 text-white'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-mono font-bold text-red-400">
                        {defect.distanceMm}mm
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {defect.component.split(' ')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physics Rationale Explanation */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-red-400" />
                  <span>The Engineering Math (Circumference = π × Diameter)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Because printer rollers rotate in a continuous cycle, any scratch on a 24mm diameter OPC drum will make contact with the paper sheet every <span className="font-mono text-white">π × 24mm ≈ 75.3mm</span>. Measuring this distance reveals the exact failing internal roller without dismantling the machine!
                </p>
              </div>
            </div>

            {/* Diagnostic Output Card */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
              {matchedDefect ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                        Identified Faulty Sub-Assembly
                      </div>
                      <h4 className="text-xl font-extrabold text-white mt-0.5">
                        {matchedDefect.component}
                      </h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        matchedDefect.severity === 'high'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {matchedDefect.severity} Priority
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Affected Printer Series:
                      </span>
                      <p className="text-slate-200 font-mono bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                        {matchedDefect.laserJetModel}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Visual Symptom on Page:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {matchedDefect.visualDefect}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Root Mechanical Cause:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {matchedDefect.cause}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-200">
                      <span className="font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>EVONIX Lab Recommended Resolution:</span>
                      </span>
                      <p className="text-[11px] leading-relaxed">
                        {matchedDefect.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        onOpenQuote
                          ? onOpenQuote(`Printer Repair: ${matchedDefect.component} (${matchedDefect.distanceMm}mm)`)
                          : null
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>Book Sialkot Lab Repair</span>
                    </button>
                    <a
                      href="https://wa.me/923000000000?text=Hello%20EVONIX%2C%20I%20have%20a%20printer%20defect%20with%20repeating%20distance%20issue."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Engineer</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    No Exact Standard Roller Matches {inputDistance}mm
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try adjusting the ruler slider closer to 38mm (PCR), 56mm (Mag Roller), 75mm (Drum), or 78mm (Fuser). For custom color laser transfer belts, contact our Sialkot lab directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: THERMAL RECEIPT PRINTER FAULTS */}
        {activeTab === 'thermal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Select Common Thermal Printer Symptom:
              </span>
              {THERMAL_FAULTS.map((fault) => (
                <button
                  key={fault.id}
                  onClick={() => setSelectedThermal(fault)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedThermal.id === fault.id
                      ? 'bg-red-600/20 border-red-500 text-white shadow-xs'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-sm font-bold text-white">{fault.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {fault.symptoms}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                  Thermal POS Troubleshooting Guide
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {selectedThermal.title}
                </h3>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Observed Symptoms:
                </span>
                <p className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  {selectedThermal.symptoms}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Root Causes:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedThermal.rootCause}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Bench Troubleshooting Steps:
                </span>
                <div className="space-y-2">
                  {selectedThermal.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Available Spare Parts in Sialkot:
                  </span>
                  <span className="font-bold text-white">{selectedThermal.partsNeeded}</span>
                </div>
                <button
                  onClick={() =>
                    onOpenQuote
                      ? onOpenQuote(`Thermal Printer Part: ${selectedThermal.partsNeeded}`)
                      : null
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Inquire Parts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LASERJET ERROR CODES */}
        {activeTab === 'laser-codes' && (
          <div className="space-y-6">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Search error code e.g. 50.1, 59.F0, 13.00..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCodes.map((code) => (
                <div
                  key={code.code}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-base font-extrabold text-red-400">
                        {code.code}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {code.meaning}
                      </h4>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      {code.printer.split(',')[0]}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      EVONIX Sialkot Engineering Remedy:
                    </span>
                    {code.sialkotFix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
