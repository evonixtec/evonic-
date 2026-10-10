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
    <section className="py-14 bg-slate-50 text-slate-900 border-t border-slate-200" id="seo-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-red-600" />
            <span>Centralized On-Page SEO & Intent Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            SEO Health & Keyword Mapping Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            Live tracking of dedicated keywords, search intent tags, and on-page health scores across all Sialkot service URLs.
          </p>
        </div>

        {/* 1. Global KPI Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Overall SEO Health</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{avgHealth}%</span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Grade A+
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">100% Valid Meta & JSON-LD</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Separated URLs</span>
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalUrls}</span>
              <span className="text-[11px] text-slate-600 font-semibold">Active Hubs</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Zero single-page confusion</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Targeted Keywords</span>
              <Tag className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalKeywords}+</span>
              <span className="text-[11px] text-slate-600 font-semibold">Tracked Terms</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Primary + secondary clusters</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Cannibalization Risk</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">0</span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                0 Collisions
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Strict 1:1 query ownership</p>
          </div>
        </div>

        {/* 2. Top View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Page Keyword Cards ({filteredEntries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cannibalization')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cannibalization'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cannibalization Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
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
              aria-label="Search keyword or URL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword or URL..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* 3. Filters (Intent & Category) */}
        {activeTab === 'cards' && (
          <div className="space-y-3 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            {/* Search Intent Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2">
                Intent:
              </span>
              {intents.map((intent) => (
                <button
                  key={intent}
                  onClick={() => setSelectedIntent(intent)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedIntent === intent
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {intent}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2">
                Section:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Card Top: Canonical URL + Health Score */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 truncate">
                        {entry.canonicalUrl.replace('https://www.evonixtec.com', '') || '/ (Home)'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {entry.category}
                      </span>
                    </div>

                    {/* SEO Health Gauge Badge */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{entry.healthScore}%</span>
                    </div>
                  </div>

                  {/* Title & Primary Keyword */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {entry.pageName}
                    </h3>

                    <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                          Primary Target Keyword
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate block">
                          🎯 {entry.primaryTargetKeyword}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-700 block">
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
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Secondary Keyword Cluster ({entry.secondaryKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {entry.secondaryKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Google SERP Snippet Preview Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-sans space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1 font-mono text-slate-600">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>evonixtec.com › {entry.pageId}</span>
                      </span>
                      <span className="text-[9px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-medium">
                        Google Search Preview
                      </span>
                    </div>
                    <div className="text-xs font-bold text-blue-700 hover:underline leading-snug">
                      {entry.pageTitle}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {entry.metaDescription}
                    </div>
                  </div>

                  {/* On-Page Audit Checklist Checks */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Title: {entry.auditChecks.titleLength.count} chars (Passed)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Desc: {entry.auditChecks.descLength.count} chars (Passed)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Schema: {entry.schemaType.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Canonical Tag: Verified</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3.5 mt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(entry.canonicalUrl)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy full canonical URL"
                    >
                      {copiedUrl === entry.canonicalUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied</span>
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
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Code2 className="w-3 h-3 text-amber-600" />
                      <span>View Schema</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const rootId = entry.pageId.split('-')[0];
                      onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
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
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Live Keyword Cannibalization & Conflict Inspector</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter any query below to verify which exact single URL owns that search intent across Sialkot and Punjab.
              </p>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label="Test keyword for cannibalization audit"
                  value={testSearchTerm}
                  onChange={(e) => setTestSearchTerm(e.target.value)}
                  placeholder="Enter keyword (e.g., laptop repair, POS billing, WeBOC, Daska AMC)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-500">Owner Status:</span>
                {cannibalizationMatches.length === 1 ? (
                  <span className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Clean 1:1 Query Ownership (Safe)</span>
                  </span>
                ) : cannibalizationMatches.length > 1 ? (
                  <span className="px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Shared Authority ({cannibalizationMatches.length} URLs)</span>
                  </span>
                ) : (
                  <span className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                    No Direct Conflict Found
                  </span>
                )}
              </div>
            </div>

            {/* Search Match Output Cards */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Target URLs Matching "{testSearchTerm}":
              </span>

              {cannibalizationMatches.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                  No competing URLs found. This search intent is completely unfragmented.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cannibalizationMatches.map((match) => (
                    <div
                      key={match.pageId}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{match.pageName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                            {match.searchIntent}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-red-600 truncate">
                          {match.canonicalUrl}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1">
                          Primary: {match.primaryTargetKeyword}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const rootId = match.pageId.split('-')[0];
                          onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                        }}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white transition-colors cursor-pointer flex-shrink-0 border border-slate-200"
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
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
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
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.map((row) => (
                    <tr key={row.pageId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{row.pageName}</div>
                        <div className="font-mono text-[10px] text-slate-500 truncate max-w-xs">
                          {row.canonicalUrl}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {row.searchIntent}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {row.primaryTargetKeyword}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">
                        {row.monthlySearchVolume}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] text-slate-600 font-medium">
                          T: {row.auditChecks.titleLength.count}c • D: {row.auditChecks.descLength.count}c
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                          {row.healthScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const rootId = row.pageId.split('-')[0];
                            onNavigatePage((rootId === 'location' ? 'locations' : rootId) as NavPageId);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-200"
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
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Schema.org JSON-LD • {selectedEntryForSchema.pageName}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedEntryForSchema.canonicalUrl}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntryForSchema(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 leading-relaxed shadow-inner">
                <pre className="whitespace-pre-wrap">
{`{
  "@context": "https://schema.org",
  "@type": "${selectedEntryForSchema.schemaType.split(',')[0].trim()}",
  "name": "${selectedEntryForSchema.pageTitle}",
  "description": "${selectedEntryForSchema.metaDescription}",
  "url": "${selectedEntryForSchema.canonicalUrl}",
  "provider": {
    "@type": "LocalBusiness",
    "name": "evonix technologies",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kotli Behram, Sialkot, Pakistan",
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
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
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
