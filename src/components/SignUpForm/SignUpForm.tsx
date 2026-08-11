import { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSignUp } from '../../hooks/useSignUp';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import InputField from '../InputField/InputField';

const Page = styled.div`
  display: grid;
  min-height: 100vh;
  background: var(--color-background);

  @media (min-width: 992px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`;

const FormPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};

  @media (min-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[8]}`};
  }
`;

const FormCard = styled.div`
  width: min(100%, 28rem);
`;

const Headline = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.serif};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.tight};
  color: var(--color-text-primary);

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  }
`;

const Subcopy = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  color: var(--color-text-secondary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const NameRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FormError = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: var(--color-error);
`;

const SignInPrompt = styled.p`
  margin: ${({ theme }) => `${theme.spacing[4]} 0 0`};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: var(--color-text-secondary);
`;

const StyledLink = styled(Link)`
  color: var(--color-text-link);
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: underline;
`;

const MediaPanel = styled.aside`
  display: none;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      rgba(26, 92, 69, 0.92) 0%,
      rgba(45, 138, 106, 0.88) 45%,
      rgba(196, 165, 116, 0.85) 100%
    ),
    var(--color-brand-primary);

  @media (min-width: 992px) {
    display: block;
  }
`;

const MediaGrid = styled.div`
  position: absolute;
  inset: ${({ theme }) => theme.spacing[8]};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MediaTile = styled.div<{ $variant: 1 | 2 | 3 | 4 }>`
  border-radius: ${({ theme }) => theme.borders.radii['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  background-size: cover;
  background-position: center;

  ${({ $variant }) => {
    switch ($variant) {
      case 1:
        return `
          grid-row: span 2;
          background-image:
            linear-gradient(180deg, rgba(15, 28, 24, 0.08), rgba(15, 28, 24, 0.35)),
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.35), transparent 55%),
            linear-gradient(160deg, #d4ddd8 0%, #849990 100%);
        `;
      case 2:
        return `
          background-image:
            linear-gradient(180deg, rgba(15, 28, 24, 0.05), rgba(15, 28, 24, 0.25)),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.25), transparent 50%),
            linear-gradient(140deg, #c4a574 0%, #1a5c45 100%);
        `;
      case 3:
        return `
          background-image:
            linear-gradient(180deg, rgba(15, 28, 24, 0.05), rgba(15, 28, 24, 0.25)),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.2), transparent 45%),
            linear-gradient(120deg, #2d8a6a 0%, #b0bfb8 100%);
        `;
      default:
        return `
          grid-column: span 2;
          min-height: 8rem;
          background-image:
            linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0)),
            linear-gradient(135deg, rgba(15, 28, 24, 0.35), rgba(26, 92, 69, 0.15)),
            linear-gradient(160deg, #3d5a50 0%, #e8eeeb 100%);
        `;
    }
  }}
`;

const MediaCaption = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[8]};
  bottom: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.borders.radii.xl};
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  color: var(--color-text-inverse);
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.snug};
`;

const termsLabel = (
  <>
    I have read and agree to the{' '}
    <a href="/terms" target="_blank" rel="noreferrer">
      Terms of Use
    </a>{' '}
    and{' '}
    <a href="/privacy" target="_blank" rel="noreferrer">
      Privacy Policy
    </a>
    .
  </>
);

const SignUpForm = () => {
  const { values, fieldErrors, formError, isLoading, setFieldValue, submit } =
    useSignUp();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <Page>
      <FormPanel aria-labelledby="signup-heading">
        <FormCard>
          <Headline id="signup-heading">
            Great Marketing Made Easier. Specifically For Agents.
          </Headline>
          <Subcopy>Create your account today</Subcopy>

          <Form onSubmit={handleSubmit} noValidate>
            <NameRow>
              <InputField
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                onChange={(event) => setFieldValue('firstName', event.target.value)}
                error={fieldErrors.firstName}
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={(event) => setFieldValue('lastName', event.target.value)}
                error={fieldErrors.lastName}
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
              required
            />

            <InputField
              label="Create a Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
              error={fieldErrors.password}
              required
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

            {formError ? <FormError role="alert">{formError}</FormError> : null}

            <Button type="submit" fullWidth isLoading={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </Form>

          <SignInPrompt>
            Already have an account? <StyledLink to="/signin">Sign in</StyledLink>
          </SignInPrompt>
        </FormCard>
      </FormPanel>

      <MediaPanel aria-hidden="true">
        <MediaGrid>
          <MediaTile $variant={1} />
          <MediaTile $variant={2} />
          <MediaTile $variant={3} />
          <MediaTile $variant={4} />
        </MediaGrid>
        <MediaCaption>
          Marketing resources and AI-powered content built for real estate professionals.
        </MediaCaption>
      </MediaPanel>
    </Page>
  );
};

export default SignUpForm;
