import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Barcode, 
  Monitor, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  ChevronDown,
  Layers,
  HelpCircle,
  Building2,
  Wrench,
  DollarSign
} from 'lucide-react';
import { sialkotHardwareHub, LocalProduct } from '../../data/hyperlocalData';
import { WhatsAppOrderButton } from './WhatsAppOrderButton';

interface HyperlocalLandingPageProps {
  onNavigatePage?: (page: string) => void;
  onOpenQuote?: (title: string) => void;
}

export const HyperlocalLandingPage: React.FC<HyperlocalLandingPageProps> = ({
  onNavigatePage,
  onOpenQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const hub = sialkotHardwareHub;

  // Filter products by category
  const categories = ['all', 'Thermal Printers', 'Barcode Scanners', 'Touch Terminals', 'Cash Drawers'];
  const filteredProducts = selectedCategory === 'all'
    ? hub.featuredHardware
    : hub.featuredHardware.filter((p) => p.category === selectedCategory);

  // Set document title & inject LocalBusiness JSON-LD schema
  useEffect(() => {
    document.title = hub.metaTitle;

    const schemaId = 'sialkot-pos-hardware-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': ['ComputerStore', 'LocalBusiness'],
      'name': 'Evonix Sialkot POS Hardware & Thermal Printer Depot',
      'description': hub.metaDescription,
      'image': 'https://www.evonixtec.com/og-image.jpg',
      'url': 'https://www.evonixtec.com/locations/sialkot/pos-hardware',
      'telephone': hub.contactPhone,
      'priceRange': 'PKR 8,500 - 68,000',
      'currenciesAccepted': 'PKR',
      'paymentAccepted': 'Cash on Delivery, Bank Transfer, JazzCash, EasyPaisa',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': hub.officeAddress.street,
        'addressLocality': hub.officeAddress.city,
        'addressRegion': 'Punjab',
        'postalCode': hub.officeAddress.postalCode,
        'addressCountry': hub.officeAddress.country,
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': hub.coordinates.lat,
        'longitude': hub.coordinates.lng,
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '20:00',
        },
      ],
      'areaServed': [
        { '@type': 'City', 'name': 'Sialkot' },
        { '@type': 'City', 'name': 'Daska' },
        { '@type': 'City', 'name': 'Sambrial' },
        { '@type': 'City', 'name': 'Ugoki' },
        { '@type': 'City', 'name': 'Pasrur' },
        { '@type': 'City', 'name': 'Wazirabad' },
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Sialkot POS Hardware Ready Stock',
        'itemListElement': hub.featuredHardware.map((item, index) => ({
          '@type': 'Offer',
          'position': index + 1,
          'itemOffered': {
            '@type': 'Product',
            'name': item.name,
            'sku': item.sku,
            'category': item.category,
            'offers': {
              '@type': 'Offer',
              'price': item.pricePKR.replace(/[^0-9]/g, ''),
              'priceCurrency': 'PKR',
              'availability': 'https://schema.org/InStock',
              'seller': {
                '@type': 'Organization',
                'name': 'Evonix Technologies Sialkot',
              },
            },
          },
        })),
      },
    };

    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      // Clean up schema on unmount if navigating elsewhere
      const existing = document.getElementById(schemaId);
      if (existing) {
        existing.remove();
      }
    };
  }, [hub]);

  const faqs = [
    {
      q: 'How fast is delivery for POS hardware in Sialkot?',
      a: 'Orders placed before 4:00 PM are delivered directly to your shop or factory in Sialkot, Daska, or Sambrial within 2 to 4 hours via our local delivery fleet. Cash on Delivery (COD) is available upon receiving and testing the parcel.',
    },
    {
      q: 'Can I physically inspect and test the thermal printer before buying?',
      a: 'Yes, absolutely. You can visit our physical testing depot at Kotli Behram (Defense Road / Sialkot Bypass) to test print speeds, cutter mechanisms, and scanner decoders with your own laptop or sample invoices before purchase.',
    },
    {
      q: 'What is your warranty policy in Sialkot?',
      a: 'All our hardware comes with a 1-Year Local Replacement Warranty backed directly by our Sialkot engineering lab. Unlike online marketplaces where you have to courier items to Karachi or Lahore, you get immediate local support right here in Sialkot.',
    },
    {
      q: 'Will these printers and scanners work with our existing retail or ERP software?',
      a: 'Yes. All our printers run standard ESC/POS industry command sets and come with full Windows (7/8/10/11), Linux, and Android drivers. They work seamlessly with Candela, QuickBooks, Retail Pro, Evonix Export ERP, Excel, and custom web applications.',
    },
    {
      q: 'Do you also supply thermal paper rolls and barcode labels?',
      a: 'Yes. We stock high-sensitivity BPA-free 80mm x 70m thermal rolls, 58mm receipts, and 4x6" export shipping labels in carton quantities at direct wholesale depot rates.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      
      {/* 1. TOP EMERGENCY TRUST TICKER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 border-b border-emerald-500/30 text-emerald-200 text-xs font-medium py-2.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white tracking-wide uppercase text-[11px] sm:text-xs">
              Sialkot B2B Depot Active:
            </span>
            <span>Same-Day 2–4 Hour Dispatch across Sialkot City, Defense Rd, Paris Rd & Daska</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-emerald-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Cash on Delivery (COD)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              1-Year Sialkot Warranty
            </span>
          </div>
        </div>
      </div>

      {/* 2. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
          <ol className="flex items-center space-x-2 flex-wrap">
            <li>
              <button 
                onClick={() => onNavigatePage ? onNavigatePage('home') : window.location.assign('/')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li><span className="text-slate-600">/</span></li>
            <li>
              <button 
                onClick={() => onNavigatePage ? onNavigatePage('locations') : window.location.assign('/locations')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Locations
              </button>
            </li>
            <li><span className="text-slate-600">/</span></li>
            <li>
              <span className="text-slate-300 font-medium">Sialkot</span>
            </li>
            <li><span className="text-slate-600">/</span></li>
            <li className="text-emerald-400 font-bold" aria-current="page">
              POS Hardware Depot
            </li>
          </ol>
        </nav>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-14 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sialkot B2B Hardware Depot • Importer Rates</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              POS Hardware &amp; Thermal Receipt Printers in Sialkot
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Buy 80mm &amp; 58mm thermal receipt printers, wireless barcode scanners, and touch POS systems in Sialkot. 
              Enjoy <strong className="text-emerald-400 font-semibold">1-year local replacement warranty</strong>, physical on-site testing at Kotli Behram, and <strong className="text-emerald-400 font-semibold">instant Same-Day Cash on Delivery</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Local Stock</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${hub.contactPhone}`}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Depot: {hub.contactPhone}</span>
              </a>

              {onOpenQuote && (
                <button
                  type="button"
                  onClick={() => onOpenQuote('Sialkot Bulk POS Hardware Request')}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Request Bulk Quotation
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="block text-xl font-black text-emerald-400">2–4 Hrs</span>
                <span className="text-[11px] text-slate-400 font-medium">Sialkot Dispatch</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="block text-xl font-black text-emerald-400">1-Year</span>
                <span className="text-[11px] text-slate-400 font-medium">Local Warranty</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="block text-xl font-black text-emerald-400">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Pre-Tested Units</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="block text-xl font-black text-emerald-400">COD</span>
                <span className="text-[11px] text-slate-400 font-medium">Pay on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR TRUST PILLARS */}
      <section className="py-12 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Sialkot Retailers &amp; Exporters Choose Our Depot
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Eliminating the delays, broken promises, and shipping hassles of out-of-city vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Same-Day Local Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Order before 4 PM for doorstep delivery in Sialkot, Daska, or Sambrial. Pay cash only after inspecting your equipment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">1-Year Local Replacement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero shipping hassle to Karachi or Lahore. If any hardware unit fails, walk into our Sialkot lab for instant replacement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Physical Depot in Kotli Behram</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We are not a drop-shipper. Visit our physical test bench on Defense Road to see live demonstrations and sample test prints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Free Driver &amp; ERP Setup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every unit includes ready ESC/POS drivers, USB cables, test rolls, and remote or on-site setup assistance for your billing software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE INVENTORY CATALOG */}
      <section id="catalog" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Layers className="w-4 h-4" />
                <span>Verified Ready Stock</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Available POS Hardware in Sialkot Depot
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                All models are in-stock locally, pre-configured with ESC/POS drivers, and ready for immediate Same-Day dispatch.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Hardware' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-emerald-950/20 group"
              >
                <div>
                  {/* Top Status & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      In Stock • Sialkot Depot
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      SKU: {product.sku}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Price Tag */}
                  <div className="mt-3 mb-4 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-400">
                      {product.pricePKR}
                    </span>
                    <span className="text-xs text-slate-400">
                      (Same-Day COD)
                    </span>
                  </div>

                  {/* Specs Bullets */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Specifications:
                    </span>
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action & Direct WhatsApp Button */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <WhatsAppOrderButton
                    product={product}
                    whatsappNumber={hub.whatsappNumber}
                    buttonText="Order via WhatsApp (Instant COD)"
                  />
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span>Warranty: 1 Year Local</span>
                    <span>Dispatch: 2–4 Hours</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sialkot Bulk Corporate Orders Note */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">
                Equipping a Chain of Stores or Industrial Factory in Sialkot?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                We offer bulk corporate pricing, GST/NTN invoices, and on-site multi-counter installation packages.
              </p>
            </div>
            {onOpenQuote && (
              <button
                type="button"
                onClick={() => onOpenQuote('Corporate Chain POS Installation Package')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                Get Corporate Quote
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 6. PHYSICAL DEPOT LOCATION & CONTACT DETAILS */}
      <section className="py-14 bg-slate-900/60 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Depot Address & Details */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Physical Walk-In Depot
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Visit Our Sialkot Testing &amp; Hardware Lab
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Bring your business laptop or billing software to test print alignment, auto-cutter speed, and barcode sensitivity before you buy.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Depot Location</span>
                    <span className="text-sm font-bold text-white">
                      {hub.officeAddress.street}, {hub.officeAddress.area}, {hub.officeAddress.city} {hub.officeAddress.postalCode}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Convenient access from Paris Road, Defense Road &amp; Sialkot Bypass.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Direct Phone</span>
                      <a href={`tel:${hub.contactPhone}`} className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                        {hub.contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Opening Hours</span>
                      <span className="text-sm font-bold text-white">Mon–Sat: 9 AM – 8 PM</span>
                      <span className="text-[11px] text-emerald-400 block font-medium">Sunday On-Call Dispatch</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-300 font-bold block">Service Coverage Radius</span>
                    <span className="text-sm text-slate-200">
                      Up to {hub.serviceRadiusKm} km: Sialkot City, Daska, Sambrial, Ugoki, Small Industrial Estate
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${hub.whatsappNumber}?text=${encodeURIComponent('Hello Evonix Depot, I want directions to your Sialkot testing lab at Kotli Behram.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Get Live Location on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onNavigatePage && (
                  <button
                    onClick={() => onNavigatePage('contact')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View Contact Directory
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Map Visual & Area Highlights */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Sialkot Field Dispatch Zones
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">2–4 Hr COD</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">1. Sialkot City &amp; Cantt</span>
                  <span className="text-emerald-400 font-bold">1–2 Hours Delivery</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">2. Paris Road, Defense Road &amp; Bypass</span>
                  <span className="text-emerald-400 font-bold">Instant Walk-In / 1 Hr</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">3. Small Industrial Estate &amp; Shahabpura</span>
                  <span className="text-emerald-400 font-bold">2 Hours Delivery</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">4. Daska, Sambrial &amp; Ugoki</span>
                  <span className="text-emerald-400 font-bold">2–4 Hours Delivery</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">Cash on Delivery Policy:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Our rider brings the sealed hardware directly to your counter. You can inspect the package, power on the test unit, and pay cash directly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sialkot POS Hardware FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Common questions answered about delivery timelines, drivers, and local warranty in Sialkot.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CONVERSION ACTION */}
      <section className="py-12 bg-gradient-to-t from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Need POS Equipment Dispatched in Sialkot Today?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Message our Sialkot warehouse on WhatsApp for instant stock reservation, Same-Day COD delivery confirmation, or on-site demo booking.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${hub.whatsappNumber}?text=${encodeURIComponent('Hello Evonix Sialkot Depot, I need POS hardware dispatched today.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-2"
            >
              <span>Instant WhatsApp Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${hub.contactPhone}`}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              Call {hub.contactPhone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
