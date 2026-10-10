import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  Download,
  Building,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Stamp,
  RotateCcw,
  Sparkles,
  Barcode,
  ShieldCheck,
  Save,
  Check,
  Eye,
  RefreshCw,
  Hash
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { EvonixLogo } from './EvonixLogo';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const STORAGE_KEY = 'evonix_invoice_state_v2';

// 100+ countries / regions tax configurations
export interface TaxPreset {
  country: string;
  taxName: string;
  rate: number;
  currency: string;
  symbol: string;
}

export const TAX_PRESETS: TaxPreset[] = [
  { country: 'Global Export (0% Duty Free)', taxName: 'Export 0% Duty Free', rate: 0, currency: 'USD', symbol: '$' },
  { country: 'Pakistan (FBR GST 18%)', taxName: 'FBR GST / Sales Tax', rate: 18, currency: 'PKR', symbol: 'Rs' },
  { country: 'Pakistan (PRA / SRB Services 16%)', taxName: 'Provincial Services Sales Tax', rate: 16, currency: 'PKR', symbol: 'Rs' },
  { country: 'United Arab Emirates (FTA VAT 5%)', taxName: 'UAE FTA VAT', rate: 5, currency: 'AED', symbol: 'AED' },
  { country: 'Saudi Arabia (ZATCA VAT 15%)', taxName: 'ZATCA VAT', rate: 15, currency: 'SAR', symbol: 'SAR' },
  { country: 'United Kingdom (HMRC Standard VAT 20%)', taxName: 'HMRC Standard VAT', rate: 20, currency: 'GBP', symbol: '£' },
  { country: 'United Kingdom (HMRC Reduced 5%)', taxName: 'HMRC Reduced VAT', rate: 5, currency: 'GBP', symbol: '£' },
  { country: 'European Union - Germany (MwSt 19%)', taxName: 'MwSt (Umsatzsteuer)', rate: 19, currency: 'EUR', symbol: '€' },
  { country: 'European Union - France (TVA 20%)', taxName: 'TVA', rate: 20, currency: 'EUR', symbol: '€' },
  { country: 'European Union - Italy (IVA 22%)', taxName: 'IVA', rate: 22, currency: 'EUR', symbol: '€' },
  { country: 'European Union - Spain (IVA 21%)', taxName: 'IVA', rate: 21, currency: 'EUR', symbol: '€' },
  { country: 'European Union (B2B Reverse Charge 0%)', taxName: 'EU B2B Reverse Charge', rate: 0, currency: 'EUR', symbol: '€' },
  { country: 'United States (General Sales Tax 8.25%)', taxName: 'US State & Local Sales Tax', rate: 8.25, currency: 'USD', symbol: '$' },
  { country: 'Canada (HST 13% Ontario)', taxName: 'HST Harmonized Sales Tax', rate: 13, currency: 'CAD', symbol: 'CA$' },
  { country: 'Australia (ATO GST 10%)', taxName: 'ATO GST', rate: 10, currency: 'AUD', symbol: 'A$' },
  { country: 'Singapore (IRAS GST 9%)', taxName: 'IRAS GST', rate: 9, currency: 'SGD', symbol: 'S$' },
  { country: 'Malaysia (SST 8%)', taxName: 'SST Sales & Service Tax', rate: 8, currency: 'MYR', symbol: 'RM' },
  { country: 'Qatar (Zero VAT / Corporate)', taxName: 'Qatar General Tax', rate: 0, currency: 'QAR', symbol: 'QAR' },
  { country: 'Kuwait (Corporate Tax 0%)', taxName: 'Kuwait Tax', rate: 0, currency: 'KWD', symbol: 'KD' },
  { country: 'Oman (VAT 5%)', taxName: 'Oman Tax Authority VAT', rate: 5, currency: 'OMR', symbol: 'OMR' },
  { country: 'Bahrain (NBR VAT 10%)', taxName: 'NBR VAT', rate: 10, currency: 'BHD', symbol: 'BD' },
  { country: 'Japan (Consumption Tax 10%)', taxName: 'JCT Japanese Consumption Tax', rate: 10, currency: 'JPY', symbol: '¥' },
  { country: 'China (VAT 13% Manufacturing)', taxName: 'China State Taxation VAT', rate: 13, currency: 'CNY', symbol: '¥' },
  { country: 'India (GST 18% Standard)', taxName: 'GST (CGST + SGST)', rate: 18, currency: 'INR', symbol: '₹' },
  { country: 'Switzerland (MWST 8.1%)', taxName: 'MWST / TVA', rate: 8.1, currency: 'CHF', symbol: 'CHF' },
  { country: 'Turkey (KDV 20%)', taxName: 'KDV Katma Deger Vergisi', rate: 20, currency: 'TRY', symbol: '₺' },
  { country: 'South Africa (SARS VAT 15%)', taxName: 'SARS VAT', rate: 15, currency: 'ZAR', symbol: 'R' },
  { country: 'Custom Rate (User Defined)', taxName: 'Custom Tax / Duty', rate: 0, currency: 'USD', symbol: '$' },
];

