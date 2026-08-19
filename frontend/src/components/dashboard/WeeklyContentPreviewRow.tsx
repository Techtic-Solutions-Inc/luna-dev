import { Link } from 'react-router-dom';
import { ImagePlaceholderIcon } from '@/components/icons';
import type { WeekPreviewEntry } from '@/utils/dashboard';
import { getMonthDayLabel } from '@/utils/dashboard';

interface WeeklyContentPreviewRowProps {
  items: WeekPreviewEntry[];
}

export function WeeklyContentPreviewRow({ items }: WeeklyContentPreviewRowProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-3">
        {items.map((preview) => (
          <Link
            key={preview.entry.id}
            to={`/content-calendar/details/${preview.entry.id}`}
            className="focus-ring group flex w-[72px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-white/5 bg-[#1f1b17] transition-colors hover:border-white/10 sm:w-[88px]"
            aria-label={`View ${preview.postType} scheduled for ${getMonthDayLabel(preview.day)}`}
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wide text-[#858585]">
                {getMonthDayLabel(preview.day)}
              </span>
            </div>
            <div className="relative mx-1 mb-1 aspect-[3/4] overflow-hidden rounded-[6px] bg-[#2a2520]">
              {preview.imageUrl ? (
                <img
                  src={preview.imageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#858585]">
                  <ImagePlaceholderIcon className="h-5 w-5" />
                </div>
              )}
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[8px] text-white">
                {preview.postType}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
