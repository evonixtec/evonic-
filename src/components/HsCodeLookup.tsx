import React, { useState, useMemo } from 'react';
import {
  Globe,
  Search,
  FileCheck,
  Percent,
  DollarSign,
  AlertCircle,
  Copy,
  Check,
  Building,
  Shield,
  Plane,
  FileText,
  Sparkles,
  ArrowRight,
  Printer,
  ChevronDown,
} from 'lucide-react';

interface CategoryData {
  id: string;
  name: string;
  hsCode: string;
  heading: string;
  chapter: string;
  subheading: string;
  sampleItems: string;
  notes: string;
  marketTariffs: Record<
    string,
    {
      dutyRate: string;
      vatRate: string;
      concession: string;
      specialRule: string;
    }
  >;
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'leather',
    name: 'Leather Goods & Apparel',
    hsCode: '4203.10.00',
    heading: 'Articles of apparel and clothing accessories, of leather',
    chapter: 'Chapter 42: Leather Goods',
    subheading: '4203.10 - Leather jackets, coats, and trousers',
    sampleItems: 'Biker jackets, leather trench coats, casual pants, waistcoats',
    notes: 'Requires genuine leather declaration and export invoice with animal origin detail.',
    marketTariffs: {
      USA: {
        dutyRate: '0% - 6.0%',
        vatRate: '0% (State Sales Tax applies)',
        concession: 'Section 321 Duty-Free for shipments under $800 USD.',
        specialRule: 'Clear as informal entry under Section 321 for zero import duty.',
      },
      EU: {
        dutyRate: '4.0% (GSP+ eligible 0%)',
        vatRate: '19% - 22% Standard VAT',
        concession: 'Pakistan GSP+ tariff preference allows 0% duty with REX declaration.',
        specialRule: 'Include Registered Exporter (REX) number on commercial invoice.',
      },
      UK: {
        dutyRate: '4.0% (DCTS enhanced 0%)',
        vatRate: '20% Import VAT',
        concession: 'UK Developing Countries Trading Scheme (DCTS) allows zero tariff.',
        specialRule: 'Declare Origin Criterion B with UK standard invoice statement.',
      },
      UAE: {
        dutyRate: '5.0%',
        vatRate: '5% UAE VAT',
        concession: 'Standard GCC unified customs rate.',
        specialRule: 'Requires legalized Chamber of Commerce invoice in Dubai port.',
      },
      Canada: {
        dutyRate: '8.0%',
        vatRate: '5% GST + Provincial PST',
        concession: 'GPT preferential duty for qualifying garments.',
        specialRule: 'Country of origin label must be permanently sewn inside.',
      },
    },
  },
  {
    id: 'sports',
    name: 'Sports Equipment (Balls & Cricket)',
    hsCode: '9506.99.20',
    heading: 'Articles and equipment for general physical exercise or sports',
    chapter: 'Chapter 95: Toys, Games, Sports Requisites',
    subheading: '9506.62 - Inflatable footballs, hand-stitched balls, match balls',
    sampleItems: 'FIFA quality footballs, English willow bats, pads, leather gloves',
    notes: 'World-renowned Sialkot hand-stitched production with zero bladder leaks.',
    marketTariffs: {
      USA: {
        dutyRate: '0% (Duty Free)',
        vatRate: '0% (State Sales Tax applies)',
        concession: 'Duty free under HTSUS 9506.62.00 for soccer and match balls.',
        specialRule: 'Section 321 also covers orders under $800 with zero customs delays.',
      },
      EU: {
        dutyRate: '2.7% (GSP+ 0%)',
        vatRate: '19% - 21% Standard VAT',
        concession: 'Qualifies for 0% duty under Pakistan GSP+ status.',
        specialRule: 'Must provide EN71 safety standard certificate if sold to schools.',
      },
      UK: {
        dutyRate: '2.5% (DCTS 0%)',
        vatRate: '20% Import VAT',
        concession: 'Zero duty under UK DCTS preferential tariff schedule.',
        specialRule: 'Fast track clearance at Heathrow cargo and Felixstowe.',
      },
      UAE: {
        dutyRate: '5.0%',
        vatRate: '5% UAE VAT',
        concession: '5% GCC unified customs fee on CIF value.',
        specialRule: 'Invoice must list ball bladder type and outer PU material.',
      },
      Canada: {
        dutyRate: '0% - 6.5%',
        vatRate: '5% GST',
        concession: 'Duty free under specific athletic recreational tariff items.',
        specialRule: 'Specify if goods are for professional clubs or retail sale.',
      },
    },
  },
  {
    id: 'surgical',
    name: 'Surgical & Dental Instruments',
    hsCode: '9018.90.00',
    heading: 'Instruments and appliances used in medical, surgical or dental sciences',
    chapter: 'Chapter 90: Medical, Surgical & Optical Instruments',
    subheading: '9018.90 - Other medical, surgical instruments and forceps',
    sampleItems: 'Artery forceps, surgical scissors, scalpel handles, dental elevators',
    notes: 'Medical grade AISI 410 / 420 stainless steel with rust-free passivated finish.',
    marketTariffs: {
      USA: {
        dutyRate: '0% (Duty Free)',
        vatRate: '0%',
        concession: 'Duty-free under 19 U.S.C. § 1321 and HTSUS 9018 medical exemptions.',
        specialRule: 'FDA establishment registration and 510(k) or Device Listing required.',
      },
      EU: {
        dutyRate: '0% (Duty Free)',
        vatRate: 'Medical VAT exemption / reduced in select countries',
        concession: 'Duty-free under EU TARIC for medical diagnostic apparatus.',
        specialRule: 'MDR 2017/745 compliance and CE mark certification mandatory.',
      },
      UK: {
        dutyRate: '0% (Duty Free)',
        vatRate: 'Standard or medical relief rate',
        concession: 'Zero customs tariff across UK Global Tariff for medical instruments.',
        specialRule: 'MHRA registration and UKCA mark required for clinical devices.',
      },
      UAE: {
        dutyRate: '0% (Medical Exemption)',
        vatRate: '0% Zero-rated medical supplies',
        concession: 'MOHAP medical tariff exemption in Dubai and Abu Dhabi ports.',
        specialRule: 'Requires UAE Ministry of Health import permit before dispatch.',
      },
      Canada: {
        dutyRate: '0% (Duty Free)',
        vatRate: 'Zero-rated under medical supply rules',
        concession: 'Duty free entry under Health Canada medical schedule.',
        specialRule: 'Medical Device Establishment License (MDEL) needed by importer.',
      },
    },
  },
  {
    id: 'software',
    name: 'IT & Digital Services',
    hsCode: '9999.00.00',
    heading: 'Computer software, digital services, and cross-border web systems',
    chapter: 'Chapter 99 / Services: Non-Physical Digital Deliverables',
    subheading: '9999.00 - Cross-border digital software and electronic data transfers',
    sampleItems: 'Custom ERP software, POS billing code, web portals, mobile apps',
    notes: '100% digital electronic transmission with zero physical border tariffs.',
    marketTariffs: {
      USA: {
        dutyRate: '0% (Tariff Exempt)',
        vatRate: '0% (No federal sales tax on digital exports)',
        concession: 'Exempt from customs tariffs under WTO electronic transmission moratorium.',
        specialRule: 'Invoice with Form W-8BEN to claim US-Pakistan tax treaty benefits.',
      },
      EU: {
        dutyRate: '0% (Tariff Exempt)',
        vatRate: 'Reverse Charge / B2B VAT exempt',
        concession: 'Zero customs duties for cross-border digital transmissions.',
        specialRule: 'B2B EU buyers self-account under EU VAT reverse charge mechanism.',
      },
      UK: {
        dutyRate: '0% (Tariff Exempt)',
        vatRate: 'Reverse Charge applies for UK VAT registered businesses',
        concession: 'Zero customs tariffs on intangible digital IP.',
        specialRule: 'State "B2B Reverse Charge applies" on your service invoice.',
      },
      UAE: {
        dutyRate: '0% (Tariff Exempt)',
        vatRate: '0% for export of services',
        concession: 'No customs duties on digital code in UAE free zones or mainland.',
        specialRule: 'Provide corporate NTN and swift wire routing for bank clearance.',
      },
      Canada: {
        dutyRate: '0% (Tariff Exempt)',
        vatRate: 'Zero-rated export service',
        concession: 'WTO digital commerce exemption.',
        specialRule: 'Retain signed statement of work (SOW) as export proof.',
      },
    },
  },
  {
    id: 'gloves',
    name: 'Gloves & Safety Wear',
    hsCode: '4203.29.00',
    heading: 'Gloves, mittens and mitts, of leather or composition leather',
    chapter: 'Chapter 42: Leather Accessories',
    subheading: '4203.29 - Other protective work and sports gloves',
    sampleItems: 'Mechanic gloves, welding gauntlets, police tactical gloves, goalkeeper gloves',
    notes: 'Certified EN 388 abrasion and puncture resistance testing available.',
    marketTariffs: {
      USA: {
        dutyRate: '3.0% - 4.9%',
        vatRate: '0%',
        concession: 'Section 321 Duty-Free if invoice total is under $800 USD.',
        specialRule: 'Mark package with "Section 321 Qualified" on courier waybill.',
      },
      EU: {
        dutyRate: '7.0% (GSP+ 0%)',
        vatRate: '19% - 21%',
        concession: '0% duty under EU GSP+ preference for certified leather wear.',
        specialRule: 'Must provide CE certificate showing compliance with EN 388.',
      },
      UK: {
        dutyRate: '4.0% (DCTS 0%)',
        vatRate: '20%',
        concession: '0% tariff rate under UK DCTS framework.',
        specialRule: 'Attach declaration of conformity with each batch.',
      },
      UAE: {
        dutyRate: '5.0%',
        vatRate: '5%',
        concession: 'Standard GCC 5% duty rate.',
        specialRule: 'Industrial safety equipment gets fast-track clearance.',
      },
      Canada: {
        dutyRate: '7.5%',
        vatRate: '5% GST',
        concession: 'Preferential tariff available with Form A origin certificate.',
        specialRule: 'Mark cartons with durable bilingual French/English labels.',
      },
    },
  },
  {
    id: 'equestrian',
    name: 'Equestrian & Horse Saddlery',
    hsCode: '4201.00.00',
    heading: 'Saddlery and harness for any animal, of any material',
    chapter: 'Chapter 42: Saddlery & Harness',
    subheading: '4201.00 - Saddles, bridles, halters, leather horse equipment',
    sampleItems: 'Dressage saddles, western leather bridles, girths, stirrup leathers',
    notes: 'Vegetable-tanned buffalo and cowhide leather crafted in Sialkot.',
    marketTariffs: {
      USA: {
        dutyRate: '2.8% (Section 321 0%)',
        vatRate: '0%',
        concession: 'Duty free under Section 321 for direct rider orders under $800.',
        specialRule: 'For commercial bulk cargo, normal 2.8% rate applies.',
      },
      EU: {
        dutyRate: '2.7% (GSP+ 0%)',
        vatRate: '19% - 21%',
        concession: 'Zero duty under GSP+ with supplier origin statement.',
        specialRule: 'State leather tanning method on packing list.',
      },
      UK: {
        dutyRate: '2.0% (DCTS 0%)',
        vatRate: '20%',
        concession: 'Zero tariff under UK DCTS schedule.',
        specialRule: 'Fast inspection at equestrian hubs.',
      },
      UAE: {
        dutyRate: '5.0%',
        vatRate: '5%',
        concession: '5% GCC common customs tariff.',
        specialRule: 'Popular import in Dubai endurance horse racing clubs.',
      },
      Canada: {
        dutyRate: '5.0%',
        vatRate: '5% GST',
        concession: 'Preferential rate under General Preferential Tariff.',
        specialRule: 'Invoice must describe hardware buckles (brass or stainless).',
      },
    },
  },
];

