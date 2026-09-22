import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, RefreshCw, Mail, Phone } from 'lucide-react';
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
        return <ShieldCheck className="w-5 h-5 text-red-600" />;
      case 'terms':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'refund':
        return <RefreshCw className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-50 border border-red-200">
                <EvonixMark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-sans text-slate-900">
                    {data.title}
                  </h3>
                  {getIcon()}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Last Updated: {data.lastUpdated} • EVONIX Sialkot
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="px-6 py-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
            {data.summary && (
              <p className="text-base text-slate-800 font-medium pb-2 border-b border-slate-100">
                {data.summary}
              </p>
            )}

            <div className="space-y-6">
              {data.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    {sec.heading}
                  </h4>
                  <div className="space-y-1.5 pl-3.5">
                    {sec.content.map((point, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span>Contact Legal / Support: evonixtec@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>+92 326 3244002</span>
              </div>
            </div>
          </div>

          {/* Footer Close */}
          <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
