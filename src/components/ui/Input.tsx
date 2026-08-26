import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  suffix?: ReactNode;
}

export function Input({
  id,
  label,
  error,
  suffix,
  className = '',
  disabled,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only type-body font-almarai">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`type-body-15 h-[52px] w-full rounded-[8px] border bg-color-106 px-[12px] text-ink placeholder:text-muted hover:border-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-border' : 'border-ink/40'
          } ${suffix ? 'pr-[48px]' : ''} ${className}`}
          {...props}
        />
        {suffix}
      </div>
      {error ? (
        <p id={`${id}-error`} className="type-body-69 mt-[2px] font-almarai text-border" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
