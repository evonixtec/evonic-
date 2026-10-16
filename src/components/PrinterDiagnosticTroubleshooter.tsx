import React, { useState } from 'react';
import { Printer, AlertTriangle, CheckCircle2, Wrench, ShieldCheck } from 'lucide-react';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export interface PrinterDiagnosticTroubleshooterProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export const PrinterDiagnosticTroubleshooter: React.FC<PrinterDiagnosticTroubleshooterProps> = ({ onOpenQuote }) => {
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
    <div className="py-12 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="apple-glass-box p-6 space-y-2">
          <div className="apple-badge">
            <Printer className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Hardware Lab Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">Thermal Receipt Printer Diagnostic Engine</h1>
          <p className="text-xs sm:text-sm text-[#86868b]">Component-level troubleshooting for 80mm ESC/POS thermal printers, paper jams, and cutter motors.</p>
        </div>

        <div className="apple-glass-box p-6 space-y-5">
          <label className="text-xs font-bold text-[#86868b] uppercase tracking-wider block">Select Hardware Error Symptom</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => setSymptom('cutter')} 
              className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                symptom === 'cutter' 
                  ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-xs' 
                  : 'bg-white text-[#1d1d1f] border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              Cutter Blade Locked
            </button>
            <button 
              onClick={() => setSymptom('paperjam')} 
              className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                symptom === 'paperjam' 
                  ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-xs' 
                  : 'bg-white text-[#1d1d1f] border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              LaserJet Fuser Jam
            </button>
            <button 
              onClick={() => setSymptom('blurry')} 
              className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                symptom === 'blurry' 
                  ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-xs' 
                  : 'bg-white text-[#1d1d1f] border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              Faded Print / Light Lines
            </button>
          </div>

          <div className="apple-result-box p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#1d1d1f] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#0071e3]" />
              <span>{fixes[symptom].title}</span>
            </h3>
            <pre className="text-xs text-[#1d1d1f] whitespace-pre-wrap leading-relaxed font-mono bg-white/80 p-4 rounded-xl border border-black/6">
              {fixes[symptom].solution}
            </pre>
          </div>
        </div>

        {/* Semantically Optimized Technical Article, FAQs & Generated High-Res Mockup */}
        <ToolArticleGuideSection toolId="printer-diagnostics" onOpenQuote={onOpenQuote} />
      </div>
    </div>
  );
};
