'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FiAward,
  FiCompass,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMaximize2,
  FiShield,
  FiTerminal,
  FiDatabase,
} from 'react-icons/fi';
import { GiGamepad } from 'react-icons/gi';
import type { Award, Certification, CertificationAccent } from '@/content/types';
import CertificateModal from './CertificateModal';

const iconLibrary: Record<string, IconType> = {
  shield: FiShield,
  lock: FiLock,
  server: FiDatabase,
  compass: FiCompass,
  spark: FiTerminal,
  layers: FiLayers,
  gamepad: GiGamepad,
  mentor: FiGlobe,
};

const issuerIconFallback: Record<string, IconType> = {
  'sidmach technologies': FiShield,
  isc2: FiLock,
  alx: FiLayers,
  'alx africa': FiLayers,
  'electronic arts': GiGamepad,
};

type CredentialSource =
  | (Award & { kind: 'award' })
  | (Certification & { kind: 'certification' });

type CredentialCardProps = {
  credential: CredentialSource;
  index: number;
};

type CertificationCategoryType = 'certification' | 'completion' | 'achievement' | 'recognition';

type Palette = {
  glowOne: string;
  glowTwo: string;
  badge: string;
  iconRing: string;
  certificateButton: string;
  previewButton: string;
  border: string;
  shadow: string;
  highlight: string;
};

const certificationLabels: Record<CertificationCategoryType, string> = {
  certification: 'Certification',
  completion: 'Certificate of Completion',
  achievement: 'Certificate of Achievement',
  recognition: 'Recognition',
};

const certificationPalettes: Record<CertificationCategoryType, Palette> = {
  certification: {
    glowOne: 'bg-cyan-400/15 group-hover:bg-cyan-300/25',
    glowTwo: 'bg-sky-400/15 group-hover:bg-sky-300/30',
    badge: 'border-cyan-300/50 bg-cyan-400/15 text-cyan-100/90',
    iconRing: 'border-cyan-300/40 bg-gradient-to-br from-cyan-400/15 via-sky-400/10 to-blue-500/10',
    certificateButton:
      'border-cyan-300/40 bg-cyan-500/15 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-400/25 hover:shadow-[0_0_32px_rgba(56,189,248,0.28)]',
    previewButton:
      'border-sky-300/40 bg-sky-500/10 text-sky-100 hover:border-sky-200 hover:bg-sky-400/25 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]',
    border: 'hover:border-cyan-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(56,189,248,0.22)]',
    highlight: 'border-cyan-300/40 bg-cyan-400/10 text-cyan-100/90',
  },
  completion: {
    glowOne: 'bg-emerald-400/20 group-hover:bg-emerald-300/30',
    glowTwo: 'bg-teal-400/20 group-hover:bg-teal-300/30',
    badge: 'border-emerald-300/50 bg-emerald-400/15 text-emerald-100/90',
    iconRing: 'border-emerald-300/40 bg-gradient-to-br from-emerald-400/15 via-teal-400/10 to-emerald-500/10',
    certificateButton:
      'border-emerald-300/40 bg-emerald-500/15 text-emerald-100 hover:border-emerald-200 hover:bg-emerald-400/25 hover:shadow-[0_0_32px_rgba(16,185,129,0.25)]',
    previewButton:
      'border-teal-300/40 bg-teal-500/10 text-teal-100 hover:border-teal-200 hover:bg-teal-400/25 hover:shadow-[0_0_30px_rgba(45,212,191,0.23)]',
    border: 'hover:border-emerald-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(16,185,129,0.2)]',
    highlight: 'border-emerald-300/40 bg-emerald-200/10 text-emerald-100/90',
  },
  achievement: {
    glowOne: 'bg-fuchsia-400/20 group-hover:bg-fuchsia-300/30',
    glowTwo: 'bg-purple-400/20 group-hover:bg-purple-300/30',
    badge: 'border-fuchsia-300/50 bg-fuchsia-400/15 text-fuchsia-100/90',
    iconRing: 'border-fuchsia-300/40 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/10 to-purple-500/15',
    certificateButton:
      'border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100 hover:border-fuchsia-200 hover:bg-fuchsia-400/25 hover:shadow-[0_0_32px_rgba(217,70,239,0.28)]',
    previewButton:
      'border-purple-300/40 bg-purple-500/10 text-purple-100 hover:border-purple-200 hover:bg-purple-400/25 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    border: 'hover:border-fuchsia-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(217,70,239,0.24)]',
    highlight: 'border-fuchsia-300/40 bg-fuchsia-200/10 text-fuchsia-100/90',
  },
  recognition: {
    glowOne: 'bg-amber-400/20 group-hover:bg-amber-300/30',
    glowTwo: 'bg-rose-400/20 group-hover:bg-rose-300/30',
    badge: 'border-amber-300/50 bg-amber-400/15 text-amber-100/90',
    iconRing: 'border-amber-300/40 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-rose-500/15',
    certificateButton:
      'border-amber-300/40 bg-amber-500/15 text-amber-100 hover:border-amber-200 hover:bg-amber-400/25 hover:shadow-[0_0_32px_rgba(250,204,21,0.26)]',
    previewButton:
      'border-rose-300/40 bg-rose-500/10 text-rose-100 hover:border-rose-200 hover:bg-rose-400/25 hover:shadow-[0_0_30px_rgba(244,114,182,0.24)]',
    border: 'hover:border-amber-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(250,204,21,0.24)]',
    highlight: 'border-amber-300/40 bg-amber-200/10 text-amber-100/90',
  },
};

