import React from 'react';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NavPageId } from '../types';

interface FooterProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm">
                EX
              </div>
              <span className="font-extrabold text-base tracking-tight">{COMPANY_INFO.name}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {COMPANY_INFO.legalName} is Sialkot's certified engineering hub for IT consultancy, enterprise web development, and chip-level motherboard diagnostics with 20+ years Dubai international experience.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">
              Trade Tools Portfolio
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigatePage('invoice')} className="hover:text-red-400">Global Micro-Invoice</button></li>
              <li><button onClick={() => onNavigatePage('uk-eu-vat-calculator')} className="hover:text-red-400">UK &amp; EU VAT Reverse Charge</button></li>
              <li><button onClick={() => onNavigatePage('us-duty-nexus-estimator')} className="hover:text-red-400">US Duty &amp; Section 321</button></li>
              <li><button onClick={() => onNavigatePage('cbm-calculator')} className="hover:text-red-400">B2B CBM Cargo Engine</button></li>
              <li><button onClick={() => onNavigatePage('developer-cost-calculator')} className="hover:text-red-400">Developer Cost Calculator</button></li>
              <li><button onClick={() => onNavigatePage('tools')} className="text-red-400 font-bold hover:underline">All 12 Tools Hub &rarr;</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">
              Diagnostic Desk
            </span>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phoneRaw}`} className="hover:text-white">{COMPANY_INFO.contact.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-white">{COMPANY_INFO.contact.email}</a>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">
              International Standards
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Serving exporters and enterprises across Sialkot, the United Kingdom, Europe, the United States, and the UAE with zero server tracking and full client-side execution.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. Kolti Behram, Sialkot, Pakistan. All rights reserved.</span>
          <span>100% Client-Side Privacy Standard</span>
        </div>
      </div>
    </footer>
  );
};
