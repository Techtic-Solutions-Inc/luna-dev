import {
  useEffect,
  useMemo,
  useState,
  type DragEvent,
  type FormEvent,
} from 'react';
import {
  addDays,
  formatTimeLabel,
  isSameDay,
  mapItemsToScheduledPosts,
  mediaImageUrl,
  startOfWeek,
  toContentPayload,
  toLocalInputValue,
  type ScheduledPostDisplay,
} from '../lib/contentCalendarDisplay';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  FacebookIcon,
  ImageIcon,
  InstagramIcon,
} from './icons';

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});
const HOUR_HEIGHT = 188;
const CARD_STACK = 92;
const DEFAULT_START_HOUR = 16;
const DEFAULT_END_HOUR = 19;
const DRAG_TYPE = 'application/x-content-calendar-id';

const fieldClassName =
  'box-border h-12 w-full rounded-full border border-[#E0D1C0] bg-white px-4 text-sm text-[#231A17] transition-colors duration-200 placeholder:text-[#A69789] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const textareaClassName =
  'box-border min-h-24 w-full rounded-[20px] border border-[#E0D1C0] bg-white px-4 py-3 text-sm text-[#231A17] transition-colors duration-200 placeholder:text-[#A69789] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export interface CalendarComponentProps {
  items: ContentCalendarItem[];
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
  initialCreateOpen?: boolean;
  onEditorClosed?: () => void;
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

function hourLabel(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return formatTimeLabel(date);
}

export default function CalendarComponent({
  items,
  createEntry,
  updateEntry,
  removeEntry,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
  initialCreateOpen = false,
  onEditorClosed,
}: CalendarComponentProps) {
  const posts = useMemo(() => mapItemsToScheduledPosts(items), [items]);

  const initialWeekStart = useMemo(() => {
    if (posts.length > 0) {
      return startOfWeek(posts[0].scheduledAt);
    }

    return startOfWeek(new Date());
  }, [posts]);

  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [editor, setEditor] = useState<EditorState | null>(() =>
    initialCreateOpen
      ? { ...emptyEditor, date: toLocalInputValue(new Date()) }
      : null,
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setWeekStart(initialWeekStart);
  }, [initialWeekStart]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const hourRange = useMemo(() => {
    if (posts.length === 0) {
      return { startHour: DEFAULT_START_HOUR, endHour: DEFAULT_END_HOUR };
    }

    const hours = posts.map((post) => post.scheduledAt.getHours());
    return {
      startHour: Math.min(DEFAULT_START_HOUR, ...hours),
      endHour: Math.max(DEFAULT_END_HOUR, ...hours),
    };
  }, [posts]);

  const hours = useMemo(() => {
    const values: number[] = [];
    for (let hour = hourRange.startHour; hour <= hourRange.endHour; hour += 1) {
      values.push(hour);
    }
    return values;
  }, [hourRange.endHour, hourRange.startHour]);

  const rowHeight = useMemo(() => {
    const maxStack = Math.max(
      1,
      ...hours.map((hour) =>
        Math.max(
          ...weekDays.map(
            (day) =>
              posts.filter(
                (post) =>
                  isSameDay(post.scheduledAt, day) &&
                  post.scheduledAt.getHours() === hour,
              ).length,
          ),
        ),
      ),
    );

    return Math.max(HOUR_HEIGHT, maxStack * CARD_STACK);
  }, [hours, posts, weekDays]);

  const monthLabel = MONTH_FORMAT.format(weekDays[3] ?? weekStart);
  const formBusy = isSaving || isDeleting;

  const openCreate = (date?: Date) => {
    setSelectedId(null);
    setEditor({
      ...emptyEditor,
      date: toLocalInputValue(date ?? new Date()),
    });
  };

  const openEdit = (item: ContentCalendarItem) => {
    setSelectedId(item.id);
    setEditor({
      id: item.id,
      title: item.title,
      date: toLocalInputValue(new Date(item.date)),
      content: item.content,
      description: item.description,
      full_name: item.full_name,
      phone: item.phone,
      link: item.link,
      is_active: item.is_active,
    });
  };

  const closeEditor = () => {
    setEditor(null);
    onEditorClosed?.();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editor?.date) {
      return;
    }

    const payload: ContentCalendarPayload = {
      title: editor.title.trim(),
      date: new Date(editor.date).toISOString(),
      content: editor.content.trim(),
      description: editor.description.trim(),
      full_name: editor.full_name.trim(),
      phone: editor.phone.trim(),
      link: editor.link.trim(),
      is_active: editor.is_active,
    };

    if (editor.id) {
      const updated = await updateEntry(editor.id, payload);
      if (updated) {
        closeEditor();
      }
      return;
    }

    const created = await createEntry(payload);
    if (created) {
      closeEditor();
    }
  };

  const onDelete = async () => {
    if (!editor?.id) {
      return;
    }

    const removed = await removeEntry(editor.id);
    if (removed) {
      setSelectedId(null);
      closeEditor();
    }
  };

  const onDropEntry = async (id: string, date: Date) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }

    const nextDate = new Date(item.date);
    if (Number.isNaN(nextDate.getTime())) {
      return;
    }

    nextDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    nextDate.setHours(date.getHours(), date.getMinutes(), 0, 0);

    await updateEntry(
      id,
      toContentPayload(item, { date: nextDate.toISOString() }),
    );
  };

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
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
                  <span className="text-[#C9A67D]">
                    {String(day.getDate()).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}

            {hours.map((hour) => (
              <HourRow
                key={hour}
                hour={hour}
                posts={posts}
                rowHeight={rowHeight}
                selectedId={selectedId}
                weekDays={weekDays}
                onCreate={openCreate}
                onDropEntry={onDropEntry}
                onSelect={openEdit}
              />
            ))}
          </div>
        </div>
      </div>

      {editor ? (
        <EditorDrawer
          editor={editor}
          error={mutationError}
          isBusy={formBusy}
          isDeleting={isDeleting}
          isSaving={isSaving}
          onClose={closeEditor}
          onDelete={() => void onDelete()}
          onSubmit={(event) => void onSubmit(event)}
          onUpdate={setEditor}
        />
      ) : null}
    </div>
  );
}

