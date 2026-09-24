import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  CheckCircle2,
  Server,
  Layers,
  ArrowRight,
  HardDrive,
  Cpu,
  Clock,
  Send,
  Trash2
} from 'lucide-react';

export interface QueuedTransaction {
  id: string;
  type: 'piece_rate_job' | 'export_invoice' | 'repair_ticket' | 'material_batch';
  clientOrOperator: string;
  details: string;
  timestamp: string;
  status: 'cached_offline' | 'synced';
}

const INITIAL_QUEUE: QueuedTransaction[] = [
  {
    id: 'TXN-9041',
    type: 'piece_rate_job',
    clientOrOperator: 'Master Grinder: Rashid Butt',
    details: 'Logged 45 pairs scissors satin polish (SIE 1 Unit)',
    timestamp: '14:32:10 Local Cache',
    status: 'cached_offline'
  },
  {
    id: 'TXN-9042',
    type: 'export_invoice',
    clientOrOperator: 'B2B Client: MediPro GmbH (Munich)',
    details: 'Invoice #EXP-8812 - 120 cartons micro-forceps via Sialkot Dry Port',
    timestamp: '14:35:45 Local Cache',
    status: 'cached_offline'
  },
  {
    id: 'TXN-9043',
    type: 'repair_ticket',
    clientOrOperator: 'Walk-in Intake: Dell Latitude 5420',
    details: 'Ticket #EVX-7821 standby current test passed (0.012A)',
    timestamp: '14:40:02 Local Cache',
    status: 'cached_offline'
  }
];

export const OfflineDataSyncEngine: React.FC = () => {
  const [isSimulatedOnline, setIsSimulatedOnline] = useState<boolean>(false);
  const [queue, setQueue] = useState<QueuedTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('evonix_offline_queue');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_QUEUE;
  });

  const [newOperatorName, setNewOperatorName] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('evonix_offline_queue', JSON.stringify(queue));
    } catch (e) {
      // ignore
    }
  }, [queue]);

  const handleAddOfflineRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOperatorName.trim() || !newDetails.trim()) return;

    const newRecord: QueuedTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'piece_rate_job',
      clientOrOperator: newOperatorName.trim(),
      details: newDetails.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Local Edge',
      status: isSimulatedOnline ? 'synced' : 'cached_offline'
    };

    setQueue((prev) => [newRecord, ...prev]);
    setNewOperatorName('');
    setNewDetails('');
  };

  const handleSimulateBroadbandRestore = () => {
    setIsSimulatedOnline(true);
    setSyncing(true);

    setTimeout(() => {
      setQueue((prev) =>
        prev.map((item) => ({
          ...item,
          status: 'synced'
        }))
      );
      setSyncing(false);
    }, 1800);
  };

  const handleSimulateCutover = () => {
    setIsSimulatedOnline(false);
  };

  const handleClear = () => {
    setQueue([]);
  };

  const offlineCount = queue.filter((q) => q.status === 'cached_offline').length;
  const syncedCount = queue.filter((q) => q.status === 'synced').length;

  return (
    <section id="offline-sync-engine" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-800">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Industrial Resilient Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Local Edge & Offline LAN Sync Engine
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Broadband cable cuts or generator cutovers on Sialkot Daska Road will never halt your factory floor. Test our zero-latency offline SQLite and local IndexedDB transactional queue.
          </p>
        </div>

        {/* Network State Controller Banner */}
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                  isSimulatedOnline
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                    : 'bg-red-950/80 text-red-400 border-red-700 animate-pulse'
                }`}
              >
                {isSimulatedOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {isSimulatedOnline ? 'High-Speed WAN Fiber Online' : 'Broadband Cable Down (100% Offline Edge Mode)'}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isSimulatedOnline
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-red-950 text-red-300 border-red-800'
                    }`}
                  >
                    {isSimulatedOnline ? 'Cloud Synced' : 'Edge SQLite Active'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {isSimulatedOnline
                    ? 'Connected to Evonix Central Cloud. Changes synchronize bidirectionally.'
                    : 'Internet disconnected. All barcode scans, piece-rate wages, and job cards save to local mini-server memory.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isSimulatedOnline ? (
                <button
                  onClick={handleSimulateCutover}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <WifiOff className="w-4 h-4 text-red-400" />
                  <span>Simulate Factory Internet Cut</span>
                </button>
              ) : (
                <button
                  onClick={handleSimulateBroadbandRestore}
                  disabled={syncing}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                  <span>Restore WAN & Auto-Sync ({offlineCount} Queued)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Transaction Simulator Form & Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form to push offline record */}
          <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <span>Simulate Factory Floor Transaction</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Zero Latency</span>
            </div>

            <form onSubmit={handleAddOfflineRecord} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Operator or Client Name:
                </label>
                <input
                  type="text"
                  value={newOperatorName}
                  onChange={(e) => setNewOperatorName(e.target.value)}
                  placeholder="e.g. Master Asif (Stitching Unit 3)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Job Card / Transaction Details:
                </label>
                <input
                  type="text"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="e.g. Scanned 50 match soccer balls batch #A-89"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Log Record ({isSimulatedOnline ? 'Instant Cloud Sync' : 'Cache in Local SQLite'})</span>
              </button>
            </form>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between font-mono">
                <span>Cached Offline Transactions:</span>
                <span className="text-amber-400 font-bold">{offlineCount}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Cloud Synchronized Records:</span>
                <span className="text-emerald-400 font-bold">{syncedCount}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Transaction Logs */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Local Storage & IndexedDB Queue</span>
                </span>
                {queue.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-[11px] text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-400 font-bold">{item.id}</span>
                        <span className="text-slate-300 font-bold">{item.clientOrOperator}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{item.details}</p>
                      <span className="text-[10px] text-slate-500 font-mono block pt-0.5">{item.timestamp}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        item.status === 'synced'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                      }`}
                    >
                      {item.status === 'synced' ? 'Synced' : 'Local SQLite'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Standard feature on all Evonix Industrial Factory Deployments</span>
              <span className="text-emerald-400 font-mono font-bold">100% Data Protection Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
