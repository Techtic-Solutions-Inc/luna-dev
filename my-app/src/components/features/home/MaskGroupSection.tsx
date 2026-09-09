import { cn } from '@/lib/utils';
import {
  frameRelativeLengthCapped,
  HOME_MASK_FRAME_EXPORT,
  HOME_MASK_OVERLAY_LAYOUT,
} from '@/theme/screens/home';
import { HOME_MASK_IMAGE } from './constants';

const maskFrameHeight = frameRelativeLengthCapped(HOME_MASK_FRAME_EXPORT.height);

const overlayStyle = {
  top: frameRelativeLengthCapped(HOME_MASK_OVERLAY_LAYOUT.top),
  left: frameRelativeLengthCapped(HOME_MASK_OVERLAY_LAYOUT.left),
  width: frameRelativeLengthCapped(HOME_MASK_OVERLAY_LAYOUT.width),
  height: frameRelativeLengthCapped(HOME_MASK_OVERLAY_LAYOUT.height),
} as const;

/**
 * Mask group — Home screen section 1/12 (Figma node 2289:17290).
 * Layered frame, rectangles, and Figma photographic asset per node tree.
 */
export function MaskGroupSection({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-mask-group block w-full', className)}
      aria-hidden="true"
      data-figma-node="2289:17290"
    >
      <div
        className="relative grid w-full grid-cols-1 grid-rows-1"
        style={{ minHeight: maskFrameHeight }}
      >
        <div
          className="col-start-1 row-start-1 w-full bg-[var(--home-mask-base)]"
          style={{ minHeight: maskFrameHeight }}
          data-figma-node="Rectangle 34624214"
        />
        <div
          className="relative col-start-1 row-start-1 w-full overflow-hidden"
          style={{ minHeight: maskFrameHeight }}
          data-figma-node="Ld0PDcExWUGrmN6c7l8cvcjcsJk 1"
        >
          <img
            src={HOME_MASK_IMAGE}
            alt=""
            className="block h-auto w-full object-cover object-center"
            decoding="async"
          />
          <div
            className="home-mask-group__overlay pointer-events-none absolute rounded-[var(--radius-535-value)] bg-[var(--home-mask-overlay)]"
            style={overlayStyle}
            data-figma-node="Rectangle 34624219"
          />
        </div>
        <div
          className="col-start-1 row-start-1 w-full bg-home-background mix-blend-multiply"
          style={{ minHeight: maskFrameHeight }}
          data-figma-node="Rectangle 2"
        />
      </div>
    </section>
  );
}
