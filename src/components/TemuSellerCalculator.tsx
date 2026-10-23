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
  PackageCheck,
  Globe2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';
import SpecialOfferBanner from './common/SpecialOfferBanner';

// Preserved payment setting for future monetization reactivation
export const PAYONEER_PAYMENT_URL = 'https://link.payoneer.com/Token?t=92EF253542CE4D4DA2F32B91E7DB463F&src=pl';

export type ActiveTab = 'simple' | 'advanced' | 'professional';

export interface TemuCategoryConfig {
  id: string;
  name: string;
  commissionRate: number; // e.g. 8%
}

const TEMU_CATEGORIES: TemuCategoryConfig[] = [
  { id: 'apparel', name: 'Apparel & Fashion (10%)', commissionRate: 10.0 },
  { id: 'home', name: 'Home & Kitchen Essentials (8%)', commissionRate: 8.0 },
  { id: 'electronics', name: 'Consumer Electronics & Gadgets (6%)', commissionRate: 6.0 },
  { id: 'beauty', name: 'Beauty & Personal Care (10%)', commissionRate: 10.0 },
  { id: 'toys', name: 'Toys & Hobbies (9%)', commissionRate: 9.0 },
  { id: 'sports', name: 'Sports & Outdoor Gear (8%)', commissionRate: 8.0 },
  { id: 'surgical', name: 'Medical & Dental Supplies (5%)', commissionRate: 5.0 },
];

