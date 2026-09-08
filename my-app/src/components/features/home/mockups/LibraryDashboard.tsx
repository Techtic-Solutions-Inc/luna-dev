import { cn } from '@/lib/utils';
import { MARKETING_GALLERY_IMAGES } from '../constants';
import { AppSidebar } from './AppSidebar';
import { MockWindow } from './MockWindow';

const LIBRARY_CARD_META = [
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    tag: 'Instagram Reel',
  },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    tag: 'Instagram Reel',
  },
  {
    title: "If I was moving to [City Name], here's where I'd visit first (as a local)",
    tag: 'Instagram Reel',
  },
  {
    title: "Phone's busy, I'm doing the best I ever have",
    tag: 'Instagram Story',
  },
  {
    title: 'Doing showings in [insert neighborhood and city]!',
    tag: 'Instagram Reel',
  },
  {
    title: "here's what I'm working on today",
    tag: 'Instagram Feed',
  },
] as const;

function LibraryTemplateCard({
  src,
  alt,
  title,
  tag,
}: {
  src: string;
  alt: string;
  title: string;
  tag: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[4px] border border-[#c8a47e]/5 bg-[#ffffff]/5">
      <img
        src={src}
        alt={alt}
        className="h-[140px] w-full rounded-[4px] object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-[6px] left-[6px] right-[6px] rounded-[2px] bg-[#ffffff] p-[4px] shadow-[0_1px_2px_#00000014]">
        <p className="font-['Almarai'] text-[6.8px] font-[400] leading-[7.6px] text-[#000000]">
          {title}
        </p>
        <span className="mt-[2px] inline-flex rounded-[29511px] border border-[#c8a47e]/20 bg-[#c8a47e]/10 px-[4px] py-[1px] font-['Almarai'] text-[4.86px] font-[300] leading-[5.4px] text-[#000000]">
          {tag}
        </span>
      </div>
    </article>
  );
}

export function LibraryDashboard({ className }: { className?: string }) {
  const cards = MARKETING_GALLERY_IMAGES.slice(0, 6);

  return (
    <MockWindow className={cn('min-h-[420px]', className)}>
      <div className="flex min-h-[420px]">
        <AppSidebar active="Content Library" />
        <div className="min-w-0 flex-1 p-[18px]">
          <h3 className="font-['EB_Garamond'] text-[14.58px] font-[500] leading-[19.03px] text-[#ffffff]">
            The Complete Agentwise Content Library
          </h3>
          <p className="mt-[4px] max-w-[360px] font-['Almarai'] text-[7.78px] font-[400] leading-[8.68px] text-[#ffffff]">
            Professional, studio-level content curated for your business - designed to engage,
            convert, and save you time and energy. All at the click of a button.
          </p>
          <input
            type="search"
            readOnly
            disabled
            aria-label="Search templates"
            placeholder="Search templates..."
            className="mt-[14px] flex h-[36px] w-full max-w-[200px] cursor-default items-center rounded-[12px] border border-[#ffffff]/15 bg-[#1d1a1a] px-[12px] font-['Almarai'] text-[12px] text-[#ffffff]/50"
          />
          <div className="mt-[12px] grid grid-cols-2 gap-[8px] md:grid-cols-3">
            {cards.map((card, index) => {
              const meta = LIBRARY_CARD_META[index] ?? LIBRARY_CARD_META[0];
              return (
                <LibraryTemplateCard
                  key={card.src}
                  src={card.src}
                  alt={card.alt}
                  title={card.overlay ?? meta.title}
                  tag={meta.tag}
                />
              );
            })}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
