import React, { useState } from 'react';
import { Printer, AlertTriangle, CheckCircle2, Wrench } from 'lucide-react';

export const PrinterDiagnosticTroubleshooter: React.FC = () => {
  const [symptom, setSymptom] = useState<'cutter' | 'paperjam' | 'blurry'>('cutter');

  const fixes = {
    cutter: {
      title: 'Auto-Cutter Jammed / Error LED Flashing Red',
      solution: '1. Power off printer.\n2. Open front cutter maintenance wheel compartment.\n3. Turn manual white gear wheel clockwise until cutter blade retreats.\n4. Check for curled thermal paper shards inside blade rail.',
    },
    paperjam: {
      title: 'HP / Canon LaserJet Paper Jam in Fuser Unit',
      solution: '1. Open rear fuser door.\n2. Check orange teflon heating sleeve for tears or burnt toner buildup.\n3. Verify delivery sensor flag returns freely.\n4. Clean rubber paper pickup rollers with isopropyl alcohol.',
    },
    blurry: {
      title: 'Light / Faded Thermal Receipt & Missing Barcode Lines',
      solution: '1. Clean ceramic thermal printhead with 99% isopropyl alcohol swab.\n2. Check power adapter voltage (must output clean 24V 2.5A DC under load).\n3. Adjust print darkness density via ESC/POS utility.',
    },
  };

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-950 text-orange-400 border border-orange-800 uppercase tracking-wider">
            Hardware Lab Diagnostics
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Thermal Receipt Printer Diagnostic Engine</h1>
          <p className="text-xs sm:text-sm text-slate-400">Component-level troubleshooting for 80mm ESC/POS thermal printers, paper jams, and cutter motors.</p>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
          <label className="text-xs font-bold text-slate-300 block">Select Hardware Error Symptom</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button onClick={() => setSymptom('cutter')} className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${symptom === 'cutter' ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-700'}`}>
              Cutter Blade Locked
            </button>
            <button onClick={() => setSymptom('paperjam')} className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${symptom === 'paperjam' ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-700'}`}>
              LaserJet Fuser Jam
            </button>
            <button onClick={() => setSymptom('blurry')} className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${symptom === 'blurry' ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-700'}`}>
              Faded Print / Light Lines
            </button>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 mt-4 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-orange-400" />
              <span>{fixes[symptom].title}</span>
            </h3>
            <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              {fixes[symptom].solution}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
