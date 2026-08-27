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
      <input
        id={inputId}
        type="checkbox"
        className="h-16 w-16 shrink-0 appearance-none rounded-2 border border-color-131 bg-transparent transition hover:border-accent checked:border-accent checked:bg-accent focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />
      <span>{children}</span>
    </label>
  );
}
