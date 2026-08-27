import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLogin } from "@/hooks/useLogin";

const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = "email" | "password";

export function SignInForm() {
  const { submit, loading, error, fieldErrors } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Record<FieldKey, string>>>({});

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_RULE.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    }
    return next;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setLocalErrors(next);
    if (Object.keys(next).length > 0) {
      return;
    }
    await submit({ email: email.trim(), password }, remember);
  }

  const emailError = localErrors.email ?? fieldErrors.email?.[0];
  const passwordError = localErrors.password ?? fieldErrors.password?.[0];
  const formError = error && !emailError && !passwordError ? error : null;

  return (
    <form className="flex w-full flex-col items-stretch gap-20" onSubmit={onSubmit} noValidate>
      <div className="flex flex-col items-center gap-16 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <h1
          className="font-eb-garamond text-signup-title text-secondary"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Welcome To Agentwise
        </h1>
        <p className="text-body-44 text-color-131" style={{ fontFamily: "'Public Sans', sans-serif" }}>
          Everything you need to create standout real estate content.
        </p>
      </div>
      {loading ? (
        <div className="flex flex-col gap-20" aria-busy="true" aria-live="polite">
          <span className="sr-only">Signing in</span>
          <Skeleton className="h-52 w-full rounded-1000" />
          <Skeleton className="h-52 w-full rounded-1000" />
          <Skeleton className="h-16 w-full rounded-8" />
        </div>
      ) : (
        <>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            hideLabel
            shape="pill"
          />
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            hideLabel
            shape="pill"
          />
          <div className="flex items-center justify-between gap-12">
            <Checkbox
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="text-body-16 text-secondary"
            >
              Remember me
            </Checkbox>
            <Link
              to="/forgot-password"
              className="text-body-69 text-color-131 transition hover:text-accent focus-visible:text-accent active:opacity-80"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Forgot your password?
            </Link>
          </div>
        </>
      )}
      {formError ? <Alert message={formError} /> : null}
      <Button type="submit" loading={loading} disabled={loading} className="h-52 w-full">
        {loading ? "Signing in…" : "Sign In"}
      </Button>
      <div className="h-1 w-full bg-color-129" />
      <p
        className="text-center font-fellix text-body-69 text-color-131"
        style={{ fontFamily: "'Fellix', sans-serif" }}
      >
        Not a member yet?{" "}
        <Link
          to="/sign-up"
          className="text-accent transition hover:text-color-102 focus-visible:text-color-102 active:opacity-80"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Sign up here.
        </Link>
      </p>
    </form>
  );
}
