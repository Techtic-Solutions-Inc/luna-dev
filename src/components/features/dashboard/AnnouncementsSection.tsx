import { LuMegaphone } from 'react-icons/lu';
import type { DashboardAnnouncement } from '../../../types/api';

interface AnnouncementsSectionProps {
  announcements: DashboardAnnouncement[];
}

const AnnouncementsSection = ({ announcements }: AnnouncementsSectionProps) => (
  <section aria-labelledby="announcements-heading">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <LuMegaphone size={18} className="text-accent" aria-hidden="true" />
        <h2 id="announcements-heading" className="font-garamond text-xl font-medium text-secondary">
          Announcements
        </h2>
      </div>
      <button
        type="button"
        className="font-almarai text-sm text-accent transition-opacity hover:opacity-80"
        aria-label="View all announcements"
      >
        View all
      </button>
    </div>

    {announcements.length === 0 ? (
      <p
        className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] px-5 py-8 text-center font-almarai text-sm text-[var(--color-57)]"
        role="status"
      >
        No announcements at this time.
      </p>
    ) : (
      <ul className="space-y-2">
        {announcements.slice(0, 5).map((item) => (
          <li key={item.id}>
            <article className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-41)] bg-[var(--color-36)] px-4 py-3.5">
              <span className="font-almarai text-sm text-secondary">
                {item.announcement_title || item.title}
              </span>
              <time className="shrink-0 font-almarai text-xs text-[var(--color-57)]">
                {item.status}
              </time>
            </article>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default AnnouncementsSection;
