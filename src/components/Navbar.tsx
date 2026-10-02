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
  Briefcase,
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
  BookOpen,
  Calculator,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

export type NavPageId = 'home' | 'services' | 'portfolio' | 'shop' | 'about' | 'guides' | 'contact' | 'locations' | 'invoice' | 'ecommerce-calculator';

interface NavbarProps {
  currentPage: NavPageId;
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (serviceType?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenQuote,
  onOpenSearch,
}) => {
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

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
            onClick={() => handlePageSelect('home')}
            className="flex items-center gap-2.5 group cursor-pointer transition-all duration-200 hover:scale-[1.02] flex-shrink-0"
            aria-label="EVONIX Home"
          >
            <div className="relative p-1 rounded-xl transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(220,38,38,0.3)]">
              <EvonixLogo size="md" forceTheme="light" />
            </div>
            <div className="hidden sm:flex flex-col text-left pl-2.5 border-l border-slate-200/90">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-600 leading-tight flex items-center gap-1.5">
                <span>Dubai Heritage</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              </span>
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight mt-0.5">
                Sialkot Tech Hub
              </span>
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

              {/* Services 2-Column Mega-Menu Card */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-[540px] pt-1.5 z-50">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Left Column: Core Engineering Services */}
                      <div className="space-y-1">
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
                          onClick={() => handlePageSelect('services', 'hardware-repair')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <Wrench className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              Hardware & Printer Repairing
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              Chip-Level Diagnostics & Motherboard Lab
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('services', 'doorstep-support')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              Doorstep Sialkot On-Site IT
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              Office, Factory & Home Visits
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Right Column: Industrial Suite & Tools */}
                      <div className="space-y-1 border-l border-slate-100 pl-3">
                        <div className="px-2.5 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
                          <span>Sialkot Industry Suite</span>
                          <span className="text-emerald-600 font-bold">Specialized</span>
                        </div>

                        <button
                          onClick={() => handlePageSelect('home', 'sialkot-industrial-solutions')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <Monitor className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center gap-1.5">
                              <span>Export Industry ERP</span>
                              <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.2 rounded font-bold">New</span>
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              Surgical, Sports & Leather Software
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('home', 'factory-network-tester')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <Globe className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              <span>Network Latency Benchmark</span>
                              <span className="text-[8px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-bold">Live</span>
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              Dry Port & Cloud Diagnostic Ping
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('home', 'export-barcode-studio')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <Barcode className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                              <span>Export Barcode Studio</span>
                              <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded font-bold">Tool</span>
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              GS1 & Code 128 Carton Labels
                            </div>
                          </div>
                        </button>

                        <div className="pt-2">
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
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hardware & Shop Dropdown (2-Column Clean Mega-Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('shop')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'shop'
                    ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={activeDropdown === 'shop'}
              >
                <span>Hardware & Shop</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'shop' ? 'rotate-180 text-red-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'shop' && (
                <div className="absolute top-full left-0 w-[540px] pt-1.5 z-50">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Left: Hardware Catalog */}
                      <div className="space-y-1">
                        <div className="px-2.5 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
                          <span>Equipment Catalog</span>
                          <span className="text-emerald-600 font-bold">With Warranty</span>
                        </div>

                        <button
                          onClick={() => handlePageSelect('shop', 'pos-terminals')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                              POS Touch Terminals
                            </div>
                            <div className="text-[10px] text-slate-500">Retail, Restaurant & Grocery</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('shop', 'printers')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                            <Printer className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                              Thermal Printers & Scanners
                            </div>
                            <div className="text-[10px] text-slate-500">80mm Receipts & 2D Readers</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('shop', 'laptops')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <Laptop className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                              Business Laptops & PCs
                            </div>
                            <div className="text-[10px] text-slate-500">Imported Dell, HP & Lenovo</div>
                          </div>
                        </button>

                        <div className="pt-2">
                          <button
                            onClick={() => handlePageSelect('shop')}
                            className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-red-50 text-center text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors border border-slate-200"
                          >
                            <span>Browse All Hardware</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Diagnostic Lab Tools */}
                      <div className="space-y-1 border-l border-slate-100 pl-3">
                        <div className="px-2.5 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
                          <span>Diagnostic Lab Bench</span>
                          <span className="text-red-600 font-bold">Interactive</span>
                        </div>

                        <button
                          onClick={() => handlePageSelect('home', 'live-repair-tracker')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Wrench className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                              <span>Live RMA Repair Tracker</span>
                              <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">Live</span>
                            </div>
                            <div className="text-[10px] text-slate-500">Track bench test logs & status</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('home', 'hardware-repair-gallery')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Cpu className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                              Micro-Soldering Slider
                            </div>
                            <div className="text-[10px] text-slate-500">Before & After bench inspection</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('home', 'blink-beep-identifier')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <Wrench className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-red-700 flex items-center gap-1.5">
                              <span>Blink & Beep Decoder</span>
                              <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.2 rounded font-bold">Tool</span>
                            </div>
                            <div className="text-[10px] text-slate-500">Dell, HP & Lenovo BIOS tones</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePageSelect('home', 'thermal-inspector')}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                              FLIR Thermal Hotspot
                            </div>
                            <div className="text-[10px] text-slate-500">Infrared short-circuit view</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Portfolio Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('portfolio')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('portfolio')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'portfolio'
                    ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={activeDropdown === 'portfolio'}
              >
                <span>Portfolio</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'portfolio' ? 'rotate-180 text-red-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'portfolio' && (
                <div className="absolute top-full left-0 w-72 pt-1.5 z-50">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Client Case Studies</span>
                      <span className="text-[10px] text-red-600 font-semibold">Dubai & UAE</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('portfolio', 'websites')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Globe className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Web Development Clients
                        </div>
                        <div className="text-[11px] text-slate-500">Corporate UAE Portals & Brands</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('portfolio', 'software')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Software & POS Clients
                        </div>
                        <div className="text-[11px] text-slate-500">ERP & Retail Store Systems</div>
                      </div>
                    </button>

                    <div className="pt-1.5 border-t border-slate-100 px-2 pb-1">
                      <button
                        onClick={() => handlePageSelect('portfolio')}
                        className="w-full py-1.5 text-center text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View All Projects</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Blogs Link */}
            <button
              onClick={() => handlePageSelect('guides')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'guides'
                  ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>Blogs</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-red-100 text-red-700">New</span>
            </button>

            {/* 6. Global Zero-Database Invoice Hub (Free Tool) */}
            <button
              onClick={() => handlePageSelect('invoice')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'invoice'
                  ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title="Global Zero-Database Enterprise Invoice Hub"
            >
              <FileText className="w-3.5 h-3.5 text-red-600" />
              <span>Invoice Hub</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700">Free</span>
            </button>

            {/* 7. E-Commerce Margin Calculator (Free Tool) */}
            <button
              onClick={() => handlePageSelect('ecommerce-calculator')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'ecommerce-calculator'
                  ? 'text-red-700 bg-gradient-to-b from-red-50 to-rose-50/50 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(220,38,38,0.12)] border border-red-200/80'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              title="E-Commerce Profit & Courier Shipping Margin Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-red-600" />
              <span>Margin Calc</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">New</span>
            </button>

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
                      <span>EVONIX Heritage & Hubs</span>
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
                        <div className="text-[11px] text-slate-500">Paris Road & Cantt Technical Hub</div>
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
            {/* Colorful Direct Hotline Button (Header Quick Access) */}
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-50 via-white to-red-50/80 hover:from-rose-100/80 hover:to-red-100 text-red-700 text-xs font-black border border-red-200/90 shadow-2xs hover:shadow-xs transition-all hover:scale-102 flex-shrink-0 cursor-pointer"
              title={`Call Hotline: ${COMPANY_INFO.contact.phoneDisplay}`}
            >
              <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center shadow-xs">
                <Phone className="w-3 h-3 animate-pulse" />
              </div>
              <span className="tracking-tight font-extrabold">{COMPANY_INFO.contact.phoneDisplay}</span>
            </a>

            {/* Colorful Direct WhatsApp Button (Header Quick Access - Hidden on Invoice Page) */}
            {currentPage !== 'invoice' && (
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I want to discuss a requirement.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 via-white to-teal-50/80 hover:from-emerald-100/80 hover:to-teal-100 text-emerald-800 text-xs font-black border border-emerald-200/90 shadow-2xs hover:shadow-xs transition-all hover:scale-102 flex-shrink-0 cursor-pointer"
                title="Chat on WhatsApp"
              >
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-3 h-3" />
                </div>
                <span className="tracking-tight font-extrabold">WhatsApp</span>
              </a>
            )}

            {/* Search Trigger with 3D tactile finish (Hidden on invoice page) */}
            {currentPage !== 'invoice' && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-all cursor-pointer"
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
              className="px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 active:from-red-700 active:to-rose-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4),0_6px_20px_rgba(220,38,38,0.4)] hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5),0_8px_25px_rgba(220,38,38,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 flex-shrink-0 border-t border-white/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>Free Quote</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer transition-colors"
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
            {/* Home */}
            <button
              onClick={() => handlePageSelect('home')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'home' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Home</span>
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
                    onClick={() => handlePageSelect('services', 'hardware-repair')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Computer, Laptop & Printer Repairing
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'doorstep-support')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Doorstep Sialkot On-Site IT Visit
                  </button>
                  <button
                    onClick={() => handlePageSelect('home', 'sialkot-industrial-solutions')}
                    className="w-full text-left p-2 rounded-lg text-purple-700 bg-purple-50/50 hover:bg-purple-100/50 font-bold"
                  >
                    • Sialkot Export Industry ERP (Surgical/Sports/Leather)
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

            {/* Hardware & Shop with expandable sub-items */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === 'shop' ? null : 'shop')
                }
                className="w-full text-left px-3.5 py-2.5 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50"
              >
                <span>Hardware & Shop</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'shop' ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>

              {mobileExpandedSection === 'shop' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handlePageSelect('shop', 'pos-terminals')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • POS Touch Terminals & Barcode Scanners
                  </button>
                  <button
                    onClick={() => handlePageSelect('shop', 'printers')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Thermal Receipt Printers
                  </button>
                  <button
                    onClick={() => handlePageSelect('shop', 'laptops')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Imported Laptops & PC Workstations
                  </button>
                  <button
                    onClick={() => handlePageSelect('home', 'live-repair-tracker')}
                    className="w-full text-left p-2 rounded-lg text-red-700 bg-red-50/50 hover:bg-red-100/50 font-bold"
                  >
                    • Live RMA Repair & Bench Tracker
                  </button>
                  <button
                    onClick={() => handlePageSelect('home', 'hardware-repair-gallery')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Before & After Micro-Soldering Gallery
                  </button>
                  <button
                    onClick={() => handlePageSelect('shop')}
                    className="w-full text-left p-2 text-red-600 font-bold hover:underline"
                  >
                    → Open Full Shop Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Portfolio with expandable sub-items */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === 'portfolio' ? null : 'portfolio')
                }
                className="w-full text-left px-3.5 py-2.5 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50"
              >
                <span>Portfolio</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'portfolio' ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>

              {mobileExpandedSection === 'portfolio' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handlePageSelect('portfolio', 'websites')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Dubai Web Client Deployments
                  </button>
                  <button
                    onClick={() => handlePageSelect('portfolio', 'software')}
                    className="w-full text-left p-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    • Software & ERP Deployments
                  </button>
                  <button
                    onClick={() => handlePageSelect('portfolio')}
                    className="w-full text-left p-2 text-red-600 font-bold hover:underline"
                  >
                    → Open Full Portfolio Page
                  </button>
                </div>
              )}
            </div>

            {/* About Us & Guides */}
            <button
              onClick={() => handlePageSelect('about')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'about' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>About Us (Dubai Heritage)</span>
            </button>

            <button
              onClick={() => handlePageSelect('guides')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'guides' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-600" />
                <span>Tech Blogs & Field Case Studies</span>
              </div>
              <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] rounded font-bold">BLOGS</span>
            </button>

            {/* Zero-Database Enterprise Invoice Hub (Free Tool) */}
            <button
              onClick={() => handlePageSelect('invoice')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'invoice' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <span>Enterprise Invoice Hub</span>
              </div>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] rounded font-bold">FREE TOOL</span>
            </button>

            {/* E-Commerce Profit & Margin Calculator (Free Tool) */}
            <button
              onClick={() => handlePageSelect('ecommerce-calculator')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'ecommerce-calculator' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-red-600" />
                <span>E-Commerce Margin Calculator</span>
              </div>
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] rounded font-bold">NEW TOOL</span>
            </button>

            {/* Local Industrial Hubs (Daska, Sambrial, Wazirabad) */}
            <button
              onClick={() => handlePageSelect('locations')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'locations' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Daska, Sambrial & Wazirabad Hubs</span>
              </span>
              <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] rounded font-bold">Local SEO</span>
            </button>

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

            {/* Direct Quick Hotline & WhatsApp on Mobile (WhatsApp hidden on invoice page) */}
            <div className={`pt-2 grid gap-2 ${currentPage === 'invoice' ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <a
                href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
              {currentPage !== 'invoice' && (
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I am contacting you from the mobile website.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
