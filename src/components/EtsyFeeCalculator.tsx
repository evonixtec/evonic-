import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  RefreshCw,
  Copy,
  Check,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  Globe,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Percent,
  Download,
  Share2,
  Building2,
  Truck,
  Sparkles,
  Layers,
  ArrowUpRight,
  Info
} from 'lucide-react';
import SpecialOfferBanner from './common/SpecialOfferBanner';

export type EtsyCurrency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'PKR' | 'INR';

export type SellerCountry = 'US' | 'UK' | 'CA' | 'AU' | 'DE' | 'PK' | 'IN';

interface CountryPreset {
  name: string;
  currency: EtsyCurrency;
  paymentPercent: number;
  paymentFixed: number; // in local currency
  regulatoryRate: number; // e.g. 0.32%
  vatOnFeesRate: number; // e.g. 20%
}

const COUNTRY_PRESETS: Record<SellerCountry, CountryPreset> = {
  US: { name: 'United States', currency: 'USD', paymentPercent: 3.0, paymentFixed: 0.25, regulatoryRate: 0.0, vatOnFeesRate: 0.0 },
  UK: { name: 'United Kingdom', currency: 'GBP', paymentPercent: 4.0, paymentFixed: 0.20, regulatoryRate: 0.32, vatOnFeesRate: 20.0 },
  CA: { name: 'Canada', currency: 'CAD', paymentPercent: 3.0, paymentFixed: 0.25, regulatoryRate: 0.0, vatOnFeesRate: 13.0 },
  AU: { name: 'Australia', currency: 'AUD', paymentPercent: 3.0, paymentFixed: 0.25, regulatoryRate: 0.0, vatOnFeesRate: 10.0 },
  DE: { name: 'Germany (EU)', currency: 'EUR', paymentPercent: 4.0, paymentFixed: 0.30, regulatoryRate: 0.40, vatOnFeesRate: 19.0 },
  PK: { name: 'Pakistan (Payoneer)', currency: 'USD', paymentPercent: 4.5, paymentFixed: 0.30, regulatoryRate: 0.0, vatOnFeesRate: 0.0 },
  IN: { name: 'India (Etsy Payments)', currency: 'INR', paymentPercent: 4.5, paymentFixed: 25.0, regulatoryRate: 0.0, vatOnFeesRate: 18.0 }
};

const CURRENCY_SYMBOLS: Record<EtsyCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  PKR: 'Rs ',
  INR: '₹'
};

const DEFAULT_RATES: Record<EtsyCurrency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.39,
  AUD: 1.52,
  PKR: 279.5,
  INR: 84.1
};

