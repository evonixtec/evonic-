import React from 'react';
import { ArrowRight, Sparkles, Terminal, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { HeroGlobeCanvas } from './3d/HeroGlobeCanvas';

interface HeroProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenToolsHub: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection, onOpenToolsHub }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Rotating Globe & Connected Nodes Canvas */}
      <HeroGlobeCanvas className="opacity-90" />

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00D4FF]/12 via-[#A855F7]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Subtle kicker with typographic separator */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-[#00D4FF] font-bold">EVONIXTEC.COM</span>
          <span aria-hidden="true">·</span>
          <span>Next-Generation 3D &amp; Engineering Agency</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active Systems
          </span>
        </div>

        {/* Huge Bold Kinetic Typography */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.05] uppercase">
            We Build <br className="hidden sm:inline" />
            <span className="text-gradient-cyan-purple glow-cyan-text drop-shadow-[0_0_35px_rgba(0,212,255,0.45)]">
              Digital Future
            </span>
          </h1>
        </div>

        {/* Concrete Value Proposition */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-light">
          We architect mission-critical Web Applications, native Mobile Apps, custom Enterprise AI neural pipelines, and scalable Cloud Software with immersive 3D experiences.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => onNavigateSection('contact')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#38bdf8] to-[#A855F7] text-black font-bold font-sora text-sm sm:text-base hover:opacity-95 shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigateSection('services')}
            className="px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-[#00D4FF]/40 text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore Services</span>
          </button>

          <button
            onClick={onOpenToolsHub}
            className="px-4 py-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-950/60 text-[#00D4FF] text-xs sm:text-sm font-mono transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>Launch 12 Web Tools</span>
          </button>
        </div>

        {/* Metrics Row - Tabular figures & Clean layout */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
          <div className="text-left p-3 rounded-xl glass-panel">
            <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums">
              20<span className="text-[#00D4FF]">+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Years Dubai &amp; Global Expertise
            </div>
          </div>

          <div className="text-left p-3 rounded-xl glass-panel">
            <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums">
              150<span className="text-[#A855F7]">+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Production Architectures Shipped
            </div>
          </div>

          <div className="text-left p-3 rounded-xl glass-panel">
            <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums">
              &lt;15<span className="text-[#00D4FF]">ms</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Edge Response Latency
            </div>
          </div>

          <div className="text-left p-3 rounded-xl glass-panel">
            <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums">
              99.99<span className="text-emerald-400">%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              High-Availability Uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
