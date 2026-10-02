import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, SectionId } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar, NavPageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSlider } from './components/HeroSlider';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Technologies } from './components/Technologies';
import { GlobalReach } from './components/GlobalReach';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Shop } from './components/Shop';
import { BlogHub } from './components/BlogHub';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { SearchModal } from './components/SearchModal';
import { SecurityAlertToast } from './components/SecurityAlertToast';
import { PageHeaderBanner } from './components/common/PageHeaderBanner';
import { GlobalInvoiceHub } from './components/GlobalInvoiceHub';
import { HomeServicesPreview } from './components/home/HomeServicesPreview';
import { HomeAboutPreview } from './components/home/HomeAboutPreview';
import { HomePortfolioPreview } from './components/home/HomePortfolioPreview';
import { HomeShopPreview } from './components/home/HomeShopPreview';
import { COMPANY_INFO } from './data/content';
import { initAntiCopyShield, initializeConsoleShield } from './lib/security';
import { applyPageSEO } from './lib/seo';
import { SialkotAreaCoverage } from './components/SialkotAreaCoverage';
import { LaptopRepairEstimator } from './components/LaptopRepairEstimator';
import { ProjectCostCalculator } from './components/ProjectCostCalculator';
import { SialkotSeoKeywordsHub } from './components/SialkotSeoKeywordsHub';
import { KeywordMappingHub } from './components/KeywordMappingHub';
import { CentralizedSeoDashboard } from './components/CentralizedSeoDashboard';
import { LiveRepairTracker } from './components/LiveRepairTracker';
import { SialkotIndustrialSolutions } from './components/SialkotIndustrialSolutions';
import { HardwareBeforeAfterGallery } from './components/HardwareBeforeAfterGallery';
import { PCBPowerSequenceSimulator } from './components/PCBPowerSequenceSimulator';
import { ThermalLifecyclePredictor } from './components/ThermalLifecyclePredictor';
import { OfflineDataSyncEngine } from './components/OfflineDataSyncEngine';
import { LiveSupportChat } from './components/LiveSupportChat';
import { HardwareBlinkBeepIdentifier } from './components/HardwareBlinkBeepIdentifier';
import { ThermalHotspotInspector } from './components/ThermalHotspotInspector';
import { FactoryNetworkLatencyTester } from './components/FactoryNetworkLatencyTester';
import { BenchIntakePass } from './components/BenchIntakePass';
import { ExportBarcodeLabelGenerator } from './components/ExportBarcodeLabelGenerator';
import { PrinterDiagnosticTroubleshooter } from './components/PrinterDiagnosticTroubleshooter';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { LocalClusterLandingPage } from './components/LocalClusterLandingPage';
import { AiHardwareDiagnosticBoard } from './components/AiHardwareDiagnosticBoard';
import { LocalCity, ClusterService, LOCAL_CITIES, CLUSTER_SERVICES } from './data/localClusters';
import { MessageSquare, Phone, ArrowUp, Search, Sparkles, MapPin, Wrench, ShieldCheck, CheckCircle2, FileText, Barcode, Printer } from 'lucide-react';

