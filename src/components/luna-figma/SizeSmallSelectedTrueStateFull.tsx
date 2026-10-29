/**
 * Luna generated shared component
 * Figma componentId: 41:31
 * Component: SizeSmallSelectedTrueStateFull
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
import { figmaVariantProps } from "./FigmaVariantSwitch";
import { useFigmaActionProps, ratingActionForNode } from "./useFigmaScreenData";
import { SocialRatingFull } from "./SocialRatingFull";
export function SizeSmallSelectedTrueStateFull({ className = "", ...rest }: { className?: string; [key: string]: unknown }) {
  const nodeId = typeof rest["data-figma-node"] === "string" ? rest["data-figma-node"] : undefined;
  const ratingAction = ratingActionForNode(nodeId);
  const actionBinding = ratingAction ? useFigmaActionProps(ratingAction) : figmaVariantProps("41:27");
  return (
  <button data-figma-node="I2270:16933;2615:382325" data-figma-component="41:31" type="button" {...actionBinding} className={`box-border w-full min-w-0 h-[20px] block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...rest}>
    <SocialRatingFull data-figma-node="I2270:16933;2615:382325;2615:382304" data-figma-component="41:24" className="box-border h-[20px] absolute left-[0%] w-[100%] top-[0px]" />
  </button>
  );
}
