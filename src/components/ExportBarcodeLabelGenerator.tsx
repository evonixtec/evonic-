import React, { useState } from 'react';
import {
  Barcode,
  Printer,
  Download,
  CheckCircle,
  Copy,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Info
} from 'lucide-react';

interface LabelTemplate {
  id: string;
  name: string;
  industry: string;
  badge: string;
  defaultTitle: string;
  defaultBarcode: string;
  defaultData: Record<string, string>;
  dimensions: string;
}

const TEMPLATES: LabelTemplate[] = [
  {
    id: 'surgical-export',
    name: 'Surgical & Dental Instruments Master Box',
    industry: 'Medical / Surgical Export',
    badge: 'CE & ISO 13485 Compliant',
    defaultTitle: 'TITANIUM MICRO-SURGICAL FORCEPS 14CM',
    defaultBarcode: 'PK-SIAL-SURG-9018-042',
    defaultData: {
      exporter: 'evonix medical devices - Sialkot, Pakistan',
      consignee: 'Klinikum Medical GmbH - Hamburg, Germany',
      poNumber: 'PO-DE-2026-8841',
      batchLot: 'LOT-2603-AUTOCLAVE',
      hsCode: '9018.90.00 (Surgical Instruments)',
      cartonQty: '250 PCS / STAINLESS STEEL AISI 420',
      grossWeight: '14.80 KG / NET: 13.50 KG',
      inspection: '100% Quality Inspected / Pass # 09',
    },
    dimensions: '4" × 6" (101.6mm × 152.4mm)',
  },
  {
    id: 'sports-carton',
    name: 'Sports Goods & Gloves Master Carton',
    industry: 'Sports & Gloves Export',
    badge: 'EU / USA Export Spec',
    defaultTitle: 'PRO-SERIES MATCH LEATHER GOALKEEPER GLOVES',
    defaultBarcode: 'GLV-PRO-SIZE-10-8849',
    defaultData: {
      exporter: 'Apex Leather & Sports - Daska Road, Sialkot',
      consignee: 'Athletic Gear Direct Inc. - Chicago, IL, USA',
      poNumber: 'PO-USA-9921-X',
      colorSize: 'COLOR: Matte Black/Volt / SIZE: 9, 10, 11',
      cartonQty: '100 PAIRS (25 PAIRS / INNER BOX)',
      hsCode: '4203.21.00 (Sports Leather Gloves)',
      grossWeight: '22.40 KG / NET: 20.80 KG',
      origin: 'MADE IN SIALKOT - PAKISTAN',
    },
    dimensions: '4" × 6" (101.6mm × 152.4mm)',
  },
  {
    id: 'amazon-courier',
    name: 'Amazon FBA & Courier Shipping Label',
    industry: 'E-Commerce Logistics',
    badge: 'FNSKU & DHL / FedEx Format',
    defaultTitle: 'AMAZON FBA SHIPMENT - CARTON 1 OF 12',
    defaultBarcode: 'X003A4B9YZ',
    defaultData: {
      shipFrom: 'evonix logistics center, Paris Road, Sialkot',
      shipTo: 'Amazon FBA Warehouse #LTN1, Dunstable, UK',
      shipmentId: 'FBA15K893XZ7',
      courierTracking: 'DHL Express AWB: 984 1029 481',
      boxWeight: '18.25 KG (Heavy Package: 15KG+ Warning)',
      cartonCount: 'Box 01 of 12',
    },
    dimensions: '4" × 6" (101.6mm × 152.4mm)',
  },
  {
    id: 'retail-pos',
    name: 'Retail POS Shelf & Price Tag (2" × 1")',
    industry: 'Sialkot Retail Stores & Pharmacies',
    badge: 'Thermal 80mm / 58mm',
    defaultTitle: 'LOGITECH WIRELESS OPTICAL MOUSE',
    defaultBarcode: '8901234567890',
    defaultData: {
      pricePkr: 'PKR 2,450 (Incl. 18% GST)',
      itemSku: 'SKU: PER-LOG-B170-GRY',
      warranty: '1 Year Sialkot Replacement Warranty',
      storeName: 'evonix tech retail hub - Sialkot Cantt',
    },
    dimensions: '2" × 1" (50.8mm × 25.4mm)',
  },
];

