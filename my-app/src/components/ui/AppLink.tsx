import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import styled from 'styled-components';

type LinkVariant = 'primary' | 'secondary' | 'inline';

interface StyledLinkProps {
  $variant: LinkVariant;
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : theme.colors.secondary};
  text-decoration: ${({ $variant }) => ($variant === 'inline' ? 'underline' : 'none')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const ExternalLink = styled.a<StyledLinkProps>`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : theme.colors.secondary};
  text-decoration: ${({ $variant }) => ($variant === 'inline' ? 'underline' : 'none')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

interface AppLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  variant?: LinkVariant;
  external?: boolean;
}

const AppLink = ({ to, variant = 'inline', external = false, children, ...props }: AppLinkProps) => {
  if (external || to.startsWith('http')) {
    return (
      <ExternalLink href={to} $variant={variant} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <StyledLink to={to} $variant={variant} {...props}>
      {children}
    </StyledLink>
  );
};

export default AppLink;
