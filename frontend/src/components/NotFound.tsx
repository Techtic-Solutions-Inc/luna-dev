import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-16);
  padding: var(--padding-40) 0;
`;

const Title = styled.h1`
  font-family: var(--font-heading-xl-42-family);
  font-size: var(--font-heading-xl-42-size);
  font-weight: var(--font-heading-xl-42-weight);
  line-height: var(--font-heading-xl-42-line-height);
  color: var(--text-primary);
`;

const Message = styled.p`
  color: var(--text-secondary);
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-10) var(--padding-16);
  border-radius: var(--radius-6);
  background: var(--accent);
  color: var(--color-16);
  font-family: var(--font-body-sm-29-family);
  font-size: var(--font-body-sm-29-size);
  font-weight: var(--font-body-sm-29-weight);
  line-height: var(--font-body-sm-29-line-height);

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const NotFound = () => (
  <Wrapper>
    <Title>Page not found</Title>
    <Message>The page you requested does not exist.</Message>
    <HomeLink to="/">Back to home</HomeLink>
  </Wrapper>
);

export default NotFound;
