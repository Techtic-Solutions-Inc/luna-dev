import { HOME_STEP_MOCKUP_IMAGES } from './constants';
import { HomeMockupPreview } from './HomeMockupPreview';
import { HomeStepCopyFrame } from './HomeStepCopyFrame';
import { HomeStepSectionLayout } from './HomeStepSectionLayout';

/**
 * Frame 2147227817 — Home screen section 7/8 (Figma node 2270:14193).
 */
export function Frame2147227817Section() {
  return (
    <HomeStepSectionLayout figmaNode="2270:14193" sectionClassName="home-frame-2147227817">
      <HomeStepCopyFrame
        step="Step 02"
        heading={
          <>
            We Personalize It To Your <span className="text-home-accent">Business And</span> Market.
          </>
        }
        body="Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds."
      />
      <HomeMockupPreview
        src={HOME_STEP_MOCKUP_IMAGES.ultimateMind}
        alt="Agentwise Ultimate Mind dashboard preview"
      />
    </HomeStepSectionLayout>
  );
}
