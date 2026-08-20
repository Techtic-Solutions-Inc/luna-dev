import { LuFileText, LuSparkles } from 'react-icons/lu';
import type { ContentCalendarEntry, DashboardAnnouncement } from '../../../types/api';
import { formatRelativeTime } from '../../../lib/format';
import { inferContentType } from '../../../lib/calendarUtils';

interface RecentActivityFeedProps {
  announcements: DashboardAnnouncement[];
  calendarEntries: ContentCalendarEntry[];
}

interface ActivityItem {
  id: string;
  label: string;
  timestamp: string;
  kind: 'announcement' | 'calendar';
}

const buildActivityItems = (
  announcements: DashboardAnnouncement[],
  calendarEntries: ContentCalendarEntry[],
): ActivityItem[] => {
  const announcementItems: ActivityItem[] = announcements.map((item) => ({
    id: `announcement-${item.id}`,
    label: item.announcement_content || item.message || item.description,
    timestamp: item.status,
    kind: 'announcement' as const,
  }));

  const calendarItems: ActivityItem[] = calendarEntries.map((entry) => ({
    id: `calendar-${entry.id}`,
    label: `${inferContentType(entry.title, entry.description)} scheduled: ${entry.title}`,
    timestamp: formatRelativeTime(entry.updated_at || entry.created_at),
    kind: 'calendar' as const,
  }));

  return [...calendarItems, ...announcementItems].slice(0, 4);
};

const RecentActivityFeed = ({ announcements, calendarEntries }: RecentActivityFeedProps) => {
  const activities = buildActivityItems(announcements, calendarEntries);

  return (
    <section aria-labelledby="recent-activity-heading">
      <div className="mb-4 flex items-center gap-2">
        <LuFileText size={18} className="text-accent" aria-hidden="true" />
        <h2
          id="recent-activity-heading"
          className="font-garamond text-xl font-medium text-secondary"
        >
          Recent Activity
        </h2>
      </div>

      {activities.length === 0 ? (
        <p
          className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] px-5 py-8 text-center font-almarai text-sm text-[var(--color-57)]"
          role="status"
        >
          No recent activity to show.
        </p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id}>
              <article className="rounded-xl border border-[var(--color-41)] bg-[var(--color-36)] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-20)] px-2.5 py-0.5 font-almarai text-[10px] font-bold uppercase tracking-wide text-accent">
                    <LuSparkles size={10} aria-hidden="true" />
                    {activity.kind === 'calendar' ? 'Post' : 'Update'}
                  </span>
                  <time className="font-almarai text-xs text-[var(--color-57)]">
                    {activity.timestamp}
                  </time>
                </div>
                <p className="font-almarai text-sm leading-[20px] text-secondary">
                  {activity.label}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivityFeed;
