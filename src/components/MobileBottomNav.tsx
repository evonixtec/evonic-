import React, { useState, useEffect } from 'react';
import {
  Home,
  Layers,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  FileText,
  Boxes,
  SlidersHorizontal,
  Calculator,
  Search,
  ArrowRight,
  X,
  Smartphone,
  Globe,
  Bot,
  Flame
} from 'lucide-react';
import { NavPageId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { ToolAiCloudIntegrationModal } from './common/ToolAiCloudIntegrationModal';
import { getAllToolUsage, isToolMostPopular } from '../lib/toolUsageTracker';

interface MobileBottomNavProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId | string) => void;
  onOpenChat: () => void;
  onOpenQuote?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote,
}) => {
  const [showToolsDrawer, setShowToolsDrawer] = useState(false);
  const [activeIntegrationToolId, setActiveIntegrationToolId] = useState<string | null>(null);
  const [usageMap, setUsageMap] = useState<Record<string, number>>({});

  useEffect(() => {
    setUsageMap(getAllToolUsage());
  }, [showToolsDrawer]);

  const mobileTools = [
    {
      id: 'invoice',
      name: 'Global Micro-Invoice Generator',
      urduName: 'آن لائن انوائس جنریٹر',
      desc: 'Zero-database multi-currency commercial invoices with Code128 barcodes.',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      order: 1,
    },
    {
      id: 'ecommerce-calculator',
      name: 'E-Commerce Margin & COD Simulator',
      urduName: 'ای کامرس مارجن اور سی او ڈی کیلکولیٹر',
      desc: 'Simulate net profit margins, ad spend ROAS, and return loss rates.',
      icon: <SlidersHorizontal className="w-5 h-5 text-amber-600" />,
      order: 2,
    },
    {
      id: 'cbm-calculator',
      name: 'B2B Industrial CBM & Freight Engine',
      urduName: 'کارگو سی بی ایم کیلکولیٹر',
      desc: 'Calculate carton CBM volume and 20ft/40ft container stuffing capacity.',
      icon: <Boxes className="w-5 h-5 text-cyan-600" />,
      order: 3,
    },
    {
      id: 'developer-cost-calculator',
      name: 'Dedicated Developer Cost Calculator',
      urduName: 'ڈویلپر کاسٹ کیلکولیٹر',
      desc: 'Compare USA/UK software salaries against dedicated offshore squads.',
      icon: <Calculator className="w-5 h-5 text-blue-600" />,
      order: 4,
    },
    {
      id: 'ai-visibility-checker',
      name: 'AI Visibility & E-E-A-T Checker',
      urduName: 'اے آئی سرچ وزیبلٹی چیکر',
      desc: 'Client-side audit for ChatGPT, Claude, and Google AI Overviews citation.',
      icon: <Search className="w-5 h-5 text-purple-600" />,
      order: 5,
    },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-1.5 safe-area-bottom print:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'home' && !showToolsDrawer
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Home</span>
          </button>

          {/* 2. Services */}
          <button
            onClick={() => onNavigate('services')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'services' && !showToolsDrawer
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Services</span>
          </button>

          {/* 3. WhatsApp Center Action */}
          <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
              'Hello evonix technologies, I am reaching out from your website for tech support in Kotli Behram, Sialkot.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center -mt-4 relative group"
            title="Urgent WhatsApp Support"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 active:scale-95 transition-all">
              <MessageSquare className="w-6 h-6 fill-white/20" />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 mt-0.5">WhatsApp</span>
          </a>

          {/* 4. Tools Hub */}
          <button
            onClick={() => setShowToolsDrawer(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
              showToolsDrawer ? 'text-red-600 font-bold scale-105' : 'text-slate-500 hover:text-red-600'
            }`}
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 mb-0.5 text-red-600" />
              <span className="absolute -top-1 -right-2 text-[7.5px] bg-red-600 text-white font-black px-1 rounded-full animate-pulse">
                5+
              </span>
            </div>
            <span className="text-[10px] font-bold leading-tight">App Tools</span>
          </button>
        </div>
      </nav>

      {/* Tools Drawer */}
      {showToolsDrawer && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowToolsDrawer(false)}
        >
          <div
            className="bg-white rounded-t-3xl max-h-[85vh] w-full max-w-lg flex flex-col shadow-2xl border-t border-slate-200 text-slate-900 animate-slideUp overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-3 pb-3 px-5 border-b border-slate-100 flex-shrink-0 bg-slate-50">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-wide">
                      📱 5 Core Mobile Tools
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      موبائل ایپلیکیشن کے 5 ٹولز
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    Mobile Application Workstations
                  </h3>
                </div>
                <button
                  onClick={() => setShowToolsDrawer(false)}
                  className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-500 border border-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2.5 overflow-y-auto flex-1 overscroll-contain">
              {mobileTools.map((tool) => {
                const count = usageMap[tool.id] || 0;
                const isPopular = count > 5;

                return (
                  <div
                    key={tool.id}
                    onClick={() => {
                      setShowToolsDrawer(false);
                      onNavigate(tool.id as NavPageId);
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-red-400 bg-white hover:bg-red-50/40 transition-all cursor-pointer flex items-start gap-3.5 group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-red-50 flex items-center justify-center flex-shrink-0">
                      {tool.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 truncate">
                          {tool.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {isPopular && (
                            <span className="text-[8.5px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500 text-white flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 fill-white" />
                              <span>Popular</span>
                            </span>
                          )}
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Core #{tool.order}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{tool.desc}</p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-400">{tool.urduName}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIntegrationToolId(tool.id);
                            }}
                            className="text-slate-500 hover:text-blue-600 font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50"
                          >
                            AI / Cloud
                          </button>
                          <span className="text-red-600 font-bold inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            Open <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-between px-5">
              <span>Kotli Behram, Sialkot · 100% Client-Side</span>
              <button
                onClick={() => {
                  setShowToolsDrawer(false);
                  onNavigate('tools');
                }}
                className="text-red-600 font-bold hover:underline cursor-pointer"
              >
                Browse All 12 Tools &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {activeIntegrationToolId && (
        <ToolAiCloudIntegrationModal
          toolId={activeIntegrationToolId}
          isOpen={!!activeIntegrationToolId}
          onClose={() => setActiveIntegrationToolId(null)}
        />
      )}
    </>
  );
};