const certificationAccentPalettes: Record<CertificationAccent, Palette> = {
  amethyst: certificationPalettes.achievement,
  azure: certificationPalettes.certification,
  emerald: certificationPalettes.completion,
  sunset: {
    glowOne: 'bg-amber-400/18 group-hover:bg-amber-300/30',
    glowTwo: 'bg-rose-400/18 group-hover:bg-rose-300/30',
    badge: 'border-amber-300/50 bg-amber-400/15 text-amber-100/90',
    iconRing: 'border-amber-300/40 bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-fuchsia-500/15',
    certificateButton:
      'border-amber-300/40 bg-amber-500/15 text-amber-100 hover:border-amber-200 hover:bg-amber-400/25 hover:shadow-[0_0_32px_rgba(251,191,36,0.26)]',
    previewButton:
      'border-rose-300/40 bg-rose-500/12 text-rose-100 hover:border-rose-200 hover:bg-rose-400/25 hover:shadow-[0_0_30px_rgba(244,114,182,0.24)]',
    border: 'hover:border-amber-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(251,191,36,0.24)]',
    highlight: 'border-amber-300/40 bg-amber-200/10 text-amber-100/90',
  },
  orchid: {
    glowOne: 'bg-rose-400/20 group-hover:bg-rose-300/30',
    glowTwo: 'bg-violet-400/20 group-hover:bg-violet-300/30',
    badge: 'border-fuchsia-300/50 bg-fuchsia-400/15 text-fuchsia-100/90',
    iconRing: 'border-fuchsia-300/40 bg-gradient-to-br from-rose-500/15 via-fuchsia-500/10 to-violet-500/15',
    certificateButton:
      'border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100 hover:border-fuchsia-200 hover:bg-fuchsia-400/25 hover:shadow-[0_0_32px_rgba(217,70,239,0.28)]',
    previewButton:
      'border-violet-300/40 bg-violet-500/12 text-violet-100 hover:border-violet-200 hover:bg-violet-400/25 hover:shadow-[0_0_30px_rgba(139,92,246,0.24)]',
    border: 'hover:border-fuchsia-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(217,70,239,0.24)]',
    highlight: 'border-fuchsia-300/40 bg-fuchsia-200/10 text-fuchsia-100/90',
  },
  royal: {
    glowOne: 'bg-indigo-400/18 group-hover:bg-indigo-300/30',
    glowTwo: 'bg-cyan-400/18 group-hover:bg-cyan-300/30',
    badge: 'border-indigo-300/50 bg-indigo-400/15 text-indigo-100/90',
    iconRing: 'border-indigo-300/40 bg-gradient-to-br from-indigo-500/15 via-cyan-500/10 to-sky-500/15',
    certificateButton:
      'border-indigo-300/40 bg-indigo-500/15 text-indigo-100 hover:border-indigo-200 hover:bg-indigo-400/25 hover:shadow-[0_0_32px_rgba(99,102,241,0.26)]',
    previewButton:
      'border-cyan-300/40 bg-cyan-500/12 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-400/25 hover:shadow-[0_0_30px_rgba(59,130,246,0.24)]',
    border: 'hover:border-indigo-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(99,102,241,0.22)]',
    highlight: 'border-indigo-300/40 bg-indigo-200/10 text-indigo-100/90',
  },
  crimson: {
    glowOne: 'bg-rose-500/18 group-hover:bg-rose-400/30',
    glowTwo: 'bg-orange-500/18 group-hover:bg-orange-400/30',
    badge: 'border-rose-300/50 bg-rose-500/15 text-rose-100/90',
    iconRing: 'border-rose-300/40 bg-gradient-to-br from-rose-500/15 via-orange-500/10 to-red-500/15',
    certificateButton:
      'border-rose-300/40 bg-rose-500/15 text-rose-100 hover:border-rose-200 hover:bg-rose-400/25 hover:shadow-[0_0_32px_rgba(244,63,94,0.26)]',
    previewButton:
      'border-orange-300/40 bg-orange-500/12 text-orange-100 hover:border-orange-200 hover:bg-orange-400/25 hover:shadow-[0_0_30px_rgba(249,115,22,0.24)]',
    border: 'hover:border-rose-200/40',
    shadow: 'hover:shadow-[0_36px_110px_rgba(244,63,94,0.24)]',
    highlight: 'border-rose-300/40 bg-rose-200/10 text-rose-100/90',
  },
};

