import { Link } from "react-router-dom";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/Button";

export function HomePage() {
  return (
    <div className="signup-glow flex min-h-screen flex-col items-center justify-center px-24 py-30">
      <BrandMark align="center" />
      <h1
        className="mt-24 max-w-[461px] text-center text-signup-title text-secondary"
        style={{ fontFamily: "'EB Garamond', serif" }}
      >
        Great Marketing Made Easier. Specifically For Agents
      </h1>
      <p
        className="mt-16 max-w-[461px] text-center text-body-16 text-color-131"
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        Create your account or sign in to access Agentwise.
      </p>
      <div className="mt-24 flex w-full max-w-[461px] flex-col gap-16">
        <Link to="/sign-up" className="block w-full">
          <Button type="button" className="h-52 w-full">
            Sign Up
          </Button>
        </Link>
        <Link to="/sign-in" className="block w-full">
          <Button type="button" variant="outline" className="h-52 w-full">
            Sign In
          </Button>
        </Link>
      </div>
      <section
        id="terms-of-service"
        className="mt-30 w-full max-w-[461px] text-center"
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        <h2 className="text-signup-subtitle text-secondary">Terms of Use</h2>
        <p className="mt-12 text-body-16 text-color-131">
          By creating an Agentwise account you agree to use the platform for legitimate real estate marketing and to
          follow applicable advertising rules.
        </p>
      </section>
      <section
        id="privacy-policy"
        className="mt-24 w-full max-w-[461px] text-center"
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        <h2 className="text-signup-subtitle text-secondary">Privacy Policy</h2>
        <p className="mt-12 text-body-16 text-color-131">
          Agentwise stores the account details you submit so you can sign in and manage your marketing workspace. We do
          not sell your personal information.
        </p>
      </section>
    </div>
  );
}