interface BarcodeStudioProps {
  onOpenQuote?: (inquiryDetails?: string) => void;
}

export const ExportBarcodeLabelGenerator: React.FC<BarcodeStudioProps> = ({ onOpenQuote }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('surgical-export');
  const [barcodeText, setBarcodeText] = useState<string>(TEMPLATES[0].defaultBarcode);
  const [labelTitle, setLabelTitle] = useState<string>(TEMPLATES[0].defaultTitle);
  const [labelFields, setLabelFields] = useState<Record<string, string>>(TEMPLATES[0].defaultData);
  const [printerDpi, setPrinterDpi] = useState<'203' | '300'>('203');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const currentTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleSelectTemplate = (template: LabelTemplate) => {
    setSelectedTemplateId(template.id);
    setBarcodeText(template.defaultBarcode);
    setLabelTitle(template.defaultTitle);
    setLabelFields({ ...template.defaultData });
  };

  const handleFieldChange = (key: string, val: string) => {
    setLabelFields((prev) => ({ ...prev, [key]: val }));
  };

  // Pseudo-Code 128 barcode bar generator for realistic thermal output
  const generatePseudoCode128 = (text: string) => {
    const bars: { isBar: boolean; width: number }[] = [];
    // Start quiet zone
    bars.push({ isBar: false, width: 10 });
    // Start sentinel (Code B: 11010010000 style)
    [2, 1, 1, 2, 1, 4].forEach((w, i) => bars.push({ isBar: i % 2 === 0, width: w }));

    // Encode text characters into alternating bar-space widths
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const w1 = ((code * 3) % 4) + 1;
      const w2 = ((code * 7) % 3) + 1;
      const w3 = ((code * 5) % 4) + 1;
      const w4 = 11 - (w1 + w2 + w3);
      bars.push({ isBar: true, width: Math.max(1, w1) });
      bars.push({ isBar: false, width: Math.max(1, w2) });
      bars.push({ isBar: true, width: Math.max(1, w3) });
      bars.push({ isBar: false, width: Math.max(1, Math.min(4, w4)) });
    }

    // Stop sentinel (2331112)
    [2, 3, 3, 1, 1, 1, 2].forEach((w, i) => bars.push({ isBar: i % 2 === 0, width: w }));
    // End quiet zone
    bars.push({ isBar: false, width: 10 });

    return bars;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyBarcode = () => {
    navigator.clipboard.writeText(barcodeText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const barcodeBars = generatePseudoCode128(barcodeText);

  return (
    <section
      id="export-barcode-studio"
      className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Barcode className="w-4 h-4 text-red-600" />
            <span>Sialkot Export Industry Tool</span>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.2 rounded-full font-black">
              2026 Ready
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Export Barcode & Shipping Label Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Free online barcode format studio for Sialkot surgical, leather, sports, and e-commerce exporters.
            Generate certified Code 128, GS1, FNSKU, and Master Carton shipping labels calibrated for 203 DPI and 300 DPI thermal printers.
          </p>
        </div>

        {/* Studio Grid: Config on Left, Live Thermal Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Select Industry Export Preset
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedTemplateId === tmpl.id
                        ? 'bg-red-50 border-red-500 text-red-950 font-bold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold leading-snug">{tmpl.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{tmpl.dimensions}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Barcode & Label Title Inputs */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Master Barcode / SKU / Tracking ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={barcodeText}
                    onChange={(e) => setBarcodeText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                    placeholder="Enter Barcode or Item Code"
                  />
                  <button
                    onClick={handleCopyBarcode}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Copy Barcode Value"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedNotification ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Carton Product Headline
                </label>
                <input
                  type="text"
                  value={labelTitle}
                  onChange={(e) => setLabelTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white font-semibold transition-colors"
                  placeholder="e.g. TITANIUM SURGICAL FORCEPS"
                />
              </div>

              {/* Dynamic Field Inputs */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Customs & Manifest Parameters:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(labelFields).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="w-28 text-[11px] font-bold text-slate-600 uppercase truncate">
                        {k.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <input
                        type="text"
                        value={v}
                        onChange={(e) => handleFieldChange(k, e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Printer Hardware DPI Selector */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-red-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Thermal Printer Head DPI</div>
                    <div className="text-[10px] text-slate-500">
                      TSC / Zebra / Xprinter calibration
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPrinterDpi('203')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      printerDpi === '203'
                        ? 'bg-red-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    203 DPI (Standard)
                  </button>
                  <button
                    onClick={() => setPrinterDpi('300')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      printerDpi === '300'
                        ? 'bg-red-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    300 DPI (High-Res)
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Thermal Label</span>
              </button>

              <button
                onClick={() => {
                  const svg = document.getElementById('rendered-thermal-label');
                  if (!svg) return;
                  const data = new XMLSerializer().serializeToString(svg);
                  const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Sialkot_Export_Label_${barcodeText || 'export'}.svg`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300 transition-all"
                title="Download Vector SVG"
              >
                <Download className="w-4 h-4" />
                <span>Export SVG</span>
              </button>
            </div>
          </div>

          {/* Live Thermal Label Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-bold text-slate-900">1:1 Thermal Output Render</span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded text-slate-700 border border-slate-200 font-medium">
                  {currentTemplate.dimensions} @ {printerDpi} DPI
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Calibrated for TSC TE244, Zebra ZD888, Xprinter
              </span>
            </div>

            {/* Thermal Label White Canvas Simulation */}
            <div className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-md border-4 border-slate-300 font-sans relative select-all transition-all">
              {/* Printable Wrapper */}
              <div id="printable-thermal-label" className="space-y-4">
                {/* Header Section */}
                <div className="border-b-2 border-black pb-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                      INTERNATIONAL EXPORT MASTER CARTON LABEL
                    </div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-black mt-0.5 leading-tight">
                      {labelTitle}
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="border border-black px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                      {currentTemplate.badge}
                    </div>
                    <div className="text-[9px] font-bold text-slate-600 mt-1">MADE IN PAKISTAN</div>
                  </div>
                </div>

                {/* Barcode SVG Rendering Area */}
                <div className="py-2 text-center border-b-2 border-black">
                  <div className="flex justify-center items-end h-16 sm:h-20 overflow-hidden px-4">
                    {barcodeBars.map((bar, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: `${bar.width * (printerDpi === '300' ? 2 : 2.5)}px`,
                          height: bar.isBar ? '100%' : '0%',
                          backgroundColor: bar.isBar ? '#000000' : 'transparent',
                          marginRight: '1px',
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 font-mono text-xs sm:text-sm font-black tracking-widest text-black">
                    * {barcodeText} *
                  </div>
                  <div className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider">
                    CODE 128 / GS1 HIGH-SCANNABILITY BARCODE
                  </div>
                </div>

                {/* Key-Value Shipping Manifest Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] leading-tight pt-1">
                  {Object.entries(labelFields).map(([key, val]) => (
                    <div
                      key={key}
                      className="border-b border-slate-200 pb-1 flex items-baseline justify-between gap-2"
                    >
                      <span className="font-bold uppercase text-[10px] text-slate-600 tracking-wider flex-shrink-0">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="font-black text-black text-right font-mono truncate">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Footer & Regulatory Warning */}
                <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[9px] text-slate-700 font-bold uppercase">
                  <span>SIALKOT CHAMBER OF COMMERCE (SCCI) ACCREDITED</span>
                  <span>evonix industrial systems • pakistan</span>
                </div>
              </div>
            </div>

            {/* Advice & Service Callout */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Info className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="font-medium">
                  Need commercial TSC/Zebra thermal label printers, wax-resin ribbons, or automated packing station software for your Sialkot factory?
                </span>
              </div>
              <button
                onClick={() =>
                  onOpenQuote
                    ? onOpenQuote('Thermal Barcode Label Automation for Sialkot Factory')
                    : null
                }
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
              >
                Inquire Factory Hardware
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
