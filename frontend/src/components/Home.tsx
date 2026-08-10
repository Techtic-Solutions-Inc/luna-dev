import styled from 'styled-components';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import Card from './ui/Card';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);
`;

const Heading = styled.h1`
  font-family: var(--font-heading-lg-44-family);
  font-size: var(--font-heading-lg-44-size);
  font-weight: var(--font-heading-lg-44-weight);
  line-height: var(--font-heading-lg-44-line-height);
  color: var(--text-primary);
`;

const Subtext = styled.p`
  color: var(--text-secondary);
  max-width: 40rem;
`;

const IconRow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: var(--gap-8);
  color: var(--accent);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-12);
`;

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <Intro>
        <Heading>Welcome</Heading>
        <Subtext>
          Manage your account profile and keep your details up to date.
        </Subtext>
        <IconRow>
          <FaBeer aria-hidden="true" />
          <span className="text-body-sm-2">Sofia design system is ready</span>
        </IconRow>
      </Intro>
      <Card>
        <Actions>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button type="button">Open profile</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button type="button">Sign in</Button>
            </Link>
          )}
        </Actions>
      </Card>
    </Page>
  );
};

export default Home;
