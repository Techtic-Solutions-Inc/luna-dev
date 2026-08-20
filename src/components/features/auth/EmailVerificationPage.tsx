import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import AuthLayout from '../../layout/AuthLayout';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Input from '../../ui/Input';

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap6};
  text-align: center;
`;

const Logo = styled.p`
  margin: 0;
  font-family: 'Kalam', cursive;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  color: ${colors.secondary};
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
  ${typographyStyle('headingXl44')}
`;

const Description = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
  max-width: 380px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const Footer = styled.p`
  margin: ${spacing.gap8} 0 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.accent};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default function EmailVerificationPage() {
  return (
    <AuthLayout>
      <Brand>
        <Logo>Agentwise</Logo>
        <Tagline>Real Estate Marketing</Tagline>
      </Brand>
      <Heading>Verify Your Email Address</Heading>
      <Description>
        You&apos;re one step away from accessing your Agentwise workspace. Enter your email to
        receive a verification link.
      </Description>
      <Form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          id="verify-email"
          name="email"
          type="email"
          label="Email"
          hideLabel
          placeholder="Email"
          autoComplete="email"
        />
        <Checkbox id="verify-terms" name="termsAccepted" label="I agree to the Terms of Use" />
        <Button type="submit" variant="accent">
          Verify Email Address
        </Button>
        <Footer>
          Already verified? <Link to="/login">Sign in</Link>
        </Footer>
      </Form>
    </AuthLayout>
  );
}
