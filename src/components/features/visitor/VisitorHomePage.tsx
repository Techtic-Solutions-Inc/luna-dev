import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { colors, radius, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Input from '../../ui/Input';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.color16};
  color: ${colors.secondary};
`;

const TopNav = styled.header`
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.gap16};
  padding: ${spacing.padding24} ${spacing.padding40};

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.padding16};
  }
`;

const Logo = styled(Link)`
  font-family: 'Kalam', cursive;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: ${colors.secondary};
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing.gap32};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.secondary};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.gap16};
`;

const TextLink = styled(Link)`
  color: ${colors.secondary};
  text-decoration: none;
  ${typographyStyle('caption4')}

  &:hover {
    color: ${colors.accent};
  }
`;

const LoginPill = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.padding8} ${spacing.padding20};
  border-radius: ${radius.radius10000};
  background: ${colors.accent};
  color: ${colors.color16};
  text-decoration: none;
  ${typographyStyle('caption37')}
`;

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 120px ${spacing.padding40} ${spacing.padding60};
  background:
    radial-gradient(ellipse 40% 35% at 85% 12%, ${colors.color68}66 0%, transparent 70%),
    linear-gradient(180deg, ${colors.color16} 0%, ${colors.color20} 100%);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: ${spacing.gap40};
  align-items: center;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
    padding-top: 110px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 100px ${spacing.padding16} ${spacing.padding40};
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap20};
  max-width: 620px;
  animation: ${fadeUp} 0.7s ease both;
`;

const HeroTitle = styled.h1`
  margin: 0;
  ${typographyStyle('headingXl63')}
  color: ${colors.secondary};

  em {
    font-style: italic;
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${typographyStyle('headingXl44')}
  }
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 480px;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
`;

const SocialRow = styled.div`
  display: flex;
  gap: ${spacing.gap12};
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${colors.color49};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.color93};
  text-decoration: none;

  &:hover {
    color: ${colors.accent};
    border-color: ${colors.accent};
  }
`;

const HeroVisual = styled.div`
  position: relative;
  animation: ${fadeUp} 0.9s ease 0.1s both;

  img {
    width: 100%;
    display: block;
    border-radius: ${radius.radius16};
  }

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 640px;
    margin: 0 auto;
  }
`;

const Waitlist = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap16};
  text-align: center;
  margin-top: ${spacing.gap24};
  animation: ${fadeUp} 0.8s ease 0.2s both;
`;

const WaitlistCopy = styled.p`
  margin: 0;
  color: ${colors.color93};
  ${typographyStyle('caption4')}
`;

const AccentCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${spacing.padding14} ${spacing.padding24};
  border-radius: ${radius.radius10000};
  background: ${colors.accent};
  color: ${colors.secondary};
  text-decoration: none;
  ${typographyStyle('bodySm35')}

  &:hover {
    opacity: 0.92;
  }
`;

const CtaWrap = styled.div`
  width: min(220px, 100%);
`;

const Section = styled.section<{ $tone?: 'light' | 'dark' }>`
  padding: ${spacing.padding60} ${spacing.padding40};
  background: ${({ $tone }) => ($tone === 'light' ? colors.secondary : colors.color16)};
  color: ${({ $tone }) => ($tone === 'light' ? colors.color16 : colors.secondary)};

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.padding40} ${spacing.padding16};
  }
`;

const SectionHeader = styled.div`
  max-width: 720px;
  margin: 0 auto ${spacing.gap40};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap12};
`;

const SectionTitle = styled.h2`
  margin: 0;
  ${typographyStyle('headingXl44')}

  em {
    font-style: italic;
    color: ${colors.accent};
  }
`;

const SectionBody = styled.p`
  margin: 0;
  color: ${colors.color60};
  ${typographyStyle('bodySm38')}
`;

const GalleryTrack = styled.div`
  display: flex;
  gap: ${spacing.gap16};
  overflow-x: auto;
  padding-bottom: ${spacing.padding8};
  scroll-snap-type: x mandatory;

  img {
    flex: 0 0 auto;
    width: min(240px, 70vw);
    height: 320px;
    object-fit: cover;
    border-radius: ${radius.radius16};
    scroll-snap-align: start;
  }
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap60};
  max-width: 1100px;
  margin: 0 auto;
`;

const StepRow = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: ${spacing.gap40};
  align-items: center;

  &:nth-child(even) {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
    direction: ltr !important;
  }
`;

const StepCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const StepIndex = styled.p`
  margin: 0;
  color: ${colors.accent};
  ${typographyStyle('caption37')}
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const StepTitle = styled.h3`
  margin: 0;
  ${typographyStyle('headingLg59')}
`;

const StepBody = styled.p`
  margin: 0;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
