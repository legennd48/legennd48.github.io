'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiExternalLink, FiX } from 'react-icons/fi';

type CertificateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  date?: string;
  image: string;
  credentialUrl?: string;
  kind: 'award' | 'certification';
  imageAlt?: string;
  typeLabel?: string;
};

export default function CertificateModal({
  isOpen,
  onClose,
  title,
  issuer,
  date,
  image,
  credentialUrl,
  kind,
  imageAlt,
  typeLabel,
}: CertificateModalProps) {
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  const accentColor = kind === 'award' ? 'amber' : 'cyan';

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_40px_140px_rgba(8,11,21,0.7)]"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal
            aria-labelledby="certificate-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 backdrop-blur transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              aria-label="Close certificate viewer"
            >
              <FiX className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/80">
              <Image
                src={image}
                alt={imageAlt ?? `${title} certificate`}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" aria-hidden />
            </div>

            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <header className="space-y-2">
                <h2
                  id="certificate-modal-title"
                  className="font-display text-xl text-slate-100 sm:text-2xl"
                >
                  {title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300/80">
                  {typeLabel ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                      {typeLabel}
                    </span>
                  ) : null}
                  {typeLabel ? <span className="text-slate-500">·</span> : null}
                  <span className="inline-flex items-center gap-2 text-slate-200">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        accentColor === 'amber' ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                      aria-hidden
                    />
                    {issuer}
                  </span>
                  {date ? <span className="text-slate-400">·</span> : null}
                  {date ? <span>{date}</span> : null}
                </div>
              </header>

              <div className="flex flex-wrap gap-3">
                {credentialUrl ? (
                  <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      accentColor === 'amber'
                        ? 'border-amber-300/40 bg-amber-300/10 text-amber-100 hover:border-amber-300 hover:shadow-[0_0_24px_rgba(250,204,21,0.3)]'
                        : 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100 hover:border-cyan-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.3)]'
                    }`}
                  >
                    <FiExternalLink className="h-4 w-4" aria-hidden />
                    Verify Credential
                  </a>
                ) : null}
                <a
                  href={image}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/15"
                >
                  <FiDownload className="h-4 w-4" aria-hidden />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
