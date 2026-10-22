import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, SectionId } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar, NavPageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSlider } from './components/HeroSlider';
import { Footer } from './components/Footer';
import { type PolicyType } from './components/PolicyModal';
import { SecurityAlertToast } from './components/SecurityAlertToast';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageHeaderBanner } from './components/common/PageHeaderBanner';
import { COMPANY_INFO } from './data/content';
import { initAntiCopyShield, initializeConsoleShield } from './lib/security';
import { applyPageSEO } from './lib/seo';
import { ToolWorkspaceHeader } from './components/common/ToolWorkspaceHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { LocalCity, ClusterService, LOCAL_CITIES, CLUSTER_SERVICES } from './data/localClusters';
import { MessageSquare, Phone, ArrowUp, ArrowRight, Search, Sparkles, MapPin, Wrench, ShieldCheck, CheckCircle2, FileText, Barcode, Printer, Boxes, SlidersHorizontal, Calculator, Clock, Wifi, Globe } from 'lucide-react';
import { isToolPage } from './lib/toolUtils';

// Statically imported home sections for instant render and zero dynamic import fetch failures
import { HomeServicesPreview } from './components/home/HomeServicesPreview';
import { HomeAboutPreview } from './components/home/HomeAboutPreview';
import { HomePortfolioPreview } from './components/home/HomePortfolioPreview';
import { HomeShopPreview } from './components/home/HomeShopPreview';
import { HomeToolsGrid } from './components/home/HomeToolsGrid';
const LaptopRepairEstimator = lazy(() => import('./components/LaptopRepairEstimator').then(m => ({ default: m.LaptopRepairEstimator })));
const GoogleReviewsSection = lazy(() => import('./components/GoogleReviewsSection').then(m => ({ default: m.GoogleReviewsSection })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));

