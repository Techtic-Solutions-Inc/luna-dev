import { type FormEvent, type ReactNode } from 'react';
import {
  LuArrowUpRight,
  LuCalendar,
  LuCircleCheck,
  LuDownload,
  LuMegaphone,
  LuSearch,
  LuSparkles,
} from 'react-icons/lu';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import type { ContentCalendarEntry, DashboardAnnouncement, DashboardData } from '../../../types/api';
import {
  announcementTitle,
  firstNameFrom,
  greetingForDate,
  relativeTime,
} from '../../../lib/dashboard';
import PortraitCard from './PortraitCard';
import SectionStatus from './SectionStatus';

interface DashboardOverviewProps {
  data: DashboardData;
  calendarEntries: ContentCalendarEntry[];
  profileName?: string;
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

function HeroAnnouncements({ announcements }: { announcements: DashboardAnnouncement[] }) {
  return (
    <aside
      aria-labelledby="hero-announcements-heading"
      className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-20)] p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="hero-announcements-heading"
          className="flex items-center gap-2 font-garamond text-xl font-medium text-secondary"
        >
          <LuMegaphone size={18} className="text-accent" aria-hidden="true" />
          Announcements
        </h2>
        <a href="#announcements" className="font-almarai text-xs text-accent hover:opacity-80">
          View all
        </a>
      </div>
      {announcements.length === 0 ? (
        <SectionStatus>No announcements yet.</SectionStatus>
      ) : (
        <ul className="space-y-2">
          {announcements.slice(0, 3).map((item) => (
            <li key={item.id}>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-41)] bg-[var(--color-16)] px-3 py-2.5">
                <span className="font-almarai text-xs text-secondary">{announcementTitle(item)}</span>
                <time
                  className="shrink-0 font-almarai text-[10px] text-[var(--color-57)]"
                  dateTime={item.created_at}
                >
                  {relativeTime(item.created_at) || item.status || ''}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default function DashboardOverview({
  data,
  calendarEntries,
  profileName,
}: DashboardOverviewProps) {
  const searchId = 'dashboard-search';
  const resolvedName = data.profile?.first_name || data.profile?.name || profileName;
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
          {greetingForDate(new Date())}, {firstNameFrom(resolvedName)}.
        </h1>
        <p className="mt-2 max-w-2xl font-almarai text-sm leading-[22px] text-[var(--color-57)]">
          Let&apos;s keep your Austin brand moving. Plan your week and start creating in the Mind.
        </p>

        <Card className="mt-6 grid gap-6 bg-[var(--color-20)] p-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:p-8">
          <div>
            <h2 className="font-garamond text-2xl font-medium leading-tight text-secondary md:text-[28px]">
              Plan your week with content that feels like you.
            </h2>
            <p className="mt-2 max-w-2xl font-almarai text-sm leading-[22px] text-[var(--color-57)]">
              Generate captions, listing descriptions, email blasts, and Reels scripts in your brand
              voice — then schedule them across your calendar.
            </p>

            <form className="relative mt-5" onSubmit={handleSearch}>
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

            <div className="mt-6">
              <h3 className="sr-only">Upcoming content preview</h3>
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
            </div>
          </div>

          <HeroAnnouncements announcements={data.announcements} />
        </Card>
      </section>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Statistics
        </h2>
        {data.downloads === null && data.contentGenerated === null ? (
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
              value={
                data.contentGenerated === null ? '—' : data.contentGenerated.toLocaleString()
              }
              icon={<LuCircleCheck size={20} />}
            />
          </div>
        )}
      </section>
    </div>
  );
}
