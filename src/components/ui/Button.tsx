import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`inline-flex h-[52px] w-full items-center justify-center rounded-[8px] border border-accent bg-accent px-[12px] font-public text-[16px] font-semibold leading-[24px] text-ink hover:brightness-90 focus-visible:brightness-90 active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
