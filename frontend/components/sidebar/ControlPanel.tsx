'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { formatDisplayNumber } from '@/lib/utils'
import { useScenarioSimulation } from '@/hooks/useFloodData'

interface ControlPanelProps {
  rainfallMultiplier: number
  onRainfallMultiplierChange: (value: number) => void
}

export default function ControlPanel({
  rainfallMultiplier,
  onRainfallMultiplierChange,
}: ControlPanelProps) {
  const { runScenario, loading } = useScenarioSimulation()

  const handleScenario = async (multiplier: number) => {
    onRainfallMultiplierChange(multiplier)
    await runScenario(multiplier)
  }

  return (
    <motion.div
      className="glow-box p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary uppercase mb-3 border-b border-border-light dark:border-border-dark pb-2">
        Scenario Controls
      </h3>

      <div className="space-y-3">
        {/* Rainfall Simulation */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-text-secondary-light dark:text-text-secondary">Rainfall Multiplier</label>
            <span className="text-sm font-bold text-blue">{formatDisplayNumber(rainfallMultiplier, 1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={rainfallMultiplier}
            onChange={(e) => onRainfallMultiplierChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-border-light dark:bg-border-dark rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((rainfallMultiplier - 0.5) / 2.5) * 100}%, #E5E7EB ${((rainfallMultiplier - 0.5) / 2.5) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-text-secondary-light dark:text-text-secondary mt-1">
            <span>Low (0.5x)</span>
            <span>Extreme (3.0x)</span>
          </div>
        </div>

        {/* Preset Scenarios */}
        <div>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary mb-2">Preset Scenarios</p>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScenario(0.7)}
              disabled={loading}
              className="text-xs px-2 py-2 bg-blue/20 border border-blue/50 text-blue rounded hover:bg-blue/30 disabled:opacity-50"
            >
              Low (0.7x)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScenario(1.5)}
              disabled={loading}
              className="text-xs px-2 py-2 bg-amber/20 border border-amber/50 text-amber rounded hover:bg-amber/30 disabled:opacity-50"
            >
              Moderate (1.5x)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScenario(2.0)}
              disabled={loading}
              className="text-xs px-2 py-2 bg-amber/20 border border-amber/50 text-amber rounded hover:bg-amber/30 disabled:opacity-50 col-span-2"
            >
              Extreme (2.0x)
            </motion.button>
          </div>
        </div>

        {/* Region Selector */}
        <div>
          <label className="text-xs text-text-secondary-light dark:text-text-secondary block mb-2">Focus Region</label>
          <select className="w-full bg-light-surface dark:bg-dark-surface text-text-primary-light dark:text-text-primary text-xs p-2 rounded border border-border-light dark:border-border-dark">
            <option>All Regions</option>
            <option>Central District</option>
            <option>North Zone</option>
            <option>South Sector</option>
            <option>East Riverside</option>
            <option>West Valley</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
