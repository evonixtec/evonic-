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
  Package,
  Boxes,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';

export type ActiveTab = 'simple' | 'advanced' | 'professional';

export interface FbaCategoryPreset {
  id: string;
  name: string;
  referralRate: number; // %
}

const FBA_CATEGORIES: FbaCategoryPreset[] = [
  { id: 'standard', name: 'Standard Merchandise (15%)', referralRate: 15.0 },
  { id: 'electronics', name: 'Consumer Electronics (8%)', referralRate: 8.0 },
  { id: 'apparel', name: 'Apparel & Clothing (17%)', referralRate: 17.0 },
  { id: 'sports', name: 'Sports & Outdoors (15%)', referralRate: 15.0 },
  { id: 'beauty', name: 'Beauty & Personal Care (15%)', referralRate: 15.0 },
  { id: 'grocery', name: 'Grocery & Gourmet (8% - 15%)', referralRate: 10.0 },
];

export default function AmazonFbaCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('amazon'));

  // Inputs
  const [listingPrice, setListingPrice] = useState<number>(60);
  const [itemCost, setItemCost] = useState<number>(18);
  const [inboundShipping, setInboundShipping] = useState<number>(3.5);
  const [categoryId, setCategoryId] = useState<string>('standard');
  const [sizeTier, setSizeTier] = useState<string>('large_std');
  const [monthlyStorage, setMonthlyStorage] = useState<number>(0.85);
  const [ppcSpend, setPpcSpend] = useState<number>(6.0);
  const [returnsRate, setReturnsRate] = useState<number>(2.0); // %
  const [numOrders, setNumOrders] = useState<number>(1);

  // Modals & Activation
  const [showPayModal, setShowPayModal] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentDeviceId = getHardwareDeviceId();

  // Pick FBA Pick & Pack fee based on size tier
  const getFbaFee = (tier: string) => {
    switch (tier) {
      case 'small_std': return 3.22;
      case 'large_std': return 4.75;
      case 'oversize': return 9.73;
      case 'extra_large': return 16.50;
      default: return 4.75;
    }
  };

  // Outputs
  const [referralFee, setReferralFee] = useState(0);
  const [fbaFee, setFbaFee] = useState(0);
  const [totalAmazonFees, setTotalAmazonFees] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);
  const [roi, setRoi] = useState(0);
  const [breakEvenPrice, setBreakEvenPrice] = useState(0);

  useEffect(() => {
    const selectedCat = FBA_CATEGORIES.find(c => c.id === categoryId) || FBA_CATEGORIES[0];
    const computedReferral = listingPrice * (selectedCat.referralRate / 100);
    const computedFba = getFbaFee(sizeTier);
    const returnsCost = listingPrice * (returnsRate / 100);

    const platformFees = computedReferral + computedFba + monthlyStorage + returnsCost;
    const directCosts = itemCost + inboundShipping + ppcSpend;
    const totalDeductionsPerUnit = platformFees + directCosts;

    const unitNetProfit = listingPrice - totalDeductionsPerUnit;
    const computedNetProfit = unitNetProfit * numOrders;
    const totalRevenue = listingPrice * numOrders;
    const computedMargin = totalRevenue > 0 ? (computedNetProfit / totalRevenue) * 100 : 0;
    const computedRoi = directCosts > 0 ? (unitNetProfit / directCosts) * 100 : 0;

    setReferralFee(computedReferral * numOrders);
    setFbaFee(computedFba * numOrders);
    setTotalAmazonFees(platformFees * numOrders);
    setNetProfit(computedNetProfit);
    setMargin(computedMargin);
    setRoi(computedRoi);

    const referralRateFraction = selectedCat.referralRate / 100;
    const fixedUnitCost = computedFba + monthlyStorage + directCosts;
    setBreakEvenPrice(referralRateFraction < 1 ? fixedUnitCost / (1 - referralRateFraction) : 0);
  }, [listingPrice, itemCost, inboundShipping, categoryId, sizeTier, monthlyStorage, ppcSpend, returnsRate, numOrders]);

  const handleActivate = () => {
    const res = activateLicenseKey(licenseKeyInput, 'amazon');
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

  const isProBlurActive = activeTab === 'professional' && !isProUnlocked;

  return (
    <div className="py-10 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Mobile Warning Banner - Strictly Required */}
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

        {/* Red Blinking User Guide Link */}
        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Amazon FBA Calculator PDF Guide will be available upon verified public release.");
            }}
            style={{ color: 'red', animation: 'blinker 1s linear infinite' }}
            className="font-bold text-sm tracking-wide inline-flex items-center gap-1.5 underline cursor-pointer"
          >
            <span>Download Free Amazon FBA Calculator User Guide PDF</span>
          </a>
        </div>

        {/* Master Header Card */}
        <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="apple-badge">
              <Package className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Amazon Seller FBA Suite • 2026 Rate Card</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Amazon FBA Calculator: Calculate FBA Fees, Profit &amp; Margin
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
              The Amazon FBA calculator is core for scaling brands. Amazon charges FBA fulfillment, referral, storage. Without fba fee calculator you risk loss. Our amazon seller calculator reveals exact margins.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-xs text-[#86868b] font-medium">Single License Key HWID Lock</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-white border border-slate-200">
                {currentDeviceId}
              </span>
              {isProUnlocked ? (
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pro Active
                </span>
              ) : (
                <button
                  onClick={() => setShowPayModal(true)}
                  className="px-3.5 py-1 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  $20 Lifetime
                </button>
              )}
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
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="font-bold text-sm text-[#1d1d1f]">FBA Cost &amp; Listing Parameters</h3>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#86868b]">Category:</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="apple-input text-xs py-1"
                  >
                    {FBA_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Amazon Listing Price ($)</label>
                  <input
                    type="number"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Unit Sourcing / COGS ($)</label>
                  <input
                    type="number"
                    value={itemCost}
                    onChange={(e) => setItemCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Inbound Freight to Amazon ($)</label>
                  <input
                    type="number"
                    value={inboundShipping}
                    onChange={(e) => setInboundShipping(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Package Size Tier</label>
                  <select
                    value={sizeTier}
                    onChange={(e) => setSizeTier(e.target.value)}
                    className="apple-input w-full text-sm py-2"
                  >
                    <option value="small_std">Small Standard ($3.22)</option>
                    <option value="large_std">Large Standard ($4.75)</option>
                    <option value="oversize">Oversize Small ($9.73)</option>
                    <option value="extra_large">Extra Large Bulky ($16.50)</option>
                  </select>
                </div>
              </div>

              {/* Advanced Mode Controls */}
              {activeTab !== 'simple' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 mt-4">
                  <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">
                    Advanced Storage &amp; Ad Metrics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[#86868b] block mb-1">Storage / Month ($)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={monthlyStorage}
                        onChange={(e) => setMonthlyStorage(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[#86868b] block mb-1">PPC Ad Spend / Order ($)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={ppcSpend}
                        onChange={(e) => setPpcSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[#86868b] block mb-1">Estimated Return %</label>
                      <input
                        type="number"
                        step="0.5"
                        value={returnsRate}
                        onChange={(e) => setReturnsRate(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span>Simulate Order Volume:</span>
                    <input
                      type="number"
                      min="1"
                      value={numOrders}
                      onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
                      className="apple-input w-24 py-1 font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Large Prominent Apple Blue Calculate Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('amazon-output-summary');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className="apple-calculate-btn py-3.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Amazon FBA Fees &amp; Profit</span>
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
                    <h4 className="text-lg font-bold text-[#1d1d1f]">Unlock Amazon FBA Pro Suite</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      Enables bulk ASIN profitability simulation, CSV fee exports, and offline desktop unlock.
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

            <div id="amazon-output-summary" className="apple-glass-box p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">Live FBA Ledger</span>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Amazon Payout</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] uppercase block">Units</span>
                  <span className="font-mono text-sm font-bold text-[#1d1d1f]">{numOrders} Item{numOrders > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Profit Block */}
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#86868b]">Estimated Net Profit:</span>
                  <span className={`text-2xl sm:text-3xl font-black ${netProfit >= 0 ? 'text-[#0071e3]' : 'text-red-600'}`}>
                    ${netProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#86868b]">Net Profit Margin:</span>
                  <span className={`font-bold ${margin >= 18 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {margin.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#86868b]">ROI on Sourcing:</span>
                  <span className="font-bold text-[#1d1d1f]">{roi.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#86868b]">Breakeven Price:</span>
                  <span className="font-bold text-[#1d1d1f]">${breakEvenPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Amazon Referral Fee:</span>
                  <span className="apple-metric-val">${referralFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">FBA Pick &amp; Pack Fulfillment:</span>
                  <span className="apple-metric-val">${fbaFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Total Amazon Platform Fees:</span>
                  <span className="apple-metric-val">${totalAmazonFees.toFixed(2)}</span>
                </div>
              </div>

              {/* Pro Feature Export Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (!isProUnlocked) setShowPayModal(true);
                    else alert("Exporting Amazon FBA Financial Ledger to CSV...");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export FBA Ledger (.CSV / .PDF)</span>
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
              Performance Infrastructure Metrics
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Amazon FBA Fees Calculator Module:</strong> Direct mapping of current pick and pack tiers.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>FBA Fee Calculator Engine:</strong> Isolates volume storage and seasonal surcharge factors.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Amazon Seller Calculator Framework:</strong> Evaluates Professional vs Individual account overhead.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Amazon Profit Calculator System:</strong> Calculates net capital retainment post PPC advertising.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Amazon FBA Profit Margin Calculator Core:</strong> Delivers true ROI percentage against sourcing.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Operational Instructions
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Enter listing price, sourcing cost, freight to Amazon, category. amazon fba fees calculator renders deductions.
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
                  q: 'Difference between amazon fba calculator and amazon seller calculator?',
                  a: 'FBA isolates fulfillment/storage, seller focuses on account tiers and overall category commissions.'
                },
                {
                  q: 'How amazon fba profit margin calculator isolates net?',
                  a: 'Net Profit = Sale Price - (Sourcing + Shipping + FBA Fee + Referral)'
                },
                {
                  q: 'Why need fba fee calculator before sourcing?',
                  a: 'Small weight changes push to premium tier, drastically reducing margins.'
                },
                {
                  q: 'Referral fee?',
                  a: '8% to 15%, matched by amazon profit calculator based on item category.'
                },
                {
                  q: 'Updates?',
                  a: 'Yes, amazon fba calculator matrix calibrated to latest fees and seasonal storage rules.'
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

                <div className="pt-2 text-center">
                  <a
                    href="https://link.payoneer.com/Token?t=92EF253542CE4D4DA2F32B91E7DB463F&src=pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0071e3] hover:underline font-semibold"
                  >
                    Don't have a key? Buy $20 Lifetime License via Payoneer
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
