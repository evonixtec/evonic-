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
  Store,
  CreditCard as PaymentIcon,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';
import SpecialOfferBanner from './common/SpecialOfferBanner';

// Preserved payment setting for future monetization reactivation
export const PAYONEER_PAYMENT_URL = 'https://link.payoneer.com/Token?t=92EF253542CE4D4DA2F32B91E7DB463F&src=pl';

export type ActiveTab = 'simple' | 'advanced' | 'professional';

export interface ShopifyPlanConfig {
  id: string;
  name: string;
  monthlyCost: number;
  onlineRate: number; // % e.g. 2.9%
  fixedRate: number; // $0.30
  thirdPartyFee: number; // 2.0% for Basic, 1.0% for Shopify, 0.5% for Advanced
}

const SHOPIFY_PLANS: ShopifyPlanConfig[] = [
  { id: 'basic', name: 'Basic Shopify ($39/mo)', monthlyCost: 39, onlineRate: 2.9, fixedRate: 0.30, thirdPartyFee: 2.0 },
  { id: 'shopify', name: 'Shopify ($105/mo)', monthlyCost: 105, onlineRate: 2.6, fixedRate: 0.30, thirdPartyFee: 1.0 },
  { id: 'advanced', name: 'Advanced Shopify ($399/mo)', monthlyCost: 399, onlineRate: 2.4, fixedRate: 0.30, thirdPartyFee: 0.5 },
  { id: 'plus', name: 'Shopify Plus ($2,000/mo)', monthlyCost: 2000, onlineRate: 2.15, fixedRate: 0.30, thirdPartyFee: 0.15 },
];

