import type { ContentCalendarEntry } from '@/types/api';
import { ChevronLeftIcon, ChevronRightIcon, ImagePlaceholderIcon } from '@/components/icons';
import { CopyCaptionButton } from '@/components/content-calendar/CopyCaptionButton';
import { CustomizeButton } from '@/components/content-calendar/CustomizeButton';
import { DownloadButton } from '@/components/content-calendar/DownloadButton';
import { getImageUrl } from '@/utils/calendar';

const CONTENT_USAGE_BULLETS = [
  'Help real estate professionals create content faster with ready-made templates.',
  'Increase audience engagement through visually appealing social media posts.',
  'Position yourself as a trusted source of market knowledge and insights.',
] as const;

interface ContentDetailPanelProps {
  entry: ContentCalendarEntry;
  entries: ContentCalendarEntry[];
  onCustomize: () => void;
  onNavigate: (entryId: string) => void;
}

export function ContentDetailPanel({
  entry,
  entries,
  onCustomize,
  onNavigate,
}: ContentDetailPanelProps) {
  const caption = entry.content || entry.description;
  const imageUrl = getImageUrl(entry.link);
  const currentIndex = entries.findIndex((item) => item.id === entry.id);
  const hasMultiple = entries.length > 1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(entries[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < entries.length - 1) {
      onNavigate(entries[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <CustomizeButton onClick={onCustomize} />
        <CopyCaptionButton content={caption} />
        <DownloadButton link={entry.link} />
      </div>

      <div className="relative rounded-[16px] bg-[#EFE4D9] px-4 py-6">
        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex <= 0}
              aria-label="Previous scheduled post"
              className="focus-ring absolute left-2 top-1/2 z-[1] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#322722]/10 text-[#322722] transition-colors hover:bg-[#322722]/20 disabled:opacity-30 sm:left-3 sm:h-10 sm:w-10"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= entries.length - 1}
              aria-label="Next scheduled post"
              className="focus-ring absolute right-2 top-1/2 z-[1] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#322722]/10 text-[#322722] transition-colors hover:bg-[#322722]/20 disabled:opacity-30 sm:right-3 sm:h-10 sm:w-10"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div className="mx-auto flex min-h-[320px] max-w-[280px] items-center justify-center sm:max-w-[320px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={entry.title}
              className="aspect-[9/16] w-full rounded-[12px] object-cover shadow-[0_12px_32px_rgba(74,53,35,0.12)]"
            />
          ) : (
            <div className="flex aspect-[9/16] w-full items-center justify-center rounded-[12px] bg-[#E5DACE]">
              <ImagePlaceholderIcon className="h-12 w-12 text-[#A88B6C]" />
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[13px] text-[#756B63]">
          {hasMultiple ? `${currentIndex + 1}/${entries.length}` : '1/1'}
        </p>
      </div>

      <section aria-labelledby="about-template-heading">
        <h3
          id="about-template-heading"
          className="font-display text-[20px] font-medium text-[#211815]"
        >
          About This Template
        </h3>
        <p className="mt-3 text-[14px] leading-6 text-[#5A4940]">
          {entry.description ||
            'This scheduled post is part of your personalized content calendar. Use the caption below across your social channels or customize it to match your brand voice.'}
        </p>
      </section>

      <section aria-labelledby="content-usage-heading">
        <h3
          id="content-usage-heading"
          className="font-display text-[20px] font-medium text-[#211815]"
        >
          Content Usage
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-[#5A4940]">
          {CONTENT_USAGE_BULLETS.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <div className="rounded-[16px] bg-[#0b0b0b] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[18px] font-medium text-white">Caption</h3>
          <CopyCaptionButton content={caption} variant="inline" />
        </div>
        <p className="mt-4 whitespace-pre-wrap text-[14px] leading-6 text-white/90">
          {caption || 'No caption available for this entry.'}
        </p>
      </div>
    </div>
  );
}
