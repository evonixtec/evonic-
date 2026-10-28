import React, { useState, useMemo } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  ExternalLink,
  Sparkles,
  FileCode,
  Building2,
  HelpCircle,
  Package,
  Layers,
  Globe,
  Plus,
  Trash2,
  RefreshCw,
} from 'lucide-react';

export type SchemaType = 'LocalBusiness' | 'FAQPage' | 'Product' | 'SoftwareApplication' | 'Organization';

interface FaqItem {
  question: string;
  answer: string;
}

export const SchemaGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>('LocalBusiness');
  const [copied, setCopied] = useState<boolean>(false);

  // Common Entity Fields
  const [entityName, setEntityName] = useState<string>('Evonix Technologies');
  const [entityDesc, setEntityDesc] = useState<string>(
    'Dubai-standard IT engineering lab and software solutions provider in Sialkot, Pakistan.'
  );
  const [entityUrl, setEntityUrl] = useState<string>('https://evonixtec.com');
  const [entityImage, setEntityImage] = useState<string>('https://evonixtec.com/images/hero_dubai_tech.jpg');

  // LocalBusiness Specific
  const [telephone, setTelephone] = useState<string>('+923263244002');
  const [email, setEmail] = useState<string>('evonixtec@gmail.com');
  const [streetAddress, setStreetAddress] = useState<string>('Paris Road & Cantt');
  const [city, setCity] = useState<string>('Sialkot');
  const [region, setRegion] = useState<string>('Punjab');
  const [postalCode, setPostalCode] = useState<string>('51310');
  const [country, setCountry] = useState<string>('PK');
  const [priceRange, setPriceRange] = useState<string>('$$');
  const [openingHours, setOpeningHours] = useState<string>('Mo-Sa 09:00-20:00');

  // Product Specific
  const [brandName, setBrandName] = useState<string>('Evonix');
  const [sku, setSku] = useState<string>('EVX-POS-80MM');
  const [productPrice, setProductPrice] = useState<string>('12500');
  const [priceCurrency, setPriceCurrency] = useState<string>('PKR');
  const [availability, setAvailability] = useState<string>('https://schema.org/InStock');
  const [itemCondition, setItemCondition] = useState<string>('https://schema.org/NewCondition');

  // SoftwareApplication Specific
  const [operatingSystem, setOperatingSystem] = useState<string>('Web, Windows, macOS, Android');
  const [applicationCategory, setApplicationCategory] = useState<string>('BusinessApplication');

  // FAQPage Specific
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: 'What IT services does Evonix offer in Sialkot?',
      answer: 'We provide custom software development, retail POS setups, hardware repairs, and export tools.',
    },
    {
      question: 'How fast do you respond to service calls?',
      answer: 'Our technicians reply within 2 hours. We visit Paris Road and Cantt for on-site checks.',
    },
    {
      question: 'Are online business calculators free to use?',
      answer: 'Yes. All calculators on Evonix tools are 100% free with no login needed.',
    },
  ]);

  // Handle Add FAQ
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  // Handle Remove FAQ
  const handleRemoveFaq = (index: number) => {
    if (faqs.length <= 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Handle Update FAQ
  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  // Preset quick fill for test demo
  const handleLoadSample = () => {
    setEntityName('Evonix Technologies');
    setEntityDesc('Dubai-standard IT engineering lab and software solutions provider in Sialkot, Pakistan.');
    setEntityUrl('https://evonixtec.com');
    setEntityImage('https://evonixtec.com/images/hero_dubai_tech.jpg');
    setTelephone('+923263244002');
    setStreetAddress('Paris Road & Cantt');
    setCity('Sialkot');
    setRegion('Punjab');
    setPostalCode('51310');
    setPriceRange('$$');
    setBrandName('Evonix');
    setSku('EVX-POS-80MM');
    setProductPrice('12500');
    setPriceCurrency('PKR');
  };

  // Generate clean schema object
  const generatedSchema = useMemo(() => {
    if (schemaType === 'LocalBusiness') {
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: entityName,
        description: entityDesc,
        url: entityUrl,
        image: entityImage,
        telephone: telephone,
        email: email,
        priceRange: priceRange,
        address: {
          '@type': 'PostalAddress',
          streetAddress: streetAddress,
          addressLocality: city,
          addressRegion: region,
          postalCode: postalCode,
          addressCountry: country,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '20:00',
          },
        ],
      };
    }

    if (schemaType === 'FAQPage') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs
          .filter((f) => f.question.trim().length > 0)
          .map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
      };
    }

    if (schemaType === 'Product') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: entityName,
        description: entityDesc,
        image: entityImage,
        brand: {
          '@type': 'Brand',
          name: brandName,
        },
        sku: sku,
        offers: {
          '@type': 'Offer',
          url: entityUrl,
          priceCurrency: priceCurrency,
          price: productPrice,
          availability: availability,
          itemCondition: itemCondition,
        },
      };
    }

    if (schemaType === 'SoftwareApplication') {
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: entityName,
        description: entityDesc,
        url: entityUrl,
        operatingSystem: operatingSystem,
        applicationCategory: applicationCategory,
        offers: {
          '@type': 'Offer',
          price: productPrice || '0',
          priceCurrency: priceCurrency,
        },
      };
    }

    // Organization default
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: entityName,
      description: entityDesc,
      url: entityUrl,
      logo: entityImage,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: telephone,
          contactType: 'customer service',
          email: email,
          areaServed: 'Global',
          availableLanguage: ['English', 'Urdu'],
        },
      ],
    };
  }, [
    schemaType,
    entityName,
    entityDesc,
    entityUrl,
    entityImage,
    telephone,
    email,
    streetAddress,
    city,
    region,
    postalCode,
    country,
    priceRange,
    brandName,
    sku,
    productPrice,
    priceCurrency,
    availability,
    itemCondition,
    operatingSystem,
    applicationCategory,
    faqs,
  ]);

  const jsonString = useMemo(() => {
    return JSON.stringify(generatedSchema, null, 2);
  }, [generatedSchema]);

  const scriptTagString = useMemo(() => {
    return `<script type="application/ld+json">\n${jsonString}\n</script>`;
  }, [jsonString]);

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTagString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download .jsonld file
  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schemaType.toLowerCase()}-schema.jsonld`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1E1E1E] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Block (8pt spacing, left-aligned) */}
        <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">
                <Code className="w-3.5 h-3.5 text-red-600" />
                <span>Google Search &amp; AI Overviews Ready</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E] tracking-tight">
                Advanced JSON-LD Schema Markup Generator
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.55] max-w-2xl">
                Create search-engine-ready structured data in seconds. Boost search rankings and rich snippet visibility.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer shrink-0 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>Load Sialkot Sample</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Form Left, Code Right (100% fluid and responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-2xs space-y-6">
              {/* Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Schema Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'LocalBusiness', label: 'Local Business', icon: Building2 },
                      { id: 'FAQPage', label: 'FAQ Page', icon: HelpCircle },
                      { id: 'Product', label: 'Product', icon: Package },
                      { id: 'SoftwareApplication', label: 'Software App', icon: Layers },
                      { id: 'Organization', label: 'Organization', icon: Globe },
                    ] as const
                  ).map((t) => {
                    const IconComponent = t.icon;
                    const isActive = schemaType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSchemaType(t.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          isActive
                            ? 'bg-red-50 border-red-500 text-red-700 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Form Fields based on Type */}
              {schemaType === 'FAQPage' ? (
                /* FAQ Builder */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Frequently Asked Questions ({faqs.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Question</span>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase">
                            Question #{idx + 1}
                          </span>
                          {faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                          placeholder="e.g. Do you offer on-site support in Sialkot?"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                          placeholder="Answer details..."
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Standard Entity Fields */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Entity Name / Title
                    </label>
                    <input
                      type="text"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="e.g. Evonix Technologies"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description / Overview
                    </label>
                    <textarea
                      rows={2}
                      value={entityDesc}
                      onChange={(e) => setEntityDesc(e.target.value)}
                      placeholder="Short summary of business or product..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500 leading-normal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Canonical URL
                      </label>
                      <input
                        type="url"
                        value={entityUrl}
                        onChange={(e) => setEntityUrl(e.target.value)}
                        placeholder="https://evonixtec.com"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Image / Logo URL
                      </label>
                      <input
                        type="url"
                        value={entityImage}
                        onChange={(e) => setEntityImage(e.target.value)}
                        placeholder="https://evonixtec.com/logo.jpg"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* LocalBusiness Fields */}
                  {schemaType === 'LocalBusiness' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            placeholder="+923263244002"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="evonixtec@gmail.com"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="Paris Road, Cantt"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Sialkot"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Specific Fields */}
                  {schemaType === 'Product' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Brand Name
                          </label>
                          <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="Evonix"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            SKU Code
                          </label>
                          <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="EVX-101"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Price Amount
                          </label>
                          <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="12500"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Currency
                          </label>
                          <select
                            value={priceCurrency}
                            onChange={(e) => setPriceCurrency(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          >
                            <option value="PKR">PKR (Pakistani Rupee)</option>
                            <option value="AED">AED (UAE Dirham)</option>
                            <option value="USD">USD (US Dollar)</option>
                            <option value="EUR">EUR (Euro)</option>
                            <option value="GBP">GBP (British Pound)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Software Specific Fields */}
                  {schemaType === 'SoftwareApplication' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Operating System
                          </label>
                          <input
                            type="text"
                            value={operatingSystem}
                            onChange={(e) => setOperatingSystem(e.target.value)}
                            placeholder="Web, Windows, Android"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Application Category
                          </label>
                          <input
                            type="text"
                            value={applicationCategory}
                            onChange={(e) => setApplicationCategory(e.target.value)}
                            placeholder="BusinessApplication"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1E1E1E] focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Single Primary Action Button (Apple Red Rule) */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Generate & Copy Schema'}</span>
              </button>
            </div>
          </div>

          {/* Code Output Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 rounded-[24px] border border-slate-800 shadow-lg p-6 sm:p-8 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                    {schemaType.toLowerCase()}.jsonld
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Download JSON-LD file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Code Display Area */}
              <div className="relative max-h-[460px] overflow-auto rounded-xl bg-slate-950 p-4 border border-slate-800/80">
                <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
                  {scriptTagString}
                </pre>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400 font-medium">
                  Valid Schema.org syntax. Ready to paste in &lt;head&gt;.
                </span>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Google Rich Results Test</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-2xs space-y-2 text-left">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>How to Install on Your Website</span>
              </div>
              <p className="text-xs text-slate-600 leading-[1.55]">
                Copy the code above. Paste it inside the &lt;head&gt; section of your HTML page.
              </p>
              <p className="text-xs text-slate-600 leading-[1.55]">
                Googlebot and AI Overviews read it on the next crawl to show star ratings and business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaGenerator;
