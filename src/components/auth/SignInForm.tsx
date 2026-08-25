import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
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
      <div className="text-center">
        <h1 className="font-garamond text-signup-title text-secondary">Welcome To Agentwise</h1>
        <p className="mt-12 text-almarai-16-24 text-color-131">
          Everything you need to create standout real estate content.
        </p>
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        disabled={loading}
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
        disabled={loading}
        shape="pill"
      />
      <div className="flex items-center justify-between gap-12">
        <Checkbox name="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} disabled={loading}>
          Remember me
        </Checkbox>
        <Link
          to="/forgot-password"
          className="text-almarai-16-20 text-color-131 transition hover:text-accent focus-visible:text-accent active:opacity-80"
        >
          Forgot your password?
        </Link>
      </div>
      {formError ? (
        <p role="alert" className="text-almarai-14 text-border">
          {formError}
        </p>
      ) : null}
      <Button type="submit" loading={loading} disabled={loading} className="h-52 w-full rounded-1000 text-public-16">
        {loading ? "Signing in…" : "Sign In"}
      </Button>
      <div className="h-1 w-full bg-color-129" />
      <p className="text-center text-almarai-16-20 text-color-131">
        Not a member yet?{" "}
        <Link
          to="/sign-up"
          className="text-accent underline underline-offset-2 transition hover:text-color-102 focus-visible:text-color-102 active:opacity-80"
        >
          Sign up here.
        </Link>
      </p>
    </form>
  );
}
