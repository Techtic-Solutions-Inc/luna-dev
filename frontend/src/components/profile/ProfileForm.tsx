import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { NormalizedProfile } from '@/lib/api/profile';
import { mapProfileFieldErrors } from '@/lib/api/profile';
import { getFieldErrors } from '@/lib/api/errors';
import {
  FormField,
  inputClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  SelectField,
  textareaClassName,
} from '@/components/shared/FormField';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { ChangePasswordModal } from '@/components/profile/ChangePasswordModal';
import { ProfileEmptyState } from '@/components/profile/ProfileEmptyState';
import {
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
  TimezoneSelect,
} from '@/components/profile/TimezoneSelect';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;
const ZIP_REGEX = /^[\dA-Za-z\s-]{3,12}$/;

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  bio: string;
  time_zone: string;
  street: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface ProfileFormProps {
  profile: NormalizedProfile | null;
  loading: boolean;
  error: string | null;
  updateError: string | null;
  isUpdating: boolean;
  onSave: (values: ProfileFormValues) => Promise<void>;
  onRetry: () => void;
  changePassword: (values: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => Promise<void>;
  isChangingPassword: boolean;
  changePasswordError: string | null;
}

function buildInitialValues(profile: NormalizedProfile | null): ProfileFormValues {
  return {
    first_name: profile?.first_name ?? '',
    last_name: profile?.last_name ?? '',
    email: profile?.email ?? '',
    mobile_number: profile?.mobile_number ?? '',
    bio: profile?.bio ?? '',
    time_zone: profile?.time_zone ?? '',
    street: profile?.street ?? '',
    country: profile?.country ?? '',
    state: profile?.state ?? '',
    city: profile?.city ?? '',
    zip: profile?.zip ?? '',
  };
}

const panelClassName =
  'mt-10 rounded-[16px] border border-white/5 bg-[#1f1b17] p-6 md:rounded-[20px] md:p-8';

export function ProfileForm({
  profile,
  loading,
  error,
  updateError,
  isUpdating,
  onSave,
  onRetry,
  changePassword,
  isChangingPassword,
  changePasswordError,
}: ProfileFormProps) {
  const initialValues = useMemo(() => buildInitialValues(profile), [profile]);
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ProfileFormValues, string>>>({});
  const [passwordOpen, setPasswordOpen] = useState(false);

  useEffect(() => {
    setValues(buildInitialValues(profile));
    setFieldErrors({});
  }, [profile]);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ProfileFormValues, string>> = {};

    if (!values.first_name.trim() || values.first_name.length > 80) {
      nextErrors.first_name = 'First name is required (max 80 characters)';
    }
    if (!values.last_name.trim() || values.last_name.length > 80) {
      nextErrors.last_name = 'Last name is required (max 80 characters)';
    }
    if (!EMAIL_REGEX.test(values.email)) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (values.mobile_number && !PHONE_REGEX.test(values.mobile_number)) {
      nextErrors.mobile_number = 'Enter a valid phone number';
    }
    if (values.zip && !ZIP_REGEX.test(values.zip)) {
      nextErrors.zip = 'Enter a valid ZIP code';
    }
    if (values.street.length > 120) {
      nextErrors.street = 'Street must be 120 characters or fewer';
    }
    if (values.city.length > 80) {
      nextErrors.city = 'City must be 80 characters or fewer';
    }
    if (values.bio.length > 500) {
      nextErrors.bio = 'Bio must be 500 characters or fewer';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      await onSave(values);
      setFieldErrors({});
    } catch (submitError) {
      setFieldErrors(mapProfileFieldErrors(getFieldErrors(submitError)));
    }
  };

  const handleCancel = () => {
    setValues(initialValues);
    setFieldErrors({});
  };

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div className={panelClassName}>
        <ErrorBanner message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (!profile) {
    return <ProfileEmptyState />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`${panelClassName} space-y-10 md:space-y-12`}>
        <section aria-labelledby="personal-details-heading" className="space-y-5">
          <h2
            id="personal-details-heading"
            className="font-display text-[22px] font-medium text-white md:text-[26px]"
          >
            Personal Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField id="first_name" label="First Name" error={fieldErrors.first_name}>
              <input
                id="first_name"
                value={values.first_name}
                onChange={(event) =>
                  setValues((current) => ({ ...current, first_name: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.first_name)}
              />
            </FormField>

            <FormField id="last_name" label="Last Name" error={fieldErrors.last_name}>
              <input
                id="last_name"
                value={values.last_name}
                onChange={(event) =>
                  setValues((current) => ({ ...current, last_name: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.last_name)}
              />
            </FormField>

            <FormField id="email" label="Email" error={fieldErrors.email}>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) =>
                  setValues((current) => ({ ...current, email: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.email)}
              />
            </FormField>

            <FormField id="mobile_number" label="Mobile Number" error={fieldErrors.mobile_number}>
              <input
                id="mobile_number"
                type="tel"
                value={values.mobile_number}
                onChange={(event) =>
                  setValues((current) => ({ ...current, mobile_number: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.mobile_number)}
              />
            </FormField>
          </div>

          <FormField id="bio" label="Bio" error={fieldErrors.bio}>
            <textarea
              id="bio"
              value={values.bio}
              onChange={(event) =>
                setValues((current) => ({ ...current, bio: event.target.value }))
              }
              className={textareaClassName}
              aria-invalid={Boolean(fieldErrors.bio)}
            />
          </FormField>
        </section>

        <section aria-labelledby="timezone-heading" className="space-y-5">
          <h2
            id="timezone-heading"
            className="font-display text-[22px] font-medium text-white md:text-[26px]"
          >
            Time Zone
          </h2>
          <FormField id="time_zone" label="Time Zone" error={fieldErrors.time_zone}>
            <TimezoneSelect
              id="time_zone"
              value={values.time_zone}
              onChange={(value) =>
                setValues((current) => ({ ...current, time_zone: value }))
              }
              error={fieldErrors.time_zone}
            />
          </FormField>
        </section>

        <section aria-labelledby="address-heading" className="space-y-5">
          <h2
            id="address-heading"
            className="font-display text-[22px] font-medium text-white md:text-[26px]"
          >
            Address
          </h2>

          <FormField id="street" label="Street" error={fieldErrors.street}>
            <input
              id="street"
              value={values.street}
              onChange={(event) =>
                setValues((current) => ({ ...current, street: event.target.value }))
              }
              className={inputClassName}
              aria-invalid={Boolean(fieldErrors.street)}
            />
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="country"
              label="Country"
              value={values.country}
              onChange={(event) =>
                setValues((current) => ({ ...current, country: event.target.value }))
              }
              options={COUNTRY_OPTIONS}
              placeholder="Select country"
              error={fieldErrors.country}
            />

            <SelectField
              id="state"
              label="State"
              value={values.state}
              onChange={(event) =>
                setValues((current) => ({ ...current, state: event.target.value }))
              }
              options={STATE_OPTIONS}
              placeholder="Select state"
              error={fieldErrors.state}
            />

            <FormField id="city" label="City" error={fieldErrors.city}>
              <input
                id="city"
                value={values.city}
                onChange={(event) =>
                  setValues((current) => ({ ...current, city: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.city)}
              />
            </FormField>

            <FormField id="zip" label="ZIP" error={fieldErrors.zip}>
              <input
                id="zip"
                value={values.zip}
                onChange={(event) =>
                  setValues((current) => ({ ...current, zip: event.target.value }))
                }
                className={inputClassName}
                aria-invalid={Boolean(fieldErrors.zip)}
              />
            </FormField>
          </div>
        </section>

        {updateError ? (
          <p className="text-sm text-[#ff5630]" role="alert">
            {updateError}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setPasswordOpen(true)}
            className={secondaryButtonClassName}
          >
            Change Password
          </button>

          <div className="flex flex-wrap gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDirty || isUpdating}
              className={secondaryButtonClassName}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isUpdating}
              className={primaryButtonClassName}
            >
              {isUpdating ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </form>

      <ChangePasswordModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onSubmit={changePassword}
        isSubmitting={isChangingPassword}
        error={changePasswordError}
      />
    </>
  );
}

export type { ProfileFormValues };
