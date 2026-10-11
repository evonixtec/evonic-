export interface PolicySection {
  id: string;
  title: string;
  badge?: string;
  lastUpdated: string;
  summary: string;
  complianceTags?: string[];
  sections: {
    heading: string;
    subheading?: string;
    content: string[];
    bulletPoints?: string[];
  }[];
}

export interface ToolSafetyItem {
  toolId: string;
  name: string;
  category: string;
  dataProcessed: string;
  storageType: '100% In-Memory / Client RAM' | 'Local Storage (Device Only)' | 'Encrypted API Proxy (Zero-Retention)';
  permissionsRequired: string[];
  serverTransmission: 'No (Zero Server Upload)' | 'Yes (Encrypted TLS 1.3 Transmission)' | 'Optional (On User Export Only)';
  googlePlaySafe: boolean;
  complianceNotes: string;
}

// 1. Google Play & Web Global Privacy Policy
export const PRIVACY_POLICY: PolicySection = {
  id: 'privacy-policy',
  title: 'Global Privacy Policy & Google Play Data Safety Declaration',
  badge: 'Google Play & GDPR Verified',
  lastUpdated: 'October 2026',
  complianceTags: ['Google Play Developer Policy Compliant', 'GDPR / CCPA Ready', 'COPPA 13+ Certified', 'Zero PII Monetization'],
  summary: 'At Evonix Technologies (SECP Registered SMC-Pvt Ltd, Sialkot, Pakistan & Dubai IT Heritage), we engineer software and business productivity utilities with a strict privacy-first architecture. This policy details how our web platforms, Android APKs, Progressive Web Apps (PWAs), and diagnostic tools handle information in full alignment with the Google Play Developer Distribution Agreement, Google Search Quality Standards, and international data protection laws.',
  sections: [
    {
      heading: '1. Core Architectural Principle: Zero-Cloud Client-Side Privacy',
      content: [
        'Evonix Technologies guarantees that all client-facing diagnostic tools, industrial calculators, barcode creators, and invoice engines execute 100% client-side inside your browser sandbox or mobile application process memory.',
        'We believe your business numbers, commercial invoice items, freight dimensions, developer salary estimates, and network ping tests belong exclusively to you. Your calculations are never uploaded, intercepted, monetized, or saved to external databases without your explicit manual export command.'
      ],
      bulletPoints: [
        'No stealth data logging: Numerical inputs remain on your device.',
        'Zero behavioral tracking: We do not employ third-party identity resolution or cross-site tracking brokers.',
        'Complete offline autonomy: Most utilities function without an active internet connection.'
      ]
    },
    {
      heading: '2. Google Play Store "Data Safety" Section Disclosure',
      content: [
        'In strict adherence to the Google Play Store Developer Policy regarding user data transparency, here is the official breakdown of all data interactions across our Android and Web applications:',
        'Data Collected: None by default for utility usage. When requesting a service quote or submitting an RMA repair ticket, you provide contact details (name, business name, phone/WhatsApp number, email address, and optional device serial number).',
        'Data Shared: ZERO. We NEVER sell, rent, license, or disclose your personal contact or business diagnostic data to third-party advertisers, data aggregators, or brokers.',
        'Data Security & Encryption: All data transmitted during quotation requests, RMA checks, and API calls is safeguarded using enterprise-grade TLS 1.3 / 256-bit AES encryption in transit.',
        'Data Retention & Deletion: Ephemeral tool calculations disappear when you refresh or close the app. Quotation and repair service records are maintained strictly for ongoing warranty support and can be deleted upon request within 30 days.'
      ]
    },
    {
      heading: '3. Mobile Device Permissions & Sensitive API Disclosures (Android & PWA)',
      content: [
        'When installing or running Evonix mobile tools via Google Play Store or PWA, only the bare minimum permissions necessary for core utility functionality are requested:',
        'Camera Permission (android.permission.CAMERA): Requested exclusively when utilizing the Barcode & QR Code Scanner or scanning serial numbers for RMA repair lookup. Video frames are analyzed locally in device memory; zero camera frames or photographs are transmitted to external servers without your permission.',
        'Storage & Media Access (android.permission.READ_MEDIA_IMAGES / WRITE_EXTERNAL_STORAGE): Used strictly to save generated PDF invoices, PNG/SVG barcode graphics, or CBM container packing plans to your device Downloads folder.',
        'Network State & Internet (android.permission.ACCESS_NETWORK_STATE & INTERNET): Utilized solely to verify connectivity, query live foreign exchange rates, run latency checks in the Factory Network Tester, and query RMA repair ticket status.',
        'Push Notifications (android.permission.POST_NOTIFICATIONS): Optional opt-in alerts for RMA hardware repair progress updates; easily disabled at any time through system settings.'
      ]
    },
    {
      heading: '4. AI Technologies & Prompt Privacy (Google Gemini Integration)',
      content: [
        'For tools utilizing Artificial Intelligence (such as the AI Travel Destination Engine and AI Search Visibility Auditor), user-submitted prompt queries are processed over secure HTTPS endpoints.',
        'Evonix does NOT utilize your proprietary business prompts to train public AI models. We advise users never to submit sensitive passwords, credit card numbers, or confidential trade secrets into public AI search fields.'
      ]
    },
    {
      heading: '5. Children\'s Online Privacy Protection Act (COPPA) & Families Policy',
      content: [
        'Evonix tools and mobile applications are engineered for business owners, logistics freight forwarders, software developers, electronics engineers, and adult professionals.',
        'Our services are rated for General Audience (PEGI 3 / Everyone) and are not targeted at children under the age of 13. We do not knowingly collect personal information from minors. If a parent or guardian discovers that a child has submitted personal details, please contact us for immediate deletion.'
      ]
    },
    {
      heading: '6. User Rights, Data Portability & Google Play Deletion URL',
      content: [
        'Under GDPR, CCPA/CPRA, and Google Play Store User Data policies, you hold full legal rights regarding your information:',
        'Right to Access & Portability: You may request a copy of all correspondence and service history connected to your business.',
        'Right to Erasure (Data Deletion): You have the unconditional right to request the permanent deletion of your customer records, quotes, and repair tickets.',
        'How to Request Deletion: Email evonixtec@gmail.com with subject "Data Deletion Request" or submit your request via WhatsApp at +92 300 7100062. All records will be permanently purged from active systems within 30 days.'
      ]
    },
    {
      heading: '7. Cookies, LocalStorage & Telemetry Policy',
      content: [
        'We do not utilize invasive tracking cookies. Our web and mobile applications utilize browser LocalStorage strictly for functional convenience:',
        'Saving your active currency preferences (e.g., PKR, USD, EUR, AED, GBP, SAR).',
        'Persisting draft invoice line items so you do not lose progress if your browser closes.',
        'Remembering high-contrast dark/light mode UI preferences.',
        'You can purge this data at any moment by clearing your browser cache or clicking "Reset Tool" inside any calculator.'
      ]
    },
    {
      heading: '8. Official Corporate & Data Privacy Officer (DPO) Contact',
      content: [
        'For all inquiries regarding data protection, legal compliance, or Google Play store policy verification, contact our Data Privacy Officer:',
        'Company Name: Evonix Technologies (SMC-Private Limited)',
        'SECP Registration: Corporate Universal Registration System, Government of Pakistan',
        'Physical Headquarters: Kotli Behram, Defense Road / Airport Road link, Sialkot 51310, Punjab, Pakistan',
        'Direct Email: evonixtec@gmail.com | Phone / WhatsApp: +92 300 7100062'
      ]
    }
  ]
};

