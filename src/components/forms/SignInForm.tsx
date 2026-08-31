import { useState, type CSSProperties } from 'react';
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

const FONT_ALMARAI = "'Almarai', sans-serif";
const FONT_PUBLIC_SANS = "'Public Sans', sans-serif";
const FONT_EB_GARAMOND = "'EB Garamond', serif";
const FONT_SPACE_GROTESK = "'Space Grotesk', sans-serif";
const FONT_FELLIX = "'Fellix', 'Inter', sans-serif";
const FONT_INTER = "'Inter', sans-serif";

const COLOR_ACCENT = '#c8a47e';
const COLOR_MUTED = '#637381';
const COLOR_ERROR = '#ff5630';
const COLOR_INK = '#000001';
const COLOR_BRONZE = '#8b6842';
const COLOR_SURFACE = '#11161c';
const COLOR_FIELD = '#1d1a1a';
const COLOR_FIELD_ALT = '#1c1916';

const REMEMBER_ME_KEY = 'remember_me';
const REMEMBERED_EMAIL_KEY = 'remembered_email';

const headingStyle: CSSProperties = {
  fontFamily: FONT_EB_GARAMOND,
  color: '#ffffff',
};

const subheadStyle: CSSProperties = {
  fontFamily: FONT_ALMARAI,
  color: COLOR_MUTED,
};

const fieldStyle: CSSProperties = {
  fontFamily: FONT_ALMARAI,
  color: '#ffffff',
  backgroundColor: COLOR_FIELD,
};

const ctaStyle: CSSProperties = {
  fontFamily: FONT_PUBLIC_SANS,
  color: COLOR_INK,
  backgroundColor: COLOR_BRONZE,
};

const inputClassName =
  'h-[52px] w-full rounded-[100px] border border-[#ffffff4c] bg-[#1d1a1a] p-[16px] text-[16px] font-[400] leading-[24px] text-[#ffffff] shadow-none placeholder:text-[#637381] hover:border-[#c8a47e] hover:bg-[#1d1818] focus-visible:border-[#c8a47e] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000001] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#ff5630]';

