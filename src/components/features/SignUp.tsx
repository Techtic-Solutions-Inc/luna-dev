import AuthMarketingCollage from '@/components/domain/AuthMarketingCollage';
import SignUpForm from '@/components/domain/SignUpForm';
import BrandLogo from '@/components/brand/BrandLogo';
import Heading from '@/components/ui/heading';
import Subheading from '@/components/ui/subheading';

export default function SignUp() {
  return (
    <div className="flex min-h-screen bg-color-16">
      <section className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_30%_45%,var(--color-50)_0%,var(--color-16)_52%,var(--color-59)_100%)] px-8 py-12">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <div className="mb-8">
            <BrandLogo />
          </div>
          <Heading size="large" className="mb-3 max-w-md leading-tight">
            Great Marketing Made Easier. Specifically For Agents
          </Heading>
          <Subheading className="mb-8">Create your account today</Subheading>
          <SignUpForm />
        </div>
      </section>
      <AuthMarketingCollage />
    </div>
  );
}
