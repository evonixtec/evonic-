import React from 'react';

export const EcommerceHardwareBanner: React.FC = () => {
  return (
    <aside 
      aria-label="Hardware & Equipment Recommendation"
      className="my-8 rounded-xl border border-teal-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 border border-teal-500/20">
            Hardware for E-commerce Sellers
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Selling on Amazon, eBay, or Local E-Commerce?
          </h3>
          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            Upgrade your order fulfillment with industrial thermal shipping label printers 
            and wireless barcode scanners. Same-day dispatch across Pakistan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href="https://store.evonixtec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Visit Hardware Store &rarr;
          </a>
          <a
            href="https://wa.me/923263244002?text=Hello%20Evonix,%20I%20am%20interested%20in%20Thermal%20Label%20Printers%20and%20Scanners."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </aside>
  );
};

export default EcommerceHardwareBanner;
