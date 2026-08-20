import type { ContentCalendarEntry } from '../../../types/api';
import { cardImage, contentType, formatCardDate } from '../../../lib/dashboard';

interface PortraitCardProps {
  entry: ContentCalendarEntry;
  index: number;
  size: 'sm' | 'lg';
}

export default function PortraitCard({ entry, index, size }: PortraitCardProps) {
  const dimensions =
    size === 'sm'
      ? 'h-[176px] w-[118px] sm:h-[210px] sm:w-[140px]'
      : 'h-[248px] w-[168px] sm:h-[300px] sm:w-[200px]';

  return (
    <article
      className={`relative flex ${dimensions} flex-col overflow-hidden rounded-2xl border border-[var(--color-41)]`}
    >
      <img
        src={cardImage(entry, index)}
        alt={entry.title || 'Scheduled content'}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-16)]/75 via-transparent to-[var(--color-16)]/90"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col justify-between p-3">
        <p className="font-almarai text-[10px] font-bold uppercase tracking-wide text-accent">
          {formatCardDate(entry.date)} · {contentType(entry.title, entry.description, entry.content)}
        </p>
        {size === 'lg' ? (
          <p className="line-clamp-4 font-almarai text-xs leading-[16px] text-secondary">
            {entry.title}
          </p>
        ) : null}
      </div>
    </article>
  );
}
