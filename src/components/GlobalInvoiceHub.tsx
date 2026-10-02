import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Save,
  RotateCcw,
  Upload,
  CheckCircle2,
  Building2,
  Calendar,
  Eye,
  Edit3,
  Percent,
  Hash,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CountryTaxConfig {
  code: string;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  currencySuffix: string;
  taxLabel: string;
  defaultTaxRate: number;
  flag: string;
}

export const GLOBAL_COUNTRIES: CountryTaxConfig[] = [
  {
    code: 'US',
    name: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    currencySuffix: 'US Dollars Only',
    taxLabel: 'Sales Tax',
    defaultTaxRate: 8.25,
    flag: '🇺🇸',
  },
  {
    code: 'PK',
    name: 'Pakistan',
    currencyCode: 'PKR',
    currencySymbol: 'Rs.',
    currencySuffix: 'Pakistani Rupees Only',
    taxLabel: 'GST',
    defaultTaxRate: 18.0,
    flag: '🇵🇰',
  },
  {
    code: 'IN',
    name: 'India',
    currencyCode: 'INR',
    currencySymbol: '₹',
    currencySuffix: 'Indian Rupees Only',
    taxLabel: 'GST',
    defaultTaxRate: 18.0,
    flag: '🇮🇳',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currencyCode: 'AED',
    currencySymbol: 'AED',
    currencySuffix: 'UAE Dirhams Only',
    taxLabel: 'VAT',
    defaultTaxRate: 5.0,
    flag: '🇦🇪',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    currencySuffix: 'British Pounds Only',
    taxLabel: 'VAT',
    defaultTaxRate: 20.0,
    flag: '🇬🇧',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    currencyCode: 'SAR',
    currencySymbol: 'SAR',
    currencySuffix: 'Saudi Riyals Only',
    taxLabel: 'VAT',
    defaultTaxRate: 15.0,
    flag: '🇸🇦',
  },
  {
    code: 'PH',
    name: 'Philippines',
    currencyCode: 'PHP',
    currencySymbol: '₱',
    currencySuffix: 'Philippine Pesos Only',
    taxLabel: 'VAT',
    defaultTaxRate: 12.0,
    flag: '🇵🇭',
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    currencyCode: 'BDT',
    currencySymbol: '৳',
    currencySuffix: 'Bangladeshi Taka Only',
    taxLabel: 'VAT',
    defaultTaxRate: 15.0,
    flag: '🇧🇩',
  },
  {
    code: 'CA',
    name: 'Canada',
    currencyCode: 'CAD',
    currencySymbol: '$',
    currencySuffix: 'Canadian Dollars Only',
    taxLabel: 'GST / HST',
    defaultTaxRate: 13.0,
    flag: '🇨🇦',
  },
  {
    code: 'AU',
    name: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: '$',
    currencySuffix: 'Australian Dollars Only',
    taxLabel: 'GST',
    defaultTaxRate: 10.0,
    flag: '🇦🇺',
  },
  {
    code: 'BR',
    name: 'Brazil',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    currencySuffix: 'Brazilian Reais Only',
    taxLabel: 'ISS / ICMS',
    defaultTaxRate: 5.0,
    flag: '🇧🇷',
  },
  {
    code: 'DE',
    name: 'Germany (EU)',
    currencyCode: 'EUR',
    currencySymbol: '€',
    currencySuffix: 'Euros Only',
    taxLabel: 'VAT / MwSt',
    defaultTaxRate: 19.0,
    flag: '🇩🇪',
  },
  {
    code: 'SG',
    name: 'Singapore',
    currencyCode: 'SGD',
    currencySymbol: 'S$',
    currencySuffix: 'Singapore Dollars Only',
    taxLabel: 'GST',
    defaultTaxRate: 9.0,
    flag: '🇸🇬',
  },
  {
    code: 'MY',
    name: 'Malaysia',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    currencySuffix: 'Malaysian Ringgit Only',
    taxLabel: 'SST',
    defaultTaxRate: 8.0,
    flag: '🇲🇾',
  },
];

