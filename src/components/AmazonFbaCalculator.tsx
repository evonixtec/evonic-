import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Lock,
  FileSpreadsheet,
  X,
  Calculator,
  AlertTriangle,
  Package,
  TrendingUp,
  DollarSign,
  Fuel,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { getHardwareDeviceId, activateLicenseKey, isToolUnlocked } from '../lib/licenseSystem';

export type ActiveTab = 'simple' | 'advanced' | 'professional';

export type CurrencyCode = 'USD' | 'GBP' | 'PKR';

export interface FbaCategoryPreset {
  id: string;
  name: string;
  referralRate: number; // %
}

export interface FbaSizeTier {
  id: string;
  name: string;
  fee: number;
  description: string;
}

const FBA_CATEGORIES: FbaCategoryPreset[] = [
  { id: 'standard', name: 'Standard Merchandise (15%)', referralRate: 15.0 },
  { id: 'electronics', name: 'Consumer Electronics (8%)', referralRate: 8.0 },
  { id: 'home', name: 'Home & Kitchen (15%)', referralRate: 15.0 },
  { id: 'apparel', name: 'Apparel & Clothing (17%)', referralRate: 17.0 },
  { id: 'beauty', name: 'Beauty & Personal Care (15%)', referralRate: 15.0 },
  { id: 'grocery', name: 'Grocery & Gourmet (8% - 15%)', referralRate: 10.0 },
  { id: 'device_acc', name: 'Amazon Device Accessories (45%)', referralRate: 45.0 },
  { id: 'books', name: 'Books & Media (15%)', referralRate: 15.0 },
  { id: 'custom', name: 'Custom Category Rate', referralRate: 15.0 },
];

const FBA_SIZE_TIERS: FbaSizeTier[] = [
  { id: 'small_std_regular', name: 'Small Standard ($10 - $50 items)', fee: 3.45, description: 'Under 16 oz, max 15x12x0.75 in' },
  { id: 'small_std_lowprice', name: 'Small Standard (Under $10 Low-Price FBA)', fee: 3.22, description: 'Discounted FBA rate for low-ticket goods' },
  { id: 'large_std_8_12', name: 'Large Standard (8 to 12 oz)', fee: 4.20, description: 'Standard consumer packaged goods' },
  { id: 'large_std_12_16', name: 'Large Standard (12 to 16 oz)', fee: 5.50, description: 'Standard 1 lb items' },
  { id: 'large_std_1_15', name: 'Large Standard (1 to 1.5 lb)', fee: 6.10, description: 'Heavier standard packaged goods' },
  { id: 'oversize_small', name: 'Small Oversize', fee: 9.73, description: 'Up to 70 lb, longest side under 60 in' },
  { id: 'oversize_medium', name: 'Medium Oversize', fee: 14.50, description: 'Bulky cartons and larger goods' },
];

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateFromUsd: number; label: string }> = {
  USD: { symbol: '$', rateFromUsd: 1.0, label: 'USD ($)' },
  GBP: { symbol: '£', rateFromUsd: 0.79, label: 'GBP (£)' },
  PKR: { symbol: 'Rs. ', rateFromUsd: 278.0, label: 'PKR (Rs.)' },
};