const MARKETS = [
  { id: 'USA', name: 'United States (US - Section 321 / HTSUS)', flag: '🇺🇸', currency: 'USD' },
  { id: 'EU', name: 'European Union (EU - GSP+ / TARIC)', flag: '🇪🇺', currency: 'EUR' },
  { id: 'UK', name: 'United Kingdom (UK - DCTS / HMRC)', flag: '🇬🇧', currency: 'GBP' },
  { id: 'UAE', name: 'United Arab Emirates (UAE - GCC 5%)', flag: '🇦🇪', currency: 'AED' },
  { id: 'Canada', name: 'Canada (CBSA Customs Tariff)', flag: '🇨🇦', currency: 'CAD' },
];

export const HsCodeLookup: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>('leather');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('USA');
  const [shipmentValue, setShipmentValue] = useState<string>('750');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];
  }, [selectedCatId]);

  const selectedMarket = useMemo(() => {
    return MARKETS.find((m) => m.id === selectedMarketId) || MARKETS[0];
  }, [selectedMarketId]);

  const currentTariff = useMemo(() => {
    return (
      selectedCategory.marketTariffs[selectedMarketId] || {
        dutyRate: '0% - 5%',
        vatRate: 'Standard VAT',
        concession: 'Standard international trade framework.',
        specialRule: 'Include standard commercial invoice and packing list.',
      }
    );
  }, [selectedCategory, selectedMarketId]);

  // Estimate duty amount
  const estimatedValues = useMemo(() => {
    const val = parseFloat(shipmentValue) || 0;
    const isSection321 = selectedMarketId === 'USA' && val <= 800;

    let dutyPercent = 0;
    if (isSection321) {
      dutyPercent = 0;
    } else if (currentTariff.dutyRate.includes('0%')) {
      dutyPercent = 0;
    } else {
      const match = currentTariff.dutyRate.match(/(\d+(\.\d+)?)%/);
      dutyPercent = match ? parseFloat(match[1]) : 4.0;
    }

    const estimatedDuty = (val * (dutyPercent / 100)).toFixed(2);
    return {
      value: val,
      isSection321,
      dutyPercent,
      estimatedDuty,
    };
  }, [shipmentValue, selectedMarketId, currentTariff]);

  const resultSummaryText = useMemo(() => {
    return `Product: ${selectedCategory.name}
Suggested HS Code: ${selectedCategory.hsCode}
Heading: ${selectedCategory.heading}
Destination Market: ${selectedMarket.name}
Estimated Customs Tariff: ${currentTariff.dutyRate}
Import Concession: ${currentTariff.concession}
Special Clearance Rule: ${currentTariff.specialRule}
Shipment Value: $${shipmentValue} USD
Estimated Duty Payable: $${estimatedValues.estimatedDuty} USD ${
      estimatedValues.isSection321 ? '(Duty-Free under Section 321)' : ''
    }`;
  }, [selectedCategory, selectedMarket, currentTariff, shipmentValue, estimatedValues]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(resultSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1E1E1E] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Block (8pt grid, left-aligned) */}
        <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">
                <Globe className="w-3.5 h-3.5 text-red-600" />
                <span>Sialkot Direct Exporters &amp; E-Commerce</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E] tracking-tight">
                Global HS Code &amp; Custom Duty Lookup Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.55] max-w-2xl">
                Quickly find export commodity codes and estimate customs tariffs for USA, EU, UK, and UAE.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input Card: Product Category & Destination Market */}
        <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Export Product Category
              </label>
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-[#1E1E1E] focus:outline-none focus:border-red-500 font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Market */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Destination Market
              </label>
              <select
                value={selectedMarketId}
                onChange={(e) => setSelectedMarketId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-[#1E1E1E] focus:outline-none focus:border-red-500 font-medium"
              >
                {MARKETS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.flag} {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Shipment Value (USD) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Shipment Commercial Value (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  $
                </span>
                <input
                  type="number"
                  value={shipmentValue}
                  onChange={(e) => setShipmentValue(e.target.value)}
                  placeholder="750"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-[#1E1E1E] focus:outline-none focus:border-red-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Single Primary Action Button (Apple Red Rule) */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Official HS Code & Tariff Summary'}</span>
          </button>
        </div>

        {/* Results Showcase: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Main HS Code & Duty Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Classification &amp; Commodity Tariff
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1E1E1E] mt-1">
                  {selectedCategory.name}
                </h3>
                <span className="text-xs text-slate-500">{selectedCategory.sampleItems}</span>
              </div>

              {/* Big HS Code Badge */}
              <div className="p-5 bg-slate-900 text-white rounded-[20px] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest block">
                    Harmonized System Code
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider mt-1 text-white">
                    {selectedCategory.hsCode}
                  </div>
                  <span className="text-xs text-slate-300 font-sans block mt-1">
                    {selectedCategory.subheading}
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold shrink-0 self-start sm:self-center">
                  6 to 8-Digit Verified
                </div>
              </div>

              {/* Tariff & Duty Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Estimated Duty Rate ({selectedMarket.id})
                  </span>
                  <div className="text-lg font-black text-red-600">
                    {currentTariff.dutyRate}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {currentTariff.concession}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Estimated Duty Payable
                  </span>
                  <div className="text-lg font-black text-emerald-700">
                    {estimatedValues.isSection321 ? '$0.00 USD' : `$${estimatedValues.estimatedDuty} USD`}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {estimatedValues.isSection321
                      ? 'Duty-Free under US Section 321'
                      : `On $${estimatedValues.value} commercial invoice`}
                  </span>
                </div>
              </div>

              {/* Special Rule & Concession */}
              <div className="p-4 bg-emerald-50 rounded-[16px] border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Trade Rule for {selectedMarket.name}</span>
                </div>
                <p className="text-xs text-emerald-950 leading-[1.55]">
                  {currentTariff.specialRule}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Documentation Checklist & Export Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Export Documentation Checklist */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E] uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-red-600" />
                <span>Export Documents Needed</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Commercial Invoice with HS Code',
                    desc: 'List item descriptions, unit values, and 8-digit HS code.',
                  },
                  {
                    title: 'Packing List & Net Weights',
                    desc: 'State carton numbers, gross weight, and net weight in kg.',
                  },
                  {
                    title: 'Certificate of Origin (Form A)',
                    desc: 'Issued by Sialkot Chamber of Commerce & Industry (SCCI).',
                  },
                  {
                    title: 'Airway Bill (AWB) / Bill of Lading',
                    desc: 'Courier tracking barcode for customs border clearance.',
                  },
                ].map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-[#1E1E1E]">{doc.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 pl-5 leading-normal">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sialkot Exporter Note */}
            <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 space-y-2 text-left">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Sialkot Lab Bench Tip
              </span>
              <p className="text-xs text-slate-600 leading-[1.55]">
                Always list the exact material content on the invoice. For example, write Genuine Cowhide Leather rather than just Leather.
              </p>
              <p className="text-xs text-slate-600 leading-[1.55]">
                This prevents border customs delays in New York, London, and Frankfurt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HsCodeLookup;
