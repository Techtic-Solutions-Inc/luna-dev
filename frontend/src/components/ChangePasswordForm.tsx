import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import type { ChangePasswordPayload } from '../types/api';
import {
  validateChangePasswordForm,
  type PasswordFieldKey,
} from '../lib/profileValidation';
import { CloseIcon, EyeIcon, EyeOffIcon } from './icons';

const inputClass =
  'box-border h-[52px] w-full rounded-full border border-white/20 bg-[#2e2c29] px-5 pr-12 text-[14px] leading-5 text-[#F8F2EB] placeholder:text-[#959595] transition-colors duration-150 hover:border-white/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60';

const secondaryButtonClass =
  'focus-ring inline-flex h-12 items-center justify-center rounded-full bg-white/30 px-8 text-[14px] text-white transition-colors duration-150 hover:bg-white/40 active:bg-white/35 disabled:cursor-not-allowed disabled:opacity-50';

const primaryButtonClass =
  'focus-ring inline-flex h-12 items-center justify-center rounded-full bg-primary/50 px-8 text-[14px] text-white transition-colors duration-150 hover:bg-primary/60 active:bg-primary/55 disabled:cursor-not-allowed disabled:opacity-50';

interface ChangePasswordFormProps {
  open: boolean;
  isSaving?: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
  onClose: () => void;
  onSubmit: (body: ChangePasswordPayload) => Promise<boolean>;
}

function emptyPasswordForm(): ChangePasswordPayload {
  return {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };
}

function PasswordField({
  id,
  label,
  value,
  error,
  disabled,
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  autoComplete: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          autoComplete={autoComplete}
          placeholder={label}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="focus-ring absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#959595] transition-colors duration-150 hover:text-[#F8F2EB]"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 px-5 text-[12px] text-[#ff5630]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ChangePasswordForm({
  open,
  isSaving = false,
  error = null,
  fieldErrors = {},
  onClose,
  onSubmit,
}: ChangePasswordFormProps) {
  const titleId = useId();
  const firstFieldId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const [values, setValues] = useState<ChangePasswordPayload>(emptyPasswordForm);
  const [localErrors, setLocalErrors] = useState<
    Partial<Record<PasswordFieldKey, string>>
  >({});

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) {
      return;
    }

    setValues(emptyPasswordForm());
    setLocalErrors({});

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(firstFieldId)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSaving) {
        onCloseRef.current();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [firstFieldId, isSaving, open]);

  if (!open) {
    return null;
  }

  const mergedErrors: Partial<Record<PasswordFieldKey, string>> = {
    current_password:
      localErrors.current_password ?? fieldErrors.current_password,
    new_password: localErrors.new_password ?? fieldErrors.new_password,
    confirm_password:
      localErrors.confirm_password ?? fieldErrors.confirm_password,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateChangePasswordForm(values);
    setLocalErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const saved = await onSubmit(values);
    if (saved) {
      setValues(emptyPasswordForm());
      onClose();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close change password dialog"
        className="fixed inset-0 z-40 bg-black/60"
        onClick={() => {
          if (!isSaving) {
            onClose();
          }
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed inset-x-4 top-[12vh] z-50 mx-auto w-full max-w-[520px] rounded-[16px] border border-white/10 bg-[#25211e] p-5 shadow-[0_4px_40px_#00000019] md:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]"
          >
            Change Password
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="focus-ring -mr-2 rounded-full p-2 text-[#BEBBB9] transition-colors duration-150 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close change password form"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            className="mb-5 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
          >
            {error}
          </p>
        ) : null}

        <form onSubmit={(event) => void handleSubmit(event)} noValidate>
          <div className="space-y-md">
            <PasswordField
              id={firstFieldId}
              label="Current Password"
              value={values.current_password}
              error={mergedErrors.current_password}
              disabled={isSaving}
              autoComplete="current-password"
              onChange={(value) =>
                setValues((current) => ({ ...current, current_password: value }))
              }
            />
            <PasswordField
              id={`${firstFieldId}-new`}
              label="New Password"
              value={values.new_password}
              error={mergedErrors.new_password}
              disabled={isSaving}
              autoComplete="new-password"
              onChange={(value) =>
                setValues((current) => ({ ...current, new_password: value }))
              }
            />
            <PasswordField
              id={`${firstFieldId}-confirm`}
              label="Confirm New Password"
              value={values.confirm_password}
              error={mergedErrors.confirm_password}
              disabled={isSaving}
              autoComplete="new-password"
              onChange={(value) =>
                setValues((current) => ({
                  ...current,
                  confirm_password: value,
                }))
              }
            />
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              aria-busy={isSaving || undefined}
              aria-label="Save password"
              className={primaryButtonClass}
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
