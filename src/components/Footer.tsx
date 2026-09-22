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
  CheckCircle2,
  ExternalLink
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

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: COMPANY_INFO.contact.socials?.linkedin || 'https://www.linkedin.com/company/evonix-technologies',
      hoverClass: 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white hover:shadow-blue-500/25',
      label: 'Follow EVONIX on LinkedIn (Professional IT Network)',
      icon: (
        <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: COMPANY_INFO.contact.socials?.facebook || 'https://www.facebook.com/evonixtechnologies',
      hoverClass: 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white hover:shadow-blue-600/25',
      label: 'Follow EVONIX on Facebook (Community & Updates)',
      icon: (
        <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: COMPANY_INFO.contact.socials?.instagram || 'https://www.instagram.com/evonixtechnologies',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:shadow-pink-500/25',
      label: 'Follow EVONIX on Instagram (Tech Insights & Showcase)',
      icon: (
        <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp Direct',
      url: COMPANY_INFO.contact.socials?.whatsapp || 'https://wa.me/9232632440002',
      hoverClass: 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:shadow-emerald-500/25',
      label: 'Connect with EVONIX on WhatsApp',
      icon: <MessageSquare className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />,
    },
  ];

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
          {/* Brand Col & Social Media Follow Section */}
          <div className="lg:col-span-4 space-y-4">
            <EvonixLogo size="md" forceTheme="light" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mt-3">
              EVONIX brings two decades of enterprise engineering and hardware diagnostic experience from Dubai, UAE to Sialkot, Pakistan. Empowering local exporters, retailers, and medical institutions with international technology standards.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified IT Partner in Sialkot</span>
            </div>

            {/* Social Media Follow Section with Hover-Animated Badges */}
            <div className="pt-3 border-t border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-800 block mb-2 uppercase tracking-wider">
                Follow EVONIX Online
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`group relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md active:scale-95 flex items-center justify-center cursor-pointer ${social.hoverClass}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 font-medium">
                LinkedIn • Facebook • Instagram • WhatsApp Direct
              </p>
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
                    className="text-slate-600 hover:text-red-600 transition-colors capitalize cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item === 'blogs' ? '60 Tech Guides' : item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Blogs Linking */}
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
            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Knowledge Hub
              </span>
              <button
                onClick={() => onNavigate('blogs')}
                className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All 60 SEO Tech Guides</span>
              </button>
            </div>
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

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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
                  Warranty & Returns
                </button>
                <span>•</span>
              </>
            )}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Official XML Sitemap (74 indexed URLs)"
            >
              <span>Sitemap</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
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
