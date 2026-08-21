import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerMark = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 2px solid ${({ theme }) => theme.colors['color-20']};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius['radius-100']};
  animation: ${spin} 0.8s linear infinite;
`;

interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label = 'Loading...' }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-[var(--spacing-gap-10)] py-[var(--spacing-padding-24)]"
    >
      <SpinnerMark aria-hidden="true" />
      <span className="text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] text-secondary">
        {label}
      </span>
    </div>
  );
};

export default Spinner;
