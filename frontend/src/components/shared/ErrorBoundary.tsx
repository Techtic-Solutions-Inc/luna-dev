import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4">
          <div className="max-w-md rounded-[16px] border border-[#ff5630]/40 bg-[#ff5630]/10 p-6 text-center text-[#fdfdfd]">
            <h1 className="font-display text-[24px]">Something went wrong</h1>
            <p className="mt-3 text-sm leading-6 text-[#A6A4A2]">
              An unexpected error occurred. Refresh the page to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="focus-ring mt-6 rounded-full bg-primary px-5 py-2.5 text-sm text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
