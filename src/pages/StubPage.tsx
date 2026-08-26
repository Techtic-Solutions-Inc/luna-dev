import { useLocation } from 'react-router-dom';
import { BrandLogo } from '@/components/home/BrandLogo';
import { Button } from '@/components/ui/Button';

const TITLES: Record<string, string> = {
  '/signin': 'Log in',
  '/signup': 'Join Agentwise',
  '/blog': 'Blog',
  '/content': 'Content',
  '/pricing': 'Pricing',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
};

export function StubPage() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? (pathname.replace('/', '') || 'Page');

  return (
    <div className="flex min-h-screen flex-col bg-[#11161c] text-ink">
      <header className="px-[20px] py-[20px] md:px-[40px]">
        <BrandLogo />
      </header>
      <main className="mx-auto flex w-full max-w-[800px] flex-1 flex-col px-[20px] py-[80px]">
        <h1 className="font-garamond text-[40px] font-medium">{title}</h1>
        <p className="type-body-29 mt-[16px] text-[#637381]">
          Continue from the home page. This destination is linked from the Visitor Home screen.
        </p>
        <Button to="/" variant="primary" className="mt-[32px] w-fit min-w-[160px]">
          Back to Home
        </Button>
      </main>
    </div>
  );
}
