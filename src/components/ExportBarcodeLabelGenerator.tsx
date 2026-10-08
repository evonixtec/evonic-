import React, { useState } from 'react';
import { Barcode, Printer, Download, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface ExportBarcodeLabelGeneratorProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export const ExportBarcodeLabelGenerator: React.FC<ExportBarcodeLabelGeneratorProps> = () => {
  const [consignee, setConsignee] = useState('Apex Medical GmbH, Frankfurt, Germany');
  const [cartonNo, setCartonNo] = useState('01 / 45');
  const [grossWeight, setGrossWeight] = useState('18.5 KG');
  const [barcodeValue, setBarcodeValue] = useState('EVX-2026-9018442-PK');

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Export Barcode Label Studio</h1>
            <p className="text-xs text-slate-500">GS1-128 &amp; 4"x6" direct thermal shipping carton label maker</p>
          </div>
          <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Printer className="w-3.5 h-3.5" />
            <span>Print 4x6 Label</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h2 className="font-bold text-slate-800 pb-2 border-b">Label Metadata</h2>
            <div><label className="font-semibold block mb-1 text-slate-700">Consignee</label><input type="text" aria-label="Consignee Name and Destination" value={consignee} onChange={(e) => setConsignee(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-slate-50" /></div>
            <div><label className="font-semibold block mb-1 text-slate-700">Carton Number</label><input type="text" aria-label="Carton Number" value={cartonNo} onChange={(e) => setCartonNo(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono" /></div>
            <div><label className="font-semibold block mb-1 text-slate-700">Gross Weight</label><input type="text" aria-label="Gross Weight" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono" /></div>
            <div><label className="font-semibold block mb-1 text-slate-700">Barcode Text / SSCC</label><input type="text" aria-label="Barcode Text or SSCC Value" value={barcodeValue} onChange={(e) => setBarcodeValue(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-400 shadow-md font-mono text-xs flex flex-col justify-between space-y-4">
            <div className="border-b-2 border-slate-900 pb-2 flex justify-between items-start">
              <div>
                <span className="font-black text-sm block">FROM: {COMPANY_INFO.name}</span>
                <span className="text-[10px] text-slate-600 block">{COMPANY_INFO.contact.address}</span>
              </div>
              <span className="text-xs font-bold border border-slate-900 px-2 py-0.5">AIR CARGO</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 block uppercase">SHIP TO:</span>
              <p className="font-bold text-sm text-slate-900">{consignee}</p>
              <div className="flex justify-between pt-2">
                <span>CARTON: {cartonNo}</span>
                <span>WT: {grossWeight}</span>
              </div>
            </div>
            <div className="text-center pt-4 border-t border-slate-200">
              <div className="h-16 bg-slate-900 flex items-center justify-center text-white tracking-widest text-xs font-bold px-4">
                ||| | |||| | |||||| || | |||| ||| |||| |
              </div>
              <span className="font-mono text-xs tracking-wider mt-1 block">{barcodeValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
