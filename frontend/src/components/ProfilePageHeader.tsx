import { PencilIcon } from './icons';
import {
  getMemberSinceLabel,
  getProfileDisplayName,
  getProfileInitials,
} from '../lib/profileDisplay';
import type { ProfileData } from '../types/api';
import TabsNavigation from './TabsNavigation';

interface ProfilePageHeaderProps {
  profile?: ProfileData | null;
  profileLoading?: boolean;
}

function formatMemberSince(profile?: ProfileData | null): string {
  if (profile?.created_at) {
    const date = new Date(profile.created_at);
    if (!Number.isNaN(date.getTime())) {
      return `Member since ${date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}`;
    }
  }

  return getMemberSinceLabel();
}

export default function ProfilePageHeader({
  profile = null,
  profileLoading = false,
}: ProfilePageHeaderProps) {
  const fallbackName = getProfileDisplayName();
  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim() ||
      fallbackName
    : fallbackName;
  const avatarUrl =
    profile?.avatar_url ??
    localStorage.getItem('avatar') ??
    localStorage.getItem('avatarUrl');

  return (
    <header>
      <h1 className="font-display text-[28px] font-medium leading-[1.12] text-white sm:text-[42px] sm:leading-[55px]">
        Profile
      </h1>
      <p className="mt-md text-[15px] leading-6 text-[#A6A4A2] sm:text-base sm:leading-7">
        How you show up across the studio.
      </p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 md:mt-10">
        <div className="relative shrink-0 self-start">
          {profileLoading ? (
            <span
              aria-hidden="true"
              className="block h-[120px] w-[120px] animate-pulse rounded-full bg-white/10"
            />
          ) : (
            <span className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-[#DAB89A] text-[28px] font-semibold text-[#201816]">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                getProfileInitials(displayName)
              )}
            </span>
          )}
          <button
            type="button"
            className="focus-ring absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#2f271f] text-primary transition-colors hover:bg-[#3a3229]"
            aria-label="Edit profile photo"
          >
            <PencilIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <div>
          {profileLoading ? (
            <div aria-busy="true" aria-label="Loading profile summary">
              <div className="h-9 w-56 max-w-full animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-4 w-40 animate-pulse rounded bg-white/10" />
            </div>
          ) : (
            <>
              <h2 className="font-display text-[28px] font-medium leading-tight text-white sm:text-[34px]">
                {displayName}
              </h2>
              <p className="mt-2 text-[14px] text-[#A6A4A2]">
                {formatMemberSince(profile)}
              </p>
            </>
          )}
        </div>
      </div>

      <TabsNavigation />
    </header>
  );
}
