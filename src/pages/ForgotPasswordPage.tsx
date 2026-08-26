import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-[32px] font-medium leading-[41.76px] text-ink">
          Forgot Password
        </h1>
        <p className="text-[16px] leading-6 text-muted">
          Password recovery is currently unavailable. Please contact support or
          try signing in with your existing credentials.
        </p>
        <Link
          to="/signin"
          className="text-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
