import React from 'react';
import { SERVICES } from '../../data/content';
import { OptimizedImage } from '../common/OptimizedImage';
import {
  ArrowRight,
  Check,
  Cpu,
  Globe,
  BrainCircuit,
  Server,
  WifiOff,
  HardDrive,
} from 'lucide-react';

interface HomeServicesPreviewProps {
  onNavigateToServices: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

const BUSINESS_CATEGORIES_SUMMARY = [
  'Retail & Single-Counter Shops',
  'Multi-Branch Retail Chains',
  'E-Commerce & Omnichannel Sellers',
  'Restaurants, Cafés & Takeaways',
  'Wholesale & Distribution',
  'Manufacturing & Export Units',
  'Clinics, Salons & Services',
  'Enterprise & High-Volume Ops',
];

const TECHNICAL_SERVICES_SUMMARY = [
  'Custom Offline Software',
  'Corporate & Business Websites',
  'E-Commerce Stores',
  'Mobile Applications',
  'Legacy Data Migration',
  'Tax & FBR Integration Setup',
  'POS & Retail Hardware',
];

export const HomeServicesPreview: React.FC<HomeServicesPreviewProps> = ({
  onNavigateToServices,
  onOpenQuote,
}) => {
  return (
    <section id="our-services-section" className="py-20 md:py-24 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-semibold text-[#C81E1E]">
              02 · Core Engineering Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Offline-first software &amp; enterprise engineering
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Desktop and local-network systems powered by Evonix Hisaab Pro—running 100% offline with local backups, full data privacy, and zero internet dependency.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onOpenQuote('Enterprise Software Consultancy')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToServices}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-800 font-semibold text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>All Services</span>
            </button>
          </div>
        </div>

        {/* 4 Core B2B Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-[#E5E7EB] p-5 flex flex-col justify-between hover:border-slate-300 transition-colors group text-left"
            >
              <div className="space-y-4">
                {service.imageUrl && (
                  <div className="rounded-lg overflow-hidden h-40 w-full border border-[#E5E7EB] bg-[#FAFAF9]">
                    <OptimizedImage
                      src={service.imageUrl}
                      webpSrc={service.imageWebp}
                      alt={service.imageAlt || service.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    {service.number}.
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#C81E1E] transition-colors mt-1 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Deliverables
                  </div>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#C81E1E] flex-shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] cursor-pointer"
                >
                  Request Scope
                </button>
                <button
                  onClick={onNavigateToServices}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Concise Summary of Business Solutions & Implementation Catalog */}
        <div className="bg-[#FAFAF9] rounded-xl border border-[#E5E7EB] p-6 sm:p-8 mb-10 text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#C81E1E]">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>100% Offline &amp; On-Premise</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>Local Backups &amp; Full Data Privacy</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Evonix Hisaab Pro · Business &amp; Implementation Matrix
              </h3>
            </div>

            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToServices();
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C81E1E] hover:text-[#A6171E] whitespace-nowrap"
            >
              <span>View Complete Services Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solutions by Business Type Summary */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Solutions by Business Type (8 Industry Tracks)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUSINESS_CATEGORIES_SUMMARY.map((label, idx) => (
                  <div
                    key={label}
                    className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-slate-700"
                  >
                    <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span className="font-medium text-slate-800 truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical & Implementation Services Summary */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Technical &amp; Implementation Services (7 Deployments)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TECHNICAL_SERVICES_SUMMARY.map((label, idx) => (
                  <div
                    key={label}
                    className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-slate-700"
                  >
                    <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span className="font-medium text-slate-800 truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clean 4-Column Engineering Matrix */}
        <div className="bg-[#FAFAF9] rounded-xl border border-[#E5E7EB] p-6 sm:p-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 pb-5 border-b border-[#E5E7EB]">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Production Engineering Standards
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Architected for high transaction throughput, sub-second queries, and zero unplanned downtime.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-600">
              Dubai &amp; Global SLA Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Globe className="w-5 h-5 text-[#C81E1E]" />
              <h4 className="font-semibold text-slate-900 text-sm">Full-Stack Web &amp; Mobile</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Next.js, React Native, and TypeScript tuned for fast initial loads and clean Core Web Vitals.
              </p>
            </div>

            <div className="space-y-2">
              <Cpu className="w-5 h-5 text-[#C81E1E]" />
              <h4 className="font-semibold text-slate-900 text-sm">B2B Inventory &amp; POS Integration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                B2B inventory and POS integration Dubai &amp; Sharjah with UAE corporate tax &amp; e-invoicing ready ERP solutions.
              </p>
            </div>

            <div className="space-y-2">
              <BrainCircuit className="w-5 h-5 text-[#C81E1E]" />
              <h4 className="font-semibold text-slate-900 text-sm">AI &amp; WhatsApp Automation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Custom AI workflow &amp; WhatsApp business automation UAE for quote routing and ERP search without data leakage.
              </p>
            </div>

            <div className="space-y-2">
              <Server className="w-5 h-5 text-[#C81E1E]" />
              <h4 className="font-semibold text-slate-900 text-sm">99.9% Cloud Uptime</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-region AWS and GCP setups, automated CI/CD, and continuous production monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesPreview;
