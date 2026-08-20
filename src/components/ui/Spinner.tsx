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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  padding: ${({ theme }) => theme.spacing['padding-24']};
`;

const SpinnerRing = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors['color-21']};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerLabel = styled.span`
  font-family: ${({ theme }) => theme.typography['caption-4'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-4'].fontSize};
  font-weight: ${({ theme }) => theme.typography['caption-4'].fontWeight};
  line-height: ${({ theme }) => theme.typography['caption-4'].lineHeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label = 'Loading...' }: SpinnerProps) => (
  <SpinnerContainer role="status" aria-live="polite" aria-busy="true">
    <SpinnerRing aria-hidden="true" />
    <SpinnerLabel>{label}</SpinnerLabel>
  </SpinnerContainer>
);

export default Spinner;
