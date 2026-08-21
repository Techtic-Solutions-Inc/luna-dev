import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
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
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-gap-24 bg-color-23 px-padding-32 text-secondary"
        >
          <h1 className="font-garamond text-heading-lg-19">Something went wrong</h1>
          <p className="font-almarai text-body-77 text-color-14 text-center max-w-md">
            An unexpected error occurred. Please try again.
          </p>
          <Button onClick={this.handleRetry} aria-label="Retry loading the page">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
