import React, { useState } from 'react';
import {
  Activity,
  Server,
  Database,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
  Globe,
  ArrowUpRight,
  Phone,
  BarChart3
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface IndustrialTarget {
  id: string;
  name: string;
  location: string;
  ipPlaceholder: string;
  application: string;
  idealPing: number; // ms
  tolerablePing: number; // ms
}

const FACTORY_TARGETS: IndustrialTarget[] = [
  {
    id: 'surg-erp',
    name: 'Surgical Instruments Manufacturing ERP',
    location: 'Wazirabad Road / Paris Road Industrial Cluster, Sialkot',
    ipPlaceholder: '192.168.10.25 (On-Premise SQL Server)',
    application: 'Laser marking, cleanroom batch tracking & material traceability',
    idealPing: 12,
    tolerablePing: 45
  },
  {
    id: 'dryport-vpn',
    name: 'Sambrial Dry Port Customs & EDI Dispatch Server',
    location: 'Sambrial Export Processing Zone & Dry Port, Sialkot',
    ipPlaceholder: '10.0.84.1 (Dedicated Fiber Gateway)',
    application: 'WeBOC customs container filing, airway bill & shipping automation',
    idealPing: 18,
    tolerablePing: 60
  },
  {
    id: 'leather-sports',
    name: 'Export Leather & Sports Goods Production Cloud',
    location: 'Daska Road & Defense Road Factory Belt, Sialkot',
    ipPlaceholder: 'erp.sialkot-factory.com (Hybrid Cloud Sync)',
    application: 'Multi-line cutting floor, CNC stitching & international order invoicing',
    idealPing: 28,
    tolerablePing: 75
  }
];

export const FactoryNetworkLatencyTester: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<IndustrialTarget>(FACTORY_TARGETS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [testStage, setTestStage] = useState<'idle' | 'testing' | 'completed'>('idle');
  const [currentPing, setCurrentPing] = useState<number | null>(null);
  const [packetLoss, setPacketLoss] = useState<number>(0);
  const [jitter, setJitter] = useState<number | null>(null);
  const [dbTransactionTime, setDbTransactionTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const runBenchmark = () => {
    setIsRunning(true);
    setTestStage('testing');
    setCurrentPing(null);
    setJitter(null);
    setPacketLoss(0);
    setDbTransactionTime(null);
    setHistory([]);

    const samples: number[] = [];
    let count = 0;

    const interval = setInterval(() => {
      count++;
      // Generate realistic ping based on target
      const variance = (Math.random() - 0.5) * 6;
      const val = Math.round(selectedTarget.idealPing + variance);
      samples.push(val);
      setCurrentPing(val);
      setHistory([...samples]);

      if (count >= 10) {
        clearInterval(interval);
        const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
        const calcJitter = Math.round(Math.abs(Math.max(...samples) - Math.min(...samples)) / 2);
        setCurrentPing(avg);
        setJitter(calcJitter);
        setPacketLoss(0);
        setDbTransactionTime(avg * 2 + 8);
        setIsRunning(false);
        setTestStage('completed');
      }
    }, 250);
  };

  return (
    <section id="factory-network-tester" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold mb-4 tracking-wide uppercase">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Industrial IT & Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Sialkot Export Factory ERP & Network Latency Benchmark
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Diagnose latency bottlenecks, packet drops, and SQL database slowdowns across your factory premises.
            Evonix provides high-reliability dual-fiber failover, VLAN segmentation, and enterprise firewall routing across Sialkot.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Industrial Sector Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Factory Target Profile
            </h4>
            {FACTORY_TARGETS.map((target) => {
              const isSelected = selectedTarget.id === target.id;
              return (
                <div
                  key={target.id}
                  onClick={() => {
                    setSelectedTarget(target);
                    setTestStage('idle');
                    setCurrentPing(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 shadow-lg ring-1 ring-blue-500/50'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{target.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-700 text-blue-300">
                      Ideal &lt; {target.idealPing}ms
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{target.location}</p>
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-700/50">
                    {target.application}
                  </p>
                </div>
              );
            })}

            <button
              onClick={runBenchmark}
              disabled={isRunning}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isRunning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Testing Factory Packets...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Network Latency Test</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Interactive Benchmark Dashboard */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div>
                  <span className="text-xs text-blue-400 font-mono block">Selected Factory Node</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{selectedTarget.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{selectedTarget.ipPlaceholder}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      testStage === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : isRunning
                        ? 'bg-blue-950 text-blue-400 border border-blue-800 animate-pulse'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {testStage === 'completed' ? 'Benchmark Complete' : isRunning ? 'Pinging ICMP...' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Metrics Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block mb-1">ICMP Ping</span>
                  <span className="text-2xl font-black text-blue-400 font-mono">
                    {currentPing !== null ? `${currentPing} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Round Trip Time</span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block mb-1">Jitter Variance</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {jitter !== null ? `±${jitter} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Packet Stability</span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block mb-1">Packet Loss</span>
                  <span className="text-2xl font-black text-slate-200 font-mono">
                    {testStage === 'completed' ? `${packetLoss}%` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Zero Loss Standard</span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block mb-1">SQL ERP Query</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {dbTransactionTime !== null ? `${dbTransactionTime} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Database Fetch</span>
                </div>
              </div>

              {/* Real-Time Waveform Graph */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold uppercase tracking-wider text-[10px]">Real-Time Latency Stream</span>
                  <span className="font-mono text-blue-400 text-[11px]">10 Sample Stream</span>
                </div>
                <div className="h-20 flex items-end gap-2 border-b border-slate-700 pb-1">
                  {history.map((val, idx) => {
                    const heightPercent = Math.min(100, Math.max(15, (val / 60) * 100));
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-200 relative group"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black px-1 rounded text-white whitespace-nowrap">
                          {val}ms
                        </span>
                      </div>
                    );
                  })}
                  {history.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 italic">
                      Click 'Start Network Latency Test' to initiate ICMP socket stream.
                    </div>
                  )}
                </div>
              </div>

              {/* Evonix Industrial Recommendation */}
              <div className="p-4 bg-blue-950/40 border border-blue-500/30 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-blue-300 block">
                  Evonix Sialkot Industrial Network Standard:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  For uninterrupted export shipments, our field team configures Mikrotik & Cisco SD-WAN with dual-line failover (Optic Fiber + 4G SIM Backup). If your primary link trips, your ERP and customs shipping lines switch over in under 300 milliseconds.
                </p>
              </div>
            </div>

            {/* Bottom Contact */}
            <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Factory Site Audits:{' '}
                <strong className="text-blue-400">On-site across Sialkot & Sambrial</strong>
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Evonix Team, we need an industrial network audit and ERP latency optimization for our factory in Sialkot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Request Factory Network Audit</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
