import type { ReactNode, SVGProps } from 'react';
import { cn } from '@/lib/cn';

type IconProps = SVGProps<SVGSVGElement>;

function CircleIcon({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('h-9 w-9', className)} aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <CircleIcon {...props}>
      <circle cx="16" cy="16" r="16" fill="#1877f2" />
      <path fill="#fff" d="M18.2 16.7h2.3l.4-2.6h-2.7v-1.4c0-.8.2-1.3 1.4-1.3h1.4V9.1c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v1.5h-2.3v2.6h2.3V23h2.8v-6.3z" />
    </CircleIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <CircleIcon {...props}>
      <defs>
        <radialGradient id="ig" cx="30%" cy="110%" r="120%">
          <stop offset="0%" stopColor="#fbbc04" />
          <stop offset="45%" stopColor="#ff004f" />
          <stop offset="100%" stopColor="#8a43e1" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill="url(#ig)" />
      <rect x="9" y="9" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="20.6" cy="11.4" r="1" fill="#fff" />
    </CircleIcon>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <CircleIcon {...props}>
      <circle cx="16" cy="16" r="16" fill="#11161c" />
      <circle cx="16" cy="16" r="15.2" fill="none" stroke="#d8d8d8" strokeWidth="0.6" />
      <path fill="#00f7ef" d="M19.4 10.2c.5 1.5 1.6 2.6 3.1 3v2.1c-.9 0-1.8-.3-2.6-.7v5.3c0 2.6-2.1 4.6-4.8 4.6S10.4 22.5 10.4 20s2.1-4.6 4.7-4.6c.3 0 .5 0 .8.1v2.3c-.2-.1-.5-.1-.8-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V10.2h1.9z" />
      <path fill="#ff004f" d="M18.8 9.6c.5 1.5 1.6 2.6 3.1 3v2.1c-.9 0-1.8-.3-2.6-.7v5.3c0 2.6-2.1 4.6-4.8 4.6S9.8 21.9 9.8 19.4s2.1-4.6 4.7-4.6c.3 0 .5 0 .8.1v2.3c-.2-.1-.5-.1-.8-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V9.6h1.9z" opacity=".85" />
      <path fill="#fff" d="M19.1 9.9c.5 1.5 1.6 2.6 3.1 3v2.1c-.9 0-1.8-.3-2.6-.7v5.3c0 2.6-2.1 4.6-4.8 4.6S10.1 22.2 10.1 19.7s2.1-4.6 4.7-4.6c.3 0 .5 0 .8.1v2.3c-.2-.1-.5-.1-.8-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V9.9h1.9z" />
    </CircleIcon>
  );
}

export function GmailIcon(props: IconProps) {
  return (
    <CircleIcon {...props}>
      <circle cx="16" cy="16" r="16" fill="#ffffff" />
      <path fill="#ea4335" d="M8 12.2 16 18l8-5.8V22H8z" />
      <path fill="#4285f4" d="M24 12.2 16 18l-1.2-.9V22H24z" />
      <path fill="#34a853" d="M8 12.2 9.2 17 8 22z" />
      <path fill="#c5221f" d="M8 10h.8L16 16l7.2-6H24l-8 6.6L8 10z" />
      <path fill="#fbbc04" d="M8 10v2.2L16 18l8-5.8V10l-8 6.2z" opacity=".35" />
    </CircleIcon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <CircleIcon {...props}>
      <circle cx="16" cy="16" r="16" fill="#007ebb" />
      <path fill="#fff" d="M12.1 13.3H9.6V22h2.5v-8.7zm-.1-2.6c0-.8-.6-1.4-1.5-1.4s-1.5.6-1.5 1.4.6 1.4 1.5 1.4 1.5-.6 1.5-1.4zM22.4 17.2c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.6 1.4V13.3h-2.5c0 1.1 0 8.7 0 8.7h2.5v-4.9c0-.3 0-.5.1-.7.2-.5.7-1.1 1.6-1.1 1.1 0 1.6.9 1.6 2.1V22h2.6v-4.8z" />
    </CircleIcon>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn('h-5 w-5', props.className)} aria-hidden="true" fill="currentColor">
      <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.9-6.4L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'TikTok', href: 'https://tiktok.com', Icon: TikTokIcon },
  { label: 'Gmail', href: 'mailto:hello@agentwisemarketing.com', Icon: GmailIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedInIcon },
] as const;

export function SocialIconRow({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            className="inline-flex rounded-full transition hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
