'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, MapPin, TrendingUp } from 'lucide-react'

export function EmergencyHeatmap() {
  const zones = [
    { name: 'Downtown Core', emergencies: 45, color: 'bg-destructive', percent: 100 },
    { name: 'Residential Zone A', emergencies: 38, color: 'bg-orange-500', percent: 84 },
    { name: 'Residential Zone B', emergencies: 32, color: 'bg-yellow-500', percent: 71 },
    { name: 'Industrial Area', emergencies: 28, color: 'bg-green-500', percent: 62 },
    { name: 'Suburban Zone', emergencies: 15, color: 'bg-blue-500', percent: 33 },
  ]

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Emergency Heatmap</h3>
      </div>

      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-foreground text-sm">{zone.name}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground text-sm">{zone.emergencies}</p>
                <p className="text-xs text-muted-foreground">this week</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`${zone.color} h-full rounded-full transition-all duration-500`}
                style={{ width: `${zone.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <p className="text-sm font-semibold text-foreground mb-2">AI Prediction</p>
        <p className="text-xs text-muted-foreground">
          High demand expected in Downtown Core and Residential Zone A during peak hours (6-9 PM).
          Surge pricing activation recommended.
        </p>
      </div>
    </Card>
  )
}