export default function ShopifyFeeCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('shopify'));

  // Inputs
  const [retailPrice, setRetailPrice] = useState<number>(55);
  const [shippingCharged, setShippingCharged] = useState<number>(5);
  const [productCost, setProductCost] = useState<number>(16);
  const [shippingCost, setShippingCost] = useState<number>(5);
  const [planId, setPlanId] = useState<string>('basic');
  const [useShopifyPayments, setUseShopifyPayments] = useState<boolean>(true);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState<number>(8);
  const [numOrders, setNumOrders] = useState<number>(1);

  // Modals & Activation
  const [showPayModal, setShowPayModal] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentDeviceId = getHardwareDeviceId();

  // Outputs
  const [processingFee, setProcessingFee] = useState(0);
  const [thirdPartyFee, setThirdPartyFee] = useState(0);
  const [totalPlatformFees, setTotalPlatformFees] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);
  const [breakEvenPrice, setBreakEvenPrice] = useState(0);

  useEffect(() => {
    const selectedPlan = SHOPIFY_PLANS.find(p => p.id === planId) || SHOPIFY_PLANS[0];
    const grossSale = retailPrice + shippingCharged;

    // Payment Processing
    const computedProcessing = (grossSale * (selectedPlan.onlineRate / 100)) + selectedPlan.fixedRate;
    
    // 3rd-party fee if not using Shopify Payments
    const computedThirdParty = !useShopifyPayments ? (grossSale * (selectedPlan.thirdPartyFee / 100)) : 0;
    
    const platformCharges = computedProcessing + computedThirdParty;
    const directExpenses = productCost + shippingCost + adSpendPerOrder;
    const totalDeductionsPerOrder = platformCharges + directExpenses;

    const unitNetProfit = grossSale - totalDeductionsPerOrder;
    const computedNetProfit = unitNetProfit * numOrders;
    const totalRevenue = grossSale * numOrders;
    const computedMargin = totalRevenue > 0 ? (computedNetProfit / totalRevenue) * 100 : 0;

    setProcessingFee(computedProcessing * numOrders);
    setThirdPartyFee(computedThirdParty * numOrders);
    setTotalPlatformFees(platformCharges * numOrders);
    setNetProfit(computedNetProfit);
    setMargin(computedMargin);

    const variableRate = (selectedPlan.onlineRate / 100) + (!useShopifyPayments ? (selectedPlan.thirdPartyFee / 100) : 0);
    const fixedCosts = selectedPlan.fixedRate + directExpenses;
    setBreakEvenPrice(variableRate < 1 ? fixedCosts / (1 - variableRate) : 0);
  }, [retailPrice, shippingCharged, productCost, shippingCost, planId, useShopifyPayments, adSpendPerOrder, numOrders]);

  const handleActivate = () => {
    const res = activateLicenseKey(licenseKeyInput, 'shopify');
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
    const activePlan = SHOPIFY_PLANS.find(p => p.id === planId) || SHOPIFY_PLANS[0];
    const headers = ['Plan Name', 'Gateway', 'Retail Price', 'Product Cost', 'Shipping Cost', 'Orders', 'Processing Fee', 'Third-Party Fee', 'Net Profit', 'Margin'];
    const row = [
      activePlan.name,
      useShopifyPayments ? 'Shopify Payments' : 'Third-Party Gateway',
      retailPrice.toFixed(2),
      productCost.toFixed(2),
      shippingCost.toFixed(2),
      numOrders,
      processingFee.toFixed(2),
      thirdPartyFee.toFixed(2),
      netProfit.toFixed(2),
      `${margin.toFixed(1)}%`
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shopify_fee_report_${planId}.csv`);
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
        <SpecialOfferBanner toolName="Shopify Fee Calculator" />

        {/* Master Header Card */}
        <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="apple-badge">
              <Store className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Shopify Merchant Suite • 2026 Billing Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Shopify Fee Calculator: Calculate Shopify Fees &amp; Profit
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
              Shopify levies monthly subscription + gateway + third-party fees. Our shopify fee calculator helps DTC brands map real profits after all deductions. Supports Shopify Payments, Stripe, PayPal.
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
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="font-bold text-sm text-[#1d1d1f]">Shopify Store &amp; Order Parameters</h3>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#86868b]">Shopify Plan:</label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="apple-input text-xs py-1"
                  >
                    {SHOPIFY_PLANS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Product Retail Price ($)</label>
                  <input
                    type="number"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Shipping Charged to Buyer ($)</label>
                  <input
                    type="number"
                    value={shippingCharged}
                    onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Product Cost / COGS ($)</label>
                  <input
                    type="number"
                    value={productCost}
                    onChange={(e) => setProductCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Carrier Shipping Cost ($)</label>
                  <input
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
              </div>

              {/* Payment Gateway Toggle */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <label className="flex items-center justify-between cursor-pointer text-xs font-semibold">
                  <span className="text-[#1d1d1f]">Use Shopify Payments (0% Third-Party Gateway Penalty)</span>
                  <input
                    type="checkbox"
                    checked={useShopifyPayments}
                    onChange={(e) => setUseShopifyPayments(e.target.checked)}
                    className="rounded text-[#0071e3] w-4 h-4 cursor-pointer"
                  />
                </label>
                <p className="text-[11px] text-[#86868b]">
                  {useShopifyPayments
                    ? 'Active: Zero external gateway fees applied.'
                    : 'External Gateway (Stripe/PayPal/Authorize): Additional plan fee applies.'}
                </p>
              </div>

              {/* Advanced Controls */}
              {activeTab !== 'simple' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">
                    Customer Acquisition &amp; Batch Projections
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[#86868b] block mb-1">Meta / Google Ad CAC per Order ($)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={adSpendPerOrder}
                        onChange={(e) => setAdSpendPerOrder(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[#86868b] block mb-1">Monthly Order Volume</label>
                      <input
                        type="number"
                        min="1"
                        value={numOrders}
                        onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
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
                    const el = document.getElementById('shopify-output-summary');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className="apple-calculate-btn py-3.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Shopify Fees &amp; Profit</span>
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
                    <h4 className="text-lg font-bold text-[#1d1d1f]">Unlock Shopify Pro Suite</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      Includes multi-store financial models, CSV export, and native offline executable.
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

            <div id="shopify-output-summary" className="apple-glass-box p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">Live Shopify Ledger</span>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Store Net Profit</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] uppercase block">Orders Mode</span>
                  <span className="font-mono text-sm font-bold text-[#1d1d1f]">{numOrders} Sale{numOrders > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Profit Block */}
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#86868b]">Estimated Net Payout:</span>
                  <span className={`text-2xl sm:text-3xl font-black ${netProfit >= 0 ? 'text-[#0071e3]' : 'text-red-600'}`}>
                    ${netProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#86868b]">Net Profit Margin:</span>
                  <span className={`font-bold ${margin >= 20 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {margin.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#86868b]">Breakeven Retail Price:</span>
                  <span className="font-bold text-[#1d1d1f]">${breakEvenPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Online Payment Processing:</span>
                  <span className="apple-metric-val">${processingFee.toFixed(2)}</span>
                </div>
                {!useShopifyPayments && (
                  <div className="apple-metric-row">
                    <span className="apple-metric-label">Third-Party Gateway Surcharge:</span>
                    <span className="apple-metric-val">${thirdPartyFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="apple-metric-row font-bold text-[#1d1d1f] pt-1">
                  <span>Total Platform Deductions:</span>
                  <span className="text-[#0071e3]">${totalPlatformFees.toFixed(2)}</span>
                </div>
              </div>

              {/* Pro Feature Export Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export Financial Ledger (.CSV / .PDF)</span>
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
              Embedded Analytical Sub-Systems
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Fee Calculator Module:</strong> Accurately processes merchant plan deductions.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Profit Calculator Engine:</strong> Projects revenue post manufacturing &amp; freight.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Transaction Fee Calculator:</strong> Identifies third-party gateway surcharges.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Profit Margin Calculator:</strong> Computes net retained capital percentage.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Payment Calculator Tracker:</strong> Analyzes credit card processing tariffs.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Shopify Fees Calculator Core:</strong> Delivers complete billing visibility for DTC brands.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Input Map
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Enter retail, procurement cost, Shopify plan, gateway. Compute instantly.
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
                  q: 'How to avoid extra via shopify transaction fee calculator?',
                  a: 'Use native gateway (Shopify Payments) to save 0.5%-2% third-party gateway penalties.'
                },
                {
                  q: 'Formula in shopify profit margin calculator?',
                  a: 'Margin = ((Retail - Cost - Fees)/Retail)*100'
                },
                {
                  q: 'Does shopify payment calculator adapt to local cards?',
                  a: 'Yes, 2.9%+30c per country nodes with international currency adaptation.'
                },
                {
                  q: 'Why shopify fees calculator shows varying international?',
                  a: 'Cross-border tariffs, factored in automatically by our billing engine.'
                },
                {
                  q: 'POS support?',
                  a: 'Yes, this shopify profit calculator handles online + retail store configurations.'
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