export default function TemuSellerCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('temu'));

  // Inputs
  const [sellingPrice, setSellingPrice] = useState<number>(24);
  const [factoryCogs, setFactoryCogs] = useState<number>(6.5);
  const [bulkFreightUnit, setBulkFreightUnit] = useState<number>(2.0);
  const [categoryId, setCategoryId] = useState<string>('apparel');
  const [customsTariffPercent, setCustomsTariffPercent] = useState<number>(3.5);
  const [packagingQcCost, setPackagingQcCost] = useState<number>(0.8);
  const [numUnits, setNumUnits] = useState<number>(1);

  // Modals & Activation
  const [showPayModal, setShowPayModal] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentDeviceId = getHardwareDeviceId();

  // Outputs
  const [temuCommissionFee, setTemuCommissionFee] = useState(0);
  const [customsFee, setCustomsFee] = useState(0);
  const [totalPlatformDeductions, setTotalPlatformDeductions] = useState(0);
  const [netSellerPayout, setNetSellerPayout] = useState(0);
  const [marginPercent, setMarginPercent] = useState(0);
  const [breakEvenPrice, setBreakEvenPrice] = useState(0);

  useEffect(() => {
    const selectedCat = TEMU_CATEGORIES.find(c => c.id === categoryId) || TEMU_CATEGORIES[0];
    const commissionFraction = selectedCat.commissionRate / 100;
    const computedCommission = sellingPrice * commissionFraction;
    const computedCustoms = sellingPrice * (customsTariffPercent / 100);

    const platformFees = computedCommission + computedCustoms;
    const totalUnitCOGS = factoryCogs + bulkFreightUnit + packagingQcCost;
    const totalUnitDeductions = platformFees + totalUnitCOGS;

    const unitNetProfit = sellingPrice - totalUnitDeductions;
    const computedTotalNet = unitNetProfit * numUnits;
    const totalGrossRevenue = sellingPrice * numUnits;
    const computedMargin = totalGrossRevenue > 0 ? (computedTotalNet / totalGrossRevenue) * 100 : 0;

    setTemuCommissionFee(computedCommission * numUnits);
    setCustomsFee(computedCustoms * numUnits);
    setTotalPlatformDeductions(platformFees * numUnits);
    setNetSellerPayout(computedTotalNet);
    setMarginPercent(computedMargin);

    const variableRate = commissionFraction + (customsTariffPercent / 100);
    setBreakEvenPrice(variableRate < 1 ? totalUnitCOGS / (1 - variableRate) : 0);
  }, [sellingPrice, factoryCogs, bulkFreightUnit, categoryId, customsTariffPercent, packagingQcCost, numUnits]);

  const handleActivate = () => {
    const res = activateLicenseKey(licenseKeyInput, 'temu');
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
    const headers = ['Category', 'Selling Price', 'Factory COGS', 'Bulk Freight', 'Packaging/QC', 'Units', 'Temu Commission', 'Customs Tariff', 'Total Deductions', 'Net Payout', 'Margin'];
    const row = [
      categoryId,
      sellingPrice.toFixed(2),
      factoryCogs.toFixed(2),
      bulkFreightUnit.toFixed(2),
      packagingQcCost.toFixed(2),
      numUnits,
      temuCommissionFee.toFixed(2),
      customsFee.toFixed(2),
      totalPlatformDeductions.toFixed(2),
      netSellerPayout.toFixed(2),
      `${marginPercent.toFixed(1)}%`
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `temu_seller_report_${categoryId}.csv`);
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
        <SpecialOfferBanner toolName="Temu Seller Calculator" />

        {/* Master Header Card */}
        <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="apple-badge">
              <PackageCheck className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Temu Manufacturer &amp; Cross-Border Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Temu Seller Calculator: Calculate Temu Fees &amp; Profit
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
              Temu charges commission margins, logistics service fee, transport tariffs. Our temu seller calculator helps manufacturing + cross-border brands evaluate real margins before listing.
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
                <h3 className="font-bold text-sm text-[#1d1d1f]">Manufacturing &amp; Pricing Input</h3>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#86868b]">Product Category:</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="apple-input text-xs py-1"
                  >
                    {TEMU_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Temu Retail Price ($)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Factory Unit Sourcing / COGS ($)</label>
                  <input
                    type="number"
                    value={factoryCogs}
                    onChange={(e) => setFactoryCogs(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Sea / Air Freight to Port ($)</label>
                  <input
                    type="number"
                    value={bulkFreightUnit}
                    onChange={(e) => setBulkFreightUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#86868b] block mb-1">Packaging &amp; Barcode QC ($)</label>
                  <input
                    type="number"
                    value={packagingQcCost}
                    onChange={(e) => setPackagingQcCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="apple-input w-full font-mono text-sm"
                  />
                </div>
              </div>

              {/* Advanced Controls */}
              {activeTab !== 'simple' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">
                    Cross-Border Customs &amp; Bulk Batches
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[#86868b] block mb-1">Import Duty / Customs Tariff %</label>
                      <input
                        type="number"
                        step="0.5"
                        value={customsTariffPercent}
                        onChange={(e) => setCustomsTariffPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="apple-input w-full font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[#86868b] block mb-1">Bulk Carton Volume (Units)</label>
                      <input
                        type="number"
                        min="1"
                        value={numUnits}
                        onChange={(e) => setNumUnits(Math.max(1, parseInt(e.target.value) || 1))}
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
                    const el = document.getElementById('temu-output-summary');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className="apple-calculate-btn py-3.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Temu Fees &amp; Profit</span>
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
                    <h4 className="text-lg font-bold text-[#1d1d1f]">Unlock Temu Pro Suite</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      Enables container CBM mapping, multi-currency Chinese Yuan (CNY) conversion, and offline software.
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

            <div id="temu-output-summary" className="apple-glass-box p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">Live Temu Ledger</span>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Net Seller Payout</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] uppercase block">Carton Batch</span>
                  <span className="font-mono text-sm font-bold text-[#1d1d1f]">{numUnits} Unit{numUnits > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Profit Block */}
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#86868b]">Estimated Net Margin:</span>
                  <span className={`text-2xl sm:text-3xl font-black ${netSellerPayout >= 0 ? 'text-[#0071e3]' : 'text-red-600'}`}>
                    ${netSellerPayout.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#86868b]">Profit Margin Yield:</span>
                  <span className={`font-bold ${marginPercent >= 18 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {marginPercent.toFixed(2)}%
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
                  <span className="apple-metric-label">Temu Category Commission:</span>
                  <span className="apple-metric-val">${temuCommissionFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Cross-Border Customs / Tariffs:</span>
                  <span className="apple-metric-val">${customsFee.toFixed(2)}</span>
                </div>
                <div className="apple-metric-row font-bold text-[#1d1d1f] pt-1">
                  <span>Total Platform Deductions:</span>
                  <span className="text-[#0071e3]">${totalPlatformDeductions.toFixed(2)}</span>
                </div>
              </div>

              {/* Pro Feature Export Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export Temu Ledger (.CSV / .PDF)</span>
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
              Core Algorithmic Architecture
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Seller Calculator System:</strong> Multi-category platform fee estimation framework.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Fee Calculator Engine:</strong> Computes supply chain tariffs and commission margins.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Seller Fee Calculator Grid:</strong> Evaluates wholesale manufacturing vs retail markups.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Profit Calculator Module:</strong> Accurately measures net revenue after shipping logistics.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Commission Calculator Utility:</strong> Maps category rates from 5% to 15% dynamically.</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span><strong>Temu Seller Margin Calculator Framework:</strong> Protects cash flow on bulk overseas orders.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Workflow
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Input bulk manufacturing cost, freight, category index, retail. temu fee calculator shows final payout.
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
                  q: 'How temu seller fee calculator processes commissions?',
                  a: '5% to 15% per category, mapped automatically based on your product classification.'
                },
                {
                  q: 'Is cross-border via temu seller calculator profitable?',
                  a: 'Yes if low-cost manufacturing + calculation are kept in strict alignment.'
                },
                {
                  q: 'Does temu commission calculator need monthly fee?',
                  a: 'Currently no monthly fee, only per-transaction platform commissions.'
                },
                {
                  q: 'How optimize pricing via temu profit calculator?',
                  a: 'Retail must cover COGS + Freight + Commission + Fulfillment to maintain healthy cash reserves.'
                },
                {
                  q: 'Can temu seller margin calculator process multi-currency?',
                  a: 'Yes, converts cross-border costs vs retail across USD, EUR, PKR, and AED.'
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
