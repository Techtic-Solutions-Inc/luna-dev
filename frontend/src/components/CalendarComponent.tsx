import {
  useEffect,
  useMemo,
  useState,
  type DragEvent,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDays,
  emptyCalendarEditor,
  formatTimeLabel,
  isSameDay,
  mapItemsToScheduledPosts,
  mediaImageUrl,
  startOfWeek,
  toContentPayload,
  toLocalInputValue,
  type CalendarEditorState,
  type ScheduledPostDisplay,
} from '../lib/contentCalendarDisplay';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';
import ContentCalendarDetails from './ContentCalendarDetails';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FacebookIcon,
  ImageIcon,
  InstagramIcon,
} from './icons';

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});
const PIXELS_PER_HOUR = 220;
const CARD_HEIGHT = 90;
const CARD_GAP = 8;
const DEFAULT_START_HOUR = 17;
const DEFAULT_END_HOUR = 19;
const DRAG_TYPE = 'application/x-content-calendar-id';

export interface CalendarComponentProps {
  items: ContentCalendarItem[];
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

type DrawerState =
  | { view: 'details'; itemId: string }
  | { view: 'editor'; editor: CalendarEditorState };

function hourLabel(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return formatTimeLabel(date);
}

function timeFromOffset(offsetY: number, day: Date, startHour: number): Date {
  const hoursFloat = Math.max(0, offsetY) / PIXELS_PER_HOUR;
  const totalMinutes =
    Math.round((startHour * 60 + hoursFloat * 60) / 15) * 15;
  const next = new Date(day);
  next.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
  return next;
}

interface PositionedPost {
  post: ScheduledPostDisplay;
  top: number;
}

function positionPosts(
  posts: ScheduledPostDisplay[],
  startHour: number,
): PositionedPost[] {
  const sorted = [...posts].sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime(),
  );
  const positioned: PositionedPost[] = [];
  let lastBottom = Number.NEGATIVE_INFINITY;

  for (const post of sorted) {
    const minutes =
      post.scheduledAt.getHours() * 60 + post.scheduledAt.getMinutes();
    const rawTop = ((minutes - startHour * 60) / 60) * PIXELS_PER_HOUR;
    const top = Math.max(rawTop, lastBottom + CARD_GAP);
    positioned.push({ post, top });
    lastBottom = top + CARD_HEIGHT;
  }

  return positioned;
}

