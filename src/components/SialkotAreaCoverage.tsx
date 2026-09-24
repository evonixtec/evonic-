import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, Wrench, MessageSquare, Phone, CheckCircle2, ArrowRight, Building2, Users } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { EvonixMark } from './EvonixLogo';

interface AreaHub {
  id: string;
  name: string;
  urduName: string;
  focusIndustries: string;
  dispatchEta: string;
  distanceFromCanttLab: string;
  assignedEngineer: string;
  activeDeployments: number;
  featuredClients: string[];
  keyServices: string[];
  highlight: string;
}

const SIALKOT_HUBS: AreaHub[] = [
  {
    id: 'daska-road',
    name: 'Daska Road Industrial Belt',
    urduName: 'ڈسکہ روڈ صنعتی علاقہ',
    focusIndustries: 'Surgical Instruments, Veterinary Tools, Heavy Forging, Engineering Units',
    dispatchEta: '35 - 45 Minutes',
    distanceFromCanttLab: '8.4 km',
    assignedEngineer: 'Tariq Mehmood (Chief Hardware & Micro-Soldering)',
    activeDeployments: 42,
    featuredClients: ['Al-Madina Surgical Instruments', 'Zenith Medico International', 'Falcon Medical Tools'],
    keyServices: ['Doorstep Laptop Motherboard Repair', 'Factory Production ERP', 'Industrial Fiber LAN Setup', 'Laser Printer Maintenance'],
    highlight: 'Dedicated rapid dispatch unit stationed for surgical export factories with 60-minute emergency cutoff guarantee.',
  },
  {
    id: 'rangpura',
    name: 'Rangpura & Commissioner Road',
    urduName: 'رنگپورہ اور کمشنر روڈ',
    focusIndustries: 'Leather Apparel, Motorcycle Gear, Tanneries, High-Footfall Retail Bazars',
    dispatchEta: '20 - 30 Minutes',
    distanceFromCanttLab: '3.8 km',
    assignedEngineer: 'Shahzaib Akhtar (Enterprise Solutions Architect)',
    activeDeployments: 56,
    featuredClients: ['Crown Leather Craft', 'Royal Heritage Garments', 'Apex Gloves Manufacturing'],
    keyServices: ['Retail POS Offline Billing Systems', 'B2B Leather Export Portals', 'Thermal Receipt Printer Repair', 'Security CCTV Cameras'],
    highlight: 'Immediate on-site service for retail shop checkout counters and motorcycle jacket export manufacturing offices.',
  },
  {
    id: 'small-industrial-estate',
    name: 'Small Industrial Estate (SIE 1 & 2)',
    urduName: 'سمال انڈسٹریل اسٹیٹ',
    focusIndustries: 'Sports Goods, Soccer Balls, Martial Arts Uniforms, Boxing Equipment',
    dispatchEta: '25 - 35 Minutes',
    distanceFromCanttLab: '5.2 km',
    assignedEngineer: 'Engr. Haroon Rasheed (Principal Web Architect)',
    activeDeployments: 68,
    featuredClients: ['Apex Combat & Teamwear', 'Prime Sportswear Sialkot', 'Vanguard Martial Arts Gear'],
    keyServices: ['3D Teamwear Uniform Configurators', 'Barcode Inventory Software', 'Multi-Store Cloud ERP', 'Workstation Fleet Care'],
    highlight: 'Comprehensive IT infrastructure partner for international ISO-certified sports apparel exporters.',
  },
  {
    id: 'paris-road',
    name: 'Paris Road Commercial Corridor',
    urduName: 'پیرس روڈ کمرشل کوریڈور',
    focusIndustries: 'Corporate Financial Offices, Law Firms, Customs Clearing Agents, Trade Consultancies',
    dispatchEta: '15 - 20 Minutes',
    distanceFromCanttLab: '2.1 km',
    assignedEngineer: 'Farhan Ali (Senior Database & Network Specialist)',
    activeDeployments: 74,
    featuredClients: ['Sialkot Clearing & Forwarding Agency', 'Prime Corporate Law Chambers', 'Universal Exchange Hub'],
    keyServices: ['Corporate E-Commerce Portals', 'Enterprise Database Migration', 'Fast NVMe Workstation Upgrades', 'Executive Laptop Servicing'],
    highlight: 'Fastest 15-minute response corridor right across central banking, chamber of commerce, and customs clearing buildings.',
  },
  {
    id: 'sialkot-cantt',
    name: 'Sialkot Cantt (Main Lab & HQ Hub)',
    urduName: 'سیالکوٹ کینٹ',
    focusIndustries: 'Corporate Headquarters, Residential Executives, Medical Centers, Defence Offices',
    dispatchEta: '10 - 15 Minutes (Instant Walk-in)',
    distanceFromCanttLab: 'Central Hub (0 km)',
    assignedEngineer: 'Full Lab Engineering Team (Dubai Certified)',
    activeDeployments: 95,
    featuredClients: ['Cantt Medical Diagnostics Lab', 'Premier Logistics Cantt', 'Executive Residence Estates'],
    keyServices: ['Walk-in Diagnostic Stereo Microscope Lab', 'Ultrasonic Liquid Spill Recovery', 'Same-Day Chip-Level Repair', 'Bespoke Software Architecture'],
    highlight: 'Our central diagnostic facility equipped with stereo microscopes, BGA rework stations, and DC current-limited power supplies.',
  },
  {
    id: 'sambrial-dryport',
    name: 'Sambrial & Dry Port Area',
    urduName: 'سمبڑیال اور ڈرائی پورٹ',
    focusIndustries: 'Dry Port Logistics, Cargo Warehousing, Customs Brokerages, Carton Packaging',
    dispatchEta: '35 - 50 Minutes',
    distanceFromCanttLab: '14.6 km',
    assignedEngineer: 'Shahbaz Hussain (Industrial Hardware & Network)',
    activeDeployments: 31,
    featuredClients: ['Dry Port Logistics Express', 'Sialkot Cargo Services', 'Green Packaging Works'],
    keyServices: ['Industrial Barcode Label Printing', 'Warehouse Inventory Scanning', 'Long-Range Wireless Bridge', 'Rugged Workstation Maintenance'],
    highlight: 'High-availability logistics and cargo IT support ensuring customs shipping manifests never suffer downtime.',
  },
  {
    id: 'defence-road-ugoki',
    name: 'Defence Road & Ugoki Industrial Zone',
    urduName: 'ڈیفنس روڈ اور اگوکی',
    focusIndustries: 'Textile Weaving, Sports Accessories, Surgical Forging Subcontractors',
    dispatchEta: '30 - 45 Minutes',
    distanceFromCanttLab: '9.2 km',
    assignedEngineer: 'Tariq Mehmood (Hardware Field Division)',
    activeDeployments: 38,
    featuredClients: ['Ugoki Forging Engineering', 'Defence Road Textile Mills', 'Eastern Sports Accessories'],
    keyServices: ['Subcontractor Gatepass ERP', 'Factory Dust-Proof PC Cabinets', 'Motherboard Power Surge Restoration', 'POS Setup'],
    highlight: 'On-site industrial servicing tailored to protect delicate silicon electronics from metallic abrasive dust.',
  },
  {
    id: 'hunterpura-kashmir-road',
    name: 'Hunterpura & Kashmir Road',
    urduName: 'ہنٹر پورہ اور کشمیر روڈ',
    focusIndustries: 'Commercial Retail Malls, Wholesale Leather Stores, Electronics Outlets, Clinics',
    dispatchEta: '20 - 30 Minutes',
    distanceFromCanttLab: '4.5 km',
    assignedEngineer: 'Farhan Ali (Retail Solutions Specialist)',
    activeDeployments: 49,
    featuredClients: ['Kashmir Road Pharmacy Mart', 'Hunterpura Wholesale Shoes', 'Galaxy Mobile Care'],
    keyServices: ['Thermal POS Cash Register Setup', 'Wholesale B2B Billing Software', 'Desktop & Laptop Fast Servicing', 'CCTV Security'],
    highlight: 'Seamless billing and hardware repair keeping Kashmir Road retailers operating at full checkout capacity.',
  },
];

