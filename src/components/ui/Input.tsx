import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
  shape?: "default" | "pill";
}

export function Input({
  label,
  error,
  id,
  className = "",
  hideLabel = false,
  shape = "default",
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name ?? label.replace(/\s+/g, "-").toLowerCase();
  const errorId = `${inputId}-error`;
  const radius = shape === "pill" ? "rounded-1000" : "rounded-16";
  return (
    <label className="flex w-full flex-col text-almarai-14 text-color-131" htmlFor={inputId}>
      <span className={hideLabel ? "sr-only" : "mb-8"}>{label}</span>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`h-52 w-full ${radius} border border-secondary bg-color-106 px-16 text-almarai-16 text-secondary placeholder:text-color-135 transition hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...rest}
      />
      {error ? (
        <span id={errorId} className="mt-8 text-almarai-14 text-border">
          {error}
        </span>
      ) : null}
    </label>
  );
}
