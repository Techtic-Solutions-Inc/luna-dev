import type { ReactNode } from 'react';

interface SocialIconProps {
  label: string;
  href: string;
  children: ReactNode;
}

export function SocialIcon({ label, href, children }: SocialIconProps) {
  return (
    <a
      href={href}
      className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[100px] bg-ink text-color-101 hover:brightness-90 active:brightness-75"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function SocialRow() {
  return (
    <nav className="mt-[24px] flex flex-wrap items-center gap-[12px]" aria-label="Social">
      <SocialIcon label="Facebook" href="https://www.facebook.com">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
          <path
            fill="var(--color-114)"
            d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.2C12.4 3 11 4.5 11 6.7v1.8H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z"
          />
        </svg>
      </SocialIcon>
      <SocialIcon label="Instagram" href="https://www.instagram.com">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
          <path
            fill="var(--color-110)"
            d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4.6-2.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
          />
        </svg>
      </SocialIcon>
      <SocialIcon label="TikTok" href="https://www.tiktok.com">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
          <path
            fill="var(--color-101)"
            d="M14.2 3c.4 2.4 1.8 4 4.3 4.2v2.5c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.4-2.6 5.7-5.8 5.7S3 18.4 3 15.2c0-3.3 2.6-5.6 5.7-5.6.4 0 .8 0 1.2.1v2.6c-.4-.1-.8-.2-1.2-.2-1.8 0-3.1 1.3-3.1 3.1S7 18.4 8.8 18.4s3.1-1.2 3.1-3.2V3h2.3z"
          />
        </svg>
      </SocialIcon>
      <SocialIcon label="Gmail" href="https://mail.google.com">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
          <path fill="var(--color-116)" d="M3 6.5 12 13l9-6.5V18H3z" />
          <path fill="var(--color-114)" d="M3 6.5 12 13 3 18z" />
          <path fill="var(--color-115)" d="M21 6.5 12 13l9 5z" />
          <path fill="var(--color-117)" d="M3 6.5 12 3l9 3.5L12 13z" />
        </svg>
      </SocialIcon>
      <SocialIcon label="LinkedIn" href="https://www.linkedin.com">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
          <path
            fill="var(--color-120)"
            d="M6.5 9.5H4V20h2.5zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.4c0-1.5-.5-2.5-1.8-2.5s-2 1-2 2.5V20H11V9.5h2.4v1.4h.1c.5-.9 1.6-1.8 3.3-1.8 2.4 0 4.2 1.6 4.2 5z"
          />
        </svg>
      </SocialIcon>
    </nav>
  );
}
