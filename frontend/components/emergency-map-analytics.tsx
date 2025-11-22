'use client'

import { Card } from '@/components/ui/card'
import { MapPin, Zap, AlertTriangle, TrendingUp } from 'lucide-react'

export function EmergencyMapAnalytics() {
  const zones = [
    { name: 'Downtown', count: 156, risk: 'High', color: 'destructive' },
    { name: 'Residential North', count: 89, risk: 'Medium', color: 'yellow' },
    { name: 'Residential South', count: 72, risk: 'Medium', color: 'yellow' },
    { name: 'Industrial', count: 45, risk: 'Low', color: 'green' },
    { name: 'Suburban', count: 28, risk: 'Low', color: 'green' },
  ]

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Real-time Emergency Map</h3>
      </div>

      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.name} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    zone.color === 'destructive' ? 'bg-destructive' :
                    zone.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                ></div>
                <span className="font-semibold text-foreground">{zone.name}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{zone.count}</p>
                <p className={`text-xs font-bold ${
                  zone.risk === 'High' ? 'text-destructive' :
                  zone.risk === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{zone.risk} Risk</p>
              </div>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className={`h-full rounded-full ${
                  zone.color === 'destructive' ? 'bg-destructive' :
                  zone.color === 'yellow' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${(zone.count / 156) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
        <p className="text-sm font-bold text-destructive flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4" />
          High-Risk Alert
        </p>
        <p className="text-xs text-muted-foreground">
          Downtown zone showing 47% increase in emergency calls. Recommend deploying 3 additional ambulances to the area.
        </p>
      </div>
    </Card>
  )
}
