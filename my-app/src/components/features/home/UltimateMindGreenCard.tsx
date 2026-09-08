import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface UltimateMindGreenCardProps {
  children: ReactNode;
  innerClassName?: string;
  cardFigmaNode?: string;
}

/**
 * Shared green gradient card shell for Ultimate Mind sections.
 */
export function UltimateMindGreenCard({
  children,
  innerClassName,
  cardFigmaNode,
}: UltimateMindGreenCardProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[24px] bg-gradient-to-b from-[#1d1a1a] to-[#105d39]"
      data-figma-node={cardFigmaNode}
    >
      <div className="home-ultimate-mind__grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-[-80px] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#c8a47e]/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[20%] top-[10%] h-[280px] w-[280px] rounded-full bg-[#8b6842]/25 blur-[120px]"
        aria-hidden="true"
      />
      <div className={cn('relative z-10', innerClassName)}>{children}</div>
    </div>
  );
}

interface UltimateMindSectionShellProps {
  children: ReactNode;
  wrapperFigmaNode: string;
}

/** Outer padding wrapper shared by Ultimate Mind feature sections. */
export function UltimateMindSectionShell({
  children,
  wrapperFigmaNode,
}: UltimateMindSectionShellProps) {
  return (
    <div
      className="relative w-full px-[var(--spacing-padding-24)] pb-[102px] lg:px-[var(--spacing-padding-30)]"
      data-figma-node={wrapperFigmaNode}
    >
      {children}
    </div>
  );
}
