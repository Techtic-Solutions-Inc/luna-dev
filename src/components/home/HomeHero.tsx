import type { ReactNode } from 'react';
import { Button } from '../ui/Button';

interface HomeHeroProps {
  headline?: string;
  subcopy?: string;
}

function SocialIcon({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-ink text-color-101 hover:brightness-90 active:brightness-75"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function HomeHero({ headline, subcopy }: HomeHeroProps) {
  const title =
    headline ?? 'Stunning Real Estate Marketing, Personalized To Your Market In Minutes';
  const body =
    subcopy ??
    'The all-in-one marketing platform for residential real estate agents AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.';

  return (
    <section className="hero-glow px-[20px] pb-[60px] pt-[40px] md:px-[40px] lg:px-[80px]">
      <div className="mx-auto grid max-w-[1760px] items-center gap-[40px] lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <h1 className="max-w-[640px] font-garamond text-[32px] font-medium leading-[1.305] text-ink md:text-[50px] md:leading-[65.25px]">
            {title}
          </h1>
          <p className="type-body-34 mt-[20px] max-w-[560px] text-ink">{body}</p>
          <div className="mt-[24px] flex flex-wrap items-center gap-[12px]" aria-label="Social">
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
                  fill="var(--color-101)"
                  d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.2 6.5a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="TikTok" href="https://www.tiktok.com">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
                <path
                  fill="var(--color-101)"
                  d="M14.5 3c.4 2.6 1.8 4.2 4.5 4.5v2.6c-1.5 0-2.9-.4-4.2-1.2v6.6A5.5 5.5 0 1 1 9 9.9v2.7a2.8 2.8 0 1 0 2.8 2.8V3h2.7z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="Gmail" href="https://mail.google.com">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
                <path fill="var(--color-116)" d="M3 6.5 12 13l9-6.5V18H3z" />
                <path fill="var(--color-114)" d="M21 6.5 12 13 3 6.5 12 3z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn" href="https://www.linkedin.com">
              <span className="font-grotesk text-[11px] font-bold text-color-120">in</span>
            </SocialIcon>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/home.png"
            alt="Agentwise dashboard"
            className="h-auto w-full max-w-full rounded-16 object-contain"
          />
        </div>
      </div>
      <div className="mx-auto mt-[60px] max-w-[800px] text-center">
        <p className="type-body-3 text-ink">
          Join <span className="type-body-17 text-accent">Hundreds</span> of other agents on the
          waitlist for Agentwise
        </p>
        <Button to="/signup" variant="primary" className="mt-[20px] min-w-[180px]">
          Get Started
        </Button>
      </div>
    </section>
  );
}
