import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { ThemeSwitcher } from './ThemeSwitcher';
import { EvonixLogo } from './EvonixLogo';
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
    { id: 'blogs', label: 'Blogs & Guides (60)' },
    { id: 'reach', label: 'Global Reach' },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/90 shadow-sm dark:shadow-2xl shadow-black/10"
    >
      {/* Top Banner with Dubai-Pakistan Bridge & Direct Contacts */}
      <div className="hidden lg:block bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              20+ Years Dubai (UAE) Heritage
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400" />
              Doorstep On-Site IT Service in Sialkot, Pakistan
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-slate-700 dark:text-cyan-300 hover:text-red-600 dark:hover:text-cyan-200 transition-colors font-medium font-mono"
            >
              <Phone className="w-3 h-3 text-red-500 dark:text-cyan-400" />
              {COMPANY_INFO.contact.phoneDisplay}
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
            >
              {COMPANY_INFO.contact.email}
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I would like to inquire about your IT services in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium transition-colors"
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
            className="flex items-center group text-left cursor-pointer transition-opacity hover:opacity-95"
            aria-label="EVONIX Home"
          >
            <EvonixLogo size="md" />
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
                      ? 'text-red-600 dark:text-cyan-300 bg-red-50 dark:bg-cyan-950/60 border border-red-200 dark:border-cyan-800/80 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Switcher Toggle */}
            <ThemeSwitcher variant="icon" />

            {/* Quick Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs transition-colors cursor-pointer group shadow-sm"
              title="Search services, portfolio & products (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Search services, blogs...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-cyan-300 bg-white dark:bg-cyan-950/80 border border-slate-200 dark:border-cyan-800/60 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-cyan-300 text-xs font-semibold transition-colors"
              title="Call Direct"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400" />
              <span>Call Us</span>
            </a>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hi EVONIX TECHNOLOGIES, I would like to get a quote or discuss an IT requirement in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Free Quote Button */}
            <button
              id="nav-quote-btn"
              onClick={() => onOpenQuote()}
              className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Get a Free Quote
              </span>
            </button>
          </div>

          {/* Mobile Menu Button & Search */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Theme switcher for mobile */}
            <ThemeSwitcher variant="icon" />

            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white shadow-sm"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900 dark:text-white" /> : <Menu className="w-5 h-5 text-slate-900 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-950/98 border-t border-slate-200 dark:border-slate-800/90 px-4 pt-4 pb-7 space-y-3 shadow-2xl backdrop-blur-2xl">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400" />
              Sialkot, Pakistan
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">20+ Yrs Dubai Experience</span>
          </div>

          {/* Expanded Theme Switcher in Mobile Drawer */}
          <div className="py-1">
            <ThemeSwitcher variant="expanded" />
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                  activeSection === item.id
                    ? 'text-red-600 dark:text-cyan-300 bg-red-50 dark:bg-cyan-950/70 border border-red-200 dark:border-cyan-800/70'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-cyan-400"></span>}
              </button>
            ))}
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/90 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400" />
              Call Direct
            </a>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="col-span-2 py-3 px-4 rounded-xl bg-red-600 text-white font-bold text-center text-sm shadow-md shadow-red-600/20"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
