import type { Experience } from '@/content/types';

function fmt(date: string | null) {
  if (!date) return 'Present';
  const [y, m] = date.split('-').map(Number);
  const d = new Date(y, (m || 1) - 1);
  return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
}

export default function ExperienceItem({ e }: { e: Experience }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.35)] backdrop-blur">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-lg text-slate-100">
          {e.title}{' '}
          <span className="text-slate-400">@ {e.organization}</span>
        </h3>
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
          {fmt(e.startDate)} — {fmt(e.endDate)}
          {e.location ? ` · ${e.location}` : ''}
        </div>
      </header>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300/90">
        {e.highlights.map((h) => (
          <li key={h} className="relative pl-5">
            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" aria-hidden />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}
