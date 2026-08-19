import axios from 'axios';
import { type FormEvent, useState } from 'react';
import { FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import apiClient from '../../lib/api/client';
import type { ErrorResponse, SignupResponse } from '../../types/api';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import InputField from '../ui/InputField';

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

type FieldErrors = Partial<Record<keyof SignUpValues, string>>;

const initialValues: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptTerms: false,
};

function validate(values: SignUpValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.firstName.trim()) errors.firstName = 'First name is required.';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password) errors.password = 'Password is required.';
  if (!values.acceptTerms) {
    errors.acceptTerms = 'You must accept the Terms of Use and Privacy Policy.';
  }

  return errors;
}

export default function SignUp() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [registeredUser, setRegisteredUser] = useState<SignupResponse | null>(
    null,
  );

  const setField = <Key extends keyof SignUpValues>(
    key: Key,
    value: SignUpValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
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
      const response = await apiClient.post<SignupResponse>('/api/auth/signup', {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
        terms_accepted: values.acceptTerms,
      });
      setRegisteredUser(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        setServerError(
          error.response?.data.message ??
            'We could not create your account. Please try again.',
        );
      } else {
        setServerError('We could not create your account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#090909] font-['Almarai'] text-white">
      <section className="relative flex min-h-screen w-full justify-center overflow-hidden bg-[radial-gradient(circle_at_79%_39%,rgba(94,75,59,0.55),transparent_39%),radial-gradient(circle_at_3%_105%,rgba(1,41,27,0.43),transparent_42%),linear-gradient(135deg,#0a0a0a_14%,#150b14_54%,#090b09_100%)] px-6 pb-16 pt-[72px] sm:pt-[106px] lg:w-[54.1667%] lg:justify-start lg:px-0">
        <div className="w-full max-w-[462px] lg:ml-[100px]">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="mx-auto h-[52px] w-[172px] object-contain"
          />

          {registeredUser ? (
            <section
              aria-live="polite"
              className="mt-[78px] text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#927a60]">
                <FiCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h1 className="mt-7 font-['EB_Garamond'] text-[32px] font-medium leading-[40px] sm:text-[38px] sm:leading-[48px]">
                Your Account Is Ready
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#a09ca0]">
                We sent a verification email to {registeredUser.email}.
              </p>
              <Link
                to="/signin"
                className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full bg-[#927a60] text-base transition hover:bg-[#a98d6e]"
              >
                Continue to Sign In
              </Link>
            </section>
          ) : (
            <section className="mt-11">
              <div className="text-center">
                <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[40px] sm:text-[38px] sm:leading-[48px]">
                  Great Marketing Made Easier.
                  <br />
                  Specifically For Agents
                </h1>
                <p className="mt-2 text-base font-light text-[#a09ca0]">
                  Create your account today
                </p>
              </div>

              <form
                className="mt-7"
                onSubmit={handleSubmit}
                noValidate
                aria-busy={isSubmitting}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    id="first-name"
                    label="First Name"
                    autoComplete="given-name"
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={(event) =>
                      setField('firstName', event.target.value)
                    }
                  />
                  <InputField
                    id="last-name"
                    label="Last Name"
                    autoComplete="family-name"
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={(event) =>
                      setField('lastName', event.target.value)
                    }
                  />
                </div>
                <InputField
                  id="email"
                  className="mt-5"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(event) => setField('email', event.target.value)}
                />
                <InputField
                  id="password"
                  className="mt-5"
                  label="Create a Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={values.password}
                  error={errors.password}
                  onChange={(event) => setField('password', event.target.value)}
                  trailingElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="mr-4 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#9b9b9b] transition hover:text-white"
                    >
                      {showPassword ? (
                        <FiEyeOff aria-hidden="true" />
                      ) : (
                        <FiEye aria-hidden="true" />
                      )}
                    </button>
                  }
                />

                <Checkbox
                  id="accept-terms"
                  className="mt-5"
                  checked={values.acceptTerms}
                  error={errors.acceptTerms}
                  onChange={(event) =>
                    setField('acceptTerms', event.target.checked)
                  }
                >
                  I have read and agree to the{' '}
                  <Link className="underline hover:text-white" to="/terms">
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link className="underline hover:text-white" to="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </Checkbox>

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
                  loadingText="Creating account…"
                  className="mt-7"
                >
                  Sign Up
                </Button>
              </form>

              <div className="mt-7 border-t border-white/[0.14] pt-8 text-center text-xs text-[#a09ca0]">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-[#b59b7f] underline-offset-2 hover:underline"
                >
                  Sign in
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
          className="h-screen w-full object-cover"
        />
      </aside>
    </main>
  );
}
