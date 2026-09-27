import React, { useState } from 'react';
import {
  Printer,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Phone,
  FileText,
  Sparkles,
  Download,
  Share2,
  X,
  Laptop,
  Cpu,
  Barcode,
  Truck,
  Building2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  CheckSquare,
  Square,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface BenchIntakePassProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultClientName?: string;
  defaultDevice?: string;
}

type DeviceCategory = 'laptop' | 'macbook' | 'workstation' | 'pos-printer' | 'scanner' | 'server-board';

const DEVICE_CATEGORIES: { id: DeviceCategory; label: string; icon: React.ReactNode; defaultModel: string }[] = [
  { id: 'laptop', label: 'Laptop / Notebook', icon: <Laptop className="w-4 h-4" />, defaultModel: 'Dell / HP / Lenovo Core i5/i7' },
  { id: 'macbook', label: 'Apple MacBook / iMac', icon: <Cpu className="w-4 h-4" />, defaultModel: 'MacBook Pro / Air (M1/M2/Intel)' },
  { id: 'workstation', label: 'Tower / CAD Workstation', icon: <Building2 className="w-4 h-4" />, defaultModel: 'Custom Tower Workstation / OptiPlex' },
  { id: 'pos-printer', label: 'Thermal POS Printer', icon: <Printer className="w-4 h-4" />, defaultModel: 'Xprinter / Epson 80mm Auto-Cutter' },
  { id: 'scanner', label: '2D Barcode Scanner', icon: <Barcode className="w-4 h-4" />, defaultModel: 'Zebra / Honeywell Handheld 2D' },
  { id: 'server-board', label: 'Factory Server / PCB', icon: <Zap className="w-4 h-4" />, defaultModel: 'Synology NAS / CNC Controller Board' },
];

const COMMON_FAULTS = [
  'Completely Dead (No Power / 0V on 19V Rail)',
  'Liquid / Water / Coffee Spill Corrosion',
  'Broken Hinge / Cracked Palmrest Structural Damage',
  'Thermal Overheating & Sudden Thermal Shutdown',
  'Blue Screen of Death (BSOD) / Boot Loop',
  'Screen Broken / Lines / Backlight Failure',
  'Thermal Printer Fuser Error / Paper Jam',
  'BIOS Corrupted / EEPROM Programming Needed',
];

const ACCESSORIES_OPTIONS = [
  'Original Power Adapter / Charger',
  'Power Cable',
  'Laptop Protective Bag / Sleeve',
  'Internal SSD/HDD Retained by Client',
  'Thermal Paper Roll / Sample Barcode',
];

