'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, AlertTriangle } from 'lucide-react'

interface HourlyForecast {
  hour: string
  expectedCalls: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendation: string
}

export function AIDemandForecast() {
  const [forecast] = React.useState<HourlyForecast[]>([
    { hour: '14:00', expectedCalls: 8, riskLevel: 'low', recommendation: 'Normal operations' },
    { hour: '15:00', expectedCalls: 12, riskLevel: 'medium', recommendation: 'Prepare 2 standby units' },
    { hour: '16:00', expectedCalls: 18, riskLevel: 'high', recommendation: 'Activate surge protocol' },
    { hour: '17:00', expectedCalls: 22, riskLevel: 'high', recommendation: 'All hands on deck' },
    { hour: '18:00', expectedCalls: 15, riskLevel: 'medium', recommendation: 'Maintain alert status' },
    { hour: '19:00', expectedCalls: 6, riskLevel: 'low', recommendation: 'Return to normal' }
  ])

  const peakHour = forecast.reduce((max, curr) => curr.expectedCalls > max.expectedCalls ? curr : max)

  return (
    <Card className="p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-orange-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          AI Demand Forecast (24-Hour)
        </h3>

        <div className="space-y-2">
          {forecast.map((hour) => (
            <div key={hour.hour} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-mono">{hour.hour}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        hour.riskLevel === 'high' ? 'bg-red-500' :
                        hour.riskLevel === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(hour.expectedCalls / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-yellow-300 font-bold w-8 text-right">{hour.expectedCalls}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 ml-16">{hour.recommendation}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
          <p className="text-sm font-semibold text-red-200 flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4" />
            Peak Hour Alert
          </p>
          <p className="text-xs text-red-100">
            Expected surge at {peakHour.hour} with ~{peakHour.expectedCalls} calls. Deploy all available units and activate disaster protocol.
          </p>
        </div>
      </div>
    </Card>
  )
}