// 2. Terms of Service & End User License Agreement (EULA)
export const TERMS_AND_CONDITIONS: PolicySection = {
  id: 'terms-and-conditions',
  title: 'Terms of Service & Mobile Application EULA',
  badge: 'Commercial Terms & EULA',
  lastUpdated: 'October 2026',
  complianceTags: ['Google Play Developer Terms Aligned', 'Commercial EULA', 'SECP Compliant', 'Arbitration Clause'],
  summary: 'These Terms of Service and End User License Agreement (EULA) govern your access to and use of all software applications, mobile APKs, web utilities, computer repair services, and custom development contracts provided by Evonix Technologies. By using our services, you agree to be bound by these terms.',
  sections: [
    {
      heading: '1. Grant of License (Mobile Apps & Web Tools)',
      content: [
        'Evonix Technologies grants you a personal, worldwide, royalty-free, non-assignable, and non-exclusive license to use our web utilities and mobile applications (including Android APKs installed via Google Play Store or PWA).',
        'This license is provided solely to enable you to use and enjoy the benefit of the services as provided by Evonix, in the manner permitted by these terms and Google Play guidelines.'
      ],
      bulletPoints: [
        'You may use generated invoices, barcodes, CBM packing sheets, and margin reports for commercial business operations without paying royalties to Evonix.',
        'You may not decompile, reverse-engineer, disassemble, or attempt to derive the source code of proprietary mobile application binaries unless explicitly permitted by law.'
      ]
    },
    {
      heading: '2. Acceptable Use & Content Responsibility',
      content: [
        'When utilizing our document generation and barcode labeling tools, you agree to comply with all applicable local, national, and international laws:',
        'Prohibition on Fraud & Counterfeiting: You agree NOT to generate fraudulent tax invoices, counterfeit GS1 barcodes, or deceptive shipping manifests intended to mislead customs officials or tax authorities.',
        'System Integrity: You agree not to execute automated scraping scripts, denial-of-service (DoS) attempts, or malicious payloads against Evonix endpoints or API gateways.'
      ]
    },
    {
      heading: '3. Engineering Estimation & Calculation Disclaimer',
      content: [
        'All tools provided on Evonix (including the Global Invoice Studio, 3D CBM Cargo Container Loading Calculator, E-Commerce Profit Margin Engine, Developer Hiring Cost Estimator, and Factory Network Latency Tester) are engineered to high international standards (ISO freight standards, GS1 barcode rules, standard tax algorithms).',
        'However, all calculated outputs are provided as professional estimations and logistical aids. Actual maritime freight packing, container weight axle limits, and local VAT/GST tax liabilities should always be confirmed with licensed freight forwarders and certified public accountants.',
        'Evonix Technologies disclaims any liability for shipping demurrage, tax penalties, or salary negotiation discrepancies arising from tool estimates.'
      ]
    },
    {
      heading: '4. Intellectual Property & Client Deliverable Ownership',
      content: [
        'Contracted Software Projects: Upon receipt of 100% agreed milestone payments, all custom source code, mobile app binaries, relational database schemas, and proprietary graphic assets engineered specifically for the client become the sole intellectual property of the client.',
        'Evonix Platform Assets: Evonix retains all copyright, trademark, and trade dress rights to the Evonix brand, logos, UI components, diagnostic algorithms, and website source code.',
        'Client Data: You retain 100% copyright and ownership over all data, line items, customer names, and logos you input into our invoice and barcode tools.'
      ]
    },
    {
      heading: '5. Hardware Repair & Diagnostic Services at Sialkot HQ',
      content: [
        'Zero-Fee Diagnostic Guarantee: Initial inspection, multimeter diagnostic check, and oscilloscope thermal testing of laptops, desktops, and industrial printers at our Sialkot facility is 100% free of charge. If you decline the repair quote or if a board is unrepairable, no inspection fees are charged.',
        'Customer Authorization: No physical chip-level motherboard work or component replacement is performed without written customer approval via WhatsApp or official repair intake ticket.'
      ]
    },
    {
      heading: '6. Limitation of Liability',
      content: [
        'To the maximum extent permitted by applicable law, Evonix Technologies, its directors, engineers, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or business interruption.',
        'In any event, Evonix\'s aggregate liability for all claims related to software services or mobile apps shall not exceed the amount paid by you to Evonix in the preceding 12 months, or 5,000 PKR / $50 USD, whichever is greater.'
      ]
    },
    {
      heading: '7. Governing Law & Dispute Resolution',
      content: [
        'These Terms and any dispute arising from software usage or repair contracts shall be governed by the laws of the Islamic Republic of Pakistan, in alignment with SECP regulations and the Electronic Transactions Ordinance.',
        'Any dispute shall first be submitted to good-faith mutual consultation in Sialkot, Pakistan. If unresolved, disputes shall be submitted to the exclusive jurisdiction of the competent courts of Sialkot / Lahore High Court, Pakistan.'
      ]
    }
  ]
};

