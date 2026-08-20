import { createContext } from 'react';
import type { CreditUsage } from '../types/api';
import type { LoginRequest } from '../types/auth';
import type { StoredUser } from '../lib/session';

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: StoredUser | null;
  credits: CreditUsage | null;
  login: (payload: LoginRequest, remember: boolean) => Promise<void>;
  logout: () => void;
  updateUser: (user: StoredUser) => void;
  updateCredits: (credits: CreditUsage | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
