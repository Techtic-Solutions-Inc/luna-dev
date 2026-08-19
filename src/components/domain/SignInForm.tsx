import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import SuccessMessage from '@/components/domain/SuccessMessage';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import FormSkeleton from '@/components/ui/FormSkeleton';
import Input from '@/components/ui/input';
import TextLink from '@/components/ui/link';
import PasswordToggle from '@/components/ui/PasswordToggle';
import { login } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REMEMBERED_EMAIL_KEY = 'remembered_email';
const REMEMBER_ME_KEY = 'remember_me';

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

function readRememberedEmail(): string {
  return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? '';
}

function readRememberMe(): boolean {
  return window.localStorage.getItem(REMEMBER_ME_KEY) === 'true' || Boolean(readRememberedEmail());
}

function persistRememberMe(remember: boolean, email: string): void {
  if (remember) {
    window.localStorage.setItem(REMEMBER_ME_KEY, 'true');
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    return;
  }

  window.localStorage.removeItem(REMEMBER_ME_KEY);
  window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
}

export default function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(readRememberedEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(readRememberMe);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      navigate('/app', { replace: true });
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [successMessage, navigate]);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      nextErrors.password = 'Enter your password.';
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
      const response = await login({ email: email.trim(), password });
      const accessToken = response.data.token || response.data.accessToken;

      if (response.success === false || !accessToken) {
        setErrors({ form: response.message || 'Unable to sign in.' });
        return;
      }

      persistRememberMe(rememberMe, email.trim());
      setErrors({});
      setSuccessMessage(response.message || 'You are signed in.');
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      setErrors({
        form: parsed.message,
        email: parsed.errors.email?.[0],
        password: parsed.errors.password?.[0],
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
    <form
      className="flex w-full max-w-md flex-col items-center"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {errors.form && !isSubmitting ? (
        <div className="mb-4 w-full">
          <ErrorAlert message={errors.form} onRetry={() => void submitForm()} />
        </div>
      ) : null}

      {isSubmitting ? (
        <FormSkeleton label="Signing in" lines={4} />
      ) : (
        <>
          <div className="mb-4 w-full">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                const nextEmail = event.target.value;
                setEmail(nextEmail);
                if (rememberMe) {
                  persistRememberMe(true, nextEmail.trim());
                }
              }}
              error={errors.email}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <Input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              suffix={
                <PasswordToggle
                  visible={passwordVisible}
                  onToggle={() => setPasswordVisible((current) => !current)}
                />
              }
              required
            />
          </div>
          <div className="mb-8 flex w-full max-w-md items-center justify-between gap-4">
            <Checkbox
              id="remember-me"
              name="remember_me"
              checked={rememberMe}
              onChange={(event) => {
                const checked = event.target.checked;
                setRememberMe(checked);
                persistRememberMe(checked, email.trim());
              }}
              label="Remember me"
              containerClassName="w-auto"
            />
            <TextLink
              to="/forgot-password"
              underlined={false}
              className="shrink-0 font-almarai text-sm text-color-14"
            >
              Forgot your password?
            </TextLink>
          </div>
          <Button type="submit" aria-label="Sign In">
            Sign In
          </Button>
          <div className="mt-8 w-full border-t border-color-41 pt-6 text-center">
            <p className="font-almarai text-sm text-color-18">
              Not a member yet?{' '}
              <TextLink to="/sign-up" underlined={false} className="text-accent">
                Sign up here.
              </TextLink>
            </p>
          </div>
        </>
      )}
    </form>
  );
}
