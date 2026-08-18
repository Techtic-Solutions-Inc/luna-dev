import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type Ref,
} from 'react';
import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';
import { formatContentBadge } from '../lib/contentCalendarDisplay';
import ContentManagementActions from './ContentManagementActions';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  ImageIcon,
} from './icons';

const USAGE_POINTS = [
  'Help real estate professionals create content faster with ready-made templates.',
  'Increase audience engagement through visually appealing social media posts.',
  'Position yourself as a trusted source of market knowledge and insights.',
] as const;

const inputClass =
  'box-border h-12 w-full rounded-full border border-color-97 bg-white px-4 text-sm text-color-99 transition-colors duration-200 placeholder:text-color-100 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const textareaClass =
  'mt-2 box-border min-h-24 w-full rounded-[20px] border border-color-97 bg-white px-4 py-3 text-sm text-color-99 placeholder:text-color-100 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function toLocalInputValue(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

function emptyPayload(): ContentCalendarPayload {
  const stored =
    localStorage.getItem('name') ??
    localStorage.getItem('userName') ??
    [localStorage.getItem('first_name'), localStorage.getItem('last_name')]
      .filter((part): part is string => Boolean(part))
      .join(' ');

  return {
    title: '',
    date: new Date().toISOString(),
    content: '',
    description: '',
    full_name: stored,
    phone: '',
    link: '',
    is_active: true,
  };
}

