import styled from 'styled-components';
import { FiBell } from 'react-icons/fi';
import type { DashboardAnnouncement } from '../../../types/dashboard';

const Card = styled.section`
  background: #232323;
  border-radius: 12px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderIcon = styled.span`
  color: #c8a47e;
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 26.1px;
  color: #ffffff;
  margin: 0;
`;

const ViewAll = styled.button`
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
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #383838;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemTitle = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.624px;
  color: #e0e0e0;
`;

const ItemDate = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
  flex-shrink: 0;
  margin-left: 12px;
`;

const EmptyMessage = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  color: #959595;
  text-align: center;
  padding: 20px 0;
  margin: 0;
`;

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface AnnouncementsListProps {
  announcements: DashboardAnnouncement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => (
  <Card aria-label="Announcements">
    <Header>
      <HeaderLeft>
        <HeaderIcon>
          <FiBell />
        </HeaderIcon>
        <Title>Announcements</Title>
      </HeaderLeft>
      <ViewAll type="button">View all</ViewAll>
    </Header>
    {announcements.length === 0 ? (
      <EmptyMessage>No announcements at the moment</EmptyMessage>
    ) : (
      <List>
        {announcements.map((a) => (
          <ListItem key={a.id}>
            <ItemTitle>{a.announcement_title}</ItemTitle>
            <ItemDate>{formatRelativeDate(a.created_at)}</ItemDate>
          </ListItem>
        ))}
      </List>
    )}
  </Card>
);

export default AnnouncementsList;
