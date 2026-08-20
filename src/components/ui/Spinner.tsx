import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerRing = styled.span<{ $size?: string }>`
  display: inline-block;
  width: ${({ $size }) => $size ?? '1rem'};
  height: ${({ $size }) => $size ?? '1rem'};
  border: 2px solid var(--color-26);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

type SpinnerProps = {
  label?: string;
  size?: string;
  className?: string;
};

export default function Spinner({ label = 'Loading', size, className }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" aria-label={label} className={className}>
      <SpinnerRing $size={size} />
    </span>
  );
}
