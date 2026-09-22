import React from 'react';
import { COMPANY_INFO } from '../data/content';
import {
  Globe,
  DollarSign,
  Zap,
  Home,
  ShieldCheck,
  Check,
  X,
  Award,
  Sparkles,
  Clock,
  Wrench,
  ThumbsUp
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Globe className="w-6 h-6 text-red-600" />,
      title: '20+ Years International Expertise',
      description: 'Senior technology architects with two decades of experience designing software and IT infrastructure for multinational enterprises in Dubai and the GCC.',
      badge: 'Dubai Proven',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: 'Transparent Localized Pricing',
      description: 'World-class tech delivered at competitive Pakistani Rupee rates. Fixed milestones, itemized quotes, zero hidden charges.',
      badge: 'Zero Surprises',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      title: 'Agile & Rapid Turnaround',
      description: 'Fast deployment cycles, 24-48 hour diagnostic turnarounds for laptop repairs, and real-time WhatsApp project progress updates.',
      badge: 'Fast Delivery',
    },
    {
      icon: <Home className="w-6 h-6 text-blue-600" />,
      title: 'Doorstep On-Site IT in Sialkot',
      description: 'Physical field support across all major commercial zones in Sialkot including Paris Road, Defense Road, Sambrial, and Daska.',
      badge: 'At Your Door',
    },
  ];

  const comparisons = [
    {
      feature: 'Engineering Standards',
      evonix: 'Dubai (UAE) corporate enterprise standard',
      others: 'Unverified ad-hoc freelance methods',
    },
    {
      feature: 'Hardware Repair Components',
      evonix: '100% genuine OEM chips, screens & parts',
      others: 'Cheap duplicate or refurbished pulls',
    },
    {
      feature: 'Post-Delivery Warranty',
      evonix: 'Written warranty & dedicated SLA support',
      others: 'No written guarantee after delivery',
    },
    {
      feature: 'Code Ownership & Freedom',
      evonix: '100% full source code ownership delivered',
      others: 'Proprietary lock-ins & recurring hostage fees',
    },
    {
      feature: 'Sialkot Doorstep Support',
      evonix: 'On-site factory, clinic & office visits',
      others: 'Must bring hardware to far-off shops',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            The EVONIX Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Leading Businesses Choose Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We bridge the gap between overseas quality standards and accessible local customer service right here in Sialkot.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Side-by-Side Comparison Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xs">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              EVONIX vs. Conventional Local IT Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear accountability and transparent deliverables
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Evaluation Criteria</th>
                  <th className="py-3 px-3 text-red-600 font-bold bg-red-50/50 rounded-t-lg">EVONIX Standard</th>
                  <th className="py-3 px-3 text-slate-400">Typical Local Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisons.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {row.feature}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 bg-red-50/30">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{row.evonix}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
