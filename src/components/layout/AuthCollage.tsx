import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';

const collageImages = {
  tile1: '/images/auth-collage/tile-1.png',
  tile2: '/images/auth-collage/tile-2.png',
  tile3: '/images/auth-collage/tile-3.png',
  tile4: '/images/auth-collage/tile-4.png',
  tile5: '/images/auth-collage/tile-5.png',
} as const;

const Grid = styled.aside`
  display: none;
  height: 100vh;
  overflow: hidden;
  background: var(--color-16);

  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    grid-template-rows: 18vh 22vh 28vh 32vh;
    gap: ${tokens.spacing['gap-8']};
    padding: ${tokens.spacing['padding-8']};
  }
`;

const Shot = styled.figure<{ $src: string; $row: string; $col: string }>`
  margin: 0;
  position: relative;
  overflow: hidden;
  grid-row: ${(props) => props.$row};
  grid-column: ${(props) => props.$col};
  background: var(--color-36) url(${(props) => props.$src}) center / cover no-repeat;
`;

const Caption = styled.figcaption`
  position: absolute;
  inset: ${tokens.spacing['padding-16']};
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-lg-74'].fontFamily}, serif;
  font-size: ${tokens.typography['caption-101'].fontSize};
  font-weight: ${tokens.typography['heading-lg-74'].fontWeight};
  line-height: ${tokens.typography['heading-md-84'].lineHeight};
  text-shadow: ${tokens.shadows['drop-shadow-11'].css};
`;

const AuthCollage = () => (
  <Grid aria-hidden="true">
    <Shot $src={collageImages.tile1} $row="1 / 3" $col="1 / 2" />
    <Shot $src={collageImages.tile2} $row="1 / 2" $col="2 / 3">
      <Caption>
        There&apos;s less buyer competition right now. You&apos;re not fighting 10 other offers.
      </Caption>
    </Shot>
    <Shot $src={collageImages.tile3} $row="2 / 4" $col="2 / 3">
      <Caption>Who You&apos;re Working With Matters.</Caption>
    </Shot>
    <Shot $src={collageImages.tile4} $row="3 / 5" $col="1 / 2">
      <Caption>
        Everyone&apos;s waiting to buy &apos;until the market is right...&apos; but here&apos;s why
        moving now could be the smarter move.
      </Caption>
    </Shot>
    <Shot $src={collageImages.tile5} $row="4 / 5" $col="2 / 3" />
  </Grid>
);

export default AuthCollage;
