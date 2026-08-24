import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 400);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-color-24 px-padding-16 py-padding-32">
      <div className="w-full max-w-md rounded-radius-20 bg-color-44 p-padding-32 shadow-drop-shadow-39">
        <Link to="/" className="font-garamond text-heading-lg-26 text-secondary hover:text-accent">
          Agentwise
        </Link>
        <h1 className="mt-24 font-garamond text-heading-xl-37 text-secondary">Forgot your password?</h1>
        <p className="mt-8 font-almarai text-body-77 text-text-secondary">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        {success ? (
          <p role="status" className="mt-24 font-almarai text-body-34 text-accent">
            If an account exists for that email, a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-32 flex flex-col gap-16" noValidate>
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {error ? (
              <p role="alert" className="font-almarai text-body-sm-106 text-color-51">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" fullWidth disabled={submitting} aria-label="Send reset link">
              {submitting ? 'Sending...' : 'Send me a link'}
            </Button>
          </form>
        )}
        <p className="mt-24 font-almarai text-body-sm-106 text-color-14">
          <Link to="/signin" className="text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
