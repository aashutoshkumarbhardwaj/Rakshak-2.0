'use client'

import { Card } from '@/components/ui/card'
import { Activity, Zap, TrendingUp, Shield, Award } from 'lucide-react'

export function DriverPerformanceScore() {
  const score = 92
  const metrics = [
    { label: 'Route Efficiency', value: 95, icon: TrendingUp },
    { label: 'Safety Score', value: 89, icon: Shield },
    { label: 'Speed Compliance', value: 92, icon: Zap },
    { label: 'Customer Satisfaction', value: 88, icon: Award },
  ]

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-green-600'
    if (val >= 75) return 'text-yellow-600'
    return 'text-destructive'
  }

  const getScoreBg = (val: number) => {
    if (val >= 90) return 'from-green-100 to-green-50'
    if (val >= 75) return 'from-yellow-100 to-yellow-50'
    return 'from-destructive/20 to-destructive/10'
  }

  return (
    <Card className={`p-6 border-2 border-border bg-gradient-to-br ${getScoreBg(score)}`}>
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Driver Performance</h3>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 282.7} 282.7`}
                className={`${getScoreColor(score)} transition-all`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold text-foreground mt-4">
          {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : 'Needs Improvement'}
        </p>
      </div>

      <div className="space-y-3">
        {metrics.map((metric) => {
          const IconComponent = metric.icon
          return (
            <div key={metric.label} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <IconComponent className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(metric.value)}`}>
                {metric.value}%
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
