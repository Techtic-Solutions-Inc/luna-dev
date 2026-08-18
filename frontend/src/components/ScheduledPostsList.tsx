import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import {
  addDays,
  buildTimeSlots,
  formatContentBadge,
  isSameDay,
  mapItemsToScheduledPosts,
  startOfWeek,
  timeLabelMatchesPost,
} from '../lib/contentCalendarDisplay';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';
import ContentList from './ContentList';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  ImageIcon,
  SlidersIcon,
} from './icons';

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

interface ScheduledPostsListProps {
  items: ContentCalendarItem[];
  loading?: boolean;
  onItemClick?: (item: ContentCalendarItem) => void;
  createEntry?: (
    body: ContentCalendarPayload,
  ) => Promise<boolean | ContentCalendarItem | null>;
  updateEntry?: (
    id: string,
    body: ContentCalendarPayload,
  ) => Promise<boolean | ContentCalendarItem | null>;
  removeEntry?: (id: string) => Promise<boolean>;
  isSaving?: boolean;
  isDeleting?: boolean;
  mutationError?: string | null;
}

interface EditorState {
  id?: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
  is_active: boolean;
}

const emptyEditor: EditorState = {
  title: '',
  date: '',
  content: '',
  description: '',
  full_name: '',
  phone: '',
  link: '',
  is_active: true,
};

const fieldClassName =
  'box-border h-12 w-full rounded-full border border-[#E0D1C0] bg-white px-4 text-sm text-[#231A17] transition-colors duration-200 placeholder:text-[#A69789] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const textareaClassName =
  'box-border min-h-24 w-full rounded-[20px] border border-[#E0D1C0] bg-white px-4 py-3 text-sm text-[#231A17] transition-colors duration-200 placeholder:text-[#A69789] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function toLocalInputValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

function toPayload(editor: EditorState): ContentCalendarPayload {
  return {
    title: editor.title.trim(),
    date: new Date(editor.date).toISOString(),
    content: editor.content.trim(),
    description: editor.description.trim(),
    full_name: editor.full_name.trim(),
    phone: editor.phone.trim(),
    link: editor.link.trim(),
    is_active: editor.is_active,
  };
}

