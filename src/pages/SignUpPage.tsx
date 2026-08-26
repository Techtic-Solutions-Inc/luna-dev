import { AuthLayout } from '@/components/layout/AuthLayout';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { AuthImageGrid } from '@/components/auth/AuthImageGrid';

export function SignUpPage() {
  return (
    <AuthLayout variant="split" sidePanel={<AuthImageGrid />}>
      <SignUpForm />
    </AuthLayout>
  );
}
