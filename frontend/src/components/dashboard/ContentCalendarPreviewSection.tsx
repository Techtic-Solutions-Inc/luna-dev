import { Link } from 'react-router-dom';
import { ImagePlaceholderIcon } from '@/components/icons';
import type { WeekPreviewEntry } from '@/utils/dashboard';
import { getWeekdayLabel } from '@/utils/dashboard';

interface ContentCalendarPreviewSectionProps {
  items: WeekPreviewEntry[];
}

export function ContentCalendarPreviewSection({
  items,
}: ContentCalendarPreviewSectionProps) {
  return (
    <section aria-labelledby="dashboard-calendar-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2
            id="dashboard-calendar-heading"
            className="font-display text-[24px] font-medium text-white sm:text-[28px]"
          >
            Your Content Calendar
          </h2>
          <p className="mt-1 text-sm text-[#A6A4A2] sm:text-base">
            A gentle rhythm to keep your brand consistent.
          </p>
        </div>
        <Link
          to="/content-calendar"
          className="focus-ring shrink-0 text-sm text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"
        >
          Browse all
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-white/10 bg-[#1f1b17]/50 px-6 py-10 text-center md:rounded-[20px]">
          <p className="text-sm text-[#A6A4A2]">No scheduled posts yet.</p>
          <Link
            to="/content-calendar"
            className="focus-ring mt-4 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-primary-hover"
          >
            Open Content Calendar
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max gap-3 md:gap-4">
            {items.map((preview) => (
              <Link
                key={`calendar-${preview.entry.id}`}
                to={`/content-calendar/details/${preview.entry.id}`}
                className="focus-ring group relative flex w-[140px] shrink-0 flex-col overflow-hidden rounded-[14px] border border-white/5 bg-[#1f1b17] sm:w-[160px] md:w-[180px]"
                aria-label={`View ${preview.postType} for ${getWeekdayLabel(preview.day)}`}
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#858585]">
                    {getWeekdayLabel(preview.day)}
                  </span>
                  <span className="rounded-full bg-[#EADBCD] px-2 py-0.5 text-[10px] font-medium text-primary">
                    {preview.postType}
                  </span>
                </div>
                <div className="relative mx-2 mb-2 aspect-[3/4] overflow-hidden rounded-[10px] bg-[#2a2520]">
                  {preview.imageUrl ? (
                    <img
                      src={preview.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#858585]">
                      <ImagePlaceholderIcon className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 px-3 pb-3 text-center font-display text-[13px] leading-5 text-white">
                    {preview.overlayText}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
