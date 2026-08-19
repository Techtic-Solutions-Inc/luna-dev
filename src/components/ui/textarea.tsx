import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export default function Textarea({
  id,
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}: TextareaProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${inputId}-error`;

  return (
    <div className={containerClassName || 'w-full'}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <textarea
        id={inputId}
        {...props}
        className={`min-h-[7.5rem] w-full resize-y rounded-token-16 border bg-color-22 px-5 py-3 font-almarai text-base text-secondary placeholder:text-color-14 outline-none focus:outline-none focus-visible:outline-none ${
          error ? 'border-color-45' : 'border-color-22'
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-left font-almarai text-sm text-color-45" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
