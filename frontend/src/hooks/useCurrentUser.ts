import { useCallback, useEffect, useState } from 'react';
import { apiGet } from '../api/client';
import type { ProfileResponse, UserProfile } from '../types/api';
import { getErrorMessage } from '../types/api';

const DEFAULT_PROFILE: UserProfile = {
  first_name: 'Joseph',
  last_name: 'Stanley',
  email: 'joseph.stanley@agentwise.com',
  mobile: '+1 (202) 555-0142',
  bio: 'Real estate marketing strategist focused on luxury listings and client engagement across social channels.',
  timezone: 'Time zone in Washington, DC, USA (GMT-4)',
  street: '1200 Pennsylvania Avenue NW',
  country: 'United States',
  state: 'District of Columbia',
  city: 'Washington',
  zip: '20004',
  avatar_url:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
  member_since: 'March 2024',
};

export function useCurrentUser() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await apiGet<ProfileResponse>('/api/profile');

    if (result.ok) {
      setProfile({ ...DEFAULT_PROFILE, ...result.data.profile });
    } else if (result.status === 0 || result.status >= 500) {
      setError(getErrorMessage(result.error));
    } else {
      setProfile(DEFAULT_PROFILE);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
}

export default useCurrentUser;
