import type { ContentCalendarEntry } from '@/types/dashboard';

interface ContentCardProps {
  entry: ContentCalendarEntry;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function ContentCard({ entry }: ContentCardProps) {
  return (
    <article className="flex h-[300px] w-full shrink-0 flex-col rounded-control border border-line bg-card p-4 md:w-[200px]">
      <time
        dateTime={entry.date}
        className="mb-2 text-[12px] font-medium uppercase tracking-wide text-accent"
      >
        {formatDate(entry.date)}
      </time>
      <h3 className="mb-2 text-[14px] font-normal leading-5 text-ink line-clamp-2">
        {entry.title}
      </h3>
      <p className="flex-1 overflow-hidden text-[14px] leading-5 text-muted line-clamp-6">
        {entry.description}
      </p>
    </article>
  );
}
