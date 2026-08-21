import type { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

const InputField = ({
  label,
  error,
  hideLabel = false,
  id,
  className = '',
  ...props
}: InputFieldProps) => {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-gap-4">
      <label
        htmlFor={inputId}
        className={hideLabel ? 'sr-only' : 'font-almarai text-body-sm-106 text-color-14'}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          'w-full rounded-radius-10 border bg-color-16 px-padding-16 py-padding-12',
          'font-almarai text-body-77 text-secondary placeholder:text-color-14',
          'transition-colors duration-200',
          'hover:border-color-14',
          'focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'active:border-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-color-46' : 'border-color-20',
          className,
        ].join(' ')}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="font-almarai text-body-sm-106 text-color-46"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
