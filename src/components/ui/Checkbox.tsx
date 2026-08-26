import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: ReactNode;
  error?: string;
  labelClassName?: string;
  align?: 'start' | 'center';
}

export function Checkbox({
  id,
  label,
  error,
  disabled,
  className = '',
  labelClassName = 'type-body-15 font-almarai text-white',
  align = 'start',
  ...props
}: CheckboxProps) {
  const alignClass = align === 'center' ? 'items-center' : 'items-start';
  return (
    <div className={`flex gap-[10px] ${alignClass} ${className}`}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        className={`h-[16px] w-[16px] shrink-0 cursor-pointer rounded-[2px] border border-[#637381] accent-[#c8a47e] hover:border-[#c8a47e] focus-visible:border-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-50 ${
          align === 'start' ? 'mt-[2px]' : ''
        }`}
        {...props}
      />
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  );
}
