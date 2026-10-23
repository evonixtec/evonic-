import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SpecialOfferBannerProps {
  className?: string;
  toolName?: string;
}

export const SpecialOfferBanner: React.FC<SpecialOfferBannerProps> = ({ className = '', toolName }) => {
  return (
    <div
      className={`rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 p-4 sm:p-5 text-slate-100 shadow-lg relative overflow-hidden backdrop-blur-md ${className}`}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Special Launch Offer • 60 Days Free Access</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
            <span>All Evonix Tools &amp; Calculators Are 100% Free!</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950">
              No Payment Needed
            </span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {toolName ? `${toolName} and all other tools` : 'Every tool in our suite'} are currently 100% free with unlimited calculations. No credit card, no payment, and no license key required.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs">
          <div className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full Pro Access Unlocked</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-slate-300 text-[11px] px-2 py-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Zero Subscription • Lifetime Local Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;
