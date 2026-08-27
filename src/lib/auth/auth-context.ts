import { createContext } from "react";
import type { LoginUserData } from "@/lib/api/types";

export interface AuthContextValue {
  user: LoginUserData | null;
  token: string | null;
  ready: boolean;
  login: (user: LoginUserData, remember: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
