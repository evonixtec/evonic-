import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  FileText,
  RefreshCw,
  Smartphone,
  TableProperties,
  Mail,
  Phone,
  Search,
  Printer,
  CheckCircle2,
  Lock,
  Download,
  ExternalLink
} from 'lucide-react';
import {
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  REFUND_POLICY,
  MOBILE_PLAY_POLICY,
  TOOL_DATA_SAFETY_MATRIX,
  PolicySection
} from '../data/policies';
import { EvonixMark } from './EvonixLogo';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'mobile' | 'matrix' | null;

interface PolicyModalProps {
  policyType: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  const [activeTab, setActiveTab] = useState<PolicyType>(policyType);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync internal tab if outer policyType prop changes
  useEffect(() => {
    if (policyType) {
      setActiveTab(policyType);
    }
  }, [policyType]);

  if (!policyType || !activeTab) return null;

  const getPolicyData = (): PolicySection | null => {
    switch (activeTab) {
      case 'privacy':
        return PRIVACY_POLICY;
      case 'terms':
        return TERMS_AND_CONDITIONS;
      case 'refund':
        return REFUND_POLICY;
      case 'mobile':
        return MOBILE_PLAY_POLICY;
      case 'matrix':
      default:
        return null;
    }
  };

  const data = getPolicyData();

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('evonixtec@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter sections if search query is provided
  const filteredSections = data?.sections.filter(sec => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const headingMatch = sec.heading.toLowerCase().includes(q);
    const contentMatch = sec.content.some(c => c.toLowerCase().includes(q));
    const bulletsMatch = sec.bulletPoints?.some(b => b.toLowerCase().includes(q));
    return headingMatch || contentMatch || bulletsMatch;
  });

  // Filter tool matrix if search query is provided
  const filteredTools = TOOL_DATA_SAFETY_MATRIX.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.dataProcessed.toLowerCase().includes(q) ||
      t.complianceNotes.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 sticky top-0 z-20 print:static">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/10 border border-red-500/20 text-red-600 flex-shrink-0">
                <EvonixMark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {activeTab === 'matrix' ? 'Tool-by-Tool Data Safety Matrix' : data?.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Google & Play Store Aligned</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Evonix Technologies (SECP SMC-Pvt Ltd) • Sialkot & Dubai • Version 2026.10
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold"
                title="Print Policy Document"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Policy Navigation Tabs */}
          <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-medium sticky top-[69px] z-10 print:hidden">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-red-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service & EULA</span>
            </button>

            <button
              onClick={() => setActiveTab('refund')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'refund'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refund & Warranty</span>
            </button>

            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Google Play Mobile Addendum</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>Tools Data Safety Matrix (9 Tools)</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 print:hidden">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder={`Search keywords in ${activeTab === 'matrix' ? 'tools matrix' : 'this policy'} (e.g. Google Play, refund, camera, invoice, delete)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-transparent border-none focus:outline-hidden text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 px-1.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Policy Content Body */}
          <div className="px-6 py-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
            {/* View: Policy Text (Privacy / Terms / Refund / Mobile) */}
            {activeTab !== 'matrix' && data && (
              <>
                {/* Summary Banner */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                      Official Compliance Summary
                    </span>
                    {data.complianceTags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {data.summary}
                  </p>
                </div>

                {/* Sections List */}
                <div className="space-y-6 divide-y divide-slate-100">
                  {filteredSections?.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No policy clauses matched &ldquo;{searchQuery}&rdquo;. Try another term or clear the search.
                    </div>
                  ) : (
                    filteredSections?.map((sec, idx) => (
                      <div key={idx} className={idx > 0 ? 'pt-6 space-y-2.5' : 'space-y-2.5'}>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                          <span>{sec.heading}</span>
                        </h4>

                        <div className="space-y-2 pl-4">
                          {sec.content.map((point, pIdx) => (
                            <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {point}
                            </p>
                          ))}

                          {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                            <ul className="mt-2 space-y-1.5 pl-2 list-disc list-inside text-xs sm:text-sm text-slate-600">
                              {sec.bulletPoints.map((b, bIdx) => (
                                <li key={bIdx} className="leading-relaxed">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* View: Tool-by-Tool Data Safety Matrix */}
            {activeTab === 'matrix' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <TableProperties className="w-4 h-4 text-indigo-700" />
                    <span>Standardized Google Play & Web Data Safety Declaration</span>
                  </h4>
                  <p className="text-xs text-indigo-950 mt-1 leading-relaxed">
                    Every utility engineered by Evonix undergoes strict privacy architecture review. The table below lists all 9 core productivity tools, their local storage execution types, device permissions requested, and confirmation of zero cloud data harvesting.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3">Tool Name & Function</th>
                        <th className="py-3 px-3">Data Processed</th>
                        <th className="py-3 px-3">Storage / Processing</th>
                        <th className="py-3 px-3">Cloud Upload?</th>
                        <th className="py-3 px-3">Play Store Safe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTools.map((tool) => (
                        <tr key={tool.toolId} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block">{tool.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{tool.category}</span>
                            <p className="text-[11px] text-slate-600 mt-1">{tool.complianceNotes}</p>
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-xs">
                            {tool.dataProcessed}
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                              {tool.storageType}
                            </span>
                            {tool.permissionsRequired.length > 0 && (
                              <span className="block text-[10px] text-slate-500 mt-1">
                                Perms: {tool.permissionsRequired.join(', ')}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                tool.serverTransmission.startsWith('No')
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              <Lock className="w-3 h-3" />
                              {tool.serverTransmission}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>100% Ready</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Official Data Deletion & Contact Box */}
            <div className="mt-8 pt-4 border-t border-slate-200 bg-slate-50 p-4 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>
                    Data Privacy & Deletion Officer: <strong>evonixtec@gmail.com</strong>
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-1 text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Legal Helpline: <strong>+92 300 7100062</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                <span>
                  Physical HQ: Kotli Behram, Defense / Airport Road Link, Sialkot 51310, Punjab, Pakistan.
                </span>
                <span className="text-slate-400">
                  Google Play Developer Package: com.evonix.tools • Target API 34+
                </span>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2.5 print:hidden">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All policies actively validated against Google Play & Search guidelines.</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PolicyModal;
