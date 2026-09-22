import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/content';
import { ShieldAlert, Globe, MonitorCheck, ExternalLink, Lock, CheckCircle2, Building, ShoppingBag, Utensils, Smartphone, Calendar, FileText } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface PortfolioProps {
  onRequestPrivateMeeting: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onRequestPrivateMeeting }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'software'>('all');

  const getIndustryIcon = (industry: string) => {
    if (industry.includes('Retail') || industry.includes('Supermarket')) {
      return <ShoppingBag className="w-4 h-4 text-cyan-400" />;
    }
    if (industry.includes('Estate') || industry.includes('Trading') || industry.includes('Corporate')) {
      return <Building className="w-4 h-4 text-blue-400" />;
    }
    if (industry.includes('Restaurant') || industry.includes('Dining')) {
      return <Utensils className="w-4 h-4 text-amber-400" />;
    }
    if (industry.includes('Mobile') || industry.includes('Electronics')) {
      return <Smartphone className="w-4 h-4 text-emerald-400" />;
    }
    return <Globe className="w-4 h-4 text-cyan-400" />;
  };

  const allItems = [
    ...PORTFOLIO_DATA.websiteClients,
    ...PORTFOLIO_DATA.softwareClients,
  ];

  const displayedItems = activeFilter === 'all'
    ? allItems
    : allItems.filter((item) => item.type === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <Globe className="w-3.5 h-3.5" />
              15+ Years UAE Enterprise Track Record
            </div>
            {/* Exact Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              OUR PORTFOLIO - OUR VALUABLE CLIENTS IN DUBAI & UAE
            </h2>
            {/* Exact Intro Line */}
            <p className="text-slate-300 text-sm sm:text-base font-medium">
              {PORTFOLIO_DATA.intro}
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Clients ({allItems.length})
              </button>
              <button
                onClick={() => setActiveFilter('website')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'website'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                A. Website Development Clients (Dubai)
              </button>
              <button
                onClick={() => setActiveFilter('software')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'software'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <MonitorCheck className="w-3.5 h-3.5" />
                B. Software Development Clients
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* NDA Compliance Notice Card - Prominent and Exact */}
        <FadeInSection direction="up" delay={100} duration={650}>
          <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-amber-300">
                    Client Confidentiality & NDA Compliance
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800/50 rounded">
                    Legal NDA Protected
                  </span>
                </div>
                {/* Exact Note Text */}
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  <strong>Note:</strong> {PORTFOLIO_DATA.ndaNote}
                </p>
              </div>
            </div>

            <button
              onClick={onRequestPrivateMeeting}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Request Private Meeting / Demo
            </button>
          </div>
        </FadeInSection>

        {/* Group A and Group B Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, index) => (
            <FadeInSection
              key={item.id}
              direction="up"
              delay={(index % 3) * 100}
              duration={650}
              className="flex"
            >
              <div
                id={`portfolio-item-${item.id}`}
                className="w-full rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all p-6 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  {/* Header Category and Dubai tag */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold">
                      {getIndustryIcon(item.industry)}
                      {item.industry}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Dubai, UAE
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* UAE Milestone / Architecture Highlight */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 mb-4">
                    <span className="text-amber-400 font-semibold">Dubai Track Record: </span>
                    {item.dubaiHighlight}
                  </div>

                  {/* Deliverables Bullet Points */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Core Modules Implemented:
                    </span>
                    {item.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tags and Private Demo trigger */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onRequestPrivateMeeting}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    View Case Study in Private Meeting
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Private Meeting Callout Banner */}
        <FadeInSection direction="up" delay={150} duration={650}>
          <div className="mt-12 text-center p-8 rounded-2xl bg-slate-950/70 border border-slate-800 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-2">
              Are you a Sialkot Exporter, Shop Owner, or Restaurant Manager?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
              We can demonstrate live, interactive walkthroughs of our Dubai retail POS systems, inventory architectures, and high-conversion e-commerce platforms during a 1-on-1 private consultation in Sialkot or via screen share.
            </p>
            <button
              onClick={onRequestPrivateMeeting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Schedule Free Consultation in Sialkot
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
