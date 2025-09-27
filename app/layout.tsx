import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abdulrazzaq A. Liasu — Portfolio',
  description: 'Portfolio and resume for Abdulrazzaq A. Liasu (Backend Engineer & Cybersecurity Associate).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
