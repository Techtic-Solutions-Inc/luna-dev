/**
 * Luna generated support file
 * Role: frame shell
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
"use client";

import { useRef, type ReactNode } from "react";

import { FRAME_WIDTH, useFrameScale } from "./useFrameScale";

interface FigmaFrameShellProps {
  frameWidth?: number;
  frameHeight: number;
  nodeId: string;
  id?: string;
  className?: string;
  marginTopPx?: number;
  /** Figma box of the content that matters (the form, the copy). Below the tablet
   *  step the artboard is fitted to it instead of squeezing every box. */
  focus?: { x: number; y: number; w: number; h: number };
  children: ReactNode;
}

/**
 * Legacy artboard shell, only used when a frame has no auto-layout evidence.
 * SSR-safe: the outer box reserves its height with CSS aspect-ratio (no layout
 * shift) and the artboard stays hidden until the client has measured, so an
 * unscaled frame is never painted. Height is a minimum, never a clip.
 */
export function FigmaFrameShell({
  frameWidth = FRAME_WIDTH,
  frameHeight,
  nodeId,
  id,
  className = "",
  marginTopPx = 0,
  focus,
  children,
}: FigmaFrameShellProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scale, narrow, ready, width } = useFrameScale(frameWidth, outerRef);
  // Narrow screens: show the focus box at a readable size, centred, and let the
  // decoration around it be cropped, rather than crushing the whole frame.
  const fit = narrow && focus ? Math.min(1, (width - 32) / focus.w) : null;
  const offsetX = fit !== null && focus ? (width - focus.w * fit) / 2 - focus.x * fit : 0;
  const fluid = narrow && fit === null;

  return (
    <div
      ref={outerRef}
      id={id}
      className="w-full overflow-x-hidden min-w-0"
      style={{
        aspectRatio: narrow ? undefined : `${frameWidth} / ${frameHeight}`,
        minHeight: fit !== null ? frameHeight * fit : narrow ? frameHeight : ready ? frameHeight * scale : undefined,
        marginTop: marginTopPx * (fit !== null ? fit : narrow ? 1 : scale),
      }}
    >
      <section
        data-figma-node={nodeId}
        data-figma-fluid={fluid ? "true" : undefined}
        className={`relative box-border ${className}`}
        style={{
          width: fluid ? "100%" : frameWidth,
          minHeight: frameHeight,
          visibility: ready ? "visible" : "hidden",
          ["--fw" as string]: frameWidth,
          transform:
            fit !== null
              ? `translateX(${offsetX}px) scale(${fit})`
              : narrow
                ? undefined
                : `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </section>
    </div>
  );
}
