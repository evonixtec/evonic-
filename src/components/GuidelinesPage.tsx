import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  BookOpen,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NavPageId } from './Navbar';

interface GuidelinesPageProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (serviceType?: string) => void;
}

export const GuidelinesPage: React.FC<GuidelinesPageProps> = ({
  onNavigatePage,
  onOpenQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<'network' | 'backup' | 'motherboard' | 'pos'>('network');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Industrial Tech Standards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            IT Infrastructure & Factory Hardware Guidelines
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Standard operating procedures tested in Sialkot export manufacturing factories. Keep your networks, servers, and computers online.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenQuote('IT Guidelines Audit')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Factory IT Audit</span>
            </button>
            <button
              onClick={() => onNavigatePage('guides')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all cursor-pointer"
            >
              <span>View All Technical Articles</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('network')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeCategory === 'network'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Factory LAN & Fiber Cabling
          </button>
          <button
            onClick={() => setActiveCategory('backup')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeCategory === 'backup'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Ransomware & Backup Rules
          </button>
          <button
            onClick={() => setActiveCategory('motherboard')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeCategory === 'motherboard'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            ESD & Dust Prevention
          </button>
          <button
            onClick={() => setActiveCategory('pos')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeCategory === 'pos'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Retail POS & Power Standards
          </button>
        </div>

        {/* Guideline Detail Sections */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {activeCategory === 'network' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Factory LAN & Optical Fiber Standards</h2>
                  <p className="text-slate-500 text-xs">Rulebook for metal-dusty manufacturing sheds and export units</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">1. Separate Office LAN from Heavy Generator Lines</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Heavy stamping presses create voltage drops. Run Cat6 cables inside grounded PVC conduits at least 1 meter away from industrial 3-phase power lines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">2. Always Setup Dual-Fiber Internet Failover</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Never trust a single ISP line for WeBOC customs filing. Connect two independent fiber connections to an automatic multi-WAN router.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">3. Lock Server Racks With Air Filters</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Grinding dust settles inside network switches and short-circuits copper pins. Use sealed server cabinets with washable foam intake filters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Ransomware Protection & 3-2-1 Backup Rules</h2>
                  <p className="text-slate-500 text-xs">Protect your accounts, accounting ledgers, and foreign buyer patterns</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">1. Follow the Strict 3-2-1 Backup Rule</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Keep 3 copies of your ERP SQL database. Store them on 2 different media types, and keep 1 copy off-site or on an immutable NAS snapshot.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">2. Isolate Backup Drives with Read-Only Permissions</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Ransomware encrypts every mapped network drive. Your backup server must pull files using dedicated credentials that office PCs cannot edit.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">3. Test Full Recovery Once Every Quarter</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A backup is only as good as its restore test. Rebuild a sample test machine from your archive every 90 days to verify file integrity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'motherboard' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Electrostatic Discharge (ESD) & Dust Prevention</h2>
                  <p className="text-slate-500 text-xs">Safe bench servicing protocols for motherboards and graphics chips</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">1. Wear Grounded Wristbands at the Service Bench</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A tiny static spark of 100 volts will burn modern laptop controller chips. Always ground your technician bench with a 1-megohm resistor mat.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">2. Refresh Thermal Paste Every 12 Months</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Sialkot factory ambient heat dries thermal compound quickly. Clean old dried crust with 99% pure alcohol and apply high-conductivity thermal paste.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">3. Avoid High-Pressure Air Blowers Directly on Fans</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Spinning a cooling fan with compressed air generates back-voltage that can fry motherboard fan control MOSFETs. Hold the blades gently when cleaning.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'pos' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Retail POS & Power Standards</h2>
                  <p className="text-slate-500 text-xs">Reliable checkout counters for supermarkets, apparel, and hardware stores</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">1. Install Online Double-Conversion UPS</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Sudden load-shedding generator switchovers corrupt SQLite and SQL server database tables. Use an online UPS with zero transfer delay.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">2. Lock Operating System Ports</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Prevent cashiers from inserting personal USB flash drives. Disable unused ports to stop local malware infections on your billing terminals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">3. Daily Evening Database Sync</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Configure your POS terminal to upload a timestamped invoice ledger to the cloud server every night after store closing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Direct Contact Banner Rule 4 */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Got a question? Call us. We reply in 2 hours.</h2>
          <p className="text-slate-300 text-sm">
            Need help applying these guidelines at your Sialkot factory? Our team is based in Kotli Behram, Sialkot.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>{COMPANY_INFO.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <span>Visit Contact Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
