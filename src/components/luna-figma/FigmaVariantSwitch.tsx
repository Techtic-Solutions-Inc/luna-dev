/**
 * Luna generated support file
 * Role: variant switch
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/**
 * Figma ON_CLICK "Change to" (CHANGE_TO) between variants of one component:
 * a kebab that opens its menu, a chip that becomes selected, a row that
 * expands. Luna compiles each destination variant and renders it here.
 */
type VariantContextValue = {
  base: string;
  variant: string;
  setVariant: (id: string) => void;
};

const FigmaVariantContext = createContext<VariantContextValue | null>(null);

interface FigmaVariantSwitchProps {
  base: string;
  variants: Record<string, ReactNode>;
  /** Variants that close on outside click / Escape (menus, popovers). */
  dismissible?: string[];
  children: ReactNode;
}

export function FigmaVariantSwitch({ base, variants, dismissible = [], children }: FigmaVariantSwitchProps) {
  const [variant, setVariant] = useState(base);
  const ref = useRef<HTMLDivElement>(null);
  const closable = variant !== base && dismissible.includes(variant);

  useEffect(() => {
    if (!closable) {
      return;
    }
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setVariant(base);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVariant(base);
      }
    };
    // A pinned popover would drift on scroll: close it instead.
    const onScroll = () => setVariant(base);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [closable, base]);

  // Menus drawn outside the card escape clipping lists while open.
  useLayoutEffect(() => {
    if (!closable || !ref.current) {
      return;
    }
    ref.current.querySelectorAll<HTMLElement>("[data-figma-popover]").forEach((el) => {
      const box = el.getBoundingClientRect();
      el.style.position = "fixed";
      el.style.left = `${box.left}px`;
      el.style.top = `${box.top}px`;
      el.style.width = `${box.width}px`;
      el.style.zIndex = "60";
    });
  }, [closable, variant]);

  const shown = variant === base ? children : (variants[variant] ?? children);
  return (
    <FigmaVariantContext.Provider value={{ base, variant, setVariant }}>
      <div ref={ref} className="contents" data-figma-variant={variant}>
        {shown}
      </div>
    </FigmaVariantContext.Provider>
  );
}

/** Click binding for a CHANGE_TO trigger. Clicking the active target goes back. */
export function figmaVariantProps(destination: string) {
  const ctx = useContext(FigmaVariantContext);
  return {
    "aria-expanded": ctx ? ctx.variant === destination : undefined,
    "data-figma-variant-target": destination,
    onClick: (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!ctx) {
        return;
      }
      ctx.setVariant(ctx.variant === destination ? ctx.base : destination);
    },
  };
}
