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
  X
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface BenchIntakePassProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultClientName?: string;
  defaultDevice?: string;
}

export const BenchIntakePass: React.FC<BenchIntakePassProps> = ({
  isOpen = false,
  onClose,
  defaultClientName = '',
  defaultDevice = 'Laptop / MacBook'
}) => {
  const [clientName, setClientName] = useState(defaultClientName || '');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Paris Road, Sialkot');
  const [deviceModel, setDeviceModel] = useState(defaultDevice);
  const [reportedFault, setReportedFault] = useState('Completely Dead / No Power / Black Screen');
  const [intakeId] = useState(() => `EVX-SKT-${Math.floor(1000 + Math.random() * 9000)}`);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    setIsGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen && onClose) return null;

  return (
    <div className={onClose ? 'fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs' : 'py-16 bg-slate-900 text-white'}>
      <div className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Close Button if used in overlay */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!isGenerated ? (
          /* Intake Creation Form */
          <div className="p-6 sm:p-8">
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Walk-In Pass</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Generate Free Bench Diagnostic Pass
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Print or screenshot your priority intake ticket before visiting our Paris Road or Daska Road lab.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raza Ali / Muhammad Usman"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact / WhatsApp No. (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="0300-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Sialkot Location / Area
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                  >
                    <option>Paris Road, Sialkot</option>
                    <option>Daska Road, Sialkot</option>
                    <option>Cantt / Defense Road, Sialkot</option>
                    <option>Sambrial / Dry Port Area</option>
                    <option>Ugoki / Wazirabad Road</option>
                    <option>Kashmir Road / Model Town</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Device Category & Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dell Latitude 5420 / HP EliteBook"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Reported Problem / Fault
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. No power, broken hinge, water spill"
                    value={reportedFault}
                    onChange={(e) => setReportedFault(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>100% Free Diagnostics:</strong> We never charge any diagnostic fee on the bench. You only pay after you approve the written quote.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Official Intake Ticket</span>
              </button>
            </form>
          </div>
        ) : (
          /* Official Printable Ticket */
          <div className="p-6 sm:p-8 bg-slate-50 print:p-0 print:bg-white text-slate-900">
            {/* Ticket Header */}
            <div className="bg-slate-950 text-white p-5 rounded-2xl mb-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                    Official Intake Pass
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Job #{intakeId}</span>
                </div>
                <h4 className="text-lg font-black text-white mt-1">{COMPANY_INFO.name} Hardware Lab</h4>
                <p className="text-[11px] text-slate-400">Paris Road & Daska Road, Sialkot, Pakistan</p>
              </div>

              {/* Free Diagnostic Official Seal */}
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500/80 bg-emerald-950/60 text-emerald-400 flex flex-col items-center justify-center text-center p-1 font-bold text-[9px] uppercase tracking-tighter">
                <span>100% FREE</span>
                <span>BENCH</span>
                <span>CHECK</span>
              </div>
            </div>

            {/* Ticket Details Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs mb-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Client Name</span>
                  <span className="font-bold text-slate-900 text-sm">{clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location Area</span>
                  <span className="font-bold text-slate-800">{area}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Device & Model</span>
                  <span className="font-semibold text-slate-800">{deviceModel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Priority Status</span>
                  <span className="font-bold text-red-600">Priority Walk-In Queue</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                  Reported Symptom / Issue
                </span>
                <p className="font-medium text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {reportedFault}
                </p>
              </div>

              {/* Barcode representation */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-mono text-slate-800 tracking-widest text-sm font-bold">
                    ||| | |||| | ||| ||||| ||| ||
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{intakeId}</span>
                </div>
                <div className="text-right text-[10px] text-slate-500">
                  <span>Issued: {new Date().toLocaleDateString('en-GB')}</span>
                  <span className="block text-emerald-700 font-semibold">90-Day Written Warranty</span>
                </div>
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
              <button
                onClick={() => setIsGenerated(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Edit Details
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ticket</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Evonix Lab, I generated official Intake Pass #${intakeId} for my ${deviceModel} (${reportedFault}). My name is ${clientName} (${area}). Please register my priority queue.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
