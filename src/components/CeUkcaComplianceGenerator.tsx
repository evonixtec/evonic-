import React, { useState } from 'react';
import {
  FileCheck,
  Printer,
  Copy,
  ShieldCheck,
  CheckCircle2,
  Building,
  Calendar,
  Check
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
Place of Issue: Kolti Behram, Sialkot, Pakistan
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

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                UK &amp; European Regulatory Standard
              </span>
              <span className="text-xs text-slate-500 font-mono">UKCA &amp; CE Marking MDR / RoHS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              UKCA &amp; CE Declaration of Conformity (DoC) Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Generate audited technical Declaration of Conformity certificates for UK and European Union medical, surgical, and hardware procurement tenders.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copiedDoc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDoc ? 'Copied Certificate!' : 'Copy Certificate'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Technical File &amp; Batch Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Description</label>
              <input
                type="text"
                aria-label="Product Description"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Model / Catalog No</label>
                <input
                  type="text"
                  aria-label="Model or Catalog Number"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch / Lot Identification</label>
                <input
                  type="text"
                  aria-label="Batch or Lot Identification"
                  value={batchLotNumber}
                  onChange={(e) => setBatchLotNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Conformity Directives</label>
              <input
                type="text"
                aria-label="Conformity Directives"
                value={standardDirective}
                onChange={(e) => setStandardDirective(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Harmonized Quality Standards</label>
              <input
                type="text"
                aria-label="Harmonized Quality Standards"
                value={isoStandard}
                onChange={(e) => setIsoStandard(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Engineer Name</label>
                <input
                  type="text"
                  aria-label="Signatory Engineer Name"
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Title</label>
                <input
                  type="text"
                  aria-label="Signatory Title"
                  value={signatoryRole}
                  onChange={(e) => setSignatoryRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Certificate Preview Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md font-mono text-[11px] leading-relaxed text-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-bold text-red-600">UKCA &amp; CE DECLARATION OF CONFORMITY</span>
              <span className="text-[10px] text-slate-400">EN ISO 17050-1 COMPLIANT</span>
            </div>

            <div className="text-[10px] space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
              <div><strong>Manufacturer:</strong> {COMPANY_INFO.legalName}</div>
              <div><strong>Origin:</strong> {COMPANY_INFO.contact.address}</div>
              <div><strong>Item:</strong> {productName} ({modelNumber})</div>
              <div><strong>Traceability:</strong> Batch {batchLotNumber}</div>
            </div>

            <p className="text-[10.5px] text-slate-700">
              We declare under sole responsibility that the above apparatus conforms to the essential requirements of EU MDR 2017/745 and UK Medical Devices Regulations 2002, applied against {isoStandard}.
            </p>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px]">
              <div>
                <div className="font-bold">{signatoryName}</div>
                <div className="text-slate-500">{signatoryRole}</div>
                <div className="text-slate-400">evonix Quality Lab, Kolti Behram</div>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-400 flex items-center justify-center text-[8px] font-bold text-red-600 uppercase text-center p-1 rotate-[-12deg]">
                Official Quality Stamp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
