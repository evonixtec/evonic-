import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sparkles,
  FileSpreadsheet,
  FileDown,
  Code2,
  ShieldCheck,
  X,
  CreditCard,
  ExternalLink,
  QrCode,
  Calculator,
  AlertTriangle,
  ArrowDownUp,
  Globe2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';
import SpecialOfferBanner from './common/SpecialOfferBanner';

// Preserved payment setting for future monetization reactivation
export const PAYONEER_PAYMENT_URL = 'https://link.payoneer.com/Token?t=92EF253542CE4D4DA2F32B91E7DB463F&src=pl';

export type ActiveTab = 'simple' | 'advanced' | 'professional';
export type CalcDirection = 'forward' | 'reverse';

export interface StripeCountryPreset {
  id: string;
  name: string;
  currency: string;
  symbol: string;
  domesticRate: number; // e.g. 2.9%
  fixedFee: number; // e.g. 0.30
  internationalRate: number; // e.g. 3.9%
}

const STRIPE_COUNTRIES: StripeCountryPreset[] = [
  { id: 'US', name: 'United States (USD)', currency: 'USD', symbol: '$', domesticRate: 2.9, fixedFee: 0.30, internationalRate: 3.9 },
  { id: 'UK', name: 'United Kingdom (GBP)', currency: 'GBP', symbol: '£', domesticRate: 1.5, fixedFee: 0.20, internationalRate: 2.5 },
  { id: 'EU', name: 'Eurozone (EUR)', currency: 'EUR', symbol: '€', domesticRate: 1.5, fixedFee: 0.25, internationalRate: 2.5 },
  { id: 'CA', name: 'Canada (CAD)', currency: 'CAD', symbol: 'C$', domesticRate: 2.9, fixedFee: 0.30, internationalRate: 3.9 },
  { id: 'AU', name: 'Australia (AUD)', currency: 'AUD', symbol: 'A$', domesticRate: 1.75, fixedFee: 0.30, internationalRate: 2.9 },
  { id: 'AE', name: 'United Arab Emirates (AED)', currency: 'AED', symbol: 'AED ', domesticRate: 2.9, fixedFee: 1.00, internationalRate: 3.9 },
  { id: 'PK', name: 'Pakistan Cross-Border (USD)', currency: 'USD', symbol: '$', domesticRate: 3.9, fixedFee: 0.30, internationalRate: 4.9 },
];

export default function StripeFeeCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('stripe'));

  // Inputs
  const [direction, setDirection] = useState<CalcDirection>('forward');
  const [amountInput, setAmountInput] = useState<number>(100);
  const [countryId, setCountryId] = useState<string>('US');
  const [isInternationalCard, setIsInternationalCard] = useState<boolean>(false);
  const [currencyConversion, setCurrencyConversion] = useState<boolean>(false);
  const [platformSaaSCut, setPlatformSaaSCut] = useState<number>(0); // % app commission
  const [numTransactions, setNumTransactions] = useState<number>(1);

  // Modals & Activation
  const [showPayModal, setShowPayModal] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentDeviceId = getHardwareDeviceId();
  const country = STRIPE_COUNTRIES.find(c => c.id === countryId) || STRIPE_COUNTRIES[0];

  // Outputs
  const [grossCharge, setGrossCharge] = useState(0);
  const [stripeFeeTotal, setStripeFeeTotal] = useState(0);
  const [netReceived, setNetReceived] = useState(0);
  const [effectiveFeePercent, setEffectiveFeePercent] = useState(0);

  useEffect(() => {
    let baseRatePercent = isInternationalCard ? country.internationalRate : country.domesticRate;
    if (currencyConversion) {
      baseRatePercent += 1.0; // Stripe 1% FX conversion fee
    }
    baseRatePercent += platformSaaSCut; // extra SaaS cut

    const rateFraction = baseRatePercent / 100;
    const fixed = country.fixedFee;

    let computedGross = 0;
    let computedStripeFee = 0;
    let computedNet = 0;

    if (direction === 'forward') {
      // User inputs Invoice Amount to charge customer
      computedGross = amountInput;
      computedStripeFee = (computedGross * rateFraction) + fixed;
      computedNet = computedGross - computedStripeFee;
    } else {
      // Reverse mode: User inputs desired Net Payout
      computedNet = amountInput;
      if (rateFraction < 1) {
        computedGross = (computedNet + fixed) / (1 - rateFraction);
        computedStripeFee = computedGross - computedNet;
      }
    }

    const totalGross = computedGross * numTransactions;
    const totalFees = computedStripeFee * numTransactions;
    const totalNet = computedNet * numTransactions;
    const effective = totalGross > 0 ? (totalFees / totalGross) * 100 : 0;

    setGrossCharge(totalGross);
    setStripeFeeTotal(totalFees);
    setNetReceived(totalNet);
    setEffectiveFeePercent(effective);
  }, [amountInput, direction, countryId, isInternationalCard, currencyConversion, platformSaaSCut, numTransactions]);

  const handleActivate = () => {
    const res = activateLicenseKey(licenseKeyInput, 'stripe');
    if (res.success) {
      setIsProUnlocked(true);
      setLicenseSuccess(res.message);
      setLicenseError('');
      setTimeout(() => setShowPayModal(false), 1200);
    } else {
      setLicenseError(res.message);
      setLicenseSuccess('');
    }
  };

  const handleExportCSV = () => {
    if (!isProUnlocked) {
      setShowPayModal(true);
      return;
    }
    const headers = ['Country', 'Transaction Amount', 'Card Type', 'Currency Conversion', 'Effective Fee Rate', 'Fixed Fee', 'Total Stripe Fee', 'Net Received'];
    const row = [
      country.name,
      amountInput.toFixed(2),
      isInternationalCard ? 'International' : 'Domestic',
      currencyConversion ? 'Cross-Currency (1%)' : 'Standard Currency',
      `${effectiveFeePercent.toFixed(2)}%`,
      country.fixedFee.toFixed(2),
      stripeFeeTotal.toFixed(2),
      netReceived.toFixed(2)
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stripe_fee_report_${countryId.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isProBlurActive = activeTab === 'professional' && !isProUnlocked;

  return (
    <div className="py-10 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Mobile Warning Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Important Note for Mobile Users
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              For Mobile Users (Android / iPhone): This is a desktop software (Windows/Mac). On mobile, you can use our online web version of the calculator. The downloadable offline version is only for Windows and Mac.
            </p>
          </div>
        </div>

        {/* Special Launch Offer Banner */}
        <SpecialOfferBanner toolName="Stripe Fee Calculator" />

        {/* Master Header Card */}
        <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="apple-badge">
              <CreditCard className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Stripe Gateway Utility • Forward &amp; Reverse Calculation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Stripe Fee Calculator: Calculate Stripe Transaction Fees
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
              Stripe charges 2.9% + 30¢ US domestic, different international. Our stripe fee calculator maps exact deduction and net payout with forward and reverse computation.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-xs text-[#86868b] font-medium">Special Launch Offer</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-white border border-slate-200">
                {currentDeviceId}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Free Pro Active
              </span>
            </div>
          </div>
        </div>

        {/* 3-Mode Operational Tabs */}
        <div className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-black/8 shadow-xs">
          <button
            onClick={() => setActiveTab('simple')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'simple' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            Simple Mode
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'advanced' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            Advanced Mode
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'professional' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#1d1d1f] hover:text-[#0071e3]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 $20 Pro Suite</span>
          </button>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="apple-glass-box p-6 space-y-5">
              
              {/* Calculation Direction Toggle: Forward vs Reverse */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/6 pb-4 gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">Calculation Logic</span>
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setDirection('forward')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      direction === 'forward' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    I want to charge client
                  </button>
                  <button
                    onClick={() => setDirection('reverse')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      direction === 'reverse' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    I want to receive net
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">
                    {direction === 'forward'
                      ? `Invoice Amount to Charge (${country.symbol})`
                      : `Target Net Amount to Receive (${country.symbol})`}
                  </label>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Stripe Country Account</label>
                  <select
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                    className="apple-input w-full text-sm py-2"
                  >
                    {STRIPE_COUNTRIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <label className="flex items-center gap-2 p-3 bg-white border border-slate-200/80 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInternationalCard}
                    onChange={(e) => setIsInternationalCard(e.target.checked)}
                    className="rounded text-[#0071e3]"
                  />
                  <span>International Card ({country.internationalRate}% fee)</span>
                </label>
                <label className="flex items-center gap-2 p-3 bg-white border border-slate-200/80 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currencyConversion}
                    onChange={(e) => setCurrencyConversion(e.target.checked)}
                    className="rounded text-[#0071e3]"
                  />
                  <span>Cross-Currency Conversion (+1.0%)</span>
                </label>
              </div>

              {/* Advanced Mode Controls */}
              {activeTab !== 'simple' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">
                    SaaS Platform &amp; Batch Parameters
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[#86868b] block mb-1">Additional App / SaaS Cut %</label>
                      <input
                        type="number"
                        step="0.1"
                        value={platformSaaSCut}
                        onChange={(e) => setPlatformSaaSCut(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[#86868b] block mb-1">Monthly Invoices Count</label>
                      <input
                        type="number"
                        min="1"
                        value={numTransactions}
                        onChange={(e) => setNumTransactions(Math.max(1, parseInt(e.target.value) || 1))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Large Prominent Apple Blue Calculate Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('stripe-output-summary');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className="apple-calculate-btn py-3.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Stripe Payout &amp; Fees</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Ledger & Summary (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Paywall Overlay */}
            {isProBlurActive && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl animate-in fade-in duration-200">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Lifetime Pro Access - $20 One Time
                    </span>
                    <h4 className="text-lg font-bold text-[#1d1d1f]">Unlock Stripe Pro Suite</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      Enables bulk recurring billing exports, API webhook tester, and offline executable.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="apple-calculate-btn py-3 text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Unlock for $20
                  </button>
                </div>
              </div>
            )}

            <div id="stripe-output-summary" className="apple-glass-box p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                    {direction === 'forward' ? 'Payout Ledger' : 'Invoice Recommendation'}
                  </span>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">
                    {direction === 'forward' ? 'You Will Receive' : 'You Must Charge'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] uppercase block">Rate Tier</span>
                  <span className="font-mono text-xs font-bold text-[#0071e3]">
                    {isInternationalCard ? country.internationalRate : country.domesticRate}% + {country.symbol}{country.fixedFee}
                  </span>
                </div>
              </div>

              {/* Profit / Net Block */}
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#86868b]">
                    {direction === 'forward' ? 'Net Deposited to Bank:' : 'Amount to Invoice Client:'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0071e3]">
                    {country.symbol}
                    {direction === 'forward' ? netReceived.toFixed(2) : grossCharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#86868b]">Total Stripe Processing Fee:</span>
                  <span className="font-bold text-red-600">
                    -{country.symbol}{stripeFeeTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#86868b]">Effective Stripe Fee %:</span>
                  <span className="font-bold text-[#1d1d1f]">{effectiveFeePercent.toFixed(2)}%</span>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Gross Transaction Volume:</span>
                  <span className="apple-metric-val">{country.symbol}{grossCharge.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Fixed Processing Fee:</span>
                  <span className="apple-metric-val">{country.symbol}{(country.fixedFee * numTransactions).toFixed(2)}</span>
                </div>
                <div className="apple-metric-row font-bold text-[#1d1d1f] pt-1">
                  <span>Net Bank Settlement:</span>
                  <span className="text-emerald-700">{country.symbol}{netReceived.toFixed(2)}</span>
                </div>
              </div>

              {/* Pro Feature Export Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export Stripe Payout Ledger (.CSV)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 6 SEO CONTENT SECTION - VERBATIM H1/H2 TAGS & FAQ
           ======================================================== */}
        <section className="apple-glass-box p-6 sm:p-10 space-y-8 mt-12 text-[#1d1d1f]">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Integrated Technical Capabilities
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Fee Calculator Framework:</strong> Real-time domestic vs cross-border fee engine.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Fees Calculator Module:</strong> Accurately processes fixed 30-cent plus percentage charges.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Transaction Fee Calculator Engine:</strong> Supports reverse payout target computation.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Payment Fee Calculator Logic:</strong> Calculates multi-currency foreign exchange rates.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Processing Fee Calculator Core:</strong> Delivers true cost reconciliation for invoices.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Stripe Commission Calculator Utility:</strong> Deducts SaaS application revenue cuts automatically.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Enter invoice amount, select country, stripe processing fee calculator shows expenses.
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              FAQs
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  q: 'Base params of stripe fee calculator?',
                  a: 'US 2.9%+30c, International up to 3.9% + currency conversion.'
                },
                {
                  q: 'How stripe transaction fee calculator reverse works?',
                  a: 'If need $100 net, tell to charge $103.30 so after 2.9% + 30¢ deductions you get exactly $100.'
                },
                {
                  q: 'Refunds?',
                  a: 'Stripe keeps original processing fee, noted by stripe payment fee calculator as business overhead.'
                },
                {
                  q: 'vs stripe commission calculator?',
                  a: 'This computes gateway fees plus optional SaaS platform percentage cuts.'
                },
                {
                  q: 'Why embed stripe fees calculator in CRM?',
                  a: 'Update billing records accurately and pass exact card processing costs to foreign clients.'
                }
              ].map((item, idx) => (
                <div key={idx} className="apple-result-box p-4">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#1d1d1f] cursor-pointer"
                  >
                    <span>Q{idx + 1}: {item.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#0071e3]' : 'text-slate-400'}`} />
                  </button>
                  {activeFaq === idx && (
                    <p className="mt-2 text-xs text-[#86868b] leading-relaxed pt-2 border-t border-black/6">
                      A: {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {showPayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0071e3] flex items-center justify-center font-bold">
                    🔑
                  </div>
                  <h3 className="font-bold text-base text-[#1d1d1f]">Single License Key Activation</h3>
                </div>
                <button
                  onClick={() => setShowPayModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-[#86868b] block font-medium">Your Hardware Device ID (HWID):</span>
                  <span className="font-mono font-bold text-[#0071e3] block">{currentDeviceId}</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">Enter License Key</label>
                  <input
                    type="text"
                    placeholder="EVONIC-PRO-XXXX-YYYY"
                    value={licenseKeyInput}
                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                    className="apple-input w-full font-mono text-sm uppercase"
                  />
                  {licenseError && <p className="text-xs text-red-600 font-medium">{licenseError}</p>}
                  {licenseSuccess && <p className="text-xs text-emerald-600 font-medium">{licenseSuccess}</p>}
                </div>

                <button
                  onClick={handleActivate}
                  className="apple-calculate-btn py-3 cursor-pointer"
                >
                  <span>Verify &amp; Unlock License</span>
                </button>

                <div className="pt-2 text-center space-y-1">
                  <a
                    href={PAYONEER_PAYMENT_URL}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('🎉 Special Launch Offer Active: All Evonix calculators and tools are currently 100% free! No payment or license key required.');
                    }}
                    className="text-xs text-[#0071e3] hover:underline font-semibold block"
                  >
                    Special Offer: 100% Free Access Active (No Payment Required)
                  </a>
                  <p className="text-[11px] text-emerald-600 font-bold">
                    ✓ Full Pro features unlocked for everyone
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
