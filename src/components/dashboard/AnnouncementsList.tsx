import type { DashboardAnnouncement } from '@/types/dashboard';
import { EmptyState } from '@/components/ui/EmptyState';

interface AnnouncementsListProps {
  announcements: DashboardAnnouncement[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  if (announcements.length === 0) {
    return <EmptyState title="No content available" />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {announcements.map((item) => (
        <li
          key={item.id}
          className="rounded-control border border-line bg-panel p-4 transition-colors hover:bg-card"
        >
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden="true"
            >
              <path
                d="M3 8.5v3a1.5 1.5 0 001.5 1.5h1.05l2.7 2.7a1 1 0 001.7-.7V5a1 1 0 00-1.7-.7l-2.7 2.7H4.5A1.5 1.5 0 003 8.5z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M13 7.5a3 3 0 010 5M15.5 5a6 6 0 010 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <h3 className="text-[16px] font-medium leading-6 text-ink">{item.title}</h3>
              {item.message && (
                <p className="mt-1 text-[14px] leading-5 text-muted">{item.message}</p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
