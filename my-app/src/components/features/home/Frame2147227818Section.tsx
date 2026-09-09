import { frameRelativeLength } from '@/theme/screens/home';
import { ContentDetailDashboard } from './mockups/ContentDetailDashboard';
import { StepSectionLayout } from './StepSectionLayout';

/**
 * Frame 2147227818 — Home screen section 8/12 (Figma node 2270:14699).
 */
export function Frame2147227818Section({ className }: { className?: string }) {
  return (
    <StepSectionLayout
      className={className}
      sectionClassName="home-frame-2147227818"
      figmaNode="2270:14699"
      marginTop={frameRelativeLength(101)}
      step="Step 03"
      heading={
        <>
          Post, Attract, Engage, And <span className="text-[#c8a47e]">Stand Out.</span>
        </>
      }
      body="Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)"
      preview={<ContentDetailDashboard className="w-full" />}
      previewFillClassName="bg-[#0e0d0d]"
    />
  );
}
