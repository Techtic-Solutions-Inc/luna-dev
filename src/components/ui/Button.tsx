import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    'bg-accent text-[#000001] hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-transparent border border-line text-ink hover:bg-panel active:bg-card disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-accent hover:text-ink active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed',
};

export function Button({
  children,
  loading = false,
  variant = 'primary',
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-control px-5 py-3',
        'text-[16px] font-semibold leading-6 transition-all',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        fullWidth ? 'w-full' : '',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
