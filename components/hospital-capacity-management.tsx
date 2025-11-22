'use client'

import { Card } from '@/components/ui/card'
import { Bed, Users, Zap, Activity, AlertCircle } from 'lucide-react'

export function HospitalCapacityManagement() {
  const capacity = {
    icu: { total: 12, occupied: 8, available: 4 },
    trauma: { total: 8, occupied: 5, available: 3 },
    general: { total: 20, occupied: 15, available: 5 },
    pediatric: { total: 6, occupied: 3, available: 3 },
  }

  const doctors = {
    cardiologist: { available: 2, onCall: 1 },
    neurologist: { available: 1, onCall: 2 },
    anesthesiologist: { available: 3, onCall: 0 },
    surgeon: { available: 2, onCall: 1 },
  }

  return (
    <Card className="p-6 border-2 border-border">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Bed className="w-5 h-5 text-primary" />
        Real-time Capacity Management
      </h3>

      <div className="space-y-6">
        {/* Bed Availability */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-4">Bed Availability</p>
          <div className="space-y-3">
            {Object.entries(capacity).map(([type, data]) => (
              <div key={type} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground capitalize">{type.replace(/_/g, ' ')}</span>
                  <span className={`text-sm font-bold ${data.available > 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {data.available}/{data.total} available
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-background rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${(data.available / data.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-background rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-destructive h-full"
                      style={{ width: `${(data.occupied / data.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Staff Availability */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Medical Staff
          </p>
          <div className="space-y-3">
            {Object.entries(doctors).map(([type, data]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-sm font-medium text-foreground capitalize">{type.replace(/_/g, ' ')}</span>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="font-bold text-green-600">{data.available} available</span>
                    <span className="text-muted-foreground"> • </span>
                    <span className="font-bold text-yellow-600">{data.onCall} on-call</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Resources */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Critical Equipment
          </p>
          <div className="space-y-3">
            {[
              { name: 'Ventilators', available: 6, total: 10 },
              { name: 'Defibrillators', available: 4, total: 5 },
              { name: 'Dialysis Machines', available: 3, total: 4 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className={`text-sm font-bold ${item.available > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {item.available}/{item.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
