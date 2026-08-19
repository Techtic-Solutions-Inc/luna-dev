import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAxiosError } from 'axios';
import AuthLayout from '../layout/AuthLayout';
import Spinner from '../ui/Spinner';
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

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${(p) => (p.$hasError ? '#ff2f2f' : 'rgba(255, 255, 255, 0.15)')};
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    border-color: ${(p) => (p.$hasError ? '#ff2f2f' : 'var(--accent)')};
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const EyeSvg = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const ErrorText = styled.span`
  display: block;
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ff2f2f;
  margin-top: 4px;
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

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CheckboxBox = styled.span<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 1.5px solid ${(p) => (p.$checked ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 4px;
  background: ${(p) => (p.$checked ? 'var(--accent)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;

  ${HiddenCheckbox}:focus-visible + & {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const CheckSvg = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const SubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 48px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  border: none;
  border-radius: 10px;
  cursor: ${(p) => (p.$loading ? 'not-allowed' : 'pointer')};
  opacity: ${(p) => (p.$loading ? 0.7 : 1)};
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
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

const ApiError = styled.div`
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #ff2f2f;
  background: rgba(255, 47, 47, 0.08);
  border-radius: 8px;
  text-align: center;
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
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;
        if (data?.errors) {
          const serverErrors = { ...empty };
          for (const [key, msgs] of Object.entries(data.errors)) {
            if (key in serverErrors) {
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
          <Input
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
          {errors.email && <ErrorText role="alert">{errors.email}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <PasswordWrapper>
            <Input
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
            <ToggleButton
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeSvg open={showPassword} />
            </ToggleButton>
          </PasswordWrapper>
          {errors.password && <ErrorText role="alert">{errors.password}</ErrorText>}
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
              {remember && <CheckSvg />}
            </CheckboxBox>
            <RememberText>Remember me</RememberText>
          </CheckboxLabel>
          <ForgotLink to="/forgot-password">Forgot your password?</ForgotLink>
        </OptionsRow>

        <SubmitButton type="submit" disabled={loading} $loading={loading}>
          {loading ? <Spinner size={20} inline /> : 'Sign In'}
        </SubmitButton>

        {apiError && <ApiError role="alert">{apiError}</ApiError>}

        <Divider />

        <FooterText>
          Not a member yet? <Link to="/signup">Sign up here.</Link>
        </FooterText>
      </Form>
    </AuthLayout>
  );
}
