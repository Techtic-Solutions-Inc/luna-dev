import { Coffee } from "lucide-react";

export function IconDemo() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground">
      <Coffee className="h-4 w-4" aria-hidden="true" />
      <span>Icon library is configured.</span>
    </div>
  );
}
