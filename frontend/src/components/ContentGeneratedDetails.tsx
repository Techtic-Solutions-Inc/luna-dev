import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { getApiFieldErrors } from '../lib/api/errors';
import {
  formatContentTimestamp,
  getContentDateValue,
} from '../lib/profileContentDisplay';
import type { ProfileContentItem, ProfileContentPayload } from '../types/api';
import { CloseIcon } from './icons';

const inputClass =
  'box-border mt-2 h-12 w-full rounded-[12px] border border-white/10 bg-[#14100d] px-4 text-sm text-[#F8F2EB] transition-colors duration-150 placeholder:text-[#646261] hover:border-white/20 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const textareaClass =
  'box-border mt-2 min-h-24 w-full rounded-[12px] border border-white/10 bg-[#14100d] px-4 py-3 text-sm text-[#F8F2EB] transition-colors duration-150 placeholder:text-[#646261] hover:border-white/20 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function toLocalInputValue(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

function emptyPayload(): ProfileContentPayload {
  return {
    title: '',
    description: '',
    date: new Date().toISOString(),
    content: '',
  };
}

function payloadFromItem(item: ProfileContentItem): ProfileContentPayload {
  return {
    title: item.title,
    description: item.description,
    date: getContentDateValue(item) || new Date().toISOString(),
    content: item.content,
  };
}

interface ContentFormProps {
  initial: ProfileContentPayload;
  error: string | null;
  fieldErrors: Record<string, string>;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  submitLabel: string;
  onCancel: () => void;
  onDelete?: () => void;
  onSubmit: (body: ProfileContentPayload) => Promise<boolean>;
}

function ContentForm({
  initial,
  error,
  fieldErrors,
  isBusy,
  isDeleting,
  isSaving,
  submitLabel,
  onCancel,
  onDelete,
  onSubmit,
}: ContentFormProps) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [date, setDate] = useState(toLocalInputValue(initial.date));
  const [content, setContent] = useState(initial.content);

  useEffect(() => {
    setTitle(initial.title);
    setDescription(initial.description);
    setDate(toLocalInputValue(initial.date));
    setContent(initial.content);
  }, [initial.content, initial.date, initial.description, initial.title]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      content: content.trim(),
    });
  };

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-2 sm:px-8">
        <label className="block text-sm text-[#BEBBB9]">
          Title
          <input
            className={inputClass}
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            aria-invalid={Boolean(fieldErrors.title)}
          />
          {fieldErrors.title ? (
            <span className="mt-1 block text-[12px] text-[#ff5630]">
              {fieldErrors.title}
            </span>
          ) : null}
        </label>
        <label className="block text-sm text-[#BEBBB9]">
          Date
          <input
            className={inputClass}
            type="datetime-local"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            aria-invalid={Boolean(fieldErrors.date)}
          />
          {fieldErrors.date ? (
            <span className="mt-1 block text-[12px] text-[#ff5630]">
              {fieldErrors.date}
            </span>
          ) : null}
        </label>
        <label className="block text-sm text-[#BEBBB9]">
          Description
          <textarea
            className={textareaClass}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-invalid={Boolean(fieldErrors.description)}
          />
          {fieldErrors.description ? (
            <span className="mt-1 block text-[12px] text-[#ff5630]">
              {fieldErrors.description}
            </span>
          ) : null}
        </label>
        <label className="block text-sm text-[#BEBBB9]">
          Content
          <textarea
            className={textareaClass}
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-invalid={Boolean(fieldErrors.content)}
          />
          {fieldErrors.content ? (
            <span className="mt-1 block text-[12px] text-[#ff5630]">
              {fieldErrors.content}
            </span>
          ) : null}
        </label>
        {error ? (
          <p
            role="alert"
            className="rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-sm text-[#fdfdfd]"
          >
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3 border-t border-white/10 px-6 py-5 sm:px-8">
        <button
          type="submit"
          disabled={isBusy}
          className="focus-ring inline-flex h-11 min-w-[152px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#0b0b0b] transition-colors duration-150 hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="focus-ring inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-white/15 bg-transparent px-5 text-sm font-medium text-[#BEBBB9] transition-colors duration-150 hover:bg-white/5"
        >
          Cancel
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={isBusy}
            className="focus-ring inline-flex h-11 min-w-[152px] items-center justify-center rounded-full border border-[#C78272] bg-transparent px-5 text-sm font-medium text-[#ff5630] transition-colors duration-150 hover:bg-[#ff5630]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting…' : 'Delete content'}
          </button>
        ) : null}
      </div>
    </form>
  );
}

