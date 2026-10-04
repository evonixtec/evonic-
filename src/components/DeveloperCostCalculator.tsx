import React, { useState, useEffect, useId } from 'react';
import {
  Calculator,
  Users,
  Clock,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Printer,
  Sparkles,
  Building2,
  Globe,
  HelpCircle,
  ChevronDown,
  Check,
  FileText,
  Percent,
  TrendingDown,
  Award
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

type Tier = 'junior' | 'mid' | 'senior';

interface DeveloperCostCalculatorProps {
  onOpenQuote?: (servicePrefill?: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const DeveloperCostCalculator: React.FC<DeveloperCostCalculatorProps> = ({
  onOpenQuote,
  onNavigatePage,
}) => {
  const [developerTier, setDeveloperTier] = useState<Tier>('senior');
  const [teamSize, setTeamSize] = useState<number>(1);
  const [projectMonths, setProjectMonths] = useState<number>(12);
  const [techStack, setTechStack] = useState<string>('Full-Stack (React & Node.js)');

  // International Benchmark Hourly Rates ($/hr)
  const [onshoreRate, setOnshoreRate] = useState<number>(80); // USA/UK In-house
  const [offshoreRate, setOffshoreRate] = useState<number>(22); // evonix Global Rate

  // Computed financial metrics
  const [onshoreTotal, setOnshoreTotal] = useState<number>(0);
  const [offshoreTotal, setOffshoreTotal] = useState<number>(0);
  const [netSavings, setNetSavings] = useState<number>(0);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);

  // UI state
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const hoursPerMonth = 160;
    const safeTeam = Math.max(1, Number(teamSize) || 1);
    const safeMonths = Math.max(1, Number(projectMonths) || 1);
    const totalHours = safeTeam * hoursPerMonth * safeMonths;

    const calcOnshore = totalHours * (Number(onshoreRate) || 0);
    const calcOffshore = totalHours * (Number(offshoreRate) || 0);
    const savings = Math.max(0, calcOnshore - calcOffshore);

    setOnshoreTotal(calcOnshore);
    setOffshoreTotal(calcOffshore);
    setNetSavings(savings);
    setSavingsPercentage(calcOnshore > 0 ? (savings / calcOnshore) * 100 : 0);
  }, [teamSize, projectMonths, onshoreRate, offshoreRate]);

  const handleTierChange = (tier: Tier) => {
    setDeveloperTier(tier);
    if (tier === 'junior') {
      setOnshoreRate(50);
      setOffshoreRate(15);
    } else if (tier === 'mid') {
      setOnshoreRate(65);
      setOffshoreRate(18);
    } else if (tier === 'senior') {
      setOnshoreRate(80);
      setOffshoreRate(22);
    }
  };

  const getTierLabel = (tier: Tier) => {
    if (tier === 'junior') return 'Junior Software Developer (1-2 Yrs)';
    if (tier === 'mid') return 'Mid-Level Software Engineer (3-5 Yrs)';
    return 'Senior Solutions Architect & Lead (6+ Yrs)';
  };

  const handleCopyBreakdown = () => {
    const summaryText = `Dedicated Developer Cost Estimate - evonix Technologies
==================================================
Role Tier: ${getTierLabel(developerTier)}
Tech Stack: ${techStack}
Team Size: ${teamSize} Developer(s)
Contract Duration: ${projectMonths} Month(s)
Working Hours: ${teamSize * projectMonths * 160} Total Billable Hours

Rates Comparison:
• USA/UK In-House Standard: $${onshoreRate}/hr ($${onshoreTotal.toLocaleString()})
• evonix Global Delivery: $${offshoreRate}/hr ($${offshoreTotal.toLocaleString()})

Financial Summary:
• Retained Capital / Net Savings: $${netSavings.toLocaleString()}
• Cost Reduction: ${savingsPercentage.toFixed(1)}%
• Included: Zero recruiting fees, verified equipment, NDA protection, daily standups.

Request vetted developer profiles:
Email: ${COMPANY_INFO.contact.email} | WhatsApp: +92 326 324 4002`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInquireQuote = () => {
    const prefill = `Dedicated ${developerTier.toUpperCase()} Developer Hiring (${teamSize} Dev, ${projectMonths} Months, ${techStack})`;
    if (onOpenQuote) {
      onOpenQuote(prefill);
    } else {
      window.location.href = `/contact?service=${encodeURIComponent(prefill)}`;
    }
  };

  // User Exact Schema Code: SoftwareApplication
  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dedicated Developer Cost Calculator - evonix Technologies',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: {
      '@type': 'Organization',
      name: 'evonix Technologies',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sialkot',
        addressCountry: 'PK',
      },
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cost to hire a dedicated developer from Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Senior developer costs $22/hr via evonix Technologies Sialkot vs $80/hr in USA, saving you 72% annually with NDA, IP protection included.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long to get developer CVs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You get 3-5 vetted CVs in 24 hours. Interview and start in 48 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this zero-database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this calculator runs 100% client-side. No data is stored on server, ensuring max speed and privacy.',
        },
      },
    ],
  };

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Dedicated Developer Cost and Offshore Savings',
    description:
      'Step by step method to calculate annual project savings when hiring offshore software developers versus local USA or UK in-house developers.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select Engineering Seniority Tier',
        text: 'Choose whether you need a Junior Developer ($15/hr), Mid-Level Engineer ($18/hr), or Senior Architect ($22/hr).',
      },
      {
        '@type': 'HowToStep',
        name: 'Set Team Headcount and Project Timeline',
        text: 'Input the total number of developers required and expected project length in months.',
      },
      {
        '@type': 'HowToStep',
        name: 'Review Net Capital Savings',
        text: 'Compare the total onshore in-house outlay against the evonix global delivery rate to review your net budget savings.',
      },
      {
        '@type': 'HowToStep',
        name: 'Book Vetted Developer Interviews',
        text: 'Submit your specification to receive matched CVs within 24 to 48 hours with zero recruiting fees.',
      },
    ],
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 sm:py-16">
      {/* Inject 3 Rich JSON-LD Schemas (SoftwareApplication, FAQPage, HowTo) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ========================================================
            1. URL & H1 HERO CLUSTER WITH ANSWER ENGINE (AEO) BOX
           ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>2026 Developer Rate & Offshore Savings Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Dedicated Developer Cost Calculator
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Calculate cost to hire dedicated developers via evonix Technologies Sialkot. Senior dev at $22/hr vs $80/hr in USA. Save $111k/year. Get CVs in 24h.
          </p>

          {/* AEO (Answer Engine Optimization) Direct Answer Box for Google AI Overviews */}
          <div className="mt-6 text-left bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300/80 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Instant AI Overview Answer</span>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              <strong>Hiring a senior web developer via evonix Technologies costs $22/hour ($3,520/month) vs $80/hour ($12,800/month) in the USA.</strong> For a single senior engineer over 12 months, you invest <strong>${offshoreTotal.toLocaleString()}</strong> instead of <strong>${onshoreTotal.toLocaleString()}</strong>. You save <strong>${netSavings.toLocaleString()} ({savingsPercentage.toFixed(0)}% budget savings)</strong> with zero recruiter fees, daily video standups, and full code ownership.
            </p>
          </div>
        </div>

        {/* Section Heading H2 */}
        <div className="text-center pt-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Calculate Your Remote Team Savings Instantly
          </h2>
        </div>

        {/* ========================================================
            2. CALCULATOR ENGINE (INTERACTIVE BENTO GRID)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: CONTROLS & RESOURCE INPUTS (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                <span>Resource Configuration</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set engineering seniority and project scope parameters.
              </p>
            </div>

            {/* Seniority Tier Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Engineering Seniority Tier</span>
                <span className="text-[11px] text-red-600 font-semibold font-mono">
                  ${offshoreRate}/hr offshore
                </span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleTierChange('junior')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    developerTier === 'junior'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>Junior</div>
                  <div className={`text-[10px] font-normal ${developerTier === 'junior' ? 'text-red-100' : 'text-slate-500'}`}>$15/hr</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTierChange('mid')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    developerTier === 'mid'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>Mid-Level</div>
                  <div className={`text-[10px] font-normal ${developerTier === 'mid' ? 'text-red-100' : 'text-slate-500'}`}>$18/hr</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTierChange('senior')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    developerTier === 'senior'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>Senior / Lead</div>
                  <div className={`text-[10px] font-normal ${developerTier === 'senior' ? 'text-red-100' : 'text-slate-500'}`}>$22/hr</div>
                </button>
              </div>
            </div>

            {/* Technology Stack Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary Technology Stack
              </label>
              <select
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="Full-Stack (React & Node.js)">Full-Stack (React & Node.js)</option>
                <option value="Next.js & TypeScript Specialist">Next.js & TypeScript Specialist</option>
                <option value="Mobile App (Flutter / React Native)">Mobile App (Flutter / React Native)</option>
                <option value="Python & AI Backend Engineer">Python & AI Backend Engineer</option>
                <option value="PHP & Laravel Enterprise Dev">PHP & Laravel Enterprise Dev</option>
                <option value="DevOps & AWS Cloud Engineer">DevOps & AWS Cloud Engineer</option>
              </select>
            </div>

            {/* Headcount and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Headcount
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <span className="text-[10px] text-slate-400">Number of engineers</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Duration (Months)
                </label>
                <select
                  value={projectMonths}
                  onChange={(e) => setProjectMonths(parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option value={1}>1 Month (Trial)</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                </select>
                <span className="text-[10px] text-slate-400">160 hrs / month</span>
              </div>
            </div>

            {/* Editable Benchmark Hourly Rates */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Hourly Rates ($/hr) – Custom Benchmark</span>
                <span className="text-[10px] text-slate-400 font-normal">Editable</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-red-600 block">USA / UK In-House Rate</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-slate-500 mr-1">$</span>
                    <input
                      type="number"
                      value={onshoreRate}
                      onChange={(e) => setOnshoreRate(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white px-2 py-1 rounded border border-slate-300 text-xs font-bold text-slate-900"
                    />
                    <span className="text-xs text-slate-500 ml-1">/hr</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-emerald-600 block">evonix Global Rate</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-slate-500 mr-1">$</span>
                    <input
                      type="number"
                      value={offshoreRate}
                      onChange={(e) => setOffshoreRate(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white px-2 py-1 rounded border border-slate-300 text-xs font-bold text-slate-900"
                    />
                    <span className="text-xs text-slate-500 ml-1">/hr</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Runs 100% in your browser. Zero database storage for privacy.</span>
              </div>
            </div>
          </div>

          {/* RIGHT: FINANCIAL REPORT & SXO ACTION BAR (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              {/* Header with Live Savings Margin Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Financial Efficiency Report
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time remote software engineering cost analytics
                  </p>
                </div>

                <div className="text-left sm:text-right bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Savings Margin
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    +{savingsPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Side-by-Side Cost Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      USA / UK In-House Outlay
                    </span>
                    <Building2 className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    ${onshoreTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Based on ${onshoreRate}/hr • {teamSize * projectMonths * 160} billable hours
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      evonix Global Delivery
                    </span>
                    <Globe className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-2">
                    ${offshoreTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-1">
                    Based on ${offshoreRate}/hr • All-inclusive rate
                  </p>
                </div>
              </div>

              {/* Big Retained Capital Highlight Banner */}
              <div className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/20 text-[11px] font-bold uppercase tracking-wider text-emerald-100">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Retained Capital</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Net Budget Saved via Global Team Delivery
                  </h4>
                  <p className="text-xs text-emerald-100/90">
                    Direct cash saved without recruiter commissions or office overhead.
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block">
                    ${netSavings.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-200 font-medium">
                    {savingsPercentage.toFixed(0)}% total project savings
                  </span>
                </div>
              </div>

              {/* Deliverables Checklist Included in the $22/hr Rate */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Direct daily Slack & video standups</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Strict NDA and 100% IP code ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero recruiter fees & no long lock-in</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Dual-monitor workstation & backup power</span>
                </div>
              </div>
            </div>

            {/* SXO + CRO ACTION BUTTONS */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleInquireQuote}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Vetted Developer CVs in 24-48 Hours</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyBreakdown}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Copy Cost Breakdown"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Print Breakdown"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print PDF</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                evonix Technologies • Sialkot Hub • Serving USA, UK, UAE & European Tech Firms
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. GEO (GENERATIVE ENGINE OPTIMIZATION) – BENCHMARK TABLE
           ======================================================== */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>International Engineering Benchmark Table</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Cost Comparison: USA vs evonix Global Delivery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified 2026 market benchmarks for dedicated full-time remote and onshore software engineers.
            </p>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                  <th className="p-3.5 rounded-l-xl">Hiring Model / Region</th>
                  <th className="p-3.5">Hourly Rate</th>
                  <th className="p-3.5">Monthly Cost (160h)</th>
                  <th className="p-3.5">Annual Total</th>
                  <th className="p-3.5">Recruiting Fee</th>
                  <th className="p-3.5">Notice Period</th>
                  <th className="p-3.5 rounded-r-xl">IP Ownership</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">USA In-House (Silicon Valley / NY)</td>
                  <td className="p-3.5 text-red-600 font-bold">$90 – $130 / hr</td>
                  <td className="p-3.5">$14,400 – $20,800</td>
                  <td className="p-3.5 font-bold">$172,800 – $249,600</td>
                  <td className="p-3.5">20% – 25% salary</td>
                  <td className="p-3.5">At-will / 2 weeks</td>
                  <td className="p-3.5 text-emerald-600">Full IP</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">UK In-House (London / Tech City)</td>
                  <td className="p-3.5 text-red-600 font-bold">£55 – £85 / hr</td>
                  <td className="p-3.5">£8,800 – £13,600</td>
                  <td className="p-3.5 font-bold">£105,600 – £163,200</td>
                  <td className="p-3.5">15% – 20% salary</td>
                  <td className="p-3.5">1 – 3 months</td>
                  <td className="p-3.5 text-emerald-600">Full IP</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">UAE / Dubai Tech Hub</td>
                  <td className="p-3.5 text-amber-600 font-bold">$55 – $80 / hr</td>
                  <td className="p-3.5">$8,800 – $12,800</td>
                  <td className="p-3.5 font-bold">$105,600 – $153,600</td>
                  <td className="p-3.5">15% fee</td>
                  <td className="p-3.5">30 days</td>
                  <td className="p-3.5 text-emerald-600">Full IP</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">Pune / Bengaluru Agency (India)</td>
                  <td className="p-3.5 text-slate-700 font-bold">$25 – $38 / hr</td>
                  <td className="p-3.5">$4,000 – $6,080</td>
                  <td className="p-3.5 font-bold">$48,000 – $72,960</td>
                  <td className="p-3.5">Setup deposit</td>
                  <td className="p-3.5">30 – 60 days</td>
                  <td className="p-3.5 text-emerald-600">Full IP</td>
                </tr>
                <tr className="bg-emerald-50/60 text-slate-900 font-semibold border-2 border-emerald-300 rounded-xl">
                  <td className="p-3.5 font-black text-emerald-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>evonix Global Delivery (Sialkot Tech Hub)</span>
                  </td>
                  <td className="p-3.5 text-emerald-700 font-black text-sm">$22 / hr (Senior Lead)</td>
                  <td className="p-3.5 text-emerald-800 font-bold">$3,520 / mo</td>
                  <td className="p-3.5 text-emerald-900 font-black">$42,240 / yr</td>
                  <td className="p-3.5 text-emerald-700 font-bold">$0 (Zero Fee)</td>
                  <td className="p-3.5">14 days</td>
                  <td className="p-3.5 text-emerald-700 font-bold">100% Written Assignment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================
            4. CLASSIC SEO & REASONING CONTENT SECTION (H2, H3 KEYWORDS)
           ======================================================== */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-xs sm:text-sm">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Hire Developers from Sialkot, Pakistan via evonix?
            </h2>
            <p>
              Hiring remote software engineers has shifted from simple cost arbitrage to building high-performing remote teams. Global technology firms in the USA, UK, and Europe balance engineering quality with operational cash efficiency.
            </p>
            <p>
              When evaluating the <strong>cost to hire dedicated developers</strong>, companies often compare Pune and Bengaluru with Sialkot and Lahore. While senior developers in India typically bill between $25 and $38 per hour through agencies, evonix Technologies delivers certified senior talent at a flat <strong>$22 per hour</strong> rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Hidden Costs of In-House Hiring vs Dedicated Remote Engineers
              </h3>
              <p>
                In-house hiring carries hidden burdens. Recruiter search fees range from $15,000 to $25,000 per engineer. Office space, medical insurance, 401(k) matching, and specialized workstation laptops add another 28% on top of base salary.
              </p>
              <p>
                With evonix dedicated staff augmentation, your hourly rate covers everything. We handle workstation setup, HR management, high-speed fiber internet, and payroll taxes so you pay only for productive code.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Full Intellectual Property (IP) Protection & Daily Video Standups
              </h3>
              <p>
                Security and confidentiality remain paramount. Every engineer signs comprehensive Non-Disclosure Agreements (NDAs) and IP transfer assignments before writing their first line of code.
              </p>
              <p>
                Developers operate in your direct time zone overlap. They join your morning Slack huddles, commit directly to your GitHub branches, and maintain agile Jira boards for full operational transparency.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. AIO (AI INPUT OPTIMIZATION) – FAQ SECTION
           ======================================================== */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers to the most common queries founders and CTOs ask about remote engineering.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                q: 'What is the cost to hire a dedicated developer from Pakistan?',
                a: 'Senior developer costs $22/hr via evonix Technologies Sialkot vs $80/hr in USA, saving you 72% annually with NDA, IP protection included.',
              },
              {
                q: 'How long to get developer CVs?',
                a: 'You get 3-5 vetted CVs in 24 hours. Interview and start in 48 hours.',
              },
              {
                q: 'Is this zero-database?',
                a: 'Yes, this calculator runs 100% client-side. No data is stored on server, ensuring max speed and privacy.',
              },
              {
                q: 'What is included in the $22 per hour developer rate?',
                a: 'The $22/hr senior rate includes developer base salary, dual-monitor workstation hardware, gigabit internet backup, local payroll taxes, health insurance, HR management, and a dedicated project manager.',
              },
              {
                q: 'Can I interview and live-code test the software engineers before hiring?',
                a: 'Yes, absolutely. You receive curated CVs of senior developers matched to your stack, and you conduct 1-on-1 technical video interviews and live coding assessments before making any commitment.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            6. INTERNAL LINKING & CTAS TO SERVICES
           ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
              Ready to Scale Your Software Engineering?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Interview Top 3% Dedicated Developers in 24 Hours
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tell us your stack and timeline. We will send matching senior engineer profiles with code samples and portfolio demos.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleInquireQuote}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Request Developer Profiles
            </button>
            {onNavigatePage && (
              <button
                type="button"
                onClick={() => onNavigatePage('services')}
                className="py-3 px-5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                View Web & Software Services
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCostCalculator;
