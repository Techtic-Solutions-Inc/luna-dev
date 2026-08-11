import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--gap-8);
  color: var(--text-secondary);
`;

const SpinnerRing = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-18);
  border-top-color: var(--accent);
  border-radius: var(--radius-10000);
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerLabel = styled.span`
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);
`;

interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label = 'Loading...' }: SpinnerProps) => (
  <SpinnerWrapper role="status" aria-live="polite" aria-busy="true">
    <SpinnerRing aria-hidden="true" />
    <SpinnerLabel>{label}</SpinnerLabel>
  </SpinnerWrapper>
);

export default Spinner;
