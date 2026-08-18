import type { PropsWithChildren } from 'react';
import AppShell from './layout/AppShell';
import ProfileHero from './ProfileHero';
import TabsNavigation from './TabsNavigation';

interface ProfileLayoutProps extends PropsWithChildren {
  loading?: boolean;
  creditLoading?: boolean;
  displayName?: string;
  avatarUrl?: string;
  memberSince?: string;
}

export default function ProfileLayout({
  children,
  loading = false,
  creditLoading = false,
  displayName,
  avatarUrl,
  memberSince,
}: ProfileLayoutProps) {
  return (
    <AppShell creditLoading={creditLoading}>
      <div className="mx-auto w-full max-w-[1120px] rounded-[24px] bg-color-103 px-5 py-6 md:px-8 md:py-8">
        <ProfileHero
          loading={loading}
          displayName={displayName}
          avatarUrl={avatarUrl}
          memberSince={memberSince}
        />
        <TabsNavigation />
        <div className="mt-6 md:mt-8">{children}</div>
      </div>
    </AppShell>
  );
}
