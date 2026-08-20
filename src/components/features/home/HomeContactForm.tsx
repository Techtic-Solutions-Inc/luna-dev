import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { FiMail } from 'react-icons/fi';
import type { ContactFormErrors, ContactFormValues } from '../../../types/visitorHome';
import {
  acceptHomeTerms,
  parseApiError,
  subscribeToHome,
} from '../../../lib/api/visitorHome';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';
import { hasFormErrors, validateContactForm } from './validateContactForm';
import { SerifAccent } from './homeStyles';

const ContactSection = styled.section`
  background-color: ${({ theme }) => theme.colors['color-16']};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageSide = styled.div`
  position: relative;
  min-height: 360px;
  background-image: url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop');
  background-size: cover;
  background-position: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 680px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing['padding-40']};
  background: linear-gradient(to top, ${({ theme }) => theme.colors['color-16']}ee 0%, transparent 60%);
`;

const OverlayQuote = styled.p`
  font-family: ${({ theme }) => theme.typography['heading-xl-46'].fontFamily};
  font-size: clamp(22px, 3vw, ${({ theme }) => theme.typography['heading-xl-46'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-46'].fontWeight};
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
`;

const FormSide = styled.div`
  padding: ${({ theme }) => `${theme.spacing['padding-40']} ${theme.spacing['padding-24']}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing['padding-60']};
  }
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-32']};
`;

const FormIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  background-color: ${({ theme }) => theme.colors['color-26']};
  color: ${({ theme }) => theme.colors.accent};
`;

const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography['heading-xl-46'].fontFamily};
  font-size: clamp(28px, 3.5vw, ${({ theme }) => theme.typography['heading-xl-46'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-46'].fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-20']};
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['gap-20']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  background-color: ${({ theme }) => theme.colors['color-39']};
  color: ${({ theme }) => theme.colors['color-17']};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
`;

const FormError = styled.div`
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors['color-45']};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
`;

const INITIAL_VALUES: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  agencyName: '',
  websiteLink: '',
  message: '',
  privacyPolicy: false,
  termsOfService: false,
};

const HomeContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldsLoading] = useState(false);

  const handleChange = (field: keyof ContactFormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      delete next.form;
      return next;
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await subscribeToHome({
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        team_size: values.agencyName.trim() || undefined,
        agency_name: values.agencyName.trim() || undefined,
        website_link: values.websiteLink.trim() || undefined,
        message: values.message.trim() || undefined,
      });

      await acceptHomeTerms({
        privacy_policy: values.privacyPolicy,
        terms_of_service: values.termsOfService,
        email: values.email.trim(),
      });

      setIsSuccess(true);
      setValues(INITIAL_VALUES);
    } catch (error) {
      setErrors({ form: parseApiError(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection aria-labelledby="contact-heading">
      <ContactGrid>
        <ImageSide>
          <ImageOverlay>
            <OverlayQuote>
              Everyone&apos;s waiting to buy until &lsquo;the market is right&rsquo;
            </OverlayQuote>
          </ImageOverlay>
        </ImageSide>
        <FormSide>
          <FormHeader>
            <FormIcon aria-hidden="true">
              <FiMail size={20} />
            </FormIcon>
            <FormTitle id="contact-heading">
              Let&apos;s Work <SerifAccent>Together</SerifAccent>
            </FormTitle>
          </FormHeader>

          {isSuccess && (
            <SuccessMessage role="status">
              Thank you! Your message has been sent successfully.
            </SuccessMessage>
          )}

          {errors.form && <FormError role="alert">{errors.form}</FormError>}

          <Form onSubmit={handleSubmit} noValidate>
            <FieldRow>
              <InputField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                isLoading={fieldsLoading}
                autoComplete="given-name"
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                isLoading={fieldsLoading}
                autoComplete="family-name"
              />
            </FieldRow>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              isLoading={fieldsLoading}
              autoComplete="email"
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              isLoading={fieldsLoading}
              autoComplete="tel"
            />
            <InputField
              label="Agency Name"
              name="agencyName"
              value={values.agencyName}
              onChange={(e) => handleChange('agencyName', e.target.value)}
              error={errors.agencyName}
              isLoading={fieldsLoading}
            />
            <InputField
              label="Website Link"
              name="websiteLink"
              value={values.websiteLink}
              onChange={(e) => handleChange('websiteLink', e.target.value)}
              error={errors.websiteLink}
              isLoading={fieldsLoading}
            />
            <TextareaField
              label="Your Message"
              name="message"
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
              error={errors.message}
              isLoading={fieldsLoading}
            />
            <CheckboxGroup>
              <Checkbox
                name="privacyPolicy"
                checked={values.privacyPolicy}
                onChange={(e) => handleChange('privacyPolicy', e.target.checked)}
                error={errors.privacyPolicy}
                label={
                  <>
                    I agree to the{' '}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </>
                }
              />
              <Checkbox
                name="termsOfService"
                checked={values.termsOfService}
                onChange={(e) => handleChange('termsOfService', e.target.checked)}
                error={errors.termsOfService}
                label={
                  <>
                    I agree to the{' '}
                    <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>
                  </>
                }
              />
            </CheckboxGroup>
            <Button type="submit" variant="dark" size="lg" fullWidth isLoading={isSubmitting}>
              Join the waitlist now
            </Button>
          </Form>
        </FormSide>
      </ContactGrid>
    </ContactSection>
  );
};

export default HomeContactForm;
