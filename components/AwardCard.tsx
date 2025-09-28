import Image from 'next/image';
import type { Award } from '@/content/types';

type Props = { award: Award };

export default function AwardCard({ award }: Props) {
  return (
    <article className="reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(15,23,42,0.35)] backdrop-blur transition duration-300 hover:border-emerald-300/60 hover:shadow-[0_24px_70px_rgba(45,212,191,0.25)]">
      <div className="relative w-full overflow-hidden border-b border-white/10 bg-slate-900/80">
        <Image
          src={award.image}
          alt={`${award.title} certificate preview`}
          width={768}
          height={512}
          className="h-full w-full object-cover"
          priority={false}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-base text-slate-100">{award.title}</h3>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          {award.issuer}
          {award.date ? ` · ${award.date}` : ''}
        </p>
        {award.description ? (
          <p className="text-sm leading-relaxed text-slate-300/90">{award.description}</p>
        ) : null}
        {award.credentialUrl ? (
          <a
            href={award.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-emerald-200 underline-offset-4 transition hover:underline"
          >
            View credential
            <span aria-hidden>↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
