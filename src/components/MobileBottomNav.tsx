import React, { useState } from 'react';
import {
  Home,
  Layers,
  ShoppingBag,
  MessageSquare,
  Download,
  X,
  Share2,
  Sparkles,
  Wrench,
  FileText,
  Barcode,
  Search,
  Calculator,
  Box,
  Cpu,
  Thermometer,
  Printer,
  Wifi,
  Clock,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { NavPageId } from './Navbar';
import { COMPANY_INFO } from '../data/content';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileBottomNavProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId | string) => void;
  onOpenChat: () => void;
  onOpenQuote: () => void;
}

interface WebToolItem {
  id: string;
  navTarget: NavPageId | string;
  name: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  category: 'business-export' | 'hardware-lab';
  categoryLabel: string;
  description: string;
  isFlagship?: boolean;
}

const WEB_TOOLS_COLLECTION: WebToolItem[] = [
  {
    id: 'invoice',
    navTarget: 'invoice',
    name: 'Global Micro-Invoice Generator',
    badge: 'Zero Database • Free',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: <FileText className="w-5 h-5 text-emerald-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Create zero-database client invoices with 100+ countries tax engine, live Code128 barcodes, and PDF export.',
    isFlagship: true,
  },
  {
    id: 'export-barcode-studio',
    navTarget: 'export-barcode-studio',
    name: 'Export Barcode Label Studio',
    badge: 'GS1-128 • Carton Shipping',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    icon: <Barcode className="w-5 h-5 text-red-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Generate compliant thermal shipping labels and outer carton barcodes for surgical, leather & sports exports.',
    isFlagship: true,
  },
  {
    id: 'ai-visibility-checker',
    navTarget: 'ai-visibility-checker',
    name: 'AI Visibility & E-E-A-T Checker',
    badge: 'AI Search • GEO Score',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: <Search className="w-5 h-5 text-purple-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Client-side audit for ChatGPT, Claude, and Google AI Overviews visibility readiness & entity schema.',
    isFlagship: true,
  },
  {
    id: 'developer-cost-calculator',
    navTarget: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    badge: 'Save 72% • Global Rates',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Calculator className="w-5 h-5 text-blue-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Compare USA, UK & UAE developer salaries against dedicated offshore engineers with instant savings summary.',
    isFlagship: true,
  },
  {
    id: 'ecommerce-calculator',
    navTarget: 'ecommerce-calculator',
    name: 'E-Commerce Margin & ROI Calculator',
    badge: 'COD & RTO • Profit Simulator',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: <SlidersHorizontal className="w-5 h-5 text-amber-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Calculate net profit margins, ad spend ROAS, multi-courier COD fees, and return loss simulations.',
    isFlagship: true,
  },
  {
    id: 'cbm-calculator',
    navTarget: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    badge: 'Air & Sea Container Packing',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    icon: <Box className="w-5 h-5 text-cyan-600" />,
    category: 'business-export',
    categoryLabel: 'Business & Export',
    description: 'Compute carton volume in CBM, air volumetric weight, and 20ft/40ft container stuffing capacity instantly.',
    isFlagship: true,
  },
  {
    id: 'pcb-power-simulator',
    navTarget: 'pcb-power-simulator',
    name: 'Motherboard Power Sequence Simulator',
    badge: 'Micro-Soldering Bench',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
    category: 'hardware-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Interactive voltage rail simulator (19V, 3.3V, 5V, RAM, VCORE) for diagnosing dead laptop motherboards.',
  },
  {
    id: 'thermal-inspector',
    navTarget: 'thermal-hotspot-inspector',
    name: 'FLIR Infrared Thermal Hotspot Inspector',
    badge: 'Infrared Bench Camera',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: <Thermometer className="w-5 h-5 text-orange-600" />,
    category: 'hardware-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Safe low-voltage injection simulator to locate shorted ceramic capacitors without burning silicon chips.',
  },
  {
    id: 'printer-diagnostics',
    navTarget: 'printer-diagnostics',
    name: 'Printer Hardware Troubleshooter',
    badge: 'LaserJet & Thermal Heads',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: <Printer className="w-5 h-5 text-slate-700" />,
    category: 'hardware-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Interactive diagnostics for HP paper jams, torn fuser sleeves, and thermal receipt auto-cutter errors.',
  },
  {
    id: 'factory-network-tester',
    navTarget: 'factory-network-tester',
    name: 'Factory ERP Network Benchmark',
    badge: 'Dual-WAN & SD-WAN',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    icon: <Wifi className="w-5 h-5 text-teal-600" />,
    category: 'hardware-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Test factory premise latency bottlenecks, SQL database lag, and WeBOC customs gateway ping stability.',
  },
  {
    id: 'live-repair-tracker',
    navTarget: 'live-repair-tracker',
    name: 'Live Repair Ticket & RMA Tracker',
    badge: 'Real-Time Bench Status',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: <Clock className="w-5 h-5 text-emerald-600" />,
    category: 'hardware-lab',
    categoryLabel: 'Hardware Diagnostics',
    description: 'Track motherboard micro-soldering progress, standby current readings, and 90-day warranty ticket status.',
  },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenChat,
  onOpenQuote,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showToolsDrawer, setShowToolsDrawer] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'business-export' | 'hardware-lab'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const isToolsActive =
    currentPage === 'tools' ||
    currentPage === 'invoice' ||
    currentPage === 'export-barcode-studio' ||
    currentPage === 'ecommerce-calculator' ||
    currentPage === 'cbm-calculator' ||
    currentPage === 'developer-cost-calculator' ||
    currentPage === 'ai-visibility-checker' ||
    currentPage === 'live-repair-tracker' ||
    currentPage === 'printer-diagnostics' ||
    currentPage === 'factory-network-tester' ||
    showToolsDrawer;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  const filteredTools = WEB_TOOLS_COLLECTION.filter((tool) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || tool.category === activeCategoryFilter;
    const matchesSearch =
      !searchFilter ||
      tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.badge.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToolSelect = (tool: WebToolItem) => {
    setShowToolsDrawer(false);
    onNavigate(tool.navTarget);
  };

  return (
    <>
      {/* Mobile Sticky Bottom Dock (App-Like Feel) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-1.5 safe-area-bottom"
        aria-label="Mobile Bottom Navigation"
      >
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

          {/* 3. Center Highlight: Instant WhatsApp Call/Chat */}
          <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
              'Hello evonix technologies, I am reaching out from your mobile app for urgent support in Sialkot.'
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

          {/* 4. Hardware Shop */}
          <button
            onClick={() => onNavigate('shop')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'shop' && !showToolsDrawer
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Shop</span>
          </button>

          {/* 5. Online Web Tools Portfolio Hub (Replaces static Invoice button per user instruction) */}
          <button
            onClick={() => {
              if (currentPage === 'tools') {
                setShowToolsDrawer((prev) => !prev);
              } else {
                setShowToolsDrawer(false);
                onNavigate('tools');
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
              isToolsActive
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-red-600'
            }`}
            title="آن لائن ٹولز پورٹ فولیو (Online Web Tools)"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1 -right-2 text-[7.5px] bg-red-600 text-white font-black px-1 py-0.2 rounded-full leading-tight shadow-xs animate-pulse">
                9+
              </span>
            </div>
            <span className="text-[10px] font-bold leading-tight">Online Tools</span>
          </button>

          {/* 6. In-App Mobile Install Option (shown if installable or iOS) */}
          {!isInstalled && (isInstallable || isIOS) && (
            <button
              onClick={handleInstallClick}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-red-600 hover:text-red-700 transition-all cursor-pointer"
              title="Install Mobile App"
            >
              <Download className="w-5 h-5 mb-0.5 animate-bounce" />
              <span className="text-[10px] font-bold leading-tight">Get App</span>
            </button>
          )}
        </div>
      </nav>

      {/* ========================================================
          ONLINE WEB TOOLS PORTFOLIO BOTTOM SHEET (DRAWER)
         ======================================================== */}
      {showToolsDrawer && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowToolsDrawer(false)}
        >
          <div
            className="bg-white rounded-t-3xl max-h-[85vh] w-full max-w-lg flex flex-col shadow-2xl border-t border-slate-200 text-slate-900 animate-slideUp overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Pull Indicator & Header */}
            <div className="pt-3 pb-3 px-5 border-b border-slate-100 flex-shrink-0 bg-slate-50/80">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase tracking-wide">
                      Web Tools Portfolio
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      100% Client-Side
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    Online Web Tools &amp; Calculators
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Zero-database business utilities, freight engines &amp; hardware simulators.
                  </p>
                </div>
                <button
                  onClick={() => setShowToolsDrawer(false)}
                  className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-500 shadow-2xs border border-slate-200 cursor-pointer"
                  aria-label="Close tools menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-200/60 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`text-[11px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'all'
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All Tools ({WEB_TOOLS_COLLECTION.length})
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('business-export')}
                  className={`text-[11px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'business-export'
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Business &amp; Export (6)
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('hardware-lab')}
                  className={`text-[11px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'hardware-lab'
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Diagnostics (5)
                </button>
              </div>
            </div>

            {/* Scrollable Tools List */}
            <div className="p-4 space-y-2.5 overflow-y-auto flex-1 overscroll-contain">
              {filteredTools.map((tool) => {
                const isCurrent = currentPage === tool.navTarget;
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleToolSelect(tool)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group text-left ${
                      isCurrent
                        ? 'bg-red-50/70 border-red-300 ring-1 ring-red-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                    }`}
                  >
                    {/* Tool Icon Box */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${
                        isCurrent
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 group-hover:bg-red-50 text-slate-700'
                      }`}
                    >
                      {tool.icon}
                    </div>

                    {/* Tool Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                          {tool.name}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${tool.badgeColor}`}
                        >
                          {tool.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-400 font-mono">
                          {tool.categoryLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                          {isCurrent ? 'Current Workspace' : 'Launch Tool'}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Note */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-between px-5">
              <span>All utilities run locally in your browser</span>
              <button
                onClick={() => setShowToolsDrawer(false)}
                className="text-red-600 font-bold hover:underline cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Guided Add-to-Home-Screen Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white font-extrabold flex items-center justify-center shadow-md">
                  EX
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Install evonix App</h3>
                  <p className="text-xs text-slate-500">Fast home screen experience</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>
                  Tap the Safari "Share" button <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> at bottom
                </span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Scroll down and select "Add to Home Screen"</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>Open evonix with 1-tap from your home screen</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
