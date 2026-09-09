import { CalendarDays, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from './AppSidebar';
import { MockWindow } from './MockWindow';

const WEEK_CARD_IMAGES = [
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
    tag: 'Reels',
    alt: 'City street content',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
    tag: 'Story',
    alt: 'Lifestyle drinks content',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
    tag: 'Reels',
    alt: 'Modern patio content',
  },
] as const;

export function HeroDashboard({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full', className)}>
      <MockWindow className="relative min-h-[520px]">
        <div className="flex min-h-[520px]">
          <AppSidebar active="Overview" />
          <div className="flex min-w-0 flex-1 flex-col p-[20px]">
            <p className="font-['EB_Garamond'] text-[22px] font-[500] text-[#ffffff]">
              Good Morning, Ava.
            </p>
            <p className="mt-[8px] font-['Almarai'] text-[13px] leading-[20px] text-[#ffffff]/50">
              We&apos;ve created a new collection of homes and marketing materials specifically for
              your market. Check them out below.
            </p>
            <div className="mt-[16px] flex items-center gap-[8px] rounded-[100px] border border-[#ffffff]/10 bg-[#ffffff]/5 px-[16px] py-[10px]">
              <Search className="h-4 w-4 shrink-0 text-[#ffffff]/40" aria-hidden="true" />
              <span className="font-['Almarai'] text-[12px] text-[#ffffff]/40">
                Generate captions, listing descriptions, email blasts, and Reels scripts in your brand
                voice.
              </span>
            </div>
            <div className="mt-[16px] flex flex-wrap gap-[10px]" aria-hidden="true">
              <span className="rounded-[100px] bg-[#c8a47e] px-[16px] py-[8px] font-['Public_Sans'] text-[12px] font-[600] text-[#11161c]">
                Plan My Week
              </span>
              <span className="rounded-[100px] border border-[#ffffff]/20 px-[16px] py-[8px] font-['Public_Sans'] text-[12px] font-[600] text-[#ffffff]">
                My Content Calendar
              </span>
            </div>
            <p className="mt-[20px] font-['Public_Sans'] text-[13px] font-[600] text-[#ffffff]">
              New Content This Week
            </p>
            <div className="mt-[10px] flex gap-[10px] overflow-x-auto">
              {WEEK_CARD_IMAGES.map((card) => (
                <div key={card.src} className="relative h-[100px] w-[72px] shrink-0 overflow-hidden rounded-[8px]">
                  <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
                  <span className="absolute bottom-[4px] left-[4px] rounded-[4px] bg-[#000000]/60 px-[4px] py-[1px] font-['Almarai'] text-[9px] text-[#ffffff]">
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MockWindow>

      <aside className="home-frame-2147227838__floating-card pointer-events-none absolute right-[-12px] top-[28px] hidden w-[220px] lg:block">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <CalendarDays className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
          <p className="home-frame-2147227838__floating-card-title">This Week&apos;s Content Calendar</p>
        </div>
        <p className="home-frame-2147227838__floating-card-body">
          See what&apos;s on deck to be published this week and how your social posts are performing.
        </p>
      </aside>
      <aside className="home-frame-2147227838__floating-card pointer-events-none absolute bottom-[28px] right-[-8px] hidden w-[240px] lg:block">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <Sparkles className="h-[16px] w-[16px] text-[#c8a47e]" aria-hidden="true" />
          <p className="home-frame-2147227838__floating-card-title">Agentwise Ultimate Mind</p>
        </div>
        <p className="home-frame-2147227838__floating-card-body">
          Agentwise Ultimate Mind is your strategic advisor and business partner customized for your
          business — not just a generic chatbot.
        </p>
      </aside>
    </div>
  );
}
