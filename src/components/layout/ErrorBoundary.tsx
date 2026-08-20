import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center"
          role="alert"
        >
          <h1 className="font-garamond text-3xl font-medium text-secondary">
            Something went wrong.
          </h1>
          <p className="font-almarai text-base text-[var(--text-secondary)]">
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="rounded-full bg-accent px-6 py-2 font-almarai text-sm font-bold text-[var(--color-16)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Try again"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
