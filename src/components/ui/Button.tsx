import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  shape?: 'box' | 'pill';
}

export function Button({
  isLoading = false,
  children,
  shape = 'pill',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const radius = shape === 'pill' ? 'rounded-[100px]' : 'rounded-[12px]';

  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`type-body-115 inline-flex h-[52px] w-full items-center justify-center border border-[#c8a47e] bg-[#c8a47e] px-[12px] text-white hover:border-[#8b6842] hover:bg-[#8b6842] focus-visible:border-[#8b6842] focus-visible:bg-[#8b6842] active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50 ${radius} ${className}`}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
