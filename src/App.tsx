import React, { useState, useEffect } from 'react';
import { NavPageId } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToolsHub } from './components/ToolsHub';
import { ToolWorkspaceHeader } from './components/common/ToolWorkspaceHeader';

// Tool Components
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
  const [currentPage, setCurrentPage] = useState<NavPageId>('home');

  useEffect(() => {
    // Basic pathname router
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 pb-16 lg:pb-0">
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateToPage} />

      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            <Hero onNavigatePage={navigateToPage} />
            <Services onNavigatePage={navigateToPage} />
            <ContactSection />
          </>
        )}

        {/* PAGE 2: SERVICES */}
        {currentPage === 'services' && (
          <Services onNavigatePage={navigateToPage} />
        )}

        {/* PAGE 3: CONTACT */}
        {currentPage === 'contact' && (
          <ContactSection />
        )}

        {/* PAGE 4: TOOLS PORTFOLIO HUB */}
        {currentPage === 'tools' && (
          <ToolsHub
            onLaunchTool={navigateToPage}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {/* PAGE 5: GLOBAL INVOICE HUB */}
        {currentPage === 'invoice' && (
          <div>
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

        {/* PAGE 6: E-COMMERCE MARGIN SIMULATOR */}
        {currentPage === 'ecommerce-calculator' && (
          <div>
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

        {/* PAGE 7: CBM & CARGO ENGINE */}
        {currentPage === 'cbm-calculator' && (
          <div>
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

        {/* PAGE 8: DEVELOPER COST CALCULATOR */}
        {currentPage === 'developer-cost-calculator' && (
          <div>
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

        {/* PAGE 9: AI VISIBILITY CHECKER */}
        {currentPage === 'ai-visibility-checker' && (
          <div>
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

        {/* PAGE 10: UK & EU VAT REVERSE CHARGE */}
        {currentPage === 'uk-eu-vat-calculator' && (
          <div>
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

        {/* PAGE 11: US DUTY & SECTION 321 */}
        {currentPage === 'us-duty-nexus-estimator' && (
          <div>
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

        {/* PAGE 12: CE & UKCA DECLARATION OF CONFORMITY */}
        {currentPage === 'ce-ukca-compliance-generator' && (
          <div>
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

        {/* PAGE 13: EXPORT BARCODE STUDIO */}
        {currentPage === 'export-barcode-studio' && (
          <div>
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

        {/* PAGE 14: LIVE REPAIR TRACKER */}
        {currentPage === 'live-repair-tracker' && (
          <div>
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

        {/* PAGE 15: PRINTER DIAGNOSTICS */}
        {currentPage === 'printer-diagnostics' && (
          <div>
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

        {/* PAGE 16: FACTORY NETWORK TESTER */}
        {currentPage === 'factory-network-tester' && (
          <div>
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

      {/* Footer */}
      <Footer onNavigatePage={navigateToPage} />

      {/* Mobile Sticky Bottom Navigation Dock */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onOpenChat={() => {}}
      />
    </div>
  );
}
