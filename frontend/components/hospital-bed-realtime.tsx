'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Bed, Users } from 'lucide-react'

export function HospitalBedRealtime() {
  const bedStatus = [
    { name: 'ICU Beds', available: 3, total: 8, critical: true },
    { name: 'Trauma Beds', available: 1, total: 4, critical: false },
    { name: 'General Beds', available: 12, total: 30, critical: false },
    { name: 'Pediatric Beds', available: 2, total: 6, critical: false },
  ]

  return (
    <Card className="p-6 bg-card border-neon-cyan/30 glass-effect">
      <div className="flex items-center gap-2 mb-4">
        <Bed className="w-5 h-5 text-neon-cyan" />
        <h3 className="text-lg font-semibold">Real-time Bed Status</h3>
      </div>

      <div className="space-y-3">
        {bedStatus.map((bed) => (
          <div key={bed.name} className="p-3 bg-muted/20 border border-border/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-foreground">{bed.name}</h4>
              {bed.critical && bed.available === 0 && (
                <span className="px-2 py-1 bg-neon-red/20 text-neon-red text-xs font-bold rounded flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  CRITICAL
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mr-3">
                <div
                  className={`h-full bg-gradient-to-r ${
                    bed.available > bed.total / 2
                      ? 'from-neon-cyan to-neon-blue'
                      : bed.available > 0
                      ? 'from-yellow-400 to-orange-500'
                      : 'from-neon-red to-red-700'
                  }`}
                  style={{ width: `${(bed.available / bed.total) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
                {bed.available}/{bed.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
