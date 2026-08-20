import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '../../theme/tokens';

export type ButtonVariant = 'default' | 'gold' | 'ghost' | 'pill';

interface StyledButtonProps {
  $variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  default: css`
    min-height: 44px;
    padding: ${tokens.spacing['padding-10']} ${tokens.spacing['padding-20']};
    border: 0;
    border-radius: ${tokens.radius['radius-6']};
    background: var(--accent);
    color: var(--color-16);
    font-family: ${tokens.typography['body-sm-29'].fontFamily}, sans-serif;
    font-size: ${tokens.typography['body-sm-29'].fontSize};
    font-weight: ${tokens.typography['body-sm-29'].fontWeight};
    line-height: ${tokens.typography['body-sm-29'].lineHeight};
  `,
  gold: css`
    min-height: 48px;
    padding: ${tokens.spacing['padding-12']} ${tokens.spacing['padding-32']};
    border: 0;
    border-radius: ${tokens.radius['radius-10000']};
    background: linear-gradient(90deg, var(--accent) 0%, var(--color-56) 100%);
    color: var(--secondary);
    font-family: ${tokens.typography['body-sm-35'].fontFamily}, sans-serif;
    font-size: ${tokens.typography.body.fontSize};
    font-weight: ${tokens.typography['body-sm-35'].fontWeight};
    line-height: ${tokens.typography.body.lineHeight};
  `,
  ghost: css`
    min-height: 44px;
    padding: ${tokens.spacing['padding-10']} ${tokens.spacing['padding-20']};
    border: 1px solid var(--color-49);
    border-radius: ${tokens.radius['radius-10000']};
    background: transparent;
    color: var(--secondary);
    font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
    font-size: ${tokens.typography['body-sm-38'].fontSize};
    font-weight: ${tokens.typography['body-sm-38'].fontWeight};
    line-height: ${tokens.typography['body-sm-38'].lineHeight};
  `,
  pill: css`
    min-height: 52px;
    padding: ${tokens.spacing['padding-12']} ${tokens.spacing['padding-32']};
    border: 0;
    border-radius: ${tokens.radius['radius-10000']};
    background: var(--accent);
    color: var(--secondary);
    font-family: ${tokens.typography['body-sm-35'].fontFamily}, sans-serif;
    font-size: ${tokens.typography.body.fontSize};
    font-weight: ${tokens.typography['body-sm-35'].fontWeight};
    line-height: ${tokens.typography.body.lineHeight};
  `,
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({ variant = 'default', ...props }: ButtonProps) => (
  <StyledButton $variant={variant} {...props} />
);

export default Button;
