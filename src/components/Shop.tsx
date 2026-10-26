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
        <div className="max-w-3xl mb-14 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
            <span>Hardware, POS Systems &amp; Computer Sales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight text-left">
            IT Hardware &amp; Equipment Shop
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-[1.55] text-left">
            Certified hardware, commercial POS billing terminals, high-speed thermal printers, and imported laptops available with local warranty and doorstep setup in Sialkot.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-start gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Search equipment, models, and parts"
                placeholder="Search equipment, models, parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#1E1E1E] placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group text-left"
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

                <div className="p-6 text-left">
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

                  <h3 className="text-lg font-bold text-[#1E1E1E] mt-1 group-hover:text-red-600 transition-colors text-left">
                    {product.name}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-[1.55] text-left product-desc">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-left">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600 text-left">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action: Single Primary Button Rule */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-red-600 uppercase tracking-wider block font-bold flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> Direct Lab Pricing
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#1E1E1E]">
                      {product.priceEstimate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Secondary Ghost Button */}
                    <button
                      type="button"
                      onClick={() => onInquireProduct(product.name)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Specs
                    </button>

                    {/* Single Primary Red WhatsApp Action Button */}
                    <a
                      href={generateWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 hover:shadow-red-600/40 cursor-pointer"
                      title="Instant Inquiry via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
