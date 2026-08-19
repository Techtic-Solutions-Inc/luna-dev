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
        className="group flex cursor-pointer items-start gap-2.5 text-xs leading-[18px] text-[#a09ca0]"
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
          className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border border-[#a09ca0] text-transparent transition peer-checked:border-[#c8a47e] peer-checked:bg-[#c8a47e] peer-checked:text-[#14100d] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#c8a47e]"
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
        <p id={errorId} className="mt-1.5 pl-7 text-xs text-[#e8a29d]">
          {error}
        </p>
      )}
    </div>
  );
}
