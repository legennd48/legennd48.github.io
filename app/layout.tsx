import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingControls from '@/components/FloatingControls';
import { ModeProvider } from '@/components/ModeContext';

const siteUrl = new URL('https://legennd48.github.io');

const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Abdulrazzaq A. Liasu — Backend Engineer & Cybersecurity Associate',
    template: '%s · A. A. Liasu',
  },
  description:
    'Portfolio & resume for Abdulrazzaq A. Liasu — Backend Engineer and Cybersecurity Associate. Projects, experience, skills, and an interactive terminal mode.',
  keywords: [
    'Backend Engineer',
    'Cybersecurity',
    'Node.js',
    'Python',
    'Django',
    'NestJS',
    'PostgreSQL',
    'DevOps',
  ],
  authors: [{ name: 'Abdulrazzaq A. Liasu', url: 'https://linkedin.com/in/aaliasu' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Abdulrazzaq A. Liasu — Backend Engineer & Cybersecurity Associate',
    description:
      'Projects, experience, skills, and an interactive terminal mode for exploring Abdulrazzaq’s work.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'A. A. Liasu — Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulrazzaq A. Liasu — Backend Engineer & Cybersecurity Associate',
    description:
      'Projects, experience, skills, and an interactive terminal mode for exploring Abdulrazzaq’s work.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-dvh bg-slate-950 font-sans text-slate-100 antialiased">
        <span className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" aria-hidden />
        <span className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(236,72,153,0.3),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.28),transparent_55%)] blur-3xl" aria-hidden />
        <span
          className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-soft-light"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
            backgroundSize: '140px 140px',
          }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-amber-300 focus:px-3 focus:py-1 focus:text-black"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <ModeProvider>
            <Header />
            <FloatingControls />
            <div id="content" className="pt-[73px]">{children}</div>
            <Footer />
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
