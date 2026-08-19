import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  margin-bottom: 16px;
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

const ToolCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #232323;
  border-radius: 12px;
  padding: 20px 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ToolIcon = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background: #2f271f;
  border: 1px solid #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Kalam', cursive;
  font-size: 22px;
  font-weight: 700;
  color: #c8a47e;
`;

const ToolContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToolTitle = styled.h3`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  color: #ffffff;
  margin: 0 0 4px;
`;

const ToolDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #959595;
  margin: 0;
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #c8a47e;
  border: 1px solid #c8a47e;
  border-radius: 50px;
  padding: 10px 20px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(200, 164, 126, 0.12);
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ToolsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Section aria-label="Your tools">
      <SectionHeader>
        <Title>Your Tools</Title>
        <Subtitle>Two places to do the work</Subtitle>
      </SectionHeader>
      <ToolCard>
        <ToolIcon aria-hidden="true">a</ToolIcon>
        <ToolContent>
          <ToolTitle>Agentwise Ultimate Mind</ToolTitle>
          <ToolDescription>
            Your AI advisor for real estate marketing — strategy, content, and client communication.
          </ToolDescription>
        </ToolContent>
        <StartButton type="button" onClick={() => navigate('/ultimate-mind')} aria-label="Start Ultimate Mind session">
          Start a session
          <FiArrowUpRight />
        </StartButton>
      </ToolCard>
    </Section>
  );
};

export default ToolsSection;
