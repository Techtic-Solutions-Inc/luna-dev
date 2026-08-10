import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import {
  getFirstInvalidField,
  validateSignUpForm,
  type SignUpFieldErrors,
  type SignUpFieldName,
  type SignUpFormValues,
} from '../utils/signUpValidation';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { InputField } from './InputField';
import './SignUpForm.css';

const INITIAL_VALUES: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  termsAccepted: false,
};

export function SignUpForm() {
  const navigate = useNavigate();
  const { loading, error, signUp, reset } = useSignUp();
  const [values, setValues] = useState<SignUpFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formErrorId = useId();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);

  const fieldRefs: Record<SignUpFieldName, RefObject<HTMLInputElement | null>> =
    {
      firstName: firstNameRef,
      lastName: lastNameRef,
      email: emailRef,
      password: passwordRef,
      termsAccepted: termsRef,
    };

  useEffect(() => {
    if (error) {
      formErrorRef.current?.focus();
    }
  }, [error]);

  function focusField(field: SignUpFieldName) {
    const node = fieldRefs[field].current;
    if (node) {
      node.focus();
    }
  }

  function updateField<K extends SignUpFieldName>(
    field: K,
    value: SignUpFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (submitted) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (error) {
      reset();
    }
  }

  function handleTextChange(field: Exclude<SignUpFieldName, 'termsAccepted'>) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.value);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateSignUpForm(values);
    setFieldErrors(errors);

    const firstInvalid = getFirstInvalidField(errors);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    const result = await signUp({
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      terms_accepted: values.termsAccepted,
    });

    if (!result) {
      return;
    }

    const redirectTarget =
      result.redirect && result.redirect.startsWith('/')
        ? result.redirect
        : '/welcome';

    navigate(redirectTarget, {
      replace: true,
      state: {
        name: result.name || result.first_name,
        message: result.message,
        description: result.description,
      },
    });
  }

  return (
    <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
      <div className="sign-up-form__header">
        <h1 className="sign-up-form__title">Sign Up</h1>
        <p className="sign-up-form__subtitle">
          Create your Real Estate Professional account to access marketing
          resources and AI-powered tools.
        </p>
      </div>

      {error ? (
        <div
          ref={formErrorRef}
          id={formErrorId}
          className="sign-up-form__banner"
          role="alert"
          tabIndex={-1}
        >
          {error.message}
        </div>
      ) : null}

      <div className="sign-up-form__row">
        <InputField
          ref={firstNameRef}
          label="First Name"
          name="first_name"
          autoComplete="given-name"
          value={values.firstName}
          onChange={handleTextChange('firstName')}
          error={fieldErrors.firstName}
          required
          disabled={loading}
        />
        <InputField
          ref={lastNameRef}
          label="Last Name"
          name="last_name"
          autoComplete="family-name"
          value={values.lastName}
          onChange={handleTextChange('lastName')}
          error={fieldErrors.lastName}
          required
          disabled={loading}
        />
      </div>

      <InputField
        ref={emailRef}
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={values.email}
        onChange={handleTextChange('email')}
        error={fieldErrors.email}
        required
        disabled={loading}
      />

      <InputField
        ref={passwordRef}
        label="Create a Password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={handleTextChange('password')}
        error={fieldErrors.password}
        hint="At least 8 characters with uppercase, lowercase, and a number."
        required
        disabled={loading}
      />

      <Checkbox
        ref={termsRef}
        name="terms_accepted"
        checked={values.termsAccepted}
        onChange={(event) => {
          updateField('termsAccepted', event.target.checked);
        }}
        error={fieldErrors.termsAccepted}
        required
        disabled={loading}
        label={
          <>
            I have read and agree to the{' '}
            <Link to="/terms">Terms of Use</Link> and{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </>
        }
      />

      <Button type="submit" fullWidth loading={loading}>
        {loading ? 'Signing up…' : 'Sign Up'}
      </Button>

      <p className="sign-up-form__footer">
        Already have an account?{' '}
        <Link className="sign-up-form__signin-link" to="/signin">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
