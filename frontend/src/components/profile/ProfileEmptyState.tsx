export function ProfileEmptyState() {
  return (
    <div
      className="mt-10 rounded-[16px] border border-white/5 bg-[#1f1b17] px-6 py-16 text-center md:rounded-[20px] md:px-8"
      role="status"
    >
      <p className="font-display text-[20px] text-white">Profile unavailable</p>
      <p className="mt-2 text-[14px] text-[#A6A4A2]">
        We could not load your profile information. Please try again later.
      </p>
    </div>
  );
}
