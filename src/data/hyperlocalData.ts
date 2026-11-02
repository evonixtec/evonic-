export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface LocalProduct {
  id: string;
  name: string;
  sku: string;
  pricePKR: string;
  category: string;
  specs: string[];
  inStockLocal: boolean;
  warranty?: string;
  dispatchTime?: string;
  images: string[];
  description: string;
  medicalStoreFeatures: string[];
  inTheBox: string[];
  technicalSpecs: TechnicalSpec[];
  ergonomics: string;
}

export interface CityHubConfig {
  citySlug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  serviceRadiusKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  officeAddress: {
    street: string;
    area: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contactPhone: string;
  whatsappNumber: string; // 923XXXXXXXXX format without '+' or spaces
  deliveryTimeline: string;
  featuredHardware: LocalProduct[];
}

export const sialkotHardwareHub: CityHubConfig = {
  citySlug: 'sialkot',
  cityName: 'Sialkot',
  metaTitle: 'POS Hardware & Thermal Receipt Printers in Sialkot | Same-Day Dispatch',
  metaDescription: 'Buy 80mm & 58mm thermal receipt printers, wireless barcode scanners, and touch POS systems in Sialkot. 1-year warranty, on-site testing, and instant COD.',
  serviceRadiusKm: 45,
  coordinates: {
    lat: 32.4945,
    lng: 74.5229,
  },
  officeAddress: {
    street: 'Kotli Behram',
    area: 'Defense Road / Sialkot Bypass',
    city: 'Sialkot',
    postalCode: '51310',
    country: 'PK',
  },
  contactPhone: '+923263244002',
  whatsappNumber: '923263244002',
  deliveryTimeline: 'Same-day delivery across Sialkot (2-4 hours)',
  featuredHardware: [
    {
      id: 'prn-80mm-usb-lan',
      name: '80mm Thermal Receipt Printer (Auto-Cutter, USB + LAN)',
      sku: 'EVX-PRN-80U',
      pricePKR: 'Rs. 18,500',
      category: 'Thermal Printers',
      images: [
        '/images/shop/printer_thermal_receipt.webp',
        '/images/shop/shop_thermal_printer.webp',
        '/images/pos_thermal_setup_1791024110070.webp',
        '/images/shop/pos_thermal_rolls.webp',
      ],
      description: 'Heavy-duty 80mm direct thermal POS receipt printer engineered for fast-paced retail pharmacies, supermarkets, and export billing counters. Features an ultra-fast Japanese thermal print head delivering 260mm/s print speed with zero ink or ribbon costs. Integrated hardened steel guillotine auto-cutter rated for 1.5 million clean cuts without paper jams. Equipped with dual USB 2.0 and RJ45 LAN Ethernet connectivity to support multi-counter kitchen or pharmacy order routing simultaneously.',
      ergonomics: 'Compact desktop footprint fits snuggly on tight pharmacy counters. Top-loading clamshell mechanism allows single-handed 3-second thermal roll replacement with anti-jam sensor.',
      medicalStoreFeatures: [
        'Prints clear drug generic names, batch numbers, manufacturing/expiry dates, and doctor instructions',
        'Built-in QR code & barcode printing compliant with Pakistan Drug Regulatory Authority (DRAP) tracking',
        'High-density 203 DPI resolution ensures tiny 6pt medicine dosage text remains razor-sharp',
        'Automatic 24V pulse kick-out connects directly with heavy cash drawers upon invoice completion',
      ],
      inTheBox: [
        '1x 80mm High-Speed Thermal Receipt Printer (EVX-PRN-80U)',
        '1x 24V/2.5A Heavy-Duty AC Power Adapter & Power Cable',
        '1x High-Shielded USB 2.0 Interface Cable',
        '1x Starter 80mm BPA-Free Thermal Paper Roll',
        '1x 58mm Paper Roll Partition Guide Plate',
        '1x Driver CD & Windows/Linux/Android Setup Manual',
        '1x Sialkot Official 1-Year Local Replacement Warranty Card',
      ],
      technicalSpecs: [
        { label: 'Printing Method', value: 'Direct Thermal (No Ink/Ribbon Required)' },
        { label: 'Print Speed', value: '260 mm/second Ultra-Fast' },
        { label: 'Resolution', value: '203 DPI (8 dots/mm, 576 dots/line)' },
        { label: 'Paper Width', value: '79.5 ± 0.5 mm & 57.5 ± 0.5 mm supported' },
        { label: 'Roll Diameter', value: 'Max 83 mm outer diameter roll' },
        { label: 'Auto-Cutter Life', value: '1,500,000 Cuts (Full & Partial Cut Supported)' },
        { label: 'Print Head Reliability', value: '150 Kilometers of Thermal Paper' },
        { label: 'Interfaces', value: 'USB 2.0 + LAN (RJ45 Ethernet) + RJ11 Cash Drawer (24V)' },
        { label: 'Emulation Protocols', value: 'ESC/POS Standard Command Set' },
        { label: 'Supported OS', value: 'Windows 11/10/8/7, Linux, Android, iOS (via LAN)' },
      ],
      specs: [
        '260mm/s High Speed Direct Thermal Printing',
        'Heavy-Duty Auto-Cutter (1.5M Cuts Guaranteed)',
        'Dual USB + LAN / Ethernet Network Connectivity',
        'Standard ESC/POS Command Protocol Compatible',
        'RJ11 Cash Drawer Auto-Kick Port (24V)',
        'Supports 80mm & 58mm Paper Roll Widths',
      ],
      inStockLocal: true,
      warranty: '1-Year Local Replacement Warranty in Sialkot',
      dispatchTime: '2-4 Hours in Sialkot & Daska',
    },
    {
      id: 'scan-2d-wireless',
      name: 'Handheld 1D/2D Wireless Barcode Scanner',
      sku: 'EVX-SCN-2DW',
      pricePKR: 'Rs. 9,500',
      category: 'Barcode Scanners',
      images: [
        '/images/shop/pos_barcode_scanner.webp',
        '/images/shop_barcode_scanner_1791023955798.webp',
        '/images/shop/shop_barcode_scanner.webp',
        '/images/shop/printer_barcode_label.webp',
      ],
      description: 'Professional commercial-grade 1D/2D wireless CMOS barcode imager scanner. Features an advanced 1280x800 global shutter sensor that instantly decodes QR codes, DataMatrix, PDF417, and standard 1D barcodes from reflective medicine foil blister packs, curved syrup bottles, and smartphone screens. Dual-mode 2.4GHz wireless and Bluetooth 5.0 provides up to 100 meters unobstructed wireless freedom with a 2,000mAh lithium rechargeable battery supporting 18 hours of continuous scanning.',
      ergonomics: 'Balanced ergonomic pistol-grip design weighted at just 185 grams to prevent wrist strain during high-volume cashier shifts. Features a shock-absorbent TPU rubber bumper collar with 1.8-meter concrete drop resistance.',
      medicalStoreFeatures: [
        'Ultra-sensitive sensor reads tiny 3mil DataMatrix barcodes on medical injectables and tablet foils',
        'Zero-glare illumination system eliminates beam bounce off glossy medicine packaging and plastic wraps',
        'Dual beep and LED confirmation feedback allows accurate scanning in busy pharmacy environments',
        'Built-in offline inventory storage memory stores up to 100,000 scans during stock audits',
      ],
      inTheBox: [
        '1x Handheld Wireless 1D/2D CMOS Barcode Scanner (EVX-SCN-2DW)',
        '1x 2.4GHz Nano USB Wireless Receiver Dongle',
        '1x Reinforced USB-C Charging & Wired Data Cable (1.5m)',
        '1x Quick Configuration Barcode Programming Guide',
        '1x Sialkot Official 1-Year Local Replacement Warranty Card',
      ],
      technicalSpecs: [
        { label: 'Sensor Type', value: 'CMOS Imager (1280 × 800 Pixels Global Shutter)' },
        { label: 'Scan Angle', value: 'Roll: 360°, Pitch: ±60°, Yaw: ±55°' },
        { label: 'Min. Resolution', value: '1D: 3 mil (0.076mm), 2D: 5 mil (0.127mm)' },
        { label: 'Wireless Range', value: '2.4G Mode: up to 100m, Bluetooth: up to 30m' },
        { label: 'Battery Capacity', value: '2,000 mAh Rechargeable Li-Ion (18h continuous)' },
        { label: 'Drop Specification', value: 'Withstands multiple 1.8m drops to concrete' },
        { label: 'Decoding Ability 1D', value: 'EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, ITF-14' },
        { label: 'Decoding Ability 2D', value: 'QR Code, Micro QR, DataMatrix, PDF417, Aztec' },
        { label: 'Interfaces', value: 'USB HID Keyboard, USB Virtual COM, Bluetooth BLE' },
        { label: 'Software Compatibility', value: 'Candela, QuickBooks, Excel, POS, Android POS' },
      ],
      specs: [
        '2.4G Wireless + Bluetooth 5.0 Dual Mode',
        'Reads QR, PDF417, DataMatrix & 1D Barcodes',
        'Instant Mobile Screen & Damaged Label Decoding',
        'Up to 100m Open Wireless Transmission Range',
        'Drop Resistance up to 1.8m Concrete Fall',
        'Plug & Play USB Receiver (No Driver Needed)',
      ],
      inStockLocal: true,
      warranty: '1-Year Local Replacement Warranty in Sialkot',
      dispatchTime: '2-4 Hours in Sialkot & Daska',
    },
    {
      id: 'pos-terminal-15-touch',
      name: '15.6" Capacitive Touch All-in-One POS Terminal (Core i5)',
      sku: 'EVX-POS-T15',
      pricePKR: 'Rs. 68,000',
      category: 'Touch Terminals',
      images: [
        '/images/shop/pos_terminal_screen.webp',
        '/images/shop_pos_touchscreen_1791023884127.webp',
        '/images/shop/shop_pos_touchscreen.webp',
        '/images/onsite_technician_human_1791024124026.webp',
      ],
      description: 'Enterprise commercial all-in-one touch billing workstation designed for 24/7 continuous duty in pharmacies, grocery marts, and busy factory export counters. Features a 15.6-inch bezel-free true-flat capacitive 10-point multi-touch display impervious to liquid splashes, dust, and grease. Powered by an Intel Core i5 processor paired with 8GB high-speed RAM and a 128GB M.2 solid-state drive for instant POS billing, report generation, and multi-user switching without lag.',
      ergonomics: 'Solid die-cast heavy aluminum alloy counter base prevents wobble when tapping the screen. Features adjustable 0° to 90° screen tilt angle to accommodate standing or seated cashier height.',
      medicalStoreFeatures: [
        'Supports all Pakistani pharmacy management systems: Candela Pharmacy, PharmaPOS, and Medico',
        'Dust-proof and spill-resistant front glass panel protects against liquid bottle accidents',
        'Dual serial RS-232 COM ports connect directly to electronic weight scales and customer displays',
        'Gigabit Ethernet LAN port ensures lag-free server database synchronization across multiple counters',
      ],
      inTheBox: [
        '1x 15.6" All-in-One Capacitive Touch POS Terminal (EVX-POS-T15)',
        '1x Die-Cast Heavy Aluminum Counter Stand with Cable Routing Channel',
        '1x 12V/5A Commercial Grade Power Supply & AC Power Cable',
        '1x Pre-loaded Windows 10 Pro Drivers & POS Diagnostic Suite',
        '1x Sialkot Official 1-Year Local Replacement Warranty Card',
      ],
      technicalSpecs: [
        { label: 'Screen Display', value: '15.6" TFT LED True-Flat Bezel-Free (1366x768 / 1920x1080)' },
        { label: 'Touch Technology', value: '10-Point Projected Capacitive (PCAP) Multi-Touch' },
        { label: 'Processor', value: 'Intel Core i5 Quad-Core High-Performance Processor' },
        { label: 'Memory (RAM)', value: '8GB DDR3/DDR4 High-Speed RAM (Expandable to 16GB)' },
        { label: 'Storage Drive', value: '128GB High-Speed M.2 SSD (SATA III / NVMe)' },
        { label: 'I/O Ports', value: '6x USB 2.0/3.0, 2x COM (RS232), 1x LAN (RJ45), 1x VGA, 1x Audio' },
        { label: 'Enclosure Material', value: 'Industrial Grade ABS + Heavy Aluminum Die-Cast Base' },
        { label: 'Cooling Design', value: 'Fanless Silent Heat-Dissipation (Zero Dust Ingestion)' },
        { label: 'Operating System', value: 'Windows 10 Pro / Windows 11 / POSReady 7' },
      ],
      specs: [
        '15.6" True-Flat Capacitive Multi-Touch (1920x1080)',
        'Intel Core i5 High Performance Processor',
        '8GB DDR3/DDR4 RAM + 128GB Fast M.2 SSD',
        'Solid Die-Cast Aluminum Stand (Anti-Vibration)',
        '6x USB, 2x COM (RS232), Gigabit LAN, 1x VGA',
        'Pre-loaded Windows 10 Pro / POSReady Driver Suite',
      ],
      inStockLocal: true,
      warranty: '1-Year Local Replacement Warranty in Sialkot',
      dispatchTime: '2-4 Hours in Sialkot & Daska',
    },
    {
      id: 'cash-drawer-heavy-duty',
      name: 'Heavy Duty 5-Bill / 8-Coin Metal Cash Drawer (Auto-Kick)',
      sku: 'EVX-DRW-5B',
      pricePKR: 'Rs. 8,500',
      category: 'Cash Drawers',
      images: [
        '/images/shop/pos_cash_drawer.webp',
        '/images/shop/pos_terminal_screen.webp',
        '/images/pos_thermal_setup_1791024110070.webp',
        '/images/shop/printer_thermal_receipt.webp',
      ],
      description: 'Industrial heavy-gauge cold-rolled steel cash drawer engineered for high-security cash management at busy retail counters. Built with 5 adjustable bill compartments equipped with spring-loaded steel bill clips to hold Pakistani rupee notes flat, plus 8 removable coin compartments with an under-tray media drop slot for cheques and credit card receipts. Standard RJ11 24V printer kick-out interface triggers drawer opening automatically when a receipt is printed.',
      ergonomics: 'Smooth ball-bearing roller suspension slides open effortlessly with dampened sound bumpers. 3-position center key lock supports manual open, electric pulse open, and locked positions.',
      medicalStoreFeatures: [
        'Accommodates high volumes of cash transactions during peak evening pharmacy hours',
        'Front media slot allows cashiers to drop large denomination bills directly into hidden sub-tray',
        'Secure 3-position lock prevents unauthorized counter access when pharmacist steps away',
        'Compatible with all 24V thermal receipt printers with standard RJ11 telephone connector',
      ],
      inTheBox: [
        '1x Heavy-Duty 5-Bill / 8-Coin Steel Cash Drawer (EVX-DRW-5B)',
        '1x Removable Heavy-Duty Plastic Coin & Bill Insert Tray',
        '2x Security Cylinder Keys with Code Stamp',
        '1x Attached 1.2m RJ11 Interface Cable for Thermal Printer',
        '1x Sialkot Official 1-Year Local Replacement Warranty Card',
      ],
      technicalSpecs: [
        { label: 'Construction', value: 'Heavy-Gauge Cold-Rolled SPCC Steel with Powder Coat' },
        { label: 'Bill Compartments', value: '5 Bill Slots with Spring-Loaded Heavy Steel Clips' },
        { label: 'Coin Compartments', value: '8 Removable Coin Cups with Curved Fronts' },
        { label: 'Media Slot', value: 'Front Double Media Slot for Cheques and Large Notes' },
        { label: 'Lock Mechanism', value: '3-Position Key Lock (Locked, Auto-Pulse, Manual Open)' },
        { label: 'Interface', value: 'RJ11 / RJ12 6-Pin Socket (24V Solenoid Pulse)' },
        { label: 'Cycle Durability', value: 'Tested for over 1,000,000 Open/Close Cycles' },
        { label: 'Dimensions', value: '410 mm (W) × 420 mm (D) × 100 mm (H)' },
        { label: 'Weight', value: '6.2 kg Net Weight (Anti-Theft Counter Weight)' },
      ],
      specs: [
        '5 Adjustable Bill Slots with Heavy Steel Clips',
        '8 Removable Coin Compartments with Cheque Slot',
        'Standard RJ11 Interface for Printer Trigger Pulse',
        'Heavy-Gauge Cold-Rolled Steel Construction',
        '3-Position Lock (Lock, Manual Open, Auto-Pulse)',
        '1,000,000+ Cycle Durability Tested Roller Suspension',
      ],
      inStockLocal: true,
      warranty: '1-Year Local Replacement Warranty in Sialkot',
      dispatchTime: '2-4 Hours in Sialkot & Daska',
    },
    {
      id: 'prn-barcode-label-4x6',
      name: '4x6" Commercial Shipping & Export Barcode Label Printer',
      sku: 'EVX-LBL-4X6',
      pricePKR: 'Rs. 24,500',
      category: 'Thermal Printers',
      images: [
        '/images/shop/printer_barcode_label.webp',
        '/images/shop/shop_thermal_printer.webp',
        '/images/shop/pos_barcode_scanner.webp',
        '/images/shop/pos_thermal_rolls.webp',
      ],
      description: 'High-speed 4x6 commercial direct thermal shipping and export label printer designed for Sialkot export factories, surgical warehouses, and online e-commerce sellers. Prints sharp 203 DPI shipping waybills, outer carton logistics labels, and product barcodes at speeds up to 152mm/s. Compatible with DHL Express, FedEx, UPS, Daraz, and custom ERP shipping manifests without ribbons or ink cartridges.',
      ergonomics: 'Compact clamshell body with transparent top window to monitor remaining label roll capacity. Easy single-button automatic paper feeding and gap sensor calibration.',
      medicalStoreFeatures: [
        'Prints shelf edge price labels and expiry warning tags for pharmacy medicine racks',
        'High heat resistance labels withstand cold storage and hospital warehouse humidity',
        'Supports custom size stickers from 25mm to 108mm width for small syrup bottles and vials',
        'Direct thermal process means zero ink smudging when exposed to sanitizers or liquids',
      ],
      inTheBox: [
        '1x 4x6" Direct Thermal Label Printer (EVX-LBL-4X6)',
        '1x 24V/2.5A Dedicated Power Supply & AC Power Cable',
        '1x High-Speed USB 2.0 Cable',
        '1x Label Roll Spindle & Fixed Baffle Guides',
        '1x Starter 4x6" Direct Thermal Fanfold Label Stack',
        '1x Windows/Mac Barcode Driver CD & Seagull Scientific Bartender Software Link',
        '1x Sialkot Official 1-Year Local Replacement Warranty Card',
      ],
      technicalSpecs: [
        { label: 'Print Method', value: 'Direct Thermal (No Ribbon or Toner Required)' },
        { label: 'Print Speed', value: '152 mm/second (6 inches/second)' },
        { label: 'Print Resolution', value: '203 DPI (8 dots/mm)' },
        { label: 'Max Print Width', value: '108 mm (4.25 inches) - perfect for 4x6 labels' },
        { label: 'Media Width Range', value: '25.4 mm (1.0 inch) to 118 mm (4.65 inches)' },
        { label: 'Media Sensor', value: 'Gap Sensor, Black Mark Sensor, Cover Opening Sensor' },
        { label: 'Emulation Languages', value: 'TSPL, EPL, ZPL, DPL (Zebra & TSC compatible)' },
        { label: 'Interface', value: 'High-Speed USB 2.0 (Plug & Play)' },
        { label: 'Software Support', value: 'BarTender, NiceLabel, Word, Excel, Adobe Acrobat' },
      ],
      specs: [
        '152mm/s Direct Thermal Printing (203 DPI)',
        'Supports 4x6" Shipping Labels & Barcode Rolls',
        'Compatible with DHL, FedEx, UPS & Daraz Waybills',
        'TSPL, EPL, ZPL, DPL Standard Emulation',
        'USB 2.0 Interface with Auto Paper Sensing',
        'Zero Ink / Zero Ribbon Required (Thermal Direct)',
      ],
      inStockLocal: true,
      warranty: '1-Year Local Replacement Warranty in Sialkot',
      dispatchTime: '2-4 Hours in Sialkot & Daska',
    },
  ],
};