// 3. Comprehensive Refund, Warranty & Google Play Billing Policy
export const REFUND_POLICY: PolicySection = {
  id: 'refund-policy',
  title: 'Comprehensive Refund, Warranty & Google Play Billing Policy',
  badge: 'Customer Satisfaction Guarantee',
  lastUpdated: 'October 2026',
  complianceTags: ['Google Play Billing Synchronized', '30-Day Hardware Warranty', '7-Day Checking Window', '100% Transparent Terms'],
  summary: 'At Evonix Technologies, we uphold Dubai-caliber engineering standards and customer satisfaction. This policy provides complete, unambiguous rules regarding refunds and warranties across our Google Play mobile apps, custom software projects, hardware laboratory repairs, and refurbished store products.',
  sections: [
    {
      heading: '1. Google Play Store In-App Purchases & Subscriptions',
      content: [
        'For digital features, premium tools, or subscriptions purchased through Google Play Store on Android devices:',
        'First 48 Hours: You may request an automatic refund directly through Google Play Order History on your Android device or via support.google.com/googleplay. Google Play processes these requests according to standard Google Play Refund Policy.',
        'After 48 Hours & Up to 14 Calendar Days: If a paid feature encounters persistent bugs, fails to generate required outputs, or does not function as advertised, email evonixtec@gmail.com with your Google Play Order Number (GPA.xxxx-xxxx-xxxx). Our technical team will investigate and issue a direct developer refund or credit within 3 to 5 business days.',
        'Managing Subscriptions: You can pause or cancel recurring mobile subscriptions at any time via Google Play Store > Payments & subscriptions. Upon cancellation, your access remains active until the end of the current billing cycle.'
      ]
    },
    {
      heading: '2. Computer Hardware & Laptop Motherboard Repairs (30-Day RMA Warranty)',
      content: [
        'All chip-level motherboard repairs, BGA graphic chip reballing, power IC replacements, and printer roller repairs completed at our Sialkot diagnostic lab carry an ironclad 30-day technical warranty.',
        'Free Re-Service Guarantee: If the identical hardware defect recurs within 30 calendar days from the collection date, Evonix will inspect and re-service the device with priority at zero additional labor cost.',
        '100% Labor Refund: If our technicians cannot resolve the recurring defect during the warranty period, we will issue a 100% refund of the labor charges paid.',
        'Warranty Exclusions: Warranty is voided if the device has sustained accidental liquid damage, physical chassis impact, tampering by third-party shops, or electrical surges after leaving our lab.'
      ]
    },
    {
      heading: '3. Refurbished Laptops, POS Hardware & Shop Products',
      content: [
        'Every refurbished laptop, POS thermal printer, and industrial barcode scanner purchased through Evonix undergoes a 45-point hardware diagnostic inspection prior to sale.',
        '7-Day Checking & Testing Window: Customers enjoy a 7-day checking period from the date of physical receipt to test all ports, screen pixels, keyboard switches, and battery health.',
        'Immediate Replacement: If any hardware component is found defective during this 7-day period, Evonix will replace the unit with an identical or superior model. If an exact replacement is unavailable, a 100% refund will be issued.',
        'Return Condition: Returned hardware must be in original condition with all included power adapters and packaging.'
      ]
    },
    {
      heading: '4. Custom Software & Web Development Projects',
      content: [
        'Custom web applications, enterprise ERP deployments, and mobile app developments are executed according to phased milestone schedules with client review gates:',
        'Design & Prototype Phase: If you are unsatisfied with creative direction prior to final architecture sign-off, you may cancel the contract with a full refund of unspent milestone funds.',
        'Production Deployment Phase: Once custom source code has been delivered, reviewed on staging, approved in writing, and deployed to client infrastructure, payments for completed and approved milestones are non-refundable.'
      ]
    },
    {
      heading: '5. Refund Claim Procedure & Timeline',
      content: [
        'To submit a refund or warranty claim, contact our billing desk directly:',
        'Email: evonixtec@gmail.com with subject "Refund / Warranty Claim"',
        'WhatsApp Support: +92 300 7100062 with your Invoice / RMA number or Google Play GPA ID.',
        'Resolution SLA: All requests are acknowledged within 4 business hours and resolved within 3 to 7 business days via original payment method (Google Play, Bank Transfer, JazzCash/EasyPaisa, or Wire).'
      ]
    }
  ]
};

