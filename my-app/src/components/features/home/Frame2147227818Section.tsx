import { HOME_STEP_MOCKUP_IMAGES } from './constants';
import { HomeMockupPreview } from './HomeMockupPreview';
import { HomeStepCopyFrame } from './HomeStepCopyFrame';
import { HomeStepSectionLayout } from './HomeStepSectionLayout';

/**
 * Frame 2147227818 — Home screen section 8/8 (Figma node 2270:14699).
 */
export function Frame2147227818Section() {
  return (
    <HomeStepSectionLayout figmaNode="2270:14699" sectionClassName="home-frame-2147227818">
      <HomeStepCopyFrame
        step="Step 03"
        heading={
          <>
            Post, Attract, Engage, And <span className="text-home-accent">Stand Out.</span>
          </>
        }
        body="Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)"
      />
      <HomeMockupPreview
        src={HOME_STEP_MOCKUP_IMAGES.contentDetail}
        alt="Agentwise content detail dashboard preview"
      />
    </HomeStepSectionLayout>
  );
}
