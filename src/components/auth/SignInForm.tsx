import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AgentwiseLogo } from '@/components/auth/AgentwiseLogo';
import { TextField } from '@/components/ui/TextField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useLogin } from '@/hooks/useLogin';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signInInputClass =
  'border-none bg-panel px-4 focus-visible:border-none hover:border-none';

export function SignInForm() {
  const { submit, loading, error, fieldErrors } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;
    void submit({ email: email.trim(), password }, remember);
  };

  const mergedErrors = { ...clientErrors, ...fieldErrors };

  return (
    <>
      <AgentwiseLogo />
      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex w-full flex-col gap-[20px]"
        noValidate
      >
        <header className="flex flex-col items-center gap-4 text-center">
          <h1
            className="text-[32px] font-medium leading-[41.76px] text-ink"
            style={{ fontFamily: 'EB Garamond, serif' }}
          >
            Welcome To Agentwise
          </h1>
          <p
            className="max-w-[461px] text-[16px] font-normal leading-[24px] text-muted"
            style={{ fontFamily: 'Almarai, sans-serif' }}
          >
            Everything you need to create standout real estate content.
          </p>
        </header>

        {error && <Alert message={error} />}

        <TextField
          label="Email"
          hideLabel
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={mergedErrors.email}
          disabled={loading}
          placeholder="Email"
          className={signInInputClass}
        />

        <PasswordField
          label="Password"
          hideLabel
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={mergedErrors.password}
          disabled={loading}
          placeholder="Password"
          className={signInInputClass}
        />

        <div className="flex items-center justify-between gap-4">
          <Checkbox
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={loading}
            className="text-[16px] leading-6"
          />
          <Link
            to="/forgot-password"
            className="shrink-0 text-[16px] leading-6 text-muted underline hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          className="h-[52px] rounded-[100px] text-[16px] font-semibold leading-6"
        >
          Sign In
        </Button>

        <hr className="border-0 border-t border-line/60" />

        <p className="text-center text-[16px] leading-6 text-muted">
          Not a member yet?{' '}
          <Link
            to="/signup"
            className="text-accent underline hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </>
  );
}
