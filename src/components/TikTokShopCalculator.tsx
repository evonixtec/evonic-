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
  ShoppingBag,
  Percent,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';

export type ActiveTab = 'simple' | 'advanced' | 'professional';

export interface TikTokRegionConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  defaultFeeRate: number; // %
  fixedFee: number;
}

const TIKTOK_REGIONS: Record<string, TikTokRegionConfig> = {
  US: { code: 'US', name: 'United States', currency: 'USD', symbol: '$', defaultFeeRate: 6.0, fixedFee: 0.30 },
  UK: { code: 'UK', name: 'United Kingdom', currency: 'GBP', symbol: '£', defaultFeeRate: 5.0, fixedFee: 0.30 },
  PK: { code: 'PK', name: 'Pakistan Exporter Hub', currency: 'PKR', symbol: 'Rs. ', defaultFeeRate: 6.0, fixedFee: 50.0 },
  AE: { code: 'AE', name: 'UAE / GCC', currency: 'AED', symbol: 'AED ', defaultFeeRate: 6.0, fixedFee: 1.0 },
  EU: { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€', defaultFeeRate: 5.0, fixedFee: 0.35 },
};

export default function TikTokShopCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('tiktok'));

  // Inputs
  const [region, setRegion] = useState<string>('US');
  const [salePrice, setSalePrice] = useState<number>(45);
  const [shippingCharged, setShippingCharged] = useState<number>(5);
  const [productCost, setProductCost] = useState<number>(14);
  const [shippingCost, setShippingCost] = useState<number>(4);
  const [affiliateRate, setAffiliateRate] = useState<number>(10); // % creator commission
  const [platformFeeRate, setPlatformFeeRate] = useState<number>(6.0); // % referral
  const [adSpend, setAdSpend] = useState<number>(3);
  const [numOrders, setNumOrders] = useState<number>(1);

  // Advanced toggles
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCrossBorder, setIsCrossBorder] = useState(false);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(0);

  // Modals & Activation
  const [showPayModal, setShowPayModal] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentDeviceId = getHardwareDeviceId();
  const activeConfig = TIKTOK_REGIONS[region] || TIKTOK_REGIONS.US;

  // Calculation outputs
  const [referralFee, setReferralFee] = useState(0);
  const [affiliateFee, setAffiliateFee] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);
  const [breakEvenPrice, setBreakEvenPrice] = useState(0);

  useEffect(() => {
    const grossSale = salePrice + shippingCharged;
    const baseReferral = (grossSale * (platformFeeRate / 100));
    const crossBorderSurcharge = isCrossBorder ? (grossSale * 0.015) : 0;
    const computedReferral = baseReferral + crossBorderSurcharge;
    const computedAffiliate = (salePrice * (affiliateRate / 100));
    const computedProcessing = (grossSale * 0.0212) + activeConfig.fixedFee;

    const totalPlatformCharges = computedReferral + computedAffiliate + computedProcessing;
    const totalCOGS = productCost + shippingCost + adSpend;
    const totalDeductions = totalPlatformCharges + totalCOGS;

    const computedNetProfit = (grossSale - totalDeductions) * numOrders;
    const totalRevenue = grossSale * numOrders;
    const computedMargin = totalRevenue > 0 ? (computedNetProfit / totalRevenue) * 100 : 0;

    setReferralFee(computedReferral * numOrders);
    setAffiliateFee(computedAffiliate * numOrders);
    setProcessingFee(computedProcessing * numOrders);
    setTotalFees(totalPlatformCharges * numOrders);
    setNetProfit(computedNetProfit);
    setMargin(computedMargin);

    const variableRate = (platformFeeRate / 100) + (affiliateRate / 100) + 0.0212 + (isCrossBorder ? 0.015 : 0);
    const fixedCosts = activeConfig.fixedFee + totalCOGS;
    setBreakEvenPrice(variableRate < 1 ? fixedCosts / (1 - variableRate) : 0);
  }, [salePrice, shippingCharged, productCost, shippingCost, affiliateRate, platformFeeRate, adSpend, numOrders, isCrossBorder, region]);

  const handleActivate = () => {
    const res = activateLicenseKey(licenseKeyInput, 'tiktok');
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
              alert("TikTok Shop Fee Calculator PDF Guide will be available upon verified public release.");
            }}
            style={{ color: 'red', animation: 'blinker 1s linear infinite' }}
            className="font-bold text-sm tracking-wide inline-flex items-center gap-1.5 underline cursor-pointer"
          >
            <span>Download Free TikTok Shop Fee Calculator User Guide PDF</span>
          </a>
        </div>

        {/* Master Header Card */}
        <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="apple-badge">
              <ShoppingBag className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>TikTok Shop Seller Suite • 2026 Fiscal Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              TikTok Shop Fee Calculator: Calculate TikTok Shop Fees, Commission &amp; Profit
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
              Our enterprise-grade TikTok Shop fee calculator empowers modern multi-channel merchants to accurately calculate TikTok Shop fees, system commissions, and net profit margins.
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

        {/* 3-Mode Operational Tabs (Mirroring eBay Calculator) */}
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
                <h3 className="font-bold text-sm text-[#1d1d1f]">Product &amp; Pricing Inputs</h3>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#86868b]">Market Region:</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="apple-input text-xs py-1"
                  >
                    {Object.values(TIKTOK_REGIONS).map((r) => (
                      <option key={r.code} value={r.code}>{r.name} ({r.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Product Selling Price ({activeConfig.symbol})</label>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Customer Shipping Charged ({activeConfig.symbol})</label>
                  <input
                    type="number"
                    value={shippingCharged}
                    onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Product Sourcing / Unit COGS ({activeConfig.symbol})</label>
                  <input
                    type="number"
                    value={productCost}
                    onChange={(e) => setProductCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Actual Shipping Cost ({activeConfig.symbol})</label>
                  <input
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
              </div>

              {/* Commission Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">TikTok Referral %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={platformFeeRate}
                    onChange={(e) => setPlatformFeeRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Creator Affiliate %</label>
                  <input
                    type="number"
                    step="0.5"
                    value={affiliateRate}
                    onChange={(e) => setAffiliateRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Ad Spend / Unit ({activeConfig.symbol})</label>
                  <input
                    type="number"
                    step="0.5"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
              </div>

              {/* Advanced Mode Controls */}
              {activeTab !== 'simple' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 mt-4">
                  <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">
                    Advanced Cross-Border &amp; Batch Metrics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isCrossBorder}
                        onChange={(e) => setIsCrossBorder(e.target.checked)}
                        className="rounded text-[#0071e3]"
                      />
                      <span>Cross-Border International Delivery (+1.5% Tariff)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span>Order Batch Volume:</span>
                      <input
                        type="number"
                        min="1"
                        value={numOrders}
                        onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
                        className="apple-input w-20 py-1 font-mono text-xs"
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
                    const el = document.getElementById('tiktok-output-summary');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className="apple-calculate-btn py-3.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate TikTok Shop Fees &amp; Profit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Ledger & Summary (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Absolute $20 Paywall Overlay for Professional Mode */}
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
                    <h4 className="text-lg font-bold text-[#1d1d1f]">Unlock TikTok Shop Pro Suite</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      Includes 10,000x bulk order simulations, CSV/PDF ledger export, and single key hardware lock.
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

            <div id="tiktok-output-summary" className="apple-glass-box p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">Live Financial Ledger</span>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Net Profit Readout</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] uppercase block">Batch Volume</span>
                  <span className="font-mono text-sm font-bold text-[#1d1d1f]">{numOrders} Order{numOrders > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Primary Profit Block */}
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#86868b]">Estimated Net Profit:</span>
                  <span className={`text-2xl sm:text-3xl font-black ${netProfit >= 0 ? 'text-[#0071e3]' : 'text-red-600'}`}>
                    {activeConfig.symbol}{netProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#86868b]">Net Profit Margin:</span>
                  <span className={`font-bold ${margin >= 15 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {margin.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#86868b]">Breakeven Unit Price:</span>
                  <span className="font-bold text-[#1d1d1f]">
                    {activeConfig.symbol}{breakEvenPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">TikTok Referral Fee ({platformFeeRate}%):</span>
                  <span className="apple-metric-val">{activeConfig.symbol}{referralFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Creator Affiliate Payout ({affiliateRate}%):</span>
                  <span className="apple-metric-val">{activeConfig.symbol}{affiliateFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Payment Processing (2.12% + fixed):</span>
                  <span className="apple-metric-val">{activeConfig.symbol}{processingFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row font-bold text-[#1d1d1f] pt-1">
                  <span>Total Platform Deductions:</span>
                  <span className="text-[#0071e3]">{activeConfig.symbol}{totalFees.toFixed(2)}</span>
                </div>
              </div>

              {/* Pro Feature Export Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (!isProUnlocked) setShowPayModal(true);
                    else alert("Exporting 100-Order TikTok Shop Fee Ledger to CSV/PDF...");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export Financial Report (.CSV / .PDF)</span>
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
              Advanced Features of the TikTok Seller Calculator
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>TikTok Shop Fee Calculator Engine:</strong> Computes real-time platform platform costs.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Calculate TikTok Shop Commission:</strong> Breaks down baseline transaction tariff metrics.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>TikTok Seller Calculator Core Logic:</strong> Analyzes cross-border vs domestic expenses.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>TikTok Shop Commission Calculator Logic:</strong> Factors in creator marketplace payouts.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>TikTok Shop Profit Calculator Module:</strong> Measures net revenue after overhead.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>TikTok Shop Margin Calculator Matrix:</strong> Processes dynamic pricing to ensure high yields.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              How to Execute Calculations Inside the Workspace
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 font-medium">
                1. Enter Product Selling Price
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 font-medium">
                2. Input Fulfillment Costs (Product + Shipping)
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 font-medium">
                3. Define TikTok shop fee calculator commission %
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 font-medium">
                4. Click compute to see tiktok shop profit calculator payout
              </div>
            </div>
          </div>

          {/* FAQs & TikTok Shop Fees Explained */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              FAQs &amp; TikTok Shop Fees Explained
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  q: 'What are TikTok shop fees explained?',
                  a: '5% to 8% referral fee + payment processing + affiliate payouts. Our calculator breaks down every percentage tier.'
                },
                {
                  q: 'How to calculate profit?',
                  a: 'Net Profit = Retail - (COGS + Shipping + Referral + Affiliate). Use tiktok shop margin calculator.'
                },
                {
                  q: 'Can I calculate affiliate commission?',
                  a: 'Yes, tiktok shop commission calculator allows dynamic % from 0% to 30% depending on creator negotiations.'
                },
                {
                  q: 'Why low margin?',
                  a: 'High logistics or tiktok seller calculator affiliate %. Adjust price or optimize fulfillment.'
                },
                {
                  q: 'Is it free?',
                  a: 'Yes, 100% free tiktok shop fee calculator utility for web sellers.'
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

        {/* PAYMENT & SINGLE KEY ACTIVATION MODAL */}
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
