import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'dark' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing['padding-8']} ${theme.spacing['padding-20']}`};
    font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
    line-height: ${({ theme }) => theme.typography['body-sm-2'].lineHeight};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing['padding-12']} ${theme.spacing['padding-30']}`};
    font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
    line-height: ${({ theme }) => theme.typography['body-21'].lineHeight};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing['padding-16']} ${theme.spacing['padding-40']}`};
    font-size: ${({ theme }) => theme.typography['body-3'].fontSize};
    line-height: ${({ theme }) => theme.typography['body-3'].lineHeight};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors['color-20']};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-56']};
      border-color: ${({ theme }) => theme.colors['color-56']};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-26']};
    }
  `,
  'outline-light': css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-22']};
      border-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
  dark: css`
    background-color: ${({ theme }) => theme.colors['color-20']};
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors['color-49']};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-41']};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-weight: 400;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) => (
  <StyledButton
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    disabled={disabled || isLoading}
    aria-busy={isLoading}
    {...rest}
  >
    {isLoading ? 'Loading…' : children}
  </StyledButton>
);

export default Button;
