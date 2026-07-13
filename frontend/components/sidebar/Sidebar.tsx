'use client'

import React, { useState } from 'react'
import { FloodZone, Alert } from '@/types'
import { motion } from 'framer-motion'
import RiskScoreCard from './RiskScoreCard'
import EmergencyImpactPanel from './EmergencyImpactPanel'
import AlertsFeed from './AlertsFeed'
import ControlPanel from './ControlPanel'
import { formatDisplayNumber } from '@/lib/utils'

interface SidebarProps {
  selectedZone: FloodZone | null
  globalRiskIndex: number | null
  alerts: Alert[]
  criticalAlerts: Alert[]
  riskDistribution: Record<string, number> | null
  rainfallMultiplier: number
  onRainfallMultiplierChange: (value: number) => void
  impacts: any
}

export default function Sidebar({
  selectedZone,
  globalRiskIndex,
  alerts,
  criticalAlerts,
  riskDistribution,
  rainfallMultiplier,
  onRainfallMultiplierChange,
  impacts,
}: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('risks')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col gap-4 p-4 overflow-y-auto bg-light-bg dark:bg-dark-bg transition-colors"
    >
      {/* SECTION A: Platform Header & Global Risk */}
      <div className="p-4 rounded-lg bg-light-surface dark:bg-dark-surface border border-border-light dark:border-border-dark">
        <h1 className="text-xl font-bold text-text-primary-light dark:text-text-primary mb-1">
          FLOOD INTELLIGENCE
        </h1>
        <p className="text-[10px] text-neutral uppercase tracking-widest mb-4">COMMAND CENTER</p>

        <div className="flex items-end gap-2">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-neutral">Global Risk Index</p>
            <p className="text-2xl font-bold text-blue">
              {globalRiskIndex !== null ? formatDisplayNumber(globalRiskIndex, 1) : '--'}
            </p>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-amber">Active: {alerts.length}</span>
            <span className="text-red">Critical: {criticalAlerts.length}</span>
          </div>
        </div>
      </div>

      {/* SECTION B: Impact & Control */}
      <EmergencyImpactPanel selectedZone={selectedZone} />
      <ControlPanel
        rainfallMultiplier={rainfallMultiplier}
        onRainfallMultiplierChange={onRainfallMultiplierChange}
      />

      {/* SECTION E: Alerts Feed */}
      <AlertsFeed alerts={alerts.slice(0, 5)} />
    </motion.div>
  )
}
