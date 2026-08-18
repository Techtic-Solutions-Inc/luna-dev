import { useNavigate } from 'react-router-dom';
import { PencilIcon } from './icons';

function getDisplayName(): string {
  const stored =
    localStorage.getItem('name') ??
    localStorage.getItem('userName') ??
    localStorage.getItem('first_name');

  if (stored) {
    return stored;
  }

  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return 'Joseph Stanley';
}

function getMemberSinceLabel(): string {
  const stored =
    localStorage.getItem('member_since') ?? localStorage.getItem('created_at');

  if (stored) {
    const parsed = new Date(stored);

    if (!Number.isNaN(parsed.getTime())) {
      const formatted = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(parsed);

      return `Member since ${formatted}`;
    }
  }

  return 'Member since March 2024';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface ProfileHeroProps {
  loading?: boolean;
  displayName?: string;
  avatarUrl?: string;
  memberSince?: string;
}

function formatMemberSince(value: string): string {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return getMemberSinceLabel();
  }

  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(parsed);

  return `Member since ${formatted}`;
}

export default function ProfileHero({
  loading = false,
  displayName: displayNameProp,
  avatarUrl: avatarUrlProp,
  memberSince: memberSinceProp,
}: ProfileHeroProps) {
  const navigate = useNavigate();
  const displayName = displayNameProp?.trim() || getDisplayName();
  const memberSince = memberSinceProp
    ? formatMemberSince(memberSinceProp)
    : getMemberSinceLabel();
  const avatarUrl =
    avatarUrlProp ||
    localStorage.getItem('avatar') ||
    localStorage.getItem('avatarUrl');

  if (loading) {
    return (
      <header aria-busy="true" aria-label="Loading profile">
        <div className="h-8 w-28 animate-pulse rounded bg-white/10 md:h-10" />
        <div className="mt-md h-4 w-64 max-w-full animate-pulse rounded bg-white/10" />
        <div className="mt-8 flex items-center gap-5">
          <div className="h-24 w-24 animate-pulse rounded-full bg-white/10" />
          <div>
            <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-4 w-36 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      <h1 className="font-display text-[32px] font-medium leading-none text-[#F8F2EB] md:text-[42px]">
        Profile
      </h1>
      <p className="mt-md text-[15px] leading-5 text-[#BEBBB9]">
        How you show up across the studio.
      </p>

      <div className="mt-8 flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${displayName} profile photo`}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-primary"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-24 w-24 items-center justify-center rounded-full bg-[#3a322c] font-display text-[28px] text-[#F8F2EB] ring-2 ring-primary"
            >
              {getInitials(displayName)}
            </span>
          )}
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="focus-ring absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a3b32] text-[#F8F2EB] transition-colors duration-150 hover:bg-[#5a4a40]"
            aria-label="Edit profile photo"
          >
            <PencilIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="min-w-0">
          <p className="font-display text-[26px] font-medium leading-8 text-[#F8F2EB] md:text-[30px]">
            {displayName}
          </p>
          <p className="mt-1 text-[13px] leading-5 text-[#959595]">{memberSince}</p>
        </div>
      </div>
    </header>
  );
}
