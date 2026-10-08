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
  Check
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
  const [b2bOrB2c, setB2bOrB2c] = useState<'b2b' | 'b2c'>('b2b');
  const [invoiceAmount, setInvoiceAmount] = useState<number>(12500);
  const [currency, setCurrency] = useState<'GBP' | 'EUR' | 'USD'>('GBP');
  const [clientVatNumber, setClientVatNumber] = useState<string>('GB987654321');
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  const rule = COUNTRY_RULES[selectedCountry] || COUNTRY_RULES.UK;
  const isReverseCharge = b2bOrB2c === 'b2b' && rule.reverseChargeApplicable;
  const applicableRate = isReverseCharge ? 0 : rule.standardRate;
  const vatAmount = (invoiceAmount * applicableRate) / 100;
  const totalAmount = invoiceAmount + vatAmount;

  const handleCopyClause = () => {
    try {
      const text = `${rule.legalClause} Buyer VAT/EORI: ${clientVatNumber}`;
      navigator.clipboard.writeText(text);
      setCopiedClause(true);
      setTimeout(() => setCopiedClause(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                UK &amp; EU Trade Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">HMRC &amp; EU Directive 2006/112/EC</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              UK &amp; EU VAT Reverse Charge &amp; MOSS Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Calculate legal 0% B2B export VAT exemptions and generate mandatory statutory compliance clauses for British and European clients.
            </p>
          </div>
          <button
            onClick={handleCopyClause}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-start md:self-auto"
          >
            {copiedClause ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedClause ? 'Copied Clause!' : 'Copy Statutory Clause'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Controls */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Consignment &amp; Buyer Registration Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500 font-medium"
                >
                  {Object.entries(COUNTRY_RULES).map(([code, r]) => (
                    <option key={code} value={code}>
                      {r.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client Status (B2B Business vs B2C Consumer)
                </label>
                <select
                  aria-label="Client Status B2B or B2C"
                  value={b2bOrB2c}
                  onChange={(e) => setB2bOrB2c(e.target.value as 'b2b' | 'b2c')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500 font-medium"
                >
                  <option value="b2b">B2B Commercial Client (Valid VAT / EORI Number)</option>
                  <option value="b2c">B2C Retail Consumer (Standard Local VAT Applies)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Net Commercial Invoice Subtotal
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Invoice Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'GBP' | 'EUR' | 'USD')}
                    className="w-24 px-2 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                  >
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                  <input
                    type="number"
                    aria-label="Net Commercial Invoice Subtotal"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden font-mono font-bold"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Buyer's VAT / EORI Number
                </label>
                <input
                  type="text"
                  aria-label="Buyer VAT or EORI Number"
                  value={clientVatNumber}
                  onChange={(e) => setClientVatNumber(e.target.value)}
                  placeholder="e.g. GB123456789 or DE987654321"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden font-mono font-bold"
                />
              </div>
            </div>

            {/* Statutory Compliance Notice */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                Statutory Invoice Declaration Clause (Paste on Client Invoice):
              </span>
              <p className="font-mono text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                "{rule.legalClause} VAT ID: {clientVatNumber || 'PENDING VERIFICATION'}"
              </p>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">VAT Assessment</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isReverseCharge ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400'
                }`}>
                  {isReverseCharge ? '0% Reverse Charge Valid' : `Standard ${rule.standardRate}% VAT`}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Net Invoice Subtotal:</span>
                  <span className="font-mono font-bold">{currency} {invoiceAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Applicable VAT Rate:</span>
                  <span className="font-mono font-bold text-emerald-400">{applicableRate}%</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Calculated VAT Amount:</span>
                  <span className="font-mono font-bold">{currency} {vatAmount.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Payable:</span>
                  <span className="font-mono text-lg text-emerald-400">{currency} {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cross-Border Sialkot Exemption</span>
                </div>
                <p>
                  As an offshore export from Pakistan to the UK/EU, valid B2B transactions carry 0% export sales tax with zero withholding at source under standard bilateral trade terms.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Assessment Ledger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
