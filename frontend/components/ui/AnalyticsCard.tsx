'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnalyticsCardProps {
  title: string
  children: React.ReactNode
  accent?: 'blue' | 'indigo'
  className?: string
}

export default function AnalyticsCard({
  title,
  children,
  accent = 'blue',
  className = '',
}: AnalyticsCardProps) {
  const accentColors = {
    blue: 'border-blue/20 from-blue/5',
    indigo: 'border-indigo/20 from-indigo/5',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-lg border backdrop-blur-sm bg-light-surface dark:bg-dark-surface
        bg-gradient-to-br ${accentColors[accent]} to-transparent
        overflow-hidden ${className}
      `}
      style={{
        borderColor: accent === 'blue' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(99, 102, 241, 0.2)',
      }}
    >
      {/* Title bar */}
      <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
        <h3 className={`text-sm font-semibold ${
          accent === 'blue' ? 'text-blue' : 'text-indigo-500'
        } uppercase tracking-wider`}>
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  )
}
