import styled from 'styled-components';
import {
  AccentText,
  BodyText,
  Container,
  MockupImage,
  Section,
  SerifHeading,
  SkeletonBlock,
} from './shared';
import SearchInput from '../ui/SearchInput';
import AppLink from '../ui/AppLink';

const MarketingSection = styled(Section)`
  background: ${({ theme }) => theme.colors.secondary};
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  margin: 0 auto ${({ theme }) => theme.spacing['gap-40']};
  max-width: 720px;
`;

const SectionTitle = styled(SerifHeading)`
  font-size: clamp(28px, 4vw, 36px);
  line-height: 1.25;
  color: ${({ theme }) => theme.colors['color-16']};
`;

const SectionBody = styled(BodyText)`
  color: ${({ theme }) => theme.colors['color-57']};
`;

const SearchWrap = styled.div`
  max-width: 480px;
  margin: 0 auto ${({ theme }) => theme.spacing['gap-32']};
`;

const CardsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing['padding-8']};
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors['color-63']};
    border-radius: 999px;
  }
`;

const Card = styled.div`
  flex: 0 0 min(280px, 70vw);
  scroll-snap-align: start;
  border-radius: ${({ theme }) => theme.borderRadius['radius-16']};
  overflow: hidden;
  background: ${({ theme }) => theme.colors['color-26']};
`;

const BrowseLink = styled.div`
  margin-top: ${({ theme }) => theme.spacing['gap-24']};
  text-align: center;
`;

interface MarketingScrollProps {
  searchError: string;
  resultsCount: number | null;
  isSearching: boolean;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const MarketingScroll = ({
  searchError,
  resultsCount,
  isSearching,
  onSearch,
  isLoading = false,
}: MarketingScrollProps) => (
  <MarketingSection id="content" aria-labelledby="marketing-heading">
    <Container>
      <SectionHeader>
        <SectionTitle id="marketing-heading">
          Marketing That <AccentText>Stops The Scroll</AccentText>
        </SectionTitle>
        <SectionBody>
          Hand-designed by our creative team. Hundreds of ready-made templates help real estate
          professionals create content faster with scroll-stopping visuals.
        </SectionBody>
      </SectionHeader>
      <SearchWrap>
        {isLoading ? (
          <SkeletonBlock $height="56px" />
        ) : (
          <SearchInput
            label="Search content library"
            placeholder="Search templates, categories, and more"
            error={searchError}
            resultsCount={resultsCount}
            isLoading={isSearching}
            onSearch={onSearch}
          />
        )}
      </SearchWrap>
      {isLoading ? (
        <CardsRow aria-hidden="true">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <SkeletonBlock $height="360px" />
            </Card>
          ))}
        </CardsRow>
      ) : (
        <CardsRow aria-label="Marketing content previews">
          <Card>
            <MockupImage
              src="/assets/figma/marketing-cards.png"
              alt="Marketing content gallery featuring real estate lifestyle photography"
            />
          </Card>
        </CardsRow>
      )}
      <BrowseLink>
        <AppLink to="#content" variant="primary">
          Browse all
        </AppLink>
      </BrowseLink>
    </Container>
  </MarketingSection>
);

export default MarketingScroll;
