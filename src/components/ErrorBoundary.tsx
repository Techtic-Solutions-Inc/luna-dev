import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-24 bg-color-24 px-padding-32 text-secondary">
          <h1 className="font-garamond text-heading-xl-37">Something went wrong.</h1>
          <button
            type="button"
            className="rounded-radius-10000 bg-accent px-padding-24 py-padding-12 font-almarai text-body-77 text-secondary hover:bg-[#b8936a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
