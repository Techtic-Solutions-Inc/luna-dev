import { AuthLayout } from "@/components/layout/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export function SignInPage() {
  return (
    <AuthLayout
      collageSrc="/images/sign-in.png"
      collageAlt="Sign In"
      brandPlacement="form-center"
      columns="signin"
    >
      <SignInForm />
    </AuthLayout>
  );
}
