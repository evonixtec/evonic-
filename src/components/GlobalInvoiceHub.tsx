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
  CheckCheck,
  Landmark,
  FileCheck,
  HelpCircle,
  Search,
  X,
  CreditCard,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  Shield,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { EvonixLogo } from './EvonixLogo';
import {
  SupportedInvoiceLanguage,
  SUPPORTED_LANGUAGES,
  INVOICE_TRANSLATIONS,
  SAMPLE_ITEMS_BY_LANG,
  INVOICE_TITLE_PRESETS_BY_LANG,
  DEFAULT_TERMS_BY_LANG,
  convertNumberToWordsLocalized
} from '../data/invoiceTranslations';
import { MAJOR_50_COUNTRIES, CountryTaxPreset } from '../data/countryPresets';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const STORAGE_KEY = 'evonix_invoice_state_v5';

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
      <div className="flex items-stretch h-8 bg-white px-2 py-0.5 border border-slate-200 rounded">
        {bars.map((bar, idx) => (
          <span
            key={idx}
            style={{ width: `${bar.width * 1.4}px` }}
            className={`h-full ${bar.isBlack ? 'bg-slate-900' : 'bg-transparent'}`}
          />
        ))}
      </div>
      <span className="text-[9px] font-mono tracking-widest text-slate-500 mt-0.5">{code}</span>
    </div>
  );
};

