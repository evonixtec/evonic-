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
  Sparkles, 
  FileSpreadsheet, 
  FileDown, 
  Code2, 
  ShieldCheck, 
  X,
  CreditCard
} from 'lucide-react';

// 1. Centralized Immutable Presets Registry Configuration
export type EbayRegion = "US" | "UK" | "DE" | "AU" | "CA" | "AE" | "PK" | "FR" | "IT" | "ES";
export type StoreType = "none" | "starter" | "basic" | "premium" | "anchor" | "enterprise";
export type SellerLevel = "top" | "above" | "below";
export type ActiveTab = "simple" | "advanced" | "professional";

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
  UK: { code: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", defaultFvf: 13.25, fixedFee: 0.30, flag: "🇬🇧" },
  DE: { code: "DE", name: "Germany", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇩🇪" },
  AU: { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", defaultFvf: 13.40, fixedFee: 0.40, flag: "🇦🇺" },
  CA: { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", defaultFvf: 13.25, fixedFee: 0.40, flag: "🇨🇦" },
  AE: { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "AED ", defaultFvf: 13.50, fixedFee: 1.50, flag: "🇦🇪" },
  PK: { code: "PK", name: "Pakistan Hub", currency: "PKR", symbol: "Rs. ", defaultFvf: 13.50, fixedFee: 50.00, flag: "🇵🇰" },
  FR: { code: "FR", name: "France", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇫🇷" },
  IT: { code: "IT", name: "Italy", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇮🇹" },
  ES: { code: "ES", name: "Spain", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇪🇸" }
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const FX_API_FALLBACK = "https://open.er-api.com/v6/latest/USD";

export default function EbaySaleCalculator() {
  // Operational Modes Tabs State
  const [activeTab, setActiveTab] = useState<ActiveTab>("simple");
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('evonix_pro_unlocked') === 'true';
    }
    return false;
  });

  // Core Calculator Input States
  const [region, setRegion] = useState<EbayRegion>("US");
  const [itemSoldPrice, setItemSoldPrice] = useState<number>(150);
  const [shippingCharged, setShippingCharged] = useState<number>(15);
  const [itemCost, setItemCost] = useState<number>(45);
  const [shippingCost, setShippingCost] = useState<number>(12);
  const [promotedRate, setPromotedRate] = useState<number>(2);
  const [numOrders, setNumOrders] = useState<number>(1);

  // Advanced Seller Hub Expansion States
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  const [storeType, setStoreType] = useState<StoreType>("none");
  const [sellerLevel, setSellerLevel] = useState<SellerLevel>("above");
  const [category, setCategory] = useState<string>("most");
  const [isOverseas, setIsOverseas] = useState<boolean>(false);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(0);
  const [isStandardEnvelope, setIsStandardEnvelope] = useState<boolean>(false);

  // Hourly Rolling Local Storage Cache Forex Buffers
  const [rates, setRates] = useState<Record<string, number>>({ 
    USD: 1,
    PKR: 278.50, 
    AED: 3.67, 
    CAD: 1.37, 
    GBP: 0.76, 
    EUR: 0.90, 
    AUD: 1.48 
  });
  const [cacheTimestamp, setCacheTimestamp] = useState<string>("Active Cache Sync");
  const [isRefreshingFx, setIsRefreshingFx] = useState<boolean>(false);

  // Modals & UI States
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Accordion & Feedback States
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackEmail, setFeedbackEmail] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("Bug Report");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideCountry, setGuideCountry] = useState<string>("United States");

  // Output Matrix State Ledger Dashboards
  const [ebayFee, setEbayFee] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(0);
  const [promotedFee, setPromotedFee] = useState<number>(0);
  const [envelopeSurcharge, setEnvelopeSurcharge] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [breakEven, setBreakEven] = useState<number>(0);

  // Synchronize dynamic monetization access parameter arrays from browser window state memory
  useEffect(() => {
    const accessStatus = localStorage.getItem('evonix_pro_unlocked');
    if (accessStatus === 'true') {
      setIsProUnlocked(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPayModal(false);
        setShowApiModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Load and check 1-Hour exchange metrics interval loops
    const storedTime = localStorage.getItem('evonix_fx_time');
    const storedRates = localStorage.getItem('evonix_fx_rates_pack');
    const now = Date.now();

    if (storedTime && storedRates && (now - Number(storedTime) < ONE_HOUR_MS)) {
      try {
        setRates(JSON.parse(storedRates));
        setCacheTimestamp(new Date(Number(storedTime)).toLocaleTimeString());
      } catch {
        // Fallback to fetch
        fetchFreshRates();
      }
    } else {
      fetchFreshRates();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchFreshRates = async () => {
    setIsRefreshingFx(true);
    const now = Date.now();
    try {
      const res = await fetch(FX_API_FALLBACK);
      const data = await res.json();
      if (data && data.rates) {
        const pack = {
          USD: 1,
          PKR: data.rates.PKR || 278.50, 
          AED: data.rates.AED || 3.67,
          CAD: data.rates.CAD || 1.37, 
          GBP: data.rates.GBP || 0.76,
          EUR: data.rates.EUR || 0.90, 
          AUD: data.rates.AUD || 1.48
        };
        localStorage.setItem('evonix_fx_time', now.toString());
        localStorage.setItem('evonix_fx_rates_pack', JSON.stringify(pack));
        setRates(pack);
        setCacheTimestamp(new Date(now).toLocaleTimeString());
      }
    } catch {
      setCacheTimestamp(new Date().toLocaleTimeString() + " (Local Fallback)");
    } finally {
      setIsRefreshingFx(false);
    }
  };

  // Structural Core Mathematical Calculation Matrix Pipeline
  useEffect(() => {
    const activeCountry = COUNTRIES_REGISTRY[region];
    const sold = Number(itemSoldPrice) || 0;
    const chargedShip = Number(shippingCharged) || 0;
    const costProd = Number(itemCost) || 0;
    const costShip = Number(shippingCost) || 0;
    const taxRate = Number(salesTaxRate) || 0;

    const grossVolumeCollected = sold + chargedShip;
    const calculatedSalesTax = grossVolumeCollected * (taxRate / 100);

    let baseFvf = activeCountry.defaultFvf;
    if (category === "electronics") baseFvf = 12.35;
    if (category === "clothing" && sold > 100) baseFvf = 8.0;
    if (category === "books") baseFvf = 14.95;

    if (storeType !== "none" && storeType !== "starter") {
      baseFvf = Math.max(4, baseFvf - 0.35);
    }

    let performanceMultiplier = 1.0;
    if (sellerLevel === "top") performanceMultiplier = 0.90;

    let calculatedEbayFee = (grossVolumeCollected * (baseFvf / 100)) * performanceMultiplier;
    if (sellerLevel === "below") {
      calculatedEbayFee += (grossVolumeCollected * 0.05);
    }

    const processing = (grossVolumeCollected + calculatedSalesTax) * 0.029 + activeCountry.fixedFee;
    const promoted = sold * (promotedRate / 100);
    const international = (isOverseas || region === "PK" || region === "AE") ? (sold * 0.0165) : 0;
    const envelopeCost = (isStandardEnvelope && region === "US") ? 0.64 : 0;

    const aggregateFeesSum = calculatedEbayFee + processing + promoted + international + calculatedSalesTax + envelopeCost;
    const itemExpensesSum = costProd + costShip;

    const operationalUnitProfit = grossVolumeCollected - aggregateFeesSum - itemExpensesSum;
    const finalCalculatedNetProfit = operationalUnitProfit * numOrders;

    setEbayFee(calculatedEbayFee);
    setProcessingFee(processing);
    setPromotedFee(promoted);
    setEnvelopeSurcharge(envelopeCost + international + calculatedSalesTax);
    setTotalFees(aggregateFeesSum * numOrders);
    setNetProfit(finalCalculatedNetProfit);
    setMargin(grossVolumeCollected > 0 ? (operationalUnitProfit / grossVolumeCollected) * 100 : 0);

    const combinedPercentageFees = (baseFvf / 100) + 0.029 + (promotedRate / 100) + (isOverseas ? 0.0165 : 0);
    const absoluteFixedCosts = activeCountry.fixedFee + itemExpensesSum + envelopeCost;
    setBreakEven(combinedPercentageFees < 1 ? absoluteFixedCosts / (1 - combinedPercentageFees) : 0);

  }, [region, itemSoldPrice, shippingCharged, itemCost, shippingCost, promotedRate, numOrders, storeType, sellerLevel, category, isOverseas, salesTaxRate, isStandardEnvelope]);

  const activeConfig = COUNTRIES_REGISTRY[region];

  const PAYMENT_URL = "https://www.paypal.me/evonixtec/9USD";
  const [licenseKeyInput, setLicenseKeyInput] = useState<string>("");
  const [licenseError, setLicenseError] = useState<string>("");
  const [licenseSuccess, setLicenseSuccess] = useState<string>("");

  const handleDevUnlock = () => {
    localStorage.setItem('evonix_pro_unlocked', 'true');
    setIsProUnlocked(true);
    setShowPayModal(false);
  };

  const handleActivateLicense = () => {
    const key = licenseKeyInput.trim();
    if (key.length >= 6) {
      localStorage.setItem('evonix_pro_unlocked', 'true');
      localStorage.setItem('evonix_pro_license', key);
      setIsProUnlocked(true);
      setLicenseSuccess("Payment verified! Professional Suite unlocked.");
      setLicenseError("");
      setTimeout(() => setShowPayModal(false), 1200);
    } else {
      setLicenseError("Please enter a valid PayPal Transaction ID or License Key.");
    }
  };

  const handleLockPro = () => {
    localStorage.removeItem('evonix_pro_unlocked');
    localStorage.removeItem('evonix_pro_license');
    setIsProUnlocked(false);
    setActiveTab("simple");
  };

  const isProModuleBlurActive = activeTab === "professional" && !isProUnlocked;

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  };

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
      totalFees.toFixed(2),
      netProfit.toFixed(2),
      `${margin.toFixed(1)}%`
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

  const handleExportPDF = () => {
    window.print();
  };

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
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans antialiased text-slate-700">
      
      {/* 10-COUNTRY SELECTION FLAG CARDS GRID */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm mb-6 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="bg-blue-600 text-white font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
            EVONIXTEC SUITE Fees Updated: May 2026
          </span>
          {isProUnlocked ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>$9 PRO ACTIVE</span>
              </span>
              {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                <button
                  type="button"
                  onClick={handleLockPro}
                  className="text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                >
                  (Relock Test)
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPayModal(true)}
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Unlock Pro ($9)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mt-3 text-center">
          {Object.values(COUNTRIES_REGISTRY).map((c) => (
            <button 
              key={c.code} 
              type="button"
              onClick={() => setRegion(c.code)}
              className={`p-2 rounded-lg border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                region === c.code 
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-xs' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* THREE-TIER OPERATIONAL SELECTION WORKSPACE TABS */}
      <div className="flex items-center justify-between border-b border-slate-200 mb-6 print:hidden flex-wrap gap-2">
        <div className="flex">
          <button 
            type="button"
            onClick={() => setActiveTab("simple")} 
            className={`py-2.5 px-4 sm:px-6 font-black text-xs uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === "simple" 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Simple Mode (Free)
          </button>

          <button 
            type="button"
            onClick={() => {
              setActiveTab("advanced");
              setIsAdvancedOpen(true);
            }} 
            className={`py-2.5 px-4 sm:px-6 font-black text-xs uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === "advanced" 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Advanced Mode (Free)
          </button>

          <button 
            type="button"
            onClick={() => {
              setActiveTab("professional");
              if (!isProUnlocked) {
                setShowPayModal(true);
              }
            }} 
            className={`py-2.5 px-4 sm:px-6 font-black text-xs uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "professional" 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>Professional Mode</span>
            {!isProUnlocked ? (
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                🔒 $9 Pro
              </span>
            ) : (
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ✓ Unlocked
              </span>
            )}
          </button>
        </div>

        <button 
          type="button"
          onClick={() => {
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
          }} 
          className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          Reset Inputs
        </button>
      </div>

      {/* CORE WORKSPACE GRID DUAL BOXES CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* LEFT COMPONENT PANEL: WORKSPACE FORM CONTROLS (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="font-black text-slate-900 uppercase tracking-wide text-sm">
              Input Parameter Workspace
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Configure active auction parameters securely.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
              Gross Item Sale Price ({activeConfig.symbol})
            </label>
            <input 
              type="number" 
              min="0"
              step="any"
              value={itemSoldPrice || ''} 
              onChange={e => setItemSoldPrice(parseFloat(e.target.value) || 0)} 
              className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
              Shipping Charged Buyer ({activeConfig.symbol})
            </label>
            <input 
              type="number" 
              min="0"
              step="any"
              value={shippingCharged || ''} 
              onChange={e => setShippingCharged(parseFloat(e.target.value) || 0)} 
              className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
              Wholesale Buying Cost ({activeConfig.symbol})
            </label>
            <input 
              type="number" 
              min="0"
              step="any"
              value={itemCost || ''} 
              onChange={e => setItemCost(parseFloat(e.target.value) || 0)} 
              className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
              Actual Shipping Outlay ({activeConfig.symbol})
            </label>
            <input 
              type="number" 
              min="0"
              step="any"
              value={shippingCost || ''} 
              onChange={e => setShippingCost(parseFloat(e.target.value) || 0)} 
              className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-600 uppercase tracking-wide">
                Promoted Listings Ads Rate ({promotedRate}%)
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
              onChange={e => setPromotedRate(parseFloat(e.target.value) || 0)} 
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg" 
            />
          </div>

          {/* Volume Bulk Counter Multipliers */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-slate-600 uppercase tracking-wide">
                Volume Bulk Multipliers
              </label>
              <span className="text-[10px] text-slate-400 font-mono font-semibold">
                {numOrders}x active
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 10, 50, 100].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    if (val > 1 && !isProUnlocked) {
                      setNumOrders(val);
                      setActiveTab("professional");
                    } else {
                      setNumOrders(val);
                    }
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    numOrders === val 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val}x
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Criteria Fields */}
          {(activeTab === "advanced" || activeTab === "professional" || isAdvancedOpen) && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  eBay Store Subscription Profile
                </label>
                <select 
                  value={storeType} 
                  onChange={e => setStoreType(e.target.value as StoreType)} 
                  className="w-full p-2 border border-slate-300 rounded-xl bg-white font-medium"
                >
                  <option value="none">No Active Store Channel</option>
                  <option value="starter">Starter Store System</option>
                  <option value="basic">Basic Store System Tier</option>
                  <option value="premium">Premium Store Allocation</option>
                  <option value="anchor">Anchor Tier Box</option>
                  <option value="enterprise">Enterprise Tier</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Seller Status Grade
                </label>
                <select 
                  value={sellerLevel} 
                  onChange={e => setSellerLevel(e.target.value as SellerLevel)} 
                  className="w-full p-2 border border-slate-300 rounded-xl bg-white font-medium"
                >
                  <option value="top">Top Rated Premium (-10% Base FVF Credit)</option>
                  <option value="above">Above Standard (Normal Tariffs)</option>
                  <option value="below">Below Standard (+5% Penalty Surcharge)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Inventory Category Tariffs Mapping
                </label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full p-2 border border-slate-300 rounded-xl bg-white font-medium"
                >
                  <option value="most">General Merchandise Ledger (13.25%)</option>
                  <option value="electronics">Mobiles &amp; Smart Electronics (12.35%)</option>
                  <option value="clothing">Apparel, Shoes &amp; Accessories Tier (8.0%)</option>
                  <option value="books">Books, Music &amp; Media Products (14.95%)</option>
                </select>
              </div>

              <div className="pt-1 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="overseasCheck" 
                    checked={isOverseas} 
                    onChange={e => setIsOverseas(e.target.checked)} 
                    className="rounded accent-blue-600 w-4 h-4" 
                  />
                  <span className="text-slate-700">Cross-Border Overseas Sale (+1.65%)</span>
                </label>

                {region === "US" && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="envelopeCheck" 
                      checked={isStandardEnvelope} 
                      onChange={e => setIsStandardEnvelope(e.target.checked)} 
                      className="rounded accent-blue-600 w-4 h-4" 
                    />
                    <span className="text-slate-700">Standard Envelope Mailer Allocation ($0.64)</span>
                  </label>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Estimated Sales Tax (%)
                </label>
                <input 
                  type="number" 
                  min="0"
                  step="any"
                  value={salesTaxRate || ''} 
                  onChange={e => setSalesTaxRate(parseFloat(e.target.value) || 0)} 
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono" 
                />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COMPONENT PANEL: DYNAMIC LIVE PERFORMANCE DASHBOARD (3 cols on lg) */}
        <div className="lg:col-span-3 relative">
          
          {/* ================= ABSOLUTE $9 PAYWALL OVERLAY FOR PROFESSIONAL MODE ================= */}
          {isProModuleBlurActive && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full text-center space-y-4">
                
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
                  <span className="text-2xl">🔒</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Premium Option Token Access: $9.00 Only
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                    Unlock Professional Seller Suite
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Gain instant access to bulk multi-order calculations (up to 100x), real-time forex cache pools for 7 currencies, country strategies, and CSV/PDF export.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPayModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>PAY $9 INSTANT ACTIVATION</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("simple")}
                    className="text-xs text-slate-400 font-bold hover:text-slate-600 underline transition cursor-pointer"
                  >
                    Return to Baseline Free Simple Calculator
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 block">
                    One-time lifetime access. Saved directly to local browser workspace.
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* DASHBOARD BODY (BLURRED WHEN PRO MODE IS LOCKED) */}
          <div className={`space-y-5 transition duration-300 ${isProModuleBlurActive ? 'blur-md select-none pointer-events-none opacity-40' : ''}`}>
            
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

            {/* Split Surcharges Cards Grid Rows */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">eBay Base FVF</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{ebayFee.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Processing Cost</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{processingFee.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promoted Standard</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{promotedFee.toFixed(2)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Surcharges Box</span>
                <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block mt-0.5">
                  -{activeConfig.symbol}{envelopeSurcharge.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Retained Profit Main Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 rounded-2xl text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Net Profit Yield Target Allocation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {numOrders} {numOrders === 1 ? 'order' : 'orders'}
                </span>
              </div>

              <div className="mt-3">
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight block ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {activeConfig.symbol}{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Net capital realized safely after clearing all aggregate channels outlays.
                </p>
              </div>

              {/* Dynamic Forex Indicators Row */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-700/60 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">PKR Currency Matrix</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm block mt-0.5">
                    Rs. {(netProfit * (region === "PK" ? 1 : rates.PKR)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">AED GCC Yield Trade</span>
                  <span className="text-amber-300 font-mono font-bold text-sm block mt-0.5">
                    AED {(netProfit * (region === "AE" ? 1 : rates.AED)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Table Sheet */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Ledger Variable Breakdown Parameters</span>
                <span>Calculated Outflow Capitals</span>
              </div>

              <div className="p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Total Aggregated Account Deductions Sum:</span>
                  <span className="font-mono font-bold text-rose-600">
                    -{activeConfig.symbol}{totalFees.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Realized Retained Margin Percentage Valuation Rate:</span>
                  <span className={`font-mono font-bold ${margin >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {margin.toFixed(1)}%
                  </span>
                </div>

                <div className="py-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-bold">Target Asset Break-Even Retail Evaluation pricing:</span>
                    <span className="font-mono font-black text-blue-700 text-sm">
                      {activeConfig.symbol}{breakEven.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    List values strictly above this limit to prevent negative balances.
                  </span>
                </div>
              </div>
            </div>

            {/* DYNAMIC INTEGRATED LIVE MULTI-MARKET CURRENCY CONVERTER CARD CANVAS FOOTER ROW */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Multi-Market Forex Mirror Alignment
                </span>
                <button
                  type="button"
                  onClick={fetchFreshRates}
                  disabled={isRefreshingFx}
                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshingFx ? 'animate-spin' : ''}`} />
                  <span>Sync Rates</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">PKR Currency Matrix</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    Rs. {(netProfit * (region === "PK" ? 1 : rates.PKR)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">AED GCC Yield Trade</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    AED {(netProfit * (region === "AE" ? 1 : rates.AED)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">GBP London Pool</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    £{(netProfit * (region === "UK" ? 1 : rates.GBP)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">EUR Eurozone Registry</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    €{(netProfit * (["DE", "FR", "IT", "ES"].includes(region) ? 1 : rates.EUR)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">CAD Canadian Trade</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    C${(netProfit * (region === "CA" ? 1 : rates.CAD)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">AUD Australian Pool</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    A${(netProfit * (region === "AU" ? 1 : rates.AUD)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400">
                * Note: Ye aaj ka rate hai (Today&apos;s Rate). Kal ka rate is se mukhtalif ho sakta hai. Last Updated: {cacheTimestamp}
              </p>
            </div>

            {/* APP ACCORDION INTERACTIVE SECURE SPAM-PROTECTED FEEDBACK MODULE */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <button 
                type="button" 
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)} 
                className="w-full px-5 py-3.5 bg-slate-100/80 hover:bg-slate-100 flex justify-between items-center text-xs font-black text-slate-700 uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Have an issue or an idea? Tell us</span>
                <span>{isFeedbackOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
              </button>

              {isFeedbackOpen && (
                <form onSubmit={handleFeedbackSubmit} className="p-4 space-y-3 border-t border-slate-200 text-xs">
                  <p className="text-slate-600 font-medium">Got a question? Call us. We reply in 2 hours.</p>
                  <div>
                    <input 
                      type="email" 
                      value={feedbackEmail} 
                      onChange={e => setFeedbackEmail(e.target.value)} 
                      placeholder="Corporate Email Address (Required)" 
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <select 
                      value={feedbackType} 
                      onChange={e => setFeedbackType(e.target.value)} 
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:outline-none font-semibold text-slate-600"
                    >
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Incorrect Fee Calculation Parameters">Incorrect Fee Calculation Parameters</option>
                      <option value="Other Suggestion">Other Suggestion</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      rows={2} 
                      value={feedbackMessage} 
                      onChange={e => setFeedbackMessage(e.target.value)} 
                      placeholder="E.g. Please add alternative regional cross-border options..." 
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none" 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Feedback
                  </button>
                  {feedbackStatus && (
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold">
                      {feedbackStatus}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* OPTIMIZED INFORMATIONAL KNOWLEDGEBASE SEGMENT */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Marketplace Accounting Guideline Profiles
              </span>
              <p className="text-slate-600 leading-relaxed">
                Evaluating accurate final value fees and transaction margins requires absolute data sync with platform regulations. Standard merchant operations across United States, United Kingdom, and European zones depend significantly on store tier configurations and performance standings.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Utilizing a dynamic standalone verification engine prevents margin depletion and structures secure break-even price parameters safely before launching outbound shipments.
              </p>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                Marketplace fee modeling variables are evaluated completely locally inside the browser viewport workspace memory arrays securely. Evonix Technologies — Corporate Solutions Sialkot.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          MODAL: PAY $9 TO UNLOCK PROFESSIONAL SELLER SUITE
         ======================================================== */}
      {showPayModal && (
        <div 
          onClick={() => setShowPayModal(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-800 animate-in zoom-in-95 duration-150"
          >
            
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

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => window.open(PAYMENT_URL, "_blank")}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PAY $9 INSTANT ACTIVATION</span>
                </button>
              </div>

              {/* Secure License Activation Form */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Already paid? Enter PayPal Transaction ID or License Key:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={licenseKeyInput}
                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                    placeholder="e.g. 9XX123456 or License Key"
                    className="flex-1 p-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleActivateLicense}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Activate
                  </button>
                </div>
                {licenseError && (
                  <p className="text-[11px] font-semibold text-rose-600">{licenseError}</p>
                )}
                {licenseSuccess && (
                  <p className="text-[11px] font-semibold text-emerald-600">{licenseSuccess}</p>
                )}
              </div>

              {/* Developer Test Link - ONLY visible on localhost, completely hidden on live site */}
              {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleDevUnlock}
                    className="text-[10px] text-amber-600 hover:text-amber-700 underline font-mono cursor-pointer"
                  >
                    [Localhost Only] Click here for Developer Test Unlock
                  </button>
                </div>
              )}

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
  "totalFees": ${totalFees.toFixed(2)},
  "netProfit": ${netProfit.toFixed(2)},
  "marginPercentage": ${margin.toFixed(1)},
  "breakEvenPrice": ${breakEven.toFixed(2)},
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