// Lazy-loaded dedicated subpages & utility panels
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const Services = lazy(() => import('./components/Services').then(m => ({ default: m.Services })));
const Technologies = lazy(() => import('./components/Technologies').then(m => ({ default: m.Technologies })));
const GlobalReach = lazy(() => import('./components/GlobalReach').then(m => ({ default: m.GlobalReach })));
const Portfolio = lazy(() => import('./components/Portfolio').then(m => ({ default: m.Portfolio })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const ToolsHub = lazy(() => import('./components/ToolsHub').then(m => ({ default: m.ToolsHub })));
const FooterLinks = lazy(() => import('./components/FooterLinks'));
const PolicyModal = lazy(() => import('./components/PolicyModal'));

// Lazy-loaded heavy tools, calculators and modals to reduce main bundle and speed up initial page render
const GlobalInvoiceHub = lazy(() => import('./components/GlobalInvoiceHub').then(m => ({ default: m.GlobalInvoiceHub })));
const EcommerceCalculator = lazy(() => import('./components/EcommerceCalculator'));
const CbmCalculator = lazy(() => import('./components/CbmCalculator'));
const DeveloperCostCalculator = lazy(() => import('./components/DeveloperCostCalculator').then(m => ({ default: m.DeveloperCostCalculator })));
const AiVisibilityChecker = lazy(() => import('./components/AiVisibilityChecker').then(m => ({ default: m.AiVisibilityChecker })));
const UkEuVatCalculator = lazy(() => import('./components/UkEuVatCalculator'));
const UsDutyNexusEstimator = lazy(() => import('./components/UsDutyNexusEstimator'));
const CeUkcaComplianceGenerator = lazy(() => import('./components/CeUkcaComplianceGenerator'));
const ProjectCostCalculator = lazy(() => import('./components/ProjectCostCalculator').then(m => ({ default: m.ProjectCostCalculator })));
const SialkotAreaCoverage = lazy(() => import('./components/SialkotAreaCoverage').then(m => ({ default: m.SialkotAreaCoverage })));
const SialkotSeoKeywordsHub = lazy(() => import('./components/SialkotSeoKeywordsHub').then(m => ({ default: m.SialkotSeoKeywordsHub })));
const KeywordMappingHub = lazy(() => import('./components/KeywordMappingHub').then(m => ({ default: m.KeywordMappingHub })));
const CentralizedSeoDashboard = lazy(() => import('./components/CentralizedSeoDashboard').then(m => ({ default: m.CentralizedSeoDashboard })));
const LiveRepairTracker = lazy(() => import('./components/LiveRepairTracker').then(m => ({ default: m.LiveRepairTracker })));
const SialkotIndustrialSolutions = lazy(() => import('./components/SialkotIndustrialSolutions').then(m => ({ default: m.SialkotIndustrialSolutions })));
const HardwareBeforeAfterGallery = lazy(() => import('./components/HardwareBeforeAfterGallery').then(m => ({ default: m.HardwareBeforeAfterGallery })));
const PCBPowerSequenceSimulator = lazy(() => import('./components/PCBPowerSequenceSimulator').then(m => ({ default: m.PCBPowerSequenceSimulator })));
const ThermalLifecyclePredictor = lazy(() => import('./components/ThermalLifecyclePredictor').then(m => ({ default: m.ThermalLifecyclePredictor })));
const OfflineDataSyncEngine = lazy(() => import('./components/OfflineDataSyncEngine').then(m => ({ default: m.OfflineDataSyncEngine })));
const HardwareBlinkBeepIdentifier = lazy(() => import('./components/HardwareBlinkBeepIdentifier').then(m => ({ default: m.HardwareBlinkBeepIdentifier })));
const ThermalHotspotInspector = lazy(() => import('./components/ThermalHotspotInspector').then(m => ({ default: m.ThermalHotspotInspector })));
const FactoryNetworkLatencyTester = lazy(() => import('./components/FactoryNetworkLatencyTester').then(m => ({ default: m.FactoryNetworkLatencyTester })));
const BenchIntakePass = lazy(() => import('./components/BenchIntakePass').then(m => ({ default: m.BenchIntakePass })));
const ExportBarcodeLabelGenerator = lazy(() => import('./components/ExportBarcodeLabelGenerator').then(m => ({ default: m.ExportBarcodeLabelGenerator })));
const PrinterDiagnosticTroubleshooter = lazy(() => import('./components/PrinterDiagnosticTroubleshooter').then(m => ({ default: m.PrinterDiagnosticTroubleshooter })));
const LocalClusterLandingPage = lazy(() => import('./components/LocalClusterLandingPage').then(m => ({ default: m.LocalClusterLandingPage })));
const AiHardwareDiagnosticBoard = lazy(() => import('./components/AiHardwareDiagnosticBoard').then(m => ({ default: m.AiHardwareDiagnosticBoard })));
const Shop = lazy(() => import('./components/Shop').then(m => ({ default: m.Shop })));
const BlogHub = lazy(() => import('./components/BlogHub').then(m => ({ default: m.BlogHub })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const LiveSupportChat = lazy(() => import('./components/LiveSupportChat').then(m => ({ default: m.LiveSupportChat })));
const AiTravelGuidePage = lazy(() => import('./components/AiTravelGuidePage').then(m => ({ default: m.AiTravelGuidePage })));
const AiTripPlannerStandalonePage = lazy(() => import('./components/AiTripPlannerStandalonePage').then(m => ({ default: m.AiTripPlannerStandalonePage })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));
const DoorstepSupportPage = lazy(() => import('./components/DoorstepSupportPage').then(m => ({ default: m.DoorstepSupportPage })));
const SialkotExportErpPage = lazy(() => import('./components/SialkotExportErpPage').then(m => ({ default: m.SialkotExportErpPage })));
const GuidelinesPage = lazy(() => import('./components/GuidelinesPage').then(m => ({ default: m.GuidelinesPage })));
// Resilient dynamic import helper with automatic retry and graceful fallback for lazy chunks
const lazyWithRetry = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T } | any>
): React.LazyExoticComponent<T> =>
  lazy<T>(async () => {
    try {
      const module = await factory();
      return { default: (module.default || module.TikTokShopCalculator || Object.values(module)[0]) as T };
    } catch (error) {
      console.warn('Initial chunk load failed, retrying...', error);
      try {
        await new Promise((r) => setTimeout(r, 400));
        const retryModule = await factory();
        return { default: (retryModule.default || retryModule.TikTokShopCalculator || Object.values(retryModule)[0]) as T };
      } catch (retryErr) {
        console.error('Dynamic module load failed after retry:', retryErr);
        const FallbackView: React.FC = () => (
          <div className="py-20 px-4 text-center max-w-md mx-auto space-y-4">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-800">Module Update In Progress</h3>
              <p className="text-xs text-slate-600">This tool was updated. Please refresh to load the latest release.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer shadow-xs"
              >
                Reload Component
              </button>
            </div>
          </div>
        );
        return { default: FallbackView as unknown as T };
      }
    }
  });

const EbaySaleCalculator = lazyWithRetry(() => import('./components/EbaySaleCalculator'));
const TikTokShopCalculator = lazyWithRetry(() => import('./components/TikTokShopCalculator'));
const AmazonFbaCalculator = lazyWithRetry(() => import('./components/AmazonFbaCalculator'));
const ShopifyFeeCalculator = lazyWithRetry(() => import('./components/ShopifyFeeCalculator'));
const StripeFeeCalculator = lazyWithRetry(() => import('./components/StripeFeeCalculator'));
const TemuSellerCalculator = lazyWithRetry(() => import('./components/TemuSellerCalculator'));
const EtsyFeeCalculator = lazyWithRetry(() => import('./components/EtsyFeeCalculator'));
const AmazonFbmCalculator = lazyWithRetry(() => import('./components/AmazonFbmCalculator'));
const InstallationGuidePage = lazyWithRetry<React.FC<{ onNavigatePage?: (page: any) => void }>>(() => import('./components/InstallationGuidePage').then(m => ({ default: m.InstallationGuidePage })));
const TrendIntelligenceSuite = lazyWithRetry(() => import('./components/TrendIntelligenceSuite'));

// Loading spinner fallback for lazy chunks
const LazyLoaderFallback: React.FC = () => (
  <div className="py-24 flex flex-col items-center justify-center space-y-3 min-h-[300px]">
    <div className="w-9 h-9 rounded-full border-3 border-slate-200 border-t-red-600 animate-spin" />
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Evonix Engine...</span>
  </div>
);

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
      path === 'services/doorstep-support' ||
      path === 'doorstep-support' ||
      path === 'doorstep-it-support' ||
      path.startsWith('services/doorstep-support') ||
      path.startsWith('doorstep-support')
    ) {
      return 'doorstep-support';
    }

    if (
      path === 'sialkot-export-erp' ||
      path === 'export-erp' ||
      path === 'export-erp-software' ||
      path.startsWith('sialkot-export-erp')
    ) {
      return 'sialkot-export-erp';
    }

    if (
      path === 'guidelines' ||
      path === 'guideline' ||
      path === 'it-guidelines' ||
      path.startsWith('guidelines/') ||
      path.startsWith('guideline/')
    ) {
      return 'guidelines';
    }

    if (
      path === 'guides' ||
      path === 'guide' ||
      path === 'blogs' ||
      path === 'blog' ||
      path === 'tech-guides' ||
      path === 'articles' ||
      path.startsWith('blog/') ||
      path.startsWith('blogs/') ||
      path.startsWith('guide/') ||
      path.startsWith('guides/') ||
      path === 'pos-software-in-sialkot' ||
      path.startsWith('pos-software-in-sialkot') ||
      path === 'wholesale-leather-hardware-pos-barcode-system-rangpura-sialkot' ||
      path.startsWith('wholesale-leather-hardware') ||
      path === 'mobile-shop-pos-software-sialkot' ||
      path === 'sports-goods-shop-pos-software-sialkot' ||
      path === 'surgical-instruments-pos-software-sialkot'
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

    // Specific tool routes MUST be matched before generic 'tools'
    if (
      path === 'tools/ai-trip-planner' ||
      path === 'ai-trip-planner' ||
      path === 'trip-planner' ||
      path === 'ai-travel-planner' ||
      path.startsWith('tools/ai-trip-planner') ||
      path.startsWith('ai-trip-planner')
    ) {
      return 'ai-trip-planner';
    }

    if (
      path === 'ai-tools-name-for-travel-itinerary' ||
      path === 'ai-travel-tools' ||
      path === 'ai-tools-for-travel-itinerary' ||
      path === 'travel-itinerary-ai' ||
      path === 'blog/ai-tools-name-for-travel-itinerary' ||
      path === 'blogs/ai-tools-name-for-travel-itinerary' ||
      path.startsWith('ai-tools-name-for-travel-itinerary')
    ) {
      return 'ai-travel-tools';
    }

    if (
      path === 'export-barcode-studio' ||
      path === 'barcode-studio' ||
      path === 'barcode-generator' ||
      path === 'barcode-label-studio' ||
      path === 'barcode-label-generator' ||
      path.startsWith('export-barcode-studio/') ||
      path.startsWith('barcode-studio/')
    ) {
      return 'export-barcode-studio';
    }

    if (
      path === 'live-repair-tracker' ||
      path === 'repair-tracker' ||
      path === 'rma-tracker' ||
      path === 'track-repair' ||
      path.startsWith('live-repair-tracker/')
    ) {
      return 'live-repair-tracker';
    }

    if (
      path === 'printer-diagnostics' ||
      path === 'printer-troubleshooter' ||
      path === 'printer-repair' ||
      path.startsWith('printer-diagnostics/')
    ) {
      return 'printer-diagnostics';
    }

    if (
      path === 'factory-network-tester' ||
      path === 'network-tester' ||
      path === 'latency-tester' ||
      path.startsWith('factory-network-tester/')
    ) {
      return 'factory-network-tester';
    }

    if (
      path === 'tools/micro-invoice-generator' ||
      path === 'micro-invoice-generator' ||
      path === 'tools/invoice' ||
      path === 'invoice' ||
      path === 'invoice-generator' ||
      path === 'invoice-hub' ||
      path === 'invoicing' ||
      path === 'invoices' ||
      path.startsWith('tools/micro-invoice-generator') ||
      path.startsWith('micro-invoice-generator') ||
      path.startsWith('tools/invoice') ||
      path.startsWith('invoice/') ||
      path.startsWith('invoice-generator/')
    ) {
      return 'invoice';
    }

    if (
      path === 'ebay-fee-calculator' ||
      path === 'ebay-calculator' ||
      path === 'ebay-fee-profit-builder' ||
      path === 'ebay-fee' ||
      path === 'ebay-fees' ||
      path.startsWith('ebay-fee-calculator') ||
      path.startsWith('ebay-calculator')
    ) {
      return 'ebay-fee-calculator';
    }

    if (
      path === 'tiktok-shop-fee-calculator' ||
      path === 'tiktok-shop' ||
      path === 'tiktok-calculator' ||
      path === 'tiktok-fee' ||
      path.startsWith('tiktok-shop') ||
      path.startsWith('tiktok-fee')
    ) {
      return 'tiktok-shop-fee-calculator';
    }

    if (
      path === 'amazon-fba-calculator' ||
      path === 'amazon-fba' ||
      path === 'amazon-calculator' ||
      path === 'fba-calculator' ||
      path.startsWith('amazon-fba') ||
      path.startsWith('amazon-calculator')
    ) {
      return 'amazon-fba-calculator';
    }

    if (
      path === 'shopify-fee-calculator' ||
      path === 'shopify-calculator' ||
      path === 'shopify-fee' ||
      path.startsWith('shopify-fee') ||
      path.startsWith('shopify-calculator')
    ) {
      return 'shopify-fee-calculator';
    }

    if (
      path === 'stripe-fee-calculator' ||
      path === 'stripe-calculator' ||
      path === 'stripe-fee' ||
      path.startsWith('stripe-fee') ||
      path.startsWith('stripe-calculator')
    ) {
      return 'stripe-fee-calculator';
    }

    if (
      path === 'temu-seller-calculator' ||
      path === 'temu-calculator' ||
      path === 'temu-seller' ||
      path === 'temu-fee' ||
      path.startsWith('temu-seller') ||
      path.startsWith('temu-calculator')
    ) {
      return 'temu-seller-calculator';
    }

    if (
      path === 'etsy-fee-calculator' ||
      path === 'etsy-calculator' ||
      path === 'etsy-fee' ||
      path.startsWith('etsy-fee') ||
      path.startsWith('etsy-calculator')
    ) {
      return 'etsy-fee-calculator';
    }

    if (
      path === 'amazon-fbm-calculator' ||
      path === 'amazon-fbm' ||
      path === 'fbm-calculator' ||
      path === 'fbm-fee-calculator' ||
      path.startsWith('amazon-fbm') ||
      path.startsWith('fbm-')
    ) {
      return 'amazon-fbm-calculator';
    }

    if (
      path === 'installation-guide' ||
      path === 'setup-guide' ||
      path === 'hwid-guide' ||
      path === 'desktop-guide' ||
      path.startsWith('installation-guide')
    ) {
      return 'installation-guide';
    }

    if (
      path === 'ecommerce-calculator' ||
      path === 'ecom-calculator' ||
      path === 'margin-calculator' ||
      path === 'calculator' ||
      path === 'shipping-calculator' ||
      path === 'courier-calculator' ||
      path.startsWith('ecommerce-calculator/') ||
      path.startsWith('margin-calculator/')
    ) {
      return 'ecommerce-calculator';
    }

    if (
      path === 'cbm-calculator' ||
      path === 'cbm' ||
      path === 'cbm-engine' ||
      path === 'professional-freight-analyzer' ||
      path === 'freight-analyzer' ||
      path === 'export-cbm-calculator' ||
      path === 'volumetric-calculator' ||
      path.startsWith('cbm-calculator/') ||
      path.startsWith('cbm/') ||
      path.startsWith('professional-freight-analyzer')
    ) {
      return 'cbm-calculator';
    }

    if (
      path === 'hire-dedicated-developer-cost-calculator-pune-india' ||
      path === 'hire-dedicated-developer-cost-calculator' ||
      path === 'developer-cost-calculator' ||
      path === 'developer-cost' ||
      path === 'hire-developer-cost-calculator' ||
      path === 'developer-calculator' ||
      path === 'hire-developer' ||
      path.startsWith('hire-dedicated-developer-cost-calculator') ||
      path.startsWith('developer-cost-calculator')
    ) {
      return 'developer-cost-calculator';
    }

    if (
      path === 'ai-visibility-checker' ||
      path === 'ai-visibility' ||
      path === 'geo-checker' ||
      path === 'eeat-checker' ||
      path === 'website-eeat-ai-visibility-checker' ||
      path.startsWith('ai-visibility')
    ) {
      return 'ai-visibility-checker';
    }

    if (
      path === 'trend-intelligence-suite' ||
      path === 'trend-intelligence' ||
      path === 'trend-suite' ||
      path === 'trends' ||
      path.startsWith('trend-intelligence')
    ) {
      return 'trend-intelligence-suite';
    }

    if (
      path === 'tools' ||
      path === 'web-tools' ||
      path === 'online-tools' ||
      path === 'tools-hub' ||
      path === 'tool-portfolio' ||
      path === 'portfolio-tools' ||
      path === 'all-tools' ||
      path.startsWith('tools/') ||
      path.startsWith('web-tools/')
    ) {
      return 'tools';
    }

    if (
      path === 'admin' ||
      path === 'dashboard' ||
      path === 'portal' ||
      path === 'admin-portal' ||
      path === 'evonix-admin' ||
      path === 'management' ||
      path.startsWith('admin/') ||
      path.startsWith('portal/')
    ) {
      return 'admin';
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

      // Check direct policy modal routes (Web & Google Play Store Compliance)
      if (
        path === 'privacy-policy' ||
        path === 'privacy' ||
        path === 'app-privacy-policy' ||
        path === 'google-privacy' ||
        path === 'privacy-policy-tools'
      ) {
        setActivePolicyModal('privacy');
      } else if (
        path === 'terms-and-conditions' ||
        path === 'terms' ||
        path === 'terms-of-service' ||
        path === 'eula' ||
        path === 'app-terms'
      ) {
        setActivePolicyModal('terms');
      } else if (
        path === 'warranty-policy' ||
        path === 'warranty' ||
        path === 'refund' ||
        path === 'refund-policy' ||
        path === 'returns' ||
        path === 'cancellation-policy'
      ) {
        setActivePolicyModal('refund');
      } else if (
        path === 'mobile-policy' ||
        path === 'play-store-policy' ||
        path === 'google-play-policy' ||
        path === 'app-policy' ||
        path === 'android-policy'
      ) {
        setActivePolicyModal('mobile');
      } else if (
        path === 'data-safety' ||
        path === 'safety-matrix' ||
        path === 'tools-safety' ||
        path === 'tool-data-safety'
      ) {
        setActivePolicyModal('matrix');
      }

      // Check specialized industrial home sections
      const SPECIALIZED_SECTION_MAP: Record<string, string> = {
        'sialkot-it-services': 'services',
        'laptop-repairing-sialkot': 'laptop-repair-estimator',
        'pos-software-sialkot': 'sialkot-industrial-solutions',
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

    const handlePolicyEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PolicyType>;
      if (customEvent.detail) {
        setActivePolicyModal(customEvent.detail);
      } else {
        setActivePolicyModal('privacy');
      }
    };

    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    window.addEventListener('evonix-open-policy', handlePolicyEvent);

    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('evonix-open-policy', handlePolicyEvent);
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
  const navigateToPage = (page: NavPageId | string, subTarget?: string) => {
    const SPECIALIZED_SECTION_MAP: Record<string, string> = {
      'sialkot-it-services': 'services',
      'laptop-repairing-sialkot': 'laptop-repair-estimator',
      'laptop-repair-estimator': 'laptop-repair-estimator',
      'pos-software-sialkot': 'sialkot-industrial-solutions',
      'thermal-hotspot-inspector': 'thermal-inspector',
      'thermal-inspector': 'thermal-inspector',
      'pcb-power-simulator': 'pcb-power-simulator',
    };

    if (SPECIALIZED_SECTION_MAP[page as string]) {
      setCurrentPage('home');
      setTimeout(() => {
        const targetId = SPECIALIZED_SECTION_MAP[page as string];
        const el = document.getElementById(targetId);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 200);
      return;
    }

    setCurrentPage(page as NavPageId);

    // Clean Path Format: /services, /portfolio, /shop, /about, /guides, /contact, or /
    let cleanPath = page === 'home' ? '/' : `/${page}`;
    if (page === 'ai-travel-tools') {
      cleanPath = '/ai-tools-name-for-travel-itinerary';
    } else if (page === 'ai-trip-planner') {
      cleanPath = '/tools/ai-trip-planner';
    } else if (page === 'doorstep-support') {
      cleanPath = '/services/doorstep-support';
    } else if (page === 'sialkot-export-erp') {
      cleanPath = '/sialkot-export-erp';
    } else if (page === 'guidelines') {
      cleanPath = '/guidelines';
    } else if (page === 'locations' && subTarget) {
      cleanPath = `/locations/${subTarget}`;
      setClusterParams({ city: subTarget as any, service: 'it-consultancy' });
    }

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
    if (elementId === 'ebay-fee-calculator' || elementId === 'ebay-calculator') {
      navigateToPage('ebay-fee-calculator');
      return;
    }
    if (elementId === 'ecommerce-calculator') {
      navigateToPage('ecommerce-calculator');
      return;
    }
    if (elementId === 'cbm-calculator' || elementId === 'export-cbm-calculator') {
      navigateToPage('cbm-calculator');
      return;
    }
    if (elementId === 'developer-cost-calculator' || elementId === 'developer-calculator') {
      navigateToPage('developer-cost-calculator');
      return;
    }
    if (elementId === 'invoice-hub') {
      navigateToPage('invoice');
      return;
    }
    if (elementId === 'ai-trip-planner') {
      navigateToPage('ai-trip-planner');
      return;
    }
    if (elementId === 'ai-travel-tools') {
      navigateToPage('ai-travel-tools');
      return;
    }
    if (elementId === 'tiktok-shop-fee-calculator' || elementId === 'tiktok-shop') {
      navigateToPage('tiktok-shop-fee-calculator');
      return;
    }
    if (elementId === 'amazon-fba-calculator' || elementId === 'amazon-fba') {
      navigateToPage('amazon-fba-calculator');
      return;
    }
    if (elementId === 'shopify-fee-calculator' || elementId === 'shopify-fee') {
      navigateToPage('shopify-fee-calculator');
      return;
    }
    if (elementId === 'stripe-fee-calculator' || elementId === 'stripe-fee') {
      navigateToPage('stripe-fee-calculator');
      return;
    }
    if (elementId === 'temu-seller-calculator' || elementId === 'temu-seller') {
      navigateToPage('temu-seller-calculator');
      return;
    }
    if (elementId === 'trend-intelligence-suite' || elementId === 'trend-intelligence') {
      navigateToPage('trend-intelligence-suite');
      return;
    }
    if (elementId === 'sialkot-export-erp' || elementId === 'sialkot-export-erp-suite') {
      navigateToPage('sialkot-export-erp');
      return;
    }
    if (elementId === 'installation-guide' || elementId === 'setup-guide' || elementId === 'desktop-installation-guide') {
      navigateToPage('installation-guide');
      return;
    }

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
            className="w-full pb-16 lg:pb-0"
          >
            <ErrorBoundary>
              <Suspense fallback={<LazyLoaderFallback />}>
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

            {/* 1e-2. Apple Liquid Glass Online Web Tools Grid */}
            <HomeToolsGrid
              onLaunchTool={(toolId) => navigateToPage(toolId)}
              onNavigateToToolsHub={() => navigateToPage('tools')}
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
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I urgently need an on-site IT technician in Sialkot.')}`}
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

            {/* 1g. Sialkot Citywide Direct On-Site Coverage Finder */}
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

            {/* 1m-2. evonix AI Hardware Diagnostics & Multimeter Test Point Simulator */}
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
            <ProjectCostCalculator
              onOpenQuote={handleOpenQuote}
              onNavigatePage={(page) => navigateToPage(page as NavPageId)}
            />

            {/* 1m. Why Choose Us (Dubai Quality & Component Diagnostics) */}
            <WhyChooseUs />

            {/* 1h. Genuine Google Business Reviews */}
            <GoogleReviewsSection />

            {/* 1h-2. Client Testimonials */}
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
            <Services
              onSelectServiceForQuote={handleOpenQuote}
              onNavigatePage={(page) => navigateToPage(page as NavPageId)}
            />

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

            {/* Technologies We Use (Tech Stack Badges) */}
            <Technologies onExploreService={(svc) => handleOpenQuote(svc || 'Website Development')} />

            {/* Centralized SEO Dashboard: Keyword Mapping & Health Tracking */}
            <CentralizedSeoDashboard onNavigatePage={navigateToPage} />

            {/* Featured High-CPC Web Tool Spotlight: eBay Fee & Profit Builder (Homepage Internal Linking) */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 py-10 px-4 text-white border-y border-blue-800/40">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                    <span>🏷️ Featured Online Tool</span>
                    <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-black text-[9px]">10 COUNTRIES</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    eBay Marketplace Fee &amp; Profit Builder
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Calculate exact Final Value Fees (FVF), promoted listings, international tariffs, and 100x bulk order margins across USA, UK, Germany, and 7 other global hubs.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <a
                    href="/ebay-fee-calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage('ebay-fee-calculator');
                    }}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Open eBay Fee Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/tools"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage('tools');
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View All Tools
                  </a>
                </div>
              </div>
            </div>

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
              subtitle="Review high-volume e-commerce platforms, multi-currency trade portals, and enterprise retail POS systems delivered for leading corporations in Dubai, UAE and now Sialkot."
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
              title="About evonix & Our Dubai Heritage"
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
              badgeText="evonix Engineering Blogs & Knowledge Hub"
              title="Official Tech Blogs, Hardware Guides & Field Case Studies"
              subtitle="Practical, ground-level engineering blogs written by evonix technicians. Covers retail thermal printer troubleshooting, laptop overheating fixes, factory network sync, and chip-level motherboard restoration in Sialkot."
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
              title="Contact evonix & Book On-Site Visit"
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
            PAGE 9: DEDICATED ONLINE WEB TOOLS PORTFOLIO HUB
           ======================================================== */}
        {currentPage === 'tools' && (
          <div className="space-y-0">
            <ToolsHub
              onLaunchTool={(target) => navigateToPage(target as NavPageId)}
              onNavigateHome={() => navigateToPage('home')}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 10: DEDICATED GLOBAL ZERO-DATABASE ENTERPRISE INVOICE HUB
           ======================================================== */}
        {currentPage === 'invoice' && (
          <div className="space-y-0">
            <div className="print:hidden">
              <ToolWorkspaceHeader
                currentToolId="invoice"
                toolTitle="Free Global Micro-Invoice Generator - No Signup, 150+ Currencies, Instant PDF"
                toolCategory="Business & Export"
                toolDescription="Create invoice in browser, data never leaves your device. Designed for freelance billing and small business invoicing with 150+ currencies, paper-style editor, automatic tax calculation, and instant A4 PDF download."
                icon={<FileText className="w-5 h-5 text-emerald-500" />}
                onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
                onNavigateToolsHub={() => navigateToPage('tools')}
              />
            </div>
            <GlobalInvoiceHub />
          </div>
        )}

        {/* ========================================================
            PAGE 11: EXPORT BARCODE LABEL STUDIO
           ======================================================== */}
        {currentPage === 'export-barcode-studio' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="export-barcode-studio"
              toolTitle="Export Barcode Label Studio"
              toolCategory="Business & Export"
              toolDescription="Generate compliant thermal shipping labels and outer carton barcodes for surgical, leather & sports exports."
              icon={<Barcode className="w-5 h-5 text-red-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <div className="py-8 bg-slate-100 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ExportBarcodeLabelGenerator onOpenQuote={handleOpenQuote} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 12: EXPORT CBM & VOLUMETRIC CARGO ENGINE
           ======================================================== */}
        {currentPage === 'cbm-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="cbm-calculator"
              toolTitle="B2B Industrial CBM & Freight Engine"
              toolCategory="Business & Export"
              toolDescription="Cubic Meters (CBM), Air Freight Volumetric Weights, and Container Capacity Estimator."
              icon={<Boxes className="w-5 h-5 text-cyan-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <CbmCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE 13: E-COMMERCE PROFIT & COURIER SHIPPING MARGIN CALCULATOR
           ======================================================== */}
        {currentPage === 'ecommerce-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="ecommerce-calculator"
              toolTitle="E-Commerce Margin & COD Simulator"
              toolCategory="E-Commerce & Ads"
              toolDescription="Calculate net profit margins, ad spend ROAS, multi-courier COD fees, and return loss simulations."
              icon={<SlidersHorizontal className="w-5 h-5 text-amber-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <EcommerceCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: EBAY SALE & PROFIT FEE CALCULATOR
           ======================================================== */}
        {currentPage === 'ebay-fee-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="ebay-fee-calculator"
              toolTitle="eBay Fee & Profit Builder"
              toolCategory="E-Commerce & Export"
              toolDescription="Calculate accurate eBay marketplace final value fees, promoted ads, international tariffs, and net payout margins."
              icon={<Calculator className="w-5 h-5 text-blue-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <EbaySaleCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: TIKTOK SHOP COMMISSION & FEE CALCULATOR
           ======================================================== */}
        {currentPage === 'tiktok-shop-fee-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="tiktok-shop-fee-calculator"
              toolTitle="TikTok Shop Fee Calculator UK & Pakistan 2026 - Commission & VAT"
              toolCategory="E-Commerce & Ads"
              toolDescription="Calculate TikTok Shop UK 9% commission, 20% VAT deductions, and Pakistan cross-border seller margins."
              icon={<SlidersHorizontal className="w-5 h-5 text-pink-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <TikTokShopCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: AMAZON FBA REVENUE & PROFIT CALCULATOR
           ======================================================== */}
        {currentPage === 'amazon-fba-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="amazon-fba-calculator"
              toolTitle="Amazon FBA Fee Calculator 2026 - Profit, Referral, Fulfillment + Fuel Surcharge"
              toolCategory="E-Commerce & Export"
              toolDescription="Calculate referral fee (8-45%), FBA fulfillment fee, 3.5% fuel surcharge, Oct 15 - Jan 14 peak fee $0.32, storage, inbound placement & net profit."
              icon={<Calculator className="w-5 h-5 text-amber-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <AmazonFbaCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: SHOPIFY PLAN & TRANSACTION FEE CALCULATOR
           ======================================================== */}
        {currentPage === 'shopify-fee-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="shopify-fee-calculator"
              toolTitle="Shopify Fee & Transaction Calculator"
              toolCategory="E-Commerce & Ads"
              toolDescription="Compare transaction fees across Basic, Shopify, and Advanced plans with external payment gateway rates."
              icon={<SlidersHorizontal className="w-5 h-5 text-emerald-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <ShopifyFeeCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: STRIPE PAYMENT PROCESSING FEE CALCULATOR
           ======================================================== */}
        {currentPage === 'stripe-fee-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="stripe-fee-calculator"
              toolTitle="Stripe Payment Fee Calculator"
              toolCategory="Business & Finance"
              toolDescription="Calculate domestic and international Stripe credit card processing fees with forward and reverse payout logic."
              icon={<Calculator className="w-5 h-5 text-indigo-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <StripeFeeCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: TEMU SELLER MARGIN & COMMISSION CALCULATOR
           ======================================================== */}
        {currentPage === 'temu-seller-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="temu-seller-calculator"
              toolTitle="Temu Seller Fee & Margin Calculator"
              toolCategory="E-Commerce & Export"
              toolDescription="Calculate Temu marketplace commissions, warehouse fulfillment expenses, and net profit yields."
              icon={<SlidersHorizontal className="w-5 h-5 text-orange-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <TemuSellerCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: ETSY FEE & PROFIT CALCULATOR
           ======================================================== */}
        {currentPage === 'etsy-fee-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="etsy-fee-calculator"
              toolTitle="Etsy Fee & Profit Calculator 2026"
              toolCategory="E-Commerce & Export"
              toolDescription="Calculate exact listing renewals, 6.5% transaction cut, payment processing, and net profit payout."
              icon={<Calculator className="w-5 h-5 text-orange-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <EtsyFeeCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: AMAZON FBM CALCULATOR
           ======================================================== */}
        {currentPage === 'amazon-fbm-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="amazon-fbm-calculator"
              toolTitle="Amazon FBM Fee & Profit Calculator 2026"
              toolCategory="E-Commerce & Export"
              toolDescription="Fulfilled by Merchant: category referral fees, merchant shipping tariffs, and net seller payout."
              icon={<Calculator className="w-5 h-5 text-blue-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <AmazonFbmCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: DESKTOP SETUP & HARDWARE KEY ACTIVATION GUIDE
           ======================================================== */}
        {currentPage === 'installation-guide' && (
          <InstallationGuidePage
            onNavigatePage={(page) => navigateToPage(page as NavPageId)}
          />
        )}

        {/* ========================================================
            PAGE 14: DEDICATED DEVELOPER COST CALCULATOR
           ======================================================== */}
        {currentPage === 'developer-cost-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="developer-cost-calculator"
              toolTitle="Dedicated Developer Cost Calculator"
              toolCategory="Business & Export"
              toolDescription="Compare USA, UK & UAE developer salaries against dedicated offshore engineers with instant savings summary."
              icon={<Calculator className="w-5 h-5 text-blue-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <DeveloperCostCalculator
              onOpenQuote={handleOpenQuote}
              onNavigatePage={(page) => navigateToPage(page as NavPageId)}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 15: WEBSITE E-E-A-T & AI VISIBILITY CHECKER
           ======================================================== */}
        {currentPage === 'ai-visibility-checker' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="ai-visibility-checker"
              toolTitle="AI Visibility & GEO Readiness Auditor"
              toolCategory="Growth & SEO"
              toolDescription="Client-side audit for ChatGPT, Claude, and Google AI Overviews visibility readiness & entity schema."
              icon={<Search className="w-5 h-5 text-purple-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <AiVisibilityChecker onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {/* ========================================================
            PAGE: UK & EU VAT REVERSE CHARGE CALCULATOR
           ======================================================== */}
        {currentPage === 'uk-eu-vat-calculator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="uk-eu-vat-calculator"
              toolTitle="UK & EU VAT Reverse Charge & VAT MOSS Engine"
              toolCategory="UK & Europe Compliance"
              toolDescription="Automate HMRC Section 55A and EU Directive 2006/112/EC 0% reverse charge VAT exemptions and statutory invoice clauses."
              icon={<Globe className="w-5 h-5 text-emerald-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <UkEuVatCalculator />
          </div>
        )}

        {/* ========================================================
            PAGE: US CUSTOMS TARIFF & SECTION 321 CALCULATOR
           ======================================================== */}
        {currentPage === 'us-duty-nexus-estimator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="us-duty-nexus-estimator"
              toolTitle="US Customs Tariff & Section 321 De Minimis Calculator"
              toolCategory="North America Trade"
              toolDescription="Calculate US CBP tariffs, verify the $800 duty-free Section 321 clearance, and estimate landed costs for US buyers."
              icon={<Globe className="w-5 h-5 text-blue-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <UsDutyNexusEstimator />
          </div>
        )}

        {/* ========================================================
            PAGE: UKCA & CE DECLARATION OF CONFORMITY GENERATOR
           ======================================================== */}
        {currentPage === 'ce-ukca-compliance-generator' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="ce-ukca-compliance-generator"
              toolTitle="UKCA & CE Declaration of Conformity (DoC) Generator"
              toolCategory="UK & Europe Compliance"
              toolDescription="Generate audited technical Declaration of Conformity documents for CE Marking (EU MDR Class I) and UKCA tenders."
              icon={<Globe className="w-5 h-5 text-purple-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <CeUkcaComplianceGenerator />
          </div>
        )}

        {/* ========================================================
            PAGE 16: LIVE RMA BENCH REPAIR TRACKER
           ======================================================== */}
        {currentPage === 'live-repair-tracker' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="live-repair-tracker"
              toolTitle="Live RMA Bench Repair Tracker"
              toolCategory="Hardware Diagnostics"
              toolDescription="Track motherboard micro-soldering progress, standby current readings, and 90-day warranty ticket status."
              icon={<Clock className="w-5 h-5 text-emerald-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <div className="py-8 bg-slate-900 min-h-screen text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LiveRepairTracker onOpenQuote={handleOpenQuote} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 17: THERMAL RECEIPT & BARCODE PRINTER DIAGNOSTICS
           ======================================================== */}
        {currentPage === 'printer-diagnostics' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="printer-diagnostics"
              toolTitle="Thermal Receipt Printer Diagnostic Engine"
              toolCategory="Hardware Diagnostics"
              toolDescription="Interactive diagnostics for HP paper jams, torn fuser sleeves, and thermal receipt auto-cutter errors."
              icon={<Printer className="w-5 h-5 text-orange-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <div className="py-8 bg-slate-900 min-h-screen text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PrinterDiagnosticTroubleshooter onOpenQuote={handleOpenQuote} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 18: FACTORY ERP & CUSTOMS NETWORK LATENCY BENCHMARK
           ======================================================== */}
        {currentPage === 'factory-network-tester' && (
          <div className="space-y-0">
            <ToolWorkspaceHeader
              currentToolId="factory-network-tester"
              toolTitle="Factory ERP & Customs Latency Benchmark"
              toolCategory="Hardware Diagnostics"
              toolDescription="Test factory premise latency bottlenecks, SQL database lag, and WeBOC customs gateway ping stability."
              icon={<Wifi className="w-5 h-5 text-teal-500" />}
              onNavigateTool={(toolId) => navigateToPage(toolId as NavPageId)}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <div className="py-8 bg-slate-900 min-h-screen text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FactoryNetworkLatencyTester onOpenQuote={handleOpenQuote} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 19: 10 BEST AI TOOLS FOR TRAVEL ITINERARY GUIDE
           ======================================================== */}
        {currentPage === 'ai-travel-tools' && (
          <AiTravelGuidePage
            onNavigatePage={(page) => navigateToPage(page as NavPageId)}
            onOpenQuote={() => handleOpenQuote('AI Travel Systems')}
          />
        )}

        {/* ========================================================
            PAGE 20: AI TRIP PLANNER STANDALONE TOOL
           ======================================================== */}
        {currentPage === 'ai-trip-planner' && (
          <AiTripPlannerStandalonePage
            onNavigatePage={(page) => navigateToPage(page as NavPageId)}
            onOpenQuote={() => handleOpenQuote('AI Travel Planner Custom Solution')}
          />
        )}

        {/* ========================================================
            PAGE 21: PROTECTED ADMIN PORTAL & AUDIT HUB
           ======================================================== */}
        {currentPage === 'admin' && (
          <AdminPortal onNavigateHome={() => navigateToPage('home')} />
        )}

        {/* ========================================================
            PAGE 22: DOORSTEP SUPPORT & EMERGENCY DISPATCH HUB
           ======================================================== */}
        {currentPage === 'doorstep-support' && (
          <DoorstepSupportPage
            onNavigatePage={(page, subTarget) => navigateToPage(page as NavPageId, subTarget)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {/* ========================================================
            PAGE 23: SIALKOT EXPORT ERP & CUSTOMS SUITE
           ======================================================== */}
        {currentPage === 'sialkot-export-erp' && (
          <SialkotExportErpPage
            onNavigatePage={(page, subTarget) => navigateToPage(page as NavPageId, subTarget)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {/* ========================================================
            PAGE 24: IT INFRASTRUCTURE & HARDWARE GUIDELINES
           ======================================================== */}
        {currentPage === 'guidelines' && (
          <GuidelinesPage
            onNavigatePage={(page, subTarget) => navigateToPage(page as NavPageId, subTarget)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {/* ========================================================
            PAGE 25: TREND INTELLIGENCE SUITE (V15 MASTER BUILD)
           ======================================================== */}
        {currentPage === 'trend-intelligence-suite' && (
          <TrendIntelligenceSuite />
        )}
            </Suspense>
          </ErrorBoundary>
        </motion.div>
        </AnimatePresence>
      </main>

      {/* 7. Footer Tagline, Policies & Navigation */}
      {currentPage !== 'admin' && (
        <>
          <Footer
            onNavigate={(sec, subTarget) => navigateToPage(sec as NavPageId, subTarget)}
            onOpenQuote={() => handleOpenQuote('General Inquiry')}
            onOpenPolicy={(type) => setActivePolicyModal(type)}
          />
          {/* Main Template Shell Bottom Layer: 146 Interconnected Internal URLs */}
          <Suspense fallback={null}>
            <FooterLinks />
          </Suspense>
        </>
      )}

      {/* Corporate Policy Modal (Privacy, Terms & Refund) - On-demand lazy load */}
      {activePolicyModal && (
        <Suspense fallback={null}>
          <PolicyModal
            policyType={activePolicyModal}
            onClose={() => setActivePolicyModal(null)}
          />
        </Suspense>
      )}

      {/* Anti-Copy and Security Alert Notification Toast */}
      <SecurityAlertToast
        message={securityAlert}
        onClose={() => setSecurityAlert(null)}
      />

      {/* Interactive Quick Search Modal (Command Palette across Services, Portfolio & Shop) */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigateToSection={handleNavigateFromSearch}
            onSelectForQuote={handleOpenQuote}
          />
        </Suspense>
      )}

      {/* Interactive Free Quote Dialog with Sialkot GPS Sensor & Reference Code */}
      {isQuoteOpen && (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            initialService={selectedServiceForQuote}
            onNavigatePage={(page) => navigateToPage(page as NavPageId)}
          />
        </Suspense>
      )}

      {/* Live Human Engineering Support Desk with Engr. Hamza Tariq (Hidden on all Tool Pages) */}
      {!isToolPage(currentPage) && (
        <Suspense fallback={null}>
          <LiveSupportChat onOpenQuote={handleOpenQuote} />
        </Suspense>
      )}

      {/* Official Free Bench Intake Pass Generator Dialog */}
      {isIntakePassOpen && (
        <Suspense fallback={null}>
          <BenchIntakePass
            isOpen={isIntakePassOpen}
            onClose={() => setIsIntakePassOpen(false)}
            defaultDevice={selectedServiceForQuote}
          />
        </Suspense>
      )}

      {/* Native App-Style Mobile Bottom Navigation Dock (Thumb Reach) */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onOpenChat={() => window.dispatchEvent(new CustomEvent('open-evonix-chat'))}
        onOpenQuote={() => handleOpenQuote('Mobile General Inquiry')}
      />

      {/* Desktop Floating Action Buttons (Hidden on all Tool Pages to keep workspace 100% focused) */}
      {!isToolPage(currentPage) && (
        <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5 print:hidden">
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
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix technologies, I would like to get a free quote for IT services in Sialkot.')}`}
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

      {/* Discrete Mobile-Only Back to Top Floating Button (Hidden on all Tool Pages) */}
      {!isToolPage(currentPage) && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="lg:hidden fixed bottom-18 right-3 z-30 p-2 rounded-full bg-white/95 backdrop-blur-xs text-slate-700 hover:text-red-600 border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer print:hidden"
          title="Back to Top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
