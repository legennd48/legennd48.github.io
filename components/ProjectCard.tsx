import type { Project } from '@/content/types';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.35)] backdrop-blur transition duration-300 hover:border-cyan-300/60 hover:shadow-[0_24px_70px_rgba(56,189,248,0.25)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 translate-y-[-60%] bg-gradient-to-b from-cyan-300/30 via-transparent to-transparent opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" aria-hidden />
      <h3 className="font-display text-lg text-slate-100">{p.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300/85">{p.description}</p>
      {p.tech?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300/80">
          {p.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-wide text-slate-200/80"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      {p.links && (
        <p className="mt-5 flex flex-wrap gap-4 text-sm text-cyan-300">
          {p.links.github && (
            <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={p.links.github} target="_blank" rel="noreferrer">
              <span aria-hidden>↗</span> GitHub
            </a>
          )}
          {p.links.website && (
            <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={p.links.website} target="_blank" rel="noreferrer">
              <span aria-hidden>↗</span> Live
            </a>
          )}
          {p.links.demo && (
            <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={p.links.demo} target="_blank" rel="noreferrer">
              <span aria-hidden>↗</span> Demo
            </a>
          )}
        </p>
      )}
    </article>
  );
}
