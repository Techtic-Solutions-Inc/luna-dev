import type { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword, useForgotPasswordErrorMessage } from '@/hooks/useForgotPassword';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validation';
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
const COLOR_FIELD = '#1d1a1a';

const headingStyle: CSSProperties = {
  fontFamily: FONT_EB_GARAMOND,
  color: '#ffffff',
};

const bodyStyle: CSSProperties = {
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
  color: COLOR_SURFACE,
  backgroundColor: COLOR_ACCENT,
  boxShadow: `0 4px 24px ${COLOR_BRONZE}4c`,
};

const inputClassName =
  'h-[52px] w-full rounded-[12px] border border-[#ffffff4c] bg-[#1d1a1a] p-[12px] text-[16px] font-[400] leading-[20px] text-[#ffffff] shadow-none placeholder:text-[#637381] hover:border-[#c8a47e] hover:bg-[#1d1818] focus-visible:border-[#c8a47e] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161c] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#ff5630]';

const buttonClassName =
  'h-[44px] w-full rounded-[100px] bg-[#c8a47e] p-[12px] text-[16px] font-[600] leading-[18.8px] text-[#11161c] hover:bg-[#8b6842] hover:text-[#11161c] focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161c] active:bg-[#8b6842] active:text-[#000001] disabled:cursor-not-allowed disabled:opacity-50';

function ForgotPasswordSkeleton() {
  return (
    <div
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px]"
      role="status"
      aria-live="polite"
      aria-label="Sending reset link"
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <Skeleton className="h-[50px] w-[232px] bg-[#1d1a1a]" />
      <Skeleton className="h-[56px] w-full bg-[#1d1a1a]" />
      <Skeleton className="h-[52px] w-full rounded-[12px] bg-[#1d1a1a]" />
      <Skeleton className="h-[44px] w-full rounded-[100px] bg-[#c8a47e]/40" />
    </div>
  );
}

export default function ForgotPasswordForm() {
  const mutation = useForgotPassword();
  const errorMessage = useForgotPasswordErrorMessage(mutation.error);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
    } catch {
      // Error is rendered from mutation.error
    }
  });

  const handleRetry = () => {
    void onSubmit();
  };

  if (mutation.isPending) {
    return <ForgotPasswordSkeleton />;
  }

  if (mutation.isSuccess) {
    const sentTo = form.getValues('email');
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
          Reset Password
        </h1>
        <p className="w-full text-[16px] font-[400] leading-[26px]" style={bodyStyle}>
          {mutation.data.message ||
            `A reset link was sent to ${sentTo}. Check your inbox to continue.`}
        </p>
      </div>
    );
  }

  const { errors } = form.formState;
  const showErrorAlert = mutation.isError;

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px]"
      noValidate
      style={{ fontFamily: FONT_ALMARAI }}
    >
      <h1
        className="text-center text-[32px] font-[500] leading-[41.76px] text-[#ffffff]"
        style={headingStyle}
      >
        Reset Password
      </h1>
      <p className="w-full text-center text-[16px] font-[400] leading-[26px]" style={bodyStyle}>
        Enter the email address you used to create your account and we&apos;ll send you a link to
        reset your password.
      </p>
      {showErrorAlert ? (
        <div
          className="flex w-full flex-col items-center gap-[12px] rounded-[12px] border border-[#ff5630] bg-[#ff563028] px-[16px] py-[14px] text-center"
          role="alert"
        >
          <p
            className="text-[16px] font-[400] leading-[20px] text-[#ffffff]"
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
      <div className="flex w-full flex-col gap-[10px]">
        <Label
          htmlFor="forgot-password-email"
          className="sr-only"
          style={{ fontFamily: FONT_FELLIX }}
        >
          Email
        </Label>
        <Input
          id="forgot-password-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          disabled={mutation.isPending}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'forgot-password-email-error' : undefined}
          className={inputClassName}
          style={fieldStyle}
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p
            id="forgot-password-email-error"
            className="text-[16px] font-[400] leading-[17.856px]"
            role="alert"
            style={{ fontFamily: FONT_ALMARAI, color: COLOR_ERROR }}
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={mutation.isPending}
        className={buttonClassName}
        style={ctaStyle}
      >
        Send me a link
      </Button>
      <span className="sr-only" style={{ fontFamily: FONT_SPACE_GROTESK, color: COLOR_INK }}>
        Reset your Agentwise password
      </span>
    </form>
  );
}
