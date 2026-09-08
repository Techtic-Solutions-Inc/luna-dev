import { CalendarDays, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOME_HERO_DASHBOARD_IMAGE } from './constants';

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

function SocialCircle({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#contact"
      aria-label={label}
      className={cn(
        'flex h-[44px] w-[44px] items-center justify-center rounded-full text-[#ffffff] shadow-[0_4px_16px_#0000003f] transition hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]',
        className,
      )}
    >
      {children}
    </a>
  );
}

/**
 * Frame 2147227838 — Home screen section 10/12 (Figma node 3330:1654).
 * Children: Frame 7 (background), Frame 2147227810 (hero content), Group 1 (floating cards).
 */
export function Frame2147227838Section({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-frame-2147227838 relative z-10 w-full overflow-hidden', className)}
      data-figma-node="3330:1654"
      aria-labelledby="home-hero-heading"
    >
      <div className="home-frame-7 pointer-events-none absolute inset-0" data-figma-node="Frame 7" aria-hidden="true">
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
              Stunning Real Estate
              <br />
              Marketing,
              <br />
              Personalized To Your
              <br />
              Market In Minutes
            </h1>
            <p className="home-frame-2147227838__body max-w-[480px]">
              The all-in-one marketing platform for residential real estate agents AI-personalized
              content, a custom business dashboard, and a strategic AI advisor that knows your market.
            </p>
            <div className="flex items-center gap-[12px]" aria-label="Social platforms">
              {SOCIAL_LINKS.map((social) => (
                <SocialCircle key={social.label} label={social.label} className={social.className}>
                  <span className="font-['Public_Sans'] text-[11px] font-[600]">{social.label[0]}</span>
                </SocialCircle>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] w-full overflow-hidden rounded-[16px]">
            <img
              src={HOME_HERO_DASHBOARD_IMAGE}
              alt="Agentwise dashboard preview with content calendar and Ultimate Mind"
              className="home-hero-dashboard__preview absolute top-0 h-full max-w-none object-cover"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
        data-figma-node="Group 1"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full w-full px-[var(--spacing-padding-60)]">
          <div className="relative ml-[42%] h-full w-[58%]">
            <aside className="home-frame-2147227838__floating-card absolute right-[-12px] top-[28px] w-[220px]">
              <div className="mb-[8px] flex items-center gap-[8px]">
                <CalendarDays className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
                <p className="home-frame-2147227838__floating-card-title">
                  This Week&apos;s Content Calendar
                </p>
              </div>
              <p className="home-frame-2147227838__floating-card-body">
                See what&apos;s on deck to be published this week and how your social posts are
                performing.
              </p>
            </aside>
            <aside className="home-frame-2147227838__floating-card absolute bottom-[28px] right-[-8px] w-[240px]">
              <div className="mb-[8px] flex items-center gap-[8px]">
                <Sparkles className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
                <p className="home-frame-2147227838__floating-card-title">Agentwise Ultimate Mind</p>
              </div>
              <p className="home-frame-2147227838__floating-card-body">
                Agentwise Ultimate Mind is your strategic advisor and business partner customized for
                your business - not just a generic chatbot.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
