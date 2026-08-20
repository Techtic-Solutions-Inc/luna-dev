import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getErrorMessage, useLogin } from '../../../hooks/useLogin';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import Alert from '../../ui/Alert';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.gap12};
  flex-wrap: wrap;
`;

const ForgotLink = styled(Link)`
  color: ${colors.accent};
  text-decoration: none;
  ${typographyStyle('caption4')}

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${colors.color49};
  margin: ${spacing.gap8} 0 0;
`;

const Footer = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.accent};
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const navigate = useNavigate();
  const { mutate, isLoading, error, fieldErrors, clearError } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (!password) {
      next.password = 'Password is required';
    }
    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    if (!validate()) {
      return;
    }
    const result = await mutate({ email: email.trim(), password }, rememberMe);
    if (result) {
      navigate('/', { replace: true });
    }
  };

  let formAlert: string | null = null;
  if (error) {
    if (error.statusCode === 401) {
      formAlert = getErrorMessage(error) || 'Invalid email or password';
    } else if (error.statusCode === 403) {
      formAlert = getErrorMessage(error) || 'Account inactive';
    } else if (error.statusCode === 0) {
      formAlert = getErrorMessage(error);
    } else if (error.statusCode === 400 && Object.keys(fieldErrors).length === 0) {
      formAlert = getErrorMessage(error);
    } else if (error.statusCode !== 400) {
      formAlert = getErrorMessage(error);
    }
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      {formAlert ? <Alert variant="error">{formAlert}</Alert> : null}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        hideLabel
        placeholder="Email"
        autoComplete="email"
        required
        value={email}
        disabled={isLoading}
        error={clientErrors.email || fieldErrors.email}
        onChange={(e) => {
          setEmail(e.target.value);
          setClientErrors((prev) => ({ ...prev, email: '' }));
        }}
      />
      <PasswordInput
        id="password"
        name="password"
        label="Password"
        hideLabel
        placeholder="Password"
        autoComplete="current-password"
        required
        value={password}
        disabled={isLoading}
        error={clientErrors.password || fieldErrors.password}
        onChange={(e) => {
          setPassword(e.target.value);
          setClientErrors((prev) => ({ ...prev, password: '' }));
        }}
      />
      <Row>
        <Checkbox
          id="remember-me"
          name="rememberMe"
          checked={rememberMe}
          disabled={isLoading}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Remember me"
        />
        <ForgotLink to="/forgot-password">Forgot your password?</ForgotLink>
      </Row>
      <Button type="submit" variant="accent" shape="pill" isLoading={isLoading}>
        Sign In
      </Button>
      <Divider />
      <Footer>
        Not a member yet? <Link to="/signup">Sign up here.</Link>
      </Footer>
    </Form>
  );
}
