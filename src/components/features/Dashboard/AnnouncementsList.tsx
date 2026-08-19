import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiVolume2 } from 'react-icons/fi';
import type { DashboardAnnouncement } from '../../../types/dashboard';
import { formatRelativeTime } from './dashboardUtils';

const Panel = styled.section`
  background: #232323;
  border-radius: 12px;
  padding: 20px 24px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h2`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  color: #ffffff;
  margin: 0;
`;

const ViewAllLink = styled.button`
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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #383838;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const ItemTitle = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #e0e0e0;
  flex: 1;
  min-width: 0;
`;

const ItemTime = styled.time`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
  white-space: nowrap;
`;

const EmptyState = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #959595;
  margin: 0;
  text-align: center;
  padding: 16px 0;
`;

interface AnnouncementsListProps {
  announcements: DashboardAnnouncement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  const navigate = useNavigate();
  const items = announcements.slice(0, 5);

  return (
    <Panel aria-label="Announcements">
      <PanelHeader>
        <HeaderLeft>
          <FiVolume2 size={16} color="#c8a47e" aria-hidden="true" />
          <Title>Announcements</Title>
        </HeaderLeft>
        <ViewAllLink type="button" onClick={() => navigate('/announcements')}>
          View all
        </ViewAllLink>
      </PanelHeader>

      {items.length === 0 ? (
        <EmptyState>No announcements at this time.</EmptyState>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ItemTitle>{item.announcement_title || item.title}</ItemTitle>
              <ItemTime dateTime={item.created_at}>{formatRelativeTime(item.created_at)}</ItemTime>
            </ListItem>
          ))}
        </List>
      )}
    </Panel>
  );
};

export default AnnouncementsList;
