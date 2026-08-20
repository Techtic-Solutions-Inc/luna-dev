import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';
import Button from '../ui/Button';

const Fallback = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--padding-16);
  padding: var(--padding-40);
  background: var(--surface);
  color: var(--text-primary);
  text-align: center;
`;

const Title = styled.h1`
  ${typographyStyle('heading-lg-47')}
  margin: 0;
`;

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Fallback>
          <Title>Something went wrong.</Title>
          <Button type="button" onClick={this.handleRetry}>
            Try again
          </Button>
        </Fallback>
      );
    }

    return this.props.children;
  }
}
