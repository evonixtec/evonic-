import React, { useState, useEffect } from 'react';
import { Sparkles, Code2, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenCodeModal: () => void;
  onOpenToolsHub: () => void;
  isToolsActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  onOpenCodeModal,
  onOpenToolsHub,
  isToolsActive = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Zone - Single clean wordmark text element */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#A855F7] p-px shadow-[0_0_15px_rgba(0,212,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[7px] flex items-center justify-center">
                <span className="font-display font-black text-xs text-[#00D4FF]">E</span>
              </div>
            </div>
            <span className="text-xl font-black font-display tracking-tight text-white group-hover:text-[#00D4FF] transition-colors">
              EVONIXTEC
            </span>
          </button>

          {/* Zone 2: Navigation Links - Single line, text hover underline */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer whitespace-nowrap"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('tech-stack')}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer whitespace-nowrap"
            >
              Tech Stack
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer whitespace-nowrap"
            >
              Work
            </button>
            <button
              onClick={onOpenToolsHub}
              className={`hover:text-[#00D4FF] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isToolsActive ? 'text-[#00D4FF] font-bold' : ''
              }`}
            >
              <span>Tools Hub</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                12
              </span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCodeModal}
              className="px-3.5 py-2 text-xs font-mono font-medium rounded-xl glass-panel text-slate-300 hover:text-white hover:border-[#00D4FF]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="View & Copy Single HTML CDN Code"
            >
              <Code2 className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>CDN Code</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-bold font-sora rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCodeModal}
              className="p-2 rounded-lg glass-panel text-[#00D4FF]"
              title="CDN Code"
            >
              <Code2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg glass-panel text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 rounded-2xl glass-panel-glow border border-white/10 space-y-3 animate-fadeIn">
            <button
              onClick={() => handleNavClick('services')}
              className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00D4FF]"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('tech-stack')}
              className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00D4FF]"
            >
              Tech Stack
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00D4FF]"
            >
              Work &amp; Portfolio
            </button>
            <button
              onClick={onOpenToolsHub}
              className="block w-full text-left py-2 text-sm font-medium text-[#00D4FF] flex items-center justify-between"
            >
              <span>Online Tools Suite</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                12 Workstations
              </span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-[#00D4FF]"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-black"
              >
                Start a Project
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
