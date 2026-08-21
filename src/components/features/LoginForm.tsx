import { useState, type FormEvent } from 'react';
import { useAuth } from '../../lib/auth/AuthProvider';
import { getErrorMessage } from '../../lib/api/errors';
import Spinner from '../Spinner';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-[var(--radius-16)] border border-[color:var(--color-color-20)] bg-[color:var(--color-color-22)] p-[var(--spacing-padding-32)] shadow-[var(--effect-drop-shadow-11)]">
      <h1 className="font-heading text-[length:var(--typography-heading-lg-19-font-size)] font-medium leading-[var(--typography-heading-lg-19-line-height)] text-secondary">
        Sign in
      </h1>
      <p className="mt-[var(--spacing-gap-8)] text-[length:var(--typography-body-sm-24-font-size)] leading-[var(--typography-body-sm-24-line-height)] text-[color:var(--color-text-secondary)]">
        Use your email and password to access the content calendar.
      </p>
      <form
        className="mt-[var(--spacing-gap-24)] flex flex-col gap-[var(--spacing-gap-16)]"
        onSubmit={onSubmit}
      >
        <label className="flex flex-col gap-[var(--spacing-gap-6)] text-[length:var(--typography-caption-4-font-size)] leading-[var(--typography-caption-4-line-height)] text-[color:var(--color-text-secondary)]">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[var(--radius-medium)] border border-[color:var(--color-color-63)] bg-[color:var(--color-color-16)] px-[var(--spacing-padding-12)] py-[var(--spacing-padding-10)] text-[length:var(--typography-body-font-size)] text-secondary"
          />
        </label>
        <label className="flex flex-col gap-[var(--spacing-gap-6)] text-[length:var(--typography-caption-4-font-size)] leading-[var(--typography-caption-4-line-height)] text-[color:var(--color-text-secondary)]">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-[var(--radius-medium)] border border-[color:var(--color-color-63)] bg-[color:var(--color-color-16)] px-[var(--spacing-padding-12)] py-[var(--spacing-padding-10)] text-[length:var(--typography-body-font-size)] text-secondary"
          />
        </label>
        {error ? (
          <p role="alert" className="text-[length:var(--typography-body-sm-24-font-size)] text-[color:var(--color-color-51)]">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-[var(--radius-medium)] bg-accent px-[var(--spacing-padding-16)] py-[var(--spacing-padding-12)] text-[color:var(--color-color-16)] disabled:opacity-70"
        >
          {isSubmitting ? 'Signing in' : 'Sign in'}
        </button>
      </form>
      {isSubmitting ? <Spinner label="Signing in..." /> : null}
    </section>
  );
};

export default LoginForm;
