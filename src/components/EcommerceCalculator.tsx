import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Truck,
  Percent,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  Scale,
  ShieldAlert,
  Boxes,
  PieChart,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export interface CourierOption {
  id: string;
  name: string;
  codeName: string;
  baseRateFirstKg: number;
  additionalKgRate: number;
  codTariffFlat: number;
  codTariffPercent: number; // e.g., 2.5%
  typicalSla: string;
  badge?: string;
  trackingPortalUrl?: string;
}

export const COURIER_DIRECTORY: CourierOption[] = [
  {
    id: 'leopard',
    name: 'Leopards Courier',
    codeName: 'LCS Swift Express',
    baseRateFirstKg: 190,
    additionalKgRate: 150,
    codTariffFlat: 50,
    codTariffPercent: 2.5,
    typicalSla: '24 - 48 Hours',
    badge: 'Popular',
  },
  {
    id: 'tcs',
    name: 'TCS Logistics',
    codeName: 'TCS Overnight COD',
    baseRateFirstKg: 240,
    additionalKgRate: 180,
    codTariffFlat: 60,
    codTariffPercent: 3.0,
    typicalSla: 'Next Day Express',
    badge: 'Fastest',
  },
  {
    id: 'trax',
    name: 'Trax Swift',
    codeName: 'Trax Online Logistics',
    baseRateFirstKg: 175,
    additionalKgRate: 130,
    codTariffFlat: 45,
    codTariffPercent: 2.5,
    typicalSla: '48 - 72 Hours',
    badge: 'Low Cost',
  },
  {
    id: 'postex',
    name: 'PostEx Rapid',
    codeName: 'PostEx Fintech COD',
    baseRateFirstKg: 170,
    additionalKgRate: 125,
    codTariffFlat: 40,
    codTariffPercent: 2.0,
    typicalSla: '48 - 72 Hours',
    badge: 'Fast COD Payout',
  },
  {
    id: 'mnp',
    name: 'M&P Express',
    codeName: 'M&P COD Network',
    baseRateFirstKg: 210,
    additionalKgRate: 160,
    codTariffFlat: 50,
    codTariffPercent: 2.8,
    typicalSla: '24 - 48 Hours',
  },
  {
    id: 'callcourier',
    name: 'Call Courier',
    codeName: 'Call Courier Standard',
    baseRateFirstKg: 185,
    additionalKgRate: 140,
    codTariffFlat: 45,
    codTariffPercent: 2.5,
    typicalSla: '48 - 72 Hours',
  },
];

interface ProductPreset {
  id: string;
  name: string;
  productCost: number;
  salePrice: number;
  packagingCost: number;
  marketingCost: number;
  weight: number;
  category: string;
}

const INDUSTRY_PRESETS: ProductPreset[] = [
  {
    id: 'apparel',
    name: 'T-Shirt / Polo Shirt',
    productCost: 450,
    salePrice: 1499,
    packagingCost: 35,
    marketingCost: 280,
    weight: 0.35,
    category: 'Fashion & Apparel',
  },
  {
    id: 'leather-goods',
    name: 'Sialkot Leather Wallet / Belt',
    productCost: 850,
    salePrice: 2450,
    packagingCost: 65,
    marketingCost: 350,
    weight: 0.45,
    category: 'Sialkot Leather Craft',
  },
  {
    id: 'gadgets',
    name: 'Wireless Earbuds / Smartwatch',
    productCost: 1200,
    salePrice: 2899,
    packagingCost: 40,
    marketingCost: 420,
    weight: 0.25,
    category: 'Electronics & Accessories',
  },
  {
    id: 'sports',
    name: 'Gym Gloves / Boxing Wraps',
    productCost: 600,
    salePrice: 1750,
    packagingCost: 30,
    marketingCost: 250,
    weight: 0.3,
    category: 'Sialkot Sports Goods',
  },
  {
    id: 'skincare',
    name: 'Organic Serum / Face Cream',
    productCost: 380,
    salePrice: 1850,
    packagingCost: 55,
    marketingCost: 390,
    weight: 0.2,
    category: 'Cosmetics & Beauty',
  },
];