// 4. Google Play Store Mobile App Policy & Data Safety Addendum
export const MOBILE_PLAY_POLICY: PolicySection = {
  id: 'mobile-play-policy',
  title: 'Google Play Store Mobile App Policy & Data Safety Addendum',
  badge: 'Android & Play Store Ready',
  lastUpdated: 'October 2026',
  complianceTags: ['Target API Level 34+ Compliant', 'Google Play Developer Policy Aligned', 'Zero Deceptive Behavior', 'Google Play Billing Compliant'],
  summary: 'This policy addendum applies specifically to all Evonix mobile applications, Android APKs distributed through the Google Play Store, PWA mobile wrappers, and associated background services. It provides official documentation for Google Play policy review and user data verification.',
  sections: [
    {
      heading: '1. Compliance with Google Play Developer Program Policies',
      content: [
        'Evonix Technologies designs all mobile applications in strict conformity with the Google Play Developer Program Policies, including but not limited to User Data policies, Device and Network Abuse guidelines, and Permissions requirements.',
        'We do not engage in deceptive app behavior, covert background tracking, hidden premium SMS billing, or unsolicited pop-up advertising.'
      ]
    },
    {
      heading: '2. Exhaustive Android Permissions Disclosure',
      content: [
        'Below is the complete declaration of permissions that may be requested by Evonix mobile applications:',
        'android.permission.CAMERA: Needed exclusively when the user taps "Scan Barcode" or "Scan QR Code" in the Export Barcode Studio or scans physical serial tags in the Live RMA Tracker. Handled using local in-app image processing. No frames or pictures are uploaded.',
        'android.permission.READ_MEDIA_IMAGES & WRITE_EXTERNAL_STORAGE: Required strictly when the user clicks "Download PDF Invoice", "Export SVG Barcode", or "Save CBM Manifest". Used solely to write the generated user document to the device local file system.',
        'android.permission.ACCESS_NETWORK_STATE & INTERNET: Required to load remote diagnostic databases, verify RMA ticket states, and execute ping/jitter latency measurements in the Factory Network Tester.',
        'android.permission.POST_NOTIFICATIONS: Used strictly for operational notifications (e.g., "Your laptop motherboard repair is complete"). Never used for unsolicited marketing spam.'
      ]
    },
    {
      heading: '3. Google Play Data Safety Questionnaire Mapping',
      content: [
        'For app store reviewers and users referencing the Google Play Data Safety section:',
        'Data Collected: None required for tool execution. Optional contact data (Name, Phone, Email) collected only upon voluntary quote submission.',
        'Data Shared: "No" — No user data is shared with third-party companies or organizations.',
        'Security Practices: "Data is encrypted in transit" (Yes, TLS 1.3 / HTTPS); "Data can be deleted upon request" (Yes, within 30 days).',
        'Target Audience: General Audience (Ages 13 and above). App does not target children under 13.'
      ]
    },
    {
      heading: '4. Account Deletion & User Data Erasure (Play Store Requirement)',
      content: [
        'In compliance with Google Play\'s account and data deletion policy, if our mobile application supports user profile creation or repair tracking accounts, users have an accessible method to delete their account and associated data:',
        'In-App Deletion: Users can clear stored local history through the settings menu.',
        'Web & Email Deletion: Users can visit https://evonixtec.com/privacy-policy or email evonixtec@gmail.com with their phone or ticket number to permanently delete all server-side records within 30 days.'
      ]
    },
    {
      heading: '5. Google Play In-App Billing Compliance',
      content: [
        'All purchases of digital goods, unlocking of premium utility features, or software subscriptions within the Android application utilize Google Play In-app Billing.',
        'No alternate third-party credit card entry or external payment redirects are enforced inside the Google Play application for digital items, ensuring 100% adherence to Google Play Payments policy.'
      ]
    }
  ]
};

