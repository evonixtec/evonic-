import React from 'react';
import { COMPANY_INFO } from '../../data/content';
import { ArrowRight, ShieldCheck, Award, MapPin, CheckCircle, Cpu, Clock } from 'lucide-react';

interface HomeAboutPreviewProps {
  onNavigateToAbout: () => void;
  onOpenQuote: () => void;
}

export const HomeAboutPreview: React.FC<HomeAboutPreviewProps> = ({
  onNavigateToAbout,
  onOpenQuote,
}) => {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200">
              <Award className="w-3.5 h-3.5 text-red-600" />
              Dubai Enterprise Pedigree
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              20+ Years of International IT Excellence — Now Operating in Sialkot
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded on strict enterprise engineering methodologies in the United Arab Emirates, <strong className="text-slate-900">{COMPANY_INFO.name}</strong> brings two decades of hands-on experience in high-availability enterprise networks, bespoke ERP software, retail point-of-sale systems, and component-level electronics restoration to Pakistan.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-red-600 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900">UAE Quality Standards</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Strict quality controls and zero-downtime protocols.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Cpu className="w-5 h-5 text-blue-600 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900">Micro-Soldering Lab</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Motherboard chip repair with microscope accuracy.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-emerald-600 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900">Doorstep Dispatch</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">On-site engineers across all Sialkot industrial zones.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToAbout}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <span>Read Our Full Story & Dubai Bridge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Request Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Highlights Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Company Track Record</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Active in Sialkot
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm flex-shrink-0">
                  20+
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Years Corporate UAE Experience</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Enterprise engineering across Dubai & UAE trading corridors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm flex-shrink-0">
                  500+
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Commercial Projects Delivered</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Corporate portals, POS installations, and factory networks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                  100%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Component-Level Diagnostics</h4>
                  <p className="text-xs text-slate-400 mt-0.5">BGA rework, microscopic soldering & clean-room printer servicing.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Paris Road & Cantt Hub, Sialkot</span>
              </div>
              <span className="font-semibold text-emerald-400">On-Site & Remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
