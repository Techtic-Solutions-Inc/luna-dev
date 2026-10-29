import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[color:var(--color-accent)]/15", className)}
      {...props}
    />
  );
}

export { Skeleton };
