import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Technologies } from './components/Technologies';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Portfolio } from './components/Portfolio';
import { Shop } from './components/Shop';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { SearchModal } from './components/SearchModal';
import { SecurityAlertToast } from './components/SecurityAlertToast';
import { COMPANY_INFO } from './data/content';
import { initAntiCopyShield, initializeConsoleShield } from './lib/security';
import { MessageSquare, Phone, ArrowUp, Search } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Website Development');
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // Initialize Anti-Copy, Anti-Scrape, and Console Security Shield
  useEffect(() => {
    initializeConsoleShield();
    const cleanupShield = initAntiCopyShield((msg) => {
      setSecurityAlert(msg);
    });
    return () => cleanupShield();
  }, []);

  // Global keyboard shortcut to open search modal (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigateFromSearch = (sectionId: SectionId, elementId?: string) => {
    setActiveSection(sectionId);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        const navOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Add a temporary subtle highlight pulse
        el.classList.add('ring-2', 'ring-cyan-400', 'transition-all', 'duration-500');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-cyan-400');
        }, 2500);
        return;
      }
    }
    scrollToSection(sectionId);
  };

  const handleOpenQuote = (serviceType: string = 'Website Development') => {
    setSelectedServiceForQuote(serviceType);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-300">
      {/* 1. Header Menu & Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenQuote={() => handleOpenQuote('General Inquiry')}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Home Page - Hero Slider Section (3 Slides, Buttons, Dubai Standard) */}
        <HeroSlider
          onOpenQuote={(service) => handleOpenQuote(service || 'Website Development')}
          onNavigate={scrollToSection}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* 3. About Us Page Section */}
        <AboutUs />

        {/* 4. Our Services Section */}
        <Services onSelectServiceForQuote={handleOpenQuote} />

        {/* 4b. Technologies We Use Section (Animated Floating Badges & Logos) */}
        <Technologies onExploreService={(svc) => handleOpenQuote(svc || 'Website Development')} />

        {/* 5. Why Choose Us? Section */}
        <WhyChooseUs />

        {/* 6. Our Portfolio - Our Valuable Clients in Dubai & UAE */}
        <Portfolio
          onRequestPrivateMeeting={() =>
            handleOpenQuote('Confidential NDA Case Study Presentation')
          }
        />

        {/* Shop Section (Hardware, POS, Laptops & Printers) */}
        <Shop
          onInquireProduct={(productName) =>
            handleOpenQuote(`Hardware / Shop Inquiry: ${productName}`)
          }
        />

        {/* 6b. Frequently Asked Questions (Accordion Style - Dubai Transition, Pricing, Doorstep Support) */}
        <FAQ
          onOpenQuote={handleOpenQuote}
          onNavigateSection={scrollToSection}
        />

        {/* Contact Us Section */}
        <ContactSection onOpenQuote={handleOpenQuote} />
      </main>

      {/* 7. Footer Tagline & Global Borders Info */}
      <Footer
        onNavigate={scrollToSection}
        onOpenQuote={() => handleOpenQuote('General Inquiry')}
      />

      {/* Anti-Copy and Security Alert Notification Toast */}
      <SecurityAlertToast
        message={securityAlert}
        onClose={() => setSecurityAlert(null)}
      />

      {/* Interactive Quick Search Modal (Command Palette across Services, Portfolio & Shop) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToSection={handleNavigateFromSearch}
        onSelectForQuote={handleOpenQuote}
      />

      {/* Interactive Free Quote Dialog */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={selectedServiceForQuote}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Quick Search Floating Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-slate-700/90 shadow-xl shadow-black/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
          title="Search Services, Portfolio & Hardware (Ctrl+K)"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* WhatsApp in Sialkot */}
        <a
          href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I would like to get a free quote for IT services in Sialkot.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 transition-all cursor-pointer"
          title="Direct WhatsApp Support in Sialkot"
        >
          <MessageSquare className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline">WhatsApp Fast Support</span>
        </a>

        {/* Quick Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-700/80 shadow-lg transition-all"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
