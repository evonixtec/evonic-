import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Building2,
  FileText,
  ChevronDown,
  Globe,
  HelpCircle,
  Truck,
  Cpu,
  Layers,
  Award,
  Zap,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import {
  LOCAL_CITIES,
  CLUSTER_SERVICES,
  getClusterData,
  LocalCity,
  ClusterService,
} from '../data/localClusters';
import { COMPANY_INFO } from '../data/content';
import { NavPageId } from './Navbar';

interface LocalClusterLandingPageProps {
  initialCity?: LocalCity['slug'];
  initialService?: ClusterService['slug'];
  onOpenQuote: (prefillService?: string) => void;
  onNavigatePage: (page: NavPageId) => void;
}

export const LocalClusterLandingPage: React.FC<LocalClusterLandingPageProps> = ({
  initialCity = 'daska',
  initialService = 'it-consultancy',
  onOpenQuote,
  onNavigatePage,
}) => {
  const [selectedCity, setSelectedCity] = useState<LocalCity['slug']>(initialCity);
  const [selectedService, setSelectedService] = useState<ClusterService['slug']>(initialService);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dedicated Location Dispatch Form States
  const [dispatchName, setDispatchName] = useState('');
  const [dispatchPhone, setDispatchPhone] = useState('');
  const [dispatchCompany, setDispatchCompany] = useState('');
  const [dispatchZone, setDispatchZone] = useState('');
  const [dispatchUrgency, setDispatchUrgency] = useState<'emergency' | 'standard'>('emergency');
  const [dispatchFault, setDispatchFault] = useState('');
  const [generatedDispatchToken, setGeneratedDispatchToken] = useState<string | null>(null);
  const [copiedDispatchToken, setCopiedDispatchToken] = useState(false);

  // Sync state if initial props change
  useEffect(() => {
    if (initialCity) setSelectedCity(initialCity);
    if (initialService) setSelectedService(initialService);
  }, [initialCity, initialService]);

  const currentCity = LOCAL_CITIES[selectedCity] || LOCAL_CITIES.daska;
  const currentService = CLUSTER_SERVICES[selectedService] || CLUSTER_SERVICES['it-consultancy'];
  const cluster = getClusterData(selectedCity, selectedService);

  // Set default zone when city changes
  useEffect(() => {
    if (currentCity && currentCity.keyCommercialHubs.length > 0) {
      setDispatchZone(currentCity.keyCommercialHubs[0]);
    }
  }, [currentCity]);

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchName.trim() || !dispatchPhone.trim()) return;
    const prefix = currentCity.slug.toUpperCase().slice(0, 3);
    const token = `DSP-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedDispatchToken(token);
  };

  const handleCopyDispatchToken = () => {
    if (generatedDispatchToken) {
      navigator.clipboard.writeText(generatedDispatchToken);
      setCopiedDispatchToken(true);
      setTimeout(() => setCopiedDispatchToken(false), 2000);
    }
  };

  const handleSendDispatchWhatsApp = () => {
    if (!generatedDispatchToken) return;
    const text = `*evonix ON-SITE FIELD DISPATCH PASS*\n` +
      `Token: *${generatedDispatchToken}*\n` +
      `City: *${currentCity.name}* (Zone: ${dispatchZone || currentCity.keyCommercialHubs[0]})\n` +
      `Service: *${currentService.shortName}*\n` +
      `Contact: ${dispatchName} (${dispatchPhone})\n` +
      `Company: ${dispatchCompany || 'Not specified'}\n` +
      `Urgency: ${dispatchUrgency === 'emergency' ? `🚨 EMERGENCY INDUSTRIAL OUTAGE (${currentCity.dispatchEtaMinutes})` : 'Standard Scheduled Visit'}\n` +
      `Fault/Requirement: ${dispatchFault || 'On-site technical evaluation required'}\n\n` +
      `Kindly confirm van dispatch immediately.`;
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Dynamic Schema.org JSON-LD injection for Local SEO
  useEffect(() => {
    const schemaId = 'evonix-local-cluster-schema';
    let existingScript = document.getElementById(schemaId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = schemaId;
      existingScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `https://evonixtec.com/location/${currentCity.slug}#localbusiness`,
          name: `evonix technologies – ${currentCity.name} Hub`,
          image: 'https://evonixtec.com/og-image.jpg',
          telephone: currentCity.phoneContact,
          url: `https://evonixtec.com/location/${currentCity.slug}/${currentService.slug}`,
          priceRange: 'PKR 1,500 - 350,000',
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${currentCity.name} Service Corridor`,
            addressLocality: currentCity.name,
            addressRegion: 'Punjab',
            postalCode: currentCity.postalCode,
            addressCountry: 'PK',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: currentCity.coordinates.lat,
            longitude: currentCity.coordinates.lng,
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: currentCity.name,
          },
        },
        {
          '@type': 'Service',
          '@id': `https://evonixtec.com/location/${currentCity.slug}/${currentService.slug}#service`,
          name: `${currentService.shortName} in ${currentCity.name}`,
          serviceType: currentService.name,
          provider: {
            '@type': 'LocalBusiness',
            name: 'evonix technologies',
          },
          areaServed: {
            '@type': 'City',
            name: currentCity.name,
          },
          description: cluster.metaDescription,
        },
        {
          '@type': 'FAQPage',
          '@id': `https://evonixtec.com/location/${currentCity.slug}/${currentService.slug}#faq`,
          mainEntity: cluster.localFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://evonixtec.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Locations',
              item: 'https://evonixtec.com/locations',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: currentCity.name,
              item: `https://evonixtec.com/location/${currentCity.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: currentService.shortName,
              item: `https://evonixtec.com/location/${currentCity.slug}/${currentService.slug}`,
            },
          ],
        },
      ],
    };

    existingScript.textContent = JSON.stringify(structuredData);

    // Update document title and description dynamically
    document.title = cluster.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', cluster.metaDescription);

    return () => {
      // Keep script alive or update on next render
    };
  }, [currentCity, currentService, cluster]);

  const handleCityChange = (city: LocalCity['slug']) => {
    setSelectedCity(city);
    const newPath = `/location/${city}/${selectedService}`;
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', newPath);
    }
  };

  const handleServiceChange = (service: ClusterService['slug']) => {
    setSelectedService(service);
    const newPath = `/location/${selectedCity}/${service}`;
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-8">
      {/* 1. Breadcrumbs & Regional Triangle Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center text-xs text-slate-500 gap-1.5 py-3 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => onNavigatePage('home')}
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage('services')}
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            Sialkot Industrial Triangle
          </button>
          <span>/</span>
          <span className="font-bold text-slate-800">{currentCity.name}</span>
          <span>/</span>
          <span className="text-red-600 font-bold">{currentService.shortName}</span>
        </nav>

        {/* 2. Interactive Cluster Switcher Controls (Instant Local Filtering) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 mt-2 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5 text-red-600" />
                Local SEO Service Cluster Generator
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Explore Direct On-Site Support by Industrial Area
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Guaranteed Rapid Dispatch Across Sialkot-Daska-Sambrial-Wazirabad</span>
            </div>
          </div>

          {/* City Selection Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[70px]">
                1. Select City:
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(LOCAL_CITIES) as LocalCity['slug'][]).map((citySlug) => {
                  const city = LOCAL_CITIES[citySlug];
                  const isActive = citySlug === selectedCity;
                  return (
                    <button
                      key={citySlug}
                      onClick={() => handleCityChange(citySlug)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{city.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {city.dispatchEtaMinutes}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Selection Tabs */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[70px]">
                2. Service:
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CLUSTER_SERVICES) as ClusterService['slug'][]).map((serviceSlug) => {
                  const s = CLUSTER_SERVICES[serviceSlug];
                  const isActive = serviceSlug === selectedService;
                  return (
                    <button
                      key={serviceSlug}
                      onClick={() => handleServiceChange(serviceSlug)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm ring-2 ring-red-500'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {s.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Hero Section (Hyper-Local Authority & Direct Field Dispatch) */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-extrabold shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentCity.name}, Sialkot Division
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Doorstep ETA: {currentCity.dispatchEtaMinutes}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  20+ Yrs Dubai Heritage
                </span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {cluster.headline}
                </h1>
                <p className="text-base sm:text-lg text-red-200 font-semibold">
                  {cluster.subheadline}
                </p>
              </div>

              {/* Pitch */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {cluster.heroPitch}
              </p>

              {/* Industrial Challenge & Solution Callout */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 space-y-2 backdrop-blur-sm">
                <div className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Targeted Industrial Manufacturing Solution for {currentCity.name}:</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  {cluster.industrialBenefit}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenQuote(`${currentService.shortName} in ${currentCity.name}`)}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Field Engineer in {currentCity.name}</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                    `Hello evonix technologies, I need urgent ${currentService.shortName} at our facility in ${currentCity.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Urgent Dispatch</span>
                </a>

                <a
                  href={`tel:${currentCity.phoneContact.replace(/\s+/g, '')}`}
                  className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{currentCity.phoneContact}</span>
                </a>
              </div>
            </div>

            {/* Quick Dispatch Stats Card */}
            <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Mobile Unit Metrics
                </span>
                <h3 className="text-base font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-4 h-4 text-red-500" />
                  <span>{currentCity.name} Field Station</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Road Distance:</span>
                  <span className="font-bold text-white">{currentCity.distanceFromHQLab}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Field Arrival Window:</span>
                  <span className="font-bold text-emerald-400">{currentCity.dispatchEtaMinutes}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Postal District:</span>
                  <span className="font-mono font-bold text-cyan-300">{currentCity.postalCode}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Diagnostic Fee:</span>
                  <span className="font-bold text-emerald-400">100% Free on Bench</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Parts Warranty:</span>
                  <span className="font-bold text-amber-400">{currentService.warranty}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Serving All Key Zones in {currentCity.name}:</span>
                  </div>
                  <p className="text-slate-400">
                    {currentCity.keyCommercialHubs.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Detailed Service Architecture & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left: Technical Breakdown (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Technical Architecture
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {currentService.name}
                </h2>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {currentService.summary}
                </p>
              </div>

              {/* Detailed Specs List */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Deliverables & Factory SLA Inclusions:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.detailedSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industrial Hardware & Diagnostic Equipment */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 space-y-3">
                <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                  <span className="font-extrabold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-red-600" />
                    Laboratory & Mobile Tooling Station:
                  </span>
                  <span className="text-slate-500 text-[11px] font-semibold">Dubai Standard Certified</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentService.equipmentUsed.map((equip, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white text-slate-800 text-xs font-mono font-medium border border-slate-200 shadow-2xs"
                    >
                      ✓ {equip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified Client Case Studies in this Specific Location */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Local Proof of Execution
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Verified Industrial Clients in {currentCity.name}
                </h3>
              </div>

              <div className="space-y-4">
                {currentCity.verifiedClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-red-600" />
                        <span>{client.name}</span>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {client.industry}
                      </span>
                    </div>
                    <div className="text-xs text-red-600 font-semibold">
                      Scope: {client.serviceProvided}
                    </div>
                    <blockquote className="text-xs text-slate-600 italic border-l-2 border-red-500 pl-3 leading-relaxed">
                      "{client.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Localized FAQ Accordion (with Structured FAQ Schema) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Frequently Asked Questions
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Questions about {currentService.shortName} in {currentCity.name}
                </h3>
              </div>

              <div className="space-y-3">
                {cluster.localFaqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-red-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Quick Request Sidebar & Cross-Cluster Navigation (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Professional Local Dispatch Booking Form */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4 sticky top-24">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-red-600" />
                  <span>On-Site Rapid Response Station</span>
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Book Engineer to {currentCity.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct van dispatch with mobile bench tools arriving in <strong className="text-emerald-600 font-bold">{currentCity.dispatchEtaMinutes}</strong>.
                </p>
              </div>

              {!generatedDispatchToken ? (
                <form onSubmit={handleDispatchSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Name / Factory Rep *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood / Director"
                      value={dispatchName}
                      onChange={(e) => setDispatchName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        WhatsApp Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-XXXXXXX"
                        value={dispatchPhone}
                        onChange={(e) => setDispatchPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Company / Unit
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Surgical / Cutlery"
                        value={dispatchCompany}
                        onChange={(e) => setDispatchCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-xs font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Target Area in {currentCity.name} *
                    </label>
                    <select
                      value={dispatchZone}
                      onChange={(e) => setDispatchZone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-xs font-semibold text-slate-900 bg-white"
                    >
                      {currentCity.keyCommercialHubs.map((hub, idx) => (
                        <option key={idx} value={hub}>
                          {hub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDispatchUrgency('emergency')}
                        className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                          dispatchUrgency === 'emergency'
                            ? 'bg-red-50 border-red-500 text-red-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="block text-[11px]">🚨 Emergency Outage</span>
                        <span className="text-[10px] text-slate-500">{currentCity.dispatchEtaMinutes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDispatchUrgency('standard')}
                        className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                          dispatchUrgency === 'standard'
                            ? 'bg-slate-900 border-slate-900 text-white font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="block text-[11px]">Scheduled Visit</span>
                        <span className="text-[10px] text-slate-400">Same-Day Appointment</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Fault / Equipment Detail (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Server down, thermal printer jammed, dead laptop"
                      value={dispatchFault}
                      onChange={(e) => setDispatchFault(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-xs text-slate-900"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free on-site assessment. Written cost approval before replacement.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate Official Field Dispatch Pass</span>
                  </button>
                </form>
              ) : (
                /* Generated Dispatch Pass Confirmation View */
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Van Dispatch Token Active</span>
                    </div>
                    <button
                      onClick={handleCopyDispatchToken}
                      className="text-[11px] font-mono text-slate-700 hover:text-red-600 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs font-bold"
                    >
                      {copiedDispatchToken ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      <span>{copiedDispatchToken ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Official Tracking Code:</span>
                    <div className="font-mono text-lg font-black text-red-700 tracking-wider">
                      {generatedDispatchToken}
                    </div>
                    <div className="text-xs text-slate-700">
                      Destination: <strong className="text-slate-900 font-bold">{dispatchZone}</strong>, {currentCity.name}
                    </div>
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Estimated Van Arrival: {currentCity.dispatchEtaMinutes}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSendDispatchWhatsApp}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Send Token to Technician WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setGeneratedDispatchToken(null)}
                    className="w-full text-center text-[11px] text-slate-600 hover:text-red-700 font-medium transition-colors cursor-pointer"
                  >
                    ← Edit Details / Create Another Dispatch Pass
                  </button>
                </div>
              )}

              {/* Cross-Service Links for this City */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Other Services in {currentCity.name}:
                </span>
                <div className="space-y-1.5">
                  {(Object.keys(CLUSTER_SERVICES) as ClusterService['slug'][])
                    .filter((s) => s !== selectedService)
                    .map((sSlug) => {
                      const s = CLUSTER_SERVICES[sSlug];
                      return (
                        <button
                          key={sSlug}
                          onClick={() => handleServiceChange(sSlug)}
                          className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-red-100"
                        >
                          <span>{s.shortName} in {currentCity.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Cross-City Links for this Service */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  {currentService.shortName} in Neighboring Hubs:
                </span>
                <div className="space-y-1.5">
                  {(Object.keys(LOCAL_CITIES) as LocalCity['slug'][])
                    .filter((c) => c !== selectedCity)
                    .map((cSlug) => {
                      const c = LOCAL_CITIES[cSlug];
                      return (
                        <button
                          key={cSlug}
                          onClick={() => handleCityChange(cSlug)}
                          className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{c.name} ({c.dispatchEtaMinutes})</span>
                          </span>
                          <span className="text-[10px] text-red-600 font-bold">Switch Hub</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
