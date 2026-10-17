import React, { useState } from 'react';
import { 
  Laptop, 
  Monitor, 
  ShieldCheck, 
  Key, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Terminal, 
  HardDrive,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getHardwareDeviceId } from '../lib/licenseSystem';

export interface InstallationGuidePageProps {
  onNavigatePage?: (page: any) => void;
}

export const InstallationGuidePage: React.FC<InstallationGuidePageProps> = ({ onNavigatePage }) => {
  const [activeTab, setActiveTab] = useState<'windows' | 'mac' | 'hwid' | 'activation'>('windows');
  const [copiedHwid, setCopiedHwid] = useState(false);
  const hardwareId = getHardwareDeviceId();

  const handleCopyHwid = () => {
    navigator.clipboard.writeText(hardwareId);
    setCopiedHwid(true);
    setTimeout(() => setCopiedHwid(false), 2000);
  };

  return (
    <div className="py-12 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Mobile Warning Banner - Strictly Required */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Important Note for Mobile Users
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              For Mobile Users (Android / iPhone): This is a desktop software (Windows/Mac). On mobile, you can use our online web version of the calculator. The downloadable offline version is only for Windows and Mac.
            </p>
          </div>
        </div>

        {/* Page Header */}
        <div className="apple-glass-box p-6 sm:p-8 space-y-3">
          <div className="apple-badge">
            <Laptop className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Official Desktop Deployment Guide</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
            Installation, HWID Lock &amp; License Activation Guide
          </h1>
          <p className="text-sm text-[#86868b] leading-relaxed max-w-3xl">
            Clean 64-bit native builds for Windows 10/11 and macOS 12 to 15 (Apple Silicon M1/M2/M3 &amp; Intel). Once activated with your Single License Key, software runs 100% offline without internet.
          </p>

          {/* HWID Card */}
          <div className="mt-4 p-4 rounded-xl bg-white/90 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider block">
                Your Machine Hardware ID (HWID)
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-[#0071e3]">
                {hardwareId}
              </span>
            </div>
            <button
              onClick={handleCopyHwid}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto"
            >
              {copiedHwid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHwid ? 'Copied HWID!' : 'Copy Hardware ID'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-black/8 shadow-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('windows')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'windows' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Windows 10 / 11</span>
          </button>
          <button
            onClick={() => setActiveTab('mac')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'mac' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>macOS (Intel &amp; Apple Silicon)</span>
          </button>
          <button
            onClick={() => setActiveTab('hwid')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'hwid' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>HWID Finding</span>
          </button>
          <button
            onClick={() => setActiveTab('activation')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'activation' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Single Key Activation</span>
          </button>
        </div>

        {/* Tab 1: Windows 10/11 Guide */}
        {activeTab === 'windows' && (
          <div className="space-y-6">
            <div className="apple-glass-box p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-black/6 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1d1d1f]">Windows 10 &amp; Windows 11 Native Setup</h2>
                  <p className="text-xs text-[#86868b]">Standard 64-bit installer (.exe) with zero antivirus flags</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">1</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Download .exe</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Download the official Windows installer directly from your purchase email or the links below.
                  </p>
                </div>
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">2</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Run Setup Wizard</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Double-click the .exe file. It installs locally to Program Files without external dependencies.
                  </p>
                </div>
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">3</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Launch &amp; Activate</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Open the desktop shortcut. Paste your Single License Key. Software is unlocked permanently offline.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/90 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Antivirus False-Positive Protection</span>
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Our Windows executables are built strictly without packing wrappers or obfuscators, preventing Windows Defender or third-party antivirus alerts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: macOS Guide */}
        {activeTab === 'mac' && (
          <div className="space-y-6">
            <div className="apple-glass-box p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-black/6 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1d1d1f]">macOS Monterey, Ventura, Sonoma &amp; Sequoia Setup</h2>
                  <p className="text-xs text-[#86868b]">Universal Binary (.dmg) for Apple Silicon (M1/M2/M3/M4) &amp; Intel</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">1</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Open .dmg Package</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Mount the downloaded disk image file by double clicking it in Finder.
                  </p>
                </div>
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">2</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Drag to Applications</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Drag the application icon into your Mac Applications folder.
                  </p>
                </div>
                <div className="apple-result-box p-5 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center">3</div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">First Launch</h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Launch from Launchpad or Spotlight. Enter your Single License Key to activate offline mode.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/90 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#0071e3]" />
                  <span>Apple Silicon Native Acceleration</span>
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Engineered natively with ARM64 support for maximum speed and zero battery drain on M1, M2, M3, and M4 MacBooks and iMacs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: HWID Guide */}
        {activeTab === 'hwid' && (
          <div className="space-y-6">
            <div className="apple-glass-box p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-black/6 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1d1d1f]">Hardware ID (HWID) Device-Lock Architecture</h2>
                  <p className="text-xs text-[#86868b]">How machine binding protects your license while giving you 100% offline access</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                <p>
                  Every license key binds to your device's unique Hardware ID on first activation. This prevents unauthorized copies while ensuring you never need an active internet connection to calculate fees, export ledgers, or access the Professional suite.
                </p>
                <div className="apple-result-box p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">Active Machine Hardware ID</span>
                  <div className="flex items-center gap-3 font-mono text-base font-bold text-[#0071e3]">
                    <span>{hardwareId}</span>
                  </div>
                  <p className="text-xs text-[#86868b]">
                    If you change your laptop or desktop, contact Evonix Support with your original purchase email and new Hardware ID to transfer your license.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Single Key Activation */}
        {activeTab === 'activation' && (
          <div className="space-y-6">
            <div className="apple-glass-box p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-black/6 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1d1d1f]">Single Key Architecture (1 Key For All Tools)</h2>
                  <p className="text-xs text-[#86868b]">No juggling multiple passwords or tool keys</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                <p>
                  Whether you purchase 1 tool (like eBay Calculator) or the complete 6-Tool Ecommerce Bundle, you receive exactly one Single License Key.
                </p>
                <div className="apple-result-box p-5 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0071e3]">Automated Email Delivery</h4>
                  <pre className="text-xs font-mono bg-white/90 p-4 rounded-xl border border-black/6 whitespace-pre-wrap leading-relaxed text-[#1d1d1f]">
Subject: Your Download &amp; License Key for Evonix Suite
Body: Hi [Name], Thank you for your purchase!
Your Single License Key: EVONIC-PRO-A1B2-C3D4
Windows (.exe): https://ais-pre-f57uxe2f3hcg2mjiz4sfak-621551508547.asia-southeast1.run.app/downloads/windows
Mac (.dmg): https://ais-pre-f57uxe2f3hcg2mjiz4sfak-621551508547.asia-southeast1.run.app/downloads/mac
Installation Guide: /installation-guide
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links to 6 Tools */}
        <div className="apple-glass-box p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-base text-[#1d1d1f]">All 6 E-Commerce Fee Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'ebay-fee-calculator', name: 'eBay Fee Calculator', tag: 'Master Reference' },
              { id: 'tiktok-shop-fee-calculator', name: 'TikTok Shop Fee Calculator', tag: 'New 2026' },
              { id: 'amazon-fba-calculator', name: 'Amazon FBA Calculator', tag: 'New 2026' },
              { id: 'shopify-fee-calculator', name: 'Shopify Fee Calculator', tag: 'New 2026' },
              { id: 'stripe-fee-calculator', name: 'Stripe Fee Calculator', tag: 'New 2026' },
              { id: 'temu-seller-calculator', name: 'Temu Seller Calculator', tag: 'New 2026' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigatePage && onNavigatePage(tool.id)}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between shadow-xs group"
              >
                <div>
                  <span className="text-xs font-bold text-[#1d1d1f] block group-hover:text-[#0071e3] transition-colors">{tool.name}</span>
                  <span className="text-[10px] text-[#86868b]">{tool.tag}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-[#0071e3] transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
