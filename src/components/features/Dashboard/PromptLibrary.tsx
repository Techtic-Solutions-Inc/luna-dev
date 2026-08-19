import styled from 'styled-components';
import { FiFileText } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const Panel = styled.section`
  background: #232323;
  border-radius: 12px;
  padding: 20px 24px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  color: #ffffff;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromptItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a19;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: #2f271f;
  }

  &:focus-within {
    outline: 2px solid #c8a47e;
    outline-offset: -2px;
  }
`;

const TypeTag = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #959595;
  background: #383838;
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
`;

const PromptText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #e0e0e0;
  flex: 1;
  min-width: 0;
`;

const PROMPTS = [
  { type: 'Post', text: 'What should I post this week to stand out in Austin?' },
  { type: 'Reel', text: 'Write a Reel script for a new listing in [Neighborhood].' },
  { type: 'Caption', text: 'Give me 5 caption options for this property photo.' },
  { type: 'Email', text: 'Turn this open house into an email invite.' },
] as const;

const PromptLibrary: React.FC = () => (
  <Panel aria-label="Prompt library">
    <PanelHeader>
      <FiFileText size={16} color="#c8a47e" aria-hidden="true" />
      <Title>Prompt Library</Title>
    </PanelHeader>
    <List>
      {PROMPTS.map((prompt) => (
        <PromptItem key={prompt.text} tabIndex={0} role="button" aria-label={prompt.text}>
          <TypeTag>{prompt.type}</TypeTag>
          <HiOutlineSparkles size={14} color="#c8a47e" aria-hidden="true" />
          <PromptText>{prompt.text}</PromptText>
        </PromptItem>
      ))}
    </List>
  </Panel>
);

export default PromptLibrary;
