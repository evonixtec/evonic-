import React from 'react';
import { COMPANY_INFO, SERVICES } from '../data/content';
import { SectionId } from '../types';
import { EvonixLogo } from './EvonixLogo';
import {
  Globe,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2
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
    <footer id="main-footer" className="bg-slate-100 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline & CTA Callout Banner */}
        <div className="pb-12 border-b border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {COMPANY_INFO.tagline1}
            </h3>
            <p className="text-sm sm:text-base text-red-600 font-semibold">
              {COMPANY_INFO.tagline2}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Backed by 20+ years of Dubai IT industry heritage, delivering world-class website development, custom POS software, computer repairing, and on-site doorstep technical service across Sialkot, Pakistan.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Get Free Consultation</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I would like to connect.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +{COMPANY_INFO.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* 4 Columns Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <EvonixLogo size="md" forceTheme="light" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mt-3">
              EVONIX brings two decades of enterprise engineering and hardware diagnostic experience from Dubai, UAE to Sialkot, Pakistan. Empowering local exporters, retailers, and medical institutions with international technology standards.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified IT Partner in Sialkot</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'services', 'blogs', 'about', 'shop', 'portfolio', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item as SectionId)}
                    className="text-slate-600 hover:text-red-600 transition-colors capitalize cursor-pointer"
                  >
                    {item === 'blogs' ? '60 Tech Guides' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Our Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-600 hover:text-red-600 transition-colors text-left cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Sialkot Office & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phoneRaw}`} className="text-slate-800 hover:text-red-600 font-semibold">
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-slate-800 hover:text-red-600">
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp: +{COMPANY_INFO.contact.whatsappDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Policies & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} EVONIX. All rights reserved. Registered IT Partner in Sialkot, Pakistan.
          </div>

          <div className="flex items-center gap-4">
            {onOpenPolicy && (
              <>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Refund & Service Policy
                </button>
              </>
            )}
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
