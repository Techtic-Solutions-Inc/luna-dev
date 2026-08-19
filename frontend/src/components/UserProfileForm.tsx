import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useProfile } from '../hooks/useProfile';
import type { ProfileData, ProfileUpdatePayload } from '../types/api';
import {
  hasProfileFieldErrors,
  validateProfileForm,
  type ProfileFieldErrors,
} from '../lib/profileValidation';
import ChangePasswordForm from './ChangePasswordForm';
import { ChevronDownIcon } from './icons';

const inputClassName =
  'box-border h-12 w-full rounded-full border border-white/10 bg-[#26231f] px-5 text-[15px] text-white transition-colors duration-200 placeholder:text-[#858585] hover:border-white/20 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const inputErrorClassName =
  'border-[#C78272] focus-visible:border-[#C78272] focus-visible:ring-[#C78272]';

const textareaClassName =
  'box-border min-h-[120px] w-full resize-y rounded-[20px] border border-white/10 bg-[#26231f] px-5 py-4 text-[15px] leading-6 text-white transition-colors duration-200 placeholder:text-[#858585] hover:border-white/20 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const selectClassName = `${inputClassName} appearance-none pr-12`;

const TIMEZONE_OPTIONS = [
  {
    value: 'America/New_York',
    label: 'Time zone in Washington, DC, USA (GMT-4)',
  },
  {
    value: 'America/Chicago',
    label: 'Time zone in Chicago, IL, USA (GMT-5)',
  },
  {
    value: 'America/Denver',
    label: 'Time zone in Denver, CO, USA (GMT-6)',
  },
  {
    value: 'America/Los_Angeles',
    label: 'Time zone in Los Angeles, CA, USA (GMT-7)',
  },
  {
    value: 'America/Phoenix',
    label: 'Time zone in Phoenix, AZ, USA (GMT-7)',
  },
  {
    value: 'Pacific/Honolulu',
    label: 'Time zone in Honolulu, HI, USA (GMT-10)',
  },
] as const;

const COUNTRY_OPTIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
] as const;

const US_STATE_OPTIONS = [
  'Alabama',
  'Alaska',
  'Arizona',
  'California',
  'Colorado',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Illinois',
  'Massachusetts',
  'Nevada',
  'New York',
  'Texas',
  'Virginia',
  'Washington',
] as const;

function createEmptyFormValues(): ProfileUpdatePayload {
  return {
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    bio: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    time_zone: '',
  };
}

function profileToFormValues(profile: ProfileData): ProfileUpdatePayload {
  return {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    mobile_number: profile.mobile_number,
    bio: profile.bio,
    street: profile.street,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    country: profile.country,
    time_zone: profile.time_zone,
  };
}

function ProfileFormSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading profile details"
      className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
    >
      <span className="sr-only">Loading profile details</span>
      <div className="border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
        <div className="h-7 w-44 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-6 px-5 py-6 md:px-8 md:py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-12 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-12 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="h-28 animate-pulse rounded-[20px] bg-white/10" />
      </div>
      <div className="border-t border-white/5 px-5 py-5 md:px-8 md:py-6">
        <div className="h-7 w-32 animate-pulse rounded bg-white/10" />
        <div className="mt-4 h-12 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="border-t border-white/5 px-5 py-5 md:px-8 md:py-6">
        <div className="h-7 w-24 animate-pulse rounded bg-white/10" />
        <div className="mt-4 space-y-4">
          <div className="h-12 animate-pulse rounded-full bg-white/10" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-12 animate-pulse rounded-full bg-white/10" />
            <div className="h-12 animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-12 animate-pulse rounded-full bg-white/10" />
            <div className="h-12 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-white/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
        <div className="h-11 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="flex gap-3">
          <div className="h-11 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-11 w-24 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-[#C78272]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[] | readonly string[];
  placeholder?: string;
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  options,
  placeholder,
}: SelectFieldProps) {
  const normalizedOptions = options.map((option) =>
    typeof option === 'string'
      ? { value: option, label: option }
      : option,
  );

  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            selectClassName,
            error ? inputErrorClassName : '',
            !value ? 'text-[#858585]' : '',
          ].join(' ')}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-[#231A17]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#858585]"
        />
      </div>
    </Field>
  );
}

