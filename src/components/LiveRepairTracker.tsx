import React, { useState } from 'react';
import { Clock, Search, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const LiveRepairTracker: React.FC = () => {
  const [ticketNo, setTicketNo] = useState('EVX-8821');

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase tracking-wider">
            Diagnostic Bench System
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Live RMA Bench Repair Tracker</h1>
          <p className="text-xs sm:text-sm text-slate-400">Track motherboard micro-soldering progress, standby current readings, and 90-day warranty ticket status in Kolti Behram lab.</p>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              placeholder="Enter RMA Ticket # (e.g. EVX-8821)"
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-hidden"
            />
            <button className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              <span>Track Ticket</span>
            </button>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400">Ticket:</span>
                <span className="font-mono font-bold text-white ml-1">{ticketNo}</span>
                <span className="text-xs text-slate-400 ml-4">Device: Dell Latitude 5420</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300">Passed Quality Control</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-800/60 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Bench Current</span>
                <span className="font-mono text-emerald-400 font-bold">0.420A (Normal Boot)</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Voltage Rails</span>
                <span className="font-mono text-emerald-400 font-bold">19V, 3.3V, 5V Verified</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Certified Warranty</span>
                <span className="font-mono text-emerald-400 font-bold">90-Day Parts &amp; Labor</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              Technician Notes: Blown ceramic capacitor on 19V rail safely desoldered and replaced with original Murata 25V 10uF SMD component under stereo microscope. 24-hour burn-in stress test passed. Ready for dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
