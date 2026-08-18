import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentCalendar } from '../hooks/useContentCalendar';
import { useDashboardAnnouncements, useDashboardAnalytics } from '../hooks/useDashboard';
import {
  activitiesFromCalendar,
  formatRelativeTimestamp,
} from '../lib/dashboardDisplay';
import { FileIcon, MegaphoneIcon, SparkIcon } from './icons';

interface RecentActivityFeedProps {
  onUsePrompt?: (value: string) => void;
}

function PromptLibrary({
  prompts,
  loading,
  onUsePrompt,
}: {
  prompts: string[];
  loading: boolean;
  onUsePrompt?: (value: string) => void;
}) {
  if (loading) {
    return (
      <div
        className="space-y-2"
        aria-busy="true"
        aria-label="Loading recent activity"
      >
        <span className="sr-only">Loading recent activity</span>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`prompt-skeleton-${index}`}
            className="h-[72px] animate-pulse rounded-[14px] bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <p
        className="rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-[#9A8F84]"
        role="status"
      >
        No recent activity yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {prompts.map((prompt) => (
        <li key={prompt}>
          <button
            type="button"
            onClick={() => onUsePrompt?.(prompt)}
            className="focus-ring w-full rounded-[14px] border border-white/10 bg-[#121110] px-4 py-3 text-left transition-colors duration-200 hover:border-primary/40 hover:bg-[#1C1916]"
            aria-label={`Use prompt: ${prompt}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[11px] text-primary">Post</span>
              <SparkIcon className="h-3 w-3 text-primary" />
            </div>
            <p className="text-[14px] leading-6 text-[#D8CEC3]">{prompt}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function RecentActivityFeed({
  onUsePrompt,
}: RecentActivityFeedProps) {
  const navigate = useNavigate();
  const announcements = useDashboardAnnouncements();
  const analytics = useDashboardAnalytics();
  const calendar = useContentCalendar();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const activityPrompts = useMemo(() => {
    if (analytics.data?.activities.length) {
      return analytics.data.activities
        .map((activity) => activity.title)
        .filter((value) => value.trim().length > 0)
        .slice(0, 4);
    }

    return activitiesFromCalendar(calendar.data)
      .map((activity) => activity.title)
      .slice(0, 4);
  }, [analytics.data, calendar.data]);

  const onCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const created = await announcements.createAnnouncement({
      title: trimmedTitle,
      description: description.trim(),
    });

    if (created) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="grid gap-4 lg:grid-cols-2"
    >
      <article className="rounded-[20px] border border-white/10 bg-[#14100d] p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileIcon className="h-4 w-4 text-primary" />
          <h2
            id="recent-activity-heading"
            className="font-display text-[22px] leading-none text-[#F8F2EB]"
          >
            Recent Activity
          </h2>
        </div>
        <PromptLibrary
          prompts={activityPrompts}
          loading={analytics.loading || calendar.loading}
          onUsePrompt={onUsePrompt}
        />
      </article>

      <article className="rounded-[20px] border border-white/10 bg-[#14100d] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MegaphoneIcon className="h-4 w-4 text-primary" />
            <h2 className="font-display text-[22px] leading-none text-[#F8F2EB]">
              Announcements
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/announcements')}
            className="focus-ring rounded-sm text-[13px] text-primary transition-colors duration-200 hover:text-[#D6B084]"
            aria-label="View all announcements"
          >
            View all
          </button>
        </div>

        <form onSubmit={(event) => void onCreate(event)} className="mb-4 space-y-3">
          <label className="block">
            <span className="sr-only">Announcement title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={160}
              placeholder="Share an announcement"
              aria-label="Announcement title"
              aria-invalid={announcements.mutationError ? true : undefined}
              aria-describedby={
                announcements.mutationError ? 'announcement-error' : undefined
              }
              className="box-border h-11 w-full rounded-full border border-white/10 bg-[#121110] px-4 text-[14px] text-[#F8F2EB] transition-colors duration-200 placeholder:text-[#7A7068] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>
          <label className="block">
            <span className="sr-only">Announcement description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              maxLength={400}
              placeholder="Add optional details"
              aria-label="Announcement description"
              className="box-border min-h-[72px] w-full rounded-[20px] border border-white/10 bg-[#121110] px-4 py-3 text-[14px] text-[#F8F2EB] transition-colors duration-200 placeholder:text-[#7A7068] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>
          <button
            type="submit"
            disabled={announcements.isSaving}
            className="focus-ring inline-flex h-10 items-center rounded-full bg-primary px-5 text-[13px] text-[#0b0b0b] transition-colors duration-200 hover:bg-[#d4b089] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Post announcement"
          >
            {announcements.isSaving ? 'Posting…' : 'Post announcement'}
          </button>
          {announcements.mutationError ? (
            <p id="announcement-error" role="alert" className="text-[13px] text-[#ffb032]">
              {announcements.mutationError}
            </p>
          ) : null}
        </form>

        {announcements.loading ? (
          <div
            className="space-y-2"
            aria-busy="true"
            aria-label="Loading announcements"
          >
            <span className="sr-only">Loading announcements</span>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`announcement-skeleton-${index}`}
                className="h-14 animate-pulse rounded-[14px] bg-white/5"
              />
            ))}
          </div>
        ) : announcements.data.length === 0 ? (
          <p
            className="rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-[#9A8F84]"
            role="status"
          >
            No announcements yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {announcements.data.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="text-[14px] text-[#F2E9DF]">{item.title}</span>
                <span className="shrink-0 text-[12px] text-[#8A7F73]">
                  {formatRelativeTimestamp(item.date || item.created_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
