import { type FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, Navigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../lib/api/client';

const collage = [
  {
    src: '/assets/figma/content-library.png',
    alt: 'Workspace desk with coffee and listing notes',
    caption: '',
    className: 'col-span-1 row-span-1',
  },
  {
    src: '/assets/figma/about-us.png',
    alt: 'Real estate professional in a sunlit courtyard',
    caption: 'Who You’re Working With Matters.',
    className: 'col-span-1 row-span-2',
  },
  {
    src: '/assets/figma/blog.png',
    alt: 'Coffee table with books and drinks',
    caption: 'There’s less buyer competition right now. You’re not fighting 10 other offers.',
    className: 'col-span-1 row-span-1',
  },
  {
    src: '/assets/figma/content-details.png',
    alt: 'Soft-lit bedroom interior',
    caption: 'Everyone’s waiting to buy until the market is right.',
    className: 'col-span-1 row-span-1',
  },
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!emailPattern.test(email.trim())) nextErrors.email = 'Enter a valid email';
    if (!password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await login({ email: email.trim(), password }, remember);
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[var(--color-16)] text-secondary lg:grid-cols-2">
      <section className="relative flex items-center justify-center px-6 py-16 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, var(--color-68) 0%, transparent 55%), radial-gradient(circle at 20% 80%, var(--color-67) 0%, transparent 40%)',
          }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-md">
          <p className="text-center font-kalam text-[42px] font-bold leading-none text-secondary">
            Agentwise
          </p>
          <p className="mt-3 text-center font-almarai text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-57)]">
            Real Estate Marketing
          </p>
          <h1 className="mt-10 text-center font-garamond text-[32px] font-medium leading-[42px] text-secondary md:text-[38px] md:leading-[50px]">
            Welcome To Agentwise
          </h1>
          <p className="mt-3 text-center font-almarai text-sm text-[var(--color-57)]">
            Everything you need to create standout real estate content.
          </p>

          <form className="mt-10 space-y-4" onSubmit={(event) => void handleSubmit(event)} noValidate>
            {formError ? (
              <p className="rounded-lg border border-[var(--border)] bg-[var(--error)] px-4 py-3 font-almarai text-sm text-secondary" role="alert">
                {formError}
              </p>
            ) : null}
            <div>
              <label htmlFor="signin-email" className="sr-only">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signin-email-error' : undefined}
                className="w-full rounded-full border border-[var(--color-41)] bg-[var(--color-36)] px-6 py-3.5 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] focus:border-accent focus:outline-none"
              />
              {errors.email ? (
                <p id="signin-email-error" className="mt-2 px-2 font-almarai text-xs text-[var(--border)]" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="relative">
              <label htmlFor="signin-password" className="sr-only">
                Password
              </label>
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signin-password-error' : undefined}
                className="w-full rounded-full border border-[var(--color-41)] bg-[var(--color-36)] px-6 py-3.5 pr-14 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-5 top-3.5 text-[var(--color-57)] hover:text-secondary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
              {errors.password ? (
                <p id="signin-password-error" className="mt-2 px-2 font-almarai text-xs text-[var(--border)]" role="alert">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <label className="flex items-center gap-2 font-almarai text-sm text-[var(--color-57)]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-almarai text-sm text-[var(--color-57)] hover:text-accent"
              >
                Forgot your password?
              </Link>
            </div>
            <Button type="submit" loading={loading} className="w-full" aria-label="Sign in">
              Sign In
            </Button>
          </form>

          <div className="mt-8 border-t border-[var(--color-41)] pt-6 text-center">
            <p className="font-almarai text-sm text-[var(--color-57)]">
              Not a member yet?{' '}
              <Link to="/signup" className="text-accent hover:opacity-80">
                Sign up here.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="hidden overflow-hidden lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-3 lg:p-6" aria-hidden="true">
        {collage.map((item) => (
          <figure key={item.src} className={`relative overflow-hidden rounded-2xl ${item.className}`}>
            <img src={item.src} alt="" className="h-full w-full object-cover" />
            {item.caption ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-16)] to-transparent p-5 font-garamond text-lg font-medium leading-snug text-secondary">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </section>
    </main>
  );
}
