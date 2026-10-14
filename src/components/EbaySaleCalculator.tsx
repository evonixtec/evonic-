import React, { useState, useEffect, useMemo } from 'react';
import { 
  RefreshCw, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Sparkles, 
  FileSpreadsheet, 
  FileDown, 
  Code2, 
  ShieldCheck, 
  X,
  CreditCard
} from 'lucide-react';

// Country & Region Definitions
export type EbayRegion = "US" | "GB" | "DE" | "AU" | "AE" | "PK" | "CA" | "FR" | "IT" | "ES";
export type StoreType = "none" | "starter" | "basic" | "premium" | "anchor" | "enterprise";
export type SellerLevel = "top" | "above" | "below";
export type CalcMode = "simple" | "advanced" | "professional";

interface CountryConfig {
  code: EbayRegion;
  name: string;
  currency: string;
  symbol: string;
  defaultFvf: number;
  fixedFee: number;
  flag: string;
}

const COUNTRIES_REGISTRY: Record<EbayRegion, CountryConfig> = {
  US: { code: "US", name: "United States", currency: "USD", symbol: "$", defaultFvf: 13.25, fixedFee: 0.30, flag: "🇺🇸" },
  GB: { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", defaultFvf: 13.25, fixedFee: 0.30, flag: "🇬🇧" },
  DE: { code: "DE", name: "Germany", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇩🇪" },
  AU: { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", defaultFvf: 13.40, fixedFee: 0.40, flag: "🇦🇺" },
  AE: { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "AED ", defaultFvf: 13.50, fixedFee: 1.50, flag: "🇦🇪" },
  PK: { code: "PK", name: "Pakistan", currency: "PKR", symbol: "Rs. ", defaultFvf: 13.50, fixedFee: 85.00, flag: "🇵🇰" },
  CA: { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", defaultFvf: 13.25, fixedFee: 0.40, flag: "🇨🇦" },
  FR: { code: "FR", name: "France", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇫🇷" },
  IT: { code: "IT", name: "Italy", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇮🇹" },
  ES: { code: "ES", name: "Spain", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇪🇸" },
};

const COUNTRIES_LIST: EbayRegion[] = ["US", "GB", "DE", "AU", "AE", "PK", "CA", "FR", "IT", "ES"];

const ONE_HOUR_MS = 60 * 60 * 1000;
const FX_API_FALLBACK = "https://open.er-api.com/v6/latest/USD";

export default function EbaySaleCalculator() {
  // Mode selection: simple, advanced, professional
  const [calcMode, setCalcMode] = useState<CalcMode>("simple");

  // Monetization & Professional Lock State
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('evonix_pro_unlocked') === 'true';
    }
    return false;
  });
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [showInsideFeatures, setShowInsideFeatures] = useState<boolean>(false);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Core Parameters
  const [region, setRegion] = useState<EbayRegion>("US");
  const [itemSoldPrice, setItemSoldPrice] = useState<number>(150);
  const [shippingCharged, setShippingCharged] = useState<number>(15);
  const [itemCost, setItemCost] = useState<number>(45);
  const [shippingCost, setShippingCost] = useState<number>(12);
  const [promotedRate, setPromotedRate] = useState<number>(2);
  const [numOrders, setNumOrders] = useState<number>(1);

  // Advanced Parameters
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  const [storeType, setStoreType] = useState<StoreType>("none");
  const [sellerLevel, setSellerLevel] = useState<SellerLevel>("above");
  const [category, setCategory] = useState<string>("most");
  const [isOverseas, setIsOverseas] = useState<boolean>(false);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(0);
  const [isStandardEnvelope, setIsStandardEnvelope] = useState<boolean>(false);
  const [packagingCost, setPackagingCost] = useState<number>(1.5);
  const [returnReserveRate, setReturnReserveRate] = useState<number>(2);

  // Forex Rates State
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1,
    PKR: 278.50,
    AED: 3.67,
    GBP: 0.77,
    EUR: 0.92,
    CAD: 1.38,
    AUD: 1.52,
  });
  const [cacheTimestamp, setCacheTimestamp] = useState<string>("10:33:33 PM");
  const [isRefreshingFx, setIsRefreshingFx] = useState<boolean>(false);

  // Currency Converter Section States
  const [convertAmount, setConvertAmount] = useState<number>(21.57125);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // SEO Knowledgebase Accordion & Active Tab States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideCountry, setGuideCountry] = useState<string>("United States");

  // Feedback Accordion
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackEmail, setFeedbackEmail] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("Bug Report");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");

  const activeConfig = COUNTRIES_REGISTRY[region];

  // 1-Hour Rolling Currency Caching Synchronizer Loop
  const fetchFreshRates = async () => {
    setIsRefreshingFx(true);
    const now = Date.now();
    try {
      const res = await fetch(FX_API_FALLBACK);
      const data = await res.json();
      if (data && data.rates) {
        const freshRates: Record<string, number> = {
          USD: 1,
          PKR: data.rates.PKR || 278.50,
          AED: data.rates.AED || 3.67,
          GBP: data.rates.GBP || 0.77,
          EUR: data.rates.EUR || 0.92,
          CAD: data.rates.CAD || 1.38,
          AUD: data.rates.AUD || 1.52,
        };
        localStorage.setItem('evonix_fx_time', now.toString());
        localStorage.setItem('evonix_fx_pkr', freshRates.PKR.toString());
        localStorage.setItem('evonix_fx_aed', freshRates.AED.toString());
        localStorage.setItem('evonix_fx_rates', JSON.stringify(freshRates));
        setRates(freshRates);
        setCacheTimestamp(new Date(now).toLocaleTimeString());
      }
    } catch {
      setCacheTimestamp(new Date().toLocaleTimeString() + " (Local Fallback Active)");
    } finally {
      setIsRefreshingFx(false);
    }
  };

  useEffect(() => {
    const storedTime = localStorage.getItem('evonix_fx_time');
    const storedRates = localStorage.getItem('evonix_fx_rates');
    const now = Date.now();

    if (storedTime && storedRates && (now - Number(storedTime) < ONE_HOUR_MS)) {
      try {
        setRates(JSON.parse(storedRates));
        setCacheTimestamp(new Date(Number(storedTime)).toLocaleTimeString());
        return;
      } catch {
        // Fallback to fetch
      }
    }
    fetchFreshRates();
  }, []);

  // Unlock handlers
  const handleUnlockPro = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      localStorage.setItem('evonix_pro_unlocked', 'true');
      setIsProUnlocked(true);
      setIsProcessingPayment(false);
      setShowPayModal(false);
    }, 600);
  };

  const handleLockPro = () => {
    localStorage.removeItem('evonix_pro_unlocked');
    setIsProUnlocked(false);
    setCalcMode('simple');
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ["Marketplace", "Item Sold Price", "Shipping Charged", "Item Cost", "Shipping Cost", "Promoted Ad Rate", "Orders Count", "Total Fees", "Net Profit", "Margin"];
    const row = [
      activeConfig.name,
      itemSoldPrice,
      shippingCharged,
      itemCost,
      shippingCost,
      `${promotedRate}%`,
      numOrders,
      calculations.aggregateFeesSum.toFixed(2),
      calculations.netProfit.toFixed(2),
      `${calculations.margin.toFixed(1)}%`
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ebay_fee_report_${region.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export
  const handleExportPDF = () => {
    window.print();
  };

  // Calculation Engine
  const calculations = useMemo(() => {
    const revenuePerOrder = itemSoldPrice + shippingCharged;
    const baseTotalRevenue = revenuePerOrder * numOrders;

    let fvfRate = activeConfig.defaultFvf;

    if (storeType !== "none") {
      switch (category) {
        case "tech": fvfRate = 8.25; break;
        case "fashion": fvfRate = 7.00; break;
        case "media": fvfRate = 14.50; break;
        case "heavy": fvfRate = 2.50; break;
        default: fvfRate = 12.00; break;
      }
    } else {
      switch (category) {
        case "tech": fvfRate = 12.35; break;
        case "fashion": fvfRate = itemSoldPrice > 100 ? 8.00 : 13.25; break;
        case "media": fvfRate = 14.95; break;
        case "heavy": fvfRate = 3.00; break;
        default: fvfRate = activeConfig.defaultFvf; break;
      }
    }

    if (sellerLevel === "top") {
      fvfRate = fvfRate * 0.90;
    } else if (sellerLevel === "below") {
      fvfRate = fvfRate + 5.0;
    }

    const calculatedEbayFee = (baseTotalRevenue * (fvfRate / 100)) + (activeConfig.fixedFee * numOrders);
    const processing = baseTotalRevenue * 0.029;
    const promoted = baseTotalRevenue * (promotedRate / 100);

    let envelopeSurcharge = 0;
    if (isStandardEnvelope) {
      envelopeSurcharge = 0.64 * numOrders;
    }
    if (isOverseas) {
      envelopeSurcharge += baseTotalRevenue * 0.0165;
    }
    if (calcMode === "professional") {
      envelopeSurcharge += (packagingCost * numOrders) + (baseTotalRevenue * (returnReserveRate / 100));
    }

    const aggregateFeesSum = calculatedEbayFee + processing + promoted + envelopeSurcharge;
    const totalProductCosts = (itemCost + shippingCost) * numOrders;
    const netProfit = baseTotalRevenue - aggregateFeesSum - totalProductCosts;
    const margin = baseTotalRevenue > 0 ? (netProfit / baseTotalRevenue) * 100 : 0;

    const denominator = 1 - (fvfRate / 100) - 0.029 - (promotedRate / 100) - (isOverseas ? 0.0165 : 0);
    const fixedCosts = itemCost + shippingCost + activeConfig.fixedFee;
    const breakEven = denominator > 0 ? fixedCosts / denominator : fixedCosts;

    return {
      revenuePerOrder,
      baseTotalRevenue,
      calculatedEbayFee,
      processing,
      promoted,
      envelopeSurcharge,
      aggregateFeesSum,
      totalProductCosts,
      netProfit,
      margin,
      breakEven,
    };
  }, [
    region,
    itemSoldPrice,
    shippingCharged,
    itemCost,
    shippingCost,
    promotedRate,
    numOrders,
    storeType,
    sellerLevel,
    category,
    isOverseas,
    salesTaxRate,
    isStandardEnvelope,
    packagingCost,
    returnReserveRate,
    calcMode,
    activeConfig,
  ]);

  // Reset inputs
  const handleReset = () => {
    setItemSoldPrice(150);
    setShippingCharged(15);
    setItemCost(45);
    setShippingCost(12);
    setPromotedRate(2);
    setNumOrders(1);
    setStoreType("none");
    setSellerLevel("above");
    setCategory("most");
    setIsOverseas(false);
    setSalesTaxRate(0);
    setIsStandardEnvelope(false);
  };

  // Sync Net profit into converter
  const handleSyncNetProfit = () => {
    const val = Math.max(0, calculations.netProfit);
    setConvertAmount(Number(val.toFixed(4)));
    setFromCurrency(activeConfig.currency.trim());
  };

  // Convert amount logic
  const convertedValues = useMemo(() => {
    const baseUsd = fromCurrency === "USD" 
      ? convertAmount 
      : convertAmount / (rates[fromCurrency] || 1);

    return {
      USD: baseUsd * (rates.USD || 1),
      PKR: baseUsd * (rates.PKR || 278.50),
      AED: baseUsd * (rates.AED || 3.67),
      CAD: baseUsd * (rates.CAD || 1.38),
      GBP: baseUsd * (rates.GBP || 0.77),
      EUR: baseUsd * (rates.EUR || 0.92),
      AUD: baseUsd * (rates.AUD || 1.52),
    };
  }, [convertAmount, fromCurrency, rates]);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  };

  // Feedback form handler
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail.trim() || !feedbackMessage.trim()) {
      setFeedbackStatus("Please enter your email and message.");
      return;
    }
    setFeedbackStatus("Sending feedback to Evonix network...");
    setTimeout(() => {
      setFeedbackStatus("Shukriya! Message mil gaya hai, team jald rabta karegi.");
      setFeedbackEmail("");
      setFeedbackMessage("");
    }, 1000);
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen text-slate-800 font-sans pb-16">
      
      {/* 2. TITLE & COUNTRY SELECTOR (Image 1-2) */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 border border-blue-200">
              EVONIXTEC SUITE
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              Fees Updated May 2026
            </span>
          </div>

          {/* Pro Status Indicator */}
          {isProUnlocked ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>PRO SUITE UNLOCKED ($9 ACTIVE)</span>
              </span>
              <button
                type="button"
                onClick={handleLockPro}
                className="text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
              >
                (Test Relock)
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPayModal(true)}
              className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Professional Suite ($9)</span>
            </button>
          )}
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          eBay Fee &amp; Profit Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          Calculate exact eBay marketplace final value fees, promoted ad commissions, shipping costs, and take-home profits across 10 global marketplaces.
        </p>

        {/* 10-Card Country Grid (5x2 layout on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5">
          {COUNTRIES_LIST.map((code) => {
            const c = COUNTRIES_REGISTRY[code];
            const isActive = region === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setRegion(code)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{c.flag}</span>
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-black uppercase tracking-wide ${isActive ? 'text-blue-700' : 'text-slate-900'}`}>
                        {c.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold truncate hidden sm:inline">
                        {c.currency}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block truncate">
                      {c.name}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3 & 4. CALCULATOR FORM & DASHBOARD GRID (Image 1, 2, 6) */}
      <div className="max-w-7xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT FORM (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          
          {/* Tabs: Simple | Advanced | Professional + Reset */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              
              {/* Tab 1: Simple Mode */}
              <button
                type="button"
                onClick={() => {
                  setCalcMode("simple");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  calcMode === "simple"
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Simple
              </button>

              {/* Tab 2: Advanced Mode */}
              <button
                type="button"
                onClick={() => {
                  setCalcMode("advanced");
                  setIsAdvancedOpen(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  calcMode === "advanced"
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Advanced
              </button>

              {/* Tab 3: Professional Mode 🔒 Locked ($9) */}
              <button
                type="button"
                onClick={() => {
                  setCalcMode("professional");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  calcMode === "professional"
                    ? isProUnlocked
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 shadow-xs'
                    : isProUnlocked
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {isProUnlocked ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Professional</span>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase">
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span>Professional</span>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 uppercase tracking-tight">
                      $9 Unlock Pro
                    </span>
                  </>
                )}
              </button>

            </div>

            <div className="flex items-center gap-2">
              {!isProUnlocked && (
                <button
                  type="button"
                  onClick={() => setShowPayModal(true)}
                  className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>$9 Unlock Pro</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="space-y-4 text-xs">
            
            {/* 1. Target Marketplace Country Dropdown */}
            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Target Marketplace Country
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as EbayRegion)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COUNTRIES_LIST.map((code) => {
                  const item = COUNTRIES_REGISTRY[code];
                  return (
                    <option key={code} value={code}>
                      {item.flag} {item.name} ({item.currency})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 2 & 3. Item Sold Price & Shipping Charged */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Item Sold Price ({activeConfig.symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={itemSoldPrice || ''}
                  onChange={(e) => setItemSoldPrice(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Shipping Charged to Buyer ({activeConfig.symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={shippingCharged || ''}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 4 & 5. Item Cost COGS & Your Shipping Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Item Cost COGS ({activeConfig.symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={itemCost || ''}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Your Shipping Cost ({activeConfig.symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 6. PROMOTED ADS RATE */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-600 uppercase tracking-wide">
                  6. Promoted Ads Rate (%)
                </label>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {promotedRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={promotedRate}
                onChange={(e) => setPromotedRate(parseFloat(e.target.value) || 0)}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* 7. VOLUME BULK ORDERS (1x, 10x, 50x, 100x) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-600 uppercase tracking-wide">
                  7. Volume Bulk Orders
                </label>
                <div className="flex items-center gap-1">
                  {[1, 10, 50, 100].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        if (count > 10 && !isProUnlocked) {
                          setNumOrders(count);
                          setCalcMode("professional");
                        } else {
                          setNumOrders(count);
                        }
                      }}
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md transition-colors cursor-pointer ${
                        numOrders === count
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}x
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min="1"
                value={numOrders}
                onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 8. BUTTON: SHOW ADVANCED SELLER HUB CRITERIA (Image 6) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full text-left text-xs font-bold text-blue-700 uppercase tracking-wider flex justify-between items-center bg-blue-50/90 hover:bg-blue-100 p-3 rounded-xl border border-blue-200 transition-colors cursor-pointer"
              >
                <span>{isAdvancedOpen ? 'Hide' : 'Show'} Advanced Seller Hub Criteria</span>
                <span>{isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
              </button>

              {/* Advanced Criteria Body */}
              {isAdvancedOpen && (
                <div className="space-y-3 mt-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      eBay Corporate Store Type
                    </label>
                    <select
                      value={storeType}
                      onChange={(e) => setStoreType(e.target.value as StoreType)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="none">No Active Store (Standard)</option>
                      <option value="starter">Starter Store</option>
                      <option value="basic">Basic Store Subscription</option>
                      <option value="premium">Premium Store Tier</option>
                      <option value="anchor">Anchor Tier Allocation</option>
                      <option value="enterprise">Enterprise Tier</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Seller Performance Level
                    </label>
                    <select
                      value={sellerLevel}
                      onChange={(e) => setSellerLevel(e.target.value as SellerLevel)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="top">Top Rated Premium (10% FVF Credit Applied)</option>
                      <option value="above">Above Standard (Normal Tariffs)</option>
                      <option value="below">Below Standard Metrics (+5% Surcharge Penalty)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Product Logistics Categorization
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="most">General Categories / Apparel (Standard Benchmark)</option>
                      <option value="tech">Consumer Electronics &amp; Laptops (8.25% - 12.35%)</option>
                      <option value="fashion">Footwear &amp; Apparel &gt; $100 (7.0% - 8.0%)</option>
                      <option value="media">Books, DVDs &amp; Media (14.5% - 14.95%)</option>
                      <option value="heavy">Industrial &amp; Heavy Machinery (2.5% - 3.0%)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isOverseas}
                        onChange={(e) => setIsOverseas(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-slate-700">International Overseas Hub (+1.65%)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isStandardEnvelope}
                        onChange={(e) => setIsStandardEnvelope(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-slate-700">eBay Standard Envelope (+$0.64)</span>
                    </label>
                  </div>

                  {calcMode === "professional" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">
                          Packaging &amp; Label Cost ({activeConfig.symbol})
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={packagingCost}
                          onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">
                          Return Loss Reserve (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={returnReserveRate}
                          onChange={(e) => setReturnReserveRate(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT DASHBOARD (5 cols on lg) (Image 6) */}
        <div className="lg:col-span-5 relative">
          
          {/* PROFESSIONAL LOCKED OVERLAY (When Professional Mode is selected & not yet unlocked) */}
          {calcMode === "professional" && !isProUnlocked && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm rounded-2xl animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full text-center space-y-3.5">
                
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Professional Suite
                  </span>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Unlock Professional Seller Suite - $9
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Get Bulk Calculator (100x), Real-Time FX (PKR/AED/CAD/GBP/EUR/AUD), PDF/CSV Export, Country Guides, API Access.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPayModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay $9 to Unlock</span>
                </button>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowInsideFeatures(!showInsideFeatures)}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    {showInsideFeatures ? "Hide Features List" : "See What's Inside"}
                  </button>
                  {showInsideFeatures && (
                    <div className="text-left text-[11px] text-slate-600 space-y-1.5 mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Bulk Order Profit (1x to 100x orders)</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Real-Time Multi-Currency FX Engine</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-Click CSV Ledger &amp; PDF Export</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Country-Specific Strategy Report</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Developer API Access Code Generator</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-1 border-t border-slate-100 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleUnlockPro}
                    className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    ⚡ Instant Test Unlock (Free)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD INNER (Blurred when locked in Professional mode) */}
          <div className={`space-y-4 ${calcMode === 'professional' && !isProUnlocked ? 'filter blur-md pointer-events-none select-none opacity-40' : ''}`}>
            
            {/* Top Pro Actions Bar (When Pro is Unlocked) */}
            {isProUnlocked && (
              <div className="p-3 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-[11px]">Pro Suite Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                    title="Download CSV"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                    title="Print / Save PDF"
                  >
                    <FileDown className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApiModal(true)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                    title="Developer API"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>API</span>
                  </button>
                </div>
              </div>
            )}

            {/* Top 4 Small Negative Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">eBay FVF</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{calculations.calculatedEbayFee.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Processing</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{calculations.processing.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promoted</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{calculations.promoted.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tax/Env</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{calculations.envelopeSurcharge.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Main Profit Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-5 sm:p-6 rounded-2xl text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Retained Net Profit Allocation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {numOrders} {numOrders === 1 ? 'order' : 'orders'}
                </span>
              </div>

              <div className="mt-3">
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight block ${calculations.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {activeConfig.symbol}{calculations.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Consolidated yield margin cleared after platform tariffs and product costs.
                </p>
              </div>

              {/* Dynamic 1-Hour Caching Forex Indicators Row */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-700/60 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Pakistan Local Exchange</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm block mt-0.5">
                    Rs. {(calculations.netProfit * (region === "PK" ? 1 : rates.PKR)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">GCC Dubai Yield</span>
                  <span className="text-amber-300 font-mono font-bold text-sm block mt-0.5">
                    AED {(calculations.netProfit * (region === "AE" ? 1 : rates.AED)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* MAIN LEDGER BOX (Image 6) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              
              {/* Header Row */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>STORE LEDGER PARAMETER ALLOCATION DETAILS</span>
                <span>CALCULATED LEDGER AMOUNT</span>
              </div>

              {/* Rows */}
              <div className="p-4 space-y-3 text-xs">
                
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Total Combined Deducted Marketplace Channels Fees:</span>
                  <span className="font-mono font-bold text-rose-600">
                    -{activeConfig.symbol}{calculations.aggregateFeesSum.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Realized Retained Profit Margin Percentage Rate:</span>
                  <span className={`font-mono font-bold ${calculations.margin >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {calculations.margin.toFixed(1)}%
                  </span>
                </div>

                <div className="py-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-bold">Target Asset Break-Even Retail Evaluation Value:</span>
                    <span className="font-mono font-black text-blue-700 text-sm">
                      {activeConfig.symbol}{calculations.breakEven.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    List pricing boundaries above this metric to bypass cash deficit.
                  </span>
                </div>

              </div>
            </div>

            {/* HAVE AN ISSUE OR AN IDEA? TELL US Collapsible */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Have an issue or an idea? Tell us</span>
                <span>{isFeedbackOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
              </button>

              {isFeedbackOpen && (
                <form onSubmit={handleFeedbackSubmit} className="p-4 space-y-3 border-t border-slate-200 text-xs">
                  <p className="text-slate-600 font-medium">Got a question? Call us. We reply in 2 hours.</p>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Email Address (Required)</label>
                    <input
                      type="email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Feedback Classification</label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Incorrect Fee Calculation">Incorrect Fee Calculation</option>
                      <option value="Other Suggestion">Other Suggestion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Details &amp; Suggestions</label>
                    <textarea
                      rows={2}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="E.g. Please include Promoted Listings Priority variables..."
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit System Feedback
                  </button>
                  {feedbackStatus && (
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold">
                      {feedbackStatus}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Bottom Note */}
            <div className="p-3.5 rounded-xl bg-slate-100/90 text-[11px] text-slate-500 space-y-1 border border-slate-200/60">
              <p className="font-semibold text-slate-600">
                * Note: Ye aaj ka rate hai (Today&apos;s Rate). Kal ka rate is se mukhtalif ho sakta hai. Last Updated: {cacheTimestamp}
              </p>
              <p className="leading-relaxed">
                Marketplace fee modeling variables are evaluated completely locally inside the browser viewport workspace memory arrays securely. Evonix Technologies — Corporate Solutions Sialkot.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* 5. LIVE MULTI-MARKET CURRENCY CONVERTER SECTION (Image 3) */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 border border-blue-200">
                LIVE MULTI-MARKET CURRENCY EXCHANGE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Real-Time Currency Converter (PKR AED USD GBP EUR AUD)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Powered by open exchange rates engine • Automatically cached hourly for rapid offline estimates.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchFreshRates}
              disabled={isRefreshingFx}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingFx ? 'animate-spin' : ''}`} />
              <span>Refresh Rates</span>
            </button>
          </div>

          {/* Conversion Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6 items-end">
            
            <div className="sm:col-span-6">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Amount to Convert
                </label>
                <button
                  type="button"
                  onClick={handleSyncNetProfit}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Sync Current Net Profit ({activeConfig.symbol}{calculations.netProfit.toFixed(2)})
                </button>
              </div>
              <input
                type="number"
                min="0"
                step="any"
                value={convertAmount || ''}
                onChange={(e) => setConvertAmount(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                From Currency
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="USD">🇺🇸 USD - United States Dollar</option>
                <option value="PKR">🇵🇰 PKR - Pakistani Rupee</option>
                <option value="AED">🇦🇪 AED - UAE Dirham</option>
                <option value="GBP">🇬🇧 GBP - British Pound</option>
                <option value="EUR">🇪🇺 EUR - Euro</option>
                <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
              </select>
            </div>

          </div>

          {/* 7 Converted Currency Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
            {[
              { code: "USD", flag: "🇺🇸", symbol: "$", name: "USD" },
              { code: "PKR", flag: "🇵🇰", symbol: "Rs. ", name: "PK PKR" },
              { code: "AED", flag: "🇦🇪", symbol: "AED ", name: "AE AED" },
              { code: "CAD", flag: "🇨🇦", symbol: "C$", name: "CA CAD" },
              { code: "GBP", flag: "🇬🇧", symbol: "£", name: "GB GBP" },
              { code: "EUR", flag: "🇪🇺", symbol: "€", name: "EU EUR" },
              { code: "AUD", flag: "🇦🇺", symbol: "A$", name: "AU AUD" },
            ].map((cur) => {
              const val = convertedValues[cur.code as keyof typeof convertedValues] || 0;
              const formatted = val.toLocaleString(undefined, {
                minimumFractionDigits: cur.code === 'PKR' ? 0 : 2,
                maximumFractionDigits: cur.code === 'PKR' ? 0 : 2,
              });
              const fullDisplay = `${cur.symbol}${formatted}`;
              const isSelected = fromCurrency === cur.code;

              return (
                <div
                  key={cur.code}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{cur.flag}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(fullDisplay, cur.code)}
                      title="Copy amount"
                      className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedKey === cur.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-1">
                    {cur.name}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-slate-900 block mt-0.5 truncate" title={fullDisplay}>
                    {fullDisplay}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 6. SEO LAYER: OFFICIAL 2026 SELLER FEE KNOWLEDGEBASE (Image 4 & 5) */}
      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-8">
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          
          {/* Section Header with Country Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 border border-blue-200">
                OFFICIAL 2026 SELLER FEE KNOWLEDGEBASE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Country-Specific Selling Guides &amp; Strategy
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Breakdown of eBay seller fees, category commission structures, international shipping surcharges, and unit margin optimization tactics.
              </p>
            </div>

            {/* Country Pills on Right */}
            <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-center">
              {[
                "United States",
                "United Kingdom",
                "Germany",
                "Australia",
                "UAE",
                "Pakistan",
                "Canada",
              ].map((cName) => (
                <button
                  key={cName}
                  type="button"
                  onClick={() => setGuideCountry(cName)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    guideCountry === cName
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cName}
                </button>
              ))}
            </div>
          </div>

          {/* Byline */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-slate-700 font-bold">By Evonixtec eCommerce Research Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span>6 min read</span>
          </div>

          {/* H2 Title */}
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Complete Guide to eBay {guideCountry} Seller Fees in 2026
          </h3>

          {/* CORE MARKETPLACE TAKEAWAYS Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-blue-900 block">
              CORE MARKETPLACE TAKEAWAYS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Standard Final Value Fee (FVF) is 13.25% + $0.30 per order on most categories under $7,500.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Top Rated Plus sellers receive a 10% discount on final value fees on eligible 30-day return listings.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>eBay Store subscriptions reduce baseline category fees down to 4.0% - 9.35% for high-volume catalogs.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>International sales from overseas hubs (e.g. Pakistan, UAE) carry an additional 1.65% cross-border fee.</span>
              </div>
            </div>
          </div>

          {/* Paragraphs (Grade 6 English, 2 lines max, human tone) */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Selling on eBay in the United States remains a major channel for international manufacturers and exporters. Knowing your exact fee schedule prevents margin loss on high-volume products.
            </p>
            <p>
              Every transaction incurs percentage-based Final Value Fees and fixed per-order processing costs. Factoring in promoted listing ad rates and domestic returns ensures positive unit economics.
            </p>
          </div>

          {/* TABLE: CATEGORY FEE COMPARISON MATRIX (OFFICIAL BENCHMARK) */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">
              CATEGORY FEE COMPARISON MATRIX (OFFICIAL BENCHMARK)
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Standard Account</th>
                    <th className="p-3">Store Subscription</th>
                    <th className="p-3">Top Rated Plus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">Most Categories / General</td>
                    <td className="p-3 font-mono">13.25% + $0.30</td>
                    <td className="p-3 font-mono text-blue-700">12.00% + $0.30</td>
                    <td className="p-3 font-mono text-emerald-700">11.93% + $0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">Consumer Electronics &amp; Tech</td>
                    <td className="p-3 font-mono">12.35% + $0.30</td>
                    <td className="p-3 font-mono text-blue-700">8.25% + $0.30</td>
                    <td className="p-3 font-mono text-emerald-700">11.12% + $0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">Apparel &amp; Footwear (&gt; $100)</td>
                    <td className="p-3 font-mono">8.00% + $0.30</td>
                    <td className="p-3 font-mono text-blue-700">7.00% + $0.30</td>
                    <td className="p-3 font-mono text-emerald-700">7.20% + $0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">Books, Movies &amp; Media</td>
                    <td className="p-3 font-mono">14.95% + $0.30</td>
                    <td className="p-3 font-mono text-blue-700">14.50% + $0.30</td>
                    <td className="p-3 font-mono text-emerald-700">13.45% + $0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">Heavy Machinery &amp; Industrial</td>
                    <td className="p-3 font-mono">3.00% + $0.30</td>
                    <td className="p-3 font-mono text-blue-700">2.50% + $0.30</td>
                    <td className="p-3 font-mono text-emerald-700">2.70% + $0.30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Banner Light Blue */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-blue-900 uppercase tracking-wide block">
                Ready to test your live items for this market?
              </span>
              <p className="text-xs text-blue-700 mt-0.5">
                Load USA marketplace rules directly into the calculator above.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setRegion("US");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Load USA Settings in Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* FAQ SECTION */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h4 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
                Frequently Asked Questions on eBay Seller Fees
              </h4>
            </div>

            <div className="space-y-2">
              {[
                {
                  q: "What is Top Rated Seller discount on eBay?",
                  a: "Top Rated Plus sellers receive an exclusive 10% discount on Final Value Fees. To qualify, your listing must offer same-day or 1-business-day handling and 30-day or longer free returns.",
                },
                {
                  q: "How do international selling fees work for Pakistan and UAE sellers?",
                  a: "When selling from Pakistan or UAE to US or UK buyers, eBay applies an international cross-border fee of 1.65%. A fixed transaction fee ($0.30, £0.30, €0.35, or Rs 85) applies to the total order value including shipping and sales tax.",
                },
                {
                  q: "How does an eBay Store subscription reduce selling fees?",
                  a: "An active eBay Store lowers category Final Value Fees from standard 13.25% down to between 4.0% and 12.0%. Stores also provide free monthly listing allocations and shipping supply credits.",
                },
                {
                  q: "What is the exact formula for eBay break-even price?",
                  a: "Break-Even = (Item Cost + Shipping Cost + Fixed Fee) / (1 - (FVF % + Processing 2.9% + Promoted Ads % + Cross-Border 1.65%)). This exact formula ensures zero deficit on your sold products.",
                },
              ].map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 bg-slate-50/70 hover:bg-slate-100 flex justify-between items-center text-left text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span>{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          MODAL: PAY $9 TO UNLOCK PROFESSIONAL SELLER SUITE
         ======================================================== */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-800 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  Instant Access
                </span>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Unlock Professional Suite
                </h3>
                <p className="text-xs text-slate-300">
                  One-time $9 lifetime purchase for your browser workspace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs">
              
              <div className="space-y-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100x Bulk Unit Profit Multiplier</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Currency Rates (PKR, AED, CAD, GBP, EUR, AUD)</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1-Click CSV Ledger &amp; PDF Report Generator</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Developer API Code &amp; Webhook Integration</span>
                </div>
              </div>

              {/* Price card */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-900 block">Total One-Time Price</span>
                  <span className="text-2xl font-black font-mono text-blue-700 block mt-0.5">$9.00 USD</span>
                </div>
                <div className="text-right text-[10px] text-blue-700 font-medium">
                  <ShieldCheck className="w-5 h-5 text-blue-600 ml-auto mb-0.5" />
                  <span>Instant Activation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleUnlockPro}
                  disabled={isProcessingPayment}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isProcessingPayment ? "Activating License..." : "Pay $9 (Instant Activation)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleUnlockPro();
                  }}
                  className="w-full py-2 px-3 text-slate-500 hover:text-emerald-700 font-semibold text-xs cursor-pointer text-center"
                >
                  ⚡ Click here for Instant Free Developer Test
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Secure local workspace license. No recurring monthly fees.
              </p>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: DEVELOPER API CODE GENERATOR (PRO FEATURE)
         ======================================================== */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-800 animate-in zoom-in-95 duration-150">
            
            <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Developer API Integration</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowApiModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Connect your warehouse ERP or custom backend directly to calculate real-time eBay final value fees and currency conversions.
              </p>

              <div>
                <span className="font-bold text-slate-700 block mb-1">cURL API Query:</span>
                <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`curl -X POST https://api.evonixtec.com/v1/ebay/fee-ledger \\
  -H "Authorization: Bearer PRO_SUITE_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "region": "${region}",
    "itemSoldPrice": ${itemSoldPrice},
    "shippingCharged": ${shippingCharged},
    "itemCost": ${itemCost},
    "shippingCost": ${shippingCost},
    "promotedRate": ${promotedRate},
    "numOrders": ${numOrders}
  }'`}
                </pre>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Response Sample:</span>
                <pre className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto">
{`{
  "totalFees": ${calculations.aggregateFeesSum.toFixed(2)},
  "netProfit": ${calculations.netProfit.toFixed(2)},
  "marginPercentage": ${calculations.margin.toFixed(1)},
  "breakEvenPrice": ${calculations.breakEven.toFixed(2)},
  "currency": "${activeConfig.currency}"
}`}
                </pre>
              </div>

              <button
                type="button"
                onClick={() => setShowApiModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Close API Documentation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
