import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useProfile } from '../hooks/useProfile';
import {
  hasChangePasswordFieldErrors,
  validateChangePasswordForm,
  type ChangePasswordFieldErrors,
  type ChangePasswordValues,
} from '../lib/profileValidation';
import { CloseIcon, EyeIcon, EyeOffIcon } from './icons';

const inputClassName =
  'box-border h-12 w-full rounded-full border border-white/10 bg-[#26231f] px-5 pr-12 text-[15px] text-white transition-colors duration-200 placeholder:text-[#858585] hover:border-white/20 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const inputErrorClassName =
  'border-[#C78272] focus-visible:border-[#C78272] focus-visible:ring-[#C78272]';

interface ChangePasswordFormProps {
  onClose: () => void;
}

function createEmptyValues(): ChangePasswordValues {
  return {
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  };
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function PasswordField({ id, label, value, error, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] text-[#A6A4A2]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          autoComplete={
            id === 'current_password' ? 'current-password' : 'new-password'
          }
          value={value}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={[inputClassName, error ? inputErrorClassName : ''].join(' ')}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="focus-ring absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#858585] transition-colors duration-200 hover:text-white"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-[#C78272]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const { changePassword, isChangingPassword } = useProfile();
  const [values, setValues] = useState<ChangePasswordValues>(createEmptyValues());
  const [fieldErrors, setFieldErrors] = useState<ChangePasswordFieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const updateField = <K extends keyof ChangePasswordValues>(
    key: K,
    value: ChangePasswordValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key];
      delete next.form;
      return next;
    });
    setFormMessage(null);
    setSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setSuccess(false);

    const validationErrors = validateChangePasswordForm(values);
    if (hasChangePasswordFieldErrors(validationErrors)) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    const result = await changePassword(values);

    if (result.success) {
      setSuccess(true);
      setFormMessage('Password changed successfully.');
      setValues(createEmptyValues());
      window.setTimeout(() => {
        onClose();
      }, 1200);
      return;
    }

    if (Object.keys(result.fieldErrors).length > 0) {
      setFieldErrors(result.fieldErrors);
    }

    if (result.error) {
      setFormMessage(result.error);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close change password dialog"
        className="fixed inset-0 z-40 bg-black/60 transition-colors duration-200"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] border border-white/10 bg-[#1f1b17] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between border-b border-white/5 px-5 py-5 md:px-8">
          <div>
            <h2
              id="change-password-title"
              className="font-display text-[24px] font-medium text-white md:text-[28px]"
            >
              Change Password
            </h2>
            <p className="mt-2 text-[14px] text-[#A6A4A2]">
              Enter your current password and choose a new one.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full p-2 text-[#A6A4A2] transition-colors duration-200 hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          className="space-y-5 px-5 py-6 md:px-8"
        >
          {formMessage ? (
            <div
              className={[
                'rounded-[12px] px-4 py-3 text-[14px]',
                success
                  ? 'bg-[#3b6c4f]/10 text-[#51ca7e]'
                  : 'bg-[#C78272]/10 text-[#C78272]',
              ].join(' ')}
              role={success ? 'status' : 'alert'}
            >
              {formMessage}
            </div>
          ) : null}

          <PasswordField
            id="current_password"
            label="Current Password"
            value={values.current_password}
            error={fieldErrors.current_password}
            onChange={(value) => updateField('current_password', value)}
          />

          <PasswordField
            id="new_password"
            label="New Password"
            value={values.new_password}
            error={fieldErrors.new_password}
            onChange={(value) => updateField('new_password', value)}
          />

          <PasswordField
            id="new_password_confirmation"
            label="Confirm New Password"
            value={values.new_password_confirmation}
            error={fieldErrors.new_password_confirmation}
            onChange={(value) => updateField('new_password_confirmation', value)}
          />

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isChangingPassword}
              className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-[#26231f] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#332e28] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isChangingPassword}
              className="focus-ring inline-flex h-11 min-w-[160px] items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isChangingPassword ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
