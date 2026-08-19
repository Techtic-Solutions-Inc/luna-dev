import { Component, type ErrorInfo, type ReactNode } from 'react';

import { FiAlertCircle } from '@/lib/icons';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled UI error', error, info);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-4 bg-color-16 px-6 text-center text-secondary"
          role="alert"
        >
          <FiAlertCircle size={32} className="text-accent" aria-hidden="true" focusable="false" />
          <h1 className="font-garamond text-3xl">Something went wrong.</h1>
          <p className="max-w-md text-color-18">
            An unexpected error occurred. You can retry or return to the home page.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-full bg-accent px-6 py-3 text-color-16"
            aria-label="Retry rendering the application"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
