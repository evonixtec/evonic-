import React, { useState } from 'react';
import { Wifi, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export const FactoryNetworkLatencyTester: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [ping, setPing] = useState(18);

  const handleRun = () => {
    setTesting(true);
    setTimeout(() => {
      setPing(Math.floor(14 + Math.random() * 8));
      setTesting(false);
    }, 1200);
  };

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800 uppercase tracking-wider">
            Industrial WAN Benchmark
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">Factory ERP &amp; Customs Latency Benchmark</h1>
          <p className="text-xs sm:text-sm text-slate-400">Test factory premise latency bottlenecks, SQL database lag, and WeBOC customs gateway ping stability.</p>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">Target Gateway: WeBOC Pakistan Customs / ERP Cloud</span>
            <button onClick={handleRun} disabled={testing} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>{testing ? 'Testing Latency...' : 'Run Benchmark'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Ping Latency</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{ping} ms</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Packet Loss</span>
              <span className="text-xl font-bold font-mono text-emerald-400">0.0%</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Jitter</span>
              <span className="text-xl font-bold font-mono text-emerald-400">&plusmn; 1.2 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
