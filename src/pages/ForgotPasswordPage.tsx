import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      collageSrc="/images/sign-in.png"
      collageAlt="Sign In"
      brandPlacement="form-center"
      columns="signin"
    >
      <div className="text-center">
        <h1 className="font-garamond text-signup-title text-secondary">Reset your password</h1>
        <p className="mt-16 text-almarai-16-24 text-color-131">
          Password recovery is not available on this endpoint yet. Return to Sign In to use your existing credentials.
        </p>
        <Link
          to="/sign-in"
          className="mt-32 inline-flex h-52 items-center rounded-1000 bg-accent px-24 text-almarai-16-bold text-color-101 transition hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent active:brightness-90"
        >
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
