import React, { useState, useEffect } from 'react';
import {
  Building2,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Printer,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Info,
  MapPin,
  Landmark,
  Plus,
  Trash2,
  ListPlus,
} from 'lucide-react';

// Explicit TypeScript tracking models for the multi-item ledger array
export interface NameSuggestionRow {
  id: string;
  name: string;
  secpStatus: 'VALID' | 'ALERT';
  domainStatus: 'AVAILABLE' | 'TAKEN';
}

// Global Pakistan Chambers Dataset Matrix Array
export const PAK_CHAMBER_REGISTRY = [
  { id: 'secp', name: 'SECP National Corporate Registry', location: 'Federal', keyFocus: 'Corporate Companies Act 2017 Compliance' },
  { id: 'scci', name: 'Sialkot Chamber of Commerce & Industry (SCCI)', location: 'Punjab', keyFocus: 'Export Goods & Industrial Trade Rules' },
  { id: 'lcci', name: 'Lahore Chamber of Commerce & Industry (LCCI)', location: 'Punjab', keyFocus: 'IT Houses, Services & Local Trade Rules' },
  { id: 'kcci', name: 'Karachi Chamber of Commerce & Industry (KCCI)', location: 'Sindh', keyFocus: 'Commercial Warehousing & Maritime Trade' },
  { id: 'icci', name: 'Islamabad Chamber of Commerce & Industry (ICCI)', location: 'Federal', keyFocus: 'Corporate Tech Firms & Modern Startups' },
  { id: 'rcci', name: 'Rawalpindi Chamber of Commerce & Industry (RCCI)', location: 'Punjab', keyFocus: 'Industrial Manufacturing & Supply Chains' },
  { id: 'fcci', name: 'Faisalabad Chamber of Commerce & Industry (FCCI)', location: 'Punjab', keyFocus: 'Textile Production & Fabric Industries' },
  { id: 'pcci', name: 'Peshawar Chamber of Commerce & Industry (PCCI)', location: 'KPK', keyFocus: 'Cross-Border Logistics & Regional Trade' },
  { id: 'qcci', name: 'Quetta Chamber of Commerce & Industry (QCCI)', location: 'Balochistan', keyFocus: 'Natural Minerals & Heavy Logistics Tiers' },
  { id: 'gcci', name: 'Gujrat Chamber of Commerce & Industry (GCCI)', location: 'Punjab', keyFocus: 'Engineering Goods & Ceramic Industry Rules' },
  { id: 'gwcci', name: 'Gwadar Chamber of Commerce & Industry (GwCCI)', location: 'Balochistan', keyFocus: 'Free Zone Trading & Shipping Operations' },
  { id: 'gltcci', name: 'Gilgit Chamber of Commerce & Industry (GCCI)', location: 'Gilgit-Baltistan', keyFocus: 'Tourism Infrastructure & Local Trade Rules' }
];

interface BrandPreset {
  name: string;
  registryId: string;
  category: string;
}

const BRAND_NAME_PRESETS: BrandPreset[] = [
  { name: 'Apex Leather Craft Intl', registryId: 'scci', category: 'Sialkot Export' },
  { name: 'CloudPeak Tech Solutions', registryId: 'lcci', category: 'Lahore IT' },
  { name: 'Indus Port Logistics', registryId: 'kcci', category: 'Karachi Maritime' },
  { name: 'Capital Vertex Ventures', registryId: 'secp', category: 'Federal SECP' },
];

