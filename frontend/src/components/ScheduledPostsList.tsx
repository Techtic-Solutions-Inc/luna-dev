import CalendarComponent from './CalendarComponent';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';

interface ScheduledPostsListProps {
  items: ContentCalendarItem[];
  loading?: boolean;
  createEntry: (
    body: ContentCalendarPayload,
  ) => Promise<ContentCalendarItem | null>;
  updateEntry: (
    id: string,
    body: ContentCalendarPayload,
  ) => Promise<ContentCalendarItem | null>;
  removeEntry: (id: string) => Promise<boolean>;
  isSaving?: boolean;
  isDeleting?: boolean;
  mutationError?: string | null;
  onCreate?: () => void;
}

function CalendarSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white"
      aria-busy="true"
      aria-label="Loading scheduled posts"
    >
      <span className="sr-only">Loading scheduled posts</span>
      <div className="flex items-center justify-between border-b border-[#E5DACE] px-5 py-4 md:px-6">
        <div className="h-6 w-32 animate-pulse rounded bg-[#EAEAEA]" />
        <div className="flex gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#EAEAEA]" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#EAEAEA]" />
        </div>
      </div>
      <div className="grid min-h-[420px] grid-cols-7 bg-[#F7F2EC]">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={`skeleton-col-${index}`}
            className="border-r border-[#E0E0E0] last:border-r-0"
          >
            <div className="flex items-center justify-between px-3 py-3">
              <div className="h-4 w-8 animate-pulse rounded bg-[#D8CEC1]" />
              <div className="h-4 w-5 animate-pulse rounded bg-[#E4DACE]" />
            </div>
            <div className="space-y-3 p-3">
              <div className="h-20 animate-pulse rounded-[12px] bg-white" />
              <div className="h-20 animate-pulse rounded-[12px] bg-white/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScheduledPostsList({
  items,
  loading = false,
  createEntry,
  updateEntry,
  removeEntry,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
  onCreate,
}: ScheduledPostsListProps) {
  if (loading) {
    return <CalendarSkeleton />;
  }

  if (items.length === 0) {
    return (
      <section
        aria-label="Scheduled posts"
        className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
      >
        <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
          <p className="font-display text-[28px] text-[#322722]">
            No scheduled posts yet
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#756B63]">
            Create your first calendar entry to start planning social posts and
            personalized market updates.
          </p>
          {onCreate ? (
            <button
              type="button"
              onClick={onCreate}
              className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d]"
            >
              Create scheduled post
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Scheduled posts">
      <CalendarComponent
        items={items}
        createEntry={createEntry}
        updateEntry={updateEntry}
        removeEntry={removeEntry}
        isSaving={isSaving}
        isDeleting={isDeleting}
        mutationError={mutationError}
      />
    </section>
  );
}
