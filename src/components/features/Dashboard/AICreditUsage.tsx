import styled from 'styled-components';

const CreditBox = styled.div`
  margin: 0 12px 12px;
  padding: 12px;
  background: #232323;
  border-radius: 10px;
`;

const CreditTitle = styled.div`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #959595;
  margin-bottom: 4px;
`;

const CreditRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CreditLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #e0e0e0;
`;

const CreditValue = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #e0e0e0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #383838;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: #c8a47e;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

interface AICreditUsageProps {
  used: number;
  total: number;
}

const AICreditUsage: React.FC<AICreditUsageProps> = ({ used, total }) => {
  const percent = total > 0 ? (used / total) * 100 : 0;

  return (
    <CreditBox aria-label="AI credit usage">
      <CreditTitle>AI Credit Usage</CreditTitle>
      <CreditRow>
        <CreditLabel>Current</CreditLabel>
        <CreditValue>
          {used.toLocaleString()} / {total.toLocaleString()}
        </CreditValue>
      </CreditRow>
      <ProgressBar role="progressbar" aria-valuenow={used} aria-valuemin={0} aria-valuemax={total}>
        <ProgressFill $percent={percent} />
      </ProgressBar>
    </CreditBox>
  );
};

export default AICreditUsage;
