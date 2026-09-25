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
} from 'lucide-react';

export type NavPageId = 'home' | 'services' | 'portfolio' | 'shop' | 'about' | 'guides' | 'contact';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-1.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo - Compact and Crisp */}
          <button
            onClick={() => handlePageSelect('home')}
            className="flex items-center group cursor-pointer transition-transform hover:scale-[1.01] flex-shrink-0"
            aria-label="EVONIX Home"
          >
            <EvonixLogo size="md" forceTheme="light" />
          </button>

          {/* Desktop Navigation Links with Dropdown Sub-categories */}
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
                  ? 'text-red-600 bg-red-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>

            {/* 2. Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('services')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'services'
                    ? 'text-red-600 bg-red-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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

              {/* Services Sub-Category Dropdown Card */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-80 pt-1.5 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Our 4 Core Services</span>
                      <span className="text-[10px] text-red-600 font-semibold">Dubai Standards</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('services', 'web-development')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          Website Development
                        </div>
                        <div className="text-[11px] text-slate-500">
                          E-Commerce & High-Speed Next.js/React Portals
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'software-pos')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Software & POS Systems
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Retail ERP, Invoicing & Inventory Control
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'hardware-repair')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          Hardware & Printer Repairing
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Chip-Level Micro-Soldering & Diagnostics Lab
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('services', 'doorstep-support')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          Doorstep Sialkot On-Site IT
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Office, Factory & Home Engineer Visits
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'sialkot-industrial-solutions')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer border-t border-slate-100"
                    >
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center gap-1.5">
                          <span>Sialkot Export Industry ERP</span>
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">New</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Surgical, Sports & Leather Export Software
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'factory-network-tester')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          <span>Factory Network Latency Benchmark</span>
                          <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">Live</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          ERP & Sambrial Dry Port Ping & Packet Diagnostics
                        </div>
                      </div>
                    </button>

                    <div className="pt-1.5 border-t border-slate-100 px-2 pb-1">
                      <button
                        onClick={() => handlePageSelect('services')}
                        className="w-full py-1.5 text-center text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Open Full Services Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hardware & Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('shop')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'shop'
                    ? 'text-red-600 bg-red-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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
                <div className="absolute top-full left-0 w-76 pt-1.5 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Equipment Categories</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">With Warranty</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('shop', 'pos-terminals')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          POS Touch Terminals
                        </div>
                        <div className="text-[11px] text-slate-500">Retail, Restaurant & Grocery Units</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('shop', 'printers')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Printer className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Thermal Printers & Scanners
                        </div>
                        <div className="text-[11px] text-slate-500">80mm Receipts & 2D Barcode Readers</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('shop', 'laptops')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Laptop className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Business Laptops & PCs
                        </div>
                        <div className="text-[11px] text-slate-500">Imported Dell, HP & Lenovo Machines</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'live-repair-tracker')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group border-t border-slate-100"
                    >
                      <Wrench className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 flex items-center gap-1.5">
                          <span>Live RMA Repair Tracker</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">Live</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Track bench repair & test logs</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'hardware-repair-gallery')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Cpu className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Before & After Micro-Soldering
                        </div>
                        <div className="text-[11px] text-slate-500">Interactive bench inspection slider</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'blink-beep-identifier')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Wrench className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 flex items-center gap-1.5">
                          <span>Blink & Beep Code Decoder</span>
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">Tool</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Dell, HP & Lenovo BIOS diagnostic tones</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('home', 'thermal-inspector')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 flex items-center gap-1.5">
                          <span>FLIR Thermal Hotspot Inspector</span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">FLIR</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Short circuit infrared detection</div>
                      </div>
                    </button>

                    <div className="pt-1.5 border-t border-slate-100 px-2 pb-1">
                      <button
                        onClick={() => handlePageSelect('shop')}
                        className="w-full py-1.5 text-center text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Open Equipment Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
                    ? 'text-red-600 bg-red-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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
                <div className="absolute top-full left-0 w-76 pt-1.5 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
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

            {/* 5. Company / About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handlePageSelect('about')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  currentPage === 'about' || currentPage === 'guides'
                    ? 'text-red-600 bg-red-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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
                <div className="absolute top-full left-0 w-80 pt-1.5 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>EVONIX Organization</span>
                      <span className="text-[10px] text-red-600 font-semibold">20+ Yrs UAE</span>
                    </div>

                    <button
                      onClick={() => handlePageSelect('about')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          About Us & Dubai Heritage
                        </div>
                        <div className="text-[11px] text-slate-500">20+ Years UAE Pedigree in Sialkot</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('guides')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 flex items-center gap-1.5">
                          <span>60 Technical Guides</span>
                          <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[9px] rounded font-bold">SEO</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Deep Technical Knowledge Hub</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePageSelect('contact')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <Users className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                          Sialkot Engineering Lab & Team
                        </div>
                        <div className="text-[11px] text-slate-500">Paris Road & Cantt Hub</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Contact Link */}
            <button
              onClick={() => handlePageSelect('contact')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-red-600 bg-red-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
              title="Search Services, Portfolio & Shop (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Free Quote Button */}
            <button
              onClick={() => onOpenQuote()}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5 flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
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
              <span>60 Tech Guides & FAQs</span>
              <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] rounded font-bold">SEO</span>
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

            {/* Direct Quick WhatsApp */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I am contacting you from the mobile website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Help (+{COMPANY_INFO.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
