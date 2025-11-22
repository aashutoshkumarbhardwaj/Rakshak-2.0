'use client'

import { Card } from '@/components/ui/card'
import { Brain, TrendingUp, Clock, AlertCircle } from 'lucide-react'

export function AiDemandPrediction() {
  const prediction = {
    next24Hours: 287,
    peakHour: '18:00 - 20:00',
    expectedDemand: 'Very High',
    confidence: 92,
  }

  const recommendations = [
    { time: '14:00 - 17:00', action: 'Deploy standard fleet', ambulances: 12 },
    { time: '18:00 - 21:00', action: 'Activate emergency surge protocol', ambulances: 18 },
    { time: '21:00 - 23:00', action: 'Maintain high alert', ambulances: 15 },
    { time: '23:00 - 06:00', action: 'Standard night shift', ambulances: 8 },
  ]

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">AI Demand Prediction (24h)</h3>
      </div>

      <div className="space-y-6">
        {/* Overall Prediction */}
        <div className="p-4 bg-primary/10 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Expected Calls</p>
              <p className="text-3xl font-bold text-primary">{prediction.next24Hours}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Peak Hour</p>
              <p className="font-bold text-foreground">{prediction.peakHour}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {prediction.confidence}% confidence
          </p>
        </div>

        {/* Hourly Recommendations */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Deployment Recommendations</p>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{rec.time}</p>
                      <p className="text-xs text-muted-foreground">{rec.action}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-bold rounded">
                    {rec.ambulances} units
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
