import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  shape?: 'box' | 'soft';
}

export function Input({
  id,
  label,
  error,
  shape = 'box',
  className = '',
  disabled,
  ...props
}: InputProps) {
  const radius = shape === 'soft' ? 'rounded-[24px]' : 'rounded-[12px]';

  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only type-body font-almarai">
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`type-body-15 h-[52px] w-full border bg-[#1d1a1a] px-[16px] font-almarai text-white placeholder:text-[#637381] hover:border-[#c8a47e] focus-visible:border-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-50 ${radius} ${
          error ? 'border-[#ff5630]' : 'border-[#637381]'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="type-body-69 mt-[2px] font-almarai text-[#ff5630]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
