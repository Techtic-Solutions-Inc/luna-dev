import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Checkbox, TextInput } from '../components/ui/TextInput';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError('All fields are required.');
      return;
    }
    if (!terms) {
      setError('You must accept the Terms of Service.');
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
        <h1 className="mt-24 font-garamond text-heading-xl-37 text-secondary">Sign Up</h1>
        {success ? (
          <p role="status" className="mt-24 font-almarai text-body-34 text-text-secondary">
            Account created. You can now{' '}
            <Link to="/signin" className="text-accent hover:underline">
              sign in
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-32 flex flex-col gap-16" noValidate>
            <TextInput
              label="First name"
              name="first_name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <TextInput
              label="Last name"
              name="last_name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Checkbox
              name="terms"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
              label="I agree to the Terms of Service"
            />
            {error ? (
              <p role="alert" className="font-almarai text-body-sm-106 text-color-51">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" fullWidth disabled={submitting} aria-label="Create account">
              {submitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        )}
        <p className="mt-24 font-almarai text-body-sm-106 text-color-14">
          Already have an account?{' '}
          <Link to="/signin" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
