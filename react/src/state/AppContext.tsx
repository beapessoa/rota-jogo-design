import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import { appReducer } from './reducer';
import type { Action } from './reducer';
import type { AppState, Profile } from './types';
import { defaultProfile, defaultSession } from './types';

const STORAGE_KEY = 'rota-do-enem:profile';

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

function init(): AppState {
  return { profile: loadProfile(), session: defaultSession };
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profile));
    } catch {
      // localStorage unavailable (private mode, quota, etc.) — progress just won't persist.
    }
  }, [state.profile]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
