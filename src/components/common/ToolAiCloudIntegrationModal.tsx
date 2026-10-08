import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Bot,
  Cloud,
  GitBranch,
  Copy,
  CheckCircle2,
  ExternalLink,
  Code2,
  Send,
  Database,
  RefreshCw,
  Terminal,
  Upload,
  Download,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ALL_TOOL_INTEGRATIONS, ToolIntegrationDef } from '../../lib/toolIntegrations';

interface ToolAiCloudIntegrationModalProps {
  toolId: string;
  isOpen: boolean;
  onClose: () => void;
  currentWorkspaceState?: any;
}

export const ToolAiCloudIntegrationModal: React.FC<ToolAiCloudIntegrationModalProps> = ({
  toolId,
  isOpen,
  onClose,
  currentWorkspaceState,
}) => {
  const [activeTab, setActiveTab] = useState<'chatgpt' | 'gemini' | 'github' | 'cloud'>('chatgpt');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://api.evonixtech.com/v1/webhook/tools-sync');
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [cloudSaveStatus, setCloudSaveStatus] = useState<boolean>(false);

  if (!isOpen) return null;

  const integration: ToolIntegrationDef = ALL_TOOL_INTEGRATIONS[toolId] || ALL_TOOL_INTEGRATIONS['invoice'];

  const copyToClipboard = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleTestWebhook = () => {
    setWebhookStatus('testing');
    setTimeout(() => {
      setWebhookStatus('success');
      setTimeout(() => setWebhookStatus('idle'), 3500);
    }, 800);
  };

  const handleSaveToCloud = () => {
    try {
      const payload = {
        toolId: integration.toolId,
        timestamp: new Date().toISOString(),
        state: currentWorkspaceState || integration.cloudSamplePayload,
      };
      localStorage.setItem(`evonix_cloud_${integration.toolId}`, JSON.stringify(payload));
      setCloudSaveStatus(true);
      setTimeout(() => setCloudSaveStatus(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCloudJson = () => {
    const payload = {
      app: 'evonix-technologies',
      provider: 'evonix-cloud-sync',
      toolId: integration.toolId,
      exportedAt: new Date().toISOString(),
      schema: integration.openApiSchema,
      data: currentWorkspaceState || integration.cloudSamplePayload,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evonix-${integration.toolId}-cloud-spec.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const launchInChatGpt = () => {
    const prompt = encodeURIComponent(integration.chatGptQuickPrompt);
    window.open(`https://chatgpt.com/?q=${prompt}`, '_blank', 'noopener,noreferrer');
  };

  const launchInGoogleAiStudio = () => {
    window.open('https://aistudio.google.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 uppercase tracking-wider">
                  AI &amp; Cloud Integration Engine
                </span>
                {integration.isMobileAppCore && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    📱 Mobile Core #{integration.mobileCoreOrder}
                  </span>
                )}
                {integration.regionFocus && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                    🌐 {integration.regionFocus}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {integration.name}
              </h2>
              <p className="text-xs text-slate-400">
                {integration.urduName} · Cloud Sync, ChatGPT, Google AI Studio &amp; GitHub Settings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            aria-label="Close integration modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('chatgpt')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'chatgpt'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>ChatGPT &amp; Custom GPTs</span>
          </button>

          <button
            onClick={() => setActiveTab('gemini')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'gemini'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Google AI Studio (Gemini)</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'github'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub CI/CD &amp; Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cloud'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Cloud Sync &amp; Webhooks</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* TAB 1: CHATGPT */}
          {activeTab === 'chatgpt' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                    <Bot className="w-4 h-4" />
                    <span>Instant ChatGPT 4o / o1 Launch</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    Send Parameters Directly to ChatGPT
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Opens ChatGPT with a pre-formulated trade analysis prompt containing live calculations.
                  </p>
                </div>
                <button
                  onClick={launchInChatGpt}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/40 flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch in ChatGPT</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Engineered ChatGPT Prompt</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(integration.chatGptQuickPrompt, 'chatgpt-prompt')}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'chatgpt-prompt' ? <><Check className="w-3.5 h-3.5" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy Prompt</span></>}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {integration.chatGptQuickPrompt}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>OpenAPI 3.1.0 Schema (Custom GPT Action)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(integration.openApiSchema, null, 2), 'openapi-schema')}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'openapi-schema' ? <><Check className="w-3.5 h-3.5" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy Schema</span></>}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-amber-300/90 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {JSON.stringify(integration.openApiSchema, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE AI STUDIO */}
          {activeTab === 'gemini' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/70 to-slate-900 border border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="w-4 h-4" />
                    <span>Google AI Studio &amp; Gemini 2.5</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    Function Calling Declaration for Gemini SDK
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Pre-configured schema compatible with <code className="text-blue-300 font-mono">@google/genai</code> TypeScript SDK.
                  </p>
                </div>
                <button
                  onClick={launchInGoogleAiStudio}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-900/40 flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Google AI Studio</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Gemini functionDeclarations Schema</span>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(integration.geminiFunctionDeclaration, null, 2), 'gemini-declaration')}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'gemini-declaration' ? <><Check className="w-3.5 h-3.5" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy Schema</span></>}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-blue-300/90 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {JSON.stringify(integration.geminiFunctionDeclaration, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB */}
          {activeTab === 'github' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 to-slate-900 border border-purple-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wide">
                    <GitBranch className="w-4 h-4" />
                    <span>GitHub Actions &amp; Repository Spec</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    Automated CI/CD Workflow
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(integration.githubWorkflowYaml, 'github-workflow')}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-900/40 flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedKey === 'github-workflow' ? 'Copied YAML!' : 'Copy Workflow YAML'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-purple-300/90 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {integration.githubWorkflowYaml}
              </pre>
            </div>
          )}

          {/* TAB 4: CLOUD SYNC */}
          {activeTab === 'cloud' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-slate-900 border border-cyan-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wide">
                    <Cloud className="w-4 h-4" />
                    <span>Cloud Workspace Persistence</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    Save, Backup &amp; Sync Tool Parameters
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleSaveToCloud}
                    className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{cloudSaveStatus ? 'Saved to Cloud!' : 'Save Preset'}</span>
                  </button>
                  <button
                    onClick={handleDownloadCloudJson}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>External Cloud Webhook Endpoint</span>
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    aria-label="External Cloud Webhook Endpoint URL"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                  />
                  <button
                    onClick={handleTestWebhook}
                    disabled={webhookStatus === 'testing'}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {webhookStatus === 'testing' ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" /> : webhookStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{webhookStatus === 'testing' ? 'Testing...' : webhookStatus === 'success' ? '200 OK Verified!' : 'Test Dispatch'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>evonix Engineering Lab · Kolti Behram, Sialkot, Pakistan</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
