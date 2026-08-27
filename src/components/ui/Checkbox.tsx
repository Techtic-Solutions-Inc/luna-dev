import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export function Checkbox({ children, id, className = "", ...rest }: CheckboxProps) {
  const inputId = id ?? rest.name ?? "checkbox";
  return (
    <label
      htmlFor={inputId}
      className={`flex cursor-pointer items-center gap-10 text-body text-color-131 ${className}`}
      style={{ fontFamily: "'Almarai', sans-serif" }}
    >
      <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          className="peer h-16 w-16 shrink-0 appearance-none rounded-2 border border-color-131 bg-transparent transition hover:border-accent checked:border-accent checked:bg-accent focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
          {...rest}
        />
        <svg
          className="pointer-events-none absolute hidden h-10 w-10 text-color-101 peer-checked:block"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 6.2l2.4 2.4L10 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}
