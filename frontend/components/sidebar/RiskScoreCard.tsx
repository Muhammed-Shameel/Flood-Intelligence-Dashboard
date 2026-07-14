'use client'

import React from 'react'
import { FloodZone } from '@/types'
import { motion } from 'framer-motion'
import { formatMetric, getRiskColor } from '@/lib/utils'

interface RiskScoreCardProps {
  zone: FloodZone | null
  score: number | null
}

export default function RiskScoreCard({ zone, score }: RiskScoreCardProps) {
  if (!zone || score === null) {
    return (
      <motion.div className="glow-box p-4" whileHover={{ scale: 1.02 }}>
        <p className="text-xs text-gray-400">Select a flood zone to view risk analysis</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="glow-box p-4"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-sm font-bold text-blue mb-3 uppercase">{zone.id}</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-secondary-light dark:text-text-secondary">Risk Level</span>
          <span
            className="px-2 py-1 rounded text-xs font-bold"
            style={{ color: getRiskColor(zone.severity), borderLeft: `3px solid ${getRiskColor(zone.severity)}` }}
          >
            {zone.severity}
          </span>
        </div>

        <div>
          <span className="text-xs text-text-secondary-light dark:text-text-secondary">Risk Score</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-blue">{score}</span>
            <div className="flex-1 h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue to-blue"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs text-text-secondary-light dark:text-text-secondary">Flood Depth</span>
          <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary">{formatMetric(zone.flood_depth_meters, ' meters')}</p>
        </div>

        <div>
          <span className="text-xs text-text-secondary-light dark:text-text-secondary">Affected Area</span>
          <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary">{formatMetric(zone.affected_area_sqkm, ' km²', 1)}</p>
        </div>
      </div>
    </motion.div>
  )
}
