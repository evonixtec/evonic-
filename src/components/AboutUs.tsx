import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { Shield, Award, Target, Compass, Building2, Flag, Sparkles, MapPin, Globe } from 'lucide-react';
import { FadeInSection } from './FadeInSection';
import heroDubai from '../assets/images/hero_dubai_tech_1790044690065.jpg';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900/40 border-y border-slate-900 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <Award className="w-3.5 h-3.5" />
              20 Years of Proven Excellence
            </div>
            {/* Exact Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {COMPANY_INFO.about.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Bridging international Gulf technical standards with dedicated local on-site support in Sialkot, Pakistan.
            </p>
          </div>
        </FadeInSection>

        {/* Story & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Our Story with High Quality Image Banner */}
          <FadeInSection direction="up" delay={100} duration={700} className="lg:col-span-7 flex">
            <div className="w-full bg-slate-950/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="space-y-6">
                {/* Visual Image Header */}
                <div className="relative rounded-xl overflow-hidden aspect-[21/9] border border-slate-800 shadow-md">
                  <img
                    src={heroDubai}
                    alt="EVONIX TECHNOLOGIES Dubai to Pakistan Heritage"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-800/60 backdrop-blur-sm font-medium">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      Dubai (UAE) Market Proven
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 backdrop-blur-sm font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      Now Active in Sialkot
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {COMPANY_INFO.about.storyHeading}
                    </h3>
                    <p className="text-xs text-cyan-400 font-semibold">Dubai (UAE) Foundations & Legacy</p>
                  </div>
                </div>

                {/* Exact Story text rendered cleanly */}
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                  <p>
                    <strong className="text-white font-semibold">EVONIX TECHNOLOGIES</strong> is not just a new company, it is a name of 20 years of experience. We started our career in Dubai (UAE) and served in the IT field for many years. After working in a big market like Dubai, we have gained extensive international experience.
                  </p>
                  <p>
                    Now with the same international standard and experience, we are going to launch our company in Pakistan, to provide professional and reliable service like Dubai to the people of Pakistan.
                  </p>
                </div>
              </div>

              {/* Dubai to Pakistan Metric highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-8 mt-6 border-t border-slate-800/80 text-center">
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">20+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Years IT Experience</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">15+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Years Dubai Clients</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 col-span-2 sm:col-span-1 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">100%</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Dubai Standards</div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Right Column: Our Mission & Core Commitment */}
          <FadeInSection direction="up" delay={200} duration={700} className="lg:col-span-5 flex flex-col gap-6">
            {/* Mission Box */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/50 border border-cyan-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {COMPANY_INFO.about.missionHeading}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">Clear, Accessible & Reliable</p>
                </div>
              </div>

              {/* Exact Mission Text */}
              <blockquote className="text-slate-200 text-base sm:text-lg font-medium italic border-l-2 border-cyan-500 pl-4 py-1 leading-relaxed">
                "{COMPANY_INFO.about.missionText}"
              </blockquote>

              <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed">
                We believe top-tier IT solutions shouldn't be reserved only for multi-million dollar corporations. We make high-performance websites, enterprise-grade POS systems, and reliable hardware maintenance accessible for every local shop, exporter, entrepreneur, and resident in Sialkot.
              </p>
            </div>

            {/* Standard & Quality Box */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                The Evonix Difference
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Zero Substandard Parts:</strong> Only certified genuine components used in all laptop and PC repairs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Modern Architecture:</strong> High-speed responsive code, SEO optimization, and cloud-readiness matching UAE enterprises.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Dedicated Sialkot On-Site Team:</strong> Certified technician dispatch directly to your home or commercial office in Sialkot.</span>
                </li>
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Milestone Path: Dubai to Pakistan */}
        <FadeInSection direction="up" delay={150} duration={700}>
          <div className="border border-slate-800 bg-slate-950/95 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
              The Journey: 20 Years of International Excellence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-semibold mb-2">
                  <Building2 className="w-4 h-4" />
                  Career Origin (Dubai, UAE)
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">Foundations in Gulf Tech Market</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Started career in Dubai, managing enterprise IT infrastructure, hardware diagnostic labs, and retail software in a fast-paced international hub.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs sm:text-sm font-semibold mb-2">
                  <Award className="w-4 h-4" />
                  15+ Years UAE Client Base
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">Enterprise Software & POS Solutions</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Delivered custom POS systems, inventory management, e-commerce, and corporate web platforms for Dubai retail, restaurant chains, and trading houses.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-cyan-800/60 shadow-lg shadow-cyan-500/10">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs sm:text-sm font-semibold mb-2">
                  <Flag className="w-4 h-4" />
                  Now in Pakistan (Sialkot)
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">International Standard for Pakistan</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bringing the exact same professional quality, reliability, and doorstep support to businesses, factories, retail shops, and homes in Sialkot.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
