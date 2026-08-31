import { ArrowLeft, ArrowRight, CalendarDays, Plus, Search, Sparkles, X } from 'lucide-react';
import {
  AppSidebar,
  MockWindow,
  PHOTOS,
  visitorFontAlmarai,
  visitorFontEbGaramond,
  visitorFontPublicSans,
  visitorFontSpaceGrotesk,
} from '@/components/features/visitor-home/chrome';
import { cn } from '@/lib/utils';

const WEEK_CARDS = [
  { day: 'MON', type: 'Reels', src: PHOTOS.city, alt: 'City street content' },
  { day: 'TUE', type: 'Reels', src: PHOTOS.coffee, alt: 'Lifestyle drinks content' },
  { day: 'WED', type: 'Story', src: PHOTOS.desk, alt: 'Workspace content' },
  { day: 'THU', type: 'Reels', src: PHOTOS.cityAlt, alt: 'Neighborhood content' },
  { day: 'FRI', type: 'Story', src: PHOTOS.coffeeAlt, alt: 'Coffee table content' },
] as const;

const LIBRARY_CARDS = [
  { src: PHOTOS.city, alt: 'City street template' },
  { src: PHOTOS.coffee, alt: 'Lifestyle drinks template' },
  { src: PHOTOS.desk, alt: 'Workspace template' },
  { src: PHOTOS.cityAlt, alt: 'Neighborhood template' },
  { src: PHOTOS.coffeeAlt, alt: 'Coffee table template' },
  { src: PHOTOS.deskAlt, alt: 'Desk flat-lay template' },
] as const;

const MIND_PROMPTS = [
  'What should I post this week to stand out in Austin?',
  'Draft a positioning statement for my luxury buyer niche.',
  'How do I price the new Travis Heights listing?',
  'Build me a 30-day content plan around relocations.',
] as const;

