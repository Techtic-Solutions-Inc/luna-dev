import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-color-105 px-[20px] text-center">
          <div>
            <h1 className="font-garamond text-[32px] font-medium leading-[41.76px] text-ink">
              Something went wrong.
            </h1>
            <p className="type-body-15 mt-[12px] text-muted">Refresh the page to try again.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
