import { useMemo, useState } from 'react';
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuCircleCheck,
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuSearch,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { ContentCardGrid } from '@/components/dashboard/ContentCard';
import { SectionHeader, SectionState } from '@/components/dashboard/DashboardSection';
import { useDashboard } from '@/contexts/dashboardContextState';
import { getAnnouncementBody, getAnnouncementTitle, getGreeting } from '@/lib/dashboard/normalize';
import { cn } from '@/lib/utils/cn';

function StatsCards() {
  const { analytics, analyticsState, analyticsError, refresh } = useDashboard();
  const stats = analytics.stats;

  return (
    <SectionState
      isLoading={analyticsState === 'loading'}
      error={analyticsState === 'error' ? analyticsError : null}
      isEmpty={analyticsState === 'success' && stats === null}
      emptyTitle="Analytics are not available yet."
      onRetry={() => {
        void refresh();
      }}
    >
      {stats ? (
        <div className="grid gap-12 tablet:grid-cols-2">
          <article className="rounded-12 border border-color-41 bg-color-36 p-16">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-8 text-color-14">
                <LuDownload aria-hidden="true" size={16} />
                <span className="type-body-sm-2">Downloads</span>
              </div>
              <LuArrowUpRight aria-hidden="true" className="text-color-14" size={16} />
            </div>
            <p className="type-heading-xl-44 mt-12 text-accent">
              {stats.downloads.toLocaleString()}
            </p>
          </article>

          <article className="rounded-12 border border-color-41 bg-color-36 p-16">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-8 text-color-14">
                <LuCircleCheck aria-hidden="true" size={16} />
                <span className="type-body-sm-2">Content Generated</span>
              </div>
              <LuArrowUpRight aria-hidden="true" className="text-color-14" size={16} />
            </div>
            <p className="type-heading-xl-44 mt-12 text-accent">
              {stats.contentGenerated.toLocaleString()}
            </p>
          </article>
        </div>
      ) : null}
    </SectionState>
  );
}

