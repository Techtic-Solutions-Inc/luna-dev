import type { InputHTMLAttributes, ReactNode } from 'react';

type InputShape = 'pill' | 'soft';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: ReactNode;
  containerClassName?: string;
  shape?: InputShape;
}

const shapeClassName: Record<InputShape, string> = {
  pill: 'rounded-full',
  soft: 'rounded-token-16',
};

export default function Input({
  id,
  label,
  error,
  className = '',
  suffix,
  containerClassName = '',
  shape = 'pill',
  ...props
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${inputId}-error`;

  return (
    <div className={containerClassName || 'w-full max-w-md'}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          {...props}
          className={`w-full border bg-color-22 px-5 py-3 font-almarai text-base text-secondary placeholder:text-color-14 outline-none focus:outline-none focus-visible:outline-none ${
            shapeClassName[shape]
          } ${suffix ? 'pr-12' : ''} ${error ? 'border-color-45' : 'border-color-22'} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {suffix ? (
          <div className="absolute inset-y-0 right-3 flex items-center">{suffix}</div>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-left font-almarai text-sm text-color-45" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
