import { frameRelativeLength } from '@/theme/screens/home';
import { HOME_FRAME_2147227818_IMAGE } from './constants';
import { StepSectionLayout } from './StepSectionLayout';

/**
 * Frame 2147227818 — Home screen section 8/12 (Figma node 2270:14699).
 * Children: Frame 2147227812 (copy), Content Library (content modal preview).
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
      imageSrc={HOME_FRAME_2147227818_IMAGE}
      imageAlt="Agentwise content download and customization preview"
      previewFillClassName="bg-[#0e0d0d]"
    />
  );
}
