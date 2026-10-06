import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  RotateCcw,
  Copy,
  Printer,
  Share2,
  CheckCircle2,
  Grid,
  FileText,
  Barcode,
  Boxes,
  SlidersHorizontal,
  Calculator,
  Search,
  Clock,
  Wifi,
  ChevronRight,
  ExternalLink,
  Laptop
} from 'lucide-react';

export interface ToolNavDefinition {
  id: string;
  name: string;
  shortName: string;
  category: 'business-export' | 'ecommerce-growth' | 'diagnostics-lab';
  categoryLabel: string;
  icon: React.ReactNode;
  badge?: string;
}

export const ALL_TOOLS_DIRECTORY: ToolNavDefinition[] = [
  {
    id: 'invoice',
    name: 'Global Micro-Invoice Generator',
    shortName: 'Invoice Maker',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <FileText className="w-4 h-4 text-emerald-500" />,
    badge: 'Free · Code128',
  },
  {
    id: 'export-barcode-studio',
    name: 'Export Barcode Label Studio',
    shortName: 'Barcode Studio',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <Barcode className="w-4 h-4 text-red-500" />,
    badge: 'GS1-128',
  },
  {
    id: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    shortName: 'CBM Cargo Engine',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <Boxes className="w-4 h-4 text-cyan-500" />,
    badge: 'Air & Sea',
  },
  {
    id: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    shortName: 'E-Com Margin Calc',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce',
    icon: <SlidersHorizontal className="w-4 h-4 text-amber-500" />,
    badge: 'COD & RTO',
  },
  {
    id: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    shortName: 'Developer Rates',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <Calculator className="w-4 h-4 text-blue-500" />,
    badge: 'Save 72%',
  },
  {
    id: 'ai-visibility-checker',
    name: 'AI Visibility & GEO Readiness Auditor',
    shortName: 'AI Visibility Audit',
    category: 'ecommerce-growth',
    categoryLabel: 'Growth & SEO',
    icon: <Search className="w-4 h-4 text-purple-500" />,
    badge: 'ChatGPT / Claude',
  },
  {
    id: 'live-repair-tracker',
    name: 'Live RMA Bench Repair Tracker',
    shortName: 'Live RMA Tracker',
    category: 'diagnostics-lab',
    categoryLabel: 'Diagnostics Lab',
    icon: <Clock className="w-4 h-4 text-emerald-500" />,
    badge: 'Bench Status',
  },
  {
    id: 'printer-diagnostics',
    name: 'Thermal Receipt Printer Diagnostic Engine',
    shortName: 'Printer Diagnostics',
    category: 'diagnostics-lab',
    categoryLabel: 'Diagnostics Lab',
    icon: <Printer className="w-4 h-4 text-orange-500" />,
    badge: 'ESC/POS 80mm',
  },
  {
    id: 'factory-network-tester',
    name: 'Factory ERP & Customs Latency Benchmark',
    shortName: 'Network Latency Test',
    category: 'diagnostics-lab',
    categoryLabel: 'Diagnostics Lab',
    icon: <Wifi className="w-4 h-4 text-teal-500" />,
    badge: 'Dual-WAN',
  },
];

interface ToolWorkspaceHeaderProps {
  currentToolId: string;
  toolTitle: string;
  toolCategory: string;
  toolDescription: string;
  icon: React.ReactNode;
  onNavigateTool: (toolId: string) => void;
  onNavigateToolsHub: () => void;
  onReset?: () => void;
  onLoadSampleData?: () => void;
  onCopySummary?: () => void;
  onPrint?: () => void;
}

export const ToolWorkspaceHeader: React.FC<ToolWorkspaceHeaderProps> = ({
  currentToolId,
  toolTitle,
  toolCategory,
  toolDescription,
  icon,
  onNavigateTool,
  onNavigateToolsHub,
  onReset,
  onLoadSampleData,
  onCopySummary,
  onPrint,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    try {
      const url = `${window.location.origin}/${currentToolId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-white select-none print:hidden">
      {/* 1. Main Tool Workspace App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Breadcrumb, Tool Title & Operational State */}
          <div className="flex items-start sm:items-center gap-3">
            <button
              onClick={onNavigateToolsHub}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm group"
              title="Return to Online Tools Portfolio Hub"
            >
              <Grid className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
            </button>

            <div>
              {/* Breadcrumb & Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <button
                  onClick={onNavigateToolsHub}
                  className="hover:text-red-400 transition-colors font-medium cursor-pointer"
                >
                  Online Web Tools
                </button>
                <span aria-hidden="true">/</span>
                <span className="text-slate-400">{toolCategory}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% Client-Side Engine</span>
                </span>
              </div>

              {/* Tool Title */}
              <div className="flex items-center gap-2 mt-0.5">
                <div className="text-red-500 flex-shrink-0">{icon}</div>
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {toolTitle}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Workspace Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
            {onLoadSampleData && (
              <button
                type="button"
                onClick={onLoadSampleData}
                className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Fill realistic sample inputs instantly"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Load Sample Data</span>
              </button>
            )}

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Clear inputs back to default state"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {onCopySummary && (
              <button
                type="button"
                onClick={onCopySummary}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy calculated output summary to clipboard"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy Summary</span>
              </button>
            )}

            {onPrint && (
              <button
                type="button"
                onClick={onPrint}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Print or export PDF specification sheet"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy shareable direct tool link"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onNavigateToolsHub}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto sm:ml-0"
              title="Browse all 9+ tools in the portfolio"
            >
              <Grid className="w-3.5 h-3.5 text-slate-400" />
              <span>All Tools Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Tool Switcher Strip (Allows rapid 1-click switching between all tools) */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-2 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
            Quick Switch:
          </span>

          {ALL_TOOLS_DIRECTORY.map((tool) => {
            const isActive = tool.id === currentToolId;
            return (
              <button
                key={tool.id}
                onClick={() => onNavigateTool(tool.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs font-bold ring-1 ring-red-400'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tool.icon}
                <span>{tool.shortName}</span>
                {tool.badge && !isActive && (
                  <span className="text-[9.5px] text-slate-400 font-mono">
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
