import React, { useState } from 'react';
import {
  Home,
  Layers,
  ShoppingBag,
  MessageSquare,
  Phone,
  Download,
  X,
  Share2,
  Sparkles,
  Wrench
} from 'lucide-react';
import { NavPageId } from './Navbar';
import { COMPANY_INFO } from '../data/content';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileBottomNavProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
  onOpenChat: () => void;
  onOpenQuote: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenChat,
  onOpenQuote,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {/* Mobile Sticky Bottom Dock (App-Like Feel) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Home</span>
          </button>

          {/* 2. Services */}
          <button
            onClick={() => onNavigate('services')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'services'
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Services</span>
          </button>

          {/* 3. Center Highlight: Instant WhatsApp Call/Chat */}
          <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I am reaching out from your mobile app for urgent support in Sialkot.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center -mt-4 relative group"
            title="Urgent WhatsApp Support"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 active:scale-95 transition-all">
              <MessageSquare className="w-6 h-6 fill-white/20" />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 mt-0.5">WhatsApp</span>
          </a>

          {/* 4. Hardware Shop */}
          <button
            onClick={() => onNavigate('shop')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              currentPage === 'shop'
                ? 'text-red-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Shop</span>
          </button>

          {/* 5. Live Desk Chat */}
          <button
            onClick={onOpenChat}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-red-600 transition-all cursor-pointer relative"
          >
            <Wrench className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Live Desk</span>
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* 6. In-App Mobile Install Option (shown if installable or iOS) */}
          {(!isInstalled && (isInstallable || isIOS)) && (
            <button
              onClick={handleInstallClick}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-red-600 hover:text-red-700 transition-all cursor-pointer"
              title="Install Mobile App"
            >
              <Download className="w-5 h-5 mb-0.5 animate-bounce" />
              <span className="text-[10px] font-bold leading-tight">Get App</span>
            </button>
          )}
        </div>
      </nav>

      {/* iOS Safari Guided Add-to-Home-Screen Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white font-extrabold flex items-center justify-center shadow-md">
                  EX
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Install EVONIX App</h3>
                  <p className="text-xs text-slate-500">Fast home screen experience</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">1</span>
                <span>Tap the Safari "Share" button <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> at bottom</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">2</span>
                <span>Scroll down and select "Add to Home Screen"</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px]">3</span>
                <span>Open EVONIX with 1-tap from your home screen</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