function HourRow({
  hour,
  posts,
  rowHeight,
  selectedId,
  weekDays,
  onCreate,
  onDropEntry,
  onSelect,
}: {
  hour: number;
  posts: ScheduledPostDisplay[];
  rowHeight: number;
  selectedId: string | null;
  weekDays: Date[];
  onCreate: (date: Date) => void;
  onDropEntry: (id: string, date: Date) => Promise<void>;
  onSelect: (item: ContentCalendarItem) => void;
}) {
  return (
    <>
      <div
        className="border-r border-t border-[#E0E0E0] bg-[#F7F2EC] px-2 py-3 text-[13px] text-[#828282]"
        style={{ minHeight: rowHeight }}
      >
        {hourLabel(hour)}
      </div>
      {weekDays.map((day) => {
        const hourPosts = posts.filter(
          (post) =>
            isSameDay(post.scheduledAt, day) &&
            post.scheduledAt.getHours() === hour,
        );

        return (
          <CalendarCell
            key={`${day.toISOString()}-${hour}`}
            day={day}
            hour={hour}
            posts={hourPosts}
            rowHeight={rowHeight}
            selectedId={selectedId}
            onCreate={onCreate}
            onDropEntry={onDropEntry}
            onSelect={onSelect}
          />
        );
      })}
    </>
  );
}

