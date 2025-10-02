'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FiBookOpen,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiPlayCircle,
  FiVideo,
  FiX,
} from 'react-icons/fi';
import type { LinkSet, Project } from '@/content/types';

const LINK_META: Record<keyof LinkSet, { label: string; Icon: IconType }> = {
  website: { label: 'Live site', Icon: FiExternalLink },
  github: { label: 'GitHub', Icon: FiGithub },
  demo: { label: 'Interactive demo', Icon: FiPlayCircle },
  docs: { label: 'Documentation', Icon: FiBookOpen },
  video: { label: 'Video walkthrough', Icon: FiVideo },
  caseStudy: { label: 'Case study', Icon: FiFileText },
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  const linkEntries = project?.links
    ? (Object.entries(project.links) as Array<[keyof LinkSet, string]>).filter(([, value]) => Boolean(value))
    : [];

  const imageSrc = project?.image ?? project?.thumbnail ?? '/projects/placeholder-mesh.svg';

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.article
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 text-slate-100 shadow-[0_30px_120px_rgba(8,11,21,0.65)]"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-cyan-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <span className="sr-only">Close project details</span>
              <FiX className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative h-56 w-full overflow-hidden sm:h-72">
              <Image
                src={imageSrc}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 768px, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" aria-hidden />
              {project.tags?.length ? (
                <div className="absolute bottom-4 left-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-slate-100/80">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-100/85">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-8 p-7 sm:p-10">
              <header className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-300/70">
                  {project.year ? <span>{project.year}</span> : null}
                  {project.status ? (
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.7rem] tracking-[0.4em] text-slate-200/80">
                      {project.status}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h2 id="project-modal-title" className="font-display text-2xl text-slate-50 sm:text-3xl">
                    {project.name}
                  </h2>
                  {project.tagline ? (
                    <p className="mt-2 text-base text-slate-300/85 sm:text-lg">{project.tagline}</p>
                  ) : null}
                </div>
              </header>

              <section className="space-y-4 text-sm leading-relaxed text-slate-300/85">
                <p>{project.description}</p>
                {project.highlights?.length ? (
                  <ul className="space-y-3">
                    {project.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-amber-300" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>

              {project.tech?.length ? (
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Stack</h3>
                  <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-slate-100/70">
                    {project.tech.map((tech) => (
                      <li key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {linkEntries.length ? (
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Resources</h3>
                  <div className="flex flex-wrap gap-3">
                    {linkEntries.map(([key, url]) => {
                      const meta = LINK_META[key] ?? {
                        label: key,
                        Icon: FiExternalLink,
                      };
                      const { Icon, label } = meta;
                      return (
                        <a
                          key={key}
                          href={url}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
