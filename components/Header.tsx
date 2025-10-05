'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
          aria-label="A. A. Liasu - Home"
        >
          <Image
            src="/initials-removebg-preview.png"
            alt="A. A. Liasu Logo"
            width={50}
            height={50}
            className="object-contain brightness-110 contrast-125"
            priority
          />
        </motion.a>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden items-center gap-6 text-xs uppercase tracking-[0.35em] text-slate-400 sm:flex"
        >
          <a href="#skills" className="transition hover:text-sky-200">
            Skills &amp; Tools
          </a>
          <a href="#projects" className="transition hover:text-sky-200">
            Projects
          </a>
          <a href="#experience" className="transition hover:text-sky-200">
            Experience
          </a>
          <a href="#testimonials" className="transition hover:text-sky-200">
            Testimonials
          </a>
          <a href="#awards" className="transition hover:text-sky-200">
            Awards
          </a>
          <a href="#certifications" className="transition hover:text-sky-200">
            Certifications
          </a>
          <a href="#contact" className="transition hover:text-sky-200">
            Contact
          </a>
        </motion.nav>
      </div>
    </header>
  )
}
