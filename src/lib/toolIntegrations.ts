export interface ToolIntegrationDef {
  toolId: string;
  name: string;
  urduName: string;
  shortName: string;
  isMobileAppCore: boolean;
  mobileCoreOrder?: number;
  regionFocus?: 'UK/EU' | 'USA' | 'Global';
  category: 'business-export' | 'ecommerce-growth' | 'diagnostics-lab' | 'international-compliance';
  categoryLabel: string;
  summary: string;
  chatGptQuickPrompt: string;
  chatGptCustomGptInstructions: string;
  openApiSchema: object;
  geminiFunctionDeclaration: object;
  geminiSystemInstruction: string;
  geminiPromptTemplate: string;
  githubWorkflowYaml: string;
  githubSchemaSpec: object;
  cloudSamplePayload: object;
}

export const ALL_TOOL_INTEGRATIONS: Record<string, ToolIntegrationDef> = {
  invoice: {
    toolId: 'invoice',
    name: 'Global Micro-Invoice Generator',
    urduName: 'گلوبل مائیکرو انوائس جنریٹر',
    shortName: 'Invoice Maker',
    isMobileAppCore: true,
    mobileCoreOrder: 1,
    regionFocus: 'Global',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    summary: 'Zero-database client invoice generator with 100+ countries tax engine, live Code128 barcodes, and PDF export.',
    chatGptQuickPrompt: `Analyze the commercial invoice for Sialkot export: INV-2026-0042. Currency: USD. Items: Surgical Instruments ($6,200). Check European & US customs compliance, HS codes, and incoterms (FOB / CIF).`,
    chatGptCustomGptInstructions: `You are the evonix Global Commercial Invoice Assistant. Enforce tax compliance and output structured invoice summaries.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'evonix Invoice API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'generateGlobalInvoice', description: 'Calculates international commercial invoice totals.', parameters: { type: 'OBJECT', properties: { invoiceNumber: { type: 'STRING' } } } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Enterprise Invoice Engine. Calculate accurate commercial invoice totals for exporters in Kolti Behram, Sialkot.`,
    geminiPromptTemplate: `Evaluate commercial invoice {{invoiceNumber}} for international compliance.`,
    githubWorkflowYaml: `name: Invoice CI/CD\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "Verifying invoice schemas..."`,
    githubSchemaSpec: { title: 'InvoiceSchema', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'invoice', grandTotal: 6200 },
  },

  'ecommerce-calculator': {
    toolId: 'ecommerce-calculator',
    name: 'E-Commerce Margin & COD Simulator',
    urduName: 'ای کامرس بی ٹو بی مارجن کیلکولیٹر',
    shortName: 'E-Com Margin Calc',
    isMobileAppCore: true,
    mobileCoreOrder: 2,
    regionFocus: 'Global',
    category: 'ecommerce-growth',
    categoryLabel: 'E-Commerce Growth',
    summary: 'Calculate net profit margins, ad spend ROAS, multi-courier COD fees, and return loss simulations.',
    chatGptQuickPrompt: `Evaluate e-commerce unit economics: Selling Price PKR 4,500, Product Cost PKR 1,600, CAC PKR 1,100, Delivery PKR 280, Return Rate 18%. Compute net contribution margin.`,
    chatGptCustomGptInstructions: `You are the evonix E-Commerce Profitability Consultant.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Ecom Margin API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'calculateEcomProfit', description: 'Simulates net profit and COD returns.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini E-Commerce Optimizer for evonix.`,
    geminiPromptTemplate: `Compute margins for retail price {{price}} and ROAS {{roas}}.`,
    githubWorkflowYaml: `name: E-Commerce Margin Tests\non: [workflow_dispatch]`,
    githubSchemaSpec: { title: 'EcomMarginSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'ecommerce-calculator', netMargin: 23.5 },
  },

  'cbm-calculator': {
    toolId: 'cbm-calculator',
    name: 'B2B Industrial CBM & Freight Engine',
    urduName: 'بی ٹو بی انڈسٹریل CBM کارٹن و فریٹ کیلکولیٹر',
    shortName: 'CBM Cargo Engine',
    isMobileAppCore: true,
    mobileCoreOrder: 3,
    regionFocus: 'Global',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    summary: 'Compute carton volume in CBM, air volumetric weight, and 20ft/40ft/40HQ container stuffing capacity instantly.',
    chatGptQuickPrompt: `Analyze sea freight for 150 cartons (60x40x35cm, 18.5kg each). Calculate total CBM, container fill % for 20ft GP and air volumetric weight.`,
    chatGptCustomGptInstructions: `You are the evonix Logistics and CBM Calculation Assistant.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'CBM Logistics API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'calculateCbm', description: 'Calculates cargo Cubic Meters and container loading.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Industrial Cargo Specialist.`,
    geminiPromptTemplate: `Compute CBM for {{cartonCount}} cartons.`,
    githubWorkflowYaml: `name: CBM Verification\non: [push]`,
    githubSchemaSpec: { title: 'CbmSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'cbm-calculator', totalCbm: 12.6 },
  },

  'developer-cost-calculator': {
    toolId: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    urduName: 'ڈیڈیکیٹڈ ڈویلپر کاسٹ کیلکولیٹر',
    shortName: 'Developer Rates',
    isMobileAppCore: true,
    mobileCoreOrder: 4,
    regionFocus: 'USA',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    summary: 'Compare USA, UK & UAE developer salaries against dedicated offshore engineers with instant savings summary.',
    chatGptQuickPrompt: `Compare 4 Senior Full-Stack engineers in US ($170k burden each) vs dedicated evonix engineers ($26,400/year). Calculate annual net savings and ROI.`,
    chatGptCustomGptInstructions: `You are the evonix Dedicated Engineering Talent Advisor.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Developer Rate Comparison API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'calculateDevSavings', description: 'Calculates developer hiring cost differences.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Offshore Engineering Workforce Analyst for evonix.`,
    geminiPromptTemplate: `Compare cost for {{count}} developers in {{country}} vs dedicated evonix engineers.`,
    githubWorkflowYaml: `name: Developer Cost Sync\non: [schedule]`,
    githubSchemaSpec: { title: 'DevCostSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'developer-cost-calculator', annualSavings: 574400 },
  },

  'ai-visibility-checker': {
    toolId: 'ai-visibility-checker',
    name: 'AI Visibility & E-E-A-T Checker',
    urduName: 'اے آئی اویلیبلٹی ای ای اے ٹی چیکر',
    shortName: 'AI Visibility Audit',
    isMobileAppCore: true,
    mobileCoreOrder: 5,
    regionFocus: 'Global',
    category: 'ecommerce-growth',
    categoryLabel: 'Growth & SEO',
    summary: 'Client-side audit for ChatGPT, Claude, and Google AI Overviews visibility readiness & entity schema.',
    chatGptQuickPrompt: `Audit evonix technologies (Kolti Behram, Sialkot, Pakistan) for Generative Engine Optimization (GEO) and citation in ChatGPT / Perplexity / Google AI Overviews.`,
    chatGptCustomGptInstructions: `You are the evonix AI Search & GEO Auditor.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'AI Visibility API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'auditGeoReadiness', description: 'Audits domain readiness for generative AI citation.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini GEO Specialist for evonix.`,
    geminiPromptTemplate: `Audit {{domain}} for AI visibility and entity authority.`,
    githubWorkflowYaml: `name: AI Visibility Check\non: [schedule]`,
    githubSchemaSpec: { title: 'AiVisibilitySpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'ai-visibility-checker', geoScore: 94 },
  },

  // SPECIAL NEW TOOL FOR UK & EUROPE
  'uk-eu-vat-calculator': {
    toolId: 'uk-eu-vat-calculator',
    name: 'UK & EU VAT Reverse Charge & VAT MOSS Engine',
    urduName: 'یو کے و یورپین VAT معافی و ریورس چارج انجن',
    shortName: 'UK & EU VAT Engine',
    isMobileAppCore: false,
    regionFocus: 'UK/EU',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe Compliance',
    summary: 'Automate HMRC and EU 0% reverse charge VAT calculations, VIES validation checks, and Article 194 invoice statements for British and European B2B trade.',
    chatGptQuickPrompt: `You are an expert in UK HMRC and European Union Cross-Border VAT law. Review a B2B export invoice between a Sialkot exporter and a UK/German business:
- Buyer Country: United Kingdom (HMRC VAT Registered) or Germany (DE VAT)
- Net Amount: £15,000 / €18,000
- Service / Goods: Enterprise Software Engineering & Surgical Instruments
Confirm the exact reverse charge statement required under UK VAT Act 1994 s.55A and EU Directive 2006/112/EC Art 196 to guarantee 0% VAT exemption.`,
    chatGptCustomGptInstructions: `You are the evonix UK & EU VAT Compliance Assistant. Ensure proper reverse charge citations and VIES format validation.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'UK EU VAT Engine API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'calculateUkEuVat', description: 'Calculates UK HMRC and EU VAT reverse charge exemptions.', parameters: { type: 'OBJECT', properties: { country: { type: 'STRING' }, amount: { type: 'NUMBER' } } } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini UK & EU VAT Advisor for evonix technologies.`,
    geminiPromptTemplate: `Verify VAT status for {{country}} client and output compliant HMRC/EU reverse charge statement.`,
    githubWorkflowYaml: `name: VAT Rules Compliance Check\non: [push]`,
    githubSchemaSpec: { title: 'VatComplianceSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'uk-eu-vat-calculator', vatRate: 0, status: 'Reverse Charge Applied' },
  },

  // SPECIAL NEW TOOL FOR AMERICA (USA)
  'us-duty-nexus-estimator': {
    toolId: 'us-duty-nexus-estimator',
    name: 'US Customs Tariff (HTS) & Section 321 De Minimis Calculator',
    urduName: 'امریکی کسٹمز ڈیوٹی و سیکشن 321 چھوٹ کیلکولیٹر',
    shortName: 'US Duty & Nexus Calc',
    isMobileAppCore: false,
    regionFocus: 'USA',
    category: 'international-compliance',
    categoryLabel: 'North America Trade',
    summary: 'Calculate US Harmonized Tariff Schedule (HTS) duty rates, evaluate the $800 Section 321 duty-free de minimis threshold, and assess state economic sales tax nexus for US buyers.',
    chatGptQuickPrompt: `Evaluate US Customs duty and Section 321 entry for surgical and sports exports from Pakistan:
- Shipment Value: $750 (Consignment A) vs $4,200 (Consignment B)
- US State of Delivery: California / Texas
- HTS Code: 9018.90 (Medical & Surgical Instruments) or 9506.62 (Inflatable Balls)
Provide US CBP entry guidelines, Section 321 exemption eligibility, and estimated tariff duty.`,
    chatGptCustomGptInstructions: `You are the evonix US Trade & Customs Tariff Specialist.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'US Tariff & Nexus API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'calculateUsDuty', description: 'Calculates US customs duty and Section 321 exemption.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini US Customs Trade Advisor for evonix.`,
    geminiPromptTemplate: `Check Section 321 and duty for shipment value {{value}} into {{state}}.`,
    githubWorkflowYaml: `name: US Tariff Sync\non: [schedule]`,
    githubSchemaSpec: { title: 'UsTariffSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'us-duty-nexus-estimator', section321Eligible: true, dutyPayable: 0 },
  },

  // SPECIAL NEW TOOL FOR UK, AMERICA & EUROPE
  'ce-ukca-compliance-generator': {
    toolId: 'ce-ukca-compliance-generator',
    name: 'UKCA & CE Declaration of Conformity (DoC) Generator',
    urduName: 'سی ای مارک اور یو کے سی اے ڈیکلریشن جنریٹر',
    shortName: 'CE & UKCA Generator',
    isMobileAppCore: false,
    regionFocus: 'UK/EU',
    category: 'international-compliance',
    categoryLabel: 'UK & Europe Compliance',
    summary: 'Generate standardized Declaration of Conformity documents for CE Marking (EU MDR 2017/745, RoHS, EMC) and UKCA compliance required by UK and European procurement directors.',
    chatGptQuickPrompt: `Draft an official Declaration of Conformity (DoC) for medical surgical instruments and electronic devices:
- Manufacturer: evonix Technologies Lab, Kolti Behram, Sialkot, Pakistan
- Standards: ISO 13485:2016, EN ISO 14971, EU MDR 2017/745 Class I, UK Medical Devices Regulations 2002.
Format a ready-to-print executive certificate with authorized signatory declaration.`,
    chatGptCustomGptInstructions: `You are the evonix Regulatory Affairs and CE / UKCA Conformity Specialist.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Declaration of Conformity API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'generateConformityDeclaration', description: 'Generates CE / UKCA Declaration of Conformity documents.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Regulatory Affairs Specialist for evonix.`,
    geminiPromptTemplate: `Generate Declaration of Conformity for {{productName}} under {{directive}}.`,
    githubWorkflowYaml: `name: DoC Template Audit\non: [push]`,
    githubSchemaSpec: { title: 'DocTemplateSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'ce-ukca-compliance-generator', docStandard: 'ISO 13485 / MDR 2017/745' },
  },

  'export-barcode-studio': {
    toolId: 'export-barcode-studio',
    name: 'Export Barcode Label Studio',
    urduName: 'ایکسپورٹ بارکوڈ لیبل اسٹوڈیو',
    shortName: 'Barcode Studio',
    isMobileAppCore: false,
    regionFocus: 'Global',
    category: 'business-export',
    categoryLabel: 'Business & Export',
    summary: 'Generate compliant thermal shipping labels and outer carton barcodes for surgical, leather & sports exports.',
    chatGptQuickPrompt: `Generate GS1-128 shipping carton specification for Zebra / TSC thermal printer.`,
    chatGptCustomGptInstructions: `You are the evonix Barcode and Thermal Printing Specialist.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Barcode Studio API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'generateBarcode', description: 'Generates barcode label data.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Barcode Architect for evonix.`,
    geminiPromptTemplate: `Generate label for {{code}}.`,
    githubWorkflowYaml: `name: Barcode Verification\non: [push]`,
    githubSchemaSpec: { title: 'BarcodeSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'export-barcode-studio', symbology: 'GS1-128' },
  },

  'live-repair-tracker': {
    toolId: 'live-repair-tracker',
    name: 'Live RMA Bench Repair Tracker',
    urduName: 'لائیو ریپئر ٹریکر',
    shortName: 'Live RMA Tracker',
    isMobileAppCore: false,
    regionFocus: 'Global',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    summary: 'Track motherboard micro-soldering progress, standby current readings, and 90-day warranty ticket status.',
    chatGptQuickPrompt: `Review live diagnostic status for laptop bench ticket #EVX-8821 in Kolti Behram lab.`,
    chatGptCustomGptInstructions: `You are the evonix Hardware Diagnostics Bench Engineer.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'RMA Tracker API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'getRepairStatus', description: 'Fetches RMA status.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Hardware Technician for evonix.`,
    geminiPromptTemplate: `Check ticket {{ticketId}}.`,
    githubWorkflowYaml: `name: Ticket Sync\non: [workflow_dispatch]`,
    githubSchemaSpec: { title: 'RmaSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'live-repair-tracker', status: 'Passed QC' },
  },

  'printer-diagnostics': {
    toolId: 'printer-diagnostics',
    name: 'Thermal Receipt Printer Diagnostic Engine',
    urduName: 'پرنٹر ڈائیگنوسٹک انجن',
    shortName: 'Printer Diagnostics',
    isMobileAppCore: false,
    regionFocus: 'Global',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    summary: 'Interactive diagnostics for HP paper jams, torn fuser sleeves, and thermal receipt auto-cutter errors.',
    chatGptQuickPrompt: `Diagnose thermal receipt cutter jam on 80mm ESC/POS printer.`,
    chatGptCustomGptInstructions: `You are the evonix Printer Hardware Specialist.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Printer API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'diagnosePrinter', description: 'Diagnoses printer issues.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Printer Repair Specialist for evonix.`,
    geminiPromptTemplate: `Diagnose {{error}} on {{model}}.`,
    githubWorkflowYaml: `name: Printer Tests\non: [push]`,
    githubSchemaSpec: { title: 'PrinterSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'printer-diagnostics', result: 'Cutter cleared' },
  },

  'factory-network-tester': {
    toolId: 'factory-network-tester',
    name: 'Factory ERP & Customs Latency Benchmark',
    urduName: 'فیکٹری نیٹ ورک بینچ مارک',
    shortName: 'Network Latency Test',
    isMobileAppCore: false,
    regionFocus: 'Global',
    category: 'diagnostics-lab',
    categoryLabel: 'Hardware Diagnostics',
    summary: 'Test factory premise latency bottlenecks, SQL database lag, and WeBOC customs gateway ping stability.',
    chatGptQuickPrompt: `Analyze industrial network latency and WeBOC customs gateway ping stability in Sialkot.`,
    chatGptCustomGptInstructions: `You are the evonix Industrial Network Engineer.`,
    openApiSchema: { openapi: '3.1.0', info: { title: 'Network Benchmark API', version: '1.0.0' }, paths: {} },
    geminiFunctionDeclaration: { name: 'benchmarkNetwork', description: 'Measures latency and jitter.', parameters: { type: 'OBJECT', properties: {} } },
    geminiSystemInstruction: `You are the Google AI Studio Gemini Network Reliability Engineer for evonix.`,
    geminiPromptTemplate: `Benchmark latency to {{host}}.`,
    githubWorkflowYaml: `name: Ping Monitor\non: [schedule]`,
    githubSchemaSpec: { title: 'NetworkSpec', type: 'object' },
    cloudSamplePayload: { provider: 'evonix-cloud-sync', tool: 'factory-network-tester', pingMs: 19 },
  },
};

export const CORE_5_MOBILE_TOOLS = Object.values(ALL_TOOL_INTEGRATIONS)
  .filter((t) => t.isMobileAppCore)
  .sort((a, b) => (a.mobileCoreOrder || 0) - (b.mobileCoreOrder || 0));
