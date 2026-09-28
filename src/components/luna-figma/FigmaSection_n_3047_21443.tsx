/** luna-spec-codegen: owned-layout */
interface FigmaSection_n_3047_21443Props {
  onLoadMore?: () => void;
}

export function FigmaSection_n_3047_21443({
  onLoadMore,
}: FigmaSection_n_3047_21443Props) {
  return (
    <section data-figma-node="3047:21443" className="font-almarai absolute box-border left-[748px] top-[2479px] mt-[1596px] w-[144px] h-[48px] pt-[10px] pr-[20px] pb-[10px] pl-[20px] flex flex-row items-center justify-center gap-1.5 z-[7]">
      <div data-figma-node="3047:21444" className="box-border w-[24px] h-[24px] overflow-hidden relative"></div>
      <button
        type="button"
        data-figma-node="3047:21446"
        onClick={onLoadMore}
        className="box-border w-[74px] h-[18px] border-0 bg-transparent p-0 font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]"
      >
        Load more
      </button>
    </section>
  );
}
