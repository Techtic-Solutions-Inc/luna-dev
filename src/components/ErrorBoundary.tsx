import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="flex min-h-screen items-center justify-center p-6">
          <p>Something went wrong.</p>
        </main>
      );
    }
    return this.props.children;
  }
}
