import { Link } from 'react-router-dom';
import { ImagePlaceholderIcon } from '@/components/icons';
import type { WeekPreviewEntry } from '@/utils/dashboard';
import { getWeekdayLabel } from '@/utils/dashboard';

interface NewContentThisWeekSectionProps {
  items: WeekPreviewEntry[];
}

export function NewContentThisWeekSection({
  items,
}: NewContentThisWeekSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="dashboard-new-content-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2
          id="dashboard-new-content-heading"
          className="font-display text-[24px] font-medium text-white sm:text-[28px]"
        >
          New Content This Week
        </h2>
        <Link
          to="/content-calendar"
          className="focus-ring shrink-0 text-sm text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"
        >
          Browse all
        </Link>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-3 md:gap-4">
          {items.map((preview) => (
            <Link
              key={`new-content-${preview.entry.id}`}
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
    </section>
  );
}
