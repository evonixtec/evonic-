import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { NavPageId } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { ParticleFieldCanvas } from './components/3d/ParticleFieldCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { TechStackSection } from './components/TechStackSection';
import { Portfolio } from './components/Portfolio';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StandaloneExportModal } from './components/StandaloneExportModal';

// Tools Portfolio and Workspace Headers
import { ToolsHub } from './components/ToolsHub';
import { ToolWorkspaceHeader } from './components/common/ToolWorkspaceHeader';

// 12 Tool Components
import { GlobalInvoiceHub } from './components/GlobalInvoiceHub';
import EcommerceCalculator from './components/EcommerceCalculator';
import CbmCalculator from './components/CbmCalculator';
import { DeveloperCostCalculator } from './components/DeveloperCostCalculator';
import { AiVisibilityChecker } from './components/AiVisibilityChecker';
import { UkEuVatCalculator } from './components/UkEuVatCalculator';
import { UsDutyNexusEstimator } from './components/UsDutyNexusEstimator';
import { CeUkcaComplianceGenerator } from './components/CeUkcaComplianceGenerator';
import { ExportBarcodeLabelGenerator } from './components/ExportBarcodeLabelGenerator';
import { LiveRepairTracker } from './components/LiveRepairTracker';
import { PrinterDiagnosticTroubleshooter } from './components/PrinterDiagnosticTroubleshooter';
import { FactoryNetworkLatencyTester } from './components/FactoryNetworkLatencyTester';

