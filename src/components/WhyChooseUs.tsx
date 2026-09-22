import React from 'react';
import { COMPANY_INFO } from '../data/content';
import {
  Globe,
  DollarSign,
  Zap,
  Home,
  ShieldCheck,
  Check,
  CheckCircle2,
  Award,
  Sparkles,
  Clock,
  Wrench,
  ThumbsUp,
} from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const WhyChooseUs: React.FC = () => {
  // Enhanced icon renderer with custom styling and gradients
  const renderPillarIcon = (iconName: string, id: string) => {
    switch (iconName) {
      case 'Globe':
        return (
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
              <Globe className="w-7 h-7" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
              <Award className="w-3 h-3 text-cyan-300" />
            </div>
          </div>
        );
      case 'DollarSign':
        return (
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
              <DollarSign className="w-7 h-7" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <ThumbsUp className="w-3 h-3 text-emerald-300" />
            </div>
          </div>
        );
      case 'Zap':
        return (
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
              <Zap className="w-7 h-7" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
              <Clock className="w-3 h-3 text-amber-300" />
            </div>
          </div>
        );
      case 'Home':
        return (
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10 group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
              <Home className="w-7 h-7" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
              <Wrench className="w-3 h-3 text-blue-300" />
            </div>
          </div>
        );
      case 'ShieldCheck':
        return (
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-purple-300" />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
        );
    }
  };

  const getPillarSubpoints = (id: string): string[] => {
    switch (id) {
      case 'dubai-exp':
        return [
          'Over 2 decades in Dubai’s competitive tech market',
          'Enterprise architectures tested on multinational clients',
          'Strict UAE-level quality control applied in Pakistan',
        ];
      case 'affordable-pricing':
        return [
          'Zero hidden technician charges or sudden fees',
          'Special package rates for local Sialkot retailers',
          'Clear quotation provided before repair begins',
        ];
      case 'quick-service':
        return [
          'Rapid response time across Sialkot city',
          'Same-day diagnostics for laptops and POS printers',
          'Continuous communication and live progress updates',
        ];
      case 'home-service':
        return [
          'Trained technician arrives directly at your doorstep',
          'Equipped with diagnostic multimeters & tools',
          'Available in Paris Rd, Cantt, Defense Rd & beyond',
        ];
      case 'satisfaction':
        return [
          'Post-repair testing and testing warranty',
          'Direct WhatsApp after-sales technical support',
          'Zero diagnostic fee if your issue cannot be resolved',
        ];
      default:
        return ['Reliable execution', 'Professional standards'];
    }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-900/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              The Evonix Commitment
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Why Choose Us?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              International expertise forged in Dubai, combined with honest local pricing and dependable on-site support in Sialkot.
            </p>
          </div>
        </FadeInSection>

        {/* 5 Core Pillars Grid with Rich Icons & Checkpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {COMPANY_INFO.whyChooseUs.map((item, index) => {
            const isFirst = index === 0;
            return (
              <FadeInSection
                key={item.id}
                direction="up"
                delay={index * 90}
                duration={650}
                className={isFirst ? 'lg:col-span-2' : ''}
              >
                <div
                  id={`why-choose-${item.id}`}
                  className={`h-full rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group shadow-xl ${
                    isFirst
                      ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border-cyan-800/70 hover:border-cyan-500/60'
                      : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div>
                    {/* Top Row: Prominent Framed Icon + Stat Badge */}
                    <div className="flex items-center justify-between mb-6">
                      {renderPillarIcon(item.icon, item.id)}

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-950 text-cyan-300 border border-cyan-800/60 shadow-inner">
                          {item.stat}
                        </span>
                      </div>
                    </div>

                    {/* Exact Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Rich Checkpoints with Icons */}
                    <div className="space-y-2 pt-3 border-t border-slate-800/80">
                      {getPillarSubpoints(item.id).map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Highlight Tag */}
                  <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Pillar 0{index + 1}</span>
                    <span className="text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Sialkot Satisfaction Badge Banner */}
        <FadeInSection direction="up" delay={200} duration={650}>
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-emerald-950/40 border border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Our 100% Service Guarantee in Sialkot
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Transparent diagnostics upfront with no unexpected costs. If we cannot fix your software or hardware issue, you won't be charged.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold whitespace-nowrap shadow-md">
              <Check className="w-4 h-4 text-emerald-400" />
              Guaranteed Satisfaction
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
