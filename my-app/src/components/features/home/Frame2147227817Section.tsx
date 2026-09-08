import { frameRelativeLength } from '@/theme/screens/home';
import { UltimateMindDashboard } from './mockups/UltimateMindDashboard';
import { StepSectionLayout } from './StepSectionLayout';

/**
 * Frame 2147227817 — Home screen section 7/12 (Figma node 2270:14193).
 */
export function Frame2147227817Section({ className }: { className?: string }) {
  return (
    <StepSectionLayout
      className={className}
      sectionClassName="home-frame-2147227817"
      figmaNode="2270:14193"
      marginTop={frameRelativeLength(101)}
      step="Step 02"
      heading={
        <>
          We Personalize It To Your <span className="text-[#c8a47e]">Business And</span> Market.
        </>
      }
      body="Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds."
      preview={<UltimateMindDashboard sidebar="dark" className="w-full" />}
    />
  );
}
