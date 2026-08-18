import axios from 'axios';
import { type FormEvent, useState } from 'react';
import { FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../lib/api/client';
import type { ErrorResponse, LoginResponse } from '../../types/api';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import InputField from '../ui/InputField';

interface SignInValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

type FieldErrors = Partial<Record<'email' | 'password', string>>;

function validate(values: SignInValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) errors.password = 'Password is required.';

  return errors;
}

function getInitialValues(): SignInValues {
  return {
    email: localStorage.getItem('rememberedEmail') ?? '',
    password: '',
    rememberMe: localStorage.getItem('rememberMe') === 'true',
  };
}

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignInValues>(getInitialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const setField = <Key extends keyof SignInValues>(
    key: Key,
    value: SignInValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== 'rememberMe') {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    setServerError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setServerError('');

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', {
        email: values.email.trim(),
        password: values.password,
      });

      localStorage.setItem('token', response.data.data.access_token);
      localStorage.setItem('rememberMe', String(values.rememberMe));
      if (values.rememberMe) {
        localStorage.setItem('rememberedEmail', values.email.trim());
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setIsSuccess(true);
      const destination = response.data.data.redirect;
      window.setTimeout(() => {
        navigate(destination.startsWith('/') ? destination : '/');
      }, 700);
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        setServerError(
          error.response?.data.message ??
            'We could not sign you in. Check your details and try again.',
        );
      } else {
        setServerError(
          'We could not sign you in. Check your details and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#090909] font-['Almarai'] text-white">
      <section className="relative flex min-h-screen w-full justify-center overflow-hidden bg-[radial-gradient(circle_at_79%_39%,rgba(94,75,59,0.55),transparent_39%),radial-gradient(circle_at_3%_105%,rgba(1,41,27,0.43),transparent_42%),linear-gradient(135deg,#0a0a0a_14%,#150b14_54%,#090b09_100%)] px-6 pb-14 pt-20 sm:pt-[112px] lg:w-[54.1667%] lg:justify-start lg:px-0 lg:pt-[156px]">
        <div className="w-full max-w-[462px] lg:ml-[100px]">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="mx-auto h-[52px] w-[172px] object-contain"
          />

          {isSuccess ? (
            <section aria-live="polite" className="mt-[78px] text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#927a60]">
                <FiCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h1 className="mt-7 font-['EB_Garamond'] text-[32px] font-medium leading-[40px] sm:text-[38px] sm:leading-[48px]">
                Welcome Back
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#a09ca0]">
                You&apos;re signed in. Taking you to your account…
              </p>
            </section>
          ) : (
            <section className="mt-[38px]">
              <div className="text-center">
                <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[40px] sm:text-[38px] sm:leading-[48px]">
                  Welcome To Agentwise
                </h1>
                <p className="mt-7 text-base font-light text-[#a09ca0]">
                  Everything you need to create standout real estate content.
                </p>
              </div>

              <form
                className="mt-8"
                onSubmit={handleSubmit}
                noValidate
                aria-busy={isSubmitting}
              >
                <InputField
                  id="signin-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  error={errors.email}
                  disabled={isSubmitting}
                  onChange={(event) => setField('email', event.target.value)}
                />
                <InputField
                  id="signin-password"
                  className="mt-5"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={values.password}
                  error={errors.password}
                  disabled={isSubmitting}
                  onChange={(event) => setField('password', event.target.value)}
                  trailingElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      disabled={isSubmitting}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="mr-4 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#9b9b9b] transition hover:text-white disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <FiEyeOff aria-hidden="true" />
                      ) : (
                        <FiEye aria-hidden="true" />
                      )}
                    </button>
                  }
                />

                <div className="mt-5 flex items-center justify-between gap-4">
                  <Checkbox
                    id="remember-me"
                    checked={values.rememberMe}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setField('rememberMe', event.target.checked)
                    }
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    to="/forgot-password"
                    className="shrink-0 text-xs text-[#a09ca0] transition hover:text-white hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {serverError && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-[#d9857e]/40 bg-[#d9857e]/10 px-4 py-3 text-sm text-[#f1bbb7]"
                  >
                    {serverError}
                  </div>
                )}

                <Button
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Signing in…"
                  className="mt-7"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-7 border-t border-white/[0.14] pt-8 text-center text-xs text-[#a09ca0]">
                Not a member yet?{' '}
                <Link
                  to="/signup"
                  className="text-[#b59b7f] underline-offset-2 hover:underline"
                >
                  Sign up here.
                </Link>
              </div>
            </section>
          )}
        </div>
      </section>

      <aside
        aria-label="Agentwise inspiration gallery"
        className="hidden min-h-screen flex-1 bg-black lg:block"
      >
        <img
          src="/signup-gallery.webp"
          alt="Real estate marketing inspiration featuring agents, workspaces, coffee, and interiors"
          className="h-screen w-full object-cover object-top"
        />
      </aside>
    </main>
  );
}
