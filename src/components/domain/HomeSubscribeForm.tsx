import { useState, type FormEvent } from 'react';

import SuccessMessage from '@/components/domain/SuccessMessage';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import FormSkeleton from '@/components/ui/FormSkeleton';
import Input from '@/components/ui/input';
import TextLink from '@/components/ui/link';
import Textarea from '@/components/ui/textarea';
import { acceptHomeTerms, subscribeHome } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,}$/;

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  privacy_accepted?: string;
  terms_accepted?: string;
  form?: string;
}

export default function HomeSubscribeForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [marketing, setMarketing] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!firstName.trim()) {
      nextErrors.first_name = 'Enter your first name.';
    }
    if (!lastName.trim()) {
      nextErrors.last_name = 'Enter your last name.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!phone.trim()) {
      nextErrors.phone = 'Enter your phone number.';
    } else if (!PHONE_PATTERN.test(phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number.';
    }
    if (!privacyAccepted) {
      nextErrors.privacy_accepted = 'Agree to the Privacy Policy to continue.';
    }
    if (!termsAccepted) {
      nextErrors.terms_accepted = 'Agree to the Terms of Service to continue.';
    }

    return nextErrors;
  }

  async function submitForm(): Promise<void> {
    const nextErrors = validate();
    setErrors(nextErrors);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const termsResponse = await acceptHomeTerms({
        privacy_accepted: true,
        terms_accepted: true,
      });
      if (termsResponse.success === false) {
        setErrors({ form: termsResponse.message });
        return;
      }

      const response = await subscribeHome({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      if (response.success === false) {
        setErrors({ form: response.message });
        return;
      }
      setSuccessMessage(response.message || 'You have joined the waitlist.');
      setErrors({});
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      setErrors({
        form: parsed.message,
        first_name: parsed.errors.first_name?.[0],
        last_name: parsed.errors.last_name?.[0],
        email: parsed.errors.email?.[0],
        phone: parsed.errors.phone?.[0],
        privacy_accepted: parsed.errors.privacy_accepted?.[0],
        terms_accepted: parsed.errors.terms_accepted?.[0],
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await submitForm();
  }

  if (successMessage) {
    return <SuccessMessage message={successMessage} />;
  }

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      {errors.form && !isSubmitting ? (
        <div className="mb-4">
          <ErrorAlert message={errors.form} onRetry={() => void submitForm()} />
        </div>
      ) : null}

      {isSubmitting ? (
        <FormSkeleton label="Joining the waitlist" lines={6} shape="soft" />
      ) : (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <Input
              name="first_name"
              autoComplete="given-name"
              label="First Name"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={errors.first_name}
              shape="soft"
              containerClassName="w-full"
              required
            />
            <Input
              name="last_name"
              autoComplete="family-name"
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={errors.last_name}
              shape="soft"
              containerClassName="w-full"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              shape="soft"
              containerClassName="w-full"
              required
            />
            <Input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              label="Phone number"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              error={errors.phone}
              shape="soft"
              containerClassName="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              name="industry"
              label="How long have you been in Real Estate?"
              placeholder="How long have you been in Real Estate?"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              shape="soft"
              containerClassName="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              name="marketing"
              label="What do you currently do for marketing your business?"
              placeholder="What do you currently do for marketing your business?"
              value={marketing}
              onChange={(event) => setMarketing(event.target.value)}
              shape="soft"
              containerClassName="w-full"
            />
          </div>
          <div className="mb-4">
            <Textarea
              name="message"
              label="Your Message"
              placeholder="Your Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Checkbox
              id="home-privacy"
              name="privacy_accepted"
              checked={privacyAccepted}
              onChange={(event) => setPrivacyAccepted(event.target.checked)}
              error={errors.privacy_accepted}
              containerClassName="w-full"
              label={
                <>
                  I agree to the{' '}
                  <TextLink
                    to="/privacy-policy"
                    className="text-color-18"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Privacy Policy
                  </TextLink>
                  .
                </>
              }
            />
          </div>
          <div className="mb-6">
            <Checkbox
              id="home-terms"
              name="terms_accepted"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              error={errors.terms_accepted}
              containerClassName="w-full"
              label={
                <>
                  I agree to the{' '}
                  <TextLink
                    to="/terms-of-service"
                    className="text-color-18"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Terms of Service
                  </TextLink>
                  .
                </>
              }
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="max-w-xs text-secondary"
              aria-label="Join the waitlist now"
            >
              Join the waitlist now
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
