import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="surface-aurora flex min-h-screen flex-col items-center justify-center px-20 py-60 text-center">
          <h1 className="type-heading-xl-44 text-white">Something went wrong.</h1>
          <p className="type-body-68 mt-16 max-w-[440px] text-white/70">
            {this.state.error?.message ?? 'An unexpected error stopped this page from loading.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="type-body-sm-2 mt-30 inline-flex h-36 items-center justify-center rounded-full bg-accent px-20 text-white transition-colors duration-200 hover:bg-color-30"
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
