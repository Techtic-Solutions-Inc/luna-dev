import AppShell from '../../layout/AppShell';
import { useDashboard } from '../../../hooks/useDashboard';
import Spinner from '../../ui/Spinner';
import GreetingBanner from './GreetingBanner';
import ContentWeekPreview from './ContentWeekPreview';
import StatsCards from './StatsCards';
import ToolsSection from './ToolsSection';
import ContentCalendarPreview from './ContentCalendarPreview';
import AnnouncementsList from './AnnouncementsList';
import PromptLibrary from './PromptLibrary';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background: #1a1a19;
  min-height: 100vh;
  padding: 32px 40px;
  color: #e0e0e0;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const ErrorText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  color: #959595;
`;

const RetryButton = styled.button`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1a1a19;
  background: #c8a47e;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardPage: React.FC = () => {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) {
    return (
      <AppShell>
        <PageWrapper>
          <Spinner />
        </PageWrapper>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <PageWrapper>
          <ErrorWrapper>
            <ErrorText>{error}</ErrorText>
            <RetryButton onClick={refetch}>Retry</RetryButton>
          </ErrorWrapper>
        </PageWrapper>
      </AppShell>
    );
  }

  if (!data) {
    return (
      <AppShell>
        <PageWrapper>
          <ErrorWrapper>
            <ErrorText>No dashboard data available</ErrorText>
          </ErrorWrapper>
        </PageWrapper>
      </AppShell>
    );
  }

  const { user, announcements, calendar_entries } = data;

  return (
    <AppShell>
      <PageWrapper>
        <GreetingBanner
          firstName={user.first_name}
          announcements={announcements}
        />
        <ContentWeekPreview entries={calendar_entries} />
        <StatsCards />
        <ToolsSection />
        <ContentCalendarPreview entries={calendar_entries} />
        <BottomGrid>
          <PromptLibrary />
          <AnnouncementsList announcements={announcements} />
        </BottomGrid>
      </PageWrapper>
    </AppShell>
  );
};

export default DashboardPage;
