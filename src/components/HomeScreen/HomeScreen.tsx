import { type FormEvent } from 'react';
import styled from 'styled-components';
import { useVisitorSubscribe } from '../../hooks/useVisitorSubscribe';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import InputField from '../InputField/InputField';
import Link from '../Link/Link';

const Page = styled.main`
  min-height: 100vh;
  background: var(--color-background);
`;

const Container = styled.div`
  width: min(100%, ${({ theme }) => theme.grid.containerMaxWidths['2xl']});
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.spacing[6]} ${theme.grid.containerPadding.sm}`};

  @media (min-width: 768px) {
    padding: ${({ theme }) =>
      `${theme.spacing[10]} ${theme.grid.containerPadding.lg}`};
  }
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[10]};
`;

const Brand = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: var(--color-brand-primary);
`;

const NavLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Hero = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};

  @media (min-width: 992px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: center;
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Eyebrow = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.wide};
  text-transform: uppercase;
  color: var(--color-brand-accent);
`;

const Greeting = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: var(--color-text-secondary);
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.serif};
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.tight};
  color: var(--color-text-primary);

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes['5xl']};
  }
`;

const HeroSubtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: var(--color-text-secondary);
  max-width: 36rem;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const HeroVisual = styled.div`
  min-height: 16rem;
  border-radius: ${({ theme }) => theme.borders.radii['2xl']};
  background:
    linear-gradient(
      135deg,
      rgba(26, 92, 69, 0.92) 0%,
      rgba(45, 138, 106, 0.88) 45%,
      rgba(196, 165, 116, 0.85) 100%
    ),
    var(--color-brand-primary);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing[8]};
  display: flex;
  align-items: flex-end;

  @media (min-width: 992px) {
    min-height: 24rem;
  }
`;

const HeroVisualText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  line-height: ${({ theme }) => theme.typography.lineHeights.snug};
  color: var(--color-text-inverse);
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  color: var(--color-text-primary);

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  }
`;

const SectionBody = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: var(--color-text-secondary);
  max-width: 48rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FeatureCard = styled.article`
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.borders.radii.xl};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FeatureTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: var(--color-text-primary);
`;

const FeatureText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: var(--color-text-secondary);
`;

const StepsList = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
`;

const StepItem = styled.li`
  counter-increment: step;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: start;
  padding: ${({ theme }) => theme.spacing[5]};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  background: var(--color-surface);

  &::before {
    content: counter(step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.borders.radii.full};
    background: var(--color-brand-primary);
    color: var(--color-text-inverse);
    font-family: ${({ theme }) => theme.typography.fontFamilies.display};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }
`;

const StepText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: var(--color-text-secondary);
`;

const SubscribeSection = styled.section`
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.borders.radii['2xl']};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const NameRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const FormError = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: var(--color-error);
`;

const SuccessMessage = styled.p`
  margin: ${({ theme }) => `${theme.spacing[4]} 0 0`};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  background: var(--color-success-bg);
  color: var(--color-success);
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`;

const privacyLabel = (
  <>
    I agree to the{' '}
    <a href="/privacy" target="_blank" rel="noreferrer">
      Privacy Policy
    </a>
    .
  </>
);

const termsLabel = (
  <>
    I agree to the{' '}
    <a href="/terms" target="_blank" rel="noreferrer">
      Terms of Service
    </a>
    .
  </>
);

