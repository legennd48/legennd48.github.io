"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '@/content/types';

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const imageSrc = project.thumbnail ?? project.image ?? '/projects/placeholder-mesh.svg';

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 26px 80px rgba(56, 189, 248, 0.18)' }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" aria-hidden />
        {project.tags?.length ? (
          <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-slate-100/80">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-100/85 shadow-[0_0_20px_rgba(15,23,42,0.45)]">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="space-y-1">
          {project.year ? (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">{project.year}</p>
          ) : null}
          <h3 className="font-display text-lg text-slate-100">{project.name}</h3>
          {project.tagline ? <p className="text-sm text-slate-300/85">{project.tagline}</p> : null}
        </header>

        <p className="flex-1 text-sm leading-relaxed text-slate-300/80">
          {project.description}
        </p>

        {project.tech?.length ? (
          <ul className="flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-slate-200/80">
            {project.tech.slice(0, 5).map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {tech}
              </li>
            ))}
            {project.tech.length > 5 ? (
              <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                +{project.tech.length - 5}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="flex items-center justify-between text-sm font-medium text-cyan-200">
          <span className="inline-flex items-center gap-2">
            View project
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
          <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-100/70">
            Details
          </span>
        </div>
      </div>
    </motion.button>
  );
}
