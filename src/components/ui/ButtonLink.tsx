import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { buttonChromeStyles, type ButtonShape, type ButtonVariant } from './buttonChrome';

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  children: ReactNode;
};

const StyledLink = styled(Link)<{ $variant: ButtonVariant; $shape: ButtonShape }>`
  text-decoration: none;
  ${buttonChromeStyles}
`;

/** Link-compatible CTA sharing Button chrome via buttonChromeStyles. */
export default function ButtonLink({
  variant = 'accent',
  shape = 'rounded',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <StyledLink $variant={variant} $shape={shape} {...rest}>
      {children}
    </StyledLink>
  );
}
