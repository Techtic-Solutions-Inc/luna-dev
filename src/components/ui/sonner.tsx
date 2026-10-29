import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className={cn("toaster group", className)}
      richColors
      closeButton
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
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