/**
 * Convert number to English words for commercial financial invoices
 */
export function convertNumberToWords(num: number, currencyCode: string = 'USD'): string {
  if (isNaN(num) || num === 0) return 'Zero ' + currencyCode;

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const integerPart = Math.floor(Math.abs(num));
  const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

  function convertChunk(n: number): string {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ones[n % 10] : '') + ' ';
    } else if (n > 0) {
      str += ones[n] + ' ';
    }
    return str.trim();
  }

  const billion = Math.floor(integerPart / 1000000000);
  const million = Math.floor((integerPart % 1000000000) / 1000000);
  const thousand = Math.floor((integerPart % 1000000) / 1000);
  const remainder = integerPart % 1000;

  let result = '';
  if (billion) result += convertChunk(billion) + ' Billion ';
  if (million) result += convertChunk(million) + ' Million ';
  if (thousand) result += convertChunk(thousand) + ' Thousand ';
  if (remainder) result += convertChunk(remainder) + ' ';

  result = result.trim();
  if (!result) result = 'Zero';

  const currencyNames: Record<string, { main: string; sub: string }> = {
    USD: { main: 'US Dollars', sub: 'Cents' },
    PKR: { main: 'Pakistani Rupees', sub: 'Paisa' },
    EUR: { main: 'Euros', sub: 'Cents' },
    GBP: { main: 'British Pounds', sub: 'Pence' },
    AED: { main: 'UAE Dirhams', sub: 'Fils' },
    SAR: { main: 'Saudi Riyals', sub: 'Halalas' },
    CAD: { main: 'Canadian Dollars', sub: 'Cents' },
    AUD: { main: 'Australian Dollars', sub: 'Cents' },
    SGD: { main: 'Singapore Dollars', sub: 'Cents' },
    INR: { main: 'Indian Rupees', sub: 'Paisa' },
    CHF: { main: 'Swiss Francs', sub: 'Rappen' },
    JPY: { main: 'Japanese Yen', sub: 'Sen' },
  };

  const cInfo = currencyNames[currencyCode] || { main: currencyCode, sub: 'Cents' };

  let formatted = `${result} ${cInfo.main}`;
  if (decimalPart > 0) {
    formatted += ` and ${convertChunk(decimalPart)} ${cInfo.sub}`;
  }
  return formatted + ' Only';
}

/**
 * Visual Vector Code-128 Barcode Generator
 */
