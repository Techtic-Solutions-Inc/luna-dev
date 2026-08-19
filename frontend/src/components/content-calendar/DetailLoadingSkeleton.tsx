export function DetailLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex gap-3">
        <div className="h-11 w-28 animate-pulse rounded-full bg-[#322722]" />
        <div className="h-11 w-36 animate-pulse rounded-full bg-[#E5DACE]" />
        <div className="h-11 w-28 animate-pulse rounded-full bg-[#E5DACE]" />
      </div>
      <div className="h-[320px] animate-pulse rounded-[16px] bg-[#EFE4D9]" />
      <div className="space-y-3">
        <div className="h-5 w-40 animate-pulse rounded bg-[#E5DACE]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#E5DACE]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[#E5DACE]" />
      </div>
      <div className="h-40 animate-pulse rounded-[16px] bg-[#0b0b0b]/20" />
    </div>
  );
}