export const BenchIntakePass: React.FC<BenchIntakePassProps> = ({
  isOpen = false,
  onClose,
  defaultClientName = '',
  defaultDevice = 'Laptop / Notebook',
}) => {
  // Wizard steps: 1 = Device Specs, 2 = Diagnostics & Faults, 3 = Client & Dispatch Mode, 4 = Generated Pass
  const [step, setStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<DeviceCategory>('laptop');
  const [brand, setBrand] = useState('Dell');
  const [deviceModel, setDeviceModel] = useState(defaultDevice);
  const [serialNumber, setSerialNumber] = useState('');

  const [selectedFaults, setSelectedFaults] = useState<string[]>(['Completely Dead (No Power / 0V on 19V Rail)']);
  const [customFaultNotes, setCustomFaultNotes] = useState('');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['Original Power Adapter / Charger']);
  const [urgencyTier, setUrgencyTier] = useState<'standard' | 'express' | 'emergency'>('standard');

  const [clientName, setClientName] = useState(defaultClientName || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('Paris Road & City Center');
  const [serviceMode, setServiceMode] = useState<'walkin' | 'doorstep'>('walkin');

  const [intakeId] = useState(() => `EVX-RMA-${Math.floor(100000 + Math.random() * 900000)}`);
  const [createdTimestamp] = useState(() => new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }));
  const [copiedToken, setCopiedToken] = useState(false);

  // Toggle selection helpers
  const toggleFault = (fault: string) => {
    setSelectedFaults((prev) =>
      prev.includes(fault) ? (prev.length > 1 ? prev.filter((f) => f !== fault) : prev) : [...prev, fault]
    );
  };

  const toggleAccessory = (acc: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(acc) ? prev.filter((a) => a !== acc) : [...prev, acc]
    );
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(intakeId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleWhatsAppDispatch = () => {
    const text = `*EVONIX LAB OFFICIAL RMA PASS*\n` +
      `Job Token: *${intakeId}*\n` +
      `Client: ${clientName} (${phone || 'No phone'})\n` +
      `Area: ${area} (${serviceMode === 'doorstep' ? 'Doorstep Van Pickup' : 'Lab Walk-in'})\n` +
      `Device: ${brand} ${deviceModel} [${category}]\n` +
      `Fault: ${selectedFaults.join(', ')}\n` +
      `Urgency: ${urgencyTier.toUpperCase()}\n` +
      `Pass Generated at: ${createdTimestamp}\n\n` +
      `Kindly schedule priority bench inspection.`;
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen && onClose) return null;

  return (
    <div
      className={
        onClose
          ? 'fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm'
          : 'py-16 bg-slate-900 text-white'
      }
    >
      <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative transition-all">
        {/* Modal Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header Progress Stepper */}
        {step < 4 ? (
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  Free Bench Diagnostics RMA System
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Hardware Intake & Diagnostic Pass
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-500 block">Pending Job ID:</span>
                <span className="text-sm font-mono font-black text-red-600">{intakeId}</span>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all ${
                  step === 1
                    ? 'bg-red-600 text-white shadow-sm'
                    : step > 1
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                <span>1. Device Specs</span>
              </div>
              <div
                className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all ${
                  step === 2
                    ? 'bg-red-600 text-white shadow-sm'
                    : step > 2
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                <span>2. Faults & Urgency</span>
              </div>
              <div
                className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all ${
                  step === 3
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                <span>3. Client & Mode</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* STEP 1: Device Category & Model Specs */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                Select Equipment Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DEVICE_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        if (!deviceModel || deviceModel === defaultDevice) {
                          setDeviceModel(cat.defaultModel);
                        }
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {cat.icon}
                      </span>
                      <span className="text-xs font-bold leading-tight">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Manufacturer / Brand *
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold text-slate-900 bg-white"
                >
                  <option>Dell</option>
                  <option>HP</option>
                  <option>Lenovo / ThinkPad</option>
                  <option>Apple</option>
                  <option>Asus</option>
                  <option>Acer</option>
                  <option>Toshiba / Dynabook</option>
                  <option>Xprinter / Epson</option>
                  <option>Zebra / Honeywell</option>
                  <option>Other / Custom Build</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Exact Model / Series *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Latitude 5420, ThinkPad T480, M1 Air"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                Serial Number / Service Tag (Optional for tracking)
              </label>
              <input
                type="text"
                placeholder="e.g. 7H8KL92 or under laptop barcode"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-mono text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Proceed to Faults Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Fault Symptoms & Urgency Tier */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                  Select Reported Fault Symptoms *
                </label>
                <span className="text-[11px] text-slate-400">Select all that apply</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMMON_FAULTS.map((fault, idx) => {
                  const isChecked = selectedFaults.includes(fault);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleFault(fault)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-red-50 border-red-300 text-red-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-red-600 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span>{fault}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                Additional Technical Notes or History (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Laptop was working on inverter when it suddenly turned off with faint burning smell..."
                value={customFaultNotes}
                onChange={(e) => setCustomFaultNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-xs sm:text-sm text-slate-900"
              />
            </div>

            {/* Accessories Left with Device */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                Accessories Handed Over for Chain-of-Custody:
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCESSORIES_OPTIONS.map((acc, idx) => {
                  const isChecked = selectedAccessories.includes(acc);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleAccessory(acc)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {acc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Urgency Tier */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                Service Urgency Window:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgencyTier('standard')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    urgencyTier === 'standard'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-extrabold block">Standard Bench</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">24 - 48 Hours Check</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgencyTier('express')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    urgencyTier === 'express'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-extrabold block">Priority Express</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Same-Day 4 - 6 Hours</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgencyTier('emergency')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    urgencyTier === 'emergency'
                      ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20 text-red-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-extrabold block">Factory Emergency</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">2-Hour Cut-Off Priority</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Client Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Client Info & Dispatch Mode */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Full Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mian Tariq / Usman Surgical"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Contact / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Sialkot / Regional Area *
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold text-slate-900 bg-white"
                >
                  <option>Paris Road & City Center</option>
                  <option>Sialkot Cantt & Garrison</option>
                  <option>Daska Road Industrial Belt</option>
                  <option>Daska City Hub (College / Nishtar Road)</option>
                  <option>Sambrial & Dry Port Trust Area</option>
                  <option>SIAL Airport Logistics Corridor</option>
                  <option>Wazirabad & Nizamabad Cluster</option>
                  <option>Small Industrial Estate (SIE 1 & 2)</option>
                  <option>Rangpura & Commissioner Road</option>
                  <option>Kashmir Road & Model Town</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">
                  Email for Digital Inspection Report
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Service Mode Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                Select Hardware Intake Service Mode:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceMode('walkin')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'walkin'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-500'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className={`w-4 h-4 ${serviceMode === 'walkin' ? 'text-red-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-black">Walk-In Lab Drop-off</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    Bring device directly to Paris Road or Daska Road Bench. Immediate microscope inspection.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceMode('doorstep')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'doorstep'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-500'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className={`w-4 h-4 ${serviceMode === 'doorstep' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-black">Doorstep Van Dispatch</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    Field engineer visits your office/factory across Sialkot division with mobile diagnostic tools.
                  </p>
                </button>
              </div>
            </div>

            {/* Free Diagnosis Guarantee Callout */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>100% Free Initial Bench Diagnostics:</strong> Zero charges for initial multimeter & thermal camera inspection. Written quote provided before any component replacement.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Official RMA Pass</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Official Printable Digital RMA Pass */}
        {step === 4 && (
          <div className="p-6 sm:p-8 bg-slate-50 print:p-0 print:bg-white text-slate-900 space-y-6">
            {/* Top Success Banner */}
            <div className="flex items-center justify-between flex-wrap gap-2 print:hidden bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>RMA Job Pass Successfully Generated & Logged!</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyToken}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 font-mono text-[11px] font-bold text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedToken ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3 text-emerald-700" />}
                  <span>{copiedToken ? 'Copied' : 'Copy Job ID'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print Pass</span>
                </button>
              </div>
            </div>

            {/* Official Pass Document Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 print:border-none print:shadow-none">
              {/* Document Header */}
              <div className="bg-slate-950 text-white p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                      Official RMA Intake Pass
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Job #{intakeId}</span>
                  </div>
                  <h4 className="text-lg font-black text-white mt-1">
                    {COMPANY_INFO.name} Hardware Engineering Lab
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Paris Road & Daska Road Service Centers, Sialkot, Pakistan
                  </p>
                </div>

                {/* Free Diagnostic Official Seal */}
                <div className="w-16 h-16 rounded-full border-2 border-emerald-500/80 bg-emerald-950/70 text-emerald-400 flex flex-col items-center justify-center text-center p-1 font-black text-[9px] uppercase tracking-tighter">
                  <span>100% FREE</span>
                  <span>BENCH</span>
                  <span>CHECK</span>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Client Information:</span>
                  <div className="font-extrabold text-slate-900 text-sm">{clientName}</div>
                  <div className="text-slate-600 font-medium">Phone: {phone || 'Not provided'}</div>
                  <div className="text-slate-600">Region: {area}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Device Profile:</span>
                  <div className="font-extrabold text-slate-900 text-sm">{brand} {deviceModel}</div>
                  <div className="text-slate-600 font-mono text-[11px]">S/N: {serialNumber || 'N/A'}</div>
                  <div className="text-slate-600">Mode: {serviceMode === 'doorstep' ? 'Doorstep Van Dispatch' : 'Lab Walk-in'}</div>
                </div>
              </div>

              {/* Reported Faults Box */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs space-y-1.5">
                <span className="text-red-700 font-bold uppercase text-[10px] tracking-wider block">
                  Reported Fault Symptoms:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-800 font-semibold">
                  {selectedFaults.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                {customFaultNotes && (
                  <p className="text-[11px] text-slate-600 italic pt-1 border-t border-red-200/60">
                    Client Note: "{customFaultNotes}"
                  </p>
                )}
              </div>

              {/* Accessories & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Accessories Retained:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAccessories.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Urgency & SLA:
                  </span>
                  <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-900 text-white">
                    {urgencyTier.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>

              {/* Industrial Barcode & Security Verification Token */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    Digital Chain-of-Custody Security Token
                  </span>
                  <div className="font-mono text-lg font-black tracking-widest text-white">
                    {intakeId}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Logged at {createdTimestamp} • 90-Day Written Hardware Warranty
                  </div>
                </div>

                <div className="bg-white p-2 rounded-xl text-slate-900 flex items-center gap-2">
                  <QrCode className="w-10 h-10 text-slate-900" />
                  <div className="text-[9px] font-mono leading-tight">
                    <div>SCAN TO</div>
                    <div>TRACK RMA</div>
                    <div className="font-bold">STATUS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar (WhatsApp Transmission & New Pass) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
              >
                Create Another Intake Pass
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleWhatsAppDispatch}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Pass to Lab WhatsApp (+{COMPANY_INFO.contact.whatsappDisplay})</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
