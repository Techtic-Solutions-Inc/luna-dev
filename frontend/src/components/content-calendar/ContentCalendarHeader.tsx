import { getDisplayFirstName } from '@/utils/calendar';

export function ContentCalendarHeader() {
  const firstName = getDisplayFirstName();

  return (
    <header className="mb-8 md:mb-10">
      <h1
        id="content-calendar-heading"
        className="font-display text-[28px] font-medium leading-[1.12] text-white sm:text-[42px] sm:leading-[55px]"
      >
        {firstName}&rsquo;s Personal Content Calendar
      </h1>
      <p className="mt-md max-w-[790px] text-lg font-normal leading-7 text-[#A6A4A2]">
        Your personal content calendar designed to grow your business - made specifically
        for you. Drag, drop, edit, and curate your perfect content strategy or feel free
        to use this one already made for you.
      </p>
    </header>
  );
}
