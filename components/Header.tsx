"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useMode } from '@/components/ModeContext';

type Props = {
  onToggleMode?: () => void; // normal <-> terminal (placeholder for Phase 4)
};

export default function Header({ onToggleMode }: Props) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { mode, toggle } = useMode();

  const isDark = (theme === 'system' ? systemTheme : theme) === 'dark';

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
  <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <a href="#" className="font-display text-sm uppercase tracking-[0.6em] text-slate-200">
          A. A. Liasu
        </a>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.35em] text-slate-400 sm:flex">
          <a href="#skills" className="transition hover:text-sky-200">Skills</a>
          <a href="#projects" className="transition hover:text-sky-200">Projects</a>
          <a href="#experience" className="transition hover:text-sky-200">Experience</a>
          <a href="#testimonials" className="transition hover:text-sky-200">Testimonials</a>
          <a href="#awards" className="transition hover:text-sky-200">Awards</a>
          <a href="#certifications" className="transition hover:text-sky-200">Certifications</a>
          <a href="#contact" className="transition hover:text-sky-200">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-slate-200 transition hover:border-sky-300 hover:text-white"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted ? (isDark ? '🌙' : '☀️') : '…'}
            <span className="hidden sm:inline">Theme</span>
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-slate-200 transition hover:border-cyan-300 hover:text-white"
            onClick={onToggleMode || toggle}
            aria-label="Toggle terminal mode"
          >
            <span className="hidden sm:inline">Mode</span>
            {mode === 'terminal' ? 'Normal' : 'Terminal'}
          </button>
        </div>
      </div>
    </header>
  );
}
