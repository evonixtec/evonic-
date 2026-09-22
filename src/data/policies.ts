export interface PolicySection {
  id: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

export const PRIVACY_POLICY: PolicySection = {
  id: 'privacy-policy',
  title: 'Privacy Policy',
  lastUpdated: 'February 2025',
  summary: 'At EVONIX TECHNOLOGIES, we take data privacy and intellectual property confidentiality with utmost seriousness. This policy outlines how we collect, process, and protect your personal and business information.',
  sections: [
    {
      heading: '1. Information We Collect',
      content: [
        'Contact Details: When you request a project quote, book doorstep computer repair, or contact us through our website, we collect your name, business name, phone number, email address, and physical location.',
        'Technical Diagnostic Information: When servicing hardware, laptops, or printers, our technicians may record hardware serial numbers, diagnostic error logs, and system specifications necessary to complete repairs.',
        'Digital Website Usage: We collect non-personally identifiable browser data such as pages viewed, time on site, referring URLs, and device types to continually improve website performance and user experience.',
      ],
    },
    {
      heading: '2. How We Use Your Information',
      content: [
        'To fulfill web design, software development, POS deployment, and computer hardware repair contracts.',
        'To provide real-time repair status notifications, quote estimates, and digital tax invoices via WhatsApp or email.',
        'To provide continuous post-launch warranty support and prevent technical security issues.',
        'We strictly NEVER sell, rent, or lease your personal or business data to third-party advertisers or brokers.',
      ],
    },
    {
      heading: '3. Data Security & Storage',
      content: [
        'All online form submissions, quote data, and customer records are transmitted via high-grade 256-bit TLS encryption.',
        'Hardware diagnostic disks and customer database backups are maintained under strict access-controlled lab protocols with automatic encryption at rest.',
      ],
    },
    {
      heading: '4. Contacting Our Data Privacy Officer',
      content: [
        'If you have questions regarding data privacy or wish to request data deletion, email our team directly at evonixtec@gmail.com.',
        'Corporate Headquarters: EVONIX TECHNOLOGIES, Sialkot, Punjab, Pakistan & Akruti Avenues, Wakad, Pune 411057.',
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: PolicySection = {
  id: 'terms-and-conditions',
  title: 'Terms and Conditions',
  lastUpdated: 'February 2025',
  summary: 'These Terms of Service govern all technical engagements, software development contracts, web design milestones, and computer repair services provided by EVONIX.',
  sections: [
    {
      heading: '1. Scope of Services',
      content: [
        'EVONIX provides professional Website Development, Custom Software & POS Systems, and Computer/Laptop/Printer Repairing Services according to agreed project specifications.',
        'All software deliverables include defined testing and staging review milestones prior to production deployment.',
      ],
    },
    {
      heading: '2. Intellectual Property & Source Code Ownership',
      content: [
        'Upon final payment settlement, all custom software, web applications, and graphic assets created for the client become the exclusive property of the client, including production source code and relational database schemas.',
        'EVONIX retains the right to display completed non-confidential visual designs in our digital agency portfolio unless a strict Non-Disclosure Agreement (NDA) is executed.',
      ],
    },
    {
      heading: '3. Hardware Repair & Diagnostic Guarantees',
      content: [
        'Zero-Charge Diagnostic Policy: Initial inspection of laptops, computers, and printers is completely free of charge. If a device cannot be repaired or the customer declines the written quote, zero diagnostic fees are charged.',
        'All chip-level motherboard repairs carry a 30-day technical warranty against the same specific component failure.',
      ],
    },
    {
      heading: '4. Payment Milestones & Invoicing',
      content: [
        'Custom web and software projects are executed on transparent milestone schedules (e.g., 30% initial deposit, 40% functional milestone delivery, 30% final sign-off).',
        'Official SECP-compliant digital invoices and receipts are issued for all corporate payments.',
      ],
    },
  ],
};

export const REFUND_POLICY: PolicySection = {
  id: 'refund-policy',
  title: 'Refund Policy',
  lastUpdated: 'February 2025',
  summary: 'We stand firmly behind our 100% Customer Satisfaction Guarantee and Dubai-standard service excellence. Here is how our transparent refund policy works.',
  sections: [
    {
      heading: '1. Hardware Repairs & Shop Products',
      content: [
        'If a repaired computer, laptop, or printer experiences recurrence of the exact same hardware failure within our 30-day warranty window, EVONIX will re-service the device free of charge or issue a 100% refund on labor fees.',
        'Refurbished laptops and POS hardware products purchased through our store carry a 7-day checking warranty and replacement eligibility.',
      ],
    },
    {
      heading: '2. Website & Software Development Projects',
      content: [
        'If during the initial design phase (prior to final code approval) the client is unsatisfied with the creative design direction, the client may request project termination with a refund of remaining unspent milestone funds.',
        'Once custom source code has been delivered, deployed to client servers, and formally accepted, payments for completed milestones are non-refundable.',
      ],
    },
    {
      heading: '3. Requesting a Refund',
      content: [
        'To initiate a refund review, contact evonixtec@gmail.com with your invoice number, device serial number, or project agreement.',
        'Our management team reviews all inquiries within 24 business hours.',
      ],
    },
  ],
};
