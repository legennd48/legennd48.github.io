import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FiBriefcase,
  FiDatabase,
  FiLayers,
  FiTrendingUp,
} from 'react-icons/fi';
import { GiChessKnight } from 'react-icons/gi';
import type { Experience } from '@/content/types';

function fmt(date: string | null) {
  if (!date) return 'Present';
  const [y, m] = date.split('-').map(Number);
  const d = new Date(y, (m || 1) - 1);
  return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
}

const iconMap: Record<string, IconType> = {
  'self-employed': FiTrendingUp,
  greenztech: FiDatabase,
  'logicbase tech & edu services': FiLayers,
  'marvel chess international': GiChessKnight,
};

type ExperienceItemProps = {
  experience: Experience;
  index: number;
  compact?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

export default function ExperienceItem({ experience, index, compact, expanded, onToggle }: ExperienceItemProps) {
  const orgKey = experience.organization.toLowerCase();
  const Icon = iconMap[orgKey] ?? FiBriefcase;

  const [primaryHighlight, secondaryHighlights] = useMemo(() => {
    if (!experience.highlights?.length) return [undefined, []] as const;
    return [experience.highlights[0], experience.highlights.slice(1)] as const;
  }, [experience.highlights]);

  const showSecondary = !compact || expanded;

  return (
    <motion.article
      className="group relative ml-0 flex flex-col gap-5 rounded-3xl border border-white/10 border-l-4 border-l-white/10 bg-white/[0.04] p-6 pl-8 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur transition-all hover:border-l-cyan-400/70 hover:shadow-[0_26px_80px_rgba(56,189,248,0.24)] sm:pl-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <span className="absolute -left-[2.35rem] top-8 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)] ring-2 ring-cyan-300/60 ring-offset-2 ring-offset-slate-950 sm:-left-[2.65rem]" aria-hidden>
        <Icon className="h-3.5 w-3.5 text-cyan-200" />
      </span>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          {experience.location ? (
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/70">{experience.location}</p>
          ) : null}
          <h3 className="font-display text-xl text-slate-100">
            {experience.title}
            <span className="text-slate-400"> @ {experience.organization}</span>
          </h3>
        </div>
        <div className="text-xs uppercase tracking-[0.35em] text-slate-300/70">
          {fmt(experience.startDate)} — {fmt(experience.endDate)}
        </div>
      </header>

      <div className="space-y-4 text-sm leading-relaxed text-slate-300/85">
        {primaryHighlight ? (
          <div className="relative rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-slate-100 shadow-[0_12px_40px_rgba(56,189,248,0.15)]">
            <span className="absolute -top-2 left-4 inline-flex rounded-full bg-slate-950 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.35em] text-cyan-200">Highlight</span>
            <p className="pl-2 font-medium text-slate-100">
              <span className="mr-2 inline-flex h-1.5 w-1.5 translate-y-1 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300" aria-hidden />
              {primaryHighlight}
            </p>
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {showSecondary && secondaryHighlights.length ? (
            <motion.ul
              key="secondary-highlights"
              className="space-y-2 text-sm text-slate-300/85"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {secondaryHighlights.map((point) => (
                <li key={point} className="relative pl-5">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
                  {point}
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>

      {compact && secondaryHighlights.length ? (
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 transition hover:border-cyan-300 hover:text-white"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details' : 'View details'}
        </button>
      ) : null}
    </motion.article>
  );
}
