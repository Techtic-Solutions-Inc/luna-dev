import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/useAuth";
import { useLogout } from "@/hooks/useLogout";

export function DashboardPage() {
  const { user } = useAuth();
  const { submit, loading } = useLogout();
  const greeting = user?.first_name || user?.name || user?.email || "there";

  return (
    <div className="signup-glow flex min-h-screen flex-col px-24 py-30">
      <BrandMark align="start" />
      <main className="mx-auto mt-30 w-full max-w-[461px]">
        <h1 className="text-signup-title text-secondary" style={{ fontFamily: "'EB Garamond', serif" }}>
          Welcome, {greeting}
        </h1>
        <p className="mt-16 text-body-16 text-color-131" style={{ fontFamily: "'Almarai', sans-serif" }}>
          You are signed in{user?.email ? ` as ${user.email}` : ""}.
        </p>
        <Button
          type="button"
          loading={loading}
          disabled={loading}
          className="mt-24 h-52 w-full"
          onClick={() => {
            void submit();
          }}
        >
          {loading ? "Signing out…" : "Sign out"}
        </Button>
      </main>
    </div>
  );
}
