import { MegaphoneIcon } from '@/components/icons';
import type { DashboardAnnouncement } from '@/types/api';
import { formatAnnouncementTimestamp } from '@/utils/dashboard';
import { DashboardSectionEmptyState } from '@/components/dashboard/DashboardSectionEmptyState';

interface AnnouncementsFeedListProps {
  items: DashboardAnnouncement[];
  loading?: boolean;
}

export function AnnouncementsFeedList({
  items,
  loading = false,
}: AnnouncementsFeedListProps) {
  return (
    <section
      aria-labelledby="dashboard-announcements-heading"
      className="rounded-[16px] border border-white/5 bg-[#1f1b17]/80 p-5 md:rounded-[20px] md:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MegaphoneIcon className="h-4 w-4 text-primary" />
          <h2
            id="dashboard-announcements-heading"
            className="font-display text-[20px] text-white sm:text-[22px]"
          >
            Announcements
          </h2>
        </div>
        <span className="text-sm text-primary underline underline-offset-4">
          View all
        </span>
      </div>

      {loading ? (
        <ul className="space-y-0" aria-busy="true" aria-label="Loading announcements">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={`announcement-skeleton-${index}`}
              className="border-b border-white/5 py-4 last:border-0"
            >
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-16 animate-pulse rounded bg-white/10" />
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <DashboardSectionEmptyState message="No announcements yet." />
      ) : (
        <ul className="divide-y divide-white/5">
          {items.slice(0, 5).map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm leading-6 text-white underline-offset-2 hover:underline"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="text-sm leading-6 text-white">{item.title}</p>
                )}
                {item.content ? (
                  <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#858585]">
                    {item.content}
                  </p>
                ) : null}
              </div>
              <time
                dateTime={item.created_at}
                className="shrink-0 text-[12px] text-[#858585]"
              >
                {formatAnnouncementTimestamp(item.created_at)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
