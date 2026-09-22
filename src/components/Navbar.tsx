import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { EvonixLogo } from './EvonixLogo';
import { Menu, X, Phone, MessageSquare, Sparkles, Search, MapPin, ArrowRight } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: { id: SectionId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'blogs', label: '60 Tech Guides', badge: 'SEO' },
    { id: 'about', label: 'About Us' },
    { id: 'shop', label: 'Hardware & POS' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top micro-bar for desktop */}
      <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              20+ Years Dubai Experience • Now in Sialkot, Pakistan
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Sialkot On-Site & Remote IT Services
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-red-600 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              {COMPANY_INFO.contact.phoneDisplay}
            </a>
            <span className="text-slate-300">•</span>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="hover:text-red-600 transition-colors text-slate-600"
            >
              {COMPANY_INFO.contact.email}
            </a>
            <span className="text-slate-300">•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I would like to inquire about your IT services in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.02]"
            aria-label="EVONIX Home"
          >
            <EvonixLogo size="md" forceTheme="light" />
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
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-red-600 bg-red-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-md bg-red-100 text-red-700 text-[10px] font-bold tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
              title="Search services, blogs, guides (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-600 bg-white border border-slate-200 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Direct WhatsApp Action */}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hi EVONIX, I want to discuss a new project or hardware repair.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors shadow-2xs flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Free Quote Primary CTA Button */}
            <button
              id="nav-quote-btn"
              onClick={() => onOpenQuote()}
              className="px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white shadow-2xs"
            >
              Quote
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-9 h-9 rounded-xl flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-4 h-[1.75px] bg-slate-800 rounded-full transition-all duration-200 ease-out origin-center ${
                  mobileMenuOpen ? 'translate-y-[5.75px] rotate-45 !bg-red-600' : ''
                }`}
              />
              <span
                className={`w-4 h-[1.75px] bg-slate-800 rounded-full my-1 transition-all duration-150 ease-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`w-4 h-[1.75px] bg-slate-800 rounded-full transition-all duration-200 ease-out origin-center ${
                  mobileMenuOpen ? '-translate-y-[5.75px] -rotate-45 !bg-red-600' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with smooth slide-down and fade transition */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'max-h-[540px] opacity-100 border-t border-slate-200/80 shadow-xl'
            : 'max-h-0 opacity-0 border-t border-transparent pointer-events-none'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-2.5">
          <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Sialkot, Pakistan
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
              20+ Yrs Dubai Exp
            </span>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ transitionDelay: mobileMenuOpen ? `${idx * 20}ms` : '0ms' }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? 'text-red-600 bg-red-50/90 font-bold border border-red-100 shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Direct Mobile Contacts */}
          <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              Call Direct
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I need assistance in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Outside Tap Backdrop to cleanly dismiss menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 top-[65px] bg-slate-900/20 backdrop-blur-2xs z-[-1] transition-opacity duration-200 animate-in fade-in"
          aria-hidden="true"
        />
      )}
    </header>
  );
};
