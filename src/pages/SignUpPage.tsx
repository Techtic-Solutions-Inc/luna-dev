import { AuthLayout } from "@/components/layout/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export function SignUpPage() {
  return (
    <AuthLayout collageSrc="/images/sign-up.png" collageAlt="Sign Up">
      <SignUpForm />
    </AuthLayout>
  );
}
