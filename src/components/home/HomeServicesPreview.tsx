import React from 'react';
import { SERVICES, COMPANY_INFO } from '../../data/content';
import { OptimizedImage } from '../common/OptimizedImage';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Globe,
  BrainCircuit,
  Server,
  Code2
} from 'lucide-react';

interface HomeServicesPreviewProps {
  onNavigateToServices: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const HomeServicesPreview: React.FC<HomeServicesPreviewProps> = ({
  onNavigateToServices,
  onOpenQuote,
}) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    'web-development': <Globe className="w-5 h-5 text-red-600" />,
    'software-pos': <Cpu className="w-5 h-5 text-blue-600" />,
    'ai-automation': <BrainCircuit className="w-5 h-5 text-purple-600" />,
    'cloud-architecture': <Server className="w-5 h-5 text-emerald-600" />,
  };

  return (
    <section id="our-services-section" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-left">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Enterprise Software Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1E1E] tracking-tight text-left">
              High-End B2B Software Engineering
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
              International 20-year Dubai engineering standards applied to enterprise software development, modern web architectures, AI automation, and scalable cloud systems.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Single Primary Action */}
            <button
              onClick={() => onOpenQuote('Enterprise Software Consultancy')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 hover:shadow-red-600/40 transition-all cursor-pointer"
            >
              <span>Request Enterprise Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToServices}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <span>All Services</span>
            </button>
          </div>
        </div>

        {/* 4 Main Core B2B Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[28px] border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-red-300 transition-all group text-left"
            >
              <div className="space-y-4 text-left">
                {service.imageUrl && (
                  <div className="rounded-xl overflow-hidden h-40 w-full border border-slate-100 relative bg-slate-100">
                    <OptimizedImage
                      src={service.imageUrl}
                      webpSrc={service.imageWebp}
                      alt={service.imageAlt || service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[10px] font-black text-[#1E1E1E] border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                      {serviceIcons[service.id] || <Code2 className="w-3.5 h-3.5 text-red-600" />}
                      <span>Service {service.number}</span>
                    </div>
                  </div>
                )}

                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1E1E1E] group-hover:text-red-600 transition-colors line-clamp-2 text-left">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-[1.55] text-left">
                    {service.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold text-left">
                    Key Deliverables
                  </div>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 text-left">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single Primary Action + Secondary Specs Link */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  Consultation
                </button>
                <button
                  onClick={onNavigateToServices}
                  className="text-xs font-semibold text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Technical Infrastructure & Architecture Matrix */}
        <div className="bg-white rounded-[36px] sm:rounded-[44px] border border-slate-200 p-6 sm:p-10 shadow-sm text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-100 text-left">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enterprise SLA &amp; Quality Engineering</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1E1E1E] tracking-tight text-left">
                Production-Grade Engineering Matrix
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-[1.55] text-left">
                Every software platform is architected for high volume, sub-second latency, and zero downtime.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dubai &amp; Global Standards Verified</span>
            </div>
          </div>

          {/* 4 Feature Pillars (Nested Radius Formula: Outer = Inner + Padding -> 12px + 16px = 28px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1E1E1E] text-sm text-left">Full-Stack Web &amp; Mobile</h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Next.js 15, React Native, and TypeScript. Built for sub-second page loads, mobile responsiveness, and top Core Web Vitals.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1E1E1E] text-sm text-left">Custom Enterprise ERP &amp; POS</h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Offline-first multi-branch transaction engines, barcode inventory workflows, and digital accounting integrations.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1E1E1E] text-sm text-left">AI Agents &amp; Automation</h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Autonomous LLM ingestion pipelines, enterprise RAG search, and automated operational customer routing with zero data leakage.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1E1E1E] text-sm text-left">Cloud Scale &amp; 99.9% Uptime</h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Multi-region AWS/GCP architecture, containerized microservices, automated CI/CD pipelines, and 24/7 incident monitoring.
              </p>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="text-xs text-slate-600 space-y-0.5 text-left">
              <p className="font-bold text-[#1E1E1E] text-left">Ready to build or modernize your enterprise software?</p>
              <p className="text-left leading-[1.55]">Discuss your project roadmap with our senior Dubai-trained engineering team.</p>
            </div>
            {/* Single Primary Red Action */}
            <button
              onClick={() => onOpenQuote('Enterprise Software Consultation')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/25 transition-all cursor-pointer"
            >
              Schedule Technical Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeServicesPreview;
