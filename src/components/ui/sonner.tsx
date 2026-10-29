import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-color-16)] group-[.toaster]:text-success group-[.toaster]:border-[color:var(--color-accent)]/25 group-[.toaster]:shadow-lg font-almarai",
          description: "group-[.toast]:text-success/70",
          actionButton: "group-[.toast]:bg-[var(--color-info)] group-[.toast]:text-[var(--color-color-16)]",
          cancelButton: "group-[.toast]:bg-[var(--color-color-26)] group-[.toast]:text-success",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
