import { useMemo, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentCalendar } from '../hooks/useContentCalendar';
import { useDashboardAnalytics } from '../hooks/useDashboard';
import { mapItemsToScheduledPosts } from '../lib/contentCalendarDisplay';
import {
  greetingForHour,
  resolveDashboardFirstName,
} from '../lib/dashboardDisplay';
import type { ContentCalendarItem } from '../types/api';
import ContentList from './ContentList';
import {
  ArrowUpRightIcon,
  CalendarIcon,
  CheckFileIcon,
  DownloadIcon,
  SearchIcon,
  SparkIcon,
} from './icons';

interface DashboardOverviewProps {
  prompt: string;
  onPromptChange: (value: string) => void;
}

function OverviewSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading dashboard overview">
      <span className="sr-only">Loading dashboard</span>
      <div className="h-10 w-3/4 max-w-md animate-pulse rounded bg-white/10 md:h-12" />
      <div className="mt-md h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-4 w-5/6 max-w-xl animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-white/10" />
      <div className="mt-4 flex gap-3">
        <div className="h-10 w-36 animate-pulse rounded-full bg-white/10" />
        <div className="h-10 w-44 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`week-skeleton-${index}`}
            className="aspect-[3/4] animate-pulse rounded-[16px] bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  to,
  icon,
}: {
  label: string;
  value: number;
  to: string;
  icon: typeof DownloadIcon;
}) {
  const navigate = useNavigate();
  const Icon = icon;

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="focus-ring flex w-full items-start justify-between rounded-[20px] border border-white/10 bg-[#14100d] px-5 py-5 text-left transition-colors duration-200 hover:border-primary/40 hover:bg-[#1C1916] sm:px-6 sm:py-6"
      aria-label={`Open ${label}, ${value.toLocaleString('en-US')}`}
    >
      <div>
        <div className="flex items-center gap-2 text-[#B8ADA1]">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-[14px]">{label}</span>
        </div>
        <p className="mt-4 font-display text-[42px] leading-none text-primary sm:text-[52px]">
          {value.toLocaleString('en-US')}
        </p>
      </div>
      <ArrowUpRightIcon className="h-4 w-4 text-primary" />
    </button>
  );
}

export default function DashboardOverview({
  prompt,
  onPromptChange,
}: DashboardOverviewProps) {
  const navigate = useNavigate();
  const calendar = useContentCalendar();
  const analytics = useDashboardAnalytics();
  const weekPosts = useMemo(
    () => mapItemsToScheduledPosts(calendar.data).slice(0, 5),
    [calendar.data],
  );
  const firstName = resolveDashboardFirstName(calendar.data);
  const greeting = greetingForHour(new Date().getHours());
  const upcomingCount = calendar.data.length;
  const loading = calendar.loading && analytics.loading;

  const onGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = prompt.trim();
    navigate(
      query
        ? `/ultimate-mind?q=${encodeURIComponent(query)}`
        : '/ultimate-mind',
    );
  };

  const onOpenItem = (item: ContentCalendarItem) => {
    navigate(`/content-calendar/details?id=${encodeURIComponent(item.id)}`);
  };

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <section aria-labelledby="dashboard-heading" className="space-y-6">
      <header>
        <h1
          id="dashboard-heading"
          className="font-display text-[28px] font-medium leading-[1.08] text-[#F8F2EB] sm:text-[42px]"
        >
          {greeting}, {firstName}.
        </h1>
        <p className="mt-md max-w-[760px] text-lg font-normal leading-7 text-[#B8ADA1]">
          Let&apos;s keep your Austin brand moving.
          {upcomingCount > 0
            ? ` Today you have ${upcomingCount} scheduled ${
                upcomingCount === 1 ? 'post' : 'posts'
              } on your calendar.`
            : ' Plan your week and keep your brand consistent.'}
        </p>
      </header>

      <form onSubmit={onGenerate} className="space-y-4">
        <label className="relative block">
          <span className="sr-only">
            Generate captions, listing descriptions, email blasts, and Reels
            scripts in your brand voice
          </span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7F73]" />
          <input
            type="search"
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
            aria-label="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice"
            className="box-border h-12 w-full rounded-full border border-white/10 bg-[#121110] py-3 pl-11 pr-4 text-[14px] text-[#F8F2EB] transition-colors duration-200 placeholder:text-[#7A7068] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/content-calendar')}
            className="focus-ring inline-flex h-10 items-center rounded-full bg-primary px-5 text-[13px] text-[#0b0b0b] transition-colors duration-200 hover:bg-[#d4b089]"
            aria-label="Plan my week"
          >
            <SparkIcon className="mr-2 h-3.5 w-3.5" />
            Plan My Week
          </button>
          <button
            type="button"
            onClick={() => navigate('/content-calendar')}
            className="focus-ring inline-flex h-10 items-center rounded-full border border-white/10 bg-white/5 px-5 text-[13px] text-[#F8F2EB] transition-colors duration-200 hover:bg-white/10"
            aria-label="Open my content calendar"
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            My Content Calendar
          </button>
        </div>
      </form>

      <ContentList
        items={weekPosts}
        variant="week"
        dateStyle="month-day"
        loading={calendar.loading}
        emptyMessage="No scheduled posts this week."
        onItemClick={onOpenItem}
      />

      {analytics.loading ? (
        <div
          className="grid gap-4 sm:grid-cols-2"
          aria-busy="true"
          aria-label="Loading analytics"
        >
          <span className="sr-only">Loading analytics</span>
          <div className="h-[140px] animate-pulse rounded-[20px] bg-white/10" />
          <div className="h-[140px] animate-pulse rounded-[20px] bg-white/10" />
        </div>
      ) : analytics.data ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Downloads"
            value={analytics.data.downloads}
            to="/profile/downloads"
            icon={DownloadIcon}
          />
          <StatCard
            label="Content Generated"
            value={analytics.data.content_generated}
            to="/profile/content-generated"
            icon={CheckFileIcon}
          />
        </div>
      ) : (
        <p
          className="rounded-[16px] border border-white/10 bg-[#171411] px-4 py-8 text-center text-[13px] text-[#959595]"
          role="status"
        >
          No analytics are available yet.
        </p>
      )}
    </section>
  );
}