export const GlobalInvoiceHub: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Selected Language (Default 'en', supports 'nl', 'fr', 'de', 'es', 'it', 'ar', 'ur')
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedInvoiceLanguage>('en');

  // Invoice Title & Type (Fully Editable & with Quick Presets)
  const [invoiceTitle, setInvoiceTitle] = useState<string>('COMMERCIAL INVOICE');
  const [invoiceTypePreset, setInvoiceTypePreset] = useState<'commercial' | 'tax' | 'proforma' | 'vat' | 'gst' | 'custom'>('commercial');

  // Selected Country from 50+ Countries list
  const [selectedCountryId, setSelectedCountryId] = useState<string>('global-free');
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');
  const [countryRegionFilter, setCountryRegionFilter] = useState<string>('All');

  // Invoice Number & Sequencing (HERO ELEMENT - 100% Editable)
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

  // Settings State: Logo & Company Brand (Kotli Behram, Sialkot)
  const [useOfficialLogo, setUseOfficialLogo] = useState<boolean>(true);
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [brandName, setBrandName] = useState<string>(COMPANY_INFO.name);
  const [brandTagline, setBrandTagline] = useState<string>('Precision IT Consultancy & Hardware Engineering Excellence');
  const [companyAddress, setCompanyAddress] = useState<string>('Kotli Behram, Sialkot, Pakistan');
  const [companyEmail, setCompanyEmail] = useState<string>(COMPANY_INFO.contact.email);
  const [companyPhone, setCompanyPhone] = useState<string>(COMPANY_INFO.contact.phoneDisplay);
  const [taxNumber, setTaxNumber] = useState<string>('NTN: 8492019-2 | STRN: 3277876123456');

  // Client Details (Billed To)
  const [buyerName, setBuyerName] = useState('Apex International Surgical LLC');
  const [buyerContact, setBuyerContact] = useState('Dr. Marcus Weber (Procurement Director)');
  const [buyerAddress, setBuyerAddress] = useState('142 Business Bay, London, UK / Frankfurt, Germany');
  const [buyerTaxId, setBuyerTaxId] = useState('VAT ID: DE318920194 / GB829104829');

  // Country Tax & VAT Engine (Fully Editable)
  const [taxName, setTaxName] = useState<string>('Export 0% Duty Free');
  const [taxRate, setTaxRate] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');

  // Payment & Banking Terms
  const [paymentTerms, setPaymentTerms] = useState(INVOICE_TRANSLATIONS.en.paymentTermsDefault);
  const [deliveryTerms, setDeliveryTerms] = useState(INVOICE_TRANSLATIONS.en.deliveryTermsDefault);

  // Editable Banking Details & Toggle
  const [showBankDetails, setShowBankDetails] = useState<boolean>(true);
  const [bankName, setBankName] = useState('Meezan Bank Ltd / Standard Chartered Sialkot');
  const [accountTitle, setAccountTitle] = useState('evonix technologies Sialkot');
  const [iban, setIban] = useState('PK36MEZN00001004582910');
  const [swiftBic, setSwiftBic] = useState('MEZNPKKA');

  // Payment Terms & Conditions (Interactive Add / Delete / Edit List)
  const [termsAndConditions, setTermsAndConditions] = useState<string[]>(DEFAULT_TERMS_BY_LANG.en);

  // Optional "Help You Quotation" / Reference Box
  const [showQuotationBox, setShowQuotationBox] = useState<boolean>(false);
  const [quotationNumber, setQuotationNumber] = useState<string>('QT-2026-0891');
  const [quotationDate, setQuotationDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [quotationValidity, setQuotationValidity] = useState<string>('Valid for 30 Days from Issue Date');
  const [quotationNotes, setQuotationNotes] = useState<string>('As per approved technical proposal & surgical export catalog specifications.');

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

  // Active Controls Tab
  const [activeControlsTab, setActiveControlsTab] = useState<'invoice-meta' | 'company' | 'banking' | 'terms-quotation' | 'stamp-signature'>('invoice-meta');

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
        if (data.invoiceTitle) setInvoiceTitle(data.invoiceTitle);
        if (data.invoiceTypePreset) setInvoiceTypePreset(data.invoiceTypePreset);
        if (data.selectedCountryId) setSelectedCountryId(data.selectedCountryId);
        if (data.invoiceNumber) setInvoiceNumber(data.invoiceNumber);
        if (data.invoicePrefix) setInvoicePrefix(data.invoicePrefix);
        if (data.invoiceSequence) setInvoiceSequence(data.invoiceSequence);
        if (data.invoiceDate) setInvoiceDate(data.invoiceDate);
        if (data.dueDate) setDueDate(data.dueDate);
        if (data.poNumber) setPoNumber(data.poNumber);
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
        if (typeof data.showBankDetails === 'boolean') setShowBankDetails(data.showBankDetails);
        if (data.bankName) setBankName(data.bankName);
        if (data.accountTitle) setAccountTitle(data.accountTitle);
        if (data.iban) setIban(data.iban);
        if (data.swiftBic) setSwiftBic(data.swiftBic);
        if (Array.isArray(data.termsAndConditions)) setTermsAndConditions(data.termsAndConditions);
        if (typeof data.showQuotationBox === 'boolean') setShowQuotationBox(data.showQuotationBox);
        if (data.quotationNumber) setQuotationNumber(data.quotationNumber);
        if (data.quotationDate) setQuotationDate(data.quotationDate);
        if (data.quotationValidity) setQuotationValidity(data.quotationValidity);
        if (data.quotationNotes) setQuotationNotes(data.quotationNotes);
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

    // Update title preset in new language if not customized
    if (invoiceTypePreset !== 'custom') {
      const titlePresets = INVOICE_TITLE_PRESETS_BY_LANG[lang];
      if (titlePresets && titlePresets[invoiceTypePreset as keyof typeof titlePresets]) {
        setInvoiceTitle(titlePresets[invoiceTypePreset as keyof typeof titlePresets]);
      } else {
        setInvoiceTitle(langDict.invoiceTitle);
      }
    }

    // Update terms and conditions
    setTermsAndConditions(DEFAULT_TERMS_BY_LANG[lang] || DEFAULT_TERMS_BY_LANG.en);

    if (switchSampleItems || items.length === 0) {
      setItems(SAMPLE_ITEMS_BY_LANG[lang]);
    }

    // Currency regional defaults
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

  // Quick Invoice Type Preset Switcher
  const handleSetInvoiceType = (typeKey: 'commercial' | 'tax' | 'proforma' | 'vat' | 'gst') => {
    setInvoiceTypePreset(typeKey);
    const titlePresets = INVOICE_TITLE_PRESETS_BY_LANG[selectedLanguage] || INVOICE_TITLE_PRESETS_BY_LANG.en;
    const titleVal = titlePresets[typeKey];
    if (titleVal) {
      setInvoiceTitle(titleVal);
    }
  };

  // Country Selection from 50+ Countries Preset
  const handleSelectCountryPreset = (countryPreset: CountryTaxPreset) => {
    setSelectedCountryId(countryPreset.id);
    setTaxName(countryPreset.taxName);
    setTaxRate(countryPreset.defaultRate);
    setCurrency(countryPreset.currency);
    setCurrencySymbol(countryPreset.symbol);

    // Adjust title if standard
    if (countryPreset.defaultInvoiceType === 'VAT Invoice') {
      handleSetInvoiceType('vat');
    } else if (countryPreset.defaultInvoiceType === 'GST Invoice') {
      handleSetInvoiceType('gst');
    } else if (countryPreset.defaultInvoiceType === 'Tax Invoice') {
      handleSetInvoiceType('tax');
    }

    setShowCountryModal(false);
  };

  // Terms and conditions management
  const handleAddTerm = () => {
    setTermsAndConditions([...termsAndConditions, 'New delivery, inspection or payment condition']);
  };

  const handleUpdateTerm = (index: number, value: string) => {
    const updated = [...termsAndConditions];
    updated[index] = value;
    setTermsAndConditions(updated);
  };

  const handleDeleteTerm = (index: number) => {
    if (termsAndConditions.length > 1) {
      setTermsAndConditions(termsAndConditions.filter((_, i) => i !== index));
    }
  };

  const handleResetTerms = () => {
    setTermsAndConditions(DEFAULT_TERMS_BY_LANG[selectedLanguage] || DEFAULT_TERMS_BY_LANG.en);
  };

  // Save current state to localStorage
  const handleSaveToLocalStorage = () => {
    try {
      const stateToSave = {
        selectedLanguage,
        invoiceTitle,
        invoiceTypePreset,
        selectedCountryId,
        invoiceNumber,
        invoicePrefix,
        invoiceSequence,
        invoiceDate,
        dueDate,
        poNumber,
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
        showBankDetails,
        bankName,
        accountTitle,
        iban,
        swiftBic,
        paymentTerms,
        deliveryTerms,
        declarationText,
        termsAndConditions,
        showQuotationBox,
        quotationNumber,
        quotationDate,
        quotationValidity,
        quotationNotes,
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
    setInvoiceTitle('COMMERCIAL INVOICE');
    setInvoiceTypePreset('commercial');
    setSelectedCountryId('global-free');

    setUseOfficialLogo(true);
    setCustomLogoUrl('');
    setBrandName(COMPANY_INFO.name);
    setBrandTagline('Precision IT Consultancy & Hardware Engineering Excellence');
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

    setTaxName('Export 0% Duty Free');
    setTaxRate(0);
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

    setShowBankDetails(true);
    setBankName('Meezan Bank Ltd / Standard Chartered Sialkot');
    setAccountTitle('evonix technologies Sialkot');
    setIban('PK36MEZN00001004582910');
    setSwiftBic('MEZNPKKA');

    setTermsAndConditions(DEFAULT_TERMS_BY_LANG.en);
    setShowQuotationBox(false);

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

  // Filtered countries for the modal
  const filteredCountries = MAJOR_50_COUNTRIES.filter((c) => {
    const matchesSearch =
      c.country.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      c.taxName.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      c.currency.toLowerCase().includes(countrySearchQuery.toLowerCase());
    const matchesRegion = countryRegionFilter === 'All' || c.region === countryRegionFilter;
    return matchesSearch && matchesRegion;
  });

  const selectedCountryObj = MAJOR_50_COUNTRIES.find((c) => c.id === selectedCountryId) || MAJOR_50_COUNTRIES[0];

  return (
    <div className="py-6 sm:py-8 bg-slate-100 min-h-screen text-slate-900 print:bg-white print:py-0 print:min-h-0">
      
      {/* ========================================================
          CRITICAL STRICT CSS FOR ISOLATED A4 PRINT & PDF
          Guarantees zero website headers, footers or chrome on print!
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
            font-size: 10pt !important;
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
            padding: 10px 14px !important;
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-black shadow-sm flex-shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Global Professional Invoice Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                  <span>Executive A4 Format</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                100% Editable Invoice Number, Title, Tax, Address &amp; Wire Details · 50+ Country Engines
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-Increment Invoice Number Button */}
            <button
              onClick={handleIncrementInvoiceNumber}
              title="Generate Next Sequential Invoice Number"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors shadow-2xs"
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

            {/* Restore Original Defaults */}
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
            2. MULTILINGUAL SELECTOR BAR (8 Languages)
           ======================================================== */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
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
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
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
        </div>

        {/* ========================================================
            3. DEDICATED CONTROL SUITE (Invoice No, Title, 50+ Countries & Details)
           ======================================================== */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:hidden">
          
          {/* Controls Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveControlsTab('invoice-meta')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeControlsTab === 'invoice-meta'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Invoice No. &amp; 50+ Countries</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveControlsTab('company')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeControlsTab === 'company'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Company Info &amp; Address</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveControlsTab('banking')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeControlsTab === 'banking'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Banking Details</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveControlsTab('terms-quotation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeControlsTab === 'terms-quotation'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Terms &amp; Quotation</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveControlsTab('stamp-signature')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeControlsTab === 'stamp-signature'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>Stamp &amp; Signature</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showQuotationBox}
                  onChange={(e) => setShowQuotationBox(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span className="font-semibold">Quotation Box</span>
              </label>

              <span className="text-slate-300">|</span>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showBankDetails}
                  onChange={(e) => setShowBankDetails(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className="font-semibold">Bank Details</span>
              </label>
            </div>
          </div>

          {/* TAB 1: INVOICE NUMBER, TITLE & 50+ COUNTRIES */}
          {activeControlsTab === 'invoice-meta' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Invoice Number Hero Inputs */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-red-600" />
                    <span>Invoice Number &amp; Identification (انوائس نمبر ایڈیٹ کریں):</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Type your full custom number or adjust prefix &amp; sequence
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Full Invoice Number (براہ راست انوائس نمبر لکھیں):
                    </label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      placeholder="e.g. INV-2026-0042"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Prefix:</label>
                    <input
                      type="text"
                      value={invoicePrefix}
                      onChange={(e) => {
                        setInvoicePrefix(e.target.value);
                        setInvoiceNumber(`${e.target.value}${String(invoiceSequence).padStart(4, '0')}`);
                      }}
                      className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Seq No:</label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        value={invoiceSequence}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setInvoiceSequence(val);
                          setInvoiceNumber(`${invoicePrefix}${String(val).padStart(4, '0')}`);
                        }}
                        className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-900"
                        min="1"
                      />
                      <button
                        type="button"
                        onClick={handleIncrementInvoiceNumber}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs cursor-pointer flex-shrink-0"
                        title="Increment"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title Presets & 50+ Countries */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Quick Title Presets (ٹائٹل کی فوری اقسام):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetInvoiceType('commercial')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        invoiceTypePreset === 'commercial' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      Commercial
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetInvoiceType('tax')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        invoiceTypePreset === 'tax' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      Tax Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetInvoiceType('proforma')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        invoiceTypePreset === 'proforma' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      Proforma
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetInvoiceType('vat')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        invoiceTypePreset === 'vat' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      VAT Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetInvoiceType('gst')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        invoiceTypePreset === 'gst' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      GST Invoice
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Country Tax System:</label>
                    <button
                      type="button"
                      onClick={() => setShowCountryModal(true)}
                      className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-lg">{selectedCountryObj.flag}</span>
                        <span className="truncate">{selectedCountryObj.country}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-mono">
                        Browse 50+
                      </span>
                    </button>
                  </div>

                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Tax Label:</label>
                    <input
                      type="text"
                      value={taxName}
                      onChange={(e) => setTaxName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Tax Rate %:</label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY INFO & ADDRESS */}
          {activeControlsTab === 'company' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Company / Brand Name:</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 block flex items-center justify-between">
                    <span>Company Registered Address (ایڈریس تبدیل کریں):</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Kotli Behram, Sialkot</span>
                  </label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Official Email Address:</label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Official Phone / WhatsApp:</label>
                  <input
                    type="text"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Tax ID / NTN / STRN Registration:</label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Logo Switcher */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs border-t border-slate-100">
                <span className="font-bold text-slate-700">Logo Source:</span>
                <button
                  type="button"
                  onClick={() => setUseOfficialLogo(true)}
                  className={`px-3 py-1 rounded-lg font-bold border cursor-pointer ${
                    useOfficialLogo ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  evonix Official Logo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseOfficialLogo(false);
                    fileInputRef.current?.click();
                  }}
                  className={`px-3 py-1 rounded-lg font-bold border cursor-pointer flex items-center gap-1.5 ${
                    !useOfficialLogo ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Custom Logo (PNG/JPG)</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* TAB 3: BANKING DETAILS */}
          {activeControlsTab === 'banking' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-700">
                  Bank Wire Transfer Credentials (بینک کی تفصیلات تبدیل کریں):
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={showBankDetails}
                    onChange={(e) => setShowBankDetails(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                  />
                  <span className="font-bold text-slate-800">Display Bank Details on Invoice</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Bank Name:</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Account Title:</label>
                  <input
                    type="text"
                    value={accountTitle}
                    onChange={(e) => setAccountTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">IBAN Number:</label>
                  <input
                    type="text"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">SWIFT / BIC Code:</label>
                  <input
                    type="text"
                    value={swiftBic}
                    onChange={(e) => setSwiftBic(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS & QUOTATION */}
          {activeControlsTab === 'terms-quotation' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Quotation Box Configuration */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-blue-900">
                      Help You Quotation Box (اختیاری کوٹیشن باکس):
                    </span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={showQuotationBox}
                      onChange={(e) => setShowQuotationBox(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span className="font-bold text-blue-900">
                      {showQuotationBox ? 'Quotation Box Active' : 'Enable Quotation Box'}
                    </span>
                  </label>
                </div>

                {showQuotationBox && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block text-[11px]">Quotation Ref No:</label>
                      <input
                        type="text"
                        value={quotationNumber}
                        onChange={(e) => setQuotationNumber(e.target.value)}
                        placeholder="e.g. QT-2026-0891"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block text-[11px]">Validity Duration:</label>
                      <input
                        type="text"
                        value={quotationValidity}
                        onChange={(e) => setQuotationValidity(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block text-[11px]">Quotation Date:</label>
                      <input
                        type="date"
                        value={quotationDate}
                        onChange={(e) => setQuotationDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="font-semibold text-slate-700 block text-[11px]">Scope &amp; Technical Notes:</label>
                      <input
                        type="text"
                        value={quotationNotes}
                        onChange={(e) => setQuotationNotes(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Terms & Conditions Manager */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">
                    Payment Terms &amp; Conditions (شرائط و ضوابط ایڈٹ، ڈیلیٹ یا شامل کریں):
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddTerm}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Condition</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetTerms}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[11px] font-bold cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {termsAndConditions.map((term, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-xs w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={term}
                        onChange={(e) => handleUpdateTerm(idx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteTerm(idx)}
                        disabled={termsAndConditions.length <= 1}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer disabled:opacity-30"
                        title="Delete this condition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STAMP & SIGNATURE */}
          {activeControlsTab === 'stamp-signature' && (
            <div className="space-y-3 animate-fadeIn text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Signatory Name:</label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 block">Signatory Official Title / Role:</label>
                  <input
                    type="text"
                    value={signatoryRole}
                    onChange={(e) => setSignatoryRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="font-bold text-slate-700 block">Official Seal Stamp Text:</label>
                  <textarea
                    rows={2}
                    value={stampText}
                    onChange={(e) => setStampText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            MODAL: 50+ COUNTRIES BROWSER (Fast Filter & Select)
           ======================================================== */}
        {showCountryModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-scaleIn">
              
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Select Country &amp; Tax Preset (50+ Countries)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applies official VAT/GST scheme, currency, and default rates (France, Netherlands, USA, GCC...)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCountryModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                    placeholder="Search country (e.g. France, Netherlands, Germany, Saudi Arabia, USA)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {countrySearchQuery && (
                    <button
                      onClick={() => setCountrySearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['All', 'Europe', 'Americas', 'Middle East', 'Asia Pacific', 'Africa', 'Global'].map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setCountryRegionFilter(reg)}
                      className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-colors ${
                        countryRegionFilter === reg
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCountries.map((c) => {
                  const isSelected = selectedCountryId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCountryPreset(c)}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-0.5 truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{c.flag}</span>
                          <span className="font-bold text-xs text-slate-900 truncate">{c.country}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate pl-7">
                          {c.taxName}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800">
                          {c.defaultRate}%
                        </span>
                        <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                          {c.currency} ({c.symbol})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span>50+ Verified Global Tax Jurisdictions</span>
                <button
                  onClick={() => setShowCountryModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            5. EXECUTIVE COMMERCIAL INVOICE CANVAS (A4 Format)
            Designed with top-tier international banking & export hierarchy!
           ======================================================== */}
        <div
          id="invoice-print-canvas"
          dir={isRtl ? 'rtl' : 'ltr'}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none print:m-0 text-slate-900"
          style={isRtl ? { fontFamily: `'Noto Sans Arabic', 'Amiri', 'Jameel Noori Nastaleeq', 'Segoe UI', Tahoma, sans-serif` } : undefined}
        >
          
          {/* Top Luxury Accent Strip */}
          <div className="h-2 bg-gradient-to-r from-red-600 via-slate-900 to-red-600" />

          <div className="p-6 sm:p-10 space-y-6 print:p-0">
            
            {/* Header: Company Profile + Hero Invoice Title & Hero Editable Number */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-slate-200/80">
              
              {/* Left/Right: Company Branding & Direct Inline Editable Address */}
              <div className={`space-y-2.5 max-w-md flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
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
                        className="h-11 max-w-[150px] object-contain rounded"
                      />
                      <span className="text-xl font-black tracking-tight text-slate-900">{brandName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                        EX
                      </div>
                      <span className="text-xl font-black tracking-tight text-slate-900">{brandName}</span>
                    </div>
                  )}
                </div>

                {/* Subtitle / Tagline */}
                <p className="text-[11px] text-slate-500 font-medium">
                  {brandTagline}
                </p>

                {/* Company Metadata Row (Kotli Behram, Sialkot, Pakistan) */}
                <div className="text-[11.5px] text-slate-600 space-y-1 pt-1 font-sans">
                  
                  {/* DIRECTLY EDITABLE COMPANY ADDRESS */}
                  <div className="flex items-center gap-1.5 group">
                    <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    <input
                      type="text"
                      aria-label="Registered Company Address"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full font-bold text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1 -mx-1 print:p-0 print:border-none"
                      placeholder="Company Address (Kotli Behram, Sialkot, Pakistan)"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <input
                        type="text"
                        aria-label="Company Email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="font-medium text-slate-700 bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none rounded px-1 -mx-1 print:p-0 print:border-none"
                      />
                    </div>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <input
                        type="text"
                        aria-label="Company Phone"
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        className="font-medium text-slate-700 bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none rounded px-1 -mx-1 print:p-0 print:border-none"
                      />
                    </div>
                  </div>

                  {/* Tax Registration */}
                  <div className="flex items-center gap-1.5 text-[10.5px]">
                    <Shield className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <input
                      type="text"
                      aria-label="Company Tax / NTN Registration"
                      value={taxNumber}
                      onChange={(e) => setTaxNumber(e.target.value)}
                      className="font-mono text-slate-600 bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none rounded px-1 -mx-1 print:p-0 print:border-none w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right/Left: Hero Invoice Title, Prominent Invoice Number & Meta Badges */}
              <div className={`flex flex-col space-y-2.5 md:min-w-[300px] ${isRtl ? 'items-start text-left' : 'items-end text-right'}`}>
                
                {/* 1. Directly Editable Title */}
                <div className="w-full">
                  <input
                    type="text"
                    aria-label="Invoice Header Title"
                    value={invoiceTitle}
                    onChange={(e) => {
                      setInvoiceTitle(e.target.value);
                      setInvoiceTypePreset('custom');
                    }}
                    className={`w-full text-xl sm:text-2xl font-mono font-black text-slate-900 tracking-wider uppercase bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1 -mx-1 print:p-0 print:border-none ${
                      isRtl ? 'text-left' : 'text-right'
                    }`}
                    placeholder="COMMERCIAL INVOICE"
                  />
                  <div className={`text-[10px] uppercase font-bold tracking-widest text-red-600 mt-0.5 ${isRtl ? 'text-left' : 'text-right'}`}>
                    Official Financial Instrument
                  </div>
                </div>

                {/* 2. PROMINENT HERO EDITABLE INVOICE NUMBER (As requested by user!) */}
                <div className={`p-2.5 bg-slate-50 border-2 border-slate-300/80 rounded-xl flex items-center justify-between gap-3 shadow-2xs w-full max-w-[280px] print:bg-transparent print:border print:p-1.5 ${
                  isRtl ? 'flex-row-reverse' : ''
                }`}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-red-600" />
                    <span>{t.invoiceNumberLabel}</span>
                  </span>

                  {/* HERO INVOICE NUMBER INPUT */}
                  <input
                    type="text"
                    aria-label="Invoice Identification Number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="font-mono font-black text-sm sm:text-base text-slate-900 bg-transparent text-right focus:outline-none focus:bg-white rounded px-1 flex-1 print:p-0"
                    placeholder="INV-2026-0042"
                  />
                </div>

                {/* 3. Barcode Representation */}
                {showBarcode && (
                  <div className="pt-0.5">
                    <VisualCode128Barcode code={invoiceNumber} />
                  </div>
                )}

                {/* 4. Dates & PO Reference Grid */}
                <div className="w-full max-w-[280px] space-y-1 text-xs font-mono pt-1">
                  <div className="flex items-center justify-between bg-slate-50/70 px-2 py-1 rounded-lg border border-slate-100 print:bg-transparent print:border-none print:p-0">
                    <span className="text-slate-500 font-sans font-semibold text-[11px]">{t.dateLabel}</span>
                    <input
                      type="date"
                      aria-label="Invoice Date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="font-mono font-bold text-slate-800 text-right bg-transparent focus:outline-none print:p-0"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-slate-50/70 px-2 py-1 rounded-lg border border-slate-100 print:bg-transparent print:border-none print:p-0">
                    <span className="text-slate-500 font-sans font-semibold text-[11px]">{t.dueDateLabel}</span>
                    <input
                      type="date"
                      aria-label="Payment Due Date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="font-mono font-bold text-slate-800 text-right bg-transparent focus:outline-none print:p-0"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-slate-50/70 px-2 py-1 rounded-lg border border-slate-100 print:bg-transparent print:border-none print:p-0">
                    <span className="text-slate-500 font-sans font-semibold text-[11px]">{t.poRefLabel}</span>
                    <input
                      type="text"
                      aria-label="Purchase Order Ref"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      className="font-mono font-bold text-slate-800 text-right bg-transparent focus:outline-none w-28 print:p-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Symmetrical Dual Executive Cards: Billed To (Buyer) & Commercial Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* CARD 1: BILLED TO / CONSIGNEE */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-2 print:bg-transparent print:border print:p-3">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.billToLabel}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Consignee</span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <input
                    type="text"
                    aria-label="Bill To Buyer Name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full font-bold text-sm text-slate-900 bg-transparent border-b border-slate-200/80 pb-0.5 focus:outline-none focus:border-blue-500 print:border-none"
                    placeholder="Customer / Company Name"
                  />
                  <input
                    type="text"
                    aria-label="Attention or Contact"
                    value={buyerContact}
                    onChange={(e) => setBuyerContact(e.target.value)}
                    className="w-full text-slate-600 text-xs bg-transparent focus:outline-none"
                    placeholder={t.attentionLabel}
                  />
                  <input
                    type="text"
                    aria-label="Buyer Address"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full text-slate-500 text-xs bg-transparent focus:outline-none"
                    placeholder="Buyer Registered Delivery Address"
                  />
                  <input
                    type="text"
                    aria-label="Buyer Tax ID"
                    value={buyerTaxId}
                    onChange={(e) => setBuyerTaxId(e.target.value)}
                    className="w-full font-mono text-[10.5px] text-slate-600 bg-transparent focus:outline-none"
                    placeholder={t.taxIdLabel}
                  />
                </div>
              </div>

              {/* CARD 2: COMMERCIAL LOGISTICS & TAX REGIME */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-2 print:bg-transparent print:border print:p-3">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.paymentDeliveryTermsLabel}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Terms</span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        aria-label="Payment Terms"
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="font-bold text-slate-900 bg-transparent border-b border-slate-200/80 pb-0.5 text-xs w-full focus:outline-none print:border-none"
                      />
                      <input
                        type="text"
                        aria-label="Incoterms & Delivery"
                        value={deliveryTerms}
                        onChange={(e) => setDeliveryTerms(e.target.value)}
                        className="text-xs text-slate-600 bg-transparent w-full focus:outline-none"
                      />
                    </div>

                    <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.currencyLabel}</span>
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
                            CHF: 'CHF',
                            JPY: '¥',
                            CNY: '¥',
                          };
                          setCurrencySymbol(map[cur] || cur);
                        }}
                        className="px-2 py-0.5 rounded border border-slate-300 text-xs font-bold bg-white print:border-none"
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
                        <option value="CHF">CHF</option>
                      </select>
                    </div>
                  </div>

                  {/* Tax scheme details: BOTH taxName and taxRate are editable inline */}
                  <div className="pt-2 text-[10.5px] text-slate-500 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-1">
                      <span className="font-semibold text-slate-600">{t.taxSchemeLabel}:</span>
                      <input
                        type="text"
                        value={taxName}
                        onChange={(e) => setTaxName(e.target.value)}
                        className="font-medium text-slate-800 bg-transparent hover:bg-slate-100 focus:bg-white rounded px-1 text-[11px] flex-1 max-w-[210px] print:p-0 print:border-none"
                      />
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                        className="w-12 text-right bg-transparent hover:bg-slate-100 focus:bg-white rounded px-0.5 print:p-0 print:border-none"
                        min="0"
                        step="0.1"
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Quotation / Project Proposal Reference Banner */}
            {showQuotationBox && (
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/90 text-xs space-y-2 print:border print:bg-transparent">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Approved Commercial Quotation Reference (منظور شدہ کوٹیشن):</span>
                  </span>
                  <span className="text-[10px] text-blue-700 font-mono font-semibold">
                    Valid: {quotationValidity}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Quotation Number:</span>
                    <input
                      type="text"
                      value={quotationNumber}
                      onChange={(e) => setQuotationNumber(e.target.value)}
                      className="font-mono font-bold text-blue-900 bg-transparent w-full focus:outline-none print:p-0"
                      placeholder="QT-2026-0891"
                    />
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Quotation Date:</span>
                    <input
                      type="date"
                      value={quotationDate}
                      onChange={(e) => setQuotationDate(e.target.value)}
                      className="font-mono text-slate-700 bg-transparent w-full focus:outline-none print:p-0"
                    />
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Validity / Commitment:</span>
                    <input
                      type="text"
                      value={quotationValidity}
                      onChange={(e) => setQuotationValidity(e.target.value)}
                      className="text-slate-700 bg-transparent w-full focus:outline-none print:p-0"
                    />
                  </div>

                  <div className="sm:col-span-3 pt-0.5">
                    <span className="text-slate-400 block text-[10px] font-semibold">Scope &amp; Proposal Terms:</span>
                    <input
                      type="text"
                      value={quotationNotes}
                      onChange={(e) => setQuotationNotes(e.target.value)}
                      className="text-slate-600 italic bg-transparent w-full focus:outline-none text-[11px] print:p-0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Line Items Table (Top Tier Styling) */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold uppercase text-[10px] tracking-wider print:bg-slate-100 print:text-slate-900">
                    <th className={`py-3 px-3 w-10 ${isRtl ? 'text-right' : 'text-left'}`}>{t.colIndex}</th>
                    <th className={`py-3 px-3 ${isRtl ? 'text-right' : 'text-left'}`}>{t.colDescription}</th>
                    <th className="py-3 px-3 text-center w-20">{t.colQty}</th>
                    <th className={`py-3 px-3 w-28 ${isRtl ? 'text-left' : 'text-right'}`}>{t.colRate}</th>
                    <th className={`py-3 px-3 w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.colAmount}</th>
                    <th className="py-3 px-2 text-center w-10 print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((it, idx) => (
                    <tr key={it.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className={`py-3 px-3 text-slate-400 font-mono text-xs align-middle ${isRtl ? 'text-right' : 'text-left'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-3 align-middle">
                        <input
                          type="text"
                          aria-label={`Item ${idx + 1} Description`}
                          value={it.description}
                          onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                          className={`w-full font-medium text-slate-900 bg-transparent focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                        />
                      </td>
                      <td className="py-3 px-3 text-center align-middle">
                        <input
                          type="number"
                          aria-label={`Item ${idx + 1} Quantity`}
                          value={it.quantity}
                          onChange={(e) => handleUpdateItem(it.id, 'quantity', Number(e.target.value) || 0)}
                          className="w-16 px-1.5 py-0.5 text-center border border-slate-200 rounded font-mono bg-white print:border-none print:p-0"
                          min="1"
                        />
                      </td>
                      <td className={`py-3 px-3 font-mono align-middle ${isRtl ? 'text-left' : 'text-right'}`}>
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
                      <td className={`py-3 px-3 font-mono font-bold text-slate-900 align-middle ${isRtl ? 'text-left' : 'text-right'}`}>
                        {currencySymbol} {((Number(it.quantity) || 0) * (Number(it.rate) || 0)).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-center print:hidden align-middle">
                        <button
                          onClick={() => handleRemoveItem(it.id)}
                          className="text-slate-300 hover:text-red-500 cursor-pointer p-1 transition-colors"
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
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Plus className="w-4 h-4 text-red-500" />
                <span>{t.addItemBtn}</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                {items.length} {items.length === 1 ? 'manifest position' : 'manifest positions'}
              </span>
            </div>

            {/* Financial Summary Grid (Dual Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200 text-xs">
              
              {/* Left Column: Amount in Words, Bank Details & Legal Declaration */}
              <div className="space-y-3">
                
                {/* Official Total Amount in Words */}
                <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 print:bg-transparent print:border print:p-2.5">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                    {t.totalWordsLabel}
                  </span>
                  <p className="font-serif italic font-bold text-slate-900 text-xs mt-1 leading-snug">
                    {amountInWords}
                  </p>
                </div>

                {/* Editable Banking Details on Canvas */}
                {showBankDetails && (
                  <div className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/80 print:bg-transparent print:border print:p-2.5">
                    <span className="font-bold text-slate-900 block text-xs flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-red-600" />
                      <span>{t.bankingDetailsHeading}</span>
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-700 w-24 flex-shrink-0">{t.bankNameLabel}</strong>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="flex-1 bg-transparent hover:bg-white focus:bg-white rounded px-1 font-semibold text-slate-900 print:p-0 print:border-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-700 w-24 flex-shrink-0">{t.accountTitleLabel}</strong>
                      <input
                        type="text"
                        value={accountTitle}
                        onChange={(e) => setAccountTitle(e.target.value)}
                        className="flex-1 bg-transparent hover:bg-white focus:bg-white rounded px-1 font-semibold text-slate-900 print:p-0 print:border-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-700 w-24 flex-shrink-0">{t.ibanLabel}</strong>
                      <input
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        className="flex-1 bg-transparent hover:bg-white focus:bg-white rounded px-1 font-mono font-bold text-slate-900 print:p-0 print:border-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-700 w-24 flex-shrink-0">{t.swiftLabel}</strong>
                      <input
                        type="text"
                        value={swiftBic}
                        onChange={(e) => setSwiftBic(e.target.value)}
                        className="flex-1 bg-transparent hover:bg-white focus:bg-white rounded px-1 font-mono font-bold text-slate-900 print:p-0 print:border-none"
                      />
                    </div>
                  </div>
                )}

                {/* Legal Commercial Declaration */}
                <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-100 leading-tight">
                  "{declarationText}"
                </div>
              </div>

              {/* Right Column: Executive Totals & Subtotals */}
              <div className="space-y-2.5 font-mono flex flex-col justify-start">
                <div className="flex justify-between text-slate-600 py-1.5 border-b border-slate-100">
                  <span className="font-sans font-medium text-xs">{t.subtotalLabel}</span>
                  <span className="font-bold text-slate-800">{currencySymbol} {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600 py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-sans text-xs">
                    <span>{taxName}:</span>
                    <span className="text-[10px] text-slate-400 font-mono">({taxRate}%)</span>
                  </div>
                  <span className="font-bold text-slate-800">{currencySymbol} {taxAmount.toFixed(2)}</span>
                </div>

                {/* HERO TOTALS DUE BOX */}
                <div className="p-3.5 bg-red-50/70 rounded-xl border border-red-200/80 flex items-center justify-between text-slate-900 print:border-2 print:border-slate-900">
                  <span className="font-sans font-bold text-xs sm:text-sm">{t.grandTotalLabel}</span>
                  <span className="text-lg sm:text-xl font-black text-red-600 font-mono">
                    {currencySymbol} {grandTotal.toFixed(2)} <span className="text-xs font-bold text-slate-700">{currency}</span>
                  </span>
                </div>

                <div className={`pt-1 ${isRtl ? 'text-left' : 'text-right'}`}>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-sans font-bold rounded-lg border border-emerald-200">
                    {t.zeroDbBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Terms & Conditions + Authorized Signatory / Stamp */}
            <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              
              {/* Terms and Acceptance with Add/Delete directly on canvas */}
              <div className="text-[11px] text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-xs">{t.instructionsTitle}</p>
                  <button
                    type="button"
                    onClick={handleAddTerm}
                    className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer print:hidden flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Condition</span>
                  </button>
                </div>

                <ul className="space-y-1.5 text-[10.5px]">
                  {termsAndConditions.map((cond, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 group">
                      <span className="text-slate-400 font-mono mt-0.5">{idx + 1}.</span>
                      <input
                        type="text"
                        value={cond.replace('{invoiceNumber}', invoiceNumber)}
                        onChange={(e) => handleUpdateTerm(idx, e.target.value)}
                        className="flex-1 bg-transparent hover:bg-slate-50 focus:bg-white rounded px-1 -mx-1 text-slate-700 focus:text-slate-900 focus:outline-none print:p-0 print:border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteTerm(idx)}
                        disabled={termsAndConditions.length <= 1}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 p-0.5 cursor-pointer print:hidden disabled:hidden"
                        title="Delete condition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authorized Signature & Official Export Seal Stamp */}
              <div className={`flex items-end gap-6 sm:gap-8 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                
                {/* Official Circular Red Ink Seal */}
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

                {/* Digital Authorized Signatory Block */}
                {showAuthorizedSignature && (
                  <div className={`space-y-1 min-w-[200px] ${isRtl ? 'text-left' : 'text-right'}`}>
                    <div className={`h-11 flex items-end pb-1 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                      <span className="font-serif italic font-bold text-lg text-slate-900 tracking-wider border-b-2 border-slate-900 pb-0.5 px-4 inline-block">
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

            {/* Bottom Official Document Watermark in Print */}
            <div className="text-center text-[9px] text-slate-400 pt-4 border-t border-slate-100">
              {t.footerWatermark}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalInvoiceHub;
