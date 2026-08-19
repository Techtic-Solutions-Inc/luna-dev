export function ContentHistoryEmptyState() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] border border-white/5 bg-[#26231f] px-6 py-12 text-center">
      <p className="font-display text-[20px] text-white">No generated content yet</p>
      <p className="mt-2 text-[13px] text-[#A6A4A2]">
        AI-generated content you create will appear here.
      </p>
    </div>
  );
}
