interface DashboardSectionEmptyStateProps {
  message: string;
}

export function DashboardSectionEmptyState({
  message,
}: DashboardSectionEmptyStateProps) {
  return (
    <div className="rounded-[12px] border border-dashed border-white/10 px-4 py-8 text-center">
      <p className="text-sm text-[#A6A4A2]">{message}</p>
    </div>
  );
}
