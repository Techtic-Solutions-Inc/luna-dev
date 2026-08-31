import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-padding-24">
          <div className="flex max-w-md flex-col items-center gap-gap-16 text-center">
            <h1 className="font-garamond text-heading-lg-19 text-foreground">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message ??
                'An unexpected error stopped this screen from rendering.'}
            </p>
            <Button type="button" onClick={this.handleReset}>
              Reload view
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
