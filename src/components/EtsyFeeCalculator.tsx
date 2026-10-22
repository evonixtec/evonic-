import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RefreshCw,
  Copy,
  Check,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export type EtsyCurrency = 'USD' | 'GBP' | 'PKR';

const CURRENCY_SYMBOLS: Record<EtsyCurrency, string> = {
  USD: '$',
  GBP: '£',
  PKR: 'Rs ',
};

const CURRENCY_RATES_TO_USD: Record<EtsyCurrency, number> = {
  USD: 1.0,
  GBP: 1.30,
  PKR: 0.0036,
};

export const EtsyFeeCalculator: React.FC = () => {
  const [currency, setCurrency] = useState<EtsyCurrency>('USD');
  const [itemPrice, setItemPrice] = useState<number>(35.0);
  const [shippingCharged, setShippingCharged] = useState<number>(5.0);
  const [itemCost, setItemCost] = useState<number>(10.0);
  const [shippingCost, setShippingCost] = useState<number>(4.0);
  const [quantity, setQuantity] = useState<number>(1);

  // Settings
  const [hasOffsiteAds, setHasOffsiteAds] = useState<boolean>(false);
  const [offsiteRate, setOffsiteRate] = useState<number>(15); // 15% standard or 12%
  const [applyRegulatoryFee, setApplyRegulatoryFee] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Outputs
  const [listingFee, setListingFee] = useState<number>(0);
  const [transactionFee, setTransactionFee] = useState<number>(0);
  const [paymentFee, setPaymentFee] = useState<number>(0);
  const [offsiteFee, setOffsiteFee] = useState<number>(0);
  const [regulatoryFee, setRegulatoryFee] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);

  const sym = CURRENCY_SYMBOLS[currency];

  const fmt = (val: number) => {
    return `${sym}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  useEffect(() => {
    const totalOrderRevenue = (itemPrice + shippingCharged) * quantity;
    const totalSellerCosts = (itemCost + shippingCost) * quantity;

    // 1. Listing fee: $0.20 per item
    const baseListingFeeUSD = 0.20 * quantity;
    const currentRate = CURRENCY_RATES_TO_USD[currency];
    const listingFeeLocal = baseListingFeeUSD / currentRate;

    // 2. Transaction fee: 6.5% of total sale (item + shipping)
    const txFee = totalOrderRevenue * 0.065;

    // 3. Payment processing fee: 3.0% + $0.25 standard
    const fixedPaymentFeeUSD = 0.25;
    const fixedPaymentFeeLocal = fixedPaymentFeeUSD / currentRate;
    const payFee = (totalOrderRevenue * 0.03) + fixedPaymentFeeLocal;

    // 4. Offsite Ads fee (optional 15% or 12%)
    const offsite = hasOffsiteAds ? totalOrderRevenue * (offsiteRate / 100) : 0;

    // 5. Regulatory Operating Fee (approx 0.32% for UK/EU)
    const regFee = applyRegulatoryFee ? totalOrderRevenue * 0.0032 : 0;

    const allFees = listingFeeLocal + txFee + payFee + offsite + regFee;
    const profit = totalOrderRevenue - totalSellerCosts - allFees;
    const margin = totalOrderRevenue > 0 ? (profit / totalOrderRevenue) * 100 : 0;

    setRevenue(totalOrderRevenue);
    setListingFee(listingFeeLocal);
    setTransactionFee(txFee);
    setPaymentFee(payFee);
    setOffsiteFee(offsite);
    setRegulatoryFee(regFee);
    setTotalFees(allFees);
    setTotalCost(totalSellerCosts);
    setNetProfit(profit);
    setProfitMargin(margin);
  }, [
    itemPrice,
    shippingCharged,
    itemCost,
    shippingCost,
    quantity,
    hasOffsiteAds,
    offsiteRate,
    applyRegulatoryFee,
    currency,
  ]);

  const handleCopySummary = () => {
    const summary = `Etsy Fee & Profit Breakdown 2026:
Sale Price: ${fmt(itemPrice)} | Shipping: ${fmt(shippingCharged)}
Total Revenue: ${fmt(revenue)}
Listing Fee ($0.20): ${fmt(listingFee)}
Transaction Fee (6.5%): ${fmt(transactionFee)}
Payment Processing (3% + 25¢): ${fmt(paymentFee)}
Offsite Ads Fee: ${fmt(offsiteFee)}
Total Etsy Fees: ${fmt(totalFees)}
Net Profit: ${fmt(netProfit)} (${profitMargin.toFixed(1)}% Margin)
Calculated via EVONIX Technologies: https://www.evonixtec.com/etsy-fee-calculator`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setItemPrice(35.0);
    setShippingCharged(5.0);
    setItemCost(10.0);
    setShippingCost(4.0);
    setQuantity(1);
    setHasOffsiteAds(false);
    setApplyRegulatoryFee(false);
  };

  const faqs = [
    {
      q: 'What are the main Etsy fees in 2026?',
      a: 'Etsy charges a $0.20 listing fee per item, a 6.5% transaction fee on total price including shipping, and a payment processing fee of 3% + $0.25.',
    },
    {
      q: 'What is the Etsy Offsite Ads fee?',
      a: 'If a buyer clicks an Etsy offsite ad on Google or Facebook and buys within 30 days, Etsy charges a 15% fee (or 12% if your sales top $10k/year).',
    },
    {
      q: 'Does Etsy charge fees on shipping?',
      a: 'Yes. The 6.5% transaction fee applies to the shipping amount you charge the buyer as well as the item price.',
    },
    {
      q: 'How often do Etsy listings renew?',
      a: 'Listings renew every 4 months or immediately when an item sells. Each renewal costs $0.20.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Notice Banner */}
        <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block">
              2026 Etsy Fee Schedule Active
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              Updated with $0.20 listing renewal, 6.5% transaction fee, and optional Offsite Ads simulator.
            </p>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Etsy Maker &amp; Vintage Calculator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Etsy Fee &amp; Profit Calculator 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Calculate exact listing renewals, 6.5% transaction cut, payment processing, and net profit payout.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['USD', 'GBP', 'PKR'] as EtsyCurrency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === c
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c === 'USD' ? '$ USD' : c === 'GBP' ? '£ GBP' : 'Rs PKR'}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-orange-600" />
                <span>Order &amp; Pricing Inputs</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-orange-600 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Item Sale Price ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-orange-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Shipping Charged to Buyer ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={shippingCharged}
                  onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-orange-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Item Cost / Materials ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={itemCost}
                  onChange={(e) => setItemCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-orange-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Your Actual Shipping Cost ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-orange-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Include Etsy Offsite Ads</span>
                  <span className="text-2xs text-slate-500">Charged only if buyer clicks an external ad</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasOffsiteAds}
                  onChange={(e) => setHasOffsiteAds(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded-sm"
                />
              </label>

              {hasOffsiteAds && (
                <div className="flex gap-2 pl-2">
                  <button
                    type="button"
                    onClick={() => setOffsiteRate(15)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      offsiteRate === 15
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    15% Standard (Under $10k)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOffsiteRate(12)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      offsiteRate === 12
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    12% High Volume ($10k+)
                  </button>
                </div>
              )}

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">UK / EU Regulatory Operating Fee</span>
                  <span className="text-2xs text-slate-500">Adds approx 0.32% for UK and EU sellers</span>
                </div>
                <input
                  type="checkbox"
                  checked={applyRegulatoryFee}
                  onChange={(e) => setApplyRegulatoryFee(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded-sm"
                />
              </label>
            </div>
          </div>

          {/* Results Summary Section */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Payout &amp; Margin Summary</span>
              <button
                type="button"
                onClick={handleCopySummary}
                className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </h2>

            {/* Net Profit Hero Box */}
            <div className="p-5 rounded-xl bg-orange-50/60 border border-orange-200 text-center space-y-1">
              <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">
                Estimated Net Profit
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-600">
                {fmt(netProfit)}
              </div>
              <div className="text-xs font-semibold text-slate-700">
                Profit Margin: <span className="font-bold text-emerald-600">{profitMargin.toFixed(1)}%</span>
              </div>
            </div>

            {/* Itemized Fees List */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Total Order Revenue</span>
                <span className="font-bold text-slate-900">{fmt(revenue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Listing Fee ($0.20)</span>
                <span className="font-semibold text-red-600">-{fmt(listingFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Transaction Fee (6.5%)</span>
                <span className="font-semibold text-red-600">-{fmt(transactionFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Payment Processing (3% + 25¢)</span>
                <span className="font-semibold text-red-600">-{fmt(paymentFee)}</span>
              </div>
              {hasOffsiteAds && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Offsite Ads Fee ({offsiteRate}%)</span>
                  <span className="font-semibold text-red-600">-{fmt(offsiteFee)}</span>
                </div>
              )}
              {applyRegulatoryFee && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Regulatory Operating Fee</span>
                  <span className="font-semibold text-red-600">-{fmt(regulatoryFee)}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-100 font-bold text-slate-800">
                <span>Total Etsy Deductions</span>
                <span className="text-red-700">-{fmt(totalFees)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Item &amp; Shipping Cost</span>
                <span className="font-semibold text-slate-800">-{fmt(totalCost)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
              Zero Database • Computed in Browser • 100% Free
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-4 font-bold text-sm text-slate-800 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Notice */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <p className="font-bold text-sm">Got a question? Call us. We reply in 2 hours.</p>
            <p className="text-xs text-slate-400">On-site IT and cross-border ecommerce consulting in Sialkot.</p>
          </div>
          <a
            href="tel:+923263244002"
            className="px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-xl hover:bg-orange-500 transition-colors"
          >
            Call +92 326 324 4002
          </a>
        </div>
      </main>
    </div>
  );
};

export default EtsyFeeCalculator;
