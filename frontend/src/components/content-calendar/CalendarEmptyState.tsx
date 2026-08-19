export function CalendarEmptyState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[16px] border border-calendar-border bg-light-panel px-6 py-12 text-center">
      <p className="font-display text-[20px] text-calendar-heading">No scheduled posts yet</p>
      <p className="mt-1 text-[13px] leading-5 text-calendar-muted">
        Scheduled content will appear here once entries are added to your calendar.
      </p>
    </div>
  );
}
