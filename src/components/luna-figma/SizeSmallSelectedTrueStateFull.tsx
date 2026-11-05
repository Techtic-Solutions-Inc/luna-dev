/**
 * Luna generated shared component
 * Figma componentId: 41:31
 * Component: SizeSmallSelectedTrueStateFull
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
import { useFigmaVariantProps } from "./FigmaVariantSwitch";
import { SocialRatingFull } from "./SocialRatingFull";
export function SizeSmallSelectedTrueStateFull({ className = "", ...rest }: { className?: string; [key: string]: unknown }) {
  const variantProps = useFigmaVariantProps("41:27");
  return (
  <button data-figma-node="I2270:16933;2615:382325" data-figma-component="41:31" type="button" {...variantProps} className={`box-border w-[20px] h-[20px] relative block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...rest}>
    <SocialRatingFull data-figma-node="I2270:16933;2615:382325;2615:382304" data-figma-component="41:24" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]" />
  </button>
  );
}
