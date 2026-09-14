import { HOME_STEP_MOCKUP_IMAGES } from './constants';
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
            Browse The Continuously <span className="text-home-accent">Updated</span> Collection.
          </>
        }
        body="Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style."
      />
      <HomeMockupPreview
        src={HOME_STEP_MOCKUP_IMAGES.contentLibrary}
        alt="Agentwise Content Library dashboard preview"
      />
    </HomeStepSectionLayout>
  );
}
