import { HomeMockupPreview } from './HomeMockupPreview';
import { HomeStepCopyFrame } from './HomeStepCopyFrame';
import { HomeStepSectionLayout } from './HomeStepSectionLayout';

/**
 * Frame 2147227816 — Home screen section 3/8 (Figma node 2270:14191).
 */
export function Frame2147227816Section() {
  return (
    <HomeStepSectionLayout figmaNode="2270:14191" sectionClassName="home-frame-2147227816">
      <HomeStepCopyFrame
        step="Step 01"
        heading={
          <>
            Browse The <span className="text-[#c8a47e]">Continuously Updated</span> Collection.
          </>
        }
        body="Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style."
      />
      <HomeMockupPreview src="/assets/figma/3795-12211.png" alt="Dashboard/Nav/Vertical" />
    </HomeStepSectionLayout>
  );
}
