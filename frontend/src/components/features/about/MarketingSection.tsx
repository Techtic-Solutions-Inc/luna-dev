import styled from 'styled-components';
import { useAboutContent } from '../../../hooks/useAboutContent';
import Card from '../../ui/Card';
import { SkeletonBlock, VisuallyHidden } from './styles';

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Panel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--gap-20);
  padding: var(--padding-40);
  background: linear-gradient(
    135deg,
    var(--color-45) 0%,
    var(--color-20) 55%,
    var(--color-61) 100%
  );
  border: 1px solid var(--color-58);
  color: var(--secondary);

  @media (max-width: 768px) {
    padding: var(--padding-24);
  }
`;

const Headline = styled.h2`
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
  font-family: var(--font-heading-xl-85-family);
  font-size: var(--font-heading-xl-85-size);
  font-weight: var(--font-heading-xl-85-weight);
  line-height: var(--font-heading-xl-85-line-height);
  color: var(--secondary);

  @media (max-width: 768px) {
    font-family: var(--font-heading-xl-116-family);
    font-size: var(--font-heading-xl-116-size);
    font-weight: var(--font-heading-xl-116-weight);
    line-height: var(--font-heading-xl-116-line-height);
  }
`;

const AccentLine = styled.span`
  color: var(--accent);
`;

const Description = styled.p`
  font-family: var(--font-body-100-family);
  font-size: var(--font-body-100-size);
  font-weight: var(--font-body-100-weight);
  line-height: var(--font-body-100-line-height);
  color: var(--color-48);
  max-width: 36rem;
`;

const Tagline = styled.p`
  font-family: var(--font-body-72-family);
  font-size: var(--font-body-72-size);
  font-weight: var(--font-body-72-weight);
  line-height: var(--font-body-72-line-height);
  color: var(--color-93);
  max-width: 32rem;
`;

const MarketingSectionLoading = () => (
  <Section aria-busy="true" aria-live="polite" aria-labelledby="marketing-headline">
    <VisuallyHidden>Loading marketing content</VisuallyHidden>
    <SkeletonBlock $height="12rem" $radius="var(--radius-16)" />
  </Section>
);

const MarketingSection = () => {
  const { data, isLoading, error } = useAboutContent();

  if (isLoading) {
    return <MarketingSectionLoading />;
  }

  if (error || !data?.marketing) {
    return null;
  }

  const { marketing } = data;

  return (
    <Section aria-labelledby="marketing-headline">
      <Panel>
        <Headline id="marketing-headline">
          <span>{marketing.headline_primary}</span>
          <AccentLine>{marketing.headline_secondary}</AccentLine>
        </Headline>
        <Description>{marketing.description}</Description>
        <Tagline>{marketing.tagline}</Tagline>
      </Panel>
    </Section>
  );
};

export default MarketingSection;
