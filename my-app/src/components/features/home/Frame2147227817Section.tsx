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
            We Personalize It To Your <span className="text-[#c8a47e]">Business And</span> Market.
          </>
        }
        body="Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds."
      />
      <HomeMockupPreview src="/assets/figma/3917-8120.png" alt="Dashboard/Nav/Vertical" />
    </HomeStepSectionLayout>
  );
}
