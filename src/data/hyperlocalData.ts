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
