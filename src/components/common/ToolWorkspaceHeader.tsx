import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Copy,
  Printer,
  Share2,
  CheckCircle2,
  Grid,
  FileText,
  Boxes,
  SlidersHorizontal,
  Calculator,
  Search,
  Bot,
  Smartphone,
  Flame,
  Globe
} from 'lucide-react';
import { ToolAiCloudIntegrationModal } from './ToolAiCloudIntegrationModal';
import { ALL_TOOL_INTEGRATIONS } from '../../lib/toolIntegrations';
import { incrementToolUsage, getToolUsageCount, isToolMostPopular } from '../../lib/toolUsageTracker';

export interface ToolNavDefinition {
  id: string;
  name: string;
  shortName: string;
  category: 'business-export' | 'ecommerce-growth' | 'diagnostics-lab' | 'international-compliance';
  categoryLabel: string;
  icon: React.ReactNode;
  badge?: string;
  isMobileCore?: boolean;
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
    isMobileCore: true,
  },
  {
    id: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    shortName: 'E-Com Margin Calc',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce',
    icon: <SlidersHorizontal className="w-4 h-4 text-amber-500" />,
    badge: 'COD & RTO',
    isMobileCore: true,
  },
  {
    id: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    shortName: 'CBM Cargo Engine',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <Boxes className="w-4 h-4 text-cyan-500" />,
    badge: 'Air & Sea',
    isMobileCore: true,
  },
  {
    id: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    shortName: 'Developer Rates',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    icon: <Calculator className="w-4 h-4 text-blue-500" />,
    badge: 'Save 72%',
    isMobileCore: true,
  },
  {
    id: 'ai-visibility-checker',
    name: 'AI Visibility & GEO Readiness Auditor',
    shortName: 'AI Visibility Audit',
    category: 'ecommerce-growth',
    categoryLabel: 'Growth & SEO',
    icon: <Search className="w-4 h-4 text-purple-500" />,
    badge: 'ChatGPT / Claude',
    isMobileCore: true,
  },
  {
    id: 'uk-eu-vat-calculator',
    name: 'UK & EU VAT Reverse Charge Engine',
    shortName: 'UK & EU VAT',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe',
    icon: <Globe className="w-4 h-4 text-emerald-400" />,
    badge: 'HMRC & EU 0%',
  },
  {
    id: 'us-duty-nexus-estimator',
    name: 'US Tariff (HTS) & Section 321 Estimator',
    shortName: 'US Tariff & Nexus',
    category: 'international-compliance',
    categoryLabel: 'North America',
    icon: <Globe className="w-4 h-4 text-blue-400" />,
    badge: '$800 Exemption',
  },
  {
    id: 'ce-ukca-compliance-generator',
    name: 'UKCA & CE Declaration of Conformity',
    shortName: 'CE & UKCA DoC',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe',
    icon: <Globe className="w-4 h-4 text-purple-400" />,
    badge: 'ISO 13485 / MDR',
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
  workspaceState?: any;
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
  workspaceState,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAiCloudModal, setShowAiCloudModal] = useState(false);
  const [usageCount, setUsageCount] = useState<number>(0);

  useEffect(() => {
    // Increment usage on entry
    const count = incrementToolUsage(currentToolId);
    setUsageCount(count);
  }, [currentToolId]);

  const currentToolIntegration = ALL_TOOL_INTEGRATIONS[currentToolId];
  const isMobileCore = currentToolIntegration?.isMobileAppCore;
  const isPopular = isToolMostPopular(currentToolId);

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
    <>
      <div className="w-full bg-slate-900 border-b border-slate-800 text-white select-none print:hidden">
        {/* Main App Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Left: Breadcrumbs & Meta */}
            <div className="flex items-start sm:items-center gap-3">
              <button
                onClick={onNavigateToolsHub}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm group"
                title="Return to Online Tools Portfolio Hub"
              >
                <Grid className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
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
                  {isPopular && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 text-[10px] font-bold shadow-xs">
                      <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>Most Popular ({usageCount} uses)</span>
                    </span>
                  )}
                  {isMobileCore && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      <Smartphone className="w-3 h-3 text-emerald-400" />
                      <span>Mobile Core</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <div className="text-red-500 flex-shrink-0">{icon}</div>
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {toolTitle}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
              <button
                type="button"
                onClick={() => setShowAiCloudModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ring-1 ring-white/20 animate-pulse"
                title="Open ChatGPT, Google AI Studio, GitHub and Cloud settings"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="font-extrabold">ChatGPT &amp; Cloud Hub</span>
              </button>

              {onLoadSampleData && (
                <button
                  type="button"
                  onClick={onLoadSampleData}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Load Sample</span>
                </button>
              )}

              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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
              >
                <Grid className="w-3.5 h-3.5 text-slate-400" />
                <span>All Tools</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Switch Strip */}
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
                  {tool.isMobileCore && (
                    <span className={`text-[8.5px] px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
                      isActive ? 'bg-red-900 text-white' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      Mobile Core
                    </span>
                  )}
                  {tool.badge && !isActive && !tool.isMobileCore && (
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

      <ToolAiCloudIntegrationModal
        toolId={currentToolId}
        isOpen={showAiCloudModal}
        onClose={() => setShowAiCloudModal(false)}
        currentWorkspaceState={workspaceState}
      />
    </>
  );
};
