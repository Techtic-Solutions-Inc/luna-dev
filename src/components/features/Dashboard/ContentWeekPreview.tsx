import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { ContentCalendarEntry } from '../../../types/contentCalendar';
import { inferContentType, formatEntryDate } from './dashboardUtils';

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 31.32px;
  color: #ffffff;
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
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

const WeekGrid = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #383838;
    border-radius: 2px;
  }
`;

const DayColumn = styled.div`
  min-width: 140px;
  flex: 1;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  margin-bottom: 8px;
`;

const DayLabel = styled.span`
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

const ContentCard = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background: #232323;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2f271f 0%, #473e33 100%);
  display: flex;
  align-items: flex-end;
  padding: 10px;
`;

const CardLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 10px;
  font-weight: 300;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 4px 8px;
  backdrop-filter: blur(4px);
`;

const EmptyDay = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  background: #232323;
  border: 1px dashed #383838;
`;

const EmptyState = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #959595;
  margin: 0;
  text-align: center;
  padding: 24px;
  background: #232323;
  border-radius: 12px;
  border: 1px dashed #383838;
`;

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const;

interface ContentWeekPreviewProps {
  entries: ContentCalendarEntry[];
}

const ContentWeekPreview: React.FC<ContentWeekPreviewProps> = ({ entries }) => {
  const navigate = useNavigate();
  const weekEntries = entries.slice(0, 5);

  if (weekEntries.length === 0) {
    return (
      <Section aria-label="New content this week">
        <SectionHeader>
          <Title>New Content This Week</Title>
          <BrowseLink onClick={() => navigate('/content-calendar')} type="button">
            Browse all
          </BrowseLink>
        </SectionHeader>
        <EmptyState>No content scheduled for this week.</EmptyState>
      </Section>
    );
  }

  return (
    <Section aria-label="New content this week">
      <SectionHeader>
        <Title>New Content This Week</Title>
        <BrowseLink onClick={() => navigate('/content-calendar')} type="button">
          Browse all
        </BrowseLink>
      </SectionHeader>
      <WeekGrid>
        {DAYS.map((day, i) => {
          const entry = weekEntries[i];
          const contentType = entry ? inferContentType(entry) : '';
          return (
            <DayColumn key={day}>
              <DayHeader>
                <DayLabel>{entry ? formatEntryDate(entry.date) || day : day}</DayLabel>
                {contentType && <TypeBadge $type={contentType}>{contentType}</TypeBadge>}
              </DayHeader>
              {entry ? (
                <ContentCard>
                  <CardImage>
                    <CardLabel>{entry.title}</CardLabel>
                  </CardImage>
                </ContentCard>
              ) : (
                <EmptyDay />
              )}
            </DayColumn>
          );
        })}
      </WeekGrid>
    </Section>
  );
};

export default ContentWeekPreview;
