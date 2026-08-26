import { AuthLayout } from '@/components/layout/AuthLayout';
import { AuthImageGrid } from '@/components/auth/AuthImageGrid';
import { SignInForm } from '@/components/auth/SignInForm';

export function SignInPage() {
  return (
    <AuthLayout variant="split" sidePanel={<AuthImageGrid />}>
      <SignInForm />
    </AuthLayout>
  );
}
