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
    </div>
  );
}
