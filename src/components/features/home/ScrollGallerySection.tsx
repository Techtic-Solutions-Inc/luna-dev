import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
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
import Spinner from '../../ui/Spinner';

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
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.75) 100%);
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

type CardAction = 'download' | 'customize' | null;

const ScrollGallerySection = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardAction, setCardAction] = useState<{ id: string; action: CardAction } | null>(null);
  const [success, setSuccess] = useState('');

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return contentCards;
    }
    return contentCards.filter((card) => card.title.toLowerCase().includes(trimmed));
  }, [query]);

  const runSearch = () => {
    setSuccess('');
    setLoading(true);
    setError('');
    setLoading(false);
    if (query.trim() && results.length === 0) {
      setError('No content matched your search.');
    }
  };

  const handleAction = (id: string, action: CardAction) => {
    setError('');
    setSuccess('');
    setCardAction({ id, action });
    setCardAction(null);
    setSuccess(action === 'download' ? 'Download started.' : 'Customize opened for this template.');
  };

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
                setSuccess('');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  runSearch();
                }
              }}
            />
            <GoldButton type="button" onClick={runSearch} disabled={loading}>
              {loading ? <Spinner /> : 'Search'}
            </GoldButton>
          </SearchRow>

          <StatusRow>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
            {success ? <BodyCopy role="status">{success}</BodyCopy> : null}
          </StatusRow>

          {results.length === 0 ? (
            <EmptyState role="status">No templates to show. Try another search term.</EmptyState>
          ) : (
            <Cards aria-label="Content templates">
              {results.map((card) => (
                <Card key={card.id}>
                  <CardBg $gradient={card.gradient} />
                  <CardOverlay>
                    <CardTitle>{card.title}</CardTitle>
                    <CardActions>
                      <ActionBtn
                        type="button"
                        disabled={cardAction?.id === card.id && cardAction.action === 'download'}
                        onClick={() => handleAction(card.id, 'download')}
                      >
                        Download
                      </ActionBtn>
                      <ActionBtn
                        type="button"
                        disabled={cardAction?.id === card.id && cardAction.action === 'customize'}
                        onClick={() => handleAction(card.id, 'customize')}
                      >
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
