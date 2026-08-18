import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { ChangePasswordPayload, UserProfile, UserProfilePayload } from '../types/api';
import { emptyUserProfile, toUserProfilePayload } from '../lib/api/profile';
import {
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
  TIME_ZONE_OPTIONS,
  resolveSelectValue,
  withCurrentOption,
} from '../lib/profileOptions';
import {
  validateProfileForm,
  type ProfileFieldKey,
} from '../lib/profileValidation';
import ChangePasswordForm from './ChangePasswordForm';
import { ChevronDownIcon } from './icons';

const controlClass =
  'box-border h-[52px] w-full rounded-full border border-white/20 bg-[#2e2c29] px-5 text-[14px] leading-5 text-[#F8F2EB] placeholder:text-[#959595] transition-colors duration-150 hover:border-white/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60';

const textareaClass =
  'box-border min-h-[80px] w-full resize-y rounded-[16px] border border-white/20 bg-[#2e2c29] px-5 py-3.5 text-[14px] leading-5 text-[#F8F2EB] placeholder:text-[#959595] transition-colors duration-150 hover:border-white/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60';

const secondaryButtonClass =
  'focus-ring inline-flex h-12 items-center justify-center rounded-full bg-white/30 px-8 text-[14px] text-white transition-colors duration-150 hover:bg-white/40 active:bg-white/35 disabled:cursor-not-allowed disabled:opacity-50';

const primaryButtonClass =
  'focus-ring inline-flex h-12 items-center justify-center rounded-full bg-primary/50 px-8 text-[14px] text-white transition-colors duration-150 hover:bg-primary/60 active:bg-primary/55 disabled:cursor-not-allowed disabled:opacity-50';

interface UserProfileFormProps {
  profile: UserProfile | null;
  loading?: boolean;
  isSaving?: boolean;
  isChangingPassword?: boolean;
  suppressEmpty?: boolean;
  fieldErrors?: Record<string, string>;
  passwordError?: string | null;
  passwordFieldErrors?: Record<string, string>;
  successMessage?: string | null;
  passwordSuccessMessage?: string | null;
  onSave: (body: UserProfilePayload) => Promise<boolean>;
  onChangePassword: (body: ChangePasswordPayload) => Promise<boolean>;
}

