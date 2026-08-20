import styled from 'styled-components';
import { typographyStyle } from '../../../theme/typography';
import { breakpoints } from '../../../theme/breakpoints';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Checkbox from '../../ui/Checkbox';
import FormError from '../../ui/FormError';
import { EMAIL_PATTERN, useFormState } from '../../../hooks/useFormState';
import { useState } from 'react';

const Page = styled.div`
  background: var(--color-29);
  color: var(--color-69);
`;

const Hero = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--padding-60) var(--padding-24);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-48);
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-24);
`;

const HeroGreeting = styled.p`
  ${typographyStyle('body-sm-23')}
  margin: 0;
  color: var(--color-50);
`;

const HeroName = styled.p`
  ${typographyStyle('heading-lg-77')}
  margin: 0;
  color: var(--secondary);
`;

const HeroTitle = styled.h1`
  ${typographyStyle('heading-xl-101')}
  margin: 0;
  color: var(--color-69);
`;

const HeroSubtitle = styled.p`
  ${typographyStyle('heading-xl-56')}
  margin: 0;
  color: var(--color-50);
`;

const HeroBody = styled.p`
  ${typographyStyle('body-55')}
  margin: 0;
  color: var(--color-57);
`;

const HeroImage = styled.img`
  width: 100%;
  border-radius: var(--radius-16);
  box-shadow: var(--drop-shadow-39);
`;

const Features = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--padding-40) var(--padding-24);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-24);

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.article`
  background: var(--secondary);
  border-radius: var(--radius-16);
  padding: var(--padding-24);
  box-shadow: var(--drop-shadow-15);
`;

const FeatureTitle = styled.h2`
  ${typographyStyle('heading-lg-47')}
  margin: 0 0 var(--padding-12);
`;

const FeatureText = styled.p`
  ${typographyStyle('body-sm-37')}
  margin: 0;
  color: var(--color-57);
`;

const LeadSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: var(--padding-60) var(--padding-24);
`;

const LeadTitle = styled.h2`
  ${typographyStyle('heading-lg-57')}
  text-align: center;
  margin: 0 0 var(--padding-24);
`;

const LeadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--padding-16);
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--padding-12);

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: var(--padding-12);
  flex-wrap: wrap;
`;

const SuccessMessage = styled.p`
  ${typographyStyle('body-3')}
  color: var(--color-67);
  text-align: center;
  margin: 0;
`;

export default function VisitorHomePage() {
  const { setStatus, message, setMessage, fieldError, setFieldError, resetErrors, isLoading, isError, isSuccess } =
    useFormState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setStatus('error');
      setFieldError('form');
      setMessage('Complete all fields to get started.');
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter a valid email address.');
      return;
    }

    if (!privacyAccepted || !termsAccepted) {
      setStatus('error');
      setFieldError(!privacyAccepted ? 'privacy' : 'terms');
      setMessage('Accept the Privacy Policy and Terms of Service.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setFieldError(null);

    await new Promise((resolve) => setTimeout(resolve, 300));
    setStatus('error');
    setFieldError(null);
    setMessage('Subscribe is unavailable until visitor home APIs are published in the API contract.');
  };

  return (
    <Page>
      <Hero>
        <HeroCopy>
          <HeroTitle>Agentwise Ultimate Mind</HeroTitle>
          <HeroGreeting>Good morning</HeroGreeting>
          <HeroName>Ava.</HeroName>
          <HeroSubtitle>Stunning Real Estate Marketing</HeroSubtitle>
          <HeroBody>
            Personalized to your market in minutes. Help real estate professionals create content faster with
            ready-made templates.
          </HeroBody>
          <Actions>
            <Button type="button" disabled title="Unavailable until visitor APIs are published">
              Download
            </Button>
            <Button type="button" variant="secondary" disabled title="Unavailable until visitor APIs are published">
              Customize
            </Button>
          </Actions>
        </HeroCopy>
        <HeroImage src="/images/home-dashboard-preview.png" alt="Agentwise dashboard preview" />
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureTitle>Browse the continuously updated Content Calander</FeatureTitle>
          <FeatureText>Increase audience engagement through visually appealing social media posts.</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Built for Agents like you</FeatureTitle>
          <FeatureText>Download your finished content and share it anywhere your market is watching.</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Let&apos;s Work Together</FeatureTitle>
          <FeatureText>Click Customize to edit the location, market data, images, or branding.</FeatureText>
        </FeatureCard>
      </Features>

      <LeadSection>
        <LeadTitle>Get Started</LeadTitle>
        {isSuccess ? (
          <SuccessMessage>Thank you. We&apos;ll be in touch soon.</SuccessMessage>
        ) : (
          <LeadForm onSubmit={handleSubmit} noValidate>
            {isError && fieldError === null && message ? <FormError message={message} /> : null}
            <TwoCol>
              <Input
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(event) => {
                  resetErrors();
                  setFirstName(event.target.value);
                }}
                disabled={isLoading}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  resetErrors();
                  setLastName(event.target.value);
                }}
                disabled={isLoading}
              />
            </TwoCol>
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              error={fieldError === 'email' ? message : undefined}
              onChange={(event) => {
                resetErrors();
                setEmail(event.target.value);
              }}
              disabled={isLoading}
            />
            <Input
              label="Phone number"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => {
                resetErrors();
                setPhone(event.target.value);
              }}
              disabled={isLoading}
            />
            <Checkbox
              id="visitor-privacy"
              checked={privacyAccepted}
              onChange={(checked) => {
                resetErrors();
                setPrivacyAccepted(checked);
              }}
              disabled={isLoading}
              label={
                <>
                  I agree to the{' '}
                  <a href="#" aria-disabled="true">
                    Privacy Policy
                  </a>
                </>
              }
            />
            <Checkbox
              id="visitor-terms"
              checked={termsAccepted}
              onChange={(checked) => {
                resetErrors();
                setTermsAccepted(checked);
              }}
              disabled={isLoading}
              label={
                <>
                  I agree to the{' '}
                  <a href="#" aria-disabled="true">
                    Terms of Service
                  </a>
                </>
              }
            />
            {fieldError === 'privacy' || fieldError === 'terms' || fieldError === 'form' ? (
              message ? <FormError message={message} /> : null
            ) : null}
            <Button type="submit" fullWidth loading={isLoading}>
              Get Started
            </Button>
          </LeadForm>
        )}
      </LeadSection>
    </Page>
  );
}
