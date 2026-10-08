import React, { useState } from 'react';
import {
  Search,
  Globe,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Filter,
} from 'lucide-react';
import { SEO_KEYWORD_MAPPING_MATRIX, KeywordMapEntry } from '../data/keywordMapping';
import { NavPageId } from './Navbar';

interface KeywordMappingHubProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const KeywordMappingHub: React.FC<KeywordMappingHubProps> = ({ onNavigatePage }) => {
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intents = ['All', 'Local Intent', 'Commercial Investigation', 'Transactional', 'Informational', 'Brand Authority'];

  const filteredEntries = SEO_KEYWORD_MAPPING_MATRIX.filter((entry) => {
    const matchesIntent = selectedIntent === 'All' || entry.searchIntent === selectedIntent;
    const matchesQuery =
      searchQuery === '' ||
      entry.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.primaryTargetKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.secondaryKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIntent && matchesQuery;
  });

  return (
    <section className="py-12 bg-white border-t border-slate-200" id="keyword-mapping">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5 text-red-600" />
            <span>Dedicated Google Keyword Mapping Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Separated On-Page SEO & Distinct Search Intent
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Each page targets unique search queries with dedicated canonical tags and schema.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Intent Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {intents.map((intent) => {
              const isActive = selectedIntent === intent;
              return (
                <button
                  key={intent}
                  onClick={() => setSelectedIntent(intent)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {intent}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Filter by keyword or URL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or URL..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Keyword Mapping Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.pageId}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top Badge & URL */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                    {entry.canonicalUrl.replace('https://www.evonixtec.com', '') || '/ (Home)'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {entry.searchIntent}
                  </span>
                </div>

                {/* Page Title & Primary Target */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {entry.pageName}
                  </h3>
                  <div className="mt-1 text-xs">
                    <span className="text-slate-500 text-[11px]">Target Keyword: </span>
                    <strong className="text-slate-800 font-semibold">{entry.primaryTargetKeyword}</strong>
                  </div>
                </div>

                {/* Secondary Keywords Chips */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Secondary Keyword Cluster:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {entry.secondaryKeywords.slice(0, 4).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                    {entry.secondaryKeywords.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        +{entry.secondaryKeywords.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Schema Structure */}
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/70 flex items-center justify-between">
                  <span>Structured Schema:</span>
                  <span className="font-mono text-slate-700 font-semibold">{entry.schemaType}</span>
                </div>
              </div>

              {/* Action Button to Open Page */}
              <div className="pt-4 mt-3 border-t border-slate-200/70">
                <button
                  onClick={() => onNavigatePage(entry.pageId as NavPageId)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-between cursor-pointer group"
                >
                  <span>Open Optimized Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
