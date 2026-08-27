import { colors } from '@/theme/tokens';

export function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="inline-flex h-8 w-8 items-center justify-center"
    >
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-transparent"
        style={{
          borderTopColor: colors.accent,
          borderRightColor: colors.accent,
        }}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
