import { useCallback, useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { acceptTerms, searchContent, submitEmail } from '../lib/api/visitor';
import type { ErrorResponse } from '../types/visitor';
import HomeHeader from './home/HomeHeader';
import HeroSection from './home/HeroSection';
import MarketingScrollSection from './home/MarketingScrollSection';
import ThreeStepsSection from './home/ThreeStepsSection';
import UltimateMindSection from './home/UltimateMindSection';
import TestimonialsSection from './home/TestimonialsSection';
import ContactSection from './home/ContactSection';
import HomeFooter from './home/HomeFooter';
import { Page } from './home/shared';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const initialContactForm: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  agency: '',
  volume: '',
  message: '',
  privacyPolicy: false,
  termsOfService: false,
};

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data.message ?? 'Something went wrong. Please try again.';
  }
  return 'Something went wrong. Please try again.';
};

const Home = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const [searchError, setSearchError] = useState('');
  const [resultsCount, setResultsCount] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm);
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [submitMessage, setSubmitMessage] = useState('');
  const [termsStatus, setTermsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  const [instagramTab, setInstagramTab] = useState<'feed' | 'reel' | 'stories'>('feed');
  const [instagramImages, setInstagramImages] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNewsletterSubmit = useCallback(async () => {
    const trimmedEmail = newsletterEmail.trim();
    if (!trimmedEmail) {
      setNewsletterError('Email is required.');
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setNewsletterError('Please enter a valid email address.');
      setNewsletterStatus('error');
      setNewsletterMessage('Invalid email format.');
      return;
    }

    setNewsletterError('');
    setNewsletterStatus('loading');

    try {
      const response = await submitEmail({ email: trimmedEmail });
      setNewsletterStatus('success');
      setNewsletterMessage(response.message || 'Thank you for subscribing to Agentwise.');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(getApiErrorMessage(error));
    }
  }, [newsletterEmail]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchError('Enter a search term to find content.');
      setResultsCount(null);
      return;
    }

    setSearchError('');
    setIsSearching(true);

    try {
      const response = await searchContent(query);
      const total = response.data?.total ?? response.data?.results?.length ?? 0;
      setResultsCount(total);

      if (total === 0) {
        setSearchError('No results found. Try a different search term.');
      } else {
        const resultImages = response.data.results
          .slice(0, 3)
          .map(() => `/assets/figma/marketing-cards.png`);
        setInstagramImages(resultImages);
      }
    } catch (error) {
      setSearchError(getApiErrorMessage(error));
      setResultsCount(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const validateContactForm = (): ContactFormErrors => {
    const errors: ContactFormErrors = {};

    if (!contactForm.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!contactForm.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(contactForm.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!contactForm.agency.trim()) {
      errors.agency = 'Agency or brokerage is required.';
    }
    if (!contactForm.volume) {
      errors.volume = 'Please select your current volume.';
    }
    if (!contactForm.message.trim()) {
      errors.message = 'Please enter your message.';
    }
    if (!contactForm.privacyPolicy) {
      errors.privacyPolicy = 'You must accept the Privacy Policy.';
    }
    if (!contactForm.termsOfService) {
      errors.termsOfService = 'You must accept the Terms of Service.';
    }

    return errors;
  };

  const handleContactFieldChange = <K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K],
  ) => {
    setContactForm((current) => ({ ...current, [field]: value }));
    setContactErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm();
    if (Object.keys(validationErrors).length > 0) {
      setContactErrors(validationErrors);
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors below before submitting.');
      return;
    }

    setSubmitStatus('loading');
    setTermsStatus('loading');
    setSubmitMessage('');

    try {
      const [emailResponse, termsResponse] = await Promise.all([
        submitEmail({ email: contactForm.email.trim() }),
        acceptTerms({
          privacy_policy: contactForm.privacyPolicy,
          terms_of_service: contactForm.termsOfService,
        }),
      ]);

      setSubmitStatus('success');
      setTermsStatus('success');
      setSubmitMessage(
        emailResponse.message ||
          termsResponse.message ||
          'Thank you for joining the waitlist. We will be in touch soon.',
      );
      setContactForm(initialContactForm);
      setContactErrors({});
    } catch (error) {
      setSubmitStatus('error');
      setTermsStatus('error');
      setSubmitMessage(getApiErrorMessage(error));
    }
  };

  return (
    <Page>
      <HomeHeader />
      <HeroSection
        newsletterEmail={newsletterEmail}
        newsletterError={newsletterError}
        newsletterStatus={newsletterStatus}
        newsletterMessage={newsletterMessage}
        onNewsletterEmailChange={setNewsletterEmail}
        onNewsletterSubmit={() => void handleNewsletterSubmit()}
      />
      <MarketingScrollSection
        searchError={searchError}
        resultsCount={resultsCount}
        isSearching={isSearching}
        onSearch={(query) => void handleSearch(query)}
        isLoading={isPageLoading}
      />
      <ThreeStepsSection isLoading={isPageLoading} />
      <UltimateMindSection isLoading={isPageLoading} />
      <TestimonialsSection isLoading={isPageLoading} />
      <ContactSection
        form={contactForm}
        errors={contactErrors}
        submitStatus={submitStatus}
        submitMessage={submitMessage}
        termsStatus={termsStatus}
        instagramTab={instagramTab}
        instagramImages={instagramImages}
        isLoading={isPageLoading}
        onFieldChange={handleContactFieldChange}
        onSubmit={(event) => void handleContactSubmit(event)}
        onInstagramTabChange={setInstagramTab}
      />
      <HomeFooter />
    </Page>
  );
};

export default Home;
