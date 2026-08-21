import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

const Checkbox = ({
  label,
  error,
  id,
  className = '',
  ...props
}: CheckboxProps) => {
  const checkboxId = id ?? props.name;

  return (
    <div className="flex flex-col gap-gap-4">
      <div className="flex items-start gap-gap-12">
        <input
          type="checkbox"
          id={checkboxId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          className={[
            'mt-1 h-4 w-4 flex-shrink-0 cursor-pointer rounded-radius-2',
            'border border-color-20 bg-color-16 text-accent',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-37',
            'hover:border-accent',
            'active:border-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'accent-accent',
            className,
          ].join(' ')}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="font-almarai text-body-sm-106 text-color-14 cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
      {error && (
        <p
          id={`${checkboxId}-error`}
          role="alert"
          className="font-almarai text-body-sm-106 text-color-46 pl-gap-28"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
