import { cn } from '@/lib/utils/cn';
import type { ContentCalendarItem } from '@/types/dashboard';

const CARD_GRADIENTS = [
  'bg-[linear-gradient(160deg,#473e33_0%,#1a1919_100%)]',
  'bg-[linear-gradient(160deg,#2f271f_0%,#0e0d0d_100%)]',
  'bg-[linear-gradient(160deg,#44413e_0%,#191919_100%)]',
  'bg-[linear-gradient(160deg,#3a3541_0%,#141010_100%)]',
  'bg-[linear-gradient(160deg,#376292_0%,#1a1919_100%)]',
];

interface ContentCardProps {
  item: ContentCalendarItem;
  index: number;
  className?: string;
}

export function ContentCard({ item, index, className }: ContentCardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <article
      className={cn(
        'relative flex min-h-[220px] flex-col overflow-hidden rounded-12 border border-color-41',
        item.imageUrl ? 'bg-color-36' : gradient,
        className,
      )}
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title || `${item.dayLabel} ${item.typeLabel}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <div className="relative z-10 flex flex-col gap-4 p-12">
        <div className="flex items-center gap-8">
          {item.dayLabel ? (
            <span className="type-caption-12 uppercase tracking-[0.08em] text-white">
              {item.dayLabel}
            </span>
          ) : null}
          {item.typeLabel ? (
            <span className="type-caption-12 text-accent">{item.typeLabel}</span>
          ) : null}
        </div>
        {item.title ? (
          <p className="type-body-sm-2 mt-auto text-white drop-shadow-sm">{item.title}</p>
        ) : null}
        {item.subtitle ? <p className="type-caption-12 text-white/80">{item.subtitle}</p> : null}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-color-16/80 via-color-16/20 to-transparent" />
    </article>
  );
}

interface ContentCardGridProps {
  items: ContentCalendarItem[];
  emptyTitle?: string;
}

export function ContentCardGrid({
  items,
  emptyTitle = 'No content scheduled yet.',
}: ContentCardGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-12 border border-dashed border-color-41 bg-color-36/60 px-16 py-24 text-center">
        <p className="type-body-sm-2 text-color-14">{emptyTitle}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-12 tablet:grid-cols-3 desktop:grid-cols-5">
      {items.map((item, index) => (
        <ContentCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
