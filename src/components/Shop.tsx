import React, { useState } from 'react';
import { SHOP_PRODUCTS, COMPANY_INFO } from '../data/content';
import { ShopProduct } from '../types';
import { ShoppingBag, Laptop, Printer, HardDrive, Search, MessageSquare, Check, Shield, Tag } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

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
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const generateWhatsAppLink = (product: ShopProduct) => {
    const text = `Hello EVONIX TECHNOLOGIES, I am interested in inquiring about the following hardware in Sialkot:
Product: ${product.name}
Category: ${product.category}
Condition: ${product.condition}
Please share current price & delivery/setup availability.`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="shop" className="py-20 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <ShoppingBag className="w-3.5 h-3.5" />
              Hardware, POS Systems & Computer Sales
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              IT Hardware & Equipment Shop
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Certified hardware, commercial POS billing terminals, high-speed thermal printers, and imported laptops available with local warranty and doorstep setup in Sialkot.
            </p>

            {/* Search & Filter Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search POS, laptops, printers..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <FadeInSection
              key={product.id}
              direction="up"
              delay={(index % 4) * 80}
              duration={600}
              className="flex"
            >
              <div
                id={`shop-product-${product.id}`}
                className="w-full rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-800/60 transition-all p-5 flex flex-col justify-between shadow-lg group"
              >
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                      {product.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      product.condition.includes('UAE')
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                    }`}>
                      {product.condition}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Key Specs */}
                  <div className="space-y-1.5 mb-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warranty & Availability */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      {product.availability}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Shield className="w-3 h-3 text-cyan-400" />
                      {product.warranty.split('+')[0]}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {product.priceEstimate}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={generateWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <button
                      onClick={() => onInquireProduct(product.name)}
                      className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Hardware Guidance Notice */}
        <FadeInSection direction="up" delay={150} duration={600}>
          <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h4 className="text-sm font-bold text-white">Need custom specs, wholesale quantities, or bulk office set up?</h4>
              <p className="text-xs text-slate-400 mt-1">
                We source directly from trusted Gulf supply channels and can arrange imported workstation desktops, servers, and multi-lane supermarket setups.
              </p>
            </div>
            <button
              onClick={() => onInquireProduct('Custom Wholesale Hardware / Office Setup')}
              className="px-4 py-2.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900 font-semibold text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              Request Custom Specs
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
