/**
 * Luna generated support file
 * Role: frame scale
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
"use client";

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

export const FRAME_WIDTH = 1440;

/** Tablet step: below this width the artboard is no longer scaled. */
export const NARROW_FIT_MAX_WIDTH = 768;

export type FrameScaleState = { scale: number; narrow: boolean; ready: boolean; width: number };

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useFrameScale(
  frameWidth: number,
  outerRef: RefObject<HTMLElement | null>,
): FrameScaleState {
  const [state, setState] = useState<FrameScaleState>({
    scale: 1,
    narrow: false,
    ready: false,
    width: frameWidth,
  });

  useIsoLayoutEffect(() => {
    const node = outerRef.current;
    if (!node || !frameWidth) {
      return;
    }
    const apply = () => {
      const width = node.clientWidth || frameWidth;
      const narrow = width <= NARROW_FIT_MAX_WIDTH;
      // Desktop: scale the artboard to the viewport. Narrow/tablet: scale=1
      // so type stays readable; figma-responsive.css remaps left/width from
      // --fx/--fww against --fw.
      setState({
        scale: narrow ? 1 : width / frameWidth,
        narrow,
        ready: true,
        width,
      });
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, [frameWidth, outerRef]);

  return state;
}
