import { type FormEvent, useId, useState } from 'react';
import { useSubmitEmail } from '../../hooks/useSubmitEmail';
import type { SubmitEmailRequest } from '../../types/api';
import { StaticImage } from '../ui/StaticImage';

const INITIAL_FORM: SubmitEmailRequest = {
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  years_in_real_estate: '',
  current_marketing: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClassName =
  'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder:text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors focus:border-gold/70 focus:outline-none';

export function EmailForm() {
  const { status, error, message, submitEmail } = useSubmitEmail();
  const [form, setForm] = useState<SubmitEmailRequest>(INITIAL_FORM);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const statusId = useId();
  const isLoading = status === 'loading';

  const updateField = (key: keyof SubmitEmailRequest, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email.trim()) {
      setFieldError('Please enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setFieldError('Enter a valid email address.');
      return;
    }
    const succeeded = await submitEmail(form);
    if (succeeded) {
      setForm(INITIAL_FORM);
    }
  };

  const statusMessage = fieldError ?? error ?? message;
  const statusTone =
    fieldError || status === 'error' || status === 'empty'
      ? 'text-red-300'
      : status === 'success'
        ? 'text-gold'
        : 'text-white/70';

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      noValidate
      className="flex h-full flex-col rounded-[28px] border border-white/10 px-6 py-8 md:px-10 md:py-10"
      style={{
        background:
          'linear-gradient(180deg, rgba(70,48,32,0.45) 0%, rgba(18,14,12,0.92) 42%, rgba(10,9,9,0.96) 100%)',
      }}
      aria-describedby={statusId}
    >
      <StaticImage
        src="/assets/figma/form-mark.png"
        alt="Agentwise"
        className="mx-auto mb-5 h-16 w-16 object-contain"
        width={64}
        height={64}
      />
      <h2 className="text-center font-serif text-[32px] font-medium text-white md:text-[40px]">
        Let&apos;s Work Together
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="sr-only">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            autoComplete="given-name"
            placeholder="First Name"
            className={inputClassName}
            value={form.first_name}
            onChange={(event) => updateField('first_name', event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="sr-only">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            autoComplete="family-name"
            placeholder="Last Name"
            className={inputClassName}
            value={form.last_name}
            onChange={(event) => updateField('last_name', event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            className={inputClassName}
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(fieldError) || status === 'error' || status === 'empty'}
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            className={inputClassName}
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="years_in_real_estate" className="sr-only">
            How long have you been in Real Estate?
          </label>
          <input
            id="years_in_real_estate"
            name="years_in_real_estate"
            placeholder="How long have you been in Real Estate?"
            className={inputClassName}
            value={form.years_in_real_estate}
            onChange={(event) => updateField('years_in_real_estate', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="current_marketing" className="sr-only">
            What do you currently do for marketing your business?
          </label>
          <input
            id="current_marketing"
            name="current_marketing"
            placeholder="What do you currently do for marketing your business?"
            className={inputClassName}
            value={form.current_marketing}
            onChange={(event) => updateField('current_marketing', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your Message"
            className={`${inputClassName} min-h-[120px] resize-y`}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
        </div>
      </div>

      <p id={statusId} className={`mt-4 min-h-[1.25rem] text-center text-sm ${statusTone}`} role="status" aria-live="polite">
        {isLoading ? 'Submitting your details…' : (statusMessage ?? '')}
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className="mx-auto mt-4 inline-flex min-h-12 w-full max-w-[280px] items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(180deg,#3a2c26_0%,#16110f_100%)] px-8 text-[15px] text-white shadow-[0_0_24px_rgba(200,164,126,0.18)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Joining…' : 'Join the waitlist now'}
      </button>
    </form>
  );
}
