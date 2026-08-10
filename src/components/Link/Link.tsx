import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import styled from 'styled-components';

type LinkVariant = 'default' | 'button' | 'subtle';

interface BaseLinkProps {
  children: ReactNode;
  variant?: LinkVariant;
  className?: string;
}

type InternalLinkProps = BaseLinkProps &
  RouterLinkProps & {
    href?: never;
  };

type ExternalLinkProps = BaseLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: never;
  };

export type LinkProps = InternalLinkProps | ExternalLinkProps;

const sharedStyles = `
  font-family: inherit;
  font-weight: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
  transition: color 0.15s ease;

  &:focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
`;

const DefaultLink = styled.a<{ $variant: LinkVariant }>`
  ${sharedStyles}
  color: var(--color-text-link);

  &:hover {
    color: var(--color-brand-primary-hover);
  }

  ${({ $variant }) =>
    $variant === 'subtle'
      ? `
        color: var(--color-text-secondary);
        text-decoration: none;

        &:hover {
          color: var(--color-text-primary);
          text-decoration: underline;
        }
      `
      : ''}

  ${({ $variant }) =>
    $variant === 'button'
      ? `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0.75rem 1.25rem;
        border-radius: 0.75rem;
        background: var(--color-brand-primary);
        color: var(--color-text-inverse);
        text-decoration: none;
        font-weight: 600;

        &:hover {
          background: var(--color-brand-primary-hover);
          color: var(--color-text-inverse);
        }
      `
      : ''}
`;

const StyledRouterLink = styled(RouterLink)<{ $variant: LinkVariant }>`
  ${sharedStyles}
  color: var(--color-text-link);

  &:hover {
    color: var(--color-brand-primary-hover);
  }

  ${({ $variant }) =>
    $variant === 'subtle'
      ? `
        color: var(--color-text-secondary);
        text-decoration: none;

        &:hover {
          color: var(--color-text-primary);
          text-decoration: underline;
        }
      `
      : ''}

  ${({ $variant }) =>
    $variant === 'button'
      ? `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0.75rem 1.25rem;
        border-radius: 0.75rem;
        background: var(--color-brand-primary);
        color: var(--color-text-inverse);
        text-decoration: none;
        font-weight: 600;

        &:hover {
          background: var(--color-brand-primary-hover);
          color: var(--color-text-inverse);
        }
      `
      : ''}
`;

const Link = ({
  children,
  variant = 'default',
  className,
  ...rest
}: LinkProps) => {
  if ('to' in rest && rest.to) {
    const { to, ...routerRest } = rest;
    return (
      <StyledRouterLink
        to={to}
        $variant={variant}
        className={className}
        {...routerRest}
      >
        {children}
      </StyledRouterLink>
    );
  }

  const { href = '#', ...anchorRest } = rest as ExternalLinkProps;
  return (
    <DefaultLink
      href={href}
      $variant={variant}
      className={className}
      {...anchorRest}
    >
      {children}
    </DefaultLink>
  );
};

export default Link;