export default function App() {
  // Helper to extract city and service cluster from URL path
  const parseLocationFromPath = (): { city: LocalCity['slug']; service: ClusterService['slug'] } => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const parts = path.split('/');
      if (parts[0] === 'location' || parts[0] === 'locations') {
        const cityCandidate = parts[1] as LocalCity['slug'];
        const serviceCandidate = parts[2] as ClusterService['slug'];
        const validCity = cityCandidate && LOCAL_CITIES[cityCandidate] ? cityCandidate : 'daska';
        const validService = serviceCandidate && CLUSTER_SERVICES[serviceCandidate] ? serviceCandidate : 'it-consultancy';
        return { city: validCity, service: validService };
      }
    }
    return { city: 'daska', service: 'it-consultancy' };
  };

  // Universal page resolver for clean URLs, aliases, and legacy hashes
  const resolvePageFromPath = (rawPath: string): NavPageId => {
    const path = rawPath.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!path) return 'home';

    if (
      path === 'guides' ||
      path === 'guide' ||
      path === 'blogs' ||
      path === 'blog' ||
      path === 'guidelines' ||
      path === 'guideline' ||
      path === 'tech-guides' ||
      path === 'articles' ||
      path.startsWith('blog/') ||
      path.startsWith('blogs/') ||
      path.startsWith('guide/') ||
      path.startsWith('guides/') ||
      path.startsWith('guideline/') ||
      path.startsWith('guidelines/')
    ) {
      return 'guides';
    }

    if (path === 'services' || path.startsWith('services/') || path === 'service') {
      return 'services';
    }

    if (path === 'portfolio' || path.startsWith('portfolio/') || path === 'projects' || path === 'case-studies') {
      return 'portfolio';
    }

    if (path === 'shop' || path.startsWith('shop/') || path === 'store' || path === 'products' || path === 'hardware') {
      return 'shop';
    }

    if (path === 'about' || path.startsWith('about/') || path === 'about-us' || path === 'company') {
      return 'about';
    }

    if (path === 'contact' || path.startsWith('contact/') || path === 'contact-us' || path === 'support') {
      return 'contact';
    }

    if (path === 'locations' || path === 'location' || path.startsWith('location/') || path.startsWith('locations/')) {
      return 'locations';
    }

    if (
      path === 'invoice' ||
      path === 'invoice-generator' ||
      path === 'invoice-hub' ||
      path === 'invoicing' ||
      path === 'invoices' ||
      path.startsWith('invoice/') ||
      path.startsWith('invoice-generator/')
    ) {
      return 'invoice';
    }

    return 'home';
  };

  // Read initial page from clean URL pathname (with hash backward compatibility)
  const getInitialPage = (): NavPageId => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (path) {
        return resolvePageFromPath(path);
      }
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        return resolvePageFromPath(hash);
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<NavPageId>(getInitialPage);
  const [clusterParams, setClusterParams] = useState(parseLocationFromPath);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isIntakePassOpen, setIsIntakePassOpen] = useState<boolean>(false);
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyType>(null);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Website Development');
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // Initialize Anti-Copy, Anti-Scrape, and Console Security Shield
  useEffect(() => {
    initializeConsoleShield();
    const cleanupShield = initAntiCopyShield((msg) => {
      setSecurityAlert(msg);
    });
    return () => cleanupShield();
  }, []);

  // Synchronize Page Title, Meta Description, Open Graph & Sialkot SEO tags per sub-page
  useEffect(() => {
    applyPageSEO(currentPage);
  }, [currentPage]);

  // Clean URL synchronization: listen to browser back/forward buttons (popstate) and legacy hash
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();

      // Check direct policy modal routes
      if (path === 'privacy-policy' || path === 'privacy') {
        setActivePolicyModal('privacy');
      } else if (path === 'terms-and-conditions' || path === 'terms') {
        setActivePolicyModal('terms');
      } else if (path === 'warranty-policy' || path === 'warranty' || path === 'refund') {
        setActivePolicyModal('refund');
      }

      // Check specialized industrial solutions / tools direct routes
      const SPECIALIZED_SECTION_MAP: Record<string, string> = {
        'sialkot-it-services': 'services',
        'laptop-repairing-sialkot': 'laptop-repair-estimator',
        'pos-software-sialkot': 'sialkot-industrial-solutions',
        'sialkot-export-erp': 'sialkot-industrial-solutions',
        'export-barcode-studio': 'export-barcode-studio',
        'printer-troubleshooter': 'printer-diagnostics',
        'factory-network-tester': 'factory-network-tester',
        'live-repair-tracker': 'live-repair-tracker',
        'thermal-hotspot-inspector': 'thermal-inspector',
      };

      if (SPECIALIZED_SECTION_MAP[path]) {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(SPECIALIZED_SECTION_MAP[path]);
          if (el) {
            const navOffset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 150);
        return;
      }

      if (path) {
        if (path === 'locations' || path.startsWith('location')) {
          setClusterParams(parseLocationFromPath());
        }
        setCurrentPage(resolvePageFromPath(path));
      } else if (hash) {
        const resolved = resolvePageFromPath(hash);
        if (resolved !== 'home') {
          setCurrentPage(resolved);
        } else {
          // If hash points to an element id on home page, scroll to it
          setCurrentPage('home');
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              const navOffset = 80;
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        setCurrentPage('home');
      }
    };

    // Run on initial load
    syncRouteFromLocation();

    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  // Global keyboard shortcut to open search modal (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigate to dedicated page with clean URL path (e.g. /services, /portfolio, /shop)
  const navigateToPage = (page: NavPageId, subTarget?: string) => {
    setCurrentPage(page);

    // Clean Path Format: /services, /portfolio, /shop, /about, /guides, /contact, or /
    const cleanPath = page === 'home' ? '/' : `/${page}`;

    // Update browser URL bar cleanly using HTML5 pushState (no hash '#')
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({ page, subTarget }, '', cleanPath);
    } else if (window.location.hash) {
      // Clear out outdated hash if present
      window.history.replaceState({ page, subTarget }, '', cleanPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (subTarget) {
      setTimeout(() => {
        const el = document.getElementById(subTarget);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 250);
    }
  };

  const handleNavigateFromSearch = (sectionId: SectionId, elementId?: string) => {
    // Map sectionId to PageId
    let targetPage: NavPageId = 'home';
    if (sectionId === 'services') targetPage = 'services';
    else if (sectionId === 'portfolio') targetPage = 'portfolio';
    else if (sectionId === 'shop') targetPage = 'shop';
    else if (sectionId === 'about' || sectionId === 'reach') targetPage = 'about';
    else if (sectionId === 'blogs' || sectionId === 'faq') targetPage = 'guides';
    else if (sectionId === 'contact') targetPage = 'contact';

    navigateToPage(targetPage, elementId);
  };

  const handleOpenQuote = (serviceType: string = 'Website Development') => {
    setSelectedServiceForQuote(serviceType);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-red-500/20 selection:text-red-700 font-sans">
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Mobile App Install Notification Banner */}
      <PWAInstallBanner />

      {/* 1. Header Menu & Navigation (Compact, Customized with Sub-Categories) */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        onOpenQuote={() => handleOpenQuote('General Inquiry')}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area: Renders Dedicated Page View (with mobile dock clearance & Framer Motion entrance) */}
      <main className="flex-1 pb-16 lg:pb-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            {/* ========================================================
                PAGE 1: HOME PAGE (Concise, Curated & Beautiful)
               ======================================================== */}
        {currentPage === 'home' && (
          <div className="space-y-0">
            {/* 1a. Flagship Interactive Hero Slider with Touch-Swipe & Cross-Fade Visuals */}
            <HeroSlider
              onOpenQuote={(service) => handleOpenQuote(service || 'Website Development')}
              onNavigate={(section) => {
                if (section === 'services') navigateToPage('services');
                else if (section === 'portfolio') navigateToPage('portfolio');
                else if (section === 'contact') navigateToPage('contact');
                else if (section === 'about') navigateToPage('about');
                else if (section === 'shop') navigateToPage('shop');
                else navigateToPage('home');
              }}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* 1b. Hero 3-Pillar Interactive Capabilities Matrix */}
            <Hero
              onOpenQuote={(service) => handleOpenQuote(service || 'Website Development')}
              onNavigate={(section) => {
                if (section === 'services') navigateToPage('services');
                else if (section === 'portfolio') navigateToPage('portfolio');
                else if (section === 'contact') navigateToPage('contact');
                else if (section === 'about') navigateToPage('about');
                else if (section === 'shop') navigateToPage('shop');
                else navigateToPage('home');
              }}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* 1b. Concise Core Services Preview */}
            <HomeServicesPreview
              onNavigateToServices={() => navigateToPage('services')}
              onOpenQuote={handleOpenQuote}
            />

            {/* 1c. Concise About Us Highlight (Dubai 20+ Yrs Heritage Teaser) */}
            <HomeAboutPreview
              onNavigateToAbout={() => navigateToPage('about')}
              onOpenQuote={() => handleOpenQuote('General Consultation')}
            />

            {/* 1d. Concise Portfolio Preview (Top 3 UAE Client Deployments) */}
            <HomePortfolioPreview
              onNavigateToPortfolio={() => navigateToPage('portfolio')}
              onOpenQuote={handleOpenQuote}
            />

            {/* 1e. Concise Hardware Shop Preview */}
            <HomeShopPreview
              onNavigateToShop={() => navigateToPage('shop')}
              onInquireProduct={(productName) =>
                handleOpenQuote(`Hardware Inquiry: ${productName}`)
              }
            />

            {/* 1f. Sialkot Doorstep IT & Emergency Support Banner */}
            <section className="py-14 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span>Direct On-Site Dispatch Across Sialkot</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Need An Engineer At Your Office, Factory, or Home Today?
                    </h3>
                    <p className="text-red-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                      Our certified field technicians cover Paris Road, Sialkot Cantt, Small Industrial Estate, Sambrial, Daska Road, and surrounding export sectors. Rapid arrival within 60 minutes for critical POS or network outages.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => handleOpenQuote('Doorstep Sialkot On-Site IT Visit')}
                      className="px-6 py-3.5 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Wrench className="w-4 h-4 text-red-600" />
                      <span>Book On-Site Engineer Visit</span>
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I urgently need an on-site IT technician in Sialkot.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Urgent IT</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 1g. Sialkot Citywide Direct On-Site Coverage Explorer */}
            <SialkotAreaCoverage
              onOpenQuote={handleOpenQuote}
              onNavigatePage={navigateToPage}
            />

            {/* 1h. Live RMA Repair Ticket & Bench Diagnostics Tracker */}
            <LiveRepairTracker onOpenQuote={handleOpenQuote} />

            {/* 1i. Interactive Hardware & Laptop Diagnostic Cost Estimator */}
            <LaptopRepairEstimator onOpenQuote={handleOpenQuote} />

            {/* 1j. Interactive Before & After Hardware Micro-Soldering Gallery */}
            <HardwareBeforeAfterGallery onOpenQuote={handleOpenQuote} />

            {/* 1k. Laptop BIOS Blink & Beep Code Decoder Tool */}
            <HardwareBlinkBeepIdentifier />

            {/* 1l. FLIR Infrared Thermal Hotspot Short-Circuit Inspector */}
            <ThermalHotspotInspector />

            {/* 1l-2. LaserJet & Thermal Printer Troubleshooter */}
            <PrinterDiagnosticTroubleshooter onOpenQuote={handleOpenQuote} />

            {/* 1m. Interactive Motherboard Power Sequence & PCB Voltage Simulator */}
            <PCBPowerSequenceSimulator onOpenQuote={handleOpenQuote} />

            {/* 1m-2. EVONIX AI Hardware Diagnostics & Multimeter Test Point Simulator */}
            <AiHardwareDiagnosticBoard
              onOpenIntakePass={(fault) => {
                setSelectedServiceForQuote(fault || 'Component-Level Motherboard Repair');
                setIsIntakePassOpen(true);
              }}
              onOpenQuote={handleOpenQuote}
            />

            {/* 1n. CPU / GPU Thermal Throttling & Paste Degradation Calculator */}
            <ThermalLifecyclePredictor onOpenQuote={handleOpenQuote} />

            {/* 1o. Sialkot Export Industry ERP & Custom Software Suite */}
            <SialkotIndustrialSolutions onOpenQuote={handleOpenQuote} />

            {/* 1p. Sialkot Export Factory ERP & Network Latency Benchmark */}
            <FactoryNetworkLatencyTester />

            {/* 1p-2. Sialkot Export Barcode & Thermal Shipping Label Studio */}
            <ExportBarcodeLabelGenerator onOpenQuote={handleOpenQuote} />

            {/* 1q. Local Edge Offline LAN Sync Engine Simulator */}
            <OfflineDataSyncEngine />

            {/* 1o. Interactive Web & POS Software Project Cost Calculator */}
            <ProjectCostCalculator onOpenQuote={handleOpenQuote} />

            {/* 1m. Why Choose Us (Dubai Quality & Component Diagnostics) */}
            <WhyChooseUs />

            {/* 1h. Client Testimonials */}
            <Testimonials
              onOpenQuote={handleOpenQuote}
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
            />

            {/* 1i. Quick FAQ Preview */}
            <FAQ
              onOpenQuote={handleOpenQuote}
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
            />

            {/* 1j. Sialkot High-Value SEO Keywords & Search Intent Authority Hub */}
            <SialkotSeoKeywordsHub onNavigatePage={navigateToPage} />
          </div>
        )}

        {/* ========================================================
            PAGE 2: DEDICATED SERVICES PAGE
           ======================================================== */}
        {currentPage === 'services' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="Our Services"
              badgeText="Comprehensive IT Capabilities"
              title="Enterprise Services & Technology Solutions"
              subtitle="Two decades of Dubai high-availability systems engineering delivered in Sialkot, Pakistan. From enterprise e-commerce portals to custom retail ERPs and chip-level motherboard restoration."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('General Services Inquiry')}
            />

            {/* Full Detailed Services Section */}
            <Services onSelectServiceForQuote={handleOpenQuote} />

            {/* Sialkot Export Industry ERP & Custom Software Suite */}
            <SialkotIndustrialSolutions onOpenQuote={handleOpenQuote} />

            {/* Live RMA Repair Ticket & Bench Diagnostics Tracker */}
            <LiveRepairTracker onOpenQuote={handleOpenQuote} />

            {/* Interactive Hardware & Laptop Diagnostic Cost Estimator */}
            <LaptopRepairEstimator onOpenQuote={handleOpenQuote} />

            {/* Interactive Before & After Hardware Micro-Soldering Gallery */}
            <HardwareBeforeAfterGallery onOpenQuote={handleOpenQuote} />

            {/* Laptop BIOS Blink & Beep Code Decoder Tool */}
            <HardwareBlinkBeepIdentifier />

            {/* FLIR Infrared Thermal Hotspot Short-Circuit Inspector */}
            <ThermalHotspotInspector />

            {/* LaserJet & Thermal Printer Troubleshooter */}
            <PrinterDiagnosticTroubleshooter onOpenQuote={handleOpenQuote} />

            {/* Sialkot Export Factory ERP & Network Latency Benchmark */}
            <FactoryNetworkLatencyTester />

            {/* Sialkot Export Barcode & Thermal Shipping Label Studio */}
            <ExportBarcodeLabelGenerator onOpenQuote={handleOpenQuote} />

            {/* Interactive Web & POS Software Project Cost Calculator */}
            <ProjectCostCalculator onOpenQuote={handleOpenQuote} />

            {/* Technologies We Use (Tech Stack Badges) */}
            <Technologies onExploreService={(svc) => handleOpenQuote(svc || 'Website Development')} />

            {/* Centralized SEO Dashboard: Keyword Mapping & Health Tracking */}
            <CentralizedSeoDashboard onNavigatePage={navigateToPage} />

            {/* Doorstep On-Site Callout */}
            <div className="bg-slate-50 py-12 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Ready to Start Your Project With Dubai Standards?
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  Get a free technical consultation and formal quote tailored to your exact Sialkot business needs.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => handleOpenQuote('Custom Architecture Inquiry')}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-2xs"
                  >
                    Request Free Consultation
                  </button>
                  <button
                    onClick={() => navigateToPage('contact')}
                    className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 cursor-pointer"
                  >
                    Contact Sialkot Office
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 3: DEDICATED PORTFOLIO PAGE
           ======================================================== */}
        {currentPage === 'portfolio' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="Portfolio"
              badgeText="Proven UAE & Dubai Track Record"
              title="Valuable Client Deployments & Case Studies"
              subtitle="Explore high-volume e-commerce platforms, multi-currency trade portals, and enterprise retail POS systems delivered for leading corporations in Dubai, UAE and now Sialkot."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('Confidential NDA Case Study Presentation')}
              ctaText="Request NDA Case Studies"
            />

            {/* Full Portfolio Component */}
            <Portfolio
              onRequestPrivateMeeting={() =>
                handleOpenQuote('Confidential NDA Case Study Presentation')
              }
            />

            {/* Testimonials */}
            <Testimonials
              onOpenQuote={handleOpenQuote}
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 4: DEDICATED HARDWARE & SHOP PAGE
           ======================================================== */}
        {currentPage === 'shop' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="Hardware & Shop"
              badgeText="Original & Tested Commercial Hardware"
              title="IT Hardware, POS Systems & Equipment Shop"
              subtitle="Imported Dell/HP/Lenovo business laptops, heavy-duty 80mm thermal receipt printers, 2D barcode scanners, and all-in-one capacitive touch POS terminals with localized Sialkot warranties."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('Hardware Bulk Procurement Inquiry')}
              ctaText="Inquire Bulk Hardware"
            />

            {/* Full Shop Catalog Component */}
            <Shop
              onInquireProduct={(productName) =>
                handleOpenQuote(`Hardware / Shop Inquiry: ${productName}`)
              }
            />
          </div>
        )}

        {/* ========================================================
            PAGE 5: DEDICATED ABOUT US PAGE
           ======================================================== */}
        {currentPage === 'about' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="About Us"
              badgeText="20+ Years UAE Corporate Excellence"
              title="About EVONIX & Our Dubai Heritage"
              subtitle="Two decades of international engineering experience managing mission-critical IT infrastructure in Dubai, now translated into a high-precision diagnostic lab and tech hub in Sialkot, Pakistan."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('Corporate Partnership')}
              ctaText="Partner With Us"
            />

            {/* Full About Us Details */}
            <AboutUs />

            {/* Global Reach - Interactive D3 Geo-Bridge Dubai to Sialkot */}
            <GlobalReach
              onOpenQuote={handleOpenQuote}
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
            />

            {/* Why Choose Us */}
            <WhyChooseUs />
          </div>
        )}

        {/* ========================================================
            PAGE 6: DEDICATED TECHNICAL GUIDES & FAQ PAGE
           ======================================================== */}
        {currentPage === 'guides' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="Tech Blogs & Case Studies"
              badgeText="EVONIX Engineering Blogs & Knowledge Hub"
              title="Official Tech Blogs, Hardware Guides & Field Case Studies"
              subtitle="Practical, ground-level engineering blogs written by EVONIX technicians. Covers retail thermal printer troubleshooting, laptop overheating fixes, factory network sync, and chip-level motherboard restoration in Sialkot."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('Technical Consultation')}
              ctaText="Ask An Engineer"
            />

            {/* Blog Hub with 80+ SEO Guides */}
            <BlogHub
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
              onOpenQuoteModal={handleOpenQuote}
            />

            {/* Sialkot Citywide Direct On-Site Coverage Hub */}
            <SialkotAreaCoverage
              onOpenQuote={handleOpenQuote}
              onNavigatePage={navigateToPage}
            />

            {/* High-Value Sialkot Ranking Keywords & Local SEO Strategy Hub */}
            <SialkotSeoKeywordsHub onNavigatePage={navigateToPage} />

            {/* Google Per-Page Keyword Mapping & Search Intent Matrix */}
            <KeywordMappingHub onNavigatePage={navigateToPage} />

            {/* Centralized SEO Dashboard: Keyword Mapping & Intent Health */}
            <CentralizedSeoDashboard onNavigatePage={navigateToPage} />

            {/* Full FAQ Accordion */}
            <FAQ
              onOpenQuote={handleOpenQuote}
              onNavigateSection={(sec) => navigateToPage(sec as NavPageId)}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 7: DEDICATED CONTACT US PAGE
           ======================================================== */}
        {currentPage === 'contact' && (
          <div className="space-y-0">
            <PageHeaderBanner
              breadcrumbCurrent="Contact & Support"
              badgeText="Sialkot Service Lab & Office"
              title="Contact EVONIX & Book On-Site Visit"
              subtitle="Reach out to our engineering lab on Paris Road and Sialkot Cantt. Automatic GPS sensor pinpoints your location area in Sialkot with an instant tracking reference code dispatched to evonixtec@gmail.com."
              onNavigateHome={() => navigateToPage('home')}
              onOpenQuote={() => handleOpenQuote('Direct Sialkot Inquiry')}
              ctaText="Get Free Quote"
            />

            {/* Full Contact Section with GPS Sensor & Reference Code */}
            <ContactSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {/* ========================================================
            PAGE 8: DEDICATED LOCAL SEO SERVICE CLUSTER LANDING PAGES
            (Daska, Sambrial, Wazirabad Service Matrices)
           ======================================================== */}
        {currentPage === 'locations' && (
          <div className="space-y-0">
            <LocalClusterLandingPage
              initialCity={clusterParams.city}
              initialService={clusterParams.service}
              onOpenQuote={handleOpenQuote}
              onNavigatePage={navigateToPage}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 9: DEDICATED GLOBAL ZERO-DATABASE ENTERPRISE INVOICE HUB
           ======================================================== */}
        {currentPage === 'invoice' && (
          <div className="space-y-0">
            <GlobalInvoiceHub />
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 7. Footer Tagline, Policies & Navigation */}
      <Footer
        onNavigate={(sec) => navigateToPage(sec as NavPageId)}
        onOpenQuote={() => handleOpenQuote('General Inquiry')}
        onOpenPolicy={(type) => setActivePolicyModal(type)}
      />

      {/* Corporate Policy Modal (Privacy, Terms & Refund) */}
      <PolicyModal
        policyType={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />

      {/* Anti-Copy and Security Alert Notification Toast */}
      <SecurityAlertToast
        message={securityAlert}
        onClose={() => setSecurityAlert(null)}
      />

      {/* Interactive Quick Search Modal (Command Palette across Services, Portfolio & Shop) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToSection={handleNavigateFromSearch}
        onSelectForQuote={handleOpenQuote}
      />

      {/* Interactive Free Quote Dialog with Sialkot GPS Sensor & Reference Code */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={selectedServiceForQuote}
      />

      {/* Live Human Engineering Support Desk with Engr. Hamza Tariq (Hidden on Invoice Hub) */}
      {currentPage !== 'invoice' && <LiveSupportChat onOpenQuote={handleOpenQuote} />}

      {/* Official Free Bench Intake Pass Generator Dialog */}
      <BenchIntakePass
        isOpen={isIntakePassOpen}
        onClose={() => setIsIntakePassOpen(false)}
        defaultDevice={selectedServiceForQuote}
      />

      {/* Native App-Style Mobile Bottom Navigation Dock (Thumb Reach) - Hidden on Invoice Hub */}
      {currentPage !== 'invoice' && (
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={navigateToPage}
          onOpenChat={() => window.dispatchEvent(new CustomEvent('open-evonix-chat'))}
          onOpenQuote={() => handleOpenQuote('Mobile General Inquiry')}
        />
      )}

      {/* Desktop Floating Action Buttons (Hidden on invoice page to keep focus clean) */}
      {currentPage !== 'invoice' && (
        <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
          {/* Free Bench Pass Trigger */}
          <button
            onClick={() => setIsIntakePassOpen(true)}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 transition-all cursor-pointer"
            title="Print Free Bench Intake Pass"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Free Bench Pass</span>
          </button>

          {/* Quick Search Floating Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xl shadow-black/10 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
            title="Search Services, Portfolio & Hardware (Ctrl+K)"
          >
            <Search className="w-5 h-5 text-red-500" />
          </button>

          {/* WhatsApp in Sialkot */}
          <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I would like to get a free quote for IT services in Sialkot.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 transition-all cursor-pointer"
            title="Direct WhatsApp Support in Sialkot"
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span className="hidden sm:inline">WhatsApp Fast Support</span>
          </a>

          {/* Quick Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-red-600 border border-slate-200 shadow-lg transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Discrete Mobile-Only Back to Top Floating Button (Hidden on invoice page) */}
      {currentPage !== 'invoice' && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="lg:hidden fixed bottom-18 right-3 z-30 p-2 rounded-full bg-white/95 backdrop-blur-xs text-slate-700 hover:text-red-600 border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
          title="Back to Top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
