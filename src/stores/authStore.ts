import { getToken, isAuthenticated } from '@/lib/auth/storage';

export const authStore = {
  getToken,
  isAuthenticated,
};

export default authStore;
