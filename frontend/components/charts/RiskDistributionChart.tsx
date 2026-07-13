'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import AnalyticsCard from '@/components/ui/AnalyticsCard'
import { formatDisplayNumber } from '@/lib/utils'

interface RiskDistributionChartProps {
  distribution: Record<string, number> | null
}

export default function RiskDistributionChart({
  distribution,
}: RiskDistributionChartProps) {
  const data = distribution
    ? [
        { name: 'LOW', value: distribution.LOW || 0, fill: '#2563eb' },
        { name: 'MOD', value: distribution.MODERATE || 0, fill: '#94a3b8' },
        { name: 'HIGH', value: distribution.HIGH || 0, fill: '#f59e0b' },
        { name: 'CRIT', value: distribution.CRITICAL || 0, fill: '#dc2626' },
      ]
    : []

  return (
    <AnalyticsCard title="Risk Level Distribution" accent="blue">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333944" />
          <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f1115',
              border: '1px solid #333944',
              borderRadius: '4px',
              color: '#f8fafc'
            }}
            formatter={(value) => [`${formatDisplayNumber(Number(value), 0)} zones`, 'Count']}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  )
}
