import AuthMarketingCollage from '@/components/domain/AuthMarketingCollage';
import ForgotPasswordForm from '@/components/domain/ForgotPasswordForm';
import BrandLogo from '@/components/brand/BrandLogo';
import Heading from '@/components/ui/heading';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen bg-color-16">
      <section className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_30%_45%,var(--color-50)_0%,var(--color-16)_52%,var(--color-59)_100%)] px-8 py-16">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="mb-8">
            <BrandLogo />
          </div>
          <Heading size="large" className="mb-4">
            Reset Password
          </Heading>
          <p className="mb-8 font-almarai text-base leading-7 text-color-18">
            Enter the email address you used to create your account and we&apos;ll send you a link
            to reset your password.
          </p>
          <ForgotPasswordForm />
        </div>
      </section>
      <AuthMarketingCollage />
    </div>
  );
}
