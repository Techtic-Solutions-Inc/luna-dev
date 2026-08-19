import { Link } from 'react-router-dom';
import type {
  DashboardActivityItem,
  DashboardAnnouncement,
  DashboardPromptItem,
} from '../types/api';
import { formatRelativeTimestamp } from '../lib/dashboardDisplay';
import { ListSparkIcon, MegaphoneIcon, SparkIcon } from './icons';

interface RecentActivityFeedProps {
  announcements: DashboardAnnouncement[];
  activities: DashboardActivityItem[];
  prompts: DashboardPromptItem[];
  loading?: boolean;
  announcementsError?: string | null;
  onRetryAnnouncements?: () => void;
}

interface FeedListItem {
  id: string;
  title: string;
  timestampLabel: string;
  timestampValue: string;
}

function FeedSkeleton() {
  return (
    <div
      className="grid gap-6 lg:grid-cols-2"
      aria-busy="true"
      aria-label="Loading activity feed"
    >
      <span className="sr-only">Loading announcements and prompts</span>
      <div className="space-y-3">
        <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`announcement-skeleton-${index}`}
            className="h-14 animate-pulse rounded-[12px] bg-white/10"
          />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-6 w-36 animate-pulse rounded bg-white/10" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`prompt-skeleton-${index}`}
            className="h-[72px] animate-pulse rounded-[12px] bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}

export default function RecentActivityFeed({
  announcements,
  activities,
  prompts,
  loading = false,
  announcementsError = null,
  onRetryAnnouncements,
}: RecentActivityFeedProps) {
  const feedItems: FeedListItem[] =
    announcements.length > 0
      ? announcements.map((item) => ({
          id: item.id,
          title: item.title,
          timestampLabel: formatRelativeTimestamp(item.created_at),
          timestampValue: item.created_at,
        }))
      : activities.map((item) => ({
          id: item.id,
          title: item.title || item.description,
          timestampLabel: formatRelativeTimestamp(item.created_at),
          timestampValue: item.created_at,
        }));

  if (loading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section aria-labelledby="dashboard-announcements-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MegaphoneIcon className="h-[18px] w-[18px] text-primary" />
            <h2
              id="dashboard-announcements-heading"
              className="font-display text-[22px] font-medium text-white sm:text-[24px]"
            >
              Announcements
            </h2>
          </div>
          <Link
            to="/announcements"
            className="focus-ring text-[13px] text-[#A6A4A2] transition-colors hover:text-white"
          >
            View all
          </Link>
        </div>

        {announcementsError ? (
          <div
            role="alert"
            className="mb-4 rounded-[12px] border border-[#ff5630]/40 bg-[#ff563028] px-4 py-3 text-sm text-white"
          >
            <p>{announcementsError}</p>
            {onRetryAnnouncements ? (
              <button
                type="button"
                onClick={onRetryAnnouncements}
                className="focus-ring mt-2 text-sm font-semibold text-primary underline-offset-2 hover:underline"
              >
                Try again
              </button>
            ) : null}
          </div>
        ) : null}

        {feedItems.length === 0 ? (
          <p className="rounded-[12px] border border-white/5 bg-[#14100d] px-4 py-5 text-sm text-[#A6A4A2]">
            No announcements yet.
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Recent announcements">
            {feedItems.map((item) => (
              <li key={item.id}>
                <article className="flex items-center justify-between gap-4 rounded-[12px] border border-white/5 bg-[#14100d] px-4 py-3.5">
                  <p className="text-[14px] text-white">{item.title}</p>
                  <time
                    dateTime={item.timestampValue}
                    className="shrink-0 text-[12px] text-[#646261]"
                  >
                    {item.timestampLabel}
                  </time>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="dashboard-prompt-library-heading">
        <div className="mb-4 flex items-center gap-2">
          <ListSparkIcon className="h-[18px] w-[18px] text-primary" />
          <h2
            id="dashboard-prompt-library-heading"
            className="font-display text-[22px] font-medium text-white sm:text-[24px]"
          >
            Prompt Library
          </h2>
        </div>

        {prompts.length === 0 ? (
          <p className="rounded-[12px] border border-white/5 bg-[#14100d] px-4 py-5 text-sm text-[#A6A4A2]">
            No prompts available yet.
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Prompt library">
            {prompts.map((prompt) => (
              <li key={prompt.id}>
                <article className="rounded-[12px] border border-white/5 bg-[#14100d] px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary">
                      {prompt.label}
                    </span>
                    <SparkIcon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="mt-2 text-[14px] leading-6 text-white">
                    {prompt.text}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