// 5. Tool-by-Tool Data Privacy & Safety Matrix (For all 9 tools + Shop + RMA)
export const TOOL_DATA_SAFETY_MATRIX: ToolSafetyItem[] = [
  {
    toolId: 'invoice',
    name: 'Global Invoice Studio',
    category: 'Commercial Billing & Micro-Invoicing',
    dataProcessed: 'Client business names, itemized price lists, tax VAT/GST rates, bank details',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['Storage (optional to save PDF file)'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'PDF rendering and Code128 barcode generation execute 100% in client browser memory. Zero financial records saved on server.'
  },
  {
    toolId: 'ecommerce-calculator',
    name: 'E-Commerce Margin & Ad Spend ROI Calc',
    category: 'Digital Retail Financials',
    dataProcessed: 'Product COGS, selling prices, platform commission percentages, ad spend (ROAS)',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['None'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'Mathematical formulas compute instant net profit margins on device without cloud transmission.'
  },
  {
    toolId: 'cbm-calculator',
    name: '3D CBM Cargo & Container Volume Engine',
    category: 'Logistics & Ocean Freight',
    dataProcessed: 'Carton dimensions (length, width, height, weight), 20ft/40ft/40HC container selections',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['Storage (optional to export packing manifest)'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'Three.js / WebGL 3D spatial packing simulation renders strictly on device GPU. Zero freight payloads sent to cloud.'
  },
  {
    toolId: 'developer-cost-calculator',
    name: 'Software Engineering Salary & Cost Estimator',
    category: 'HR & Tech Team Budgeting',
    dataProcessed: 'Tech stacks (React, Python, Node, AI), developer seniority, geographical regions',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['None'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'Uses bundled regional tech salary indices to compute hiring estimates client-side without storing user hiring plans.'
  },
  {
    toolId: 'ai-trip-planner',
    name: 'AI Travel & Destination Visualizer Engine',
    category: 'Tourism & Travel Scheduling',
    dataProcessed: 'Destination cities, trip duration, traveler preferences',
    storageType: 'Encrypted API Proxy (Zero-Retention)',
    permissionsRequired: ['Internet (HTTPS API query)'],
    serverTransmission: 'Yes (Encrypted TLS 1.3 Transmission)',
    googlePlaySafe: true,
    complianceNotes: 'Queries are processed via ephemeral secure API gateway. Prompts are not linked to PII or used for model training.'
  },
  {
    toolId: 'export-barcode-studio',
    name: 'Export Barcode & Shipping Label Studio',
    category: 'Industrial Packaging & GS1 Compliance',
    dataProcessed: 'SKU product codes, EAN-13, UPC-A, Code-128, QR Code data, carton labels',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['Camera (optional scanner)', 'Storage (save SVG/PNG label)'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'Barcode vector math runs entirely client-side using Canvas/SVG. Camera feed for barcode scanning is processed strictly in-memory.'
  },
  {
    toolId: 'live-repair-tracker',
    name: 'Live RMA Repair Tracker & Portal',
    category: 'Hardware Service Operations',
    dataProcessed: 'RMA tracking number, hardware serial number, device brand and model',
    storageType: 'Encrypted API Proxy (Zero-Retention)',
    permissionsRequired: ['Internet (HTTPS query)'],
    serverTransmission: 'Yes (Encrypted TLS 1.3 Transmission)',
    googlePlaySafe: true,
    complianceNotes: 'Only ticket lookup ID is verified against secure customer service records. No intrusive hardware inspection logs exposed.'
  },
  {
    toolId: 'printer-diagnostics',
    name: 'Thermal Hotspot & ESC/POS Diagnostic Studio',
    category: 'Hardware Diagnostic Engineering',
    dataProcessed: 'Printer models, thermal error codes, paper feed statuses, cutter telemetry',
    storageType: 'Local Storage (Device Only)',
    permissionsRequired: ['None'],
    serverTransmission: 'No (Zero Server Upload)',
    googlePlaySafe: true,
    complianceNotes: 'Diagnostic decision trees and error resolution guides are bundled on-device. Works 100% offline.'
  },
  {
    toolId: 'factory-network-tester',
    name: 'Factory Network Ping & Latency Tester',
    category: 'Industrial IT Infrastructure',
    dataProcessed: 'Network endpoint hostnames, ping latency (ms), packet jitter, connection stability',
    storageType: '100% In-Memory / Client RAM',
    permissionsRequired: ['Internet (Network connectivity test)'],
    serverTransmission: 'Yes (Encrypted TLS 1.3 Transmission)',
    googlePlaySafe: true,
    complianceNotes: 'Executes standard ICMP/HTTP network ping requests to verify factory latency. Zero packet inspection or payload snooping.'
  }
];
