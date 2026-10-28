import React, { useState, useMemo, useEffect } from 'react';
import { SHOP_PRODUCTS, COMPANY_INFO } from '../data/content';
import { ShopProduct } from '../types';
import { OptimizedImage } from './common/OptimizedImage';
import {
  ShoppingBag,
  Laptop,
  Printer,
  HardDrive,
  Search,
  MessageSquare,
  Check,
  Shield,
  Tag,
  Building2,
  UserCheck,
  Sparkles,
  ArrowRight,
  X,
  Cpu,
  Layers,
  Battery,
  Monitor,
  PhoneCall,
  Percent,
  Clock,
  Flame,
  CheckCircle2,
  TrendingDown,
  Calculator,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface ShopProps {
  onInquireProduct: (productName: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ onInquireProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Mode switch: 'b2c' shows 20% discounted prices in PKR; 'b2b' strictly hides all product prices on profile
  const [shopMode, setShopMode] = useState<'b2c' | 'b2b'>('b2c');
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(24);

  // Custom price calculator state for comparing Daraz/Market rate
  const [calculatorInput, setCalculatorInput] = useState<string>('90000');

  // Real-time Countdown Timer for 20% OFF Flash Promo
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Hardware', count: SHOP_PRODUCTS.length },
    {
      id: 'Laptops & PCs',
      label: 'Laptops (25 Models)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Laptops & PCs').length,
    },
    {
      id: 'Desktops & Workstations',
      label: 'Desktops & Towers (10)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Desktops & Workstations').length,
    },
    {
      id: 'Printers & Scanners',
      label: 'Printers & Receipts (10)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Printers & Scanners').length,
    },
    {
      id: 'POS Hardware',
      label: 'POS & Billing (10)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'POS Hardware').length,
    },
    {
      id: 'RAM Upgrades',
      label: 'RAM Upgrades (12)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'RAM Upgrades').length,
    },
    {
      id: 'SSD & Storage',
      label: 'SSD Solid State (14)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'SSD & Storage').length,
    },
    {
      id: 'Hard Disk Drives (HDD)',
      label: 'Hard Drives HDD (8)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Hard Disk Drives (HDD)').length,
    },
    {
      id: 'Keyboards & Mice',
      label: 'Keyboards & Mice (10)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Keyboards & Mice').length,
    },
    {
      id: 'Spare Parts & Accessories',
      label: 'Chargers & Parts (10)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Spare Parts & Accessories').length,
    },
  ];

  const laptopBrands = [
    { id: 'all', label: 'All Brands' },
    { id: 'HP', label: 'HP (7)' },
    { id: 'Dell', label: 'Dell (6)' },
    { id: 'Lenovo', label: 'Lenovo (6)' },
    { id: 'Sony VAIO', label: 'Sony VAIO (2)' },
    { id: 'Apple', label: 'Apple (2)' },
    { id: 'Asus', label: 'Asus (2)' },
    { id: 'Acer', label: 'Acer (1)' },
  ];

  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === 'all' ||
        product.brand === selectedBrand ||
        (selectedCategory !== 'Laptops & PCs' && selectedCategory !== 'all');
      const q = (searchQuery || '').toLowerCase().trim();
      const matchesSearch =
        !q ||
        (product.name || '').toLowerCase().includes(q) ||
        (product.description || '').toLowerCase().includes(q) ||
        (product.brand || '').toLowerCase().includes(q) ||
        (product.processor || '').toLowerCase().includes(q) ||
        (product.generation || '').toLowerCase().includes(q) ||
        (product.storage || '').toLowerCase().includes(q) ||
        product.specs.some((s) => s.toLowerCase().includes(q));

      return matchesCat && matchesBrand && matchesSearch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  // Schema.org ItemList & Product structured data for Google SEO
  const shopJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Evonix Technologies Hardware & Laptops Store Sialkot',
      description: 'Dubai direct import business laptops, printers, POS terminals, and computer parts in Sialkot with 20% discount in Pakistani Rupees.',
      url: 'https://store.evonixtec.com',
      numberOfItems: SHOP_PRODUCTS.length,
      itemListElement: SHOP_PRODUCTS.slice(0, 30).map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: prod.name,
          description: prod.description,
          image: prod.imageUrl ? `https://store.evonixtec.com${prod.imageUrl}` : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'PKR',
            price: prod.discountedPrice || 50000,
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2027-12-31',
          },
        },
      })),
    };
  }, []);

  const generateWhatsAppLink = (product: ShopProduct) => {
    let priceText = '';
    if (shopMode === 'b2c' && product.discountedPrice) {
      priceText = `Discounted Price: PKR ${product.discountedPrice.toLocaleString()} (20% OFF Market Rate)`;
    } else {
      priceText = 'Requirement: B2B Enterprise Quote / Bulk Procurement';
    }

    const text = `Hello evonix team,
I want to order this hardware in Sialkot:
Product: ${product.name}
Model/Specs: ${product.processor || product.specs[0]}
${product.storage ? `Storage: ${product.storage}` : ''}
${product.ram ? `RAM: ${product.ram}` : ''}
${priceText}
Condition: ${product.condition}

Please confirm stock and doorstep delivery time in Sialkot.`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Calculator comparison calculations
  const parsedCalcPrice = parseInt(calculatorInput.replace(/[^0-9]/g, ''), 10) || 90000;
  const calcEvonixPrice = Math.round(parsedCalcPrice * 0.8);
  const calcSavings = parsedCalcPrice - calcEvonixPrice;

  return (
    <section id="shop" className="py-16 md:py-24 bg-white border-b border-slate-200">
      {/* Dynamic SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-8 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
            <span>Dubai Direct Import • 100+ Hardware Items in Sialkot</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1E1E] tracking-tight text-left">
            Hardware, Laptops &amp; Equipment Store
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
            All prices in Pakistani Rupees (PKR). We stock certified business laptops, tower desktops, high-speed printers, RAM, and SSD upgrades with written warranties in Sialkot.
          </p>
        </div>

        {/* ========================================================
            POSTER 1: LIVE 20% OFF FLASH PROMO WITH COUNTDOWN TIMER
           ======================================================== */}
        <div className="mb-10 p-6 sm:p-8 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white rounded-[28px] shadow-lg relative overflow-hidden text-left">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_70%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Special Flash Offer • Promo Code: DUBAI20</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                20% OFF Direct Dubai Import Flash Sale
              </h2>

              <p className="text-xs sm:text-sm text-red-100 leading-[1.55]">
                Direct Dubai imports with zero middlemen. Every laptop, printer, and SSD is priced 20% lower than Daraz and local Pakistan retail.
              </p>
            </div>

            {/* Live Ticking Countdown Clock */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-4 sm:p-5 text-center shrink-0">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
                <span>Offer Closes In:</span>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="bg-black/40 border border-white/15 px-3 py-2 rounded-xl min-w-[56px]">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-red-200 uppercase font-bold">Hours</span>
                </div>

                <span className="text-2xl font-black text-white">:</span>

                <div className="bg-black/40 border border-white/15 px-3 py-2 rounded-xl min-w-[56px]">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-red-200 uppercase font-bold">Mins</span>
                </div>

                <span className="text-2xl font-black text-white">:</span>

                <div className="bg-black/40 border border-white/15 px-3 py-2 rounded-xl min-w-[56px]">
                  <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-red-200 uppercase font-bold">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            POSTER 2: B2C VS B2B PROFILE TOGGLE + MARKET SAVINGS BANNER
           ======================================================== */}
        <div className="mb-10 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-[28px] shadow-2xs text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>40-Point Sialkot Lab Test &amp; Written Bench Warranty</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E1E1E] tracking-tight">
                Compare Prices with Daraz &amp; Local Pakistan Market
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.55]">
                Example: A laptop selling for PKR 90,000 on Daraz costs only PKR 72,000 at our Sialkot lab. You save PKR 18,000 instantly.
              </p>
            </div>

            {/* Profile Mode Switcher */}
            <div className="bg-white p-2 rounded-[20px] border border-slate-200 shadow-2xs shrink-0">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                Catalog Display Mode:
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShopMode('b2c')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    shopMode === 'b2c'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>B2C Store (20% OFF in PKR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShopMode('b2b')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    shopMode === 'b2b'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>B2B Corporate Profile (No Prices)</span>
                </button>
              </div>

              {shopMode === 'b2b' && (
                <p className="text-[11px] text-slate-500 mt-2 px-2 leading-tight">
                  B2B Profile Mode active: Prices hidden on products. RFQ provided on request.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            POSTER 3: INTERACTIVE 20% SAVINGS ESTIMATOR
           ======================================================== */}
        <div className="mb-10 p-6 bg-slate-100/80 border border-slate-200 rounded-[24px] text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-600 shrink-0 shadow-2xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#1E1E1E]">
                  Quick 20% Savings Calculator
                </h4>
                <p className="text-xs text-slate-600">
                  Enter any Daraz or market price to see your Evonix discounted rate.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  PKR
                </span>
                <input
                  type="number"
                  aria-label="Enter market price in PKR"
                  value={calculatorInput}
                  onChange={(e) => setCalculatorInput(e.target.value)}
                  placeholder="90000"
                  className="pl-12 pr-3 py-2 w-36 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-red-500 shadow-2xs"
                />
              </div>

              <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 block text-[10px]">Your Evonix Price:</span>
                <span className="font-black text-red-600 text-sm">PKR {calcEvonixPrice.toLocaleString()}</span>
              </div>

              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                <span className="block text-[10px] text-emerald-600 font-bold">You Save:</span>
                <span className="font-black text-sm">PKR {calcSavings.toLocaleString()} (20% OFF)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="Search 100+ hardware products, laptops, RAM, SSD, or printers"
                placeholder="Search across 100+ products: Core i5, i7, 11th Gen, DDR4, SSD 512GB, HP, Dell, ThinkPad, Thermal Printers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayCount(24);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#1E1E1E] placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Item Count */}
            <div className="text-xs text-slate-500 font-semibold shrink-0">
              Showing <span className="font-bold text-[#1E1E1E]">{filteredProducts.length}</span> of {SHOP_PRODUCTS.length} hardware units
            </div>
          </div>

          {/* Main Category Tabs (All 9 Hardware Categories) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setDisplayCount(24);
                  if (cat.id !== 'Laptops & PCs' && cat.id !== 'all') {
                    setSelectedBrand('all');
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Laptop Brand Sub-filters (shown when Laptops or All is active) */}
          {(selectedCategory === 'all' || selectedCategory === 'Laptops & PCs') && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-[20px] flex items-center gap-2 overflow-x-auto text-left">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 px-2">
                Laptop Brand:
              </span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {laptopBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(brand.id);
                      setDisplayCount(24);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedBrand === brand.id
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid (100% Fluid & Responsive Grid Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => {
            const hasDiscount = Boolean(product.discountedPrice && product.marketPrice);

            return (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Product Hardware WebP Visual */}
                  <div className="relative">
                    {product.imageUrl && (
                      <OptimizedImage
                        src={product.imageUrl}
                        webpSrc={product.imageWebp}
                        alt={product.imageAlt || product.name}
                        aspectRatio="aspect-[16/10]"
                        badge={
                          product.featuredBadge ||
                          (product.condition.includes('Dubai')
                            ? 'Dubai Import'
                            : product.condition)
                        }
                        badgeColor={
                          product.condition.includes('Brand New')
                            ? 'emerald'
                            : product.condition.includes('Workstation')
                            ? 'amber'
                            : 'red'
                        }
                      />
                    )}

                    {/* 20% OFF Floating Sticker (in B2C mode) */}
                    {shopMode === 'b2c' && hasDiscount && (
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-black shadow-md">
                        20% OFF MARKET RATE
                      </div>
                    )}
                  </div>

                  <div className="p-6 text-left space-y-3">
                    {/* Brand Tag, Generation & Condition */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {product.brand || product.category}
                        </span>
                        {product.generation && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                            {product.generation}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {product.condition}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base sm:text-lg font-black text-[#1E1E1E] group-hover:text-red-600 transition-colors text-left leading-tight">
                      {product.name}
                    </h3>

                    {/* Processor & Storage Highlights */}
                    {(product.processor || product.storage || product.ram) && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                        {product.processor && (
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="truncate">{product.processor}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-slate-600 text-[11px]">
                          {product.ram && (
                            <span className="flex items-center gap-1">
                              <Layers className="w-3 h-3 text-emerald-600" />
                              {product.ram}
                            </span>
                          )}
                          {product.storage && (
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3 text-red-600" />
                              {product.storage}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description: simple short sentence */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-[1.55] text-left">
                      {product.description}
                    </p>

                    {/* Key Specs List */}
                    <div className="space-y-1.5 border-t border-slate-100 pt-3 text-left">
                      {product.specs.slice(0, 4).map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2 text-xs text-slate-600 text-left"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Area & Single Primary Button */}
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    {/* B2C vs B2B Pricing Representation */}
                    {shopMode === 'b2c' ? (
                      <div className="space-y-1">
                        {product.marketPrice && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 line-through">
                              Market Rate: PKR {product.marketPrice.toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                              -20% OFF
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg sm:text-xl font-black text-red-600">
                            {product.discountedPrice
                              ? `PKR ${product.discountedPrice.toLocaleString()}`
                              : product.priceEstimate}
                          </span>
                          {product.savingAmount && (
                            <span className="text-[11px] font-bold text-emerald-700">
                              Save PKR {product.savingAmount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      // B2B Corporate Profile View: STRICTLY NO FIXED PRICE ON PROFILE
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>B2B Corporate Profile</span>
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#1E1E1E]">
                          Volume Quote on Request
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Itemized invoices, NTN billing, and factory doorstep trials.
                        </p>
                      </div>
                    )}

                    {/* Actions: Secondary Specs Outline + Single Primary Red WhatsApp Button */}
                    <div className="flex items-center gap-2 pt-1">
                      {/* Secondary Outline Action */}
                      <button
                        type="button"
                        onClick={() => setActiveModalProduct(product)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                      >
                        Full Specs
                      </button>

                      {/* Single Primary Red Button Rule */}
                      <a
                        href={generateWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 hover:shadow-red-600/40 cursor-pointer"
                        title={shopMode === 'b2c' ? 'Instant WhatsApp Order' : 'Request B2B RFQ'}
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">
                          {shopMode === 'b2c' ? 'WhatsApp Order' : 'Request B2B RFQ'}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button for 100+ Products */}
        {visibleProducts.length < filteredProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setDisplayCount((prev) => prev + 24)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>Load More Hardware ({filteredProducts.length - visibleProducts.length} Remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty Search Result Fallback */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-[28px] max-w-xl mx-auto p-8">
            <Laptop className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1E1E1E]">No hardware matched your search</h3>
            <p className="text-xs text-slate-600 mt-1 leading-[1.55]">
              Looking for a specific HP, Dell, or Lenovo model? We have fresh shipments arriving weekly from Dubai.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBrand('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Diagnostic & Upgrade Service Guarantee Card */}
        <div className="mt-16 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-[28px] text-left shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1 text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-600 mb-3 shadow-2xs">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E]">20% Direct Dubai Savings</h3>
              <p className="text-xs text-slate-600 leading-[1.55]">
                Direct Dubai import cuts out third-party markups. You save 20% on every single unit.
              </p>
            </div>

            <div className="space-y-1 text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 mb-3 shadow-2xs">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E]">Written Bench Warranty</h3>
              <p className="text-xs text-slate-600 leading-[1.55]">
                All laptops include 3-month lab warranty and 10-day checking. Printers include 1-year replacement.
              </p>
            </div>

            <div className="space-y-1 text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-3 shadow-2xs">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E]">Sialkot Doorstep Delivery</h3>
              <p className="text-xs text-slate-600 leading-[1.55]">
                Got a question? Call us. We reply in 2 hours. Doorstep delivery across Paris Road and Cantt.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Product Specs Modal */}
        {activeModalProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveModalProduct(null)}
          >
            <div
              className="bg-white rounded-[32px] sm:rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 text-left space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      {activeModalProduct.brand || activeModalProduct.category}
                    </span>
                    {activeModalProduct.generation && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        {activeModalProduct.generation}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E1E1E] leading-tight">
                    {activeModalProduct.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product Visual */}
              {activeModalProduct.imageUrl && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200">
                  <OptimizedImage
                    src={activeModalProduct.imageUrl}
                    webpSrc={activeModalProduct.imageWebp}
                    alt={activeModalProduct.name}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
              )}

              {/* Hardware Spec Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {activeModalProduct.processor && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Processor / CPU</div>
                    <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">{activeModalProduct.processor}</div>
                  </div>
                )}
                {activeModalProduct.ram && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Memory (RAM)</div>
                    <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">{activeModalProduct.ram}</div>
                  </div>
                )}
                {activeModalProduct.storage && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Storage (Hard Disk / SSD)</div>
                    <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">{activeModalProduct.storage}</div>
                  </div>
                )}
                {activeModalProduct.display && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Screen &amp; Display</div>
                    <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">{activeModalProduct.display}</div>
                  </div>
                )}
                {activeModalProduct.graphics && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Graphics (GPU)</div>
                    <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">{activeModalProduct.graphics}</div>
                  </div>
                )}
                {activeModalProduct.batteryHealth && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Battery Condition</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">{activeModalProduct.batteryHealth}</div>
                  </div>
                )}
              </div>

              {/* Full Specs List */}
              <div className="space-y-2 border-t border-slate-100 pt-4 text-left">
                <div className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider">
                  Complete Configuration &amp; Features:
                </div>
                <div className="space-y-1.5">
                  {activeModalProduct.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty & Availability */}
              <div className="p-4 bg-red-50/50 border border-red-200 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Warranty Coverage:</span>
                  <span className="text-red-700 font-semibold">{activeModalProduct.warranty}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">Status:</span>
                  <span className="text-emerald-700 font-bold">{activeModalProduct.availability}</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {shopMode === 'b2c' ? (
                    <div>
                      {activeModalProduct.marketPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          Market Price: PKR {activeModalProduct.marketPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-2xl font-black text-red-600">
                        {activeModalProduct.discountedPrice
                          ? `PKR ${activeModalProduct.discountedPrice.toLocaleString()}`
                          : activeModalProduct.priceEstimate}
                      </div>
                      {activeModalProduct.savingAmount && (
                        <div className="text-xs font-bold text-emerald-700">
                          Save PKR {activeModalProduct.savingAmount.toLocaleString()} (20% OFF Market Rate)
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">B2B Corporate Profile</div>
                      <div className="text-lg font-black text-[#1E1E1E]">Custom Quotation on Request</div>
                      <div className="text-xs text-slate-500">No fixed retail pricing on B2B profiles</div>
                    </div>
                  )}
                </div>

                {/* Single Primary Red WhatsApp Button */}
                <a
                  href={generateWhatsAppLink(activeModalProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {shopMode === 'b2c' ? 'Order on WhatsApp' : 'Request B2B Quote'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sialkot Hardware, SSD Upgrades & POS FAQ Section */}
        <div className="mt-20 pt-12 border-t border-slate-200 text-left">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block mb-2">
              Hardware &amp; POS Buying FAQs
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] text-left">
              Frequently Asked Hardware &amp; Upgrade Questions
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-[1.55] text-left">
              Everything you need to know about warranty, SSD speed upgrades, thermal printers, and doorstep deployment in Sialkot.
            </p>
          </div>

          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[20px] text-left">
              <h4 className="font-bold text-[#1E1E1E] text-sm mb-2 flex items-center gap-2 text-left">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>What is the warranty policy on your hardware products?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                All brand-new POS touch terminals and thermal receipt printers come with a <strong>1-Year local written replacement warranty</strong> in Sialkot. Our genuine NVMe/SATA SSDs include a <strong>3-Year warranty</strong>, and imported laptops include a 3-month bench repair warranty plus a 10-day testing guarantee.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[20px] text-left">
              <h4 className="font-bold text-[#1E1E1E] text-sm mb-2 flex items-center gap-2 text-left">
                <HardDrive className="w-4 h-4 text-red-600" />
                <span>How long does an SSD upgrade take, and will my data be safe?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Our lab performs <strong>100% lossless OS &amp; data migration</strong> in under 45 minutes. Your Windows, installed accounting software, passwords, desktop files, and browser bookmarks are cloned bit-by-bit to the new high-speed SSD so your computer boots 10x faster with zero data loss.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[20px] text-left">
              <h4 className="font-bold text-[#1E1E1E] text-sm mb-2 flex items-center gap-2 text-left">
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Do 80mm thermal receipt printers require ink or ribbons?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                No ink or ribbons are needed. Direct thermal receipt printers use heat-sensitive paper rolls (80mm width). They feature a heavy-duty Japanese auto-cutter rated for 1.5 million cuts and connect directly to Windows, Android POS, or billing computers via USB and Ethernet LAN.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[20px] text-left">
              <h4 className="font-bold text-[#1E1E1E] text-sm mb-2 flex items-center gap-2 text-left">
                <Laptop className="w-4 h-4 text-purple-600" />
                <span>Can you deliver and install hardware at our factory in Sialkot?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-[1.55] text-left">
                Yes! Our on-site technicians deliver and configure all hardware directly at your retail store, warehouse, or factory on Paris Road, Cantt, Daska Road, Sambrial, Wazirabad Road, and Small Industrial Estate Sialkot with full hands-on staff demonstration.
              </p>
            </div>
          </div>

          {/* Legal Notice & Trademark Disclaimer */}
          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-[20px] text-left max-w-4xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-500 leading-[1.55] space-y-1.5 text-left">
                <p className="font-bold text-[#1E1E1E] text-left">
                  Legal Notice &amp; Brand Trademark Disclaimer
                </p>
                <p className="text-left">
                  All brand names, product model designations, and registered trademarks (including Intel, HP, Dell, Lenovo, Epson, Samsung, and others) mentioned on this website belong to their respective trademark owners. References are strictly descriptive for hardware compatibility, parts identification, and specifications.
                </p>
                <p className="text-left">
                  evonix technologies operates as an independent IT software agency, workstation engineering lab, and hardware supplier. All product visuals are either original digital assets or royalty-free licensed illustrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
