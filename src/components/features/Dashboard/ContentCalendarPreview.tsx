import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { ContentCalendarEntry } from '../../../types/contentCalendar';
import { inferContentType, formatEntryDate } from './dashboardUtils';

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 16px;
`;

const HeaderText = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 31.32px;
  color: #ffffff;
  margin: 0 0 4px;
`;

const Subtitle = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #959595;
  margin: 0;
`;

const BrowseLink = styled.button`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #c8a47e;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-top: 16px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #383838;
    border-radius: 2px;
  }
`;

const CalendarCard = styled.div`
  min-width: 180px;
  flex: 1;
  max-width: 220px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  margin-bottom: 8px;
`;

const DateLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
  text-transform: uppercase;
`;

const TypeBadge = styled.span<{ $type: string }>`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${({ $type }) => {
    switch ($type) {
      case 'Reels':
        return '#ff004f';
      case 'Story':
        return '#c8a47e';
      case 'Email':
        return '#4285f4';
      default:
        return '#959595';
    }
  }};
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, #2f271f 0%, #473e33 100%);
  display: flex;
  align-items: flex-end;
  padding: 12px;
`;

const CardLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 300;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 4px 8px;
  backdrop-filter: blur(4px);
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  background: #232323;
  border-radius: 12px;
  border: 1px dashed #383838;
`;

const EmptyText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #959595;
  margin: 0;
`;

interface ContentCalendarPreviewProps {
  entries: ContentCalendarEntry[];
}

const ContentCalendarPreview: React.FC<ContentCalendarPreviewProps> = ({ entries }) => {
  const navigate = useNavigate();
  const previewEntries = entries.slice(0, 5);

  return (
    <Section aria-label="Your content calendar">
      <SectionHeader>
        <HeaderText>
          <Title>Your Content Calendar</Title>
          <Subtitle>See what&apos;s scheduled and ready to post.</Subtitle>
        </HeaderText>
        <BrowseLink onClick={() => navigate('/content-calendar')} type="button">
          Browse all
        </BrowseLink>
      </SectionHeader>

      {previewEntries.length === 0 ? (
        <EmptyState>
          <EmptyText>No calendar entries scheduled yet.</EmptyText>
        </EmptyState>
      ) : (
        <CardsGrid>
          {previewEntries.map((entry) => {
            const contentType = inferContentType(entry);
            return (
              <CalendarCard key={entry.id}>
                <CardHeader>
                  <DateLabel>{formatEntryDate(entry.date)}</DateLabel>
                  {contentType && <TypeBadge $type={contentType}>{contentType}</TypeBadge>}
                </CardHeader>
                <CardImage>
                  <CardLabel>{entry.title}</CardLabel>
                </CardImage>
              </CalendarCard>
            );
          })}
        </CardsGrid>
      )}
    </Section>
  );
};

export default ContentCalendarPreview;
