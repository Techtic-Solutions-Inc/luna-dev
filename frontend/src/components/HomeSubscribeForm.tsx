import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from 'react';
import { Link } from 'react-router-dom';
import { useVisitorSubscribe } from '../hooks/useVisitorSubscribe';
import { getErrorMessage } from '../types/api';
import {
  getFirstInvalidHomeSubscribeField,
  validateHomeSubscribeForm,
  type HomeSubscribeFieldErrors,
  type HomeSubscribeFieldName,
  type HomeSubscribeFormValues,
} from '../utils/homeSubscribeValidation';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { InputField } from './InputField';
import './HomeSubscribeForm.css';

const INITIAL_VALUES: HomeSubscribeFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  marketing: '',
  message: '',
  privacyAccepted: false,
  termsAccepted: false,
};

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'How long have you been in the industry?' },
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5-10', label: '5–10 years' },
  { value: '10+', label: '10+ years' },
] as const;

const MARKETING_OPTIONS = [
  { value: '', label: 'What is your main focus in choosing your career?' },
  { value: 'personal-brand', label: 'Building a personal brand' },
  { value: 'leads', label: 'Generating buyer and seller leads' },
  { value: 'luxury', label: 'Growing a luxury client base' },
  { value: 'team', label: 'Building or leading a team' },
  { value: 'other', label: 'Other' },
] as const;

function HomeSubscribeFormSkeleton() {
  return (
    <div className="home-subscribe-form__skeleton" aria-hidden="true">
      <div className="home-subscribe-form__skeleton-line" />
      <div className="home-subscribe-form__skeleton-line" />
      <div className="home-subscribe-form__skeleton-line home-subscribe-form__skeleton-line--full" />
      <div className="home-subscribe-form__skeleton-line home-subscribe-form__skeleton-line--full" />
      <div className="home-subscribe-form__skeleton-line home-subscribe-form__skeleton-line--full" />
      <div className="home-subscribe-form__skeleton-line home-subscribe-form__skeleton-line--full" />
      <div className="home-subscribe-form__skeleton-line home-subscribe-form__skeleton-line--full home-subscribe-form__skeleton-line--tall" />
    </div>
  );
}

