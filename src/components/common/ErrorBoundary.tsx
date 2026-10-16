import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    
    // Auto-recover once from dynamic import / chunk fetch errors
    const isChunkError = 
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.message?.includes('dynamically imported module') ||
      error?.name === 'ChunkLoadError';

    if (isChunkError && typeof window !== 'undefined') {
      const storageKey = 'chunk_reload_attempt';
      const lastAttempt = sessionStorage.getItem(storageKey);
      const now = Date.now();
      if (!lastAttempt || now - parseInt(lastAttempt, 10) > 10000) {
        sessionStorage.setItem(storageKey, String(now));
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 apple-tool-layout text-[#1d1d1f]">
          <div className="apple-glass-box max-w-md w-full p-8 text-center space-y-5 shadow-xl">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="apple-tool-title text-xl font-bold">
                Application Module Refreshed
              </h3>
              <p className="apple-tool-subtitle text-xs text-[#86868b]">
                A view module was updated or temporarily interrupted. Click below to reload and continue smoothly.
              </p>
            </div>

            <button
              type="button"
              onClick={this.handleReset}
              className="apple-calculate-btn py-3 px-6 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Workspace</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
