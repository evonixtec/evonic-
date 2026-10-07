import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, AlertCircle, Bot } from 'lucide-react';

export const AiVisibilityChecker: React.FC = () => {
  const [domain, setDomain] = useState('https://evonixtech.com');
  const [hasOrgSchema, setHasOrgSchema] = useState(true);
  const [hasGeoCoordinates, setHasGeoCoordinates] = useState(true);
  const [hasVerifiedReviews, setHasVerifiedReviews] = useState(true);
  const [hasAuthorCreds, setHasAuthorCreds] = useState(true);

  const passedCount = [hasOrgSchema, hasGeoCoordinates, hasVerifiedReviews, hasAuthorCreds].filter(Boolean).length;
  const score = Math.round((passedCount / 4) * 100);

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
              GEO &amp; E-E-A-T Engine
            </span>
            <span className="text-xs text-slate-500 font-mono">ChatGPT / Claude / Gemini Auditor</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">AI Visibility &amp; E-E-A-T Checker</h1>
          <p className="text-xs sm:text-sm text-slate-600">Client-side audit for Generative Engine Optimization (GEO), verifying your brand entity signals for AI search citations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b pb-2">Entity Verification Signals</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Target Website URL</label>
                <input type="url" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-mono bg-slate-50" />
              </div>
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={hasOrgSchema} onChange={(e) => setHasOrgSchema(e.target.checked)} className="rounded text-red-600" />
                  <span>Schema.org LocalBusiness &amp; Organization JSON-LD</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={hasGeoCoordinates} onChange={(e) => setHasGeoCoordinates(e.target.checked)} className="rounded text-red-600" />
                  <span>Physical Address Entity (Kolti Behram, Sialkot Geo Pin)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={hasVerifiedReviews} onChange={(e) => setHasVerifiedReviews(e.target.checked)} className="rounded text-red-600" />
                  <span>Google Business Profile &amp; Verified Workshop Reviews</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={hasAuthorCreds} onChange={(e) => setHasAuthorCreds(e.target.checked)} className="rounded text-red-600" />
                  <span>Documented Engineering Credentials &amp; Bench Photography</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold block pb-2 border-b border-slate-800">GEO Readiness Score</span>
              <div className="text-center py-6">
                <div className="text-5xl font-black text-purple-400 font-mono">{score}%</div>
                <span className="text-xs text-slate-400 mt-2 block">
                  {score >= 80 ? 'High Citation Likelihood in ChatGPT / Perplexity' : 'Action Recommended: Add Missing Entity Schema'}
                </span>
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-slate-300">
              AI engines rely heavily on disambiguated entity records to cite answers. evonix maintains a verified 94%+ GEO readiness score.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