export default function EcommerceCalculator() {
  // Core Financial Matrix States
  const [productCost, setProductCost] = useState<number>(500);
  const [salePrice, setSalePrice] = useState<number>(1500);
  const [packagingCost, setPackagingCost] = useState<number>(30);
  const [marketingCost, setMarketingCost] = useState<number>(200);

  // Dynamic Courier Framework States
  const [selectedCourier, setSelectedCourier] = useState<string>('leopard');
  const [shipmentWeight, setShipmentWeight] = useState<number>(0.5); // in kg
  const [codHandlingFee, setCodHandlingFee] = useState<number>(50);
  const [baseCourierRate, setBaseCourierRate] = useState<number>(180);

  // Advanced Unit Economics States (Sialkot & Pakistan Real-World Market Factors)
  const [returnRatePercent, setReturnRatePercent] = useState<number>(8); // 8% standard return rate
  const [monthlyOverheadCost, setMonthlyOverheadCost] = useState<number>(50000); // Staff, Rent, Utilities
  const [estimatedMonthlyOrders, setEstimatedMonthlyOrders] = useState<number>(300);

  // Volumetric Dimensions Helper
  const [isVolumetricEnabled, setIsVolumetricEnabled] = useState<boolean>(false);
  const [lengthCm, setLengthCm] = useState<number>(20);
  const [widthCm, setWidthCm] = useState<number>(15);
  const [heightCm, setHeightCm] = useState<number>(5);

  // Computed Outputs
  const [netProfit, setNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [roiPercentage, setRoiPercentage] = useState<number>(0);

  // Toast / feedback state
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Calculate volumetric weight: (L * W * H) / 5000
  const volumetricWeight = useMemo(() => {
    if (!isVolumetricEnabled) return 0;
    return Number(((lengthCm * widthCm * heightCm) / 5000).toFixed(2));
  }, [isVolumetricEnabled, lengthCm, widthCm, heightCm]);

  const effectiveBillableWeight = useMemo(() => {
    if (!isVolumetricEnabled) return shipmentWeight;
    return Math.max(shipmentWeight, volumetricWeight);
  }, [isVolumetricEnabled, shipmentWeight, volumetricWeight]);

  // Sync courier parameters when selected courier changes
  const handleCourierSelect = (courierId: string) => {
    setSelectedCourier(courierId);
    const courier = COURIER_DIRECTORY.find((c) => c.id === courierId);
    if (courier) {
      // Weight tier rate computation: first kg is baseRateFirstKg, subsequent weight prorated
      const calculatedBase =
        effectiveBillableWeight <= 1
          ? courier.baseRateFirstKg
          : courier.baseRateFirstKg +
            Math.ceil(effectiveBillableWeight - 1) * courier.additionalKgRate;

      setBaseCourierRate(calculatedBase);

      // Standard COD fee: higher of flat tariff or percent of retail price
      const percentageTariff = Math.round((salePrice * courier.codTariffPercent) / 100);
      const computedCod = Math.max(courier.codTariffFlat, percentageTariff);
      setCodHandlingFee(computedCod);
    }
  };

  // Preset selector
  const handleApplyPreset = (preset: ProductPreset) => {
    setProductCost(preset.productCost);
    setSalePrice(preset.salePrice);
    setPackagingCost(preset.packagingCost);
    setMarketingCost(preset.marketingCost);
    setShipmentWeight(preset.weight);

    // Re-evaluate courier with new weight and price
    const courier = COURIER_DIRECTORY.find((c) => c.id === selectedCourier);
    if (courier) {
      const calculatedBase =
        preset.weight <= 1
          ? courier.baseRateFirstKg
          : courier.baseRateFirstKg +
            Math.ceil(preset.weight - 1) * courier.additionalKgRate;
      setBaseCourierRate(calculatedBase);

      const percentageTariff = Math.round((preset.salePrice * courier.codTariffPercent) / 100);
      setCodHandlingFee(Math.max(courier.codTariffFlat, percentageTariff));
    }
  };

  // Automatic live calculation updates loop trigger
  useEffect(() => {
    executeMarginAnalysis();
  }, [
    productCost,
    salePrice,
    packagingCost,
    marketingCost,
    selectedCourier,
    shipmentWeight,
    codHandlingFee,
    baseCourierRate,
  ]);

  const executeMarginAnalysis = () => {
    // Total variable expenses combination
    const totalExpenses =
      productCost + packagingCost + marketingCost + baseCourierRate + codHandlingFee;
    const computedProfit = salePrice - totalExpenses;

    setNetProfit(computedProfit);

    if (salePrice > 0) {
      setProfitMargin((computedProfit / salePrice) * 100);
    } else {
      setProfitMargin(0);
    }

    if (productCost > 0) {
      setRoiPercentage((computedProfit / productCost) * 100);
    } else {
      setRoiPercentage(0);
    }
  };

  // Additional advanced derived metrics
  const totalVariableCost = productCost + packagingCost + marketingCost + baseCourierRate + codHandlingFee;
  const breakEvenUnits = netProfit > 0 ? Math.ceil(monthlyOverheadCost / netProfit) : null;
  const grossMarginPkr = salePrice - productCost;
  const grossMarginPercent = salePrice > 0 ? (grossMarginPkr / salePrice) * 100 : 0;

  // Realized Net Profit accounting for RTO (Return to Origin) rate
  // In Pakistan, a returned COD parcel costs roughly the base return courier fee (often 100% of forward base rate or 50%)
  // plus packaging wastage.
  const returnCostPerReturnedOrder = baseCourierRate + packagingCost;
  const deliverySuccessRate = 1 - returnRatePercent / 100;
  const expectedReturnLossPerOrder = (returnRatePercent / 100) * returnCostPerReturnedOrder;
  const rtoAdjustedNetProfit = Number((netProfit * deliverySuccessRate - expectedReturnLossPerOrder).toFixed(1));
  const rtoAdjustedMargin = salePrice > 0 ? Number(((rtoAdjustedNetProfit / salePrice) * 100).toFixed(1)) : 0;

  // Proportional breakdown percentages
  const productShare = salePrice > 0 ? Math.max(0, (productCost / salePrice) * 100) : 0;
  const marketingShare = salePrice > 0 ? Math.max(0, (marketingCost / salePrice) * 100) : 0;
  const courierShare = salePrice > 0 ? Math.max(0, ((baseCourierRate + codHandlingFee) / salePrice) * 100) : 0;
  const packagingShare = salePrice > 0 ? Math.max(0, (packagingCost / salePrice) * 100) : 0;
  const profitShare = salePrice > 0 ? Math.max(0, (netProfit / salePrice) * 100) : 0;

  // Copy summary to clipboard
  const handleCopySummary = () => {
    const activeCourierObj = COURIER_DIRECTORY.find((c) => c.id === selectedCourier);
    const summaryText = `📊 EVONIX TECHNOLOGIES — E-COMMERCE MARGIN BREAKDOWN
============================================
🏷️ Retail Sale Price:      PKR ${salePrice.toLocaleString()}
📦 Product Cost Price:    PKR ${productCost.toLocaleString()}
🚚 Courier (${activeCourierObj?.name || selectedCourier}): PKR ${baseCourierRate}
💰 COD Handling Tariff:    PKR ${codHandlingFee}
📦 Packaging Wrapper:      PKR ${packagingCost}
📣 Marketing (CAC):        PKR ${marketingCost}
--------------------------------------------
💸 Total Expenses:         PKR ${totalVariableCost.toLocaleString()}
✨ NET PROFIT (Per Unit):  PKR ${netProfit.toLocaleString()}
📈 Net Profit Margin:      ${profitMargin.toFixed(1)}%
🎯 ROI on Product:         ${roiPercentage.toFixed(1)}%
🔄 RTO-Adjusted Net Profit: PKR ${rtoAdjustedNetProfit.toLocaleString()} (at ${returnRatePercent}% returns)
============================================
Generated via evonix technologies Serverless Tools Matrix`;

    navigator.clipboard.writeText(summaryText);
    setCopiedNotification('Summary copied to clipboard!');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Reset to default standard state
  const handleReset = () => {
    setProductCost(500);
    setSalePrice(1500);
    setPackagingCost(30);
    setMarketingCost(200);
    setSelectedCourier('leopard');
    setShipmentWeight(0.5);
    setCodHandlingFee(50);
    setBaseCourierRate(180);
    setReturnRatePercent(8);
    setIsVolumetricEnabled(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Banner Toolbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>E-Commerce Profit & Courier Shipping Margin Calculator</span>
                <span className="text-[10px] bg-red-600/90 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                  Zero-Database
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Unit economics, multi-courier shipping tariffs, COD deductions, and RTO return loss simulator.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Reset values to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Copy financial breakdown to clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Summary</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              title="Print financial sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {copiedNotification && (
        <div className="fixed top-28 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Strategic Unit Economics Executive Banner */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="relative z-10 max-w-4xl space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>evonix technologies • Commercial E-Commerce Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Strategic Unit Economics for Scalable E-Commerce Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Operating a successful digital retail storefront requires sharp control over product unit economics and hidden delivery overheads. Independent Shopify store owners, Amazon FBA suppliers, and local drop-shippers often focus solely on the visual product cost and customer acquisition layout, overlooking continuous logistics pricing metrics. The evonix Technologies E-Commerce Margin Calculator removes structural accounting guesswork by instantly breaking down your target item cost structures. It factors in packaging costs, dynamic multi-courier shipping rates, and cash-on-delivery (COD) service fees directly inside your browser layout, helping you protect your margins and verify product profitability in a single dashboard view.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Responsive Workspace */}
      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ========================================================
            LEFT COLUMN (1 Col on Desktop): INPUT CONTROLS WRAPPER
           ======================================================== */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Margin Setup Panel</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust unit economics & courier parameters
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
              Step 1 of 2
            </span>
          </div>

          {/* Quick Industry Presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Industry Presets</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {INDUSTRY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2 text-left rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition-all text-xs cursor-pointer group"
                >
                  <div className="font-bold text-slate-800 text-[11px] group-hover:text-red-600 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Rs {preset.salePrice} (Cost: Rs {preset.productCost})
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Cost Inputs Block */}
          <div className="space-y-3.5 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Product Financial Metrics</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Currency: PKR</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600">
                Product Cost Price (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={productCost}
                onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                placeholder="500"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Manufacturing, vendor purchase, or raw material cost.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600">
                Retail Sale Price (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={salePrice}
                onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 mt-1 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                placeholder="1500"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Final price listed on Shopify, WooCommerce, or TikTok Shop.
              </span>
            </div>
          </div>

          {/* Operational Costs Block */}
          <div className="space-y-3.5 border-t border-slate-100 pt-4">
            <label className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Expenses & Marketing</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600">Packaging Wrapper</label>
                <input
                  type="number"
                  min="0"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 bg-white"
                  placeholder="30"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Flyer, box, bubble wrap.</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">Marketing (CAC/Order)</label>
                <input
                  type="number"
                  min="0"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 bg-white"
                  placeholder="200"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Meta/TikTok Ad spend.</span>
              </div>
            </div>
          </div>

          {/* Courier System Parameters Map Selection */}
          <div className="space-y-3.5 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Courier Logistics Configurations</span>
              </label>
              <span className="text-[10px] font-bold text-red-600 uppercase">Multi-Courier</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600">
                Courier Selection Mapping
              </label>
              <select
                value={selectedCourier}
                onChange={(e) => handleCourierSelect(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 bg-white cursor-pointer focus:outline-none focus:border-red-500"
              >
                <option value="leopard">Leopards Courier (Standard Express COD)</option>
                <option value="tcs">TCS Logistics (Overnight Priority)</option>
                <option value="trax">Trax Swift (Budget Online COD)</option>
                <option value="postex">PostEx Rapid (Fintech COD)</option>
                <option value="mnp">M&P Express (Nationwide Network)</option>
                <option value="callcourier">Call Courier (Standard COD)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600">Weight Limit (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={shipmentWeight}
                  onChange={(e) => setShipmentWeight(parseFloat(e.target.value) || 0.1)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 bg-white"
                  placeholder="0.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">COD Handling Tariffs</label>
                <input
                  type="number"
                  min="0"
                  value={codHandlingFee}
                  onChange={(e) => setCodHandlingFee(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 bg-white"
                  placeholder="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600">Base Shipping Charge (PKR)</label>
              <input
                type="number"
                min="0"
                value={baseCourierRate}
                onChange={(e) => setBaseCourierRate(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-red-500 bg-white"
                placeholder="180"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Standard delivery fee billed by the courier for first 0.5kg/1kg.
              </span>
            </div>

            {/* Optional Volumetric Calculator Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsVolumetricEnabled(!isVolumetricEnabled)}
                className="text-xs font-semibold text-slate-700 hover:text-red-600 flex items-center justify-between w-full py-1 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-purple-600" />
                  <span>Volumetric Weight Calculator (L × W × H)</span>
                </span>
                <span className="text-[11px] font-bold text-red-600">
                  {isVolumetricEnabled ? 'Hide' : 'Calculate'}
                </span>
              </button>

              {isVolumetricEnabled && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold">Length (cm)</label>
                      <input
                        type="number"
                        min="1"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(parseFloat(e.target.value) || 1)}
                        className="w-full p-1.5 text-xs border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold">Width (cm)</label>
                      <input
                        type="number"
                        min="1"
                        value={widthCm}
                        onChange={(e) => setWidthCm(parseFloat(e.target.value) || 1)}
                        className="w-full p-1.5 text-xs border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold">Height (cm)</label>
                      <input
                        type="number"
                        min="1"
                        value={heightCm}
                        onChange={(e) => setHeightCm(parseFloat(e.target.value) || 1)}
                        className="w-full p-1.5 text-xs border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Volumetric Weight:</span>
                    <span className="font-mono font-bold text-purple-700">{volumetricWeight} KG</span>
                  </div>
                  {volumetricWeight > shipmentWeight && (
                    <div className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                      ⚠️ Volumetric weight ({volumetricWeight}kg) is greater than physical weight ({shipmentWeight}kg). Couriers will bill for {volumetricWeight}kg!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Return / RTO Risk Rate Slider */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>COD Return / RTO Rate Cushion</span>
                </span>
                <span className="font-mono font-bold text-rose-600">{returnRatePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={returnRatePercent}
                onChange={(e) => setReturnRatePercent(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0% (Perfect)</span>
                <span>8-12% (Pakistan Avg)</span>
                <span>30% (High Risk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN (2 Cols on Desktop): VISUAL DASHBOARD
           ======================================================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top 3 Core Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* KPI 1: Net Profit per Unit */}
            <div
              className={`p-5 rounded-2xl border shadow-xs transition-all ${
                netProfit > 0
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400 shadow-emerald-500/20'
                  : netProfit === 0
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-400 shadow-rose-500/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
                <span>Net Profit / Order</span>
                {netProfit >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-emerald-100" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-rose-100" />
                )}
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1">
                Rs {netProfit.toLocaleString()}
              </div>
              <div className="text-xs opacity-90 mt-2 font-medium">
                {netProfit > 0 ? (
                  <span>✅ Profitable unit economics</span>
                ) : netProfit === 0 ? (
                  <span>Exact Breakeven (0 Profit)</span>
                ) : (
                  <span>⚠️ Loss of Rs {Math.abs(netProfit)} per order!</span>
                )}
              </div>
            </div>

            {/* KPI 2: Profit Margin % */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Profit Margin</span>
                <Percent className="w-4 h-4 text-slate-400" />
              </div>
              <div
                className={`text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1 ${
                  profitMargin >= 30
                    ? 'text-emerald-600'
                    : profitMargin >= 15
                    ? 'text-amber-600'
                    : 'text-rose-600'
                }`}
              >
                {profitMargin.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-2 font-medium">
                {profitMargin >= 30
                  ? '🌟 Strong sustainable margin'
                  : profitMargin >= 15
                  ? '⚖️ Moderate margin'
                  : '🚨 Thin margin (High risk of ad loss)'}
              </div>
            </div>

            {/* KPI 3: Return on Investment (ROI %) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>ROI on Product</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div
                className={`text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1 ${
                  roiPercentage >= 100
                    ? 'text-purple-600'
                    : roiPercentage > 0
                    ? 'text-blue-600'
                    : 'text-rose-600'
                }`}
              >
                {roiPercentage.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-2 font-medium">
                Return on capital invested in inventory
              </div>
            </div>
          </div>

          {/* Visual Expense Stacked Bar (Where does each rupee go?) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-slate-700" />
                <span>Revenue Share Breakdown (% of Retail Sale Price)</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-700">
                100% = Rs {salePrice.toLocaleString()}
              </span>
            </div>

            {/* Stacked Progress Bar */}
            <div className="h-5 rounded-xl bg-slate-100 overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${Math.min(100, productShare)}%` }}
                className="bg-blue-500 transition-all duration-300"
                title={`Product Cost: ${productShare.toFixed(1)}%`}
              />
              <div
                style={{ width: `${Math.min(100, marketingShare)}%` }}
                className="bg-amber-500 transition-all duration-300"
                title={`Marketing Cost: ${marketingShare.toFixed(1)}%`}
              />
              <div
                style={{ width: `${Math.min(100, courierShare)}%` }}
                className="bg-purple-500 transition-all duration-300"
                title={`Courier Shipping: ${courierShare.toFixed(1)}%`}
              />
              <div
                style={{ width: `${Math.min(100, packagingShare)}%` }}
                className="bg-slate-400 transition-all duration-300"
                title={`Packaging: ${packagingShare.toFixed(1)}%`}
              />
              {profitShare > 0 && (
                <div
                  style={{ width: `${Math.min(100, profitShare)}%` }}
                  className="bg-emerald-500 transition-all duration-300"
                  title={`Net Profit: ${profitShare.toFixed(1)}%`}
                />
              )}
            </div>

            {/* Stacked Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-blue-500 flex-shrink-0" />
                <span className="text-slate-600">Product ({productShare.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-amber-500 flex-shrink-0" />
                <span className="text-slate-600">Marketing ({marketingShare.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-purple-500 flex-shrink-0" />
                <span className="text-slate-600">Courier ({courierShare.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-slate-400 flex-shrink-0" />
                <span className="text-slate-600">Packaging ({packagingShare.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-emerald-500 flex-shrink-0" />
                <span className="text-slate-900 font-bold">Net Profit ({profitShare.toFixed(0)}%)</span>
              </div>
            </div>
          </div>

          {/* Unit Economics Detailed Ledger Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200/90 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-600" />
                  <span>Itemized Unit Economics Ledger</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete line-item deductions per customer delivery
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                1 Parcel Unit
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-4">Financial Flow Element</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-right">Amount (PKR)</th>
                    <th className="py-2.5 px-4 text-right">% of Sale Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {/* Retail Price */}
                  <tr className="bg-emerald-50/40">
                    <td className="py-2.5 px-4 font-bold text-slate-900 font-sans flex items-center gap-1.5">
                      <span>Gross Customer Billing Price</span>
                    </td>
                    <td className="py-2.5 px-4 text-emerald-700 text-xs font-sans font-semibold">
                      Inflow Revenue
                    </td>
                    <td className="py-2.5 px-4 text-right font-black text-emerald-700">
                      + Rs {salePrice.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600">100.0%</td>
                  </tr>

                  {/* Product Cost */}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800 font-sans">
                      Product Unit Purchase / Manufacturing
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-sans">COGS</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">
                      - Rs {productCost.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">{productShare.toFixed(1)}%</td>
                  </tr>

                  {/* Packaging */}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800 font-sans">
                      Custom Branded Box, Flyer & Tape
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-sans">Packaging</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">
                      - Rs {packagingCost.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">{packagingShare.toFixed(1)}%</td>
                  </tr>

                  {/* Marketing */}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800 font-sans">
                      Target Customer Acquisition (Ad Spend CAC)
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-sans">Advertising</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">
                      - Rs {marketingCost.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">{marketingShare.toFixed(1)}%</td>
                  </tr>

                  {/* Base Courier */}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800 font-sans">
                      Base Freight Shipping Charge
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-sans">Courier Logistics</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">
                      - Rs {baseCourierRate.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      {((baseCourierRate / salePrice) * 100 || 0).toFixed(1)}%
                    </td>
                  </tr>

                  {/* COD Fee */}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800 font-sans">
                      Cash-On-Delivery (COD) Bank Collection Tariff
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-sans">Financial Tariff</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">
                      - Rs {codHandlingFee.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      {((codHandlingFee / salePrice) * 100 || 0).toFixed(1)}%
                    </td>
                  </tr>

                  {/* Total Variable Costs */}
                  <tr className="bg-slate-50 font-bold">
                    <td className="py-2.5 px-4 text-slate-800 font-sans">Total Variable Expenses</td>
                    <td className="py-2.5 px-4 text-slate-600 text-xs font-sans">Cumulative Cost</td>
                    <td className="py-2.5 px-4 text-right text-slate-900">
                      Rs {totalVariableCost.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-900">
                      {((totalVariableCost / salePrice) * 100 || 0).toFixed(1)}%
                    </td>
                  </tr>

                  {/* Net Realized Profit */}
                  <tr className="bg-slate-900 text-white font-black">
                    <td className="py-3 px-4 font-sans text-sm">FINAL NET PROFIT PER ORDER</td>
                    <td className="py-3 px-4 text-amber-400 text-xs font-sans uppercase">
                      Pure Take-Home
                    </td>
                    <td className="py-3 px-4 text-right text-base text-emerald-400">
                      Rs {netProfit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-amber-400 text-sm">
                      {profitMargin.toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sialkot & Pakistan COD Return (RTO) Reality Box */}
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-5 border border-rose-200/80 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-rose-950">
                    COD Return (RTO) Cushion Analysis: {returnRatePercent}% Failure Rate
                  </h4>
                  <span className="text-xs font-mono font-bold bg-white text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                    Pakistan Reality Check
                  </span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  In Pakistan COD e-commerce, riders face canceled orders, unverified customer numbers, and doorstep refusals.
                  When factoring in a <span className="font-bold">{returnRatePercent}% return rate</span> (return courier tariff Rs {baseCourierRate} + wasted packaging Rs {packagingCost}), your real blended take-home profit is:
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-rose-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">RTO Adjusted Profit</span>
                    <span className="text-base font-black text-rose-600 font-mono">
                      Rs {rtoAdjustedNetProfit.toLocaleString()} / order
                    </span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-rose-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Blended Real Margin</span>
                    <span className="text-base font-black text-rose-600 font-mono">
                      {rtoAdjustedMargin}%
                    </span>
                  </div>
                  <div className="text-xs text-rose-900 font-medium hidden sm:block">
                    💡 <span className="font-bold">Advice:</span> Use WhatsApp OTP Verification to reduce returns to &lt; 5%.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Courier Live Comparison Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-700" />
                  <span>Instant Multi-Courier Rate Comparison for this Parcel</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Calculated based on {shipmentWeight} kg weight and Rs {salePrice} retail COD value
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {COURIER_DIRECTORY.map((c) => {
                const estBase =
                  shipmentWeight <= 1
                    ? c.baseRateFirstKg
                    : c.baseRateFirstKg + Math.ceil(shipmentWeight - 1) * c.additionalKgRate;
                const estCod = Math.max(c.codTariffFlat, Math.round((salePrice * c.codTariffPercent) / 100));
                const estTotalLogistics = estBase + estCod;
                const courierProfit = salePrice - (productCost + packagingCost + marketingCost + estTotalLogistics);
                const isCurrent = c.id === selectedCourier;

                return (
                  <div
                    key={c.id}
                    onClick={() => handleCourierSelect(c.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-red-500 bg-red-50/50 shadow-xs ring-1 ring-red-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900">{c.name}</span>
                      {c.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
                      <div>Freight: Rs {estBase} | COD: Rs {estCod}</div>
                      <div>Total Courier: <span className="font-bold text-slate-800">Rs {estTotalLogistics}</span></div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Net Profit:</span>
                      <span
                        className={`font-mono font-bold ${
                          courierProfit > 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        Rs {courierProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Breakeven & Scaling Simulation */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-emerald-400" />
                  <span>Monthly Store Profit & Breakeven Simulator</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Scale testing with your monthly operational overhead (rent, electricity, staff)
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                Monthly Projection
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block font-medium">Monthly Fixed Overheads</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-slate-500 font-mono">PKR</span>
                  <input
                    type="number"
                    value={monthlyOverheadCost}
                    onChange={(e) => setMonthlyOverheadCost(parseFloat(e.target.value) || 0)}
                    className="w-full text-base font-bold font-mono text-white bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block font-medium">Monthly Orders Target</span>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    value={estimatedMonthlyOrders}
                    onChange={(e) => setEstimatedMonthlyOrders(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-base font-bold font-mono text-white bg-transparent focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">Orders</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block font-medium">Orders Needed to Breakeven</span>
                <div className="text-base font-black font-mono text-amber-400 mt-1">
                  {breakEvenUnits !== null ? `${breakEvenUnits} Orders` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Monthly Net Take-Home */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-800 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-300 font-medium block">
                  Estimated Net Monthly Take-Home (After Fixed Overheads)
                </span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                  Rs {(netProfit * estimatedMonthlyOrders - monthlyOverheadCost).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-slate-400 text-right">
                Based on {estimatedMonthlyOrders} delivered orders @ Rs {netProfit} profit each
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Minus Rs {monthlyOverheadCost.toLocaleString()} fixed overheads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
