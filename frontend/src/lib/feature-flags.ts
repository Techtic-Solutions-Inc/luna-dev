/** Profile endpoints are not yet in the API contract. Enable when backend ships. */
export const isProfileApiReady =
  import.meta.env.VITE_PROFILE_API_READY === 'true';

/** Profile downloads endpoints are not yet in the API contract. Enable when backend ships. */
export const isProfileDownloadsApiReady =
  import.meta.env.VITE_PROFILE_DOWNLOADS_API_READY === 'true';

/** Profile content endpoints are not yet in the API contract. Enable when backend ships. */
export const isProfileContentApiReady =
  import.meta.env.VITE_PROFILE_CONTENT_API_READY === 'true';

export class ProfileApiUnavailableError extends Error {
  constructor(message = 'Profile API is not available yet.') {
    super(message);
    this.name = 'ProfileApiUnavailableError';
  }
}
