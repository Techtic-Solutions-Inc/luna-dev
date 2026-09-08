import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-[40px] py-[20px]">
          <div className="w-full max-w-md space-y-6">
            <h1 className="font-['EB_Garamond'] text-2xl font-semibold text-foreground">
              Something went wrong
            </h1>
            <ErrorMessage
              message="An unexpected error occurred. Please try again or refresh the page."
              onRetry={this.handleReset}
            />
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
