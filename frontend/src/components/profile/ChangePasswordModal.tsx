import { useEffect, useState, type FormEvent } from 'react';
import { CloseIcon } from '@/components/icons';
import {
  FormField,
  inputClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/shared/FormField';
import { getFieldErrors, mapPasswordFieldErrors } from '@/lib/api/errors';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

export function ChangePasswordModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setFieldErrors({});
      setSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!currentPassword) nextErrors.current_password = 'Current password is required';
    if (!newPassword) nextErrors.new_password = 'New password is required';
    if (newPassword !== confirmPassword) {
      nextErrors.confirm_password = 'Passwords do not match';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    try {
      await onSubmit({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setSuccess(true);
      window.setTimeout(onClose, 1200);
    } catch (submitError) {
      setFieldErrors(mapPasswordFieldErrors(getFieldErrors(submitError)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close change password dialog overlay"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="relative z-[1] w-full max-w-md rounded-[16px] border border-white/10 bg-[#1f1b17] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="change-password-title" className="font-display text-[22px] text-white">
            Change Password
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close change password dialog"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="current_password"
            label="Current password"
            error={fieldErrors.current_password}
          >
            <input
              id="current_password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={inputClassName}
            />
          </FormField>

          <FormField
            id="new_password"
            label="New password"
            error={fieldErrors.new_password}
          >
            <input
              id="new_password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={inputClassName}
            />
          </FormField>

          <FormField
            id="confirm_password"
            label="Confirm password"
            error={fieldErrors.confirm_password}
          >
            <input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClassName}
            />
          </FormField>

          {error ? (
            <p className="text-sm text-[#ff5630]" role="alert">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-sm text-[#51ca7e]" role="status">
              Password updated successfully.
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className={secondaryButtonClassName}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={primaryButtonClassName}
            >
              {isSubmitting ? 'Saving…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
