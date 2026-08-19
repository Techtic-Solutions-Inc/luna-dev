import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0f0f0f;
`;

const FormPanel = styled.div`
  width: 480px;
  min-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
  position: relative;
  overflow-y: auto;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    min-width: 0;
    padding: 40px 24px;
  }
`;

const ImagePanel = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(140px, 1fr);
  gap: 4px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const ImageTile = styled.div<{ $url: string }>`
  background: url(${(p) => p.$url}) center / cover no-repeat;
  position: relative;
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
`;

const TileText = styled.span<{ $italic?: boolean }>`
  font-family: 'EB Garamond', serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  color: #ffffff;
  text-align: center;
  font-style: ${(p) => (p.$italic ? 'italic' : 'normal')};
`;

const TileCaption = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 4px;
`;

const tiles = [
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', text: '', caption: '' },
  { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop', text: "Who You're Working\nWith Matters.", caption: '', italic: true },
  { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', text: "There's less buyer\ncompetition right now.", caption: "You're not competing to other offers.", italic: true },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop', text: 'Everyone\'s waiting to buy\n"until the market is right..."', caption: '', italic: true },
  { url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop', text: '', caption: 'Rates change.' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', text: "but here's why moving now\ncould be the smarter move", caption: '', italic: false },
  { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop', text: "There's less buyer", caption: '', italic: true },
];

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Wrapper>
      <FormPanel>{children}</FormPanel>
      <ImagePanel>
        {tiles.map((tile, i) => (
          <ImageTile key={i} $url={tile.url}>
            {(tile.text || tile.caption) && (
              <TileOverlay>
                {tile.text && <TileText $italic={tile.italic}>{tile.text}</TileText>}
                {tile.caption && <TileCaption>{tile.caption}</TileCaption>}
              </TileOverlay>
            )}
          </ImageTile>
        ))}
      </ImagePanel>
    </Wrapper>
  );
}