export default function CalendarComponent({
  items,
  selectedEntryId,
  onCloseDetails,
  createEntry,
  updateEntry,
  removeEntry,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
}: CalendarComponentProps) {
  const navigate = useNavigate();
  const posts = useMemo(() => mapItemsToScheduledPosts(items), [items]);

  const initialWeekStart = useMemo(() => {
    if (posts.length > 0) {
      return startOfWeek(posts[0].scheduledAt);
    }

    return startOfWeek(new Date());
  }, [posts]);

  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [drawer, setDrawer] = useState<DrawerState | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<ContentCalendarItem | null>(
    null,
  );

  useEffect(() => {
    setWeekStart(initialWeekStart);
  }, [initialWeekStart]);

  useEffect(() => {
    if (!selectedEntryId) {
      return;
    }

    const item = items.find((entry) => entry.id === selectedEntryId);
    if (item) {
      setSelectedId(item.id);
      setPreviewItem(item);
      setDrawer({ view: 'details', itemId: item.id });
    }
  }, [items, selectedEntryId]);

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
      startHour: Math.min(16, ...hours),
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

  const hourSpan = Math.max(hourRange.endHour - hourRange.startHour, 1);
  const bodyHeight = hourSpan * PIXELS_PER_HOUR + CARD_HEIGHT;

  const monthLabel = MONTH_FORMAT.format(weekDays[3] ?? weekStart);
  const formBusy = isSaving || isDeleting;
  const selectedItem =
    items.find((entry) => entry.id === selectedId) ??
    previewItem ??
    (drawer?.view === 'details'
      ? (items.find((entry) => entry.id === drawer.itemId) ?? null)
      : null);

  const openCreate = (date?: Date) => {
    setSelectedId(null);
    setPreviewItem(null);
    setDrawer({
      view: 'editor',
      editor: {
        ...emptyCalendarEditor,
        date: toLocalInputValue(date ?? new Date()),
      },
    });
  };

  const openDetails = (item: ContentCalendarItem) => {
    setSelectedId(item.id);
    setPreviewItem(item);
    setDrawer({ view: 'details', itemId: item.id });
    navigate(`/content-calendar/details/${item.id}`);
  };

  const openEdit = (item: ContentCalendarItem) => {
    setSelectedId(item.id);
    setPreviewItem(item);
    setDrawer({
      view: 'editor',
      editor: {
        id: item.id,
        title: item.title,
        date: toLocalInputValue(new Date(item.date)),
        content: item.content,
        description: item.description,
        full_name: item.full_name,
        phone: item.phone,
        link: item.link,
        is_active: item.is_active,
      },
    });
  };

  const closeDrawer = () => {
    setDrawer(null);
    setPreviewItem(null);
    if (selectedEntryId) {
      onCloseDetails?.();
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!drawer || drawer.view !== 'editor' || !drawer.editor.date) {
      return;
    }

    const payload: ContentCalendarPayload = {
      title: drawer.editor.title.trim(),
      date: new Date(drawer.editor.date).toISOString(),
      content: drawer.editor.content.trim(),
      description: drawer.editor.description.trim(),
      full_name: drawer.editor.full_name.trim(),
      phone: drawer.editor.phone.trim(),
      link: drawer.editor.link.trim(),
      is_active: drawer.editor.is_active,
    };

    if (drawer.editor.id) {
      const updated = await updateEntry(drawer.editor.id, payload);
      if (updated) {
        setSelectedId(updated.id);
        setPreviewItem(updated);
        setDrawer({ view: 'details', itemId: updated.id });
        navigate(`/content-calendar/details/${updated.id}`);
      }
      return;
    }

    const created = await createEntry(payload);
    if (created) {
      setSelectedId(created.id);
      setPreviewItem(created);
      setDrawer({ view: 'details', itemId: created.id });
      navigate(`/content-calendar/details/${created.id}`);
    }
  };

  const onDelete = async () => {
    if (!drawer || drawer.view !== 'editor' || !drawer.editor.id) {
      return;
    }

    const removed = await removeEntry(drawer.editor.id);
    if (removed) {
      setSelectedId(null);
      closeDrawer();
    }
  };

  const onDropEntry = async (id: string, date: Date) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }

    await updateEntry(id, toContentPayload(item, { date: date.toISOString() }));
  };

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#E5DACE] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-[#E5DACE] bg-white px-6 py-[18px]">
        <h2 className="text-[22px] font-medium leading-7 tracking-[-0.01em] text-[#333333]">
          {monthLabel}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setWeekStart((value) => addDays(value, -7))}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#333333] transition-colors duration-200 hover:bg-[#E6DCCE]"
            aria-label="Previous week"
          >
            <ChevronLeftIcon className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => setWeekStart((value) => addDays(value, 7))}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#333333] transition-colors duration-200 hover:bg-[#E6DCCE]"
            aria-label="Next week"
          >
            <ChevronRightIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div
          role="status"
          className="border-b border-[#E5DACE] bg-[#F7F2EC] px-6 py-3 text-center"
        >
          <p className="font-display text-[20px] text-[#322722]">
            No scheduled posts yet
          </p>
          <p className="mt-1 text-[13px] leading-5 text-[#756B63]">
            Click a time slot to create your first calendar entry, or use the
            button below.
          </p>
          <button
            type="button"
            onClick={() => openCreate()}
            className="focus-ring mt-3 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d]"
          >
            Create scheduled post
          </button>
        </div>
      ) : null}

      <div className="overflow-x-auto bg-[#F9F5F2]">
        <div
          role="grid"
          aria-label="Weekly scheduled posts"
          className="min-w-[1100px]"
        >
          <div className="grid grid-cols-[96px_repeat(7,minmax(120px,1fr))] lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]">
            <div className="border-r border-[#E0E0E0] bg-[#F7F2EC]" />
            {weekDays.map((day, index) => (
              <div
                key={day.toISOString()}
                role="columnheader"
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
          </div>

          <div className="grid grid-cols-[96px_repeat(7,minmax(120px,1fr))] lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]">
            <div
              className="relative border-r border-[#E0E0E0] bg-[#F7F2EC]"
              style={{ height: bodyHeight }}
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 border-t border-[#E0E0E0] px-2 py-2 text-[13px] text-[#828282]"
                  style={{
                    top: (hour - hourRange.startHour) * PIXELS_PER_HOUR,
                  }}
                >
                  {hourLabel(hour)}
                </div>
              ))}
            </div>

            {weekDays.map((day) => (
              <DayColumn
                key={day.toISOString()}
                day={day}
                height={bodyHeight}
                hours={hours}
                posts={posts.filter((post) => isSameDay(post.scheduledAt, day))}
                selectedId={selectedId}
                startHour={hourRange.startHour}
                onCreate={openCreate}
                onDropEntry={onDropEntry}
                onSelect={openDetails}
              />
            ))}
          </div>
        </div>
      </div>

      {drawer ? (
        <ContentCalendarDetails
          view={drawer.view}
          item={selectedItem}
          items={
            previewItem &&
            !items.some((entry) => entry.id === previewItem.id)
              ? [previewItem, ...items.filter((entry) => entry.is_active)]
              : items.filter((entry) => entry.is_active)
          }
          editor={
            drawer.view === 'editor' ? drawer.editor : emptyCalendarEditor
          }
          error={mutationError}
          isBusy={formBusy}
          isDeleting={isDeleting}
          isSaving={isSaving}
          onClose={closeDrawer}
          onCustomize={() => {
            if (selectedItem) {
              openEdit(selectedItem);
            }
          }}
          onSelectItem={openDetails}
          onDelete={() => void onDelete()}
          onSubmit={(event) => void onSubmit(event)}
          onUpdateEditor={(editor) => setDrawer({ view: 'editor', editor })}
        />
      ) : null}
    </div>
  );
}