export default function AmazonFbaCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simple');
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => isToolUnlocked('amazon'));

  // Currency Switcher
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Core Inputs (defaults aligned with 2026 specs)
  const [salePrice, setSalePrice] = useState<number>(29.99);
  const [cogs, setCogs] = useState<number>(8.00);
  const [inboundFreight, setInboundFreight] = useState<number>(1.50);
  const [categoryId, setCategoryId] = useState<string>('standard');
  const [customReferralRate, setCustomReferralRate] = useState<number>(15.0);
  const [sizeTierId, setSizeTierId] = useState<string>('small_std_regular');

  // 2026 Specific Surcharges & Flags
  const [applyFuelSurcharge, setApplyFuelSurcharge] = useState<boolean>(true); // 3.5%
  const [isPeakSeason, setIsPeakSeason] = useState<boolean>(false); // Oct 15 - Jan 14 (+0.32)
  const [storagePeriod, setStoragePeriod] = useState<'standard' | 'q4_peak'>('standard');
  const [storageAndPlacement, setStorageAndPlacement] = useState<number>(0.45);
  const [isLowInventoryFee, setIsLowInventoryFee] = useState<boolean>(false); // +$0.89 avg
  const [lowInventoryRate, setLowInventoryRate] = useState<number>(0.89);

  // Advanced Inputs
  const [ppcAdSpend, setPpcAdSpend] = useState<number>(3.00);
  const [returnRate, setReturnRate] = useState<number>(2.5); // %
  const [numOrders, setNumOrders] = useState<number>(1);

  // UI helpers
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // HWID & Activation
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState<string>('');
  const [licenseError, setLicenseError] = useState<string>('');
  const [licenseSuccess, setLicenseSuccess] = useState<string>('');

  const currentDeviceId = getHardwareDeviceId();
  const currentCurrency = CURRENCY_RATES[currency];

  // Outputs
  const [effectiveReferralRate, setEffectiveReferralRate] = useState<number>(15.0);
  const [unitReferralFee, setUnitReferralFee] = useState<number>(0);
  const [unitFulfillmentFee, setUnitFulfillmentFee] = useState<number>(0);
  const [unitFuelSurcharge, setUnitFuelSurcharge] = useState<number>(0);
  const [unitPeakFee, setUnitPeakFee] = useState<number>(0);
  const [unitStorageFee, setUnitStorageFee] = useState<number>(0);
  const [unitLowInvFee, setUnitLowInvFee] = useState<number>(0);
  const [totalAmazonFeesPerUnit, setTotalAmazonFeesPerUnit] = useState<number>(0);

  const [unitNetProfit, setUnitNetProfit] = useState<number>(0);
  const [totalNetProfit, setTotalNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [breakEvenAcos, setBreakEvenAcos] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [breakEvenSalePrice, setBreakEvenSalePrice] = useState<number>(0);

  // Calculation effect
  useEffect(() => {
    // 1. Referral fee calculation ($0.30 minimum floor)
    const selectedCat = FBA_CATEGORIES.find((c) => c.id === categoryId) || FBA_CATEGORIES[0];
    const refRate = categoryId === 'custom' ? customReferralRate : selectedCat.referralRate;
    setEffectiveReferralRate(refRate);

    const rawReferral = salePrice * (refRate / 100);
    const calculatedReferral = Math.max(0.30, rawReferral);

    // 2. Base FBA Fulfillment fee
    const selectedTier = FBA_SIZE_TIERS.find((t) => t.id === sizeTierId) || FBA_SIZE_TIERS[0];
    const baseFulfillment = selectedTier.fee;

    // 3. 3.5% Fuel & Logistics Surcharge (introduced April 17, 2026)
    const fuelFee = applyFuelSurcharge ? baseFulfillment * 0.035 : 0;

    // 4. Q4 Peak Season Surcharge (Oct 15, 2026 - Jan 14, 2027 avg +$0.32)
    const peakFee = isPeakSeason ? 0.32 : 0;

    // 5. Monthly Storage & Inbound Placement
    const storageMultiplier = storagePeriod === 'q4_peak' ? 2.40 / 0.78 : 1.0;
    const computedStorage = storageAndPlacement * storageMultiplier;

    // 6. Low Inventory Level Fee
    const lowInvFee = isLowInventoryFee ? lowInventoryRate : 0;

    // Total Amazon deductions per item
    const amazonTotal = calculatedReferral + baseFulfillment + fuelFee + peakFee + computedStorage + lowInvFee;

    // Direct seller costs
    const returnReserve = salePrice * (returnRate / 100);
    const sellerCosts = cogs + inboundFreight + ppcAdSpend + returnReserve;

    // Net profit
    const netPerUnit = salePrice - amazonTotal - sellerCosts;
    const netBatch = netPerUnit * numOrders;

    // Margins and metrics
    const marginPct = salePrice > 0 ? (netPerUnit / salePrice) * 100 : 0;
    const acosPct = marginPct; // Break-even ACoS equals profit margin before PPC if PPC is zeroed, or actual allowable PPC ceiling
    const totalInvested = cogs + inboundFreight + (applyFuelSurcharge ? fuelFee : 0);
    const computedRoi = totalInvested > 0 ? (netPerUnit / totalInvested) * 100 : 0;

    // Break-even sale price formula:
    // SalePrice = (COGS + InboundFreight + PPC + Fulfillment + Fuel + Peak + Storage + LowInv) / (1 - ReferralRate% - ReturnRate%)
    const denominator = 1 - (refRate / 100) - (returnRate / 100);
    const fixedCosts = cogs + inboundFreight + ppcAdSpend + baseFulfillment + fuelFee + peakFee + computedStorage + lowInvFee;
    const computedBreakEven = denominator > 0.05 ? fixedCosts / denominator : 0;

    setUnitReferralFee(calculatedReferral);
    setUnitFulfillmentFee(baseFulfillment);
    setUnitFuelSurcharge(fuelFee);
    setUnitPeakFee(peakFee);
    setUnitStorageFee(computedStorage);
    setUnitLowInvFee(lowInvFee);
    setTotalAmazonFeesPerUnit(amazonTotal);

    setUnitNetProfit(netPerUnit);
    setTotalNetProfit(netBatch);
    setProfitMargin(marginPct);
    setBreakEvenAcos(Math.max(0, acosPct));
    setRoi(computedRoi);
    setBreakEvenSalePrice(computedBreakEven);
  }, [
    salePrice,
    cogs,
    inboundFreight,
    categoryId,
    customReferralRate,
    sizeTierId,
    applyFuelSurcharge,
    isPeakSeason,
    storagePeriod,
    storageAndPlacement,
    isLowInventoryFee,
    lowInventoryRate,
    ppcAdSpend,
    returnRate,
    numOrders,
  ]);

  // Format currency
  const fmt = (valInUsd: number) => {
    const converted = valInUsd * currentCurrency.rateFromUsd;
    if (currency === 'PKR') {
      return `${currentCurrency.symbol}${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  // Quick preset loader
  const loadPreset = (presetType: 'low_price' | 'standard_pl' | 'q4_rush' | 'heavy_oversize') => {
    if (presetType === 'low_price') {
      setSalePrice(9.99);
      setCogs(2.50);
      setInboundFreight(0.80);
      setCategoryId('standard');
      setSizeTierId('small_std_lowprice');
      setIsPeakSeason(false);
      setStoragePeriod('standard');
      setIsLowInventoryFee(false);
      setPpcAdSpend(1.00);
    } else if (presetType === 'standard_pl') {
      setSalePrice(29.99);
      setCogs(8.00);
      setInboundFreight(1.50);
      setCategoryId('standard');
      setSizeTierId('large_std_8_12');
      setIsPeakSeason(false);
      setStoragePeriod('standard');
      setIsLowInventoryFee(false);
      setPpcAdSpend(3.50);
    } else if (presetType === 'q4_rush') {
      setSalePrice(39.99);
      setCogs(11.00);
      setInboundFreight(2.00);
      setCategoryId('home');
      setSizeTierId('large_std_12_16');
      setIsPeakSeason(true);
      setStoragePeriod('q4_peak');
      setIsLowInventoryFee(false);
      setPpcAdSpend(5.00);
    } else if (presetType === 'heavy_oversize') {
      setSalePrice(89.99);
      setCogs(26.00);
      setInboundFreight(6.50);
      setCategoryId('home');
      setSizeTierId('oversize_small');
      setIsPeakSeason(true);
      setStoragePeriod('q4_peak');
      setIsLowInventoryFee(true);
      setPpcAdSpend(9.00);
    }
  };

  const handleCopySummary = () => {
    const summaryText = `Amazon FBA Fee Breakdown 2026:
Sale Price: ${fmt(salePrice)}
Referral Fee (${effectiveReferralRate}%): ${fmt(unitReferralFee)}
FBA Pick & Pack: ${fmt(unitFulfillmentFee)}
Fuel Surcharge (3.5%): ${fmt(unitFuelSurcharge)}
Q4 Peak Fee: ${fmt(unitPeakFee)}
Storage & Placement: ${fmt(unitStorageFee)}
Total Amazon Fees: ${fmt(totalAmazonFeesPerUnit)}
Net Profit: ${fmt(unitNetProfit)} (${profitMargin.toFixed(1)}%)
Break-Even ACoS: ${breakEvenAcos.toFixed(1)}%
Calculated via EVONIX Technologies: https://www.evonixtec.com/amazon-fba-fee-calculator`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (!isProUnlocked) {
      setShowPayModal(true);
      return;
    }
    const headers = [
      'Sale Price (USD)',
      'COGS (USD)',
      'Inbound Freight',
      'Category Rate %',
      'Referral Fee',
      'Fulfillment Fee',
      'Fuel Surcharge 3.5%',
      'Peak Surcharge',
      'Storage Fee',
      'Total Amazon Fees',
      'Net Profit Per Unit',
      'Profit Margin %',
      'Break-even ACoS %',
    ];
    const row = [
      salePrice.toFixed(2),
      cogs.toFixed(2),
      inboundFreight.toFixed(2),
      `${effectiveReferralRate}%`,
      unitReferralFee.toFixed(2),
      unitFulfillmentFee.toFixed(2),
      unitFuelSurcharge.toFixed(2),
      unitPeakFee.toFixed(2),
      unitStorageFee.toFixed(2),
      totalAmazonFeesPerUnit.toFixed(2),
      unitNetProfit.toFixed(2),
      `${profitMargin.toFixed(1)}%`,
      `${breakEvenAcos.toFixed(1)}%`,
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `amazon_fba_fee_2026_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <>
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the Amazon FBA fee in 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In 2026, Amazon FBA fee includes category referral fee (8% to 45%, min $0.30), size-tier pick and pack fee ($3.22 to $5.50+), a 3.5% fuel surcharge on fulfillment, and Q4 peak surcharges ($0.32 avg).',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 3.5% fuel surcharge on Amazon FBA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Amazon applies a 3.5% fuel and logistics surcharge on top of standard FBA fulfillment fees to account for rising carrier freight and diesel costs.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Amazon Q4 peak season fulfillment fee?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Between Oct 15, 2026 and Jan 14, 2027, Amazon charges an additional holiday peak surcharge averaging +$0.32 per standard unit, along with higher cubic-foot storage rates ($2.40/cu ft).',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I calculate break-even ACoS for Amazon PPC?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Break-even ACoS equals your Net Profit Margin percentage before ad spend. If your margin is 28%, you can spend up to 28% of your sale price on ads without losing money.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Amazon low-inventory-level fee?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Amazon charges between $0.32 and $2.09 per unit if your inventory consistently falls below 28 days of historical supply relative to sales velocity.',
                },
              },
            ],
          }),
        }}
      />

      <div className="py-8 sm:py-12 bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                2026 Amazon Fee Rate Schedule Active
              </span>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                Includes 3.5% fuel &amp; logistics surcharge, Q4 peak holiday rates (Oct 15 - Jan 14), and low-inventory tiers.
              </p>
            </div>
          </div>

          {/* Master Heading Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0071e3] text-xs font-bold">
                <Package className="w-3.5 h-3.5" />
                <span>2026 Amazon FBA Fee Schedule</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                Amazon FBA Fee Calculator 2026 - Profit, Referral, Fulfillment + Fuel Surcharge
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                2026 ke latest Amazon fee schedule ke mutabiq. Q4 Peak Season (Oct 15, 2026 - Jan 14, 2027) aur Fuel Surcharge 3.5% included hai.
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <div className="space-y-1 text-left md:text-right">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Currency Switcher</span>
                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                  {(['USD', 'GBP', 'PKR'] as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setCurrency(cur)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === cur
                          ? 'bg-[#0071e3] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cur === 'USD' ? '$ USD' : cur === 'GBP' ? '£ GBP' : 'Rs. PKR'}
                    </button>
                  ))}
                </div>
              </div>

              {/* HWID & Pro Status */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  ID: {currentDeviceId.slice(0, 8)}
                </span>
                {isProUnlocked ? (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Pro Active
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPayModal(true)}
                    className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#0071e3] hover:bg-blue-600 text-white cursor-pointer transition-colors shadow-xs"
                  >
                    $20 Lifetime Key
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Presets Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">Quick Presets:</span>
            <button
              type="button"
              onClick={() => loadPreset('low_price')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 font-semibold text-slate-700 cursor-pointer flex-shrink-0 transition-colors"
            >
              Under $10 Low-Price FBA
            </button>
            <button
              type="button"
              onClick={() => loadPreset('standard_pl')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 font-semibold text-slate-700 cursor-pointer flex-shrink-0 transition-colors"
            >
              Standard $29.99 Private Label
            </button>
            <button
              type="button"
              onClick={() => loadPreset('q4_rush')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 font-semibold text-slate-700 cursor-pointer flex-shrink-0 transition-colors"
            >
              Q4 Holiday Rush (+$0.32 Peak)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('heavy_oversize')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 font-semibold text-slate-700 cursor-pointer flex-shrink-0 transition-colors"
            >
              Oversize Bulky Box
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('simple')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'simple' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simple Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('advanced')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'advanced' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Advanced Mode (PPC &amp; Storage)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('professional')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'professional' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pro Suite &amp; CSV</span>
            </button>
          </div>

          {/* WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            
            {/* Left Column: Form Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div id="fba-calculator-root" className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#0071e3]" />
                    <span>Product &amp; Fee Parameters</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">All inputs in USD ($)</span>
                </div>

                {/* Primary Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Sale Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">$</span>
                      <input
                        id="salePrice"
                        type="number"
                        step="0.5"
                        min="0"
                        value={salePrice}
                        onChange={(e) => setSalePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:bg-white focus:border-[#0071e3] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Product Cost / COGS ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">$</span>
                      <input
                        id="cogs"
                        type="number"
                        step="0.5"
                        min="0"
                        value={cogs}
                        onChange={(e) => setCogs(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:bg-white focus:border-[#0071e3] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Inbound Freight to Amazon ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">$</span>
                      <input
                        id="inboundFreight"
                        type="number"
                        step="0.25"
                        min="0"
                        value={inboundFreight}
                        onChange={(e) => setInboundFreight(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:bg-white focus:border-[#0071e3] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Category Referral %
                    </label>
                    <select
                      id="referralRate"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0071e3] focus:outline-hidden cursor-pointer"
                    >
                      {FBA_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {categoryId === 'custom' && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-blue-900">Enter Custom Referral %:</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="60"
                      value={customReferralRate}
                      onChange={(e) => setCustomReferralRate(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-24 px-3 py-1 bg-white border border-blue-300 rounded-lg text-sm font-mono text-right"
                    />
                  </div>
                )}

                {/* Size Tier Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    FBA Size Tier &amp; Fulfillment Fee
                  </label>
                  <select
                    id="sizeTier"
                    value={sizeTierId}
                    onChange={(e) => setSizeTierId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0071e3] focus:outline-hidden cursor-pointer"
                  >
                    {FBA_SIZE_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.name} — ${tier.fee.toFixed(2)} ({tier.description})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2026 Surcharges Section */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-blue-600" />
                      <span>2026 Surcharges &amp; Storage Rules</span>
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      April 17 Surcharge
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Fuel Surcharge Checkbox */}
                    <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={applyFuelSurcharge}
                        onChange={(e) => setApplyFuelSurcharge(e.target.checked)}
                        className="mt-0.5 rounded text-[#0071e3] focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <span className="font-semibold text-slate-800 block">3.5% Fuel Surcharge</span>
                        <span className="text-slate-500 text-[11px] leading-tight block">
                          Applied on fulfillment fee (+${(unitFulfillmentFee * 0.035).toFixed(2)})
                        </span>
                      </div>
                    </label>

                    {/* Q4 Peak Surcharge Checkbox */}
                    <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={isPeakSeason}
                        onChange={(e) => setIsPeakSeason(e.target.checked)}
                        className="mt-0.5 rounded text-[#0071e3] focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <span className="font-semibold text-slate-800 block">Q4 Peak Season (+${(0.32).toFixed(2)})</span>
                        <span className="text-slate-500 text-[11px] leading-tight block">
                          Oct 15, 2026 – Jan 14, 2027 fee
                        </span>
                      </div>
                    </label>

                    {/* Storage Period */}
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <label className="font-semibold text-slate-800 block mb-1">Storage Season Rate</label>
                      <select
                        value={storagePeriod}
                        onChange={(e) => setStoragePeriod(e.target.value as 'standard' | 'q4_peak')}
                        className="w-full p-1 bg-slate-50 border border-slate-200 rounded text-xs"
                      >
                        <option value="standard">Jan – Sep ($0.78 / cu ft)</option>
                        <option value="q4_peak">Oct – Dec Q4 ($2.40 / cu ft)</option>
                      </select>
                    </div>

                    {/* Low Inventory Level Fee Toggle */}
                    <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={isLowInventoryFee}
                        onChange={(e) => setIsLowInventoryFee(e.target.checked)}
                        className="mt-0.5 rounded text-[#0071e3] focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <span className="font-semibold text-slate-800 block">Low Inventory Fee (+${lowInventoryRate.toFixed(2)})</span>
                        <span className="text-slate-500 text-[11px] leading-tight block">
                          Applies if stock &lt; 28 days
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Advanced Tab Inputs */}
                {activeTab !== 'simple' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Advanced Advertising &amp; Batch Metrics
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-slate-600 block mb-1">PPC Ad Spend / Unit ($)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={ppcAdSpend}
                          onChange={(e) => setPpcAdSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600 block mb-1">Customer Return %</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={returnRate}
                          onChange={(e) => setReturnRate(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600 block mb-1">Batch Units Count</label>
                        <input
                          type="number"
                          min="1"
                          value={numOrders}
                          onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('amazon-fba-output-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0071e3] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Amazon FBA Fees &amp; Profit</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Ledger & Summary (5 cols) */}
            <div id="amazon-fba-output-panel" className="lg:col-span-5 relative">
              
              {/* Paywall Overlay for Pro Tab */}
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
                      <h4 className="text-lg font-bold text-slate-900">Unlock Amazon FBA Pro Suite</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Enables CSV ledger exports, bulk batch profit simulators, and offline desktop unlock.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPayModal(true)}
                      className="w-full py-3 rounded-xl bg-[#0071e3] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Unlock for $20
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                      2026 Net Payout Ledger
                    </span>
                    <h3 className="text-xl font-black text-slate-900">Seller Earnings</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">Batch</span>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {numOrders} Unit{numOrders > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Primary Profit Block */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-600">Net Profit Per Unit:</span>
                    <span
                      className={`text-2xl sm:text-3xl font-black ${
                        unitNetProfit >= 0 ? 'text-[#0071e3]' : 'text-red-600'
                      }`}
                    >
                      {fmt(unitNetProfit)}
                    </span>
                  </div>

                  {numOrders > 1 && (
                    <div className="flex items-baseline justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="text-slate-600">Total Batch Net Profit:</span>
                      <span
                        className={`font-black font-mono ${
                          totalNetProfit >= 0 ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        {fmt(totalNetProfit)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <span className="text-slate-600">Net Profit Margin:</span>
                    <span
                      className={`font-bold ${
                        profitMargin >= 20
                          ? 'text-emerald-700'
                          : profitMargin >= 10
                          ? 'text-blue-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {profitMargin.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Break-even ACoS (PPC Ceiling):</span>
                    <span className="font-mono font-bold text-slate-900">
                      {breakEvenAcos.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Estimated ROI:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {roi.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Break-even Sale Price:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {fmt(breakEvenSalePrice)}
                    </span>
                  </div>
                </div>

                {/* Deductions Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Referral Fee ({effectiveReferralRate}%):</span>
                    <span className="font-mono font-semibold text-slate-900">{fmt(unitReferralFee)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">FBA Fulfillment (Pick &amp; Pack):</span>
                    <span className="font-mono font-semibold text-slate-900">{fmt(unitFulfillmentFee)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-1">
                      <span>Fuel Surcharge (3.5%):</span>
                      <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded">2026</span>
                    </span>
                    <span className="font-mono font-semibold text-blue-700">{fmt(unitFuelSurcharge)}</span>
                  </div>
                  {isPeakSeason && (
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Q4 Peak Season Surcharge:</span>
                      <span className="font-mono font-semibold text-amber-700">{fmt(unitPeakFee)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Storage &amp; Inbound Placement:</span>
                    <span className="font-mono font-semibold text-slate-900">{fmt(unitStorageFee)}</span>
                  </div>
                  {isLowInventoryFee && (
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Low Inventory Level Fee:</span>
                      <span className="font-mono font-semibold text-amber-700">{fmt(unitLowInvFee)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 font-bold text-slate-900 bg-slate-50 px-2 rounded-lg">
                    <span>Total Amazon Fees:</span>
                    <span className="font-mono text-red-600">{fmt(totalAmazonFeesPerUnit)}</span>
                  </div>
                </div>

                {/* CSV Export Button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0071e3]" />
                  <span>Export FBA Ledger (.CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              PART 6 SEO CONTENT SECTION - VERBATIM H1/H2 TAGS & FAQ
             ======================================================== */}
          <section className="bg-white rounded-2xl p-6 sm:p-10 space-y-8 border border-slate-200 shadow-sm text-slate-900">
            
            {/* H2 1: Amazon Referral Fee Schedule 2026 */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Amazon Referral Fee Schedule 2026
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Amazon charges a referral fee on every item sold. Most product categories carry a standard 15% rate, with a universal $0.30 minimum fee per unit.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consumer electronics remain at 8%, while device accessories range up to 45%. Knowing your category percentage prevents costly pricing mistakes.
              </p>
            </div>

            {/* H2 2: FBA Fulfillment Fees & 3.5% Fuel Surcharge */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                FBA Fulfillment Fees &amp; 3.5% Fuel Surcharge
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fulfillment fees cover pick, pack, shipping, and customer support. Starting April 17, 2026, Amazon applied a 3.5% fuel and logistics surcharge on all fulfillment rates.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Small standard goods under $10 enjoy low-price FBA rates at $3.22. Standard items between $10 and $50 start at $3.45 to $5.50 based on shipping weight.
              </p>
            </div>

            {/* H2 3: Seller Profitability Factors (Peak Season & Storage) */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Seller Profitability Factors (Peak Season &amp; Storage)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                During the Q4 holiday window from Oct 15, 2026 to Jan 14, 2027, Amazon adds an average peak fee of $0.32 per unit. Monthly storage also triples from $0.78 to $2.40 per cubic foot.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Maintain at least 28 days of inventory supply to prevent low-inventory penalties. Keep fast turn rates to protect your cash flow.
              </p>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2.5">
                {[
                  {
                    q: 'What is the Amazon FBA fee in 2026?',
                    a: 'In 2026, Amazon FBA fee includes category referral fee (8% to 45%, min $0.30), size-tier pick & pack fee ($3.22 to $5.50+), a 3.5% fuel surcharge on fulfillment, and Q4 peak surcharges ($0.32 avg).',
                  },
                  {
                    q: 'What is the 3.5% fuel surcharge on Amazon FBA?',
                    a: 'Amazon applies a 3.5% fuel and logistics surcharge on top of standard FBA fulfillment fees to account for rising carrier freight and diesel costs.',
                  },
                  {
                    q: 'What is Amazon Q4 peak season fulfillment fee?',
                    a: 'Between Oct 15, 2026 and Jan 14, 2027, Amazon charges an additional holiday peak surcharge averaging +$0.32 per standard unit, along with higher cubic-foot storage rates ($2.40/cu ft).',
                  },
                  {
                    q: 'How do I calculate break-even ACoS for Amazon PPC?',
                    a: 'Break-even ACoS equals your Net Profit Margin percentage before ad spend. If your margin is 28%, you can spend up to 28% of your sale price on ads without losing money.',
                  },
                  {
                    q: 'What is the Amazon low-inventory-level fee?',
                    a: 'Amazon charges between $0.32 and $2.09 per unit if your inventory consistently falls below 28 days of historical supply relative to sales velocity.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-900 cursor-pointer hover:bg-slate-100"
                    >
                      <span>Q{idx + 1}: {item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeFaq === idx ? 'rotate-180 text-[#0071e3]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Snippet */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-blue-900 block">Got a question? Call us. We reply in 2 hours.</span>
                <span className="text-xs text-blue-700">Doorstep IT consultancy &amp; cross-border seller assistance.</span>
              </div>
              <a
                href="tel:+923263244002"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0071e3] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+92 326 324 4002</span>
              </a>
            </div>
          </section>

          {/* $20 License Modal */}
          {showPayModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0071e3] flex items-center justify-center font-bold">
                      🔑
                    </div>
                    <h3 className="font-bold text-base text-slate-900">Single License Key Activation</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="text-slate-500 block font-medium">Your Hardware Device ID (HWID):</span>
                    <span className="font-mono font-bold text-[#0071e3] block">{currentDeviceId}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-900 block">Enter License Key</label>
                    <input
                      type="text"
                      placeholder="EVONIC-PRO-XXXX-YYYY"
                      value={licenseKeyInput}
                      onChange={(e) => setLicenseKeyInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm uppercase focus:bg-white focus:border-[#0071e3] focus:outline-hidden"
                    />
                    {licenseError && <p className="text-xs text-red-600 font-medium">{licenseError}</p>}
                    {licenseSuccess && <p className="text-xs text-emerald-600 font-medium">{licenseSuccess}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleActivate}
                    className="w-full py-3 bg-[#0071e3] hover:bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
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
                      Don&apos;t have a key? Buy $20 Lifetime License via Payoneer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
