import { Component, type ErrorInfo, type ReactNode } from "react";
import styled from "styled-components";

type Props = { children: ReactNode };
type State = { hasError: boolean };

const Fallback = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.padding20};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.almarai};
`;

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
      return <Fallback role="alert">Something went wrong.</Fallback>;
    }
    return this.props.children;
  }
}
