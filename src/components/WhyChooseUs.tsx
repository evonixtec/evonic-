import React from 'react';
import {
  Globe,
  DollarSign,
  Zap,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Globe className="w-5 h-5 text-[#C81D25]" />,
      title: '20+ Years International Expertise',
      description: 'Senior technology architects with two decades of experience designing enterprise software and cloud infrastructure in Dubai and GCC corridors.',
      meta: 'Dubai Proven',
    },
    {
      icon: <DollarSign className="w-5 h-5 text-[#C81D25]" />,
      title: 'Milestone-Based Transparent Pricing',
      description: 'Fixed milestone pricing with itemized deliverables, written contracts, and clear sprint commitments. No hidden surcharges.',
      meta: 'Fixed Scope',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#C81D25]" />,
      title: 'Sub-Second High Throughput',
      description: 'Engineered for extreme performance with indexed database queries, Redis caching layers, and high-frequency transaction capacity.',
      meta: 'Low Latency',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C81D25]" />,
      title: '99.9% Production SLA Support',
      description: 'Continuous production uptime monitoring, automated failover architecture, and direct senior architect escalation for critical operations.',
      meta: 'Enterprise SLA',
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
      others: 'Rigid templates & vendor lock-in',
    },
    {
      feature: 'Production SLA & Support',
      evonix: 'Written 99.9% uptime SLA & senior architect access',
      others: 'No written guarantee after launch',
    },
    {
      feature: 'Code Ownership & IP',
      evonix: '100% full source code and intellectual property ownership',
      others: 'Proprietary lock-ins & recurring fees',
    },
    {
      feature: 'Sialkot Industrial Integration',
      evonix: 'Native offline LAN sync, WeBOC customs & factory barcode logs',
      others: 'Generic commercial software packages',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2.5 text-left">
          <p className="text-xs font-semibold text-[#C81D25]">
            06 · Engineering Accountability
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Why commercial teams choose evonix
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Overseas engineering standards paired with accessible on-site support in Sialkot.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-6 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {pillar.meta}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="text-left mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
              evonix vs. Conventional Vendors
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear accountability and transparent engineering deliverables
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs font-semibold">
                  <th className="py-3 px-3">Evaluation Criteria</th>
                  <th className="py-3 px-3 text-[#C81D25]">evonix Standard</th>
                  <th className="py-3 px-3 text-slate-500">Typical Local Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisons.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C81D25] flex-shrink-0" />
                        <span>{row.evonix}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-slate-400 flex-shrink-0" />
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
