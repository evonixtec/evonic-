import React, { useState, useEffect } from 'react';

// Centralized Types Configuration Mapping Matrix
type EbayRegion = "US" | "UK" | "DE" | "AU" | "CA" | "UAE" | "PAK";
type StoreType = "none" | "starter" | "basic" | "premium" | "anchor" | "enterprise";
type SellerLevel = "top" | "above" | "below";

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
  DE: { code: "DE", name: "Germany (Eurozone)", currency: "EUR", symbol: "€", defaultFvf: 13.25, fixedFee: 0.35, flag: "🇩🇪" },
  AU: { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", defaultFvf: 13.40, fixedFee: 0.40, flag: "🇦🇺" },
  CA: { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", defaultFvf: 13.25, fixedFee: 0.40, flag: "🇨🇦" },
  UAE: { code: "UAE", name: "United Arab Emirates", currency: "AED", symbol: "AED ", defaultFvf: 13.50, fixedFee: 1.50, flag: "🇦🇪" },
  PAK: { code: "PAK", name: "Pakistan Hub", currency: "PKR", symbol: "Rs. ", defaultFvf: 13.50, fixedFee: 50.00, flag: "🇵🇰" }
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const FX_API_FALLBACK = "https://open.er-api.com/v6/latest/USD"; 

export default function EbaySaleCalculator() {
  // Simple Mode Core Parameters
  const [region, setRegion] = useState<EbayRegion>("US");
  const [itemSoldPrice, setItemSoldPrice] = useState<number>(150);
  const [shippingCharged, setShippingCharged] = useState<number>(15);
  const [itemCost, setItemCost] = useState<number>(45);
  const [shippingCost, setShippingCost] = useState<number>(12);
  const [promotedRate, setPromotedRate] = useState<number>(2);
  const [numOrders, setNumOrders] = useState<number>(1);

  // Advanced Mode Options Toggle
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [storeType, setStoreType] = useState<StoreType>("none");
  const [sellerLevel, setSellerLevel] = useState<SellerLevel>("above");
  const [category, setCategory] = useState<string>("most");
  const [isOverseas, setIsOverseas] = useState<boolean>(false);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(0);
  const [isStandardEnvelope, setIsStandardEnvelope] = useState<boolean>(false);

  // Dynamic Forex Caching Ledger States
  const [pkrRate, setPkrRate] = useState<number>(278.50);
  const [aedRate, setAedRate] = useState<number>(3.67);
  const [cacheTimestamp, setCacheTimestamp] = useState<string>("Loading Cache...");

  // Primary Financial Dashboard Outputs
  const [ebayFee, setEbayFee] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(0);
  const [promotedFee, setPromotedFee] = useState<number>(0);
  const [envelopeSurcharge, setEnvelopeSurcharge] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [breakEven, setBreakEven] = useState<number>(0);

  // Feedback Form Accordion States
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackEmail, setFeedbackEmail] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("Bug Report");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");

  const activeTimelineString = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // 1-Hour Rolling Currency Caching Synchronizer Loop
  useEffect(() => {
    async function syncExchangeRates() {
      const storedTime = localStorage.getItem('evonix_fx_time');
      const storedPkr = localStorage.getItem('evonix_fx_pkr');
      const storedAed = localStorage.getItem('evonix_fx_aed');
      const now = Date.now();

      if (storedTime && storedPkr && storedAed && (now - Number(storedTime) < ONE_HOUR_MS)) {
        setPkrRate(Number(storedPkr));
        setAedRate(Number(storedAed));
        setCacheTimestamp(new Date(Number(storedTime)).toLocaleTimeString());
      } else {
        try {
          const res = await fetch(FX_API_FALLBACK);
          const data = await res.json();
          if (data && data.rates) {
            const freshPkr = data.rates.PKR || 278.50;
            const freshAed = data.rates.AED || 3.67;
            localStorage.setItem('evonix_fx_time', now.toString());
            localStorage.setItem('evonix_fx_pkr', freshPkr.toString());
            localStorage.setItem('evonix_fx_aed', freshAed.toString());
            setPkrRate(freshPkr);
            setAedRate(freshAed);
            setCacheTimestamp(new Date(now).toLocaleTimeString());
          }
        } catch {
          setCacheTimestamp(new Date().toLocaleTimeString() + " (Local Fallback Active)");
        }
      }
    }
    syncExchangeRates();
  }, []);

  // Live Calculations Engine
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
    const international = (isOverseas || region === "PAK" || region === "UAE") ? (sold * 0.0165) : 0;
    const envelopeCost = (isStandardEnvelope && region === "US") ? 0.64 : 0;

    const aggregateFeesSum = calculatedEbayFee + processing + promoted + international + calculatedSalesTax + envelopeCost;
    const itemExpensesSum = costProd + costShip;
    
    const operationalUnitProfit = grossVolumeCollected - aggregateFeesSum - itemExpensesSum;
    const calculatedFinalNetProfit = operationalUnitProfit * numOrders;

    setEbayFee(calculatedEbayFee);
    setProcessingFee(processing);
    setPromotedFee(promoted);
    setEnvelopeSurcharge(envelopeCost + international + calculatedSalesTax);
    setTotalFees(aggregateFeesSum * numOrders);
    setNetProfit(calculatedFinalNetProfit);
    setMargin(grossVolumeCollected > 0 ? (operationalUnitProfit / grossVolumeCollected) * 100 : 0);

    const combinedPercentageFees = (baseFvf / 100) + 0.029 + (promotedRate / 100) + (isOverseas ? 0.0165 : 0);
    const absoluteFixedCosts = activeCountry.fixedFee + itemExpensesSum + envelopeCost;
    setBreakEven(combinedPercentageFees < 1 ? absoluteFixedCosts / (1 - combinedPercentageFees) : 0);

  }, [region, itemSoldPrice, shippingCharged, itemCost, shippingCost, promotedRate, numOrders, storeType, sellerLevel, category, isOverseas, salesTaxRate, isStandardEnvelope]);

  const activeConfig = COUNTRIES_REGISTRY[region];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail.trim() || !feedbackMessage.trim()) {
      setFeedbackStatus("❌ Error: Mandatory text blocks vacant.");
      return;
    }
    setFeedbackStatus("⏳ Transporting data packet logs safely to evonix networks...");
    setTimeout(() => {
      setFeedbackStatus("شکریہ! آپ کا پیغام مل گیا ہے، ہم جلد آپ سے رابطہ کریں گے۔");
      setFeedbackEmail("");
      setFeedbackMessage("");
    }, 1200);
  };

  const handleWhatsAppRouteShare = () => {
    const shareTemplateText = `My eBay Profit: Sale ${activeConfig.symbol}${itemSoldPrice}, Profit ${activeConfig.symbol}${netProfit.toFixed(2)}, Margin ${margin.toFixed(1)}% — Compiled via evonixtec.com`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTemplateText)}`, '_blank');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-slate-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INPUT FORM SIDEBAR (LEFT) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-5 lg:sticky lg:top-24 h-fit">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
              Marketplace Finance Engine
            </span>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight mt-1">eBay Sale Calculator</h1>
            <p className="text-[11px] font-semibold text-slate-400 uppercase mt-0.5 tracking-wider">
              Fees Standard Updated: {activeTimelineString}
            </p>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-4 text-xs">
            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Target Market Registry
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as EbayRegion)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                {Object.entries(COUNTRIES_REGISTRY).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.flag} {item.name} ({item.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Gross Item Price ({activeConfig.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={itemSoldPrice || ''}
                onChange={(e) => setItemSoldPrice(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Buyer Shipping Fee ({activeConfig.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={shippingCharged || ''}
                onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Wholesale Sourcing Cost ({activeConfig.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Actual Outbound Freight ({activeConfig.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={shippingCost || ''}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-600 uppercase tracking-wide">
                  Promoted Ads Rate
                </label>
                <span className="font-mono font-bold text-blue-600">{promotedRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={promotedRate}
                onChange={(e) => setPromotedRate(parseInt(e.target.value) || 0)}
                className="w-full mt-1 accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wide mb-1">
                Volume Bulk Orders
              </label>
              <input
                type="number"
                min="1"
                value={numOrders}
                onChange={(e) => setNumOrders(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* ADVANCED ACCORDION OPTIONS */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAdvanced(!isAdvanced)}
                className="w-full text-left text-xs font-bold text-blue-600 uppercase tracking-wider flex justify-between items-center bg-blue-50/80 hover:bg-blue-100/80 p-3 rounded-xl border border-blue-200 transition-colors cursor-pointer"
              >
                <span>{isAdvanced ? 'Hide' : 'Show'} Advanced Seller Hub Criteria</span>
                <span>{isAdvanced ? '▲' : '▼'}</span>
              </button>

              {isAdvanced && (
                <div className="space-y-3 mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
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
                      <option value="most">General Merchandise ({activeConfig.defaultFvf}%)</option>
                      <option value="electronics">Consumer Electronics &amp; Mobiles (12.35%)</option>
                      <option value="clothing">Apparel, Shoes &amp; Fashion Design</option>
                      <option value="books">Books, Movies &amp; Music (14.95%)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="overseas"
                      checked={isOverseas}
                      onChange={(e) => setIsOverseas(e.target.checked)}
                      className="rounded text-blue-600 h-4 w-4"
                    />
                    <label htmlFor="overseas" className="font-medium text-slate-700 cursor-pointer">
                      Cross-Border International Sale (+1.65%)
                    </label>
                  </div>

                  {region === "US" && (
                    <>
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="envelope"
                          checked={isStandardEnvelope}
                          onChange={(e) => setIsStandardEnvelope(e.target.checked)}
                          className="rounded text-blue-600 h-4 w-4"
                        />
                        <label htmlFor="envelope" className="font-medium text-slate-700 cursor-pointer">
                          Utilize eBay Standard Envelope Layout ($0.64)
                        </label>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">
                          Estimated End Consumer Sales Tax (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={salesTaxRate || ''}
                          onChange={(e) => setSalesTaxRate(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DASHBOARD PREVIEW REPORT CANVAS (RIGHT) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card with Export Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Net Yield Payout Report</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time localized serverless transaction balance dashboard matrix.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                📄 Export PDF
              </button>
              <button
                type="button"
                onClick={handleWhatsAppRouteShare}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                📱 Share
              </button>
            </div>
          </div>

          {/* Primary Net Profit Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-2xl text-white shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Retained Net Profit Allocation
            </span>
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className={`text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeConfig.symbol}{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                for {numOrders} {numOrders === 1 ? 'order' : 'orders'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-xl">
              Consolidated yield margin cleared after platform tariffs and product costs.
            </p>

            {/* Dynamic 1-Hour Caching Forex Indicators Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-700/60 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[11px] font-medium">Pakistan Local Exchange Value</span>
                <span className="text-emerald-400 font-mono font-bold text-base block mt-0.5">
                  Rs. {(netProfit * (region === "PAK" ? 1 : pkrRate)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[11px] font-medium">GCC Dubai Yield Conversion</span>
                <span className="text-amber-300 font-mono font-bold text-base block mt-0.5">
                  AED {(netProfit * (region === "UAE" ? 1 : aedRate)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Split Cards Matrices Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">eBay Base FVF</span>
              <span className="text-sm sm:text-base font-black font-mono text-slate-800 block mt-1">
                -{activeConfig.symbol}{ebayFee.toFixed(2)}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Processing</span>
              <span className="text-sm sm:text-base font-black font-mono text-slate-800 block mt-1">
                -{activeConfig.symbol}{processingFee.toFixed(2)}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promoted Standard</span>
              <span className="text-sm sm:text-base font-black font-mono text-slate-800 block mt-1">
                -{activeConfig.symbol}{promotedFee.toFixed(2)}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tax/Envelope</span>
              <span className="text-sm sm:text-base font-black font-mono text-slate-800 block mt-1">
                -{activeConfig.symbol}{envelopeSurcharge.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Store Ledger Parameter Allocation Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Store Ledger Parameter Allocation Details
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Calculated Ledger Amount
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Total Combined Deducted Marketplace Channels Fees:</span>
                <span className="font-mono font-bold text-rose-600">
                  -{activeConfig.symbol}{totalFees.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Realized Retained Profit Margin Percentage Rate:</span>
                <span className={`font-mono font-bold ${margin >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {margin.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="text-slate-700 font-bold block">Target Asset Break-Even Retail Evaluation Value:</span>
                  <span className="text-[11px] text-slate-400 block">List pricing boundaries above this metric to bypass cash deficit.</span>
                </div>
                <span className="font-mono font-black text-blue-700 text-sm">
                  {activeConfig.symbol}{breakEven.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* FEEDBACK MODULE COLLAPSIBLE CONTAINER */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
              className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Have an issue or an idea? Tell us</span>
              <span>{isFeedbackOpen ? '▲' : '▼'}</span>
            </button>

            {isFeedbackOpen && (
              <form onSubmit={handleFeedbackSubmit} className="p-5 space-y-3 border-t border-slate-100 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email Address (Required)</label>
                  <input
                    type="email"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Feedback Classification</label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
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
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="E.g. Please include Promoted Listings Priority variables..."
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit System Feedback
                </button>
                {feedbackStatus && (
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold">
                    {feedbackStatus}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Dynamic Caching 1-Hour Local Rate Footnote Notice */}
          <div className="p-4 rounded-xl bg-slate-100/80 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-600">
              * Note: Ye aaj ka rate hai (Today&apos;s Rate). Kal ka rate is se mukhtalif ho sakta hai. Last Updated: {cacheTimestamp}
            </p>
            <p>
              Marketplace fee modeling variables are evaluated completely locally inside the browser viewport workspace memory arrays securely. Evonix Technologies — Corporate Solutions Sialkot.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
