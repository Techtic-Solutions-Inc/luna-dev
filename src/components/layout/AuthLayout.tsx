/**
 * AuthLayout visual source of truth: Sign In Figma (dark full-bleed split + collage),
 * not the written color32 / secondary-card / dropShadow11 / 520px token table.
 * Keep this split until product explicitly reverts to the card mapping.
 */
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type AuthLayoutProps = {
  children: ReactNode;
  showCollageOverlays?: boolean;
};

const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  min-height: 100vh;
  background: ${colors.color16};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormPane = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.padding40} ${spacing.padding24};
  background:
    radial-gradient(ellipse 70% 55% at 50% 45%, ${colors.color50}cc 0%, transparent 70%),
    ${colors.color16};
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.padding32} ${spacing.padding16};
  }
`;

const FormInner = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap24};
`;

const CollagePane = styled.aside`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: ${colors.color20};

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const CollageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.1fr 1fr 1.15fr;
  gap: 2px;
  height: 100%;
  min-height: 100vh;
`;

const Tile = styled.div<{ $src: string; $span?: boolean }>`
  position: relative;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  min-height: 180px;
  ${({ $span }) => ($span ? 'grid-row: span 2;' : '')}
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${spacing.padding20};
  background: linear-gradient(180deg, transparent 35%, ${colors.color58} 100%);
  color: ${colors.secondary};
`;

const OverlayTitle = styled.p`
  margin: 0;
  ${typographyStyle('headingLg74')}
  color: ${colors.secondary};
`;

const OverlayBody = styled.p`
  margin: ${spacing.gap8} 0 0;
  ${typographyStyle('caption4')}
  color: ${colors.color54};
`;

const TILES = [
  {
    src: '/images/auth-collage/tile-1.png',
    span: false,
    title: '',
    body: '',
  },
  {
    src: '/images/auth-collage/tile-2.png',
    span: false,
    title: "Who You're Working With Matters.",
    body: '',
  },
  {
    src: '/images/auth-collage/tile-3.png',
    span: false,
    title: '',
    body: "There's less buyer competition right now. You're not fighting 10 other offers.",
  },
  {
    src: '/images/auth-collage/tile-4.png',
    span: true,
    title: "Everyone's waiting to buy until the market is right...",
    body: "but here's why moving now could be the smarter move",
  },
  {
    src: '/images/auth-collage/tile-5.png',
    span: false,
    title: '',
    body: '',
  },
] as const;

export default function AuthLayout({ children, showCollageOverlays = true }: AuthLayoutProps) {
  return (
    <Page>
      <FormPane>
        <FormInner>{children}</FormInner>
      </FormPane>
      <CollagePane aria-hidden="true">
        <CollageGrid>
          {TILES.map((tile) => (
            <Tile key={tile.src} $src={tile.src} $span={tile.span}>
              {showCollageOverlays && (tile.title || tile.body) ? (
                <TileOverlay>
                  {tile.title ? <OverlayTitle>{tile.title}</OverlayTitle> : null}
                  {tile.body ? <OverlayBody>{tile.body}</OverlayBody> : null}
                </TileOverlay>
              ) : null}
            </Tile>
          ))}
        </CollageGrid>
      </CollagePane>
    </Page>
  );
}
