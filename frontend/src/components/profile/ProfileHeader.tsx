import type { NormalizedProfile } from '@/lib/api/profile';
import { AvatarEditor } from '@/components/profile/AvatarEditor';
import { formatMemberSince, getDisplayFullName } from '@/utils/calendar';

interface ProfileHeaderProps {
  profile?: NormalizedProfile | null;
  profileLoading?: boolean;
}

export function ProfileHeader({
  profile = null,
  profileLoading = false,
}: ProfileHeaderProps) {
  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') ||
      getDisplayFullName()
    : getDisplayFullName();

  const memberSinceSource =
    profile?.created_at ??
    localStorage.getItem('member_since') ??
    localStorage.getItem('created_at');

  const memberSince = memberSinceSource
    ? formatMemberSince(memberSinceSource)
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-[28px] font-medium leading-[1.12] text-white sm:text-[42px]">
          Profile
        </h1>
        <p className="mt-md text-lg leading-7 text-[#A6A4A2]">
          How you show up across the studio.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <AvatarEditor
          avatarUrl={profile?.avatar_url}
          name={displayName}
          loading={profileLoading}
        />
        <div>
          {profileLoading ? (
            <div className="space-y-2">
              <div className="h-7 w-40 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            </div>
          ) : (
            <>
              <p className="font-display text-[24px] font-medium text-white md:text-[28px]">
                {displayName}
              </p>
              {memberSince ? (
                <p className="mt-1 text-[13px] text-[#A6A4A2]">
                  Member since {memberSince}
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
