import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, RefreshCw, Mail, Phone, ExternalLink } from 'lucide-react';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS, REFUND_POLICY, PolicySection } from '../data/policies';
import { EvonixMark } from './EvonixLogo';

export type PolicyType = 'privacy' | 'terms' | 'refund' | null;

interface PolicyModalProps {
  policyType: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const getPolicyData = (): PolicySection => {
    switch (policyType) {
      case 'privacy':
        return PRIVACY_POLICY;
      case 'terms':
        return TERMS_AND_CONDITIONS;
      case 'refund':
        return REFUND_POLICY;
    }
  };

  const data = getPolicyData();

  const getIcon = () => {
    switch (policyType) {
      case 'privacy':
        return <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'terms':
        return <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'refund':
        return <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
                <EvonixMark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white">
                    {data.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Updated {data.lastUpdated}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  EVONIX Legal & Corporate Governance (evonix.co)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {data.summary}
              </p>
            </div>

            {data.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  {sec.heading}
                </h4>
                <div className="space-y-2 pl-3 border-l-2 border-slate-200 dark:border-slate-800">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Corporate Verification Box */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Corporate Governance & Inquiries
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <a href="mailto:hello@evonix.co" className="flex items-center gap-1 hover:text-red-600">
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    hello@evonix.co
                  </a>
                  <a href="tel:+923263244002" className="flex items-center gap-1 hover:text-red-600">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    +92 326 3244002
                  </a>
                  <a
                    href="https://www.evonix.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-red-600 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                    evonix.co
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
