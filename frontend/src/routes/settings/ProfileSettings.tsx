import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { ProfileContentTab } from '../../components/ProfileContentTab';
import { ProfileDownloadsTab } from '../../components/ProfileDownloadsTab';
import { ProfileForm } from '../../components/ProfileForm';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { FontAwesomeIcon, faPen } from '../../theme/icons';
import './ProfileSettings.css';

const PROFILE_TABS = [
  { label: 'Profile', to: '/settings/profile' },
  { label: 'Downloads', to: '/settings/profile/downloads' },
  { label: 'Content Generated', to: '/settings/profile/content-generated' },
] as const;

function ProfileHeader() {
  const { profile } = useCurrentUser();

  return (
    <header className="profile-settings__hero">
      <div className="profile-settings__intro">
        <h1 className="profile-settings__title">Profile</h1>
        <p className="profile-settings__subtitle">
          How you show up across the studio.
        </p>
      </div>

      <div className="profile-settings__identity">
        <div className="profile-settings__avatar-wrap">
          <img
            className="profile-settings__avatar"
            src={profile.avatar_url}
            alt={`${profile.first_name} ${profile.last_name}`}
            width={96}
            height={96}
          />
          <button
            type="button"
            className="profile-settings__avatar-edit"
            aria-label="Edit profile photo"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>

        <div className="profile-settings__identity-copy">
          <p className="profile-settings__name">
            {profile.first_name} {profile.last_name}
          </p>
          <p className="profile-settings__member-since">
            Member since {profile.member_since}
          </p>
        </div>
      </div>
    </header>
  );
}

function ProfileTabs() {
  return (
    <nav className="profile-settings__tabs" aria-label="Profile sections">
      {PROFILE_TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/settings/profile'}
          className={({ isActive }) =>
            [
              'profile-settings__tab',
              isActive ? 'profile-settings__tab--active' : '',
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

function ProfileDetailsTab() {
  const { profile, loading, error, refetch } = useCurrentUser();

  return (
    <ProfileForm
      profile={profile}
      loading={loading}
      error={error}
      onRetry={() => {
        void refetch();
      }}
    />
  );
}

export function ProfileSettings() {
  return (
    <AppShell>
      <div className="profile-settings">
        <ProfileHeader />
        <ProfileTabs />

        <div className="profile-settings__panel">
          <Routes>
            <Route index element={<ProfileDetailsTab />} />
            <Route path="downloads" element={<ProfileDownloadsTab />} />
            <Route
              path="content-generated"
              element={<ProfileContentTab />}
            />
            <Route
              path="*"
              element={<Navigate to="/settings/profile" replace />}
            />
          </Routes>
        </div>
      </div>
    </AppShell>
  );
}

export default ProfileSettings;
