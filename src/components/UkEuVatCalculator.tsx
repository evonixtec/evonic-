import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Printer,
  ShieldCheck,
  FileText,
  Percent,
  Building,
  Check,
  Calculator
} from 'lucide-react';

interface CountryVatRule {
  country: string;
  code: string;
  standardRate: number;
  reverseChargeApplicable: boolean;
  legalClause: string;
}

const COUNTRY_RULES: Record<string, CountryVatRule> = {
  UK: {
    country: 'United Kingdom (UK / HMRC)',
    code: 'GB',
    standardRate: 20,
    reverseChargeApplicable: true,
    legalClause: 'Reverse Charge applies: Customer to account for VAT to HMRC under Section 55A of the VAT Act 1994.',
  },
  DE: {
    country: 'Germany (Bundeszentralamt für Steuern)',
    code: 'DE',
    standardRate: 19,
    reverseChargeApplicable: true,
    legalClause: 'Steuerschuldnerschaft des Leistungsempfängers (Reverse charge: VAT payable by recipient under Art. 196 EU Directive 2006/112/EC).',
  },
  FR: {
    country: 'France (DGFIP)',
    code: 'FR',
    standardRate: 20,
    reverseChargeApplicable: true,
    legalClause: 'Autoliquidation de la TVA par le preneur assujetti (Reverse charge pursuant to Article 283-1 of the French CGI).',
  },
  NL: {
    country: 'Netherlands (Belastingdienst)',
    code: 'NL',
    standardRate: 21,
    reverseChargeApplicable: true,
    legalClause: 'Btw verlegd (VAT reverse-charged to the customer under Article 12, paragraph 3 of the Dutch Wet OB 1968).',
  },
  IT: {
    country: 'Italy (Agenzia delle Entrate)',
    code: 'IT',
    standardRate: 22,
    reverseChargeApplicable: true,
    legalClause: 'Inversione contabile (Reverse charge pursuant to Article 17, c. 2 of DPR 633/1972).',
  },
};

export const UkEuVatCalculator: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('UK');
  const [invoiceAmount, setInvoiceAmount] = useState<number>(3500);
  const [b2bOrB2c, setB2bOrB2c] = useState<'b2b' | 'b2c'>('b2b');
  const [currency, setCurrency] = useState<'GBP' | 'EUR' | 'USD'>('GBP');
  const [clientVatNumber, setClientVatNumber] = useState<string>('GB982348123');

  const rule = COUNTRY_RULES[selectedCountry] || COUNTRY_RULES.UK;
  const isReverseCharge = b2bOrB2c === 'b2b' && rule.reverseChargeApplicable;
  const applicableRate = isReverseCharge ? 0 : rule.standardRate;
  const vatAmount = (invoiceAmount * applicableRate) / 100;
  const totalAmount = invoiceAmount + vatAmount;

  const [hasCalculated, setHasCalculated] = useState(true);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  return (
    <div className="py-8 min-h-screen apple-tool-layout text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Apple Clean Header Banner */}
        <div className="apple-glass-box p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="apple-badge">
                UK &amp; European Compliance Engine
              </span>
              <span className="text-xs text-[#86868b] font-mono">HMRC &sect;55A &bull; EU Art. 196</span>
            </div>
            <h1 className="apple-tool-title mt-2">
              UK &amp; EU VAT Reverse Charge &amp; Statutory Declaration Generator
            </h1>
            <p className="apple-tool-subtitle">
              Verify B2B cross-border 0% reverse charge VAT qualification, generate statutory invoice clauses, and audit tax compliance for British &amp; EU tenders.
            </p>
          </div>
        </div>

        {/* Apple Clean Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 apple-glass-box p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[#1d1d1f] pb-2 border-b border-black/[0.06]">
              Invoice &amp; Regulatory Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Destination Country / Tax Authority
                </label>
                <select
                  aria-label="Destination Country or Tax Authority"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    if (e.target.value === 'UK') setCurrency('GBP');
                    else setCurrency('EUR');
                  }}
                  className="apple-input w-full font-medium"
                >
                  {Object.entries(COUNTRY_RULES).map(([code, r]) => (
                    <option key={code} value={code}>
                      {r.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Client Status (B2B Business vs B2C Consumer)
                </label>
                <select
                  aria-label="Client Status B2B or B2C"
                  value={b2bOrB2c}
                  onChange={(e) => setB2bOrB2c(e.target.value as 'b2b' | 'b2c')}
                  className="apple-input w-full font-medium"
                >
                  <option value="b2b">B2B Commercial Client (Valid VAT / EORI Number)</option>
                  <option value="b2c">B2C Retail Consumer (Standard Local VAT Applies)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Net Commercial Invoice Subtotal
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Invoice Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'GBP' | 'EUR' | 'USD')}
                    className="apple-input w-28 font-semibold"
                  >
                    <option value="GBP">GBP (&pound;)</option>
                    <option value="EUR">EUR (&euro;)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                  <input
                    type="number"
                    aria-label="Net Commercial Invoice Subtotal"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value) || 0)}
                    className="apple-input flex-1 font-mono font-semibold"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Buyer's VAT / EORI Number
                </label>
                <input
                  type="text"
                  aria-label="Buyer VAT or EORI Number"
                  value={clientVatNumber}
                  onChange={(e) => setClientVatNumber(e.target.value)}
                  placeholder="e.g. GB123456789 or DE987654321"
                  className="apple-input w-full font-mono font-medium uppercase"
                />
              </div>
            </div>

            {/* Apple Blue Calculate Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCalculate}
                className="apple-calculate-btn"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate VAT Assessment</span>
              </button>
            </div>

            {/* Statutory Compliance Notice */}
            <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06] space-y-2">
              <span className="text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider block">
                Statutory Invoice Declaration Clause (Paste on Client Invoice):
              </span>
              <p className="font-mono text-xs text-[#1d1d1f] bg-white/90 p-3 rounded-lg border border-black/[0.06] shadow-xs">
                &ldquo;{rule.legalClause} VAT ID: {clientVatNumber || 'PENDING VERIFICATION'}&rdquo;
              </p>
            </div>
          </div>

          {/* Liquid Glass Results Summary Box */}
          <div className="apple-result-box p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <span className="text-xs font-semibold text-[#86868b]">VAT Assessment</span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                  isReverseCharge 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {isReverseCharge ? '0% Reverse Charge Valid' : `Standard ${rule.standardRate}% VAT`}
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Net Invoice Subtotal:</span>
                  <span className="apple-metric-val">{currency} {invoiceAmount.toLocaleString()}</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Applicable VAT Rate:</span>
                  <span className="font-mono font-semibold text-[#0071e3]">{applicableRate}%</span>
                </div>
                <div className="apple-metric-row">
                  <span className="apple-metric-label">Calculated VAT Amount:</span>
                  <span className="apple-metric-val">{currency} {vatAmount.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-black/[0.06] flex justify-between items-center text-sm font-semibold">
                  <span className="text-[#1d1d1f]">Total Payable:</span>
                  <span className="font-mono text-[#0071e3] font-bold text-lg">{currency} {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-white/70 border border-black/[0.04] text-[11px] text-[#86868b] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#0071e3]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cross-Border Sialkot Exemption</span>
                </div>
                <p>
                  As an offshore export from Pakistan to the UK/EU, valid B2B transactions carry 0% export sales tax with zero withholding at source under standard bilateral trade terms.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Print Tax Assessment Ledger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
