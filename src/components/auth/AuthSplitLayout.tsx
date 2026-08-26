import type { ReactNode } from 'react';
import { AuthCollage } from '@/components/auth/AuthCollage';

interface AuthSplitLayoutProps {
  children: ReactNode;
  collageSrc: string;
  collageAlt: string;
}

export function AuthSplitLayout({ children, collageSrc, collageAlt }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-color-103 text-ink">
      <a href="#auth-form" className="skip-link bg-accent text-color-101">
        Skip to form
      </a>
      <section className="auth-glow relative flex min-h-screen w-full flex-col items-center justify-center px-[16px] py-[40px] sm:px-[20px] md:px-[40px] md:py-[60px] lg:w-[55%]">
        {children}
      </section>
      <aside className="relative hidden min-h-screen overflow-hidden bg-color-105 lg:block lg:w-[45%]">
        <AuthCollage src={collageSrc} alt={collageAlt} />
      </aside>
    </div>
  );
}
