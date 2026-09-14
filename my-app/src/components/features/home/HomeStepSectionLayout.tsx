import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HOME_STEP_SECTION_CLASS } from './homeSectionLayout';

export interface HomeStepSectionLayoutProps {
  figmaNode: string;
  sectionClassName?: string;
  children: ReactNode;
}

export function HomeStepSectionLayout({
  figmaNode,
  sectionClassName,
  children,
}: HomeStepSectionLayoutProps) {
  return (
    <section
      className={cn(HOME_STEP_SECTION_CLASS, sectionClassName)}
      data-figma-node={figmaNode}
    >
      {children}
    </section>
  );
}
