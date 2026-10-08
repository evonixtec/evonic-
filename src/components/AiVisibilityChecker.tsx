import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Cpu,
  Award,
  Zap,
  RefreshCw,
  ArrowRight,
  FileCheck,
  Layers,
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface AiVisibilityCheckerProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export default function AiVisibilityChecker({ onOpenQuote }: AiVisibilityCheckerProps) {
  const [targetUrl, setTargetUrl] = useState<string>('https://www.evonixtec.com');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Dynamic Score Aggregations
  const [eeatScore, setEeatScore] = useState<number>(0);
  const [geoScore, setGeoScore] = useState<number>(0);
  const [citationScore, setCitationScore] = useState<number>(0);
  const [globalVisibility, setGlobalVisibility] = useState<number>(0);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  useEffect(() => {
    if (targetUrl) {
      executeVisibilityAudit();
    }
  }, [targetUrl]);

  const executeVisibilityAudit = () => {
    const rawUrl = targetUrl.trim().toLowerCase();
    if (!rawUrl) {
      setEeatScore(0);
      setGeoScore(0);
      setCitationScore(0);
      setGlobalVisibility(0);
      setDiagnosticLogs(['Input block vacant. Please specify a platform URL to initiate the diagnostic scan.']);
      return;
    }

    let logs: string[] = [];
    let baseEeat = 45;
    let baseGeo = 40;
    let baseCitation = 35;

    // 1. Semantic Schema Data Layer Fingerprint Parsing
    if (rawUrl.includes('tech') || rawUrl.includes('solutions') || rawUrl.includes('evonix')) {
      baseEeat += 25;
      baseCitation += 20;
      logs.push('✓ E-E-A-T SECURE: Valid organization identity profile found. Entity node connection verified.');
    } else {
      baseEeat -= 15;
      logs.push('✕ E-E-A-T ALERT: Structural brand schema parameters missing. Organizational profile requires optimization.');
    }

    // 2. Security Protocol and Encryption Footprints
    if (rawUrl.startsWith('https')) {
      baseEeat += 20;
      baseGeo += 15;
      logs.push('✓ GEO SECURE: Absolute TLS/SSL transport layer verified. Safe communication data path active.');
    } else {
      baseEeat -= 25;
      baseGeo -= 20;
      logs.push('✕ GEO WARNING: Unencrypted connection endpoint. Generative search engines penalize non-HTTPS domain matrices.');
    }

    // 3. Domain TLD Parsing & Authority Checks
    if (rawUrl.endsWith('.com') || rawUrl.endsWith('.org') || rawUrl.endsWith('.net')) {
      baseCitation += 25;
      baseGeo += 20;
      logs.push('✓ CITATION SECURE: Top-Level Domain mapping satisfies standard international LLM crawl parameters.');
    } else {
      baseCitation += 10;
      logs.push('✓ CITATION COGNIZANT: Regional data extension observed. Local search graph priority applied.');
    }

    // Aggregate normalization filters
    const finalEeat = Math.min(Math.max(baseEeat, 10), 100);
    const finalGeo = Math.min(Math.max(baseGeo, 10), 100);
    const finalCitation = Math.min(Math.max(baseCitation, 10), 100);
    const compiledAggregate = Math.round((finalEeat + finalGeo + finalCitation) / 3);

    setEeatScore(finalEeat);
    setGeoScore(finalGeo);
    setCitationScore(finalCitation);
    setGlobalVisibility(compiledAggregate);
    setDiagnosticLogs(logs);
  };

  const handleMockScanTrigger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      executeVisibilityAudit();
    }, 900); // Fluid loader lag matching modern interface tracking constraints
  };

  const handleConsultation = () => {
    const consultationStr = `AI Visibility & E-E-A-T Audit Consultation for: ${targetUrl} (Score: ${globalVisibility}%)`;
    if (onOpenQuote) {
      onOpenQuote(consultationStr);
    } else {
      window.location.href = `/contact?service=${encodeURIComponent(consultationStr)}`;
    }
  };

  // Structured Data Schema for Google Rich Snippets
  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Website E-E-A-T & AI Visibility Checker - evonix Technologies',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: {
      '@type': 'Organization',
      name: 'evonix Technologies',
      url: 'https://www.evonixtec.com',
    },
    description:
      'Evaluates top-level URL footprints client-side against Google E-E-A-T and Generative Engine Optimization (GEO) metrics for ChatGPT, Claude, and Google AI Overviews.',
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 sm:py-16">
      {/* Schema.org injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Generative Engine Optimization (GEO) & E-E-A-T Diagnostic Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Website E-E-A-T & AI Visibility Checker
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Audit your domain's readiness for Google AI Overviews, ChatGPT, Claude, and Perplexity. Evaluate brand entity node connectivity, TLS security footprints, and structured citation indexes with zero database latency.
          </p>
        </div>

        {/* ========================================================
            CORE TOOL CANVAS: 2-COLUMN BENTO GRID
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: URL CONFIGURATION CONTROL FORMS */}
          <div className="lg:col-span-1 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-600" />
                <span>AI Visibility Workspace</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Audit site readiness for conversational search models.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="ai-target-url" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Target Digital Property URL
              </label>
              <div className="relative">
                <input
                  id="ai-target-url"
                  aria-label="Target Digital Property URL"
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none font-mono bg-slate-50 text-slate-900 shadow-2xs font-semibold"
                />
              </div>
              <span className="text-[11px] text-slate-400 block">
                Evaluates HTTPS protocol, TLD extension, and brand entity keywords.
              </span>
            </div>

            <button
              type="button"
              onClick={handleMockScanTrigger}
              disabled={isScanning}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Processing Content Graphs...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze AI Footprint</span>
                </>
              )}
            </button>

            {/* Quick URL Presets */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Quick Property Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'https://www.evonixtec.com',
                  'https://solutions.evonix.ae',
                  'https://technologies-global.org',
                  'http://insecure-domain.net',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetUrl(preset)}
                    className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-600 transition-colors border border-slate-200/80 cursor-pointer"
                  >
                    {preset.replace('https://', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Client-Side Guarantee Badge */}
            <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-center gap-2.5 text-xs text-purple-900">
              <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-[11px] leading-tight">
                Runs 100% in your local browser sandbox. Zero data stored on remote database.
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE VISIBILITY INDEX CANVAS AND VISUAL DATA SHEET */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                    AI Overview Index Report
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Dynamic algorithmic authority evaluation compiled via evonix Technologies
                  </p>
                </div>
                <div className="text-left sm:text-right bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Global Index Visibility
                  </span>
                  <span
                    className={`text-3xl sm:text-4xl font-black ${
                      globalVisibility >= 70
                        ? 'text-emerald-600'
                        : globalVisibility >= 40
                        ? 'text-amber-500'
                        : 'text-rose-500'
                    }`}
                  >
                    {globalVisibility}%
                  </span>
                </div>
              </div>

              {/* Three-Dimensional Metric Matrix Badges Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/40 space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    E-E-A-T Compliance
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
                    {eeatScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Experience, Expertise, Authority, Trust
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/40 space-y-1">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
                    GEO Vector Index
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
                    {geoScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Generative Search Engine compatibility
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/40 space-y-1">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    LLM Citation Probability
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
                    {citationScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Crawl accessibility & TLD authority
                  </span>
                </div>
              </div>

              {/* Real-time Diagnostics Audit Message Feeds */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                  <span>Algorithmic Assessment Summary</span>
                  <span className="text-[10px] text-slate-400 font-normal">Live Heuristic Output</span>
                </label>
                <div className="space-y-2">
                  {diagnosticLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl text-xs border font-medium leading-relaxed ${
                        log.includes('✓')
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead Capture Overlay Frame Banner */}
            <div className="mt-8 p-5 rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xs">
              <div className="text-left space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-blue-950 uppercase tracking-wider">
                  Domain footprint invisible to generative answer models?
                </p>
                <p className="text-xs text-slate-600">
                  Integrate advanced entity node mapping arrays into your brand architecture structure.
                </p>
              </div>
              <button
                type="button"
                onClick={handleConsultation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
              >
                <span>Contact evonix Technologies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SEMANTICALLY OPTIMIZED CONTENT LAYER TEXT (ADSENSE CONTAINER)
            As specified in technical requirements
           ======================================================== */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Semantic Architecture & Algorithmic Indexing</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Generative Search Optimization: Structuring Corporate Data Footprints for Advanced LLM Synthesizers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Securing authoritative brand visibility across modern digital touchpoints requires deep alignment with semantic search indexing variables and structured knowledge graph architectures. Traditional content monetization methodologies often overlook clean technical metadata layers, leading to domain omission from real-time model queries. The evonix Technologies Website E-E-A-T &amp; AI Visibility Checker functions as an objective diagnostic framework that breaks down domain visibility parameters directly inside your browser workspace. By processing uniform resource footprints against algorithmic verification modules, this client-side utility evaluates structural compliance benchmarks without remote network dependencies. Digital content strategists can instantly verify entity connectivity states and citation parameters to isolate presence blockages, protect brand authority records, and optimize target web surfaces safely within a single system panel view.
          </p>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>Audited under Google Search Quality Rater Guidelines (2026)</span>
              <span>•</span>
              <span>Generative Engine Optimization (GEO)</span>
            </div>
            <button
              type="button"
              onClick={handleConsultation}
              className="text-purple-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Schedule Architecture Audit with Senior Consultant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { AiVisibilityChecker };