export const EtsyFeeCalculator: React.FC = () => {
  // Language State
  const [lang, setLang] = useState<'en' | 'ur'>('en');

  // Input States
  const [sellerCountry, setSellerCountry] = useState<SellerCountry>('PK');
  const [currency, setCurrency] = useState<EtsyCurrency>('USD');
  const [itemPrice, setItemPrice] = useState<number>(45.0);
  const [shippingCharged, setShippingCharged] = useState<number>(10.0);
  const [itemCost, setItemCost] = useState<number>(12.0);
  const [actualShippingCost, setActualShippingCost] = useState<number>(14.0);
  const [quantity, setQuantity] = useState<number>(1);

  // Settings & Toggles
  const [listingFeePerItem] = useState<number>(0.20); // $0.20 fixed listing fee
  const [transactionRate] = useState<number>(6.5); // 6.5% standard Etsy transaction fee
  const [paymentPercent, setPaymentPercent] = useState<number>(4.5);
  const [paymentFixed, setPaymentFixed] = useState<number>(0.30);
  const [applyRegulatory, setApplyRegulatory] = useState<boolean>(false);
  const [regulatoryRate, setRegulatoryRate] = useState<number>(0.0);
  const [applyVatOnFees, setApplyVatOnFees] = useState<boolean>(false);
  const [vatOnFeesRate, setVatOnFeesRate] = useState<number>(0.0);
  const [offsiteAdsMode, setOffsiteAdsMode] = useState<'none' | '12' | '15'>('15');
  const [isEtsyPlus, setIsEtsyPlus] = useState<boolean>(false); // $10/month subscription

  // Cross-Border Payoneer Deductions Toggle
  const [enablePayoneer, setEnablePayoneer] = useState<boolean>(true);
  const [payoneerInflowRate, setPayoneerInflowRate] = useState<number>(0.5); // 0.5% inflow fee
  const [payoneerFxSpread, setPayoneerFxSpread] = useState<number>(2.0); // 2.0% FX markup
  const [payoneerFlatWireFee, setPayoneerFlatWireFee] = useState<number>(1.50); // $1.50 per transfer

  // Live Exchange Rates
  const [rates, setRates] = useState<Record<EtsyCurrency, number>>(DEFAULT_RATES);
  const [ratesUpdated, setRatesUpdated] = useState<string>('Cached Rates');
  const [isFetchingRates, setIsFetchingRates] = useState<boolean>(false);

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // 1. Fetch live currency rates with fallback
  useEffect(() => {
    const fetchLiveRates = async () => {
      setIsFetchingRates(true);
      try {
        const cached = localStorage.getItem('evonix_etsy_rates');
        const cachedTime = localStorage.getItem('evonix_etsy_rates_time');

        if (cached && cachedTime && Date.now() - Number(cachedTime) < 1000 * 60 * 60 * 6) {
          setRates(JSON.parse(cached));
          setRatesUpdated('Live Updated (Cache)');
          setIsFetchingRates(false);
          return;
        }

        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates) {
            const fetched: Record<EtsyCurrency, number> = {
              USD: 1.0,
              EUR: data.rates.EUR || DEFAULT_RATES.EUR,
              GBP: data.rates.GBP || DEFAULT_RATES.GBP,
              CAD: data.rates.CAD || DEFAULT_RATES.CAD,
              AUD: data.rates.AUD || DEFAULT_RATES.AUD,
              PKR: data.rates.PKR || DEFAULT_RATES.PKR,
              INR: data.rates.INR || DEFAULT_RATES.INR
            };
            setRates(fetched);
            localStorage.setItem('evonix_etsy_rates', JSON.stringify(fetched));
            localStorage.setItem('evonix_etsy_rates_time', String(Date.now()));
            setRatesUpdated('Live Exchange (Active)');
          }
        }
      } catch (e) {
        setRatesUpdated('Offline Standard Fallback');
      } finally {
        setIsFetchingRates(false);
      }
    };

    fetchLiveRates();
  }, []);

  // Update preset when country changes
  const handleCountryChange = (c: SellerCountry) => {
    setSellerCountry(c);
    const preset = COUNTRY_PRESETS[c];
    setPaymentPercent(preset.paymentPercent);
    setPaymentFixed(preset.paymentFixed);
    setRegulatoryRate(preset.regulatoryRate);
    setApplyRegulatory(preset.regulatoryRate > 0);
    setVatOnFeesRate(preset.vatOnFeesRate);
    setApplyVatOnFees(preset.vatOnFeesRate > 0);
    if (c === 'PK') {
      setEnablePayoneer(true);
      setCurrency('USD');
    } else {
      setCurrency(preset.currency);
    }
  };

  // Convert USD to currently selected currency
  const convertFromUsd = (valInUsd: number): number => {
    const rate = rates[currency] || 1.0;
    return valInUsd * rate;
  };

  const convertToUsd = (valInCurr: number): number => {
    const rate = rates[currency] || 1.0;
    return rate > 0 ? valInCurr / rate : valInCurr;
  };

  const sym = CURRENCY_SYMBOLS[currency];

  const fmt = (val: number, digits = 2) => {
    return `${sym}${val.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  };

  const fmtPkr = (valInUsd: number) => {
    const pkrVal = valInUsd * (rates.PKR || 279.5);
    return `Rs ${Math.round(pkrVal).toLocaleString('en-US')}`;
  };

  // 2. Precise Calculations Engine
  const calculations = useMemo(() => {
    const totalOrderRevenue = (itemPrice + shippingCharged) * quantity;
    const totalItemProductionCost = itemCost * quantity;
    const totalRealShippingCost = actualShippingCost * quantity;
    const totalCogs = totalItemProductionCost + totalRealShippingCost;

    // A. Etsy Listing Fee: $0.20 per unit renewed
    const listingFeeUsd = listingFeePerItem * quantity;
    const listingFee = convertFromUsd(listingFeeUsd);

    // B. Etsy Transaction Fee: 6.5% on (Price + Shipping Charged)
    const transactionFee = totalOrderRevenue * (transactionRate / 100);

    // C. Payment Processing Fee: % + Fixed
    const paymentFee = totalOrderRevenue * (paymentPercent / 100) + (paymentFixed * quantity);

    // D. Regulatory Operating Fee: Applied to Price + Shipping in UK/EU
    const regulatoryFee = applyRegulatory ? totalOrderRevenue * (regulatoryRate / 100) : 0;

    // E. Offsite Ads Fee: 12% or 15% with OFFICIAL $100 ORDER CAP ENFORCEMENT
    let offsiteRateNum = 0;
    if (offsiteAdsMode === '12') offsiteRateNum = 12;
    if (offsiteAdsMode === '15') offsiteRateNum = 15;

    let offsiteFeeRaw = totalOrderRevenue * (offsiteRateNum / 100);
    // Official Etsy $100 cap per order in USD:
    const capInCurr = convertFromUsd(100);
    const isOffsiteCapped = offsiteFeeRaw > capInCurr;
    const offsiteFee = isOffsiteCapped ? capInCurr : offsiteFeeRaw;

    // Subtotal of base Etsy fees before VAT
    const baseEtsyFees = listingFee + transactionFee + paymentFee + regulatoryFee + offsiteFee;

    // F. VAT on Seller Fees
    const vatOnFees = applyVatOnFees ? baseEtsyFees * (vatOnFeesRate / 100) : 0;

    // Total Etsy Deductions
    const totalEtsyFees = baseEtsyFees + vatOnFees;

    // Gross Etsy Payout (Money sent from Etsy to seller account)
    const grossEtsyPayout = Math.max(0, totalOrderRevenue - totalEtsyFees);

    // G. Cross-Border Payoneer Deductions (Inflow + FX Spread + Wire Fee)
    const grossPayoutInUsd = convertToUsd(grossEtsyPayout);
    let payoneerInflowFeeUsd = 0;
    let payoneerFxSpreadUsd = 0;
    let payoneerWireFeeUsd = 0;
    let totalPayoneerDeductionsUsd = 0;
    let netBankDepositUsd = grossPayoutInUsd;

    if (enablePayoneer && grossPayoutInUsd > 0) {
      payoneerInflowFeeUsd = grossPayoutInUsd * (payoneerInflowRate / 100);
      payoneerFxSpreadUsd = grossPayoutInUsd * (payoneerFxSpread / 100);
      payoneerWireFeeUsd = Math.min(grossPayoutInUsd, payoneerFlatWireFee);
      totalPayoneerDeductionsUsd = payoneerInflowFeeUsd + payoneerFxSpreadUsd + payoneerWireFeeUsd;
      netBankDepositUsd = Math.max(0, grossPayoutInUsd - totalPayoneerDeductionsUsd);
    }

    const netBankDeposit = convertFromUsd(netBankDepositUsd);
    const totalPayoneerDeductions = convertFromUsd(totalPayoneerDeductionsUsd);

    // Final Net Take-Home Profit
    const netProfit = netBankDeposit - totalCogs;
    const profitMargin = totalOrderRevenue > 0 ? (netProfit / totalOrderRevenue) * 100 : 0;
    const roi = totalCogs > 0 ? (netProfit / totalCogs) * 100 : 0;

    // Total fee percentage taken by all intermediaries
    const totalIntermediaryCut = totalEtsyFees + totalPayoneerDeductions;
    const totalIntermediaryPercent = totalOrderRevenue > 0 ? (totalIntermediaryCut / totalOrderRevenue) * 100 : 0;

    // Shipping Leakage Detection
    const shippingLeakage = totalRealShippingCost - (shippingCharged * quantity);
    const hasShippingLeakage = shippingLeakage > 0.05;

    // Offsite Ads Stress Test Comparison (Normal vs 15% Ads)
    const normalFeesWithoutAds = totalEtsyFees - offsiteFee - (applyVatOnFees ? offsiteFee * (vatOnFeesRate / 100) : 0);
    const profitWithoutAds = Math.max(0, totalOrderRevenue - normalFeesWithoutAds - totalPayoneerDeductions - totalCogs);
    const adsProfitReduction = profitWithoutAds - netProfit;

    // Reverse-Solved Target Price Matrix (for 20%, 35%, 50% net margins)
    // Formula: Revenue * (1 - TotalVariableRate) = TotalFixedCosts + TargetProfit
    // VariableRate = (Transaction% + Payment% + Regulatory% + OffsiteAds% + PayoneerInflow% + FX%)
    const varRateTotal =
      (transactionRate / 100) +
      (paymentPercent / 100) +
      (applyRegulatory ? regulatoryRate / 100 : 0) +
      (offsiteRateNum / 100) +
      (enablePayoneer ? (payoneerInflowRate + payoneerFxSpread) / 100 : 0);

    const fixedFees = listingFee + (paymentFixed * quantity) + (enablePayoneer ? convertFromUsd(payoneerFlatWireFee) : 0);

    const solvePriceForMargin = (targetMarginPercent: number) => {
      const denom = 1 - varRateTotal - (targetMarginPercent / 100);
      if (denom <= 0.05) return 0;
      const requiredRevenue = (totalCogs + fixedFees) / denom;
      const targetItemPrice = (requiredRevenue / quantity) - shippingCharged;
      return Math.max(0, targetItemPrice);
    };

    const targetPrice20 = solvePriceForMargin(20);
    const targetPrice35 = solvePriceForMargin(35);
    const targetPrice50 = solvePriceForMargin(50);

    return {
      totalOrderRevenue,
      totalCogs,
      listingFee,
      transactionFee,
      paymentFee,
      regulatoryFee,
      offsiteFee,
      isOffsiteCapped,
      vatOnFees,
      totalEtsyFees,
      grossEtsyPayout,
      payoneerInflowFeeUsd,
      payoneerFxSpreadUsd,
      payoneerWireFeeUsd,
      totalPayoneerDeductions,
      netBankDeposit,
      netBankDepositUsd,
      netProfit,
      profitMargin,
      roi,
      totalIntermediaryCut,
      totalIntermediaryPercent,
      shippingLeakage,
      hasShippingLeakage,
      profitWithoutAds,
      adsProfitReduction,
      targetPrice20,
      targetPrice35,
      targetPrice50
    };
  }, [
    itemPrice,
    shippingCharged,
    itemCost,
    actualShippingCost,
    quantity,
    listingFeePerItem,
    transactionRate,
    paymentPercent,
    paymentFixed,
    applyRegulatory,
    regulatoryRate,
    applyVatOnFees,
    vatOnFeesRate,
    offsiteAdsMode,
    enablePayoneer,
    payoneerInflowRate,
    payoneerFxSpread,
    payoneerFlatWireFee,
    currency,
    rates
  ]);

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const text = `EtsyFeePro Financial Audit:
Order Value: ${fmt(calculations.totalOrderRevenue)}
Etsy Platform Fees: -${fmt(calculations.totalEtsyFees)} (${((calculations.totalEtsyFees / calculations.totalOrderRevenue) * 100).toFixed(1)}%)
${enablePayoneer ? `Payoneer & Wire Fees: -${fmt(calculations.totalPayoneerDeductions)}\n` : ''}Net Bank Deposit: ${fmt(calculations.netBankDeposit)} (${fmtPkr(calculations.netBankDepositUsd)})
Cost of Goods & Shipping: -${fmt(calculations.totalCogs)}
Net Take-Home Cash: ${fmt(calculations.netProfit)}
Net Profit Margin: ${calculations.profitMargin.toFixed(1)}%
Generated via evonixtec.com/etsy-fee-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Payoneer multi-order benchmark tiers
  const benchmarkTiers = [100, 200, 250, 300, 500];

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen pb-24 selection:bg-orange-500 selection:text-white font-sans">
      {/* 1. Terminal Header */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-orange-600 text-white flex items-center justify-center font-black text-lg tracking-wider shadow-md">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  EtsyFeePro
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  2026 Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {lang === 'en' ? 'Etsy Platform & Payoneer Cross-Border Profit Engine' : 'ایٹسی فیس اور پے اونیر کراس بارڈر کیلکولیٹر'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-950 border border-slate-800 px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select
                aria-label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as EtsyCurrency)}
                className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer"
              >
                {(Object.keys(CURRENCY_SYMBOLS) as EtsyCurrency[]).map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c} ({CURRENCY_SYMBOLS[c]})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="px-2.5 py-1 text-xs font-bold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>

            {/* Quick Copy */}
            <button
              onClick={handleCopySummary}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-sm cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Audit'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Exchange Rate Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-slate-900/60 border border-slate-800 text-xs text-slate-400 mb-6 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Exchange Base: 1 USD = {rates.PKR.toFixed(1)} PKR • {rates.GBP.toFixed(3)} GBP • {rates.EUR.toFixed(3)} EUR</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Source: open.er-api.com ({ratesUpdated})</span>
          </div>
        </div>

        {/* 2. Main Two-Column Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Controllers (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section A: Order Financials */}
            <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-orange-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    {lang === 'en' ? '1. Order Revenue & Production Costs' : '1. آرڈر آمدنی اور لاگت'}
                  </h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 mr-1">{lang === 'en' ? 'Region:' : 'ملک:'}</span>
                  <select
                    aria-label="Seller Country"
                    value={sellerCountry}
                    onChange={(e) => handleCountryChange(e.target.value as SellerCountry)}
                    className="bg-slate-950 border border-slate-800 text-orange-400 text-xs font-bold px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="PK">Pakistan (Cross-Border Payoneer)</option>
                    <option value="US">United States (Domestic)</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany (European Union)</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Item Listing Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'en' ? 'Item Selling Price' : 'آئٹم کی فروخت قیمت'} ({sym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">{sym}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={itemPrice || ''}
                      onChange={(e) => setItemPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 pl-8 pr-3 py-2 text-white font-mono font-bold text-base focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Shipping Charged to Buyer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'en' ? 'Shipping Charged to Buyer' : 'خریدار سے لیا گیا شپنگ چارج'} ({sym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">{sym}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={shippingCharged || ''}
                      onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 pl-8 pr-3 py-2 text-white font-mono font-bold text-base focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Set 0 for Free Shipping offer</span>
                </div>

                {/* Item Cost / COGS */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'en' ? 'Item Making / Sourcing Cost' : 'تیاری یا خریداری کی لاگت'} ({sym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">{sym}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={itemCost || ''}
                      onChange={(e) => setItemCost(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 pl-8 pr-3 py-2 text-white font-mono font-bold text-base focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Actual Shipping Cost to Courier */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'en' ? 'Real Shipping Paid to Courier' : 'حقیقی کوریئر خرچ (DHL/FedEx)'} ({sym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">{sym}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={actualShippingCost || ''}
                      onChange={(e) => setActualShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                      className={`w-full bg-slate-950 border pl-8 pr-3 py-2 text-white font-mono font-bold text-base focus:outline-none ${
                        calculations.hasShippingLeakage ? 'border-amber-500/70' : 'border-slate-800 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {calculations.hasShippingLeakage && (
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Shipping Leakage: -{fmt(calculations.shippingLeakage)} undercharged!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Order Units Quantity' : 'آرڈر میں آئٹمز کی تعداد'}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm text-white px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Section B: Platform Fee Controls & Offsite Ads */}
            <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-orange-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    {lang === 'en' ? '2. Etsy Rules & Advertising Cut' : '2. ایٹسی فیس اور اشتہارات'}
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Transaction: 6.5% + $0.20</span>
              </div>

              {/* Offsite Ads Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-200">
                    {lang === 'en' ? 'Etsy Offsite Ads Fee' : 'ایٹسی آف سائٹ اشتہارات فیس'}
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Official $100 Cap Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOffsiteAdsMode('none')}
                    className={`py-2 px-3 font-semibold text-center border transition-all cursor-pointer ${
                      offsiteAdsMode === 'none'
                        ? 'border-orange-500 bg-orange-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    0% (No Ads)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOffsiteAdsMode('15')}
                    className={`py-2 px-3 font-semibold text-center border transition-all cursor-pointer ${
                      offsiteAdsMode === '15'
                        ? 'border-orange-500 bg-orange-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    15% (Under $10k)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOffsiteAdsMode('12')}
                    className={`py-2 px-3 font-semibold text-center border transition-all cursor-pointer ${
                      offsiteAdsMode === '12'
                        ? 'border-orange-500 bg-orange-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    12% (Over $10k)
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {lang === 'en'
                    ? 'Etsy automatically advertises products on Google, Facebook & Pinterest. If a buyer clicks and orders within 30 days, Etsy deducts 15% (or 12%), capped at $100 per transaction.'
                    : 'ایٹسی گوگل اور فیس بک پر آپ کا اشتہار چلاتا ہے۔ خریدار کے کلک کرنے پر 15 فیصد کٹوتی ہوتی ہے جس کی زیادہ سے زیادہ حد 100 ڈالر ہے۔'}
                </p>
              </div>

              {/* Toggles: Regulatory Fee & VAT on Fees */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {lang === 'en' ? 'Regulatory Operating Fee' : 'ریگولیٹری فیس (برطانیہ / یورپ)'}
                    </span>
                    <span className="text-[11px] text-slate-500">UK (0.32%), France (0.47%), Italy (0.32%), Turkey (2.07%)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={applyRegulatory}
                    onChange={(e) => setApplyRegulatory(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {lang === 'en' ? 'VAT on Seller Fees' : 'سیلر فیس پر ٹیکس / وی اے ٹی'}
                    </span>
                    <span className="text-[11px] text-slate-500">20% UK VAT, 19% EU VAT on Etsy services</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={applyVatOnFees}
                    onChange={(e) => setApplyVatOnFees(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Cross-Border Payoneer Deductions Engine */}
            <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    {lang === 'en' ? '3. Payoneer & Local Bank Transfer' : '3. پے اونیر اور لوکل بینک کٹوتی'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Enabled</span>
                  <input
                    type="checkbox"
                    checked={enablePayoneer}
                    onChange={(e) => setEnablePayoneer(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {enablePayoneer ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? 'Etsy sends USD payouts to your Payoneer account. Payoneer charges multi-stage deductions before depositing cash into your Pakistani, Indian, or local bank account.'
                      : 'ایٹسی آپ کے پے اونیر میں ڈالر بھیجتا ہے۔ پے اونیر آپ کے مقامی بینک اکاؤنٹ میں رقم ٹرانسفر کرتے وقت فیس اور ایکسچینج ریٹ کاٹتا ہے۔'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Payoneer Inflow Fee</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">0.50%</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Receiving from Etsy</span>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Wholesale FX Spread</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">2.00%</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Below interbank rate</span>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Local Bank Flat Wire</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">$1.50</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Per withdrawal batch</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-center justify-between">
                    <span className="text-emerald-300 font-medium">Estimated PKR in Local Bank:</span>
                    <span className="text-emerald-400 font-mono font-extrabold text-sm">
                      {fmtPkr(calculations.netBankDepositUsd)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  Payoneer deductions disabled. Assuming direct domestic bank deposit (US, UK, CA, AU).
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Financial Terminal Payout Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Master Terminal Output Card */}
            <div className="bg-slate-900 border-2 border-orange-500/70 p-5 sm:p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-orange-400">
                  {lang === 'en' ? 'Financial Audit Summary' : 'خالص منافع کا جائزہ'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Margin: <strong className={calculations.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}>{calculations.profitMargin.toFixed(1)}%</strong>
                </span>
              </div>

              {/* Big Net Profit Display */}
              <div className="text-center py-4 bg-slate-950 border border-slate-800/80 mb-5">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  {lang === 'en' ? 'Net Take-Home Cash' : 'آپ کا خالص منافع'}
                </span>
                <div className={`text-3xl sm:text-4xl font-mono font-black tracking-tight ${
                  calculations.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {fmt(calculations.netProfit)}
                </div>
                {currency !== 'PKR' && (
                  <span className="text-xs font-mono text-emerald-500/90 block mt-1">
                    ≈ {fmtPkr(convertToUsd(calculations.netProfit))}
                  </span>
                )}
                <div className="flex items-center justify-center gap-3 mt-2 text-xs font-mono text-slate-400">
                  <span>ROI: <strong className="text-white">{calculations.roi.toFixed(1)}%</strong></span>
                  <span>·</span>
                  <span>Total Revenue: <strong className="text-white">{fmt(calculations.totalOrderRevenue)}</strong></span>
                </div>
              </div>

              {/* Line-by-Line Itemized Ledger */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 text-slate-300">
                  <span>Total Order Gross:</span>
                  <span className="font-bold text-white">{fmt(calculations.totalOrderRevenue)}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 text-slate-400 font-sans font-bold text-[11px] uppercase tracking-wider text-orange-400">
                  Etsy Deductions ({((calculations.totalEtsyFees / calculations.totalOrderRevenue) * 100).toFixed(1)}%)
                </div>

                <div className="flex justify-between py-0.5 text-slate-400">
                  <span>• Listing Fee ($0.20):</span>
                  <span className="text-red-400">-{fmt(calculations.listingFee)}</span>
                </div>

                <div className="flex justify-between py-0.5 text-slate-400">
                  <span>• Transaction Fee (6.5%):</span>
                  <span className="text-red-400">-{fmt(calculations.transactionFee)}</span>
                </div>

                <div className="flex justify-between py-0.5 text-slate-400">
                  <span>• Payment Processing ({paymentPercent}%):</span>
                  <span className="text-red-400">-{fmt(calculations.paymentFee)}</span>
                </div>

                {calculations.offsiteFee > 0 && (
                  <div className="flex justify-between py-0.5 text-slate-400">
                    <span className="flex items-center gap-1">
                      • Offsite Ads ({offsiteAdsMode}%):
                      {calculations.isOffsiteCapped && <span className="text-[10px] text-amber-400 font-bold">[$100 Cap]</span>}
                    </span>
                    <span className="text-red-400">-{fmt(calculations.offsiteFee)}</span>
                  </div>
                )}

                {calculations.regulatoryFee > 0 && (
                  <div className="flex justify-between py-0.5 text-slate-400">
                    <span>• Regulatory Operating Fee:</span>
                    <span className="text-red-400">-{fmt(calculations.regulatoryFee)}</span>
                  </div>
                )}

                {calculations.vatOnFees > 0 && (
                  <div className="flex justify-between py-0.5 text-slate-400">
                    <span>• VAT on Etsy Services:</span>
                    <span className="text-red-400">-{fmt(calculations.vatOnFees)}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-t border-slate-800 text-slate-200 font-bold">
                  <span>Gross Etsy Payout:</span>
                  <span className="text-orange-300">{fmt(calculations.grossEtsyPayout)}</span>
                </div>

                {/* Payoneer Deductions Section */}
                {enablePayoneer && (
                  <>
                    <div className="pt-2 border-t border-slate-800 text-slate-400 font-sans font-bold text-[11px] uppercase tracking-wider text-emerald-400">
                      Cross-Border Payoneer & FX (2.5% + $1.5)
                    </div>

                    <div className="flex justify-between py-0.5 text-slate-400">
                      <span>• Inflow + FX Spread (2.5%):</span>
                      <span className="text-red-400">
                        -{fmt(convertFromUsd(calculations.payoneerInflowFeeUsd + calculations.payoneerFxSpreadUsd))}
                      </span>
                    </div>

                    <div className="flex justify-between py-0.5 text-slate-400">
                      <span>• Local Wire Transfer:</span>
                      <span className="text-red-400">-{fmt(convertFromUsd(calculations.payoneerWireFeeUsd))}</span>
                    </div>

                    <div className="flex justify-between py-1 border-t border-slate-800 text-slate-200 font-bold">
                      <span>Net Cash in Bank:</span>
                      <span className="text-emerald-400 font-extrabold">{fmt(calculations.netBankDeposit)}</span>
                    </div>
                  </>
                )}

                {/* Product & Shipping Costs */}
                <div className="pt-2 border-t border-slate-800 text-slate-400 font-sans font-bold text-[11px] uppercase tracking-wider text-slate-300">
                  Your Costs
                </div>

                <div className="flex justify-between py-0.5 text-slate-400">
                  <span>• Item Production Cost:</span>
                  <span className="text-slate-200">-{fmt(itemCost * quantity)}</span>
                </div>

                <div className="flex justify-between py-0.5 text-slate-400">
                  <span>• Actual Courier Shipping:</span>
                  <span className="text-slate-200">-{fmt(actualShippingCost * quantity)}</span>
                </div>
              </div>

              {/* Total Intermediary Leakage Badge */}
              <div className="mt-5 p-3 bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400">Total Intermediary Cut:</span>
                <span className="font-mono font-bold text-orange-400">
                  {fmt(calculations.totalIntermediaryCut)} ({calculations.totalIntermediaryPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Smart Intelligence: Target Selling Price Matrix */}
            <div className="bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {lang === 'en' ? 'Reverse-Solved Target Price Matrix' : 'ہدف قیمت فارمولا'}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'en'
                  ? 'To make your desired profit margin after all Etsy, Payoneer, and shipping costs, list at these exact prices:'
                  : 'تمام فیسوں اور شپنگ کے بعد مطلوبہ منافع کے لیے یہ قیمت رکھیں:'}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="p-2.5 bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Safe (20%)</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{fmt(calculations.targetPrice20)}</span>
                  <span className="text-[9px] text-slate-500 font-sans">High Volume</span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-orange-500/40">
                  <span className="text-[10px] text-orange-400 block font-sans font-bold">Growth (35%)</span>
                  <span className="text-orange-400 font-bold text-sm block mt-0.5">{fmt(calculations.targetPrice35)}</span>
                  <span className="text-[9px] text-slate-500 font-sans">Recommended</span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-emerald-500/40">
                  <span className="text-[10px] text-emerald-400 block font-sans font-bold">Brand (50%)</span>
                  <span className="text-emerald-400 font-bold text-sm block mt-0.5">{fmt(calculations.targetPrice50)}</span>
                  <span className="text-[9px] text-slate-500 font-sans">Boutique</span>
                </div>
              </div>
            </div>

            {/* Offsite Ads Stress Test Card */}
            {offsiteAdsMode !== 'none' && (
              <div className="bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                    Offsite Ads Impact
                  </span>
                  <span className="font-mono text-amber-400 font-bold">-{fmt(calculations.adsProfitReduction)}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Profit without ads: <strong className="text-white">{fmt(calculations.profitWithoutAds)}</strong> vs with {offsiteAdsMode}% ads: <strong className="text-white">{fmt(calculations.netProfit)}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Interactive Payoneer Multi-Stage Benchmark Table */}
        {enablePayoneer && (
          <div className="mt-10 bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  {lang === 'en'
                    ? 'Cross-Border Payoneer Cash Payout Benchmark Matrix'
                    : 'پے اونیر لوکل بینک کیش ڈیپازٹ میٹرکس'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real bank deposit simulation for Pakistani & international sellers across standard order sizes
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 border border-emerald-500/30">
                1 USD = {rates.PKR.toFixed(1)} PKR
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Order Gross</th>
                    <th className="py-2.5 px-3">Etsy Cut (~10%)</th>
                    <th className="py-2.5 px-3">Gross Etsy Payout</th>
                    <th className="py-2.5 px-3">Payoneer Inflow (0.5%)</th>
                    <th className="py-2.5 px-3">FX Spread (2%)</th>
                    <th className="py-2.5 px-3">Bank Wire</th>
                    <th className="py-2.5 px-3 text-emerald-400 font-bold">Net Bank Deposit ($)</th>
                    <th className="py-2.5 px-3 text-emerald-400 font-bold">Pakistani Rupee (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {benchmarkTiers.map((tier) => {
                    const estEtsyCut = tier * 0.095 + 0.45;
                    const grossPayout = tier - estEtsyCut;
                    const inflow = grossPayout * 0.005;
                    const fx = grossPayout * 0.02;
                    const wire = 1.50;
                    const netUsd = Math.max(0, grossPayout - inflow - fx - wire);
                    const netPkr = netUsd * rates.PKR;

                    return (
                      <tr key={tier} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white">${tier}.00</td>
                        <td className="py-2.5 px-3 text-red-400">-${estEtsyCut.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-orange-300">${grossPayout.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-slate-400">-${inflow.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-slate-400">-${fx.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-slate-400">-$1.50</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-extrabold">${netUsd.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">Rs {Math.round(netPkr).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              *Calculation assumes standard transaction fee (6.5%) + payment processing (3.0% + $0.25). Offsite ads not included in baseline benchmark.
            </p>
          </div>
        )}

        {/* 4. Strategic Guide & FAQs */}
        <div className="mt-12 space-y-8 max-w-4xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'en'
                ? 'Etsy Seller Fee Structure Explained (2026 Update)'
                : 'ایٹسی سیلر فیس کا تفصیلی جائزہ (2026)'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Know your exact numbers before listing products to protect your margins.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the real cost of selling on Etsy in 2026?',
                a: 'The true fee is not just 6.5%. When you combine the listing fee ($0.20), transaction fee (6.5% on item + shipping), payment processing (3.0% + $0.25), and potential offsite ads (15%), Etsy takes between 10% to 25% of your total order gross.'
              },
              {
                q: 'How does Etsy calculate Offsite Ads, and what is the $100 cap?',
                a: 'Etsy automatically runs advertising for products on search engines and social platforms. If an order comes from an offsite ad click within 30 days, Etsy charges 15% (for shops under $10,000 yearly sales) or 12% (mandatory for shops over $10,000). Crucially, Etsy caps this fee at $100 per transaction, preventing excessive fees on large orders.'
              },
              {
                q: 'How much does Payoneer deduct when withdrawing Etsy funds to Pakistan?',
                a: 'Payoneer applies a 0.5% inflow receiving fee, an approximate 2.0% currency exchange markup below the live interbank rate, and a flat $1.50 local bank transfer fee. On a $200 gross order, cross-border sellers typically pay about $6 to $8 in total banking deductions.'
              },
              {
                q: 'Should I offer Free Shipping on Etsy?',
                a: 'Only if your item margin exceeds 40%. Free shipping increases search placement on Etsy, but sellers often fail to build courier charges into the price. If actual international courier costs $15 and you absorb it, your profit vanishes.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-bold text-white text-sm flex items-center justify-between cursor-pointer hover:bg-slate-850"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-orange-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Special Offer Banner */}
          <div className="pt-4">
            <SpecialOfferBanner toolName="EtsyFeePro" />
          </div>
        </div>
      </div>

      {/* 5. Mobile Sticky Bottom Quick-Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800 p-3 px-4 backdrop-blur z-50 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Net Profit:</span>
          <span className={`text-lg font-mono font-black ${calculations.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {fmt(calculations.netProfit)}
          </span>
          <span className="text-[10px] font-mono text-slate-400 ml-1.5">
            ({calculations.profitMargin.toFixed(1)}%)
          </span>
        </div>

        <button
          onClick={handleCopySummary}
          className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-2 px-3.5 transition-colors cursor-pointer shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default EtsyFeeCalculator;
