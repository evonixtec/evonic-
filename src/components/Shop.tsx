import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';

interface ShopProps {
  onInquireProduct: (productName: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ onInquireProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Mode switch: 'b2c' shows 20% discounted prices; 'b2b' strictly hides all product prices on profile
  const [shopMode, setShopMode] = useState<'b2c' | 'b2b'>('b2c');
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Equipment', count: SHOP_PRODUCTS.length },
    {
      id: 'Laptops & PCs',
      label: 'Laptops (20+ Models)',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Laptops & PCs').length,
    },
    {
      id: 'Printers & Scanners',
      label: 'Printers & Receipt Units',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Printers & Scanners').length,
    },
    {
      id: 'POS Hardware',
      label: 'POS Terminals & Scanners',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'POS Hardware').length,
    },
    {
      id: 'Upgrades & Accessories',
      label: 'SSD Upgrades & Supplies',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'Upgrades & Accessories').length,
    },
  ];

  const laptopBrands = [
    { id: 'all', label: 'All Laptop Brands' },
    { id: 'HP', label: 'HP (5)' },
    { id: 'Dell', label: 'Dell (5)' },
    { id: 'Lenovo', label: 'Lenovo ThinkPad (5)' },
    { id: 'Sony VAIO', label: 'Sony VAIO (2)' },
    { id: 'Apple', label: 'Apple MacBooks (2)' },
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

  const generateWhatsAppLink = (product: ShopProduct) => {
    let priceText = '';
    if (shopMode === 'b2c' && product.discountedPrice) {
      priceText = `Discounted Price: PKR ${product.discountedPrice.toLocaleString()} (20% OFF Market Rate)`;
    } else {
      priceText = 'Requirement: B2B Enterprise Quote / Bulk Procurement';
    }

    const text = `Hello evonix team,
I would like to inquire about this hardware:
Product: ${product.name}
Model/Specs: ${product.processor || product.specs[0]}
${product.storage ? `Storage: ${product.storage}` : ''}
${product.ram ? `RAM: ${product.ram}` : ''}
${priceText}
Condition: ${product.condition}

Please confirm stock availability and doorstep delivery in Sialkot.`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="shop" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
            <span>Direct Dubai Hardware Import • Sialkot Lab Tested</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1E1E] tracking-tight text-left">
            Hardware &amp; Equipment Store
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
            We import certified business laptops, POS billing terminals, and high-speed printers directly from Dubai corporate fleets. Every unit undergoes 40-point hardware testing in our Sialkot lab before delivery.
          </p>
        </div>

        {/* 20% Discount Banner & B2C vs B2B Mode Switcher */}
        <div className="mb-10 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-[28px] shadow-2xs text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                <Percent className="w-3.5 h-3.5" />
                <span>20% Below Market Rate Guarantee</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E] tracking-tight">
                Direct Import Rates with Zero Middleman Fees
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.55]">
                We buy directly in bulk from UAE enterprise off-lease auctions. You get clean Grade-A hardware at prices 20% lower than typical local shops in Pakistan.
              </p>
            </div>

            {/* Profile Mode Toggle */}
            <div className="bg-white p-2 rounded-[20px] border border-slate-200 shadow-2xs shrink-0">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                Catalog Mode:
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
                  <span>B2C Store (20% OFF Prices)</span>
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
                  B2B Profile Mode active: Prices hidden on products. RFQ quotes provided on request.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="Search laptops, processors, generation, printers or parts"
                placeholder="Search Core i5, i7, 11th Gen, 12th Gen, Dell, HP, ThinkPad, Printers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Quick status counter */}
            <div className="text-xs text-slate-500 font-semibold shrink-0">
              Showing <span className="font-bold text-[#1E1E1E]">{filteredProducts.length}</span> verified units
            </div>
          </div>

          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id !== 'Laptops & PCs' && cat.id !== 'all') {
                    setSelectedBrand('all');
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-80 text-[11px]">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Laptop Brand Sub-filters (when Laptops or All is active) */}
          {(selectedCategory === 'all' || selectedCategory === 'Laptops & PCs') && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-[20px] flex items-center gap-2 overflow-x-auto text-left">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 px-2">
                Brand Filter:
              </span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {laptopBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
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

        {/* Product Grid (Fluid, 100% Responsive Grid Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
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
                Direct Dubai import cut out third-party middleman markups. You save 20% on every unit.
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