interface ContentGeneratedDetailsProps {
  item: ProfileContentItem | null;
  creating?: boolean;
  error: string | null;
  mutationError: unknown;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onClose: () => void;
  onCreate: (body: ProfileContentPayload) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onSave: (id: string, body: ProfileContentPayload) => Promise<boolean>;
}

export default function ContentGeneratedDetails({
  item,
  creating = false,
  error,
  mutationError,
  isBusy,
  isDeleting,
  isSaving,
  onClose,
  onCreate,
  onDelete,
  onSave,
}: ContentGeneratedDetailsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = useState(creating && !item);
  const fieldErrors = getApiFieldErrors(mutationError);

  useEffect(() => {
    setIsEditing(creating && !item);
    closeRef.current?.focus();
  }, [creating, item]);

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

  const heading = item
    ? item.title
    : creating
      ? 'Create generated content'
      : 'Generated content';

  return (
    <>
      <button
        type="button"
        aria-label="Close content details overlay"
        className="fixed inset-0 z-40 bg-black/60 lg:left-[244px]"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="generated-content-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col bg-[#1f1b17] text-[#F8F2EB] shadow-[-24px_0_60px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between gap-3 px-6 pb-4 pt-8 sm:px-8">
          <h2
            id="generated-content-title"
            className="font-display text-[26px] font-medium leading-8 text-[#F8F2EB] md:text-[30px] md:leading-[39px]"
          >
            {heading}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close generated content details"
            className="focus-ring -mr-2 rounded-full p-2 text-[#BEBBB9] transition-colors duration-150 hover:bg-white/5"
            onClick={onClose}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {isEditing || !item ? (
          <ContentForm
            initial={item ? payloadFromItem(item) : emptyPayload()}
            error={error}
            fieldErrors={fieldErrors}
            isBusy={isBusy}
            isDeleting={isDeleting}
            isSaving={isSaving}
            submitLabel={item ? 'Save changes' : 'Create content'}
            onCancel={() => {
              if (item) {
                setIsEditing(false);
              } else {
                onClose();
              }
            }}
            onDelete={
              item
                ? () => {
                    void onDelete();
                  }
                : undefined
            }
            onSubmit={async (body) => {
              if (item) {
                const saved = await onSave(item.id, body);
                if (saved) {
                  setIsEditing(false);
                }
                return saved;
              }

              const created = await onCreate(body);
              if (created) {
                onClose();
              }
              return created;
            }}
          />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 sm:px-8">
            <p className="text-[13px] text-[#959595]">
              {formatContentTimestamp(getContentDateValue(item))}
            </p>
            {item.description.trim() ? (
              <p className="mt-4 text-sm leading-6 text-[#BEBBB9]">
                {item.description.trim()}
              </p>
            ) : null}
            {item.content.trim() &&
            item.content.trim() !== item.description.trim() ? (
              <section
                className="mt-6 rounded-[12px] bg-[#14100d] p-4"
                aria-label="Generated copy"
              >
                <h3 className="font-display text-lg font-medium text-[#F8F2EB]">
                  Generated copy
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#BEBBB9]">
                  {item.content}
                </p>
              </section>
            ) : null}
            {!item.description.trim() && !item.content.trim() ? (
              <p className="mt-4 text-sm leading-6 text-[#959595]" role="status">
                No copy has been saved for this item yet.
              </p>
            ) : null}
            {error ? (
              <p
                role="alert"
                className="mt-4 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-sm text-[#fdfdfd]"
              >
                {error}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isBusy}
                className="focus-ring inline-flex h-11 min-w-[120px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#0b0b0b] transition-colors duration-150 hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={`Edit ${item.title}`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  void onDelete();
                }}
                disabled={isBusy}
                className="focus-ring inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-[#C78272] px-5 text-sm font-medium text-[#ff5630] transition-colors duration-150 hover:bg-[#ff5630]/10 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={`Delete ${item.title}`}
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
