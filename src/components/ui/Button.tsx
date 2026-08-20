import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import { buttonChromeStyles, type ButtonShape, type ButtonVariant } from './buttonChrome';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  /** Default `rounded` matches JAW-9133 (radius10). Use `pill` for auth Figma frames. */
  shape?: ButtonShape;
  isLoading?: boolean;
  children: ReactNode;
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $shape: ButtonShape }>`
  width: 100%;
  ${buttonChromeStyles}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Button({
  variant = 'accent',
  shape = 'rounded',
  isLoading = false,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $shape={shape}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? <Spinner label="Loading..." /> : children}
    </StyledButton>
  );
}
