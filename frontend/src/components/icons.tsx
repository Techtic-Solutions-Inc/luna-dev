import { useId, type SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Base({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </Base>
  );
}

export function LibraryIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 6h2" />
      <path d="M10 18h4" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </Base>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 3 6 13h6l-1 8 7-10h-6z" />
    </Base>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10v4h3l8 4V6L7 10H4z" />
      <path d="M19 10.5v3" />
    </Base>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 4 2.2 4.6L19 9.3l-3.5 3.4.8 4.8L12 15.8 7.7 17.5l.8-4.8L5 9.3l4.8-.7z" />
    </Base>
  );
}

export function CardIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </Base>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4" />
      <path d="m15 16 4-4-4-4" />
      <path d="M19 12H10" />
    </Base>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m15 6-6 6 6 6" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </Base>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 3l18 18" />
      <path d="M9.9 9.9A2.5 2.5 0 0 0 12 14.5c.4 0 .8-.1 1.1-.3" />
      <path d="M6.1 6.3C4 7.8 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.7 0 3.2-.4 4.5-1" />
      <path d="M10.7 5.6C11.1 5.5 11.6 5.5 12 5.5c6 0 9.5 6.5 9.5 6.5s-.7 1.3-2 2.6" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m7 7 10 10M17 7 7 17" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20h4.2L18.5 9.7l-4.2-4.2L4 15.8V20z" />
      <path d="m14.3 5.5 4.2 4.2" />
    </Base>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.4" />
      <path d="m20 16-4.5-4.5L8 19" />
    </Base>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M6 16V6a2 2 0 0 1 2-2h10" />
    </Base>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4v11" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19h14" />
    </Base>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </Base>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h16M4 16h16" />
      <circle cx="9" cy="8" r="2" fill="currentColor" />
      <circle cx="15" cy="16" r="2" fill="currentColor" />
    </Base>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Base>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Base>
  );
}

export function CheckFileIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="m9.5 14.5 1.8 1.8 3.7-3.8" />
    </Base>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className}
      aria-hidden="true"
      fill="#1877F2"
    >
      <path d="M14.5 8.5V6.8c0-.6.4-1 1-1h1.3V3.5h-2.2c-2.2 0-3.6 1.4-3.6 3.6v1.4H9.2v2.3h1.8V20h2.5v-9.2h2.2l.3-2.3z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="20" x2="20" y2="4">
          <stop stopColor="#F58529" />
          <stop offset="0.5" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3.4"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
      />
      <circle cx="16.4" cy="7.6" r="0.9" fill="#DD2A7B" />
    </svg>
  );
}
