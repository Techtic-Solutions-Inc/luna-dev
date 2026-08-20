import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type'
> {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-[var(--color-16)] hover:opacity-90',
  secondary: 'bg-[var(--color-36)] text-accent border border-[var(--color-41)] hover:border-accent',
  outline: 'border border-accent text-accent bg-transparent hover:bg-[var(--color-26)]',
  dark: 'bg-[var(--color-16)] text-accent border border-[var(--color-41)] hover:border-accent',
};

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    aria-busy={loading}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-almarai text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    {...rest}
  >
    {loading ? (
      <>
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
        <span>Loading...</span>
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;
