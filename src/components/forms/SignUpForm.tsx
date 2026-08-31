import { useState } from 'react';
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

const HEADLINE = 'Great Marketing Made Easier. Specifically for Agents';

const inputClassName =
  'h-[52px] w-full rounded-8 border border-sofia-secondary bg-sofia-color-89 p-[12px] font-almarai text-[16px] font-[400] leading-[17.856px] text-sofia-secondary shadow-none placeholder:text-sofia-color-102 hover:border-sofia-accent focus-visible:border-sofia-accent focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-sofia-border';

const buttonClassName =
  'h-[52px] w-full max-w-[461px] rounded-8 border border-sofia-accent bg-sofia-accent p-[12px] font-public-sans text-[16px] font-[600] leading-[24px] text-sofia-secondary hover:bg-sofia-color-102 hover:text-sofia-secondary focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 active:bg-sofia-color-111 disabled:cursor-not-allowed disabled:opacity-50';

const legalLinkClassName =
  'font-almarai text-sofia-accent underline underline-offset-[3px] hover:text-sofia-color-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent';

function SignUpSkeleton() {
  return (
    <div
      className="flex w-full max-w-[461px] flex-col items-center gap-[16px] font-almarai"
      role="status"
      aria-live="polite"
      aria-label="Creating your account"
    >
      <Skeleton className="h-[100px] w-full bg-sofia-color-89" />
      <Skeleton className="h-[20px] w-[204px] bg-sofia-color-89" />
      <div className="flex w-full flex-col gap-[20px] tablet:flex-row">
        <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-89 tablet:w-[220px]" />
        <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-89 tablet:w-[220px]" />
      </div>
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-89" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-89" />
      <Skeleton className="h-[16px] w-full bg-sofia-color-89" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-accent/40" />
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
        className="flex w-full max-w-[461px] flex-col items-center gap-[16px] text-center font-almarai"
        role="status"
        aria-live="polite"
      >
        <h1 className="w-full font-garamond text-heading-xl-35 text-sofia-secondary">{HEADLINE}</h1>
        <p className="text-heading-md-14 text-sofia-secondary">
          {mutation.data.message || 'Your account was created. Sign in to continue.'}
        </p>
        <Link
          to="/sign-in"
          className="font-public-sans text-body-sm-2 text-sofia-accent underline underline-offset-[3px] hover:text-sofia-color-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent"
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
      className="flex w-full max-w-[461px] flex-col items-center gap-[16px] font-almarai"
      noValidate
    >
      <div className="flex w-full flex-col items-center gap-[16px]">
        <h1 className="w-full text-center font-garamond text-heading-xl-35 text-sofia-secondary">
          {HEADLINE}
        </h1>
        <h2 className="w-[204px] text-center font-almarai text-heading-md-14 text-sofia-secondary">
          Create your account today
        </h2>
      </div>

      {mutation.isError ? (
        <div
          className="flex w-full flex-col items-center gap-[12px] rounded-8 border border-sofia-border bg-sofia-warning px-[16px] py-[14px] text-center"
          role="alert"
        >
          <p className="text-[16px] font-[400] leading-[20px] text-sofia-border">{errorMessage}</p>
          <Button
            type="button"
            onClick={handleRetry}
            className={`${buttonClassName} h-[36px] w-auto min-w-[120px] px-[20px]`}
          >
            Try again
          </Button>
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-[20px] tablet:flex-row">
        <div className="flex w-full flex-col gap-[10px] tablet:w-[220px]">
          <Label htmlFor="signup-first-name" className="sr-only font-fellix">
            First Name
          </Label>
          <Input
            id="signup-first-name"
            type="text"
            autoComplete="given-name"
            placeholder="First Name"
            aria-invalid={Boolean(errors.first_name)}
            aria-describedby={errors.first_name ? 'signup-first-name-error' : undefined}
            className={inputClassName}
            {...form.register('first_name')}
          />
          {errors.first_name?.message ? (
            <p
              id="signup-first-name-error"
              className="text-body-sm-2 text-sofia-border"
              role="alert"
            >
              {errors.first_name.message}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-[10px] tablet:w-[220px]">
          <Label htmlFor="signup-last-name" className="sr-only font-fellix">
            Last Name
          </Label>
          <Input
            id="signup-last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Last Name"
            aria-invalid={Boolean(errors.last_name)}
            aria-describedby={errors.last_name ? 'signup-last-name-error' : undefined}
            className={inputClassName}
            {...form.register('last_name')}
          />
          {errors.last_name?.message ? (
            <p
              id="signup-last-name-error"
              className="text-body-sm-2 text-sofia-border"
              role="alert"
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
          aria-describedby={errors.email ? 'signup-email-error' : undefined}
          className={inputClassName}
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p id="signup-email-error" className="text-body-sm-2 text-sofia-border" role="alert">
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
            aria-describedby={errors.password ? 'signup-password-error' : undefined}
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
          <p id="signup-password-error" className="text-body-sm-2 text-sofia-border" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex w-full items-start gap-[10px]">
        <input
          id="signup-terms"
          type="checkbox"
          className="mt-[2px] h-[20px] w-[20px] shrink-0 cursor-pointer rounded-[2px] border border-sofia-secondary bg-sofia-color-101 accent-sofia-accent hover:border-sofia-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={Boolean(errors.terms)}
          aria-labelledby="signup-terms-copy"
          aria-describedby={errors.terms ? 'signup-terms-error' : undefined}
          {...form.register('terms')}
        />
        <p id="signup-terms-copy" className="font-almarai text-body-sm-2 text-sofia-secondary">
          <Label
            htmlFor="signup-terms"
            className="cursor-pointer font-almarai text-sofia-secondary"
          >
            I have read and agree to the
          </Label>{' '}
          <Link to="/terms" className={legalLinkClassName}>
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className={legalLinkClassName}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      {errors.terms?.message ? (
        <p id="signup-terms-error" className="w-full text-body-sm-2 text-sofia-border" role="alert">
          {errors.terms.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={!termsAccepted || mutation.isPending}
        className={buttonClassName}
      >
        Sign Up
      </Button>

      <p className="w-full text-center font-almarai text-body-sm-2 text-sofia-accent">
        Already have an account?{' '}
        <Link
          to="/sign-in"
          className="font-public-sans text-sofia-accent underline underline-offset-[3px] hover:text-sofia-color-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent active:text-sofia-color-102"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
