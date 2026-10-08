import React, { useState } from 'react';
import { SlidersHorizontal, DollarSign, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function EcommerceCalculator() {
  const [sellingPrice, setSellingPrice] = useState(4500);
  const [productCost, setProductCost] = useState(1600);
  const [adSpend, setAdSpend] = useState(1100);
  const [courierFee, setCourierFee] = useState(280);
  const [rtoRate, setRtoRate] = useState(18);
  const [reverseFee, setReverseFee] = useState(180);

  const deliveredRate = (100 - rtoRate) / 100;
  const deliveryExpense = courierFee + ((rtoRate / 100) * reverseFee);
  const effectiveRevenue = sellingPrice * deliveredRate;
  const totalCogs = productCost * deliveredRate;
  const netProfitPerOrder = effectiveRevenue - totalCogs - adSpend - deliveryExpense;
  const netMargin = (netProfitPerOrder / sellingPrice) * 100;
  const breakevenRoas = sellingPrice / (productCost + deliveryExpense);

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
              E-Commerce &amp; Ads Engine
            </span>
            <span className="text-xs text-slate-500 font-mono">COD &amp; Return Profit Simulator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">E-Commerce Margin &amp; COD Simulator</h1>
          <p className="text-xs sm:text-sm text-slate-600">Simulate Pakistani and international e-commerce cash flows with real courier fees, return losses, and advertising ROAS.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b pb-2">Unit Economics Inputs</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Retail Selling Price (PKR / USD)</label>
                <input type="number" aria-label="Retail Selling Price" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono font-bold bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Sourcing / Manufacturing Cost</label>
                <input type="number" aria-label="Product Sourcing or Manufacturing Cost" value={productCost} onChange={(e) => setProductCost(Number(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono font-bold bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ad Spend Cost per Purchase (CAC)</label>
                <input type="number" aria-label="Ad Spend Cost per Purchase CAC" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono font-bold bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Courier Delivery Fee (TCS/Leopards)</label>
                <input type="number" aria-label="Courier Delivery Fee" value={courierFee} onChange={(e) => setCourierFee(Number(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono font-bold bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Return to Origin (RTO) Rate: {rtoRate}%</label>
                <input type="range" aria-label="Return to Origin RTO Percentage Rate" min="0" max="40" value={rtoRate} onChange={(e) => setRtoRate(Number(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs text-slate-400 font-bold block pb-3 border-b border-slate-800">Profit Simulation Output</span>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between"><span>Net Profit Per Dispatched Order:</span><span className={`font-mono font-bold text-base ${netProfitPerOrder > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{netProfitPerOrder.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Net Margin:</span><span className="font-mono font-bold text-amber-400">{netMargin.toFixed(1)}%</span></div>
                <div className="flex justify-between"><span>Target Breakeven ROAS:</span><span className="font-mono font-bold text-blue-400">{breakevenRoas.toFixed(2)}x</span></div>
                <div className="flex justify-between"><span>Delivery Success Rate:</span><span className="font-mono text-slate-300">{(deliveredRate * 100).toFixed(0)}%</span></div>
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-slate-300">
              {netProfitPerOrder > 0 ? 'Profitable model: Healthy cash flow after courier deductions.' : 'Warning: High returns or acquisition costs eating margins.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
