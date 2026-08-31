import AuthShell from '@/components/layout/AuthShell';
import SignInForm from '@/components/forms/SignInForm';

export default function SignIn() {
  return (
    <AuthShell paneClassName="px-[40px] py-[60px]">
      <SignInForm />
    </AuthShell>
  );
}
