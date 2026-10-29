import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className={cn("toaster group", className)}
      closeButton
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-[var(--color-color-16)] group-[.toaster]:text-success group-[.toaster]:border-[color:var(--color-accent)]/25 group-[.toaster]:shadow-lg font-almarai",
            toastOptions?.classNames?.toast,
          ),
          description: cn("group-[.toast]:text-success/70", toastOptions?.classNames?.description),
          actionButton: cn(
            "group-[.toast]:bg-[var(--color-info)] group-[.toast]:text-[var(--color-color-16)]",
            toastOptions?.classNames?.actionButton,
          ),
          cancelButton: cn(
            "group-[.toast]:bg-[var(--color-color-26)] group-[.toast]:text-success",
            toastOptions?.classNames?.cancelButton,
          ),
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
