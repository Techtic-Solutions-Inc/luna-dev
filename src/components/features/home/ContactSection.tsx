import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { waitForPaint } from '../../../lib/waitForPaint';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import AuthInput from '../../ui/AuthInput';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { ErrorText, Section, Skeleton, VisuallyHidden, WideContainer } from './shared';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{7,}$/;
const contactErrorId = 'contact-error';

const ContactSectionWrap = styled(Section)`
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-16) 92%, transparent) 0%,
      color-mix(in srgb, var(--color-16) 72%, transparent) 45%,
      color-mix(in srgb, var(--color-16) 92%, transparent) 100%
    ),
    linear-gradient(135deg, var(--color-43) 0%, var(--color-16) 100%);
`;

const Grid = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-32']};

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${tokens.spacing['gap-48']};
    align-items: center;
  }
`;

const QuoteBlock = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-16']};
`;

const Quote = styled.h2`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-xl-100'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-xl-100'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};
  text-transform: uppercase;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-76'].fontSize};
    line-height: ${tokens.typography['heading-xl-76'].lineHeight};
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${tokens.typography['heading-xl-100'].fontSize};
    line-height: ${tokens.typography['heading-xl-100'].lineHeight};
  }
`;

const FormCard = styled.div`
  padding: ${tokens.spacing['padding-24']};
  border-radius: ${tokens.radius['radius-16']};
  border: 1px solid var(--color-49);
  background: color-mix(in srgb, var(--color-33) 88%, transparent);
`;

const FormTitle = styled.h3`
  margin: 0 0 ${tokens.spacing['gap-24']};
  color: var(--secondary);
  font-family: ${tokens.typography['heading-xl-44'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-xl-44'].fontSize};
  font-weight: ${tokens.typography['heading-xl-44'].fontWeight};
  line-height: ${tokens.typography['heading-xl-44'].lineHeight};
`;

const Field = styled.div`
  margin-bottom: ${tokens.spacing['gap-16']};
`;

const NameRow = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-12']};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Checks = styled.fieldset`
  border: 0;
  margin: 0 0 ${tokens.spacing['gap-16']};
  padding: 0;
  display: grid;
  gap: ${tokens.spacing['gap-12']};
`;

const Legend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

const Submit = styled(Button).attrs({ variant: 'pill' as const })`
  width: 100%;
  min-height: 52px;
  background: var(--color-33);
  border: 1px solid var(--color-49);
  color: var(--secondary);
`;

type Status = 'idle' | 'loading' | 'error';
type ErrorField = 'firstName' | 'lastName' | 'email' | 'phone' | 'agreements' | null;

const ContactSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [errorField, setErrorField] = useState<ErrorField>(null);

  const hasError = status === 'error';

  const fieldInvalid = (field: Exclude<ErrorField, null>) => hasError && errorField === field;
  const fieldDescribedBy = (field: Exclude<ErrorField, null>) =>
    fieldInvalid(field) ? contactErrorId : undefined;

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
      setErrorField(null);
    }
  };

  const validate = (): { message: string; field: ErrorField } | null => {
    if (!firstName.trim()) {
      return { message: 'Enter your first name.', field: 'firstName' };
    }
    if (!lastName.trim()) {
      return { message: 'Enter your last name.', field: 'lastName' };
    }
    if (!email.trim()) {
      return { message: 'Enter your email address.', field: 'email' };
    }
    if (!emailPattern.test(email.trim())) {
      return { message: 'Enter a valid email address.', field: 'email' };
    }
    if (!phone.trim()) {
      return { message: 'Enter your phone number.', field: 'phone' };
    }
    if (!phonePattern.test(phone.trim())) {
      return { message: 'Enter a valid phone number.', field: 'phone' };
    }
    if (!privacyAccepted || !termsAccepted) {
      return { message: 'Accept the Privacy Policy and Terms of Service.', field: 'agreements' };
    }
    return null;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextError = validate();
    if (nextError) {
      setStatus('error');
      setErrorField(nextError.field);
      setMessage(nextError.message);
      return;
    }

    setStatus('loading');
    setMessage('');
    setErrorField(null);
    await waitForPaint();
    setStatus('error');
    setErrorField(null);
    setMessage(
      'Contact submission is unavailable until the contact endpoint is published in the API contract.',
    );
  };

  return (
    <ContactSectionWrap id="contact">
      <WideContainer>
        <Grid>
          <QuoteBlock>
            <Quote>Everyone&apos;s waiting to buy until &apos;the market is right&apos;</Quote>
          </QuoteBlock>

          <FormCard>
            <FormTitle>Let&apos;s Work Together</FormTitle>

            <form onSubmit={(event) => void onSubmit(event)} noValidate>
              <NameRow>
                <Field>
                  <VisuallyHidden htmlFor="home-first-name">First Name</VisuallyHidden>
                  {status === 'loading' ? (
                    <Skeleton aria-hidden="true" />
                  ) : (
                    <AuthInput
                      id="home-first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First Name"
                      value={firstName}
                      aria-invalid={fieldInvalid('firstName')}
                      aria-describedby={fieldDescribedBy('firstName')}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        clearError();
                      }}
                    />
                  )}
                </Field>
                <Field>
                  <VisuallyHidden htmlFor="home-last-name">Last Name</VisuallyHidden>
                  {status === 'loading' ? (
                    <Skeleton aria-hidden="true" />
                  ) : (
                    <AuthInput
                      id="home-last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last Name"
                      value={lastName}
                      aria-invalid={fieldInvalid('lastName')}
                      aria-describedby={fieldDescribedBy('lastName')}
                      onChange={(event) => {
                        setLastName(event.target.value);
                        clearError();
                      }}
                    />
                  )}
                </Field>
              </NameRow>

              <Field>
                <VisuallyHidden htmlFor="home-email">Email</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <AuthInput
                    id="home-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    aria-invalid={fieldInvalid('email')}
                    aria-describedby={fieldDescribedBy('email')}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearError();
                    }}
                  />
                )}
              </Field>

              <Field>
                <VisuallyHidden htmlFor="home-phone">Phone number</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <AuthInput
                    id="home-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                    value={phone}
                    aria-invalid={fieldInvalid('phone')}
                    aria-describedby={fieldDescribedBy('phone')}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      clearError();
                    }}
                  />
                )}
              </Field>

              <Checks>
                <Legend>Agreements</Legend>
                {status === 'loading' ? (
                  <>
                    <Skeleton aria-hidden="true" />
                    <Skeleton aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <Checkbox
                      id="home-privacy"
                      name="privacy"
                      checked={privacyAccepted}
                      aria-invalid={fieldInvalid('agreements')}
                      aria-describedby={fieldDescribedBy('agreements')}
                      onChange={(checked) => {
                        setPrivacyAccepted(checked);
                        clearError();
                      }}
                    >
                      Privacy Policy
                    </Checkbox>
                    <Checkbox
                      id="home-terms"
                      name="terms"
                      checked={termsAccepted}
                      aria-invalid={fieldInvalid('agreements')}
                      aria-describedby={fieldDescribedBy('agreements')}
                      onChange={(checked) => {
                        setTermsAccepted(checked);
                        clearError();
                      }}
                    >
                      Terms of Service
                    </Checkbox>
                  </>
                )}
              </Checks>

              {hasError ? (
                <ErrorText id={contactErrorId} role="alert">
                  {message}
                </ErrorText>
              ) : null}

              <Submit type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? <Spinner /> : 'Send me a quick email'}
              </Submit>
            </form>
          </FormCard>
        </Grid>
      </WideContainer>
    </ContactSectionWrap>
  );
};

export default ContactSection;
