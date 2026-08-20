import { type FormEvent, type ReactNode } from 'react';
import { LuArrowUpRight, LuCalendar, LuCircleCheck, LuDownload, LuSearch, LuSparkles } from 'react-icons/lu';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import type { ContentCalendarEntry, DashboardData } from '../../../types/api';
import { firstNameFrom, greetingForDate } from '../../../lib/dashboard';
import PortraitCard from './PortraitCard';
import SectionStatus from './SectionStatus';

interface DashboardOverviewProps {
  data: DashboardData;
  calendarEntries: ContentCalendarEntry[];
}

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 text-accent" aria-hidden="true">
            {icon}
          </div>
          <p className="font-garamond text-[42px] font-medium leading-none text-accent">{value}</p>
          <p className="mt-3 font-almarai text-sm text-[var(--color-57)]">{label}</p>
        </div>
        <LuArrowUpRight size={18} className="text-[var(--color-57)]" aria-hidden="true" />
      </div>
    </Card>
  );
}

export default function DashboardOverview({ data, calendarEntries }: DashboardOverviewProps) {
  const searchId = 'dashboard-search';
  const profileName = data.profile?.first_name || data.profile?.name;
  const previewEntries = calendarEntries.slice(0, 5);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scrollToId('tools');
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="dashboard-greeting">
        <h1
          id="dashboard-greeting"
          className="font-garamond text-[32px] font-medium leading-[42px] text-secondary md:text-[38px] md:leading-[50px]"
        >
          {greetingForDate(new Date())}, {firstNameFrom(profileName)}.
        </h1>
        <p className="mt-2 max-w-2xl font-almarai text-sm leading-[22px] text-[var(--color-57)]">
          {calendarEntries.length > 0
            ? `You have ${calendarEntries.length} content item${calendarEntries.length === 1 ? '' : 's'} scheduled. Plan your week and start creating in the Mind.`
            : 'Your studio is ready. Plan your week and start creating in the Mind.'}
        </p>

        <form className="relative mt-6" onSubmit={handleSearch}>
          <label htmlFor={searchId} className="sr-only">
            Generate captions, listing descriptions, email blasts, and Reels scripts in your brand
            voice.
          </label>
          <LuSearch
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-57)]"
            size={18}
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            name="prompt"
            placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
            className="w-full rounded-full border border-[var(--color-41)] bg-[var(--color-36)] py-3.5 pl-12 pr-6 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] focus:border-accent focus:outline-none"
          />
        </form>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            className="px-5 py-2.5"
            aria-label="Plan my week"
            onClick={() => document.getElementById(searchId)?.focus()}
          >
            <LuSparkles size={16} aria-hidden="true" />
            Plan My Week
          </Button>
          <Button
            variant="secondary"
            className="px-5 py-2.5"
            aria-label="Open my content calendar"
            onClick={() => scrollToId('content-calendar')}
          >
            <LuCalendar size={16} aria-hidden="true" />
            My Content Calendar
          </Button>
        </div>
      </section>

      <section aria-labelledby="preview-cards-heading">
        <h2 id="preview-cards-heading" className="sr-only">
          Upcoming content preview
        </h2>
        {previewEntries.length === 0 ? (
          <SectionStatus>No upcoming posts to preview.</SectionStatus>
        ) : (
          <ul className="flex gap-3 overflow-x-auto pb-1">
            {previewEntries.map((entry, index) => (
              <li key={entry.id} className="shrink-0">
                <PortraitCard entry={entry} index={index} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Statistics
        </h2>
        {data.downloads === null && data.contentGenerated === null && calendarEntries.length === 0 ? (
          <SectionStatus>Analytics will appear here as you create content.</SectionStatus>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              label="Downloads"
              value={data.downloads === null ? '—' : data.downloads.toLocaleString()}
              icon={<LuDownload size={20} />}
            />
            <StatCard
              label="Content Generated"
              value={(data.contentGenerated ?? calendarEntries.length).toLocaleString()}
              icon={<LuCircleCheck size={20} />}
            />
          </div>
        )}
      </section>
    </div>
  );
}
