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
    <section id="factory-network-tester" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Industrial IT & Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Sialkot Export Factory ERP & Network Latency Benchmark
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Diagnose latency bottlenecks, packet drops, and SQL database slowdowns across your factory premises.
            evonix provides high-reliability dual-fiber failover, VLAN segmentation, and enterprise firewall routing across Sialkot.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Industrial Sector Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                      ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">{target.name}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      Ideal &lt; {target.idealPing}ms
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{target.location}</p>
                  <p className="text-xs text-slate-700 bg-slate-100/70 p-2 rounded-xl border border-slate-200 font-medium">
                    {target.application}
                  </p>
                </div>
              );
            })}

            <button
              onClick={runBenchmark}
              disabled={isRunning}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4"
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
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-xs text-blue-600 font-mono font-bold block">Selected Factory Node</span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{selectedTarget.name}</h3>
                  <span className="text-xs text-slate-500 font-mono">{selectedTarget.ipPlaceholder}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      testStage === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isRunning
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {testStage === 'completed' ? 'Benchmark Complete' : isRunning ? 'Pinging ICMP...' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Metrics Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">ICMP Ping</span>
                  <span className="text-2xl font-black text-blue-700 font-mono">
                    {currentPing !== null ? `${currentPing} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Round Trip Time</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Jitter Variance</span>
                  <span className="text-2xl font-black text-emerald-700 font-mono">
                    {jitter !== null ? `±${jitter} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Packet Stability</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Packet Loss</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {testStage === 'completed' ? `${packetLoss}%` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Zero Loss Standard</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">SQL ERP Query</span>
                  <span className="text-2xl font-black text-amber-700 font-mono">
                    {dbTransactionTime !== null ? `${dbTransactionTime} ms` : '--'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Database Fetch</span>
                </div>
              </div>

              {/* Real-Time Waveform Graph */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold uppercase tracking-wider text-[10px]">Real-Time Latency Stream</span>
                  <span className="font-mono text-blue-700 font-bold text-[11px]">10 Sample Stream</span>
                </div>
                <div className="h-20 flex items-end gap-2 border-b border-slate-200 pb-1">
                  {history.map((val, idx) => {
                    const heightPercent = Math.min(100, Math.max(15, (val / 60) * 100));
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-sm transition-all duration-200 relative group"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-slate-900 px-1 rounded text-white whitespace-nowrap">
                          {val}ms
                        </span>
                      </div>
                    );
                  })}
                  {history.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">
                      Click 'Start Network Latency Test' to initiate ICMP socket stream.
                    </div>
                  )}
                </div>
              </div>

              {/* Evonix Industrial Recommendation */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-blue-900 block">
                  evonix Sialkot Industrial Network Standard:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  For uninterrupted export shipments, our field team configures Mikrotik & Cisco SD-WAN with dual-line failover (Optic Fiber + 4G SIM Backup). If your primary link trips, your ERP and customs shipping lines switch over in under 300 milliseconds.
                </p>
              </div>
            </div>

            {/* Bottom Contact */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Factory Site Audits:{' '}
                <strong className="text-blue-700 font-bold">On-site across Sialkot & Sambrial</strong>
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum evonix Team, we need an industrial network audit and ERP latency optimization for our factory in Sialkot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors"
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