const HomeScreen = () => {
  const {
    values,
    fieldErrors,
    formError,
    successMessage,
    isLoading,
    isPageLoading,
    setFieldValue,
    submit,
  } = useVisitorSubscribe();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <Page>
      <Container>
        <Header>
          <Brand>Agentwise Ultimate Mind</Brand>
          <NavLinks aria-label="Primary navigation">
            <Link href="#explore" variant="subtle">
              Learn More
            </Link>
            <Link href="#templates" variant="subtle">
              Browse all
            </Link>
            <Link to="/signup" variant="button">
              Get Started
            </Link>
          </NavLinks>
        </Header>

        <Hero>
          <HeroCopy>
            <Eyebrow>Agentwise Ultimate Mind</Eyebrow>
            <Greeting>Good morning</Greeting>
            <HeroTitle>Ava.</HeroTitle>
            <HeroSubtitle>
              Browse the continuously updated library of marketing templates
              built for real estate professionals who want to stand out online.
            </HeroSubtitle>
            <HeroActions>
              <Link to="/signup" variant="button">
                Get Started
              </Link>
              <Link href="#explore" variant="subtle">
                Learn More
              </Link>
            </HeroActions>
          </HeroCopy>
          <HeroVisual aria-hidden="true">
            <HeroVisualText>
              Marketing that stops the scroll and helps agents grow their
              audience.
            </HeroVisualText>
          </HeroVisual>
        </Hero>

        <Section id="explore" aria-labelledby="built-for-agents">
          <SectionTitle id="built-for-agents">Built for Agents like you.</SectionTitle>
          <SectionBody>
            Here&apos;s the deal… Great Marketing is Just the Start. Agentwise
            gives you the creative tools, templates, and guidance to publish
            faster without sacrificing quality.
          </SectionBody>
          <Link href="#templates">Browse all</Link>
        </Section>

        <Section aria-labelledby="hundreds-heading">
          <SectionTitle id="hundreds-heading">Hundreds</SectionTitle>
          <SectionBody>
            Explore hundreds of hand-designed templates for social, email, and
            more. Save the ones that fit your style.
          </SectionBody>
        </Section>

        <Section id="templates" aria-labelledby="explore-heading">
          <SectionTitle id="explore-heading">Explore Ultimate Mind</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>Help real estate professionals create content faster</FeatureTitle>
              <FeatureText>
                Ready-made templates help you create content faster with
                professional designs tailored to your market.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Increase audience engagement</FeatureTitle>
              <FeatureText>
                Increase audience engagement through visually appealing social
                media posts that capture attention in the feed.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Marketing that stops the scroll</FeatureTitle>
              <FeatureText>
                Stand out with polished creative assets designed specifically
                for agents who want their brand to feel premium.
              </FeatureText>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section aria-labelledby="work-together-heading">
          <SectionTitle id="work-together-heading">
            Let&apos;s Work Together
          </SectionTitle>
          <SectionBody>
            Join a community of agents using Agentwise to simplify their
            marketing workflow and grow their business.
          </SectionBody>
        </Section>

        <Section aria-labelledby="how-to-heading">
          <SectionTitle id="how-to-heading">How to use this content</SectionTitle>
          <StepsList>
            <StepItem>
              <StepText>
                Browse the template library and save designs that match your
                brand.
              </StepText>
            </StepItem>
            <StepItem>
              <StepText>
                Customize copy, colors, and imagery to fit your listing or
                campaign.
              </StepText>
            </StepItem>
            <StepItem>
              <StepText>
                Download the final design and publish it to your preferred
                social platform.
              </StepText>
            </StepItem>
          </StepsList>
          <HeroActions>
            <Link href="#subscribe" variant="button">
              Download
            </Link>
          </HeroActions>
        </Section>

        <SubscribeSection id="subscribe" aria-labelledby="subscribe-heading">
          <SectionTitle id="subscribe-heading">
            Stay in the loop
          </SectionTitle>
          <SectionBody>
            Get updates on new templates, marketing tips, and product news
            delivered to your inbox.
          </SectionBody>

          <Form onSubmit={handleSubmit} noValidate>
            <NameRow>
              <InputField
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                onChange={(event) =>
                  setFieldValue('firstName', event.target.value)
                }
                error={fieldErrors.firstName}
                isLoading={isPageLoading}
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={(event) =>
                  setFieldValue('lastName', event.target.value)
                }
                error={fieldErrors.lastName}
                isLoading={isPageLoading}
                required
              />
            </NameRow>

            <InputField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
              error={fieldErrors.email}
              isLoading={isPageLoading}
              required
            />

            <InputField
              label="Phone number"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              value={values.phoneNumber}
              onChange={(event) =>
                setFieldValue('phoneNumber', event.target.value)
              }
              error={fieldErrors.phoneNumber}
              isLoading={isPageLoading}
              required
            />

            <CheckboxRow>
              <Checkbox
                name="privacyPolicyAccepted"
                checked={values.privacyPolicyAccepted}
                onChange={(event) =>
                  setFieldValue('privacyPolicyAccepted', event.target.checked)
                }
                label={privacyLabel}
                error={fieldErrors.privacyPolicyAccepted}
              />
              <Checkbox
                name="termsAccepted"
                checked={values.termsAccepted}
                onChange={(event) =>
                  setFieldValue('termsAccepted', event.target.checked)
                }
                label={termsLabel}
                error={fieldErrors.termsAccepted}
              />
            </CheckboxRow>

            {formError ? <FormError role="alert">{formError}</FormError> : null}

            <Button type="submit" fullWidth isLoading={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>

            {successMessage ? (
              <SuccessMessage role="status">{successMessage}</SuccessMessage>
            ) : null}
          </Form>
        </SubscribeSection>
      </Container>
    </Page>
  );
};

export default HomeScreen;
