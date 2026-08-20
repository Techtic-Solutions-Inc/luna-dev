import type { ReactNode } from 'react';

interface HomeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClasses = {
  primary: 'bg-accent text-[var(--color-16)] hover:opacity-90',
  secondary: 'bg-[var(--color-36)] text-accent border border-[var(--color-41)] hover:border-accent',
  outline: 'border border-accent text-accent bg-transparent hover:bg-[var(--color-26)]',
  dark: 'bg-[var(--color-16)] text-accent border border-[var(--color-41)] hover:border-accent',
};

const HomeButton = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
}: HomeButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    aria-busy={loading}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-almarai text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
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

export default HomeButton;
