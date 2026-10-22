import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RefreshCw,
  Copy,
  Check,
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export type FbmCurrency = 'USD' | 'GBP' | 'PKR';

const CURRENCY_SYMBOLS: Record<FbmCurrency, string> = {
  USD: '$',
  GBP: '£',
  PKR: 'Rs ',
};

export const AmazonFbmCalculator: React.FC = () => {
  const [currency, setCurrency] = useState<FbmCurrency>('USD');
  const [salePrice, setSalePrice] = useState<number>(45.0);
  const [shippingCharged, setShippingCharged] = useState<number>(0.0);
  const [cogs, setCogs] = useState<number>(12.0);
  const [merchantShippingCost, setMerchantShippingCost] = useState<number>(6.5);
  const [packagingCost, setPackagingCost] = useState<number>(1.2);
  const [referralRate, setReferralRate] = useState<number>(15.0); // %
  const [ppcAdSpend, setPpcAdSpend] = useState<number>(3.5);
  const [returnRate, setReturnRate] = useState<number>(3.0); // %

  const [copied, setCopied] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Outputs
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [referralFee, setReferralFee] = useState<number>(0);
  const [returnReserve, setReturnReserve] = useState<number>(0);
  const [totalDirectCosts, setTotalDirectCosts] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [breakEvenAcos, setBreakEvenAcos] = useState<number>(0);

  const sym = CURRENCY_SYMBOLS[currency];

  const fmt = (val: number) => {
    return `${sym}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  useEffect(() => {
    const rev = salePrice + shippingCharged;
    // Amazon referral fee ($0.30 minimum)
    const rawRef = rev * (referralRate / 100);
    const ref = Math.max(0.30, rawRef);

    const ret = rev * (returnRate / 100);
    const directCosts = cogs + merchantShippingCost + packagingCost + ppcAdSpend + ret;
    const profit = rev - ref - directCosts;
    const margin = rev > 0 ? (profit / rev) * 100 : 0;
    const beAcos = rev > 0 ? (Math.max(0, profit + ppcAdSpend) / rev) * 100 : 0;

    setTotalRevenue(rev);
    setReferralFee(ref);
    setReturnReserve(ret);
    setTotalDirectCosts(directCosts);
    setNetProfit(profit);
    setProfitMargin(margin);
    setBreakEvenAcos(beAcos);
  }, [
    salePrice,
    shippingCharged,
    cogs,
    merchantShippingCost,
    packagingCost,
    referralRate,
    ppcAdSpend,
    returnRate,
  ]);

  const handleCopySummary = () => {
    const summary = `Amazon FBM Fee Breakdown 2026:
Sale Price: ${fmt(salePrice)} | Shipping Charged: ${fmt(shippingCharged)}
Total Revenue: ${fmt(totalRevenue)}
Referral Fee (${referralRate}%): ${fmt(referralFee)}
Merchant Carrier Shipping: ${fmt(merchantShippingCost)}
Packaging & Materials: ${fmt(packagingCost)}
PPC Advertising: ${fmt(ppcAdSpend)}
Total Direct Costs: ${fmt(totalDirectCosts)}
Net Profit: ${fmt(netProfit)} (${profitMargin.toFixed(1)}% Margin)
Break-Even ACoS: ${breakEvenAcos.toFixed(1)}%
Calculated via EVONIX Technologies: https://www.evonixtec.com/amazon-fbm-calculator`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSalePrice(45.0);
    setShippingCharged(0.0);
    setCogs(12.0);
    setMerchantShippingCost(6.5);
    setPackagingCost(1.2);
    setReferralRate(15.0);
    setPpcAdSpend(3.5);
    setReturnRate(3.0);
  };

  const faqs = [
    {
      q: 'What is Amazon FBM (Fulfilled by Merchant)?',
      a: 'With FBM, you list products on Amazon but store, pack, and ship orders yourself or through your own third-party logistics partner.',
    },
    {
      q: 'What fees does Amazon charge on FBM orders?',
      a: 'Amazon charges a category referral fee (usually 15% with a $0.30 minimum) on the total price including shipping. You avoid all FBA fulfillment, fuel, and storage fees.',
    },
    {
      q: 'Is Amazon FBM cheaper than FBA?',
      a: 'FBM is often cheaper for heavy, bulky, or low-turnover items where Amazon storage fees and oversized pick fees would hurt margins.',
    },
    {
      q: 'What is Break-Even ACoS for FBM?',
      a: 'Break-even ACoS equals your profit margin before advertising spend. It is the maximum ad percentage you can spend per sale without losing money.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Notice Banner */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
              2026 Amazon FBM Schedule Active
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              Calculate exact category referral cuts, merchant shipping costs, packaging, and break-even ACoS.
            </p>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Fulfilled by Merchant Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Amazon FBM Fee &amp; Profit Calculator 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Compare merchant self-shipping against Amazon referral fees, ad spend, and net seller payout.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['USD', 'GBP', 'PKR'] as FbmCurrency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === c
                    ? 'bg-white text-blue-600 shadow-xs'
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
          {/* Inputs */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Price &amp; Carrier Costs</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Listing Sale Price ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Customer Shipping Charged ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={shippingCharged}
                  onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Product Cost (COGS) ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={cogs}
                  onChange={(e) => setCogs(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Merchant Shipping Cost ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={merchantShippingCost}
                  onChange={(e) => setMerchantShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Packaging &amp; Box ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Referral Fee Rate (%)</label>
                <select
                  value={referralRate}
                  onChange={(e) => setReferralRate(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                >
                  <option value={15}>Standard Merchandise (15%)</option>
                  <option value={8}>Consumer Electronics (8%)</option>
                  <option value={17}>Apparel &amp; Shoes (17%)</option>
                  <option value={10}>Grocery &amp; Gourmet (10%)</option>
                  <option value={45}>Device Accessories (45%)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">PPC Ad Spend Per Sale ({sym})</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={ppcAdSpend}
                  onChange={(e) => setPpcAdSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Return &amp; Damage Reserve (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>FBM Margin Breakdown</span>
              <button
                type="button"
                onClick={handleCopySummary}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </h2>

            {/* Profit Card */}
            <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200 text-center space-y-1">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Estimated Net Profit
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                {fmt(netProfit)}
              </div>
              <div className="text-xs font-semibold text-slate-700 flex justify-center gap-3">
                <span>Margin: <strong className="text-emerald-600">{profitMargin.toFixed(1)}%</strong></span>
                <span>Break-Even ACoS: <strong className="text-blue-700">{breakEvenAcos.toFixed(1)}%</strong></span>
              </div>
            </div>

            {/* Deductions breakdown */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Total Order Revenue</span>
                <span className="font-bold text-slate-900">{fmt(totalRevenue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Amazon Referral Fee ({referralRate}%)</span>
                <span className="font-semibold text-red-600">-{fmt(referralFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Merchant Carrier Shipping</span>
                <span className="font-semibold text-slate-800">-{fmt(merchantShippingCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Packaging &amp; Materials</span>
                <span className="font-semibold text-slate-800">-{fmt(packagingCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>PPC Ad Spend</span>
                <span className="font-semibold text-slate-800">-{fmt(ppcAdSpend)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Product Unit Cost (COGS)</span>
                <span className="font-semibold text-slate-800">-{fmt(cogs)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 font-bold text-slate-800">
                <span>Total Seller Deductions</span>
                <span className="text-red-700">-{fmt(referralFee + totalDirectCosts)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
              Zero Database • Instant Calculation • 100% Free
            </div>
          </div>
        </div>

        {/* FAQs */}
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
            className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500 transition-colors"
          >
            Call +92 326 324 4002
          </a>
        </div>
      </main>
    </div>
  );
};

export default AmazonFbmCalculator;
