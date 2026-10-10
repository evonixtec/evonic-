export interface CountryTaxPreset {
  id: string;
  country: string;
  flag: string;
  region: 'Europe' | 'Americas' | 'Middle East' | 'Asia Pacific' | 'Africa' | 'Global';
  taxName: string;
  defaultRate: number;
  currency: string;
  symbol: string;
  defaultInvoiceType: 'Commercial Invoice' | 'Tax Invoice' | 'VAT Invoice' | 'GST Invoice';
}

export const MAJOR_50_COUNTRIES: CountryTaxPreset[] = [
  // Europe
  { id: 'nl', country: 'Netherlands', flag: '🇳🇱', region: 'Europe', taxName: 'Btw (Omzetbelasting)', defaultRate: 21, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'fr', country: 'France', flag: '🇫🇷', region: 'Europe', taxName: 'TVA (Taxe sur la valeur ajoutée)', defaultRate: 20, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'de', country: 'Germany', flag: '🇩🇪', region: 'Europe', taxName: 'MwSt (Umsatzsteuer)', defaultRate: 19, currency: 'EUR', symbol: '€', defaultInvoiceType: 'Tax Invoice' },
  { id: 'gb', country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', taxName: 'HMRC Standard VAT', defaultRate: 20, currency: 'GBP', symbol: '£', defaultInvoiceType: 'VAT Invoice' },
  { id: 'it', country: 'Italy', flag: '🇮🇹', region: 'Europe', taxName: 'IVA (Imposta sul Valore Aggiunto)', defaultRate: 22, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'es', country: 'Spain', flag: '🇪🇸', region: 'Europe', taxName: 'IVA (Impuesto sobre el Valor Añadido)', defaultRate: 21, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'be', country: 'Belgium', flag: '🇧🇪', region: 'Europe', taxName: 'TVA / Btw', defaultRate: 21, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'ch', country: 'Switzerland', flag: '🇨🇭', region: 'Europe', taxName: 'MWST / TVA', defaultRate: 8.1, currency: 'CHF', symbol: 'CHF', defaultInvoiceType: 'Tax Invoice' },
  { id: 'at', country: 'Austria', flag: '🇦🇹', region: 'Europe', taxName: 'USt (Umsatzsteuer)', defaultRate: 20, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'se', country: 'Sweden', flag: '🇸🇪', region: 'Europe', taxName: 'Moms (Mervärdesskatt)', defaultRate: 25, currency: 'SEK', symbol: 'kr', defaultInvoiceType: 'VAT Invoice' },
  { id: 'no', country: 'Norway', flag: '🇳🇴', region: 'Europe', taxName: 'MVA (Merverdiavgift)', defaultRate: 25, currency: 'NOK', symbol: 'kr', defaultInvoiceType: 'VAT Invoice' },
  { id: 'dk', country: 'Denmark', flag: '🇩🇰', region: 'Europe', taxName: 'Moms', defaultRate: 25, currency: 'DKK', symbol: 'kr', defaultInvoiceType: 'VAT Invoice' },
  { id: 'ie', country: 'Ireland', flag: '🇮🇪', region: 'Europe', taxName: 'Irish Revenue VAT', defaultRate: 23, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'pl', country: 'Poland', flag: '🇵🇱', region: 'Europe', taxName: 'VAT (Podatek od towarów i usług)', defaultRate: 23, currency: 'PLN', symbol: 'zł', defaultInvoiceType: 'VAT Invoice' },
  { id: 'pt', country: 'Portugal', flag: '🇵🇹', region: 'Europe', taxName: 'IVA', defaultRate: 23, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'fi', country: 'Finland', flag: '🇫🇮', region: 'Europe', taxName: 'ALV (Arvonlisävero)', defaultRate: 25.5, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'gr', country: 'Greece', flag: '🇬🇷', region: 'Europe', taxName: 'FPA (ΦΠΑ)', defaultRate: 24, currency: 'EUR', symbol: '€', defaultInvoiceType: 'VAT Invoice' },
  { id: 'cz', country: 'Czech Republic', flag: '🇨🇿', region: 'Europe', taxName: 'DPH', defaultRate: 21, currency: 'CZK', symbol: 'Kč', defaultInvoiceType: 'VAT Invoice' },
  { id: 'hu', country: 'Hungary', flag: '🇭🇺', region: 'Europe', taxName: 'ÁFA', defaultRate: 27, currency: 'HUF', symbol: 'Ft', defaultInvoiceType: 'VAT Invoice' },
  { id: 'ro', country: 'Romania', flag: '🇷🇴', region: 'Europe', taxName: 'TVA', defaultRate: 19, currency: 'RON', symbol: 'lei', defaultInvoiceType: 'VAT Invoice' },
  { id: 'eu-b2b', country: 'European Union (B2B Reverse Charge)', flag: '🇪🇺', region: 'Europe', taxName: 'EU B2B Reverse Charge', defaultRate: 0, currency: 'EUR', symbol: '€', defaultInvoiceType: 'Commercial Invoice' },

  // Americas
  { id: 'us', country: 'United States', flag: '🇺🇸', region: 'Americas', taxName: 'US State & Local Sales Tax', defaultRate: 8.25, currency: 'USD', symbol: '$', defaultInvoiceType: 'Commercial Invoice' },
  { id: 'ca', country: 'Canada (Ontario)', flag: '🇨🇦', region: 'Americas', taxName: 'HST (Harmonized Sales Tax)', defaultRate: 13, currency: 'CAD', symbol: 'CA$', defaultInvoiceType: 'Tax Invoice' },
  { id: 'br', country: 'Brazil', flag: '🇧🇷', region: 'Americas', taxName: 'ICMS / Imposto', defaultRate: 17, currency: 'BRL', symbol: 'R$', defaultInvoiceType: 'Tax Invoice' },
  { id: 'mx', country: 'Mexico', flag: '🇲🇽', region: 'Americas', taxName: 'IVA (Impuesto al Valor Agregado)', defaultRate: 16, currency: 'MXN', symbol: 'MX$', defaultInvoiceType: 'Tax Invoice' },

  // Middle East & GCC
  { id: 'ae', country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', taxName: 'FTA Standard VAT', defaultRate: 5, currency: 'AED', symbol: 'AED', defaultInvoiceType: 'Tax Invoice' },
  { id: 'sa', country: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', taxName: 'ZATCA Standard VAT', defaultRate: 15, currency: 'SAR', symbol: 'SAR', defaultInvoiceType: 'Tax Invoice' },
  { id: 'qa', country: 'Qatar', flag: '🇶🇦', region: 'Middle East', taxName: 'Qatar General Tax (0% VAT)', defaultRate: 0, currency: 'QAR', symbol: 'QAR', defaultInvoiceType: 'Commercial Invoice' },
  { id: 'kw', country: 'Kuwait', flag: '🇰🇼', region: 'Middle East', taxName: 'Kuwait Corporate Tax (0% VAT)', defaultRate: 0, currency: 'KWD', symbol: 'KD', defaultInvoiceType: 'Commercial Invoice' },
  { id: 'om', country: 'Oman', flag: '🇴🇲', region: 'Middle East', taxName: 'Oman Tax Authority VAT', defaultRate: 5, currency: 'OMR', symbol: 'OMR', defaultInvoiceType: 'Tax Invoice' },
  { id: 'bh', country: 'Bahrain', flag: '🇧🇭', region: 'Middle East', taxName: 'NBR Standard VAT', defaultRate: 10, currency: 'BHD', symbol: 'BD', defaultInvoiceType: 'Tax Invoice' },
  { id: 'tr', country: 'Turkey', flag: '🇹🇷', region: 'Middle East', taxName: 'KDV (Katma Değer Vergisi)', defaultRate: 20, currency: 'TRY', symbol: '₺', defaultInvoiceType: 'Tax Invoice' },
  { id: 'jo', country: 'Jordan', flag: '🇯🇴', region: 'Middle East', taxName: 'General Sales Tax (GST)', defaultRate: 16, currency: 'JOD', symbol: 'JD', defaultInvoiceType: 'Tax Invoice' },
  { id: 'eg', country: 'Egypt', flag: '🇪🇬', region: 'Middle East', taxName: 'ETA Standard VAT', defaultRate: 14, currency: 'EGP', symbol: 'E£', defaultInvoiceType: 'Tax Invoice' },

  // Asia Pacific
  { id: 'pk', country: 'Pakistan (FBR GST)', flag: '🇵🇰', region: 'Asia Pacific', taxName: 'FBR Sales Tax / GST', defaultRate: 18, currency: 'PKR', symbol: 'Rs', defaultInvoiceType: 'Tax Invoice' },
  { id: 'pk-srv', country: 'Pakistan (PRA / SRB Services)', flag: '🇵🇰', region: 'Asia Pacific', taxName: 'PRA / SRB Services Sales Tax', defaultRate: 16, currency: 'PKR', symbol: 'Rs', defaultInvoiceType: 'Tax Invoice' },
  { id: 'in', country: 'India', flag: '🇮🇳', region: 'Asia Pacific', taxName: 'GST (CGST + SGST / IGST)', defaultRate: 18, currency: 'INR', symbol: '₹', defaultInvoiceType: 'GST Invoice' },
  { id: 'sg', country: 'Singapore', flag: '🇸🇬', region: 'Asia Pacific', taxName: 'IRAS GST', defaultRate: 9, currency: 'SGD', symbol: 'S$', defaultInvoiceType: 'GST Invoice' },
  { id: 'my', country: 'Malaysia', flag: '🇲🇾', region: 'Asia Pacific', taxName: 'SST (Sales & Service Tax)', defaultRate: 8, currency: 'MYR', symbol: 'RM', defaultInvoiceType: 'Tax Invoice' },
  { id: 'jp', country: 'Japan', flag: '🇯🇵', region: 'Asia Pacific', taxName: 'JCT (Japanese Consumption Tax)', defaultRate: 10, currency: 'JPY', symbol: '¥', defaultInvoiceType: 'Tax Invoice' },
  { id: 'cn', country: 'China', flag: '🇨🇳', region: 'Asia Pacific', taxName: 'China State Taxation VAT', defaultRate: 13, currency: 'CNY', symbol: '¥', defaultInvoiceType: 'VAT Invoice' },
  { id: 'au', country: 'Australia', flag: '🇦🇺', region: 'Asia Pacific', taxName: 'ATO GST', defaultRate: 10, currency: 'AUD', symbol: 'A$', defaultInvoiceType: 'GST Invoice' },
  { id: 'nz', country: 'New Zealand', flag: '🇳🇿', region: 'Asia Pacific', taxName: 'IRD GST', defaultRate: 15, currency: 'NZD', symbol: 'NZ$', defaultInvoiceType: 'GST Invoice' },
  { id: 'kr', country: 'South Korea', flag: '🇰🇷', region: 'Asia Pacific', taxName: 'NTS Value Added Tax', defaultRate: 10, currency: 'KRW', symbol: '₩', defaultInvoiceType: 'Tax Invoice' },
  { id: 'hk', country: 'Hong Kong', flag: '🇭🇰', region: 'Asia Pacific', taxName: 'Hong Kong Free Port (0% Sales Tax)', defaultRate: 0, currency: 'HKD', symbol: 'HK$', defaultInvoiceType: 'Commercial Invoice' },
  { id: 'th', country: 'Thailand', flag: '🇹🇭', region: 'Asia Pacific', taxName: 'Revenue Department VAT', defaultRate: 7, currency: 'THB', symbol: '฿', defaultInvoiceType: 'Tax Invoice' },
  { id: 'vn', country: 'Vietnam', flag: '🇻🇳', region: 'Asia Pacific', taxName: 'General Department of Taxation VAT', defaultRate: 10, currency: 'VND', symbol: '₫', defaultInvoiceType: 'VAT Invoice' },
  { id: 'id', country: 'Indonesia', flag: '🇮🇩', region: 'Asia Pacific', taxName: 'PPN (Pajak Pertambahan Nilai)', defaultRate: 11, currency: 'IDR', symbol: 'Rp', defaultInvoiceType: 'Tax Invoice' },
  { id: 'ph', country: 'Philippines', flag: '🇵🇭', region: 'Asia Pacific', taxName: 'BIR Value Added Tax (VAT)', defaultRate: 12, currency: 'PHP', symbol: '₱', defaultInvoiceType: 'VAT Invoice' },
  { id: 'bd', country: 'Bangladesh', flag: '🇧🇩', region: 'Asia Pacific', taxName: 'NBR Value Added Tax (VAT)', defaultRate: 15, currency: 'BDT', symbol: '৳', defaultInvoiceType: 'VAT Invoice' },

  // Africa & Global
  { id: 'za', country: 'South Africa', flag: '🇿🇦', region: 'Africa', taxName: 'SARS Standard VAT', defaultRate: 15, currency: 'ZAR', symbol: 'R', defaultInvoiceType: 'Tax Invoice' },
  { id: 'global-free', country: 'Global Export (0% Duty Free)', flag: '🌐', region: 'Global', taxName: 'Export 0% Duty Free', defaultRate: 0, currency: 'USD', symbol: '$', defaultInvoiceType: 'Commercial Invoice' },
];
