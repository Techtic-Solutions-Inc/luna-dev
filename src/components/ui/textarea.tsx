import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-[color:var(--color-accent)]/20 bg-[rgba(255,255,255,0.05)] px-3 py-2 font-almarai text-sm text-[#ffffff] placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
