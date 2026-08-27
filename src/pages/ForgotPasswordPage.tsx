import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/Button";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
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
        <Button type="button" className="mt-24 h-52 w-full" onClick={() => navigate("/sign-in")}>
          Back to Sign In
        </Button>
      </div>
    </AuthLayout>
  );
}
