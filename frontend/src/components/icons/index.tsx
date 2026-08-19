import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function MenuIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OverviewIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  );
}

export function ContentLibraryIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M2.5 3.5h11v9h-11z" />
      <path d="M5 6.5h6M5 9h4" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5.5 1.5v2M10.5 1.5v2" strokeLinecap="round" />
    </svg>
  );
}

export function UltimateMindIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M8 2.5c-2 0-3.5 1.5-3.5 3.5S6 9.5 8 11s3.5-1.5 3.5-3.5S10 2.5 8 2.5z" />
      <path d="M4.5 8h7M8 4.5v7" strokeLinecap="round" />
    </svg>
  );
}

export function AnnouncementsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M3 7.5h1.5l2.5-2v7l-2.5-2H3z" />
      <path d="M9.5 5.5c1.2.8 2 2.2 2 3.5s-.8 2.7-2 3.5" strokeLinecap="round" />
    </svg>
  );
}

export function NewFeaturesIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M8 2.5l1.2 3.8h4l-3.2 2.4 1.2 3.8L8 10.1l-3.2 2.4 1.2-3.8-3.2-2.4h4z" />
    </svg>
  );
}

export function SubscriptionIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="2" y="4" width="12" height="8" rx="1.5" />
      <path d="M2 7h12" />
    </svg>
  );
}

export function LogoutIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M6 2.5H3.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1H6" />
      <path d="M10.5 5.5L13.5 8l-3 2.5M6 8h7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} {...props}>
      <path d="M9.5 8.5H11l-.5-2H9.5V5.5c0-.6.2-1 1-1H11V2.5h-1.5C7.8 2.5 7 3.6 7 5v1.5H5.5V8.5H7v5h2.5v-5z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="3" />
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="11.5" cy="4.5" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="5" y="5" width="8" height="8" rx="1.5" />
      <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M8 2.5v7M5.5 7 8 9.5 10.5 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 11.5h10" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.3 3.3l1.1 1.1M11.6 11.6l1.1 1.1M3.3 12.7l1.1-1.1M11.6 4.4l1.1-1.1" strokeLinecap="round" />
    </svg>
  );
}

export function PencilIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M10.5 2.5l3 3-7 7H3.5v-3l7-7z" strokeLinejoin="round" />
    </svg>
  );
}

export function DocumentIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M4.5 2.5h4.5L12 5v8.5H4.5z" />
      <path d="M9 2.5V5h2.5" />
    </svg>
  );
}

export function ChevronDownIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImagePlaceholderIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M21 15l-5-5-4 4-2-2-5 5" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M14 14l3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

export function SparklesIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M8 1.5l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" strokeLinejoin="round" />
      <path d="M13 9.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalLinkIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M6.5 3.5H3.5v9h9V9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.5h3.5V7M12.5 3.5 7 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MegaphoneIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M3 6.5h2l3-2v7l-3-2H3z" />
      <path d="M9.5 5c1 .7 1.7 1.9 1.7 3s-.7 2.3-1.7 3" strokeLinecap="round" />
      <path d="M11.5 11.5c1.2-.8 2-2.2 2-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M2.5 3.5h4.5a1.5 1.5 0 0 1 1.5 1.5V13H4a1.5 1.5 0 0 0-1.5 1.5V5a1.5 1.5 0 0 1 1.5-1.5z" />
      <path d="M13.5 3.5H9a1.5 1.5 0 0 0-1.5 1.5V13h4.5a1.5 1.5 0 0 0 1.5-1.5V5a1.5 1.5 0 0 0-1.5-1.5z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} {...props}>
      <path d="M3 8h10M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
