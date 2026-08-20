import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, {
  AuthBrand,
  AuthFooter,
  AuthForm,
  AuthHeading,
  AuthSubheading,
  InlineRow,
} from '../../layout/AuthLayout';
import { TextLink } from '../../ui/LinkText';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import FormError from '../../ui/FormError';
import { login } from '../../../lib/api/auth';
import { getLoginErrorMessage } from '../../../lib/api/errors';
import { setRememberMePreference, setToken, getRememberMePreference } from '../../../lib/auth/tokenStorage';
import { EMAIL_PATTERN, useFormState } from '../../../hooks/useFormState';
import { useState } from 'react';

export default function SignInPage() {
  const navigate = useNavigate();
  const { setStatus, message, setMessage, fieldError, setFieldError, resetErrors, isLoading, isError } =
    useFormState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(getRememberMePreference());

  const handleRememberChange = (checked: boolean) => {
    setRememberMe(checked);
    setRememberMePreference(checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter a valid email address.');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter a valid email address.');
      return;
    }

    if (!password) {
      setStatus('error');
      setFieldError('password');
      setMessage('Enter your password.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setFieldError(null);

    try {
      const response = await login({ email: trimmedEmail, password });
      const token = response.data.token || response.data.accessToken;
      setToken(token, rememberMe);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setStatus('error');
      setFieldError(null);
      setMessage(getLoginErrorMessage(error));
    }
  };

  return (
    <AuthLayout>
      <AuthBrand />
      <div>
        <AuthHeading>Welcome To Agentwise</AuthHeading>
        <AuthSubheading>Everything you need to create standout real estate content.</AuthSubheading>
      </div>
      <AuthForm onSubmit={handleSubmit} noValidate aria-describedby={isError ? 'sign-in-error' : undefined}>
        {isError && message ? <FormError message={message} /> : null}
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          hideLabel
          error={fieldError === 'email' ? message : undefined}
          onChange={(event) => {
            resetErrors();
            setEmail(event.target.value);
          }}
          disabled={isLoading}
        />
        <PasswordInput
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          hideLabel
          value={password}
          error={fieldError === 'password' ? message : undefined}
          onChange={(event) => {
            resetErrors();
            setPassword(event.target.value);
          }}
          disabled={isLoading}
        />
        <InlineRow>
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={handleRememberChange}
            disabled={isLoading}
          />
          <TextLink to="/forgot-password">Forgot your password?</TextLink>
        </InlineRow>
        <Button type="submit" fullWidth loading={isLoading} loadingLabel="Signing in">
          Sign In
        </Button>
      </AuthForm>
      <AuthFooter>
        Not a member yet? <Link to="/signup">Sign up here.</Link>
      </AuthFooter>
    </AuthLayout>
  );
}
