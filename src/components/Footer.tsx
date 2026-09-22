import React from 'react';
import { COMPANY_INFO, SERVICES } from '../data/content';
import { SectionId } from '../types';
import {
  Globe,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  ArrowUp,
  Sparkles,
  Clock,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Tagline & CTA Callout Banner */}
        <div className="pb-12 border-b border-slate-800/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            {/* Tagline 1 */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {COMPANY_INFO.tagline1}
            </h3>
            {/* Tagline 2 */}
            <p className="text-sm sm:text-base text-cyan-400 font-semibold">
              {COMPANY_INFO.tagline2}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Backed by 20+ years of Dubai IT industry heritage, delivering world-class website development, custom POS software, computer repairing, and on-site doorstep technical service across Sialkot, Pakistan.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Get a Free Quote Today</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-950/70 border border-emerald-800/70 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct Desk</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Footer Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Heritage (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-mono font-black text-cyan-400 text-lg">E</span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight text-lg">EVONIX TECHNOLOGIES</span>
                <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                  Dubai • Pakistan
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              EVONIX TECHNOLOGIES was founded in Dubai (UAE) and served the Gulf region for over two decades. Now bringing the exact same international standards, hardware lab, and software engineering to Sialkot and all Pakistan.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-medium">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                Dubai (UAE) Heritage
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-medium">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Sialkot Headquarters
              </span>
            </div>
          </div>

          {/* Col 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home (Top)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Us (Story & Mission)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reach')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Global Reach (Dubai ⇄ Sialkot)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Portfolio (Dubai Clients)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shop (Hardware & POS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  FAQ & Transition Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Core IT Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-cyan-400 transition-colors text-left flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coverage (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sialkot On-Site Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300">Sialkot, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-white transition-colors font-mono">
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phoneRaw}`} className="hover:text-cyan-400 transition-colors font-mono font-semibold">
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-400 font-medium">Zero Fee If Unresolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sialkot Locality Tags Bar */}
        <div className="pt-6 pb-8 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Doorstep On-Site Service Available Across Sialkot:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMPANY_INFO.contact.homeServiceAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 text-slate-400 border border-slate-800"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <p>
              © {new Date().getFullYear()} EVONIX TECHNOLOGIES. All rights reserved. Sialkot, Pakistan.
            </p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
              SECP Registered SMC (IT Sector)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-900/60 text-[10px] text-cyan-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Cyber-Shield Protected
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-cyan-400 font-medium">Dubai (UAE)</span>
              <span>⇄</span>
              <span className="text-emerald-400 font-medium">Sialkot (Pakistan)</span>
            </p>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
