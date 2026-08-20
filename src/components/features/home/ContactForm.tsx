import { type FormEvent, useState } from 'react';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Input from '../../ui/Input';
import { acceptHomeTerms, getApiErrorMessage, subscribeHome } from '../../../lib/api/client';
import {
  emptyHomeForm,
  validateHomeForm,
  type HomeContactForm,
} from '../../../lib/home';

interface ContactFormProps {
  fieldsLoading?: boolean;
}

export default function ContactForm({ fieldsLoading = false }: ContactFormProps) {
  const [form, setForm] = useState<HomeContactForm>(emptyHomeForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const updateField = <K extends keyof HomeContactForm>(key: K, value: HomeContactForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateHomeForm(form);
    setErrors(nextErrors);
    setSuccess(null);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await acceptHomeTerms({
        privacy_policy: true,
        terms_of_service: true,
        email: form.email.trim(),
      });
      const response = await subscribeHome({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setSuccess(response.message || 'Thanks — you are on the Agentwise waitlist.');
      setForm(emptyHomeForm);
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const loading = fieldsLoading || submitting;

  return (
    <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {formError ? (
        <p
          className="rounded-lg border border-[var(--border)] bg-[var(--error)] px-4 py-3 font-almarai text-sm text-secondary"
          role="alert"
        >
          {formError}
        </p>
      ) : null}
      {success ? (
        <p
          className="rounded-lg border border-[var(--color-28)] bg-[var(--color-39)] px-4 py-3 font-almarai text-sm text-[var(--color-28)]"
          role="status"
        >
          {success}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="first_name"
          name="first_name"
          label="First Name"
          hideLabel
          placeholder="First Name"
          autoComplete="given-name"
          value={form.first_name}
          onChange={(event) => updateField('first_name', event.target.value)}
          error={errors.first_name}
          loading={loading}
        />
        <Input
          id="last_name"
          name="last_name"
          label="Last Name"
          hideLabel
          placeholder="Last Name"
          autoComplete="family-name"
          value={form.last_name}
          onChange={(event) => updateField('last_name', event.target.value)}
          error={errors.last_name}
          loading={loading}
        />
      </div>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        hideLabel
        placeholder="Email"
        autoComplete="email"
        value={form.email}
        onChange={(event) => updateField('email', event.target.value)}
        error={errors.email}
        loading={loading}
      />
      <Input
        id="phone"
        name="phone"
        type="tel"
        label="Phone number"
        hideLabel
        placeholder="Phone number"
        autoComplete="tel"
        value={form.phone}
        onChange={(event) => updateField('phone', event.target.value)}
        error={errors.phone}
        loading={loading}
      />
      <Input
        id="primary_market"
        name="primary_market"
        label="What city is your primary market?"
        hideLabel
        placeholder="What city is your primary market?"
        value={form.primary_market}
        onChange={(event) => updateField('primary_market', event.target.value)}
        loading={loading}
      />
      <Input
        id="content_focus"
        name="content_focus"
        label="What is your main focus in choosing your content?"
        hideLabel
        placeholder="What is your main focus in choosing your content?"
        value={form.content_focus}
        onChange={(event) => updateField('content_focus', event.target.value)}
        loading={loading}
      />
      <Input
        id="message"
        name="message"
        label="Your Message"
        hideLabel
        placeholder="Your Message"
        multiline
        rows={4}
        value={form.message}
        onChange={(event) => updateField('message', event.target.value)}
        loading={loading}
      />

      <Checkbox
        id="privacy_policy"
        name="privacy_policy"
        checked={form.privacy_policy}
        onChange={(event) => updateField('privacy_policy', event.target.checked)}
        error={errors.privacy_policy}
      >
        I agree to the{' '}
        <a href="#privacy" className="text-accent underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </Checkbox>
      <Checkbox
        id="terms_of_service"
        name="terms_of_service"
        checked={form.terms_of_service}
        onChange={(event) => updateField('terms_of_service', event.target.checked)}
        error={errors.terms_of_service}
      >
        I agree to the{' '}
        <a href="#terms" className="text-accent underline-offset-2 hover:underline">
          Terms of Service
        </a>
        .
      </Checkbox>

      <div className="pt-2 text-center">
        <Button
          type="submit"
          variant="dark"
          loading={submitting}
          className="w-full max-w-xs bg-[var(--color-47)] text-secondary"
          aria-label="Join the waitlist now"
        >
          Join the waitlist now
        </Button>
      </div>
    </form>
  );
}
