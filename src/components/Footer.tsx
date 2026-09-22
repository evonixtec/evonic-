import React from 'react';
import { COMPANY_INFO, SERVICES } from '../data/content';
import { SectionId } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { EvonixLogo } from './EvonixLogo';
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
  onOpenPolicy?: (type: 'privacy' | 'terms' | 'refund') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote, onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-12 relative overflow-hidden transition-colors">
      {/* Background Lighting Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 dark:bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-slate-400/10 dark:bg-blue-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative font-sans">
        {/* Top Tagline & CTA Callout Banner */}
        <div className="pb-12 border-b border-slate-200 dark:border-slate-800/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            {/* Tagline 1 */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {COMPANY_INFO.tagline1}
            </h3>
            {/* Tagline 2 */}
            <p className="text-sm sm:text-base text-red-600 dark:text-cyan-400 font-semibold">
              {COMPANY_INFO.tagline2}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Backed by 20+ years of Dubai IT industry heritage, delivering world-class website development, custom POS software, computer repairing, and on-site doorstep technical service across Sialkot, Pakistan.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Get a Free Quote Today</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/70 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Direct Desk</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Footer Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Heritage (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <EvonixLogo size="md" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              EVONIX TECHNOLOGIES was founded in Dubai (UAE) and served the Gulf region for over two decades. Now bringing the exact same international standards, hardware lab, and software engineering to Sialkot, Pakistan and global enterprise clients.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium shadow-sm">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                Dubai (UAE) Heritage
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400" />
                Sialkot Headquarters
              </span>
            </div>
          </div>

          {/* Col 2: Navigation & Blogs (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Home (Top)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  About Us (Story & Mission)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blogs')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors font-semibold text-red-600 dark:text-cyan-400"
                >
                  Blogs & Tech Guides (60)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reach')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Global Reach (Dubai ⇄ Sialkot)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Portfolio (Dubai Clients)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Shop (Hardware & POS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  FAQ & Transition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies & Core Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Policies & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pb-4">
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('terms')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Terms and Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('refund')}
                  className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Refund Policy</span>
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
              Core Technical Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-red-600 dark:hover:text-cyan-400 transition-colors text-left flex items-start gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coverage (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Official EVONIX Desks
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Sialkot, Punjab, Pakistan (HQ & Lab)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="mailto:hello@evonix.co" className="hover:text-red-600 font-medium">
                  hello@evonix.co
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a href="mailto:evonixtec@gmail.com" className="hover:text-red-600">
                  evonixtec@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+923263244002" className="hover:text-red-600 font-mono font-semibold">
                  +92 326 3244002
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <a href="tel:+917888000375" className="hover:text-red-600 font-mono">
                  +91 7888000375 (Corporate)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Zero Fee If Unresolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sialkot Locality Tags Bar */}
        <div className="pt-6 pb-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Doorstep On-Site Service Available Across Sialkot:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMPANY_INFO.contact.homeServiceAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <p>
              © {new Date().getFullYear()} EVONIX (evonix.co). All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
              SECP Registered SMC (IT Sector)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-red-200 dark:border-cyan-900/60 text-[10px] text-red-600 dark:text-cyan-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-red-500 dark:text-cyan-400" />
              Cyber-Shield Protected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden md:flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-900 dark:text-white font-medium">Dubai (UAE)</span>
              <span>⇄</span>
              <span className="text-red-600 dark:text-cyan-400 font-medium">Pakistan</span>
            </p>

            {/* Theme switcher in footer */}
            <ThemeSwitcher variant="pill" />

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs shadow-xs"
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
