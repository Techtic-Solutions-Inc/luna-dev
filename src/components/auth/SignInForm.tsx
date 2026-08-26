import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormError } from '@/components/ui/FormError';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useSignIn } from '@/hooks/useSignIn';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function firstMessage(errors: Record<string, string[]>, key: string): string | undefined {
  const value = errors[key];
  return value && value.length > 0 ? value[0] : undefined;
}

export function SignInForm() {
  const { submit, isSubmitting, error, fieldErrors, success } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const mergedErrors = useMemo(
    () => ({
      email: localErrors.email ?? firstMessage(fieldErrors, 'email'),
      password: localErrors.password ?? firstMessage(fieldErrors, 'password'),
    }),
    [fieldErrors, localErrors],
  );

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    setLocalErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    await submit({ email: email.trim(), password }, remember);
  }

  const fieldClass = `!px-[16px]${isSubmitting ? ' skeleton-pulse' : ''}`;

  return (
    <form
      id="auth-form"
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center"
      noValidate
    >
      <AuthBrand />
      <h1 className="mt-[30px] text-center font-garamond text-[32px] font-medium leading-[41.76px] text-ink">
        Welcome To Agentwise
      </h1>
      <p className="type-body-15 mt-[16px] max-w-[400px] text-center text-ink">
        Everything you need to create standout real estate content.
      </p>

      <div className="mt-[30px] flex w-full flex-col gap-[20px]">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={mergedErrors.email}
          disabled={isSubmitting}
          className={fieldClass}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={mergedErrors.password}
          disabled={isSubmitting}
          className={fieldClass}
        />
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <Checkbox
            id="remember"
            name="remember"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            disabled={isSubmitting}
            align="center"
            labelClassName="type-body-15 font-almarai text-ink"
            label="Remember me"
          />
          <Link
            to="/forgot-password"
            className="type-body-15 shrink-0 font-almarai text-ink hover:text-accent hover:underline focus-visible:text-accent"
          >
            Forgot your password?
          </Link>
        </div>
        <FormError message={error} />
        {success ? (
          <p className="type-body-15 font-almarai text-accent" role="status">
            Signed in. Redirecting…
          </p>
        ) : null}
        <Button isLoading={isSubmitting} disabled={isSubmitting}>
          Sign In
        </Button>
      </div>

      <hr className="mt-[24px] h-px w-full border-0 bg-line" />
      <p className="type-body-15 mt-[16px] text-center font-almarai text-ink">
        Not a member yet?{' '}
        <Link to="/signup" className="text-accent hover:underline focus-visible:text-accent">
          Sign up here.
        </Link>
      </p>
    </form>
  );
}
