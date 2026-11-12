import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Package, 
  Activity, 
  Maximize2, 
  Layers, 
  FileText, 
  Building2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone
} from 'lucide-react';
import { LocalProduct } from '../../data/hyperlocalData';
import { WhatsAppOrderButton } from './WhatsAppOrderButton';

interface ProductDetailModalProps {
  product: LocalProduct | null;
  onClose: () => void;
  whatsappNumber: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  whatsappNumber,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'specs' | 'box'>('overview');
  const [showReceiptSample, setShowReceiptSample] = useState(false);

  if (!product) return null;

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs font-mono text-slate-400">SKU: {product.sku}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: 4-Angle Photo Gallery (md:col-span-6) */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Active Picture */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                <img
                  src={currentImage}
                  alt={`${product.name} - Angle ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to svg or placeholder if webp fails
                    (e.currentTarget as HTMLImageElement).src = '/images/shop/shop_thermal_printer.webp';
                  }}
                />

                {/* Angle Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[11px] font-semibold text-slate-200">
                  Angle {selectedImageIndex + 1} of {product.images.length}
                </div>

                {/* Ergonomics Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-bold text-emerald-300">
                  Tested in Hand • Sialkot Lab
                </div>

                {/* Left/Right Photo Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous product image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="sr-only">Previous product image</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next product image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="sr-only">Next product image</span>
                    </button>
                  </>
                )}
              </div>

              {/* 4 Thumbnails Gallery Strip */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-950 ${
                      selectedImageIndex === idx
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-slate-900/90 text-slate-300 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Trust Highlights below photos */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>1-Year Physical Replacement at Kotli Behram Depot</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>2–4 Hour Doorstep COD Delivery across Sialkot &amp; Daska</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Title, Pricing, Tabs & Actions (md:col-span-6) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {product.name}
                </h2>

                <div className="mt-2 mb-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-emerald-400">
                    {product.pricePKR}
                  </span>
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Cash on Delivery
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Hand Ergonomics Note */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-[11px] uppercase tracking-wide">
                      Ergonomics &amp; Build:
                    </span>
                    <span className="text-slate-400 text-xs">{product.ergonomics}</span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-slate-800 flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Key Specs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('medical')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'medical'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🏥 Medical / Pharmacy</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Technical Matrix
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('box')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'box'
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  In The Box
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="min-h-[140px] text-xs space-y-2">
                {activeTab === 'overview' && (
                  <div className="space-y-1.5">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'medical' && (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 font-semibold text-[11px]">
                      Verified for Medical Stores, Hospital Pharmacies &amp; Drug Distribution in Punjab:
                    </div>
                    {product.medicalStoreFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-slate-300">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="divide-y divide-slate-800/80 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    {product.technicalSpecs.map((spec, tIdx) => (
                      <div key={tIdx} className="p-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">{spec.label}</span>
                        <span className="text-slate-200 font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'box' && (
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Complete Sealed Package:
                    </span>
                    {product.inTheBox.map((item, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                        <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom WhatsApp Order Checkout Action */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <WhatsAppOrderButton
                  product={product}
                  whatsappNumber={whatsappNumber}
                  buttonText="Order via WhatsApp (Instant Same-Day COD)"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Testing Bench: Kotli Behram, Sialkot</span>
                  <a
                    href="tel:+923263244002"
                    className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Technician (+92 326 324 4002)</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Toggleable Medical Pharmacy Receipt Preview Section */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowReceiptSample(!showReceiptSample)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-left flex items-center justify-between text-xs text-slate-300 font-bold transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>
                  {showReceiptSample ? 'Hide' : 'View'} Sample Medical Pharmacy Invoice Printout (ESC/POS 80mm Simulation)
                </span>
              </div>
              <span className="text-emerald-400 text-xs">{showReceiptSample ? 'Collapse ▲' : 'Expand ▼'}</span>
            </button>

            {showReceiptSample && (
              <div className="mt-3 p-4 sm:p-6 rounded-2xl bg-white text-slate-900 font-mono text-xs max-w-sm mx-auto shadow-2xl border border-slate-300 space-y-3">
                {/* Pharmacy Header & Medical Logo */}
                <div className="text-center border-b border-dashed border-slate-400 pb-3 space-y-1">
                  <div className="w-9 h-9 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs mb-1">
                    ✚
                  </div>
                  <h4 className="font-extrabold text-sm tracking-wide text-slate-900">
                    AL-SHIFA PHARMACY &amp; MEDICAL STORE
                  </h4>
                  <p className="text-[10px] text-slate-600">
                    Kotli Behram, Defense Road Sialkot • DRAP Lic: PB-SKT-4892
                  </p>
                  <p className="text-[10px] text-slate-600">
                    Ph: +92 326 324 4002 • NTN: 9482103-4
                  </p>
                  <div className="pt-1 text-[9px] text-slate-500 flex justify-between">
                    <span>Inv: #MED-8492</span>
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Patient / Doctor Details */}
                <div className="text-[10px] border-b border-dashed border-slate-300 pb-2 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Patient: Muhammad Usman</span>
                    <span>Age: 38Y</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Doctor: Dr. A. Rauf (MBBS)</span>
                    <span>Counter: POS-01</span>
                  </div>
                </div>

                {/* Medicine Items List */}
                <div className="text-[10px] space-y-1.5 border-b border-dashed border-slate-400 pb-3">
                  <div className="flex justify-between font-bold border-b border-slate-200 pb-1">
                    <span>Item / Formula</span>
                    <span>Qty</span>
                    <span>Price</span>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>1. Augmentin 625mg (GSK)</span>
                      <span>1x14</span>
                      <span>Rs. 480</span>
                    </div>
                    <div className="text-[8px] text-slate-500">Batch: AUG-928 | Exp: 09/2028</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>2. Panadol Extra 500mg (GSK)</span>
                      <span>2x10</span>
                      <span>Rs. 180</span>
                    </div>
                    <div className="text-[8px] text-slate-500">Batch: PAN-104 | Exp: 12/2027</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>3. Brufen 400mg (Abbott)</span>
                      <span>1x30</span>
                      <span>Rs. 260</span>
                    </div>
                    <div className="text-[8px] text-slate-500">Batch: BRF-551 | Exp: 05/2028</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>4. Surbex-Z High Potency</span>
                      <span>1x30</span>
                      <span>Rs. 500</span>
                    </div>
                    <div className="text-[8px] text-slate-500">Batch: SBX-882 | Exp: 11/2027</div>
                  </div>
                </div>

                {/* Totals */}
                <div className="text-[10px] space-y-1 border-b border-dashed border-slate-400 pb-2">
                  <div className="flex justify-between">
                    <span>Total Gross Amount:</span>
                    <span>Rs. 1,420</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Medical Discount (5%):</span>
                    <span>- Rs. 70</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-xs text-slate-900 pt-1 border-t border-slate-300">
                    <span>NET PAYABLE:</span>
                    <span>Rs. 1,350</span>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Paid Cash: Rs. 1,500</span>
                    <span>Change Return: Rs. 150</span>
                  </div>
                </div>

                {/* Footer Barcode Simulation */}
                <div className="text-center pt-1 space-y-1">
                  <div className="font-mono text-[9px] tracking-widest text-slate-800">
                    |||||||||| |||||||| ||||||||||||||||||
                  </div>
                  <p className="text-[8px] text-slate-500 font-sans">
                    Printed via Evonix 80mm ESC/POS Thermal Head • Get Well Soon!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
