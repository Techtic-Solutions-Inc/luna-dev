import { cn } from "@/lib/utils";

const socials = [
  { label: "Facebook", href: "https://facebook.com", color: "#1877f2" },
  { label: "Instagram", href: "https://instagram.com", color: "#dd2a7b" },
  { label: "TikTok", href: "https://tiktok.com", color: "#ffffff" },
  { label: "Google", href: "https://google.com", color: "#0072ce" },
  { label: "LinkedIn", href: "https://linkedin.com", color: "#0072ce" },
] as const;

interface SocialIconsProps {
  className?: string;
  size?: "sm" | "md";
}

export function SocialIcons({ className, size = "md" }: SocialIconsProps) {
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={cn(
            dim,
            "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-text-primary transition-colors hover:bg-white/15 active:bg-white/10",
          )}
          style={{ color: item.color }}
        >
          {item.label.charAt(0)}
        </a>
      ))}
    </div>
  );
}

export function FooterSocialIcons({ className }: { className?: string }) {
  const items = [
    { label: "Facebook", char: "f" },
    { label: "X", char: "𝕏" },
    { label: "LinkedIn", char: "in" },
    { label: "Instagram", char: "ig" },
  ];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          aria-label={item.label}
          className="text-sm text-text-primary transition-opacity hover:opacity-70 active:opacity-50"
          onClick={(e) => e.preventDefault()}
        >
          {item.char}
        </a>
      ))}
    </div>
  );
}
