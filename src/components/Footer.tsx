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
  ExternalLink,
  Clock,
  Wrench,
  Cpu,
  FileText,
  Barcode,
  Building2,
  ChevronRight,
  Tag,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionId | string) => void;
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
      hoverClass: 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white',
      label: 'LinkedIn Profile',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: COMPANY_INFO.contact.socials?.facebook || 'https://www.facebook.com/evonixtechnologies',
      hoverClass: 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white',
      label: 'Facebook Page',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: COMPANY_INFO.contact.socials?.instagram || 'https://www.instagram.com/evonixtechnologies',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white',
      label: 'Instagram Showcase',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: COMPANY_INFO.contact.socials?.whatsapp || 'https://wa.me/9232632440002',
      hoverClass: 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white',
      label: 'Direct WhatsApp Chat',
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 selection:bg-red-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Top Emergency Help Desk Banner */}
        <div className="pb-10 border-b border-slate-800/90 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>On-Duty Desk: Kotli Behram & Paris Road, Sialkot</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {COMPANY_INFO.tagline1}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Got a question? Call us. We reply in 2 hours. 20+ years of Dubai IT engineering standard right here in Sialkot.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Get Free Consultation</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I need urgent IT support in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold text-xs border border-emerald-900/60 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +{COMPANY_INFO.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* 2. Main 5-Column Content Grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          {/* Column 1: Brand & Compliance Credentials (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <EvonixLogo size="md" forceTheme="dark" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              EVONIX brings two decades of enterprise engineering and hardware diagnostic experience from Dubai, UAE to Sialkot, Pakistan.
            </p>

            {/* Badges */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>SECP Registered IT Company (SMC)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Globe className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span>Dubai IT Heritage Since 2004</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                Follow Us Online
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
                    className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center cursor-pointer ${social.hoverClass}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Core Services (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-red-500" />
              <span>Core Services</span>
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Industrial IT Consultancy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Hardware AMC Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  B2B Export Web Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Retail & FBR POS Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Laptop Micro-Soldering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer text-emerald-400 font-semibold"
                >
                  POS Hardware Store →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Local Coverage Hubs (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Coverage Zones</span>
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer font-medium text-slate-200"
                >
                  Kotli Behram IT Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Paris Road & Cantt Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Daska Industrial Belt
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Sambrial Dry Port & SIAL
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Wazirabad Cutlery Zone
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="text-red-400 font-bold hover:underline transition-colors flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <span>Regional Hub Pages →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Interactive Tools & SEO (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-red-500" />
              <span>Tools & Hubs</span>
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  AI Multimeter Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Live RMA Ticket Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Cost Diagnostic Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  80+ Tech Blogs & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Google Keyword Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('invoice')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer text-amber-300 font-bold flex items-center gap-1"
                >
                  <span>Free Enterprise Invoice Hub</span>
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecommerce-calculator')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer text-emerald-400 font-bold flex items-center gap-1"
                >
                  <span>E-Commerce Margin Calculator</span>
                  <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-black">TOOL</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cbm-calculator')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer text-blue-300 font-bold flex items-center gap-1"
                >
                  <span>Export CBM Cargo Engine</span>
                  <span className="text-[9px] bg-amber-500 text-slate-900 px-1.5 py-0.2 rounded font-black">EXPORT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer text-slate-300 font-medium"
                >
                  Client Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Lab Address & Contact Desk (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-red-500" />
              <span>Lab & Desk</span>
            </h4>
            <div className="space-y-2.5 text-slate-400">
              {/* Styled Kotli Behram Card */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 leading-snug space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>Kotli Behram Lab Desk</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Sialkot</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  {COMPANY_INFO.contact.address}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>15-Min Doorstep Dispatch Available</span>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                  className="text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Refined & Authentic Services and Coverage Directory (Organic, Non-Spammy) */}
        <div className="py-6 my-6 border-y border-slate-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-red-500 flex-shrink-0" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Core IT Services & Sialkot Service Hubs
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Serving Kotli Behram, Paris Road, Cantt, Daska, Sambrial & Wazirabad
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
            {[
              { label: 'IT Consultancy', sub: 'Factory AMC Contracts', target: 'services' },
              { label: 'Laptop & Chip Repair', sub: 'Kotli Behram Lab', target: 'services' },
              { label: 'Custom Web & Portals', sub: 'E-Commerce Solutions', target: 'services' },
              { label: 'Retail POS & Hardware', sub: 'Printers & Terminals', target: 'shop' },
              { label: 'Sialkot Doorstep IT', sub: '15-Min Rapid Dispatch', target: 'contact' },
              { label: 'Tech Blogs & Guides', sub: '80+ Field Tutorials', target: 'guides' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(item.target)}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-red-600/60 text-left transition-all cursor-pointer group"
              >
                <span className="text-slate-200 font-bold text-xs block group-hover:text-red-400 transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Bottom Legal Policies & Copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} EVONIX TECHNOLOGIES. All rights reserved. SECP Registered IT Company in Sialkot, Pakistan.
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {onOpenPolicy && (
              <>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Warranty & RMA Policy
                </button>
                <span>•</span>
              </>
            )}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Official XML Sitemap (142 verified URLs)"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
