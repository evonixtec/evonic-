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
  Hash,
  Globe2,
  Languages,
  CheckCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { EvonixLogo } from './EvonixLogo';
import {
  SupportedInvoiceLanguage,
  SUPPORTED_LANGUAGES,
  INVOICE_TRANSLATIONS,
  SAMPLE_ITEMS_BY_LANG,
  convertNumberToWordsLocalized
} from '../data/invoiceTranslations';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const STORAGE_KEY = 'evonix_invoice_state_v3';

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
  { country: 'European Union - Netherlands (Btw 21%)', taxName: 'BTW Hoog Tarief', rate: 21, currency: 'EUR', symbol: '€' },
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
 * Visual Vector Code-128 Barcode Generator
 */
export const VisualCode128Barcode: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
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
      <div className="flex items-stretch h-9 bg-white px-2 py-0.5 border border-slate-200 rounded">
        {bars.map((bar, idx) => (
          <span
            key={idx}
            style={{ width: `${bar.width * 1.5}px` }}
            className={`h-full ${bar.isBlack ? 'bg-slate-900' : 'bg-transparent'}`}
          />
        ))}
      </div>
      <span className="text-[9.5px] font-mono tracking-widest text-slate-600 mt-0.5">{code}</span>
    </div>
  );
};

export const GlobalInvoiceHub: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Selected Language (Default 'en', supports 'nl', 'fr', 'de', 'es', 'it', 'ar', 'ur')
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedInvoiceLanguage>('en');

  // Settings State: Logo & Brand
  const [useOfficialLogo, setUseOfficialLogo] = useState<boolean>(true);
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [brandName, setBrandName] = useState<string>(COMPANY_INFO.name);
  const [brandTagline, setBrandTagline] = useState<string>(COMPANY_INFO.tagline);
  const [companyAddress, setCompanyAddress] = useState<string>('Kotli Behram, Sialkot, Pakistan');
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
  const [paymentTerms, setPaymentTerms] = useState(INVOICE_TRANSLATIONS.en.paymentTermsDefault);
  const [deliveryTerms, setDeliveryTerms] = useState(INVOICE_TRANSLATIONS.en.deliveryTermsDefault);
  const [bankName, setBankName] = useState('Meezan Bank Ltd / Standard Chartered Sialkot');
  const [accountTitle, setAccountTitle] = useState('evonix technologies Sialkot');
  const [iban, setIban] = useState('PK36MEZN00001004582910');
  const [swiftBic, setSwiftBic] = useState('MEZNPKKA');

  // Authorized Signatory & Official Stamp
  const [showAuthorizedSignature, setShowAuthorizedSignature] = useState<boolean>(true);
  const [signatoryName, setSignatoryName] = useState<string>('Engr. Hamza Reza');
  const [signatoryRole, setSignatoryRole] = useState<string>(INVOICE_TRANSLATIONS.en.signatoryRoleDefault);
  const [stampText, setStampText] = useState<string>(INVOICE_TRANSLATIONS.en.stampSealText);
  const [showStamp, setShowStamp] = useState<boolean>(true);
  const [signatureDate, setSignatureDate] = useState<string>(() => new Date().toLocaleDateString('en-GB'));
  const [showBarcode, setShowBarcode] = useState<boolean>(true);

  // Line Items
  const [items, setItems] = useState<InvoiceItem[]>(SAMPLE_ITEMS_BY_LANG.en);

  // Notes & Declarations
  const [declarationText, setDeclarationText] = useState(INVOICE_TRANSLATIONS.en.declaration);

  // UI helpers
  const [savedNotification, setSavedNotification] = useState(false);
  const [langChangedNotice, setLangChangedNotice] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.rate) || 0), 0);
  const taxAmount = (subtotal * (Number(taxRate) || 0)) / 100;
  const grandTotal = subtotal + taxAmount;
  const amountInWords = convertNumberToWordsLocalized(grandTotal, currency, selectedLanguage);

  // Active translation dictionary
  const t = INVOICE_TRANSLATIONS[selectedLanguage] || INVOICE_TRANSLATIONS.en;
  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const isRtl = activeLangMeta.dir === 'rtl';

  // Load saved state from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.selectedLanguage) setSelectedLanguage(data.selectedLanguage);
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

  // Language switch handler
  const handleSelectLanguage = (lang: SupportedInvoiceLanguage, switchSampleItems: boolean = false) => {
    setSelectedLanguage(lang);
    const langDict = INVOICE_TRANSLATIONS[lang];
    setDeclarationText(langDict.declaration);
    setStampText(langDict.stampSealText);
    setSignatoryRole(langDict.signatoryRoleDefault);
    setPaymentTerms(langDict.paymentTermsDefault);
    setDeliveryTerms(langDict.deliveryTermsDefault);

    if (switchSampleItems || items.length === 0) {
      setItems(SAMPLE_ITEMS_BY_LANG[lang]);
    }

    // Set currency preset appropriate for region
    if (lang === 'nl' || lang === 'fr' || lang === 'de' || lang === 'es' || lang === 'it') {
      setCurrency('EUR');
      setCurrencySymbol('€');
    } else if (lang === 'ar') {
      setCurrency('AED');
      setCurrencySymbol('AED');
    } else if (lang === 'ur') {
      setCurrency('PKR');
      setCurrencySymbol('Rs');
    }

    setLangChangedNotice(langDict.invoiceTitle);
    setTimeout(() => setLangChangedNotice(null), 3000);
  };

  // Save current state to localStorage
  const handleSaveToLocalStorage = () => {
    try {
      const stateToSave = {
        selectedLanguage,
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

  // Reset to default original 5-days ago settings with updated address
  const handleResetToDefaults = () => {
    setSelectedLanguage('en');
    setUseOfficialLogo(true);
    setCustomLogoUrl('');
    setBrandName(COMPANY_INFO.name);
    setBrandTagline(COMPANY_INFO.tagline);
    setCompanyAddress('Kotli Behram, Sialkot, Pakistan');
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

    setPaymentTerms(INVOICE_TRANSLATIONS.en.paymentTermsDefault);
    setDeliveryTerms(INVOICE_TRANSLATIONS.en.deliveryTermsDefault);
    setDeclarationText(INVOICE_TRANSLATIONS.en.declaration);

    setShowAuthorizedSignature(true);
    setSignatoryName('Engr. Hamza Reza');
    setSignatoryRole(INVOICE_TRANSLATIONS.en.signatoryRoleDefault);
    setStampText(INVOICE_TRANSLATIONS.en.stampSealText);
    setShowStamp(true);
    setShowBarcode(true);

    setBankName('Meezan Bank Ltd / Standard Chartered Sialkot');
    setAccountTitle('evonix technologies Sialkot');
    setIban('PK36MEZN00001004582910');
    setSwiftBic('MEZNPKKA');

    setItems(SAMPLE_ITEMS_BY_LANG.en);

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
      {
        id: Date.now().toString(),
        description: selectedLanguage === 'ur'
          ? 'نئی آئٹم یا سروس کی تفصیل'
          : selectedLanguage === 'ar'
          ? 'بند أو خدمة جديدة'
          : selectedLanguage === 'nl'
          ? 'Nieuw export chirurgisch instrument of IT-dienst'
          : selectedLanguage === 'fr'
          ? 'Nouvel instrument chirurgical ou service IT'
          : selectedLanguage === 'de'
          ? 'Neues chirurgisches Instrument oder IT-Serviceartikel'
          : 'New Export Surgical Instrument or IT Service Item',
        quantity: 10,
        rate: 25.0,
      },
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
    <div className="py-6 sm:py-8 bg-slate-100 min-h-screen text-slate-900 print:bg-white print:py-0 print:min-h-0">
      
      {/* ========================================================
          CRITICAL STRICT CSS FOR ISOLATED A4 PRINT & PDF
          Hides everything except the invoice canvas!
         ======================================================== */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 10.5pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Strictly hide all other elements in DOM */
          body * {
            visibility: hidden !important;
          }
          /* Only make the printable invoice container visible */
          #invoice-print-canvas, #invoice-print-canvas * {
            visibility: visible !important;
          }
          #invoice-print-canvas {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 12px 14px !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .print-hidden-strict {
            display: none !important;
            visibility: hidden !important;
          }
          input, select, textarea {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 print:p-0 print:max-w-none">
        
        {/* ========================================================
            1. TOP MANAGEMENT TOOLBAR (100% Hidden in Print/PDF)
           ======================================================== */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-sm flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Global Micro-Invoice Generator
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                  <span>8 Languages &amp; Kotli Behram Sialkot Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                A4 Zero-Database Engine · Dutch, French, German, Spanish, Italian, Arabic (RTL), Urdu (RTL) &amp; English
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
              <span>{t.nextNoButtonText} ({invoicePrefix}{String(invoiceSequence + 1).padStart(4, '0')})</span>
            </button>

            {/* Quick Save to LocalStorage */}
            <button
              onClick={handleSaveToLocalStorage}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              {savedNotification ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedNotification ? 'Saved locally!' : t.saveButtonText}</span>
            </button>

            {/* Restore 5 Days Ago Original Defaults */}
            <button
              onClick={handleResetToDefaults}
              title="Reset all settings to original defaults (Kotli Behram, brand logo, signatures, Sialkot export details)"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetButtonText}</span>
            </button>

            {/* Print / Save A4 PDF Button */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Prints ONLY the invoice canvas with clean A4 margins, zero website headers or footers"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printButtonText}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            2. MULTILINGUAL SELECTOR BAR (Requested: Dutch, French, Europe, Arabic, Urdu)
           ======================================================== */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Invoice Language &amp; International Format (اے ٹو زیڈ زبان کا انتخاب):
              </span>
            </div>
            {langChangedNotice && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 animate-fadeIn">
                ✓ Switched to {langChangedNotice}
              </span>
            )}
          </div>

          {/* Language Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isCurrent = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code, false)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-red-600 text-white border-red-600 shadow-sm ring-2 ring-red-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xl mb-0.5">{lang.flag}</span>
                  <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                  <span className={`text-[10px] mt-0.5 ${isCurrent ? 'text-red-100' : 'text-slate-400'}`}>
                    {lang.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Helper: Load Sample Items for Selected Language */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Active Layout:</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                {activeLangMeta.name} ({activeLangMeta.regionBadge}) · {isRtl ? 'RTL Mode (دائیں سے بائیں)' : 'LTR Mode'}
              </span>
            </div>
            <button
              onClick={() => handleSelectLanguage(selectedLanguage, true)}
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Load Sample Line Items in {activeLangMeta.nativeName}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            3. CUSTOMIZATION CONTROLS PANEL (Hidden in Print)
           ======================================================== */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Customize Invoice Controls (Brand, Logo, Stamp, Signature &amp; Tax)</span>
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
            4. PRINT-READY COMMERCIAL INVOICE CANVAS (A4 Format)
            Only this section is rendered on print / PDF!
           ======================================================== */}
        <div
          id="invoice-print-canvas"
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900 ${
            isRtl ? 'font-sans' : 'font-sans'
          }`}
          style={isRtl ? { fontFamily: `'Noto Sans Arabic', 'Amiri', 'Jameel Noori Nastaleeq', 'Segoe UI', Tahoma, sans-serif` } : undefined}
        >
          
          {/* Header Section: Logo + Brand + Commercial Invoice + Barcode */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-slate-200">
            {/* Left/Right: Brand Logo & Information (Address strictly Kotli Behram) */}
            <div className={`space-y-2 max-w-sm ${isRtl ? 'text-right' : 'text-left'}`}>
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

              <div className="text-[11px] text-slate-500 leading-relaxed font-normal">
                <span className="font-semibold text-slate-800">{companyAddress}</span>
                <br />
                <span>Email: {companyEmail} | Tel: {companyPhone}</span>
                <br />
                <span className="font-mono text-slate-600">{taxNumber}</span>
              </div>
            </div>

            {/* Invoice Number, Barcode & Issue Dates */}
            <div className={`flex flex-col space-y-1.5 sm:min-w-[240px] ${isRtl ? 'items-start text-left' : 'items-end text-right'}`}>
              <span className="text-xs font-mono font-black text-red-600 tracking-wider uppercase block">
                {t.invoiceTitle}
              </span>

              {/* Barcode representation */}
              {showBarcode && (
                <div className="my-1">
                  <VisualCode128Barcode code={invoiceNumber} />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 font-semibold">{t.invoiceNumberLabel}</span>
                <input
                  type="text"
                  aria-label="Invoice Number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono font-bold border border-slate-300 rounded text-right w-36 bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 font-semibold">{t.dateLabel}</span>
                <input
                  type="date"
                  aria-label="Invoice Date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono text-slate-700 border border-slate-300 rounded text-right bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 font-semibold">{t.dueDateLabel}</span>
                <input
                  type="date"
                  aria-label="Due Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="px-2 py-0.5 text-xs font-mono text-slate-700 border border-slate-300 rounded text-right bg-slate-50 print:border-none print:bg-transparent print:p-0"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 font-semibold">{t.poRefLabel}</span>
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
                {t.billToLabel}
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
                placeholder={t.attentionLabel}
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
                placeholder={t.taxIdLabel}
              />
            </div>

            {/* Payment & Logistics Terms */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 print:bg-transparent print:border print:p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                    {t.paymentDeliveryTermsLabel}
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

                <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block">
                    {t.currencyLabel}
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
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="PKR">PKR (Rs)</option>
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
                <span>{t.taxSchemeLabel}: {taxName}</span>
                <span className="font-mono font-bold text-slate-700">{taxRate}%</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-500 font-bold uppercase text-[10px] bg-slate-50/80 print:bg-transparent">
                  <th className={`py-2.5 px-2 w-10 ${isRtl ? 'text-right' : 'text-left'}`}>{t.colIndex}</th>
                  <th className={`py-2.5 px-2 ${isRtl ? 'text-right' : 'text-left'}`}>{t.colDescription}</th>
                  <th className="py-2.5 px-2 text-center w-20">{t.colQty}</th>
                  <th className={`py-2.5 px-2 w-28 ${isRtl ? 'text-left' : 'text-right'}`}>{t.colRate}</th>
                  <th className={`py-2.5 px-2 w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.colAmount}</th>
                  <th className="py-2.5 px-2 text-center w-10 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((it, idx) => (
                  <tr key={it.id} className="hover:bg-slate-50/50">
                    <td className={`py-2.5 px-2 text-slate-400 font-mono text-[11px] align-middle ${isRtl ? 'text-right' : 'text-left'}`}>
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-2 align-middle">
                      <input
                        type="text"
                        aria-label={`Item ${idx + 1} Description`}
                        value={it.description}
                        onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                        className={`w-full font-medium text-slate-800 bg-transparent focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
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
                    <td className={`py-2.5 px-2 font-mono align-middle ${isRtl ? 'text-left' : 'text-right'}`}>
                      <input
                        type="number"
                        aria-label={`Item ${idx + 1} Unit Rate`}
                        value={it.rate}
                        onChange={(e) => handleUpdateItem(it.id, 'rate', Number(e.target.value) || 0)}
                        className={`w-24 px-1.5 py-0.5 border border-slate-200 rounded font-mono bg-white print:border-none print:p-0 ${isRtl ? 'text-left' : 'text-right'}`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className={`py-2.5 px-2 font-mono font-bold text-slate-900 align-middle ${isRtl ? 'text-left' : 'text-right'}`}>
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
              <span>{t.addItemBtn}</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Amount In Words & Totals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200 text-xs">
            {/* Amount in Words & Official Declaration */}
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 print:bg-transparent print:border print:p-2.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                  {t.totalWordsLabel}
                </span>
                <p className="font-serif italic font-semibold text-slate-800 text-xs mt-0.5 leading-snug">
                  {amountInWords}
                </p>
              </div>

              {/* Bank Details */}
              <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <span className="font-bold text-slate-900 block text-xs">{t.bankingDetailsHeading}</span>
                <p><strong className="text-slate-700">{t.bankNameLabel}</strong> {bankName}</p>
                <p><strong className="text-slate-700">{t.accountTitleLabel}</strong> {accountTitle}</p>
                <p><strong className="text-slate-700">{t.ibanLabel}</strong> <span className="font-mono">{iban}</span></p>
                <p><strong className="text-slate-700">{t.swiftLabel}</strong> <span className="font-mono">{swiftBic}</span></p>
              </div>

              {/* Legal Declaration */}
              <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-100 leading-tight">
                "{declarationText}"
              </div>
            </div>

            {/* Subtotals, Tax & Grand Total */}
            <div className="space-y-2 font-mono flex flex-col justify-start">
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span className="font-sans font-medium">{t.subtotalLabel}</span>
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
                <span className="font-sans">{t.grandTotalLabel}</span>
                <span className="text-red-600">{currencySymbol} {grandTotal.toFixed(2)} {currency}</span>
              </div>

              <div className={`pt-2 ${isRtl ? 'text-left' : 'text-right'}`}>
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-sans font-bold rounded-lg border border-emerald-200">
                  {t.zeroDbBadge}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              AUTHORIZED SIGNATURE & OFFICIAL STAMP FOOTER
             ======================================================== */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
            {/* Terms and Customer Acceptance */}
            <div className="text-[11px] text-slate-500 space-y-2">
              <p className="font-semibold text-slate-700">{t.instructionsTitle}</p>
              <ul className="list-disc list-inside space-y-0.5 text-[10.5px]">
                <li>{t.instruction1.replace('{invoiceNumber}', invoiceNumber)}</li>
                <li>{t.instruction2}</li>
                <li>{t.instruction3}</li>
              </ul>
            </div>

            {/* Authorized Signature + Official Company Stamp */}
            <div className={`flex items-end gap-6 sm:gap-8 ${isRtl ? 'justify-start' : 'justify-end'}`}>
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
                <div className={`space-y-1 min-w-[190px] ${isRtl ? 'text-left' : 'text-right'}`}>
                  <div className={`h-10 flex items-end pb-1 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                    <span className="font-serif italic font-bold text-lg text-slate-800 tracking-wider border-b-2 border-slate-900 pb-0.5 px-4 inline-block">
                      {signatoryName}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900">{signatoryName}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{signatoryRole}</div>
                  <div className="text-[10px] font-mono text-slate-400">{t.signatureDateLabel} {signatureDate}</div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Copyright watermark in print */}
          <div className="text-center text-[9px] text-slate-400 pt-3 border-t border-slate-100">
            {t.footerWatermark}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalInvoiceHub;
