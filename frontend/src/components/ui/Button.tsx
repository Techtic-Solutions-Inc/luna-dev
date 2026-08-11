import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-8);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: var(--padding-10) var(--padding-16);
  border-radius: var(--radius-6);
  border: 1px solid transparent;
  cursor: pointer;
  font-family: var(--font-body-sm-29-family);
  font-size: var(--font-body-sm-29-size);
  font-weight: var(--font-body-sm-29-weight);
  line-height: var(--font-body-sm-29-line-height);
  transition: opacity 0.15s ease, background-color 0.15s ease;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: var(--secondary);
          color: var(--color-16);
          border-color: var(--color-18);
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--text-primary);
          border-color: transparent;
        `;
      default:
        return `
          background: var(--accent);
          color: var(--color-16);
        `;
    }
  }}

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <StyledButton $variant={variant} $fullWidth={fullWidth} type={type} {...rest}>
    {children}
  </StyledButton>
);

export default Button;