export function HomeSubscribeForm() {
  const { loading, error, data, subscribe, reset } = useVisitorSubscribe();
  const [values, setValues] = useState<HomeSubscribeFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<HomeSubscribeFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);
  const formErrorId = useId();
  const successMessageId = useId();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const marketingRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const fieldRefs: Record<
    HomeSubscribeFieldName,
    RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>
  > = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phone: phoneRef,
    experience: experienceRef,
    marketing: marketingRef,
    message: messageRef,
    privacyAccepted: privacyRef,
    termsAccepted: termsRef,
  };

  const isSuccess = data !== null;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReady(true);
    }, 350);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (error) {
      formErrorRef.current?.focus();
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      successRef.current?.focus();
    }
  }, [isSuccess]);

  function focusField(field: HomeSubscribeFieldName) {
    const node = fieldRefs[field].current;
    if (node) {
      node.focus();
    }
  }

  function clearFieldError(field: HomeSubscribeFieldName) {
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function updateField<K extends HomeSubscribeFieldName>(
    field: K,
    value: HomeSubscribeFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (submitted) {
      clearFieldError(field);
    }
    if (error) {
      reset();
    }
  }

  function handleTextChange(field: 'firstName' | 'lastName' | 'email' | 'phone') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.value);
    };
  }

  function handleSelectChange(field: 'experience' | 'marketing') {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      updateField(field, event.target.value);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateHomeSubscribeForm(values);
    setFieldErrors(errors);

    const firstInvalid = getFirstInvalidHomeSubscribeField(errors);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    await subscribe({
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      experience: values.experience,
      marketing: values.marketing,
      message: values.message.trim(),
      privacy_accepted: values.privacyAccepted,
      terms_accepted: values.termsAccepted,
    });
  }

  const successMessage =
    data?.message ||
    data?.description ||
    'Thank you for joining the waitlist. We will be in touch soon.';

  if (!ready) {
    return (
      <div className="home-subscribe-form" aria-busy="true" aria-label="Loading form">
        <header className="home-subscribe-form__header">
          <span className="home-subscribe-form__mark" aria-hidden="true">
            A
          </span>
          <h2 className="home-subscribe-form__title">Let&apos;s Work Together</h2>
        </header>
        <HomeSubscribeFormSkeleton />
      </div>
    );
  }

  return (
    <form className="home-subscribe-form" onSubmit={handleSubmit} noValidate>
      <header className="home-subscribe-form__header">
        <span className="home-subscribe-form__mark" aria-hidden="true">
          A
        </span>
        <h2 className="home-subscribe-form__title">Let&apos;s Work Together</h2>
      </header>

      {error ? (
        <div
          ref={formErrorRef}
          id={formErrorId}
          className="home-subscribe-form__error"
          role="alert"
          tabIndex={-1}
        >
          {getErrorMessage(error)}
        </div>
      ) : null}

      {isSuccess ? (
        <div
          ref={successRef}
          id={successMessageId}
          className="home-subscribe-form__success"
          role="status"
          tabIndex={-1}
        >
          {successMessage}
        </div>
      ) : null}

      <div className="home-subscribe-form__row">
        <InputField
          ref={firstNameRef}
          variant="auth"
          label="First Name"
          name="first_name"
          autoComplete="given-name"
          value={values.firstName}
          onChange={handleTextChange('firstName')}
          error={fieldErrors.firstName}
          required
          disabled={loading || isSuccess}
          aria-label="First Name"
        />
        <InputField
          ref={lastNameRef}
          variant="auth"
          label="Last Name"
          name="last_name"
          autoComplete="family-name"
          value={values.lastName}
          onChange={handleTextChange('lastName')}
          error={fieldErrors.lastName}
          required
          disabled={loading || isSuccess}
          aria-label="Last Name"
        />
      </div>

      <InputField
        ref={emailRef}
        variant="auth"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={values.email}
        onChange={handleTextChange('email')}
        error={fieldErrors.email}
        required
        disabled={loading || isSuccess}
        aria-label="Email"
      />

      <InputField
        ref={phoneRef}
        variant="auth"
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        value={values.phone}
        onChange={handleTextChange('phone')}
        error={fieldErrors.phone}
        required
        disabled={loading || isSuccess}
        aria-label="Phone number"
      />

      <div
        className={[
          'home-subscribe-form__select-wrap',
          fieldErrors.experience ? 'home-subscribe-form__select-wrap--error' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <label className="home-subscribe-form__select-label" htmlFor="home-experience">
          How long have you been in the industry?
        </label>
        <select
          ref={experienceRef}
          id="home-experience"
          name="experience"
          className="home-subscribe-form__select"
          value={values.experience}
          onChange={handleSelectChange('experience')}
          disabled={loading || isSuccess}
          aria-invalid={fieldErrors.experience ? true : undefined}
          aria-label="How long have you been in the industry?"
          required
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <option key={option.value || 'placeholder'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.experience ? (
          <p className="home-subscribe-form__select-error" role="alert">
            {fieldErrors.experience}
          </p>
        ) : null}
      </div>

      <div
        className={[
          'home-subscribe-form__select-wrap',
          fieldErrors.marketing ? 'home-subscribe-form__select-wrap--error' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <label className="home-subscribe-form__select-label" htmlFor="home-marketing">
          What is your main focus in choosing your career?
        </label>
        <select
          ref={marketingRef}
          id="home-marketing"
          name="marketing"
          className="home-subscribe-form__select"
          value={values.marketing}
          onChange={handleSelectChange('marketing')}
          disabled={loading || isSuccess}
          aria-invalid={fieldErrors.marketing ? true : undefined}
          aria-label="What is your main focus in choosing your career?"
          required
        >
          {MARKETING_OPTIONS.map((option) => (
            <option key={option.value || 'placeholder'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.marketing ? (
          <p className="home-subscribe-form__select-error" role="alert">
            {fieldErrors.marketing}
          </p>
        ) : null}
      </div>

      <div className="home-subscribe-form__textarea-wrap">
        <label className="home-subscribe-form__textarea-label" htmlFor="home-message">
          Your Message
        </label>
        <textarea
          ref={messageRef}
          id="home-message"
          name="message"
          className={[
            'home-subscribe-form__textarea',
            fieldErrors.message ? 'home-subscribe-form__textarea--error' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          placeholder="Your Message"
          value={values.message}
          onChange={(event) => {
            updateField('message', event.target.value);
          }}
          disabled={loading || isSuccess}
          aria-label="Your Message"
        />
        {fieldErrors.message ? (
          <p className="home-subscribe-form__select-error" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="home-subscribe-form__checks">
        <Checkbox
          ref={privacyRef}
          variant="auth"
          name="privacy_accepted"
          checked={values.privacyAccepted}
          onChange={(event) => {
            updateField('privacyAccepted', event.target.checked);
          }}
          error={fieldErrors.privacyAccepted}
          disabled={loading || isSuccess}
          label={
            <>
              I agree to the{' '}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </>
          }
        />
        <Checkbox
          ref={termsRef}
          variant="auth"
          name="terms_accepted"
          checked={values.termsAccepted}
          onChange={(event) => {
            updateField('termsAccepted', event.target.checked);
          }}
          error={fieldErrors.termsAccepted}
          disabled={loading || isSuccess}
          label={
            <>
              I agree to the{' '}
              <Link to="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
            </>
          }
        />
      </div>

      <Button
        type="submit"
        variant="auth"
        fullWidth
        loading={loading}
        disabled={isSuccess}
        className="home-subscribe-form__submit"
        aria-label="Join the waitlist now"
      >
        {loading ? 'Joining waitlist…' : 'Join the waitlist now'}
      </Button>
    </form>
  );
}

export default HomeSubscribeForm;
