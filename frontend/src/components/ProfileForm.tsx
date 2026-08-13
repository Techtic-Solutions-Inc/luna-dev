import { useEffect, useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import type { UserProfile } from '../types/api';
import './ProfileForm.css';

interface ProfileFormProps {
  profile: UserProfile;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function ProfileForm({
  profile,
  loading,
  error,
  onRetry,
}: ProfileFormProps) {
  const formId = useId();
  const { updateProfile, loading: saving, error: saveError, success, resetStatus } =
    useUpdateProfile();

  const [form, setForm] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    mobile: profile.mobile,
    bio: profile.bio,
    timezone: profile.timezone,
    street: profile.street,
    country: profile.country,
    state: profile.state,
    city: profile.city,
    zip: profile.zip,
  });

  useEffect(() => {
    setForm({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      mobile: profile.mobile,
      bio: profile.bio,
      timezone: profile.timezone,
      street: profile.street,
      country: profile.country,
      state: profile.state,
      city: profile.city,
      zip: profile.zip,
    });
  }, [profile]);

  const handleChange = (
    field: keyof typeof form,
    value: string,
  ) => {
    resetStatus();
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProfile(form);
  };

  const handleCancel = () => {
    resetStatus();
    setForm({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      mobile: profile.mobile,
      bio: profile.bio,
      timezone: profile.timezone,
      street: profile.street,
      country: profile.country,
      state: profile.state,
      city: profile.city,
      zip: profile.zip,
    });
  };

  if (loading) {
    return (
      <div className="profile-form__state" role="status" aria-live="polite">
        <span className="profile-form__spinner" aria-hidden="true" />
        Loading profile details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-form__state profile-form__state--error" role="alert">
        <p>{error}</p>
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className="profile-form"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      noValidate
    >
      {saveError ? (
        <p className="profile-form__banner profile-form__banner--error" role="alert">
          {saveError}
        </p>
      ) : null}

      {success ? (
        <p className="profile-form__banner profile-form__banner--success" role="status">
          Profile saved successfully.
        </p>
      ) : null}

      <section className="profile-form__section" aria-labelledby={`${formId}-personal`}>
        <h2 id={`${formId}-personal`} className="profile-form__section-title">
          Personal Details
        </h2>

        <div className="profile-form__grid profile-form__grid--two">
          <div className="profile-form__field">
            <label htmlFor={`${formId}-first-name`}>First Name</label>
            <input
              id={`${formId}-first-name`}
              name="first_name"
              type="text"
              autoComplete="given-name"
              value={form.first_name}
              onChange={(event) => {
                handleChange('first_name', event.target.value);
              }}
            />
          </div>

          <div className="profile-form__field">
            <label htmlFor={`${formId}-last-name`}>Last Name</label>
            <input
              id={`${formId}-last-name`}
              name="last_name"
              type="text"
              autoComplete="family-name"
              value={form.last_name}
              onChange={(event) => {
                handleChange('last_name', event.target.value);
              }}
            />
          </div>
        </div>

        <div className="profile-form__grid profile-form__grid--two">
          <div className="profile-form__field">
            <label htmlFor={`${formId}-email`}>Email</label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => {
                handleChange('email', event.target.value);
              }}
            />
          </div>

          <div className="profile-form__field">
            <label htmlFor={`${formId}-mobile`}>Mobile Number</label>
            <input
              id={`${formId}-mobile`}
              name="mobile"
              type="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={(event) => {
                handleChange('mobile', event.target.value);
              }}
            />
          </div>
        </div>

        <div className="profile-form__field">
          <label htmlFor={`${formId}-bio`}>Bio</label>
          <textarea
            id={`${formId}-bio`}
            name="bio"
            rows={4}
            value={form.bio}
            onChange={(event) => {
              handleChange('bio', event.target.value);
            }}
          />
        </div>
      </section>

      <section className="profile-form__section" aria-labelledby={`${formId}-timezone`}>
        <h2 id={`${formId}-timezone`} className="profile-form__section-title">
          Time Zone
        </h2>

        <div className="profile-form__field profile-form__field--select">
          <label htmlFor={`${formId}-timezone-input`} className="visually-hidden">
            Time Zone
          </label>
          <select
            id={`${formId}-timezone-input`}
            name="timezone"
            value={form.timezone}
            onChange={(event) => {
              handleChange('timezone', event.target.value);
            }}
          >
            <option value="Time zone in Washington, DC, USA (GMT-4)">
              Time zone in Washington, DC, USA (GMT-4)
            </option>
            <option value="Time zone in New York, NY, USA (GMT-4)">
              Time zone in New York, NY, USA (GMT-4)
            </option>
            <option value="Time zone in Los Angeles, CA, USA (GMT-7)">
              Time zone in Los Angeles, CA, USA (GMT-7)
            </option>
          </select>
        </div>
      </section>

      <section className="profile-form__section" aria-labelledby={`${formId}-address`}>
        <h2 id={`${formId}-address`} className="profile-form__section-title">
          Address
        </h2>

        <div className="profile-form__field">
          <label htmlFor={`${formId}-street`}>Street</label>
          <input
            id={`${formId}-street`}
            name="street"
            type="text"
            autoComplete="street-address"
            value={form.street}
            onChange={(event) => {
              handleChange('street', event.target.value);
            }}
          />
        </div>

        <div className="profile-form__grid profile-form__grid--two">
          <div className="profile-form__field profile-form__field--select">
            <label htmlFor={`${formId}-country`}>Country</label>
            <select
              id={`${formId}-country`}
              name="country"
              value={form.country}
              onChange={(event) => {
                handleChange('country', event.target.value);
              }}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="profile-form__field profile-form__field--select">
            <label htmlFor={`${formId}-state`}>State</label>
            <select
              id={`${formId}-state`}
              name="state"
              value={form.state}
              onChange={(event) => {
                handleChange('state', event.target.value);
              }}
            >
              <option value="District of Columbia">District of Columbia</option>
              <option value="Virginia">Virginia</option>
              <option value="Maryland">Maryland</option>
            </select>
          </div>
        </div>

        <div className="profile-form__grid profile-form__grid--two">
          <div className="profile-form__field profile-form__field--select">
            <label htmlFor={`${formId}-city`}>City</label>
            <select
              id={`${formId}-city`}
              name="city"
              value={form.city}
              onChange={(event) => {
                handleChange('city', event.target.value);
              }}
            >
              <option value="Washington">Washington</option>
              <option value="Arlington">Arlington</option>
            </select>
          </div>

          <div className="profile-form__field">
            <label htmlFor={`${formId}-zip`}>ZIP</label>
            <input
              id={`${formId}-zip`}
              name="zip"
              type="text"
              autoComplete="postal-code"
              value={form.zip}
              onChange={(event) => {
                handleChange('zip', event.target.value);
              }}
            />
          </div>
        </div>
      </section>

      <div className="profile-form__actions">
        <Link className="profile-form__change-password" to="/forgot-password">
          Change Password
        </Link>

        <div className="profile-form__action-group">
          <Button type="submit" className="profile-form__save" loading={saving}>
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="profile-form__cancel"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
