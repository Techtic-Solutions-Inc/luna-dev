import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useSignup, useSignupErrorMessage } from '@/hooks/useSignup';
import { signupSchema, type SignupFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const FONT_ALMARAI = "'Almarai', sans-serif";
const FONT_PUBLIC_SANS = "'Public Sans', sans-serif";
const FONT_EB_GARAMOND = "'EB Garamond', serif";
const FONT_SPACE_GROTESK = "'Space Grotesk', sans-serif";
const FONT_FELLIX = "'Fellix', 'Inter', sans-serif";

const COLOR_ACCENT = '#c8a47e';
const COLOR_MUTED = '#637381';
const COLOR_ERROR = '#ff5630';
const COLOR_INK = '#000001';
const COLOR_BRONZE = '#8b6842';
const COLOR_SURFACE = '#11161c';

const headingStyle: CSSProperties = {
  fontFamily: FONT_EB_GARAMOND,
  color: '#ffffff',
};

const subheadStyle: CSSProperties = {
  fontFamily: FONT_ALMARAI,
  color: COLOR_BRONZE,
};

const fieldStyle: CSSProperties = {
  fontFamily: FONT_ALMARAI,
  color: '#ffffff',
  backgroundColor: COLOR_SURFACE,
};

const ctaStyle: CSSProperties = {
  fontFamily: FONT_PUBLIC_SANS,
  color: COLOR_INK,
  backgroundColor: COLOR_BRONZE,
};

const inputClassName =
  'h-[52px] w-full rounded-[12px] border border-[#ffffff4c] bg-[#11161c] p-[12px] text-[16px] font-[400] leading-[17.856px] text-[#ffffff] shadow-none placeholder:text-[#8b6842] hover:border-[#c8a47e] focus-visible:border-[#c8a47e] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000001] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#ff5630]';

const buttonClassName =
  'h-[52px] w-full max-w-[461px] rounded-[100px] border border-[#8b6842] bg-[#8b6842] p-[12px] text-[16px] font-[600] leading-[24px] text-[#000001] hover:bg-[#c8a47e] hover:text-[#000001] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000001] active:bg-[#554545] active:text-[#000001] disabled:cursor-not-allowed disabled:opacity-50';

function SignUpSkeleton() {
  return (
    <div
      className="flex w-full max-w-[461px] flex-col items-center gap-[16px]"
      role="status"
      aria-live="polite"
      aria-label="Creating your account"
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <Skeleton className="h-[100px] w-full bg-[#11161c]" />
      <Skeleton className="h-[20px] w-[204px] bg-[#11161c]" />
      <div className="flex w-full gap-[20px]">
        <Skeleton className="h-[52px] w-[220px] rounded-[12px] bg-[#11161c]" />
        <Skeleton className="h-[52px] w-[220px] rounded-[12px] bg-[#11161c]" />
      </div>
      <Skeleton className="h-[52px] w-full rounded-[12px] bg-[#11161c]" />
      <Skeleton className="h-[52px] w-full rounded-[12px] bg-[#11161c]" />
      <Skeleton className="h-[16px] w-full bg-[#11161c]" />
      <Skeleton className="h-[52px] w-full rounded-[100px] bg-[#8b6842]/40" />
    </div>
  );
}

export default function SignUpForm() {
  const mutation = useSignup();
  const errorMessage = useSignupErrorMessage(mutation.error);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const termsAccepted = form.watch('terms');

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      });
    } catch {
      // Error is rendered from mutation.error
    }
  });

  const handleRetry = () => {
    void onSubmit();
  };

  if (mutation.isPending) {
    return <SignUpSkeleton />;
  }

  if (mutation.isSuccess) {
    return (
      <div
        className="flex w-full max-w-[461px] flex-col items-center gap-[16px] text-center"
        role="status"
        aria-live="polite"
        style={{ fontFamily: FONT_ALMARAI }}
      >
        <h1
          className="w-full text-[32px] font-[500] leading-[41.76px] text-[#ffffff]"
          style={headingStyle}
        >
          Great Marketing Made Easier. Specifically For Agents
        </h1>
        <p className="text-[20px] font-[400] leading-[22.32px]" style={subheadStyle}>
          {mutation.data.message || 'Your account was created. Sign in to continue.'}
        </p>
        <Link
          to="/sign-in"
          className="text-[14px] font-[400] leading-[15.624px] text-[#c8a47e] underline underline-offset-[3px] hover:text-[#8b6842] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
          style={{ fontFamily: FONT_PUBLIC_SANS }}
        >
          Sign in
        </Link>
      </div>
    );
  }

  const { errors } = form.formState;

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center gap-[16px]"
      noValidate
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <div className="flex w-full flex-col items-center gap-[16px]">
        <h1
          className="w-full text-center text-[32px] font-[500] leading-[41.76px] text-[#ffffff]"
          style={headingStyle}
        >
          Great Marketing Made Easier. Specifically For Agents
        </h1>
        <h2
          className="w-[204px] text-center text-[20px] font-[400] leading-[22.32px]"
          style={subheadStyle}
        >
          Create your account today
        </h2>
      </div>

      {mutation.isError ? (
        <div
          className="flex w-full flex-col items-center gap-[12px] rounded-[12px] border border-[#ff5630] bg-[#ff563028] px-[16px] py-[14px] text-center"
          role="alert"
        >
          <p
            className="text-[16px] font-[400] leading-[20px]"
            style={{ fontFamily: FONT_ALMARAI, color: COLOR_ERROR }}
          >
            {errorMessage}
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

      <div className="flex w-full flex-col gap-[20px] tablet:flex-row">
        <div className="flex w-full flex-col gap-[10px] tablet:w-[220px]">
          <Label
            htmlFor="signup-first-name"
            className="sr-only"
            style={{ fontFamily: FONT_FELLIX }}
          >
            First Name
          </Label>
          <Input
            id="signup-first-name"
            type="text"
            autoComplete="given-name"
            placeholder="First Name"
            aria-invalid={Boolean(errors.first_name)}
            className={inputClassName}
            style={fieldStyle}
            {...form.register('first_name')}
          />
          {errors.first_name?.message ? (
            <p
              className="text-[14px] leading-[15.624px]"
              role="alert"
              style={{ color: COLOR_ERROR }}
            >
              {errors.first_name.message}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-[10px] tablet:w-[220px]">
          <Label htmlFor="signup-last-name" className="sr-only" style={{ fontFamily: FONT_FELLIX }}>
            Last Name
          </Label>
          <Input
            id="signup-last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Last Name"
            aria-invalid={Boolean(errors.last_name)}
            className={inputClassName}
            style={fieldStyle}
            {...form.register('last_name')}
          />
          {errors.last_name?.message ? (
            <p
              className="text-[14px] leading-[15.624px]"
              role="alert"
              style={{ color: COLOR_ERROR }}
            >
              {errors.last_name.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="signup-email" className="sr-only">
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          style={fieldStyle}
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p className="text-[14px] leading-[15.624px]" role="alert" style={{ color: COLOR_ERROR }}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="signup-password" className="sr-only">
          Create a Password
        </Label>
        <div className="relative w-full">
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a Password"
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

      <div className="flex w-full items-start gap-[10px]">
        <input
          id="signup-terms"
          type="checkbox"
          className="mt-[2px] h-[20px] w-[20px] shrink-0 cursor-pointer rounded-[2px] border border-[#ffffff] bg-[#000001] accent-[#c8a47e] hover:border-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ accentColor: COLOR_ACCENT }}
          aria-invalid={Boolean(errors.terms)}
          {...form.register('terms')}
        />
        <Label
          htmlFor="signup-terms"
          className="cursor-pointer text-[14px] font-[400] leading-[15.624px] text-[#ffffff]"
          style={{ fontFamily: FONT_ALMARAI, color: '#ffffff' }}
        >
          I have read and agree to the{' '}
          <a
            href="#terms"
            className="underline underline-offset-[3px] hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            onClick={(event) => event.stopPropagation()}
          >
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            href="#privacy"
            className="underline underline-offset-[3px] hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            onClick={(event) => event.stopPropagation()}
          >
            Privacy Policy
          </a>
          .
        </Label>
      </div>
      {errors.terms?.message ? (
        <p
          className="w-full text-[14px] leading-[15.624px]"
          role="alert"
          style={{ color: COLOR_ERROR }}
        >
          {errors.terms.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={!termsAccepted || mutation.isPending}
        className={buttonClassName}
        style={ctaStyle}
      >
        Sign Up
      </Button>

      <p
        className="w-full text-center text-[14px] font-[400] leading-[15.624px] text-[#637381]"
        style={{ fontFamily: FONT_ALMARAI, color: COLOR_MUTED }}
      >
        Already have an account?{' '}
        <Link
          to="/sign-in"
          className="text-[#c8a47e] underline underline-offset-[3px] hover:text-[#8b6842] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:text-[#8b6842]"
          style={{ fontFamily: FONT_PUBLIC_SANS, color: COLOR_ACCENT }}
        >
          Sign in
        </Link>
      </p>
      <span className="sr-only" style={{ fontFamily: FONT_SPACE_GROTESK }}>
        Create your Agentwise account
      </span>
    </form>
  );
}
