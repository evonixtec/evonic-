import React, { useState } from 'react';
import {
  Wrench,
  Cpu,
  Laptop,
  Printer,
  Sparkles,
  Barcode,
  Wifi,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { NavPageId } from '../../types';

interface HomeDiagnosticBenchHubProps {
  onOpenQuote: (service?: string) => void;
  onNavigatePage: (page: NavPageId) => void;
  // Sub-components passed as React nodes or render props
  renderLaptopRepairEstimator: () => React.ReactNode;
  renderLiveRepairTracker: () => React.ReactNode;
  renderThermalHotspot: () => React.ReactNode;
  renderBlinkBeep: () => React.ReactNode;
  renderPrinterTroubleshooter: () => React.ReactNode;
  renderPcbPowerSimulator: () => React.ReactNode;
  renderBarcodeGenerator: () => React.ReactNode;
  renderNetworkTester: () => React.ReactNode;
  renderOfflineSyncEngine: () => React.ReactNode;
}

export const HomeDiagnosticBenchHub: React.FC<HomeDiagnosticBenchHubProps> = ({
  onOpenQuote,
  onNavigatePage,
  renderLaptopRepairEstimator,
  renderLiveRepairTracker,
  renderThermalHotspot,
  renderBlinkBeep,
  renderPrinterTroubleshooter,
  renderPcbPowerSimulator,
  renderBarcodeGenerator,
  renderNetworkTester,
  renderOfflineSyncEngine,
}) => {
  const [activeTab, setActiveTab] = useState<'estimator' | 'tracker' | 'hardwareLab' | 'factoryBench'>('estimator');
  const [activeLabTool, setActiveLabTool] = useState<'thermal' | 'beep' | 'printer' | 'pcb'>('thermal');
  const [activeFactoryTool, setActiveFactoryTool] = useState<'barcode' | 'network' | 'offline'>('barcode');

  return (
    <section className="py-16 bg-slate-900 text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>Interactive Engineering Bench</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Test Our Lab Tools Online
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Check repair costs, test hardware diagnostics, or track your live service ticket right from this bench.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePage('doorstep-support')}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Lab Inspection</span>
            </button>
          </div>
        </div>

        {/* Top Primary Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 mb-8 max-w-3xl">
          <button
            onClick={() => setActiveTab('estimator')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'estimator'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Repair Estimator</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>RMA Ticket Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('hardwareLab')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'hardwareLab'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Diagnostic Simulators</span>
          </button>

          <button
            onClick={() => setActiveTab('factoryBench')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'factoryBench'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Barcode className="w-3.5 h-3.5" />
            <span>Factory & Barcode</span>
          </button>
        </div>

        {/* Tab 1: Repair Estimator */}
        {activeTab === 'estimator' && (
          <div className="bg-slate-950/60 rounded-3xl border border-slate-800 p-2 sm:p-6">
            {renderLaptopRepairEstimator()}
          </div>
        )}

        {/* Tab 2: RMA Tracker */}
        {activeTab === 'tracker' && (
          <div className="bg-slate-950/60 rounded-3xl border border-slate-800 p-2 sm:p-6">
            {renderLiveRepairTracker()}
          </div>
        )}

        {/* Tab 3: Hardware Diagnostics Lab */}
        {activeTab === 'hardwareLab' && (
          <div className="space-y-6">
            {/* Sub-selector */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveLabTool('thermal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeLabTool === 'thermal'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>FLIR Thermal Short-Circuit</span>
              </button>

              <button
                onClick={() => setActiveLabTool('beep')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeLabTool === 'beep'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>BIOS Beep Code Decoder</span>
              </button>

              <button
                onClick={() => setActiveLabTool('printer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeLabTool === 'printer'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Printer Troubleshooter</span>
              </button>

              <button
                onClick={() => setActiveLabTool('pcb')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeLabTool === 'pcb'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>PCB Power Sequence Rail</span>
              </button>
            </div>

            <div className="bg-slate-950/60 rounded-3xl border border-slate-800 p-2 sm:p-6">
              {activeLabTool === 'thermal' && renderThermalHotspot()}
              {activeLabTool === 'beep' && renderBlinkBeep()}
              {activeLabTool === 'printer' && renderPrinterTroubleshooter()}
              {activeLabTool === 'pcb' && renderPcbPowerSimulator()}
            </div>
          </div>
        )}

        {/* Tab 4: Factory & Barcode */}
        {activeTab === 'factoryBench' && (
          <div className="space-y-6">
            {/* Sub-selector */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveFactoryTool('barcode')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeFactoryTool === 'barcode'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Export Barcode & Shipping Labels</span>
              </button>

              <button
                onClick={() => setActiveFactoryTool('network')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeFactoryTool === 'network'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Factory Network Latency Tester</span>
              </button>

              <button
                onClick={() => setActiveFactoryTool('offline')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeFactoryTool === 'offline'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Offline Edge LAN Sync</span>
              </button>
            </div>

            <div className="bg-slate-950/60 rounded-3xl border border-slate-800 p-2 sm:p-6">
              {activeFactoryTool === 'barcode' && renderBarcodeGenerator()}
              {activeFactoryTool === 'network' && renderNetworkTester()}
              {activeFactoryTool === 'offline' && renderOfflineSyncEngine()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
