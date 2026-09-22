import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import {
  Layout,
  Cpu,
  Monitor,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-red-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-emerald-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-red-600" />;
    }
  };

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.id === activeTab);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            Full-Spectrum Technology Solutions
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Professional Services
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Delivering the rigor, precision, and standards developed over 20+ years of Dubai corporate engineering directly to your enterprise in Sialkot and abroad.
          </p>

          {/* Service Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Services ({SERVICES.length})
            </button>

            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === s.id
                    ? 'bg-red-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header icon and badges */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Dubai Standard
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  {service.summary}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Deliverables
                  </div>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Consultation</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Free Assessment
                  </span>
                </div>

                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Order / Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for on-site visits in Sialkot */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Need On-Site IT Support or Doorstep Pick-up in Sialkot?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Our technicians visit your factory, office, hospital, or retail store across Paris Road, Defense Road, Small Industrial Estate, and surrounding areas.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectServiceForQuote('Doorstep Sialkot On-Site IT Visit')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex-shrink-0 flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <span>Book On-Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
