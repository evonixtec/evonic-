import React, { useState } from 'react';
import { Laptop, Wrench, ShieldCheck, Clock, CheckCircle2, MessageSquare, AlertCircle, HelpCircle, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface SymptomOption {
  id: string;
  label: string;
  category: string;
  probableCause: string;
  actionRequired: string;
  turnaroundTime: string;
  estimatedCostPkr: string;
  warranty: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'dead-no-power',
    label: 'Dead / Completely No Power (No charging LED)',
    category: 'Motherboard',
    probableCause: 'Primary 19V/20V DC rail short circuit, fractured decoupling ceramic capacitor, blown high-side MOSFET, or faulty charging controller IC.',
    actionRequired: 'DC current injection to isolate thermal hotspot, SMD desoldering, and replacement with OEM ceramic dielectric components.',
    turnaroundTime: '60 - 90 Minutes (Same-Day)',
    estimatedCostPkr: 'Rs. 2,500 - 4,500',
    warranty: '90 Days EVONIX Hardware Warranty',
    severity: 'critical',
  },
  {
    id: 'overheating-fan-noise',
    label: 'Overheating / Loud Fan Whirring / Thermal Shutdown',
    category: 'Cooling System',
    probableCause: 'Chalky dried-up factory thermal paste, blocked copper heatsink fin stack with cotton lint/dust, or failing hydraulic fan bearings.',
    actionRequired: 'Disassembly, complete heatsink ultrasonic/compressed air cleaning, application of high-viscosity Arctic MX-6 compound, and fan spindle re-lubrication.',
    turnaroundTime: '30 - 45 Minutes',
    estimatedCostPkr: 'Rs. 1,200 - 2,000',
    warranty: '60 Days Thermal Performance Guarantee',
    severity: 'medium',
  },
  {
    id: 'broken-hinges-casing',
    label: 'Broken Screen Hinges / Cracked Palmrest Body',
    category: 'Chassis & Mechanical',
    probableCause: 'Stiff, oxidized display hinges exerting excessive torque, pulling brass threaded screw inserts out of plastic body mounts.',
    actionRequired: 'Loosening hinge tension to smooth opening torque, structural chemical epoxy weld of brass nut standoffs, and palmrest reinforcement.',
    turnaroundTime: '2 - 3 Hours',
    estimatedCostPkr: 'Rs. 1,800 - 3,500',
    warranty: '6 Months Mechanical Structural Warranty',
    severity: 'medium',
  },
  {
    id: 'liquid-coffee-water-spill',
    label: 'Water / Tea / Coffee Liquid Spill (Emergency)',
    category: 'Emergency Corrosion',
    probableCause: 'Electrolyte liquid bridging live copper traces, causing immediate galvanic corrosion and pad delamination.',
    actionRequired: 'Immediate battery isolation, chemical ultrasonic bath in pure anhydrous solution, microscope trace inspection, and conformal anti-moisture coating.',
    turnaroundTime: '3 - 5 Hours (Full Dehydration)',
    estimatedCostPkr: 'Rs. 3,000 - 5,500',
    warranty: '30 Days Moisture Recovery Warranty',
    severity: 'critical',
  },
  {
    id: 'slow-boot-100-disk',
    label: 'Extremely Slow Boot / 100% Disk Usage in Task Manager',
    category: 'Storage Speed',
    probableCause: 'Mechanical spinning hard drive with bad sectors or degraded read speeds under 30 MB/s bottlenecking Windows 10/11.',
    actionRequired: 'Installation of high-speed NVMe PCIe Gen3/4 M.2 SSD (2500+ MB/s), 100% lossless OS & data cloning, and registry optimization.',
    turnaroundTime: '45 Minutes',
    estimatedCostPkr: 'Rs. 3,500 - 7,500 (Includes New SSD)',
    warranty: '3 Years Manufacturer Warranty on Brand New SSD',
    severity: 'low',
  },
  {
    id: 'blue-screen-freezing',
    label: 'Blue Screen of Death (BSOD) / Sudden Random Freezing',
    category: 'Memory & BIOS',
    probableCause: 'Degraded DDR4/DDR5 RAM contact pins, corrupt BIOS firmware code after forced shutdown, or dying storage partition table.',
    actionRequired: 'MemTest86 memory loop diagnostic, SPI hardware programmer BIOS reflashing with clean ME region, and driver conflict repair.',
    turnaroundTime: '60 Minutes',
    estimatedCostPkr: 'Rs. 1,500 - 3,000',
    warranty: '60 Days Stability Warranty',
    severity: 'high',
  },
  {
    id: 'thermal-printer-paper-jam',
    label: 'Thermal Receipt Printer Skipping Lines / Paper Cutter Jammed',
    category: 'POS Hardware',
    probableCause: 'Thermal resistor element clogged with baked carbon dust, paper roll debris stuck in cutter motor gears, or wrong baud rate.',
    actionRequired: 'Micro-cleaning of thermal heating elements with 99% alcohol, auto-cutter gear realignment and silicone lubrication, and driver calibration.',
    turnaroundTime: '30 - 45 Minutes',
    estimatedCostPkr: 'Rs. 1,500 - 2,800',
    warranty: '45 Days Cutter & Printhead Guarantee',
    severity: 'medium',
  },
  {
    id: 'broken-screen-lines',
    label: 'Cracked LCD Display / Flickering Horizontal Lines',
    category: 'Display & Cable',
    probableCause: 'Physical glass matrix fracture or pinched 30/40-pin eDP LVDS video ribbon cable through display hinge.',
    actionRequired: 'Testing video cable signal with external HDMI monitor, installation of original Grade-A IPS matte panel with zero dead pixels.',
    turnaroundTime: '45 Minutes',
    estimatedCostPkr: 'Rs. 5,500 - 14,000 (Depends on Screen Model)',
    warranty: '3 Months Replacement Warranty',
    severity: 'high',
  },
];