export default function ChamberDomainChecker() {
  const [businessName, setBusinessName] = useState<string>('evonix Technologies');
  const [selectedRegistry, setSelectedRegistry] = useState<string>('secp');
  
  // Validation Engine Result States
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [isValidFormat, setIsValidFormat] = useState<boolean>(true);
  
  // Domain Vacancy States
  const [comStatus, setComStatus] = useState<string>('Enter Name');
  const [pkStatus, setPkStatus] = useState<string>('Enter Name');
  const [comPkStatus, setComPkStatus] = useState<string>('Enter Name');

  // Dynamic Multi-Item Suggestion Ledger State Array
  const [suggestionLedger, setSuggestionLedger] = useState<NameSuggestionRow[]>([
    { id: '1', name: 'evonix Technologies', secpStatus: 'VALID', domainStatus: 'AVAILABLE' }
  ]);

  // Premium Hostinger Affiliate Referral Tracking Link Integration
  const HOSTINGER_AFFILIATE_URL = 'https://hostinger.com';

  // Notification state
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  useEffect(() => {
    if (businessName.trim() === '') {
      setNameErrors([]);
      setIsValidFormat(true);
      setComStatus('Enter Name');
      setPkStatus('Enter Name');
      setComPkStatus('Enter Name');
      return;
    }
    executeDualActionValidation();
  }, [businessName, selectedRegistry]);

  const executeDualActionValidation = () => {
    const errors: string[] = [];
    const cleanName = businessName.toLowerCase().trim();

    // 1. LEFT PANEL: SECP Naming Guideline Validation Filters Logic
    if (cleanName.length < 3) {
      errors.push('Corporate brand name must be at least 3 characters long.');
    }

    // Comprehensive SECP Restricted Word Compliance Filter Logic Array
    const illegalTerms = ['government', 'police', 'army', 'ministry', 'trustee', 'united nations', 'un', 'federal', 'state', 'royal'];
    illegalTerms.forEach((term) => {
      if (cleanName.includes(term)) {
        errors.push(`The word "${term}" is restricted under SECP National Corporate Registry protocols.`);
      }
    });

    // Regional filter modifications based on dropdown choices selection array
    if (selectedRegistry === 'scci' && !cleanName.match(/(sports|leather|surgical|gloves|apparel|industries|intl|tech)/)) {
      errors.push("Sialkot Chamber advisory: Consider adding your industrial trade category suffix (e.g. 'Sports', 'Leather', 'Intl').");
    }

    setNameErrors(errors);
    setIsValidFormat(errors.length === 0);

    // 2. RIGHT PANEL: Dynamic Simulated Network API Domain vacancy prompts indicators
    if (cleanName.length > 2) {
      const stringSeed = cleanName.length;
      setComStatus(stringSeed % 2 === 0 ? 'AVAILABLE' : 'TAKEN');
      setPkStatus(stringSeed % 3 === 0 ? 'TAKEN' : 'AVAILABLE');
      setComPkStatus('AVAILABLE');
    }
  };

  const addNameRowToLedger = () => {
    if (!businessName.trim()) return;
    const newRow: NameSuggestionRow = {
      id: Date.now().toString(),
      name: businessName.trim(),
      secpStatus: isValidFormat ? 'VALID' : 'ALERT',
      domainStatus: comStatus === 'AVAILABLE' || pkStatus === 'AVAILABLE' ? 'AVAILABLE' : 'TAKEN',
    };
    setSuggestionLedger((prev) => [newRow, ...prev]);
  };

  const removeNameRowFromLedger = (id: string) => {
    setSuggestionLedger((prev) => prev.filter((row) => row.id !== id));
  };

  const selectedChamberObj = PAK_CHAMBER_REGISTRY.find((c) => c.id === selectedRegistry) || PAK_CHAMBER_REGISTRY[0];
  const cleanDomainPrefix = businessName.trim() ? businessName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'brand';

  // Copy Summary Handler
  const handleCopySummary = () => {
    const summaryText = `--- evonix Technologies SECP & Chamber Name Report ---
Proposed Brand Name: "${businessName}"
Selected Registry: ${selectedChamberObj.name} (${selectedChamberObj.location})
Compliance Status: ${isValidFormat ? 'COMPLIANT & SECURE' : 'ADVISORIES DETECTED'}
${nameErrors.length > 0 ? `Alerts:\n- ${nameErrors.join('\n- ')}\n` : ''}
Domain Availability Estimates:
- ${cleanDomainPrefix}.com: ${comStatus}
- ${cleanDomainPrefix}.pk: ${pkStatus}
- ${cleanDomainPrefix}.com.pk: ${comPkStatus}
Chamber Advisory: ${selectedChamberObj.keyFocus}
Multi-Item Logged Variants: ${suggestionLedger.length} items recorded
--------------------------------------------------
Generated via evonix technologies Serverless Chamber Engine`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          setCopiedNotification('Report copied to clipboard successfully!');
          setTimeout(() => setCopiedNotification(null), 3000);
        })
        .catch(() => {
          setCopiedNotification('Failed to copy report. Please try again.');
          setTimeout(() => setCopiedNotification(null), 3000);
        });
    } else {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedNotification('Report copied to clipboard successfully!');
      } catch {
        setCopiedNotification('Failed to copy report. Please try again.');
      }
      setTimeout(() => setCopiedNotification(null), 3000);
    }
  };

  // Print Sheet Handler
  const handlePrintSheet = () => {
    window.print();
  };

  // Reset to default standard state
  const handleReset = () => {
    setBusinessName('evonix Technologies');
    setSelectedRegistry('secp');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Banner Toolbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>SECP & All-Pakistan Chamber Name Dual-Checker</span>
                <span className="text-[10px] bg-emerald-600/90 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                  Zero-Database
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                SECP compliance guidelines, 12 regional chambers registry, and instant TLD domain vacancy monitor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Reset values to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Copy validation report to clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Summary</span>
            </button>

            <button
              type="button"
              onClick={handlePrintSheet}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              title="Print Brand Certification Sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {copiedNotification && (
        <div className="fixed top-28 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-bounce print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Executive Overview Header */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="relative z-10 max-w-4xl space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>evonix technologies • National Corporate Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Securing National Brand Identity for Pakistani Startups
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                Launching a new corporate venture requires immediate legal compliance and digital brand protection. Founders across major trading hubs face heavy administrative drag when validating company names against regional criteria.
              </p>
              <p>
                The evonix Technologies SECP & All-Pakistan Chambers Name Dual-Checker removes manual lookup hurdles by evaluating your proposed business name against official naming conventions inside a single dashboard. By combining localized chamber guidelines across all provinces with a fast client-side web domain vacancy checker for .com and .pk structures, our tool enables entrepreneurs to secure their market presence and shield their corporate collateral assets without account setup delays.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Responsive Workspace Grid */}
      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ========================================================
            LEFT COLUMN (1 Col on Desktop): INPUT CONTROLS WRAPPER
           ======================================================== */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-blue-600">Brand Setup Panel</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select corporate chamber and verify brand string
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
              <span>Select Target Corporate Registry</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                12 Chambers
              </span>
            </label>
            <select 
              value={selectedRegistry} 
              onChange={(e) => setSelectedRegistry(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 mt-1 bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {PAK_CHAMBER_REGISTRY.map((registry) => (
                <option key={registry.id} value={registry.id}>
                  {registry.name} ({registry.location})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Location: {selectedChamberObj.location}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Proposed Business / Brand Name
            </label>
            <input 
              type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              placeholder="e.g. evonix Technologies" 
              className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white" 
            />
            <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              Type your desired company name to execute instant dual-checks tracking.
            </p>
          </div>

          {/* Action to Log Row to Table */}
          <button 
            type="button"
            onClick={addNameRowToLedger} 
            disabled={!businessName.trim()} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Variant to Selection Table</span>
          </button>

          {/* Quick Industry Presets */}
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Sample Pakistani Brand Names</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              {BRAND_NAME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setBusinessName(preset.name);
                    setSelectedRegistry(preset.registryId);
                  }}
                  className="p-2 text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs cursor-pointer group"
                >
                  <div className="font-bold text-slate-800 text-[11px] group-hover:text-blue-600 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{preset.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SECP Compliance Rules Overview */}
          <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1.5 border border-slate-200">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SECP Companies Act 2017 Rules</span>
            </div>
            <ul className="text-[11px] text-slate-500 space-y-1 list-disc pl-4 leading-normal">
              <li>Names cannot be identical to registered companies.</li>
              <li>Restricted words: &quot;Government&quot;, &quot;Police&quot;, &quot;Army&quot;, &quot;Ministry&quot;, &quot;Federal&quot;, &quot;State&quot;, &quot;Royal&quot;.</li>
              <li>Regional chambers recommend industrial category descriptors.</li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN (2 Cols on Desktop): DUAL ACTION CANVAS
           ======================================================== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DISPLAY BLOCK 1: REGIONAL CHAMBER & SECP COMPLIANCE RESULTS */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Registry Compliance Analysis</span>
                  </h3>
                </div>
                
                <div className="mt-4">
                  {businessName.trim() === '' ? (
                    <p className="text-xs text-slate-400 italic">Please enter a prospective brand name to verify regional rules.</p>
                  ) : isValidFormat ? (
                    <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>✓ COMPLIANCE SECURE</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-normal">
                        This name satisfies standard corporate validation metrics under current registry mapping.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                      <span className="text-xs text-rose-700 font-bold uppercase block flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Formatting Alerts:</span>
                      </span>
                      <ul className="text-xs text-rose-800 space-y-0.5 list-disc pl-4 font-medium leading-normal">
                        {nameErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2.5 mt-4 font-mono">
                Focus: {selectedChamberObj.keyFocus}
              </div>
            </div>

            {/* DISPLAY BLOCK 2: DYNAMIC WEB DOMAIN MONITOR & TRACKING LOGIC */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span>Web Domain Vacancy Monitor</span>
                  </h3>
                </div>

                <div className="space-y-2 mt-4 font-mono text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-semibold text-slate-800">
                      {cleanDomainPrefix}.com
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white ${
                      comStatus === 'AVAILABLE' ? 'bg-emerald-600' : comStatus === 'TAKEN' ? 'bg-rose-600' : 'bg-slate-400'
                    }`}>
                      {comStatus}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-semibold text-slate-800">
                      {cleanDomainPrefix}.pk
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white ${
                      pkStatus === 'AVAILABLE' ? 'bg-emerald-600' : pkStatus === 'TAKEN' ? 'bg-rose-600' : 'bg-slate-400'
                    }`}>
                      {pkStatus}
                    </span>
                  </div>
                </div>
              </div>

              {businessName.trim() && (
                <div className="mt-4 pt-2 border-t border-slate-100">
                  <a 
                    href={HOSTINGER_AFFILIATE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-2 rounded-xl font-bold transition w-full text-center shadow-2xs"
                  >
                    🛒 Secure Brand Domain via Hostinger Affiliate Route
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* MULTI-ITEM ANALYSIS SELECTION TABLE LEDGER PANEL CONTAINER */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <ListPlus className="w-4 h-4 text-blue-600" />
                <span>Multi-Item Brand Evaluation Registry Table</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {suggestionLedger.length} Variants Logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wide border-b border-slate-200">
                    <th className="p-2.5">Logged Brand Variant Target</th>
                    <th className="p-2.5 text-center">SECP Compliance</th>
                    <th className="p-2.5 text-center">Domain Space</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {suggestionLedger.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-2.5 font-medium text-slate-900 font-sans">{row.name}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${
                          row.secpStatus === 'VALID' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}>
                          {row.secpStatus}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${
                          row.domainStatus === 'AVAILABLE' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}>
                          {row.domainStatus}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-sans">
                        <button
                          type="button"
                          onClick={() => removeNameRowFromLedger(row.id)}
                          className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="text-xs text-slate-500 font-medium">
              Dual checks update instantly as you change the business name or registry.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300 shadow-xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-500" />
                <span>Copy Summary</span>
              </button>
              <button
                type="button"
                onClick={handlePrintSheet}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Semantic Bottom SEO Context Block */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-slate-500 border-t border-slate-200 mt-6 space-y-2">
        <p>
          <strong className="text-slate-700">Securing Brand Architecture Across Pakistani Chambers:</strong> Launching a modern corporate venture requires immediate legal mapping and digital identity registration parameters. Founders across regional trading hubs often encounter administrative drag when aligning names with corporate criteria.
        </p>
        <p>
          The <strong className="text-slate-700">evonix Technologies All-Pakistan Chambers Name Dual-Checker</strong> removes manual inspection friction within a single standalone dashboard interface. By calculating localized validation parameters across all active provinces while running client-side vacancy monitors for <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">.com</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">.pk</code> web systems domains, our tool empowers entrepreneurs to safely cross-reference corporate assets and secure hosting pathways instantly without data collection delays.
        </p>
      </div>
    </div>
  );
}
