import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { SignUpForm } from '@/components/auth/SignUpForm';

export function SignUpPage() {
  return (
    <AuthSplitLayout collageSrc="/images/sign-up.png" collageAlt="">
      <SignUpForm />
    </AuthSplitLayout>
  );
}