function DayColumn({
  day,
  height,
  hours,
  posts,
  selectedId,
  startHour,
  onCreate,
  onDropEntry,
  onSelect,
}: {
  day: Date;
  height: number;
  hours: number[];
  posts: ScheduledPostDisplay[];
  selectedId: string | null;
  startHour: number;
  onCreate: (date: Date) => void;
  onDropEntry: (id: string, date: Date) => Promise<void>;
  onSelect: (item: ContentCalendarItem) => void;
}) {
  const positioned = useMemo(
    () => positionPosts(posts, startHour),
    [posts, startHour],
  );

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const resolveTime = (
    event: MouseEvent<HTMLDivElement> | DragEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return timeFromOffset(event.clientY - rect.top, day, startHour);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData(DRAG_TYPE);
    if (!id) {
      return;
    }

    void onDropEntry(id, resolveTime(event));
  };

  return (
    <div
      role="gridcell"
      aria-label={day.toDateString()}
      className="relative border-r border-[#E0E0E0] last:border-r-0"
      style={{ height }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {hours.map((hour) => (
        <div
          key={`${day.toISOString()}-${hour}`}
          className="absolute inset-x-0 border-t border-[#E0E0E0]"
          style={{ top: (hour - startHour) * PIXELS_PER_HOUR }}
        />
      ))}
      <button
        type="button"
        aria-label={`Add scheduled post on ${day.toDateString()}`}
        className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          onCreate(timeFromOffset(event.clientY - rect.top, day, startHour));
        }}
      />
      {positioned.map(({ post, top }) => (
        <div
          key={post.item.id}
          className="absolute inset-x-2 z-[1]"
          style={{ top, height: CARD_HEIGHT }}
        >
          <PostCard
            post={post}
            selected={post.item.id === selectedId}
            onSelect={onSelect}
          />
        </div>
      ))}
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
      data-post-card="true"
      onDragStart={onDragStart}
      aria-label={`Open details for ${post.item.title} at ${post.timeLabel}`}
      onClick={() => onSelect(post.item)}
      className={`h-full w-full rounded-[10px] border px-2 py-2 text-left shadow-[0_8px_24px_rgba(74,53,35,0.06)] transition-colors duration-200 focus-ring ${
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
        <p className="line-clamp-2 min-w-0 flex-1 text-[13px] leading-4 text-[#2A201C]">
          {post.item.title}
        </p>
      </div>
    </button>
  );
}
