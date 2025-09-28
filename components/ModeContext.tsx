"use client";
import { createContext, useContext, useMemo, useState } from 'react';

type Mode = 'normal' | 'terminal';

type Ctx = {
  mode: Mode;
  toggle: () => void;
  setMode: (m: Mode) => void;
};

const ModeCtx = createContext<Ctx | null>(null);

export function useMode() {
  const ctx = useContext(ModeCtx);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('normal');
  const value = useMemo<Ctx>(() => ({ mode, setMode, toggle: () => setMode((m) => (m === 'normal' ? 'terminal' : 'normal')) }), [mode]);
  return <ModeCtx.Provider value={value}>{children}</ModeCtx.Provider>;
}