function AnnouncementsCarousel() {
  const { announcements, announcementsState, announcementsError, refresh } = useDashboard();
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleAnnouncements = useMemo(
    () => announcements.filter((item) => getAnnouncementTitle(item).length > 0),
    [announcements],
  );

  const activeAnnouncement = visibleAnnouncements[activeIndex];

  const goPrevious = (): void => {
    setActiveIndex((current) => (current === 0 ? visibleAnnouncements.length - 1 : current - 1));
  };

  const goNext = (): void => {
    setActiveIndex((current) => (current === visibleAnnouncements.length - 1 ? 0 : current + 1));
  };

  return (
    <SectionState
      isLoading={announcementsState === 'loading'}
      error={announcementsState === 'error' ? announcementsError : null}
      isEmpty={announcementsState === 'success' && visibleAnnouncements.length === 0}
      emptyTitle="No announcements yet."
      emptyDescription="New platform updates will appear here."
      onRetry={() => {
        void refresh();
      }}
      className="h-full min-h-[280px]"
    >
      {activeAnnouncement ? (
        <div className="flex h-full flex-col">
          <div className="mb-12 flex items-center justify-between">
            <h3 className="type-body-sm-2 text-color-14">Announcements</h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={goPrevious}
                className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-color-41 text-white transition-colors duration-200 hover:bg-color-41"
                aria-label="Previous announcement"
              >
                <LuChevronLeft aria-hidden="true" size={16} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-color-41 text-white transition-colors duration-200 hover:bg-color-41"
                aria-label="Next announcement"
              >
                <LuChevronRight aria-hidden="true" size={16} />
              </button>
            </div>
          </div>

          <article className="relative flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-12 border border-color-41 bg-[linear-gradient(160deg,#473e33_0%,#1a1919_100%)]">
            {activeAnnouncement.link ? (
              <img
                src={activeAnnouncement.link}
                alt={getAnnouncementTitle(activeAnnouncement)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="relative z-10 mt-auto p-16">
              <h4 className="type-heading-md-62 text-white">
                {getAnnouncementTitle(activeAnnouncement)}
              </h4>
              {getAnnouncementBody(activeAnnouncement) ? (
                <p className="type-body-sm-2 mt-8 text-white/80">
                  {getAnnouncementBody(activeAnnouncement)}
                </p>
              ) : null}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-color-16 via-color-16/30 to-transparent" />
          </article>

          {visibleAnnouncements.length > 1 ? (
            <div
              className="mt-12 flex items-center justify-center gap-6"
              role="tablist"
              aria-label="Announcement slides"
            >
              {visibleAnnouncements.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show announcement ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'h-4 rounded-full transition-all duration-200',
                    index === activeIndex ? 'w-16 bg-accent' : 'w-8 bg-color-41',
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </SectionState>
  );
}

export function DashboardOverview() {
  const { analytics, analyticsState, analyticsError, refresh } = useDashboard();
  const greeting = getGreeting(analytics.user?.firstName);
  const hero = analytics.hero;

  return (
    <section aria-labelledby="dashboard-greeting" className="flex flex-col gap-24">
      <h1 id="dashboard-greeting" className="type-heading-xl-44 text-white">
        {greeting}
      </h1>

      <div className="grid gap-16 desktop:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <div className="rounded-16 border border-color-41 bg-color-23 p-20 shadow-drop-shadow-20">
          <SectionState
            isLoading={analyticsState === 'loading'}
            error={analyticsState === 'error' ? analyticsError : null}
            isEmpty={analyticsState === 'success' && hero === null}
            emptyTitle="Your dashboard summary will appear here once analytics are available."
            onRetry={() => {
              void refresh();
            }}
          >
            {hero ? (
              <div className="flex flex-col gap-16">
                {hero.headline ? (
                  <h2 className="type-heading-lg-48 text-accent">{hero.headline}</h2>
                ) : null}
                {hero.description ? (
                  <p className="type-body-sm-38 max-w-[640px] text-white/80">{hero.description}</p>
                ) : null}
              </div>
            ) : null}
          </SectionState>

          <label htmlFor="dashboard-search" className="sr-only">
            Generate marketing content
          </label>
          <div className="relative mt-20">
            <LuSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 text-color-14"
              size={18}
            />
            <input
              id="dashboard-search"
              type="search"
              placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
              className="type-body-sm-2 h-44 w-full rounded-full border border-color-41 bg-color-22 py-12 pl-44 pr-16 text-white placeholder:text-color-14"
            />
          </div>

          <div className="mt-16 flex flex-wrap gap-12">
            <Link
              to="/content-calendar"
              className="type-body-sm-2 inline-flex h-36 items-center gap-8 rounded-full bg-accent px-16 text-color-16 transition-colors duration-200 hover:bg-color-30"
            >
              <LuCalendarDays aria-hidden="true" size={16} />
              Plan My Week
            </Link>
            <Link
              to="/content-calendar"
              className="type-body-sm-2 inline-flex h-36 items-center gap-8 rounded-full border border-color-41 px-16 text-white transition-colors duration-200 hover:bg-color-36"
            >
              <LuCalendarDays aria-hidden="true" size={16} />
              My Content Calendar
            </Link>
          </div>
        </div>

        <AnnouncementsCarousel />
      </div>

      <div>
        <SectionHeader
          title="New Content This Week"
          actionLabel="Browse all"
          actionHref="/content-calendar"
        />
        <SectionState
          isLoading={analyticsState === 'loading'}
          error={analyticsState === 'error' ? analyticsError : null}
          isEmpty={analyticsState === 'success' && analytics.weeklyContent.length === 0}
          emptyTitle="No new content scheduled this week."
          onRetry={() => {
            void refresh();
          }}
        >
          <ContentCardGrid items={analytics.weeklyContent} />
        </SectionState>
      </div>

      <StatsCards />
    </section>
  );
}

export default DashboardOverview;
