import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const Fallback = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${spacing.padding40};
  background: ${colors.color16};
  color: ${colors.color45};
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  ${typographyStyle('headingMd20')}
  color: ${colors.color45};
`;

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

  render() {
    if (this.state.hasError) {
      return (
        <Fallback>
          <Title>Something went wrong.</Title>
        </Fallback>
      );
    }
    return this.props.children;
  }
}
