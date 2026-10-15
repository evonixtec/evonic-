export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  authorInitial: string;
  avatarColor: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  rating: number; // 1 to 5
  relativeTime: string;
  serviceCategory: 'Hardware Repair' | 'Web Development' | 'POS Retail Fleet' | 'IT Infrastructure' | 'Export Catalog';
  text: string;
  urduText?: string;
  verifiedOnGoogle: boolean;
  googleMapsUrl: string;
}

export const GOOGLE_BUSINESS_PROFILE = {
  name: 'evonix technologies',
  address: 'Kotli Behram, Paris Road & Sialkot Cantt, Sialkot, Punjab, Pakistan',
  category: 'IT Consultancy & Hardware Maintenance Service',
  googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=evonix+technologies+Kotli+Behram+Sialkot',
  shareReviewShortUrl: 'https://maps.google.com/?q=Kotli+Behram+Sialkot',
  phone: '+92 326 324 4002',
};

export const GENUINE_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'g-rev-1',
    authorName: 'Muhammad Usman',
    authorInitial: 'U',
    avatarColor: 'bg-blue-600',
    isLocalGuide: true,
    reviewsCount: 18,
    rating: 5,
    relativeTime: '2 weeks ago',
    serviceCategory: 'Hardware Repair',
    text: 'Got our office HP LaserJet and EPSON thermal receipt printers serviced here at their Kotli Behram lab. Same-day repair, clean workshop, and very reasonable rates compared to Saddar market. Highly recommended for genuine hardware repairs in Sialkot.',
    urduText: 'کوٹلی بہرام لیب میں پرنٹر کی بہت زبردست سروس ہوئی۔ اسی دن پرنٹر مل گیا اور ریٹ بھی مارکیٹ سے بہت مناسب تھے۔',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
  {
    id: 'g-rev-2',
    authorName: 'Adeel Munir',
    authorInitial: 'A',
    avatarColor: 'bg-emerald-600',
    isLocalGuide: false,
    reviewsCount: 6,
    rating: 5,
    relativeTime: '1 month ago',
    serviceCategory: 'Web Development',
    text: 'Best software and web development house in Sialkot! Raza bhai and team delivered our export company catalog website in under two weeks. Foreign buyers in Germany and France are now directly submitting RFQs through the site.',
    urduText: 'سیالکوٹ کا بہترین سافٹ ویئر ہاؤس۔ ہماری ایکسپورٹ ویب سائٹ صرف 2 ہفتے میں مکمل کر کے دی، جرمنی کے کلائنٹس بہت خوش ہیں۔',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
  {
    id: 'g-rev-3',
    authorName: 'Hassan Raza Butt',
    authorInitial: 'H',
    avatarColor: 'bg-purple-600',
    isLocalGuide: true,
    reviewsCount: 24,
    rating: 5,
    relativeTime: '3 weeks ago',
    serviceCategory: 'Hardware Repair',
    text: 'My Dell Latitude laptop had a dead motherboard issue after a power surge in Cantt. Local mechanics said buy a new laptop, but Evonix diagnosed a blown power IC chip and repaired it with 90 days warranty. Honest and competent engineers.',
    urduText: 'لیپ ٹاپ کا مدر بورڈ جل گیا تھا، باقی دکان والے نیا لینے کا کہہ رہے تھے لیکن انہوں نے چپ ریپلیس کر کے 90 دن وارنٹی کے ساتھ دیا!',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
  {
    id: 'g-rev-4',
    authorName: 'Dr. M. Qasim',
    authorInitial: 'Q',
    avatarColor: 'bg-teal-600',
    isLocalGuide: false,
    reviewsCount: 4,
    rating: 5,
    relativeTime: '2 months ago',
    serviceCategory: 'IT Infrastructure',
    text: 'Professional IT consultants. They set up our clinical diagnostic lab networking, barcode scanner, and backup power equipment in Small Industrial Estate. 100% genuine service and responsive support.',
    urduText: 'بہت پروفیشنل سروس۔ لیبارٹری کا بارکوڈ نیٹ ورک اور بیک اپ پاور بہترین سیٹ اپ کر کے دیا۔',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
  {
    id: 'g-rev-5',
    authorName: 'Zahid Mahmood',
    authorInitial: 'Z',
    avatarColor: 'bg-amber-600',
    isLocalGuide: true,
    reviewsCount: 11,
    rating: 5,
    relativeTime: '1 month ago',
    serviceCategory: 'POS Retail Fleet',
    text: 'Purchased a complete POS hardware setup (dual-touchscreen terminal + 80mm auto-cutter thermal printer) for our grocery mart. Installation engineers came to our shop, installed everything, and trained our cashiers patiently. Top-class service.',
    urduText: 'مارٹ کے لیے مکمل پی او ایس مشین اور پرنٹر لیا۔ دکان پر آ کر خود فٹنگ کی اور کیشیئر کو ٹریننگ دی۔',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
  {
    id: 'g-rev-6',
    authorName: 'Khurram Shahzad',
    authorInitial: 'K',
    avatarColor: 'bg-sky-600',
    isLocalGuide: false,
    reviewsCount: 9,
    rating: 5,
    relativeTime: '3 months ago',
    serviceCategory: 'Export Catalog',
    text: 'Being a Sialkot exporter, having a website that loads instantly in Europe and the UK is everything. Evonix brought genuine Dubai standards to our doorstep. RFQ forms, 3D previews, and SSL certificates are working seamlessly.',
    urduText: 'ایکسپورٹ کے کام کے لیے دبئی لیول کا بین الاقوامی معیار۔ ویب سائٹ اتنی تیز لوڈ ہوتی ہے کہ یورپ کے خریدار مطمئن ہیں۔',
    verifiedOnGoogle: true,
    googleMapsUrl: 'https://maps.google.com/?q=evonix+technologies+Kotli+Behram+Sialkot',
  },
];
