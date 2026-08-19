import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
  containerClassName?: string;
}

export default function Checkbox({
  id,
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}: CheckboxProps) {
  const inputId =
    id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <div className={containerClassName || 'w-full max-w-md'}>
      <label
        htmlFor={inputId}
        className={`flex cursor-pointer items-start gap-3 text-left font-almarai text-sm text-color-18 ${className}`}
      >
        <input
          id={inputId}
          type="checkbox"
          {...props}
          className="mt-0.5 h-4 w-4 shrink-0 accent-accent outline-none focus:outline-none focus-visible:outline-none [outline:none] focus:[outline:none] focus-visible:[outline:none]"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={errorId} className="mt-2 text-left font-almarai text-sm text-color-45" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