`;

const StepImage = styled.img`
  width: 100%;
  border-radius: ${radius.radius16};
  display: block;
`;

const FeatureSplit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid ${colors.color49};
  border-radius: ${radius.radius20};
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureLeft = styled.div`
  background: ${colors.color67};
  padding: ${spacing.padding40};
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};

  img {
    width: 100%;
    border-radius: ${radius.radius12};
    margin-top: ${spacing.gap16};
  }
`;

const FeatureRight = styled.div`
  background: ${colors.color16};
  padding: ${spacing.padding40};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.gap24};
`;

const Testimonials = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: ${spacing.gap40};
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const QuoteGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.gap16};

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const QuoteCard = styled.blockquote`
  margin: 0;
  padding: ${spacing.padding20};
  background: ${colors.color48};
  border-radius: ${radius.radius12};
  color: ${colors.color16};
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap12};
`;

const Stars = styled.p`
  margin: 0;
  color: ${colors.accent};
  letter-spacing: 2px;
`;

const QuoteText = styled.p`
  margin: 0;
  ${typographyStyle('bodySm94')}
`;

const QuoteMeta = styled.footer`
  ${typographyStyle('caption4')}
  color: ${colors.color60};
`;

const ContactBand = styled.section`
  padding: ${spacing.padding60} ${spacing.padding40};
  background: ${colors.color16};

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.padding40} ${spacing.padding16};
  }
`;

const ContactPanel = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  border-radius: ${radius.radius20};
  overflow: hidden;
  border: 1px solid ${colors.color49};

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const ContactVisual = styled.div`
  position: relative;
  min-height: 480px;
  background:
    linear-gradient(180deg, transparent 30%, ${colors.color58} 100%),
    url('/images/home/contact-photo.png') center / cover no-repeat;

  p {
    position: absolute;
    left: ${spacing.padding24};
    right: ${spacing.padding24};
    bottom: ${spacing.padding32};
    margin: 0;
    ${typographyStyle('headingLg74')}
    color: ${colors.secondary};
  }
`;

const ContactFormWrap = styled.div`
  padding: ${spacing.padding40};
  background: ${colors.color20};
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap20};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.gap12};

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TextAreaField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap6};
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  appearance: none;
  background: ${colors.color22};
  color: ${colors.secondary};
  border: 1px solid ${({ $hasError }) => ($hasError ? colors.color45 : colors.color49)};
  border-radius: ${radius.radius16};
  padding: ${spacing.padding14} ${spacing.padding20};
  ${typographyStyle('body')}
  outline: none;

  &::placeholder {
    color: ${colors.color57};
  }

  &:focus-visible {
    border-color: ${colors.accent};
    outline: 2px solid ${colors.accent};
    outline-offset: 1px;
  }
`;

const FieldError = styled.p`
  margin: 0;
  color: ${colors.color45};
  ${typographyStyle('caption4')}
`;

const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const PolicyLink = styled.a`
  color: ${colors.secondary};
  text-decoration: underline;
`;

const SiteFooter = styled.footer`
  background: ${colors.color16};
  border-top: 1px solid ${colors.color49};
  padding: ${spacing.padding40};
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap24};

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.padding24} ${spacing.padding16};
  }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.gap16};
  flex-wrap: wrap;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.gap16};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.color93};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.accent};
  }
`;

const FooterMeta = styled.p`
  margin: 0;
  color: ${colors.color60};
  ${typographyStyle('caption4')}
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.color49};
  margin: 0;
