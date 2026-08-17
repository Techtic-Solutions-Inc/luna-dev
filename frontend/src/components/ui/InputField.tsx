import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  trailingElement?: ReactNode;
}

export default function InputField({
  label,
  error,
  trailingElement,
  className = '',
  id,
  ...inputProps
}: InputFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div
        className={`flex h-[52px] items-center rounded-full border bg-white/[0.045] transition focus-within:border-[#c8a47e] ${
          error ? 'border-[#d9857e]' : 'border-white/[0.14]'
        }`}
      >
        <input
          {...inputProps}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-5 text-sm font-light text-white outline-none placeholder:text-[#a09ca0]"
          placeholder={label}
        />
        {trailingElement}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 pl-5 text-xs text-[#e8a29d]">
          {error}
        </p>
      )}
    </div>
  );
}
