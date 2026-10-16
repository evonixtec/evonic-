import React, { useState } from 'react';
import { Clock, Search, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export interface LiveRepairTrackerProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export const LiveRepairTracker: React.FC<LiveRepairTrackerProps> = ({ onOpenQuote }) => {
  const [ticketNo, setTicketNo] = useState('EVX-8821');

  return (
    <div className="py-12 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="apple-glass-box p-6 space-y-2">
          <div className="apple-badge">
            <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Diagnostic Bench System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">Live RMA Bench Repair Tracker</h1>
          <p className="text-xs sm:text-sm text-[#86868b]">Track motherboard micro-soldering progress, standby current readings, and 90-day warranty ticket status in Kotli Behram lab.</p>
        </div>

        <div className="apple-glass-box p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              aria-label="Enter RMA Ticket Number"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              placeholder="Enter RMA Ticket # (e.g. EVX-8821)"
              className="apple-input flex-1 font-mono text-xs"
            />
            <button className="apple-calculate-btn w-full sm:w-auto px-6 py-2.5 cursor-pointer">
              <Search className="w-4 h-4" />
              <span>Track Ticket</span>
            </button>
          </div>

          <div className="apple-result-box p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/6 pb-3 gap-2">
              <div>
                <span className="text-xs text-[#86868b]">Ticket:</span>
                <span className="font-mono font-bold text-[#1d1d1f] ml-1">{ticketNo}</span>
                <span className="text-xs text-[#86868b] ml-4">Device: Dell Latitude 5420</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                Passed Quality Control
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white/80 border border-slate-200/80 rounded-xl">
                <span className="text-[#86868b] block text-[10px] font-medium">Bench Current</span>
                <span className="font-mono text-emerald-700 font-bold">0.420A (Normal Boot)</span>
              </div>
              <div className="p-3 bg-white/80 border border-slate-200/80 rounded-xl">
                <span className="text-[#86868b] block text-[10px] font-medium">Voltage Rails</span>
                <span className="font-mono text-emerald-700 font-bold">19V, 3.3V, 5V Verified</span>
              </div>
              <div className="p-3 bg-white/80 border border-slate-200/80 rounded-xl">
                <span className="text-[#86868b] block text-[10px] font-medium">Certified Warranty</span>
                <span className="font-mono text-emerald-700 font-bold">90-Day Parts &amp; Labor</span>
              </div>
            </div>

            <p className="text-xs text-[#1d1d1f] bg-white/60 p-3.5 rounded-xl border border-black/6 leading-relaxed">
              <strong>Technician Notes:</strong> Blown ceramic capacitor on 19V rail safely desoldered and replaced with original Murata 25V 10uF SMD component under stereo microscope. 24-hour burn-in stress test passed. Ready for dispatch.
            </p>
          </div>
        </div>

        {/* Semantically Optimized Technical Article, FAQs & Generated High-Res Mockup */}
        <ToolArticleGuideSection toolId="live-repair-tracker" onOpenQuote={onOpenQuote} />
      </div>
    </div>
  );
};
