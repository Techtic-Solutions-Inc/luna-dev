import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface SidebarLayoutData {
  userName?: string;
  aiCreditsUsed?: number;
  aiCreditsTotal?: number;
}

interface AppLayoutContextValue {
  sidebarData: SidebarLayoutData;
  setSidebarData: (data: SidebarLayoutData) => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null);

export function AppLayoutProvider({ children }: { children: ReactNode }) {
  const [sidebarData, setSidebarDataState] = useState<SidebarLayoutData>({});

  const setSidebarData = useCallback((data: SidebarLayoutData) => {
    setSidebarDataState(data);
  }, []);

  return (
    <AppLayoutContext.Provider value={{ sidebarData, setSidebarData }}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export function useAppLayout(): AppLayoutContextValue {
  const ctx = useContext(AppLayoutContext);
  if (!ctx) {
    throw new Error('useAppLayout must be used within AppLayoutProvider');
  }
  return ctx;
}

export function useOptionalAppLayout(): AppLayoutContextValue | null {
  return useContext(AppLayoutContext);
}
