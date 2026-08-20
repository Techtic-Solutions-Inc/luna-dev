import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { waitForPaint } from '../../../lib/waitForPaint';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import Spinner from '../../ui/Spinner';
import { contentCards } from './content';
import {
  BodyCopy,
  Container,
  ErrorText,
  GhostButton,
  GoldButton,
  GridBackdrop,
  Section,
  SerifDisplay,
} from './shared';

const GallerySection = styled(Section)`
  padding-top: 0;
`;

const Header = styled.div`
  text-align: center;
  display: grid;
  gap: ${tokens.spacing['gap-16']};
  margin-bottom: ${tokens.spacing['gap-32']};
`;

const SearchRow = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-12']};
  margin-bottom: ${tokens.spacing['gap-24']};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  min-height: 48px;
  padding: ${tokens.spacing['padding-12']} ${tokens.spacing['padding-16']};
  border: 1px solid var(--color-49);
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--color-33);
  color: var(--secondary);
`;

const Cards = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(180px, 220px);
  gap: ${tokens.spacing['gap-16']};
  overflow-x: auto;
  padding-bottom: ${tokens.spacing['padding-12']};
  scroll-snap-type: x mandatory;

  @media (min-width: ${breakpoints.tablet}) {
    grid-auto-columns: minmax(200px, 1fr);
  }
`;

const Card = styled.article`
  position: relative;
  min-height: 320px;
  border-radius: ${tokens.radius['radius-16']};
  border: 1px solid var(--color-49);
  overflow: hidden;
  scroll-snap-align: start;
  display: grid;
  align-content: end;
`;

const CardBg = styled.div<{ $gradient: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $gradient }) => $gradient};
`;

const CardOverlay = styled.div`
  position: relative;
  padding: ${tokens.spacing['padding-16']};
  background: linear-gradient(
    180deg,
    transparent 0%,
    color-mix(in srgb, var(--color-16) 75%, transparent) 100%
  );
`;

const CardTitle = styled.h3`
  margin: 0 0 ${tokens.spacing['gap-12']};
  color: var(--secondary);
  font-family: ${tokens.typography['heading-md-84'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-md-84'].fontSize};
  font-weight: ${tokens.typography['heading-md-84'].fontWeight};
  line-height: ${tokens.typography['heading-md-84'].lineHeight};
`;

const CardActions = styled.div`
  display: flex;
  gap: ${tokens.spacing['gap-8']};
`;

const ActionBtn = styled(GhostButton)`
  min-height: 36px;
  padding: ${tokens.spacing['padding-8']} ${tokens.spacing['padding-12']};
  font-size: ${tokens.typography['caption-4'].fontSize};
`;

const EmptyState = styled.p`
  margin: 0;
  text-align: center;
  color: var(--color-57);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

const StatusRow = styled.div`
  min-height: 24px;
  margin-bottom: ${tokens.spacing['gap-12']};
`;

const ScrollGallerySection = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const results = useMemo(() => {
    const trimmed = appliedQuery.trim().toLowerCase();
    if (!trimmed) {
      return contentCards;
    }
    return contentCards.filter((card) => card.title.toLowerCase().includes(trimmed));
  }, [appliedQuery]);

  const runSearch = async () => {
    setError('');
    setLoading(true);
    await waitForPaint();
    const trimmed = query.trim();
    const normalized = trimmed.toLowerCase();
    const filtered = normalized
      ? contentCards.filter((card) => card.title.toLowerCase().includes(normalized))
      : contentCards;
    setAppliedQuery(trimmed);
    if (normalized && filtered.length === 0) {
      setError('No content matched your search.');
    }
    setLoading(false);
  };

  const handleAction = () => {
    setError(
      'Template actions are unavailable until download and customize endpoints are published in the API contract.',
    );
  };

  const showEmpty = !loading && !error && results.length === 0;

  return (
    <GridBackdrop id="content">
      <GallerySection>
        <Container>
          <Header>
            <SerifDisplay>Marketing That Stops The Scroll</SerifDisplay>
            <BodyCopy>
              Browse the continuously updated collection and pick posts that fit your market.
            </BodyCopy>
          </Header>

          <SearchRow>
            <SearchInput
              type="search"
              value={query}
              placeholder="Search content"
              aria-label="Search content"
              onChange={(event) => {
                setQuery(event.target.value);
                setError('');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  void runSearch();
                }
              }}
            />
            <GoldButton type="button" onClick={() => void runSearch()} disabled={loading}>
              {loading ? <Spinner /> : 'Search'}
            </GoldButton>
          </SearchRow>

          <StatusRow>{error ? <ErrorText role="alert">{error}</ErrorText> : null}</StatusRow>

          {showEmpty ? (
            <EmptyState role="status">No templates to show. Try another search term.</EmptyState>
          ) : error ? null : (
            <Cards aria-label="Content templates">
              {results.map((card) => (
                <Card key={card.id}>
                  <CardBg $gradient={card.gradient} />
                  <CardOverlay>
                    <CardTitle>{card.title}</CardTitle>
                    <CardActions>
                      <ActionBtn type="button" onClick={handleAction}>
                        Download
                      </ActionBtn>
                      <ActionBtn type="button" onClick={handleAction}>
                        Customize
                      </ActionBtn>
                    </CardActions>
                  </CardOverlay>
                </Card>
              ))}
            </Cards>
          )}
        </Container>
      </GallerySection>
    </GridBackdrop>
  );
};

export default ScrollGallerySection;
