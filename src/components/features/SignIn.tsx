import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAxiosError } from 'axios';
import AuthLayout from '../layout/AuthLayout';
import Spinner from '../ui/Spinner';
import {
  AuthInput,
  AuthErrorText,
  AuthSubmitButton,
  PasswordWrapper,
  PasswordToggle,
  EyeIcon,
  HiddenCheckbox,
  CheckboxBox,
  CheckIcon,
  AuthApiError,
} from '../ui/FormPrimitives';
import apiClient from '../../lib/api/client';
import type { LoginRequest, LoginResponseData } from '../../types/auth';
import type { ApiErrorResponse, ApiSuccessResponse } from '../../types/api';

const Form = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-style: italic;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 4px;
`;

const LogoSub = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 24px;
`;

const Heading = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 39.15px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const OptionsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const RememberText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

const ForgotLink = styled(Link)`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const SubmitButton = styled(AuthSubmitButton)`
  margin-top: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 24px 0 20px;
`;

const FooterText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);

  a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #ffffff;
    }
  }
`;

interface FieldErrors {
  email: string;
  password: string;
}

const empty: FieldErrors = { email: '', password: '' };

function validateFields(email: string, password: string): FieldErrors {
  const e: FieldErrors = { ...empty };
  if (!email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
  if (!password) e.password = 'Password is required.';
  return e;
}

function hasErrors(e: FieldErrors): boolean {
  return Object.values(e).some(Boolean);
}

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>(empty);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function onFieldBlur(field: keyof FieldErrors) {
    const v = validateFields(email, password);
    setErrors((prev) => ({ ...prev, [field]: v[field] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError('');
    const v = validateFields(email, password);
    setErrors(v);
    if (hasErrors(v)) return;

    const body: LoginRequest = {
      email: email.trim(),
      password,
    };

    setLoading(true);
    try {
      const res = await apiClient.post<ApiSuccessResponse<LoginResponseData>>('/auth/login', body);
      const data = res.data.data;
      if (remember) {
        localStorage.setItem('token', data.token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', data.token);
        localStorage.removeItem('token');
      }
      navigate('/');
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;
        if (data?.errors) {
          const serverErrors = { ...empty };
          for (const [key, msgs] of Object.entries(data.errors)) {
            if (key in serverErrors && msgs.length > 0) {
              (serverErrors as Record<string, string>)[key] = msgs[0];
            }
          }
          setErrors(serverErrors);
        }
        if (data?.message) {
          setApiError(data.message);
        }
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit} noValidate>
        <Logo>Agentwise</Logo>
        <LogoSub>real estate marketing</LogoSub>

        <Heading>Welcome To Agentwise</Heading>
        <Description>Everything you need to create standout real estate content.</Description>

        <InputWrapper>
          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) onFieldBlur('email'); }}
            onBlur={() => onFieldBlur('email')}
            $hasError={!!errors.email}
            aria-label="Email"
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && <AuthErrorText role="alert">{errors.email}</AuthErrorText>}
        </InputWrapper>

        <InputWrapper>
          <PasswordWrapper>
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) onFieldBlur('password'); }}
              onBlur={() => onFieldBlur('password')}
              $hasError={!!errors.password}
              aria-label="Password"
              aria-invalid={!!errors.password}
              autoComplete="current-password"
              style={{ paddingRight: '48px' }}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showPassword} />
            </PasswordToggle>
          </PasswordWrapper>
          {errors.password && <AuthErrorText role="alert">{errors.password}</AuthErrorText>}
        </InputWrapper>

        <OptionsRow>
          <CheckboxLabel>
            <HiddenCheckbox
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              aria-label="Remember me"
            />
            <CheckboxBox $checked={remember}>
              {remember && <CheckIcon />}
            </CheckboxBox>
            <RememberText>Remember me</RememberText>
          </CheckboxLabel>
          <ForgotLink to="/forgot-password">Forgot your password?</ForgotLink>
        </OptionsRow>

        <SubmitButton type="submit" disabled={loading} $loading={loading}>
          {loading ? <Spinner size={20} inline /> : 'Sign In'}
        </SubmitButton>

        {apiError && <AuthApiError role="alert">{apiError}</AuthApiError>}

        <Divider />

        <FooterText>
          Not a member yet? <Link to="/signup">Sign up here.</Link>
        </FooterText>
      </Form>
    </AuthLayout>
  );
}
