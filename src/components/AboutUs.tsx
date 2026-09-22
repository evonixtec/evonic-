import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { Shield, Award, Target, Compass, Sparkles, MapPin, Globe, CheckCircle2, Building2 } from 'lucide-react';
import heroDubai from '../assets/images/hero_dubai_tech_1790044690065.jpg';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Award className="w-3.5 h-3.5 text-red-600" />
            20+ Years Proven Excellence
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {COMPANY_INFO.about.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Bridging international Gulf technical standards with dedicated local on-site support in Sialkot, Pakistan.
          </p>
        </div>

        {/* Story & Heritage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Visual Dubai Heritage Showcase */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div className="space-y-6">
              {/* Image banner */}
              <div className="relative rounded-xl overflow-hidden aspect-[21/9] border border-slate-200 shadow-xs">
                <img
                  src={heroDubai}
                  alt="EVONIX Dubai to Pakistan Heritage"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 text-slate-900 font-bold backdrop-blur-sm shadow-xs">
                    <Globe className="w-3.5 h-3.5 text-red-600" />
                    Dubai (UAE) Standard
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold backdrop-blur-sm shadow-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    Active in Sialkot
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Our Story & International Journey
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                  {COMPANY_INFO.about.story}
                </p>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                  After two decades delivering enterprise-level IT infrastructure, custom retail systems, and precision hardware solutions across Dubai and the UAE, our leadership returned home to establish EVONIX in Sialkot. We offer local manufacturers, exporters, and merchants the identical high-caliber digital engineering they previously had to seek overseas.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="block text-2xl font-black text-red-600">2004</span>
                <span className="text-xs text-slate-500 font-medium">Dubai IT Roots</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900">500+</span>
                <span className="text-xs text-slate-500 font-medium">Delivered Deployments</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-600">99.8%</span>
                <span className="text-xs text-slate-500 font-medium">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Vision */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {COMPANY_INFO.about.mission}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {COMPANY_INFO.about.vision}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Enterprise Integrity</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Written warranties on all hardware repairs, clean non-proprietary codebase delivery for software clients, and zero vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
