import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-gap-16 bg-color-16 px-padding-24 text-secondary"
          role="alert"
        >
          <h1 className="font-garamond text-[32px] font-medium leading-[41.76px]">
            Something went wrong
          </h1>
          <p className="max-w-md text-center font-almarai text-base leading-[26px] text-color-15">
            {this.state.error?.message ??
              'An unexpected error occurred. Please try again.'}
          </p>
          <Link
            to="/"
            className="rounded-radius-10000 bg-accent px-padding-24 py-padding-12 font-public-sans text-base font-semibold text-color-16 transition-[filter] hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:brightness-75"
          >
            Return home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
