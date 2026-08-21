import { useId, type FormEvent } from 'react';
import styled from 'styled-components';
import {
  AccentText,
  BodyText,
  OutlineButton,
  Section,
  SerifHeading,
  StatusBanner,
  SkeletonBlock,
} from './shared';
import EmailInput from '../ui/EmailInput';
import Checkbox from '../ui/Checkbox';
import InstagramFeed from '../ui/InstagramFeed';

const ContactSection = styled(Section)`
  padding: 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 640px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const PhotoSide = styled.div`
  position: relative;
  min-height: 480px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 320px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing['padding-40']};
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.75) 100%);
`;

const OverlayText = styled(SerifHeading)`
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 420px;
`;

const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  padding: ${({ theme }) => theme.spacing['padding-60']};
  background: ${({ theme }) => theme.colors['color-16']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['padding-32']};
  }
`;

const FormTitle = styled(SerifHeading)`
  font-size: clamp(28px, 3vw, 36px);
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.accent};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['gap-16']};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-10']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-98'] : theme.colors['color-63'])};
  background-color: ${({ theme }) => theme.colors['color-24']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-96']};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-10']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-98'] : theme.colors['color-63'])};
  background-color: ${({ theme }) => theme.colors['color-24']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 24px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-10']};
  border: 1px solid ${({ theme }) => theme.colors['color-63']};
  background-color: ${({ theme }) => theme.colors['color-24']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const FeedWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing['gap-24']};
  padding-top: ${({ theme }) => theme.spacing['padding-24']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-63']};
`;

type FeedTab = 'feed' | 'reel' | 'stories';

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agency: string;
  volume: string;
  message: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  agency?: string;
  volume?: string;
  message?: string;
  privacyPolicy?: string;
  termsOfService?: string;
}

interface ContactProps {
  form: ContactFormState;
  errors: ContactFormErrors;
  submitStatus: 'idle' | 'loading' | 'success' | 'error';
  submitMessage: string;
  termsStatus: 'idle' | 'loading' | 'success' | 'error';
  instagramTab: FeedTab;
  instagramImages: string[];
  isLoading?: boolean;
  onFieldChange: <K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onInstagramTabChange: (tab: FeedTab) => void;
}

const instagramImagesByTab: Record<FeedTab, string[]> = {
  feed: [
    '/assets/figma/marketing-cards.png',
    '/assets/figma/step-01-mockup.png',
    '/assets/figma/step-03-mockup.png',
  ],
  reel: ['/assets/figma/step-03-mockup.png', '/assets/figma/marketing-cards.png'],
  stories: ['/assets/figma/testimonial-1.png', '/assets/figma/testimonial-2.png'],
};

