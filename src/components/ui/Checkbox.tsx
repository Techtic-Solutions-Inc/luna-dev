import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 font-almarai text-sm leading-5 text-[var(--color-57)]"
      >
        <input
          {...inputProps}
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error && errorId ? errorId : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border border-[var(--color-57)] text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-[var(--color-16)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
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
      {error && errorId ? (
        <p id={errorId} className="mt-1.5 pl-8 font-almarai text-xs text-[var(--border)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
