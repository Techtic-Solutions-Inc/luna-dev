import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const FRAME_Y = 616;
const COLLAGE_X = 781;

const COLLAGE_TILES = [
  {
    src: '/assets/figma/version-1-2-3-1091-254.png',
    alt: 'VERSION 1 (2) 3',
    x: 781,
    y: 0,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-2-2-1091-248.png',
    alt: 'VERSION 1 (2) 2',
    x: 1110,
    y: 179,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-5-1091-255.png',
    alt: 'VERSION 1 (6) 5',
    x: 781,
    y: 408,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-1-1091-249.png',
    alt: 'VERSION 1 (6) 1',
    x: 1110,
    y: 588,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-6-1091-256.png',
    alt: 'VERSION 1 (6) 6',
    x: 781,
    y: 817,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-2-1091-250.png',
    alt: 'VERSION 1 (6) 2',
    x: 1110,
    y: 996,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-7-1091-257.png',
    alt: 'VERSION 1 (6) 7',
    x: 781,
    y: 1226,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-3-1091-251.png',
    alt: 'VERSION 1 (6) 3',
    x: 1110,
    y: 1405,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-8-1091-258.png',
    alt: 'VERSION 1 (6) 8',
    x: 781,
    y: 1634,
    w: 320,
    h: 400,
  },
  {
    src: '/assets/figma/version-1-6-4-1091-252.png',
    alt: 'VERSION 1 (6) 4',
    x: 1110,
    y: 1814,
    w: 320,
    h: 400,
  },
] as const;

function AuthPhotoCollage() {
  return (
    <aside
      className="relative hidden min-h-[420px] min-w-0 flex-[659] overflow-hidden bg-sofia-color-101 tablet:block tablet:min-h-screen"
      aria-hidden="true"
    >
      {COLLAGE_TILES.map((tile) => (
        <img
          key={tile.src}
          src={tile.src}
          alt=""
          width={tile.w}
          height={tile.h}
          className="absolute max-w-none object-cover"
          style={{
            left: tile.x - COLLAGE_X,
            top: tile.y - FRAME_Y,
            width: tile.w,
            height: tile.h,
          }}
        />
      ))}
    </aside>
  );
}

function AgentwiseMark() {
  return (
    <Link
      to="/home"
      className="inline-flex flex-col items-center leading-none text-sofia-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-101"
      aria-label="Agentwise home"
    >
      <span className="font-kalam text-heading-lg-102">Agentwise</span>
      <span className="mt-[2px] font-public-sans text-[10px] font-[400] uppercase tracking-[0.16em]">
        Real Estate Marketing
      </span>
    </Link>
  );
}

interface AuthShellProps {
  children: ReactNode;
  paneClassName?: string;
}

export default function AuthShell({ children, paneClassName }: AuthShellProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-sofia-color-101 text-sofia-secondary tablet:flex-row">
      <section
        className={cn(
          'relative flex min-h-screen w-full min-w-0 flex-col items-center justify-center overflow-hidden border-none bg-gradient-to-b from-sofia-color-26 to-sofia-color-25 p-[40px] font-almarai tablet:flex-[781]',
          paneClassName,
        )}
      >
        <div className="flex w-full max-w-[461px] flex-col items-center gap-[30px]">
          <AgentwiseMark />
          {children}
        </div>
      </section>
      <AuthPhotoCollage />
    </main>
  );
}
