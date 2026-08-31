import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword, useForgotPasswordErrorMessage } from '@/hooks/useForgotPassword';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const inputClassName =
  'h-[52px] w-full rounded-8 border border-sofia-color-66 bg-sofia-color-20 p-[12px] font-almarai text-[16px] font-[400] leading-[20px] text-sofia-secondary shadow-none placeholder:text-sofia-background hover:border-sofia-accent focus-visible:border-sofia-accent focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-sofia-border';

const buttonClassName =
  'h-[44px] w-full rounded-8 bg-sofia-accent p-[12px] font-public-sans text-[16px] font-[600] leading-[24px] text-sofia-secondary hover:bg-sofia-color-102 hover:text-sofia-secondary focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-25 active:bg-sofia-color-102 disabled:cursor-not-allowed disabled:opacity-50';

function ForgotPasswordSkeleton() {
  return (
    <div
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px] font-almarai"
      role="status"
      aria-live="polite"
      aria-label="Sending reset link"
    >
      <Skeleton className="h-[50px] w-[232px] bg-sofia-color-20" />
      <Skeleton className="h-[56px] w-full bg-sofia-color-20" />
      <Skeleton className="h-[52px] w-full rounded-8 bg-sofia-color-20" />
      <Skeleton className="h-[44px] w-full rounded-8 bg-sofia-accent/40" />
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
        className="flex w-full max-w-[461px] flex-col items-center gap-[20px] text-center font-almarai"
        role="status"
        aria-live="polite"
      >
        <h1 className="font-garamond text-heading-xl-35 text-sofia-secondary">Reset Password</h1>
        <p className="w-full text-body-16 text-sofia-background">
          {mutation.data.message ||
            `A reset link was sent to ${sentTo}. Check your inbox to continue.`}
        </p>
      </div>
    );
  }

  const { errors } = form.formState;

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center gap-[20px] font-almarai"
      noValidate
    >
      <h1 className="text-center font-garamond text-heading-xl-35 text-sofia-secondary">
        Reset Password
      </h1>
      <p className="w-full text-center text-body-16 text-sofia-background">
        Enter the email address you used to create your account and we&apos;ll send you a link to
        reset your password.
      </p>
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
      <div className="flex w-full flex-col gap-[10px]">
        <Label htmlFor="forgot-password-email" className="sr-only font-fellix">
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
          {...form.register('email')}
        />
        {errors.email?.message ? (
          <p
            id="forgot-password-email-error"
            className="text-body font-almarai text-sofia-border"
            role="alert"
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={mutation.isPending} className={buttonClassName}>
        Send me a link
      </Button>
    </form>
  );
}
