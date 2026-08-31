import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useSignIn, useSignInErrorMessage } from '@/hooks/useSignIn';
import { useAuth } from '@/hooks/useAuth';
import { getApiError } from '@/lib/api/client';
import { loginSchema, type LoginFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { AuthUser, LoginResponseData } from '@/types/api';

const REMEMBER_ME_KEY = 'remember_me';
const REMEMBERED_EMAIL_KEY = 'remembered_email';

const inputClassName =
  'h-[52px] w-full rounded-8 border-none bg-sofia-color-77 p-[16px] font-almarai text-[16px] font-[400] leading-[24px] text-sofia-secondary shadow-none placeholder:text-sofia-background hover:border-sofia-accent focus-visible:border-sofia-accent focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-sofia-border';

const buttonClassName =
  'h-[52px] w-full max-w-[461px] rounded-8 bg-sofia-accent p-[16px] font-public-sans text-[16px] font-[600] leading-[24px] text-sofia-secondary hover:bg-sofia-color-102 hover:text-sofia-secondary focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 active:bg-sofia-color-111 disabled:cursor-not-allowed disabled:opacity-50';

function readRememberedEmail(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? '';
}

function readRememberMe(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(REMEMBER_ME_KEY) === 'true';
}

function persistRememberMe(rememberMe: boolean, email: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (rememberMe) {
    window.localStorage.setItem(REMEMBER_ME_KEY, 'true');
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    return;
  }
  window.localStorage.removeItem(REMEMBER_ME_KEY);
  window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
}

function toAuthUser(data: LoginResponseData): AuthUser {
  return {
    id: data.id ?? '',
    name: data.name ?? '',
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    email: data.email,
  };
}

function SignInSkeleton() {
  return (
    <div
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px] font-almarai"
      role="status"
      aria-live="polite"
      aria-label="Signing in"
    >
      <Skeleton className="h-[50px] w-full bg-sofia-color-77" />
      <Skeleton className="h-[28px] w-full bg-sofia-color-77" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-77" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-77" />
      <Skeleton className="h-[20px] w-full bg-sofia-color-77" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-accent/40" />
    </div>
  );
}

export default function SignInForm() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const mutation = useSignIn();
  const errorMessage = useSignInErrorMessage(mutation.error);
  const [showPassword, setShowPassword] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [unmappedErrors, setUnmappedErrors] = useState<string[]>([]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: readRememberedEmail(),
      password: '',
      rememberMe: readRememberMe(),
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setTokenError(null);
    setUnmappedErrors([]);
    persistRememberMe(values.rememberMe, values.email);
    try {
      const response = await mutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
      const payload = response.data;
      const token = payload?.token || payload?.accessToken;
      if (!payload || !token) {
        setTokenError('Login succeeded but no access token was returned.');
        return;
      }
      login(token, toAuthUser(payload));
      navigate('/', { replace: true });
    } catch (error) {
      const apiError = getApiError(error);
      const leftover: string[] = [];
      Object.entries(apiError.errors).forEach(([field, messages]) => {
        if (field === 'email' || field === 'password') {
          form.setError(field, { type: 'server', message: messages[0] });
        } else {
          leftover.push(...messages.map((message) => `${field}: ${message}`));
        }
      });
      setUnmappedErrors(leftover);
    }
  });

  const handleRetry = () => {
    void onSubmit();
  };

  if (isAuthenticated() && !mutation.isPending && !mutation.isSuccess) {
    return <Navigate to="/" replace />;
  }

  if (mutation.isPending) {
    return <SignInSkeleton />;
  }

  if (mutation.isSuccess && !tokenError) {
    return (
      <div
        className="flex w-full max-w-[461px] flex-col items-center gap-[20px] text-center font-almarai"
        role="status"
        aria-live="polite"
      >
        <h1 className="font-garamond text-heading-xl-35 text-sofia-secondary">
          Welcome To Agentwise
        </h1>
        <p className="w-full text-body-3 text-sofia-background">
          {mutation.data.message || 'Signed in successfully.'}
        </p>
      </div>
    );
  }

  const { errors } = form.formState;
  const alertMessage = tokenError ?? (mutation.isError ? errorMessage : null);

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px] font-almarai"
      noValidate
    >
      <div className="flex w-full flex-col items-center gap-[30px]">
        <h1 className="text-center font-garamond text-heading-xl-35 text-sofia-secondary">
          Welcome To Agentwise
        </h1>
        <p className="w-full text-center text-body-3 text-sofia-background">
          Everything you need to create standout real estate content.
        </p>
      </div>

      {alertMessage || unmappedErrors.length > 0 ? (
        <div
          className="flex w-full flex-col items-center gap-[12px] rounded-8 border border-sofia-border bg-sofia-warning px-[16px] py-[14px] text-center"
          role="alert"
        >
          {alertMessage ? (
            <p className="text-[16px] font-[400] leading-[20px] text-sofia-border">
              {alertMessage}
            </p>
          ) : null}
          {unmappedErrors.length > 0 ? (
            <ul className="list-disc pl-[16px] text-left text-[16px] text-sofia-border">
              {unmappedErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          ) : null}
          <Button
            type="button"
            onClick={handleRetry}
            className={`${buttonClassName} h-[36px] w-auto min-w-[120px] px-[20px]`}
          >
            Try again
          </Button>
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="sign-in-email" className="sr-only font-fellix">
          Email
        </Label>
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'sign-in-email-error' : undefined}
          className={inputClassName}
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p id="sign-in-email-error" className="text-body-sm-2 text-sofia-border" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="sign-in-password" className="sr-only font-inter">
          Password
        </Label>
        <div className="relative w-full">
          <Input
            id="sign-in-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'sign-in-password-error' : undefined}
            className={`${inputClassName} pr-[48px]`}
            {...form.register('password')}
          />
          <button
            type="button"
            className="absolute right-[12px] top-[14px] inline-flex h-[24px] w-[24px] items-center justify-center text-sofia-background hover:text-sofia-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent active:text-sofia-color-102"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((open) => !open)}
          >
            {showPassword ? (
              <EyeOff className="h-[24px] w-[24px]" aria-hidden="true" />
            ) : (
              <Eye className="h-[24px] w-[24px]" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password?.message ? (
          <p id="sign-in-password-error" className="text-body-sm-2 text-sofia-border" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <input
            id="sign-in-remember"
            type="checkbox"
            className="h-[20px] w-[20px] shrink-0 cursor-pointer rounded-[2px] border border-sofia-secondary bg-sofia-color-101 accent-sofia-accent hover:border-sofia-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register('rememberMe')}
          />
          <Label
            htmlFor="sign-in-remember"
            className="cursor-pointer font-almarai text-[16px] font-[400] leading-[24px] text-sofia-secondary"
          >
            Remember me
          </Label>
        </div>
        <Link
          to="/forgot-password"
          className="font-almarai text-[16px] font-[400] leading-[16px] text-sofia-background hover:text-sofia-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent active:text-sofia-color-102"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" disabled={mutation.isPending} className={buttonClassName}>
        Sign In
      </Button>

      <Separator className="h-px w-full bg-sofia-background/40" />

      <p className="w-full text-center font-almarai text-body-sm-2 text-sofia-background">
        Not a member yet?{' '}
        <Link
          to="/sign-up"
          className="font-public-sans text-sofia-accent underline underline-offset-[3px] hover:text-sofia-color-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent active:text-sofia-color-102"
        >
          Sign up here.
        </Link>
      </p>
    </form>
  );
}
