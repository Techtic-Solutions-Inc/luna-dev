import { Component, type ErrorInfo, type ReactNode } from 'react';
import { typography } from '@/theme/tokens';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
          <h1
            style={{
              fontFamily: typography['heading-lg-19'].fontFamily,
              fontSize: typography['heading-lg-19'].fontSize,
              fontWeight: typography['heading-lg-19'].fontWeight,
              lineHeight: typography['heading-lg-19'].lineHeight,
            }}
          >
            Something went wrong.
          </h1>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