const BRANDS = [
  'Dell (Latitude / XPS / Inspiron / Vostro)',
  'HP (EliteBook / ProBook / Pavilion / Omen)',
  'Lenovo (ThinkPad / IdeaPad / Yoga / Legion)',
  'Apple MacBook (Air / Pro - M1/M2/Intel)',
  'Commercial POS Touch Terminal (All-in-One)',
  '80mm / 58mm Thermal Receipt Printer',
];

interface LaptopRepairEstimatorProps {
  onOpenQuote?: (serviceDetails?: string) => void;
}

export const LaptopRepairEstimator: React.FC<LaptopRepairEstimatorProps> = ({ onOpenQuote }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(BRANDS[0]);
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOMS[0].id);

  const currentSymptom = SYMPTOMS.find((s) => s.id === selectedSymptomId) || SYMPTOMS[0];

  const handleBookRepair = () => {
    if (onOpenQuote) {
      onOpenQuote(`Hardware Repair: ${selectedBrand} - ${currentSymptom.label}`);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello EVONIX Hardware Lab, I need repair for my ${selectedBrand}. Issue: ${currentSymptom.label}. Estimated Cost: ${currentSymptom.estimatedCostPkr}. Please schedule diagnostic inspection in Sialkot.`
  );

  return (
    <section id="laptop-repair-estimator" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-red-600" />
            <span>Interactive Hardware Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Laptop & POS Hardware Diagnostic & Cost Estimator
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Select your device brand and observe symptoms to get an honest technical diagnosis, estimated repair turnaround time, and transparent price range in Sialkot before booking.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Device & Symptom Selectors */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Device / Brand Selection */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Step 1: Select Your Device Type / Brand
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BRANDS.map((brand) => {
                  const isSelected = selectedBrand === brand;
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-50 border-red-500 text-red-900 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Laptop className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                        <span className="line-clamp-1">{brand}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Symptom Selection */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Step 2: Select Observed Problem / Symptom
              </label>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {SYMPTOMS.map((symptom) => {
                  const isSelected = selectedSymptomId === symptom.id;
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => setSelectedSymptomId(symptom.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {symptom.category}
                          </span>
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {symptom.label}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold whitespace-nowrap ${
                          isSelected ? 'text-emerald-400' : 'text-slate-700'
                        }`}
                      >
                        {symptom.estimatedCostPkr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Breakdown & Price Output Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-red-500/20 shadow-md space-y-6">
              {/* Header Badge & Selected Device */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Official Diagnostic Breakdown
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {selectedBrand.split('(')[0].trim()} Diagnosis
                  </h3>
                </div>
                <div className="p-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-600">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>

              {/* Probable Cause & Action Required */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Probable Component-Level Cause:
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {currentSymptom.probableCause}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    EVONIX Certified Protocol:
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {currentSymptom.actionRequired}
                  </p>
                </div>
              </div>

              {/* Key Metrics Grid (Cost, Time, Warranty) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-center">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                    Estimated Cost
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-red-700 block mt-1">
                    {currentSymptom.estimatedCostPkr}
                  </span>
                  <span className="text-[10px] text-red-500">Genuine parts</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                    Lab Turnaround
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-1">
                    {currentSymptom.turnaroundTime}
                  </span>
                  <span className="text-[10px] text-slate-500">Same-Day Service</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Warranty
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-800 block mt-1">
                    {currentSymptom.warranty.split(' ')[0]} {currentSymptom.warranty.split(' ')[1]}
                  </span>
                  <span className="text-[10px] text-emerald-600">Full Replacement</span>
                </div>
              </div>

              {/* Guarantee Bullet Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Zero diagnostic fee if device cannot be repaired.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Doorstep pickup available across Paris Road, Daska Road, and Sialkot Cantt.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBookRepair}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Diagnostic Lab Inspection</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Technician</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
