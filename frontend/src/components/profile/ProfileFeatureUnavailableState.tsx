interface ProfileFeatureUnavailableStateProps {
  title: string;
  description: string;
  variant?: 'embedded' | 'standalone';
}

export function ProfileFeatureUnavailableState({
  title,
  description,
  variant = 'embedded',
}: ProfileFeatureUnavailableStateProps) {
  const isStandalone = variant === 'standalone';

  return (
    <div
      className={
        isStandalone
          ? 'mt-10 rounded-[16px] border border-white/5 bg-profile-surface px-6 py-16 text-center md:rounded-[20px] md:px-8'
          : 'flex min-h-[220px] flex-col items-center justify-center rounded-[12px] border border-white/5 bg-profile-surface-embedded px-6 py-12 text-center'
      }
      role="status"
    >
      <p className="font-display text-[20px] text-white">{title}</p>
      <p
        className={
          isStandalone
            ? 'mt-2 text-[14px] text-profile-muted'
            : 'mt-2 text-[13px] text-profile-muted'
        }
      >
        {description}
      </p>
    </div>
  );
}
