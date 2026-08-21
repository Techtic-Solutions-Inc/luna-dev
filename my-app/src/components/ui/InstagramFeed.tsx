import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.accent};
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  padding: ${({ theme }) => theme.spacing['padding-8']} 0;
  border: none;
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
  background: transparent;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors['color-96']};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing['gap-12']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius['radius-12']};
  overflow: hidden;
  background: ${({ theme }) => theme.colors['color-26']};
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const EmptyState = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors['color-96']};
`;

type FeedTab = 'feed' | 'reel' | 'stories';

interface InstagramFeedProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  images: string[];
  isLoading?: boolean;
}

const tabLabels: Record<FeedTab, string> = {
  feed: 'Instagram Feed',
  reel: 'Instagram Reel',
  stories: 'Instagram Stories',
};

const InstagramFeed = ({
  activeTab,
  onTabChange,
  images,
  isLoading = false,
}: InstagramFeedProps) => (
  <Feed aria-labelledby="instagram-feed-heading">
    <Title id="instagram-feed-heading">Instagram Feed</Title>
    <Tabs role="tablist" aria-label="Instagram content types">
      {(Object.keys(tabLabels) as FeedTab[]).map((tab) => (
        <Tab
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          $active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          <FaInstagram aria-hidden="true" size={14} />
          {tabLabels[tab]}
        </Tab>
      ))}
    </Tabs>
    {isLoading ? (
      <EmptyState role="status">Loading content...</EmptyState>
    ) : images.length === 0 ? (
      <EmptyState role="status">No content available for this tab.</EmptyState>
    ) : (
      <Grid role="tabpanel">
        {images.map((src, index) => (
          <Card key={`${activeTab}-${index}`}>
            <CardImage src={src} alt={`${tabLabels[activeTab]} preview ${index + 1}`} loading="lazy" />
          </Card>
        ))}
      </Grid>
    )}
  </Feed>
);

export default InstagramFeed;
