import type { ReactNode } from 'react';
import { SkipLink } from './SkipLink';

interface AuthLayoutProps {
  children: ReactNode;
  variant?: 'centered' | 'split';
  sidePanel?: ReactNode;
}

export function AuthLayout({ children, variant = 'centered', sidePanel }: AuthLayoutProps) {
  if (variant === 'split') {
    return (
      <div className="signup-canvas min-h-screen bg-[#1a1614]">
        <SkipLink />
        <main
          id="main"
          className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:min-h-[850px] lg:flex-row"
        >
          <div className="signup-panel relative flex w-full flex-col items-center justify-center px-6 py-10 lg:w-[55%] lg:px-[60px] lg:py-[48px]">
            <div className="signup-glow pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative z-10 w-full max-w-[461px]">{children}</div>
          </div>
          {sidePanel && (
            <div className="hidden w-full lg:block lg:w-[45%]">{sidePanel}</div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="auth-gradient min-h-screen">
      <SkipLink />
      <main
        id="main"
        className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-4 py-[60px] sm:px-10"
      >
        <div className="w-full max-w-[461px]">{children}</div>
      </main>
    </div>
  );
}
