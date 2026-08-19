import AuthMarketingCollage from '@/components/domain/AuthMarketingCollage';
import SignInForm from '@/components/domain/SignInForm';
import BrandLogo from '@/components/brand/BrandLogo';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';

export default function SignIn() {
  return (
    <div className="flex min-h-screen bg-color-16">
      <section className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_30%_45%,var(--color-50)_0%,var(--color-16)_52%,var(--color-59)_100%)] px-8 py-12">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="mb-8">
            <BrandLogo />
          </div>
          <Heading size="large" className="mb-4">
            Welcome To Agentwise
          </Heading>
          <Text className="mb-8">Everything you need to create standout real estate content.</Text>
          <SignInForm />
        </div>
      </section>
      <AuthMarketingCollage />
    </div>
  );
}
