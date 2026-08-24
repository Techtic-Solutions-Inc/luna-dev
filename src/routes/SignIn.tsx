import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Checkbox, TextInput } from '../components/ui/TextInput';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Email and password are required.');
      return;
    }
    setSubmitting(true);
    try {
      await login({ email: email.trim(), password }, rememberMe);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data as { message?: string } | undefined)?.message;
        setError(message ?? 'Unable to sign in. Please check your credentials.');
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-color-24 px-padding-16 py-padding-32">
      <div className="w-full max-w-md rounded-radius-20 bg-color-44 p-padding-32 shadow-drop-shadow-39">
        <Link to="/" className="font-garamond text-heading-lg-26 text-secondary hover:text-accent">
          Agentwise
        </Link>
        <h1 className="mt-24 font-garamond text-heading-xl-37 text-secondary">Welcome</h1>
        <p className="mt-8 font-almarai text-body-77 text-text-secondary">
          Sign in to personalize marketing for your market.
        </p>
        <form onSubmit={(event) => void onSubmit(event)} className="mt-32 flex flex-col gap-16" noValidate>
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
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <Checkbox
              name="rememberMe"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              label="Remember me"
            />
            <Link
              to="/forgot-password"
              className="font-almarai text-body-sm-106 text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Forgot your password?
            </Link>
          </div>
          {error ? (
            <p role="alert" className="font-almarai text-body-sm-106 text-color-51">
              {error}
            </p>
          ) : null}
          <Button type="submit" size="lg" fullWidth disabled={submitting} aria-label="Sign in">
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-24 font-almarai text-body-sm-106 text-color-14">
          Not a member yet?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Sign up here.
          </Link>
        </p>
      </div>
    </main>
  );
}
