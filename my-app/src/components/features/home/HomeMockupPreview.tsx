/** Figma mockup preview — always an <img>, never a rebuilt dashboard. */
export function HomeMockupPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="pointer-events-none min-w-0 flex-[0.62] overflow-hidden bg-home-background"
      data-figma-node="Content Library"
      aria-hidden="true"
    >
      <img src={src} alt={alt} className="h-auto w-full" decoding="async" />
    </div>
  );
}
