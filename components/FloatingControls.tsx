'use client'

import { useTheme } from 'next-themes'
import { useMode } from '@/components/ModeContext'
import { FiSun, FiMoon, FiMonitor, FiTerminal } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FloatingControls() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { mode, toggle } = useMode()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
    >
      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="group relative w-14 h-14 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {theme === 'dark' ? (
          <FiSun className="w-6 h-6 text-amber-400 relative z-10" />
        ) : (
          <FiMoon className="w-6 h-6 text-purple-400 relative z-10" />
        )}
      </motion.button>

      {/* Mode Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className="group relative w-14 h-14 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle mode"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {mode === 'normal' ? (
          <FiMonitor className="w-6 h-6 text-cyan-400 relative z-10" />
        ) : (
          <FiTerminal className="w-6 h-6 text-green-400 relative z-10" />
        )}
      </motion.button>
    </motion.div>
  )
}