function mediaUrl(value: string): string | null {
  const candidate = value.trim();
  if (!candidate) {
    return null;
  }

  if (/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(candidate)) {
    return candidate;
  }

  return null;
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
  onItemClick,
  createEntry,
  updateEntry,
  removeEntry,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
}: ScheduledPostsListProps) {
  const posts = useMemo(() => mapItemsToScheduledPosts(items), [items]);
  const canMutate = Boolean(createEntry && updateEntry && removeEntry);

  const initialWeekStart = useMemo(() => {
    if (posts.length > 0) {
      return startOfWeek(posts[0].scheduledAt);
    }

    return startOfWeek(new Date());
  }, [posts]);

  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    setWeekStart(initialWeekStart);
  }, [initialWeekStart]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const timeSlots = useMemo(() => buildTimeSlots(posts), [posts]);

  const postsByCell = useMemo(() => {
    const map = new Map<string, ReturnType<typeof mapItemsToScheduledPosts>>();

    for (const post of posts) {
      const dayIndex = weekDays.findIndex((day) =>
        isSameDay(day, post.scheduledAt),
      );

      if (dayIndex === -1) {
        continue;
      }

      for (const slot of timeSlots) {
        if (timeLabelMatchesPost(slot, post)) {
          const key = `${dayIndex}-${slot}`;
          const existing = map.get(key) ?? [];
          existing.push(post);
          map.set(key, existing);
          break;
        }
      }
    }

    return map;
  }, [posts, timeSlots, weekDays]);

  const selectedEntry = items.find((entry) => entry.id === selectedId) ?? null;
  const formBusy = isSaving || isDeleting;
  const monthLabel = MONTH_FORMAT.format(weekDays[3] ?? weekStart);

  const openDetails = (entry: ContentCalendarItem) => {
    if (onItemClick) {
      onItemClick(entry);
      return;
    }

    if (!canMutate) {
      return;
    }

    setSelectedId(entry.id);
    setIsCustomizing(false);
    setEditor({
      id: entry.id,
      title: entry.title,
      date: toLocalInputValue(new Date(entry.date)),
      content: entry.content,
      description: entry.description,
      full_name: entry.full_name,
      phone: entry.phone,
      link: entry.link,
      is_active: entry.is_active,
    });
  };

  const openCreate = (date?: Date) => {
    if (!canMutate || !createEntry) {
      return;
    }

    setSelectedId(null);
    setIsCustomizing(true);
    setEditor({
      ...emptyEditor,
      date: toLocalInputValue(date ?? new Date()),
    });
  };

  const closeEditor = () => {
    setEditor(null);
    setIsCustomizing(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editor?.date || !canMutate || !createEntry || !updateEntry) {
      return;
    }

    const payload = toPayload(editor);

    if (editor.id) {
      const updated = await updateEntry(editor.id, payload);
      if (updated) {
        setIsCustomizing(false);
      }
      return;
    }

    const created = await createEntry(payload);
    if (created) {
      closeEditor();
    }
  };

  const onDelete = async () => {
    if (!editor?.id || !canMutate || !removeEntry) {
      return;
    }

    const removed = await removeEntry(editor.id);
    if (removed) {
      setSelectedId(null);
      closeEditor();
    }
  };

  if (loading) {
    return <CalendarSkeleton />;
  }

  const header = (
    <div className="flex items-center justify-between border-b border-[#E5DACE] bg-white px-5 py-4 md:px-6">
      <h2 className="text-[20px] font-medium tracking-[-0.01em] text-[#302520] md:text-[22px]">
        {monthLabel}
      </h2>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setWeekStart((value) => addDays(value, -7))}
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#3D322B] transition-colors duration-200 hover:bg-[#E6DCCE]"
          aria-label="Previous week"
        >
          <ChevronLeftIcon className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={() => setWeekStart((value) => addDays(value, 7))}
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#3D322B] transition-colors duration-200 hover:bg-[#E6DCCE]"
          aria-label="Next week"
        >
          <ChevronRightIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );

  return (
    <section aria-label="Scheduled posts calendar">
      <div className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
        {header}

        {posts.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
            <ContentList
              items={[]}
              emptyMessage="No scheduled posts yet"
              emptyTone="light"
            />
            {canMutate ? (
              <button
                type="button"
                onClick={() => openCreate()}
                className="focus-ring mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d]"
              >
                Create scheduled post
              </button>
            ) : null}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[72px_repeat(7,minmax(110px,1fr))]">
                <div className="border-r border-[#E0E0E0] bg-[#F7F2EC]" />
                {weekDays.map((day, index) => (
                  <div
                    key={day.toISOString()}
                    className="border-r border-[#E0E0E0] bg-[#F7F2EC] px-3 py-3 last:border-r-0"
                  >
                    <div className="flex items-center justify-between text-[13px] text-[#302520]">
                      <span>{WEEKDAY_LABELS[index]}</span>
                      <span className="text-primary">
                        {String(day.getDate()).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}

                {timeSlots.map((timeLabel) => (
                  <TimeRow
                    key={timeLabel}
                    canCreate={canMutate}
                    onCreate={openCreate}
                    onSelect={openDetails}
                    postsByCell={postsByCell}
                    selectedId={selectedId}
                    timeLabel={timeLabel}
                    weekDays={weekDays}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {editor ? (
        <PostDrawer
          editor={editor}
          entry={selectedEntry}
          error={mutationError}
          isBusy={formBusy}
          isCustomizing={isCustomizing || !editor.id}
          isDeleting={isDeleting}
          isSaving={isSaving}
          onClose={closeEditor}
          onCustomize={() => setIsCustomizing(true)}
          onDelete={() => void onDelete()}
          onSubmit={(event) => void onSubmit(event)}
          onUpdate={setEditor}
        />
      ) : null}
    </section>
  );
}

function TimeRow({
  canCreate,
  onCreate,
  onSelect,
  postsByCell,
  selectedId,
  timeLabel,
  weekDays,
}: {
  canCreate: boolean;
  onCreate: (date: Date) => void;
  onSelect: (entry: ContentCalendarItem) => void;
  postsByCell: Map<string, ReturnType<typeof mapItemsToScheduledPosts>>;
  selectedId: string | null;
  timeLabel: string;
  weekDays: Date[];
}) {
  return (
    <>
      <div className="border-r border-t border-[#E0E0E0] bg-[#F7F2EC] px-2 py-3 text-[13px] text-[#828282]">
        {timeLabel}
      </div>
      {weekDays.map((day, index) => {
        const posts = postsByCell.get(`${index}-${timeLabel}`) ?? [];

        return (
          <div
            key={`${day.toISOString()}-${timeLabel}`}
            className="relative min-h-[180px] border-r border-t border-[#E0E0E0] p-2 last:border-r-0"
          >
            {canCreate ? (
              <button
                type="button"
                aria-label={`Add scheduled post on ${day.toDateString()} at ${timeLabel}`}
                className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                onClick={() => {
                  const next = new Date(day);
                  const match = timeLabel.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
                  if (match) {
                    let hour = Number(match[1]);
                    const minute = Number(match[2]);
                    const meridiem = match[3].toUpperCase();
                    if (meridiem === 'PM' && hour < 12) {
                      hour += 12;
                    }
                    if (meridiem === 'AM' && hour === 12) {
                      hour = 0;
                    }
                    next.setHours(hour, minute, 0, 0);
                  }
                  onCreate(next);
                }}
              />
            ) : null}
            {posts.length > 0 ? (
              <div className="relative z-[1]">
                <ContentList
                  items={posts}
                  variant="calendar-card"
                  selectedId={selectedId}
                  onItemClick={onSelect}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function PostDrawer({
  editor,
  entry,
  error,
  isBusy,
  isCustomizing,
  isDeleting,
  isSaving,
  onClose,
  onCustomize,
  onDelete,
  onSubmit,
  onUpdate,
}: {
  editor: EditorState;
  entry: ContentCalendarItem | null;
  error: string | null;
  isBusy: boolean;
  isCustomizing: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onDelete: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: (value: EditorState) => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const setField = <Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) => {
    onUpdate({ ...editor, [key]: value });
  };

  const badge = entry ? formatContentBadge(entry, 0) : null;
  const image = mediaUrl(editor.link);
  const copyCaption = async () => {
    const text = editor.content || entry?.content || '';
    if (text && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close details"
        className="fixed inset-0 z-40 bg-black/45 focus-ring"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-details-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col bg-[#F5EFE8] text-[#211815] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-start justify-between gap-3 px-6 pb-4 pt-6 sm:px-8">
          <div>
            <h2
              id="calendar-details-title"
              className="font-display text-[28px] font-semibold leading-8 text-[#211815]"
            >
              {editor.title || 'Create Content'}
            </h2>
            {badge ? (
              <span className="mt-3 inline-flex rounded-full bg-[#F3DDD0] px-3 py-1 text-[12px] text-[#8A3B32]">
                {badge}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close content details"
            className="rounded-full p-2 text-[#5A4940] transition-colors duration-200 hover:bg-[#ECDDCC] focus-ring"
            onClick={onClose}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {isCustomizing ? (
          <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-2 sm:px-8">
              <label className="block text-sm text-[#6F6258]">
                Content title
                <input
                  className={`mt-2 ${fieldClassName}`}
                  value={editor.title}
                  onChange={(event) => setField('title', event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm text-[#6F6258]">
                Scheduled time
                <input
                  className={`mt-2 ${fieldClassName}`}
                  type="datetime-local"
                  value={editor.date}
                  onChange={(event) => setField('date', event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm text-[#6F6258]">
                Image or post link
                <input
                  className={`mt-2 ${fieldClassName}`}
                  value={editor.link}
                  onChange={(event) => setField('link', event.target.value)}
                />
              </label>
              <label className="block text-sm text-[#6F6258]">
                Description
                <textarea
                  className={`mt-2 ${textareaClassName}`}
                  value={editor.description}
                  onChange={(event) =>
                    setField('description', event.target.value)
                  }
                />
              </label>
              <label className="block text-sm text-[#6F6258]">
                Caption
                <textarea
                  className={`mt-2 ${textareaClassName}`}
                  value={editor.content}
                  onChange={(event) => setField('content', event.target.value)}
                />
              </label>
              {error ? (
                <p
                  role="alert"
                  className="rounded-[16px] border border-[#D4A4A1] bg-[#FFF2F1] px-4 py-3 text-sm text-[#8D312A]"
                >
                  {error}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-[#E5DACE] px-6 py-5 sm:px-8">
              <button
                type="submit"
                disabled={isBusy || !editor.date}
                className="inline-flex h-11 min-w-[152px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving
                  ? 'Saving'
                  : editor.id
                    ? 'Save changes'
                    : 'Create entry'}
              </button>
              {editor.id ? (
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={isBusy}
                  className="inline-flex h-11 min-w-[152px] items-center justify-center rounded-full border border-[#C78272] bg-transparent px-5 text-sm font-medium text-[#AD5449] transition-colors duration-200 hover:bg-[#FFF0EE] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting' : 'Delete entry'}
                </button>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 sm:px-8">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCustomize}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1A1919] px-4 text-sm text-white transition-colors duration-200 hover:bg-black focus-ring"
              >
                <SlidersIcon className="h-4 w-4" />
                Customize
              </button>
              <button
                type="button"
                onClick={() => void copyCaption()}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm text-white transition-colors duration-200 hover:bg-[#b48a5d] focus-ring"
              >
                <CopyIcon className="h-4 w-4" />
                Copy Caption
              </button>
              {editor.link ? (
                <a
                  href={editor.link}
                  download
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-primary px-4 text-sm text-primary transition-colors duration-200 hover:bg-[#F3E7D8] focus-ring"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download
                </a>
              ) : null}
            </div>

            <div className="relative mt-5 flex min-h-[280px] items-center justify-center rounded-[18px] bg-[#EFE8E1]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5A4940]">
                <ChevronLeftIcon className="h-4 w-4" />
              </span>
              {image ? (
                <img
                  src={image}
                  alt={editor.title}
                  className="max-h-[360px] w-auto max-w-[220px] rounded-md object-cover"
                />
              ) : (
                <div className="flex h-[220px] w-[140px] items-center justify-center rounded-md bg-[#E2D5C6] text-[#A88B6C]">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5A4940]">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[12px] text-[#6F6258]">
                1/1
              </p>
            </div>

            {editor.description ? (
              <section className="mt-6">
                <h3 className="font-display text-[20px] text-[#211815]">
                  About This Template
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#6F6258]">
                  {editor.description}
                </p>
              </section>
            ) : null}

            {editor.content ? (
              <section className="mt-6 rounded-[18px] bg-[#111111] p-4 text-white">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium">Caption</h3>
                  <button
                    type="button"
                    onClick={() => void copyCaption()}
                    className="inline-flex h-8 items-center gap-2 rounded-full bg-primary px-3 text-xs text-white focus-ring"
                  >
                    <CopyIcon className="h-3.5 w-3.5" />
                    Copy Caption
                  </button>
                </div>
                <p className="text-sm leading-6 text-white/90">{editor.content}</p>
              </section>
            ) : null}
          </div>
        )}
      </aside>
    </>
  );
}
