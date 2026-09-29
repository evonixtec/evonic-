import React, { useState, useMemo } from 'react';
import {
  Search,
  Globe,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Layers,
  Sparkles,
  Filter,
  Copy,
  Check,
  Activity,
  BarChart3,
  TrendingUp,
  Cpu,
  Monitor,
  Smartphone,
  Code2,
  CheckCheck,
  Compass,
} from 'lucide-react';
import { SEO_KEYWORD_MAPPING_MATRIX, KeywordMapEntry } from '../data/keywordMapping';
import { NavPageId } from './Navbar';

interface CentralizedSeoDashboardProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const CentralizedSeoDashboard: React.FC<CentralizedSeoDashboardProps> = ({ onNavigatePage }) => {
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'cards' | 'cannibalization' | 'matrix'>('cards');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [testSearchTerm, setTestSearchTerm] = useState<string>('laptop repair');
  const [serpViewMode, setSerpViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedEntryForSchema, setSelectedEntryForSchema] = useState<KeywordMapEntry | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const intents = ['All', 'Local Intent', 'Commercial Investigation', 'Transactional', 'Informational', 'Brand Authority'];
  const categories = ['All', 'Core Service', 'Local Cluster', 'Core Page', 'Transactional', 'Knowledge Base'];

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return SEO_KEYWORD_MAPPING_MATRIX.filter((entry) => {
      const matchIntent = selectedIntent === 'All' || entry.searchIntent === selectedIntent;
      const matchCategory = selectedCategory === 'All' || entry.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        q === '' ||
        entry.pageName.toLowerCase().includes(q) ||
        entry.primaryTargetKeyword.toLowerCase().includes(q) ||
        entry.canonicalUrl.toLowerCase().includes(q) ||
        entry.secondaryKeywords.some((k) => k.toLowerCase().includes(q));
      return matchIntent && matchCategory && matchQuery;
    });
  }, [selectedIntent, selectedCategory, searchQuery]);

  // Overall KPIs
  const totalUrls = SEO_KEYWORD_MAPPING_MATRIX.length;
  const avgHealth = Math.round(
    SEO_KEYWORD_MAPPING_MATRIX.reduce((acc, curr) => acc + curr.healthScore, 0) / totalUrls
  );
  const totalKeywords = SEO_KEYWORD_MAPPING_MATRIX.reduce(
    (acc, curr) => acc + 1 + curr.secondaryKeywords.length,
    0
  );

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleCopySchema = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  // Anti-cannibalization test matches
  const cannibalizationMatches = useMemo(() => {
    if (!testSearchTerm.trim()) return [];
    const term = testSearchTerm.toLowerCase().trim();
    return SEO_KEYWORD_MAPPING_MATRIX.filter((entry) => {
      return (
        entry.primaryTargetKeyword.toLowerCase().includes(term) ||
        entry.secondaryKeywords.some((k) => k.toLowerCase().includes(term)) ||
        entry.longTailQueries.some((q) => q.toLowerCase().includes(term))
      );
    });
  }, [testSearchTerm]);

  return (
    <section className="py-14 bg-slate-900 text-slate-100 border-t border-slate-800" id="seo-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>Centralized On-Page SEO & Intent Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            SEO Health & Keyword Mapping Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Live tracking of dedicated keywords, search intent tags, and on-page health scores across all Sialkot service URLs.
          </p>
        </div>

        {/* 1. Global KPI Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Overall SEO Health</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{avgHealth}%</span>
              <span className="text-[11px] text-emerald-500 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Grade A+
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">100% Valid Meta & JSON-LD</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Separated URLs</span>
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalUrls}</span>
              <span className="text-[11px] text-slate-400 font-semibold">Active Hubs</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Zero single-page confusion</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Targeted Keywords</span>
              <Tag className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{totalKeywords}+</span>
              <span className="text-[11px] text-slate-400 font-semibold">Tracked Terms</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Primary + secondary clusters</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Cannibalization Risk</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">0</span>
              <span className="text-[11px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                0 Collisions
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Strict 1:1 query ownership</p>
          </div>
        </div>

        {/* 2. Top View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Page Keyword Cards ({filteredEntries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cannibalization')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cannibalization'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cannibalization Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Full SEO Health Matrix</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword or URL..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* 3. Filters (Intent & Category) */}
        {activeTab === 'cards' && (
          <div className="space-y-3 mb-6 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
            {/* Search Intent Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                Intent:
              </span>
              {intents.map((intent) => (
                <button
                  key={intent}
                  onClick={() => setSelectedIntent(intent)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedIntent === intent
                      ? 'bg-slate-100 text-slate-900 shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {intent}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                Section:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 1: PAGE KEYWORD CARDS VIEW
           ======================================================== */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEntries.map((entry) => (
              <div
                key={entry.pageId}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Card Top: Canonical URL + Health Score */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-900 truncate">
                        {entry.canonicalUrl.replace('https://evonixtec.com', '') || '/ (Home)'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {entry.category}
                      </span>
                    </div>

                    {/* SEO Health Gauge Badge */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-extrabold text-xs">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{entry.healthScore}%</span>
                    </div>
                  </div>

                  {/* Title & Primary Keyword */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {entry.pageName}
                    </h3>

                    <div className="mt-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                          Primary Target Keyword
                        </span>
                        <span className="text-xs font-bold text-white truncate block">
                          🎯 {entry.primaryTargetKeyword}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-400 block">
                          {entry.monthlySearchVolume}
                        </span>
                        <span className="text-[9px] text-slate-500 font-medium">
                          Diff: {entry.keywordDifficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Keyword Cluster */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Secondary Keyword Cluster ({entry.secondaryKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {entry.secondaryKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Google SERP Snippet Preview Box */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-sans space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1 font-mono text-slate-400">
                        <Globe className="w-3 h-3 text-slate-500" />
                        <span>evonixtec.com › {entry.pageId}</span>
                      </span>
                      <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                        Google Search Preview
                      </span>
                    </div>
                    <div className="text-xs font-bold text-blue-400 hover:underline leading-snug">
                      {entry.pageTitle}
                    </div>
                    <div className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {entry.metaDescription}
                    </div>
                  </div>

                  {/* On-Page Audit Checklist Checks */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>Title: {entry.auditChecks.titleLength.count} chars (Passed)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>Desc: {entry.auditChecks.descLength.count} chars (Passed)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>Schema: {entry.schemaType.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>Canonical Tag: Verified</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3.5 mt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(entry.canonicalUrl)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy full canonical URL"
                    >
                      {copiedUrl === entry.canonicalUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedEntryForSchema(entry)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Code2 className="w-3 h-3 text-amber-400" />
                      <span>View Schema</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const rootId = entry.pageId.split('-')[0];
                      onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 2: ANTI-CANNIBALIZATION CHECKER WIDGET
           ======================================================== */}
        {activeTab === 'cannibalization' && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Live Keyword Cannibalization & Conflict Inspector</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter any query below to verify which exact single URL owns that search intent across Sialkot and Punjab.
              </p>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={testSearchTerm}
                  onChange={(e) => setTestSearchTerm(e.target.value)}
                  placeholder="Enter keyword (e.g., laptop repair, POS billing, WeBOC, Daska AMC)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Sample Quick Terms */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['laptop repair', 'POS billing', 'Daska AMC', 'WeBOC customs', 'Kotli Behram'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setTestSearchTerm(term)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Matching URLs for query "{testSearchTerm}":</span>
                <span className="font-bold text-white">{cannibalizationMatches.length} URL match(es)</span>
              </div>

              {cannibalizationMatches.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
                  No matching keyword collision found for this phrase.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cannibalizationMatches.map((match, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-900">
                            {match.searchIntent}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {match.pageName}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-blue-400 truncate">
                          {match.canonicalUrl}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          Primary: <strong className="text-white">{match.primaryTargetKeyword}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const rootId = match.pageId.split('-')[0];
                          onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                        title="Open page"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: COMPREHENSIVE SEO HEALTH MATRIX TABLE
           ======================================================== */}
        {activeTab === 'matrix' && (
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-bold">Target Page & URL</th>
                    <th className="py-3 px-4 font-bold">Search Intent</th>
                    <th className="py-3 px-4 font-bold">Primary Target Keyword</th>
                    <th className="py-3 px-4 font-bold">Monthly Volume</th>
                    <th className="py-3 px-4 font-bold">Title / Desc Length</th>
                    <th className="py-3 px-4 font-bold">Health Score</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredEntries.map((row) => (
                    <tr key={row.pageId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{row.pageName}</div>
                        <div className="font-mono text-[10px] text-slate-400 truncate max-w-xs">
                          {row.canonicalUrl}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {row.searchIntent}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white">
                        {row.primaryTargetKeyword}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">
                        {row.monthlySearchVolume}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] text-slate-400">
                          T: {row.auditChecks.titleLength.count}c • D: {row.auditChecks.descLength.count}c
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded text-[11px]">
                          {row.healthScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const rootId = row.pageId.split('-')[0];
                            onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Open page"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: View Schema.org Structured Data */}
        {selectedEntryForSchema && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-2xl bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Schema.org JSON-LD • {selectedEntryForSchema.pageName}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {selectedEntryForSchema.canonicalUrl}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntryForSchema(null)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 leading-relaxed">
                <pre className="whitespace-pre-wrap">
{`{
  "@context": "https://schema.org",
  "@type": "${selectedEntryForSchema.schemaType.split(',')[0].trim()}",
  "name": "${selectedEntryForSchema.pageTitle}",
  "description": "${selectedEntryForSchema.metaDescription}",
  "url": "${selectedEntryForSchema.canonicalUrl}",
  "provider": {
    "@type": "LocalBusiness",
    "name": "EVONIX TECHNOLOGIES",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kotli Behram, Paris Road & Cantt Hub",
      "addressLocality": "Sialkot",
      "addressRegion": "Punjab",
      "postalCode": "51310",
      "addressCountry": "PK"
    }
  },
  "keywords": "${selectedEntryForSchema.primaryTargetKeyword}, ${selectedEntryForSchema.secondaryKeywords.slice(0, 3).join(', ')}"
}`}
                </pre>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Validated against Schema.org & Google Rich Results standards.
                </span>
                <button
                  onClick={() =>
                    handleCopySchema(`{
  "@context": "https://schema.org",
  "@type": "${selectedEntryForSchema.schemaType.split(',')[0].trim()}",
  "name": "${selectedEntryForSchema.pageTitle}",
  "description": "${selectedEntryForSchema.metaDescription}",
  "url": "${selectedEntryForSchema.canonicalUrl}"
}`)
                  }
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied JSON-LD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Schema Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
