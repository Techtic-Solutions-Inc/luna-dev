import styled from 'styled-components';
import AgentLogo from '../brand/AgentLogo';
import AuthImageCollage from './AuthImageCollage';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthCard = styled.div`
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-11']};
`;

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-screen flex-col bg-color-32 lg:flex-row">
    <main className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-[55%] lg:px-16 lg:py-16">
      <div className="mb-8 w-full max-w-full min-[481px]:max-w-[440px] lg:max-w-[480px]">
        <AgentLogo className="mx-auto" variant="light" />
      </div>
      <AuthCard className="w-full max-w-full rounded-[10px] bg-secondary p-10 min-[481px]:max-w-[440px] lg:max-w-[480px]">
        {children}
      </AuthCard>
    </main>
    <aside className="hidden lg:block lg:w-[45%]" aria-hidden="true">
      <AuthImageCollage />
    </aside>
  </div>
);

export default AuthLayout;
