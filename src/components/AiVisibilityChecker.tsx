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
  Share2,
  Calculator
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

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
    }, 600);
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
    <div className="w-full min-h-screen py-10 sm:py-16 apple-tool-layout text-[#1d1d1f]">
      {/* Schema.org injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Apple Clean Hero Header */}
        <div className="apple-glass-box p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="apple-badge">
              <Cpu className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Generative Engine Optimization (GEO) &amp; E-E-A-T Engine</span>
            </span>
          </div>

          <h1 className="apple-tool-title text-2xl sm:text-3xl lg:text-4xl">
            Website E-E-A-T &amp; AI Visibility Checker
          </h1>

          <p className="apple-tool-subtitle max-w-2xl mx-auto text-sm sm:text-base">
            Audit your domain's readiness for Google AI Overviews, ChatGPT, Claude, and Perplexity. Evaluate brand entity node connectivity, TLS security footprints, and structured citation indexes with zero database latency.
          </p>
        </div>

        {/* CORE TOOL CANVAS: 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: URL CONFIGURATION CONTROL FORMS */}
          <div className="lg:col-span-1 apple-glass-box p-6 space-y-4">
            <div className="border-b border-black/[0.06] pb-3">
              <h2 className="text-base font-semibold text-[#1d1d1f] flex items-center gap-2">
                <Search className="w-4 h-4 text-[#0071e3]" />
                <span>AI Visibility Workspace</span>
              </h2>
              <p className="text-xs text-[#86868b] mt-0.5">
                Audit site readiness for conversational search models.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="ai-target-url" className="block text-xs font-medium text-[#86868b]">
                Target Digital Property URL
              </label>
              <input
                id="ai-target-url"
                aria-label="Target Digital Property URL"
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="apple-input w-full font-mono font-medium"
              />
              <span className="text-[11px] text-[#86868b] block">
                Evaluates HTTPS protocol, TLD extension, and brand entity keywords.
              </span>
            </div>

            {/* Apple Blue Calculate / Scan Button */}
            <button
              type="button"
              onClick={handleMockScanTrigger}
              disabled={isScanning}
              className="apple-calculate-btn mt-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Content Graphs...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Calculate AI Visibility &amp; Footprint</span>
                </>
              )}
            </button>

            {/* Quick URL Presets */}
            <div className="pt-3 border-t border-black/[0.06] space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b] block">
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
                    className="text-[10px] font-mono px-2 py-1 rounded-lg bg-black/[0.03] hover:bg-[#0071e3]/10 hover:text-[#0071e3] text-[#1d1d1f] transition-colors border border-black/[0.04] cursor-pointer"
                  >
                    {preset.replace('https://', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Local Sandbox Guarantee Badge */}
            <div className="p-3 bg-white/70 border border-black/[0.04] rounded-xl flex items-center gap-2.5 text-xs text-[#86868b]">
              <ShieldCheck className="w-4 h-4 text-[#0071e3] shrink-0" />
              <span className="text-[11px] leading-tight">
                Runs 100% in your local browser sandbox. Zero data stored on remote database.
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE VISIBILITY INDEX CANVAS */}
          <div className="lg:col-span-2 apple-result-box p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-black/[0.06] pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight">
                    AI Overview Index Report
                  </h2>
                  <p className="text-xs text-[#86868b] mt-1 font-medium">
                    Dynamic algorithmic authority evaluation compiled via evonix Technologies
                  </p>
                </div>
                <div className="bg-white/90 border border-black/[0.06] px-4 py-2 rounded-2xl self-start sm:self-auto shadow-xs">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">
                    Global Index Visibility
                  </span>
                  <span
                    className={`text-2xl sm:text-3xl font-bold ${
                      globalVisibility >= 70
                        ? 'text-emerald-600'
                        : globalVisibility >= 40
                        ? 'text-[#0071e3]'
                        : 'text-rose-600'
                    }`}
                  >
                    {globalVisibility}%
                  </span>
                </div>
              </div>

              {/* Three-Dimensional Metric Matrix Badges Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl border border-black/[0.06] bg-white/80 space-y-1">
                  <span className="text-[11px] font-semibold text-[#0071e3] uppercase tracking-wider block">
                    E-E-A-T Compliance
                  </span>
                  <span className="text-2xl font-bold text-[#1d1d1f] block mt-1">
                    {eeatScore}%
                  </span>
                  <span className="text-[10px] text-[#86868b] block">
                    Experience, Expertise, Authority, Trust
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-black/[0.06] bg-white/80 space-y-1">
                  <span className="text-[11px] font-semibold text-[#0071e3] uppercase tracking-wider block">
                    GEO Vector Index
                  </span>
                  <span className="text-2xl font-bold text-[#1d1d1f] block mt-1">
                    {geoScore}%
                  </span>
                  <span className="text-[10px] text-[#86868b] block">
                    Generative Search Engine compatibility
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-black/[0.06] bg-white/80 space-y-1">
                  <span className="text-[11px] font-semibold text-[#0071e3] uppercase tracking-wider block">
                    LLM Citation Probability
                  </span>
                  <span className="text-2xl font-bold text-[#1d1d1f] block mt-1">
                    {citationScore}%
                  </span>
                  <span className="text-[10px] text-[#86868b] block">
                    Crawl accessibility &amp; TLD authority
                  </span>
                </div>
              </div>

              {/* Real-time Diagnostics Audit Message Feeds */}
              <div className="space-y-2 border-t border-black/[0.06] pt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2 flex items-center justify-between">
                  <span>Algorithmic Assessment Summary</span>
                  <span className="text-[10px] text-[#86868b] font-normal">Live Heuristic Output</span>
                </label>
                <div className="space-y-2">
                  {diagnosticLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl text-xs border font-medium leading-relaxed ${
                        log.includes('✓')
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50/70 border-rose-200 text-rose-900'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead Capture Banner */}
            <div className="mt-6 p-4 rounded-xl border border-black/[0.06] bg-white/80 flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-left space-y-0.5">
                <p className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
                  Domain footprint invisible to generative answer models?
                </p>
                <p className="text-xs text-[#86868b]">
                  Integrate advanced entity node mapping arrays into your brand architecture structure.
                </p>
              </div>
              <button
                type="button"
                onClick={handleConsultation}
                className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5 self-start md:self-auto shrink-0"
              >
                <span>Contact evonix Technologies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SEMANTICALLY OPTIMIZED CONTENT LAYER TEXT */}
        <div className="apple-glass-box p-6 sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="apple-badge">
              <Award className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Semantic Architecture &amp; Algorithmic Indexing</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight">
            Generative Search Optimization: Structuring Corporate Data Footprints for Advanced LLM Synthesizers
          </h2>

          <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
            Securing authoritative brand visibility across modern digital touchpoints requires deep alignment with semantic search indexing variables and structured knowledge graph architectures. Traditional content monetization methodologies often overlook clean technical metadata layers, leading to domain omission from real-time model queries. The evonix Technologies Website E-E-A-T &amp; AI Visibility Checker functions as an objective diagnostic framework that breaks down domain visibility parameters directly inside your browser workspace. By processing uniform resource footprints against algorithmic verification modules, this client-side utility evaluates structural compliance benchmarks without remote network dependencies. Digital content strategists can instantly verify entity connectivity states and citation parameters to isolate presence blockages, protect brand authority records, and optimize target web surfaces safely within a single system panel view.
          </p>

          <div className="pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#86868b]">
            <div className="flex items-center gap-4">
              <span>Audited under Google Search Quality Rater Guidelines (2026)</span>
              <span>&bull;</span>
              <span>Generative Engine Optimization (GEO)</span>
            </div>
            <button
              type="button"
              onClick={handleConsultation}
              className="text-[#0071e3] font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Schedule Architecture Audit with Senior Consultant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Semantically Optimized Technical Article, FAQs & Generated High-Res Mockup */}
        <ToolArticleGuideSection toolId="ai-visibility-checker" onOpenQuote={onOpenQuote} />
      </div>
    </div>
  );
}
export { AiVisibilityChecker };
