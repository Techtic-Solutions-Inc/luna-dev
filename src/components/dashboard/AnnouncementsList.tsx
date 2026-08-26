import { useState, type FormEvent } from 'react';
import type {
  CreateDashboardNotificationRequest,
  DashboardAnnouncement,
  DashboardProfile,
} from '@/types/dashboard';
import { EmptyState } from '@/components/ui/EmptyState';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

interface AnnouncementsListProps {
  announcements: DashboardAnnouncement[];
  profile?: DashboardProfile;
  mutating?: boolean;
  onCreate?: (body: CreateDashboardNotificationRequest) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export function AnnouncementsList({
  announcements,
  profile,
  mutating = false,
  onCreate,
  onDelete,
}: AnnouncementsListProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!onCreate || !profile || !title.trim() || !message.trim()) return;
    await onCreate({
      announcement_title: title.trim(),
      announcement_content: message.trim(),
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone ?? '',
    });
    setTitle('');
    setMessage('');
  };

  return (
    <div className="flex flex-col gap-4">
      {onCreate && profile && (
        <form onSubmit={(e) => void handleCreate(e)} className="flex flex-col gap-3 rounded-control border border-line bg-card p-4">
          <TextField
            label="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={mutating}
            required
          />
          <TextField
            label="Notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={mutating}
            required
          />
          <Button type="submit" loading={mutating} disabled={!title.trim() || !message.trim()}>
            Send notification
          </Button>
        </form>
      )}

      {announcements.length === 0 ? (
        <EmptyState title="No content available" />
      ) : (
        <ul className="flex flex-col gap-3">
          {announcements.map((item) => (
            <li
              key={item.id}
              className="rounded-control border border-line bg-panel p-4 transition-colors hover:bg-card"
            >
              <div className="flex items-start justify-between gap-3">
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
                {onDelete && (
                  <button
                    type="button"
                    aria-label={`Delete notification ${item.title}`}
                    disabled={mutating}
                    onClick={() => void onDelete(item.id)}
                    className="shrink-0 rounded-control px-2 py-1 text-[14px] text-muted transition-colors hover:bg-card hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
