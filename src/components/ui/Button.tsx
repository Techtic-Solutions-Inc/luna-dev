import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-color-101 hover:bg-color-102 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-transparent text-secondary border border-color-131 hover:border-accent hover:text-accent active:bg-secondary/5 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-color-131 hover:text-secondary hover:bg-color-129 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "bg-transparent text-secondary border border-secondary/80 hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed",
};

export function Button({
  variant = "primary",
  loading = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-8 rounded-1000 px-20 py-12 text-almarai-16-24 transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-16 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {children}
    </button>
  );
}
