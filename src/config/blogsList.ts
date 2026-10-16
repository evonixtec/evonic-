// Path: src/config/blogsList.ts
export interface GlobalBlogItem {
  name: string;
  path: string;
}

export const GLOBAL_BLOGS_DATA: GlobalBlogItem[] = [
  { name: "AI Visibility Graph Node Mapping", path: "/blog/structuring-entity-schema-node-mapping-generative-ai-visibility" },
  { name: "B2B Fuel Surcharges Optimization", path: "/blog/how-to-bypass-unexpected-fuel-surcharges-exporting-south-asia" },
  { name: "Offline-First POS Software Guide", path: "/blog/offline-first-pos-software-why-shops-need-it" },
  { name: "Thermal Receipt Printer Troubleshooting", path: "/blog/thermal-receipt-printer-skipping-lines-faded-print-fix" },
  { name: "Laptop Thermal Paste & Fan Fix", path: "/blog/laptop-fan-loud-sudden-shutdown-thermal-paste-guide" },
  { name: "Coming Soon: 5 New Fee Calculators", path: "/blog/5-new-calculators-coming-soon" },
  { name: "Custom Leather Export Website Dev", path: "/blog/custom-leather-export-website-development-rangpura-sialkot" },
  // 4 days baad naya blog aaye toh developer bas yahan aik nayi line add karega:
  // { name: "Naya Blog Title", path: "/blog/naya-link" }
];
