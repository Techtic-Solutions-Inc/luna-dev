import styled, { keyframes } from 'styled-components';
import { colors } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.gap8};
  color: ${colors.accent};
  ${typographyStyle('caption4')}
`;

const SpinnerRing = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${colors.color53};
  border-top-color: ${colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

type SpinnerProps = {
  label?: string;
};

export default function Spinner({ label = 'Loading...' }: SpinnerProps) {
  return (
    <SpinnerRoot role="status" aria-live="polite">
      <SpinnerRing aria-hidden="true" />
      <span>{label}</span>
    </SpinnerRoot>
  );
}
