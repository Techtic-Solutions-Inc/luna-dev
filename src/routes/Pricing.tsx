import React from 'react';
import { PricingPlans, GetStartedSection, FooterLinks } from '../components';
import { Spinner, ErrorMessage } from '../components/common';

const Pricing: React.FC = () => {
  const { data, isLoading, isError, error } = usePricingData();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div style={{ backgroundColor: '#0E0D0D', color: '#FFFFFF', padding: '32px' }}>
      <h1 style={{ fontSize: '84px', fontWeight: 400 }}>Pricing that can't be matched. Value without limit.</h1>
      <PricingPlans plans={data.plans} />
      <GetStartedSection ctaText="Get Started" ctaLink="/get-started" />
      <FooterLinks links={data.footerLinks} />
    </div>
  );
};

export default Pricing;