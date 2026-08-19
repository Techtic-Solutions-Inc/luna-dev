import styled from 'styled-components';
import { HiOutlineSparkles } from 'react-icons/hi2';

const Card = styled.section`
  background: #232323;
  border-radius: 12px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
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

const PromptList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PromptItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PromptLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #c8a47e;
`;

const PromptRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SparkleIcon = styled.span`
  color: #c8a47e;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PromptText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #e0e0e0;
`;

const PROMPTS = [
  'What should I post this week to stand out in Austin?',
  'Draft a positioning statement for my luxury buyer niche.',
  'How do I price the new Travis Heights listing?',
  'Build me a 30-day content plan around relocations.',
];

const PromptLibrary: React.FC = () => (
  <Card aria-label="Prompt library">
    <Header>
      <HeaderIcon>
        <HiOutlineSparkles />
      </HeaderIcon>
      <Title>Prompt Library</Title>
    </Header>
    <PromptList>
      {PROMPTS.map((prompt) => (
        <PromptItem key={prompt}>
          <PromptLabel>Post</PromptLabel>
          <PromptRow>
            <SparkleIcon aria-hidden="true">
              <HiOutlineSparkles />
            </SparkleIcon>
            <PromptText>{prompt}</PromptText>
          </PromptRow>
        </PromptItem>
      ))}
    </PromptList>
  </Card>
);

export default PromptLibrary;