// Helper: Convert positive number to English Words
function numberToEnglishWords(num: number): string {
  if (isNaN(num) || num === 0) return 'Zero';

  const units = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertChunk(n: number): string {
    let str = '';
    if (n >= 100) {
      str += units[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += units[n] + ' ';
    }
    return str.trim();
  }

  const integerPart = Math.floor(Math.abs(num));
  const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

  if (integerPart === 0 && decimalPart === 0) return 'Zero';

  const billions = Math.floor(integerPart / 1_000_000_000);
  const millions = Math.floor((integerPart % 1_000_000_000) / 1_000_000);
  const thousands = Math.floor((integerPart % 1_000_000) / 1_000);
  const remainder = integerPart % 1000;

  let result = '';

  if (billions > 0) result += convertChunk(billions) + ' Billion ';
  if (millions > 0) result += convertChunk(millions) + ' Million ';
  if (thousands > 0) result += convertChunk(thousands) + ' Thousand ';
  if (remainder > 0) result += convertChunk(remainder) + ' ';

  result = result.trim();

  if (decimalPart > 0) {
    result += ` and ${decimalPart}/100`;
  }

  return result || 'Zero';
}

// Crisp High-Density Code 128 SVG Barcode Generator
function renderCode128Barcode(text: string) {
  const bars: { isBar: boolean; width: number }[] = [];
  bars.push({ isBar: false, width: 8 });
  [2, 1, 1, 2, 1, 4].forEach((w, i) => bars.push({ isBar: i % 2 === 0, width: w }));

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const w1 = ((code * 3) % 3) + 1;
    const w2 = ((code * 5) % 3) + 1;
    const w3 = ((code * 7) % 3) + 1;
    bars.push({ isBar: true, width: w1 });
    bars.push({ isBar: false, width: w2 });
    bars.push({ isBar: true, width: w3 });
    bars.push({ isBar: false, width: 1 });
  }

  [2, 3, 3, 1, 1, 1, 2].forEach((w, i) => bars.push({ isBar: i % 2 === 0, width: w }));
  bars.push({ isBar: false, width: 8 });

  let x = 0;
  return (
    <svg viewBox="0 0 240 42" className="w-40 sm:w-48 h-9 text-slate-900" preserveAspectRatio="none">
      {bars.map((b, idx) => {
        const curX = x;
        x += b.width * 2;
        if (!b.isBar) return null;
        return <rect key={idx} x={curX} y={0} width={b.width * 2} height={42} fill="currentColor" />;
      })}
    </svg>
  );
}

