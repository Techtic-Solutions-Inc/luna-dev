import type { ComponentType } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M14.5 3c.3 2.3 1.6 3.9 3.9 4.2v2.3c-1.3.1-2.5-.3-3.6-1v6.4c0 3.3-2.6 5.6-5.8 5.6S3.2 18.2 3.2 14.9c0-3.2 2.5-5.6 5.7-5.6.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.1-.9-.1-1.8 0-3.2 1.4-3.2 3.1s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2V3h2.4Z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1Z" />
      <path d="M12 22c2.7 0 5-0.9 6.6-2.4l-3.2-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.5C4.8 19.8 8.1 22 12 22Z" />
      <path d="M6.4 13.1c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V6.8H3.1C2.4 8.4 2 10.1 2 12s.4 3.6 1.1 5.2l3.3-4.1Z" />
      <path d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.6l3.3 2.6C7.2 7.9 9.4 5.8 12 5.8Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M13.7 10.4 20.5 2h-2.2l-5.6 6.9L8.2 2H3l7.2 10.8L3 22h2.2l6.1-7.5L15.7 22H21L13.7 10.4Zm-2.2 2.7-.7-1.1L5.7 3.5h2.4l4.5 6.8.7 1.1 6.1 9.1h-2.4l-5.5-8.4Z" />
    </svg>
  );
}

const HERO_SOCIALS: {
  label: string;
  href: string;
  Icon: IconComponent;
}[] = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com", Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com", Icon: TikTokIcon },
  { label: "Google", href: "https://www.google.com", Icon: GoogleIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: Linkedin },
];

const FOOTER_SOCIALS: {
  label: string;
  href: string;
  Icon: IconComponent;
}[] = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: Facebook },
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", Icon: Instagram },
];

interface SocialIconsProps {
  className?: string;
}

function SocialLink({
  label,
  href,
  Icon,
  className,
}: {
  label: string;
  href: string;
  Icon: IconComponent;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full text-primary hover:text-primary", className)}
          asChild
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {HERO_SOCIALS.map((item) => (
        <SocialLink key={item.label} {...item} />
      ))}
    </div>
  );
}

export function FooterSocialIcons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {FOOTER_SOCIALS.map((item) => (
        <SocialLink key={item.label} {...item} />
      ))}
    </div>
  );
}
