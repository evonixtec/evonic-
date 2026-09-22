import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { Sparkles, MapPin, ArrowRight, ShieldCheck, CheckCircle, Wrench, Globe, PhoneCall, Search } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
  onOpenSearch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreServices, onOpenSearch }) => {
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Background Glows & Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-br from-cyan-600/15 via-blue-600/10 to-indigo-950/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content (Left 7 Cols) */}
          <FadeInSection direction="up" delay={50} duration={750} className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Dubai to Pakistan Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-slate-300 shadow-sm backdrop-blur-sm">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                Dubai (UAE)
              </span>
              <span className="text-slate-500">⟶</span>
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Sialkot (Pakistan)
              </span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-emerald-400 font-medium">20+ Years Legacy</span>
            </div>

            {/* Exact Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Experience of Dubai, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Now in Pakistan
              </span>
            </h1>

            {/* Exact Sub Heading */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-200 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
              {COMPANY_INFO.hero.subHeading}
            </p>

            {/* Exact Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {COMPANY_INFO.hero.paragraph}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Exact Button: Get a Free Quote */}
              <button
                id="hero-get-free-quote-btn"
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{COMPANY_INFO.hero.ctaButton}</span>
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={onExploreServices}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{COMPANY_INFO.hero.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Interactive Search Bar */}
            {onOpenSearch && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="w-full max-w-xl flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 shadow-lg shadow-black/40 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 group-hover:text-slate-200">
                    <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>Search services, POS systems, laptops & Dubai portfolio...</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 rounded">
                      ⌘K / Quick Access
                    </kbd>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {/* Quick Sialkot Service Guarantees */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doorstep Home Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Transparent Affordable Rates</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </FadeInSection>

          {/* Right Card / Interactive Showcase (Right 5 Cols) */}
          <FadeInSection direction="left" delay={150} duration={800} className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/60">
              {/* Card Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                    Sialkot Operations Active
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-medium">
                  Dubai Standard
                </span>
              </div>

              {/* Service Highlights Box */}
              <div className="space-y-4 py-5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Web & Software Engineering</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fast, responsive websites, custom ERP, and retail POS built to international standards.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Laptop, PC & Printer Services</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Motherboard chip diagnostics, laser/thermal printers, SSD speed upgrades & certified UAE imports.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">On-Site Home & Office Visit</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Our certified technician arrives at your home or workplace in Sialkot. No lab visit required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer with Quick Contact */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 text-center sm:text-left">
                  Need immediate service?
                  <div className="text-slate-200 font-semibold">{COMPANY_INFO.contact.phoneDisplay}</div>
                </div>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  WhatsApp Direct
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};
