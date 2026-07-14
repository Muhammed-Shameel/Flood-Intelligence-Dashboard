'use client'

import React, { useEffect, useState } from 'react'
import { FloodZone } from '@/types'
import { motion } from 'framer-motion'
import { floodService } from '@/services/floodService'
import { formatMetric, formatNumber } from '@/lib/utils'

interface EmergencyImpactPanelProps {
  selectedZone: FloodZone | null
}

export default function EmergencyImpactPanel({ selectedZone }: EmergencyImpactPanelProps) {
  const [impact, setImpact] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedZone) {
      const fetchImpact = async () => {
        try {
          setLoading(true)
          const data = await floodService.getZoneEmergencyImpact(selectedZone.id)
          setImpact(data)
        } catch (err) {
          console.error('Error fetching impact:', err)
        } finally {
          setLoading(false)
        }
      }

      fetchImpact()
    }
  }, [selectedZone])

  return (
    <motion.div
      className="glow-box p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-sm font-bold text-blue uppercase mb-3 border-b border-border-light dark:border-border-dark pb-2">
        Emergency Impact Metrics
      </h3>

      {loading ? (
        <p className="text-xs text-text-secondary-light dark:text-text-secondary">Loading...</p>
      ) : impact ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red/10 border border-red/20 rounded p-2">
              <p className="text-xs text-text-secondary-light dark:text-text-secondary">Hospitals At Risk</p>
              <p className="text-lg font-bold text-red">
                {impact.infrastructure_exposure.hospitals_affected}
              </p>
            </div>
            <div className="bg-amber/10 border border-amber/20 rounded p-2">
              <p className="text-xs text-text-secondary-light dark:text-text-secondary">Schools Affected</p>
              <p className="text-lg font-bold text-amber">
                {impact.infrastructure_exposure.schools_affected}
              </p>
            </div>
          </div>

          <div className="bg-amber/10 border border-amber/20 rounded p-2">
            <p className="text-xs text-text-secondary-light dark:text-text-secondary">Roads Inaccessible</p>
            <p className="text-lg font-bold text-amber">
              {formatMetric(impact.infrastructure_exposure.roads_inaccessible_km, ' km', 1)}
            </p>
          </div>

          <div className="bg-blue/10 border border-blue/20 rounded p-2">
            <p className="text-xs text-text-secondary-light dark:text-text-secondary">Est. Evacuees</p>
            <p className="text-lg font-bold text-blue">
              {formatNumber(impact.estimated_evacuees)}
            </p>
          </div>

          <div className="bg-blue/10 border border-blue/20 rounded p-2">
            <p className="text-xs text-text-secondary-light dark:text-text-secondary">Population Affected</p>
            <p className="text-lg font-bold text-blue">
              {formatNumber(impact.population_exposure.affected_population)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-text-secondary-light dark:text-text-secondary">Select a zone to view impact analysis</p>
      )}
    </motion.div>
  )
}
