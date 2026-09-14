import { HOME_MASK_IMAGE } from './constants';

/**
 * Mask group — Home screen section 1/8 (Figma node 2289:17290).
 * Background overlay; does not affect document flow.
 * Children: Ld0PDcExWUGrmN6c7l8cvcjcsJk 1 (frame), Rectangle 2 (fill).
 */
export function MaskGroupSection() {
  return (
    <section
      className="pointer-events-none absolute inset-0 z-0 w-full"
      aria-hidden="true"
      data-figma-node="2289:17290"
    >
      <div className="home-mask-group relative grid h-full w-full grid-cols-1 grid-rows-1">
        <div
          className="relative col-start-1 row-start-1 h-full w-full bg-home-background"
          data-figma-node="Rectangle 2"
        />
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
      </div>
    </section>
  );
}
