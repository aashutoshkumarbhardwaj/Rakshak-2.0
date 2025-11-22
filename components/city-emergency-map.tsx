'use client'

import { Card } from '@/components/ui/card'
import { AlertTriangle, MapPin, Zap } from 'lucide-react'

export function CityEmergencyMap() {
  const hotspots = [
    { zone: 'Zone A - Downtown', incidents: 24, color: 'neon-red', risk: 'Critical' },
    { zone: 'Zone B - North', incidents: 8, color: 'yellow-400', risk: 'Medium' },
    { zone: 'Zone C - South', incidents: 3, color: 'neon-cyan', risk: 'Low' },
    { zone: 'Zone D - East', incidents: 15, color: 'neon-blue', risk: 'High' },
  ]

  return (
    <Card className="p-6 bg-card border-2 border-neon-red/30 glass-effect">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-neon-red" />
        <h3 className="text-lg font-semibold">City-Wide Emergency Heatmap</h3>
      </div>

      <div className="space-y-3">
        {hotspots.map((zone) => (
          <div key={zone.zone} className="p-4 border border-border/50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-foreground">{zone.zone}</h4>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${zone.color}/20 text-${zone.color}`}>
                {zone.risk}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${zone.color}`}
                  style={{ width: `${(zone.incidents / 30) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground">{zone.incidents} incidents</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Summary */}
      <div className="mt-4 p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-neon-red flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-neon-red">High Emergency Load Detected</p>
          <p className="text-xs text-foreground mt-1">Downtown zone exceeds normal capacity. Recommend ambulance redistribution.</p>
        </div>
      </div>
    </Card>
  )
}
