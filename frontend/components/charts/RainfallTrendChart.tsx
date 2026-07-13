'use client'

import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import AnalyticsCard from '@/components/ui/AnalyticsCard'
import { formatMetric } from '@/lib/utils'

interface RainfallTrendChartProps {
  data: Array<{ time: string; rainfall: number }>
}

export default function RainfallTrendChart({
  data,
}: RainfallTrendChartProps) {
  const chartData = data ?? []

  return (
    <AnalyticsCard title="Rainfall Trend" accent="blue">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333944" />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f1115',
              border: '1px solid #333944',
              borderRadius: '8px',
              color: '#f8fafc'
            }}
            formatter={(value) => [formatMetric(Number(value), ' mm'), 'Rainfall']}
            cursor={{ stroke: '#2563eb', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="rainfall"
            stroke="#2563eb"
            fill="url(#rainfallGradient)"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6, fill: '#2563eb' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  )
}
