import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BiSolidQuoteLeft } from 'react-icons/bi';
import type { Testimonial } from '@/content/types';

type Props = { testimonial: Testimonial; index: number };

export default function TestimonialCard({ testimonial, index }: Props) {
  const initials = useMemo(
    () =>
      testimonial.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0] ?? '')
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [testimonial.name],
  );

  const [lead, rest] = useMemo(() => {
    const words = testimonial.quote?.split(' ').filter(Boolean) ?? [];
    if (words.length <= 10) {
      return [testimonial.quote, ''] as const;
    }
    const leadWords = words.slice(0, 10).join(' ');
    const trailing = words.slice(10).join(' ');
    return [leadWords, trailing] as const;
  }, [testimonial.quote]);

  return (
    <motion.figure
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.1] p-8 shadow-[0_22px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 32px 90px rgba(236, 72, 153, 0.22)' }}
    >
      <span className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl transition duration-500 group-hover:bg-fuchsia-300/35" aria-hidden />
      <span className="pointer-events-none absolute -bottom-20 left-12 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl transition duration-500 group-hover:bg-cyan-300/25" aria-hidden />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-fuchsia-400/50 via-cyan-400/60 to-amber-300/40" aria-hidden />

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full border border-white/15 bg-white/5 p-0.5 shadow-[0_12px_30px_rgba(15,23,42,0.4)]">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-400/60 via-cyan-300/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-80" aria-hidden />
          {testimonial.image ? (
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name} portrait`}
                fill
                sizes="64px"
                className="object-cover"
                priority={false}
              />
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-950/60 text-lg font-semibold text-slate-100">
              {initials}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <figcaption className="font-display text-lg text-slate-100">
            {testimonial.name}
          </figcaption>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-300/70">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ''}
          </p>
        </div>
      </div>

      <blockquote className="relative mt-6 flex-1 text-base leading-relaxed text-slate-200/90">
  <BiSolidQuoteLeft className="absolute -left-1 -top-3 h-7 w-7 text-fuchsia-300/80" aria-hidden />
        <p className="ml-6 space-y-2">
          {lead ? (
            <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-amber-200 bg-clip-text text-base font-semibold text-transparent">
              {lead}
            </span>
          ) : null}
          {rest ? <span className="block text-slate-200/85">{rest}</span> : null}
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-300/60">
        <span>Testimonial</span>
        <span className="inline-flex items-center gap-1 text-fuchsia-200/80">
          <span className="h-1 w-1 rounded-full bg-fuchsia-300/80" aria-hidden />
          {testimonial.company ? testimonial.company : 'Trusted Partner'}
        </span>
      </footer>
    </motion.figure>
  );
}