interface SialkotAreaCoverageProps {
  onOpenQuote?: (serviceTitle?: string) => void;
}

export const SialkotAreaCoverage: React.FC<SialkotAreaCoverageProps> = ({ onOpenQuote }) => {
  const [selectedHub, setSelectedHub] = useState<AreaHub>(SIALKOT_HUBS[0]);

  const handleBookArea = (areaName: string) => {
    if (onOpenQuote) {
      onOpenQuote(`Doorstep On-Site IT Engineer Visit in ${areaName}, Sialkot`);
    }
  };

  return (
    <section id="sialkot-areas" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Sialkot Citywide Direct On-Site Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Direct On-Site Engineering Across All Sialkot Hubs
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            From surgical manufacturing plants on Daska Road and leather workshops in Rangpura to commercial offices on Paris Road and logistics units at Sambrial Dry Port. Certified EVONIX engineers arrive at your facility with professional diagnostic equipment.
          </p>
        </div>

        {/* Interactive Hub Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SIALKOT_HUBS.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-red-100' : 'text-red-600'}`}>
                      {hub.dispatchEta}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold line-clamp-1 leading-snug">
                    {hub.name}
                  </h4>
                  <span className={`text-[11px] font-urdu block mt-0.5 ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                    {hub.urduName}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-current/15 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-red-100' : 'text-slate-500'}>{hub.distanceFromCanttLab}</span>
                  <span className="font-semibold">{hub.activeDeployments}+ Clients</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Area Information Showcase Card */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Core Area Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 font-bold">
                    ETA: {selectedHub.dispatchEta}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium">
                    Distance: {selectedHub.distanceFromCanttLab}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Rapid Mobile Lab Active
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedHub.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedHub.highlight}
                </p>
              </div>

              {/* Focus Industries */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Primary Local Industries</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {selectedHub.focusIndustries}
                </p>
              </div>

              {/* Key Services Dispatched */}
              <div>
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  On-Site Services Available For This Zone
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedHub.keyServices.map((svc, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Engineer */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>Assigned Field Lead: <strong className="text-slate-900">{selectedHub.assignedEngineer}</strong></span>
                </div>
                <span className="text-slate-500">
                  Total Active Deployments: <strong className="text-slate-900">{selectedHub.activeDeployments}</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Featured Local Clients & Direct Dispatch Action */}
            <div className="lg:col-span-5 space-y-6">
              {/* Featured Clients Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Verified Local Clients & Partners in {selectedHub.name.split(' ')[0]}
                </h4>
                <div className="space-y-2">
                  {selectedHub.featuredClients.map((client, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-800">
                      <span className="font-semibold">{client}</span>
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Active Client
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  Read full technical field logs and diagnostic case studies in our technical guides section.
                </p>
              </div>

              {/* Immediate Dispatch Action Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md space-y-4">
                <div>
                  <span className="text-xs font-bold text-red-200 uppercase tracking-wider block">
                    Immediate Engineering Dispatch
                  </span>
                  <h4 className="text-lg font-extrabold mt-0.5">
                    Need a Technician at {selectedHub.name.split(' ')[0]} Today?
                  </h4>
                  <p className="text-xs text-red-100 mt-1 leading-relaxed">
                    Our mobile repair van carries precision SMD micro-soldering stations, digital multimeters, replacement thermal printer heads, and original laptop screens.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleBookArea(selectedHub.name)}
                    className="w-full py-3 px-4 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4 text-red-600" />
                    <span>Book Engineer to {selectedHub.name.split(' ')[0]}</span>
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Hello EVONIX, I need an urgent on-site technician visit in ${selectedHub.name}, Sialkot.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Urgent Dispatch ({selectedHub.dispatchEta})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
