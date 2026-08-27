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
        <h1 className="text-signup-title text-secondary" style={{ fontFamily: "'EB Garamond', serif" }}>
          Reset your password
        </h1>
        <p className="mt-16 text-body-16 text-color-131" style={{ fontFamily: "'Almarai', sans-serif" }}>
          Password recovery is not available on this endpoint yet. Return to Sign In to use your existing credentials.
        </p>
        <Link
          to="/sign-in"
          className="mt-24 inline-flex h-52 items-center rounded-1000 bg-accent px-24 text-body-115 text-secondary transition hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent active:brightness-90"
          style={{ fontFamily: "'Public Sans', sans-serif" }}
        >
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