const Contact = ({
  form,
  errors,
  submitStatus,
  submitMessage,
  termsStatus,
  instagramTab,
  instagramImages,
  isLoading = false,
  onFieldChange,
  onSubmit,
  onInstagramTabChange,
}: ContactProps) => {
  const formId = useId();

  return (
    <ContactSection id="contact" aria-labelledby="contact-heading">
      <Layout>
        <PhotoSide>
          {isLoading ? (
            <SkeletonBlock $height="100%" />
          ) : (
            <>
              <Photo
                src="/assets/figma/contact-photo.png"
                alt="Real estate professional on a phone call"
              />
              <PhotoOverlay>
                <OverlayText>
                  EVERYONE&apos;S WAITING to buy until &apos;the market is right&apos;
                </OverlayText>
              </PhotoOverlay>
            </>
          )}
        </PhotoSide>
        <FormSide>
          {isLoading ? (
            <>
              <SkeletonBlock $height="40px" $width="60%" />
              <SkeletonBlock $height="400px" />
            </>
          ) : (
            <>
              <FormTitle id="contact-heading">
                Let&apos;s Work <AccentText>Together</AccentText>
              </FormTitle>
              <BodyText>Tell us about your business and join the Agentwise waitlist today.</BodyText>
              <Form id={formId} onSubmit={onSubmit} noValidate>
                <Row>
                  <Field>
                    <Label htmlFor={`${formId}-first-name`}>First Name</Label>
                    <Input
                      id={`${formId}-first-name`}
                      name="firstName"
                      value={form.firstName}
                      onChange={(event) => onFieldChange('firstName', event.target.value)}
                      $hasError={Boolean(errors.firstName)}
                      aria-invalid={Boolean(errors.firstName)}
                    />
                    {errors.firstName ? (
                      <BodyText role="alert">{errors.firstName}</BodyText>
                    ) : null}
                  </Field>
                  <Field>
                    <Label htmlFor={`${formId}-last-name`}>Last Name</Label>
                    <Input
                      id={`${formId}-last-name`}
                      name="lastName"
                      value={form.lastName}
                      onChange={(event) => onFieldChange('lastName', event.target.value)}
                      $hasError={Boolean(errors.lastName)}
                      aria-invalid={Boolean(errors.lastName)}
                    />
                    {errors.lastName ? (
                      <BodyText role="alert">{errors.lastName}</BodyText>
                    ) : null}
                  </Field>
                </Row>
                <Row>
                  <EmailInput
                    label="Email"
                    id={`${formId}-email`}
                    value={form.email}
                    onChange={(event) => onFieldChange('email', event.target.value)}
                    error={errors.email}
                  />
                  <Field>
                    <Label htmlFor={`${formId}-phone`}>Phone number</Label>
                    <Input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => onFieldChange('phone', event.target.value)}
                      $hasError={Boolean(errors.phone)}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone ? <BodyText role="alert">{errors.phone}</BodyText> : null}
                  </Field>
                </Row>
                <Field>
                  <Label htmlFor={`${formId}-agency`}>Agency / Brokerage</Label>
                  <Input
                    id={`${formId}-agency`}
                    name="agency"
                    value={form.agency}
                    onChange={(event) => onFieldChange('agency', event.target.value)}
                    $hasError={Boolean(errors.agency)}
                    aria-invalid={Boolean(errors.agency)}
                  />
                  {errors.agency ? <BodyText role="alert">{errors.agency}</BodyText> : null}
                </Field>
                <Field>
                  <Label htmlFor={`${formId}-volume`}>What is your current volume?</Label>
                  <Select
                    id={`${formId}-volume`}
                    name="volume"
                    value={form.volume}
                    onChange={(event) => onFieldChange('volume', event.target.value)}
                    aria-invalid={Boolean(errors.volume)}
                  >
                    <option value="">Select volume range</option>
                    <option value="1-5">1–5 transactions per year</option>
                    <option value="6-15">6–15 transactions per year</option>
                    <option value="16-30">16–30 transactions per year</option>
                    <option value="30+">30+ transactions per year</option>
                  </Select>
                  {errors.volume ? <BodyText role="alert">{errors.volume}</BodyText> : null}
                </Field>
                <Field>
                  <Label htmlFor={`${formId}-message`}>Your Message</Label>
                  <TextArea
                    id={`${formId}-message`}
                    name="message"
                    value={form.message}
                    onChange={(event) => onFieldChange('message', event.target.value)}
                    $hasError={Boolean(errors.message)}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message ? <BodyText role="alert">{errors.message}</BodyText> : null}
                </Field>
                <CheckboxGroup>
                  <Checkbox
                    label="I agree to the Privacy Policy"
                    checked={form.privacyPolicy}
                    onChange={(event) => onFieldChange('privacyPolicy', event.target.checked)}
                    error={errors.privacyPolicy}
                  />
                  <Checkbox
                    label="I agree to the Terms of Service"
                    checked={form.termsOfService}
                    onChange={(event) => onFieldChange('termsOfService', event.target.checked)}
                    error={errors.termsOfService}
                  />
                </CheckboxGroup>
                <OutlineButton
                  type="submit"
                  disabled={submitStatus === 'loading' || termsStatus === 'loading'}
                  aria-label="Join the waitlist now"
                >
                  {submitStatus === 'loading' ? 'Submitting...' : 'Join the waitlist now'}
                </OutlineButton>
                {submitStatus === 'success' || submitStatus === 'error' ? (
                  <StatusBanner
                    $variant={submitStatus === 'success' ? 'success' : 'error'}
                    role="status"
                  >
                    {submitMessage}
                  </StatusBanner>
                ) : null}
              </Form>
              <FeedWrap>
                <InstagramFeed
                  activeTab={instagramTab}
                  onTabChange={onInstagramTabChange}
                  images={instagramImages.length > 0 ? instagramImages : instagramImagesByTab[instagramTab]}
                />
              </FeedWrap>
            </>
          )}
        </FormSide>
      </Layout>
    </ContactSection>
  );
};

export default Contact;
