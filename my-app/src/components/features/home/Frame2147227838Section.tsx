import { Fragment, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HeroDashboard } from './mockups/HeroDashboard';

const SOCIAL_LINKS = [
  { label: 'Facebook', className: 'bg-[#1877f2]' },
  {
    label: 'Instagram',
    className:
      'bg-[linear-gradient(180deg,#faad4f_0%,#dd2a7b_35%,#9537b0_62%,#515bd4_100%)]',
  },
  { label: 'TikTok', className: 'bg-[#1a1a1a]' },
  { label: 'Gmail', className: 'bg-[#ffffff] text-[#11161c]' },
  { label: 'LinkedIn', className: 'bg-[#007ebb]' },
] as const;

const DEFAULT_HEADLINE_LINES = [
  'Stunning Real Estate',
  'Marketing,',
  'Personalized To Your',
  'Market In Minutes',
] as const;

function SocialCircle({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} (coming soon)`}
      title={`${label} link coming soon`}
      className={cn(
        'flex h-[44px] w-[44px] cursor-not-allowed items-center justify-center rounded-full text-[#ffffff]/80 shadow-[0_4px_16px_#0000003f]',
        className,
      )}
    >
      {children}
    </button>
  );
}

function renderHeadline(headline?: string) {
  const lines = headline
    ? headline.split('\n').map((line) => line.trim()).filter(Boolean)
    : [...DEFAULT_HEADLINE_LINES];

  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export interface Frame2147227838SectionProps {
  className?: string;
  headline?: string;
  subheadline?: string;
}

/**
 * Frame 2147227838 — Home screen section 10/12 (Figma node 3330:1654).
 */
export function Frame2147227838Section({
  className,
  headline,
  subheadline,
}: Frame2147227838SectionProps) {
  return (
    <section
      className={cn('home-frame-2147227838 relative block w-full overflow-hidden', className)}
      data-figma-node="3330:1654"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="home-frame-7 pointer-events-none absolute inset-0"
        data-figma-node="Frame 7"
        aria-hidden="true"
      >
        <div className="home-frame-7__grid absolute inset-0" />
        <div className="absolute -left-[120px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#8a43e1]/35 blur-[220px]" />
        <div className="absolute left-[28%] top-[180px] h-[420px] w-[420px] rounded-full bg-[#105d39]/40 blur-[180px]" />
        <div className="absolute right-[-80px] top-[40px] h-[480px] w-[480px] rounded-full bg-[#4b92eb99]/50 blur-[200px]" />
        <div className="absolute left-[40%] top-[80px] h-[360px] w-[360px] rounded-full bg-[#c8a47e]/25 blur-[180px]" />
        <div className="absolute bottom-[80px] left-[10%] h-[280px] w-[280px] rounded-full bg-[#8b6842]/30 blur-[160px]" />
      </div>

      <div
        className="relative z-10 px-[var(--spacing-padding-60)] pb-[60px] pt-[20px]"
        data-figma-node="Frame 2147227810"
      >
        <div className="relative mx-auto grid w-full items-center gap-[40px] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div className="flex max-w-[560px] flex-col gap-[20px]">
            <h1 id="home-hero-heading" className="home-frame-2147227838__heading">
              {renderHeadline(headline)}
            </h1>
            <p className="home-frame-2147227838__body max-w-[480px]">
              {subheadline ??
                'The all-in-one marketing platform for residential real estate agents AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.'}
            </p>
            <div className="flex items-center gap-[12px]" aria-label="Social platforms">
              {SOCIAL_LINKS.map((social) => (
                <SocialCircle key={social.label} label={social.label} className={social.className}>
                  <span className="font-['Public_Sans'] text-[11px] font-[600]">
                    {social.label[0]}
                  </span>
                </SocialCircle>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] w-full" data-figma-node="Group 1">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
