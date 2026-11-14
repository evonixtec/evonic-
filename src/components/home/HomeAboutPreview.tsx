import React from 'react';
import { COMPANY_INFO } from '../../data/content';
import { ArrowRight, ShieldCheck, Cpu, Clock, MapPin } from 'lucide-react';

interface HomeAboutPreviewProps {
  onNavigateToAbout: () => void;
  onOpenQuote: () => void;
}

export const HomeAboutPreview: React.FC<HomeAboutPreviewProps> = ({
  onNavigateToAbout,
  onOpenQuote,
}) => {
  return (
    <section className="py-20 bg-[#111827] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <p className="text-xs font-semibold text-slate-400">
              03 · Dubai Heritage · Sialkot Operations
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
              Twenty years of UAE systems engineering, delivered locally in Sialkot
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Founded on strict enterprise methodologies in the United Arab Emirates,{' '}
              <strong className="text-white font-semibold">{COMPANY_INFO.name}</strong> brings two decades of experience in corporate web infrastructure, industrial ERPs, and retail POS systems to Pakistan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-semibold text-white">UAE Quality Controls</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Written SLAs, code audits, and sub-second query tuning.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <Cpu className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-semibold text-white">Bespoke Architecture</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Built around your workflow without rigid template lock-in.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <Clock className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-semibold text-white">Direct Escalation</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Senior systems engineers available on-site and remotely.</p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToAbout}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C81D25] hover:bg-[#A6171E] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Our Dubai-to-Sialkot Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-white/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Track Record Summary */}
          <div className="lg:col-span-5 bg-white/[0.03] rounded-xl p-6 sm:p-8 text-white border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
              <span className="font-semibold text-slate-300">Engineering Track Record</span>
              <span className="text-slate-400">Active in Sialkot</span>
            </div>

            <div className="space-y-5">
              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-semibold text-white tabular-nums w-20 flex-shrink-0">
                  20+ Yrs
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Corporate UAE Experience</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Enterprise platforms across Dubai &amp; GCC trading corridors.</p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-semibold text-white tabular-nums w-20 flex-shrink-0">
                  500+
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Commercial Deployments</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Web applications, export ERPs, and multi-branch retail POS.</p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-semibold text-white tabular-nums w-20 flex-shrink-0">
                  99.9%
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Production SLA</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Monitored uptime with local factory LAN continuity.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
              <span>Kotli Behram, Sialkot · Direct UAE &amp; UK Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutPreview;
