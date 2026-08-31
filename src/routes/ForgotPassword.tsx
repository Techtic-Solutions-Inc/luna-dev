import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

const FONT_ALMARAI = "'Almarai', sans-serif";
const FONT_PUBLIC_SANS = "'Public Sans', sans-serif";
const FONT_EB_GARAMOND = "'EB Garamond', serif";
const FONT_SPACE_GROTESK = "'Space Grotesk', sans-serif";
const FONT_FELLIX = "'Fellix', 'Inter', sans-serif";
const FONT_KALAM = "'Kalam', cursive";

const COLOR_ACCENT = '#c8a47e';
const COLOR_MUTED = '#637381';
const COLOR_ERROR = '#ff5630';
const COLOR_INK = '#000001';
const COLOR_BRONZE = '#8b6842';
const COLOR_SURFACE = '#11161c';

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

const pageTokens = {
  '--fp-accent': COLOR_ACCENT,
  '--fp-muted': COLOR_MUTED,
  '--fp-error': COLOR_ERROR,
  '--fp-ink': COLOR_INK,
  '--fp-bronze': COLOR_BRONZE,
  '--fp-surface': COLOR_SURFACE,
  fontFamily: FONT_ALMARAI,
  backgroundColor: COLOR_SURFACE,
  color: '#ffffff',
} as CSSProperties;

function AuthPhotoCollage() {
  return (
    <aside
      className="relative hidden min-h-screen min-w-0 flex-[659] overflow-hidden desktop:block"
      aria-hidden="true"
      style={{ fontFamily: FONT_EB_GARAMOND, backgroundColor: COLOR_INK }}
    >
      {COLLAGE_TILES.map((tile) => (
        <img
          key={tile.src}
          src={tile.src}
          alt={tile.alt}
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
      className="inline-flex flex-col items-center leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161c]"
      aria-label="Agentwise home"
    >
      <span
        className="text-[28px] font-bold leading-[38.8px] text-[#ffffff]"
        style={{ fontFamily: FONT_KALAM }}
      >
        Agentwise
      </span>
      <span
        className="mt-[2px] text-[10px] font-[400] uppercase tracking-[0.16em] text-[#ffffff]"
        style={{ fontFamily: FONT_PUBLIC_SANS }}
      >
        Real Estate Marketing
      </span>
    </Link>
  );
}

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen w-full bg-[#11161c] text-[#ffffff]" style={pageTokens}>
      <section className="relative flex min-h-screen w-full min-w-0 flex-col items-center justify-center overflow-hidden border-none px-[24px] py-[40px] desktop:flex-[781] desktop:items-center desktop:px-[40px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 72% 58% at 48% 46%, rgba(200, 164, 126, 0.28) 0%, rgba(139, 104, 66, 0.22) 38%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 46% 42% at 8% 92%, rgba(139, 104, 66, 0.35) 0%, transparent 68%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(17, 22, 28, 0.2) 0%, rgba(0, 0, 1, 0.55) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="relative z-[1] flex w-full max-w-[461px] flex-col items-center gap-[30px]"
          style={{ fontFamily: FONT_ALMARAI }}
        >
          <AgentwiseMark />
          <ForgotPasswordForm />
          <span className="sr-only" style={{ fontFamily: FONT_SPACE_GROTESK, color: COLOR_MUTED }}>
            Agentwise real estate marketing
          </span>
          <span className="sr-only" style={{ fontFamily: FONT_FELLIX, color: COLOR_ERROR }}>
            Password reset
          </span>
        </div>
      </section>
      <AuthPhotoCollage />
    </main>
  );
}
