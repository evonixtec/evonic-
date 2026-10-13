import React, { useState } from 'react';
import { SHOP_PRODUCTS, COMPANY_INFO } from '../data/content';
import { ShopProduct } from '../types';
import { OptimizedImage } from './common/OptimizedImage';
import { ShoppingBag, Laptop, Printer, HardDrive, Search, MessageSquare, Check, Shield, Tag } from 'lucide-react';

interface ShopProps {
  onInquireProduct: (productName: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ onInquireProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'POS Hardware', label: 'POS Terminals & Scanners' },
    { id: 'Printers & Scanners', label: 'Printers & Receipt Units' },
    { id: 'Laptops & PCs', label: 'Laptops & Office PCs' },
    { id: 'Upgrades & Accessories', label: 'SSD Upgrades & Supplies' },
  ];

  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch = !q ||
      (product.name || '').toLowerCase().includes(q) ||
      (product.description || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const generateWhatsAppLink = (product: ShopProduct) => {
    const text = `Hello evonix, I am interested in inquiring about the following hardware in Sialkot:
Product: ${product.name}
Category: ${product.category}
Condition: ${product.condition}
Please share current price & delivery/setup availability.`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="shop" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
            Hardware, POS Systems & Computer Sales
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            IT Hardware & Equipment Shop
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Certified hardware, commercial POS billing terminals, high-speed thermal printers, and imported laptops available with local warranty and doorstep setup in Sialkot.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Search equipment, models, and parts"
                placeholder="Search equipment, models, parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Hardware WebP Visual */}
                {product.imageUrl && (
                  <OptimizedImage
                    src={product.imageUrl}
                    webpSrc={product.imageWebp}
                    alt={product.imageAlt || product.name}
                    aspectRatio="aspect-[16/10]"
                    badge={product.condition === 'Certified Refurbished (UAE Import)' ? 'UAE Import' : product.condition}
                    badgeColor={
                      product.condition === 'Brand New'
                        ? 'emerald'
                        : product.condition === 'Certified Refurbished (UAE Import)'
                        ? 'blue'
                        : 'slate'
                    }
                  />
                )}

                <div className="p-6">
                  {/* Header Tag & Condition */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {product.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        product.condition === 'Brand New'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {product.condition}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-red-600 uppercase tracking-wider block font-bold flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> Direct Lab Pricing
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {product.priceEstimate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={generateWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105"
                      title="Instant Quote via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onInquireProduct(product.name)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      Inquire / Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sialkot Hardware, SSD Upgrades & POS FAQ Section */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block mb-2">
              Hardware & POS Buying FAQs
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Hardware & Upgrade Questions
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Everything you need to know about warranty, SSD speed upgrades, thermal printers, and doorstep deployment in Sialkot.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                What is the warranty policy on your hardware products?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All brand-new POS touch terminals and thermal receipt printers come with a <strong>1-Year local written replacement warranty</strong> in Sialkot. Our genuine NVMe/SATA SSDs include a <strong>3-Year warranty</strong>, and imported laptops include a 3-month bench repair warranty plus a 10-day testing guarantee.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-red-600" />
                How long does an SSD upgrade take, and will my data be safe?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our lab performs <strong>100% lossless OS & data migration</strong> in under 45 minutes. Your Windows, installed accounting software, passwords, desktop files, and browser bookmarks are cloned bit-by-bit to the new high-speed SSD so your computer boots 10x faster with zero data loss.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <Printer className="w-4 h-4 text-blue-600" />
                Do 80mm thermal receipt printers require ink or ribbons?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No ink or ribbons are needed. Direct thermal receipt printers use heat-sensitive paper rolls (80mm width). They feature a heavy-duty Japanese auto-cutter rated for 1.5 million cuts and connect directly to Windows, Android POS, or billing computers via USB and Ethernet LAN.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-purple-600" />
                Can you deliver and install hardware at our factory in Sialkot?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes! Our on-site technicians deliver and configure all hardware directly at your retail store, warehouse, or factory on Paris Road, Cantt, Daska Road, Sambrial, Wazirabad Road, and Small Industrial Estate Sialkot with full hands-on staff demonstration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