function DetailsChrome({
  title,
  children,
  onClose,
  closeRef,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close details"
        className="fixed inset-0 z-40 bg-black/40 lg:left-[244px]"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-details-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[656px] flex-col bg-[#F7F2EC] text-[#211815] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-start justify-between gap-3 px-6 pb-4 pt-8 sm:px-8">
          <h2
            id="calendar-details-title"
            className="font-display text-[28px] font-medium leading-8 text-[#211815] md:text-[30px] md:leading-[39px]"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close content details"
            className="focus-ring -mr-2 rounded-full p-2 text-[#5A4940] transition-colors duration-200 hover:bg-[#ECDDCC]"
            onClick={onClose}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        {children}
      </aside>
    </>
  );
}

function EntryForm({
  initial,
  error,
  isBusy,
  isDeleting,
  isSaving,
  submitLabel,
  onCancel,
  onDelete,
  onSubmit,
}: {
  initial: ContentCalendarPayload;
  error: string | null;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  submitLabel: string;
  onCancel: () => void;
  onDelete?: () => void;
  onSubmit: (body: ContentCalendarPayload) => Promise<boolean>;
}) {
  const [title, setTitle] = useState(initial.title);
  const [date, setDate] = useState(toLocalInputValue(initial.date));
  const [content, setContent] = useState(initial.content);
  const [description, setDescription] = useState(initial.description);
  const [link, setLink] = useState(initial.link);
  const [fullName, setFullName] = useState(initial.full_name);
  const [phone, setPhone] = useState(initial.phone);

  useEffect(() => {
    setTitle(initial.title);
    setDate(toLocalInputValue(initial.date));
    setContent(initial.content);
    setDescription(initial.description);
    setLink(initial.link);
    setFullName(initial.full_name);
    setPhone(initial.phone);
  }, [
    initial.content,
    initial.date,
    initial.description,
    initial.full_name,
    initial.link,
    initial.phone,
    initial.title,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      title: title.trim(),
      date: new Date(date).toISOString(),
      content: content.trim(),
      description: description.trim(),
      full_name: fullName.trim(),
      phone: phone.trim(),
      link: link.trim(),
      is_active: initial.is_active,
    });
  };

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-2 sm:px-8">
        <label className="block text-sm text-[#6F6258]">
          Content title
          <input
            className={`mt-2 ${inputClass}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Scheduled time
          <input
            className={`mt-2 ${inputClass}`}
            type="datetime-local"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Location / image link
          <input
            className={`mt-2 ${inputClass}`}
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Branding name
          <input
            className={`mt-2 ${inputClass}`}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Phone
          <input
            className={`mt-2 ${inputClass}`}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Description
          <textarea
            className={textareaClass}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Caption
          <textarea
            className={textareaClass}
            value={content}
            onChange={(event) => setContent(event.target.value)}
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
          disabled={isBusy}
          className="focus-ring inline-flex h-11 min-w-[152px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="focus-ring inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-[#C8B6A2] bg-transparent px-5 text-sm font-medium text-[#6F6258] transition-colors duration-200 hover:bg-[#F3E7D8]"
        >
          Cancel
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={isBusy}
            className="focus-ring inline-flex h-11 min-w-[152px] items-center justify-center rounded-full border border-[#C78272] bg-transparent px-5 text-sm font-medium text-[#AD5449] transition-colors duration-200 hover:bg-[#FFF0EE] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting…' : 'Delete entry'}
          </button>
        ) : null}
      </div>
    </form>
  );
}

function DetailsSkeleton() {
  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[656px] flex-col bg-[#F7F2EC] px-8 py-8"
      aria-busy="true"
      aria-label="Loading content calendar details"
    >
      <div className="h-8 w-3/4 animate-pulse rounded bg-[#E8DDD0]" />
      <div className="mt-md h-6 w-32 animate-pulse rounded-full bg-[#E8DDD0]" />
      <div className="mt-6 flex gap-2">
        <div className="h-11 w-32 animate-pulse rounded-full bg-[#E8DDD0]" />
        <div className="h-11 w-36 animate-pulse rounded-full bg-[#E8DDD0]" />
        <div className="h-11 w-28 animate-pulse rounded-full bg-[#E8DDD0]" />
      </div>
      <div className="mt-5 h-[280px] animate-pulse rounded-[18px] bg-[#EEE3D6]" />
      <div className="mt-6 h-5 w-48 animate-pulse rounded bg-[#E8DDD0]" />
      <div className="mt-2 h-16 w-full animate-pulse rounded bg-[#E8DDD0]" />
    </aside>
  );
}

interface ContentCalendarDetailsProps {
  item: ContentCalendarItem | null;
  items: ContentCalendarItem[];
  loading?: boolean;
  error: string | null;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  notFound?: boolean;
  onClose: () => void;
  onCreate: (body: ContentCalendarPayload) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onSave: (id: string, body: ContentCalendarPayload) => Promise<boolean>;
  onSelectItem: (item: ContentCalendarItem) => void;
}

export default function ContentCalendarDetails({
  item,
  items,
  loading = false,
  error,
  isBusy,
  isDeleting,
  isSaving,
  notFound = false,
  onClose,
  onCreate,
  onDelete,
  onSave,
  onSelectItem,
}: ContentCalendarDetailsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [imageFailed, setImageFailed] = useState(false);
  const emptyForm = useMemo(() => emptyPayload(), []);

  useEffect(() => {
    setIsCustomizing(false);
    setCopyMessage('');
    setImageFailed(false);
    closeRef.current?.focus();
  }, [item?.id]);

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

  const currentIndex = useMemo(
    () => (item ? items.findIndex((entry) => entry.id === item.id) : -1),
    [item, items],
  );

  const copyCaption = async (value: string) => {
    if (!value) {
      setCopyMessage('No caption available to copy.');
      return;
    }

    if (!navigator.clipboard?.writeText) {
      setCopyMessage('Copy is not available in this browser.');
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopyMessage('Caption copied.');
  };

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!item) {
    const title = notFound
      ? 'Calendar entry not found'
      : 'No personal content scheduled';

    return (
      <DetailsChrome title={title} onClose={onClose} closeRef={closeRef}>
        {isCreating ? (
          <EntryForm
            initial={emptyForm}
            error={error}
            isBusy={isBusy}
            isDeleting={false}
            isSaving={isSaving}
            submitLabel="Create entry"
            onCancel={() => setIsCreating(false)}
            onSubmit={async (body) => {
              const created = await onCreate(body);
              if (created) {
                setIsCreating(false);
              }
              return created;
            }}
          />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 sm:px-8">
            <p className="text-sm leading-6 text-[#6F6258]" role="status">
              {notFound
                ? 'This calendar entry is unavailable. Choose another post from your calendar or create a new one.'
                : 'No posts are scheduled yet. Create a calendar entry to start managing your personal content.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#b48a5d]"
                aria-label="Create a new calendar entry"
              >
                Create entry
              </button>
            </div>
          </div>
        )}
      </DetailsChrome>
    );
  }

  const badge = formatContentBadge(item, Math.max(currentIndex, 0));
  const showImage = Boolean(item.link) && !imageFailed;
  const about = item.description.trim();
  const pagerLabel = `${currentIndex + 1}/${items.length || 1}`;

  const shiftSelection = (delta: number) => {
    if (items.length === 0 || currentIndex < 0) {
      return;
    }

    const nextIndex = (currentIndex + delta + items.length) % items.length;
    const nextItem = items[nextIndex];

    if (nextItem) {
      onSelectItem(nextItem);
    }
  };

  return (
    <DetailsChrome title={item.title} onClose={onClose} closeRef={closeRef}>
      {isCustomizing ? (
        <EntryForm
          initial={{
            title: item.title,
            date: item.date,
            content: item.content,
            description: item.description,
            full_name: item.full_name,
            phone: item.phone,
            link: item.link,
            is_active: item.is_active,
          }}
          error={error}
          isBusy={isBusy}
          isDeleting={isDeleting}
          isSaving={isSaving}
          submitLabel="Save changes"
          onCancel={() => setIsCustomizing(false)}
          onDelete={() => {
            void onDelete();
          }}
          onSubmit={async (body) => {
            const saved = await onSave(item.id, body);
            if (saved) {
              setIsCustomizing(false);
            }
            return saved;
          }}
        />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 sm:px-8">
          <span className="inline-flex w-fit rounded-full bg-[#F2E9E1] px-3 py-1 text-[12px] leading-[18px] text-[#8A3B32]">
            {badge}
          </span>
          <div className="mt-md">
            <ContentManagementActions
              downloadHref={item.link}
              disabled={isBusy}
              onCopyCaption={() => {
                void copyCaption(item.content);
              }}
              onCustomize={() => setIsCustomizing(true)}
            />
          </div>
          <p className="sr-only" aria-live="polite">
            {copyMessage}
          </p>
          <div className="relative mt-5 flex min-h-[280px] items-center justify-center rounded-[18px] bg-[#EEE3D6] px-10 py-6 md:min-h-[420px]">
            <button
              type="button"
              className="focus-ring absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#211815] transition-colors duration-200 hover:bg-[#E4D5C4] disabled:opacity-40"
              aria-label="Previous content preview"
              onClick={() => shiftSelection(-1)}
              disabled={items.length < 2}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div className="relative flex max-h-[360px] w-auto max-w-[220px] items-center justify-center overflow-hidden rounded-md">
              {showImage ? (
                <img
                  src={item.link}
                  alt={item.title}
                  className="max-h-[360px] w-auto max-w-[220px] object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-[220px] w-[140px] items-center justify-center rounded-md bg-[#E2D5C6] text-[#A88B6C]">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <p className="pointer-events-none absolute inset-x-3 top-1/2 -translate-y-1/2 text-center font-display text-[17px] font-medium leading-[22px] text-white drop-shadow">
                {item.title}
              </p>
            </div>
            <button
              type="button"
              className="focus-ring absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#211815] transition-colors duration-200 hover:bg-[#E4D5C4] disabled:opacity-40"
              aria-label="Next content preview"
              onClick={() => shiftSelection(1)}
              disabled={items.length < 2}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 left-0 right-0 text-center text-[12px] text-[#6F6258]">
              {pagerLabel}
            </p>
          </div>
          <section className="mt-6" aria-labelledby="about-template-heading">
            <h3
              id="about-template-heading"
              className="font-display text-[20px] font-medium leading-[26px] text-[#211815]"
            >
              About This Template
            </h3>
            {about ? (
              <p className="mt-2 text-sm leading-6 text-[#6F6258]">{about}</p>
            ) : null}
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#6F6258]">
              {USAGE_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
          <section
            className="mt-6 rounded-[18px] bg-[#111111] p-4 text-white"
            aria-labelledby="caption-heading"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3
                id="caption-heading"
                className="font-display text-lg font-medium"
              >
                Caption
              </h3>
              <button
                type="button"
                onClick={() => {
                  void copyCaption(item.content);
                }}
                className="focus-ring inline-flex h-8 items-center gap-2 rounded-full bg-primary px-3 text-xs text-white transition-colors duration-200 hover:bg-[#b48a5d]"
                aria-label="Copy caption text"
              >
                <CopyIcon className="h-3.5 w-3.5" />
                Copy Caption
              </button>
            </div>
            <div className="mb-3 h-px bg-white/15" />
            {item.content.trim() ? (
              <p className="text-sm leading-6 text-white/90">{item.content}</p>
            ) : (
              <p className="text-sm leading-6 text-white/60" role="status">
                No caption has been added for this post yet.
              </p>
            )}
          </section>
        </div>
      )}
    </DetailsChrome>
  );
}
