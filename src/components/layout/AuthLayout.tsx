import styled from 'styled-components';
import type { ReactNode } from 'react';
import { breakpoints } from '../../theme/breakpoints';
import { typographyStyle } from '../../theme/typography';

const Page = styled.div<{ $singleColumn?: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${({ $singleColumn }) => ($singleColumn ? '1fr' : '1fr 1fr')};
  background: radial-gradient(circle at 30% 20%, var(--color-50) 0%, var(--color-23) 45%, var(--color-16) 100%);

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormColumn = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-40) var(--padding-24);

  @media (max-width: ${breakpoints.mobile}) {
    padding: var(--padding-16);
  }
`;

const FormInner = styled.div<{ $narrow?: boolean }>`
  width: 100%;
  max-width: ${({ $narrow }) => ($narrow ? '640px' : '480px')};
  display: flex;
  flex-direction: column;
  gap: var(--padding-24);
`;

const CollageColumn = styled.aside`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  min-height: 100vh;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const CollageTile = styled.img<{ $rowSpan?: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-row: span ${({ $rowSpan }) => $rowSpan ?? 1};
`;

export const LogoScript = styled.div`
  ${typographyStyle('heading-xl-89')}
  color: var(--secondary);
  text-align: center;
  line-height: 1;
`;

export const LogoTagline = styled.p`
  ${typographyStyle('caption-4')}
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--secondary);
  text-align: center;
  margin: var(--padding-8) 0 0;
`;

export const AuthHeading = styled.h1`
  ${typographyStyle('heading-lg-57')}
  color: var(--secondary);
  text-align: center;
  margin: 0;
`;

export const AuthSubheading = styled.p`
  ${typographyStyle('body-sm-2')}
  color: var(--color-93);
  text-align: center;
  margin: 0;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--padding-16);
`;

export const AuthFooter = styled.p`
  ${typographyStyle('body-sm-2')}
  color: var(--color-93);
  text-align: center;
  margin: 0;

  a {
    color: var(--accent);
    text-decoration: none;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }
`;

export const InlineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--padding-12);
  flex-wrap: wrap;
`;


type AuthLayoutProps = {
  children: ReactNode;
  singleColumn?: boolean;
  narrow?: boolean;
  showCollage?: boolean;
};

export default function AuthLayout({
  children,
  singleColumn = false,
  narrow = false,
  showCollage = true,
}: AuthLayoutProps) {
  return (
    <Page $singleColumn={singleColumn || !showCollage}>
      <FormColumn>
        <FormInner $narrow={narrow || singleColumn}>{children}</FormInner>
      </FormColumn>
      {!singleColumn && showCollage ? (
        <CollageColumn aria-hidden>
          <CollageTile src="/images/auth-collage/tile-1.png" alt="" />
          <CollageTile src="/images/auth-collage/tile-2.png" alt="" $rowSpan={2} />
          <CollageTile src="/images/auth-collage/tile-3.png" alt="" />
          <CollageTile src="/images/auth-collage/tile-4.png" alt="" />
          <CollageTile src="/images/auth-collage/tile-5.png" alt="" />
        </CollageColumn>
      ) : null}
    </Page>
  );
}

export function AuthBrand() {
  return (
    <div>
      <LogoScript>Agentwise</LogoScript>
      <LogoTagline>Real Estate Marketing</LogoTagline>
    </div>
  );
}
