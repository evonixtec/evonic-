import React from 'react';
import { Cpu, Globe, ShoppingBag, ShieldCheck, Wrench, Server } from 'lucide-react';
import { NavPageId } from '../types';

interface ServicesProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigatePage }) => {
  const services = [
    {
      title: 'Enterprise Web & Custom Software Engineering',
      urduTitle: 'انٹرپرائز ویب سائٹ و کسٹم سافٹ ویئر ڈویلپمنٹ',
      desc: 'High-performance React, TypeScript, Next.js, and Node.js solutions built to international standards with SEO optimization and custom API integrations.',
      icon: <Globe className="w-6 h-6 text-red-600" />,
      features: ['Modern Single Page & PWA Apps', 'High-Speed Global CDN Deployment', 'Stripe, PayPal, Local Payment Gateways'],
    },
    {
      title: 'Chip-Level Laptop Motherboard Micro-Soldering',
      urduTitle: 'چپ لیول مدر بورڈ ریپئر و مائیکرو سولڈرنگ',
      desc: 'Advanced DC bench testing, stereo microscope diagnostics, and precision component replacement for dead laptops, charging issues, and shorted rails.',
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      features: ['DC Power Supply Thermal Inspection', 'SMD Mosfet & Charging IC Repair', '90-Day Parts & Labor Warranty'],
    },
    {
      title: 'Retail POS & Thermal Receipt Printer Maintenance',
      urduTitle: 'ریٹیل پوائنٹ آف سیل اور پرنٹر سروسنگ',
      desc: 'Deployment and maintenance of 80mm ESC/POS thermal receipt printers, barcode scanners, touch POS terminals, and offline SQL inventory ledgers.',
      icon: <ShoppingBag className="w-6 h-6 text-amber-600" />,
      features: ['Auto-Cutter Mechanism Realignment', 'Thermal Head Impedance Testing', 'Custom Receipt & Barcode Design'],
    },
    {
      title: 'Industrial Factory IT Infrastructure & Dual-WAN',
      urduTitle: 'صنعتی فیکٹری آئی ٹی انفراسٹرکچر و ڈوئل وین',
      desc: 'Turnkey network architectures for export manufacturing plants, including fiber failover, WeBOC customs connectivity, and CCTV IP security.',
      icon: <Server className="w-6 h-6 text-emerald-600" />,
      features: ['Failover Dual-WAN Mikrotik Topologies', 'WeBOC Latency & Ping Optimization', 'Factory VLAN Database Isolation'],
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Engineering Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive IT &amp; Hardware Lab Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Certified technical solutions for Sialkot industrial factories and international enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {s.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <span className="text-xs text-slate-400 font-medium block mt-0.5">{s.urduTitle}</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{s.desc}</p>
              </div>
              <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                {s.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