const awardPalette: Palette = {
  glowOne: 'bg-amber-400/15 group-hover:bg-amber-300/25',
  glowTwo: 'bg-fuchsia-400/20 group-hover:bg-fuchsia-300/30',
  badge: 'border-amber-300/40 bg-amber-400/10 text-amber-100/90',
  iconRing: 'border-amber-300/40 bg-gradient-to-br from-amber-500/15 via-yellow-400/10 to-rose-400/15',
  certificateButton:
    'border-amber-300/40 bg-amber-500/15 text-amber-100 hover:border-amber-200 hover:bg-amber-400/25 hover:shadow-[0_0_32px_rgba(250,204,21,0.26)]',
  previewButton:
    'border-rose-300/40 bg-rose-500/10 text-rose-100 hover:border-rose-200 hover:bg-rose-400/25 hover:shadow-[0_0_30px_rgba(244,114,182,0.24)]',
  border: 'hover:border-amber-200/40',
  shadow: 'hover:shadow-[0_36px_110px_rgba(250,204,21,0.22)]',
  highlight: 'border-amber-300/40 bg-amber-200/10 text-amber-100/90',
};

const formatDate = (date?: string | null): string | undefined => {
  if (!date) return undefined;
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split('-').map(Number);
    const d = new Date(year, (month || 1) - 1);
    return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
  }
  if (/^\d{4}$/.test(date)) {
    return date;
  }
  return date;
};

export default function CredentialCard({ credential, index }: CredentialCardProps) {
  const [showModal, setShowModal] = useState(false);

  const { title, issuer, date, description, highlight, credentialUrl, image } = credential;
  const status = 'status' in credential ? credential.status : undefined;

  const normalizedIssuer = issuer?.toLowerCase().trim() ?? '';
  const iconKey = credential.icon?.toLowerCase().trim();
  const Icon = iconKey ? iconLibrary[iconKey] ?? FiAward : issuerIconFallback[normalizedIssuer] ?? FiAward;

  const certificationCategory: CertificationCategoryType =
    credential.kind === 'certification' ? credential.category ?? 'completion' : 'recognition';

  const typeLabel =
    credential.kind === 'certification'
      ? certificationLabels[certificationCategory]
      : highlight ?? 'Recognition';

  const secondaryHighlight =
    credential.kind === 'certification' && highlight && highlight !== typeLabel ? highlight : undefined;

  const formattedDate = formatDate(date);
  const descriptionText = description ?? status ?? 'Verified professional credential.';
  const previewAlt =
    credential.kind === 'certification' && credential.imageAlt
      ? credential.imageAlt
      : 'imageAlt' in credential && credential.imageAlt
        ? credential.imageAlt
        : `${title} certificate preview`;

  const certificationAccent: CertificationAccent | undefined =
    credential.kind === 'certification' ? credential.accent : undefined;

  const palette =
    credential.kind === 'award'
      ? awardPalette
      : certificationAccent && certificationAccentPalettes[certificationAccent]
        ? certificationAccentPalettes[certificationAccent]
        : certificationPalettes[certificationCategory];

  const buttonBase =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300';

  return (
    <>
      <motion.article
        className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_26px_90px_rgba(15,23,42,0.32)] backdrop-blur-xl transition duration-500 md:hover:-translate-y-1 ${palette.border} ${palette.shadow}`}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      >
        <div className="relative flex h-full min-h-[360px] flex-col gap-6 p-8">
          <span
            className={`pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full blur-3xl transition duration-500 ${palette.glowOne}`}
            aria-hidden
          />
          <span
            className={`pointer-events-none absolute -bottom-14 left-6 h-32 w-32 rounded-full blur-3xl transition duration-500 ${palette.glowTwo}`}
            aria-hidden
          />

          <div className="flex items-center justify-between gap-4">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.35em] ${palette.badge}`}
            >
              {typeLabel}
            </span>
            {formattedDate ? (
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300/80">{formattedDate}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border shadow-[0_12px_30px_rgba(15,23,42,0.35)] ${palette.iconRing}`}
            >
              <Icon className="h-8 w-8 text-slate-100" aria-hidden />
            </span>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl leading-tight text-slate-100">{title}</h3>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">{issuer ?? 'Credential'}</p>
            </div>
          </div>

          {secondaryHighlight ? (
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${palette.highlight}`}
            >
              {secondaryHighlight}
            </span>
          ) : null}

          <p className="text-base leading-relaxed text-slate-200/90">{descriptionText}</p>

          {status && credential.kind === 'certification' ? (
            <span className="inline-block text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/90">
              Status: {status}
            </span>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-3">
            {credentialUrl ? (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={`${buttonBase} ${palette.certificateButton}`}
              >
                <FiExternalLink
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                View Certificate
              </a>
            ) : null}

            {image ? (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className={`${buttonBase} ${palette.previewButton}`}
              >
                <FiMaximize2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                Preview
              </button>
            ) : null}
          </div>
        </div>
      </motion.article>

      {image ? (
        <CertificateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          issuer={issuer ?? 'Credential'}
          date={formattedDate}
          image={image}
          credentialUrl={credentialUrl}
          kind={credential.kind}
          imageAlt={previewAlt}
          typeLabel={typeLabel}
        />
      ) : null}
    </>
  );
}
