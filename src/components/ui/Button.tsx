import styled, { css } from 'styled-components';
import Spinner from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type StyledButtonProps = {
  $variant: ButtonVariant;
  $fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: var(--accent);
    color: var(--secondary);
    border: 1px solid var(--accent);
    box-shadow: var(--drop-shadow-37);

    &:hover:not(:disabled) {
      filter: brightness(1.05);
    }
  `,
  secondary: css`
    background: transparent;
    color: var(--accent);
    border: 1px solid var(--accent);

    &:hover:not(:disabled) {
      background: var(--color-26);
    }
  `,
  ghost: css`
    background: transparent;
    color: var(--accent);
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--padding-8);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: var(--padding-12) var(--padding-24);
  border-radius: var(--radius-10000);
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
  transition: filter 0.15s ease, background 0.15s ease;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  loadingLabel?: string;
};

export default function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  loadingLabel = 'Loading',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner size="1rem" label={loadingLabel} />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}
