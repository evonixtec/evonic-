import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/content';
import { EvonixLogo } from './EvonixLogo';
import {
  ChevronDown,
  Sparkles,
  Search,
  MessageSquare,
  Globe,
  Monitor,
  Wrench,
  Clock,
  ShoppingBag,
  HelpCircle,
  FileText,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
  Printer,
  Laptop,
  Cpu,
  Barcode,
  MapPin,
  Calculator,
  Boxes,
  Landmark,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { isToolPage } from '../lib/toolUtils';
import { isToolsSubdomain, isStoreSubdomain, getMainAgencyDomainUrl, getToolsDomainUrl, getStoreDomainUrl } from '../lib/domainUtils';

import { NavPageId } from '../types';
export type { NavPageId };

interface NavbarProps {
  currentPage: NavPageId;
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (serviceType?: string) => void;
  onOpenSearch: () => void;
  isToolsSubdomain?: boolean;
  isStoreSubdomain?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenQuote,
  onOpenSearch,
  isToolsSubdomain: isToolsSubdomainProp,
  isStoreSubdomain: isStoreSubdomainProp,
}) => {
  const isSubTools = isToolsSubdomainProp !== undefined ? isToolsSubdomainProp : isToolsSubdomain();
  const isSubStore = isStoreSubdomainProp !== undefined ? isStoreSubdomainProp : isStoreSubdomain();
  const isSub = isSubTools;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePageSelect = (page: NavPageId, subTarget?: string) => {
    onNavigatePage(page, subTarget);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const isToolsActive =
    currentPage === 'tools' ||
    currentPage === 'invoice' ||
    currentPage === 'export-barcode-studio' ||
    currentPage === 'ecommerce-calculator' ||
    currentPage === 'ebay-fee-calculator' ||
    currentPage === 'cbm-calculator' ||
    currentPage === 'developer-cost-calculator' ||
    currentPage === 'ai-visibility-checker' ||
    currentPage === 'live-repair-tracker' ||
    currentPage === 'printer-diagnostics' ||
    currentPage === 'factory-network-tester' ||
    currentPage === 'ai-trip-planner' ||
    currentPage === 'ai-travel-tools';

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-[12px] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)] border-b border-slate-200/80 py-2'
          : 'bg-white/90 backdrop-blur-[12px] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border-b border-slate-200/60 py-2.5'
      }`}
    >
      {/* 3D Top Metallic / Radiant Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 via-amber-500 to-red-600 shadow-[0_1px_8px_rgba(220,38,38,0.4)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo with 3D Nano Tagline */}
          <button
            onClick={() => {
              if (isSub) {
                handlePageSelect('tools');
              } else {
                handlePageSelect('home');
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer transition-all duration-200 hover:scale-[1.02] flex-shrink-0"
            aria-label={isSub ? "evonix Tools Workstation" : "evonix Home"}
          >
            <div className="relative p-1 rounded-xl transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(220,38,38,0.3)]">
              <EvonixLogo size="md" forceTheme="light" />
            </div>
            <div className="hidden sm:flex flex-col text-left pl-2.5 border-l border-slate-200/90">
              {isSubStore ? (
                <>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 leading-tight flex items-center gap-1.5">
                    <span>Hardware Store</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </span>
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight mt-0.5">
                    store.evonixtec.com
                  </span>
                </>
              ) : isSubTools ? (
                <>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 leading-tight flex items-center gap-1.5">
                    <span>Tools Workstation</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </span>
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight mt-0.5">
                    tools.evonixtec.com
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-600 leading-tight flex items-center gap-1.5">
                    <span>Dubai Heritage</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </span>
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight mt-0.5">
                    Software House &amp; AI
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Desktop Navigation Links with Clean Professional Grouping */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {/* 1. Home Link */}
            <button
              onClick={() => handlePageSelect('home')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentPage === 'home'
                  ? 'text-red-700 bg-red-50/90 font-bold shadow-2xs border border-red-200/60'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Home
            </button>

            {/* 2. Services Dropdown (2-Column Clean Mega-Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('services')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'services'
                    ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-red-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Services Dropdown */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-80 pt-1.5 z-50">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-2.5 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
                      <span>Core Services</span>
                      <span className="text-red-600 font-bold">Dubai Stds</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('services', 'web-development')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          Website Development
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          E-Commerce & High-Speed Next.js Portals
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'software-pos')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                        <Monitor className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Software & POS Systems
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          Retail ERP, Invoicing & Inventory Control
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'ai-automation')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          Enterprise AI &amp; Automation
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          Autonomous LLM Pipelines &amp; RAG Systems
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'cloud-architecture')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          Cloud &amp; Scalable Architecture
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          Distributed Microservices &amp; 99.9% Uptime
                        </div>
                      </div>
                    </button>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handlePageSelect('services')}
                        className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-red-50 text-center text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors border border-slate-200"
                      >
                        <span>Open Full Services Directory</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 3. Agency Domain Navigation (Clean B2B Software House) */}
            {!isSubTools && !isSubStore && (
              <>
                {/* Portfolio */}
                <button
                  onClick={() => handlePageSelect('portfolio')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    currentPage === 'portfolio'
                      ? 'text-red-700 bg-red-50/90 font-bold shadow-2xs border border-red-200/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  Portfolio
                </button>

                {/* Free Tools Subdomain Bridge */}
                <a
                  href={getToolsDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 group"
                  title="22+ Free E-Commerce, Export & Freight Calculators on tools.evonixtec.com"
                >
                  <span>Free Tools</span>
                  <span className="text-[9px] bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5">
                    <span>22+ Free</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </a>

                {/* Store Subdomain Bridge */}
                <a
                  href={getStoreDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 group"
                  title="Certified IT Hardware, POS Terminals & Enterprise Laptops on store.evonixtec.com"
                >
                  <span>Hardware Store</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5">
                    <span>Store</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </a>
              </>
            )}

            {/* Tools Subdomain Header Controls */}
            {isSubTools && (
              <>
                <a
                  href={getMainAgencyDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors shadow-2xs mr-1"
                >
                  <span>← Agency Home</span>
                </a>

                <button
                  onClick={() => handlePageSelect('tools')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    currentPage === 'tools'
                      ? 'text-blue-700 bg-blue-50 font-bold border border-blue-200'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  All Tools (22+)
                </button>

                <a
                  href={getStoreDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 group"
                >
                  <span>Hardware Store</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Store</span>
                </a>
              </>
            )}

            {/* Store Subdomain Header Controls */}
            {isSubStore && (
              <>
                <a
                  href={getMainAgencyDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors shadow-2xs mr-1"
                >
                  <span>← Agency Home</span>
                </a>

                <button
                  onClick={() => handlePageSelect('shop')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    currentPage === 'shop'
                      ? 'text-amber-800 bg-amber-50 font-bold border border-amber-200'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  Hardware Catalog
                </button>

                <a
                  href={getToolsDomainUrl()}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 group"
                >
                  <span>Free Tools (22+)</span>
                  <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Tools</span>
                </a>
              </>
            )}

            {/* 4. UNIFIED DYNAMIC DROPDOWN MENU ENGINE: WEB TOOLS PORTFOLIO */}
            {isSub && (
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'tools' ? null : 'tools');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isToolsActive
                    ? 'text-blue-700 bg-gradient-to-b from-blue-50 to-indigo-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(37,99,235,0.12)] border border-blue-200/80'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={activeDropdown === 'tools'}
              >
                <span>⚙️ Online Tools</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'tools' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'tools' && (
                <div className="absolute top-full left-0 w-88 pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-2 space-y-1 max-h-[85vh] overflow-y-auto">
                    {/* Top Hub Launch Banner */}
                    <button
                      onClick={() => handlePageSelect('tools')}
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between cursor-pointer shadow-xs hover:opacity-95 transition-all mb-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🛠️</span>
                        <div>
                          <div className="text-xs font-bold leading-tight">Web Tools Portfolio Hub</div>
                          <div className="text-[10px] text-red-100">Browse all 9+ browser utilities</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>

                    {/* TOP FEATURED SPOTLIGHT: eBay Fee & Profit Builder */}
                    <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-200/90 rounded-xl p-1 mb-1">
                      <a
                        href="/ebay-fee-calculator"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageSelect('ebay-fee-calculator');
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-all flex items-center gap-2.5 cursor-pointer group ${
                          currentPage === 'ebay-fee-calculator' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'hover:bg-white/90'
                        }`}
                      >
                        <span className="text-base flex items-center justify-center flex-shrink-0">🏷️</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold truncate flex items-center gap-1.5 ${
                            currentPage === 'ebay-fee-calculator' ? 'text-white' : 'text-blue-900 group-hover:text-blue-700'
                          }`}>
                            <span>eBay Fee &amp; Profit Builder</span>
                            <span className={`text-[8px] px-1 py-0.2 rounded font-bold ${
                              currentPage === 'ebay-fee-calculator' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'
                            }`}>
                              10 MARKETS
                            </span>
                          </div>
                          <div className={`text-[10px] truncate ${
                            currentPage === 'ebay-fee-calculator' ? 'text-blue-100' : 'text-slate-600'
                          }`}>
                            FVF, Promoted Ads &amp; Real-Time FX
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          currentPage === 'ebay-fee-calculator' ? 'bg-blue-800 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          HOT · Pro
                        </span>
                      </a>
                    </div>

                    <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 mb-1">
                      Business &amp; Export Tools
                    </span>

                    <button
                      onClick={() => handlePageSelect('invoice')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'invoice' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🗂️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Global Micro-Invoice Generator
                        </div>
                        <div className="text-[10px] text-slate-500">100+ countries tax engine & barcode</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Free</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('export-barcode-studio')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'export-barcode-studio' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🏷️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Export Barcode Label Studio
                        </div>
                        <div className="text-[10px] text-slate-500">GS1-128 & outer carton 4×6 labels</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">Export</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('cbm-calculator')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'cbm-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">📦</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          B2B Industrial CBM Engine
                        </div>
                        <div className="text-[10px] text-slate-500">Volumetric mass & container capacity</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">Cargo</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('developer-cost-calculator')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'developer-cost-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">💻</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Developer Cost Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Compare USA vs Offshore rates & savings</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Save 72%</span>
                    </button>

                    <a
                      href="/sialkot-export-erp"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('sialkot-export-erp');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'sialkot-export-erp' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🏭</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Sialkot Export ERP Suite
                        </div>
                        <div className="text-[10px] text-slate-500">WeBOC, export invoices & batch tracking</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">ERP</span>
                    </a>

                    <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 mt-2 pt-2 pb-1 mb-1">
                      E-Commerce &amp; Growth
                    </span>

                    <button
                      onClick={() => handlePageSelect('ecommerce-calculator')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'ecommerce-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">📊</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          E-Commerce Margin Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Multi-courier COD & RTO simulator</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Live</span>
                    </button>

                    <a
                      href="/ebay-fee-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('ebay-fee-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'ebay-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🏷️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate flex items-center gap-1.5">
                          <span>eBay Fee &amp; Profit Builder</span>
                          <span className="text-[8px] bg-blue-100 text-blue-800 px-1 py-0.2 rounded font-bold">10 Markets</span>
                        </div>
                        <div className="text-[10px] text-slate-500">FVF, Promoted Ads &amp; Real-Time FX</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Pro</span>
                    </a>

                    <a
                      href="/tiktok-shop-fee-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('tiktok-shop-fee-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'tiktok-shop-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🎵</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          TikTok Shop Fee Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Commission, margin &amp; affiliate ROI</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black text-white">New</span>
                    </a>

                    <a
                      href="/amazon-fba-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('amazon-fba-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'amazon-fba-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">📦</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Amazon FBA Fee Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Fulfillment, storage &amp; profit margin</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">FBA</span>
                    </a>

                    <a
                      href="/shopify-fee-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('shopify-fee-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'shopify-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🛍️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Shopify Fee Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Plan tiers, gateway &amp; 3P transaction fees</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Shopify</span>
                    </a>

                    <a
                      href="/stripe-fee-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('stripe-fee-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'stripe-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">💳</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Stripe Fee Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Forward &amp; reverse payout fees</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Stripe</span>
                    </a>

                    <a
                      href="/temu-seller-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('temu-seller-calculator');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'temu-seller-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🏷️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Temu Seller Calculator
                        </div>
                        <div className="text-[10px] text-slate-500">Temu margins, warehouse &amp; payouts</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">Temu</span>
                    </a>

                    <a
                      href="/installation-guide"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('installation-guide');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'installation-guide' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">💻</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Desktop Setup &amp; Tools Guide
                        </div>
                        <div className="text-[10px] text-slate-500">Windows (.exe) &amp; Mac (.dmg) free setup</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">Guide</span>
                    </a>

                    <a
                      href="/trend-intelligence-suite"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageSelect('trend-intelligence-suite');
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'trend-intelligence-suite' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🚀</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate flex items-center gap-1.5">
                          <span>Trend Intelligence Suite</span>
                          <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.2 rounded font-bold">V15</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Multi-platform keyword trend scoring &amp; failover</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Pro</span>
                    </a>

                    <button
                      onClick={() => handlePageSelect('ai-visibility-checker')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'ai-visibility-checker' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🔍</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 truncate">
                          AI Visibility & E-E-A-T Checker
                        </div>
                        <div className="text-[10px] text-slate-500">ChatGPT & Google AI Overview Audit</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">GEO</span>
                    </button>

                    <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 mt-2 pt-2 pb-1 mb-1">
                      AI &amp; Travel Solutions
                    </span>

                    <button
                      onClick={() => handlePageSelect('ai-trip-planner')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'ai-trip-planner' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">✈️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-teal-600 truncate flex items-center gap-1.5">
                          <span>AI Trip Planner</span>
                          <span className="text-[8px] bg-teal-100 text-teal-800 px-1 py-0.2 rounded font-bold">New</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Day-by-day vacation itinerary generator</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700">Free AI</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('ai-travel-tools')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'ai-travel-tools' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🧭</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-teal-600 truncate">
                          10 Best AI Travel Tools Guide
                        </div>
                        <div className="text-[10px] text-slate-500">Curated AI travel itinerary tools (2026)</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Guide</span>
                    </button>

                    <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 mt-2 pt-2 pb-1 mb-1">
                      Hardware Diagnostics Lab
                    </span>

                    <button
                      onClick={() => handlePageSelect('live-repair-tracker')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'live-repair-tracker' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">⏱️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Live RMA Repair Tracker
                        </div>
                        <div className="text-[10px] text-slate-500">Track bench diagnosis & warranty</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Live</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('printer-diagnostics')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'printer-diagnostics' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">🖨️</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Printer Diagnostic Engine
                        </div>
                        <div className="text-[10px] text-slate-500">Thermal receipt & ESC/POS cutter errors</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">Bench</span>
                    </button>

                    <button
                      onClick={() => handlePageSelect('factory-network-tester')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer group ${
                        currentPage === 'factory-network-tester' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base flex items-center justify-center flex-shrink-0">📶</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          Factory Latency Benchmark
                        </div>
                        <div className="text-[10px] text-slate-500">WeBOC customs & dual-WAN ping test</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700">Ping</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* 6. Company Dropdown (Consolidated with About, Sialkot Lab & Regional Hubs) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('about')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'about' || currentPage === 'locations'
                    ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={activeDropdown === 'company'}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180 text-red-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'company' && (
                <div className="absolute top-full right-0 lg:left-0 w-80 pt-1.5 z-50">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>evonix Heritage & Hubs</span>
                      <span className="text-[10px] text-red-600 font-bold">20+ Yrs UAE</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('about')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          About Us & Dubai Heritage
                        </div>
                        <div className="text-[11px] text-slate-500">20+ Years UAE Pedigree in Sialkot</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('locations')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                          <span>Regional Industrial Hubs</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">Daska • Sambrial</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Field Stations Across Sialkot Division</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('contact')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                          Kotli Behram Lab & Team
                        </div>
                        <div className="text-[11px] text-slate-500">Kotli Behram, Sialkot Hub</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Contact Link */}
            <button
              onClick={() => handlePageSelect('contact')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2">

            {/* Search Trigger with 3D tactile finish (Hidden on all Tool Pages) */}
            {!isToolPage(currentPage) && (
              <button
                onClick={onOpenSearch}
                aria-label="Search Services, Portfolio and Tools (Ctrl+K)"
                className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-all cursor-pointer"
                title="Search Services, Portfolio & Shop (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Light / Dark Mode Theme Switcher */}
            <ThemeSwitcher variant="icon" />

            {/* 3D Radiant Specular Free Quote Button */}
            <button
              onClick={() => onOpenQuote()}
              aria-label="Request a Free Technical Quote"
              className="px-3.5 sm:px-4.5 py-1.5 sm:py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 active:from-red-700 active:to-rose-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4),0_6px_20px_rgba(220,38,38,0.4)] hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5),0_8px_25px_rgba(220,38,38,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 flex-shrink-0 border-t border-white/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>Free Quote</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center">
                <span
                  className={`w-4 h-[1.75px] bg-slate-800 rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? 'translate-y-[6px] rotate-45 !bg-red-600' : ''
                  }`}
                />
                <span
                  className={`w-4 h-[1.75px] bg-slate-800 rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-4 h-[1.75px] bg-slate-800 rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? '-translate-y-[6px] -rotate-45 !bg-red-600' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 pt-2 pb-4 border-t border-slate-200 max-h-[80vh] overflow-y-auto space-y-1.5 animate-fadeIn">
            {/* Tools Subdomain Mobile Return Link */}
            {isSub && (
              <a
                href={getMainAgencyDomainUrl()}
                className="w-full text-center p-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 mb-2 shadow-xs"
              >
                <span>← Back to evonixtec.com (Main Agency)</span>
              </a>
            )}

            {/* Home (Agency Domain) or Tools Hub (Tools Subdomain) */}
            <button
              onClick={() => handlePageSelect(isSub ? 'tools' : 'home')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                (isSub ? currentPage === 'tools' : currentPage === 'home') ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{isSub ? 'All Tools Hub' : 'Home'}</span>
            </button>

            {/* Services with expandable sub-items */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === 'services' ? null : 'services')
                }
                className="w-full text-left px-3.5 py-2.5 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'services' ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>

              {mobileExpandedSection === 'services' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handlePageSelect('services', 'web-development')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Website Development & E-Commerce
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'software-pos')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Custom Software & Retail POS
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'ai-automation')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Enterprise AI &amp; Automation
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'cloud-architecture')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Cloud &amp; Scalable Architecture
                  </button>
                  <button
                    onClick={() => handlePageSelect('services')}
                    className="w-full text-left p-2 text-red-600 font-bold hover:underline"
                  >
                    → Open Full Services Page
                  </button>
                </div>
              )}
            </div>

            {/* Portfolio Link for Agency Domain */}
            {!isSub && (
              <button
                onClick={() => handlePageSelect('portfolio')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                  currentPage === 'portfolio' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>Portfolio &amp; Case Studies</span>
              </button>
            )}

            {/* About Us */}
            <button
              onClick={() => handlePageSelect('about')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'about' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>About Us (Dubai Heritage)</span>
            </button>

            {/* Subdomain Bridges for Mobile (Agency Domain) */}
            {!isSubTools && !isSubStore && (
              <>
                <a
                  href={getToolsDomainUrl()}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between text-slate-800 hover:bg-slate-100 bg-blue-50/50 border border-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>🛠️ Free Tools Workstation</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full font-bold flex items-center gap-1">
                    <span>tools.evonixtec.com ↗</span>
                  </span>
                </a>

                <a
                  href={getStoreDomainUrl()}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between text-slate-800 hover:bg-slate-100 bg-amber-50/50 border border-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>🛒 Hardware &amp; POS Store</span>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] rounded-full font-bold flex items-center gap-1">
                    <span>store.evonixtec.com ↗</span>
                  </span>
                </a>
              </>
            )}

            {isSubTools && (
              <a
                href={getStoreDomainUrl()}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between text-slate-800 hover:bg-slate-100 bg-amber-50/50 border border-amber-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>🛒 Hardware &amp; POS Store</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] rounded-full font-bold">
                  <span>store.evonixtec.com ↗</span>
                </span>
              </a>
            )}

            {isSubStore && (
              <a
                href={getToolsDomainUrl()}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between text-slate-800 hover:bg-slate-100 bg-blue-50/50 border border-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>🛠️ Free Tools Workstation</span>
                </div>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full font-bold">
                  <span>tools.evonixtec.com ↗</span>
                </span>
              </a>
            )}

            {/* UNIFIED WEB TOOLS PORTFOLIO ACCORDION FOR MOBILE (Tools Subdomain Only) */}
            {isSub && (
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'tools' ? null : 'tools')}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-bold flex items-center justify-between cursor-pointer ${
                  isToolsActive ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>⚙️ Online Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] rounded font-bold">9+ TOOLS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExpandedSection === 'tools' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>

              {mobileExpandedSection === 'tools' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-200/80 text-xs">
                  {/* Top Hub Link */}
                  <button
                    onClick={() => handlePageSelect('tools')}
                    className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold flex items-center justify-between mb-1"
                  >
                    <span>🛠️ Open Web Tools Portfolio Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* 1. TOP HIGHLIGHT: eBay Fee & Profit Builder */}
                  <a
                    href="/ebay-fee-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('ebay-fee-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between border ${
                      currentPage === 'ebay-fee-calculator'
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                        : 'bg-blue-50/90 hover:bg-blue-100/90 text-blue-900 border-blue-200/90'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🏷️</span>
                      <span className="font-bold">eBay Fee &amp; Profit Builder</span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      currentPage === 'ebay-fee-calculator' ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      10 Markets · Pro
                    </span>
                  </a>

                  <button
                    onClick={() => handlePageSelect('invoice')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'invoice' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🗂️ Global Micro-Invoice Generator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Free</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('export-barcode-studio')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'export-barcode-studio' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🏷️ Export Barcode Label Studio</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">Export</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('cbm-calculator')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'cbm-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>📦 B2B Industrial CBM Engine</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">Cargo</span>
                  </button>

                  <a
                    href="/sialkot-export-erp"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('sialkot-export-erp');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'sialkot-export-erp' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🏭 Sialkot Export ERP Suite</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">ERP</span>
                  </a>

                  <button
                    onClick={() => handlePageSelect('ecommerce-calculator')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'ecommerce-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>📊 E-Commerce Margin Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Live</span>
                  </button>

                  <a
                    href="/tiktok-shop-fee-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('tiktok-shop-fee-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'tiktok-shop-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🎵 TikTok Shop Fee Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black text-white">New</span>
                  </a>

                  <a
                    href="/amazon-fba-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('amazon-fba-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'amazon-fba-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>📦 Amazon FBA Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">FBA</span>
                  </a>

                  <a
                    href="/shopify-fee-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('shopify-fee-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'shopify-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🛍️ Shopify Fee Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Shopify</span>
                  </a>

                  <a
                    href="/stripe-fee-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('stripe-fee-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'stripe-fee-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>💳 Stripe Fee Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Stripe</span>
                  </a>

                  <a
                    href="/temu-seller-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('temu-seller-calculator');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'temu-seller-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🏷️ Temu Seller Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">Temu</span>
                  </a>

                  <a
                    href="/installation-guide"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('installation-guide');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'installation-guide' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>💻 Desktop Setup &amp; Tools Guide</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">Guide</span>
                  </a>

                  <a
                    href="/trend-intelligence-suite"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect('trend-intelligence-suite');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'trend-intelligence-suite' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🚀 Trend Intelligence Suite</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">V15</span>
                  </a>

                  <button
                    onClick={() => handlePageSelect('developer-cost-calculator')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'developer-cost-calculator' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>💻 Dedicated Developer Cost Calculator</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">72% Save</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('ai-visibility-checker')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'ai-visibility-checker' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🔍 AI Visibility & E-E-A-T Checker</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">GEO</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('ai-trip-planner')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'ai-trip-planner' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>✈️ AI Trip Planner (Vacation Generator)</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700">Free AI</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('ai-travel-tools')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'ai-travel-tools' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🧭 10 Best AI Travel Tools Guide</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Guide</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('live-repair-tracker')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'live-repair-tracker' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>⏱️ Live RMA Bench Repair Tracker</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Live</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('printer-diagnostics')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'printer-diagnostics' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🖨️ Printer Hardware Troubleshooter</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">Bench</span>
                  </button>

                  <button
                    onClick={() => handlePageSelect('factory-network-tester')}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      currentPage === 'factory-network-tester' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>📶 Factory Latency Benchmark</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700">Ping</span>
                  </button>
                </div>
              )}
            </div>
            )}


            {/* Contact */}
            <button
              onClick={() => handlePageSelect('contact')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'contact' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Contact & Sialkot Office</span>
            </button>

            {/* Mobile Theme Switcher */}
            <div className="pt-2">
              <ThemeSwitcher variant="expanded" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
