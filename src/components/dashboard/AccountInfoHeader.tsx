interface AccountInfoHeaderProps {
  name?: string;
  creditsUsed?: number;
  creditsTotal?: number;
  avatarSrc?: string;
}

export function AccountInfoHeader({ name, creditsUsed, creditsTotal, avatarSrc }: AccountInfoHeaderProps) {
  const hasCredits = creditsUsed !== undefined && creditsTotal !== undefined && creditsTotal > 0;
  const ratio = hasCredits ? Math.min(100, (creditsUsed / creditsTotal) * 100) : 0;

  return (
    <div className="mt-24 flex flex-col gap-16">
      {hasCredits ? (
        <div className="rounded-16 border border-color-129 p-16">
          <p className="text-almarai-14 text-color-131">AI Credit Usage</p>
          <p className="mt-8 text-almarai-14 text-secondary">
            Current {creditsUsed.toLocaleString()} / {creditsTotal.toLocaleString()}
          </p>
          <div className="mt-10 h-4 overflow-hidden rounded-1000 bg-color-133">
            <div className="h-full rounded-1000 bg-accent" style={{ width: `${ratio}%` }} />
          </div>
        </div>
      ) : null}
      {name ? (
        <div className="flex items-center gap-12">
          {avatarSrc ? (
            <img src={avatarSrc} alt="" className="h-36 w-36 rounded-1000 object-cover" />
          ) : (
            <span className="inline-flex h-36 w-36 items-center justify-center rounded-1000 bg-color-133 text-almarai-14">
              {name.slice(0, 1)}
            </span>
          )}
          <p className="flex-1 text-almarai-16-20 text-secondary">{name}</p>
        </div>
      ) : null}
    </div>
  );
}
