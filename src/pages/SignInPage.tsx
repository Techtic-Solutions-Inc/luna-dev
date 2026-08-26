import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { SignInForm } from '@/components/auth/SignInForm';

export function SignInPage() {
  return (
    <AuthSplitLayout collageSrc="/images/sign-in.png" collageAlt="">
      <SignInForm />
    </AuthSplitLayout>
  );
}