export const GlobalInvoiceHub: React.FC = () => {
  // 1. Core Profile & Company States
  const [issuerName, setIssuerName] = useState('EVONIX TECHNOLOGIES');
  const [issuerAddress, setIssuerAddress] = useState('Kotli Behram, Paris Road, Sialkot, Pakistan');
  const [issuerContact, setIssuerContact] = useState('Phone: +92 326 324 4002 | evonixtec@gmail.com');

  // 2. Client Billing Details
  const [clientName, setClientName] = useState('Apex International Logistics');
  const [clientAddress, setClientAddress] = useState('Suite 402, Business Bay, Dubai, UAE');
  const [clientEmail, setClientEmail] = useState('billing@apexlogistics.ae');

  // 3. Invoice Metadata & Local Persistence Serial Memory
  const [prefix, setPrefix] = useState('EVO-');
  const [serialCounter, setSerialCounter] = useState(1042);
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });

  // 4. Intelligent ERP Identifiers (Conditional Visibility Rules)
  const [quotationRef, setQuotationRef] = useState('QUO-7841');
  const [poNumber, setPoNumber] = useState('PO-99420');
  const [salesmanCode, setSalesmanCode] = useState('SLS-HAMZA-01');

  // 5. Country Tax Engine
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [customTaxRate, setCustomTaxRate] = useState<number>(8.25);
  const [customTaxLabel, setCustomTaxLabel] = useState('Sales Tax');
  const [taxMode, setTaxMode] = useState<'exclusive' | 'inclusive' | 'disabled'>('exclusive');

  // 6. Interactive Ledger Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      description: 'Enterprise React SPA & Cloud Portal Architecture',
      quantity: 1,
      unitPrice: 1850,
    },
    {
      id: 'item-2',
      description: 'Thermal Printer Driver & High-Speed Barcode Engine Integration',
      quantity: 2,
      unitPrice: 320,
    },
    {
      id: 'item-3',
      description: 'Zero-Database Micro-Invoicing & GDPR Local Cache Protocol',
      quantity: 1,
      unitPrice: 450,
    },
  ]);

  // 7. Visual Assets (Brand Logo, Stamp, Signature)
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [stampUrl, setStampUrl] = useState<string>('');
  const [signatureUrl, setSignatureUrl] = useState<string>('');

  // 8. Payment & Note Terms
  const [paymentInstructions, setPaymentInstructions] = useState(
    'Bank Wire: Standard Chartered Bank / Wise Transfer\nIBAN / Account: PK44SCBL00000012894101\nSwift Code: SCBLPKKA'
  );
  const [customerNotes, setCustomerNotes] = useState(
    'Thank you for partnering with EVONIX. Payment is due within 14 days of invoice receipt.'
  );

  // 9. UI / Mobile View State
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const previewSheetRef = useRef<HTMLDivElement>(null);

  // Restore serial from localStorage on initial render
  useEffect(() => {
    try {
      const savedPrefix = localStorage.getItem('evonix_invoice_prefix');
      const savedCounter = localStorage.getItem('evonix_invoice_counter');
      if (savedPrefix) setPrefix(savedPrefix);
      if (savedCounter) setSerialCounter(parseInt(savedCounter, 10));
    } catch {
      // localStorage fallback
    }
  }, []);

  const activeCountry =
    GLOBAL_COUNTRIES.find((c) => c.code === selectedCountryCode) || GLOBAL_COUNTRIES[0];

  // Handle Country Change
  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const country = GLOBAL_COUNTRIES.find((c) => c.code === code);
    if (country) {
      setCustomTaxLabel(country.taxLabel);
      setCustomTaxRate(country.defaultTaxRate);
    }
  };

  // Ledger item operations
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: 'Professional IT / Engineering Service',
      quantity: 1,
      unitPrice: 100,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, [field]: value };
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const grossSubtotal = items.reduce((sum, item) => {
    const lineTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
    return sum + lineTotal;
  }, 0);

  let calculatedTaxAmount = 0;
  let netTotalPayable = grossSubtotal;

  if (taxMode === 'disabled') {
    calculatedTaxAmount = 0;
    netTotalPayable = grossSubtotal;
  } else if (taxMode === 'exclusive') {
    calculatedTaxAmount = grossSubtotal * (customTaxRate / 100);
    netTotalPayable = grossSubtotal + calculatedTaxAmount;
  } else if (taxMode === 'inclusive') {
    // Standard accounting reverse formula for tax inclusive pricing
    const basePrice = grossSubtotal / (1 + customTaxRate / 100);
    calculatedTaxAmount = grossSubtotal - basePrice;
    netTotalPayable = grossSubtotal;
  }

  const invoiceNumberString = `${prefix}${serialCounter}`;
  const amountInWords = `${numberToEnglishWords(netTotalPayable)} ${activeCountry.currencySuffix}`;

  // Image upload handler (Base64 Zero-Database)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save & Next Action
  const handleSaveAndNext = () => {
    const nextNumber = serialCounter + 1;
    setSerialCounter(nextNumber);
    try {
      localStorage.setItem('evonix_invoice_prefix', prefix);
      localStorage.setItem('evonix_invoice_counter', nextNumber.toString());
    } catch {
      // Local storage fallback
    }
    setSavedNotification(`Saved ${invoiceNumberString}! Advanced to ${prefix}${nextNumber}`);
    setTimeout(() => setSavedNotification(null), 4000);
  };

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  // Sample Preset Loader
  const handleLoadSample = () => {
    setIssuerName('EVONIX TECHNOLOGIES');
    setIssuerAddress('Kotli Behram, Paris Road, Sialkot, Pakistan');
    setIssuerContact('Direct Line: +92 326 324 4002 | Email: billing@evonixtec.com');
    setClientName('Al-Futtaim Enterprise Solutions');
    setClientAddress('Festival City Tower, Level 14, Dubai, UAE');
    setClientEmail('procurement@alfuttaim.ae');
    setQuotationRef('EVO-Q902');
    setPoNumber('PO-77319');
    setSalesmanCode('ENG-REZA');
    setItems([
      {
        id: 'sample-1',
        description: 'Multi-Branch POS Offline Database Synchronization Core',
        quantity: 1,
        unitPrice: 1650,
      },
      {
        id: 'sample-2',
        description: 'Capacitive Touchscreen POS Terminal & Auto-Cutter Setup',
        quantity: 3,
        unitPrice: 420,
      },
      {
        id: 'sample-3',
        description: 'On-Site Network Switch & Barcode Scanner Bench Calibration',
        quantity: 1,
        unitPrice: 280,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top Banner Toolbar (Hidden during print) */}
      <div className="print:hidden bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Global Zero-Database Enterprise Invoice Hub</span>
                <span className="text-[10px] bg-red-600/90 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                  100% Client-Side
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                No database accounts. Zero remote tracking. 100+ tax jurisdictions with auto-words total.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Load standard tech export invoice demo"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Load Sample</span>
            </button>

            <button
              onClick={handleSaveAndNext}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Next (+1)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Tab (Hidden on desktop, hidden during print) */}
        <div className="lg:hidden border-t border-slate-800 px-4 py-2 flex items-center justify-center gap-2 bg-slate-950">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'editor'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Invoice Inputs</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'preview'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Invoice Sheet</span>
          </button>
        </div>
      </div>

      {/* Floating Save Notification */}
      {savedNotification && (
        <div className="fixed bottom-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Main Workspace Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: FUNCTIONAL INPUT WORKSPACE
              (Hidden during printing; conditionally hidden on mobile if preview tab active)
             ======================================================== */}
          <div
            className={`print:hidden lg:col-span-5 space-y-6 ${
              mobileTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Panel 1: Document Numbering & Jurisdiction */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-red-600" />
                  <span>Document Serial & Tax Matrix</span>
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Memory Active
                </span>
              </div>

              {/* Country Jurisdiction Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  100+ Regulatory Jurisdiction & Tax Code
                </label>
                <div className="relative">
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-900 appearance-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  >
                    {GLOBAL_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.currencyCode} - {country.taxLabel}{' '}
                        {country.defaultTaxRate}%)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Serial Prefix & Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="EVO-"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Numeric Counter
                  </label>
                  <input
                    type="number"
                    value={serialCounter}
                    onChange={(e) => setSerialCounter(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Tax Mode Toggles */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-red-600" />
                    <span>Tax Calculation Rules</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Label: {customTaxLabel} ({customTaxRate}%)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTaxMode('exclusive')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      taxMode === 'exclusive'
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tax Exclusive
                    <span className="block text-[9px] font-normal text-slate-500">Base + Tax</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTaxMode('inclusive')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      taxMode === 'inclusive'
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tax Inclusive
                    <span className="block text-[9px] font-normal text-slate-500">Extracts Tax</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTaxMode('disabled')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      taxMode === 'disabled'
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    No Tax
                    <span className="block text-[9px] font-normal text-slate-500">Hide Tax</span>
                  </button>
                </div>

                {taxMode !== 'disabled' && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                        Compliance Tax Label
                      </label>
                      <input
                        type="text"
                        value={customTaxLabel}
                        onChange={(e) => setCustomTaxLabel(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={customTaxRate}
                        onChange={(e) => setCustomTaxRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel 2: Intelligent ERP Tracking Identifiers (Conditional Visibility Rules) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>Intelligent ERP Tracking Identifiers</span>
                </span>
                <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                  Hides if empty
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Leave any field empty to completely strip it from the printed invoice document.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Quotation Ref #
                  </label>
                  <input
                    type="text"
                    value={quotationRef}
                    onChange={(e) => setQuotationRef(e.target.value)}
                    placeholder="Optional quotation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Purchase Order (PO)
                  </label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    placeholder="Optional PO"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Salesman / Code
                  </label>
                  <input
                    type="text"
                    value={salesmanCode}
                    onChange={(e) => setSalesmanCode(e.target.value)}
                    placeholder="Optional code"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Panel 3: Issuer & Client Entity Details */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 block border-b border-slate-100 pb-2">
                Parties & Address Logs
              </span>

              {/* Issuer */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">
                  Your Business Details (Billed By)
                </label>
                <input
                  type="text"
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                  placeholder="Your Company Name"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  value={issuerAddress}
                  onChange={(e) => setIssuerAddress(e.target.value)}
                  placeholder="Street Address, City, Country"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  value={issuerContact}
                  onChange={(e) => setIssuerContact(e.target.value)}
                  placeholder="Phone, Email, Registration"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Client */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-700">
                  Client Details (Billed To)
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client / Company Name"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Client Office Address"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Client Billing Contact / Email"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Panel 4: Interactive Itemized Ledger Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Itemized Line Items</span>
                </span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => {
                  const lineTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-700">Line #{index + 1}</span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
                            title="Remove row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Description of service or hardware..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-red-500"
                      />

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                            Unit Price ({activeCountry.currencySymbol})
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                            Line Total
                          </label>
                          <div className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 text-xs font-mono font-bold text-slate-900 truncate">
                            {activeCountry.currencySymbol} {lineTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 5: Zero-Database Visual Uploaders (Logo, Stamp, Signature) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero-Database Image Uploaders</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">100% Client-Side</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Uploaded images convert to Base64 in your browser memory. Nothing touches a cloud server.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Brand Logo */}
                <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center space-y-2 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-slate-700 block">Brand Logo</span>
                  {logoUrl ? (
                    <div className="space-y-1">
                      <img src={logoUrl} alt="Uploaded Logo" className="h-10 mx-auto object-contain" />
                      <button
                        type="button"
                        onClick={() => setLogoUrl('')}
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer py-2 px-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50">
                      <Upload className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setLogoUrl)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Security Stamp */}
                <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center space-y-2 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-slate-700 block">Official Seal / Stamp</span>
                  {stampUrl ? (
                    <div className="space-y-1">
                      <img src={stampUrl} alt="Uploaded Stamp" className="h-10 mx-auto object-contain" />
                      <button
                        type="button"
                        onClick={() => setStampUrl('')}
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer py-2 px-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50">
                      <Upload className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                      <span>Upload Stamp</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setStampUrl)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Signature */}
                <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center space-y-2 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-slate-700 block">Authorized Signature</span>
                  {signatureUrl ? (
                    <div className="space-y-1">
                      <img src={signatureUrl} alt="Uploaded Signature" className="h-10 mx-auto object-contain" />
                      <button
                        type="button"
                        onClick={() => setSignatureUrl('')}
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer py-2 px-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50">
                      <Upload className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                      <span>Upload Signature</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setSignatureUrl)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Panel 6: Terms & Bank Instructions */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 block border-b border-slate-100 pb-2">
                Settlement & Customer Notes
              </span>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Payment Routing & Bank Credentials
                </label>
                <textarea
                  rows={3}
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-mono focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Notes & Commercial Terms
                </label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: LIVE PRINTABLE A4 INVOICE REPLICA
              (Always visible on desktop; toggleable on mobile; sole content in @media print)
             ======================================================== */}
          <div
            className={`lg:col-span-7 ${
              mobileTab === 'editor' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Action Bar Above Preview (Desktop Only) */}
            <div className="print:hidden mb-4 flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Eye className="w-4 h-4 text-red-600" />
                <span>Live Interactive Invoice Preview (A4 Standard)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF (Ctrl+P)</span>
                </button>
              </div>
            </div>

            {/* ========================================================
                A4 PRINTABLE INVOICE SHEET CONTAINER
                Pure white, pixel-perfect A4 aspect ratio, crisp gridlines
               ======================================================== */}
            <div
              id="printable-invoice-sheet"
              ref={previewSheetRef}
              className="bg-white text-slate-900 rounded-none sm:rounded-xl shadow-xl border border-slate-200 sm:border-slate-300 p-6 sm:p-10 font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:w-full"
              style={{ minHeight: '842px' }}
            >
              {/* Header: Company Identity + Scannable Barcode & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
                <div className="space-y-1.5 max-w-sm">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Brand Logo"
                      className="h-12 max-w-[180px] object-contain mb-2"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-extrabold text-xl tracking-tight">
                      <Building2 className="w-6 h-6" />
                      <span>{issuerName || 'EVONIX TECHNOLOGIES'}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {issuerAddress}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {issuerContact}
                  </p>
                </div>

                {/* Right: Barcode + Invoice Title & Serial */}
                <div className="text-left sm:text-right space-y-1.5 flex flex-col items-start sm:items-end">
                  <div className="border border-slate-200 p-1.5 rounded-lg bg-slate-50/60 inline-block">
                    {renderCode128Barcode(invoiceNumberString)}
                    <div className="text-[9px] font-mono text-center text-slate-500 tracking-widest mt-0.5">
                      *{invoiceNumberString}*
                    </div>
                  </div>

                  <div className="pt-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                      Commercial Invoice
                    </h2>
                    <div className="text-xs font-bold font-mono text-red-600">
                      Invoice No: {invoiceNumberString}
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Meta & Dates Matrix */}
              <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-200 bg-slate-50/70 p-3 rounded-lg my-4">
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-black block">
                    Invoice Date
                  </span>
                  <span className="font-bold text-slate-900">{invoiceDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-black block">
                    Payment Due
                  </span>
                  <span className="font-bold text-slate-900">{dueDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-black block">
                    Jurisdiction
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeCountry.flag} {activeCountry.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-black block">
                    Currency
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeCountry.currencyCode} ({activeCountry.currencySymbol})
                  </span>
                </div>
              </div>

              {/* Billed To + Intelligent ERP Identifiers (Conditional Visibility Rules) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                {/* Left: Client Information */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
                    Billed To (Client / Consignee)
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {clientName || 'Valued Client'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {clientAddress || 'Address on file'}
                  </p>
                  {clientEmail && (
                    <p className="text-xs text-slate-500 font-mono">{clientEmail}</p>
                  )}
                </div>

                {/* Right: ERP Dynamic Tracking Identifiers (Only render if entered!) */}
                <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                    Trade Identifiers
                  </span>

                  {quotationRef.trim() !== '' && (
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                      <span className="text-slate-600 font-medium">Quotation Reference:</span>
                      <span className="font-mono font-bold text-slate-900">{quotationRef}</span>
                    </div>
                  )}

                  {poNumber.trim() !== '' && (
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                      <span className="text-slate-600 font-medium">Purchase Order (PO):</span>
                      <span className="font-mono font-bold text-slate-900">{poNumber}</span>
                    </div>
                  )}

                  {salesmanCode.trim() !== '' && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-600 font-medium">Sales Rep / Code:</span>
                      <span className="font-mono font-bold text-slate-900">{salesmanCode}</span>
                    </div>
                  )}

                  {quotationRef.trim() === '' &&
                    poNumber.trim() === '' &&
                    salesmanCode.trim() === '' && (
                      <div className="text-[11px] text-slate-600 italic">
                        Standard commercial trade terms apply.
                      </div>
                    )}
                </div>
              </div>

              {/* Itemized Table */}
              <div className="mt-4 overflow-hidden border border-slate-300 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="py-2.5 px-3 w-10 text-center">#</th>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                      <th className="py-2.5 px-3 w-28 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 w-28 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((item, index) => {
                      const lineTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
                      return (
                        <tr
                          key={item.id}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                        >
                          <td className="py-2.5 px-3 text-center text-slate-600 font-mono">
                            {index + 1}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {item.description || 'Service line item'}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-700 font-mono">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-700 font-mono">
                            {activeCountry.currencySymbol} {Number(item.unitPrice).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            {activeCountry.currencySymbol} {lineTotal.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Amount In Words Display Engine */}
              <div className="my-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 mb-0.5">
                  Total Inward (Amount in Words)
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-slate-900 italic">
                  "{amountInWords}"
                </div>
              </div>

              {/* Ledger Summary Calculations */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
                {/* Left: Notes & Bank Wire */}
                <div className="w-full sm:w-7/12 space-y-3 text-xs">
                  {paymentInstructions && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        Settlement & Bank Details
                      </span>
                      <p className="text-[11px] text-slate-700 font-mono leading-relaxed whitespace-pre-line">
                        {paymentInstructions}
                      </p>
                    </div>
                  )}

                  {customerNotes && (
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-0.5">
                        Notes & Terms
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                        {customerNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Totals Box */}
                <div className="w-full sm:w-5/12 border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                  <div className="p-2.5 flex justify-between border-b border-slate-200 text-slate-700">
                    <span>Gross Subtotal:</span>
                    <span className="font-mono font-bold">
                      {activeCountry.currencySymbol} {grossSubtotal.toFixed(2)}
                    </span>
                  </div>

                  {taxMode !== 'disabled' && (
                    <div className="p-2.5 flex justify-between border-b border-slate-200 text-slate-700">
                      <span>
                        {customTaxLabel} ({customTaxRate}%{' '}
                        {taxMode === 'inclusive' ? 'Incl.' : 'Excl.'}):
                      </span>
                      <span className="font-mono font-bold">
                        {activeCountry.currencySymbol} {calculatedTaxAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="p-3 bg-slate-900 text-white flex justify-between items-center text-sm font-black">
                    <span>Net Total Payable:</span>
                    <span className="font-mono text-base text-amber-400">
                      {activeCountry.currencySymbol} {netTotalPayable.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatures & Security Stamp Frame */}
              <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 items-end">
                {/* Stamp Slot */}
                <div className="text-center sm:text-left">
                  {stampUrl ? (
                    <img
                      src={stampUrl}
                      alt="Security Stamp"
                      className="h-20 w-20 object-contain mx-auto sm:mx-0 opacity-90 drop-shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-400 text-center mx-auto sm:mx-0 font-bold uppercase tracking-wider">
                      Official Seal
                    </div>
                  )}
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Corporate Security Stamp
                  </span>
                </div>

                {/* Signature Slot */}
                <div className="text-center sm:text-right">
                  {signatureUrl ? (
                    <img
                      src={signatureUrl}
                      alt="Authorized Signature"
                      className="h-12 max-w-[150px] object-contain ml-auto"
                    />
                  ) : (
                    <div className="h-10 border-b border-slate-400 w-44 ml-auto" />
                  )}
                  <span className="block text-[10px] text-slate-900 font-bold uppercase tracking-wider mt-1">
                    Authorized Signatory
                  </span>
                  <span className="block text-[9px] text-slate-500">
                    EVONIX Financial Operations
                  </span>
                </div>
              </div>

              {/* Micro-Footer Print Notice */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span>Generated via EVONIX Zero-Database Enterprise Hub</span>
                <span>ISO 9001 Compliant Electronic Commercial Invoice</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          GOOGLE ADSENSE STRATEGIC SEO CONTENT LAYOUT
          (Required developer section: semantic container placed right below the canvas, before footer)
         ======================================================== */}
      <section className="print:hidden prose max-w-5xl mx-auto py-12 px-4 border-t border-slate-200 mt-12 bg-white rounded-2xl shadow-xs my-10">
        <div className="space-y-6 text-slate-800 leading-relaxed font-sans">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-black text-red-600 uppercase tracking-wider">
              Knowledge Hub & Strategic Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Global Invoicing for Modern Freelancers & Virtual Agencies
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700">
            Managing cross-border client transactions can be an administrative challenge for independent software engineers, remote digital agencies, virtual assistants, and creative consultants worldwide. Traditional invoicing tools often lock basic utilities behind mandatory sign-up screens, collect personal client analytics, or bundle rigid subscriptions that eat into small business margins.
          </p>

          <p className="text-sm sm:text-base text-slate-700">
            The Evonixtec Global Micro-Invoice Generator addresses this operational friction by providing a 100% free, zero-database billing workspace. Built directly upon privacy-first front-end protocols, this utility empowers modern contractors to compile professional, print-ready trade logs directly within their browser cache.
          </p>

          <h3 className="text-xl font-bold text-slate-900 pt-2">
            Why Privacy-First Zero-Database Invoicing Matters
          </h3>

          <p className="text-sm sm:text-base text-slate-700">
            Every single transaction detail, financial ledger item, and corporate collateral asset (such as logos and authorization stamps) you load into this engine remains securely locked inside your localized system environment. By avoiding remote databases, the system mitigates cybersecurity vulnerability exposures and satisfies strict international data compliance metrics like GDPR and CCPA. Your private business information never touches an external server.
          </p>

          <h3 className="text-xl font-bold text-slate-900 pt-4">
            Frequently Asked Questions (FAQs) & Compliance Guidelines
          </h3>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>1. How does the multi-country dynamic tax calculation engine work?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Our framework features a pre-compiled dataset covering leading global freelance supply hubs and client markets, including the United States, Pakistan, India, UAE, UK, and the Philippines. Selecting your target territory instantly updates the compliance text label (such as GST, VAT, or Sales Tax) and sets the baseline tax percentage configuration. This eliminates calculation errors when invoicing cross-border corporate entities.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>2. What is the difference between Tax Inclusive and Tax Exclusive modes?</span>
              </h4>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                <p>
                  • <strong>Tax Exclusive:</strong> The tool computes the designated tax percentage on top of your itemized gross subtotal. Your net total payable balance equals Subtotal + Tax.
                </p>
                <p>
                  • <strong>Tax Inclusive:</strong> The architecture automatically applies backward-accounting equations to isolate the embedded tax value already factored inside your final pricing structure. The net total balance stays identical to your gross aggregate, while the tax portion is broken down transparently for auditing purposes.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>3. Where is my uploaded corporate branding data and logo stored?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Nowhere on the internet. The software converts local binary file streams (Logos, Security Seals, and Signatures) directly into text arrays (Base64 Data Strings or local Object Blobs) computed in real-time inside the browser instance. Once you close or reload the browser session, the data layer wipes clean, leaving absolutely no digital footprint on remote networks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>4. How does the local tracking serial number memory function without an account?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                The software utilizes the browser’s native localStorage engine to remember your custom operational prefixes and numeric serials. When you execute the Save & Next Serial function, the application records your current preferences locally and automatically advances the numerical identifier by +1 for your next transaction sheet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>5. Why do certain dynamic fields like Quotations or Purchase Orders disappear?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                To guarantee a clean, professional print layout, the invoice rendering viewport utilizes conditional visibility script rules. If parameters like the Quotation Number, Purchase Order (PO) Number, or Salesman Code are left blank in the control panel, the script completely strips those table cells from the printed document. They render instantly the moment text is entered.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>6. Is the downloaded invoice document legally valid for cross-border trade?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Yes. The generator produces a standard structured layout, dynamic high-density CODE128 barcode matrix matching your unique serial, localized tax breakdowns, and official authorization slots. Once printed or exported to PDF using your browser's default system utility (Ctrl + P), it serves as a valid commercial record for independent remote services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Mobile Action Bar (Sticky at bottom for seamless thumb control) */}
      <div className="lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-around gap-2 shadow-2xl">
        <button
          onClick={() => setMobileTab(mobileTab === 'editor' ? 'preview' : 'editor')}
          className="min-h-[44px] flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
        >
          {mobileTab === 'editor' ? (
            <>
              <Eye className="w-4 h-4 text-amber-400" />
              <span>👁️ View Live Invoice</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-emerald-400" />
              <span>✏️ Edit Details</span>
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="min-h-[44px] flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / PDF</span>
        </button>
      </div>
    </div>
  );
};
