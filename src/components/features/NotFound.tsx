import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';
import { TextLink } from '../ui/LinkText';

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--padding-16);
  padding: var(--padding-40);
  background: var(--color-29);
  text-align: center;
`;

const Title = styled.h1`
  ${typographyStyle('heading-lg-47')}
  margin: 0;
`;

const Text = styled.p`
  ${typographyStyle('body-sm-37')}
  margin: 0;
  color: var(--color-57);
`;

export default function NotFound() {
  return (
    <Wrap>
      <Title>Page not found</Title>
      <Text>The page you requested does not exist.</Text>
      <TextLink to="/">Go home</TextLink>
    </Wrap>
  );
}
