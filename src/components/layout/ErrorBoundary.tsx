import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-8 text-center">
          <h1 className="font-garamond text-2xl font-semibold text-secondary">
            Something went wrong.
          </h1>
          <p className="font-almarai text-sm text-muted-foreground">
            An unexpected error occurred. Please refresh the page and try again.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
