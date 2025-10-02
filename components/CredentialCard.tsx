'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import type { Award, Certification } from '@/content/types';
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

function formatDate(date?: string) {
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
}

export default function CredentialCard({ credential, index }: CredentialCardProps) {
  const [showModal, setShowModal] = useState(false);

  const {
    title,
    issuer,
    date,
    description,
    highlight,
    credentialUrl,
    image,
  } = credential;
  const status = 'status' in credential ? credential.status : undefined;

  const normalizedIssuer = issuer?.toLowerCase().trim() ?? '';
  const iconKey = credential.icon?.toLowerCase().trim();
  const Icon = iconKey ? iconLibrary[iconKey] ?? FiAward : issuerIconFallback[normalizedIssuer] ?? FiAward;
  const badgeText = highlight ?? status ?? (credential.kind === 'award' ? 'Recognition' : 'Credential');
  const formattedDate = formatDate(date);
  const descriptionText = description ?? status ?? 'Verified professional credential.';

  const palette = credential.kind === 'award'
    ? {
        glowOne: 'bg-amber-400/15 group-hover:bg-amber-300/25',
        glowTwo: 'bg-fuchsia-400/20 group-hover:bg-fuchsia-300/30',
        badge: 'border-amber-300/40 bg-amber-400/10 text-amber-100/90',
        button: 'border-amber-300/40 bg-amber-400/10 text-amber-100 hover:border-amber-300 hover:bg-amber-400/20 hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]',
        iconRing: 'border-amber-300/40 bg-amber-400/5',
        border: 'hover:border-amber-200/40',
        shadow: 'hover:shadow-[0_36px_110px_rgba(250,204,21,0.22)]',
        certOverlay: 'from-amber-950/95 via-amber-950/85 to-amber-950/95',
      }
    : {
        glowOne: 'bg-cyan-400/15 group-hover:bg-cyan-300/25',
        glowTwo: 'bg-sky-400/15 group-hover:bg-sky-300/30',
        badge: 'border-cyan-300/40 bg-cyan-400/10 text-cyan-100/90',
        button: 'border-cyan-300/40 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]',
        iconRing: 'border-cyan-300/40 bg-cyan-400/5',
        border: 'hover:border-cyan-200/40',
        shadow: 'hover:shadow-[0_36px_110px_rgba(56,189,248,0.22)]',
        certOverlay: 'from-cyan-950/95 via-cyan-950/85 to-cyan-950/95',
      };

  return (
    <>
      <motion.article
        className={`group relative h-full overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] shadow-[0_26px_90px_rgba(15,23,42,0.38)] backdrop-blur-xl transition duration-500 md:hover:-translate-y-1 ${palette.border} ${palette.shadow}`}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      >
        {image ? (
          <>
            <div className="absolute inset-0 opacity-20 blur-sm transition-all duration-700 group-hover:opacity-30 group-hover:blur-none group-hover:scale-105">
              <Image
                src={image}
                alt={`${title} certificate background`}
                fill
                sizes="(min-width: 768px) 400px, 90vw"
                className="object-cover"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${palette.certOverlay}`} aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.08]" aria-hidden />
        )}

        <div className="relative flex h-full min-h-[320px] flex-col gap-6 p-8">
          <span className={`absolute -right-10 top-10 h-32 w-32 rounded-full blur-3xl transition duration-500 ${palette.glowOne}`} aria-hidden />
          <span className={`absolute -bottom-14 left-6 h-32 w-32 rounded-full blur-3xl transition duration-500 ${palette.glowTwo}`} aria-hidden />
          
          <div className="flex items-center justify-between gap-4">
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.4em] ${palette.badge}`}>
              {badgeText}
            </span>
            {formattedDate ? (
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300/80">{formattedDate}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <span className={`inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border shadow-[0_12px_30px_rgba(15,23,42,0.35)] ${palette.iconRing}`}>
              <Icon className="h-8 w-8 text-slate-100" aria-hidden />
            </span>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl leading-tight text-slate-100">{title}</h3>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
                {issuer ?? 'Credential'}
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-200/90">
            {descriptionText}
          </p>

          {status && credential.kind === 'certification' ? (
            <span className="inline-block text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/90">
              Status: {status}
            </span>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-3">
            {image ? (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${palette.button}`}
              >
                <FiMaximize2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                View Certificate
              </button>
            ) : null}

            {credentialUrl ? (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${palette.button}`}
              >
                <FiExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                Verify
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>

      {image && (
        <CertificateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          issuer={issuer ?? 'Credential'}
          date={formattedDate}
          image={image}
          credentialUrl={credentialUrl}
          kind={credential.kind}
        />
      )}
    </>
  );
}
