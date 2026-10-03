import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Truck,
  Plane,
  Ship,
  Scale,
  RotateCcw,
  Copy,
  Printer,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Container,
  Package,
  HelpCircle,
} from 'lucide-react';

export default function CbmCalculator() {
  // Physical Carton Dimension States
  const [length, setLength] = useState<number>(50); // in cm
  const [width, setWidth] = useState<number>(40);   // in cm
  const [height, setHeight] = useState<number>(30); // in cm
  const [totalCartons, setTotalCartons] = useState<number>(10);
  const [grossWeightPerCarton, setGrossWeightPerCarton] = useState<number>(15); // in kg

  // Dynamic Shipping Carrier Rules Matrix (Factor Division Cost Constants)
  const [carrierType, setCarrierType] = useState<string>('air_dhl'); // air_dhl, air_cargo, sea_freight

  // Computed Output Metrics
  const [singleCartonCbm, setSingleCartonCbm] = useState<number>(0);
  const [totalVolumeCbm, setTotalVolumeCbm] = useState<number>(0);
  const [totalGrossWeight, setTotalGrossWeight] = useState<number>(0);
  const [totalVolumetricWeight, setTotalVolumetricWeight] = useState<number>(0);
  const [chargeableWeight, setChargeableWeight] = useState<number>(0);
  const [twentyFootContainerFit, setTwentyFootContainerFit] = useState<number>(0);

  // Notification state
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Automatic live calculation updates loop trigger
  useEffect(() => {
    executeCbmLogisticsAnalysis();
  }, [length, width, height, totalCartons, grossWeightPerCarton, carrierType]);

  const executeCbmLogisticsAnalysis = () => {
    // 1. Compute Individual and Total Volume in Cubic Meters (CBM)
    const singleCbm = (length * width * height) / 1000000;
    const totalCbm = singleCbm * totalCartons;

    // 2. Determine Air Carrier Dimensional Volumetric Weight Constraints
    let divisor = 5000; // Default DHL/FedEx standard dimensional metric divider
    if (carrierType === 'air_cargo') divisor = 6000;
    if (carrierType === 'sea_freight') divisor = 1000; // Sea freight 1 CBM = 1000 kg standard volumetric reference
    
    const computedVolumetricWeight = carrierType === 'sea_freight' 
      ? totalCbm * 1000 
      : ((length * width * height) / divisor) * totalCartons;

    const computedGrossWeight = grossWeightPerCarton * totalCartons;

    // 3. Logistics Chargeable Weights Allocation Block (Higher value takes precedence)
    const finalChargeable = Math.max(computedGrossWeight, computedVolumetricWeight);

    // 4. Standard 20ft Container Estimation Limits Check (Baseline limit approx 33 CBM)
    const containerCapacityPercentage = (totalCbm / 33) * 100;

    // State Variables Data Binding
    setSingleCartonCbm(singleCbm);
    setTotalVolumeCbm(totalCbm);
    setTotalGrossWeight(computedGrossWeight);
    setTotalVolumetricWeight(computedVolumetricWeight);
    setChargeableWeight(finalChargeable);
    setTwentyFootContainerFit(containerCapacityPercentage);
  };

  // Additional container capacities
  const fortyFootContainerFit = (totalVolumeCbm / 67.7) * 100;
  const fortyHqContainerFit = (totalVolumeCbm / 76.4) * 100;

  // Copy Summary Handler
  const handleCopySummary = () => {
    const carrierLabel =
      carrierType === 'air_dhl'
        ? 'Express Courier (DHL/FedEx / 5000)'
        : carrierType === 'air_cargo'
        ? 'Air Cargo Freight (/ 6000)'
        : 'Ocean Sea Freight (CBM Focus)';

    const summaryText = `--- evonix Technologies Export CBM Logistics Report ---
Single Carton Dimensions: ${length} x ${width} x ${height} cm
Total Cartons: ${totalCartons} Units
Gross Weight per Carton: ${grossWeightPerCarton} KG
Shipping Mode: ${carrierLabel}
--------------------------------------------------
Single Carton Volume: ${singleCartonCbm.toFixed(4)} CBM (m³)
Total Consignment Volume: ${totalVolumeCbm.toFixed(3)} CBM (m³)
Total Physical Gross Weight: ${totalGrossWeight.toFixed(1)} KG
Total Volumetric Weight: ${totalVolumetricWeight.toFixed(1)} KG
Billable / Chargeable Weight: ${chargeableWeight.toFixed(1)} KG
Precedence Factor: ${chargeableWeight === totalGrossWeight ? 'Physical Gross Weight' : 'Volumetric Dimensional Weight'}
--------------------------------------------------
Container Utilization:
- 20ft Standard Container (33 CBM): ${twentyFootContainerFit.toFixed(1)}%
- 40ft Standard Container (67.7 CBM): ${fortyFootContainerFit.toFixed(1)}%
- 40ft High Cube Container (76.4 CBM): ${fortyHqContainerFit.toFixed(1)}%
Status: ${twentyFootContainerFit <= 100 ? 'Fits within 20ft Container' : 'Exceeds 20ft Container (Requires 40ft or Multiple)'}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          setCopiedNotification('CBM Summary copied to clipboard successfully!');
          setTimeout(() => setCopiedNotification(null), 3000);
        })
        .catch(() => {
          setCopiedNotification('Failed to copy summary. Please try again.');
          setTimeout(() => setCopiedNotification(null), 3000);
        });
    } else {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedNotification('CBM Summary copied to clipboard successfully!');
      } catch {
        setCopiedNotification('Failed to copy summary. Please try again.');
      }
      setTimeout(() => setCopiedNotification(null), 3000);
    }
  };

  // Print Sheet Handler
  const handlePrintSheet = () => {
    window.print();
  };

  // Reset to default standard state
  const handleReset = () => {
    setLength(50);
    setWidth(40);
    setHeight(30);
    setTotalCartons(10);
    setGrossWeightPerCarton(15);
    setCarrierType('air_dhl');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Banner Toolbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Export CBM & Volumetric Cargo Calculator</span>
                <span className="text-[10px] bg-blue-600/90 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                  Zero-Database
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Cubic Meters (CBM), Air Freight Volumetric Weights, and Container Capacity Estimator.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Reset values to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Copy CBM breakdown to clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Summary</span>
            </button>

            <button
              type="button"
              onClick={handlePrintSheet}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              title="Print Cargo Specification Sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {copiedNotification && (
        <div className="fixed top-28 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-bounce print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Executive Overview Header */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="relative z-10 max-w-4xl space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>evonix technologies • B2B Export Cargo Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Smart Cargo Planning for Global Exporters
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                Shipping goods across borders requires careful control over carton sizing and dimensional volume weights. Industrial manufacturing teams, freight forwarders, and small business owners often struggle with complex freight calculations before packing containers.
              </p>
              <p>
                The evonix Technologies B2B Industrial CBM Calculator removes all manual accounting guesswork by processing your carton length, width, and height specs instantly. It computes your total cubic meters (CBM) and automatically highlights the true chargeable mass for air or sea cargo lines, helping you secure exact shipping estimates directly inside your browser layout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Responsive Workspace Grid */}
      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ========================================================
            LEFT COLUMN (1 Col on Desktop): INPUT CONTROLS WRAPPER
           ======================================================== */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-blue-600">Logistics Parameters</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter carton dimensions and consignment quantity
            </p>
          </div>
          
          {/* Dimensions Configuration Box */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-800 flex items-center justify-between">
              <span>Single Carton Dimensions (CM)</span>
              <span className="text-[11px] font-mono text-slate-500">Unit: Centimeters</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-slate-500 font-medium">Length</label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-medium">Width</label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  placeholder="40"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-medium">Height</label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  placeholder="30"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Carton Volume:</span>
              <span className="font-mono font-bold text-blue-700">{singleCartonCbm.toFixed(4)} m³</span>
            </div>
          </div>

          {/* Quantity & Weight Parameters Block */}
          <div className="space-y-3.5 border-t border-slate-100 pt-4">
            <label className="block text-sm font-semibold text-slate-800 flex items-center justify-between">
              <span>Consignment Mass Details</span>
              <span className="text-[11px] font-mono text-slate-500">Unit: KG</span>
            </label>
            <div>
              <label className="block text-xs text-slate-500 font-medium">
                Total Shipment Carton Count
              </label>
              <input
                type="number"
                min="1"
                value={totalCartons}
                onChange={(e) => setTotalCartons(Number(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 font-medium">
                Gross Weight Per Carton (KG)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={grossWeightPerCarton}
                onChange={(e) => setGrossWeightPerCarton(Number(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="15"
              />
            </div>
          </div>

          {/* Carrier Optimization Routing Toggles */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <label className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Shipping Mode & Carrier</span>
            </label>
            <select
              value={carrierType}
              onChange={(e) => setCarrierType(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-0.5 bg-white cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="air_dhl">Express Air Courier (DHL/FedEx Divider 5000)</option>
              <option value="air_cargo">Standard Air Freight (Cargo Divider 6000)</option>
              <option value="sea_freight">Ocean Sea Freight (CBM Focus)</option>
            </select>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 border border-slate-200">
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Carrier Formula Reference</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {carrierType === 'air_dhl' && 'Air Courier uses Volumetric Weight = (L × W × H in cm) / 5000.'}
                {carrierType === 'air_cargo' && 'Air Cargo IATA standard uses Volumetric Weight = (L × W × H in cm) / 6000.'}
                {carrierType === 'sea_freight' && 'Ocean freight billing is computed primarily per CBM (1 CBM = 1000 kg equivalent).'}
              </p>
            </div>
          </div>

          {/* Quick Preset Carton Helpers */}
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Standard Export Master Cartons
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLength(60);
                  setWidth(40);
                  setHeight(40);
                  setGrossWeightPerCarton(20);
                }}
                className="p-2 text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs cursor-pointer"
              >
                <div className="font-bold text-slate-800">Master Box 60×40×40</div>
                <div className="text-[10px] text-slate-500">Apparel & Textiles (0.096 CBM)</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLength(45);
                  setWidth(35);
                  setHeight(30);
                  setGrossWeightPerCarton(12);
                }}
                className="p-2 text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs cursor-pointer"
              >
                <div className="font-bold text-slate-800">Leather Box 45×35×30</div>
                <div className="text-[10px] text-slate-500">Gloves & Goods (0.047 CBM)</div>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN (2 Cols on Desktop): ANALYTICS DASHBOARD
           ======================================================== */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/90 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                  Cargo Space Allocation
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time volumetric shipping weight configurations compiled by evonix Technologies
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                  {totalCartons} Cartons Consignment
                </span>
              </div>
            </div>

            {/* Core Computational Summary Matrix Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-2xs">
                <span className="text-xs text-blue-700 font-bold uppercase tracking-wider block">
                  Total Volume CBM
                </span>
                <span className="text-2xl sm:text-3xl font-black text-blue-900 block mt-1 font-mono">
                  {totalVolumeCbm.toFixed(3)} m³
                </span>
                <span className="text-[11px] text-blue-700/80 mt-1 block">
                  Total consignment cubic capacity
                </span>
              </div>

              <div className="bg-purple-50 p-4 sm:p-5 rounded-2xl border border-purple-200 shadow-2xs">
                <span className="text-xs text-purple-700 font-bold uppercase tracking-wider block">
                  Chargeable Mass
                </span>
                <span className="text-2xl sm:text-3xl font-black text-purple-900 block mt-1 font-mono">
                  {chargeableWeight.toFixed(1)} KG
                </span>
                <span className="text-[11px] text-purple-700/80 mt-1 block font-medium">
                  {chargeableWeight === totalVolumetricWeight ? 'Volumetric weight applies' : 'Actual gross weight applies'}
                </span>
              </div>

              <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl border border-orange-200 shadow-2xs">
                <span className="text-xs text-orange-700 font-bold uppercase tracking-wider block">
                  20ft Container Space
                </span>
                <span className="text-2xl sm:text-3xl font-black text-orange-900 block mt-1 font-mono">
                  {twentyFootContainerFit.toFixed(1)}%
                </span>
                <span className="text-[11px] text-orange-700/80 mt-1 block font-medium">
                  Based on 33 CBM standard limit
                </span>
              </div>
            </div>

            {/* Logistics Output Detail Table Ledger Grid Map Rows */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-sm shadow-xs">
              <div className="bg-slate-50 p-3.5 border-b border-slate-200 flex justify-between font-bold text-slate-700 uppercase tracking-wide text-xs">
                <span>Shipping Metric Description</span>
                <span>Calculated Output Values</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-3.5 flex justify-between text-slate-700 items-center">
                  <span className="font-medium">Single Unit Volumetric Capacity:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded">
                    {singleCartonCbm.toFixed(4)} m³
                  </span>
                </div>
                <div className="p-3.5 flex justify-between text-slate-700 items-center">
                  <span className="font-medium">Total Gross Mass (Actual Physical Weight):</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded">
                    {totalGrossWeight.toFixed(1)} KG
                  </span>
                </div>
                <div className="p-3.5 flex justify-between text-slate-700 items-center">
                  <span className="font-medium">Total Volumetric Dimensional Weight:</span>
                  <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {totalVolumetricWeight.toFixed(1)} KG
                  </span>
                </div>
                <div className="p-3.5 flex justify-between text-slate-900 bg-slate-50/80 font-bold items-center">
                  <span>Logistics Final Chargeable Billable Weight:</span>
                  <span className="font-mono text-base font-black text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg">
                    {chargeableWeight.toFixed(1)} KG
                  </span>
                </div>
              </div>
            </div>

            {/* Ocean Sea Freight Container Capacity Comparison Bar */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Container className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-sm text-slate-900">
                    Multi-Container Loading Fit Comparison
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Consignment: {totalVolumeCbm.toFixed(2)} CBM</span>
              </div>

              <div className="space-y-3">
                {/* 20ft Container */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>20ft Standard Container (33 CBM)</span>
                    <span className="font-mono font-bold text-blue-700">{twentyFootContainerFit.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, twentyFootContainerFit)}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        twentyFootContainerFit > 100 ? 'bg-rose-500' : 'bg-blue-600'
                      }`}
                    />
                  </div>
                </div>

                {/* 40ft Container */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>40ft Standard Container (67.7 CBM)</span>
                    <span className="font-mono font-bold text-emerald-700">{fortyFootContainerFit.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, fortyFootContainerFit)}%` }}
                      className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 40ft High Cube Container */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>40ft High Cube Container (76.4 CBM)</span>
                    <span className="font-mono font-bold text-purple-700">{fortyHqContainerFit.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, fortyHqContainerFit)}%` }}
                      className="h-full rounded-full bg-purple-600 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="text-xs text-slate-500 font-medium">
                Calculations update in real-time as dimensions change.
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300 shadow-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Copy Summary</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintSheet}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Short SEO context paragraph matching strict word limits */}
          <div className="text-xs text-slate-500 border-t border-slate-200 pt-4 mt-6">
            <strong>Optimizing Export Freight Logistics Control:</strong> Managing shipping volume parameters remains a key structural bottleneck for manufacturers, freight forwarders, and trade consultants worldwide. The <strong>evonix Technologies B2B Industrial CBM Calculator</strong> removes manual evaluation guesswork by instantly parsing carton dimensions and shipment weight configurations entirely within your browser window, helping you stabilize commercial shipping margins.
          </div>
        </div>
      </div>
    </div>
  );
}
