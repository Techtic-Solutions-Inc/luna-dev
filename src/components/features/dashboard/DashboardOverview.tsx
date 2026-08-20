import { LuArrowUpRight, LuCalendar, LuDownload, LuSparkles } from 'react-icons/lu';
import type { ContentCalendarEntry, DashboardOverview as DashboardData } from '../../../types/api';
import { formatDisplayDate, getFirstName, getGreeting } from '../../../lib/format';
import { getCalendarGradient, inferContentType } from '../../../lib/calendarUtils';

interface DashboardOverviewSectionProps {
  profile: DashboardData['profile'];
  announcements: DashboardData['announcements'];
  calendarEntries: ContentCalendarEntry[];
  contentGeneratedCount: number;
}

const DashboardOverviewSection = ({
  profile,
  announcements,
  calendarEntries,
  contentGeneratedCount,
}: DashboardOverviewSectionProps) => {
  const firstName = getFirstName(profile.name);
  const previewEntries = calendarEntries.slice(0, 5);
  const downloadsCount = announcements.length;

  return (
    <div className="space-y-6">
      <section aria-labelledby="dashboard-greeting">
        <h1
          id="dashboard-greeting"
          className="font-garamond text-[32px] font-medium leading-[42px] text-secondary md:text-[38px] md:leading-[50px]"
        >
          {getGreeting()}, {firstName}.
        </h1>
        <p className="mt-2 max-w-xl font-almarai text-sm leading-[22px] text-[var(--color-57)]">
          {calendarEntries.length > 0
            ? `You have ${calendarEntries.length} content item${calendarEntries.length === 1 ? '' : 's'} scheduled this week.`
            : 'Your studio is ready. Start planning your week below.'}
        </p>
        {announcements.length > 0 && (
          <p className="mt-1 font-almarai text-sm leading-[22px] text-[var(--color-57)]">
            {announcements.length} new announcement{announcements.length === 1 ? '' : 's'} waiting
            for you.
          </p>
        )}

        <div className="mt-6">
          <label htmlFor="dashboard-search" className="sr-only">
            Generate content
          </label>
          <div className="relative">
            <input
              id="dashboard-search"
              type="search"
              placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
              className="w-full rounded-full border border-[var(--color-41)] bg-[var(--color-36)] px-6 py-3.5 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-almarai text-sm font-bold text-[var(--color-16)] transition-opacity hover:opacity-90"
          >
            <LuSparkles size={16} aria-hidden="true" />
            Plan My Week
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-41)] bg-[var(--color-36)] px-5 py-2.5 font-almarai text-sm text-secondary transition-colors hover:border-accent"
          >
            <LuCalendar size={16} aria-hidden="true" />
            My Content Calendar
          </button>
        </div>
      </section>

      {previewEntries.length > 0 && (
        <section aria-labelledby="preview-cards-heading">
          <h2 id="preview-cards-heading" className="sr-only">
            Upcoming content preview
          </h2>
          <ul className="flex gap-3 overflow-x-auto pb-1">
            {previewEntries.map((entry, index) => (
              <li key={entry.id} className="shrink-0">
                <article
                  className="flex h-[120px] w-[88px] flex-col justify-between overflow-hidden rounded-xl border border-[var(--color-41)] p-3"
                  style={{ background: getCalendarGradient(index) }}
                >
                  <span className="font-almarai text-[10px] font-bold uppercase tracking-wide text-accent">
                    {formatDisplayDate(entry.date)}
                  </span>
                  <div>
                    <span className="font-almarai text-[10px] text-[var(--color-57)]">
                      {inferContentType(entry.title, entry.description)}
                    </span>
                    <p className="mt-0.5 line-clamp-2 font-almarai text-[9px] leading-tight text-secondary">
                      {entry.title}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-garamond text-[42px] font-medium leading-none text-accent">
                  {downloadsCount.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <LuDownload size={14} className="text-[var(--color-57)]" aria-hidden="true" />
                  <span className="font-almarai text-sm text-[var(--color-57)]">Downloads</span>
                </div>
              </div>
              <LuArrowUpRight size={18} className="text-[var(--color-57)]" aria-hidden="true" />
            </div>
          </article>

          <article className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-garamond text-[42px] font-medium leading-none text-accent">
                  {contentGeneratedCount.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <LuSparkles size={14} className="text-[var(--color-57)]" aria-hidden="true" />
                  <span className="font-almarai text-sm text-[var(--color-57)]">
                    Content Generated
                  </span>
                </div>
              </div>
              <LuArrowUpRight size={18} className="text-[var(--color-57)]" aria-hidden="true" />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverviewSection;