const buttonClassName =
  'h-[52px] w-full max-w-[461px] rounded-[100px] border border-[#8b6842] bg-[#8b6842] p-[16px] text-[16px] font-[600] leading-[24px] text-[#000001] hover:bg-[#c8a47e] hover:text-[#000001] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000001] active:bg-[#554545] active:text-[#000001] disabled:cursor-not-allowed disabled:opacity-50';

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
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px]"
      role="status"
      aria-live="polite"
      aria-label="Signing in"
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <Skeleton className="h-[50px] w-[351px] bg-[#1d1a1a]" />
      <Skeleton className="h-[28px] w-full bg-[#1d1a1a]" />
      <Skeleton className="h-[52px] w-full rounded-[100px] bg-[#1d1a1a]" />
      <Skeleton className="h-[52px] w-full rounded-[100px] bg-[#1d1a1a]" />
      <Skeleton className="h-[20px] w-full bg-[#1d1a1a]" />
      <Skeleton className="h-[52px] w-full rounded-[100px] bg-[#8b6842]/40" />
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
    persistRememberMe(values.rememberMe, values.email);
    try {
      const response = await mutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
      const payload = response.data;
      const token = payload.token || payload.accessToken;
      if (!token) {
        setTokenError('Login succeeded but no access token was returned.');
        return;
      }
      login(token, toAuthUser(payload));
      navigate('/', { replace: true });
    } catch (error) {
      const apiError = getApiError(error);
      Object.entries(apiError.errors).forEach(([field, messages]) => {
        if (field === 'email' || field === 'password') {
          form.setError(field, { type: 'server', message: messages[0] });
        }
      });
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
        className="flex w-full max-w-[461px] flex-col items-center gap-[20px] text-center"
        role="status"
        aria-live="polite"
        style={{ fontFamily: FONT_ALMARAI }}
      >
        <h1
          className="text-[32px] font-[500] leading-[41.76px] text-[#ffffff]"
          style={headingStyle}
        >
          Welcome To Agentwise
        </h1>
        <p className="w-full text-[18px] font-[400] leading-[28px]" style={subheadStyle}>
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
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px]"
      noValidate
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <div className="flex w-full flex-col items-center gap-[30px]">
        <h1
          className="text-center text-[32px] font-[500] leading-[41.76px] text-[#ffffff]"
          style={headingStyle}
        >
          Welcome To Agentwise
        </h1>
        <p
          className="w-full text-center text-[18px] font-[400] leading-[28px] text-[#637381]"
          style={subheadStyle}
        >
          Everything you need to create standout real estate content.
        </p>
      </div>

      {alertMessage ? (
        <div
          className="flex w-full flex-col items-center gap-[12px] rounded-[12px] border border-[#ff5630] bg-[#ff563028] px-[16px] py-[14px] text-center"
          role="alert"
        >
          <p
            className="text-[16px] font-[400] leading-[20px]"
            style={{ fontFamily: FONT_ALMARAI, color: COLOR_ERROR }}
          >
            {alertMessage}
          </p>
          <Button
            type="button"
            onClick={handleRetry}
            className={`${buttonClassName} h-[36px] w-auto min-w-[120px] px-[20px]`}
            style={ctaStyle}
          >
            Try again
          </Button>
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="sign-in-email" className="sr-only" style={{ fontFamily: FONT_FELLIX }}>
          Email
        </Label>
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          style={{ ...fieldStyle, backgroundColor: COLOR_FIELD_ALT }}
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p className="text-[14px] leading-[15.624px]" role="alert" style={{ color: COLOR_ERROR }}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="sign-in-password" className="sr-only" style={{ fontFamily: FONT_INTER }}>
          Password
        </Label>
        <div className="relative w-full">
          <Input
            id="sign-in-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
            aria-invalid={Boolean(errors.password)}
            className={`${inputClassName} pr-[48px]`}
            style={fieldStyle}
            {...form.register('password')}
          />
          <button
            type="button"
            className="absolute right-[12px] top-[14px] inline-flex h-[24px] w-[24px] items-center justify-center text-[#637381] hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:text-[#8b6842]"
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
          <p className="text-[14px] leading-[15.624px]" role="alert" style={{ color: COLOR_ERROR }}>
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full items-center justify-between gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <input
            id="sign-in-remember"
            type="checkbox"
            className="h-[20px] w-[20px] shrink-0 cursor-pointer rounded-[2px] border border-[#ffffff] bg-[#000001] accent-[#c8a47e] hover:border-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ accentColor: COLOR_ACCENT }}
            {...form.register('rememberMe')}
          />
          <Label
            htmlFor="sign-in-remember"
            className="cursor-pointer text-[16px] font-[400] leading-[24px] text-[#637381]"
            style={{ fontFamily: FONT_ALMARAI, color: COLOR_MUTED }}
          >
            Remember me
          </Label>
        </div>
        <Link
          to="/forgot-password"
          className="text-[16px] font-[400] leading-[16px] text-[#637381] hover:text-[#c8a47e] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:text-[#8b6842]"
          style={{ fontFamily: FONT_ALMARAI, color: COLOR_MUTED }}
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className={buttonClassName}
        style={ctaStyle}
      >
        Sign In
      </Button>

      <Separator className="h-px w-full bg-[#637381]/40" />

      <p
        className="w-full text-center text-[14px] font-[400] leading-[15.624px] text-[#637381]"
        style={{ fontFamily: FONT_ALMARAI, color: COLOR_MUTED }}
      >
        Not a member yet?{' '}
        <Link
          to="/sign-up"
          className="text-[#c8a47e] underline underline-offset-[3px] hover:text-[#8b6842] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:text-[#8b6842]"
          style={{ fontFamily: FONT_PUBLIC_SANS, color: COLOR_ACCENT }}
        >
          Sign up here.
        </Link>
      </p>
      <span className="sr-only" style={{ fontFamily: FONT_SPACE_GROTESK }}>
        Sign in to Agentwise
      </span>
      <span className="sr-only" style={{ fontFamily: FONT_FELLIX, color: COLOR_SURFACE }}>
        Real estate professional sign in
      </span>
    </form>
  );
}
