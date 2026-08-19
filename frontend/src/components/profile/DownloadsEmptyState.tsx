export function DownloadsEmptyState() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] border border-white/5 bg-[#26231f] px-6 py-12 text-center">
      <p className="font-display text-[20px] text-white">No downloads yet</p>
      <p className="mt-2 text-[13px] text-[#A6A4A2]">
        Files you download from the studio will appear here.
      </p>
    </div>
  );
}
