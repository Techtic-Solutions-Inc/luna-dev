import type { ReactNode } from 'react';
import { AuthCollage } from '@/components/auth/AuthCollage';
import { DesignTokenProbe } from '@/components/ui/DesignTokenProbe';

interface AuthSplitLayoutProps {
  children: ReactNode;
  collageSrc: string;
  collageAlt: string;
}

export function AuthSplitLayout({ children, collageSrc, collageAlt }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[#11161c] text-white">
      <DesignTokenProbe />
      <a href="#auth-form" className="skip-link bg-[#c8a47e] text-[#000001]">
        Skip to form
      </a>
      <section className="auth-glow relative flex min-h-screen w-full flex-col items-center justify-center px-[20px] py-[30px] md:px-[30px] md:py-[30px] lg:w-[55%]">
        {children}
      </section>
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#050505] lg:block lg:w-[45%]">
        <AuthCollage src={collageSrc} alt={collageAlt} />
      </aside>
    </div>
  );
}
