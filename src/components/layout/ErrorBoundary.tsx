import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-16)] px-6 text-center">
          <h1 className="font-garamond text-3xl font-medium text-secondary">
            Something went wrong.
          </h1>
          <p className="max-w-md font-almarai text-sm text-[var(--color-57)]">
            An unexpected error occurred. Refresh the page to continue.
          </p>
          <button
            type="button"
            className="rounded-full bg-accent px-6 py-3 font-almarai text-sm font-bold text-[var(--color-16)]"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
