export function HomeSectionEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      role="status"
      className="flex min-h-[160px] flex-col items-center justify-center rounded-[16px] border border-dashed border-[#637381]/30 bg-[#637381]/5 px-[24px] py-[32px] text-center"
    >
      <p className="font-['EB_Garamond'] text-[20px] font-[500] text-[#637381]">{title}</p>
      <p className="mt-[8px] max-w-[420px] font-['Almarai'] text-[14px] leading-[22px] text-[#637381]/80">
        {description}
      </p>
    </div>
  );
}
