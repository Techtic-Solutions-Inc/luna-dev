/**
 * Luna generated shared component
 * Figma componentId: repeat:20f2b82d6e
 * Component: Stack
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
import { figmaTextContent } from "./figmaDisplay";
export function Stack({ className = "", ...rest }: { className?: string; [key: string]: unknown }) {
  return (
  <div data-figma-node="I3795:12211;1226:1589" className={`box-border w-[15px] h-[15px] rounded-[24.31px] relative flex flex-row items-start pt-[1px] pr-[1px] pb-[1px] pl-[1px] outline-[#333333] outline-[0.49px] ${className}`} {...rest}>
    <div data-figma-node="I3795:12211;1226:1590" className="box-border flex-1 min-w-0 self-stretch overflow-hidden rounded-[243.06px] relative flex flex-row items-center justify-center">
      <div data-figma-node="I3795:12211;1226:1591" className="box-border w-[19px] shrink-0 h-[19px] rounded-[243.06px] relative flex flex-row items-center justify-center">
        <img data-figma-node="I3795:12211;1226:1592" src={figmaTextContent("avatar_url", "")} alt="#Img_Avatar.25" onError={e => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} className="box-border flex-1 min-w-0 self-stretch rounded-[243.06px] object-cover" />
      </div>
    </div>
  </div>
  );
}
