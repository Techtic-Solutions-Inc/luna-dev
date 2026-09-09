import { frameRelativeLength } from '@/theme/screens/home';
import { LibraryDashboard } from './mockups/LibraryDashboard';
import { StepSectionLayout } from './StepSectionLayout';

/**
 * Frame 2147227816 — Home screen section 3/12 (Figma node 2270:14191).
 */
export function Frame2147227816Section({ className }: { className?: string }) {
  return (
    <StepSectionLayout
      className={className}
      sectionClassName="home-frame-2147227816"
      figmaNode="2270:14191"
      marginTop={frameRelativeLength(220)}
      step="Step 01"
      heading={
        <>
          Browse The <span className="text-[#c8a47e]">Continuously Updated</span> Collection.
        </>
      }
      body="Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style."
      preview={<LibraryDashboard className="w-full" />}
    />
  );
}
