import styled from 'styled-components';
import { FiDownload, FiFileText, FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import type { DashboardAnalytics } from '../../../types/dashboard';

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #232323;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #959595;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ArrowIcon = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #959595;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #c8a47e;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: -2px;
  }
`;

const StatValue = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 46.98px;
  color: #ffffff;
`;

interface StatsCardsProps {
  analytics: DashboardAnalytics;
}

function resolveDownloads(analytics: DashboardAnalytics): number | null {
  if (typeof analytics.downloads === 'number') return analytics.downloads;
  if (typeof analytics.total_downloads === 'number') return analytics.total_downloads;
  return null;
}

function resolveContentGenerated(analytics: DashboardAnalytics): number | null {
  if (typeof analytics.content_generated === 'number') return analytics.content_generated;
  if (typeof analytics.total_content_generated === 'number') return analytics.total_content_generated;
  return null;
}

const StatsCards: React.FC<StatsCardsProps> = ({ analytics }) => {
  const navigate = useNavigate();
  const downloads = resolveDownloads(analytics);
  const contentGenerated = resolveContentGenerated(analytics);

  return (
    <Grid aria-label="Dashboard statistics">
      <Card>
        <CardHeader>
          <CardLabel>
            <FiDownload aria-hidden="true" />
            Downloads
          </CardLabel>
          <ArrowIcon
            aria-label="View all downloads"
            type="button"
            onClick={() => navigate('/profile/downloads')}
          >
            <FiArrowUpRight size={16} />
          </ArrowIcon>
        </CardHeader>
        <StatValue>{downloads !== null ? downloads.toLocaleString() : '—'}</StatValue>
      </Card>
      <Card>
        <CardHeader>
          <CardLabel>
            <FiFileText aria-hidden="true" />
            Content Generated
          </CardLabel>
          <ArrowIcon
            aria-label="View all content generated"
            type="button"
            onClick={() => navigate('/profile/content-generated')}
          >
            <FiArrowUpRight size={16} />
          </ArrowIcon>
        </CardHeader>
        <StatValue>{contentGenerated !== null ? contentGenerated.toLocaleString() : '—'}</StatValue>
      </Card>
    </Grid>
  );
};

export default StatsCards;