function CalendarCell({
  day,
  hour,
  posts,
  rowHeight,
  selectedId,
  onCreate,
  onDropEntry,
  onSelect,
}: {
  day: Date;
  hour: number;
  posts: ScheduledPostDisplay[];
  rowHeight: number;
  selectedId: string | null;
  onCreate: (date: Date) => void;
  onDropEntry: (id: string, date: Date) => Promise<void>;
  onSelect: (item: ContentCalendarItem) => void;
}) {
  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData(DRAG_TYPE);
    if (!id) {
      return;
    }

    const next = new Date(day);
    next.setHours(hour, 0, 0, 0);
    void onDropEntry(id, next);
  };

  return (
    <div
      className="relative min-h-[155px] border-r border-t border-[#E0E0E0] p-2 last:border-r-0 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary"
      style={{ minHeight: rowHeight }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <button
        type="button"
        aria-label={`Add scheduled post on ${day.toDateString()} at ${hourLabel(hour)}`}
        className="absolute inset-0 z-0 focus-ring"
        onClick={() => {
          const next = new Date(day);
          next.setHours(hour, 0, 0, 0);
          onCreate(next);
        }}
      />
      <div className="relative z-[1] space-y-2">
        {posts.map((post) => (
          <PostCard
            key={post.item.id}
            post={post}
            selected={post.item.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  selected,
  onSelect,
}: {
  post: ScheduledPostDisplay;
  selected: boolean;
  onSelect: (item: ContentCalendarItem) => void;
}) {
  const image = mediaImageUrl(post.item.link);

  const onDragStart = (event: DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData(DRAG_TYPE, post.item.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      aria-label={`Open details for ${post.item.title}`}
      onClick={() => onSelect(post.item)}
      className={`w-full rounded-[10px] border px-2 py-2 text-left shadow-[0_8px_24px_rgba(74,53,35,0.06)] transition-colors duration-200 focus-ring ${
        selected
          ? 'border-[#D7B089] bg-[#FFF7ED]'
          : 'border-[#F1E8DC] bg-white hover:bg-[#FFF9F2]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-[#8A8178]">
          {post.platform === 'instagram' ? (
            <InstagramIcon className="h-3.5 w-3.5" />
          ) : (
            <FacebookIcon className="h-3.5 w-3.5" />
          )}
          <span>{post.postType}</span>
        </div>
        <span className="text-[10px] text-[#8A8178]">{post.timeLabel}</span>
      </div>
      <div className="mt-2 flex items-start gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#EBDDCA]">
          {image ? (
            <img src={image} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-4 w-4 text-[#A88B6C]" />
          )}
        </div>
        <p className="min-w-0 flex-1 text-[13px] font-bold leading-4 text-[#2A201C]">
          {post.item.title}
        </p>
      </div>
    </button>
  );
}

function EditorDrawer({
  editor,
  error,
  isBusy,
  isDeleting,
  isSaving,
  onClose,
  onDelete,
  onSubmit,
  onUpdate,
}: {
  editor: EditorState;
  error: string | null;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onClose: () => void;
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

  return (
    <>
      <button
        type="button"
        aria-label="Close editor"
        className="fixed inset-0 z-40 bg-black/45 focus-ring"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-editor-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col bg-[#F5EFE8] text-[#211815] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        <form className="flex h-full flex-col" onSubmit={onSubmit}>
          <div className="flex items-start justify-between gap-3 border-b border-[#E5DACE] px-6 py-6 sm:px-8">
            <div>
              <h2
                id="calendar-editor-title"
                className="font-display text-[22px] text-[#211815]"
              >
                {editor.id ? 'Edit scheduled post' : 'Create scheduled post'}
              </h2>
              <p className="mt-1 text-sm text-[#76675B]">
                Drag, drop, edit, and curate your perfect content strategy.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close content editor"
              className="rounded-full p-2 text-[#5A4940] transition-colors duration-200 hover:bg-[#ECDDCC] focus-ring"
              onClick={onClose}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 sm:px-8">
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
            <label className="block text-sm text-[#6F6258]">
              Full name
              <input
                className={`mt-2 ${fieldClassName}`}
                value={editor.full_name}
                onChange={(event) => setField('full_name', event.target.value)}
              />
            </label>
            <label className="block text-sm text-[#6F6258]">
              Phone
              <input
                className={`mt-2 ${fieldClassName}`}
                value={editor.phone}
                onChange={(event) => setField('phone', event.target.value)}
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
      </aside>
    </>
  );
}
