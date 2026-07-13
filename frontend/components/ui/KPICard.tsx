'use client'

import React from 'react'

interface KPICardProps {
  label: string
  value: string | number
  unit?: string
  status: 'good' | 'watch' | 'critical'
  icon?: React.ReactNode
}

const statusColors = {
  good: 'bg-green/10 text-green',
  watch: 'bg-amber/10 text-amber',
  critical: 'bg-red/10 text-red',
}

export default function KPICard({ label, value, unit, status, icon }: KPICardProps) {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-light-surface dark:bg-dark-surface border border-border-light dark:border-border-dark">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary">
          {icon}
          <span className="text-xs uppercase tracking-wider">{label}</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-text-primary-light dark:text-text-primary">
          {value}
        </span>
        {unit && <span className="text-sm text-text-secondary-light dark:text-text-secondary">{unit}</span>}
      </div>
    </div>
  )
}
