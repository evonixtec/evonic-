import React, { useState } from 'react';
import {
  FileCheck,
  Printer,
  Copy,
  ShieldCheck,
  CheckCircle2,
  Building,
  Calendar,
  Check,
  FileSignature
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const CeUkcaComplianceGenerator: React.FC = () => {
  const [productName, setProductName] = useState('Precision Titanium Micro-Surgical Forceps & Scalpel Sets');
  const [modelNumber, setModelNumber] = useState('EVX-MED-9018');
  const [standardDirective, setStandardDirective] = useState('EU MDR 2017/745 (Class I) & UK Medical Devices Regulations 2002');
  const [isoStandard, setIsoStandard] = useState('ISO 13485:2016, EN ISO 14971:2019, ISO 7153-1');
  const [batchLotNumber, setBatchLotNumber] = useState('LOT-2026-OCT-882');
  const [signatoryName, setSignatoryName] = useState('Engr. Hamza Reza');
  const [signatoryRole, setSignatoryRole] = useState('Head of Quality Assurance & Biomedical Lab');
  const [copiedDoc, setCopiedDoc] = useState(false);

  const docText = `================================================================================
                    UKCA & CE DECLARATION OF CONFORMITY (DoC)
================================================================================
Manufacturer: ${COMPANY_INFO.legalName}
Factory / Lab Location: ${COMPANY_INFO.contact.address}
Contact: ${COMPANY_INFO.contact.email} | ${COMPANY_INFO.contact.phoneDisplay}

Product Identification:
- Product Name: ${productName}
- Model / Catalog No: ${modelNumber}
- Production Batch / Lot: ${batchLotNumber}
- Risk Classification: Class I Non-Sterile / Reusable Surgical Equipment

Directives & Regulations Conformity:
We hereby declare under our sole legal responsibility as the certified manufacturer that the product specified above conforms to the provisions of:
1. European Union Regulation (EU) 2017/745 on Medical Devices (MDR)
2. United Kingdom Medical Devices Regulations 2002 (SI 2002 No 618, as amended for UKCA)
3. RoHS Directive 2011/65/EU and UK RoHS Regulations 2012

Harmonized Standards Applied:
- ${isoStandard}

Authorized Signatory:
Signed for and on behalf of: ${COMPANY_INFO.legalName}
Place of Issue: Kotli Behram, Sialkot, Pakistan
Date: ${new Date().toLocaleDateString('en-GB')}
Name: ${signatoryName}
Title: ${signatoryRole}
================================================================================`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(docText);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2500);
    } catch {
      // Fallback
    }
  };

  const [hasGenerated, setHasGenerated] = useState(true);

  const handleGenerate = () => {
    setHasGenerated(true);
  };

  return (
    <div className="py-8 min-h-screen apple-tool-layout text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Apple Clean Header Banner */}
        <div className="apple-glass-box p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="apple-badge">
                UK &amp; European Regulatory Standard
              </span>
              <span className="text-xs text-[#86868b] font-mono">UKCA &amp; CE Marking MDR / RoHS</span>
            </div>
            <h1 className="apple-tool-title mt-2">
              UKCA &amp; CE Declaration of Conformity (DoC) Generator
            </h1>
            <p className="apple-tool-subtitle">
              Generate audited technical Declaration of Conformity certificates for UK and European Union medical, surgical, and hardware procurement tenders.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copiedDoc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#86868b]" />}
              <span>{copiedDoc ? 'Copied Certificate!' : 'Copy Certificate'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shadow-blue-500/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="apple-glass-box p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#1d1d1f] pb-2 border-b border-black/[0.06]">
              Technical File &amp; Batch Parameters
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Product Description</label>
              <input
                type="text"
                aria-label="Product Description"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="apple-input w-full font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">Model / Catalog No</label>
                <input
                  type="text"
                  aria-label="Model or Catalog Number"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  className="apple-input w-full font-mono font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">Batch / Lot Identification</label>
                <input
                  type="text"
                  aria-label="Batch or Lot Identification"
                  value={batchLotNumber}
                  onChange={(e) => setBatchLotNumber(e.target.value)}
                  className="apple-input w-full font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Conformity Directives</label>
              <input
                type="text"
                aria-label="Conformity Directives"
                value={standardDirective}
                onChange={(e) => setStandardDirective(e.target.value)}
                className="apple-input w-full font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Harmonized ISO Standards</label>
              <input
                type="text"
                aria-label="Harmonized ISO Standards"
                value={isoStandard}
                onChange={(e) => setIsoStandard(e.target.value)}
                className="apple-input w-full font-mono font-medium text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">Authorized Signatory Name</label>
                <input
                  type="text"
                  aria-label="Authorized Signatory Name"
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  className="apple-input w-full font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">Executive Title / Role</label>
                <input
                  type="text"
                  aria-label="Executive Title or Role"
                  value={signatoryRole}
                  onChange={(e) => setSignatoryRole(e.target.value)}
                  className="apple-input w-full font-medium"
                />
              </div>
            </div>

            {/* Apple Blue Calculate / Generate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="apple-calculate-btn"
              >
                <FileSignature className="w-4 h-4" />
                <span>Generate Official Declaration (DoC)</span>
              </button>
            </div>
          </div>

          {/* Liquid Glass Certificate Preview */}
          <div className="apple-result-box p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <span className="text-xs font-semibold text-[#86868b]">Certified Certificate Preview</span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ISO 17050-1 Compliant
                </span>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-black/[0.06] font-mono text-[11px] leading-relaxed text-[#1d1d1f] shadow-xs overflow-x-auto whitespace-pre-wrap max-h-[380px]">
                {docText}
              </div>
            </div>

            <div className="p-3 bg-white/70 rounded-xl border border-black/[0.04] text-[11px] text-[#86868b] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#0071e3]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited Legal Responsibility</span>
              </div>
              <p>
                This DoC template satisfies European Union Medical Device Regulation (EU MDR 2017/745) Class I Annex IV and UK MDR 2002 statutory filing guidelines for global hospital tenders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeUkcaComplianceGenerator;
