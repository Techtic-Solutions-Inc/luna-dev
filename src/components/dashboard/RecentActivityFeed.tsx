import { LuMegaphone, LuSparkles } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { SectionState } from '@/components/dashboard/DashboardSection';
import { useDashboard } from '@/contexts/dashboardContextState';
import { getAnnouncementTitle } from '@/lib/dashboard/normalize';
import { formatRelativeTime } from '@/lib/utils/formatRelativeTime';

function PromptLibraryPanel() {
  const { analytics, analyticsState, analyticsError, refresh } = useDashboard();

  return (
    <section
      aria-labelledby="prompt-library-heading"
      className="rounded-16 border border-color-41 bg-color-36 p-20"
    >
      <div className="mb-16 flex items-center gap-8">
        <LuSparkles aria-hidden="true" className="text-accent" size={18} />
        <h2 id="prompt-library-heading" className="type-heading-lg-31 text-white">
          Prompt Library
        </h2>
      </div>

      <SectionState
        isLoading={analyticsState === 'loading'}
        error={analyticsState === 'error' ? analyticsError : null}
        isEmpty={analyticsState === 'success' && analytics.promptLibrary.length === 0}
        emptyTitle="No prompts saved yet."
        emptyDescription="Your saved prompts will appear here."
        onRetry={() => {
          void refresh();
        }}
      >
        <ul className="flex flex-col gap-8">
          {analytics.promptLibrary.map((item) => (
            <li key={item.id} className="rounded-10 border border-color-41 bg-color-23 px-12 py-12">
              <div className="mb-8 flex items-center gap-8">
                <span className="type-caption-12 rounded-4 bg-color-41 px-6 py-2 text-color-14">
                  {item.label}
                </span>
                <LuSparkles aria-hidden="true" className="text-accent" size={12} />
              </div>
              <p className="type-body-sm-2 text-white">{item.prompt}</p>
            </li>
          ))}
        </ul>
      </SectionState>
    </section>
  );
}

function AnnouncementsPanel() {
  const { announcements, announcementsState, announcementsError, refresh } = useDashboard();

  const visibleAnnouncements = announcements.filter(
    (item) => getAnnouncementTitle(item).length > 0,
  );

  return (
    <section
      aria-labelledby="announcements-feed-heading"
      className="rounded-16 border border-color-41 bg-color-36 p-20"
    >
      <div className="mb-16 flex items-center justify-between gap-12">
        <div className="flex items-center gap-8">
          <LuMegaphone aria-hidden="true" className="text-accent" size={18} />
          <h2 id="announcements-feed-heading" className="type-heading-lg-31 text-white">
            Announcements
          </h2>
        </div>
        <Link
          to="/announcements"
          className="type-body-sm-2 text-accent transition-colors duration-200 hover:text-white"
        >
          View all
        </Link>
      </div>

      <SectionState
        isLoading={announcementsState === 'loading'}
        error={announcementsState === 'error' ? announcementsError : null}
        isEmpty={announcementsState === 'success' && visibleAnnouncements.length === 0}
        emptyTitle="No announcements yet."
        onRetry={() => {
          void refresh();
        }}
      >
        <ul className="flex flex-col">
          {visibleAnnouncements.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-16 border-b border-color-41 py-12 last:border-b-0"
            >
              <p className="type-body-sm-2 text-white">{getAnnouncementTitle(item)}</p>
              <time dateTime={item.status} className="type-caption-12 shrink-0 text-color-14">
                {formatRelativeTime(item.status)}
              </time>
            </li>
          ))}
        </ul>
      </SectionState>
    </section>
  );
}

function RecentActivitiesPanel() {
  const { analytics, analyticsState, analyticsError, refresh } = useDashboard();

  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="rounded-16 border border-color-41 bg-color-36 p-20"
    >
      <h2 id="recent-activity-heading" className="type-heading-lg-31 text-white">
        Recent Activity
      </h2>

      <SectionState
        isLoading={analyticsState === 'loading'}
        error={analyticsState === 'error' ? analyticsError : null}
        isEmpty={analyticsState === 'success' && analytics.recentActivities.length === 0}
        emptyTitle="No recent activity yet."
        onRetry={() => {
          void refresh();
        }}
        className="mt-16"
      >
        <ul className="mt-16 flex flex-col">
          {analytics.recentActivities.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-16 border-b border-color-41 py-12 last:border-b-0"
            >
              <div>
                <p className="type-body-sm-2 text-white">{item.title}</p>
                {item.description ? (
                  <p className="type-caption-12 mt-4 text-color-14">{item.description}</p>
                ) : null}
              </div>
              {item.timestamp ? (
                <time dateTime={item.timestamp} className="type-caption-12 shrink-0 text-color-14">
                  {formatRelativeTime(item.timestamp)}
                </time>
              ) : null}
            </li>
          ))}
        </ul>
      </SectionState>
    </section>
  );
}

export function RecentActivityFeed() {
  return (
    <div className="grid gap-16 desktop:grid-cols-2">
      <PromptLibraryPanel />
      <AnnouncementsPanel />
      <div className="desktop:col-span-2">
        <RecentActivitiesPanel />
      </div>
    </div>
  );
}

export default RecentActivityFeed;
