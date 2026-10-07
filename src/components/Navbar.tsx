import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  MessageSquare,
  ChevronDown,
  Wrench,
  Globe,
  MapPin,
  Bot
} from 'lucide-react';
import { NavPageId } from '../types';
import { COMPANY_INFO } from '../data/content';

interface NavbarProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [toolsDropdown, setToolsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white font-black flex items-center justify-center text-base shadow-md group-hover:scale-105 transition-transform">
              EX
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg block leading-none">
                EVONIX
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                Technologies · Sialkot
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentPage === 'services' ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services
            </button>

            {/* Tools Menu with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdown(true)}
              onMouseLeave={() => setToolsDropdown(false)}
            >
              <button
                onClick={() => onNavigate('tools')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  currentPage === 'tools' ||
                  currentPage === 'invoice' ||
                  currentPage === 'ecommerce-calculator' ||
                  currentPage === 'cbm-calculator' ||
                  currentPage === 'developer-cost-calculator' ||
                  currentPage === 'ai-visibility-checker' ||
                  currentPage === 'uk-eu-vat-calculator' ||
                  currentPage === 'us-duty-nexus-estimator'
                    ? 'text-red-600 bg-red-50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>Online Web Tools</span>
                <span className="text-[9px] bg-red-100 text-red-700 px-1 rounded-full font-black">12+</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {toolsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs animate-fadeIn space-y-1">
                  <div className="p-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                      Workstations &amp; Calculators
                    </span>
                    <button
                      onClick={() => onNavigate('tools')}
                      className="text-red-600 font-bold hover:underline text-[10px] cursor-pointer"
                    >
                      Browse All Hub &rarr;
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setToolsDropdown(false);
                      onNavigate('invoice');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-800">Global Micro-Invoice Generator</div>
                      <div className="text-[10px] text-slate-500">Free A4 PDF &amp; Code128 barcodes</div>
                    </div>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      Flagship
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setToolsDropdown(false);
                      onNavigate('uk-eu-vat-calculator');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-800">UK &amp; EU VAT Reverse Charge Engine</div>
                      <div className="text-[10px] text-slate-500">HMRC &amp; European 0% B2B compliance</div>
                    </div>
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                      UK/EU
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setToolsDropdown(false);
                      onNavigate('us-duty-nexus-estimator');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-800">US Duty &amp; Section 321 Calculator</div>
                      <div className="text-[10px] text-slate-500">$800 duty-free entry &amp; HTS codes</div>
                    </div>
                    <span className="text-[9px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">
                      USA
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setToolsDropdown(false);
                      onNavigate('cbm-calculator');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-800">B2B Industrial CBM Cargo Engine</div>
                      <div className="text-[10px] text-slate-500">Air &amp; 20ft/40ft container limits</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Location & Contact Direct CTA */}
          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Kolti Behram, Sialkot, Pakistan</span>
            </div>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
