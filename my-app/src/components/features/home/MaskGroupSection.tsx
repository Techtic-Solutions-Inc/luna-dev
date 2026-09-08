import { cn } from '@/lib/utils';
import { HOME_MASK_IMAGE } from './constants';

/**
 * Mask group — Home screen section 1/12 (Figma node 2289:17290).
 * Children: Ld0PDcExWUGrmN6c7l8cvcjcsJk 1 (frame), Rectangle 2 (fill).
 */
export function MaskGroupSection({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-mask-group relative w-full', className)}
      aria-hidden="true"
      data-figma-node="2289:17290"
    >
      <div className="relative grid w-full grid-cols-1 grid-rows-1">
        <div
          className="relative col-start-1 row-start-1 w-full"
          data-figma-node="Ld0PDcExWUGrmN6c7l8cvcjcsJk 1"
        >
          <img
            src={HOME_MASK_IMAGE}
            alt=""
            className="relative block h-auto w-full"
            decoding="async"
          />
        </div>
        <div
          className="relative col-start-1 row-start-1 h-full w-full bg-home-background"
          data-figma-node="Rectangle 2"
        />
      </div>
    </section>
  );
}
