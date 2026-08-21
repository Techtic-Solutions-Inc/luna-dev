import { Component, type ErrorInfo, type ReactNode } from 'react';

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

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: Boolean(error) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-[var(--spacing-gap-16)] px-[var(--spacing-padding-24)] text-center"
        >
          <h1
            className="font-heading text-[length:var(--typography-heading-lg-19-font-size)] font-medium leading-[var(--typography-heading-lg-19-line-height)] text-secondary"
          >
            Something went wrong.
          </h1>
          <p className="max-w-md text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] text-[color:var(--color-text-secondary)]">
            An unexpected error occurred. Reload the page to continue.
          </p>
          <button
            type="button"
            className="rounded-[var(--radius-medium)] bg-accent px-[var(--spacing-padding-20)] py-[var(--spacing-padding-10)] text-[color:var(--color-color-16)]"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