`;

const GALLERY = [
  '/images/auth-collage/tile-1.png',
  '/images/auth-collage/tile-2.png',
  '/images/auth-collage/tile-3.png',
  '/images/auth-collage/tile-4.png',
  '/images/auth-collage/tile-5.png',
] as const;

const TESTIMONIALS = [
  {
    quote: 'Agentwise helped me publish market-ready content in minutes instead of hours.',
    name: 'Jordan Hale',
    detail: 'Broker · Austin, TX',
  },
  {
    quote: 'The templates feel premium and still match my local brand.',
    name: 'Priya Shah',
    detail: 'Agent · San Diego, CA',
  },
  {
    quote: 'My engagement jumped after switching to personalized weekly posts.',
    name: 'Marcus Lee',
    detail: 'Team Lead · Chicago, IL',
  },
  {
    quote: 'Finally a marketing workflow built for how agents actually work.',
    name: 'Elena Brooks',
    detail: 'Realtor · Miami, FL',
  },
] as const;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cityState: string;
  website: string;
  message: string;
  privacyAccepted: boolean;
  termsAccepted: boolean;
};

const INITIAL_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  cityState: '',
  website: '',
  message: '',
  privacyAccepted: false,
  termsAccepted: false,
};

export default function VisitorHomePage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = 'First name is required';
    if (!form.lastName.trim()) next.lastName = 'Last name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.cityState.trim()) next.cityState = 'City and state are required';
    if (!form.message.trim()) next.message = 'Message is required';
    if (!form.privacyAccepted) next.privacyAccepted = 'Privacy Policy acceptance is required';
    if (!form.termsAccepted) next.termsAccepted = 'Terms of Service acceptance is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate();
  };

  return (
    <Page>
      <TopNav>
        <Logo to="/">Agentwise</Logo>
        <NavLinks aria-label="Primary">
          <a href="#about">About</a>
          <a href="#content">Content</a>
          <a href="#blog">Blog</a>
          <a href="#pricing">Pricing</a>
        </NavLinks>
        <NavActions>
          <TextLink to="/signup">Get Started</TextLink>
          <LoginPill to="/login">Login</LoginPill>
        </NavActions>
      </TopNav>

      <Hero>
        <HeroCopy>
          <HeroTitle>
            Stunning Real Estate Marketing, <em>Personalized</em> To Your Market In Minutes.
          </HeroTitle>
          <HeroBody>
            Help real estate professionals create content faster with ready-made templates. Increase
            audience engagement through visually appealing social media posts. Download your
            finished content and share it anywhere.
          </HeroBody>
          <SocialRow aria-label="Social links">
            <SocialIcon
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon
              href="https://tiktok.com"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={14} aria-hidden />
            </SocialIcon>
          </SocialRow>
        </HeroCopy>
        <HeroVisual>
          <img src="/images/home/hero-dashboard.png" alt="Agentwise dashboard preview" />
        </HeroVisual>
        <Waitlist>
          <WaitlistCopy>Join 10,000+ other agents on the waitlist at Agentwise</WaitlistCopy>
          <CtaWrap>
            <AccentCta to="/signup">Get Started</AccentCta>
          </CtaWrap>
        </Waitlist>
      </Hero>

      <Section $tone="light" id="content">
        <SectionHeader>
          <SectionTitle>Marketing That Stops The Scroll</SectionTitle>
          <SectionBody>
            Browse the continuously updated collection of templates built for agents like you.
          </SectionBody>
        </SectionHeader>
        <GalleryTrack>
          {GALLERY.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </GalleryTrack>
      </Section>

      <Section $tone="dark" id="about">
        <SectionHeader>
          <SectionTitle>Stunning Marketing, In Three Simple Steps</SectionTitle>
        </SectionHeader>
        <Steps>
          <StepRow>
            <StepCopy>
              <StepIndex>Step 01</StepIndex>
              <StepTitle>Browse The Continuously Updated Collection.</StepTitle>
              <StepBody>
                Explore Ultimate Mind and ready-made templates designed to help real estate
                professionals create content faster.
              </StepBody>
            </StepCopy>
            <StepImage src="/images/home/step-1.png" alt="Browse content collection" />
          </StepRow>
          <StepRow>
            <StepCopy>
              <StepIndex>Step 02</StepIndex>
              <StepTitle>We Personalize It To Your Business And Market.</StepTitle>
              <StepBody>
                Click Customize to edit the location, market data, images, or branding so every post
                feels local.
              </StepBody>
            </StepCopy>
            <StepImage src="/images/home/step-2.png" alt="Personalize content settings" />
          </StepRow>
          <StepRow>
            <StepCopy>
              <StepIndex>Step 03</StepIndex>
              <StepTitle>Post, Attract, Engage, And Stand Out.</StepTitle>
              <StepBody>
                Download your finished content and share it anywhere to increase audience engagement
                with visually appealing social media posts.
              </StepBody>
            </StepCopy>
            <StepImage src="/images/home/step-3.png" alt="Share finished social content" />
          </StepRow>
        </Steps>
      </Section>

      <Section $tone="dark" id="pricing">
        <FeatureSplit>
          <FeatureLeft>
            <SectionTitle as="h3">Agentwise Ultimate Mind</SectionTitle>
            <SectionBody style={{ color: colors.color54 }}>
              Good morning. Ava. Explore Ultimate Mind and keep your marketing sharp every day.
            </SectionBody>
            <img src="/images/home/step-1.png" alt="Ultimate Mind preview" />
          </FeatureLeft>
          <FeatureRight>
            <SectionTitle as="h3">
              Here&apos;s The Deal... <em>Great Marketing</em> Is Just The Start.
            </SectionTitle>
            <CtaWrap>
              <AccentCta to="/signup">Learn More</AccentCta>
            </CtaWrap>
          </FeatureRight>
        </FeatureSplit>
      </Section>

      <Section $tone="light" id="blog">
        <Testimonials>
          <div>
            <SectionTitle>
              Built For <em>Agents Like You.</em>
            </SectionTitle>
            <SectionBody style={{ marginTop: spacing.gap16 }}>
              Personalized to your market in minutes — marketing that stops the scroll and helps you
              stand out.
            </SectionBody>
          </div>
          <QuoteGrid>
            {TESTIMONIALS.map((item) => (
              <QuoteCard key={item.name}>
                <Stars aria-label="5 star rating">★★★★★</Stars>
                <QuoteText>“{item.quote}”</QuoteText>
                <QuoteMeta>
                  {item.name}
                  <br />
                  {item.detail}
                </QuoteMeta>
              </QuoteCard>
            ))}
          </QuoteGrid>
        </Testimonials>
      </Section>

      <ContactBand id="contact">
        <ContactPanel>
          <ContactVisual>
            <p>EVERYONE&apos;S WAITING to buy until the market is right</p>
          </ContactVisual>
          <ContactFormWrap>
            <SectionTitle as="h2" style={{ color: colors.secondary }}>
              Let&apos;s Work Together
            </SectionTitle>
            <Form onSubmit={onSubmit} noValidate>
              <FormGrid>
                <Input
                  id="home-first-name"
                  name="firstName"
                  label="First Name"
                  hideLabel
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                />
                <Input
                  id="home-last-name"
                  name="lastName"
                  label="Last Name"
                  hideLabel
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                />
              </FormGrid>
              <FormGrid>
                <Input
                  id="home-email"
                  name="email"
                  type="email"
                  label="Email"
                  hideLabel
                  placeholder="Email"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                <Input
                  id="home-phone"
                  name="phone"
                  type="tel"
                  label="Phone number"
                  hideLabel
                  placeholder="Phone number"
                  autoComplete="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </FormGrid>
              <Input
                id="home-city"
                name="cityState"
                label="What city and state is your business in?"
                hideLabel
                placeholder="What city and state is your business in?"
                value={form.cityState}
                error={errors.cityState}
                onChange={(e) => updateField('cityState', e.target.value)}
              />
              <Input
                id="home-website"
                name="website"
                label="What is your website link (showing your domain)?"
                hideLabel
                placeholder="What is your website link (showing your domain)?"
                value={form.website}
                onChange={(e) => updateField('website', e.target.value)}
              />
              <TextAreaField>
                <VisuallyHidden htmlFor="home-message">Your Message</VisuallyHidden>
                <TextArea
                  id="home-message"
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  $hasError={Boolean(errors.message)}
                  aria-invalid={Boolean(errors.message)}
                  onChange={(e) => updateField('message', e.target.value)}
                />
                {errors.message ? <FieldError role="alert">{errors.message}</FieldError> : null}
              </TextAreaField>
              <Checkbox
                id="home-privacy"
                name="privacyAccepted"
                checked={form.privacyAccepted}
                onChange={(e) => updateField('privacyAccepted', e.target.checked)}
                label={
                  <>
                    I agree to the{' '}
                    <PolicyLink href="/privacy" onClick={(e) => e.preventDefault()}>
                      Privacy Policy
                    </PolicyLink>
                  </>
                }
              />
              {errors.privacyAccepted ? (
                <FieldError role="alert">{errors.privacyAccepted}</FieldError>
              ) : null}
              <Checkbox
                id="home-terms"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={(e) => updateField('termsAccepted', e.target.checked)}
                label={
                  <>
                    I agree to the{' '}
                    <PolicyLink href="/terms" onClick={(e) => e.preventDefault()}>
                      Terms of Service
                    </PolicyLink>
                  </>
                }
              />
              {errors.termsAccepted ? (
                <FieldError role="alert">{errors.termsAccepted}</FieldError>
              ) : null}
              <Button type="submit" variant="secondary">
                Send the message
              </Button>
            </Form>
          </ContactFormWrap>
        </ContactPanel>
      </ContactBand>

      <SiteFooter>
        <FooterRow>
          <Logo to="/">Agentwise</Logo>
          <SocialRow aria-label="Footer social links">
            <SocialIcon
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon href="https://x.com" aria-label="X" target="_blank" rel="noreferrer">
              <FaTwitter size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={14} aria-hidden />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={14} aria-hidden />
            </SocialIcon>
          </SocialRow>
        </FooterRow>
        <FooterRow>
          <FooterLinks>
            <a href="#about">About</a>
            <a href="#content">Content</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact Us</a>
          </FooterLinks>
          <FooterMeta>
            <a href="mailto:hello@agentwisemarketing.com">hello@agentwisemarketing.com</a>
          </FooterMeta>
        </FooterRow>
        <Divider />
        <FooterRow>
          <FooterMeta>© 2024 Agentwise. All Rights Reserved.</FooterMeta>
          <FooterLinks>
            <a href="/terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="/privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
          </FooterLinks>
        </FooterRow>
      </SiteFooter>
    </Page>
  );
}
