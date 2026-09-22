import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AgentwiseLogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function AgentwiseLogo({
  className,
  variant = "header",
}: AgentwiseLogoProps) {
  const isFooter = variant === "footer";
  return (
    <Link
      to="/"
      className={cn("inline-flex flex-col no-underline", className)}
      aria-label="Agentwise home"
    >
      <span
        className={cn(
          "font-serif text-[26px] italic leading-none tracking-[-0.02em]",
          isFooter ? "text-accent" : "text-primary",
        )}
      >
        Agentwise
      </span>
      <span
        className={cn(
          "mt-1.5 font-almarai text-[9px] font-bold uppercase tracking-[0.22em]",
          isFooter ? "text-accent/90" : "text-muted-alt",
        )}
      >
        Real Estate Marketing
      </span>
    </Link>
  );
}
