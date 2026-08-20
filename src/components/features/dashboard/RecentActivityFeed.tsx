import { LuMegaphone, LuSparkles } from 'react-icons/lu';
import Card from '../../ui/Card';
import type { ContentCalendarEntry, DashboardAnnouncement } from '../../../types/api';
import { announcementTitle, relativeTime } from '../../../lib/dashboard';
import SectionStatus from './SectionStatus';

interface RecentActivityFeedProps {
  announcements: DashboardAnnouncement[];
  calendarEntries: ContentCalendarEntry[];
}

export default function RecentActivityFeed({
  announcements,
  calendarEntries,
}: RecentActivityFeedProps) {
  const prompts = calendarEntries.filter(
    (entry) => entry.content.trim() !== '' || entry.description.trim() !== '' || entry.title.trim() !== '',
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section id="announcements" aria-labelledby="announcements-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="announcements-heading"
            className="flex items-center gap-2 font-garamond text-2xl font-medium text-secondary"
          >
            <LuMegaphone size={20} className="text-accent" aria-hidden="true" />
            Announcements
          </h2>
          <a href="#announcements" className="font-almarai text-sm text-accent hover:opacity-80">
            View all
          </a>
        </div>
        {announcements.length === 0 ? (
          <SectionStatus>No announcements at this time.</SectionStatus>
        ) : (
          <ul className="space-y-2">
            {announcements.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Card className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="font-almarai text-sm text-secondary">
                    {announcementTitle(item)}
                  </span>
                  <time
                    className="shrink-0 font-almarai text-xs text-[var(--color-57)]"
                    dateTime={item.created_at}
                  >
                    {relativeTime(item.created_at) || item.status || ''}
                  </time>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="content-library" aria-labelledby="prompt-library-heading">
        <h2
          id="prompt-library-heading"
          className="mb-4 flex items-center gap-2 font-garamond text-2xl font-medium text-secondary"
        >
          <LuSparkles size={20} className="text-accent" aria-hidden="true" />
          Prompt Library
        </h2>
        {prompts.length === 0 ? (
          <SectionStatus>Prompts will appear here as you generate content.</SectionStatus>
        ) : (
          <ul className="space-y-2">
            {prompts.slice(0, 4).map((entry) => (
              <li key={`prompt-${entry.id}`}>
                <Card className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-20)] px-2.5 py-0.5 font-almarai text-[10px] font-bold uppercase tracking-wide text-accent">
                    <LuSparkles size={10} aria-hidden="true" />
                    Post
                  </span>
                  <p className="mt-2 font-almarai text-sm leading-[20px] text-secondary">
                    {entry.content || entry.description || entry.title}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
