import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, radius, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'accent';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.gap8};
  width: 100%;
  border: none;
  cursor: pointer;
  padding: ${spacing.padding14} ${spacing.padding24};
  border-radius: ${radius.radius10000};
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  ${typographyStyle('bodySm35')}

  ${({ $variant }) => {
    if ($variant === 'accent') {
      return css`
        background: ${colors.accent};
        color: ${colors.secondary};
      `;
    }
    if ($variant === 'secondary') {
      return css`
        background: transparent;
        color: ${colors.secondary};
        border: 1px solid ${colors.color49};
      `;
    }
    return css`
      background: ${colors.color16};
      color: ${colors.secondary};
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.92;
  }
`;

export default function Button({
  variant = 'accent',
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
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? <Spinner label="Loading..." /> : children}
    </StyledButton>
  );
}
