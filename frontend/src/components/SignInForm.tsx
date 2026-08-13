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
import { useSignIn } from '../hooks/useSignIn';
import { getErrorMessage } from '../types/api';
import {
  getRememberedEmail,
  persistAuthSession,
  wasRememberMeEnabled,
} from '../utils/authStorage';
import {
  getFirstInvalidField,
  validateSignInForm,
  type SignInFieldErrors,
  type SignInFormValues,
} from '../utils/signInValidation';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { InputField } from './InputField';
import './SignInForm.css';

function createInitialValues(): SignInFormValues {
  const rememberedEmail = getRememberedEmail();
  return {
    email: rememberedEmail,
    password: '',
    rememberMe: wasRememberMeEnabled(),
  };
}

export function SignInForm() {
  const navigate = useNavigate();
  const { loading, error, signIn, reset } = useSignIn();
  const [values, setValues] = useState<SignInFormValues>(createInitialValues);
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formErrorId = useId();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);

  const fieldRefs: Record<
    Exclude<keyof SignInFormValues, 'rememberMe'>,
    RefObject<HTMLInputElement | null>
  > = {
    email: emailRef,
    password: passwordRef,
  };

  useEffect(() => {
    if (error) {
      formErrorRef.current?.focus();
    }
  }, [error]);

  function focusField(field: Exclude<keyof SignInFormValues, 'rememberMe'>) {
    const node = fieldRefs[field].current;
    if (node) {
      node.focus();
    }
  }

  function clearFieldError(field: 'email' | 'password') {
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function updateField<K extends keyof SignInFormValues>(
    field: K,
    value: SignInFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (submitted) {
      if (field === 'email' || field === 'password') {
        clearFieldError(field);
      }
    }
    if (error) {
      reset();
    }
  }

  function handleTextChange(field: 'email' | 'password') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.value);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateSignInForm(values);
    setFieldErrors(errors);

    const firstInvalid = getFirstInvalidField(errors);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    const result = await signIn({
      email: values.email.trim(),
      password: values.password,
    });

    if (!result) {
      return;
    }

    persistAuthSession({
      accessToken: result.access_token,
      tokenType: result.token_type || 'Bearer',
      rememberMe: values.rememberMe,
      email: values.email.trim(),
    });

    const redirectTarget =
      result.redirect && result.redirect.startsWith('/')
        ? result.redirect
        : '/dashboard';

    navigate(redirectTarget, {
      replace: true,
      state: {
        email: result.email,
        message: result.message,
        description: result.description,
      },
    });
  }

  return (
    <form className="sign-in-form" onSubmit={handleSubmit} noValidate>
      {error ? (
        <div
          ref={formErrorRef}
          id={formErrorId}
          className="sign-in-form__banner"
          role="alert"
          tabIndex={-1}
        >
          {getErrorMessage(error)}
        </div>
      ) : null}

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
        disabled={loading}
      />

      <InputField
        ref={passwordRef}
        variant="auth"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleTextChange('password')}
        error={fieldErrors.password}
        showPasswordToggle
        required
        disabled={loading}
      />

      <div className="sign-in-form__meta">
        <Checkbox
          variant="auth"
          name="remember_me"
          checked={values.rememberMe}
          onChange={(event) => {
            updateField('rememberMe', event.target.checked);
          }}
          disabled={loading}
          label="Remember me"
        />

        <Link className="sign-in-form__forgot" to="/forgot-password">
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" variant="auth" fullWidth loading={loading}>
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>

      <div className="sign-in-form__divider" aria-hidden="true" />

      <p className="sign-in-form__footer">
        Not a member yet?{' '}
        <Link className="sign-in-form__signup-link" to="/signup">
          Sign up here.
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;
