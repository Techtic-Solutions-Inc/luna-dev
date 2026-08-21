import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.gap};
  padding: ${({ theme }) => theme.spacing.padding};
`;

const SpinnerRing = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors['color-27']};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySize};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Spinner = () => (
  <SpinnerContainer role="status" aria-live="polite" aria-label="Loading">
    <SpinnerRing aria-hidden="true" />
    <SpinnerLabel>Loading...</SpinnerLabel>
  </SpinnerContainer>
);

export default Spinner;
