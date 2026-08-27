import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
  shape?: "default" | "pill";
  inputSize?: "default" | "dashboard";
  leadingIcon?: ReactNode;
}

export function Input({
  label,
  error,
  id,
  className = "",
  hideLabel = false,
  shape = "default",
  inputSize = "default",
  leadingIcon,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name ?? label.replace(/\s+/g, "-").toLowerCase();
  const errorId = `${inputId}-error`;
  const radius =
    inputSize === "dashboard" ? "rounded-8" : shape === "pill" ? "rounded-1000" : "rounded-16";
  const height = inputSize === "dashboard" ? "h-44" : "h-52";
  const border = inputSize === "dashboard" ? "border-color-111" : "border-secondary";
  const padding = leadingIcon ? "pl-44 pr-20" : inputSize === "dashboard" ? "px-20" : "px-16";
  return (
    <label
      className="flex w-full flex-col text-body text-color-131"
      htmlFor={inputId}
      style={{ fontFamily: "'Almarai', sans-serif" }}
    >
      <span className={hideLabel ? "sr-only" : "mb-8"}>{label}</span>
      <span className="relative block w-full">
        {leadingIcon ? (
          <span
            className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 text-color-131"
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${height} w-full ${radius} border ${border} bg-color-106 ${padding} text-body text-secondary placeholder:text-color-135 transition hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...rest}
          style={{ fontFamily: "'Almarai', sans-serif" }}
        />
      </span>
      {error ? (
        <span id={errorId} className="mt-8 text-body text-border" style={{ fontFamily: "'Almarai', sans-serif" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
