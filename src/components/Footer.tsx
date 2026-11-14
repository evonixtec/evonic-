import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { getMainAgencyDomainUrl, getToolsDomainUrl, getStoreDomainUrl } from '../lib/domainUtils';
import { SectionId } from '../types';
import { EvonixLogo } from './EvonixLogo';
import {
  Globe,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Wrench,
  Cpu,
  Building2,
  Briefcase,
  BookOpen,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionId | string, subTarget?: string) => void;
  onOpenQuote: () => void;
  onOpenPolicy?: (type: 'privacy' | 'terms' | 'refund' | 'mobile' | 'matrix' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote, onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: COMPANY_INFO.contact.socials?.linkedin || 'https://www.linkedin.com/company/evonix-technologies',
      label: 'LinkedIn Profile',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: COMPANY_INFO.contact.socials?.facebook || 'https://www.facebook.com/profile.php?id=61595290703138',
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
      label: 'Instagram Showcase',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: COMPANY_INFO.contact.socials?.whatsapp || 'https://wa.me/923263244002',
      label: 'Direct WhatsApp Chat',
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-[#111827] text-slate-300 border-t border-slate-800 pt-16 pb-12 selection:bg-[#C81E1E] selection:text-white print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Top Desk Inquiry Row */}
        <div className="pb-10 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <p className="text-xs font-medium text-slate-400">
              Engineering Desk · Kotli Behram, Sialkot · UAE Heritage Since 2004
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {COMPANY_INFO.tagline1}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Got a question? Call us. We reply in 2 hours. Twenty years of Dubai corporate software standards deployed directly in Sialkot.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I need urgent IT support in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
              <span>WhatsApp: +{COMPANY_INFO.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* 2. Main 5-Column Directory */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          {/* Column 1: Brand & Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <EvonixLogo size="md" forceTheme="dark" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              evonix delivers two decades of enterprise software engineering, autonomous AI workflows, and industrial manufacturing ERP systems from Dubai, UAE to Sialkot, Pakistan.
            </p>

            <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>SECP Registered IT Company (SMC)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Dubai IT Heritage Since 2004</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-medium text-slate-400 block mb-2">
                Official Channels
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
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span>Core Services</span>
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Enterprise Software Engineering
                </button>
              </li>
              <li>
                <a
                  href="/sialkot-export-erp"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('sialkot-export-erp');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block font-medium text-white"
                >
                  Sialkot Export Industrial ERP
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Enterprise AI &amp; Cloud Pipelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Retail &amp; FBR POS Systems
                </button>
              </li>
              <li>
                <a
                  href={getStoreDomainUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left block"
                >
                  Hardware &amp; POS Store
                </a>
              </li>
              <li>
                <a
                  href={getStoreDomainUrl('/services/doorstep-support')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left block"
                >
                  Doorstep Support (45m Dispatch)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Web Tools Hub */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>Web Tools Hub</span>
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="/tools/etsy-fee-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('etsy-fee-calculator');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  Etsy Fee &amp; Profit Calculator
                </a>
              </li>
              <li>
                <a
                  href="/tools/ebay-fee-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ebay-fee-calculator');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  eBay Fee &amp; Profit Builder
                </a>
              </li>
              <li>
                <a
                  href="/tools/invoice-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('invoice');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  Micro-Invoice Generator
                </a>
              </li>
              <li>
                <a
                  href="/ai-tools-name-for-travel-itinerary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ai-travel-tools');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  10 Best AI Travel Tools
                </a>
              </li>
              <li>
                <a
                  href="/tools/ai-trip-planner"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ai-trip-planner');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  AI Trip Planner Engine
                </a>
              </li>
              <li>
                <a
                  href="/tools/factory-network-tester"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('factory-network-tester');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  Factory Network Tester
                </a>
              </li>
              <li>
                <a
                  href="/tools/ecommerce-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ecommerce-calculator');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  E-Commerce Margin Calc
                </a>
              </li>
              <li>
                <a
                  href="/tools/export-barcode-studio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('export-barcode-studio');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  Export Barcode Studio
                </a>
              </li>
              <li>
                <a
                  href="/tools/schema-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('schema-generator');
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer block"
                >
                  JSON-LD Schema Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Portfolio & Guides */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>Client Portfolio</span>
              </h3>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="hover:text-white transition-colors text-left cursor-pointer block"
                  >
                    Dubai Web Deployments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="hover:text-white transition-colors text-left cursor-pointer block"
                  >
                    Software &amp; POS Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="hover:text-white transition-colors text-left cursor-pointer block"
                  >
                    Sialkot Export ERP Cases
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Technical Guides</span>
              </h3>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <button
                    onClick={() => onNavigate('guides')}
                    className="hover:text-white transition-colors text-left cursor-pointer block"
                  >
                    Architecture &amp; ERP Audits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('guides')}
                    className="hover:text-white transition-colors text-left cursor-pointer block font-medium text-white"
                  >
                    Read Technical Articles
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 5: Headquarters & Contact Desk */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Headquarters</span>
            </h3>
            <div className="space-y-3 text-slate-300">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                  <span>Sialkot Engineering Hub</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {COMPANY_INFO.contact.address}
                </p>
                <p className="text-[10px] font-mono text-slate-300">
                  24/7 Enterprise SLA Desk
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                  className="text-slate-200 hover:text-white font-medium transition-colors"
                >
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-slate-200 hover:text-white font-medium transition-colors block"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                  <div className="text-[11px] text-slate-400 flex flex-col gap-0.5">
                    <a href={`mailto:${COMPANY_INFO.contact.emails.support}`} className="hover:text-white transition-colors">
                      {COMPANY_INFO.contact.emails.support}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.contact.emails.privacy}`} className="hover:text-white transition-colors">
                      {COMPANY_INFO.contact.emails.privacy}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.contact.emails.security}`} className="hover:text-white transition-colors">
                      {COMPANY_INFO.contact.emails.security}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('locations')}
                  className="text-[11px] text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Regional Hubs Directory</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Multi-Domain Ecosystem */}
        <div className="py-6 border-y border-white/10 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <h4 className="text-xs font-semibold text-white">
              Evonix Technologies Web Ecosystem
            </h4>
            <span className="text-xs text-slate-400">
              Synchronized multi-domain infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={getMainAgencyDomainUrl()}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  evonixtec.com
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  Main Agency
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                B2B Software Engineering, Web Development &amp; Enterprise AI Solutions
              </p>
            </a>

            <a
              href={getToolsDomainUrl()}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  tools.evonixtec.com
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  Free Workstation
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                26 Free E-Commerce, eBay, Etsy, Amazon FBA, CBM &amp; Export Fee Calculators
              </p>
            </a>

            <a
              href={getStoreDomainUrl()}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  store.evonixtec.com
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  Hardware Store
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Certified IT Hardware, POS Billing Counters, Thermal Printers &amp; Laptops
              </p>
            </a>
          </div>
        </div>

        {/* 4. Legal Policies & Copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} evonix technologies. All rights reserved. SECP Registered IT Company in Sialkot, Pakistan.
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </a>
            <span>·</span>
            <a
              href="https://store.evonixtec.com/services/doorstep-support"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Doorstep IT
            </a>
            <span>·</span>
            <a
              href="/sialkot-export-erp"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('sialkot-export-erp');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Export ERP
            </a>
            <span>·</span>
            <a
              href="/guides"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('guides');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Guides
            </a>
            <span>·</span>
            <a
              href="/tools/network-latency-tester"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('factory-network-tester');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Network Ping
            </a>
            <span>·</span>
            <a
              href="/locations/wazirabad"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('locations', 'wazirabad');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Wazirabad
            </a>
            <span>·</span>
            <a
              href="/locations/sambrial"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('locations', 'sambrial');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sambrial
            </a>
            <span>·</span>
            <a
              href="/portfolio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('portfolio');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Portfolio
            </a>
            <span>·</span>
            <a
              href="/locations"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('locations');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Locations
            </a>
            <span>·</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </a>
            <span>·</span>
            {onOpenPolicy && (
              <>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenPolicy('disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Disclaimer
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Refund &amp; RMA
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenPolicy('mobile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Google Play Policy
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenPolicy('matrix')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Data Safety Matrix
                </button>
                <span>·</span>
              </>
            )}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Official XML Sitemap"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <span>·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-white text-slate-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Protected Admin Security Console"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Console</span>
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
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
