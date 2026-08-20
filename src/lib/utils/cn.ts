type ClassValue = string | false | null | undefined;

/** Joins conditional Tailwind class names, dropping anything falsy. */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ');
