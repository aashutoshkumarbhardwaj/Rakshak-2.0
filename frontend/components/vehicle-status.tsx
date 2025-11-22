'use client'

import { Card } from '@/components/ui/card'
import { Truck, Droplet, Zap, Box, AlertTriangle } from 'lucide-react'

export function VehicleStatus() {
  const status = {
    oxygen: 85,
    aedBattery: 92,
    ventilator: 78,
    medkitStock: 65,
  }

  return (
    <Card className="p-6 border-2 border-border">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Truck className="w-5 h-5" />
        Vehicle Equipment Status
      </h3>

      <div className="space-y-4">
        {[
          { label: 'Oxygen Level', value: status.oxygen, icon: Droplet, unit: '%' },
          { label: 'AED Battery', value: status.aedBattery, icon: Zap, unit: '%' },
          { label: 'Ventilator Status', value: status.ventilator, icon: Box, unit: '%' },
          { label: 'Medical Kit Stock', value: status.medkitStock, icon: Box, unit: '%' },
        ].map((item) => {
          const IconComponent = item.icon
          const isLow = item.value < 30
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className={`w-4 h-4 ${isLow ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${isLow ? 'text-destructive' : 'text-foreground'}`}>
                    {item.value}{item.unit}
                  </span>
                  {isLow && <AlertTriangle className="w-4 h-4 text-destructive" />}
                </div>
              </div>
              <div className={`w-full bg-muted rounded-full h-2 overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all ${
                    item.value >= 75 ? 'bg-green-500' :
                    item.value >= 50 ? 'bg-yellow-500' :
                    'bg-destructive'
                  }`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-yellow-100/30 border border-yellow-200/50 rounded-lg">
        <p className="text-xs font-semibold text-yellow-700">
          Restock reminder: Medical kit stock below 70%. Schedule restocking within 24 hours.
        </p>
      </div>
    </Card>
  )
}
