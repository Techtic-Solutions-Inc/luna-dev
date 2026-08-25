import { useState, type FormEvent } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tenure: string;
  marketing: string;
  message: string;
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tenure: '',
  marketing: '',
  message: '',
};

export function WaitlistForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!values.firstName.trim() || !values.lastName.trim() || !values.email.trim()) {
      setError('Please enter your first name, last name, and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-8 text-center" role="status">
        <p className="font-serif text-3xl text-white">You’re on the list.</p>
        <p className="mt-4 max-w-sm font-sans text-step-desc text-color-131">
          We’ll be in touch at {values.email} when Agentwise opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="waitlist-first">
          First Name
        </label>
        <input
          id="waitlist-first"
          name="firstName"
          autoComplete="given-name"
          placeholder="First Name"
          className="field-input"
          value={values.firstName}
          onChange={(event) => update('firstName', event.target.value)}
          disabled={submitting}
        />
        <label className="sr-only" htmlFor="waitlist-last">
          Last Name
        </label>
        <input
          id="waitlist-last"
          name="lastName"
          autoComplete="family-name"
          placeholder="Last Name"
          className="field-input"
          value={values.lastName}
          onChange={(event) => update('lastName', event.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="field-input"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          disabled={submitting}
        />
        <label className="sr-only" htmlFor="waitlist-phone">
          Phone number
        </label>
        <input
          id="waitlist-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone number"
          className="field-input"
          value={values.phone}
          onChange={(event) => update('phone', event.target.value)}
          disabled={submitting}
        />
      </div>
      <label className="sr-only" htmlFor="waitlist-tenure">
        How long have you been in Real Estate?
      </label>
      <input
        id="waitlist-tenure"
        name="tenure"
        placeholder="How long have you been in Real Estate?"
        className="field-input"
        value={values.tenure}
        onChange={(event) => update('tenure', event.target.value)}
        disabled={submitting}
      />
      <label className="sr-only" htmlFor="waitlist-marketing">
        What do you currently do for marketing your business?
      </label>
      <input
        id="waitlist-marketing"
        name="marketing"
        placeholder="What do you currently do for marketing your business?"
        className="field-input"
        value={values.marketing}
        onChange={(event) => update('marketing', event.target.value)}
        disabled={submitting}
      />
      <label className="sr-only" htmlFor="waitlist-message">
        Your Message
      </label>
      <textarea
        id="waitlist-message"
        name="message"
        placeholder="Your Message"
        className="field-textarea"
        rows={5}
        value={values.message}
        onChange={(event) => update('message', event.target.value)}
        disabled={submitting}
      />
      {error ? (
        <p className="text-center font-sans text-sm text-border" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-2 flex justify-center">
        <button type="submit" className="btn-waitlist" disabled={submitting}>
          {submitting ? 'Joining…' : 'Join the waitlist now'}
        </button>
      </div>
    </form>
  );
}
