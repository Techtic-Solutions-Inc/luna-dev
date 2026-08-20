import AgentLogo from '../brand/AgentLogo';
import AuthImageCollage from './AuthImageCollage';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-screen flex-col lg:flex-row">
    <main className="auth-gradient flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[55%] lg:px-16 lg:py-16">
      <div className="mb-10 w-full max-w-md">
        <AgentLogo className="mx-auto" />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </main>
    <aside className="hidden lg:block lg:w-[45%]" aria-hidden="true">
      <AuthImageCollage />
    </aside>
  </div>
);

export default AuthLayout;