import {
  FileText,
  Boxes,
  SlidersHorizontal,
  Calculator,
  Search,
  Globe,
  Barcode,
  Clock,
  Printer,
  Wifi
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPageId | 'home'>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Basic Pathname Router
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (path) {
      if (
        path === 'tools' ||
        path === 'invoice' ||
        path === 'ecommerce-calculator' ||
        path === 'cbm-calculator' ||
        path === 'developer-cost-calculator' ||
        path === 'ai-visibility-checker' ||
        path === 'uk-eu-vat-calculator' ||
        path === 'us-duty-nexus-estimator' ||
        path === 'ce-ukca-compliance-generator' ||
        path === 'export-barcode-studio' ||
        path === 'live-repair-tracker' ||
        path === 'printer-diagnostics' ||
        path === 'factory-network-tester' ||
        path === 'services' ||
        path === 'portfolio' ||
        path === 'contact'
      ) {
        setCurrentPage(path as NavPageId);
      }
    }

    const handlePop = () => {
      const p = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase() || 'home';
      setCurrentPage(p as NavPageId);
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigateToPage = (page: NavPageId | string) => {
    setCurrentPage(page as NavPageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newUrl = page === 'home' ? '/' : `/${page}`;
      window.history.pushState(null, '', newUrl);
    } catch {
      // Fallback
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col font-sans selection:bg-[#00D4FF] selection:text-black">
      {/* 1. Loading Screen Bootloader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Ambient Cosmic 3D Particle Field Canvas */}
      <ParticleFieldCanvas count={800} />

      {/* 3. Top Navigation */}
      <Navbar
        onNavigateSection={scrollToSection}
        onOpenCodeModal={() => setShowCodeModal(true)}
        onOpenToolsHub={() => navigateToPage('tools')}
        isToolsActive={currentPage === 'tools'}
      />

      {/* 4. Main Body */}
      <main className="flex-1">
        {/* HOMEPAGE: 3D Tech Agency Experience */}
        {currentPage === 'home' && (
          <>
            <Hero
              onNavigateSection={scrollToSection}
              onOpenToolsHub={() => navigateToPage('tools')}
            />
            <Services />
            <TechStackSection />
            <Portfolio />
            <ContactSection />
          </>
        )}

        {/* STANDALONE SECTIONS (Deep links) */}
        {currentPage === 'services' && (
          <div className="pt-20">
            <Services />
          </div>
        )}

        {currentPage === 'portfolio' && (
          <div className="pt-20">
            <Portfolio />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="pt-20">
            <ContactSection />
          </div>
        )}

        {/* TOOLS HUB */}
        {currentPage === 'tools' && (
          <div className="pt-20">
            <ToolsHub
              onLaunchTool={navigateToPage}
              onNavigateHome={() => navigateToPage('home')}
            />
          </div>
        )}

        {/* 12 INDIVIDUAL TOOL WORKSPACES */}
        {currentPage === 'invoice' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="invoice"
              toolTitle="Global Micro-Invoice Generator"
              toolCategory="Business & Export"
              toolDescription="Zero-database multi-currency commercial invoices with Code128 barcodes and A4 PDF export."
              icon={<FileText className="w-5 h-5 text-emerald-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <GlobalInvoiceHub />
          </div>
        )}

        {currentPage === 'ecommerce-calculator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="ecommerce-calculator"
              toolTitle="E-Commerce Margin & COD Simulator"
              toolCategory="E-Commerce & Ads"
              toolDescription="Calculate net margins, courier COD commissions, return losses, and breakeven ROAS."
              icon={<SlidersHorizontal className="w-5 h-5 text-amber-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <EcommerceCalculator />
          </div>
        )}

        {currentPage === 'cbm-calculator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="cbm-calculator"
              toolTitle="B2B Industrial CBM & Freight Engine"
              toolCategory="Business & Export"
              toolDescription="CBM volume, air freight volumetric weights, and 20ft/40ft container capacity."
              icon={<Boxes className="w-5 h-5 text-cyan-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <CbmCalculator />
          </div>
        )}

        {currentPage === 'developer-cost-calculator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="developer-cost-calculator"
              toolTitle="Dedicated Developer Cost Calculator"
              toolCategory="Business & Export"
              toolDescription="Benchmark international tech salaries against dedicated Sialkot engineering squads."
              icon={<Calculator className="w-5 h-5 text-blue-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <DeveloperCostCalculator />
          </div>
        )}

        {currentPage === 'ai-visibility-checker' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="ai-visibility-checker"
              toolTitle="AI Visibility & E-E-A-T Checker"
              toolCategory="Growth & SEO"
              toolDescription="Client-side audit for ChatGPT, Claude, and Google AI Overviews citation readiness."
              icon={<Search className="w-5 h-5 text-purple-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <AiVisibilityChecker />
          </div>
        )}

        {currentPage === 'uk-eu-vat-calculator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="uk-eu-vat-calculator"
              toolTitle="UK & EU VAT Reverse Charge & MOSS Engine"
              toolCategory="UK & Europe Compliance"
              toolDescription="HMRC s.55A and European Union Directive 2006/112/EC 0% reverse charge calculation."
              icon={<Globe className="w-5 h-5 text-emerald-400" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <UkEuVatCalculator />
          </div>
        )}

        {currentPage === 'us-duty-nexus-estimator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="us-duty-nexus-estimator"
              toolTitle="US Customs Tariff & Section 321 De Minimis Calculator"
              toolCategory="North America Trade"
              toolDescription="19 U.S.C. § 1321 $800 duty-free entry validation and US HTS tariff estimation."
              icon={<Globe className="w-5 h-5 text-blue-400" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <UsDutyNexusEstimator />
          </div>
        )}

        {currentPage === 'ce-ukca-compliance-generator' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="ce-ukca-compliance-generator"
              toolTitle="UKCA & CE Declaration of Conformity Generator"
              toolCategory="UK & Europe Compliance"
              toolDescription="Generate compliant technical Declaration of Conformity documents for EU MDR and UKCA."
              icon={<Globe className="w-5 h-5 text-purple-400" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <CeUkcaComplianceGenerator />
          </div>
        )}

        {currentPage === 'export-barcode-studio' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="export-barcode-studio"
              toolTitle="Export Barcode Label Studio"
              toolCategory="Business & Export"
              toolDescription="Thermal shipping labels and carton barcodes for surgical, leather & sports exports."
              icon={<Barcode className="w-5 h-5 text-red-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <ExportBarcodeLabelGenerator />
          </div>
        )}

        {currentPage === 'live-repair-tracker' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="live-repair-tracker"
              toolTitle="Live RMA Bench Repair Tracker"
              toolCategory="Hardware Diagnostics"
              toolDescription="Track motherboard micro-soldering progress and certified 90-day warranty tickets."
              icon={<Clock className="w-5 h-5 text-emerald-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <LiveRepairTracker />
          </div>
        )}

        {currentPage === 'printer-diagnostics' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="printer-diagnostics"
              toolTitle="Thermal Receipt Printer Diagnostic Engine"
              toolCategory="Hardware Diagnostics"
              toolDescription="Diagnostics for paper jams, torn fuser sleeves, and cutter errors."
              icon={<Printer className="w-5 h-5 text-orange-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <PrinterDiagnosticTroubleshooter />
          </div>
        )}

        {currentPage === 'factory-network-tester' && (
          <div className="pt-16">
            <ToolWorkspaceHeader
              currentToolId="factory-network-tester"
              toolTitle="Factory ERP & Customs Latency Benchmark"
              toolCategory="Hardware Diagnostics"
              toolDescription="Benchmark factory premise latency, SQL database response, and WeBOC ping."
              icon={<Wifi className="w-5 h-5 text-teal-500" />}
              onNavigateTool={navigateToPage}
              onNavigateToolsHub={() => navigateToPage('tools')}
            />
            <FactoryNetworkLatencyTester />
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenCodeModal={() => setShowCodeModal(true)}
        onOpenToolsHub={() => navigateToPage('tools')}
      />

      {/* 6. Single HTML CDN Code View / Download Modal */}
      <StandaloneExportModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </div>
  );
}
