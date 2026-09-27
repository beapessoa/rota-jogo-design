import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface PlaySheetContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
}

const PlaySheetContext = createContext<PlaySheetContextValue | null>(null);

export function PlaySheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <PlaySheetContext.Provider value={{ open, show: () => setOpen(true), hide: () => setOpen(false) }}>
      {children}
    </PlaySheetContext.Provider>
  );
}

export function usePlaySheet() {
  const ctx = useContext(PlaySheetContext);
  if (!ctx) throw new Error('usePlaySheet must be used within PlaySheetProvider');
  return ctx;
}
