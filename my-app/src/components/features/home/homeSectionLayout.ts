/** Shared Home screen layout tokens — use Tailwind spacing, not canvas coords. */
export const HOME_PAGE_INSET_CLASS =
  'px-6 tablet:px-[var(--spacing-padding-60)]';

export const HOME_SECTION_STACK_CLASS = 'relative z-10 mt-16 w-full';

export const HOME_STEP_SECTION_CLASS = [
  HOME_SECTION_STACK_CLASS,
  'flex flex-col items-center gap-12 py-10',
  'tablet:flex-row',
  'lg:py-[var(--spacing-padding-40)]',
  HOME_PAGE_INSET_CLASS,
].join(' ');
