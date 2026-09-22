import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import { Layout, Cpu, Monitor, Wrench, CheckCircle2, ArrowRight, Sparkles, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.id === activeTab);

  return (
    <section id="services" className="py-24 relative bg-slate-950/70 border-t border-slate-900">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              Full-Spectrum Technology Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From responsive high-speed web development and POS retail software to precision laptop repairing and doorstep on-site visits across Sialkot.
            </p>

            {/* Service Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All 4 Core Services
              </button>
              {SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === srv.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {srv.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Services Cards Grid with High-Quality Professional Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredServices.map((service, index) => (
            <FadeInSection
              key={service.id}
              direction="up"
              delay={index * 120}
              duration={650}
              className="flex"
            >
              <div
                id={`service-card-${service.id}`}
                className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-500 p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative group overflow-hidden"
              >
                {/* Visual Top Image Showcase with Overlay Badge */}
                {service.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-6 border border-slate-800 group-hover:border-cyan-500/30 transition-colors shadow-lg">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                    {/* Top Floating Tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-950/90 text-cyan-300 border border-cyan-800/60 backdrop-blur-sm">
                        SERVICE {service.number}
                      </span>

                      {service.id === 'onsite-service' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/90 text-amber-300 border border-amber-800/70 backdrop-blur-sm shadow-sm">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          Sialkot Doorstep
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950/90 text-slate-300 border border-slate-700/80 backdrop-blur-sm shadow-sm">
                          <Globe className="w-3 h-3 text-cyan-400" />
                          Dubai Standard
                        </span>
                      )}
                    </div>

                    {/* Bottom Floating Service Category */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 text-white backdrop-blur-md">
                        {getIcon(service.iconName)}
                      </div>
                      <span className="text-xs font-semibold text-white bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
                        {service.deliverables[0]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Area */}
                <div>
                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {service.summary}
                  </p>

                  {/* Detailed Key Features List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Highlights & Inclusions:
                    </span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dubai Experience Heritage Note */}
                  {service.dubaiExperienceNote && (
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 mb-6 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-cyan-400 font-semibold">Dubai Standard: </span>
                        {service.dubaiExperienceNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA & Deliverable Chips */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`quote-btn-${service.id}`}
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <span>
                      {service.id === 'onsite-service' ? 'Book Home Service' : 'Get a Free Quote'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Home & Office On-Site Service Banner */}
        <FadeInSection direction="up" delay={150} duration={650}>
          <div className="mt-14 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/70 border border-cyan-800/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/25 flex-shrink-0 shadow-inner">
                <Wrench className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 text-[11px] font-bold mb-1.5">
                  <MapPin className="w-3 h-3" />
                  Sialkot City Doorstep Coverage
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Need Fast Computer or Laptop Repair at Your Doorstep?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  No need to carry your heavy system to a market. Our mobile certified engineer arrives directly at your home, shop, or corporate office in Sialkot.
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectServiceForQuote('On-Site Home & Office Service')}
              className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all flex-shrink-0 cursor-pointer text-center"
            >
              Book Sialkot Doorstep Visit
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
