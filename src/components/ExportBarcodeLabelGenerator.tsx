import React, { useState } from 'react';
import { Barcode, Printer, Download, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { ToolArticleGuideSection } from './common/ToolArticleGuideSection';

export interface ExportBarcodeLabelGeneratorProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export const ExportBarcodeLabelGenerator: React.FC<ExportBarcodeLabelGeneratorProps> = ({ onOpenQuote }) => {
  const [consignee, setConsignee] = useState('Apex Medical GmbH, Frankfurt, Germany');
  const [cartonNo, setCartonNo] = useState('01 / 45');
  const [grossWeight, setGrossWeight] = useState('18.5 KG');
  const [barcodeValue, setBarcodeValue] = useState('EVX-2026-9018442-PK');

  return (
    <div className="py-12 bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="apple-glass-box p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="apple-badge mb-2">
              <Barcode className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>GS1-128 Outer Carton Thermal Suite</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Export Barcode Label Studio</h1>
            <p className="text-xs text-[#86868b] mt-0.5">GS1-128 &amp; 4"x6" direct thermal shipping carton label maker</p>
          </div>
          <button 
            onClick={() => window.print()} 
            className="apple-calculate-btn w-auto px-6 py-3 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print 4x6 Label</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="apple-glass-box p-6 space-y-3.5 text-xs">
            <h2 className="font-bold text-[#1d1d1f] pb-2 border-b border-black/6">Label Metadata</h2>
            <div>
              <label className="font-semibold block mb-1 text-[#86868b]">Consignee</label>
              <input 
                type="text" 
                aria-label="Consignee Name and Destination" 
                value={consignee} 
                onChange={(e) => setConsignee(e.target.value)} 
                className="apple-input w-full" 
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-[#86868b]">Carton Number</label>
              <input 
                type="text" 
                aria-label="Carton Number" 
                value={cartonNo} 
                onChange={(e) => setCartonNo(e.target.value)} 
                className="apple-input w-full font-mono" 
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-[#86868b]">Gross Weight</label>
              <input 
                type="text" 
                aria-label="Gross Weight" 
                value={grossWeight} 
                onChange={(e) => setGrossWeight(e.target.value)} 
                className="apple-input w-full font-mono" 
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-[#86868b]">Barcode Text / SSCC</label>
              <input 
                type="text" 
                aria-label="Barcode Text or SSCC Value" 
                value={barcodeValue} 
                onChange={(e) => setBarcodeValue(e.target.value)} 
                className="apple-input w-full font-mono" 
              />
            </div>
          </div>

          <div className="apple-glass-box p-6 border-2 border-dashed border-slate-300 font-mono text-xs flex flex-col justify-between space-y-4">
            <div className="border-b-2 border-[#1d1d1f] pb-2 flex justify-between items-start">
              <div>
                <span className="font-bold text-sm block">FROM: {COMPANY_INFO.name}</span>
                <span className="text-[10px] text-[#86868b] block">{COMPANY_INFO.contact.address}</span>
              </div>
              <span className="text-xs font-bold border border-[#1d1d1f] px-2 py-0.5 rounded">AIR CARGO</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#86868b] block uppercase">SHIP TO:</span>
              <p className="font-bold text-sm text-[#1d1d1f]">{consignee}</p>
              <div className="flex justify-between pt-2">
                <span>CARTON: {cartonNo}</span>
                <span>WT: {grossWeight}</span>
              </div>
            </div>
            <div className="text-center pt-4 border-t border-slate-200/80">
              <div className="h-16 bg-[#1d1d1f] rounded-lg flex items-center justify-center text-white tracking-widest text-xs font-bold px-4">
                ||| | |||| | |||||| || | |||| ||| |||| |
              </div>
              <span className="font-mono text-xs tracking-wider mt-1.5 block text-[#1d1d1f]">{barcodeValue}</span>
            </div>
          </div>
        </div>

        {/* Semantically Optimized Technical Article, FAQs & Generated High-Res Mockup */}
        <ToolArticleGuideSection toolId="export-barcode-studio" onOpenQuote={onOpenQuote} />
      </div>
    </div>
  );
};
