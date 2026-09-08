import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StepSectionLayoutProps {
  className?: string;
  sectionClassName: string;
  figmaNode: string;
  marginTop?: string;
  step: string;
  heading: ReactNode;
  body: string;
  preview: ReactNode;
  previewFillClassName?: string;
}

/**
 * Shared layout for Home step sections (Frame 2147227812 + Content Library preview).
 */
export function StepSectionLayout({
  className,
  sectionClassName,
  figmaNode,
  marginTop,
  step,
  heading,
  body,
  preview,
  previewFillClassName = 'bg-home-background',
}: StepSectionLayoutProps) {
  return (
    <section
      className={cn(
        sectionClassName,
        'relative z-10 flex w-full flex-col items-center gap-[40px] px-[var(--spacing-padding-60)] py-[var(--spacing-padding-40)] lg:flex-row lg:items-center lg:gap-[102px]',
        className,
      )}
      style={marginTop ? { marginTop } : undefined}
      data-figma-node={figmaNode}
    >
      <div className="relative min-w-0 flex-[0.38]" data-figma-node="Frame 2147227812">
        <span className="home-frame-2147227812__badge inline-flex items-center rounded-[100px] border border-[#c8a47e]/50 px-[16px] py-[6px]">
          {step}
        </span>
        <h3 className="home-frame-2147227812__heading mt-[20px]">{heading}</h3>
        <p className="home-frame-2147227812__body mt-[16px]">{body}</p>
      </div>

      <div
        className={cn('relative min-w-0 flex-[0.62]', previewFillClassName)}
        data-figma-node="Content Library"
      >
        {preview}
      </div>
    </section>
  );
}
