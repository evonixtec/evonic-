import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { Menu, X, Phone, MessageSquare, ShieldCheck, Sparkles, Search, Globe, MapPin } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenQuote: (serviceType?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenQuote,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'reach', label: 'Global Reach' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'shop', label: 'Shop' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl shadow-black/60"
    >
      {/* Top Banner with Dubai-Pakistan Bridge & Direct Contacts */}
      <div className="hidden lg:block bg-gradient-to-r from-cyan-950/80 via-slate-950 to-blue-950/80 border-b border-slate-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              20+ Years Dubai (UAE) Heritage
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Doorstep On-Site IT Service in Sialkot, Pakistan
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors font-medium font-mono"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              {COMPANY_INFO.contact.phoneDisplay}
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {COMPANY_INFO.contact.email}
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I would like to inquire about your IT services in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              WhatsApp: {COMPANY_INFO.contact.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-xl font-mono">
                  E
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  EVONIX
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400">
                  TECHNOLOGIES
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1">
                <span>Dubai (UAE)</span>
                <span className="text-cyan-400">⇄</span>
                <span>Sialkot (Pakistan)</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition-colors cursor-pointer group shadow-sm"
              title="Search services, portfolio & products (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Search services, portfolio...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-colors"
              title="Call Direct"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us</span>
            </a>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hi EVONIX TECHNOLOGIES, I would like to get a quote or discuss an IT requirement in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-emerald-800/60 bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-400 transition-colors shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Glowing Get a Free Quote Button */}
            <button
              id="nav-quote-btn"
              onClick={() => onOpenQuote()}
              className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-950" />
                Get a Free Quote
              </span>
            </button>
          </div>

          {/* Mobile Menu Button & Search */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 text-slate-950 shadow-sm"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-t border-slate-800/90 px-4 pt-4 pb-7 space-y-3 shadow-2xl backdrop-blur-2xl">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Sialkot, Pakistan
            </span>
            <span className="text-emerald-400 font-semibold">20+ Yrs Dubai Experience</span>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-800/70'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
              </button>
            ))}
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800/90 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              Call Direct
            </a>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-emerald-800/60 bg-emerald-950/60 text-emerald-300 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="col-span-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-center text-sm shadow-md shadow-cyan-500/20"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
