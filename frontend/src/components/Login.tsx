import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authLogin, login } from '../lib/api/client';
import { getApiErrorMessage } from '../lib/api/errors';
import { setAuthToken } from '../hooks/useAuth';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';

const Page = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--padding-40) var(--padding-16);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  width: min(100%, 24rem);
`;

const Title = styled.h1`
  font-family: var(--font-heading-md-70-family);
  font-size: var(--font-heading-md-70-size);
  font-weight: var(--font-heading-md-70-weight);
  line-height: var(--font-heading-md-70-line-height);
  margin-bottom: var(--gap-8);
`;

const ErrorText = styled.p`
  color: var(--color-53);
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      try {
        const authResponse = await authLogin({ email, password });
        setAuthToken(authResponse.data.access_token);
      } catch {
        const legacyResponse = await login({ email, password });
        setAuthToken(legacyResponse.token);
      }
      navigate('/', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to sign in'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Card>
        <Form onSubmit={handleSubmit} noValidate>
          <Title>Sign in</Title>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      </Card>
    </Page>
  );
};

export default Login;
