import { Component, type ErrorInfo, type ReactNode } from 'react';

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
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#090909] px-6 text-center text-white">
          <section className="max-w-md rounded-2xl border border-primary/20 bg-[#1a1919] p-8 shadow-[0_4px_34px_#c8a47e33]">
            <p className="font-display text-3xl">Something went wrong.</p>
            <p className="mt-3 text-sm leading-6 text-[#bdbdbd]">
              Refresh the page to try again.
            </p>
            <button
              type="button"
              className="focus-ring mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[#0b0b0b]"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
