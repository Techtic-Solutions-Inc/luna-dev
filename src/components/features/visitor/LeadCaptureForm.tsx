import { FormEvent, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import ContractGapBanner from '../../ui/ContractGapBanner';
import FormErrorBanner from '../../ui/FormErrorBanner';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useVisitorHome } from '../../../hooks/useVisitorHome';

const inputClassName = '!rounded-lg !py-3';

const LeadCaptureForm = () => {
  const {
    submitLead,
    isLoading,
    showGapBanner,
    bannerError,
    fieldErrors,
    resetErrors,
  } = useVisitorHome();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const clearClientError = (field: string) => {
    resetErrors();
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setClientErrors({});
    await submitLead({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      {bannerError ? <FormErrorBanner message={bannerError} /> : null}
      {showGapBanner ? (
        <ContractGapBanner message="Visitor subscribe endpoint not available" />
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          name="first_name"
          autoComplete="given-name"
          label="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            clearClientError('first_name');
          }}
          error={clientErrors.first_name ?? fieldErrors.first_name}
          disabled={isLoading}
          dark
          className={inputClassName}
        />
        <Input
          name="last_name"
          autoComplete="family-name"
          label="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            clearClientError('last_name');
          }}
          error={clientErrors.last_name ?? fieldErrors.last_name}
          disabled={isLoading}
          dark
          className={inputClassName}
        />
      </div>

      <Input
        name="email"
        type="email"
        autoComplete="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearClientError('email');
        }}
        error={clientErrors.email ?? fieldErrors.email}
        disabled={isLoading}
        dark
        className={inputClassName}
      />

      <Input
        name="phone"
        type="tel"
        autoComplete="tel"
        label="Phone number"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          clearClientError('phone');
        }}
        error={clientErrors.phone ?? fieldErrors.phone}
        disabled={isLoading}
        dark
        className={inputClassName}
      />

      <Checkbox
        id="lead-privacy"
        checked={privacyAccepted}
        onChange={(checked) => {
          setPrivacyAccepted(checked);
          clearClientError('privacy_accepted');
        }}
        disabled={isLoading}
        error={clientErrors.privacy_accepted ?? fieldErrors.privacy_accepted}
        label={
          <>
            I accept the{' '}
            <a href="#" className="underline hover:text-white">
              Privacy Policy
            </a>
          </>
        }
      />

      <Checkbox
        id="lead-terms"
        checked={termsAccepted}
        onChange={(checked) => {
          setTermsAccepted(checked);
          clearClientError('terms_accepted');
        }}
        disabled={isLoading}
        error={clientErrors.terms_accepted ?? fieldErrors.terms_accepted}
        label={
          <>
            I accept the{' '}
            <a href="#" className="underline hover:text-white">
              Terms of Service
            </a>
          </>
        }
      />

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        className="mt-2 !w-full sm:!w-auto"
      >
        {isLoading ? 'Submitting…' : 'Join the waitlist now'}
      </Button>
    </form>
  );
};

export default LeadCaptureForm;