function FormSkeleton() {
  return (
    <div
      className="rounded-[16px] bg-[#25211e] p-5 md:px-8 md:py-8"
      aria-busy="true"
      aria-label="Loading profile details"
    >
      <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
      <div className="mt-5 grid grid-cols-1 gap-md md:grid-cols-2 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[52px] animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
      <div className="mt-md h-20 animate-pulse rounded-[16px] bg-white/10" />
      <div className="mt-8 h-6 w-28 animate-pulse rounded bg-white/10" />
      <div className="mt-5 h-[52px] animate-pulse rounded-full bg-white/10" />
      <div className="mt-8 h-6 w-24 animate-pulse rounded bg-white/10" />
      <div className="mt-5 h-[52px] animate-pulse rounded-full bg-white/10" />
      <div className="mt-md grid grid-cols-1 gap-md md:grid-cols-2 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[52px] animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 px-5 text-[12px] text-[#ff5630]" role="alert">
      {message}
    </p>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  error,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;
  const resolvedOptions = withCurrentOption(options, value);
  const resolvedValue = resolveSelectValue(resolvedOptions, value);

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={resolvedValue}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={[
            controlClass,
            'appearance-none pr-12 [color-scheme:dark]',
            resolvedValue ? 'text-[#F8F2EB]' : 'text-[#959595]',
          ].join(' ')}
        >
          <option value="">{label}</option>
          {resolvedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#959595]" />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  disabled,
  type = 'text',
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={label}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default function UserProfileForm({
  profile,
  loading = false,
  isSaving = false,
  isChangingPassword = false,
  suppressEmpty = false,
  fieldErrors = {},
  passwordError = null,
  passwordFieldErrors = {},
  successMessage = null,
  passwordSuccessMessage = null,
  onSave,
  onChangePassword,
}: UserProfileFormProps) {
  const [values, setValues] = useState<UserProfilePayload>(
    toUserProfilePayload(profile ?? emptyUserProfile()),
  );
  const [localErrors, setLocalErrors] = useState<
    Partial<Record<ProfileFieldKey, string>>
  >({});
  const [passwordOpen, setPasswordOpen] = useState(false);

  useEffect(() => {
    setValues(toUserProfilePayload(profile ?? emptyUserProfile()));
    setLocalErrors({});
  }, [profile]);

  const mergedErrors = useMemo(
    () => ({ ...fieldErrors, ...localErrors }),
    [fieldErrors, localErrors],
  );

  if (loading) {
    return <FormSkeleton />;
  }

  if (!profile) {
    if (suppressEmpty) {
      return null;
    }

    return (
      <section
        aria-labelledby="profile-empty-heading"
        className="rounded-[16px] bg-[#25211e] p-5 md:px-8 md:py-8"
      >
        <h2
          id="profile-empty-heading"
          className="font-display text-[22px] font-medium text-[#F8F2EB]"
        >
          Personal Details
        </h2>
        <p className="mt-5 py-6 text-center text-[14px] text-[#959595]" role="status">
          No profile information is available.
        </p>
      </section>
    );
  }

  const setField = (field: ProfileFieldKey, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setLocalErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const rest = { ...current };
      delete rest[field];
      return rest;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateProfileForm(values);
    setLocalErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSave(values);
  };

  const handleCancel = () => {
    setValues(toUserProfilePayload(profile));
    setLocalErrors({});
  };

  return (
    <section
      aria-labelledby="personal-details-heading"
      className="rounded-[16px] bg-[#25211e] p-5 md:px-8 md:py-8"
    >
      {successMessage ? (
        <p
          role="status"
          className="mb-5 rounded-[12px] border border-[#22c55e]/40 bg-[#22c55e]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
        >
          {successMessage}
        </p>
      ) : null}

      {passwordSuccessMessage ? (
        <p
          role="status"
          className="mb-5 rounded-[12px] border border-[#22c55e]/40 bg-[#22c55e]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
        >
          {passwordSuccessMessage}
        </p>
      ) : null}

      <form onSubmit={(event) => void handleSubmit(event)} noValidate>
        <h2
          id="personal-details-heading"
          className="font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]"
        >
          Personal Details
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-md md:grid-cols-2 md:gap-6">
          <TextField
            id="profile-first-name"
            label="First Name"
            value={values.first_name}
            error={mergedErrors.first_name}
            disabled={isSaving}
            autoComplete="given-name"
            onChange={(value) => setField('first_name', value)}
          />
          <TextField
            id="profile-last-name"
            label="Last Name"
            value={values.last_name}
            error={mergedErrors.last_name}
            disabled={isSaving}
            autoComplete="family-name"
            onChange={(value) => setField('last_name', value)}
          />
          <TextField
            id="profile-email"
            label="Email"
            type="email"
            value={values.email}
            error={mergedErrors.email}
            disabled={isSaving}
            autoComplete="email"
            onChange={(value) => setField('email', value)}
          />
          <TextField
            id="profile-mobile"
            label="Mobile Number"
            type="tel"
            value={values.mobile_number}
            error={mergedErrors.mobile_number}
            disabled={isSaving}
            autoComplete="tel"
            onChange={(value) => setField('mobile_number', value)}
          />
        </div>

        <div className="mt-md md:mt-6">
          <label htmlFor="profile-bio" className="sr-only">
            Bio
          </label>
          <textarea
            id="profile-bio"
            value={values.bio}
            placeholder="Bio"
            disabled={isSaving}
            rows={3}
            aria-invalid={mergedErrors.bio ? true : undefined}
            aria-describedby={mergedErrors.bio ? 'profile-bio-error' : undefined}
            onChange={(event) => setField('bio', event.target.value)}
            className={textareaClass}
          />
          <FieldError id="profile-bio-error" message={mergedErrors.bio} />
        </div>

        <h2 className="mt-8 font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]">
          Time Zone
        </h2>
        <div className="mt-5">
          <SelectField
            id="profile-time-zone"
            label="Time Zone"
            value={values.time_zone}
            options={TIME_ZONE_OPTIONS}
            error={mergedErrors.time_zone}
            disabled={isSaving}
            onChange={(value) => setField('time_zone', value)}
          />
        </div>

        <h2 className="mt-8 font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]">
          Address
        </h2>
        <div className="mt-5">
          <TextField
            id="profile-street"
            label="Street"
            value={values.street}
            error={mergedErrors.street}
            disabled={isSaving}
            autoComplete="street-address"
            onChange={(value) => setField('street', value)}
          />
        </div>
        <div className="mt-md grid grid-cols-1 gap-md md:mt-6 md:grid-cols-2 md:gap-6">
          <SelectField
            id="profile-country"
            label="Country"
            value={values.country}
            options={COUNTRY_OPTIONS}
            error={mergedErrors.country}
            disabled={isSaving}
            onChange={(value) => setField('country', value)}
          />
          <SelectField
            id="profile-state"
            label="State"
            value={values.state}
            options={STATE_OPTIONS}
            error={mergedErrors.state}
            disabled={isSaving}
            onChange={(value) => setField('state', value)}
          />
          <TextField
            id="profile-city"
            label="City"
            value={values.city}
            error={mergedErrors.city}
            disabled={isSaving}
            autoComplete="address-level2"
            onChange={(value) => setField('city', value)}
          />
          <TextField
            id="profile-zip"
            label="ZIP"
            value={values.zip}
            error={mergedErrors.zip}
            disabled={isSaving}
            autoComplete="postal-code"
            onChange={(value) => setField('zip', value)}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setPasswordOpen(true)}
            disabled={isSaving}
            className={secondaryButtonClass}
            aria-haspopup="dialog"
            aria-expanded={passwordOpen}
          >
            Change Password
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              aria-busy={isSaving || undefined}
              className={primaryButtonClass}
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <ChangePasswordForm
        open={passwordOpen}
        isSaving={isChangingPassword}
        error={passwordError}
        fieldErrors={passwordFieldErrors}
        onClose={() => setPasswordOpen(false)}
        onSubmit={onChangePassword}
      />
    </section>
  );
}
