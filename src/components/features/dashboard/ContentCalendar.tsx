import type { ContentCalendarEntry } from '../../../types/api';
import { formatDayLabel } from '../../../lib/format';
import { getCalendarGradient, inferContentType } from '../../../lib/calendarUtils';

interface ContentCalendarProps {
  entries: ContentCalendarEntry[];
}

const ContentCalendar = ({ entries }: ContentCalendarProps) => (
  <section aria-labelledby="content-calendar-heading">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2
        id="content-calendar-heading"
        className="font-garamond text-xl font-medium text-secondary"
      >
        Your Content Calendar
      </h2>
      <button
        type="button"
        className="shrink-0 font-almarai text-sm text-accent transition-opacity hover:opacity-80"
        aria-label="Browse all content calendar entries"
      >
        Browse all
      </button>
    </div>

    {entries.length === 0 ? (
      <p
        className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] px-5 py-10 text-center font-almarai text-sm text-[var(--color-57)]"
        role="status"
      >
        No content scheduled yet. Use Plan My Week to get started.
      </p>
    ) : (
      <ul className="flex gap-4 overflow-x-auto pb-2">
        {entries.slice(0, 5).map((entry, index) => {
          const contentType = inferContentType(entry.title, entry.description);
          const dayLabel = formatDayLabel(entry.date);

          return (
            <li key={entry.id} className="shrink-0">
              <article
                className="relative flex h-[220px] w-[180px] flex-col justify-end overflow-hidden rounded-2xl border border-[var(--color-41)] p-4 sm:h-[260px] sm:w-[200px]"
                style={{ background: getCalendarGradient(index) }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-16)] via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <p className="font-almarai text-xs font-bold uppercase tracking-wide text-accent">
                    {dayLabel} · {contentType}
                  </p>
                  <p className="mt-2 line-clamp-4 font-almarai text-xs leading-[18px] text-secondary">
                    {entry.content || entry.description || entry.title}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);

export default ContentCalendar;
