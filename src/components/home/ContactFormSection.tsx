import type { FormEvent } from 'react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormCheckbox } from '@/components/ui/FormCheckbox';
import { FormInput } from '@/components/ui/FormInput';
import { ApiError } from '@/lib/api/client';
import { acceptTerms, subscribeToWaitlist } from '@/lib/api/visitor';
import {
  hasFormErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
} from '@/lib/validation/homeForm';

const initialValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  privacyPolicy: false,
  termsOfService: false,
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactFormSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = useCallback((field: ContactFormField, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSubmitError(null);
  }, []);

  const handleBlur = useCallback(
    (field: ContactFormField) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validateContactForm(values);
      if (fieldErrors[field] !== undefined) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [values],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      privacyPolicy: true,
      termsOfService: true,
    });

    if (hasFormErrors(validationErrors)) {
      return;
    }

    setSubmitStatus('loading');
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const subscribeResponse = await subscribeToWaitlist({
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });

      await acceptTerms({
        privacy_policy: values.privacyPolicy,
        terms_of_service: values.termsOfService,
        email: values.email.trim(),
      });

      setSubmitStatus('success');
      setSuccessMessage(subscribeResponse.message);
      setValues(initialValues);
      setTouched({});
    } catch (error) {
      setSubmitStatus('error');

      if (error instanceof ApiError) {
        setSubmitError(error.message);

        if (Object.keys(error.fieldErrors).length > 0) {
          const apiErrors: ContactFormErrors = {};
          const fieldMap: Record<string, ContactFormField> = {
            first_name: 'firstName',
            last_name: 'lastName',
            email: 'email',
            phone: 'phone',
            privacy_policy: 'privacyPolicy',
            terms_of_service: 'termsOfService',
          };

          for (const [apiField, messages] of Object.entries(error.fieldErrors)) {
            const formField = fieldMap[apiField];
            if (formField !== undefined && messages.length > 0) {
              apiErrors[formField] = messages[0];
            }
          }

          setErrors((prev) => ({ ...prev, ...apiErrors }));
        }
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    }
  };

  const showError = (field: ContactFormField): string | undefined => {
    return touched[field] === true ? errors[field] : undefined;
  };

  const isSubmitting = submitStatus === 'loading';

  return (
    <section aria-labelledby="contact-heading" className="bg-color-16">
      <div className="desktop:flex">
        <div className="relative min-h-[400px] desktop:min-h-[600px] desktop:w-1/2">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(135deg,#3a3541_0%,#1a1919_50%,#473e33_100%)]"
          />
          <div className="relative flex h-full flex-col justify-end p-32 desktop:p-52">
            <p className="type-heading-xl-100 uppercase leading-[0.95] text-white/90">
              Everyone&apos;s Waiting
            </p>
            <p className="type-heading-lg-114 mt-8 text-white/70">
              to buy with &lsquo;the market is right&rsquo;
            </p>
          </div>
        </div>

        <div className="px-20 py-40 desktop:w-1/2 desktop:px-52 desktop:py-60">
          <div className="mx-auto w-full max-w-[440px]">
            <div className="mb-24 flex h-48 w-48 items-center justify-center rounded-full border border-color-41 bg-color-23">
              <span className="type-heading-lg-108 text-accent">A</span>
            </div>

            <h2 id="contact-heading" className="type-heading-lg-48 text-white">
              Let&apos;s Work Together
            </h2>

            {submitStatus === 'success' && successMessage !== null ? (
              <div
                role="status"
                className="type-body-sm-2 mt-20 rounded-8 border border-color-28 bg-color-39 px-16 py-12 text-color-28"
              >
                {successMessage}
              </div>
            ) : null}

            {submitError !== null && submitStatus === 'error' ? (
              <div
                role="alert"
                className="type-body-sm-2 mt-20 rounded-8 border border-color-45/30 bg-color-45/10 px-16 py-12 text-color-45"
              >
                {submitError}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} noValidate className="mt-32 flex flex-col gap-20">
              <div className="grid grid-cols-1 gap-20 tablet:grid-cols-2">
                <FormInput
                  id="contact-first-name"
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={(value) => {
                    updateField('firstName', value);
                  }}
                  onBlur={() => {
                    handleBlur('firstName');
                  }}
                  error={showError('firstName')}
                  isLoading={false}
                  autoComplete="given-name"
                />
                <FormInput
                  id="contact-last-name"
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={(value) => {
                    updateField('lastName', value);
                  }}
                  onBlur={() => {
                    handleBlur('lastName');
                  }}
                  error={showError('lastName')}
                  autoComplete="family-name"
                />
              </div>

              <FormInput
                id="contact-email"
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={(value) => {
                  updateField('email', value);
                }}
                onBlur={() => {
                  handleBlur('email');
                }}
                error={showError('email')}
                autoComplete="email"
              />

              <FormInput
                id="contact-phone"
                label="Phone Number"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(value) => {
                  updateField('phone', value);
                }}
                onBlur={() => {
                  handleBlur('phone');
                }}
                error={showError('phone')}
                autoComplete="tel"
              />

              <FormCheckbox
                id="contact-privacy"
                name="privacyPolicy"
                label={
                  <>
                    I agree to the{' '}
                    <Link to="/privacy" className="text-accent underline hover:text-color-30">
                      Privacy Policy
                    </Link>
                  </>
                }
                checked={values.privacyPolicy}
                onChange={(checked) => {
                  updateField('privacyPolicy', checked);
                }}
                error={showError('privacyPolicy')}
              />

              <FormCheckbox
                id="contact-terms"
                name="termsOfService"
                label={
                  <>
                    I agree to the{' '}
                    <Link to="/terms" className="text-accent underline hover:text-color-30">
                      Terms of Service
                    </Link>
                  </>
                }
                checked={values.termsOfService}
                onChange={(checked) => {
                  updateField('termsOfService', checked);
                }}
                error={showError('termsOfService')}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="type-body-sm-2 mt-8 inline-flex h-44 w-full items-center justify-center rounded-full border border-color-41 bg-color-23 text-white transition-colors duration-200 hover:border-accent hover:bg-color-41 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting…' : 'Join the waitlist now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
