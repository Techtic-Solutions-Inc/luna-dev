import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { DashboardAnalytics } from '../types/api';
import {
  buildWeekDays,
  getCardGradient,
  getCardImageUrl,
  getCardOverlayText,
  getContentTypeLabel,
  getDashboardFirstName,
  getPrimaryItemForDay,
  getTimeOfDayGreeting,
} from '../lib/dashboardDisplay';
import { useContentCalendar } from '../hooks/useContentCalendar';
import {
  CalendarIcon,
  SearchIcon,
  SparkIcon,
  TrendUpIcon,
} from './icons';

interface DashboardOverviewProps {
  analytics: DashboardAnalytics | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function OverviewSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading dashboard overview">
      <span className="sr-only">Loading dashboard</span>
      <div className="h-10 w-3/4 max-w-md animate-pulse rounded bg-white/10 sm:h-12" />
      <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-4 w-5/6 max-w-xl animate-pulse rounded bg-white/10" />
      <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-white/10" />
      <div className="mt-4 flex gap-3">
        <div className="h-10 w-36 animate-pulse rounded-full bg-white/10" />
        <div className="h-10 w-44 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="mt-8 flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`week-skeleton-${index}`}
            className="h-[220px] min-w-[140px] flex-1 animate-pulse rounded-[16px] bg-white/10 sm:h-[260px] sm:min-w-[160px]"
          />
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10" />
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10" />
      </div>
    </div>
  );
}

interface WeekContentCardProps {
  dayLabel: string;
  monthDayLabel: string;
  contentType: string;
  overlayText: string;
  imageUrl: string | null;
  gradient: string;
  index: number;
}

function WeekContentCard({
  dayLabel,
  monthDayLabel,
  contentType,
  overlayText,
  imageUrl,
  gradient,
  index,
}: WeekContentCardProps) {
  const backgroundStyle = imageUrl
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.05) 0%, rgba(12,12,12,0.82) 100%), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: gradient };

  return (
    <article
      className="relative min-w-[140px] flex-1 overflow-hidden rounded-[16px] border border-white/5 sm:min-w-[160px]"
      style={backgroundStyle}
      aria-label={`${dayLabel} ${contentType}${overlayText ? `: ${overlayText}` : ''}`}
    >
      <div className="flex min-h-[220px] flex-col justify-between p-3 sm:min-h-[260px] sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {dayLabel}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.06em] text-[#CAC1B7]">
              {monthDayLabel}
            </p>
          </div>
          <span className="rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary">
            {contentType}
          </span>
        </div>
        {overlayText ? (
          <p className="font-display text-[15px] leading-[1.25] text-white sm:text-[17px]">
            {overlayText}
          </p>
        ) : (
          <p className="text-[12px] text-white/50">No content scheduled</p>
        )}
      </div>
      <span className="sr-only">{`Card ${index + 1}`}</span>
    </article>
  );
}

export default function DashboardOverview({
  analytics,
  loading = false,
  error = null,
  onRetry,
}: DashboardOverviewProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: calendarItems } = useContentCalendar();
  const firstName = getDashboardFirstName();
  const greeting = getTimeOfDayGreeting();

  const weekDays = useMemo(
    () => buildWeekDays(calendarItems),
    [calendarItems],
  );

  const activeWeekItems = useMemo(
    () => weekDays.flatMap((day) => day.items),
    [weekDays],
  );

  const reelCount = activeWeekItems.filter(
    (item) => getContentTypeLabel(item) === 'Reels',
  ).length;

  const subtitle =
    activeWeekItems.length > 0
      ? `Let's keep your brand moving. This week you have ${activeWeekItems.length} scheduled content ${activeWeekItems.length === 1 ? 'item' : 'items'}${reelCount > 0 ? `, including ${reelCount} ${reelCount === 1 ? 'reel' : 'reels'}` : ''}.`
      : "Let's keep your brand moving. Plan your week to stay consistent across every channel.";

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <section aria-labelledby="dashboard-greeting">
      {error ? (
        <div
          role="alert"
          className="mb-6 rounded-[12px] border border-[#ff5630]/40 bg-[#ff563028] px-4 py-3 text-sm text-white"
        >
          <p>{error}</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="focus-ring mt-2 text-sm font-semibold text-primary underline-offset-2 hover:underline"
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}

      <header>
        <h1
          id="dashboard-greeting"
          className="font-display text-[32px] font-medium leading-[1.08] text-white sm:text-[42px] sm:leading-[55px]"
        >
          {greeting}, {firstName}.
        </h1>
        <p className="mt-3 max-w-[760px] text-[15px] leading-6 text-[#A6A4A2] sm:text-base sm:leading-7">
          {subtitle}
        </p>
      </header>

      <div className="mt-8">
        <label htmlFor="dashboard-prompt-input" className="sr-only">
          Generate content in your brand voice
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#646261]" />
          <input
            id="dashboard-prompt-input"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
            className="focus-ring h-12 w-full rounded-full border border-white/10 bg-[#14100d] py-3 pl-11 pr-4 text-[13px] text-white placeholder:text-[#646261] sm:h-[52px] sm:text-sm"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/ultimate-mind')}
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-primary/20"
          >
            <SparkIcon className="h-4 w-4 text-primary" />
            Plan My Week
          </button>
          <Link
            to="/content-calendar"
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            <CalendarIcon className="h-4 w-4 text-primary" />
            My Content Calendar
          </Link>
        </div>
      </div>

      <div
        className="mt-8 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="New content this week"
      >
        {weekDays.map((day, index) => {
          const primaryItem = getPrimaryItemForDay(day);

          return (
            <WeekContentCard
              key={day.dayLabel}
              index={index}
              dayLabel={day.monthDayLabel}
              monthDayLabel={day.dayLabel}
              contentType={getContentTypeLabel(primaryItem)}
              overlayText={getCardOverlayText(primaryItem)}
              imageUrl={getCardImageUrl(primaryItem)}
              gradient={getCardGradient(index)}
            />
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article
          aria-label={`Downloads: ${analytics?.downloads.toLocaleString('en-US') ?? '0'}`}
          className="rounded-[16px] border border-white/5 bg-[#14100d] px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-[13px] font-normal text-[#A6A4A2]">Downloads</h2>
            <TrendUpIcon className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 font-display text-[36px] font-medium leading-none text-white sm:text-[42px]">
            {analytics?.downloads.toLocaleString('en-US') ?? '0'}
          </p>
        </article>

        <article
          aria-label={`Content generated: ${analytics?.content_generated.toLocaleString('en-US') ?? '0'}`}
          className="rounded-[16px] border border-white/5 bg-[#14100d] px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-[13px] font-normal text-[#A6A4A2]">
              Content Generated
            </h2>
            <TrendUpIcon className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 font-display text-[36px] font-medium leading-none text-white sm:text-[42px]">
            {analytics?.content_generated.toLocaleString('en-US') ?? '0'}
          </p>
        </article>
      </div>
    </section>
  );
}
