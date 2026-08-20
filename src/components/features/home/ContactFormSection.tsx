import { useState } from 'react';
import type { ContactFormValues, FormFieldErrors } from '../../../types/visitor';
import CheckboxField from './CheckboxField';
import HomeButton from './HomeButton';
import InputField from './InputField';

const initialValues: ContactFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  city_state: '',
  goal: '',
  message: '',
  privacy_policy: false,
  terms_of_service: false,
};

interface ContactFormSectionProps {
  onSubmit: (values: ContactFormValues) => Promise<boolean>;
  fieldErrors: FormFieldErrors;
  submitStatus: 'idle' | 'loading' | 'success' | 'error';
  submitMessage: string | null;
  initialLoading: boolean;
}

const ContactFormSection = ({
  onSubmit,
  fieldErrors,
  submitStatus,
  submitMessage,
  initialLoading,
}: ContactFormSectionProps) => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);

  const updateField = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(values);
    if (success) {
      setValues(initialValues);
    }
  };

  const isSubmitting = submitStatus === 'loading';

  return (
    <section id="contact" className="grid lg:grid-cols-2">
      <div className="relative min-h-[400px] lg:min-h-[700px]">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop"
          alt="Real estate professional on a phone call"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-16)]/80 via-[var(--color-16)]/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-8 lg:p-12">
          <p className="font-almarai text-xs font-bold uppercase tracking-widest text-accent">
            Everyone&apos;s waiting
          </p>
          <p className="mt-2 font-garamond text-2xl font-medium text-secondary md:text-3xl lg:text-4xl">
            to buy until &lsquo;the market is right&rsquo;
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-20)] px-6 py-16 lg:px-12 lg:py-20">
        <h2 className="font-garamond text-3xl font-medium text-accent md:text-4xl">
          Let&apos;s Work Together
        </h2>
        <p className="mt-3 font-almarai text-sm text-[var(--color-57)]">
          Fill out the form below and join our network of top-performing agents.
        </p>

        {submitStatus === 'success' && submitMessage && (
          <div
            className="mt-6 rounded-lg border border-[var(--color-28)] bg-[var(--color-39)] px-4 py-3 font-almarai text-sm text-[var(--color-28)]"
            role="status"
          >
            {submitMessage}
          </div>
        )}

        {submitStatus === 'error' && submitMessage && (
          <div
            className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--error)] px-4 py-3 font-almarai text-sm text-[var(--border)]"
            role="alert"
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              id="first_name"
              label="First Name"
              value={values.first_name}
              onChange={(v) => updateField('first_name', v)}
              error={fieldErrors.first_name}
              disabled={isSubmitting}
              loading={initialLoading}
              placeholder="Jane"
            />
            <InputField
              id="last_name"
              label="Last Name"
              value={values.last_name}
              onChange={(v) => updateField('last_name', v)}
              error={fieldErrors.last_name}
              disabled={isSubmitting}
              loading={initialLoading}
              placeholder="Smith"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(v) => updateField('email', v)}
              error={fieldErrors.email}
              disabled={isSubmitting}
              loading={initialLoading}
              placeholder="jane@example.com"
            />
            <InputField
              id="phone"
              label="Phone number"
              type="tel"
              value={values.phone}
              onChange={(v) => updateField('phone', v)}
              error={fieldErrors.phone}
              disabled={isSubmitting}
              loading={initialLoading}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <InputField
            id="city_state"
            label="What city / state is your business in?"
            value={values.city_state}
            onChange={(v) => updateField('city_state', v)}
            error={fieldErrors.city_state}
            disabled={isSubmitting}
            loading={initialLoading}
            placeholder="Austin, TX"
          />

          <InputField
            id="goal"
            label="What is your main goal in joining our network?"
            value={values.goal}
            onChange={(v) => updateField('goal', v)}
            error={fieldErrors.goal}
            disabled={isSubmitting}
            loading={initialLoading}
            placeholder="Grow my social media presence"
          />

          <InputField
            id="message"
            label="Your Message"
            type="textarea"
            value={values.message}
            onChange={(v) => updateField('message', v)}
            error={fieldErrors.message}
            disabled={isSubmitting}
            loading={initialLoading}
            placeholder="Tell us about your business..."
          />

          <div className="space-y-3 pt-2">
            <CheckboxField
              id="privacy_policy"
              checked={values.privacy_policy}
              onChange={(v) => updateField('privacy_policy', v)}
              error={fieldErrors.privacy_policy}
              disabled={isSubmitting}
              label={
                <>
                  I agree to the{' '}
                  <a href="#privacy" className="text-accent underline hover:opacity-80">
                    Privacy Policy
                  </a>
                </>
              }
            />
            <CheckboxField
              id="terms_of_service"
              checked={values.terms_of_service}
              onChange={(v) => updateField('terms_of_service', v)}
              error={fieldErrors.terms_of_service}
              disabled={isSubmitting}
              label={
                <>
                  I agree to the{' '}
                  <a href="#terms" className="text-accent underline hover:opacity-80">
                    Terms of Service
                  </a>
                </>
              }
            />
          </div>

          <HomeButton
            type="submit"
            variant="dark"
            loading={isSubmitting}
            disabled={initialLoading}
            className="w-full"
            ariaLabel="Join the waitlist"
          >
            Join the waitlist now
          </HomeButton>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
