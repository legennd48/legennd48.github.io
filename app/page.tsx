"use client";
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiAmazonaws,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiJsonwebtokens,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSqlite,
  SiTypescript,
  SiOwasp,
} from 'react-icons/si';
import {
  FiActivity,
  FiEdit3,
  FiLifeBuoy,
  FiLock,
  FiShare2,
  FiStar,
  FiTarget,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';
import { getSiteContent } from '@/content/schema';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import ExperienceItem from '@/components/ExperienceItem';
import TestimonialCard from '@/components/TestimonialCard';
import AwardCard from '@/components/AwardCard';
import { useMode } from '@/components/ModeContext';
import Terminal from '@/components/terminal/Terminal';

const skillIconMap: Record<string, IconType> = {
  python: SiPython,
  django: SiDjango,
  fastapi: SiFastapi,
  nodedotjs: SiNodedotjs,
  nestjs: SiNestjs,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  redis: SiRedis,
  sqlite: SiSqlite,
  typescript: SiTypescript,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  githubactions: SiGithubactions,
  amazonaws: SiAmazonaws,
  nginx: SiNginx,
  owasp: SiOwasp,
  jsonwebtokens: SiJsonwebtokens,
  rbac: FiLock,
  siem: FiActivity,
  'incident-response': FiLifeBuoy,
  mentorship: FiUsers,
  'technical-writing': FiEdit3,
  leadership: FiUserCheck,
  'team-collaboration': FiShare2,
  'strategic-thinking': FiTarget,
};

const heroPhrases = [
  'with Django for rapid, secure APIs',
  'with Node.js for scalable microservices',
  'with Docker & CI/CD for seamless deployments',
  'as a backend engineer grounded in cybersecurity',
  'as a DevOps-minded builder ensuring resilient releases',
] as const;

export default function HomePage() {
  const site = getSiteContent();
  const { mode } = useMode();
  const [phraseIndex, setPhraseIndex] = useState(0);

  const softSkillsCategory = site.skills.find((cat) => cat.category.toLowerCase().includes('soft'));
  const orderedSkillCategories = softSkillsCategory
    ? [...site.skills.filter((cat) => cat !== softSkillsCategory), softSkillsCategory]
    : site.skills;

  const skillCards = orderedSkillCategories.flatMap((cat, index) => {
    const isSoftCategory = softSkillsCategory && cat.category === softSkillsCategory.category;
    const baseDelay = index * 0.08;

    const card = (
      <motion.div
        key={`skill-card-${cat.category}`}
        className={`flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur ${
          isSoftCategory ? 'xl:col-start-3 xl:row-start-2' : ''
        }`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, delay: baseDelay, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-sm uppercase tracking-[0.35em] text-slate-200/80">
            {cat.category}
          </h3>
          <span className="h-px flex-1 rounded-full bg-gradient-to-r from-cyan-400/50 to-fuchsia-400/40" aria-hidden />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cat.skills.map((skill, skillIndex) => {
            const IconComponent = skillIconMap[skill.icon] ?? FiStar;
            const total = cat.skills.length;
            const remainder = total % 3;
            let alignmentClass = '';

            if (remainder === 1 && skillIndex === total - 1) {
              alignmentClass = 'sm:col-start-2';
            } else if (remainder === 2) {
              if (skillIndex === total - 2) {
                alignmentClass = 'sm:col-start-1';
              }
              if (skillIndex === total - 1) {
                alignmentClass = 'sm:col-start-3';
              }
            }

            return (
              <motion.div
                key={skill.name}
                className={`group flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.06] p-4 text-center text-sm text-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.25)] ${alignmentClass}`}
                whileHover={{ scale: 1.06, boxShadow: '0 0 22px rgba(56, 189, 248, 0.25)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <motion.span
                  className="flex h-12 w-12 items-center justify-center text-slate-100 transition-colors duration-200 group-hover:text-cyan-200"
                  whileHover={{ rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                >
                  <IconComponent className="h-10 w-10" aria-hidden />
                </motion.span>
                <span className="font-medium text-slate-100">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );

    if (!isSoftCategory) {
      return [card];
    }

    const accent = (
      <motion.div
        key="skill-card-accent"
        className="hidden flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-950/80 p-6 text-center text-slate-200 shadow-[0_26px_80px_rgba(15,23,42,0.35)] backdrop-blur xl:flex xl:col-start-2 xl:row-start-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: Math.max(baseDelay - 0.04, 0), ease: 'easeOut' }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-cyan-200 shadow-[0_0_22px_rgba(56,189,248,0.45)]">
          ✨
        </span>
        <h4 className="mt-4 font-display text-xs uppercase tracking-[0.4em] text-slate-200/80">
          Craft & Culture
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
          Engineering craft balanced with human-centered skills to keep teams resilient.
        </p>
      </motion.div>
    );

    return [accent, card];
  });

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((idx) => (idx + 1) % heroPhrases.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  if (mode === 'terminal') {
    return <Terminal />;
  }
  return (
  <main className="relative mx-auto max-w-screen-xl px-6 pb-28 pt-20 sm:px-8 lg:px-10">
      {/* Hero */}
      <section className="reveal overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="flex flex-col gap-8 lg:max-w-3xl lg:h-full">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100/70">
                  {site.hero.name}
                </span>
                {site.hero.location ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-slate-200/80">
                    <svg className="h-3.5 w-3.5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {site.hero.location}
                  </span>
                ) : null}
              </div>

              <div className="space-y-6">
                <h1 className="font-display text-balance text-4xl font-semibold leading-tight text-slate-100 sm:text-5xl lg:text-6xl">
                  I build
                  <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                    secure, scalable backends.
                  </span>
                </h1>
                <div className="relative h-12 overflow-hidden text-lg text-slate-200 md:text-xl">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroPhrases[phraseIndex]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute inset-x-0 top-1 flex items-center gap-3 font-medium text-slate-100"
                    >
                      <span className="inline-flex h-1.5 w-6 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300" aria-hidden />
                      {heroPhrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 text-sm">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-slate-100 transition hover:border-cyan-300 hover:text-white"
                href={`mailto:${site.hero.contacts.email}`}
              >
                <span aria-hidden>✉️</span>Email
              </a>
              {site.hero.contacts.linkedin && (
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-slate-100 transition hover:border-cyan-300 hover:text-white"
                  href={site.hero.contacts.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden>🌐</span>LinkedIn
                </a>
              )}
              {site.hero.contacts.github && (
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-slate-100 transition hover:border-cyan-300 hover:text-white"
                  href={site.hero.contacts.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden>💻</span>GitHub
                </a>
              )}
              {site.hero.cta?.downloadCvUrl && (
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 px-5 py-2 text-sm font-medium text-slate-950 shadow-[0_12px_40px_rgba(56,189,248,0.25)] transition hover:brightness-110"
                  href={site.hero.cta.downloadCvUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden>⬇️</span>Download CV
                </a>
              )}
            </div>
          </div>
          <div className="lg:w-80 xl:w-96">
            <div className="relative flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-7 text-slate-200/90 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-fuchsia-200/70">Beyond Code</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                  What keeps me curious after shipping.
                </p>
              </div>
              <ul className="space-y-4 text-sm text-slate-200/90">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg">♟️</span>
                  <span>Chess coach nurturing strategic thinking for the next generation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg">🛡️</span>
                  <span>Security advocate championing safe defaults and incident readiness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg">🧭</span>
                  <span>Mentor guiding junior engineers through architecture trade-offs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg">✍️</span>
                  <span>Technical writer translating complex systems into clear documentation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section id="skills" title="Skills">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {skillCards}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          {site.projects.map((p) => (
            <div key={p.name} className="reveal"><ProjectCard p={p} /></div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="grid gap-4">
          {site.experience.map((e) => (
            <div key={`${e.title}-${e.organization}-${e.startDate}`} className="reveal"><ExperienceItem e={e} /></div>
          ))}
        </div>
      </Section>

      {site.testimonials?.length ? (
        <Section id="testimonials" title="Testimonials">
          <div className="grid gap-6 md:grid-cols-2">
            {site.testimonials.map((t) => (
              <TestimonialCard key={`${t.name}-${t.company || ''}`} testimonial={t} />
            ))}
          </div>
        </Section>
      ) : null}

      {site.awards?.length ? (
        <Section id="awards" title="Awards & Recognitions">
          <div className="grid gap-6 md:grid-cols-2">
            {site.awards.map((a) => (
              <AwardCard key={`${a.title}-${a.issuer}`} award={a} />
            ))}
          </div>
        </Section>
      ) : null}

      {site.certifications?.length ? (
        <Section id="certifications" title="Education & Certifications">
          <ul className="grid gap-3 text-sm text-slate-200/85 md:grid-cols-2">
            {site.certifications.map((c) => (
              <li
                key={`${c.title}-${c.date || ''}`}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-amber-300" aria-hidden />
                <span>
                  <span className="font-medium text-slate-100">{c.title}</span>
                  {c.date ? <span className="text-slate-400"> — {c.date}</span> : null}
                  {c.status ? <span className="block text-xs uppercase tracking-[0.3em] text-slate-400/80">{c.status}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="contact" title="Contact">
        <ul className="grid gap-3 text-sm text-slate-200/85 sm:grid-cols-2">
          <li className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 text-slate-950">✉️</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</p>
                <a className="text-sm font-medium text-slate-100 hover:underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </div>
            </div>
          </li>
          {site.contact.linkedin ? (
            <li className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 to-rose-500 text-slate-950">in</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">LinkedIn</p>
                  <a className="text-sm font-medium text-slate-100 hover:underline" href={site.contact.linkedin} target="_blank" rel="noreferrer">
                    {site.contact.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
              <span aria-hidden className="text-slate-400">↗</span>
            </li>
          ) : null}
          {site.contact.github ? (
            <li className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-slate-950">GH</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">GitHub</p>
                  <a className="text-sm font-medium text-slate-100 hover:underline" href={site.contact.github} target="_blank" rel="noreferrer">
                    {site.contact.github.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
              <span aria-hidden className="text-slate-400">↗</span>
            </li>
          ) : null}
          {site.contact.phone ? (
            <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950">☎</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone</p>
                <p className="text-sm font-medium text-slate-100">{site.contact.phone}</p>
              </div>
            </li>
          ) : null}
        </ul>
      </Section>
    </main>
  );
}
