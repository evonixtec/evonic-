import React, { useState } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  // Do not show if already installed or dismissed
  if (isInstalled || dismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  return (
    <div className="lg:hidden bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white border-b border-red-500/20 px-3 py-2 flex items-center justify-between text-xs sticky top-0 z-50 animate-fadeIn">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-[11px] flex-shrink-0 shadow-sm">
          EX
        </div>
        <div className="truncate">
          <span className="font-bold text-white block text-[11px] leading-tight truncate">
            Install EVONIX Mobile App
          </span>
          <span className="text-[10px] text-slate-300 block truncate">
            Fast Sialkot repair tracking & instant support
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
        <button
          onClick={install}
          className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3 h-3" />
          <span>Install</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
