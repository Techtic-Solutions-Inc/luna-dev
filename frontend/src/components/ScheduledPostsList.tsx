import CalendarComponent from './CalendarComponent';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';

interface ScheduledPostsListProps {
  items: ContentCalendarItem[];
  loading?: boolean;
  selectedEntryId?: string;
  onCloseDetails?: () => void;
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
}

function CalendarSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white"
      aria-busy="true"
      aria-label="Loading scheduled posts"
    >
      <span className="sr-only">Loading scheduled posts</span>
      <div className="flex items-center justify-between border-b border-[#E5DACE] px-6 py-[18px]">
        <div className="h-6 w-32 animate-pulse rounded bg-[#EAEAEA]" />
        <div className="flex gap-1">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#EAEAEA]" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#EAEAEA]" />
        </div>
      </div>
      <div className="grid min-h-[420px] grid-cols-[96px_repeat(7,minmax(0,1fr))] bg-[#F7F2EC] lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]">
        {Array.from({ length: 8 }).map((_, index) => (
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
  selectedEntryId,
  onCloseDetails,
  createEntry,
  updateEntry,
  removeEntry,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
}: ScheduledPostsListProps) {
  if (loading && !selectedEntryId) {
    return <CalendarSkeleton />;
  }

  return (
    <section aria-label="Scheduled posts">
      <CalendarComponent
        items={items}
        selectedEntryId={selectedEntryId}
        onCloseDetails={onCloseDetails}
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
