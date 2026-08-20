import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import type { ContentCalendarEntry } from '../../../types/api';
import { weekdayLabel } from '../../../lib/dashboard';
import PortraitCard from './PortraitCard';
import SectionStatus from './SectionStatus';

interface ContentCalendarProps {
  entries: ContentCalendarEntry[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function ContentCalendar({
  entries,
  loading,
  error,
  onRetry,
}: ContentCalendarProps) {
  const preview = entries.slice(0, 5);

  return (
    <section id="content-calendar" aria-labelledby="content-calendar-heading">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="content-calendar-heading"
          className="font-garamond text-2xl font-medium text-secondary"
        >
          Your Content Calendar
        </h2>
        <a
          href="#content-calendar"
          className="font-almarai text-sm text-accent hover:opacity-80"
        >
          Browse all
        </a>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner label="Loading content calendar" />
        </div>
      ) : error && entries.length === 0 ? (
        <div className="space-y-4">
          <SectionStatus tone="error">{error}</SectionStatus>
          <div className="flex justify-center">
            <Button onClick={onRetry} aria-label="Retry loading content calendar">
              Try again
            </Button>
          </div>
        </div>
      ) : preview.length === 0 ? (
        <SectionStatus>No content scheduled yet. Use Plan My Week to get started.</SectionStatus>
      ) : (
        <ul className="flex gap-4 overflow-x-auto pb-2">
          {preview.map((entry, index) => (
            <li key={entry.id} className="shrink-0">
              <div className="mb-2 font-almarai text-xs uppercase tracking-wide text-[var(--color-57)]">
                {weekdayLabel(entry.date)}
              </div>
              <PortraitCard entry={entry} index={index} size="lg" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
