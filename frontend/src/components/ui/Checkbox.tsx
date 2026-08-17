import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
  error?: string;
}

export default function Checkbox({
  children,
  error,
  id,
  className = '',
  ...inputProps
}: CheckboxProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="group flex cursor-pointer items-start gap-2.5 text-xs leading-[18px] text-color-14"
      >
        <input
          {...inputProps}
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border border-color-14 text-transparent transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-color-20 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
        >
          <svg
            viewBox="0 0 12 10"
            className="h-2.5 w-2.5 fill-none stroke-current stroke-[2.2]"
          >
            <path d="m1 5 3 3 7-7" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-1.5 pl-7 text-xs text-color-73">
          {error}
        </p>
      )}
    </div>
  );
}
