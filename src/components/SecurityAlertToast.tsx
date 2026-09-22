import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, X, Lock } from 'lucide-react';
import { EvonixMark } from './EvonixLogo';

interface SecurityAlertToastProps {
  message: string | null;
  onClose: () => void;
}

export const SecurityAlertToast: React.FC<SecurityAlertToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-md w-full"
        >
          <div className="rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl shadow-cyan-950/80 p-4 backdrop-blur-xl flex items-start gap-3.5 ring-1 ring-cyan-500/30">
            <div className="p-1.5 rounded-xl bg-red-500/10 border border-red-500/30 flex-shrink-0 mt-0.5">
              <EvonixMark className="w-5 h-5" />
            </div>

            <div className="flex-1 pr-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  EVONIX Security Shield
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                  Protected
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Dismiss security notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