export default function UserProfileForm() {
  const {
    data,
    loading,
    error,
    updateProfile,
    isSaving,
    refetch,
  } = useProfile();
  const [values, setValues] = useState<ProfileUpdatePayload>(createEmptyFormValues());
  const [savedValues, setSavedValues] = useState<ProfileUpdatePayload>(
    createEmptyFormValues(),
  );
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (data) {
      const nextValues = profileToFormValues(data);
      setValues(nextValues);
      setSavedValues(nextValues);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current !== null) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const updateField = <K extends keyof ProfileUpdatePayload>(
    key: K,
    value: ProfileUpdatePayload[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key];
      delete next.form;
      return next;
    });
    setSaveSuccess(false);
    setFormMessage(null);
  };

  const handleCancel = () => {
    setValues(savedValues);
    setFieldErrors({});
    setFormMessage(null);
    setSaveSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setSaveSuccess(false);

    const validationErrors = validateProfileForm(values);
    if (hasProfileFieldErrors(validationErrors)) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    const result = await updateProfile(values);

    if (result.profile) {
      const nextValues = profileToFormValues(result.profile);
      setValues(nextValues);
      setSavedValues(nextValues);
      setSaveSuccess(true);
      setFormMessage('Profile updated successfully.');
      successTimerRef.current = window.setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return;
    }

    if (Object.keys(result.fieldErrors).length > 0) {
      setFieldErrors(result.fieldErrors);
    }

    if (result.error) {
      setFormMessage(result.error);
    }
  };

  if (loading) {
    return <ProfileFormSkeleton />;
  }

  if (error) {
    return (
      <section
        aria-live="polite"
        className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] px-5 py-10 text-center md:mt-10 md:rounded-[20px] md:px-8"
      >
        <p className="text-[15px] text-[#C78272]">{error}</p>
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          className="focus-ring mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#b48a5d]"
        >
          Try again
        </button>
      </section>
    );
  }

  if (!data) {
    return (
      <section
        aria-live="polite"
        className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] px-5 py-10 text-center md:mt-10 md:rounded-[20px] md:px-8"
      >
        <p className="font-display text-[22px] text-white md:text-[26px]">
          No profile information yet
        </p>
        <p className="mt-3 text-[15px] text-[#A6A4A2]">
          Your profile details will appear here once they are available.
        </p>
      </section>
    );
  }

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
      >
        {formMessage ? (
          <div
            className={[
              'border-b px-5 py-4 text-[14px] md:px-8',
              saveSuccess
                ? 'border-[#3b6c4f]/30 bg-[#3b6c4f]/10 text-[#51ca7e]'
                : 'border-[#C78272]/30 bg-[#C78272]/10 text-[#C78272]',
            ].join(' ')}
            role={saveSuccess ? 'status' : 'alert'}
          >
            {formMessage}
          </div>
        ) : null}

        <section aria-labelledby="personal-details-heading">
          <div className="border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
            <h2
              id="personal-details-heading"
              className="font-display text-[22px] font-medium text-white md:text-[26px]"
            >
              Personal Details
            </h2>
          </div>

          <div className="space-y-4 px-5 py-6 md:space-y-5 md:px-8 md:py-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Field id="first_name" label="First Name" error={fieldErrors.first_name}>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={values.first_name}
                  placeholder="First Name"
                  aria-invalid={Boolean(fieldErrors.first_name)}
                  aria-describedby={
                    fieldErrors.first_name ? 'first_name-error' : undefined
                  }
                  onChange={(event) => updateField('first_name', event.target.value)}
                  className={[
                    inputClassName,
                    fieldErrors.first_name ? inputErrorClassName : '',
                  ].join(' ')}
                />
              </Field>

              <Field id="last_name" label="Last Name" error={fieldErrors.last_name}>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={values.last_name}
                  placeholder="Last Name"
                  aria-invalid={Boolean(fieldErrors.last_name)}
                  aria-describedby={
                    fieldErrors.last_name ? 'last_name-error' : undefined
                  }
                  onChange={(event) => updateField('last_name', event.target.value)}
                  className={[
                    inputClassName,
                    fieldErrors.last_name ? inputErrorClassName : '',
                  ].join(' ')}
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Field id="email" label="Email" error={fieldErrors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  placeholder="Email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  onChange={(event) => updateField('email', event.target.value)}
                  className={[
                    inputClassName,
                    fieldErrors.email ? inputErrorClassName : '',
                  ].join(' ')}
                />
              </Field>

              <Field id="mobile_number" label="Mobile Number" error={fieldErrors.mobile_number}>
                <input
                  id="mobile_number"
                  name="mobile_number"
                  type="tel"
                  autoComplete="tel"
                  value={values.mobile_number}
                  placeholder="Mobile Number"
                  aria-invalid={Boolean(fieldErrors.mobile_number)}
                  aria-describedby={
                    fieldErrors.mobile_number ? 'mobile_number-error' : undefined
                  }
                  onChange={(event) =>
                    updateField('mobile_number', event.target.value)
                  }
                  className={[
                    inputClassName,
                    fieldErrors.mobile_number ? inputErrorClassName : '',
                  ].join(' ')}
                />
              </Field>
            </div>

            <Field id="bio" label="Bio" error={fieldErrors.bio}>
              <textarea
                id="bio"
                name="bio"
                value={values.bio}
                placeholder="Bio"
                aria-invalid={Boolean(fieldErrors.bio)}
                aria-describedby={fieldErrors.bio ? 'bio-error' : undefined}
                onChange={(event) => updateField('bio', event.target.value)}
                className={[
                  textareaClassName,
                  fieldErrors.bio ? inputErrorClassName : '',
                ].join(' ')}
              />
            </Field>
          </div>
        </section>

        <section aria-labelledby="time-zone-heading">
          <div className="border-t border-white/5 px-5 py-5 md:px-8 md:py-6">
            <h2
              id="time-zone-heading"
              className="font-display text-[22px] font-medium text-white md:text-[26px]"
            >
              Time Zone
            </h2>
            <div className="mt-4 md:mt-5">
              <SelectField
                id="time_zone"
                label="Time Zone"
                value={values.time_zone}
                error={fieldErrors.time_zone}
                onChange={(value) => updateField('time_zone', value)}
                options={TIMEZONE_OPTIONS}
                placeholder="Select time zone"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="address-heading">
          <div className="border-t border-white/5 px-5 py-5 md:px-8 md:py-6">
            <h2
              id="address-heading"
              className="font-display text-[22px] font-medium text-white md:text-[26px]"
            >
              Address
            </h2>

            <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
              <Field id="street" label="Street" error={fieldErrors.street}>
                <input
                  id="street"
                  name="street"
                  type="text"
                  autoComplete="street-address"
                  value={values.street}
                  placeholder="Street"
                  aria-invalid={Boolean(fieldErrors.street)}
                  aria-describedby={fieldErrors.street ? 'street-error' : undefined}
                  onChange={(event) => updateField('street', event.target.value)}
                  className={[
                    inputClassName,
                    fieldErrors.street ? inputErrorClassName : '',
                  ].join(' ')}
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <SelectField
                  id="country"
                  label="Country"
                  value={values.country}
                  error={fieldErrors.country}
                  onChange={(value) => updateField('country', value)}
                  options={COUNTRY_OPTIONS}
                  placeholder="Country"
                />

                <SelectField
                  id="state"
                  label="State"
                  value={values.state}
                  error={fieldErrors.state}
                  onChange={(value) => updateField('state', value)}
                  options={US_STATE_OPTIONS}
                  placeholder="State"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <Field id="city" label="City" error={fieldErrors.city}>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={values.city}
                    placeholder="City"
                    aria-invalid={Boolean(fieldErrors.city)}
                    aria-describedby={fieldErrors.city ? 'city-error' : undefined}
                    onChange={(event) => updateField('city', event.target.value)}
                    className={[
                      inputClassName,
                      fieldErrors.city ? inputErrorClassName : '',
                    ].join(' ')}
                  />
                </Field>

                <Field id="zip" label="ZIP" error={fieldErrors.zip}>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    autoComplete="postal-code"
                    value={values.zip}
                    placeholder="ZIP"
                    aria-invalid={Boolean(fieldErrors.zip)}
                    aria-describedby={fieldErrors.zip ? 'zip-error' : undefined}
                    onChange={(event) => updateField('zip', event.target.value)}
                    className={[
                      inputClassName,
                      fieldErrors.zip ? inputErrorClassName : '',
                    ].join(' ')}
                  />
                </Field>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4 border-t border-white/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
          <button
            type="button"
            onClick={() => setChangePasswordOpen(true)}
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-[#646261] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#858585]"
          >
            Change Password
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="focus-ring inline-flex h-11 min-w-[112px] items-center justify-center rounded-full bg-[#26231f] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#332e28] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="focus-ring inline-flex h-11 min-w-[112px] items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </form>

      {changePasswordOpen ? (
        <ChangePasswordForm onClose={() => setChangePasswordOpen(false)} />
      ) : null}
    </>
  );
}
