import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost' | 'gold';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-[var(--color-16)] hover:opacity-90',
  secondary:
    'bg-[var(--color-36)] text-accent border border-[var(--color-41)] hover:border-accent',
  outline: 'border border-accent text-accent bg-transparent hover:bg-[var(--color-26)]',
  dark: 'bg-[var(--color-16)] text-secondary border border-[var(--color-41)] hover:border-accent',
  ghost: 'border border-secondary text-secondary bg-transparent hover:bg-[var(--color-22)]',
  gold: 'bg-accent text-secondary hover:opacity-90',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-almarai text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${variantClassName[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" label="Loading" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
