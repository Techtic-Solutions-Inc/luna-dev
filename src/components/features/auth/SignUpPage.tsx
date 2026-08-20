import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import AuthLayout from '../../layout/AuthLayout';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap6};
  text-align: center;
`;

const Logo = styled.p`
  margin: 0;
  color: ${colors.secondary};
  ${typographyStyle('headingLg108')}
`;

const Tagline = styled.p`
  margin: 0;
  ${typographyStyle('caption57')}
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${colors.color93};
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
  color: ${colors.secondary};
  ${typographyStyle('headingLg59')}
  max-width: 420px;
`;

const Subheading = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const NameRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.gap12};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Footer = styled.p`
  margin: ${spacing.gap8} 0 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.secondary};
    text-decoration: underline;
  }
`;

const PolicyLink = styled.a`
  color: ${colors.secondary};
  text-decoration: underline;
`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = 'First name is required';
    if (!lastName.trim()) next.lastName = 'Last name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    if (!termsAccepted) next.terms = 'You must accept the Terms of Use and Privacy Policy';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate();
  };

  return (
    <AuthLayout>
      <Brand>
        <Logo>Agentwise</Logo>
        <Tagline>Real Estate Marketing</Tagline>
      </Brand>
      <Heading>Great Marketing Made Easier. Specifically For Agents</Heading>
      <Subheading>Create your account today</Subheading>
      <Form onSubmit={onSubmit} noValidate>
        <NameRow>
          <Input
            id="first-name"
            name="firstName"
            label="First Name"
            hideLabel
            placeholder="First Name"
            autoComplete="given-name"
            value={firstName}
            error={errors.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            id="last-name"
            name="lastName"
            label="Last Name"
            hideLabel
            placeholder="Last Name"
            autoComplete="family-name"
            value={lastName}
            error={errors.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </NameRow>
        <Input
          id="signup-email"
          name="email"
          type="email"
          label="Email"
          hideLabel
          placeholder="Email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          id="signup-password"
          name="password"
          label="Create a Password"
          hideLabel
          placeholder="Create a Password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          id="terms"
          name="termsAccepted"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          label={
            <>
              I have read and agree to the{' '}
              <PolicyLink href="/terms" onClick={(e) => e.preventDefault()}>
                Terms of Use
              </PolicyLink>{' '}
              and{' '}
              <PolicyLink href="/privacy" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </PolicyLink>
              .
            </>
          }
        />
        {errors.terms ? (
          <p role="alert" style={{ margin: 0, color: colors.color45, fontSize: 12 }}>
            {errors.terms}
          </p>
        ) : null}
        <Button type="submit" variant="accent" shape="pill">
          Sign Up
        </Button>
        <Footer>
          Already have an account? <Link to="/login">Sign in</Link>
        </Footer>
      </Form>
    </AuthLayout>
  );
}
