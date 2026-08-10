import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAboutContent } from '../../../hooks/useAboutContent';

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-16) var(--gap-24);
`;

const InternalLink = styled(Link)`
  font-family: var(--font-body-sm-111-family);
  font-size: var(--font-body-sm-111-size);
  font-weight: var(--font-body-sm-111-weight);
  line-height: var(--font-body-sm-111-line-height);
  color: var(--color-55);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const ExternalLink = styled.a`
  font-family: var(--font-body-sm-111-family);
  font-size: var(--font-body-sm-111-size);
  font-weight: var(--font-body-sm-111-weight);
  line-height: var(--font-body-sm-111-line-height);
  color: var(--color-55);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const isInternalPath = (href: string): boolean => href.startsWith('/');

const LegalLinks = () => {
  const { data, isLoading, error } = useAboutContent();

  if (isLoading || error) {
    return null;
  }

  const links = data?.legal_links ?? [];

  if (links.length === 0) {
    return null;
  }

  return (
    <Nav aria-label="Legal">
      {links.map((link) =>
        isInternalPath(link.href) ? (
          <InternalLink key={`${link.label}-${link.href}`} to={link.href}>
            {link.label}
          </InternalLink>
        ) : (
          <ExternalLink
            key={`${link.label}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </ExternalLink>
        ),
      )}
    </Nav>
  );
};

export default LegalLinks;
