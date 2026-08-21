import React, { type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing.padding};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const ErrorTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: ${({ theme }) => theme.typography.bodySize};
  margin-bottom: ${({ theme }) => theme.spacing.gap};
`;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer role="alert" aria-live="assertive">
          <ErrorTitle>Something went wrong.</ErrorTitle>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