export function HeroDashboard({ className }: { className?: string }) {
  return (
    <MockWindow className={cn('relative min-h-[520px]', className)}>
      <div className="flex min-h-[520px]">
        <AppSidebar active="Overview" />
        <div className="flex min-w-0 flex-1 flex-col gap-[14px] bg-[#11161c] p-[18px]">
          <h2
            className="typo-garamond text-[26px] font-medium leading-[34px] text-white"
            style={{ fontFamily: visitorFontEbGaramond }}
          >
            Good Morning, Ava.
          </h2>
          <div className="grid gap-[12px] desktop:grid-cols-[minmax(0,1fr)_180px]">
            <div className="rounded-[16px] bg-[#1c1916] p-[18px]">
              <p className="typo-garamond text-[18px] font-medium leading-[24px] text-[#c8a47e]">
                Your week&apos;s listing content, Reels, and email blasts — planned in your brand
                voice.
              </p>
              <p
                className="mt-[8px] typo-almarai text-[12px] leading-[18px] text-white/60"
                style={{ fontFamily: visitorFontAlmarai }}
              >
                Generate on-brand listing copy, Reels scripts, and email blasts without leaving your
                dashboard.
              </p>
              <div className="mt-[14px] flex h-[40px] items-center gap-[8px] rounded-[12px] border border-white/10 bg-[#1d1a1a] px-[14px]">
                <Search className="h-[14px] w-[14px] text-white/50" aria-hidden="true" />
                <span className="truncate typo-almarai text-[12px] text-white/50">
                  Generate captions, listing descriptions, email blasts, and Reels scripts in your
                  brand voice.
                </span>
              </div>
              <div className="mt-[14px] flex flex-wrap gap-[10px]">
                <div
                  className="typo-public inline-flex h-[36px] items-center gap-[8px] rounded-[100px] bg-[#c8a47e] px-[16px] text-[13px] font-semibold text-[#11161c]"
                  style={{
                    backgroundColor: '#c8a47e',
                    color: '#11161c',
                    fontFamily: visitorFontPublicSans,
                  }}
                >
                  <Sparkles className="h-[14px] w-[14px]" aria-hidden="true" />
                  Plan My Week
                </div>
                <div className="inline-flex h-[36px] items-center gap-[8px] rounded-[100px] border border-white/40 bg-transparent px-[16px] typo-almarai text-[13px] text-white">
                  <CalendarDays className="h-[14px] w-[14px]" aria-hidden="true" />
                  My Content Calendar
                </div>
              </div>
            </div>
            <div className="hidden flex-col gap-[8px] desktop:flex">
              <p className="typo-almarai text-[11px] text-white/60">Announcements</p>
              <img
                src={PHOTOS.city}
                alt="Announcement listing"
                className="h-[168px] w-full rounded-[12px] object-cover"
              />
            </div>
          </div>
          <div>
            <div className="mb-[10px] flex items-center justify-between">
              <p
                className="typo-garamond text-[16px] font-medium text-white"
                style={{ fontFamily: visitorFontEbGaramond }}
              >
                New Content This Week
              </p>
              <span
                className="typo-grotesk text-[12px] text-[#c8a47e]"
                style={{ fontFamily: visitorFontSpaceGrotesk }}
              >
                Browse all
              </span>
            </div>
            <div className="flex gap-[10px] overflow-hidden">
              {WEEK_CARDS.map((card) => (
                <article key={card.day} className="w-[108px] shrink-0">
                  <p className="typo-almarai text-[10px] uppercase tracking-[0.08em] text-white/50">
                    {card.day} · {card.type}
                  </p>
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="mt-[6px] h-[92px] w-full rounded-[10px] object-cover"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <aside className="pointer-events-none absolute right-[-12px] top-[28px] hidden w-[220px] rounded-[16px] bg-[#2f271f] p-[14px] text-white shadow-[0_4px_34px_#c8a47e33] desktop:block">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <CalendarDays className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
          <p className="typo-garamond text-[16px] font-medium">This Week&apos;s Content Calendar</p>
        </div>
        <p className="typo-almarai text-[12px] leading-[18px] text-white/70">
          See what&apos;s on deck to be published this week and how your social posts are
          performing.
        </p>
      </aside>
      <aside className="pointer-events-none absolute bottom-[28px] right-[-8px] hidden w-[240px] rounded-[16px] bg-[#2f271f] p-[14px] text-white shadow-[0_4px_34px_#c8a47e33] desktop:block">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <Sparkles className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
          <p className="typo-garamond text-[16px] font-medium">Agentwise Ultimate Mind</p>
        </div>
        <p className="typo-almarai text-[12px] leading-[18px] text-white/70">
          Agentwise Ultimate Mind is your strategic advisor and business partner customized for your
          business - not just a generic chatbot.
        </p>
      </aside>
    </MockWindow>
  );
}

export function LibraryDashboard({ className }: { className?: string }) {
  return (
    <MockWindow className={cn('min-h-[420px]', className)}>
      <div className="flex min-h-[420px]">
        <AppSidebar active="Content Library" />
        <div className="min-w-0 flex-1 bg-[#11161c] p-[18px]">
          <div className="mb-[14px] flex items-start justify-between gap-[12px]">
            <div>
              <h3 className="typo-garamond text-[22px] font-medium text-white">
                The Complete Agentwise Content Library
              </h3>
              <p className="mt-[4px] max-w-[360px] typo-almarai text-[12px] leading-[18px] text-white/55">
                Explore hundreds of hand-designed templates for social, email, and more.
              </p>
            </div>
            <div className="flex h-[36px] w-[160px] items-center gap-[8px] rounded-[12px] border border-white/15 bg-[#1d1a1a] px-[12px]">
              <Search className="h-[14px] w-[14px] text-white/50" aria-hidden="true" />
              <span className="typo-almarai text-[12px] text-white/50">Search</span>
            </div>
          </div>
          <div className="mb-[12px] flex items-center justify-between">
            <p className="typo-almarai text-[12px] text-white/50">452 Results</p>
            <div className="flex gap-[8px]">
              <span className="rounded-[100px] border border-white/15 px-[10px] py-[4px] typo-almarai text-[11px] text-white/80">
                Instagram Reel
              </span>
              <span className="rounded-[100px] border border-white/15 px-[10px] py-[4px] typo-almarai text-[11px] text-white/80">
                Sort by newest
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[10px]">
            {LIBRARY_CARDS.map((card) => (
              <img
                key={card.alt}
                src={card.src}
                alt={card.alt}
                className="h-[140px] w-full rounded-[12px] object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function UltimateMindDashboard({
  className,
  sidebar = 'dark',
}: {
  className?: string;
  sidebar?: 'dark' | 'light';
}) {
  return (
    <MockWindow className={cn('min-h-[420px]', className)}>
      <div className="flex min-h-[420px]">
        <AppSidebar active="Ultimate Mind" variant={sidebar} />
        <div className="flex min-w-0 flex-1 flex-col items-center bg-white px-[24px] py-[28px] text-center">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#c8a47e] typo-kalam text-[22px] text-white">
            a
          </span>
          <h3 className="mt-[12px] typo-garamond text-[24px] font-medium text-[#1a1a1a]">
            Agentwise Ultimate Mind
          </h3>
          <p className="mt-[6px] max-w-[420px] typo-almarai text-[13px] leading-[20px] text-[#666666]">
            Your strategic advisor — trained on your business, your market, and your voice. Ask
            anything.
          </p>
          <div className="mt-[18px] flex h-[48px] w-full max-w-[520px] items-center gap-[10px] rounded-[100px] border border-[#eaeaea] bg-white px-[16px] shadow-[0_4px_40px_#00000019]">
            <Plus className="h-[16px] w-[16px] text-[#828282]" aria-hidden="true" />
            <span className="flex-1 text-left typo-almarai text-[13px] text-[#828282]">
              Ask the Mind anything about your business...
            </span>
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#c8a47e] text-white">
              <Sparkles className="h-[14px] w-[14px]" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-[16px] grid w-full max-w-[520px] grid-cols-1 gap-[10px] tablet:grid-cols-2">
            {MIND_PROMPTS.map((prompt) => (
              <div
                key={prompt}
                className="rounded-[12px] bg-[#efe4d9] p-[12px] text-left typo-almarai text-[12px] leading-[18px] text-[#1a1a1a]"
              >
                <Sparkles
                  className="mb-[6px] h-[12px] w-[12px] text-[#c8a47e]"
                  aria-hidden="true"
                />
                {prompt}
              </div>
            ))}
          </div>
          <p className="mt-auto pt-[16px] typo-almarai text-[11px] text-[#828282]">
            Trained on your business data · Austin, TX dataset active
          </p>
        </div>
      </div>
    </MockWindow>
  );
}

export function ContentDetailDashboard({ className }: { className?: string }) {
  return (
    <MockWindow className={cn('relative min-h-[460px]', className)}>
      <div className="flex min-h-[460px]">
        <AppSidebar active="Content Library" />
        <div className="min-w-0 flex-1 bg-[#11161c] p-[18px]">
          <h3 className="typo-garamond text-[22px] font-medium text-white">
            The Complete Agentwise Content Library
          </h3>
          <div className="mt-[14px] grid grid-cols-2 gap-[10px] opacity-50">
            {LIBRARY_CARDS.slice(0, 4).map((card) => (
              <img
                key={card.alt}
                src={card.src}
                alt=""
                className="h-[120px] w-full rounded-[12px] object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-[18px] right-[18px] w-[min(320px,46%)] overflow-hidden rounded-[16px] bg-[#f7f2ec] p-[14px] shadow-[0_34px_44px_#00000072]">
        <div className="flex items-start justify-between">
          <div>
            <p className="typo-garamond text-[16px] font-semibold text-[#1a1a1a]">
              Market update — Austin Q2
            </p>
            <p className="typo-almarai text-[11px] text-[#666666]">Instagram Reel</p>
          </div>
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white text-[#1a1a1a]">
            <X className="h-[12px] w-[12px]" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-[10px] flex flex-wrap gap-[6px]">
          <span className="rounded-[100px] bg-[#1a1a1a] px-[10px] py-[4px] typo-almarai text-[10px] text-white">
            Customize
          </span>
          <span className="rounded-[100px] bg-[#c8a47e] px-[10px] py-[4px] typo-almarai text-[10px] text-[#11161c]">
            Copy Caption
          </span>
          <span className="rounded-[100px] border border-[#1a1a1a] px-[10px] py-[4px] typo-almarai text-[10px] text-[#1a1a1a]">
            Download
          </span>
        </div>
        <div className="relative mt-[12px]">
          <div className="absolute left-[-6px] top-1/2 z-10 flex h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm">
            <ArrowLeft className="h-[12px] w-[12px]" aria-hidden="true" />
          </div>
          <img
            src={PHOTOS.city}
            alt="Market update template preview"
            className="mx-auto h-[160px] w-[110px] rounded-[12px] object-cover"
          />
          <div className="absolute right-[-6px] top-1/2 z-10 flex h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm">
            <ArrowRight className="h-[12px] w-[12px]" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-[12px] typo-garamond text-[14px] font-medium text-[#1a1a1a]">
          About This Template
        </p>
        <p className="mt-[4px] typo-almarai text-[11px] leading-[16px] text-[#666666]">
          A ready-to-post market update reel personalized to your city, your brand, and this
          quarter&apos;s numbers.
        </p>
        <div className="mt-[10px] rounded-[12px] bg-[#1a1a1a] p-[10px]">
          <div className="mb-[6px] flex items-center justify-between">
            <p className="typo-almarai text-[10px] text-white/70">Caption</p>
            <span className="rounded-[100px] bg-[#c8a47e] px-[8px] py-[2px] typo-almarai text-[10px] text-[#11161c]">
              Copy Caption
            </span>
          </div>
          <p className="typo-almarai text-[10px] leading-[14px] text-white/80">
            Austin moved this quarter — and buyers who wait are watching inventory tighten.
          </p>
        </div>
      </div>
    </MockWindow>
  );
}
