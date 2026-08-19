import type { ProfileContentItem } from '@/types/api';
import { formatContentDate } from '@/utils/calendar';

interface ContentHistoryItemProps {
  item: ProfileContentItem;
}

export function ContentHistoryItem({ item }: ContentHistoryItemProps) {
  const preview = item.description || item.content;
  const hasLink = Boolean(item.link);

  return (
    <article className="rounded-[12px] border border-white/5 bg-[#26231f] p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 flex-1 text-[15px] font-medium leading-5 text-white">
          {item.title}
        </h3>
        {hasLink ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring shrink-0 text-[13px] text-[#C8A47E] transition-colors hover:text-[#d4b48f] hover:underline"
          >
            View
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="shrink-0 cursor-not-allowed text-[13px] text-[#646261]"
            aria-label={`View unavailable for ${item.title}`}
          >
            View
          </button>
        )}
      </div>
      {preview ? (
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#A6A4A2]">
          {preview}
        </p>
      ) : null}
      {item.created_at ? (
        <p className="mt-3 text-[12px] leading-4 text-[#858585]">
          {formatContentDate(item.created_at)}
        </p>
      ) : null}
    </article>
  );
}
