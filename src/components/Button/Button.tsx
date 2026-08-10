import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: var(--color-text-inverse);
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  border: 1px solid transparent;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.snug};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: var(--color-surface);
          color: var(--color-text-primary);
          border-color: var(--color-border);
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-text-primary);
          border-color: transparent;
        `;
      default:
        return `
          background: var(--color-brand-primary);
          color: var(--color-text-inverse);
        `;
    }
  }}

  &:hover:not(:disabled) {
    ${({ $variant }) =>
      $variant === 'primary'
        ? 'background: var(--color-brand-primary-hover);'
        : 'opacity: 0.92;'}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) => (
  <StyledButton
    $variant={variant}
    $fullWidth={fullWidth}
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading}
    {...rest}
  >
    {isLoading ? <Spinner aria-hidden="true" /> : null}
    {children}
  </StyledButton>
);

export default Button;
