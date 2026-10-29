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
      description: 'Senior technology architects with two decades of experience designing enterprise software and cloud infrastructure for multinational firms in Dubai and GCC corridors.',
      badge: 'Dubai Proven',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: 'Milestone-Based Transparent Pricing',
      description: 'Fixed milestone pricing with itemized deliverables, written contracts, and clear sprint commitments. Zero unexpected licensing or hidden surcharges.',
      badge: 'Zero Surprises',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      title: 'Sub-Second High Throughput',
      description: 'Engineered for extreme performance with sub-second database query execution, Redis caching layers, and high-frequency transaction capacity.',
      badge: 'High Speed',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: '99.9% Production SLA Support',
      description: 'Continuous production uptime monitoring, automated failover architecture, and direct senior architect escalation for mission-critical operations.',
      badge: 'Enterprise SLA',
    },
  ];

  const comparisons = [
    {
      feature: 'Engineering Standards',
      evonix: 'Dubai (UAE) corporate enterprise software standard',
      others: 'Unverified ad-hoc freelance scripts',
    },
    {
      feature: 'Architecture & Scalability',
      evonix: 'Bespoke microservices, Next.js & multi-tenant cloud',
      others: 'Rigid bloated templates & vendor lock-in',
    },
    {
      feature: 'Production SLA & Support',
      evonix: 'Written 99.9% uptime SLA & dedicated senior architects',
      others: 'No written guarantee after launch',
    },
    {
      feature: 'Code Ownership & IP',
      evonix: '100% full source code and intellectual property ownership',
      others: 'Proprietary lock-ins & recurring hostage fees',
    },
    {
      feature: 'Sialkot Industrial Integration',
      evonix: 'Native offline LAN sync, WeBOC customs & factory barcode logs',
      others: 'Generic commercial software packages',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            The evonix Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
            Why Leading Businesses Choose Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
            We bridge the gap between overseas quality standards and accessible local customer service right here in Sialkot.
          </p>
        </div>

        {/* 4 Pillars Grid - Outer radius 24px, inner icon 16px with p-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-[24px] p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-[16px] bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[8px] bg-white text-slate-700 border border-slate-200">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1E1E1E]">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-[1.55] text-left">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Side-by-Side Comparison Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xs">
          <div className="text-left mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
              evonix vs. Conventional Local IT Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-[1.55] text-left">
              Clear accountability and transparent deliverables
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Evaluation Criteria</th>
                  <th className="py-3 px-3 text-red-600 font-bold bg-red-50/50 rounded-t-lg">evonix Standard</th>
                  <th className="py-3 px-3 text-slate-400">Typical Local Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisons.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {row.feature}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#1E1E1E] bg-red-50/30">
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