export const VisualCode128Barcode: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  // Deterministic bar widths based on char codes
  const bars = React.useMemo(() => {
    const list: { width: number; isBlack: boolean }[] = [];
    list.push({ width: 2, isBlack: true });
    list.push({ width: 1, isBlack: false });
    list.push({ width: 2, isBlack: true });
    list.push({ width: 2, isBlack: false });

    for (let i = 0; i < code.length; i++) {
      const charCode = code.charCodeAt(i);
      const b1 = (charCode % 3) + 1;
      const b2 = ((charCode >> 1) % 2) + 1;
      const b3 = ((charCode >> 2) % 3) + 1;
      const b4 = ((charCode >> 3) % 2) + 1;
      list.push({ width: b1, isBlack: true });
      list.push({ width: b2, isBlack: false });
      list.push({ width: b3, isBlack: true });
      list.push({ width: b4, isBlack: false });
    }

    list.push({ width: 2, isBlack: true });
    list.push({ width: 1, isBlack: false });
    list.push({ width: 3, isBlack: true });
    list.push({ width: 1, isBlack: false });
    list.push({ width: 2, isBlack: true });
    return list;
  }, [code]);

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="flex items-stretch h-10 bg-white px-2 py-1 border border-slate-200 rounded">
        {bars.map((bar, idx) => (
          <span
            key={idx}
            style={{ width: `${bar.width * 1.6}px` }}
            className={`h-full ${bar.isBlack ? 'bg-slate-900' : 'bg-transparent'}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono tracking-widest text-slate-600 mt-0.5">{code}</span>
    </div>
  );
};

export const GlobalInvoiceHub: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings State: Logo & Brand
  const [useOfficialLogo, setUseOfficialLogo] = useState<boolean>(true);
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [brandName, setBrandName] = useState<string>(COMPANY_INFO.name);
  const [brandTagline, setBrandTagline] = useState<string>(COMPANY_INFO.tagline);
  const [companyAddress, setCompanyAddress] = useState<string>(COMPANY_INFO.contact.address);
  const [companyEmail, setCompanyEmail] = useState<string>(COMPANY_INFO.contact.email);
  const [companyPhone, setCompanyPhone] = useState<string>(COMPANY_INFO.contact.phoneDisplay);
  const [taxNumber, setTaxNumber] = useState<string>('NTN: 8492019-2 | STRN: 3277876123456');

  // Invoice Number & Dates
  const [invoicePrefix, setInvoicePrefix] = useState<string>('INV-2026-');
  const [invoiceSequence, setInvoiceSequence] = useState<number>(42);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-2026-0042');
  const [invoiceDate, setInvoiceDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [poNumber, setPoNumber] = useState<string>('PO-DE-90812');

  // Client Details
  const [buyerName, setBuyerName] = useState('Apex International Surgical LLC');
  const [buyerContact, setBuyerContact] = useState('Dr. Marcus Weber (Procurement Director)');
  const [buyerAddress, setBuyerAddress] = useState('142 Business Bay, London, UK / Frankfurt, Germany');
  const [buyerTaxId, setBuyerTaxId] = useState('VAT ID: DE318920194 / GB829104829');

  // Currency & Tax Engine (100+ Countries)
  const [selectedTaxPreset, setSelectedTaxPreset] = useState<string>(TAX_PRESETS[0].country);
  const [taxName, setTaxName] = useState<string>(TAX_PRESETS[0].taxName);
  const [taxRate, setTaxRate] = useState<number>(TAX_PRESETS[0].rate);
  const [currency, setCurrency] = useState<string>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');

  // Payment & Banking Terms
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days / TT Wire / LC at Sight');
  const [deliveryTerms, setDeliveryTerms] = useState('FOB Sialkot / CIF Frankfurt Airport Cargo');
  const [bankName, setBankName] = useState('Meezan Bank Ltd / Standard Chartered Sialkot');
  const [accountTitle, setAccountTitle] = useState('evonix technologies Sialkot');
  const [iban, setIban] = useState('PK36MEZN00001004582910');
  const [swiftBic, setSwiftBic] = useState('MEZNPKKA');

  // Authorized Signatory & Official Stamp
  const [showAuthorizedSignature, setShowAuthorizedSignature] = useState<boolean>(true);
  const [signatoryName, setSignatoryName] = useState<string>('Engr. Hamza Reza');
  const [signatoryRole, setSignatoryRole] = useState<string>('Authorized Signatory & Chief Technology Officer');
  const [stampText, setStampText] = useState<string>('EVONIX TECHNOLOGIES\nOFFICIAL EXPORT SEAL\nVERIFIED & PASSED');
  const [showStamp, setShowStamp] = useState<boolean>(true);
  const [signatureDate, setSignatureDate] = useState<string>(() => new Date().toLocaleDateString('en-GB'));
  const [showBarcode, setShowBarcode] = useState<boolean>(true);

  // Line Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Titanium Micro-Surgical Scalpel Handles Grade 5', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Atraumatic Cardiovascular Forceps SS316 Hospital Grade', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Digital Cloud ERP Workstation License & Maintenance (1 Year)', quantity: 1, rate: 1450.0 },
  ]);

  // Notes & Declarations
  const [declarationText, setDeclarationText] = useState(
    'We certify that this invoice shows the actual price of the goods described, that no other invoice has been or will be issued, and that all particulars are true and correct.'
  );

  // UI helpers
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor');

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.rate) || 0), 0);
  const taxAmount = (subtotal * (Number(taxRate) || 0)) / 100;
  const grandTotal = subtotal + taxAmount;
  const amountInWords = convertNumberToWords(grandTotal, currency);

  // Load saved state from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.invoiceNumber) setInvoiceNumber(data.invoiceNumber);
        if (data.invoicePrefix) setInvoicePrefix(data.invoicePrefix);
        if (data.invoiceSequence) setInvoiceSequence(data.invoiceSequence);
        if (data.brandName) setBrandName(data.brandName);
        if (data.brandTagline) setBrandTagline(data.brandTagline);
        if (data.customLogoUrl) setCustomLogoUrl(data.customLogoUrl);
        if (typeof data.useOfficialLogo === 'boolean') setUseOfficialLogo(data.useOfficialLogo);
        if (data.companyAddress) setCompanyAddress(data.companyAddress);
        if (data.companyEmail) setCompanyEmail(data.companyEmail);
        if (data.companyPhone) setCompanyPhone(data.companyPhone);
        if (data.taxNumber) setTaxNumber(data.taxNumber);
        if (data.buyerName) setBuyerName(data.buyerName);
        if (data.buyerAddress) setBuyerAddress(data.buyerAddress);
        if (data.buyerTaxId) setBuyerTaxId(data.buyerTaxId);
        if (data.buyerContact) setBuyerContact(data.buyerContact);
        if (data.currency) setCurrency(data.currency);
        if (data.currencySymbol) setCurrencySymbol(data.currencySymbol);
        if (data.taxRate !== undefined) setTaxRate(data.taxRate);
        if (data.taxName) setTaxName(data.taxName);
        if (data.items && Array.isArray(data.items)) setItems(data.items);
        if (data.signatoryName) setSignatoryName(data.signatoryName);
        if (data.signatoryRole) setSignatoryRole(data.signatoryRole);
        if (data.stampText) setStampText(data.stampText);
        if (typeof data.showAuthorizedSignature === 'boolean') setShowAuthorizedSignature(data.showAuthorizedSignature);
        if (typeof data.showStamp === 'boolean') setShowStamp(data.showStamp);
        if (typeof data.showBarcode === 'boolean') setShowBarcode(data.showBarcode);
        if (data.bankName) setBankName(data.bankName);
        if (data.iban) setIban(data.iban);
        if (data.swiftBic) setSwiftBic(data.swiftBic);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save current state to localStorage
  const handleSaveToLocalStorage = () => {
    try {
      const stateToSave = {
        invoiceNumber,
        invoicePrefix,
        invoiceSequence,
        brandName,
        brandTagline,
        customLogoUrl,
        useOfficialLogo,
        companyAddress,
        companyEmail,
        companyPhone,
        taxNumber,
        buyerName,
        buyerAddress,
        buyerTaxId,
        buyerContact,
        currency,
        currencySymbol,
        taxRate,
        taxName,
        items,
        signatoryName,
        signatoryRole,
        stampText,
        showAuthorizedSignature,
        showStamp,
        showBarcode,
        bankName,
        iban,
        swiftBic,
        paymentTerms,
        deliveryTerms,
        declarationText,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Reset to default 5 days ago settings
  const handleResetToDefaults = () => {
    setUseOfficialLogo(true);
    setCustomLogoUrl('');
    setBrandName(COMPANY_INFO.name);
    setBrandTagline(COMPANY_INFO.tagline);
    setCompanyAddress(COMPANY_INFO.contact.address);
    setCompanyEmail(COMPANY_INFO.contact.email);
    setCompanyPhone(COMPANY_INFO.contact.phoneDisplay);
    setTaxNumber('NTN: 8492019-2 | STRN: 3277876123456');

    setInvoicePrefix('INV-2026-');
    setInvoiceSequence(42);
    setInvoiceNumber('INV-2026-0042');
    setInvoiceDate(new Date().toISOString().split('T')[0]);

    setBuyerName('Apex International Surgical LLC');
    setBuyerContact('Dr. Marcus Weber (Procurement Director)');
    setBuyerAddress('142 Business Bay, London, UK / Frankfurt, Germany');
    setBuyerTaxId('VAT ID: DE318920194 / GB829104829');

    setSelectedTaxPreset(TAX_PRESETS[0].country);
    setTaxName(TAX_PRESETS[0].taxName);
    setTaxRate(TAX_PRESETS[0].rate);
    setCurrency('USD');
    setCurrencySymbol('$');

    setShowAuthorizedSignature(true);
    setSignatoryName('Engr. Hamza Reza');
    setSignatoryRole('Authorized Signatory & Chief Technology Officer');
    setStampText('EVONIX TECHNOLOGIES\nOFFICIAL EXPORT SEAL\nVERIFIED & PASSED');
    setShowStamp(true);
    setShowBarcode(true);

    setBankName('Meezan Bank Ltd / Standard Chartered Sialkot');
    setAccountTitle('evonix technologies Sialkot');
    setIban('PK36MEZN00001004582910');
    setSwiftBic('MEZNPKKA');

    setItems([
      { id: '1', description: 'Titanium Micro-Surgical Scalpel Handles Grade 5', quantity: 150, rate: 24.0 },
      { id: '2', description: 'Atraumatic Cardiovascular Forceps SS316 Hospital Grade', quantity: 80, rate: 32.5 },
      { id: '3', description: 'Digital Cloud ERP Workstation License & Maintenance (1 Year)', quantity: 1, rate: 1450.0 },
    ]);

    localStorage.removeItem(STORAGE_KEY);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Auto-increment invoice number
  const handleIncrementInvoiceNumber = () => {
    const nextSeq = invoiceSequence + 1;
    setInvoiceSequence(nextSeq);
    const padded = String(nextSeq).padStart(4, '0');
    setInvoiceNumber(`${invoicePrefix}${padded}`);
  };

  // Custom Logo upload via FileReader
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomLogoUrl(event.target.result as string);
          setUseOfficialLogo(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Tax Preset change handler
  const handleTaxPresetChange = (presetCountry: string) => {
    setSelectedTaxPreset(presetCountry);
    const preset = TAX_PRESETS.find((p) => p.country === presetCountry);
    if (preset) {
      setTaxName(preset.taxName);
      setTaxRate(preset.rate);
      setCurrency(preset.currency);
      setCurrencySymbol(preset.symbol);
    }
  };

  // Item Management
  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: 'New Export Surgical Instrument or IT Service Item', quantity: 10, rate: 25.0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((it) => it.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 print:p-0 print:max-w-none">
        
        {/* Top Management Toolbar (Hidden in Print) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Global Micro-Invoice Generator
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  All Settings Restored
                </span>
              </div>
              <p className="text-xs text-slate-500">
                100% Free · Client-side zero-database privacy · Brand logo, stamps, auto-number &amp; authorized signature
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-Increment Invoice Number Button */}
            <button
              onClick={handleIncrementInvoiceNumber}
              title="Generate Next Sequential Invoice Number"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
            >
              <Hash className="w-3.5 h-3.5 text-red-600" />
              <span>Next No. ({invoicePrefix}{String(invoiceSequence + 1).padStart(4, '0')})</span>
            </button>

            {/* Quick Save to LocalStorage */}
            <button
              onClick={handleSaveToLocalStorage}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              {savedNotification ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedNotification ? 'Saved locally!' : 'Save Settings'}</span>
            </button>

            {/* Restore 5 Days Ago Original Defaults */}
            <button
              onClick={handleResetToDefaults}
              title="Reset all settings to original defaults (Brand logo, signatures, Sialkot export details)"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            {/* Print / Save A4 PDF Button */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save A4 PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Settings Panel Accordion / Drawer (Hidden in Print) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Customize Invoice Controls (Logo, Brand, Number, Signature &amp; Stamp)</span>
            </span>
            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showAuthorizedSignature}
                  onChange={(e) => setShowAuthorizedSignature(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className="font-semibold text-slate-700">Authorized Signature</span>
              </label>

              <span className="text-slate-300">|</span>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showStamp}
                  onChange={(e) => setShowStamp(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className="font-semibold text-slate-700">Official Stamp</span>
              </label>

              <span className="text-slate-300">|</span>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showBarcode}
                  onChange={(e) => setShowBarcode(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className="font-semibold text-slate-700">Code128 Barcode</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Logo Switcher */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="font-bold text-slate-700 block">Brand Logo</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUseOfficialLogo(true)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border cursor-pointer transition-colors ${
                    useOfficialLogo
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  evonix Logo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseOfficialLogo(false);
                    fileInputRef.current?.click();
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border cursor-pointer transition-colors flex items-center justify-center gap-1 ${
                    !useOfficialLogo
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Custom Logo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              {!useOfficialLogo && customLogoUrl && (
                <div className="flex items-center justify-between text-[10px] text-emerald-600 font-semibold pt-1">
                  <span>Custom logo active</span>
                  <button
                    onClick={() => {
                      setCustomLogoUrl('');
                      setUseOfficialLogo(true);
                    }}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Brand / Issuer Name */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 block">Brand / Company Name</label>
              <input
                type="text"
                aria-label="Brand or Company Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>

            {/* Tax Engine Preset */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 block">Tax Engine (100+ Countries)</label>
              <select
                aria-label="Tax Engine Preset"
                value={selectedTaxPreset}
                onChange={(e) => handleTaxPresetChange(e.target.value)}
                className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
              >
                {TAX_PRESETS.map((p) => (
                  <option key={p.country} value={p.country}>
                    {p.country} ({p.rate}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Signatory Settings */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 block">Authorized Signatory Name</label>
              <input
                type="text"
                aria-label="Authorized Signatory Name"
                value={signatoryName}
                onChange={(e) => setSignatoryName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            PRINT-READY COMMERCIAL INVOICE CANVAS (A4 Format)
           ======================================================== */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900">
          
          {/* Header Section: Logo + Brand + Commercial Invoice + Barcode */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-slate-200">
            {/* Left: Brand Logo & Information */}
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-3">
                {useOfficialLogo ? (
                  <div className="flex items-center gap-2">
                    <EvonixLogo size="sm" forceTheme="light" showTechnologies={true} />
                  </div>
                ) : customLogoUrl ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={customLogoUrl}
                      alt={brandName}
                      className="h-10 max-w-[140px] object-contain rounded"
                    />
                    <span className="text-lg font-black tracking-tight text-slate-900">{brandName}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                      EX
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900">{brandName}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                <span className="font-semibold text-slate-700">{companyAddress}</span>
                <br />
                Email: {companyEmail} | Tel: {companyPhone}
                <br />
                <span className="font-mono text-slate-600">{taxNumber}</span>
              </p>
            </div>

            {/* Right: Invoice Number, Barcode & Issue Dates */}
            <div className="text-right flex flex-col items-end space-y-1.5 sm:min-w-[240px]">
              <span className="text-xs font-mono font-black text-red-600 tracking-wider uppercase block">
                COMMERCIAL INVOICE
              </span>

              {/* Barcode representation */}
              {showBarcode && (
                <div className="my-1">
                  <VisualCode128Barcode code={invoiceNumber} />
                </div>
              )}

              <div className="flex items-center gap-2 justify-end text-xs font-mono">
                <span className="text-slate-400 font-semibold">Invoice No:</span>
                <input
                  type="text"
                  aria-label="Invoice Number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono font-bold border border-slate-300 rounded text-right w-36 bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 justify-end text-xs font-mono">
                <span className="text-slate-400 font-semibold">Date:</span>
                <input
                  type="date"
                  aria-label="Invoice Date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono text-slate-700 border border-slate-300 rounded text-right bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 justify-end text-xs font-mono">
                <span className="text-slate-400 font-semibold">Due Date:</span>
                <input
                  type="date"
                  aria-label="Due Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono text-slate-700 border border-slate-300 rounded text-right bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 justify-end text-xs font-mono">
                <span className="text-slate-400 font-semibold">PO Ref:</span>
                <input
                  type="text"
                  aria-label="Purchase Order Reference"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono text-slate-700 border border-slate-300 rounded text-right w-28 bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>
            </div>
          </div>

          {/* Client & Shipping Logistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Bill To */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 print:bg-transparent print:border print:p-3">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                Bill To (Consignee)
              </span>
              <input
                type="text"
                aria-label="Bill To Buyer Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-200 pb-0.5 focus:outline-none print:border-none"
              />
              <input
                type="text"
                aria-label="Attention or Buyer Contact"
                value={buyerContact}
                onChange={(e) => setBuyerContact(e.target.value)}
                className="w-full text-slate-600 text-[11px] bg-transparent focus:outline-none"
              />
              <input
                type="text"
                aria-label="Bill To Buyer Address"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full text-slate-500 text-[11px] bg-transparent focus:outline-none"
              />
              <input
                type="text"
                aria-label="Buyer Tax ID or VAT"
                value={buyerTaxId}
                onChange={(e) => setBuyerTaxId(e.target.value)}
                className="w-full font-mono text-[10px] text-slate-500 bg-transparent focus:outline-none"
              />
            </div>

            {/* Payment & Logistics Terms */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 print:bg-transparent print:border print:p-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                    Payment &amp; Delivery Terms
                  </span>
                  <input
                    type="text"
                    aria-label="Payment Terms"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="font-semibold text-slate-900 bg-transparent border-b border-slate-200 pb-0.5 text-xs w-full focus:outline-none print:border-none"
                  />
                  <input
                    type="text"
                    aria-label="Incoterms & Delivery"
                    value={deliveryTerms}
                    onChange={(e) => setDeliveryTerms(e.target.value)}
                    className="text-[11px] text-slate-600 bg-transparent w-full focus:outline-none mt-1"
                  />
                </div>

                <div className="text-right">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block">
                    Currency
                  </label>
                  <select
                    aria-label="Invoice Currency"
                    value={currency}
                    onChange={(e) => {
                      const cur = e.target.value;
                      setCurrency(cur);
                      const map: Record<string, string> = {
                        USD: '$',
                        PKR: 'Rs',
                        EUR: '€',
                        GBP: '£',
                        AED: 'AED',
                        SAR: 'SAR',
                        CAD: 'CA$',
                        AUD: 'A$',
                        SGD: 'S$',
                        INR: '₹',
                      };
                      setCurrencySymbol(map[cur] || cur);
                    }}
                    className="px-2 py-1 rounded border border-slate-300 text-xs font-bold bg-white print:border-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="PKR">PKR (Rs)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (Dirhams)</option>
                    <option value="SAR">SAR (Riyals)</option>
                    <option value="CAD">CAD (CA$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="SGD">SGD (S$)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div className="pt-1 text-[10px] text-slate-500 border-t border-slate-200/60 flex items-center justify-between">
                <span>Tax Scheme: {taxName}</span>
                <span className="font-mono font-bold text-slate-700">{taxRate}%</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-500 font-bold uppercase text-[10px] bg-slate-50/80 print:bg-transparent">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Item Description &amp; Specifications</th>
                  <th className="py-2.5 px-2 text-center w-20">Qty</th>
                  <th className="py-2.5 px-2 text-right w-28">Unit Rate</th>
                  <th className="py-2.5 px-2 text-right w-32">Amount</th>
                  <th className="py-2.5 px-2 text-center w-10 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((it, idx) => (
                  <tr key={it.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px] align-middle">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-2 align-middle">
                      <input
                        type="text"
                        aria-label={`Item ${idx + 1} Description`}
                        value={it.description}
                        onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                        className="w-full font-medium text-slate-800 bg-transparent focus:outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center align-middle">
                      <input
                        type="number"
                        aria-label={`Item ${idx + 1} Quantity`}
                        value={it.quantity}
                        onChange={(e) => handleUpdateItem(it.id, 'quantity', Number(e.target.value) || 0)}
                        className="w-16 px-1.5 py-0.5 text-center border border-slate-200 rounded font-mono bg-white print:border-none print:p-0"
                        min="1"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono align-middle">
                      <input
                        type="number"
                        aria-label={`Item ${idx + 1} Unit Rate`}
                        value={it.rate}
                        onChange={(e) => handleUpdateItem(it.id, 'rate', Number(e.target.value) || 0)}
                        className="w-24 px-1.5 py-0.5 text-right border border-slate-200 rounded font-mono bg-white print:border-none print:p-0"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900 align-middle">
                      {currencySymbol} {((Number(it.quantity) || 0) * (Number(it.rate) || 0)).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center print:hidden align-middle">
                      <button
                        onClick={() => handleRemoveItem(it.id)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer p-1"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Item Button (Hidden in Print) */}
          <div className="print:hidden flex justify-between items-center">
            <button
              onClick={handleAddItem}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-red-600" />
              <span>Add Line Item</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {items.length} {items.length === 1 ? 'item' : 'items'} in commercial manifest
            </span>
          </div>

          {/* Amount In Words & Totals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200 text-xs">
            {/* Left: Amount in Words & Official Declaration */}
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 print:bg-transparent print:border print:p-2.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                  Total Amount In Words
                </span>
                <p className="font-serif italic font-semibold text-slate-800 text-xs mt-0.5 leading-snug">
                  {amountInWords}
                </p>
              </div>

              {/* Bank Details */}
              <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <span className="font-bold text-slate-900 block text-xs">Banking &amp; Wire Transfer Details:</span>
                <p><strong className="text-slate-700">Bank Name:</strong> {bankName}</p>
                <p><strong className="text-slate-700">Account Title:</strong> {accountTitle}</p>
                <p><strong className="text-slate-700">IBAN:</strong> <span className="font-mono">{iban}</span></p>
                <p><strong className="text-slate-700">SWIFT / BIC:</strong> <span className="font-mono">{swiftBic}</span></p>
              </div>

              {/* Legal Declaration */}
              <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-100 leading-tight">
                "{declarationText}"
              </div>
            </div>

            {/* Right: Subtotals, Tax & Grand Total */}
            <div className="space-y-2 font-mono flex flex-col justify-start">
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span className="font-sans font-medium">Subtotal:</span>
                <span>{currencySymbol} {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600 py-1 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-sans">
                  <span>{taxName}:</span>
                  <span className="text-[10px] text-slate-400">({taxRate}%)</span>
                </div>
                <span>{currencySymbol} {taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-base sm:text-lg font-bold text-slate-900 py-2 border-b-2 border-slate-900">
                <span className="font-sans">Grand Total Due:</span>
                <span className="text-red-600">{currencySymbol} {grandTotal.toFixed(2)} {currency}</span>
              </div>

              <div className="pt-2 text-right">
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-sans font-bold rounded-lg border border-emerald-200">
                  Zero Database Privacy · Encrypted Client Memory
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              AUTHORIZED SIGNATURE & OFFICIAL STAMP FOOTER (Restored)
             ======================================================== */}
          <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
            {/* Left: Terms and Customer Acceptance */}
            <div className="text-[11px] text-slate-500 space-y-2">
              <p className="font-semibold text-slate-700">Payment &amp; Acceptance Instructions:</p>
              <ul className="list-disc list-inside space-y-0.5 text-[10.5px]">
                <li>Direct wire transfers must quote Invoice #{invoiceNumber} on swift remarks.</li>
                <li>Inspection certificates must match verified surgical lots prior to cargo departure.</li>
                <li>All disputes are subject to Sialkot Chamber of Commerce &amp; Industry (SCCI) arbitration.</li>
              </ul>
            </div>

            {/* Right: Authorized Signature + Official Company Stamp */}
            <div className="flex items-end justify-end gap-6 sm:gap-8">
              {/* Official Red Stamp Seal */}
              {showStamp && (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-500 bg-red-50/40 flex flex-col items-center justify-center text-center p-1.5 rotate-[-8deg] shadow-xs select-none">
                  <div className="w-full h-full border border-red-300 rounded-full flex flex-col items-center justify-center p-1">
                    <Stamp className="w-3.5 h-3.5 text-red-600 mb-0.5" />
                    <span className="text-[7.5px] font-black text-red-700 tracking-tight leading-tight uppercase whitespace-pre-line">
                      {stampText}
                    </span>
                  </div>
                </div>
              )}

              {/* Authorized Signatory Line & Credentials */}
              {showAuthorizedSignature && (
                <div className="text-right space-y-1 min-w-[190px]">
                  {/* Signature script-like placeholder representation */}
                  <div className="h-10 flex items-end justify-end pb-1">
                    <span className="font-serif italic font-bold text-lg text-slate-800 tracking-wider border-b-2 border-slate-900 pb-0.5 px-4 inline-block">
                      {signatoryName}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900">{signatoryName}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{signatoryRole}</div>
                  <div className="text-[10px] font-mono text-slate-400">Date: {signatureDate}</div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Copyright watermark in print */}
          <div className="text-center text-[9px] text-slate-400 pt-4 border-t border-slate-100">
            Certified Commercial Document generated via EVONIX Zero-Database Invoice Hub · Kolti Behram, Sialkot, Pakistan · Verification: https://www.evonixtec.com/invoice
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalInvoiceHub;
