import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isAxiosError } from 'axios';
import AuthLayout from '../layout/AuthLayout';
import Spinner from '../ui/Spinner';
import apiClient from '../../lib/api/client';
import type { SignupRequest, SignupResponseData } from '../../types/auth';
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
  margin-bottom: 4px;
`;

const SubHeading = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 24px;
`;

const NameRow = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const InputWrapper = styled.div<{ $full?: boolean }>`
  width: 100%;
  margin-bottom: 12px;
  ${(p) => (p.$full ? '' : 'flex: 1; min-width: 0;')}
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
  min-height: 0;
`;

const CheckboxRow = styled.label`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CheckboxBox = styled.span<{ $checked: boolean; $hasError?: boolean }>`
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 1.5px solid ${(p) => (p.$hasError ? '#ff2f2f' : p.$checked ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 4px;
  background: ${(p) => (p.$checked ? 'var(--accent)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
  margin-top: 1px;

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

const CheckboxLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.6);

  a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #ffffff;
    }
  }
`;

const SubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 48px;
  margin-top: 16px;
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

const SuccessCard = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SuccessHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 12px;
`;

const SuccessText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
`;

interface FieldErrors {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms: string;
}

const empty: FieldErrors = { first_name: '', last_name: '', email: '', password: '', terms: '' };

function validate(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  terms: boolean,
): FieldErrors {
  const e: FieldErrors = { ...empty };
  if (!first_name.trim()) e.first_name = 'First name is required.';
  if (!last_name.trim()) e.last_name = 'Last name is required.';
  if (!email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
  if (!password) e.password = 'Password is required.';
  else if (password.length < 8) e.password = 'At least 8 characters.';
  else if (!/[A-Z]/.test(password)) e.password = 'Must include an uppercase letter.';
  else if (!/[0-9]/.test(password)) e.password = 'Must include a number.';
  else if (!/[^A-Za-z0-9]/.test(password)) e.password = 'Must include a special character.';
  if (!terms) e.terms = 'You must agree to the terms.';
  return e;
}

function hasErrors(e: FieldErrors): boolean {
  return Object.values(e).some(Boolean);
}

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>(empty);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function onFieldBlur(field: keyof FieldErrors) {
    const v = validate(firstName, lastName, email, password, terms);
    setErrors((prev) => ({ ...prev, [field]: v[field] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError('');
    const v = validate(firstName, lastName, email, password, terms);
    setErrors(v);
    if (hasErrors(v)) return;

    const body: SignupRequest = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: true,
    };

    setLoading(true);
    try {
      await apiClient.post<ApiSuccessResponse<SignupResponseData>>('/auth/signup', body);
      setSuccess(true);
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

  if (success) {
    return (
      <AuthLayout>
        <SuccessCard>
          <Logo>Agentwise</Logo>
          <LogoSub>real estate marketing</LogoSub>
          <SuccessHeading>Account created</SuccessHeading>
          <SuccessText>
            We&apos;ve sent a verification email to <strong style={{ color: '#fff' }}>{email}</strong>.
            Please check your inbox to verify your account.
          </SuccessText>
          <FooterText>
            <Link to="/signin">Go to Sign In</Link>
          </FooterText>
        </SuccessCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit} noValidate>
        <Logo>Agentwise</Logo>
        <LogoSub>real estate marketing</LogoSub>

        <Heading>Great Marketing Made Easier.<br />Specifically For Agents</Heading>
        <SubHeading>Create your account today</SubHeading>

        <NameRow>
          <InputWrapper>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); if (errors.first_name) onFieldBlur('first_name'); }}
              onBlur={() => onFieldBlur('first_name')}
              $hasError={!!errors.first_name}
              aria-label="First Name"
              aria-invalid={!!errors.first_name}
              autoComplete="given-name"
            />
            {errors.first_name && <ErrorText role="alert">{errors.first_name}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); if (errors.last_name) onFieldBlur('last_name'); }}
              onBlur={() => onFieldBlur('last_name')}
              $hasError={!!errors.last_name}
              aria-label="Last Name"
              aria-invalid={!!errors.last_name}
              autoComplete="family-name"
            />
            {errors.last_name && <ErrorText role="alert">{errors.last_name}</ErrorText>}
          </InputWrapper>
        </NameRow>

        <InputWrapper $full>
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

        <InputWrapper $full>
          <PasswordWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) onFieldBlur('password'); }}
              onBlur={() => onFieldBlur('password')}
              $hasError={!!errors.password}
              aria-label="Create a Password"
              aria-invalid={!!errors.password}
              autoComplete="new-password"
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

        <CheckboxRow>
          <HiddenCheckbox
            type="checkbox"
            checked={terms}
            onChange={(e) => { setTerms(e.target.checked); if (errors.terms) setErrors((p) => ({ ...p, terms: '' })); }}
            aria-label="I have read and agree to the Terms of Use and Privacy Policy"
          />
          <CheckboxBox $checked={terms} $hasError={!!errors.terms}>
            {terms && <CheckSvg />}
          </CheckboxBox>
          <CheckboxLabel>
            I have read and agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </CheckboxLabel>
        </CheckboxRow>
        {errors.terms && <ErrorText role="alert" style={{ width: '100%', marginBottom: '4px' }}>{errors.terms}</ErrorText>}

        <SubmitButton type="submit" disabled={loading} $loading={loading}>
          {loading ? <Spinner size={20} inline /> : 'Sign Up'}
        </SubmitButton>

        {apiError && <ApiError role="alert">{apiError}</ApiError>}

        <Divider />

        <FooterText>
          Already have an account? <Link to="/signin">Sign in</Link>
        </FooterText>
      </Form>
    </AuthLayout>
  );
}
