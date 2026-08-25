import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useSignup } from "@/hooks/useSignup";

const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = "first_name" | "last_name" | "email" | "password" | "terms_accepted";

export function SignUpForm() {
  const { submit, loading, error, fieldErrors } = useSignup();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Record<FieldKey, string>>>({});

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!firstName.trim()) {
      next.first_name = "First name is required.";
    }
    if (!lastName.trim()) {
      next.last_name = "Last name is required.";
    }
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_RULE.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (!PASSWORD_RULE.test(password)) {
      next.password =
        "Password must be at least 8 characters with one uppercase letter, one number, and one special character.";
    }
    if (!terms) {
      next.terms_accepted = "You must accept the Terms of Use and Privacy Policy.";
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
    await submit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: true,
    });
  }

  const firstNameError = localErrors.first_name ?? fieldErrors.first_name?.[0];
  const lastNameError = localErrors.last_name ?? fieldErrors.last_name?.[0];
  const emailError = localErrors.email ?? fieldErrors.email?.[0];
  const passwordError = localErrors.password ?? fieldErrors.password?.[0];
  const termsError = localErrors.terms_accepted ?? fieldErrors.terms_accepted?.[0];
  const formError = error && !emailError && !passwordError && !firstNameError && !lastNameError ? error : null;

  return (
    <form className="flex w-full flex-col gap-16" onSubmit={onSubmit} noValidate>
      <div className="text-center">
        <h1 className="font-garamond text-signup-title text-secondary">
          Great Marketing Made Easier. Specifically For Agents
        </h1>
        <h2 className="mt-16 text-[20px] font-normal leading-[22.32px] text-color-131">Create your account today</h2>
      </div>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <Input
          label="First Name"
          name="first_name"
          placeholder="First Name"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={firstNameError}
          disabled={loading}
          hideLabel
          shape="pill"
        />
        <Input
          label="Last Name"
          name="last_name"
          placeholder="Last Name"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={lastNameError}
          disabled={loading}
          hideLabel
          shape="pill"
        />
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        disabled={loading}
        hideLabel
        shape="pill"
      />
      <PasswordInput
        label="Create a Password"
        name="password"
        placeholder="Create a Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        disabled={loading}
        hideLabel
        shape="pill"
      />
      <Checkbox
        name="terms_accepted"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
        disabled={loading}
        className="text-secondary"
        aria-invalid={Boolean(termsError)}
        aria-describedby={termsError ? "terms_accepted-error" : undefined}
      >
        I have read and agree to the{" "}
        <Link
          to="/#terms-of-service"
          className="underline decoration-secondary underline-offset-2 transition hover:text-accent focus-visible:text-accent"
        >
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          to="/#privacy-policy"
          className="underline decoration-secondary underline-offset-2 transition hover:text-accent focus-visible:text-accent"
        >
          Privacy Policy
        </Link>
        .
      </Checkbox>
      {termsError ? (
        <p id="terms_accepted-error" className="text-almarai-14 text-border">
          {termsError}
        </p>
      ) : null}
      {formError ? <p className="text-almarai-14 text-border">{formError}</p> : null}
      <Button type="submit" loading={loading} disabled={!terms || loading} className="h-52 w-full rounded-1000 text-public-16">
        {loading ? "Signing up…" : "Sign Up"}
      </Button>
      <div className="h-1 w-full bg-color-129" />
      <p className="text-center text-almarai-16-20 text-color-131">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="underline decoration-color-131 underline-offset-2 transition hover:text-accent focus-visible:text-accent active:opacity-80"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
