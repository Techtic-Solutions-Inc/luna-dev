import React, { type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

const ErrorContainer = styled.div`
  padding: var(--padding-24);
  border: 1px solid var(--border);
  border-radius: var(--radius-8);
  background: var(--color-29);
  color: var(--text-primary);
`;

const ErrorTitle = styled.h1`
  font-family: var(--font-heading-md-10-family);
  font-size: var(--font-heading-md-10-size);
  font-weight: var(--font-heading-md-10-weight);
  line-height: var(--font-heading-md-10-line-height);
  margin-bottom: var(--gap-8);
`;

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  margin-bottom: var(--gap-16);
`;

const RetryButton = styled.button`
  padding: var(--padding-10) var(--padding-16);
  background: var(--accent);
  color: var(--color-16);
  border: none;
  border-radius: var(--radius-6);
  cursor: pointer;
  font-weight: 700;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer role="alert">
          <ErrorTitle>Something went wrong.</ErrorTitle>
          {this.state.errorMessage ? (
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
          ) : null}
          <RetryButton type="button" onClick={this.handleRetry}>
            Try again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
