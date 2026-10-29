/**
 * Luna generated shared component
 * Figma componentId: 741:2411
 * Component: Shared4
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
import { Button } from "@/components/ui/button";
export function Shared4({ className = "", ...rest }: { className?: string; [key: string]: unknown }) {
  return (
  <div data-figma-node="4708:6289" data-figma-component="741:2411" className={`box-border w-[125px] h-[218px] overflow-hidden rounded-[3.47px] relative flex flex-col items-center gap-[6px] ${className}`} {...rest}>
    <div data-figma-node="I4708:6289;741:2397" className="box-border w-[125px] h-[218px] rounded-[3.47px] relative block"></div>
    <Button data-figma-node="I4708:6289;741:2398" type="button" className="p-0 box-border w-[121px] h-auto shrink-0 rounded-[2.08px] pt-[5px] pr-[4px] pb-[5px] pl-[4px] inline-flex items-center justify-end whitespace-nowrap bg-success hover:opacity-90 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-50 gap-0 hover:bg-success shadow-none"><span className="font-almarai text-[8px] font-[400] leading-[9px] text-left text-text-primary whitespace-nowrap">Things I consider perfect | [City Name] edition</span></Button>
  </div>
  );
}
