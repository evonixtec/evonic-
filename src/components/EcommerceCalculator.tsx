import React, { useState } from 'react';
import { SlidersHorizontal, DollarSign, TrendingUp, AlertTriangle, ShieldCheck, Calculator } from 'lucide-react';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export default function EcommerceCalculator() {
  const [sellingPrice, setSellingPrice] = useState(4500);
  const [productCost, setProductCost] = useState(1600);
  const [adSpend, setAdSpend] = useState(1100);
  const [courierFee, setCourierFee] = useState(280);
  const [rtoRate, setRtoRate] = useState(18);
  const [reverseFee, setReverseFee] = useState(180);

  // Precision formulas preserved exactly
  const deliveredRate = (100 - rtoRate) / 100;
  const deliveryExpense = courierFee + ((rtoRate / 100) * reverseFee);
  const effectiveRevenue = sellingPrice * deliveredRate;
  const totalCogs = productCost * deliveredRate;
  const netProfitPerOrder = effectiveRevenue - totalCogs - adSpend - deliveryExpense;
  const netMargin = (netProfitPerOrder / sellingPrice) * 100;
  const breakevenRoas = sellingPrice / (productCost + deliveryExpense);

  const [hasCalculated, setHasCalculated] = useState(true);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  return (
    <div className="py-8 min-h-screen apple-tool-layout text-[#1d1d1f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Apple Clean Header */}
        <div className="apple-glass-box p-6 sm:p-7">
          <div className="flex items-center gap-2">
            <span className="apple-badge">
              E-Commerce &amp; Ads Engine
            </span>
            <span className="text-xs text-[#86868b] font-mono">COD &amp; Return Profit Simulator</span>
          </div>
          <h1 className="apple-tool-title mt-2">E-Commerce Margin &amp; COD Simulator</h1>
          <p className="apple-tool-subtitle">Simulate Pakistani and international e-commerce cash flows with real courier fees, return losses, and advertising ROAS.</p>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs Card */}
          <div className="apple-glass-box p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#1d1d1f] border-b border-black/[0.06] pb-2">Unit Economics Inputs</h2>
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Retail Selling Price (PKR / USD)</label>
                <input 
                  type="number" 
                  aria-label="Retail Selling Price" 
                  value={sellingPrice} 
                  onChange={(e) => setSellingPrice(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-semibold" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Product Sourcing / Manufacturing Cost</label>
                <input 
                  type="number" 
                  aria-label="Product Sourcing or Manufacturing Cost" 
                  value={productCost} 
                  onChange={(e) => setProductCost(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-semibold" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Ad Spend Cost per Purchase (CAC)</label>
                <input 
                  type="number" 
                  aria-label="Ad Spend Cost per Purchase CAC" 
                  value={adSpend} 
                  onChange={(e) => setAdSpend(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-semibold" 
                />
              </div>
              <div>
                <label className="block text-[#86868b] font-medium mb-1">Courier Delivery Fee (TCS/Leopards)</label>
                <input 
                  type="number" 
                  aria-label="Courier Delivery Fee" 
                  value={courierFee} 
                  onChange={(e) => setCourierFee(Number(e.target.value) || 0)} 
                  className="apple-input w-full font-mono font-semibold" 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[#86868b] font-medium">Return to Origin (RTO) Rate:</label>
                  <span className="font-mono font-semibold text-[#0071e3] text-xs">{rtoRate}%</span>
                </div>
                <input 
                  type="range" 
                  aria-label="Return to Origin RTO Percentage Rate" 
                  min="0" 
                  max="40" 
                  value={rtoRate} 
                  onChange={(e) => setRtoRate(Number(e.target.value))} 
                  className="w-full accent-[#0071e3] cursor-pointer" 
                />
              </div>
            </div>

            {/* Apple Blue Calculate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCalculate}
                className="apple-calculate-btn"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Net Margin &amp; ROAS</span>
              </button>
            </div>
          </div>

          {/* Liquid Glass Results Panel */}
          <div className="apple-result-box p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs text-[#86868b] font-semibold block pb-2 border-b border-black/[0.06]">Profit Simulation Output</span>
              
              <div className="space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Net Profit Per Dispatched Order:</span>
                  <span className={`font-mono font-bold text-lg ${netProfitPerOrder > 0 ? 'text-[#0071e3]' : 'text-rose-600'}`}>
                    {netProfitPerOrder.toFixed(0)}
                  </span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Net Margin:</span>
                  <span className="font-mono font-semibold text-[#1d1d1f] text-sm">{netMargin.toFixed(1)}%</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Target Breakeven ROAS:</span>
                  <span className="font-mono font-semibold text-[#0071e3] text-sm">{breakevenRoas.toFixed(2)}x</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Delivery Success Rate:</span>
                  <span className="apple-metric-val">{(deliveredRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/70 rounded-xl text-[11px] text-[#86868b] border border-black/[0.04]">
              {netProfitPerOrder > 0 
                ? 'Profitable model: Healthy cash flow after courier deductions and estimated reverse transit costs.' 
                : 'Warning: High returns or customer acquisition costs are eating into margins. Consider lowering RTO or CAC.'}
            </div>
          </div>
        </div>

        {/* Semantically Optimized Technical Article & High-Resolution Tool Preview */}
        <ToolArticleGuideSection toolId="ecommerce-calculator" />
      </div>
    </div>
  );
}
